// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { ViewSlots } from "./components/ViewSlots";
import { BookAppointment } from "./components/BookAppointment";
import { ViewAppointments } from "./components/ViewAppointments";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter, Route, NavLink, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Appointment Booking System
        </h3>

        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            {/* Link to View Available Slots */}
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/view-slots"
              >
                View Available Slots
              </NavLink>
            </li>

            {/* Link to Book an Appointment */}
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/book-appointment"
              >
                Book an Appointment
              </NavLink>
            </li>

            {/* Link to View Booked Appointments */}
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/view-appointments"
              >
                View Booked Appointments
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/view-slots" element={<ViewSlots />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/view-appointments" element={<ViewAppointments />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
