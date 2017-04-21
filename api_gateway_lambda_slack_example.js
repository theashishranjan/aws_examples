'use strict';

var https = require('https');
var util = require('util');

exports.handler = (event, context, callback) => {
    var statusCode = 200;
    var body = null;

    var param_data = event.queryStringParameters.param_name;

    if(validateData(param_data)){
        body = JSON.stringify(param_data);

        var postData = {
            "channel": "#random", // Channel name to which you want to post.
            "username": "awesome_bot", // Name of the bot who will be posting this message
            "text": body,
            "icon_emoji": ":robot_face:"
        };

        var options = {
            method: 'POST',
            hostname: 'hooks.slack.com',
            port: 443,
            path: '<slack_inbound_webhook_url>' // eg: /services/Y0Q11D6OP/Mff5PJ000/aksdn3232ASs34maYk'
        };
    
        var req = https.request(options, function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            context.done(null);
          });
        });
        
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });    
    
        req.write(util.format("%j", postData));
        req.end();
    } else {
        statusCode = 422;
        body = "Invalid data format";
    }

    var res = {
        'statusCode': statusCode, 
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            "content-type": "application/json"
         },
        'body': body
    };

    callback(null, res);

    function validateData(data){
        // Check data validity if required, eg: email regex etc

        return true;
    }
};