"use strict";
        var $ = jQuery.noConflict();
        var mapStyles = [ {"featureType":"road", "elementType":"labels", "stylers":[{"visibility":"simplified"}, {"lightness":20}]}, {"featureType":"administrative.land_parcel", "elementType":"all", "stylers":[{"visibility":"off"}]}, {"featureType":"landscape.man_made", "elementType":"all", "stylers":[{"visibility":"on"}]}, {"featureType":"transit", "elementType":"all", "stylers":[{"saturation": - 100}, {"visibility":"on"}, {"lightness":10}]}, {"featureType":"road.local", "elementType":"all", "stylers":[{"visibility":"on"}]}, {"featureType":"road.local", "elementType":"all", "stylers":[{"visibility":"on"}]}, {"featureType":"road.highway", "elementType":"labels", "stylers":[{"visibility":"simplified"}]}, {"featureType":"poi", "elementType":"labels", "stylers":[{"visibility":"off"}]}, {"featureType":"road.arterial", "elementType":"labels", "stylers":[{"visibility":"on"}, {"lightness":50}]}, {"featureType":"water", "elementType":"all", "stylers":[{"hue":"#a1cdfc"}, {"saturation":30}, {"lightness":49}]}, {"featureType":"road.highway", "elementType":"geometry", "stylers":[{"hue":"#f49935"}]}, {"featureType":"road.arterial", "elementType":"geometry", "stylers":[{"hue":"#fad959"}]}, {featureType:'road.highway', elementType:'all', stylers:[{hue:'#dddbd7'}, {saturation: - 92}, {lightness:60}, {visibility:'on'}]}, {featureType:'landscape.natural', elementType:'all', stylers:[{hue:'#c8c6c3'}, {saturation: - 71}, {lightness: - 18}, {visibility:'on'}]}, {featureType:'poi', elementType:'all', stylers:[{hue:'#d9d5cd'}, {saturation: - 70}, {lightness:20}, {visibility:'on'}]} ];
        var styles = [
        {
        featureType: 'water', // set the water color
                elementType: 'geometry.fill', // apply the color only to the fill
                stylers: [
                {color: '#96cbcc'},
                {visibility: "off"}
                ]
        }, {
        featureType: 'landscape.natural', // set the natural landscape
                elementType: 'all',
                stylers: [
                {color: '#ecf0f1'},
                {lightness: 0},
                {visibility: "off"}
                ]
        }
        , {
        featureType: 'poi', // set the point of interest
                elementType: 'geometry.stroke',
                stylers: [
                {color: '#ffffff'},
                {lightness: 0},
                {visibility: "off"}
                ]
        },
        {	//poi stands for point of interest - don't show these lables on the map
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
                { visibility: "off" }
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
// Set map height to 100% ----------------------------------------------------------------------------------------------

        var $body = $('body');
        var alto_pantalla = screen.height - 200;
        if ($body.hasClass('map-fullscreen')) {
if ($(window).width() > alto_pantalla) {

$('.map-canvas').height($(window).height() - $('.header').height() + 70);
        }
else {
$('.map-canvas #map').height($(window).height() - $('.header').height() + 70);
        }
}

$('.mapa_nuevo_rincon').height($(window).height() - $('.header').height() - 100);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Homepage map - Google
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var map = null;
        function createHomepageGoogleMap(_latitude, _longitude, json, zoom, centrado, gps_latitud, gps_longitud){

        $.get("https://www.mycorner360.com/assets/external/_infobox_app.js", function() {
        gMap();
        });
                function gMap(){

                var mapCenter = new google.maps.LatLng(_latitude, _longitude);
                        function HomeControl(controlDiv, map) {

                        google.maps.event.addDomListener(zoomout, 'click', function() {
                        var currentZoomLevel = map.getZoom();
                                if (currentZoomLevel != 0){
                        map.setZoom(currentZoomLevel - 1); }

                        });
                                google.maps.event.addDomListener(zoomin, 'click', function() {
                                var currentZoomLevel = map.getZoom();
                                        if (currentZoomLevel != 21){
                                map.setZoom(currentZoomLevel + 1); }

                                });
                        }

                var mapOptions = {
                zoom: zoom,
                        liteMode: true,
                        center: mapCenter,
                        disableDefaultUI: true,
                        scrollwheel: false,
                        styles: styles,
                        mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                position: google.maps.ControlPosition.BOTTOM_CENTER
                        },
                        panControl: false,
                        zoomControl: false,
                        zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.LARGE,
                                position: google.maps.ControlPosition.RIGHT_BOTTOM
                        }
                };
                        var mapElement = document.getElementById('map');
                        map = new google.maps.Map(mapElement, mapOptions);
                        var newMarkers = [];
                        var markerClicked = 0;
                        var activeMarker = true;
                        var lastClicked = false;
                        var latLng = new google.maps.LatLng(_latitude, _longitude);
                        if (centrado != 'centrado')
                {
                var companyImage = new google.maps.MarkerImage('img/marcador.png',
                        new google.maps.Size(53, 52),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(26, 26)
                        );
                }
                else
                {
                var companyImage = new google.maps.MarkerImage('',
                        new google.maps.Size(0, 0),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(0, 0)
                        );
                }

                var marker = new RichMarker({
                position: new google.maps.LatLng(gps_latitud, gps_longitud),
                        map: map,
                        //icon: 'img/marcador.png',
                        content: '<img src="img/marcador_v2.png" style="width: 32px;">',
                        optimized: false,
                        zIndex: 200,
                        flat: true
                });
                        // Create the DIV to hold the control and
                        // call the HomeControl() constructor passing
                        // in this DIV.
                        var homeControlDiv = document.createElement('div');
                        var homeControl = new HomeControl(homeControlDiv, map);
                        homeControlDiv.index = 1;
                        map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
                        for (var i = 0; i < json.data.length; i++) {

                // Google map marker content -----------------------------------------------------------------------------------

                if (json.data[i].color) var color = json.data[i].color;
                        else color = '';
                        var markerContent = document.createElement('DIV');
                        var id_rincon = json.data[i].id;
                        var categoria = json.data[i].category;
                        categoria = categoria.replace(" ", "_");
                        categoria = categoria.toLowerCase();
                        var destacado = json.data[i].destacado;
                        var tipo = json.data[i].type;
                        tipo = tipo.toLowerCase();
                        tipo = tipo.replace(" ", "_");
                        var icono = json.data[i].type_icon;
                        icono = icono.replace(" ", "_");
                        if (json.data[i].featured == 1) {
                markerContent.innerHTML =
                        '<div class="map-marker featured sombra ' + color + ' ' + tipo + ' todos_los_rincones">' +
                        '<div class="icon ' + destacado + '">' +
                        '<img src="' + icono + '">' +
                        '</div>' +
                        '</div>';
                }
                else {
                markerContent.innerHTML =
                        '<div class="map-marker sombra ' + json.data[i].color + ' ' + tipo + ' todos_los_rincones">' +
                        '<div class="icon ' + destacado + '">' +
                        '<img src="' + icono + '">' +
                        '</div>' +
                        '</div>';
                }
                // Create marker on the map ------------------------------------------------------------------------------------

                var marker = new RichMarker({
                position: new google.maps.LatLng(json.data[i].latitude, json.data[i].longitude),
                        map: map,
                        draggable: false,
                        content: markerContent,
                        flat: true,
                        optimized: false,
                        zIndex: 100
                });
                        newMarkers.push(marker);
                        // Create infobox for marker -----------------------------------------------------------------------------------

                        var infoboxContent = document.createElement("div");
                        var infoboxOptions = {
                        content: infoboxContent,
                                disableAutoPan: false,
                                pixelOffset: new google.maps.Size( - 18, - 42),
                                zIndex: null,
                                alignBottom: true,
                                boxClass: "infobox",
                                enableEventPropagation: true,
                                closeBoxMargin: "0px 0px -30px 0px",
                                closeBoxURL: "img/close.png",
                                infoBoxClearance: new google.maps.Size(1, 1)
                        };
                        // Infobox HTML element ----------------------------------------------------------------------------------------

                        var category = json.data[i].category;
                        var id = json.data[i].id;
                        infoboxContent.innerHTML = drawInfobox(category, infoboxContent, json, i);
                        // Create new markers ------------------------------------------------------------------------------------------

                        newMarkers[i].infobox = new InfoBox(infoboxOptions);
                        // Show infobox after click ------------------------------------------------------------------------------------

                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                        // Abre ventana de informacion por ajax
                        var id_rincon = json.data[i].id;
                                //$("#informacion_rincon_" + id_ricon).hide();
                                load_url("rincon_" + id_rincon, "https://www.mycorner360.com/ajax/consultar_rincon.php?id_rincon=" + id_rincon);
                                // Fin
                                google.maps.event.addListener(map, 'click', function(event) {
                                lastClicked = newMarkers[i];
                                });
                                activeMarker = newMarkers[i];
                                if (activeMarker != lastClicked){
                        for (var h = 0; h < newMarkers.length; h++) {
                        newMarkers[h].content.className = 'marker-loaded';
                                newMarkers[h].infobox.close();
                        }
                        newMarkers[i].infobox.open(map, this);
                                newMarkers[i].infobox.setOptions({ boxClass:'fade-in-marker'});
                                newMarkers[i].content.className = 'marker-active marker-loaded';
                                markerClicked = 1;
                        }
                        }
                        })(marker, i));
                        // Fade infobox after close is clicked -------------------------------------------------------------------------

                        google.maps.event.addListener(newMarkers[i].infobox, 'closeclick', (function(marker, i) {
                        return function() {
                        activeMarker = 0;
                                newMarkers[i].content.className = 'marker-loaded';
                                newMarkers[i].infobox.setOptions({ boxClass:'fade-out-marker' });
                        }
                        })(marker, i));
                }

                // Close infobox after click on map --------------------------------------------------------------------------------

                google.maps.event.addListener(map, 'click', function(event) {
                if (activeMarker != false && lastClicked != false){
                if (markerClicked == 1){
                activeMarker.infobox.open(map);
                        activeMarker.infobox.setOptions({ boxClass:'fade-in-marker'});
                        activeMarker.content.className = 'marker-active marker-loaded';
                }
                else {
                markerClicked = 0;
                        activeMarker.infobox.setOptions({ boxClass:'fade-out-marker' });
                        activeMarker.content.className = 'marker-loaded';
                        setTimeout(function() {
                        activeMarker.infobox.close();
                        }, 350);
                }
                markerClicked = 0;
                }
                if (activeMarker != false){
                google.maps.event.addListener(activeMarker, 'click', function(event) {
                markerClicked = 1;
                });
                }
                markerClicked = 0;
                });
                        // Create marker clusterer -----------------------------------------------------------------------------------------

                        var clusterStyles = [
                        {
                        url: 'img/cluster.png',
                                height: 34,
                                width: 34
                        }
                        ];
                        var markerCluster = new MarkerClusterer(map, newMarkers, { styles: clusterStyles, maxZoom: 19 });
                        markerCluster.onClick = function(clickedClusterIcon, sameLatitude, sameLongitude) {
                        return multiChoice(sameLatitude, sameLongitude, json);
                        };
                        // Dynamic loading markers and data from JSON ----------------------------------------------------------------------

                        google.maps.event.addListener(map, 'idle', function() {
                        var visibleArray = [];
                                for (var i = 0; i < json.data.length; i++) {
                        if (map.getBounds().contains(newMarkers[i].getPosition())){
                        visibleArray.push(newMarkers[i]);
                                $.each(visibleArray, function (i) {
                                setTimeout(function(){
                                if (map.getBounds().contains(visibleArray[i].getPosition())){
                                if (!visibleArray[i].content.className){
                                visibleArray[i].setMap(map);
                                        visibleArray[i].content.className += 'bounce-animation marker-loaded';
                                        markerCluster.repaint();
                                }
                                }
                                }, i * 50);
                                });
                        } else {
                        newMarkers[i].content.className = '';
                                newMarkers[i].setMap(null);
                        }
                        }

                        var visibleItemsArray = [];
                                $.each(json.data, function(a) {
                                if (map.getBounds().contains(new google.maps.LatLng(json.data[a].latitude, json.data[a].longitude))) {
                                var category = json.data[a].category;
                                        pushItemsToArray(json, a, category, visibleItemsArray);
                                }
                                });
                                // Create list of items in Results sidebar ---------------------------------------------------------------------

                                $('.items-list .results').html(visibleItemsArray);
                                // Check if images are cached, so will not be loaded again

                                $.each(json.data, function(a) {
                                if (map.getBounds().contains(new google.maps.LatLng(json.data[a].latitude, json.data[a].longitude))) {
                                is_cached(json.data[a].gallery[0], a);
                                }
                                });
                                // Call Rating function ----------------------------------------------------------------------------------------


                        });
                        redrawMap('google', map);
                        function is_cached(src, a) {
                        var image = new Image();
                                var loadedImage = $('.results li #' + json.data[a].id + ' .image');
                                image.src = src;
                                if (image.complete){
                        $(".results").each(function() {
                        loadedImage.removeClass('loading');
                                loadedImage.addClass('loaded');
                        });
                        }
                        else {
                        $(".results").each(function() {
                        $('.results li #' + json.data[a].id + ' .image').addClass('loading');
                        });
                                $(image).load(function(){
                        loadedImage.removeClass('loading');
                                loadedImage.addClass('loaded');
                        });
                        }
                        }

                // Geolocation of user -----------------------------------------------------------------------------------------

                $('.geolocation').on("click", function() {
                if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success);
                } else {
                console.log('Geo Location is not supported');
                }
                });
                        function success(position) {

                        var locationCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                map.setCenter(locationCenter);
                                map.setZoom(16);
                                var geocoder = new google.maps.Geocoder();
                                geocoder.geocode({
                                "latLng": locationCenter
                                }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                var lat = results[0].geometry.location.lat(),
                                        lng = results[0].geometry.location.lng(),
                                        placeName = results[0].address_components[0].long_name,
                                        latlng = new google.maps.LatLng(lat, lng);
                                        $("#location").val(results[0].formatted_address);
                                }
                                });
                        }





                // Autocomplete address ----------------------------------------------------------------------------------------

                }
        }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item Detail Map - Google
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function itemDetailMap(json){
var mapCenter = new google.maps.LatLng(json.latitude, json.longitude, zoom);
        var mapOptions = {
        center: mapCenter,
                disableDefaultUI: true,
                scrollwheel: false,
                styles: mapStyles,
                panControl: false,
                zoomControl: false,
                draggable: true
        };
        var mapElement = document.getElementById('map-detail');
        var map = new google.maps.Map(mapElement, mapOptions);
        if (json.type_icon) var icon = '<img src="' + json.type_icon + '">';
        else icon = '';
        // Google map marker content -----------------------------------------------------------------------------------

        var markerContent = document.createElement('DIV');
        markerContent.innerHTML =
        '<div class="map-marker">' +
        '<div class="icon">' +
        icon +
        '</div>' +
        '</div>';
        // Create marker on the map ------------------------------------------------------------------------------------

        var marker = new RichMarker({
        position: new google.maps.LatLng(json.latitude, json.longitude),
                map: map,
                draggable: false,
                content: markerContent,
                flat: true
        });
        marker.content.className = 'marker-loaded';
        }



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Push items to array and create <li> element in Results sidebar ------------------------------------------------------

function pushItemsToArray(json, a, category, visibleItemsArray){

var destacado = json.data[a].destacado;
        var itemPrice;
        visibleItemsArray.push(
                '<li>' +
                '<div class="item" id="' + json.data[a].id + '">' +
                '<a href="#" class="image">' +
                '<div class="inner">' +
                '<div class="item-specific">' +
                drawItemSpecific(category, json, a) +
                '</div><div style="background: url(' + json.data[a].gallery[0] + '); background-size: cover; background-position: center center; background-repeat: no-repeat; height: 130px;" class="fondo_rincon">' +
                '</div></div>' +
                '</a>' +
                '<div class="wrapper">' +
                '<a href="#" id="' + json.data[a].id + '"><h3>' + json.data[a].title + '</h3></a>' +
                '<figure>' + json.data[a].location + '</figure>' +
                '<div class="price_' + destacado + '">' + json.data[a].destacado + '</div>' +
                '<div class="info">' +
                '<div class="type">' +
                '<i><img src="' + json.data[a].type_icon + '" alt=""></i>' +
                '<span>' + json.data[a].type + '</span>' +
                '</div>' +
                '<div class="rating" data-rating="' + json.data[a].rating + '"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>'
                );
        function drawPrice(price){
        if (price){
        itemPrice = '<div class="price">' + price + '</div>';
                return itemPrice;
        }
        else {
        return '';
        }
        }
}

// Center map to marker position if function is called (disabled) ------------------------------------------------------

function centerMapToMarker(){
$.each(json.data, function(a) {
if (json.data[a].id == id) {
var _latitude = json.data[a].latitude;
        var _longitude = json.data[a].longitude;
        var mapCenter = new google.maps.LatLng(_latitude, _longitude);
        map.setCenter(mapCenter);
        }
});
}

// Create modal if more items are on the same location (example: one building with floors) -----------------------------

function multiChoice(sameLatitude, sameLongitude, json) {
//if (clickedCluster.getMarkers().length > 1){
var multipleItems = [];
        $("#volver_atras").show();
//$("#loading").show();
        SimularClick('cerrar_izquierda');
        load_url("pantalla_mis_rincones", "multichoice.html");
        $("#pantalla_mis_rincones").show();
        load_url("multichoice", "https://www.mycorner360.com/app/_modal_multichoice.php?latitud=" + sameLatitude + "&longitud=" + sameLongitude);
        //}
}

// Animate OSM marker --------------------------------------------------------------------------------------------------

function animateOSMMarkers(map, loadedMarkers, json){
var bounds = map.getBounds();
        var visibleItemsArray = [];
        var multipleItems = [];
        $.each(loadedMarkers, function (i) {
        if (bounds.contains(loadedMarkers[i].getLatLng())) {
        var category = json.data[i].category;
                pushItemsToArray(json, i, category, visibleItemsArray);
                setTimeout(function(){
                if (loadedMarkers[i]._icon != null){
                loadedMarkers[i]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable bounce-animation marker-loaded';
                }
                }, i * 50);
        }
        else {
        if (loadedMarkers[i]._icon != null){
        loadedMarkers[i]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable';
        }
        }
        });
        // Create list of items in Results sidebar -------------------------------------------------------------------------

        $('.items-list .results').html(visibleItemsArray);
        rating('.results .item');
}

// Redraw map after item list is closed --------------------------------------------------------------------------------

function redrawMap(mapProvider, map){
$('.map .toggle-navigation').click(function() {
$('.map-canvas').toggleClass('results-collapsed');
        $('.map-canvas .map').one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
if (mapProvider == 'osm'){
map.invalidateSize();
        }
else if (mapProvider == 'google'){
google.maps.event.trigger(map, 'resize');
        }
});
        });
}