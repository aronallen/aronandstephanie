'use strict';
/*globals console:false*/
// This file is injected in the app bundle in development mode and ignored when
// building for production.

// Get current hostname (without port number) or localhost if undefined.
var hostname = (window.location.host || 'localhost').split(':')[0];

if(!window.WebSocket) {

} else {
  // Setup LiveReload. Inspired by:
  // http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-
  var liveReloadScript = document.createElement('script');
  liveReloadScript.src = 'http://' + hostname + ':35729/livereload.js?snipver=1';
  liveReloadScript.onerror = function() {
    console.log('Dev Info: To support LiveReload, in your terminal run: gulp');
  };
  liveReloadScript.onload = function() {
    console.log('Using LiveReload for your CSS and JS.');
  };
  document.getElementsByTagName('head')[0].appendChild(liveReloadScript);

  // Give a notice to the developer.
  console.log('Running in development mode!');
}
