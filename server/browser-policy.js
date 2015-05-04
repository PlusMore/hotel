Meteor.startup(function() {
  // CDN
  BrowserPolicy.content.allowOriginForAll("https://*.filepicker.io");
  BrowserPolicy.content.allowOriginForAll("http://*.filepicker.io");
  // Fonts & Icons
  BrowserPolicy.content.allowOriginForAll("https://*.gstatic.com");
  BrowserPolicy.content.allowOriginForAll("https://*.googleapis.com");
  BrowserPolicy.content.allowOriginForAll("http://*.googleapis.com");
  BrowserPolicy.content.allowOriginForAll("https://fontastic.s3.amazonaws.com");
  BrowserPolicy.content.allowOriginForAll("http://fontastic.s3.amazonaws.com");
  BrowserPolicy.content.allowOriginForAll("https://*.cloudfront.net");
  // PlusMore Apps
  BrowserPolicy.content.allowOriginForAll("http://*.plusmoretablets.com");
  BrowserPolicy.content.allowOriginForAll("https://*.plusmoretablets.com");
});
