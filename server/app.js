//import express from "express"
//import cors from "cors"
const path = require('path');
require('dotenv').config({ path: 'variables.env' });

const express = require('express');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./api/app.route.js')

require('./db');

const Reservation = require('./models/reservations');
const User = require('./models/user');




app.use(express.static(path.join(__dirname, '..', 'public')));
// In your Express.js app
// app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));



const PORT = 3000;



app.get('/hello', (req, res) => {
  res.send('Hello, World again!');
});

app.use("", router);



// app.get('/?reservationSuccess=true', (req, res) => {
//   const successBox = document.createElement('div');
//   successBox.textContent = 'Reservation made successfully.';

//   const closeButton = document.createElement('button');
//   closeButton.textContent = 'Close';
//   closeButton.addEventListener('click', function() {
//     // Hide the success message box when the close button is clicked
//     successBox.style.display = 'none';
//   });

//   successBox.appendChild(closeButton);
//   document.body.appendChild(successBox);
// });




app.use("*", (req, res) => res.status(404).json({error: "not found"}))


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running gracefully on port ${PORT}`);
});




//export default app

module.exports=app;