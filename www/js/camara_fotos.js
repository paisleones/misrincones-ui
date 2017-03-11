function libreria_fotos(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source});
}

function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('fotoLocal');

    largeImage.style.display = 'block';

    largeImage.src = imageURI;
    document.getElementById("uri_foto").innerHTML = largeImage.src;
    $("#foto_perfil").hide();
    $("#div_foto").show();
    $("#icono_eliminar_foto").show();
}


function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onSuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source});
}

function hacerFoto(source) {
    //navigator.camera.getPicture(onSuccess, onFail, {quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType: source});

    navigator.camera.getPicture(onSuccess, onFail, {quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: source,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false});
}

function onSuccess(imageURI) {
    var image = document.getElementById('fotoLocal');
    image.src = imageURI;
    document.getElementById("uri_foto").innerHTML = image.src;
    $("#foto_perfil").hide();
    $("#div_foto").show();
    $("#icono_eliminar_foto").show();
    subirImagen(id_usuario);
}

function subirImagen(id) {
    var identificador = id;
    var fileURL = document.getElementById("uri_foto").innerHTML;
    var options = new FileUploadOptions();
    options.fileKey = "imagen";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("https://www.mycorner360.com/app/upload_foto.php?id=" + id_usuario), uploadPhotoSuccess, uploadFail, options);
}

function uploadPhotoSuccess(r) {
    $("#fotoLocal").show();
}


function fotoDialog() {
    navigator.notification.confirm(
            (""), // message
            alertfoto, // callback
            'Selecciona una imagen para tu perfil de usuario', // title
            'CÁMARA  ,  GALERÍA' // buttonName
            );

}

function alertfoto(button) {

    if (button == "1" || button == 1)
    {

        hacerFoto();
    }

    if (button == "2" || button == 2)
    {

        getPhoto(pictureSource.SAVEDPHOTOALBUM);
    }

}
