// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Database connection
// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234567890",
//   database: "appointment_booking_system", // Updated database name
//   port: 3306, // Default MySQL port
// });

// conn.connect((err) => {
//   if (err) {
//     console.error("Connection error:", err);
//   } else {
//     console.log("Connected to MySQL database!");
//   }
// });

// // ------------------- Time Slots CRUD ------------------- //

// // Get all available time slots
// app.get("/api/slots", (request, response) => {
//   const query = `SELECT * FROM time_slots WHERE is_booked = FALSE`;
//   conn.query(query, (err, rows) => {
//     if (err) {
//       console.error("Select error:", err);
//       response.status(500).json({ message: "Failed to fetch time slots" });
//     } else {
//       response.json(rows);
//     }
//   });
// });

// // Add a new time slot (Admin only)
// app.post("/api/slots", (request, response) => {
//   const query = `INSERT INTO time_slots (date, time_slot) VALUES (?, ?)`;
//   const values = [request.body.date, request.body.time_slot];

//   conn.query(query, values, (err) => {
//     if (err) {
//       console.error("Insert error:", err);
//       response.status(500).json({ message: "Failed to add time slot" });
//     } else {
//       response.json({ message: "Time slot added successfully" });
//     }
//   });
// });

// // ------------------- Appointments CRUD ------------------- //

// // Book an appointment
// app.post("/api/appointments", (request, response) => {
//   const { date, time_slot, user_name, contact } = request.body;

//   // Check if the time slot is available
//   const checkQuery = `SELECT * FROM time_slots WHERE date = ? AND time_slot = ? AND is_booked = FALSE`;
//   conn.query(checkQuery, [date, time_slot], (err, rows) => {
//     if (err) {
//       console.error("Check error:", err);
//       response
//         .status(500)
//         .json({ message: "Failed to check time slot availability" });
//     } else if (rows.length === 0) {
//       response
//         .status(400)
//         .json({ message: "Time slot is already booked or unavailable" });
//     } else {
//       // Insert the appointment
//       const insertQuery = `INSERT INTO appointments (date, time_slot, user_name, contact) VALUES (?, ?, ?, ?)`;
//       conn.query(insertQuery, [date, time_slot, user_name, contact], (err) => {
//         if (err) {
//           console.error("Insert error:", err);
//           response.status(500).json({ message: "Failed to book appointment" });
//         } else {
//           // Mark the time slot as booked
//           const updateQuery = `UPDATE time_slots SET is_booked = TRUE WHERE date = ? AND time_slot = ?`;
//           conn.query(updateQuery, [date, time_slot], (err) => {
//             if (err) {
//               console.error("Update error:", err);
//               response
//                 .status(500)
//                 .json({ message: "Failed to update time slot" });
//             } else {
//               response.json({ message: "Appointment booked successfully" });
//             }
//           });
//         }
//       });
//     }
//   });
// });

// // Get all booked appointments
// app.get("/api/appointments", (request, response) => {
//   const query = `SELECT * FROM appointments`;
//   conn.query(query, (err, rows) => {
//     if (err) {
//       console.error("Select error:", err);
//       response.status(500).json({ message: "Failed to fetch appointments" });
//     } else {
//       response.json(rows);
//     }
//   });
// });

// // Cancel an appointment
// app.delete("/api/appointments/:id", (request, response) => {
//   const appointmentId = request.params.id;

//   const getQuery = `SELECT date, time_slot FROM appointments WHERE id = ?`;
//   conn.query(getQuery, [appointmentId], (err, rows) => {
//     if (err) {
//       console.error("Select error:", err);
//       response
//         .status(500)
//         .json({ message: "Failed to fetch appointment details" });
//     } else if (rows.length === 0) {
//       response.status(404).json({ message: "Appointment not found" });
//     } else {
//       const { date, time_slot } = rows[0];
//       const deleteQuery = `DELETE FROM appointments WHERE id = ?`;
//       conn.query(deleteQuery, [appointmentId], (err) => {
//         if (err) {
//           console.error("Delete error:", err);
//           response
//             .status(500)
//             .json({ message: "Failed to cancel appointment" });
//         } else {
//           const updateQuery = `UPDATE time_slots SET is_booked = FALSE WHERE date = ? AND time_slot = ?`;
//           conn.query(updateQuery, [date, time_slot], (err) => {
//             if (err) {
//               console.error("Update error:", err);
//               response
//                 .status(500)
//                 .json({ message: "Failed to update time slot" });
//             } else {
//               response.json({ message: "Appointment canceled successfully" });
//             }
//           });
//         }
//       });
//     }
//   });
// });

// const PORT = 49146;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = conn;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234567890",
  database: "appointment_booking_system", // Updated database name
  port: 3306, // Default MySQL port
});

conn.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// ------------------- Time Slots CRUD ------------------- //

// Get all available time slots
app.get("/api/slots", (request, response) => {
  const query = `SELECT * FROM time_slots WHERE is_booked = FALSE`;
  conn.query(query, (err, rows) => {
    if (err) {
      console.error("Select error:", err);
      response.status(500).json({ message: "Failed to fetch time slots" });
    } else {
      response.json(rows);
    }
  });
});

// Get available time slots for a specific date
app.get("/api/slots", (request, response) => {
  const { date } = request.query; // Get the date from query parameters

  if (!date) {
    return response.status(400).json({ message: "Date parameter is required" });
  }

  const query = `SELECT * FROM time_slots WHERE date = ? AND is_booked = FALSE`;
  conn.query(query, [date], (err, rows) => {
    if (err) {
      console.error("Select error:", err);
      response.status(500).json({ message: "Failed to fetch time slots" });
    } else {
      response.json(rows);
    }
  });
});

// Add a new time slot (Admin only)
app.post("/api/slots", (request, response) => {
  const query = `INSERT INTO time_slots (date, time_slot) VALUES (?, ?)`;
  const values = [request.body.date, request.body.time_slot];

  conn.query(query, values, (err) => {
    if (err) {
      console.error("Insert error:", err);
      response.status(500).json({ message: "Failed to add time slot" });
    } else {
      response.json({ message: "Time slot added successfully" });
    }
  });
});

// ------------------- Appointments CRUD ------------------- //

// Book an appointment
app.post("/api/appointments", (request, response) => {
  const { date, time_slot, user_name, contact } = request.body;

  // Check if the time slot is available
  const checkQuery = `SELECT * FROM time_slots WHERE date = ? AND time_slot = ? AND is_booked = FALSE`;
  conn.query(checkQuery, [date, time_slot], (err, rows) => {
    if (err) {
      console.error("Check error:", err);
      response
        .status(500)
        .json({ message: "Failed to check time slot availability" });
    } else if (rows.length === 0) {
      response
        .status(400)
        .json({ message: "Time slot is already booked or unavailable" });
    } else {
      // Insert the appointment
      const insertQuery = `INSERT INTO appointments (date, time_slot, user_name, contact) VALUES (?, ?, ?, ?)`;
      conn.query(insertQuery, [date, time_slot, user_name, contact], (err) => {
        if (err) {
          console.error("Insert error:", err);
          response.status(500).json({ message: "Failed to book appointment" });
        } else {
          // Mark the time slot as booked
          const updateQuery = `UPDATE time_slots SET is_booked = TRUE WHERE date = ? AND time_slot = ?`;
          conn.query(updateQuery, [date, time_slot], (err) => {
            if (err) {
              console.error("Update error:", err);
              response
                .status(500)
                .json({ message: "Failed to update time slot" });
            } else {
              response.json({ message: "Appointment booked successfully" });
            }
          });
        }
      });
    }
  });
});

// Get all booked appointments
app.get("/api/appointments", (request, response) => {
  const query = `SELECT * FROM appointments`;
  conn.query(query, (err, rows) => {
    if (err) {
      console.error("Select error:", err);
      response.status(500).json({ message: "Failed to fetch appointments" });
    } else {
      response.json(rows);
    }
  });
});

// Cancel an appointment
app.delete("/api/appointments/:id", (request, response) => {
  const appointmentId = request.params.id;

  const getQuery = `SELECT date, time_slot FROM appointments WHERE id = ?`;
  conn.query(getQuery, [appointmentId], (err, rows) => {
    if (err) {
      console.error("Select error:", err);
      response
        .status(500)
        .json({ message: "Failed to fetch appointment details" });
    } else if (rows.length === 0) {
      response.status(404).json({ message: "Appointment not found" });
    } else {
      const { date, time_slot } = rows[0];
      const deleteQuery = `DELETE FROM appointments WHERE id = ?`;
      conn.query(deleteQuery, [appointmentId], (err) => {
        if (err) {
          console.error("Delete error:", err);
          response
            .status(500)
            .json({ message: "Failed to cancel appointment" });
        } else {
          const updateQuery = `UPDATE time_slots SET is_booked = FALSE WHERE date = ? AND time_slot = ?`;
          conn.query(updateQuery, [date, time_slot], (err) => {
            if (err) {
              console.error("Update error:", err);
              response
                .status(500)
                .json({ message: "Failed to update time slot" });
            } else {
              response.json({ message: "Appointment canceled successfully" });
            }
          });
        }
      });
    }
  });
});

const PORT = 49146;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = conn;
