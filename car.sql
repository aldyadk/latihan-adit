create table car (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	make VARCHAR(100) NOT NULL,
	model VARCHAR(100) NOT NULL,
	price NUMERIC(19,2) NOT NULL
);
insert into car (make, model, price) values ('Mercedes-Benz', 'C-Class', '47969.06');
insert into car (make, model, price) values ('Dodge', 'Ram Wagon B150', '68502.46');
insert into car (make, model, price) values ('Mitsubishi', 'Diamante', '94152.88');
