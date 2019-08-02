// derived from greatBayBasic.js file & bamazon video that is located in the repo

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
})

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection is succesful!");
    // run the start function after the connection is made to prompt the user
    createTable();
})

var createTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " || " + res[i].product_name + " || " + res[i].department_name +
                " || " + res[i].price + " || " + res[i].stock_quantity + " \n ");
        }
        promptCustomer(res);
    })
}
// ask customer what he or she wants
var promptCustomer = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What do you want to buy? [Exit with Q]"
    }]).then(function (answer) {
        var correct = false;
        if (answer.choice.toUpperCase() == "Q") {
            process.exit();
        }
        // do a for loop
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function (value) {
                        parseInt(value)
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    var demand = parseInt(answer.quantity)
                    // console.log(res[id].stock_quantity)
                    //  console.log("This is the answer to stock qual" + res[id].stock_quantity)
                    if ((res[id].stock_quantity - demand) > 0) {
                        connection.query("UPDATE products SET stock_quantity = '" + (res[id].stock_quantity - demand) + "'WHERE product_name" + product + "'",
                            function (err, res2) {
                                console.log("Product Bought!");
                                createTable();
                            })
                    } else {
                        console.log("Not a valid selection!");
                        promptCustomer(res);
                    }
                })
            }
        }
        if (i == res.length && correct == false) {
            console.log("Not a valid selection!");
            promptCustomer(res);
        }
    })
}
// calculate price

// collect payment 

// How many would you like to buy is taking me back to "what do you want to buy"