/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const AWS = require("aws-sdk");
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/ec2', function (req, res) {
  let result = [];
  let params = {};
  let _region = process.env.AWS_REGION;
  const query = req.query;
  if (query.region) {
    console.log(query.region);
    _region = query.region
  }
  console.log("_region =" + _region);
  let ec2 = new AWS.EC2({ apiVersion: '2016-11-15', region: _region });
  ec2.describeInstances(params, function (err, data) {
    if (err) {
      console.error(err);
      res.json({ error: err, url: req.url, body: req.body });
    }
    else {
      for (let i in data.Reservations) {
        let reservation = data.Reservations[i];
        for (let j in reservation.Instances) {
          let instance = reservation.Instances[j];
          let item = {};
          item["id"] = instance.InstanceId;
          item["type"] = instance.InstanceType;
          item["keyname"] = instance.KeyName;
          item["state"] = instance.State.Name;
          item["vpc"] = instance.VpcId;
          item["subnet"] = instance.SubnetId;
          item["zone"] = instance.Placement.AvailabilityZone;
          result.push(item);
        }
      }
      console.log(JSON.stringify(result));
      res.json({
        success: "succeed!",
        url: req.url,
        body: result
      });
    }
  });
  //res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/ec2/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/ec2', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.post('/ec2/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/ec2', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/ec2/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/ec2', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/ec2/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
