// Copyright (C) 2013 Massachusetts Institute of Technology
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 2,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

// Scratch HTML5 Player
// Scratch.js
// Tim Mickel, July 2011

// Here we define the actions taken on window load.
// The three application-wide global variables are defined here.

'use strict';

var runtime, interp, io, iosAudioActive = false;

function Scratch(project_id) {
    runtime = new Runtime();
    runtime.init();

    $(window).keydown(function(e) {
        runtime.keysDown[e.which] = true;
        runtime.startKeyHats(e.which);
    });

    $(window).keyup(function(e) {
        delete runtime.keysDown[e.which];
    });

    var address = $('#address-hint');
    var project = $('#project-id');

    // Update the project ID field
    project.val(project_id);

    // Validate project ID field
    project.keyup(function(e) {
        var n = this.value;

        // Allow URL pasting
        var valid = /projects\/(\d+)/.exec(n);
        if (valid) {
            n = this.value = e[1];
        }

        // Eventually, this will xhr to /projects/{{this.value}}/ and
        // change color based on whether the response is 404 or 200.
        $('#project-id, #address-hint').toggleClass('error', isNaN(n));

        if(!isNaN(n) && e.keyCode === 13) {
          $('#go-project').trigger('click');
          return;
        }
    });

    // Focus the actual input when the user clicks on the URL hint
    address.click(function() {
        project.select();
    });

    /*var width = address.outerWidth();
    project.css({
        paddingLeft: width,
        marginLeft: -width
    });*/

    // Go project button behavior
    $('#go-project').click(function() {
        window.location = '#' + parseInt($('#project-id').val());
        window.location.reload(true);
    });

    // Green flag behavior
    $('#trigger-green-flag, #overlay').click(function() {
        if (!runtime.projectLoaded) return;
        $('#overlay').css('display', 'none');
        runtime.greenFlag()
    });

    // Stop button behavior
    $('#trigger-stop').click(function() {
        runtime.stopAll();
    });

/*
    // Canvas container mouse events
    $('#container').mousedown(function(e) {
        runtime.mouseDown = true;
        //e.preventDefault();
    });

    $('#container').mouseup(function(e) {
        runtime.mouseDown = false;
        //e.preventDefault();
    });

    $('#container').mousemove(function(e) {
        var bb = this.getBoundingClientRect();
        var absX = e.clientX - bb.left;
        var absY = e.clientY - bb.top;
        runtime.mousePos = [absX-240, -absY+180];
    });
  */

    // Touch events - EXPERIMENTAL
    $(window).bind('touchstart', function(e) {
        // On iOS, we need to activate the Web Audio API
        // with an empty sound play on the first touch event.
        if (!iosAudioActive) {
            var ibuffer = runtime.audioContext.createBuffer(1, 1, 22050);
            var isource = runtime.audioContext.createBufferSource();
            isource.buffer = ibuffer;
            isource.connect(runtime.audioContext.destination);
            isource.start();
            iosAudioActive = true;
        }
    });

    function getMousePos(e) {
        var e = (e.originalEvent.touches && e.originalEvent.touches[0]) ||
                    (e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) ||
                    e;
        var bb = this.getBoundingClientRect();
        var absX = e.clientX - bb.left;
        var absY = e.clientY - bb.top;
        return [absX-240, -absY+180];
    }

    $('#container').bind('mousedown touchstart', function(e) {
        runtime.mouseDown = true;
        runtime.mousePos = getMousePos.call(this, e);
    });

    $('#container').bind('mouseup touchend', function(e) {
        runtime.mouseDown = false;
        runtime.mousePos = getMousePos.call(this, e);
    });

    $('#container').bind('mousemove touchmove', function(e) {
      runtime.mousePos = getMousePos.call(this, e);
    });

    // Border touch events - EXPERIMENTAL
    $('#left').bind('touchstart touchmove', function(e) { runtime.keysDown[37] = true; runtime.startKeyHats(37); });
    $('#left').bind('touchend', function(e) { delete runtime.keysDown[37]; });
    $('#up').bind('touchstart touchmove', function(e) { runtime.keysDown[38] = true; runtime.startKeyHats(38); });
    $('#up').bind('touchend', function(e) { delete runtime.keysDown[38]; });
    $('#right').bind('touchstart touchmove', function(e) { runtime.keysDown[39] = true; runtime.startKeyHats(39); });
    $('#right').bind('touchend', function(e) { delete runtime.keysDown[39]; });
    $('#down').bind('touchstart touchmove', function(e) { runtime.keysDown[40] = true; runtime.startKeyHats(40); });
    $('#down').bind('touchend', function(e) { delete runtime.keysDown[40]; });

    // Load the interpreter and primitives
    interp = new Interpreter();
    interp.initPrims();

    // Load the requested project and go!
    io = new IO();
    io.loadProject(project_id);
};
