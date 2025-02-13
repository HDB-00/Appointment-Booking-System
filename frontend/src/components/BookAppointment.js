import React, { Component } from "react";
import { variables } from "../variables";

export class BookAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time_slot: "",
      user_name: "",
      contact: "",
      availableSlots: [], // Stores available time slots for the selected date
    };
    this.bookClick = this.bookClick.bind(this);
  }

  // Fetch available time slots for the selected date
  fetchAvailableSlots = (selectedDate) => {
    fetch(variables.API_URL + "slots?date=" + selectedDate)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ availableSlots: data });
      })
      .catch((error) => {
        console.error("Error fetching available slots:", error);
        this.setState({ availableSlots: [] });
      });
  };

  // Handle date change
  changeDate = (e) => {
    const selectedDate = e.target.value;
    this.setState({ date: selectedDate });

    // Fetch available time slots for the selected date
    this.fetchAvailableSlots(selectedDate);
  };

  // Handle time slot change
  changeTimeSlot = (e) => {
    this.setState({ time_slot: e.target.value });
  };

  // Handle user name change
  changeUserName = (e) => {
    this.setState({ user_name: e.target.value });
  };

  // Handle contact change
  changeContact = (e) => {
    this.setState({ contact: e.target.value });
  };

  // Book an appointment
  bookClick() {
    const { date, time_slot, user_name, contact } = this.state;

    fetch(variables.API_URL + "appointments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        time_slot: time_slot,
        user_name: user_name,
        contact: contact,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Appointment booked successfully!");
          this.setState({
            date: "",
            time_slot: "",
            user_name: "",
            contact: "",
            availableSlots: [], // Reset available slots after booking
          });
        },
        (error) => {
          alert("Failed to book appointment.");
        }
      )
      .catch((error) => console.error("Error:", error));
  }

  render() {
    const { date, time_slot, user_name, contact, availableSlots } = this.state;

    return (
      <div className="container">
        <h2>Book an Appointment</h2>
        <div className="input-group mb-3">
          <span className="input-group-text">Date</span>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={this.changeDate}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Time Slot</span>
          <select
            className="form-control"
            value={time_slot}
            onChange={this.changeTimeSlot}
            disabled={!date || availableSlots.length === 0} // Disable if no date is selected or no slots are available
          >
            <option value="">Select a time slot</option>
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <option key={slot.id} value={slot.time_slot}>
                  {slot.time_slot}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No slots available
              </option>
            )}
          </select>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Your Name</span>
          <input
            type="text"
            className="form-control"
            value={user_name}
            onChange={this.changeUserName}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">Contact Info</span>
          <input
            type="text"
            className="form-control"
            value={contact}
            onChange={this.changeContact}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.bookClick}
          disabled={!date || !time_slot || !user_name || !contact} // Disable if any field is empty
        >
          Book Appointment
        </button>
      </div>
    );
  }
}
