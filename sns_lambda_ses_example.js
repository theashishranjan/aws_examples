'use strict';

var aws = require('aws-sdk');

var ses = new aws.SES();
var s3 = new aws.S3();

exports.handler = function (event, context, callback) {
    const sns_message = event.Records[0].Sns.Message;
    callback(null, sns_message);

    // Parse the message received from SNS.
    var message = JSON.parse(sns_message);
    var subject = message['subject'];
    
    var params = {
        Destination: {
            ToAddresses: [message['email_to']]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: 'UTF-8'
            }
        },
        Source: message['email_from'],
        ReplyToAddresses: [message['reply_to']]
    };

    var html_message = "<html>\
        <head><meta content='text/html; charset=UTF-8' http-equiv='Content-Type' /></head>\
        <body>\
        <p>Hello" + message['first_name'] + ",</p>\
        <p>This is a test email.</p><br>\
        <p>Regards</p>\
        <p>" + message['sender_name'] + "</p>\
        </body></html>";


    params.Message.Body = {
        Html: {
            Data: html_message,
            Charset: 'UTF-8'
        }
    };

    // Send the email
    ses.sendEmail(params, function (err, data) {
        if (err) {
            context.fail('Error: The email sending failed.');
            console.log(err, err.stack);
        } else {
            context.succeed('The email was successfull sent');
        }
    });
};