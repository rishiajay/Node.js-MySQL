create database bamazon;

use bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NULL, 
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,4) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'