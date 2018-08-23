<?php
/* Set e-mail recipient */
$myemail  = "ranjithprabhu.k@gmail.com";

/* Check all form inputs using check_input function */

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];


$subject="Message From your Personal Website";
/* Let's prepare the message for the e-mail */
$message = "Hello Boss,

You got a message from your site [ranjithprabhu.in]

Name: $name

E-mail: $email

Phone: $phone

Message: $message



Thank you,
Have a nice day Boss...


End of message
";

/* Send the message using mail() function */
mail($myemail, $subject, $message);
exit();

?>