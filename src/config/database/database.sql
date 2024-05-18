DROP TABLE IF EXISTS curt_urls;
DROP TABLE IF EXISTS users;

create table users(
    id varchar(255) unique not null,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(120) not null,
    created_at timestamp default NOW(),
	updated_at timestamp,
    deleted_at timestamp null,
    CONSTRAINT user_pk PRIMARY KEY (id)
);


create table curt_urls(
    id varchar(255) unique not null,
    url text not null,
    short_id varchar(6) not null unique,
    views  bigint default 0 not null,
    user_id varchar(255) null,
    created_at timestamp default NOW(),
	updated_at timestamp null,
    deleted_at timestamp null,
    CONSTRAINT curt_url_pk PRIMARY KEY (id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
);