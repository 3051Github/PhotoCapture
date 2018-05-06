var indicefoto = 1;


function gotohome()
{
    location.href ='home.html';
}


function askfunzione(idfunzione)
{
    switch(idfunzione)
    {
        case 1:
            location.href='elencoauto.html';
            break;
        case 2:
            location.href='nuovasosta.html';
            break;
    }
        
}

function gotothumbs()
{    
    
    //alert($("#txttarga").val());
    
    if($("#txttarga").val()=='')
    {
        alert("IMMETTERE LA TARGA");
    }
    else
    {    
        nuovalabel = $(".titolofotografie").html() + "<br/>" + $("#txttarga").val().replace(/ /g,'');
        //alert(nuovalabel);
        
        $(".titolofotografie").html(nuovalabel);
        
        $("#pnltarga").addClass("hide");    
        $("#pnlthumbnails").removeClass("hide");
        $(".synk").fadeIn();
    }
}

function newphoto()
{    
    $("#pnlthumbnails").addClass("hide");
    $("#pnlnewphoto").removeClass("hide");
}

$(document).ready(function(){

    
    
    
});

function readFile(file) {
	var reader = new FileReader();

	reader.onloadend = function () {
		processFile(reader.result, file.type);
	}

	reader.onerror = function () {
		alert('There was an error reading the file!');
	}

	reader.readAsDataURL(file);
}

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
// Wait for PhoneGap to connect with the device
//
document.addEventListener("deviceready",onDeviceReady,false);
// PhoneGap is ready to be used!
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoFileSuccess(imageData) {
    // Get image handle
    console.log(JSON.stringify(imageData));
    
    
    //imagesdata[imagesdata.length] = imagesdata;
    
    //alert('Scattata foto n°' + indicefoto);
    
    
    
    
    
    
    // Get image handle
    //
    //var smallImage = document.getElementById('smallImage');
    var smallImage = document.getElementById('scatto'+ indicefoto);
    // Unhide image elements
    //
    smallImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = imageData;
    
    $('#scatto'+ indicefoto).parent().removeClass("new");
    $('#scatto'+ indicefoto).parent().off("click");
    
    indicefoto++;
    
    var nextImage = document.getElementById('scatto'+ indicefoto);
    nextImage.style.display = 'block';
    $('#scatto'+ indicefoto).removeClass("hide");
    $('#scatto'+ indicefoto).parent().addClass("new");
    
    $('#scatto'+ indicefoto).parent().on("click",function(){
        capturePhotoWithFile();    
    });
    
    
}
// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI 
    // console.log(imageURI);
    // Get image handle
    //
    alert('Photouri');
    
    var largeImage = document.getElementById('largeImage');
    // Unhide image elements
    //
    largeImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}
// A button will call this function
//
function capturePhotoWithData() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
}
function capturePhotoWithFile() {
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 70, destinationType: Camera.DestinationType.FILE_URI });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 70, destinationType: destinationType.FILE_URI,sourceType: source });
}
// Called if something bad happens.
// 
function onFail(message) {
    alert('Failed because: ' + message);
}

function SendToServer(imageURI,lastimage)
{
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;
    
    targaauto = $("#txttarga").val().replace(/ /g,'');
    
    servicetocall ="http://www.alessandrobosi.it/photowebapp/uploadimages.php?targa=" + targaauto;
    //alert(servicetocall)
    
    
    
    var ft = new FileTransfer();
    ft.upload( imageURI, servicetocall, function(result){
            if(lastimage)
            {
                //nascondo il pannello di attesa
                $(".waitpanel").fadeOut();
                $(".synk").fadeOut();
            }
            //alert("ok:"+JSON.stringify(result));
         }, 
         function(error){
            alert("ko:"+ JSON.stringify(error));
        }, options);
    
    //alert("fine upload")
    
}

function sendallphoto()
{
    lastimage = false;
    if(indicefoto>1)
    {
        $(".waitpanel").fadeIn();
        
        for(i=1;i<indicefoto;i++)
        {

            currentimageURI = $("#scatto"+i)[0].src;

            if(i=indicefoto)
            {
                lastimage = true;
            }
            
            SendToServer(currentimageURI,lastimage);
            
        }
    }
}