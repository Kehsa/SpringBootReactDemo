set search_path to spring;
insert into users_ (login, name, password, role) VALUES ('admin', 'mrRobot', '{noop}123', 'ADMIN');
insert into users_ (login, name, password, role) VALUES ('nagibator', 'Vasiliy', '{noop}123', 'USER');
insert into users_ (login, name, password, role) VALUES ('nagibato2', 'Vitaliy', '{noop}123', 'USER');
insert into users_ (login, name, password, role) VALUES ('nagibato3', 'Antoha', '{noop}123', 'USER');
insert into users_ (login, name, password, role) VALUES ('nagibato4', 'Leha', '{noop}123', 'USER');

insert into spring.groups_ (name) values ('alco');
insert into spring.sub_groups (name, group_id) values ('vodka', 1), ('pivo', 1);

insert into spring.groups_ (name) values ('zacus');
insert into spring.sub_groups (name, group_id) values ('ikra', 2), ('chips', 2);

insert into spring.goods (name, sub_group_id) values ('zubrovka', 1);
insert into spring.goods (deleted, name, sub_group_id) values (true, 'deleted', 1);
insert into spring.goods (name, sub_group_id) values ('cherhigiv', 2);