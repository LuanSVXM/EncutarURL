DROP TABLE IF EXISTS curt_urls;
DROP TABLE IF EXISTS users;

create table users(
    id varchar(255) unique not null,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(120) not null,
    CONSTRAINT user_pk PRIMARY KEY (id)
);


create table curt_urls(
    id varchar(255) unique not null,
    url text not null,
    shortID varchar(6) not null unique,
    views  bigint default 0 not null,
    userID varchar(255) null,
    CONSTRAINT curt_url_pk PRIMARY KEY (id),
    CONSTRAINT user_fk FOREIGN KEY (userID) REFERENCES users(id) ON UPDATE CASCADE
);