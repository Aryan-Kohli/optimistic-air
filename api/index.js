const mongoose = require('mongoose');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const User = require("./Models/UserModel");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
dotenv.config();
const jwtsecret = "nosecret";
app.use(express.json());
const bcryptsalt = bcrypt.genSaltSync(10);


app.use(cookieParser());
mongoose.connect(process.env.MONGO_URL);
app.use(cors({
    credentials: true,
    origin:  "https://optimistic-air.netlify.app"
    // origin: "http://localhost:5173"
}));

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Origin', 'https://optimistic-air.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


app.post('/register',async (req,resp)=>{
    const {firstname,
        lastname,
        email,
        location,
        phoneno,
        password,
        age,}= req.body;
    const userdoc = await User.create({
        // name,email,password : bcrypt.hashSync(password,bcryptsalt)
        firstname,
        lastname,
        email,
        location,
        phoneno,
        password : bcrypt.hashSync(password,bcryptsalt) ,
        age,
        prevresults:[]
    })
    resp.json(userdoc);
})
app.post('/login',async (req,resp)=>{
    const {email,password}=req.body;
    try{

        const userdoc = await  User.findOne({email:req.body.email});
        console.log(req.body);
    if(userdoc)
    {
        const comp_pass = bcrypt.compareSync(password,userdoc.password);
        if(comp_pass)
        {
            jwt.sign({firstname:userdoc.firstname,lastname:userdoc.lastname,email:userdoc.email,location:userdoc.location,id:userdoc._id,prevresults:[]},jwtsecret,{},(err,token)=>{
                if(err) throw err;
                resp.cookie('token',token).json(userdoc);
            })
        }
        else{
            resp.status.apply(400).json("password is wrong");
        }
    }
    else{
        resp.status(400).json("register first");
    }
}
catch(e)
{
      console.error(err);
    resp.status(500).json("Internal Server Error");
}
})
app.get('/check',(req,resp)=>{
    const {token}=req.cookies;
    console.log("all god");
    resp.json("all good");
})
app.get('/profile',(req,resp)=>{
    const {token}=req.cookies;
    if(token)
    {
            jwt.verify(token,jwtsecret,{},async (err,user)=>{
                if(err) throw err;
                const Userdoc = await User.findById(user.id);
                resp.json(Userdoc);
            })
    }
    else{
        resp.json(null);
    }
    // resp.json("gbhkj");
})
app.post('/logout',(req,resp)=>{
    resp.cookie('token','').json(true);
})
app.put('/upload', async (req, resp) => {
    console.log("at backend upload function");
  const { token } = req.cookies;
  if (token) {
    const { emotiondata, percentage } = req.body;
    jwt.verify(token, jwtsecret, {}, async (err, user) => {
      if (err) throw err;
      const Userdoc = await User.findById(user.id);
        console.log("evjk");
      
        // Create a new result object using the data
        const newResult = {
            audio: percentage,
            video: emotiondata,
        };
        console.log("evjk2");

      // Add the new result object to the prevresults array
      Userdoc.prevresults.push(newResult);
          console.log("evjk3");
      // Save the user document with the updated prevresults array
      await Userdoc.save();
      console.log("result uploaded");
      resp.json("Results uploaded successfully");
    });
} else {
      console.log("result not uploaded");
    resp.json("Unable to upload results");
  }
});
app.get('/allresults',(req,resp)=>{
    console.log("At all results function");
    const {token} = req.cookies;
    if(token)
    {
        jwt.verify(token, jwtsecret, {}, async (err, user) => {
      if (err) throw err;
      const Userdoc = await User.findById(user.id);
       const prevresults = Userdoc.prevresults;
       console.log("sende sucessfully prev results");
       resp.json(prevresults);
    });
    }
    else{
        resp.send([]);
    }
})

app.listen(process.env.PORT,(req,resp)=>{
    console.log("Successfuly  hosted on port " , process.env.PORT);
});