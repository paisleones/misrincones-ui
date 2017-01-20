function SimularClick(idObjeto) {

    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var objecto = document.getElementById(idObjeto);
    var canceled = !objecto.dispatchEvent(nouEvent);
}

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
                alert("Lo sentimos, pero se ha producido un error en la carga de datos");
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
;
function activar_tipo_mapa(tipo)
{
    document.getElementById('tipo_de_rincon').innerHTML = tipo;
}


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
            navigator.notification.alert("Un momento!, debes utilizar un email valido.", null, "Mensaje de misrincones", "Aceptar");
            exit();
        }

        if ($("#aceptar_condiciones").is(':checked')) {

            var id = generar(20);
            load_url("polivalente", "http://misrincones.trabajocreativo.com/app/registro_usuario.php?id=" + id + "&usuario_registro=" + usuario_registro + "&email_registro=" + email_registro + "&clave_registro=" + clave_registro)



        } else {
            $("#comprobando_registro").hide();
            $("#boton_registro").show();
            navigator.notification.alert("Un momento!, debes aceptar los términos y condiciones de uso", null, "Mensaje de misrincones", "Aceptar");
        }


    } else
    {
        $("#comprobando_registro").hide();
        $("#boton_registro").show();
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Mensaje de misrincones", "Aceptar");
    }
}


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
         url: "http://misrincones.trabajocreativo.com/app/login1.php",
         success: function (data) {
         alert('EXITO');
         },
         error: function () {
         alert('ERROR');
         }
         });
         */
        load_url("polivalente", "http://misrincones.trabajocreativo.com/app/login.php?email_sesion=" + email_sesion + "&clave_sesion=" + clave_sesion, "crear_nueva_cuenta");
    } else
    {
        $("#comprobando_login").hide();
        $("#validar_login").show();
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Mensaje de misrincones", "Aceptar");
    }

}


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
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Mensaje de misrincones", "Aceptar");
    }

}


function reproducir_video(id_video)
{
    document.getElementById("video3dark").innerHTML = "<source src='http://misrincones.trabajocreativo.com/" + id_video + "' type='video/mp4' />";
    SimularClick("play_video");
}


function SimularClick(idObjeto) {

    var nouEvent = document.createEvent("MouseEvents");
    nouEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    var objecto = document.getElementById(idObjeto);
    var canceled = !objecto.dispatchEvent(nouEvent);
}