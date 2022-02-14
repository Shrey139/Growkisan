import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from "./Home";
import Crop from "./Crop";
import Disease from "./Disease";
import Fertilizer from "./Fertilizer";
import Header from "./Header";
import Cropinfo from "./Cropinfo";

function App() {
    const [openPopUp, setOpenPopUp] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalLink, setModalLink] = useState("");

    return (
        <Router>
            <Header />
            <Cropinfo
                open={openPopUp}
                setOpenPopUp={setOpenPopUp}
                modalTitle={modalTitle}
                modalContent={modalContent}
                modalLink={modalLink}
            />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/diseases-identification">
                    <Disease
                        setOpenPopUp={setOpenPopUp}
                        setModalTitle={setModalTitle}
                        setModalContent={setModalContent}
                        setModalLink={setModalLink}
                    />
                </Route>
                <Route exact path="/crop-suggestion">
                    <Crop
                        setOpenPopUp={setOpenPopUp}
                        setModalTitle={setModalTitle}
                        setModalContent={setModalContent}
                        setModalLink={setModalLink}
                    />
                </Route>
                <Route exact path="/macro-nutrients-suggestion">
                    <Fertilizer
                        setOpenPopUp={setOpenPopUp}
                        setModalTitle={setModalTitle}
                        setModalContent={setModalContent}
                        setModalLink={setModalLink}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
