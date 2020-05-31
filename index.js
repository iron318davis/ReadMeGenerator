let inquirer = require("inquirer")
let fs = require("fs")
let axios = require("axios")

inquirer.prompt([
    {
        type: "input",
        message: "What is your github username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the url of the project?",
        name: "giturl"
    },
    {
        type: "input",
        message: "What is the projects title?",
        name: "title"
    },
    {
        type: "input",
        message: "Short description of project:",
        name: "description"
    },
    {
        type: "input",
        message: "Usage instructions and examples:",
        name: "usage"
    },
    {
        type: "list",
        message: "License type:",
        name: "license",
        choices: [
            "MIT",
            "GNU GPLv3",
            "None"
        ]
    },
    {
        type: "input",
        message: "What should be run to install dependencies?",
        name: "installationinstructions"
    },
    {
        type: "input",
        message: "What should be run to do tests?",
        name: "tests"
    },
    {
        type: "input",
        message: "Instructions to contribute:",
        name: "contributing"
    },

])
    .then(function (response) {
        let data = axios.get(      
            `https://api.github.com/users/${response.username}`
          );
        // console.log(data)
        setTimeout(function() {
        let profilePic = data.avatar_url;
        let filename = `./Test/${response.title}_README.md`;
        let text = `
        # ${response.title}

        ## Description 

        ${response.description}

        ## Table of Contents

        * [Installation](#installation)
        * [Usage](#usage)
        * [License](#license)
        * [Contributing](#contributing)
        * [Tests](#tests)
        * [Questions](#questions)
        
        ## Installation

        ${response.installationinstructions}

        ## Usage 

        ${response.usage}

        ## License

        ![alt text](https://img.shields.io/github/license/${response.username}/${response.title}.svg "License")

        ## Contributing

        ${response.contributing}

        ## Tests

        ${response.tests}

        ## Questions

        Contact 
        ![Profile Picture](${profilePic}) 
        at 
        ${response.email}

        `
        ;
        fs.writeFile(filename, text, function (err) {
            if (err) {
                return console.log(err);
            } else {
                return console.log("Readme successfully created!")
            }
        });
    }, 1000)
    });