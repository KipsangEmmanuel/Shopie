CREATE OR ALTER PROCEDURE [dbo].[loginUser]
	@email	varchar(250)
as

set nocount on;

begin
	select	u.[_id],
			u.email,
			u.username,
			u.role,
			u.password
	from	[users] u where email = @email ;
end; 