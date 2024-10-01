// ==UserScript==
// @name         Fullscreen Spoofing / Bypass
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Spoofs fullscreen mode to prevent exits from fullscreen requests
// @author       kalry
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fakeFullscreen = {
        requestFullscreen: function() {
            return new Promise((resolve) => {
                console.log("Requested fullscreen mode (spoofed).");
                resolve();
            });
        },
        exitFullscreen: function() {
            return new Promise((resolve) => {
                console.log("Exiting fullscreen mode (spoofed).");
                resolve();
            });
        },
        get fullscreenElement() {
            return document.documentElement;
        },
        get fullscreenEnabled() {
            return true;
        }
    };

    document.documentElement.requestFullscreen = fakeFullscreen.requestFullscreen;
    document.exitFullscreen = fakeFullscreen.exitFullscreen;

    Object.defineProperty(document, 'fullscreenElement', {
        get: function() {
            return fakeFullscreen.fullscreenElement;
        }
    });

    Object.defineProperty(document, 'fullscreenEnabled', {
        get: function() {
            return fakeFullscreen.fullscreenEnabled;
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            console.log('Detected exit from fullscreen mode. Restoring fullscreen (spoofed).');
            document.documentElement.requestFullscreen();
        }
    });

    document.addEventListener('webkitfullscreenchange', () => {
        if (!document.webkitFullscreenElement) {
            console.log('Detected exit from fullscreen mode. Restoring fullscreen (spoofed).');
            document.documentElement.webkitRequestFullscreen();
        }
    });

    document.addEventListener('mozfullscreenchange', () => {
        if (!document.mozFullScreenElement) {
            console.log('Detected exit from fullscreen mode. Restoring fullscreen (spoofed).');
            document.documentElement.mozRequestFullScreen();
        }
    });

    document.addEventListener('msfullscreenchange', () => {
        if (!document.msFullscreenElement) {
            console.log('Detected exit from fullscreen mode. Restoring fullscreen (spoofed).');
            document.documentElement.msRequestFullscreen();
        }
    });
})();
