// include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const licenseSection = require("./utils/licenseSection");

// create an array of questions for user input
const questions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "github",
  },
  {
    type: "input",
    message: "What is your email address?",
    name: "email",
  },

  {
    type: "input",
    message: "What is the title of your project?",
    name: "title",
  },
  {
    type: "input",
    message:
      "Describe your product.(What was your motivation, why did you build this project? What problem does it solve? What did you learn?)",
    name: "description",
  },
  {
    type: "input",
    message:
      "Provide a step-by-step description of how to get the development environment running.",
    name: "installation",
  },
  {
    type: "input",
    message:
      "Provide instructions and examples for use. (You can include screenshots if neccesary after template is created.)",
    name: "usage",
  },
  {
    type: "list",
    message: "Please choose your license:",
    choices: ["MIT", "ISC", "none"],
    name: "license",
  },
  {
    type: "confirm",
    message: "Do you need to include a link to the deployed application?",
    name: "linksection",
  },
  {
    type: "confirm",
    message: "Do you need to list collaborators?",
    name: "collab",
  },
  {
    type: "confirm",
    message:
      "Would you like to include a list of features for your application.",
    name: "listoffeatures",
  },
  {
    type: "confirm",
    message:
      "Would you like to include examples of tests that can be run on your application?",
    name: "testssection",
  },
  {
    type: "confirm",
    message:
      "Would you like to include examples ideas of future updates that might be made to your application?",
    name: "iceboxsection",
  },
];

// // create a function to write README file passing in the userResponse, credits, features, tests and icebox parameters
function writeToFile(userResponse, credits, features, tests, icebox, link) {
  return `# ${userResponse.title} ![License: ${
    userResponse.license
  }](https://img.shields.io/badge/license-${
    userResponse.license
  }-orange?style=for-the-badge&logo=appveyor)
  ---
  
  ## Description
  
  ${userResponse.description}
  ---
  
  ## Table of Contents
  
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Link to Deployed](#link)
  * [Credits](#credits)
  * [Features](#features)
  * [Tests](#tests)
  * [Icebox](#icebox)
  * [Questions?](#questions)
  
  
  ## Installation
  \`\`\`
  ${userResponse.installation}
  \`\`\`
  
  ## Usage
  
  ${userResponse.usage}
  
  ## License

  ${licenseSection(userResponse)}
  
  ## Link to Deployed
  
  ${link ? link : "N/A"}
  
  ## Credits
  
  ${credits ? credits : "N/A"}
  
  ## Features
  
  ${features ? features : "N/A"}
  
  ## Tests
  \`\`\`
  ${tests ? tests : "N/A"}
  \`\`\`

  ## Icebox
  
  ${icebox ? icebox : "N/A"}
  
  #### Questions
  
  If you have any questions about the project, please reach out to me!
  
  GitHub: [Go to my GitHub](https://github.com/${userResponse.github})
  
  Email: [Send me an Email](${userResponse.email})`;
}

// create a function to initialize app
function init() {
  // ask a new set of questions based on user answers to the first set of questions - using when key to gain acces to the users original answer via an annonymous method
  inquirer.prompt(questions).then((userResponse) =>
    inquirer
      .prompt([
        {
          type: "input",
          message: "Please include your application link here:",
          name: "link",
          when: function (_) {
            return userResponse.linksection;
          },
        },
        {
          type: "input",
          message: "Please list your collaborators here:",
          name: "credits",
          when: function (_) {
            return userResponse.collab;
          },
        },
        {
          type: "input",
          message: "Please list your application's features here:",
          name: "features",
          when: function (_) {
            return userResponse.listoffeatures;
          },
        },
        {
          type: "input",
          message: "Please list your test examples here:",
          name: "tests",
          when: function (_) {
            return userResponse.testssection;
          },
        },
        {
          type: "input",
          message: "Please list your Icebox ideas here:",
          name: "icebox",
          when: function (_) {
            return userResponse.iceboxsection;
          },
        },
      ])
      // passes in the values for the above keys not attatched to questions variable
      .then(({ credits, features, tests, icebox, link }) => {
        // uses writeFile method of the file system object to create a readme.md document, run the function writeToFile while passing the userResponse, credits, features, test, and icebox parameters, the last argument sets up the async operation so if it receives an error response back it displays the error in the console log, and if it doesnt receive an error it runs a success message in the console log.
        fs.writeFile(
          "README.md",
          writeToFile(userResponse, credits, features, tests, icebox, link),
          (err) => {
            err ? console.log(err) : console.log("File was written!");
          }
        );
      })
  );
}

// call to initialize app
init();
