// Adding dependant variables
var needle = require("needle");
var os   = require("os");
var fs = require("fs");
var sleep = require("sleep");
global.dropletId = ''
var config = {};
// insert token here
config.token = "";
var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};

var client =
{
	listRegions: function( onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/regions", {headers:headers}, onResponse)
	},

	listIP: function( onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/droplets/" + dropletId, {headers:headers}, onResponse)
	},

	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			// Id to ssh_key associated with account
			"ssh_keys":[],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		console.log("Attempting to create: "+ JSON.stringify(data) );

		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	}
};

// Creating droplet
 var name = "akhan7"+os.hostname();
 var region = "nyc1";
 var image = "ubuntu-14-04-x64";
 client.createDroplet(name, region, image, function(err, resp, body)
 {
 	console.log('Digital ocean droplet created!')
 	console.log(body);
 	// StatusCode 202 - Means server accepted request.
 	if(!err && resp.statusCode == 202)
 	{	

 		dropletId = body.droplet.id;

 	}
// Using the sleep function to ensure droplet is created and ssh is working
 	sleep.sleep(10);
// Functioning listing the droplet IP
 	client.listIP(function(error, response)
 		{
 			var data = response.body;
 			if( data.droplet )
 			{
 				console.log('IP address of droplet: ' + data.droplet.networks.v4[0].ip_address);
 				fileInfo = 'digitalocean_node ansible_ssh_host=' + data.droplet.networks.v4[0].ip_address + ' ansible_ssh_user=root'
 				fs.writeFile('inventory', fileInfo, (err) => {
  				if (err) throw err;
  				console.log('Saved to inventory file');
  				
  			});

 			}
	 	});
 	
 });
