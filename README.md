# Introduction

This repo lists sample codes to demonstrate usage of different services of AWS, Slack/Flock, google scripts for quick small projects to avoid large setups. 

# General approach

Collect data and trigger an AWS lambda function on receiving data. Process data and push it a Slack Channel and/or write to a google sheet.

There are various ways to trigger an AWS Lambda function, I have listed some below:

  1. API Gateway: Create HTTPS routes, public or protected. Lambda function can be triggered on each request received.
  2. SNS: If you have an already existing API or process, you can push a notifiication to SNS and trigger a Lambda function. Like sending email when the API is called.
  3. S3: A scenario where you have to carry out some task when a file/object is uploaded to S3.

# Notes

### AWS Lambda

Create a blank Lambda function and select a trigger. if you select API gateway, it will be created by default which you can modify to suit your needs
    
Same works for SNS. You can create a endpoint in SNS and add it to Lambda as trigger .


### Slack / Flock

Webhooks can be easily created using their GUI.

**Inbound webhook**: Use it to post to Slack or Flock

**Outbound webhook**: Push data from slack to some external source.

### Google script

Each Google sheet or google doc can have a script attached to it. *Tools -> Script Editor*.

In the script editor, there should either be a ```doPost``` or ```doGet``` method. Then you can Publish the script by selecting *Publish -> Deploy* as web App. While publishing in the section who can access the app, select : *Anyone, even anonymous*