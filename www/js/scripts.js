// Funcion para codificar en base64

var Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    }, decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    }, _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    }, _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


// Funcion para somular un click en un oobjeto

function SimularClick(idObjeto) {

    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var objecto = document.getElementById(idObjeto);
    var canceled = !objecto.dispatchEvent(nouEvent);
}

// Funcion para cargar datos en un div por ajax

function load_url(div, url)
{
    $.ajax({
        url: url,
        cache: true,
        type: 'GET',
        contentType: "html",
        async: true,
        crossDomain: true,
        success: function (data) {
            $('#' + div).html(data);
            $("#" + div).show();
        }
    });
}

// Funcion para cargar datos en un div por ajax

function load_url_ajax(div, url)
{
    $.ajax(
            {
                url: url,
                cache: true,
                type: 'GET',
                contentType: "html",
                async: true,
                crossDomain: true,
            })
            .fail(function (data) {
                navigator.notification.alert("Lo sentimos, pero se ha producido un error en la carga de datos.", null, "Aviso de Mycorner360", "Aceptar");
            })
            .done(function () {
                $('#loading').show();
            })
            .always(function (data) {
                $("#" + div).html(data);
                $("#" + div).show();
                $('#loading').hide();
            });
}

// Funcion para activar un tipo de mapa

function activar_tipo_mapa(tipo)
{
    document.getElementById('tipo_de_rincon').innerHTML = tipo;
}

// Funcion para validar los datos de un registro de usuario

function validar_registro()
{
    $("#boton_registro").hide();
    $("#comprobando_registro").show();
    var email_registro = $('#email_registro').val();
    var clave_registro = $('#clave_registro').val();
    var usuario_registro = $('#usuario_registro').val();
    var aceptar_condiciones = $('#aceptar_condiciones').val();


    if (email_registro == "")
    {
        $("#email_registro").addClass("input_login_error");
        var validar1 = 0;
    } else
    {
        $("#email_registro").removeClass("input_login_error");
        var validar1 = 1;
    }

    if (clave_registro == "")
    {
        $("#clave_registro").addClass("input_login_error");
        var validar2 = 0;
    } else
    {
        $("#clave_registro").removeClass("input_login_error");
        var validar2 = 1;
    }

    if (usuario_registro == "")
    {
        $("#usuario_registro").addClass("input_login_error");
        var validar3 = 0;
    } else
    {
        $("#usuario_registro").removeClass("input_login_error");
        var validar3 = 1;
    }

    if (validar1 == 1 && validar2 == 1 && validar3 == 1)
    {

        expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!expr.test(email_registro))
        {
            $("#comprobando_registro").hide();
            $("#boton_registro").show();
            navigator.notification.alert("Un momento!, debes utilizar un email valido.", null, "Aviso de Mycorner360", "Aceptar");
            exit();
        }

        if ($("#aceptar_condiciones").is(':checked')) {

            var id = generar(20);
            load_url("polivalente", "https://www.mycorner360.com/app/registro_usuario.php?id=" + id + "&usuario_registro=" + usuario_registro + "&email_registro=" + email_registro + "&clave_registro=" + clave_registro)



        } else {
            $("#comprobando_registro").hide();
            $("#boton_registro").show();
            navigator.notification.alert("Un momento!, debes aceptar los términos y condiciones de uso", null, "Aviso de Mycorner360", "Aceptar");
        }


    } else
    {
        $("#comprobando_registro").hide();
        $("#boton_registro").show();
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Aviso de Mycorner360", "Aceptar");
    }
}

// Funcion para validar un comentario

function validar_comentario(id_rincon)
{
    $("#boton_nuevo_comentario").hide();
    $("#comprobando_comentario").show();
    var comentario = $('#comentario').val();
    var valoracion = $('#estrellas').val();


    if (comentario == "")
    {
        $("#comentario").addClass("input_login_error");
        var validar1 = 0;
    } else
    {
        $("#comentario").removeClass("input_login_error");
        var validar1 = 1;
    }

    if (valoracion == "")
    {
        $("#rating_rincon").addClass("input_login_error");
        var validar2 = 0;
    } else
    {
        $("#rating_rincon").removeClass("input_login_error");
        var validar2 = 1;
    }


    if (validar1 == 1 && validar2 == 1)
    {
        var id_rincon = id_rincon;
        var id_usuario = localStorage.getItem('id_usuario');
        var nick = localStorage.getItem('nick');
        var key_code = id_rincon + "" + id_usuario;
        var encodedString = Base64.encode(key_code);
        load_url("datos_comentario", "https://www.mycorner360.com/app/validar_comentario.php?id_rincon=" + id_rincon + "&valoracion=" + valoracion + "&comentario=" + comentario + "&id_usuario=" + id_usuario + "&nombre_usuario=" + nick + "&key_code=" + encodedString);
    } else
    {
        $("#comprobando_comentario").hide();
        $("#boton_nuevo_comentario").show();
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Aviso de Mycorner360", "Aceptar");
    }
}


// Funcion para cerrar sesion

function cerrar_sesion()
{
    localStorage.setItem("id_usuario", "");
    localStorage.setItem("email", "");
    localStorage.setItem("nick", "");
    localStorage.setItem("nombre_usuario", "");
    localStorage.setItem("apellidos_usuario", "");
    localStorage.setItem("provincia_usuario", "");

    var id_usuario = localStorage.getItem('id_usuario');
    var email = localStorage.getItem('email');
    var nick = localStorage.getItem('nick');
    var nombre = localStorage.getItem('nombre_usuario');
    var apellidos = localStorage.getItem('apellidos_usuario');
    var provincia = localStorage.getItem('provincia_usuario');

    $("#foto_perfil_usuario").html("");

    quitar_login();
    document.getElementById("ventana_login").style.display = "none";
    document.getElementById("ventana_cerrar_sesion").style.display = "none";
    navigator.notification.alert("Enhorabuena! Has cerrado la sesión de tu usuario correctamente. Hasta la próxima.", null, "Aviso de Mycorner360", "Aceptar");


}

// Funcion para iniciar sesion

function iniciar_sesion()
{

    $("#validar_login").hide();
    $("#comprobando_login").show();
    var email_sesion = $('#email_sesion').val();
    var clave_sesion = $('#clave_sesion').val();

    if (email_sesion == "")
    {
        $("#email_sesion").addClass("input_login_error");
        var validar5 = 0;
    } else
    {
        $("#email_sesion").removeClass("input_login_error");
        var validar5 = 1;
    }

    if (clave_sesion == "")
    {
        $("#clave_sesion").addClass("input_login_error");
        var validar6 = 0;
    } else
    {
        $("#clave_sesion").removeClass("input_login_error");
        var validar6 = 1;
    }

    if (validar5 == 1 && validar6 == 1)
    {
        /*
         $.ajax({
         type: "POST",
         data: $("#login_form").serialize(),
         dataType: 'html',
         url: "http://www.mycorner360.com/app/login1.php",
         success: function (data) {
         alert('EXITO');
         },
         error: function () {
         alert('ERROR');
         }
         });
         */
        load_url("polivalente", "https://www.mycorner360.com/app/login.php?email_sesion=" + email_sesion + "&clave_sesion=" + clave_sesion, "crear_nueva_cuenta");
    } else
    {
        $("#comprobando_login").hide();
        $("#validar_login").show();
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Aviso de Mycorner360", "Aceptar");
    }

}

// Funcion para validar un nuevo rincon

function validar_nuevo_rincon()
{
    $("#boton_nuevo_rincon").hide();
    $("#comprobando_rincon").show();
    var titulo_rincon = $('#titulo').val();
    var descripcion_rincon = $('#descripcion').val();
    var rating_rincon = $("#estrellas").val();
    var localizacion_rincon = $("#localizacion").val();
    var categoria_rincon = $("#tipo_de_categoria_nuevo").html();
    var tipo_rincon = $("#tipo_de_rincon_nuevo").html();
    var uri_video_rincon = $('#uri_video').html();

    if (categoria_rincon == "Categoría de rincón?")
    {
        $("#boton_categoria").addClass("input_login_error");
        var validar1 = 0;

    } else
    {
        $("#boton_categoria").removeClass("input_login_error");
        var validar1 = 1;
    }

    if (tipo_rincon == "Tipo de rincón?")
    {
        $("#boton_tipo").addClass("input_login_error");
        var validar2 = 0;

    } else
    {
        $("#boton_tipo").removeClass("input_login_error");
        var validar2 = 1;
    }

    if (titulo_rincon == "")
    {
        $("#titulo").addClass("input_login_error");
        var validar3 = 0;
    } else
    {
        $("#titulo").removeClass("input_login_error");
        var validar3 = 1;
    }

    if (descripcion_rincon == "")
    {
        $("#descripcion").addClass("input_login_error");
        var validar4 = 0;
    } else
    {
        $("#descripcion").removeClass("input_login_error");
        var validar4 = 1;
    }

    if (rating_rincon == "")
    {
        $("#rating_rincon").addClass("input_login_error");
        var validar5 = 0;
    } else
    {
        $("#rating_rincon").removeClass("input_login_error");
        var validar5 = 1;
    }

    if (uri_video_rincon == "")
    {
        $("#rincon_video").addClass("input_login_error");
        var validar6 = 0;
    } else
    {
        $("#rincon_video").removeClass("input_login_error");
        var validar6 = 1;
    }

    if (localizacion_rincon == "" || localizacion_rincon != "Obteniendo localización ...")
    {
        var validar7 = 1;
    }

    if (validar1 == 1 && validar2 == 1 && validar3 == 1 && validar4 == 1 && validar5 == 1 && validar6 == 1 && validar7 == 1)
    {
        guardar_rincon();
    } else
    {
        $("#comprobando_rincon").hide();
        $("#boton_nuevo_rincon").show();
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Aviso de Mycorner360", "Aceptar");
    }

}



// Funcion para reproducir un video

function reproducir_video(id_video)
{
    document.getElementById("video3dark").innerHTML = "<source src='https://www.mycorner360.com/" + id_video + "' type='video/mp4' />";
    SimularClick("play_video");
}


// Funcion para centrar un mapa por coordenadas

function centrado_mapa()
{
    //coordenadas centrado mapa
    var NewMapCenter = map.getCenter();
    var _latitude = NewMapCenter.lat();
    var _longitude = NewMapCenter.lng();
    //fin coordenadas centrado mapa
}

// Funcion para una pantalla determinada - indicando el id de la misma

function mostrar_pantalla(id)
{
    SimularClick('cerrar_izquierda');
    $('#nuevo_rincon').hide();
    $('#nuevo_rincon').html("");
    $('#portada').hide();
    $('#portada').html("");
    $('#login').hide();
    $('#page_canvas').hide();
    eliminar_modal();
    location.href = "#" + id;
    $('#' + id).show();
}

// Funcion para mostrar la pantalla de login

function login()
{
    SimularClick('cerrar_izquierda');
    $("#email_sesion").removeClass("input_login_error");
    $("#clave_sesion").removeClass("input_login_error");
    $('#email_sesion').val("");
    $('#clave_sesion').val("");
    $('#volver_atras').show();
    $("#comprobando_login").hide();
    $("#validar_login").show();
    $('#login').show();
    var id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario === "" || id_usuario === null)
    {
        document.getElementById("ventana_login").style.display = "block";
        document.getElementById("ventana_cerrar_sesion").style.display = "none";
    } else
    {
        document.getElementById("ventana_login").style.display = "none";
        document.getElementById("ventana_cerrar_sesion").style.display = "block";
    }
}

// Funcion para quitar la pantalla de login

function quitar_login()
{
    $('#volver_atras').hide();
    $('#login').hide();
    $('#loading').hide();
    $('#nuevo_rincon').hide();
    $('#nuevo_rincon').html("");
    $('#contenido_nuevo').hide();
    $('#contenido_nuevo').html("");
}

// Funcion para mostrar la pantalla de registro

function registro()
{
    $("#volver_atras").show();
//$("#loading").show();
    SimularClick('cerrar_izquierda');
    load_url("nuevo_rincon", "registro.html");
}

// Funcion para mostrar la pantalla de perfil del usuario

function mi_perfil()
{
    var id_usuario = localStorage.getItem('id_usuario');
    var email = localStorage.getItem('email');
    //var id_usuario = "JCkkbgEBriW2ZHnVna3F";
    //var email = "paisleones@gmail.com";
    if (id_usuario == "" || email == "" || id_usuario == null || email == null)
    {
        navigator.notification.alert('Ups! Tienes que iniciar sesion para ver tu perfil de usuario.', null, 'Aviso de Mycorner360', 'Aceptar');
        login();
        $("#login").show();
    } else
    {
        $("#volver_atras").show();
//$("#loading").show();
        SimularClick('cerrar_izquierda');
        load_url("nuevo_rincon", "mi_perfil.html");
    }

}

// Funcion para quitar la pantalla de registro de usuario

function quitar_registro()
{
    $('#volver_atras').hide();
    $('#registro').hide();
    $('#loading').hide();
    $('#nuevo_rincon').hide();
    $('#nuevo_rincon').html("");
    $('#contenido_nuevo').hide();
    $('#contenido_nuevo').html("");
}

// Funcion para mostrar la pantalla para crear un nuevo rincon

function nuevo_rincon()
{
    var id_usuario = localStorage.getItem('id_usuario');
    var email = localStorage.getItem('email');
    //var id_usuario = "JCkkbgEBriW2ZHnVna3F";
    //var email = "paisleones@gmail.com";
    if (id_usuario == "" || email == "" || id_usuario == null || email == null)
    {
        navigator.notification.alert('Ups! Tienes que iniciar sesion para crear un nuevo rincon.', null, 'Aviso de Mycorner360', 'Aceptar');
        login();
        $("#login").show();
    } else
    {
        $("#volver_atras").show();
//$("#loading").show();
        SimularClick('cerrar_izquierda');
        load_url("nuevo_rincon", "nuevo_rincon.html");
    }
}

// Funcion para mostrar la pantalla de los rincones del usuario

function mis_rincones()
{
    var id_usuario = localStorage.getItem('id_usuario');
    var email = localStorage.getItem('email');
    if (id_usuario == "" || email == "" || id_usuario == null || email == null)
    {
        navigator.notification.alert('Ups! Tienes que iniciar sesion para ver tus rincones.', null, 'Aviso de Mycorner360', 'Aceptar');
        login();
        $("#login").show();
    } else
    {
        $("#volver_atras").show();
//$("#loading").show();
        SimularClick('cerrar_izquierda');
        load_url("pantalla_mis_rincones", "mis_rincones.html");
        $("#pantalla_mis_rincones").show();
    }
}

// Funcion para mostrar la pantalla de nuevo comentario

function nuevo_comentario()
{
    var id_usuario = localStorage.getItem('id_usuario');
    var email = localStorage.getItem('email');
    if (id_usuario == "" || email == "" || id_usuario == null || email == null)
    {
        navigator.notification.alert('Ups! Tienes que iniciar sesion para comentar este rincon.', null, 'Aviso de Mycorner360', 'Aceptar');
    } else
    {
        //$("#volver_atras").show();
        //SimularClick('cerrar_izquierda');
        $('#volver_atras').hide();
        $('#volver_atras_mis_rincones').hide();
        $('#volver_atras_comentario').show();
        load_url("contenido_nuevo_comentario", "nuevo_comentario.html");
        //$('.modal-window').hide();
    }
}

// Funcion para quitar la pantalla de nuevo comentario

function quitar_vista_comentario()
{
    $('#volver_atras_comentario').hide();
    $('#volver_atras').show();
    //$('#pantalla_mis_rincones').show();
    $('#contenido_nuevo_comentario').hide();
    $('#contenido_nuevo_comentario').html("");
    //$('.modal-window').show();

}

// Funcion para ver los datos de un rincon en la pantalla de mis rincones

function quickView_mi_rincon(id)
{
    document.getElementById("volver_atras").style.display = "none";
    document.getElementById("volver_atras_mis_rincones").style.display = "block";
    $('#pantalla_mis_rincones').hide();
    $('#loading').show();
    $.ajax(
            {
                url: 'https://www.mycorner360.com/app/modal_rincon.php?id=' + id,
                data: id,
                cache: true,
                type: 'GET',
                contentType: "html",
                async: true,
                crossDomain: true,
            })
            .fail(function (data) {
                $('#contenido_nuevo').hide();
                $('#loading').hide();
                navigator.notification.alert('Ups! Lo sentimos, pero se ha producido un error en la carga de datos', null, 'Aviso de Mycorner360', 'Aceptar');
            })

            .done(function (data) {
                $("#volver_atras").hide();
                $('#volver_atras_mis_rincones').show();
            })

            .success(function (data) {
                $('#contenido_nuevo').html(data);
                document.getElementById("contenido_nuevo").style.display = "block";
                document.getElementById("loading").style.display = "none";
            });
}

// Funcion para ver los datos de un rincon en el mapa

function quickView(id)
{
    document.getElementById("volver_atras").style.display = "block";
    SimularClick('cerrar_derecha');
    $('#login').hide();
    $('#nuevo_rincon').html('');
    $('#loading').show();
    $('.modal-window').remove();
    $.ajax(
            {
                url: 'https://www.mycorner360.com/app/modal_rincon.php?id=' + id,
                data: id,
                cache: true,
                type: 'GET',
                contentType: "html",
                async: true,
                crossDomain: true,
            })
            .fail(function (data) {
                eliminar_modal();
                $('#loading').hide();
                navigator.notification.alert('Ups! Lo sentimos, pero se ha producido un error en la carga de datos', null, 'Aviso de Mycorner360', 'Aceptar');
            })

            .done(function (data) {
                $('#volver_atras').show();
            })

            .success(function (data) {
                $('#contenido_nuevo').html(data);
                //$('#volver_atras').show();
                $('#contenido_nuevo').show();
                $('#loading').hide();
            });
}

// Funcion para quitar la pantalla de datos de un rincon en los rincones del usuario

function quitar_vista_rincon()
{
    $('#volver_atras_mis_rincones').hide();
    $("#volver_atras").show();
    $('#pantalla_mis_rincones').show();
    $('#contenido_nuevo').hide();
    $('#contenido_nuevo').html("");
}


// Funcion para crear un mapa con los rincones de una categoria - importante

var centrado = null;
function crear_mapa_json(categoria, centrado)
{
    var onSuccess = function (position) {
        var gps_latitud = position.coords.latitude;
        var gps_longitud = position.coords.longitude;
        if (centrado == 'centrado')
        {
            var NewMapCenter = map.getCenter();
            var _latitude = NewMapCenter.lat();
            var _longitude = NewMapCenter.lng();
            var zoom = map.getZoom();
        } else
        {
            var _latitude = gps_latitud;
            var _longitude = gps_longitud;
            var zoom = 17;
        }


        var jsonPath = 'https://www.mycorner360.com/lugares/' + categoria + '.json?t=' + new Date().getTime();
        {
            $.getJSON(jsonPath)
                    .done(function (json) {
                        createHomepageGoogleMap(_latitude, _longitude, json, zoom, centrado, gps_latitud, gps_longitud);
                    });
        }
    };
    function onError(error) {

        navigator.notification.alert("Lo sentimos pero no hemos podido determinar tu posición actual. Se utilizaran las coordenadas por defecto para generar el mapa. Para ver tu posicion, por favor activa el GPS.", null, "Aviso de Mycorner360", "Aceptar");
        var _latitude = 42.599052;
        var _longitude = -5.5665905;
        var zoom = 17;
        var jsonPath = 'https://www.mycorner360.com/lugares/' + categoria + '.json?t=' + new Date().getTime();
        {
            $.getJSON(jsonPath)
                    .done(function (json) {
                        createHomepageGoogleMap(_latitude, _longitude, json, zoom);
                    });
        }

    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 2000, enableHighAccuracy: true});
}

// Funcion para filtrar los rincones por clases - sin uso

function mostrar_rincones(tipo_rincon)
{
    $(".todos_los_rincones").hide();
    $("." + tipo_rincon).show();
}


// Funcion para preguntar al salir de la aplicacion

function alertexit(button) {

    if (button == "1" || button == 1)
    {

        navigator.app.exitApp();
    }

}

function ShowExitDialog() {
    navigator.notification.confirm(
            ("Quieres salir de la aplicacion?"), // message
            alertexit, // callback
            'Aviso de Mycorner360', // title
            'ACEPTAR,CANCELAR' // buttonName
            );

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

// Funcion para generar cadenas aleatorias alfanumericas

function generar(longitud)
{
    long = parseInt(longitud);
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    var contrasena = "";
    for (i = 0; i < long; i++)
        contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    return contrasena;
}

// Funcion para geo-posicionamiento inverso

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

// Funcion para guardar un rincon nuevo

function guardar_rincon()
{
    //subirImagen(id);
    subirVideo(id);

    $.ajax({
        type: 'post',
        url: 'https://www.mycorner360.com/app/actualizar_rincon.php?id=' + id,
        data: $('#main').serialize(),
        success: function () {
            navigator.notification.alert("Se estan actualizando los datos. En 24/48 horas aproximadamente tu rincon estará visible. Muchas gracias.", null, "Aviso de Mycorner360", "Aceptar");
            load_url('nuevo_rincon', 'rincon_ok.html');
            setTimeout(load_url('polivalente', 'https://www.mycorner360.com/app/enviar_email.php?id=' + id), 1000);


        }
    });
}

// Funcion para guardar el video del rincon

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

// Funcion para mostrar un mapa con coordenadas

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

// Funcion para obtener tu posiccion en el mapa - latitud y longitud

function obtener() {
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

// Funcion para reproducir un video con url

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

// Funcion para enviar datos en un formulario con ajax

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