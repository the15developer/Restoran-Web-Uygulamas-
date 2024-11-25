const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username : String,
    date: Date,
    hour: Number,
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    },
  },{
   collection: 'reservations',
   timestamps: true
  });

const Reservation = mongoose.model('Reservation', reservationSchema);



module.exports = Reservation;


