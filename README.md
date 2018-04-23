# carpooling

Steps to set up the application
--------------------------------
1. Install Node JS

2. Install json-server and http-server npm pack globally
	npm install -g json-server
	npm install -g http-server
	
3. Open a node command prompt, go to project root folder and run the below command
	json-server --watch db.json
	
	Using json-server node package to serve the mock rest API service. Dummy data is present in db.json
	
4. Open an another node command prompt, go to project root folder and run the below command
	http-server public
	
	Using http-server to serve the front end(html and javascript) code.
