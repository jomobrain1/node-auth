const expess = require("express");
const app = expess();
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')
const bodyParser    = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs')

// Middleware
app.use(expess.static('public'))

// database connection
mongoose.set("strictQuery", false);
const dbURI="mongodb+srv://jomobrain1:19BrainEmpire9149@cluster0.eew0u0n.mongodb.net/node-auth"

mongoose.connect(dbURI, () => {
    console.log("Connected to MongoDB auth");
});





app.use(authRoutes)

app.listen(3000, () => {
  console.log("App is running at port 3000");
});


// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});
