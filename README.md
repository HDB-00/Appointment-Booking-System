-------------Appointment Booking System-------------------------

This is a full-stack Appointment Booking System built using React.js for the front-end, Node.js for the back-end, and MySQL for the database. Users can view available time slots, book appointments, and manage their bookings.

-------Features-------

- View Available Time Slots:Users can view all available time slots for a specific date.

- Book an Appointment:Users can book an appointment by selecting a date, time slot, and providing their details (name and contact).

- View Booked Appointments:Users can view all their booked appointments.

- Cancel an Appointment:Users can cancel a booked appointment.

- Admin Features:Admins can add new time slots by providing a username and password (hardcoded as admin for both).

-------Tools and Technologies Used------
---Front-End---

    React.js: A JavaScript library for building user interfaces.

    Bootstrap: A CSS framework for styling the application.

    Axios: A library for making HTTP requests to the back-end.

---Back-End---

    Node.js: A JavaScript runtime for building the back-end.

    Express.js: A web framework for Node.js to create RESTful APIs.

    MySQL: A relational database management system for storing data.

---Development Tools---

    Visual Studio Code: A code editor for writing and debugging the application.

    Postman: A tool for testing API endpoints.

    Git: A version control system for managing the codebase.

-------------------Steps to Set Up and Run the Project Locally----------------------

1.  Clone the project repository to your local machine

2.  Set up the MySQL database:

    Create a database named appointment_booking_system.

    Run the following SQL queries to create the required tables:

        CREATE DATABASE appointment_booking_system;
        USE appointment_booking_system;

        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE time_slots (
            id INT AUTO_INCREMENT PRIMARY KEY,
            date DATE NOT NULL,
            time_slot TIME NOT NULL,
            is_booked BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE appointments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            date DATE NOT NULL,
            time_slot TIME NOT NULL,
            user_name VARCHAR(100) NOT NULL,
            contact VARCHAR(15) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(date, time_slot)
        );

3.  Start the back-end server

4.  Test the Application
    Open your browser and navigate to http://localhost:3000.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
