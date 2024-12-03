import { Route, Router, Routes } from 'react-router-dom';
import AttendanceInfo from './AttendanceInfo';

function Routing() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AttendanceInfo />} />
            </Routes>
        </>
    );
}

export default Routing;
