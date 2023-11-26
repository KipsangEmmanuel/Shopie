CREATE OR ALTER PROCEDURE getSingleProduct(@product_id VARCHAR(100))
AS
BEGIN
    SELECT * FROM Products WHERE product_id = @product_id
END