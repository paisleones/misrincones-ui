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
                    load_url("polivalente", "http://misrincones.trabajocreativo.com/app/login.php?email_sesion=" + email_sesion + "&clave_sesion=" + clave_sesion, "crear_nueva_cuenta");
                } else
                {
                    navigator.notification.alert("Un momento!, debes rellenar todos los campos", null, "Mensaje de misrincones", "Aceptar");
                }

            }
