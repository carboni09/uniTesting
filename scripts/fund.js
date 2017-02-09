$(document).ready(function(){

 var myApp = new Framework7({
    material:true,
    materialRipple:false,
    notificationCloseOnClick: false,
    notificationHold: 4500
    
});

var $$ = Dom7;


var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    
    dynamicNavbar: true
});
    
$("#fundSubmit").click(function(){
   
   

        var amount = $('#fundAmount').val();
        var paywith = $('#fundPayment').val();


        var characterReg = /([0-9])/;
                
                if(amount == '' ){
                    myApp.alert('Enter a valid amount','Try again')
                    
                        return false;
                }
                 if(paywith == '' ){
                    myApp.alert('Choose a payment method','Try again')
                    
                        return false;
                }
                if(!characterReg.test(amount)) {
        myApp.alert('Enter a valid amount','Try again')
        myApp.hidePreloader()
        return false;
    } if(amount < 100){
        myApp.alert('The minimum amount you can fund is 100','Try again')
                    
                        return false;
    }
        //generate transaction ID i.e ref 
                var d = new Date();
var t = d.getTime();
var g = String(t);
var f = g.substring(8);
var v = Math.floor((Math.random() * 11111) + 29000);
var ref = 'FW'+f+v;
		//create cookie
        window.localStorage.setItem("ref", ref);
		window.localStorage.setItem("amount", amount);



      if(paywith === 'gtpay'){
 
    
            
          
          
          

//get balance during fund


        
 
			var userID = window.localStorage.getItem("userID"); 
            var ref = window.localStorage.getItem("ref");

           

		var browser = 	cordova.InAppBrowser.open('http://www.univasa.com/mobileapi/gtpayFund2.php?fund&amount='+amount+'&user_id='+userID+'&ref='+ref, '_blank', 'location=no');
          setInterval(balanceIncrease, 5000);
          //setTimeout(failedTransaction, 10000);

			//return false; 

                function balanceIncrease(){
         var userID = window.localStorage.getItem("userID");
    var accessKey = window.localStorage.getItem("accessKey");
       var balanceBeforeFund =  window.localStorage.getItem("balance");
       var amount = window.localStorage.getItem("amount");
       var ref = window.localStorage.getItem("ref");
       
       //var transRef = '';
            $.ajax({
                type:'get',
                url:'https://www.univasa.com/mobileapi/gtpayFund.php',
                //data:{fund:fund,transRefCheck:transRefCheck,user_id:userID,amount:amount},
                data:{transRef:ref},
              
                dataType:"json",
               
                success:function(response){
                  var responseFundStatus =  response[2]; 
                  var responseFundAmount =  response[0]; 
                  var responseFundDate =  response[1]; 
                   // alert(responseFundStatus+' '+responseFundAmount+' '+responseFundDate);
                    



                    if(responseFundStatus == 'Completed'){
                browser.close(); 
             
                myApp.modal({
    title:  'Done',
    text: '<div>'+'<img src="images/success.svg" width="100px" style="display:block;margin:auto;">'+
    '<h4 style="text-align:center;">Your wallet has been funded successfully</h4>'+'</div>'+'<br>',
        verticalButtons: true,
    buttons: [
        {
            text:'<a href="#"  class="button button-fill button-raised goBack" style="margin-top:3vh;display:block;margin:auto;width:80%;background-color:#555555">OK</a>',
            onClick: function () {
          myApp.closeModal()
          clearInterval(balanceIncrease);
          //clearTimeout(failedTransaction);
          window.location.href = 'recharge.html';
        }
        },
        
    ]

  })
var user_id = window.localStorage.getItem("userID");
        mixpanel.identify(user_id);
mixpanel.people.increment({

    
    "Total Amount Funded": amount

  
})

mixpanel.track("Fund Wallet",
                                           {"user_id": user_id, "amount":amount})

                return false;
        }//end if

        if(responseFundStatus == 'Failed'){
                browser.close(); 
            
                myApp.modal({
    title:  'Failed',
    text: '<div>'+'<img src="images/success.svg" width="100px" style="display:block;margin:auto;">'+
    '<h4 style="text-align:center;">Your payment was not successful. Please try again or contact our support unit if this error persists.</h4>'+'</div>'+'<br>',
        verticalButtons: true,
    buttons: [
        {
            text:'<a href="#"  class="button button-fill button-raised goBack" style="margin-top:3vh;display:block;margin:auto;width:80%;background-color:#555555">OK</a>',
            onClick: function () {
          myApp.closeModal()
          clearInterval(balanceIncrease);
          //clearTimeout(failedTransaction);
          window.location.href = 'recharge.html';
        }
        },
        
    ]

  })


                return false;
        }
                } //end success

                


            })


        
    };//end function


      







 function failedTransaction(){

          browser.close(); 
            
                myApp.modal({
    title:  'Failed',
    text: '<div>'+'<img src="images/failed.svg" width="100px" style="display:block;margin:auto;">'+
    '<h4 style="text-align:center;">Your payment was not successful. Please try again or contact our support unit if this error persist.</h4>'+'</div>'+'<br>',
        verticalButtons: true,
    buttons: [
        {
            text:'<a href="#"  class="button button-fill button-raised goBack" style="margin-top:3vh;display:block;margin:auto;width:80%;background-color:#555555">OK</a>',
            onClick: function () {
          myApp.closeModal()
          clearTimeout(failedTransaction);
          window.location.href = 'recharge.html';
        }
        },
        
    ]

  })
 }


























 } if(paywith === 'dbp'){
 
			var userID = window.localStorage.getItem("userID"); 

			cordova.InAppBrowser.open('https://www.univasa.com/mobileapi/gtpayFund2.php?fund&amount='+amount+'&user_id='+userID+'&paywith='+paywith, '_self', 'location=no');
          
			return false;
 }

});
});