CREATE TABLE users (
    _id VARCHAR(100) NOT NULL PRIMARY KEY,
    username varchar(100) NOT NULL,
    email varchar(250) NOT NULL,
    role varchar(100) DEFAULT 'customer',
    password varchar(250) NOT NULL,

)

select * from users



DROP TABLE users 