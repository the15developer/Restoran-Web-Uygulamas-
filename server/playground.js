
const User = require('./models/user');
// Register a new user
app.post('/register', async (req, res) => {
 try {
 const { email, password } = req.body;
 
 // Check if the email is already registered
 const existingUser = await User.findOne({ email });
 if (existingUser) {
 return res.status(400).json({ error: 'Email already registered' });
 }
 
 // Create a new user
 const newUser = new User({ email, password });
 await newUser.save();
 
 res.status(201).json({ message: 'User registered successfully' });
 } catch (error) {
 console.error('Error registering user:', error);
 res.status(500).json({ error: 'An error occurred while registering the user' });
 }
});


const userSchema = new mongoose.Schema({
    name: String,
    password: String
    });

    const User = mongoose.model('User', userSchema, 'users');

    const newUser = new User({
     name: 'Mary Lee',
    password: 'thisiscrazy15'
    });

    const newUser2 = new User({
     name: 'John Lee',
     password: 'thisiscrazy12'
     });    
    



 
   newUser
   .save()
   .then(() => {
     console.log('1 New user saved to the database');
   })
   .catch((error) => {
    console.error('Failed to save 1 user to the database', error);
   });

    
   newUser2
   .save()
   .then(() => {
     console.log('1 New user saved to the database');
   })
   .catch((error) => {
    console.error('Failed to save 1 user to the database', error);
   });

