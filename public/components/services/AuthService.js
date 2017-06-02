
var app = angular.module('CMC-Ext');

app.service('$authService', ['$http', '$localStorage', function($http, $localStorage) {

  var self = this;

  var TYPE_SUCCESS = 'success';
  var TYPE_ALERT = 'alert';


  self.conn = null;//sf connection
  self.User = null;
  
  self.isAuthenticated = function() {

    console.log('in isAuthenticated');
    console.log($localStorage);
    console.log($localStorage.User);



    if( $localStorage.User != null && $localStorage.User != undefined && $localStorage.UserAuth != null && $localStorage.UserAuth != undefined )
    {
      self.conn = new jsforce.Connection({ 
                      oauth2 : {
                          clientId: '3MVG9i1HRpGLXp.reEq0HmhlJzGTzYRIwa8bY19Z_.j_cRU2swpBdmA.W3ypOJjx.MwbjmMoDGILzmM0TlHG6',
                        clientSecret: '2130532915870108718',
                          redirectUri: 'http://localhost:5000/'
                      },
                      accessToken: $localStorage.UserAuth.accessToken, 
                      refreshToken: $localStorage.UserAuth.refreshToken,
                      instanceUrl: 'https://appirio.my.salesforce.com/', 
                      proxyUrl: 'http://localhost:5000/proxy'
                      });
      self.User = $localStorage.User;
      self.ViewAsUser = $localStorage.ViewAsUser;

      return true;
    }

    window.location.href = '#/Login';

  };

}]);