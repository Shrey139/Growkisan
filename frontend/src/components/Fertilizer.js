import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { getClass } from '../utils/utils';

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
    crop_type: Yup.string()
        .required("Required"),
});

export default function Fertilizer(props) {
    const handleSubmit = (values, actions) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(values);
        console.log(body);
        axios
            .post('/fertilizer-prediction', body, config)
            .then(res => {
                props.setModalTitle('Suggestion');
                props.setModalContent(res.data);
                props.setModalLink('');
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
        <div className="container mx-auto mt-5 mb-2 responsive-width">
            <Formik
                initialValues={{
                    nitrogen: 0, phosphorus: 0, potassium: 0, crop_type: ''
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
                            <label htmlFor="crop_type" className="form-label">Crop Type</label>
                            <select
                                id="crop_type"
                                name="crop_type"
                                className={`form-select ${getClass(formik.touched.crop_type, formik.errors.crop_type)}`}
                                value={formik.values.crop_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" defaultValue>Select Crop Type</option>
                                <option value="rice">Rice</option>
                                <option value="maize">Maize</option>
                                <option value="chickpea">Chickpea</option>
                                <option value="kidneybeans">Kidney Beans</option>
                                <option value="pigeonpeas">Pigeon Peas</option>
                                <option value="mothbeans">Moth Beans</option>
                                <option value="mungbean">Mung Bean</option>
                                <option value="blackgram">Black Gram</option>
                                <option value="lentil">Lentil</option>
                                <option value="pomegranate">Pomegranate</option>
                                <option value="banana">Banana</option>
                                <option value="mango">Mango</option>
                                <option value="Grapes">Grapes</option>
                                <option value="Watermelon">Waterl Melon</option>
                                <option value="muskmelon">Musk Melon</option>
                                <option value="apple">Apple</option>
                                <option value="orange">Orange</option>
                                <option value="papaya">Papaya</option>
                                <option value="coconut">Coconut</option>
                                <option value="cotton">Cotton</option>
                                <option value="jute">Jute</option>
                                <option value="coffee">Coffee</option>
                            </select>
                            {formik.touched.crop_type && !formik.errors.crop_type && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.crop_type && formik.errors.crop_type && (<div className="invalid-feedback">
                                {formik.errors.crop_type}
                            </div>)
                            }
                        </div>
                        <button type="submit" disabled={!!formik.isSubmitting} className="btn btn-success">Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}
