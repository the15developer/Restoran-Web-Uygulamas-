//const mongoose = require('mongoose');

 //mongoose.connect('mongodb://localhost/mydatabase', {
 // useNewUrlParser: true,
 // useUnifiedTopology: true,
//})
 // .then(() => console.log('Connected to MongoDB'))
  //.catch((err) => console.error('Failed to connect to MongoDB', err));


  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() =>{ 
    
    console.log('Connected to MongoDB');

  })

    .catch((err) => console.error('Failed to connect to MongoDB', err));


 