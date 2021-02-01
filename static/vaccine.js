// vaccine file stands for handling vaccine page process and socket io connection between server and client
// setting items
var timerValue = document.getElementById('timerValue')
var remainingTime = document.getElementById('perfektiRemainingTime')
var denemeElement = document.getElementById('deneme')
var denemeElement2 = document.getElementById('deneme2')
var lastBidder = document.getElementById('lastBidder')
var currentUser = document.getElementById('currentUser')
var button1 = document.getElementById('button1')
var button2 = document.getElementById('button2')
var button3 = document.getElementById('button3')
var button4 = document.getElementById('button4')
var button5 = document.getElementById('button5')
var product_price = document.getElementById('productPrice')
var vaccineName = document.getElementById('vaccineName')

var body = document.getElementsByClassName("socketim")
var list = document.getElementById("listim")
var merhaba = document.getElementsByClassName("merhaba")

socket.on('message', data => {
          
    
    console.log(body)
    console.log("listle: ",list)
    console.log("DATA 1 : ",data.data[0])
    console.log("DATA 2 : ",data.data[1])
    console.log("DATA 3 : ",data.data[2])
    
    
    const content = `
                 
                  <div class="product">
                      <img alt="shoes1" src="https://img.thedailybeast.com/image/upload/dpr_2.0/c_crop,h_675,w_675,x_286,y_0/c_limit,w_128/d_placeholder_euli9k,fl_lossy,q_auto/v1607233571/201204-dent-black-vaccine-resisters-hero_p3vdlh">
                      <div><h2><b>Vaccine Name:${data.data[1]} </b></h2>
                       <p class="price">Product Price:${data.data[2]}</p>
                       <p class="price">Product owner:${data.data[0]}</p>
                       <p class="price" id="currentUser" >Your name: </p>
                       <p class="price" id='perfektiRemainingTime'>Remaining Time:<span id="timerValue">120</span></p>
                       <p class="price">Last Bidder:</p>
                       <button id='button1' type="button">1</button>
         <button id='button2' type="button">100</button>
         <button id='button3' type="button">200</button>
         <button id='button4' type="button">250</button>
         <button id='button5' type="button">500</button>
                       <br>
                       
         
                
                      </div>   
      </div>
                  `
                ;
            socket.emit('vaccineNameData',data.data[1])
            if (list.length == 0) {
              console.log("Listing lengti sıfır")
              body.innerHTML += content
              console.log(list)             
            }
            else {
              console.log('content: ',content)
              console.log('list: ',list)
              console.log('Buradayım.')
              list.innerHTML += content
              
            }  
            clearCache()   
            socket.on("counter2",(data) => {
                console.log('TYPE OF COUNTER2: ',typeof(data))
                console.log("counter2 data: ",data)
                data = data.toString()
            
            
            
                if (data.includes('The vaccine')) {
                    console.log('BEN BURDAYIM')
                    
                        lastBinderUser = data
                        console.log('lastBinderUser: ',lastBinderUser)
                        var newDivThingy = document.createElement("div");
                        newDivThingy.className = "alert alert-warning"
                        newDivThingy.role = "alert"
                        newDivThingy.innerText = 'The vaccine has been sold'
                        denemeElement2.appendChild(newDivThingy);
                        setTimeout(function() { // this will automatically close the alert and remove this if the users doesnt close it in 5 secs
            
                            newDivThingy.remove()
                    
                         
                            
                            
                      
                          }, 1000);
                          list.innerHTML = ''
                          socket.emit('deleteVaccine',vaccineName.innerText,)
            
            
                  
                    
                }
                timerValue.innerText = data
            })
            
        
        })
  
let flag = true
elementArr = []
console.log("product prive: ",product_price.innerText)
console.log('button1: ',button1)
console.log("innettext. ",vaccineName.innerText)
console.log("innerhtml. ",vaccineName.innerHTML)
console.log('remainingTime: ',remainingTime.innerText)

var lastBinderUser = ''

socket.emit("takeCounterData",timerValue.innerText)
socket.emit('databaseTimer',vaccineName.innerText)
socket.emit('remainingTime',timerValue.innerText)





socket.on("counter2",(data) => {
    console.log('TYPE OF COUNTER2: ',typeof(data))
    console.log("counter2 data: ",data)
    data = data.toString()



    if (data.includes('The vaccine')) {
        console.log('BEN BURDAYIM')
        
            lastBinderUser = data
            console.log('lastBinderUser: ',lastBinderUser)
            var newDivThingy = document.createElement("div");
            newDivThingy.className = "alert alert-warning"
            newDivThingy.role = "alert"
            newDivThingy.innerText = 'The vaccine has been sold'
            denemeElement2.appendChild(newDivThingy);
            setTimeout(function() { 

                newDivThingy.remove()
        
             
                
                
          
              }, 5000);
              list.innerHTML = ''
              socket.emit('deleteVaccine',vaccineName.innerText,)


      
        
    }
    timerValue.innerText = data
})


button1.addEventListener('click',function(){
    console.log(button1.innerText)
    console.log(product_price.innerText)

    console.log('OTYPE OF: ',typeof(product_price.innerText))
    console.log('OTYPE OF kendisi: ',typeof(product_price))
    priceValue = getData(product_price.innerText)
     
    intPrice = parseInt(priceValue)
    intButton = parseInt(button1.innerText)
    sum = intPrice + intButton
    product_price.innerText = sum.toString()
    console.log("LAST BIDDER İÇİ : ",lastBidder.innerText)
    console.log("LAST BIDDER İÇİ inner html : ",lastBidder.innerHTML)
    let data = [vaccineName.innerText,sum.toString(),currentUser.innerText]
    
    socket.emit('button1sum',(data))
    

    socket.on('button1sumoutput', (data) => {

        console.log("data: ",data)
        console.log("data button1 sum oputput socketon: ",data.data)
  
        product_price.innerText = data.data[0]
        lastBidder.innerText ="Last bidder: " + data.data[1]
       
        
        
           })
           //
           
           socket.on('updateMessage', (data) => {
               currentUser = document.getElementById('currentUser')
               console.log("updatedmessage data: ",data.data)
               console.log('current user nedir ? : ', currentUser.innerText)
               let newNameLastBidder;
               let newNameCurrentUser;
               console.log("lastbidder last: ",data.data)
               console.log("CURRENT YOUSER YOUR: ",currentUser.innerText)
               
               newNameLastBidder = data.data
    
               
       
               if (currentUser.innerText.includes("Your")) {
                   newNameCurrentUser = currentUser.innerText.slice(10).trim()
           
                   }
       
               console.log("LAST BİDDER: ",newNameLastBidder)
               console.log("Current User: ",newNameCurrentUser)
               if (newNameLastBidder != newNameCurrentUser) {
                   var newDivThingy = document.createElement("div");
                   newDivThingy.className = "alert alert-primary"
                   newDivThingy.role = "alert"
                   newDivThingy.innerText = "Price updated 1$ by " + data.data
                   denemeElement.appendChild(newDivThingy);
                   setTimeout(function() { 
       
                       
                       newDivThingy.remove()
                       denemeElement.removeChild(newDivThingy)
                 
                     }, 1000);
                     
                   
               }

           
               
            
               })
           

           
       
  
    
})
button2.addEventListener('click',function(){
    console.log(button2.innerText)
    console.log(product_price.innerText)

    console.log('OTYPE OF: ',typeof(product_price.innerText))
    console.log('OTYPE OF kendisi: ',typeof(product_price))
    priceValue = getData(product_price.innerText)
     
    intPrice = parseInt(priceValue)
    intButton = parseInt(button2.innerText)
    sum = intPrice + intButton
    product_price.innerText = sum.toString()
    console.log("LAST BIDDER İÇİ : ",lastBidder.innerText)
    console.log("LAST BIDDER İÇİ inner html : ",lastBidder.innerHTML)
    let data = [vaccineName.innerText,sum.toString(),currentUser.innerText]
    
    socket.emit('button2sum',(data))
    

    socket.on('button2sumoutput', (data) => {

        console.log("data: ",data)
        console.log("data button2 sum oputput socketon: ",data.data)
  
        product_price.innerText = data.data[0]
        lastBidder.innerText ="Last bidder: " + data.data[1]
           })

           //

           socket.on('updateMessage', (data) => {
            console.log("updatedmessage data: ",data.data)

            let newNameLastBidder;
            let newNameCurrentUser;
            console.log("lastbidder last: ",data.data)
            console.log("CURRENT YOUSER YOUR: ",currentUser.innerText)
            
            newNameLastBidder = data.data
 
            
    
            if (currentUser.innerText.includes("Your")) {
                newNameCurrentUser = currentUser.innerText.slice(10).trim()
        
                }
    
            console.log("LAST BİDDER: ",newNameLastBidder)
            console.log("Current User: ",newNameCurrentUser)
            if (newNameLastBidder != newNameCurrentUser) {
                var newDivThingy = document.createElement("div");
                newDivThingy.className = "alert alert-primary"
                newDivThingy.role = "alert"
                newDivThingy.innerText = "Price updated $100 by " + data.data
                denemeElement.appendChild(newDivThingy);
                setTimeout(function() {
    
                    
                    newDivThingy.remove()
                    denemeElement.removeChild(newDivThingy)
              
                  }, 1000);
                  
                
            }

            
         
         
            })


})
button3.addEventListener('click',function(){
    console.log(button3.innerText)
    console.log(product_price.innerText)

    console.log('OTYPE OF: ',typeof(product_price.innerText))
    console.log('OTYPE OF kendisi: ',typeof(product_price))
    priceValue = getData(product_price.innerText)
     
    intPrice = parseInt(priceValue)
    intButton = parseInt(button3.innerText)
    sum = intPrice + intButton
    product_price.innerText = sum.toString()
    console.log("LAST BIDDER İÇİ : ",lastBidder.innerText)
    console.log("LAST BIDDER İÇİ inner html : ",lastBidder.innerHTML)
    let data = [vaccineName.innerText,sum.toString(),currentUser.innerText]
    
    socket.emit('button3sum',(data))
    

    socket.on('button3sumoutput', (data) => {

        console.log("data: ",data)
        console.log("data button3 sum oputput socketon: ",data.data)
  
        product_price.innerText = data.data[0]
        lastBidder.innerText ="Last bidder: " + data.data[1]
           })
    //

    socket.on('updateMessage', (data) => {
        console.log("updatedmessage data: ",data.data)

        let newNameLastBidder;
        let newNameCurrentUser;
        console.log("lastbidder last: ",data.data)
        console.log("CURRENT YOUSER YOUR: ",currentUser.innerText)
        
        newNameLastBidder = data.data

        

        if (currentUser.innerText.includes("Your")) {
            newNameCurrentUser = currentUser.innerText.slice(10).trim()
    
            }

        console.log("LAST BİDDER: ",newNameLastBidder)
        console.log("Current User: ",newNameCurrentUser)
        if (newNameLastBidder != newNameCurrentUser) {
            var newDivThingy = document.createElement("div");
            newDivThingy.className = "alert alert-primary"
            newDivThingy.role = "alert"
            newDivThingy.innerText = "Price updated $200 by " + data.data
            denemeElement.appendChild(newDivThingy);
            setTimeout(function() { 

                
                newDivThingy.remove()
                denemeElement.removeChild(newDivThingy)
          
              }, 1000);
              
            
        }
        
    
     
     
        })
})
button4.addEventListener('click',function(){
    console.log(button4.innerText)
    console.log(product_price.innerText)

    console.log('OTYPE OF: ',typeof(product_price.innerText))
    console.log('OTYPE OF kendisi: ',typeof(product_price))
    priceValue = getData(product_price.innerText)
     
    intPrice = parseInt(priceValue)
    intButton = parseInt(button4.innerText)
    sum = intPrice + intButton
    product_price.innerText = sum.toString()
    console.log("LAST BIDDER İÇİ : ",lastBidder.innerText)
    console.log("LAST BIDDER İÇİ inner html : ",lastBidder.innerHTML)
    let data = [vaccineName.innerText,sum.toString(),currentUser.innerText]
    
    socket.emit('button4sum',(data))
    

    socket.on('button4sumoutput', (data) => {

        console.log("data: ",data)
        console.log("data button4 sum oputput socketon: ",data.data)
  
        product_price.innerText = data.data[0]
        lastBidder.innerText ="Last bidder: " + data.data[1]
           })
    //

    socket.on('updateMessage', (data) => {
        console.log("updatedmessage data: ",data.data)

        let newNameLastBidder;
        let newNameCurrentUser;
        console.log("lastbidder last: ",data.data)
        console.log("CURRENT YOUSER YOUR: ",currentUser.innerText)
        
        newNameLastBidder = data.data

        

        if (currentUser.innerText.includes("Your")) {
            newNameCurrentUser = currentUser.innerText.slice(10).trim()
    
            }

        console.log("LAST BİDDER: ",newNameLastBidder)
        console.log("Current User: ",newNameCurrentUser)
        if (newNameLastBidder != newNameCurrentUser) {
            var newDivThingy = document.createElement("div");
            newDivThingy.className = "alert alert-primary"
            newDivThingy.role = "alert"
            newDivThingy.innerText = "Price updated $250 by " + data.data
            denemeElement.appendChild(newDivThingy);
            setTimeout(function() { 

                
                newDivThingy.remove()
                denemeElement.removeChild(newDivThingy)
          
              }, 1000);
              

            
        }
        

    
     
     
        })
})

button5.addEventListener('click',function(){
    console.log(button5.innerText)
    console.log(product_price.innerText)

    console.log('OTYPE OF: ',typeof(product_price.innerText))
    console.log('OTYPE OF kendisi: ',typeof(product_price))
    priceValue = getData(product_price.innerText)
     
    intPrice = parseInt(priceValue)
    intButton = parseInt(button5.innerText)
    sum = intPrice + intButton
    product_price.innerText = sum.toString()
    console.log("LAST BIDDER İÇİ : ",lastBidder.innerText)
    console.log("LAST BIDDER İÇİ inner html : ",lastBidder.innerHTML)
    let data = [vaccineName.innerText,sum.toString(),currentUser.innerText]
    
    socket.emit('button5sum',(data))
    

    socket.on('button5sumoutput', (data) => {

        console.log("data: ",data)
        console.log("data button5 sum oputput socketon: ",data.data)
  
        product_price.innerText = data.data[0]
        lastBidder.innerText ="Last bidder: " + data.data[1]
           })
    //

    socket.on('updateMessage', (data) => {
        console.log("updatedmessage data: ",data.data)

        let newNameLastBidder;
        let newNameCurrentUser;
        console.log("lastbidder last: ",data.data)
        console.log("CURRENT YOUSER YOUR: ",currentUser.innerText)
        
        newNameLastBidder = data.data

        

        if (currentUser.innerText.includes("Your")) {
            newNameCurrentUser = currentUser.innerText.slice(10).trim()
    
            }

        console.log("LAST BİDDER: ",newNameLastBidder)
        console.log("Current User: ",newNameCurrentUser)
        if (newNameLastBidder != newNameCurrentUser) {
            var newDivThingy = document.createElement("div");
            newDivThingy.className = "alert alert-primary"
            newDivThingy.role = "alert"
            newDivThingy.innerText = "Price updated $500 by " + data.data
            denemeElement.appendChild(newDivThingy);
            setTimeout(function() { 

               
                newDivThingy.remove()
                denemeElement.removeChild(newDivThingy)
          
              }, 1000);
              
             
            
        }
       

    
     
     
        })
})



function getData(element){
    elementArr.push(element)
    newString = elementArr.pop()
    console.log("elemantarray: ",elementArr)
    console.log("new string: ",newString)
    

    var str = newString
    var parts = str.split(/[#\?&]/g); 
    console.log('filtered pard: ', parts)
  
    if(parts.length > 10){
        var filteredParts = parts.filter(function (part) {
            return part.split(':')[0] === 'Product Price';
                });
            
        
    }
    else {
        var filteredParts = parts

    }
   
    console.log('filtered pardss: ', filteredParts)

    console.log('filtered pardss0: ', filteredParts[0])
    if (filteredParts[0].split(':').length >= 2) {
        var iamlookingforthis = filteredParts[0].split(':')[1];
        
    outputString = iamlookingforthis.trim()
    console.log('i am looking for this: ',outputString)
    
   
  
    return iamlookingforthis

    }
    else {
        iamlookingforthis =filteredParts[0]
        return iamlookingforthis
    }
    
   

    
  
  
    

}


socket.on('remainingFromServer', (data) => {
    console.log('data data data remaining from server: ',data)
    checkBid(data)

})


function clearCache(){
    setTimeout(function(){
        window.location.reload(1);
     }, 2000);
}

