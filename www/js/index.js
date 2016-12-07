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
  document.addEventListener("offline", function() {
    $( "#error" ).show();
    navigator.notification.alert("No tienes conexión a internet. Ten en cuenta que las secciones pueden verse afectadas", null, "Sin conexión", "Aceptar");
  });

    }
    
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
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
