import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import header1 from '../assets/black2.jpg';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={header1} alt="" width="48" height="32" className="d-inline-block align-text-top" />
                    Grow Kisan
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/diseases-identification">Diseases</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/crop-suggestion">Crop</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" exact to="/macro-nutrients-suggestion">Macro Nutrients</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
