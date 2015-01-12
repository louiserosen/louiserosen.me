<?php

$to      = "lse.rosen@gmail.com";
$subject = "Form submission on louiserosen.me from ".$_POST['nom'];
$message = "Form submission on louiserosen.me\n\n";
$message .= "nom: ".$_POST['nom']."\n";
$message .= "email: ".$_POST['mail']."\n";
$message .= "message: ".$_POST['message']."\n";

$headers = 'From: website@louiserosen.me' . "\r\n" .
    'Reply-To: website@louiserosen.me' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

?>