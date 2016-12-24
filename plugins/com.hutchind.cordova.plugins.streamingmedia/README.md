# Cordova Streaming Media plugin

This plugin allows you to stream audio and video in a fullscreen, native player on iOS and Android.


**This version of the plugin supports a "mustWatch" option which means that the user is unable to skip forward in the video player, and an error is returned by the plugin if they do not watch until the end**

This version by [Kris Randall](https://github.com/krisrandall/), from a fork by [Feng Liu](https://github.com/goldendragon88).     
[Original plugin](https://github.com/nchutchind/cordova-plugin-streaming-media) by [Nicholas Hutchind](https://github.com/nchutchind).




## Demo

[https://github.com/krisrandall/streaming-media-plugin-demo](https://github.com/krisrandall/streaming-media-plugin-demo)



## Installation

```
cordova plugin add https://github.com/krisrandall/Streaming-Media-Cordova-Plugin.git
```

## Notes

### iOS specifics
* Uses the MPMoviePlayerController.
* Tested on iOS 7, 9

### Android specifics
* Uses VideoView and MediaPlayer.
* Creates two activities in your AndroidManifest.xml file.
* Tested on Android 4.0+

## Usage

```javascript
  var videoUrl = STREAMING_VIDEO_URL;

  // Just play a video
  window.plugins.streamingMedia.playVideo(videoUrl);

  // Play a video with callbacks
  var options = {
    seek: 5000,                 // start at 5s
    mustWatch: true,
    successCallback: function() {
      console.log("Video was closed without error.");
    },
    errorCallback: function(err) {
      console.log("Error! " + err.errMsg);
      console.log("Position! " + err.last);
    orientation: 'landscape'
  };
  window.plugins.streamingMedia.playVideo(videoUrl, options);


  var audioUrl = STREAMING_AUDIO_URL;

  // Play an audio file (not recommended, since the screen will be plain black)
  window.plugins.streamingMedia.playAudio(audioUrl);

  // Play an audio file with options (all options optional)
  var options = {
    bgColor: "#FFFFFF",
    bgImage: "<SWEET_BACKGROUND_IMAGE>",
    bgImageScale: "fit", // other valid values: "stretch"
    initFullscreen: false, // true(default)/false iOS only
    successCallback: function() {
      console.log("Player closed without error.");
    },
    errorCallback: function(errMsg) {
      console.log("Error! " + errMsg);
    }
  };
  window.plugins.streamingMedia.playAudio(audioUrl, options);

  // Stop current audio
  window.plugins.streamingMedia.stopAudio();

  // Pause current audio (iOS only)
  window.plugins.streamingMedia.pauseAudio();

  // Resume current audio (iOS only)
  window.plugins.streamingMedia.resumeAudio();  

```
