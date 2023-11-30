CREATE TABLE users (
    _id VARCHAR(100) NOT NULL PRIMARY KEY,
    username varchar(100) NOT NULL,
    email varchar(250) NOT NULL,
    role varchar(100) DEFAULT 'customer',
    password varchar(250) NOT NULL,
    welcomed BIT Default 0,
)


select * from users

update users set role = 'admin' where email = 'emmanuel@gmail.com'




DROP TABLE users 