import React from 'react';
import Popup from 'reactjs-popup';
import parser from "html-react-parser";

export default function Cropinfo(props) {
    return (
        <div>
            <Popup
                modal
                open={props.open}
                onClose={() => props.setOpenPopUp(false)}
                lockScroll={true}
                overlayStyle={{ background: "rgba(0,0,0,0.8)" }}
            >{close => (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center">{props.modalTitle}</h5>
                        <p className="card-text mt-3" style={{ height: "350px", overflowY: "scroll" }}>
                            {parser(props.modalContent)}
                        </p>
                        {props.modalLink ? (
                            <a href={props.modalLink} rel="noreferrer" target="_blank">Read more</a>
                        ) : null}
                        <div className="row justify-content-end me-1">
                            <button
                                onClick={close}
                                className="btn btn-success btn-sm"
                                style={{ width: "max-content" }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </Popup>
        </div>
    );
}
