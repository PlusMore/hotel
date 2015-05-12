Meteor.startup(function() {
  BrowserPolicy.content.disallowInlineScripts();

  var trustedSecure = [
    '*.google.com',
    '*.cloudfront.net',
    '*.plusmoretablets.com',
    '*.plusmore.io',
    '*.kadira.io',
    'fontastic.s3.amazonaws.com',
    'query.yahooapis.com'
  ];

  var trustedBoth = [
    '*.gstatic.com',
    '*.filepicker.io',
    '*.googleapis.com'
  ]

  _.each(trustedSecure, function(trustedDomain) {
    allowDomainAsOrigin(trustedDomain, false)
  });

  _.each(trustedBoth, function(trustedDomain) {
    allowDomainAsOrigin(trustedDomain, true)
  });

});

var allowDomainAsOrigin = function(domain, allowHttp) {
  if (allowHttp) {
    origin = "http://" + domain; // this should only be allowed when over http, don't know how to do that though
    BrowserPolicy.content.allowOriginForAll(origin);
  }

  secureOrigin = "https://" + domain;
  BrowserPolicy.content.allowOriginForAll(secureOrigin);
};
