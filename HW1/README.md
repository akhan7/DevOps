## Preparations
To install all dependencies, first run dependencies.sh. This will install ansible along with other dependencies on your system.

## Instructions
1. Make accounts with Digital Ocean and AWS. 

2. Generate the security token for Digital Ocean and save it, it will be needed in the code to authenticate you. 

3. Generate the secret access key and access key ID for AWS, this will also be needed in the code.

4. Generate SSH keys and save them in the .ssh folder, configure your Digital Ocean and AWS account with these keys for authentication purposes.

5. Create a .aws folder in your home directory and create a new file __credentials__ which will have the AWS secret access key ID and secret access key. This will be used by the aws.js code for authentication purposes. Write the following in the __credentials__ file:

  ```
  [default]
  aws_access_key_id = PASTE AWS ACCESS KEY ID HERE
  aws_secret_access_key = PASTE AWS SECRET ACCESS KEY HERE
  ```

6. Now run

  ``` javascript
  node digitalocean.js
  ```
This will create a droplet in your account, look up it's IP address and create an inventory file consumible by Ansible.

7. Next run

  ``` javascript
  node aws.js
  ```
This will create an AWS EC2 instance, look up it's IP address and append the inventory file.

8. We have to now create the nginx web servers through Ansible using the inventory file generated. 
  
  __IMPORTANT__: We must wait for about a minute after the droplets and instances have been created so that they're status is in the ready state and they can have SSH capabilities. If the code below doesn't work, try again after waiting for about a minute.

  Run the following code:
  ```
  ansible-playbook playbook.yml -i inventory
    ```
This will install nginx servers on the IP address of the droplet and EC2 instance.

9. Copy the 2 IP address from the command line/inventory file and paste them in the browser. A message will be displayed saying nginx server successfully installed.

## Wiki
Amazon EC2: Amazon EC2 or Elastic Computer Cloud is a commercial web service from AWS which allows customers to create virtual machines from the EC2 cloud. EC2 provides storage, processing and web services to customers. It's a virtual computing environment that can be loaded with a variety of OS's, have a variety of configurations depending on the customers needs. It lets customers load custom applications, launch a variety of operating systems and manage your network's access permissions.

## Screencast

1. GIF of the dependencies.sh being executed to install all the dependies, and then creating the digital ocean droplet and AWS instance. 
  [![Screencast](https://github.com/akhan7/DevOps/blob/master/HW1/GIFS/Part1.gif)](#Screencast)

2. GIF of Ansible using the inventory file to install and configure the nginx web servers on the IP addresses of the instances. 
  [![Screencast](https://github.com/akhan7/DevOps/blob/master/HW1/GIFS/Part2.gif)](#Screencast)
