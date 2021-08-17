drop table if exists towns CASCADE;
create table towns(
	id serial not null primary key,
	towns varchar(255) not null,
	location varchar(255) not null
);

drop table if exists registration_numbers CASCADE;
create table registration_numbers (
	id serial not null primary key,
    regnumber varchar(255) not null unique,
	town_id int not null,
	foreign key (town_id) references towns(id)
);

insert into towns (towns, location) values ('Cape Town', 'CA');
insert into towns (towns, location) values ('Stellenbotsch', 'CL');
insert into towns (towns, location) values ('Woercester', 'CW');
