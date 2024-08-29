$( document ).ready(function(){
  console.log( "ready!" );

// having dropdowns in repsonse to input on email and password
  $("#email").on("input", function () {
    $(this).next().text("This should be a personal email with @gmail.com / @outlook.com / @yahoo.com");
  });

  $("#pwd").on("input", function () {
    $(this).next().text("The strongest passwords have uppercase, lowercase, numbers, and extra characters.");
  });

// loading the json file to give an example of email and name
  $('#btnLoadData').click(function() {
    console.log("clicked");

    let jsonURL = "https://mmandelyn.github.io/india.hotel.inc/demo.json";

    $.ajax({
        url: jsonURL,
        dataType: "json",
        success: function(data) {
            
            $("#firstName").val(data.firstName);
            $("#lastName").val(data.lastName);
            $("#email").val(data.email);
          
        }
    });
});


//Having a dependent selection.
  $(function () {
    let activities = [
        ["Fraternity & Sorority Life", ["Oozma Kappa", "Jaws Theta Chi", "Python Nu Kappa", "Roar Omega Roar", "Slugma Slugma Kappa", "Eta Hiss Hiss"]],
        ["Athletics", ["Football", "Basketball", "Volleyball", "Track & Field", "Tennis", "Swimming", "Soccer"]]
      ];
    
  // Activity Selection: showing the different organizations and options. 
    $("#activitySelect").on("change", function (e) {
      $("#optionsSelect").prop("disabled", false);
      let inputVal = this.value;

  //Looping through the activities array:
      $.each(activities, function (key, value) {
        if (inputVal === value[0]) {
          $.each(value, function (nestKey, nestValue) {
            switch (nestKey) {
              case 0:
                $("label[for=optionsSelect]").text(nestValue);
                $("#optionsSelect").empty();
                $("#optionsSelect").append(
                  $("<option>").text(`Choose an organization or a team: `)
                );
                break;
              case 1:
                $.each(nestValue, function (nameKey, nameValue) {
                  // console.log(nameKey, nameValue);

                  $("#optionsSelect").append(
                    $("<option>").val(nameValue).text(nameValue)
                  );
                });
                break;} // switch(nestKey) end
          });
        } // If statement end
      }); // Looping end
    }); // Activity Selection end
    
    }); // The end of the dependent selection.

    //Button submission and user greeting
    $("#submitButton").click(function(e){ e.preventDefault()
      let email = $("#email").val();
      let pwd = $("#pwd").val();
      let firstName = $("#firstName").val();
      let lastName = $("#lastName").val();

      let activityInterest = $("#optionsSelect").val();
      console.log("Email: " + email + " Password: " + pwd + " First Name: " + firstName + " Last Name: " + lastName);
      //display greeting to them
      $("#userGreeting").text("Hey, " + firstName +  "! We are glad you are interested in our university! Our IT department will contact you shortly, once your portal account has been set up. In the meantime, we will share your information with " + activityInterest + " to help you start making connections!") 
    });// The submission end
  }); // The end of scripts 
