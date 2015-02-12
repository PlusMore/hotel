Inject.rawHead 'loader-style',
  # Force the initial scale for Android and iOS as our spinner may be
  #  distorted by their default viewport values.
  '<meta name="viewport" content="width=device-width,maximum-scale=1,' +
    'initial-scale=1,user-scalable=no">' +
  # The loading spinner needs some theming.
  '<style>' +
    'html{background-color: #F0F3F3;}' +
    '.app-loader {'+
      'position: fixed;'+
      'top: 0px;'+
      'left: 0px;'+
      'width: 100%;'+
      'height: 100%;'+
      'background-color: #F0F3F3;'+
      'text-align: center;'+
      'z-index: 9999999;'+
      'visibility: visible;'+
    '}'+
    '.app-loader .loader-text {'+
      'font-size: 2em;'+
      'height: 1em;'+
      'text-align: center;'+
      'position: absolute;'+
      'left: 0;'+
      'right: 0;'+
      'top: 15px;'+
      'bottom: 0;'+
      'margin: auto;'+
      'color: #27b6af;'+
    '}'+
    '.app-loader .spinner {'+
      'margin: 100px auto 0;'+
      'width: 70px;'+
      'height: 70px;'+
      'text-align: center;'+
      'position: absolute;'+
      'left: 0;'+
      'right: 0;'+
      'top: 0;'+
      'bottom: 0;'+
      'margin: auto;'+
    '}'+
    '.app-loader .spinner > div {'+
      'width: 18px;'+
      'height: 18px;'+
      'background-color: #27b6af;'+
      'border-radius: 100%;'+
      'display: inline-block;'+
      '-webkit-animation: bouncedelay 1.4s infinite ease-in-out;'+
      'animation: bouncedelay 1.4s infinite ease-in-out;'+
      '-webkit-animation-fill-mode: both;'+
      'animation-fill-mode: both;'+
    '}'+
    '.app-loader .spinner .bounce1 {'+
      '-webkit-animation-delay: -0.32s;'+
      'animation-delay: -0.32s;'+
    '}'+
    '.app-loader .spinner .bounce2 {'+
      '-webkit-animation-delay: -0.16s;'+
      'animation-delay: -0.16s;'+
    '}'+
    '@-webkit-keyframes bouncedelay {'+
      '0%, 80%, 100% {'+
        '-webkit-transform: scale(0);'+
      '}'+
      '40% {'+
        '-webkit-transform: scale(1);'+
      '}'+
    '}'+
    '@keyframes bouncedelay {'+
      '0%, 80%, 100% {'+
        'transform: scale(0);'+
        '-webkit-transform: scale(0);'+
      '}'+
      '40% {'+
        'transform: scale(1);'+
        '-webkit-transform: scale(1);'+
      '}'+
    '}'+
    '</style>'
# The loading spinner is a CSS animation.
# /!\ WARNING: The trick is to create a fake body by injecting data
# in the HTML's head as Meteor is requesting JS  file in a blocking
# fashion and mobile only allow 1 HTTP request at a time on a GPRS network.
Inject.rawHead 'loader-body2', 
  '<body>'+
  '<div id="injected-loader" class="app-loader">'+
    '<div class="spinner">'+
      '<div class="bounce1"></div>'+
      '<div class="bounce2"></div>'+
      '<div class="bounce3"></div>'+
    '</div>'+
  '</div>'+
  '</body>'