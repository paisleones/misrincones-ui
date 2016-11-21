/*------------------------------------------------------------------
Theme Name: Astro
Theme URL: http://codnauts.com
Author: Codnauts
Author URI: http://themeforest.net/user/codnauts
Version: 1.0
Template License: Regular or Extended from ThemeForest only
Plugin Licenses: GPL or MIT
Last change: first release
Primary use: App & Mobile Website  
-------------------------------------------------------------------*/

// Adding strict mode
"use strict";

// This script prevents links from opening in Mobile Safari. https://gist.github.com/1042026
(function(a, b, c) {
    if (c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener("click", function(a) {
            d = a.target;
            while (!f.test(d.nodeName)) d = d.parentNode;
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
        }, !1)
    }
})(document, window.navigator, "standalone");

$( document ).ready(function() {
    $('.button-collapse').sideNav({
        menuWidth: 280, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    $('.collapsible').collapsible();

    $('.open-right').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $('.collapsible').collapsible();
});