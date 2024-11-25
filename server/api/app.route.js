const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const router = express.Router();

    
const Reservation = require('../models/reservations');
const User = require('../models/user');
const chefReview = require('../models/chef-review');
const food = require('../models/foods');
const Photo = require('../models/photo');
const PhotosSelected = require('../models/photos-selected');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/Danny/OneDrive - ktun.edu.tr/Documents/Visual Studio 2017/Proje/Okul proje websitem/public/uploads/'); // Use the full absolute path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


router.get('/', (req, res) => {
    //res.send('Hello !');
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'anasayfa.html'));
  });


router.get('/about', (req, res) => {
    
   res.sendFile(path.join(__dirname,'..', '..', 'public', 'about.html'));
  });

router.get('/menu', (req, res) => {
    //res.send('Hello, World! I am currently making a web app !');
    res.sendFile(path.join(__dirname,'..', '..', 'public', 'menu.html'));
  });

router.get('/events', (req, res) => {
    //res.send('Hello, World! I am currently making a web app !');
    res.sendFile(path.join(__dirname,'..','..', 'public', 'events.html'));
  });
  
router.get('/gallery', (req, res) => {
    //res.send('Hello, World! I am currently making a web app !');
    res.sendFile(path.join(__dirname,'..','..', 'public', 'gallery.html'));
  });
  
router.get('/chefs', (req, res) => {
    //res.send('Hello, World! I am currently making a web app !');
    res.sendFile(path.join(__dirname,'..','..', 'public', 'chefs.html'));
  });
  
router.get('/contact', (req, res) => {
    //res.send('Hello, World! I am currently making a web app !');
    res.sendFile(path.join(__dirname,'..','..', 'public', 'contact.html'));
  });

router.get('/reservations', (req, res) => {
    //res.send('Hello, World! I am currently making a web app !');
    res.sendFile(path.join(__dirname,'..','..', 'public', 'reservations.html'));
  });
  


router.post('/auth/register', async (req, res) =>{
    
    const { username, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          console.log('Submitted form data:', req.body);
          console.log('User already exists !');
          return res.status(400).json({ error: 'Username already exists' });
        }

         
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
       
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        console.log('Submitted form data:', req.body);
        console.log('User registered successfully');
      
        
      } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
      }
});

router.post('/auth/login', async (req, res) =>{
  
  const { username_l, password_l } = req.body;

  try {
  
    const user = await User.findOne({ username: username_l });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log('user found!');

    
    const isPasswordValid = await bcrypt.compare(password_l, user.password);

    if (!isPasswordValid) {
      console.log("invalid password !");
      return res.status(401).json({ error: 'Invalid username or password' });
      
    }

    console.log('and also, paswword is correct !');

   
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful!');
    console.log('Received token:', token);


    res.json({ token, username: user.username, role: user.role });

   

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }

});



router.post('/auth/login/admin', async (req, res) =>{
 
  const { username_la, password_la } = req.body;

  try {
   
    const user = await User.findOne({ username: username_la });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log('user found!');

    
    const isPasswordValid = await bcrypt.compare(password_la, user.password);

    if (!isPasswordValid) {
      console.log("invalid password !");
      return res.status(401).json({ error: 'Invalid username or password' });
      
    }

    console.log('and also, password is correct !');

    if (user.role === 'user') {
      return res.status(403).json({ error: 'Access denied. Only admin users can log in.' });
    }

   
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful!');
    console.log('Received token:', token);

    
    res.json({ token, username: user.username, role: user.role });

   

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }

});




router.post('/submitReservation', (req, res) => {

  const { name_res, surname_res, username_res, date_res, hour_res } = req.body;

    const newReservation = new Reservation({
      name: name_res,
      surname: surname_res,
      username: username_res,
      date: date_res,
      hour: hour_res,
    });
  
    
    newReservation.save()
      .then(() => {
        console.log('Submitted form data:', req.body);
        console.log('Reservation saved successfully');
        res.redirect('/?reservationSuccess=true');
        
      })
      .catch((error) => {
        res.status(500).send('Error saving reservation');
      });
  });
  
  
  router.get('/show-reservations', async (req, res) => {
    const { username } = req.query;
  
    console.log("request for retrieving reservations made!");
    try {
      const reservations = await Reservation.find({ username });
      res.json(reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).json({ error: 'Error fetching reservations' });
    }
  });
  

router.post('/reviews/addReview', async (req, res) => {
    try {
      const { username, chefID, rating, comment } = req.body;
  
      const newReview = new chefReview({
        username,
        chefID,
        rating,
        comment,
      });
  
      console.log('review kaydedilmek uzere');
      
      await newReview.save();

      console.log('review kaydedildi');
  
      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      
      console.error('Error saving review:', error);
      res.status(500).json({ error: 'Error saving review' });
    }
  });


  router.get('/reviews/:chefId', async (req, res) => {
    try {
      const chefId = req.params.chefId;
      console.log(chefId);
      const reviews = await chefReview.find({ chefID: chefId });
      console.log('reviews found !');

      if (reviews.length === 0) {
       
        res.status(404).json({ message: `No reviews found for chef with ID ${chefId}` });
      }
      else{
      res.json(reviews);
      }
      
    } catch (error) {
      console.error('Error retrieving reviews:', error);
      res.status(500).json({ error: 'Error retrieving reviews' });
    }
  });
  

  router.delete('/reviews/:id', async (req, res) => {
    try {
      console.log('the delete request was made!');
      const reviewId = req.params.id;
      const result = await chefReview.deleteOne({ _id: reviewId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the review' });
    }
  });
  
  

router.get('/admin-dashboard', async (req, res) => {
  try {
      res.sendFile(path.join(__dirname, '..', '..', 'public', 'admin_dashboard.html'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while checking user role' });
  }
});





router.post('/users', (req, res) =>{
    //create a new user
    res.send('User created succesfully');
});



router.get('/admin-dashboard/reservations', async (req, res) => {
  try {
    
    const reservations = await Reservation.find();

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'An error occurred while fetching reservations' });
  }
});


router.delete('/admin-dashboard/reservations/:id', async (req, res) => {
  try {
    console.log('the delete request was made!');
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ error: 'An error occurred while deleting the reservation' });
  }
});

router.patch('/admin-dashboard/reservations/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    reservation.status = status;
    await reservation.save();

    res.json(reservation);
  } catch (error) {
    console.error('Error updating reservation status:', error);
    res.status(500).json({ error: 'Error updating reservation status' });
  }
});


router.post('/admin-dashboard/reservations/addReservation', async (req, res) => {
  const { name, surname, username, date, hour } = req.body;
  
  
  
  const newReservation = new Reservation({
    name,
    surname,
    username,
    date,
    hour
  });

 
  newReservation.save()
    .then(() => {
      console.log('Submitted form data:', req.body);
      console.log('Reservation saved successfully');
      res.status(200).send("Reservation saved !"); 
      
    })
    .catch((error) => {
      res.status(500).send('Error saving reservation');
    });

});

router.get('/admin-dashboard/menu', async (req, res) => {
  try {
   
    const foods = await food.find();

   
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'An error occurred while fetching foods' });
  }
});

router.get('/menu/displayFoods', async (req, res) => {
  try {

    const foods = await food.find();

    
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'An error occurred while fetching foods' });
  }
});


router.post('/admin-dashboard/menu/addFood', async (req, res) => {
  const { name, price, category } = req.body;
  
  
  const newFood = new food({
    name,
    price,
    category
  });

  
  newFood.save()
    .then(() => {
      console.log('Submitted form data:', req.body);
      console.log('Food saved successfully');
      res.status(200).json({ message: 'Food saved!' }); 
      
    })
    .catch((error) => {
      res.status(500).send('Error saving food');
    });

});

router.delete('/admin-dashboard/menu/:id', async (req, res) => {
  try {
    console.log('the delete request was made!');
    const { id } = req.params;
    const deletedFood = await food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ error: 'Food not found' });
    }

    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ error: 'An error occurred while deleting the food' });
  }
});


router.put('/admin-dashboard/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

  
    const updatedFood = await food.findByIdAndUpdate(
      id,
      { name, price },
      { new: true, runValidators: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/admin-dashboard/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error: error.message });
  }
});



router.delete('/admin-dashboard/delete-selected-photos', async (req, res) => {
  try {
    console.log('Request received at /admin-dashboard/delete-selected-photos');

    await PhotosSelected.deleteMany({});

    console.log('Deleted all records in the PhotosSelected collection');
    res.status(200).send('All selected photos deleted from the database');
  } catch (error) {
    console.error('Error deleting selected photos:', error);
    res.status(500).send('Error deleting selected photos');
  }
});


router.post('/admin-dashboard/save-selected-photos', async (req, res) => {
  try {
    console.log('Request received at /admin-dashboard/save-selected-photos');
    const newPhotoSelectedRecords = req.body;


    await PhotosSelected.create(newPhotoSelectedRecords);

    console.log('Created new records');
    res.status(200).send('Selected photos saved to the database');
  } catch (error) {
    console.error('Error saving selected photos:', error);
    res.status(500).send('Error saving selected photos');
  }
});


router.get('/admin-dashboard/get-selected-photos', async (req, res) => {
  try {
    console.log('Request received at /admin-dashboard/get-selected-photos');

    
    const photosSelectedData = await PhotosSelected.find({}, { _id: 0 });

    res.status(200).json(photosSelectedData);
  } catch (error) {
    console.error('Error fetching selected photos:', error);
    res.status(500).send('Error fetching selected photos');
  }
});

router.put('/admin-dashboard/menu/:foodId/image', upload.single('image'), async (req, res) => {
  const foodId = req.params.foodId;

  console.log("request for updating food image was made !");

  try {
    
    const updatedFood = await food.findByIdAndUpdate(foodId, { imageUrl: req.file.path }, { new: true });

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({ message: 'Image URL updated successfully', updatedFood });
  } catch (error) {
    console.error('Error updating image URL:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;