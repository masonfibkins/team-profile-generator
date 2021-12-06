const fs = require('fs'); 
const inquirer = require('inquirer');

const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// team array
const teamArray = []; 

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Enter name of manager: ',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter valid name");
                    return false; 
                }
            }   
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter manager ID: ',
            validate: nameInput => {
                //if input is not a number then return false if not return true
                if (isNaN(nameInput)) {
                    console.log ("Please enter valid number");
                    return false;
                } else {
                    return true; 
                }
            }

        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter manager email: ',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                if(valid){
                    return true;
                }else{
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter manager office number: ',
            validate: nameInput => {
                //if input is not a number then return false if not return true
                if (isNaN(nameInput)) {
                    console.log ("Please enter valid number");
                    return false;
                } else {
                    return true; 
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Choose employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Employee name: ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter valid name");
                    return false; 
                }
            }   
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter employee ID: ",
            validate: nameInput => {
            if (isNaN(nameInput)) {
                console.log ("Please enter valid number");
                return false;
            } else {
                return true; 
            }
        }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email: ',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                if(valid){
                    return true;
                }else{
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'github',
            message: "Enter github username: ",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter valid username");
                    return false; 
                }
            }   
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter name of school: ",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Please enter valid school");
                    return false; 
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        let {name, id, email, role, github, school, confirmAddEmployee} = employeeData;
        let employee;

        if(role === "Engineer"){
            employee = new Engineer(name, id, email, github);
            console.log(employee);
        }else if(role === "Intern"){
            employee = new Intern(name, id, email, school);
        }
        teamArray.push(employee);
        if(confirmAddEmployee){
            return addEmployee(teamArray);
        }else{
            return teamArray;
        }

    })

};

