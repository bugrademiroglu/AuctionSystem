const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');
const Auction = require('../models/Auction');
const { now } = require('mongoose');
const io = require('socket.io-client');
const { use } = require('./users');
socket = io.connect('http://localhost:8000')
let newData = []
let auctionData = []

router.get('/', forwardAuthenticated, (req, res) => res.render('giris'));

router.get('/main', ensureAuthenticated, (req, res) =>
  res.render('main', {
    user: req.user
  })
);

socket.on('output-messages', data => {
    console.log("output messages: ",data)
    
})
socket.on('message', data => {
  console.log("data: ",data)
 
})
router.get('/vaccine', ensureAuthenticated, (req, res) =>
Auction.find({},(err,result)=> {
  if (err) {
    console.log("error: ",err)
  }
  else {

    
  res.render('vaccine', {
    user: req.user,
    result: result,
    length : result.length,
 
  })
    
  }
})

  
  
);

router.get('/profile', ensureAuthenticated, (req, res,next) =>

Auction.find({username: req.user.name},(err,result)=> {
  if (err) {
    console.log("error: ",err)
  }
  else {

    
  res.render('profile', {
    user: req.user,
    result: result,
    length : result.length,
    username: req.user.name
 
  })
    
    
  }
})

);
  



router.get('/profile', ensureAuthenticated, (req, res) =>


  res.render('profile',{
    user: req.user,
    username: req.user.name,
    auction : auctionData

    
  },
)
  
);

router.get('/auction', ensureAuthenticated, (req, res) =>
  
  res.render('auction',{
    user: req.user,
    username: req.user.name,
    
    
  })

  
);
router.post('/auction', (req, res) => {
  const {vaccine_name, price, time } = req.body;
  var arr = [req.user.name,vaccine_name,price,time]
  let errors = [];

  if (!vaccine_name || !price || !time) {

    errors.push({ msg: 'Please enter all fields' });
  }
  socket.emit('chatmessage',(arr))

  
  res.redirect('/vaccine');





});



/*
function appendMessages(data) {
  
  
 /* 
  <div class="card">
            <img src="http://anmoltimes.com/wp-content/uploads/2020/08/vaccine-3-300x184.jpg" alt="Avatar" style="width:100%">
            <div class="container">
               
                <h4><b>Vaccine Name: <%= result[i].vaccinename %></b></h4>
                <h4><b>Vaccine Price: <%= result[i].price %></b></h4>
                <h4><b>Vaccine Time: <%= result[i].time %></b><b>
                    <%= 00 %>
                </b></h4>
                <p>Product Owner: <%= result[i].username%></p>
            </div>
          </div>
        <% } %>
        */
    /*
    var divCard = document.createElement('div');
    var img = document.createElement('img')
    var divContainer = document.createElement('div');
    var h4name = document.createElement('h4')
    var h4price = document.createElement('h4')
    var h4time = document.createElement('h4')
    var p = document.createElement('p')

    divCard.className = 'card';
    divContainer.className = 'container';
    img.src = "http://anmoltimes.com/wp-content/uploads/2020/08/vaccine-3-300x184.jpg"
    img.alt = "Avatar"
    img.style = "width:100%"
    
    h4name.innerHTML = "Vaccine Name: " + data[1]
    h4price.innerHTML = "Vaccine Price: " + data[2]
    h4time.innerHTML = "Vaccine Time: " + data[3]
    p.innerHTML = "Product Owner: " + data[0]
    divContainer.appendChild(h4name)
    divContainer.appendChild(h4price)
    divContainer.appendChild(h4time)
    divContainer.appendChild(p)
    divCard.appendChild(img)
    divCard.appendChild(divContainer)
    
    
    body.appendChild(div);

}
*/
module.exports = router;