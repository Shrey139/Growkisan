import React from 'react';
import axios from "axios";
import { Formik } from "formik";
import * as Yup from 'yup';
import { getClass } from '../utils/utils';

const schema = Yup.object().shape({
    image: Yup.mixed().required("Required")
});

export default function Disease(props) {
    const uploadImage = (values, actions) => {
        const formData = new FormData();
        formData.append("image", values.image);
        axios
            .post("/diseases-identification", formData)
            .then(res => {
                props.setModalTitle(res.data.disease);
                props.setModalContent(res.data.content);
                props.setModalLink(res.data.url);
                props.setOpenPopUp(true);
            })
            .catch(exception => {
                console.log(exception);
                console.log(exception.response);
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    };

    return (
        <div className="container mx-auto mt-5 responsive-width">
            <Formik
                initialValues={{ image: '' }}
                validationSchema={schema}
                onSubmit={uploadImage}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label"> Upload image of crop </label>
                            <input
                                type="file"
                                className={`form-control ${getClass(formik.touched.image, formik.errors.image)}`}
                                id="image"
                                name="image"
                                onChange={e => formik.setFieldValue("image", e.target.files[0])}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.image && !formik.errors.image && (<div className="valid-feedback">
                                Looks Good!
                            </div>)
                            }
                            {formik.touched.image && formik.errors.image && (<div className="invalid-feedback">
                                {formik.errors.image}
                            </div>)
                            }
                        </div>
                        <button type="submit" disabled={!!formik.isSubmitting} className="btn btn-success mt-2"> Scan </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}
