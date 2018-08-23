
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
$("#form2").submit(function(event){

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
	// show loader
	$('#form-loading').show();

				
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
		        $('#success').fadeIn(1000);
		        $('#success').removeClass('show-none');
		        $('#success').addClass('show-text');
		        $('#success').delay(5000).fadeOut(1000);

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
		$("#form2").get(0).reset();
		$('#form-loading').hide();
		setTimeout( function(){
		$('#success').removeClass('show-text');
		$('#success').addClass('show-none');
		}, 7000);
    });

    // Prevent default posting of form
    event.preventDefault();
}); 

	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-92067308-1', 'auto');
	  ga('send', 'pageview');