# Employee Management System

  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  ## Desciption
  This Employee Management System app is designed to allow non-developers a way to access and edit their database from the command line. The app prompts the user with a list of commands that can be executed on the database, such as viewing all emplyees or updating an employee's role. 

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contriuting](contributing)
  * [License](#license)
  * [Support](support)
  
  ## Installation
  Files for installation can be accessed at https://github.com/djbartolini/employee-management-system. Users will need to clone the repository to their local machine by copying the SSH or HTTPS ID and then executing the command `git clone` followed by the pasted link in the terminal. Then, run `npm i` to install the necessary dependencies. Next, you may use built-in seeds to pre-populate the database. To do this, you will need to run `mysql -uroot` in the terminal to access mySQL. Then run `source db/schema.sql;` and then `source db/seeds.sql;`. Finaly, simply run the command `npm start` to start the app!

  ## Usage
  Follow instructions above for installation. Once installed, run `npm start` to start the app. Hit 'Done' when you are finished.

  ![Demo-video](./assets/demo-video.gif)

  ## Contributing
  This app was made using the inquirer npm, mySQL, console.table, and node.js.

  ## License
  This app is covered under the MIT license: [MIT](https://opensource.org/licenses/MIT)

  ## Support
  If you encounter problems with this README generator, please reach out to me on GitHub at: https://github.com/djbartolini, or email me at dan.barto@gmail.com