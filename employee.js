var mysql = require("mysql");
var inq = require('inquirer');

var connection = mysql.createConnection({
    host:'localhose',
    port:3306,
    user:'root',
    password:"",
    database:"employee_DB"
}); 

connection.connect(function(err){
    if(err)throw err;
    init();
})

function init(){
    inq.prompt({
        name:'action',
        type:'list',
        message:'What would you like to do?',
        choices:['Add','View','Update','Delete','Exit']
    }).then(function(response){
        if(response.action==='Add'){
            addValue();
        }else if(response.action==='View'){
            viewValue();
        }else if(response.action==='Update'){
            updateValue();
        }else if(response.action==='Delete'){
            deleteValue();
        }
        else{
            connection.end();
        }
    })
}

function addValue(){
    inq.prompt({
            name:'addType',
            type:'list',
            message:"What would you like to add to the database?",
            choices:['Employee','Department','Role']
        }).then(function(response){
            if(response.addType==='Employee'){
                addEmployee()
            }else if(response.addType==='Department'){
                addDepartment()
            }else if(response.addType==='Role'){
                addRole()
            }
        })
}

function viewValue(){
    inq.prompt({
        name:'viewType',
        type:'list',
        message:'What would you like to view',
        choices:['View all departments','View all employees','View all roles','View all employees by manager']
    }).then(function(response){
        if(response.viewType==='View all departments'){
            viewDepartment()
        }else if(response.viewType==='View all employees'){
            viewEmployees()
        }else if(response.viewType==='View all roles'){
            viewRoles()
        }else if(response.viewType==='View all employees by manager'){
            viewEmployeesByMananger()
        }
    })
}

function updateValue(){
    inq.prompt({
        name:'updateType',
        type:'list',
        message:'What you like to update?',
        choices:['Update employee roles','Update employee managers']
    }).then(function(response){
        if(response.updateType==='Update employee roles'){
            updateRoles()
        }else if(response.updateType==='Update employee managers'){
            updateManagers()
        }
    })
}

function deleteValue(){
    inq.prompt({
        name:'deleteType',
        type:'list',
        message:'What would you like to delete?',
        choices:['Delete employee','Delete department','Delete role']
    }).then(function(response){
        if(response.deleteType==='Delete employee'){
            deleteEmployee()
        }else if(response.deleteType==='Delete department'){
            deleteDepartment();
        }else if(response.deleteType==='Delete role'){
            deleteRole();
        }
    })
}