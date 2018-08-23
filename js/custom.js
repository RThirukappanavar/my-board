//hide the success mesage
$('#success-message').hide();

//get the position of the header
		var headerPosition = $("#navigation-bar").position();
		
		//handle the header on scroll
		$(window).scroll(function(){
			if ($(this).scrollTop() > headerPosition.top) 
			{
				$("#navigation-bar").addClass('fix-menu-header');
			}
			else
			{
				$("#navigation-bar").removeClass('fix-menu-header');
			}
		});

// AJAX PHP script to load the php data (for subscribe form)
var request;

// Bind to the submit event of Subscribe form
$("#send-messsage-form").submit(function(event){
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
	// show loader
	$('#form-loading').removeClass('hide');

				
    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request
    request = $.ajax({
        url: "../submit.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // show success message
        console.log("Form submitted");
		        $('#success-message').fadeIn(100);
		        $('#success-message').delay(5000).fadeOut(1000);

    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Re enable the inputs

        $inputs.prop("disabled", false);
        // hide loader and success message
		$("#send-messsage-form").get(0).reset();
		$('#form-loading').addClass('hide');
    });

    // Prevent default posting of form
    event.preventDefault();
});