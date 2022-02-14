import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div className="container-fluid landing-page-background h-100 d-flex flex-column justify-content-center align-item-center">
                <h1 className="text-center landing-page-header">Grow Kisan</h1>
                <p className="w-75 mx-auto mt-3 mt-md-5 landing-page-text">
                    Grow Kisan is a platform that is built for aiding farmers scientifically in their farming practices.
                    We built three main things that farmers use on daily basis.
                    The first utility is disease identification in which farmers have to upload the image of the leaves of the crop.
                    The platform returns the suggested crop which farmers should grow on their farms.
                    The second utility is crop suggestion in which the farmer has to give some basic information regarding soil nutrients and ph value.
                    Based on this, the platform will suggest the crop which farmers should grow.
                    The third utility is the macro-nutrients suggestion in which the farmer has to provide us with the N-P-K values along with the crop he wants to grow, the platform is able to give the suggestions of nutrients along with some additional information on the nutrients.
                </p>
            </div>
            <div className="container h-100 w-75 mx-auto mt-5 landing-page-content-background">
                <div className="row h-75">
                    <div className="col-12 col-sm-4 d-flex align-items-center">
                        <Link to="/diseases-identification" className="btn btn-outline-success h-75 w-100 d-flex justify-content-center align-items-center">
                            Diseases Identification
                        </Link>
                    </div>
                    <div className="col-12 col-sm-4 d-flex align-items-center">
                        <Link to="/crop-suggestion" className="btn btn-outline-success h-75 w-100 d-flex justify-content-center align-items-center">
                            Crop Suggestion
                        </Link>
                    </div>
                    <div className="col-12 col-sm-4  d-flex align-items-center">
                        <Link to="/macro-nutrients-suggestion" className="btn btn-outline-success h-75 w-100 d-flex justify-content-center align-items-center">
                            Macro Nutrients Suggestion
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
