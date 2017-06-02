angular.module('CMC-Ext').controller('Login-Ctrl', function($scope, $state, $stateParams, $localStorage){

	$scope.getUserDetails = function(conn, UserId)
	{
		console.log(conn);
		conn.query("SELECT ID, FirstName, LastName, SmallPhotoUrl, FullPhotoUrl, ContactId, Email, Phone From User where Id = '" +UserId+ "'")
		.then(function(res) {
		    //if (err) { console.log('query user?'); }
		    console.log('User Details');
		    console.log(res);
		    $localStorage.User = res.records[0];
		    $localStorage.ViewAsUser = res.records[0];
		    $localStorage.ViewAsUser.FullName = res.records[0].FirstName + ' ' + res.records[0].LastName;

		    return conn.query("SELECT Id FROM Contact where Salesforce_User_Id__c = \'"+UserId+"\' or pse__Salesforce_User__c = \'"+UserId+"\'");
		  })
		.then(function(ret) {
			console.log('Contact Id Value');
			console.log(ret);
			$localStorage.ViewAsUser.ContactId = ret.records[0].Id;
			//window.close();
			window.location.href = "#/CEM-Dashboard"
			// ...
		}, function(err) {
			console.log('err Value');
			console.log(err);
		});
	}


	console.log('In Login Controller');
	console.log($state.current.name);
	console.log($stateParams);
	
	if( $localStorage.UserAuth != null )
	{
		console.log($localStorage.UserAuth.accessToken);
		console.log($localStorage.UserAuth.refreshToken);
	}
	
	if( $state.current.name == 'ClearUser')
	{
		$localStorage.User = null;
		$localStorage.UserAuth = null;
		$localStorage.ViewAsUser = null;
		window.location.href = "#/Login";
	}
	else if( $state.current.name == 'ResetLogin')
	{
		$localStorage.User = null;
		$localStorage.UserAuth = null;
		window.location.href = "#/OauthLogin";
	}
	else if( $state.current.name == 'OauthLogin')
	{
		if( $localStorage.UserAuth == null || $localStorage.UserAuth == undefined || $localStorage.UserAuth.accessToken == null || $localStorage.UserAuth.accessToken == undefined || $localStorage.UserAuth.refreshToken == null || $localStorage.UserAuth.refreshToken == undefined )
		{
			console.log('localstorage not present.')
			console.log('Execute OauthLogin');

			jsforce.browser.init({
			  clientId: '3MVG9i1HRpGLXp.reEq0HmhlJzGTzYRIwa8bY19Z_.j_cRU2swpBdmA.W3ypOJjx.MwbjmMoDGILzmM0TlHG6',
			  clientSecret: '2130532915870108718',
			  redirectUri: 'http://localhost:5000/',
			  instanceUrl: 'https://appirio.my.salesforce.com/', 
			  proxyUrl: 'http://localhost:5000/proxy/'
			});

			jsforce.browser.login();
		}
		
		$scope.UserDetails(conn);
			
	}
	else if( $state.current.name == 'OauthToken')
	{
		var url = window.location.href;
		console.log('Execute OauthToken');
		var oauthAccessToken = url.substring(url.indexOf('access_token=')+'access_token='.length, url.indexOf('&refresh_token='));
		console.log('access_token='+oauthAccessToken);
		var oauthRefreshToken = getParameterByName('refresh_token');
		console.log('refresh_token='+oauthRefreshToken);


		$localStorage.UserAuth = { 	accessToken : oauthAccessToken,
									refreshToken : oauthRefreshToken
								};

	
		var conn = new jsforce.Connection({ 
											oauth2 : {
											    clientId: '3MVG9i1HRpGLXp.reEq0HmhlJzGTzYRIwa8bY19Z_.j_cRU2swpBdmA.W3ypOJjx.MwbjmMoDGILzmM0TlHG6',
												clientSecret: '2130532915870108718',
		  										redirectUri: 'http://localhost:5000/'
											},
											accessToken: oauthAccessToken, 
											refreshToken: oauthRefreshToken,
											instanceUrl: 'https://appirio.my.salesforce.com/', 
											proxyUrl: 'http://localhost:5000/proxy/'
										  });


		console.log(conn);

		conn.query('select name from account', function(res) {
			console.log('test accounts query');
			console.log(res);
			console.log('test end');
        });
		
		
		var UserId = getParameterByName('id');
		console.log(UserId);
		UserId = UserId.substring(UserId.length-18, UserId.length);
		console.log(UserId);
		$localStorage.User = {};

		$scope.getUserDetails(conn, UserId);
		
		
	}



});