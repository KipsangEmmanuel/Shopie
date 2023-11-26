CREATE OR ALTER PROCEDURE createProduct(
    @product_id VARCHAR(100),
    @product_name VARCHAR(200),
    @description VARCHAR(800),
    @price DECIMAL(10, 2),
    @image VARCHAR(500)
)
AS
BEGIN
    INSERT INTO Products(product_id, product_name, description, price, image)
    VALUES(@product_id, @product_name, @description, @price, @image)
END
