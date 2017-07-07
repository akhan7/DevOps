# Homework 4 - Advanced Docker

### Task 1: Docker Compose 
You are ready to launch your cat photo startup company. Use docker compose to setup your HW3 app in the following way:

* Setup a container for redis.
* Setup a container for proxy.
* Setup a container for node app.
* Modify infrastructure.js to spawn new containers instead of new servers.

**Steps**

1. Clone HW3 into the folder and change the localhost IP address to your machine's IP address in main.js, proxy.js and infrastructure.js.

2. Create the docker-compose.yml file as well as the Dockerfile.

3. Execute the following command:
	``` bash
		docker-compose up
	```

4. You can see that the server has been spawned at http://0.0.0.0:50102

5. For Infrastructure go to the file location of infrastructure and execute it (`node infrastructure). We can see that new servers will be spawned by going to URL http://0.0.0.0:8001/spawn


### Task 2: Docker Deploy
Extend the deployment workshop to run a docker deployment process.

* On post-receive will build a new docker image.
* Push to local registery.
* Deploy the dockerized simple node.js App. Add appropriate hook commands to pull from registery, stop, and restart containers.

**Steps**

1. Clone the [simple node.js App](https://github.com/CSC-DevOps/App) in /App directory

2. Follow the [Deployment Workshop](https://github.com/CSC-DevOps/Deployment) to set up a blue-green deployment structure

3. Go to the /deploy/blue.git/hooks directory and add this [post-receive](https://github.ncsu.edu/akhan7/HW4/blob/master/DockerDeploy/deploy/blue.git/hooks/post-receive) hook

4. Go to the /deploy/green.git/hooks directory and add this [post-receive](https://github.ncsu.edu/akhan7/HW4/blob/master/DockerDeploy/deploy/green.git/hooks/post-receive) hook

5. Change the executable permissions by using 
	```
		chmod +x /deploy/blue.git/hooks/post-receive
		chmod +x /deploy/green.git/hooks/post-receive
	```

6. Go to /App , make changes in main.js and commit them.

7. A docker container would be built and pushed into local registry.

8. Do a git push in either the green slice or the blue sliece using :

	```
		git push green master 
		git push blue master
	```

9. The post-receive hook would be invoked and the container would be pulled and deployed.

10. Now do `docker ps -a` to confirm that a new NCSU/app container has been built and go to the mapped port on the browser to view the hello message.

### Task 3: File IO

1. Create the following file structure:
	```
  		/FileIO
    	|__Container1
    	|       |______Dockerfile
    	|
    	|__Container2
            	|______Dockerfile
	```

2. Inside Container1 run the following commands:
	```
		sudo docker build -t container1 .
		sudo docker run -d --name container1 container1
	```
   This exposes the port 9001 with socat to display content of a text file.

3. Inside Container2 run the following commands:
	```
		sudo docker build -t container2 .
		sudo docker run --link container1:container1 --rm -it --name container2 container2 curl container1:9001
	```
   Creates and runs a linked container which accesses the container 1 over network


###Screencast
1. Screencast of Docker compose functionality:

	[![DockerCompose](https://github.com/akhan7/DevOps/blob/master/HW4/Screencast/1.gif)](#DockerCompose)

2. Screencast of Docker deploy functionality:

	[![DockerDeploy](https://github.com/akhan7/DevOps/blob/master/HW4/Screencast/2.gif)](#DockerDeploy)

3. Screencast of File IO functionality:

	[![FileIO](https://github.com/akhan7/DevOps/blob/master/HW4/Screencast/3.gif)](#FileIO)

