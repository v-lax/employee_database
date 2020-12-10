var mysql = require("mysql");
var inq = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    init();
})

function init() {
    inq.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add', 'View', 'Update', 'Delete', 'Exit']
    }).then(function (response) {
        if (response.action === 'Add') {
            addValue();
        } else if (response.action === 'View') {
            viewValue();
        } else if (response.action === 'Update') {
            updateValue();
        } else if (response.action === 'Delete') {
            deleteValue();
        }
        else {
            connection.end();
        }
    })
}

function addValue() {
    inq.prompt({
        name: 'addType',
        type: 'list',
        message: "What would you like to add to the database?",
        choices: ['Employee', 'Department', 'Role']
    }).then(function (response) {
        if (response.addType === 'Employee') {
            addEmployee()
        } else if (response.addType === 'Department') {
            addDepartment()
        } else if (response.addType === 'Role') {
            addRole()
        }
    })
}

function viewValue() {
    inq.prompt({
        name: 'viewType',
        type: 'list',
        message: 'What would you like to view',
        choices: ['View all departments', 'View all employees', 'View all roles', 'View all employees by manager']
    }).then(function (response) {
        if (response.viewType === 'View all departments') {
            viewDepartment()
        } else if (response.viewType === 'View all employees') {
            viewEmployees()
        } else if (response.viewType === 'View all roles') {
            viewRoles()
        } else if (response.viewType === 'View all employees by manager') {
            viewEmployeesByMananger()
        }
    })
}

function updateValue() {
    inq.prompt({
        name: 'updateType',
        type: 'list',
        message: 'What you like to update?',
        choices: ['Update employee roles', 'Update employee managers']
    }).then(function (response) {
        if (response.updateType === 'Update employee roles') {
            updateRoles()
        } else if (response.updateType === 'Update employee managers') {
            updateManagers()
        }
    })
}

function deleteValue() {
    inq.prompt({
        name: 'deleteType',
        type: 'list',
        message: 'What would you like to delete?',
        choices: ['Delete employee', 'Delete department', 'Delete role']
    }).then(function (response) {
        if (response.deleteType === 'Delete employee') {
            deleteEmployee()
        } else if (response.deleteType === 'Delete department') {
            deleteDepartment();
        } else if (response.deleteType === 'Delete role') {
            deleteRole();
        }
    })
}

function addEmployee() {
    var query = "SELECT * FROM employee"
    connection.query(query, function (err, employees) {
        if (err) throw err;
        connection.query('SELECT * FROM role', function (err, roles) {
            if (err) throw err;
            inq.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employees first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the employees last name'
                },
                {
                    name: 'roleType',
                    type: 'rawlist',
                    message: 'What is this employees role?',
                    choices: function(){
                        var roleArray = []
                        for (let i=0;i<roles.length;i++){
                            roleArray.push({
                                name:roles[i].title,
                                value:roles[i].id
                            })
                        }
                        return roleArray
                    }
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: 'Who is this employees manager?',
                    choices: function () {
                        var choiceArray = [];
                        for (let i = 0; i < employees.length; i++) {
                            // I worked on this with my instructor :) 
                            choiceArray.push(
                                {
                                    name: employees[i].first_name + " " + employees[i].last_name,
                                    value: employees[i].id
                                }
                            )
                        }
                        return choiceArray;
                    }
                }

            ]).then(function (answer) {
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                      first_name: answer.firstName,
                      last_name: answer.lastName,
                      role_id: answer.roleType,
                      manager_id: answer.manager
                    },
                    function(err) {
                      if (err) throw err;
                      console.log("You have successfully added an employee!");
                      init();
                    }
                  );
            })
        })
    })
}

function addDepartment(){
    inq.prompt(
        {
            name: 'departmentName',
            type: 'input',
            message: 'What is the name of the new department?'
        }).then(function(answer){
            connection.query(
                "INSERT INTO department SET ?",
                {
                  department_name: answer.departmentName
                },
                function(err) {
                  if (err) throw err;
                  console.log("You have successfully added a department!");
                  init();
                }
              );
        })
}

function addRole(){
    connection.query('SELECT * from department',function(err,departments){
        inq.prompt([
            {
                name:'title',
                type:'input',
                message:"What is the name of the new role you want to add?"
            },
            {
                name:'salary',
                type:'number',
                message:'What is the salary for this title?'
            },
            {
                name:'department_id',
                type:'rawlist',
                message:"What department does this title belong to?",
                choices: function(){
                    var departmentArray = [];
                        for (let i = 0; i < departments.length; i++) {
                            // I worked on this with my instructor :) 
                            departmentArray.push(
                                {
                                    name: departments[i].department_name,
                                    value: departments[i].id
                                }
                            )
                        }
                        return departmentArray;
                }
            }
        ]).then(function(answer){
            connection.query("INSERT INTO role SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id:answer.department_id
            },
            function(err) {
              if (err) throw err;
              console.log("You have successfully added a role!");
              init();
            })
        })
    })
}

function viewDepartment(){
    connection.query("SELECT * FROM department",function(err,res){
        if(err) throw err;
        console.table(res)
        init()
    })
}

function viewEmployees(){
    connection.query("SELECT * FROM employee",function(err,res){
        if(err) throw err;
        console.table(res)
        init()
    })
}

function viewRoles(){
    connection.query("SELECT * FROM role",function(err,res){
        if(err) throw err;
        console.table(res)
        init()
    })
}

function viewEmployeesByMananger(){
    connection.query(
        "SELECT E.first_name as Employee, M.first_name as Manager FROM employee E INNER JOIN employee M WHERE E.manager_id = M.id",
        function(err,res){
        if(err) throw err;
        console.table(res)
        init()
    })
}

function updateManagers(){
    connection.query('SELECT * from employee',function(err,employees){
        inq.prompt([
            {
                name: 'employee_name',
                type: 'rawlist',
                message: 'Which employee do you need to update the manager for?',
                choices: function () {
                    var choiceArray = [];
                    for (let i = 0; i < employees.length; i++) {
                        // I worked on this with my instructor :) 
                        choiceArray.push(
                            {
                                name: employees[i].first_name + " " + employees[i].last_name,
                                value: employees[i].id
                            }
                        )
                    }
                    return choiceArray;
                }
            },
            {
                name:'manager_id',
                type:'rawlist',
                message:"Who is this employee's new manager?",
                choices: function(){
                    var managerArray = [];
                        for (let i = 0; i < employees.length; i++) {
                            // I worked on this with my instructor :) 
                            managerArray.push(
                                {
                                    name: employees[i].first_name + " " + employees[i].last_name,
                                    value: employees[i].id
                                }
                            )
                        }
                    return managerArray;
                }
            }
        ]).then(function(answer){
            connection.query(
            "UPDATE employee SET ? WHERE ?",
        [
            {
              manager_id: answer.manager_id,
            },
            {
              id:answer.employee_name
            }
        ],
            function(err) {
              if (err) throw err;
              console.log("You have successfully added updated the manager for this employee!");
              init();
            })
        })
    })
}

function updateRoles(){
    connection.query('SELECT * FROM employee', function (err, employees) {
        if (err) throw err;
        connection.query('SELECT * FROM role', function (err, roles) {
            if (err) throw err;
            inq.prompt([
                {
                    name: 'employee_name',
                    type: 'rawlist',
                    message: 'Which employee do you need to update a role for?',
                    choices: function () {
                        var choiceArray = [];
                        for (let i = 0; i < employees.length; i++) {
                            // I worked on this with my instructor :) 
                            choiceArray.push(
                                {
                                    name: employees[i].first_name + " " + employees[i].last_name,
                                    value: employees[i].id
                                }
                            )
                        }
                        return choiceArray;
                    }
                },
                {
                    name: 'roleType',
                    type: 'rawlist',
                    message: 'What is the new role for this employee?',
                    choices: function(){
                        var roleArray = []
                        for (let i=0;i<roles.length;i++){
                            roleArray.push({
                                name:roles[i].title,
                                value:roles[i].id
                            })
                        }
                        return roleArray
                    }
                },
            ]).then(function(answer){
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [
                      {
                        role_id: answer.roleType
                      },
                      {
                        id:answer.employee_name 
                      }
                    ],
                    function(err, res) {
                      if (err) throw err;
                      console.log("You have successfully updated this employee's role!");
                      init();
                    }
                  )
            })
        })
    })
}

function deleteDepartment(){
    connection.query('SELECT * from department',function(err,departments){
        inq.prompt(
            {
                name:'department_name',
                type:'rawlist',
                message:"Which department would you like to delete?",
                choices:function(){
                    var departmentArray = [];
                        for (let i = 0; i < departments.length; i++) {
                            // I worked on this with my instructor :) 
                            departmentArray.push(departments[i].department_name)
                        }
                        return departmentArray;
                }
            }
        ).then(function(answer){
            connection.query(
            "DELETE FROM department WHERE ?",
            {
              department_name: answer.department_name,
            },
            function(err) {
              if (err) throw err;
              console.log("You have successfully deleted a department!");
              init();
            })
        })
    })
}

function deleteEmployee(){
    connection.query('SELECT * from employee',function(err,employees){
        inq.prompt(
            {
                name:'employee_name',
                type:'rawlist',
                message:"Which employee would you like to delete?",
                choices:function(){
                    var employeeArray = [];
                        for (let i = 0; i < employees.length; i++) {
                            // I worked on this with my instructor :) 
                            employeeArray.push(
                                {
                                    name: employees[i].first_name + " " + employees[i].last_name,
                                    value: employees[i].id
                                }
                            )
                        }
                        return employeeArray;
                }
            }
        ).then(function(answer){
            connection.query(
            "DELETE FROM employee WHERE ?",
            {
              id: answer.employee_name,
            },
            function(err) {
              if (err) throw err;
              console.log("You have successfully deleted an employee!");
              init();
            })
        })
    })
}

function deleteRole(){
    connection.query('SELECT * from role',function(err,roles){
        inq.prompt(
            {
                name:'role_name',
                type:'rawlist',
                message:"Which role would you like to delete?",
                choices:function(){
                    var roleArray = [];
                        for (let i = 0; i < roles.length; i++) {
                            // I worked on this with my instructor :) 
                            roleArray.push(roles[i].title)
                        }
                        return roleArray;
                }
            }
        ).then(function(answer){
            connection.query(
            "DELETE FROM role WHERE ?",
            {
              title: answer.role_name,
            },
            function(err) {
              if (err) throw err;
              console.log("You have successfully deleted a role!");
              init();
            })
        })
    })
}