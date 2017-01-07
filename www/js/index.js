/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");


    // Avisar de que se perdió la conexión.
    document.addEventListener("offline", function () {
        $("#error").show();
        navigator.notification.alert("No tienes conexión a internet. Ten en cuenta que las secciones pueden verse afectadas", null, "Sin conexión", "Aceptar");
    });

}

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }

};


function ShowExitDialog() {
    navigator.notification.confirm(
            ("Quieres salir de la aplicacion?"), // message
            alertexit, // callback
            'Mensaje de Misrincones', // title
            'ACEPTAR,CANCELAR' // buttonName
            );

}

function alertexit(button) {

    if (button == "1" || button == 1)
    {

        navigator.app.exitApp();
    }

}


document.addEventListener("backbutton", ShowExitDialog, false);



var source;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function libreria_fotos(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source});
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
    document.getElementById("uri_video").innerHTML = videoURI;
    //subirImagen(imageURI)
}

function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('fotoLocal');

    largeImage.style.display = 'block';

    largeImage.src = imageURI;
    document.getElementById("uri_foto").innerHTML = largeImage.src;
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
    //subirImagen(imageURI)
}

function grabarvideo()
{
    navigator.device.capture.captureVideo(captureVideoSuccess, onFail, {
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 500,
        targetHeight: 500,
        duration: 2,
        limit: 1,
        quality: 0
    });
}

function captureVideoSuccess(videoURI) {
    var video = document.getElementById('videoLocal');
    video.src = videoURI[0].fullPath;
    document.getElementById("uri_video").innerHTML = video.src;
    //subirImagen(imageURI)
}



function onFail(message) {

}

function generar(longitud)
{
    long = parseInt(longitud);
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    var contrasena = "";
    for (i = 0; i < long; i++)
        contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    return contrasena;
}

function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            var address = (results[0].formatted_address);
            document.getElementById("localizacion").value = address;
            document.getElementById("direccion_rincon").innerHTML = address;
        }
    });
}

function subirImagen(id) {
    var identificador = id;
    var fileURL = document.getElementById("uri_foto").innerHTML;
    var options = new FileUploadOptions();
    options.fileKey = "imagen";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://misrincones.trabajocreativo.com/app/upload_foto.php?id=" + identificador), uploadSuccess, uploadFail, options);
}

function subirVideo(id) {
    var identificador = id;
    var fileURL = document.getElementById("uri_video").innerHTML;
    var options = new FileUploadOptions();
    options.fileKey = "video";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://misrincones.trabajocreativo.com/app/upload_video.php?id=" + identificador), uploadSuccess, uploadFail, options);
}

function uploadSuccess(r) {
    //alert("Code = " + r.responseCode + " Response = " + r.response + " Sent = " + r.bytesSent);

}

function uploadFail(error) {
    navigator.notification.alert("Los sentimos, pero se ha producido un error en la carga de datos.", null, "Mensaje de misrincones", "Aceptar");
}


function guardar_rincon()
{
    subirImagen(id);
    subirVideo(id);

    $.ajax({
        type: 'post',
        url: 'http://misrincones.trabajocreativo.com/app/actualizar_rincon.php?id=' + id,
        data: $('#main').serialize(),
        success: function () {
            navigator.notification.alert("Se estan actualizando los datos. En 24/48 horas aproximadamente tu rincon estará visible. Muchas gracias.", null, "Mensaje de misrincones", "Aceptar");
            load_url('nuevo_rincon', 'rincon_ok.html');
            setTimeout(load_url('polivalente', 'http://misrincones.trabajocreativo.com/app/enviar_email.php?id=' + id), 1000);


        }
    });


}

function guardar_rincon_video()
{
    var id = generar(20);
    subirVideo(id);
}

var styles = [
    {
        featureType: 'water', // set the water color
        elementType: 'geometry.fill', // apply the color only to the fill
        stylers: [
            {color: '#96cbcc'}
        ]
    }, {
        featureType: 'landscape.natural', // set the natural landscape
        elementType: 'all',
        stylers: [
            {color: '#ecf0f1'},
            {lightness: 0}
        ]
    }
    , {
        featureType: 'poi', // set the point of interest
        elementType: 'geometry.stroke',
        stylers: [
            {color: '#ffffff'},
            {lightness: 0}
        ]
    },
    {//poi stands for point of interest - don't show these lables on the map
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {visibility: "off"}
        ]
    },
    {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
            {visibility: "off"}
        ]},
    {
        featureType: 'road', // set the road
        elementType: 'geometry',
        stylers: [
            {color: '#ffffff'},
            {lightness: 0}
        ]
    }, {
        featureType: 'road.highway', // set the local road
        elementType: 'labels',
        stylers: [
            {visibility: "off"}
        ]
    }
];



function cargar_mapa(latitud, longitud) {
    var map;
    function initialize() {

        var _latitude = latitud;
        var _longitude = longitud;


        var myLatlng = new google.maps.LatLng(_latitude, _longitude);

        google.maps.event.addDomListener(zoomout, 'click', function () {
            var currentZoomLevel = map.getZoom();
            if (currentZoomLevel != 0) {
                map.setZoom(currentZoomLevel - 1);
            }

        });

        google.maps.event.addDomListener(zoomin, 'click', function () {
            var currentZoomLevel = map.getZoom();
            if (currentZoomLevel != 21) {
                map.setZoom(currentZoomLevel + 1);
            }

        });

        var myOptions = {
            disableDefaultUI: true,
            scrollwheel: false,
            styles: styles,
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        var marker = new google.maps.Marker({
            icon: "img/marcador.png",
            size: new google.maps.Size(44, 50),
            //animation: google.maps.Animation.DROP,
            draggable: true,
            position: myLatlng,
            map: map,
            title: "Estas aqui"
        });

        google.maps.event.addListener(marker, 'dragend', function (event) {
            getReverseGeocodingData(event.latLng.lat(), event.latLng.lng());
            document.getElementById("lat").value = event.latLng.lat();
            document.getElementById("long").value = event.latLng.lng();
        });


        google.maps.event.addListener(marker, 'dragend', function (event) {
            posset = 1;

            if (map.getZoom() < 10) {
                map.setZoom(10);
            }
            map.setCenter(event.latLng);
            computepos(event.latLng);
            drag = true;
            setTimeout(function () {
                drag = false;
            }, 250);
        });

    }
    google.maps.event.addDomListener(window, "load", initialize());
}


function obtener() {
    navigator.geolocation.getCurrentPosition(mostrar);
}

function mostrar(posicion) {
    var _latitude = posicion.coords.latitude;
    var _longitude = posicion.coords.longitude;

    document.getElementById("lat").value = _latitude;
    document.getElementById("long").value = _longitude;

    getReverseGeocodingData(_latitude, _longitude);

    cargar_mapa(_latitude, _longitude);
}


function play_video(videoUrl)
{
    // Play a video with callbacks
    var options = {
        successCallback: function () {
            console.log("Video was closed without error.");
        },
        errorCallback: function (errMsg) {
            console.log("Error! " + errMsg);
        },
        orientation: 'landscape'
    };
    window.plugins.streamingMedia.playVideo(videoUrl, options);
}


function fotoDialog() {
    navigator.notification.confirm(
            (""), // message
            alertfoto, // callback
            'Añadir una foto a este lugar', // title
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

