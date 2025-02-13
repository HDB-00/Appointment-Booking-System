import React, { Component } from "react";
import { variables } from "../variables";

export class ViewAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  refreshList() {
    fetch(variables.API_URL + "appointments")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ appointments: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  cancelClick = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      fetch(variables.API_URL + "appointments/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          alert(result.message);
          this.refreshList();
        })
        .catch((error) => {
          alert("Failed to cancel appointment.");
          console.error("Error:", error);
        });
    }
  };

  render() {
    const { appointments } = this.state;
    return (
      <div className="container">
        <h2>Booked Appointments</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time Slot</th>
              <th>User Name</th>
              <th>Contact</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.date}</td>
                <td>{appointment.time_slot}</td>
                <td>{appointment.user_name}</td>
                <td>{appointment.contact}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.cancelClick(appointment.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
