import React, { useState, useEffect } from 'react';
import { stateArr, getClass } from "../utils/utils";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const getCities = state => {
    const cities = stateArr[state];
    return cities.map(city => (<option key={city} value={city}>{city}</option>));
};

const schema = Yup.object().shape({
    nitrogen: Yup.number()
        .required("Required")
        .positive("Invalid value"),
    phosphorus: Yup.number()
        .required("Required")
        .positive("Invalid value"),
    potassium: Yup.number()
        .required("Required")
        .positive("Invalid value"),
    ph: Yup.number()
        .required("Required")
        .positive("Invalid value")
        .max(14, "Invalid value"),
    rainfall: Yup.number()
        .required("Required")
        .positive("Invalid value"),
    state: Yup.string()
        .required("Required"),
    city: Yup.string()
        .required("Required"),
});


export default function Crop(props) {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        setStates(Object.keys(stateArr).map(state => (<option key={state} value={state}>{state}</option>)));
    }, []);

    const handleSubmit = (values, actions) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(values);

        axios
            .post('/crop-prediction', body, config)
            .then(res => {
                console.log(res.data);
                props.setModalTitle(res.data.crop_name);
                props.setModalContent(res.data.content);
                props.setModalLink(res.data.url);
                props.setOpenPopUp(true);
            })
            .catch(exception => {
                console.log('exception', exception);
                console.log('exception.response', exception.response);
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    };

    return (
        <div className="container mx-auto mt-5 pb-3 responsive-width">
            <Formik
                initialValues={{
                    nitrogen: 0, phosphorus: 0, potassium: 0, ph: 0, rainfall: 0, state: '', city: ''
                }}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nitrogen" className="form-label">Nitrogen</label>
                            <input
                                type="number"
                                className={`form-control ${getClass(formik.touched.nitrogen, formik.errors.nitrogen)}`}
                                id="nitrogen"
                                name="nitrogen"
                                autoComplete="off"
                                value={formik.values.nitrogen}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.nitrogen && !formik.errors.nitrogen && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.nitrogen && formik.errors.nitrogen && (<div className="invalid-feedback">
                                {formik.errors.nitrogen}
                            </div>)
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phosphorus" className="form-label">Phosphorus</label>
                            <input
                                type="number"
                                className={`form-control ${getClass(formik.touched.phosphorus, formik.errors.phosphorus)}`}
                                id="phosphorus"
                                name="phosphorus"
                                autoComplete="off"
                                value={formik.values.phosphorus}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phosphorus && !formik.errors.phosphorus && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.phosphorus && formik.errors.phosphorus && (<div className="invalid-feedback">
                                {formik.errors.phosphorus}
                            </div>)
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="potassium" className="form-label">Potassium</label>
                            <input
                                type="number"
                                className={`form-control ${getClass(formik.touched.potassium, formik.errors.potassium)}`}
                                id="potassium"
                                name="potassium"
                                autoComplete="off"
                                value={formik.values.potassium}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.potassium && !formik.errors.potassium && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.potassium && formik.errors.potassium && (<div className="invalid-feedback">
                                {formik.errors.potassium}
                            </div>)
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ph" className="form-label">PH level</label>
                            <input
                                type="number"
                                className={`form-control ${getClass(formik.touched.ph, formik.errors.ph)}`}
                                id="ph"
                                name="ph"
                                autoComplete="off"
                                value={formik.values.ph}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.ph && !formik.errors.ph && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.ph && formik.errors.ph && (<div className="invalid-feedback">
                                {formik.errors.ph}
                            </div>)
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rainfall">Rainfall (in mm)</label><br></br>
                            <input
                                type="number"
                                className={`form-control ${getClass(formik.touched.rainfall, formik.errors.rainfall)}`}
                                id="rainfall"
                                name="rainfall"
                                autoComplete="off"
                                value={formik.values.rainfall}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.rainfall && !formik.errors.rainfall && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.rainfall && formik.errors.rainfall && (<div className="invalid-feedback">
                                {formik.errors.rainfall}
                            </div>)
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <select
                                id="state"
                                name="state"
                                className={`form-select ${getClass(formik.touched.state, formik.errors.state)}`}
                                value={formik.values.state}
                                onChange={e => {
                                    setCities(getCities(e.target.value));
                                    formik.handleChange(e);
                                }}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" defaultValue>Select State</option>
                                {states}
                            </select>
                            {formik.touched.state && !formik.errors.state && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.state && formik.errors.state && (<div className="invalid-feedback">
                                {formik.errors.state}
                            </div>)
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <select
                                id="city"
                                name="city"
                                className={`form-select ${getClass(formik.touched.city, formik.errors.city)}`}
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" defaultValue>Select City</option>
                                {cities}
                            </select>
                            {formik.touched.city && !formik.errors.city && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.city && formik.errors.city && (<div className="invalid-feedback">
                                {formik.errors.city}
                            </div>)
                            }
                        </div>
                        <button type="submit" disabled={!!formik.isSubmitting} className="btn btn-success">Submit</button>
                    </form>
                )}
            </Formik>
        </div >
    );
}
