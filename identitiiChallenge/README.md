# Identitii challenge
I have provided a pre built executable and js files for 64bit mac, windows and linux (tested and working on all three). While I would usually exclude these files from the repo, this means anyone will be able to run the project locally.

Simply run the executable for your system and navigate to http://localhost:8079/

The output posts to the server and the console (although in the dev build it will be above the action logs)

If you have trouble running the executable on a Mac, check out the issues section below.

### Passing a new set of data to render to the frontend:
- If serving from one of the provided executables, simply update the sampledata.json and refresh the page.
- Use window.overrideData(data) from the single page app. Note that this requires a JS object NOT an encoded json string.

## Assumptions:
1. The provided sampledata does not match the provided picture. The example output however does
2. Inputs should be editable if the edit flag given for that component is true
3. Data should be returned if the include flag is checked for that row
4. The label for the component is given in camelcase as the keys of the formTypes object
5. There is no default data. Defaults are provided by the attributes array.
6. The id prefix of 'sender/' is arbitrary, but must be preserved.
7. There will be an entry in the attributes array for each entry in the formTypes object, and they will match. I have checked for nil and length matching only.

## Requirements:
To build the project, you will need Golang 1.9 and npm installed.

### Notes:
- Due to the prioritization of other features, the input format is quite limited (as per the assumptions). I would like to improve on this is given more time
- I didn't get enough time to write the go unit tests or fix all the linting errors. In particular I would re-use the type definitions and remove every single 'any' type
- I didn't get enough time to add in a Dockerfile, cross compilation was the best alternative
- Also no time to implement loading spinners
- I have used some styling on the components so they do not exactly match the screenshot. It would be very straightforward to remove the wrapped material-ui components and use the native inputs instead to match the look. I didn't go too crazy as I assumed the prototype should be mostly similar to the example.
- I have used React/Redux/Webpack/Flow plus the material-ui library for this project only because I had a personal project template already available. Configuring this many unfamiliar tools on top of development and testing would not have been possible in the time available otherwise.

Approximate time to complete: Just over 4 hours

### Setup (if you have go installed):
1. Run `go get`
2. Run `go generate` (this runs the npm commands)
3. Run the executable

### Setup (without go):
To build the frontend:
1. Navigate to ./SPA
2. Run `npm run build`

To test:
1. Run `npm run test`

To watch and serve:
1. Run `npm run watch`
2. View the project at http://localhost:8080/

If you are not running the go server, then you will receive a toast notification that the API call failed. It will default to the sampledata.json provided.
You can still update the UI using the steps below and POST the selected items without the go server

## How would I setup CI/CD?
You could add a lot of different things into your pipeline like a linter, sonarQube, feature branches and code reviews, but I will describe a basic setup. 

First, create dev/staging/prod branches in the repo.

### With a backend:
1. Setup a private docker image repo
2. Setup a Kubernetes instance
3. Setup jenkins
4. Configure jenkins to run `go get`, `go generate`, `go test`, `go build`, `npm run test` and put the resulting artifacts in a docker image via a Dockerfile and push the image to the repo.
(Jenkins should watch the repo and build on every commit to any of the branches and tag images belonging to each branch appropriately)
5. Create a Kubernetes deployment with the container
6. Forward incoming Kubernetes traffic to the golang deployment.

To deploy, simply run a Kubernetes rolling update on the environment you wish to update and everything will be updated.

### Without a backend:
1. Setup a jenkins instance
2. Configure jenkins to run `npm run test` and `npm run build` and put the resulting artifacts in a S3 bucket.
(Jenkins should watch the repo and build on every commit to any of the branches and tag images belonging to each branch appropriately)

To deploy, simply update your index.html to point to the correct JS file.

## Tips:
- Use npm run testWatch to dev faster, it watches your test files and results in a much quicker run time.
- PhantomJS is required for test portability as standard images in AWS and jenkins dont have and cant get the chrome browser

## Issues:
**Make sure you run the executable from the command line.** On a Mac in particular, just double clicking the executable delivers the wrong working directory and none of the static assets can be found.

If you have issues similar to 'webpack is not recognized as a internal or external command, operable program or batch file', simply install it globally using:
`npm install -g webpack webpack-cli`

You may also need to install karma globally if you receive unprovided framework errors:
`npm install -g karma karma-cli`
