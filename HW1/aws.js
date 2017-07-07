// Configuring dependecies
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var fs = require('fs');
var ec2 = new AWS.EC2();

// Setting instance parameters
var params = {
  ImageId: "ami-d732f0b7",
  InstanceType: "t2.micro",
  MinCount: 1,
  MaxCount: 1,
  //insert information about security group
  SecurityGroupIds : [""],
  SecurityGroups: [""],
  // insert name of Key pair generated
  KeyName: ""
}

var inventory = "aws_inventory"

// Create the instance
ec2.runInstances(params, function(err, data) {
  if (err) { 
    console.log("Could not create instance", err); return; 
  }

  var instanceId = data.Instances[0].InstanceId;
  console.log("Created instance", instanceId);

  getDroplet(instanceId)

});


var getDroplet = function(instanceId){
  var descparams = {
    InstanceIds: [instanceId]
  }
  ec2.describeInstances(descparams, function(error, response){
    if(error){
      console.log(error);
    }
    else{
      var ip_address = response.Reservations[0].Instances[0].PublicIpAddress;
      console.log('IP address of instance: ' + ip_address);
      inventory = '\nnode1 ansible_ssh_host=' + ip_address + ' ansible_ssh_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa';
       
// Writing to inventory file
	    fs.appendFile('inventory', inventory, function (err) {
        console.log('Saved to inventory file');
	     });


    }
  });
};