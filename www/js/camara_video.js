function video_info(mediaFiles) {

    var medFile = new MediaFile(mediaFiles, "video/mp4");

    medFile.getFormatData(function (metadata) {
        var info = "<strong>Ancho: <strong>" + metadata.width + "<br><strong>Alto: <strong>" + metadata.height + "<br><strong>Duracción: <strong>" + metadata.duration;
        $("#videoArea").html(info);
        $("#videoArea").fadeIn();

    }, function () {
        console.log("fail");
    });
}


function libreria_videos() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(libreria_videos_Success, onFail, {quality: 50,
        mediaType: window.Camera.MediaType.VIDEO,
        destinationType: window.Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY});
}

function libreria_videos_Success(videoURI) {
    var video = document.getElementById('videoLocal');
    video.src = videoURI.fullPath;
    $('#uri_video').val(videoURI);
    //document.getElementById("uri_video").innerHTML = videoURI;

    $("#ok_video").fadeIn();
    //subirImagen(imageURI)
}


function grabarvideo()
{
    navigator.device.capture.captureVideo(captureVideoSuccess, onFail, {
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 500,
        targetHeight: 500,
        duration: 30,
        limit: 1,
        quality: 1
    });
}

function captureVideoSuccess(videoURI) {
    var video = document.getElementById('videoLocal');
    video.src = videoURI[0].fullPath;
    $('#uri_video').val(video.src);
    //document.getElementById("uri_video").innerHTML = video.src;
    if (video.src != "")
    {
        $("#ok_video").fadeIn();
    } else
    {
        $("#ok_video").hide();
        video_error();
    }
    //subirImagen(imageURI)
}



function onFail(message) {

}

function subirVideo(id) {
    var identificador = id;
    var fileURL = $('#uri_video').val();
    var options = new FileUploadOptions();
    options.fileKey = "video";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("https://www.mycorner360.com/app/upload_video.php?id=" + identificador), uploadSuccess, uploadFail, options);
}

function uploadSuccess(r) {
    //alert("Code = " + r.responseCode + " Response = " + r.response + " Sent = " + r.bytesSent);

}

function uploadFail(error) {
    navigator.notification.alert("Los sentimos, pero se ha producido un error en la carga de datos.", null, "Aviso de Mycorner360", "Aceptar");
}

function videoDialog() {
    navigator.notification.confirm(
            (""), // message
            alertvideo, // callback
            'Añadir un video a este lugar', // title
            'GRABAR  ,  GALERÍA' // buttonName
            );

}

function alertvideo(button) {

    if (button == "1" || button == 1)
    {

        grabarvideo();
    }

    if (button == "2" || button == 2)
    {

        libreria_videos();
    }

}


function video_error() {
    navigator.notification.confirm(
            (""), // message
            alertvideo_error, // callback
            'Correcto! Ahora selecciona el video grabado manualmente de la galería.', // title
            'IR A LA GALERIA' // buttonName
            );

}

function alertvideo_error(button) {

    if (button == "1" || button == 1)
    {

        libreria_videos();
    }

}