



     



   var userID = window.localStorage.getItem("userID");
    var accessKey = window.localStorage.getItem("accessKey");


//get balance
   $.ajax({
		type:'get',
		url:'https://www.univasa.com/mobileapi/balance.php',
		data:{id:userID,accessKey:accessKey},
		cache:false,
		success: function(returndata){
			$('#loadBalance').html('&#8358;'+returndata);
            //alert(returndata);

            localStorage.setItem("balance", returndata);


var user_id = window.localStorage.getItem("userID");
          
		}
	});



//fetch history
    $.ajax({
        type:'get',
        //url:'http://www.bemastech.com/caleb/mobileapi/history.php',
        url:'https://www.univasa.com/mobileapi/history2.php',
        data:{id:userID,accessKey:accessKey},
        beforeSend:function(){
            //alert('ready');
        },
        success:function(response){
            $('#history').html(response);
        }
    });



//fetch transactions
    $.ajax({
        type:'get',
        //url:'http://www.bemastech.com/caleb/mobileapi/history_trans.php',
        url:'https://www.univasa.com/mobileapi/history_trans2.php',
        data:{id:userID,accessKey:accessKey},
        beforeSend:function(){
            //alert('ready');
        },
        success:function(response){
            $('#transactions').html(response);
        }
    })


//get profile

$.ajax({
		type:'get',
		url:'https://www.univasa.com/mobileapi/profile.php',
		//url:'http://www.bemastech.com/caleb/mobileapi/profile.php',
		data:{user_id:userID,accessKey:accessKey},
		dataType: "json",
		success: function(response){
			var accName = response[1]
			var accUsername = response[4]
			var accEmail = response[3]
			var accLink = response[5]
			
			$('#profileName').html(accName);
			$('#profileUsername').html(accUsername);
			$('#profileEmail').html(accEmail);
			//$('#accLink').html(accLink);
		}
	});

    
$('.goBack').click(function(){
    location.href='services.html';
});
   

    
        