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
        cache: false,
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
                cache: false,
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

function iniciar_sesion()
{
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
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Mensaje de misrincones", "Aceptar");
    }

}


function validar_nuevo_rincon()
{
    var titulo_rincon = $('#titulo').val();
    var descripcion_rincon = $('#descripcion').val();
    var rating_rincon = $('#score_rating').val();
    var categoria_rincon = $('#categoria').val();
    var tipo_rincon = $('#tipo').val();
    var uri_video_rincon = $('#uri_video').html();
    var uri_foto_rincon = $('#uri_foto').html();


    if (categoria_rincon == undefined)
    {
        $("#boton_categoria").addClass("input_login_error");
        var validar1 = 0;

    } else
    {
        $("#boton_categoria").removeClass("input_login_error");
        var validar1 = 1;
    }

    if (tipo_rincon == undefined)
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

    if (uri_foto_rincon == "")
    {
        $("#rincon_foto").addClass("input_login_error");
        var validar7 = 0;
    } else
    {
        $("#rincon_foto").removeClass("input_login_error");
        var validar7 = 1;
    }


    if (validar1 == 1 && validar2 == 1 && validar3 == 1 && validar4 == 1 && validar5 == 1 && validar6 == 1 && validar7 == 1)
    {
        guardar_rincon();
    } else
    {
        navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Mensaje de misrincones", "Aceptar");
    }

}
