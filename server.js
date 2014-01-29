/**
 * Created by Dmitry on 29.01.14.
 */
var http = require('http');
var gstring = require('querystring');
var server = new http.Server();

users = new Array();

http.createServer(function (req, res) {
    var response = '';

    //Parsing data from POST request
    if(req.method == 'POST') {
        var body = '';
        var fields = null;

        //Collecting fields
        req.on('data', function(data) {
            body += data;
        });

        //Parsing fields and response generation
        req.on('end', function() {
            fields = gstring.parse(body);

            var email = fields.email;
            var password = fields.password;
            var conf = fields.conf_password;

            if(password != conf) {
               response = 'Passwords do not match!';
            }
            else {
               if(users[email]) {
                   console.log("Users");
                   for(var user in users) {
                      console.log("email: " + user + " password: " + users[user]);
                   }
                   response = 'Such user already exist';
               }
               else {
                  users[email] = password;
                  response = Date.now() + ': User registered';
               }
            }
            res.end(response);
        });
    }
}).listen(240);
