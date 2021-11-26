const mitBadge =
  "https://img.shields.io/badge/license-MIT-orange?style=for-the-badge&logo=appveyor";
const iscBadge =
  "https://img.shields.io/badge/license-ISC-blue?style=for-the-badge&logo=appveyor";
const gnuBadge =
  "https://img.shields.io/badge/license-GNU GPLv3-lightgrey?style=for-the-badge&logo=appveyor";

// create a function that returns a license badge based on which license is passed in
// if there is no license, return an empty string
function renderLicenseBadge(license) {}

// create a function that returns the license link
// if there is no license, return an empty string
function renderLicenseLink(license) {}

// create a function that returns the license section of readme
// if there is no license, return an empty string
function renderLicenseSection(license) {}

// create a function to generate markdown for readme
function generateMarkdown(data) {
  return `# ${data.title}

`;
}

module.exports = generateMarkdown;
