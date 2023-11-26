CREATE OR ALTER PROCEDURE registerUser(
    @_id varchar(100),
    @username varchar(100),
    @email varchar(250),
    @password varchar(250)
)

AS 
BEGIN
    SET NOCOUNT ON;

    INSERT INTO users
    (_id, username, email, password) VALUES (@_id, @username, @email, @password);

END;