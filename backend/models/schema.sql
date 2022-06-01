DROP DATABASE project5;
CREATE DATABASE project5;
USE project5;
CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
role VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE permissions (
id INT AUTO_INCREMENT NOT NULL,
permission VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT(3),
    city VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);
CREATE TABLE role_permission (
   id INT AUTO_INCREMENT NOT NULL,
   role_id INT NOT NULL,
   permissions_id INT NOT NULL,
   FOREIGN KEY (role_id) REFERENCES roles(id),
   FOREIGN KEY (permissions_id) REFERENCES permissions(id),
   PRIMARY KEY (id)
);
CREATE TABLE category (
    id INT AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(255),
    PRIMARY KEY (id)
);
CREATE TABLE meals(
    id INT AUTO_INCREMENT NOT NULL,
    meal_name VARCHAR(255),
    meal_price VARCHAR(255),
    image VARCHAR(255),
    description VARCHAR(1000),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    PRIMARY KEY (id)
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);
CREATE TABLE cart (
    id INT AUTO_INCREMENT NOT NULL,
    meal_id INT NOT NULL,
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES meals(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    PRIMARY KEY (id)
);
