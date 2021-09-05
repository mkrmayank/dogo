const express = require('express')
const app = express()

const firebase = require('firebase')

//environment
const dotenv = require('dotenv')

// for reading html files
const fs = require('fs')

//importing body-parser shows body data
const bodyParser = require('body-parser')

//Morgan middleware
const morgan = require('morgan')
const PORT = process.env.PORT || 3000

const firebaseConfig = {
    apiKey: "AIzaSyClCkt5_uNoUOUOlhpgbLo8frkv9FZCoKM",
    authDomain: "dogo-web-app.firebaseapp.com",
    projectId: "dogo-web-app",
    storageBucket: "dogo-web-app.appspot.com",
    messagingSenderId: "75768811786",
    appId: "1:75768811786:web:57acfc9dd19e9d21c56af3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//-------------------------------------------------------------------


dotenv.config({path : './config/config.env' })

// using body-parser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//using Morgan as middleware
app.use(morgan('combined'))
//It will give the log report for every api called

//importing routes form routes
const routes = require ('./routes/pets')
//use routes
app.use('/api/pets', routes)





//----------------------------------------PAGES--------------------------


app.get('/', ((req,res)=>{
    fs.readFile('./pages/home.html' , (err,data)=>{
        res.end(data);
    })
    
}))

app.get('/about', ((req,res)=>{
    fs.readFile('./pages/about.html' , (err,data)=>{
        res.end(data)
    })
}))

app.get('/services', ((req,res)=>{
    fs.readFile('./pages/services.html' , (err,data)=>{
        res.end(data)
    })
}))

app.get('/details', ((req,res)=>{
    fs.readFile('./pages/details.html' , (err,data)=>{
        res.end(data)
    })
}))

app.listen(PORT, ()=>{
    console.log('App is running on port '+PORT)
});