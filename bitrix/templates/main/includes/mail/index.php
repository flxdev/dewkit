<?php
    require '../vendor/PHPMailerAutoload.php';
	require '../templates/template.php';
	require '../environment/environment.php';
	// Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
	$message = $_POST["message"];
    $uid = $_POST["uid"];
	$check = $_POST["check"];
    if ($check !== '' || $name == '' || $email == '' || $message == '') {
        // Do nothing
    }
    else {
        $errors = 0;                                                                            // Set errors to 0
		// Update counter                                                         
		$counter = file_get_contents('counter');                                                // Parse counter
		$newcounter = intval($counter) + 1;                                                     // Increase counter
		file_put_contents('counter', $newcounter);                                              // Update counter
		// Set up mailer
        $mail = new PHPMailer;                                                                  // Initialize mailer
		$mail->CharSet = 'UTF-8';																// Enable UTF-8 support
        $mail->isSMTP();                                                            			// Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';                                             			// Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                                                     			// Enable SMTP authentication
        $mail->Username = 'no-reply@workflowengine.io';                             			// SMTP username
        $mail->Password = 'JgtfH6JASrqb86uJ';                                       			// SMTP password
        $mail->SMTPSecure = 'ssl';                                                  			// Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                                          			// TCP port to connect to
        // Send email to sales
        $mail->addReplyTo($email, $name);                                           			// Reply to user
        $mail->setFrom('no-reply@workflowengine.io', 'DWKit');                                  // Add a sender
		// If in development environment, send email to adress, specified in the contact form
		if($environment == 'development') {
			$mail->addAddress($email, $name);
		}
		else {
            $mail->addAddress('sales@workflowengine.io', 'Sales');  
		}
        $mail->isHTML(true);                                                      			    // Set email format to HTML
        $mail->Subject = 'Contact form request #'.$counter;                                     // Set subject
        $mail->Body = contactFormRequest($name, $email, $message, $uid, $counter);                    // Get HTML template
        if(!$mail->send()) {
            $errors++;
        }; 
		// Send email to person
        $mail->ClearAllRecipients();                                                            // Clear all previous recepients
		$mail->addAddress($email, $name);                                                       // Add user as a recepient
        $mail->isHTML(true);                                                      				// Set email format to HTML
        $mail->Subject = 'Thanks for your request';                                             // Set subject
        $mail->Body = contactFormAutoreply($name, $message, $counter);           		        // Template for contact form autoreply
        if(!$mail->send()) {
            $errors++;
        };
        if($errors > 0) {
            $response = array(
                "status" => 500,
                "message" => "There's been a server error. Please, try again",
                "information" => $mail->ErrorInfo
            );
        }
        else {
            $response = array(
                "status" => 200,
                "message" => "Your message has been sent"
            );
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>