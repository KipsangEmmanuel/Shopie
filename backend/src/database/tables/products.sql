CREATE TABLE Products (
    product_id VARCHAR(100) NOT NULL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    description VARCHAR(800),
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500)
);

select * from Products

DROP table Products
