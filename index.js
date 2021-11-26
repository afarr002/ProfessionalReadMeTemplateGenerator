// include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// create an array of questions for user input
const questions = [
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
    type: "checkbox",
    message: "Please choose your license:",
    choices: ["MIT", "ISC", "GNU GPLv3", "none"],
    name: "license",
  },
  {
    type: "confirm",
    message: "Include Table of Contents?",
    name: "toc",
  },
  {
    type: "confirm",
    message:
      "Include section to list collaborators? (You will have to edit this section manually if you choose to include it in the template.)",
    name: "credits",
  },
  {
    type: "confirm",
    message:
      "Include section to list features? (You will have to edit this section manually if you choose to include it in the template.)",
    name: "features",
  },
  {
    type: "confirm",
    message:
      "Include a section to provide examples on how to run tests for your program? (You will have to edit this section manually if you choose to include it in the template.)",
    name: "tests",
  },
];

// // create a function to write README file
function writeToFile(userResponse) {
  return `
# ${userResponse.title}
---

## Description
${userResponse.description}
---

### Installation
${userResponse.installation}

### Usage
${userResponse.usage}

### License
${userResponse.license}

#### Questions
If you have any questions about the project, please reach out to me!
GitHub: [${userResponse.github}](https://github.com/${userResponse.github})
Email: [Send me an email](${userResponse.email})`;
}

// create a function to initialize app
function init() {
  inquirer.prompt(questions).then((userResponse) =>
    fs.writeFile("README.md", writeToFile(userResponse), (err) => {
      err ? console.log(err) : console.log("File was written!");
    })
  );
}

// call to initialize app
init();

/* psuedo code

if statement (or for...) to insert table of content when user confirms?

if statement (or for...) to include credits section if you have collaborators on the project?

create and add license badge
create if statement (or for...) to add the license description to the license section that corresponds with the license option the user chooses.
add corresponding license badge to top of readme

if statement (or for...) to include features section based on the user chocie

*/
