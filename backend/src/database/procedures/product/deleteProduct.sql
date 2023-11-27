CREATE OR ALTER PROCEDURE deleteProduct(@product_id VARCHAR(200))
AS
BEGIN
    DELETE FROM Products WHERE  product_id = @product_id
END