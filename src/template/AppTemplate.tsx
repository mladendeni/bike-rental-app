import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import BikeMap from '../features/BikeMap/BikeMap';
import HowItWorks from '../features/HowItWorks/HowItWorks';
import ListRide from '../features/ListRide/ListRide';
import Header from "./Header";

function AppTemplate() {
    return (
        <>
            <Router>
                <Header />

                <div>
                    <Routes>
                        <Route path="/" element={<BikeMap />} />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/list-a-ride" element={<ListRide />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default AppTemplate;
