document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");
}

// Avisar de que se perdió la conexión.
document.addEventListener("offline", function () {
    $("#error").show();
    navigator.notification.alert("No tienes conexión a internet. Ten en cuenta que las secciones pueden verse afectadas", null, "Sin conexión", "Aceptar");
});


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
