# Queues

This assignment is based on the workshop https://github.com/CSC-DevOps/Queues

The repository consist of two *.js files: main.js and proxy_server.js

### Main.js does the following : 

#### SET/GET for an expiring cache
    
When we run main.js on the local port 3000, then 'localhost:3000/set' sets a key "myKey". 
The value is set to expire after 10 sec. The /get routine displays this value on 'localhost:3000/get'

#### RECENT

When we run main.js on the local port 3000, then 'localhost:3000/recent' displays a list of 10 recently visited sites

#### upload/meow
    
The following curl command is used to upload image from the command line. (As given in Workshop)

```bash
    curl -F "image=@./img/hairypotter.jpg" localhost:3000/upload
```

The method /upload is used to save the image in a queue. The method /meow when called, pops it from the queue and displays on localhost:3000/meow.

#### spawn/destroy/listservers

When we run the following command:

```javascript
	node main.js 3000
```
Then the localhost:3000/spawn URL takes the *3000* argument from the command line interface and spawns another server on +1 port from the initial port (Eg. in case `node main.js 3000` is executed then new server is spawned on port 3001, then again on 3002 and so on).

localhost:3000/listservers is the URL to see the number of servers spawned as well as the ports on which they are activated.

localhost:3000/destroy destroys any one of the servers active. The choice of server destroyed is randomised. Please note that servers are only destroyed if there are more than 1 servers spawned. Else an error message is displayed in the URL.   

### proxy.js does the following : 

#### 'proxy' service for load-balancing
    
proxy.js creates a proxy server that listens on port 9000 and load balances the requests to all the ports spawned. We can check which servers are currently active using `localhost:3000/listservers` URL. When main.js is running, execute the following command:

```javascript
    node proxy.js
```

This will open the proxy server on `localhost:9000` and using the command line we can see which server the proxy server directs to. If we open the same URL aka the proxy server again then we can see a different server on the command line and this is how the proxy server does load balancing.

## Screencast

1. Screencast of SET/GET functionality:

	[![setget](https://github.com/akhan7/DevOps/blob/master/HW3/Screencast/setget.gif)](#SET/GET)

2. Screencast of upload/meow functionality:

	[![meow](https://github.com/akhan7/DevOps/blob/master/HW3/Screencast/meow.gif)](#meow)

3. Screencast of recent functionality:

	[![recent](https://github.com/akhan7/DevOps/blob/master/HW3/Screencast/recent.gif)](#recent)

4. Screencast of spawn/destroy/listservers functionality:

	[![spawn](https://github.com/akhan7/DevOps/blob/master/HW3/Screencast/spawn.gif)](#spawn)

5. Screencast of proxy functionality:

	[![proxy](https://github.com/akhan7/DevOps/blob/master/HW3/Screencast/proxy.gif)](#proxy)

