const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.set("strictQuery", false);
const dbURI="mongodb+srv://jomobrain1:19BrainEmpire9149@cluster0.eew0u0n.mongodb.net/node-auth"

mongoose.connect(dbURI, () => {
    console.log("Connected to MongoDB auth");

});
// const dbURI="mongodb+srv://jomobrain1:19BrainEmpire9149@cluster0.eew0u0n.mongodb.net/node-auth"
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => {
//     console.log('Connected');
   
//   })
//   .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index'));
app.get('/languages', requireAuth, (req, res) => res.render('pages/languages'));
app.use(authRoutes);
app.listen(3000, () => {
  console.log("App is running at port 3000");
});