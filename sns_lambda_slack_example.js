'use strict';

var https = require('https');
var util = require('util');

exports.handler = function(event, context) {
    // Reading SNS message.
    var message = event.Records[0].Sns.Message;
    
    var postData = {
        "channel": "#random", // Channel name to which you want to post.
        "username": "awesome_bot", // Name of the bot who will be posting this message
        "text": message,
        "icon_emoji": ":robot_face:"
    };

    // You can add extra data with color codes if you wish.
    postData.attachments = [
        {
            color: 'green',
            data: 'Hello World!'
        }
    ];

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
};