document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    //console.log("navigator.geolocation works well");
    window.ga.startTrackerWithId('UA-92835463-1', 30);
    window.ga.trackView('Mycorner360 APP');

}

// Avisar de que se perdió la conexión.
document.addEventListener("offline", function () {
    $("#error").show();
    navigator.notification.alert("No tienes conexión a internet. Ten en cuenta que las secciones pueden verse afectadas", null, "Sin conexión", "Aceptar");
});

// Notificaciones push
document.addEventListener('deviceready', function () {

    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function (jsonData) {
        var types = JSON.stringify(jsonData)
        var titulo = jsonData.notification.payload.title;
        var mensaje = jsonData.notification.payload.body;
        navigator.notification.alert(mensaje, null, titulo, 'Aceptar');
    };

    window.plugins.OneSignal
            .startInit("da6e47c1-cc58-4739-93be-c0194ba258b3")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();

    // Call syncHashedEmail anywhere in your app if you have the user's email.
    // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
    // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);
// Fin notificaciones push

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

// Funcion para mostrar la confirmacion para salir de la aplicacion

function ShowExitDialog() {
    navigator.notification.confirm(
            ("Quieres salir de la aplicacion?"), // message
            alertexit, // callback
            'Aviso de Mycorner360', // title
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

// Funcion para generar una cadena alfanumerica de longitud determinada

function generar(longitud)
{
    long = parseInt(longitud);
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    var contrasena = "";
    for (i = 0; i < long; i++)
        contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    return contrasena;
}

// Funcion de geoposicinamiento inverso

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

function getReverseGeocodingData_mapa_principal(lat, lng) {
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
            document.getElementById("direccion_mapa").innerHTML = address;
        }
    });
}

// Funcion para haccer upload de un video al servidor

function subirVideo(id) {
    var identificador = id;
    var fileURL = document.getElementById("uri_video").innerHTML;
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

// Funcion para guardar un nuevo rincon

function guardar_rincon()
{
    //subirImagen(id);
    subirVideo(id);
    var id_usuario = localStorage.getItem('id_usuario');
    $.ajax({
        type: 'post',
        url: 'https://www.mycorner360.com/app/actualizar_rincon.php?id_usuario=' + id_usuario + '&id=' + id,
        data: $('#main').serialize(),
        success: function () {
            navigator.notification.alert("Se estan actualizando los datos. En 24/48 horas aproximadamente tu rincon estará visible. Muchas gracias.", null, "Aviso de Mycorner360", "Aceptar");
            load_url('nuevo_rincon', 'rincon_ok.html');
            setTimeout(load_url('polivalente', 'https://www.mycorner360.com/app/enviar_email.php?id=' + id), 1000);


        }
    });
}

// Funcion para cargar video del rincon

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
        featureType: "transit.station",
        elementType: "labels",
        stylers: [
            {visibility: "off"}
        ]},
    {
        featureType: "transit.station.bus",
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

// Funcion para cargar un mapa - latitud y longitud

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
            zoom: 17,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        var marker = new google.maps.Marker({
            icon: "img/marcador_v2_nuevo_rincon.png",
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

// Funcion para obtener el geoposicionamiento del usuario - latitud y longitud

function obtener() {

    $("#direccion_rincon").html("Obteniendo localización ...");

    var onSuccess = function (position) {
        var _latitude = position.coords.latitude;
        var _longitude = position.coords.longitude;

        document.getElementById("lat").value = _latitude;
        document.getElementById("long").value = _longitude;

        getReverseGeocodingData(_latitude, _longitude);

        cargar_mapa(_latitude, _longitude);
    };

    function onError(error) {

        navigator.notification.alert("Lo sentimos pero no hemos podido determinar tu posición actual. Se utilizaran las coordenadas por defecto para generar el mapa. Para ver tu posicion, por favor activa el GPS.", null, "Aviso de Mycorner360", "Aceptar");
        var _latitude = 42.599052;
        var _longitude = -5.5665905;

        document.getElementById("lat").value = _latitude;
        document.getElementById("long").value = _longitude;

        getReverseGeocodingData(_latitude, _longitude);

        cargar_mapa(_latitude, _longitude);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 2000, enableHighAccuracy: true});
}

// Funcion para reproducir un video - a traves de la url

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

// Funcion para elegir de donde obtener el video del rincon

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

// Funcion para enviar datos de un formulario con ajax - con post

function post_ajax(div_id, id, url)
{
    $.ajax({
        type: "POST",
        //url: form.attr("action"),
        //data: form.serialize(),
        url: url,
        cache: false,
        async: true,
        data: $('#' + id).serialize(),
        success: function (response) {
            $('#' + div_id).hide();
            $('#' + div_id).html(response);
            $('#' + div_id).fadeIn();
            setTimeout(function () {
                $('#' + div_id).fadeOut();
            }, 3000);
        },
        error: function (e) {
            alert("SE HA PRODUCIDO UN ERROR");
        }

    });
}

