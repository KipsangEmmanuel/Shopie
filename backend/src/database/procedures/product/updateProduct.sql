CREATE PROCEDURE updateProduct
    @product_id NVARCHAR(255),
    @product_name NVARCHAR(255),
    @description NVARCHAR(MAX),
    @price DECIMAL(18, 2),
    @image NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Products
    SET
        product_name = @product_name,
        description = @description,
        price = @price,
        image = @image
    WHERE
        product_id = @product_id;


END;
