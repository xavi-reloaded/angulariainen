// This file is used to load the video.js source files into a page
// in the correct order based on dependencies.
// When you create a new source file you will need to add
// it to the list below to use it in sandbox/index.html and
// test/index.html

// You can use the projectRoot variable to adjust relative urls
// that this script loads. By default it's "../", which is what /sandbox
// and /test need. If you had sandbox/newDir/index.html, in index.html you
// would set projectRoot = "../../"

// We could use somehting like requireJS to load files, and at one point
// we used goog.require/provide to load dependencies, but that seems like
// overkill with the small number of files we actually have.

// ADD NEW SOURCE FILES HERE
var sourceFiles = [
  "goog.base.js",
  "core.js",
  "events.js",
  "lib.js",
  "component.js",
  "player.js",
  "controls.js",
  "media.js",
  "media.html5.js",
  "media.flash.js",
  "tracks.js",
  "json.js",
  "setup.js",
  "plugins.js",
  "exports.js"
];

// Allow overriding the default project root
var projectRoot = projectRoot || '../app/lib/video-js/';

function loadScripts(scriptsArr){
  for (var i = 0; i < scriptsArr.length; i++) {
    // Using document.write because that's the easiest way to avoid triggering
    // asynchrnous script loading
    document.write( "<script src='" + projectRoot + scriptsArr[i] + "'><\/script>" );
  }
}

// We use this file in the grunt build script to load the same source file list
// and don't want to load the scripts there.
if (typeof blockSourceLoading === 'undefined') {
  loadScripts(sourceFiles);

  // Allow for making Flash first
  if (window.location.href.indexOf("?flash") !== -1) {
    // Using doc.write to load this script to, otherwise when it runs videojs
    // is undefined
    document.write('<script>videojs.options.techOrder = ["flash"];videojs.options.flash.swf = "../src/swf/video-js.swf";</script>')
  }
}


