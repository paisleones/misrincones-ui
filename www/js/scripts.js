// Funcion codificar / decodificar en base64

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

// Funcion para simular un click en elemento a traves del id

function SimularClick(idObjeto) {

    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var objecto = document.getElementById(idObjeto);
    var canceled = !objecto.dispatchEvent(nouEvent);
}

// Funcion para cargar contenido en un div a traves de ajax

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

// Funcion para cargar contenido en un div a traves de ajax

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


// Funcion para activar un mapa con de un tipo de rincon

function activar_tipo_mapa(tipo)
{
    document.getElementById('tipo_de_rincon').innerHTML = tipo;
}

// Funcion para validar el registro de un usuario

function validar_registro()
{
    $("#boton_registro").hide();
    $("#comprobando_registro").show();
    var email_registro = $('#email_registro').val();
    var clave_registro = $('#clave_registro').val();
    var usuario_registro = $('#usuario_registro').val();
    var codigo_promocion = $('#codigo_promocion').val();
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

    if (codigo_promocion == "")
    {
        $("#codigo_promocion").addClass("input_login_error");
        var validar4 = 0;
    } else
    {
        $("#codigo_promocion").removeClass("input_login_error");
        var validar4 = 1;
    }

    if (validar1 == 1 && validar2 == 1 && validar3 == 1 && validar4 == 1)
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
            load_url("polivalente", "https://www.mycorner360.com/app/registro_usuario.php?id=" + id + "&usuario_registro=" + usuario_registro + "&email_registro=" + email_registro + "&clave_registro=" + clave_registro + "&codigo_promocion=" + codigo_promocion)



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

// Funcion para validar un comentario nuevo

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


// Funcion para cerrar sesion y borrar el localstorage

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
    var uri_video_rincon = $('#uri_video').val();

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

// Funcion para reproducir video - a traves de id

function reproducir_video(id_video)
{
    document.getElementById("video3dark").innerHTML = "<source src='https://www.mycorner360.com/" + id_video + "' type='video/mp4' />";
    SimularClick("play_video");
}

// Funcion para centrar mapa - coordenadas

function centrado_mapa()
{
    //coordenadas centrado mapa
    var NewMapCenter = map.getCenter();
    var _latitude = NewMapCenter.lat();
    var _longitude = NewMapCenter.lng();
    //fin coordenadas centrado mapa
}