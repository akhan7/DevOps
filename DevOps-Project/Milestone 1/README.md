# Project Members:
1. Ahmad Saad Khan (akhan7)
2. Diksha Gohlyan (dgohlya)
3. Manasee Joshi (mjoshi2)

# MILESTONE 1

## Setup

1. Install Jenkins - 
    -   wget -q -O - https://jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -
    -   sudo sh -c 'echo deb http://pkg.jenkins-ci.org/debian binary/ > /etc/apt/sources.list.d/jenkins.list'
    -   sudo apt-get update
    -   sudo apt-get install jenkins

2. Open the web browser and type in the address bar - localhost:8080. This will take you to the Dashboard of Jenkins

3. Configure Jenkins to install the Github plugin
    - Go to Manage Jenkins 
    - Go to Manage Plugins
    - Install Github Plugin

4. Install ext-Email plugin (to enable notification emails as post-build actions) -
    - Go to Manage Jenkins
    - Go to Manage Plugins
    - Install ext-email plugin 

5. Configure the SMTP server, port, sender address and receiver address(es)

6. Set the Git repository on which the jobs will be created by giving the appropriate URL, and login credentials.

7. In /var/lib/Jenkins folder create a pair of SSH keys
    - ssh-keygen -t rsa

8. Copy the public key (id_rsa.pub) and add it to Github
    - Go to Settings
    - Go to Deploy Keys
    - Add a key, give it a name and paste the id_rsa.pub contents into the body. Save.


## Build

1. To trigger a build in response to a commit, make a post-commit file in /.git/hooks folder. Every time a commit is made, the script in post-commit is executed.
[![post-commit](https://github.com/akhan7/DevOps/blob/master/DevOps-Project/Milestone%201/Screenshots/postcommit.png)](#post-commit)

2. We need to have multiple jobs corresponding to multiple branches. Thus we have made two jobs in Jenkins called M1-dev and M1-release, corresponding to the branches. The post-commit hook checks in which branch the commit is being made and executes the build job accordingly.
[![jenkins-dashboard](https://github.com/akhan7/DevOps/blob/master/DevOps-Project/Milestone%201/Screenshots/jenkins.png)](#jenkins-dashboard)

3. The build job itself is executed by executing a shell script "dependencies.sh". To configure this in a job -
    - Go to M1-dev
    - Go to Configure
    - In the Build section, select "execute shell script"
    - In the command box write "sh dependencies.sh"
    - Do the same for M1-release.
[![jenkins-configuration](https://github.com/akhan7/DevOps/blob/master/DevOps-Project/Milestone%201/Screenshots/jenkins_config.png)](#jenkins-configuration)

4. To configure a post-build action (sending an email notification) -
    - Go to Configure in M1-dev
    - In the Post-Build section, select email notification
    - Give the recipient address(es)
    - Do the same for M1-release
[![jenkins-emails](https://github.com/akhan7/DevOps/blob/master/DevOps-Project/Milestone%201/Screenshots/emails.png)](#jenkins-emails)

5. To see the history of builds - 
    - Go to the Dashboard of Jenkins
    - Select the job for which you want to see the history (M1-dev or M1-release)
    - On the left side of the page youcan see a log of the builds along with whther it succeeded or failed
[![jenkins-build-history](https://github.com/akhan7/DevOps/blob/master/DevOps-Project/Milestone%201/Screenshots/build_history.png)](#jenkins-build-history)

## Screencast
Please find the video at:
https://drive.google.com/a/ncsu.edu/file/d/0B2qCp3aiTsD3c2Q2aW1QUHBjUTQ/view?usp=sharing


