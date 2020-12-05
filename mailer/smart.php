<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$text = $_POST['text'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();               
// 1:  ------------------------                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Узнать smtp у своей почты, стоит от mail.ru
$mail->SMTPAuth = true;                               // Enable SMTP authentication
// 2: ------------------------
$mail->Username = 'Указать почту';                 // Наш логин
// 3: ------------------------
$mail->Password = 'пароль от почты';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
// 4:  ------------------------
$mail->setFrom('свою почту', 'Вписать наименование');   // От кого письмо 
// 5: ------------------------
$mail->addAddress('свою почту');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	Вопрос: ' . $text . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>