// Init
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const socket = require('socket.io')
const Auction = require('./models/Auction');
const app = express()
require('./config/passport')(passport);
const db = require('./config/keys').mongoURI;
const router = require('./routes/main');


// Creating the server and connecting to the database
var server = require('http').createServer(app);
mongoose.connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('Connected Database'))
  .catch(err => console.log(err));

// Init view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use("/static", express.static('./static/'));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
app.use(passport.initialize());
app.use(passport.session());


// Initializing the routes
app.use('/', require('./routes/main.js'));
app.use('/users', require('./routes/users.js'));

var server = server.listen(8000, function(){
  console.log("Listenin to the server on 8000")
})

//Socket connection
var io = socket(server)



io.on('connection', (socket) => {
  socket.on('deleteVaccine',(data) => {
    
    if (data.includes("Vaccine")) {
      data = data.slice(13)
 
   }
   console.log('deleteVaccine Name: ',data)
   Auction.deleteOne({'vaccinename':data}).then(result => {
    console.log('Deleted.')
    
    
})

  })
  socket.on("vaccineNameData",(data) => {

  var counter = 120;
  var WinnerCountdown = setInterval(function(){
    
 
    io.sockets.emit('counter2', counter);
    counter--
    if (counter === 0) {
      io.sockets.emit('counter2', "The vaccine has expired and will be removed from the list soon.");
      clearInterval(WinnerCountdown);
    }
  }, 1000);



  })
  

  


  Auction.find().then(result => {
    socket.emit('output-messages', result)
    console.log("Result: ",result)
    
    
})
  socket.on('remainingTime',(data) => {
    console.log('remaining data:',data)
    newData = data.trim()
   
    
      socket.emit('remainingFromServer',newData)
 
  
   console.log('NEW DATA:',newData)
  })

  console.log('a user connected');

  socket.on('chatmessage', (data) => {

    console.log("app.js den gelen data: ",data)
  
    const newAuction = new Auction({
      username: data[0],
      vaccinename: data[1],
      price : data[2],
      time : data[3]
    })
    newAuction.save().then(() => {
          io.emit('message', {data})
          console.log("message: ",data)
          
      })


  })


  //
socket.on('button1sum', (data) => {

  console.log("app.js den gelen data button1: ",data)
  let vaccineNameString = data[0].slice(13);
  let lastBidderString = data[2]
  if (lastBidderString.includes("Last")) {
     lastBidderString = data[2].slice(12)

  }
  else if (lastBidderString.includes("Your")) {
    lastBidderString = data[2].slice(10)

 }
  else {
     lastBidderString = data[2]
  }
  
  console.log("lastbidderString: ",lastBidderString)
  console.log('vaccineNameString: ',vaccineNameString)
  Auction.updateOne({vaccinename:vaccineNameString}, {$set:{price:data[1]}}, function(err, result) {
    if (err)
        console.log('error: ',err)
}).then(() => {
  let outputArray = [data[1],lastBidderString]
  io.emit('button1sumoutput',{data:outputArray})
  io.emit('updateMessage',{data:lastBidderString})
  
})


})
  
//

socket.on('button2sum', (data) => {

  console.log("app.js den gelen data button2: ",data)
  let vaccineNameString = data[0].slice(13);
  let lastBidderString = data[2]
  if (lastBidderString.includes("Last")) {
     lastBidderString = data[2].slice(12)

  }
  else if (lastBidderString.includes("Your")) {
    lastBidderString = data[2].slice(10)

 }
  else {
     lastBidderString = data[2]
  }
  
  console.log("lastbidderString: ",lastBidderString)
  console.log('vaccineNameString: ',vaccineNameString)
  Auction.updateOne({vaccinename:vaccineNameString}, {$set:{price:data[1]}}, function(err, result) {
    if (err)
        console.log('error: ',err)
}).then(() => {
  let outputArray = [data[1],lastBidderString]
  io.emit('button2sumoutput',{data:outputArray})
  io.emit('updateMessage',{data:lastBidderString})
})

})
  
//

socket.on('button3sum', (data) => {

  console.log("app.js den gelen data button3: ",data)
  let vaccineNameString = data[0].slice(13);
  let lastBidderString = data[2]
  if (lastBidderString.includes("Last")) {
     lastBidderString = data[2].slice(12)

  }
  else if (lastBidderString.includes("Your")) {
    lastBidderString = data[2].slice(10)

 }
  else {
     lastBidderString = data[2]
  }
  
  console.log("lastbidderString: ",lastBidderString)
  console.log('vaccineNameString: ',vaccineNameString)
  Auction.updateOne({vaccinename:vaccineNameString}, {$set:{price:data[1]}}, function(err, result) {
    if (err)
        console.log('error: ',err)
}).then(() => {
  let outputArray = [data[1],lastBidderString]
  io.emit('button3sumoutput',{data:outputArray})
  io.emit('updateMessage',{data:lastBidderString})
})


})
  
//

socket.on('button4sum', (data) => {

  console.log("app.js den gelen data button4: ",data)
  let vaccineNameString = data[0].slice(13);
  let lastBidderString = data[2]
  if (lastBidderString.includes("Last")) {
     lastBidderString = data[2].slice(12)

  }
  else if (lastBidderString.includes("Your")) {
    lastBidderString = data[2].slice(10)

 }
  else {
     lastBidderString = data[2]
  }
  
  console.log("lastbidderString: ",lastBidderString)
  console.log('vaccineNameString: ',vaccineNameString)
  Auction.updateOne({vaccinename:vaccineNameString}, {$set:{price:data[1]}}, function(err, result) {
    if (err)
        console.log('error: ',err)
}).then(() => {
  let outputArray = [data[1],lastBidderString]
  io.emit('button4sumoutput',{data:outputArray})
  io.emit('updateMessage',{data:lastBidderString})
})

})
  
//

socket.on('button5sum', (data) => {

  console.log("app.js den gelen data button5: ",data)
  let vaccineNameString = data[0].slice(13);
  let lastBidderString = data[2]
  if (lastBidderString.includes("Last")) {
     lastBidderString = data[2].slice(12)

  }
  else if (lastBidderString.includes("Your")) {
    lastBidderString = data[2].slice(10)

 }
  else {
     lastBidderString = data[2]
  }
  
  console.log("lastbidderString: ",lastBidderString)
  console.log('vaccineNameString: ',vaccineNameString)
  Auction.updateOne({vaccinename:vaccineNameString}, {$set:{price:data[1]}}, function(err, result) {
    if (err)
        console.log('error: ',err)
}).then(() => {
  let outputArray = [data[1],lastBidderString]
  io.emit('button5sumoutput',{data:outputArray})
  io.emit('updateMessage',{data:lastBidderString})
})

})
  
//


});

