/** Define basic express app **/

var express = require('express');
var app = express();

/*
app.use(express.cookieParser());

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
});
*/



/**** Setup Web App essentials **/

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(request, response) {
  response.render('pages/index');
});



// routes ======================================================================
//require('./NodeApp/routes.js')(app);
//require('./NodeApp/jsforce-ajax-proxy.js')(app);


var jsforceAjaxProxy = require('jsforce-ajax-proxy');
app.all('/proxy/?*', jsforceAjaxProxy());


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});





