// import React, { Component } from "react";
// import { variables } from "../variables";

// export class ViewSlots extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       slots: [], // Initialize slots as an empty array
//       selectedDate: "", // Store the selected date
//     };
//   }

//   // Handle date input change
//   handleDateChange = (e) => {
//     this.setState({ selectedDate: e.target.value });
//   };

//   // Fetch available time slots for the selected date
//   fetchAvailableSlots = () => {
//     const { selectedDate } = this.state;

//     if (!selectedDate) {
//       alert("Please select a date.");
//       return;
//     }

//     fetch(`${variables.API_URL}slots?date=${selectedDate}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Ensure data is an array
//         const slots = Array.isArray(data) ? data : [];

//         // Filter out booked slots (is_booked = FALSE)
//         const availableSlots = slots.filter((slot) => !slot.is_booked);

//         this.setState({ slots: availableSlots });
//       })
//       .catch((error) => {
//         console.error("Error fetching slots:", error);
//         this.setState({ slots: [] }); // Set slots to an empty array in case of error
//       });
//   };

//   render() {
//     const { slots, selectedDate } = this.state;
//     return (
//       <div className="container">
//         <h2>Available Time Slots</h2>

//         {/* Date Input Field */}
//         <div className="mb-3">
//           <label htmlFor="dateInput" className="form-label">
//             Select Date:
//           </label>
//           <input
//             type="date"
//             className="form-control"
//             id="dateInput"
//             value={selectedDate}
//             onChange={this.handleDateChange}
//           />
//         </div>

//         {/* Button to Fetch Available Slots */}
//         <button
//           className="btn btn-primary mb-3"
//           onClick={this.fetchAvailableSlots}
//         >
//           Check Available Slots
//         </button>

//         {/* Table to Display Available Slots */}
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Time Slot</th>
//             </tr>
//           </thead>
//           <tbody>
//             {slots.map((slot) => (
//               <tr key={slot.id}>
//                 <td>{slot.date}</td>
//                 <td>{slot.time_slot}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import { variables } from "../variables";

export class ViewSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slots: [], // Initialize slots as an empty array
      selectedDate: "", // Store the selected date
      showAddSlotModal: false, // Control the visibility of the add slot modal
      username: "", // Store the username input
      password: "", // Store the password input
      newDate: "", // Store the new slot date
      newTimeSlot: "", // Store the new slot time
    };
  }

  // Handle date input change
  handleDateChange = (e) => {
    this.setState({ selectedDate: e.target.value });
  };

  // Fetch available time slots for the selected date
  fetchAvailableSlots = () => {
    const { selectedDate } = this.state;

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    fetch(`${variables.API_URL}slots?date=${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is an array
        const slots = Array.isArray(data) ? data : [];

        // Filter out booked slots (is_booked = FALSE)
        const availableSlots = slots.filter((slot) => !slot.is_booked);

        this.setState({ slots: availableSlots });
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
        this.setState({ slots: [] }); // Set slots to an empty array in case of error
      });
  };

  // Open the add slot modal
  openAddSlotModal = () => {
    this.setState({ showAddSlotModal: true });
  };

  // Close the add slot modal
  closeAddSlotModal = () => {
    this.setState({
      showAddSlotModal: false,
      username: "",
      password: "",
      newDate: "",
      newTimeSlot: "",
    });
  };

  // Handle input changes for the add slot modal
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Handle add slot form submission
  handleAddSlot = () => {
    const { username, password, newDate, newTimeSlot } = this.state;

    // Hardcoded credentials
    const adminUsername = "admin";
    const adminPassword = "admin";

    // Validate credentials
    if (username !== adminUsername || password !== adminPassword) {
      alert("Invalid username or password.");
      return;
    }

    // Validate date and time slot
    if (!newDate || !newTimeSlot) {
      alert("Please fill in all fields.");
      return;
    }

    // Submit the new time slot to the back-end
    fetch(variables.API_URL + "slots", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: newDate,
        time_slot: newTimeSlot,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert("Time slot added successfully!");
        this.closeAddSlotModal();
        this.fetchAvailableSlots(); // Refresh the list of available slots
      })
      .catch((error) => {
        console.error("Error adding time slot:", error);
        alert("Failed to add time slot.");
      });
  };

  render() {
    const {
      slots,
      selectedDate,
      showAddSlotModal,
      username,
      password,
      newDate,
      newTimeSlot,
    } = this.state;

    return (
      <div className="container">
        <h2>Available Time Slots</h2>

        {/* Date Input Field */}
        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">
            Select Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="dateInput"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        {/* Button to Fetch Available Slots */}
        <button
          className="btn btn-primary mb-3 me-2"
          onClick={this.fetchAvailableSlots}
        >
          Check Available Slots
        </button>

        {/* Button to Open Add Slot Modal */}
        <button
          className="btn btn-success mb-3"
          onClick={this.openAddSlotModal}
        >
          Add Slot
        </button>

        {/* Table to Display Available Slots */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.date}</td>
                <td>{slot.time_slot}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Slot Modal */}
        {showAddSlotModal && (
          <div
            className="modal"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Time Slot</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={this.closeAddSlotModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Username and Password Fields */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={username}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  {/* Date and Time Slot Fields */}
                  <div className="mb-3">
                    <label htmlFor="newDate" className="form-label">
                      Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="newDate"
                      name="newDate"
                      value={newDate}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newTimeSlot" className="form-label">
                      Time Slot:
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="newTimeSlot"
                      name="newTimeSlot"
                      value={newTimeSlot}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.closeAddSlotModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleAddSlot}
                  >
                    Add Slot
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
