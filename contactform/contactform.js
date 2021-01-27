jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) 
    	return false;
//    else
//    	var str = $(this).serialize();
    
  /*  var action = $(this).attr('action');
    if( ! action ) {
      action = 'contactform/contactform.php';
    }*/
    
    var name =  $('#name').val();
    var email =  $('#email').val();
    var subject =  $('#subject').val();
    var message =  $('#message_body').val();
    var mob =  $('#mobile_no').val();
    
    var messagebody = "";
    messagebody += '<p style="font-weight:bold;" > Name</p>';
    messagebody += name;
    messagebody += '<p style="font-weight:bold;" > Email</p>';
    messagebody += email;
    messagebody += '<p style="font-weight:bold;"> "Mobile</p>';
    messagebody += mob;
    messagebody += '<p style="font-weight:bold;"> Message</p>';
    messagebody += message;
    Email.send({ 
        Host: "mail.ussrtelco.com", 
        Username: "info@ussrtelco.com", 
        Password: "raju@1234", 
        To: 'gyan00131@yahoo.com', 
        From: "info@ussrtelco.com", 
        Subject: subject, 
        Body: messagebody,        
      }) 
        .then(function (msg) { 
        	if (msg == 'OK') {
                $("#sendmessage").addClass("show");
                $("#errormessage").removeClass("show");
                $('.contactForm').find("input, textarea").val("");
              } else {
                $("#sendmessage").removeClass("show");
                $("#errormessage").addClass("show");
                $('#errormessage').html(msg);
              }
         
        }); 
    
 /*   $.ajax({
      type: "POST",
      url: action,
      //data: str,
      data:{
    	Name:name,
    	Email:email,
    	Subject:subject,
    	Message:message
      },
      success: function(msg) {
    	  console.log(msg);
        // alert(msg);
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    });*/
    return false;
  });

});
