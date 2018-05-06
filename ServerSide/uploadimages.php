<?php 

//Allow Headers
header('Access-Control-Allow-Origin: *');
//print_r(json_encode($_FILES));
$new_image_name = urldecode($_FILES["file"]["name"]); //.".jpg";


if (!file_exists('upload/'.$_GET["targa"])) {
    mkdir('upload/'.$_GET["targa"], 0777, true);
}

//echo $new_image_name ;
//Move your files into upload folder
move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$_GET["targa"]."/".$new_image_name);
    
?>