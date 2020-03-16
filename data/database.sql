create database
if not exists id12940278_projetdevmob character
set utf8
collate utf8_unicode_ci;
use id12940278_projetdevmob;

drop table if exists question;
drop table if exists answer;

create table question (
    quest_id integer not null primary key auto_increment,
    quest_word varchar
(30) default null,
    quest_language varchar
(30) default null,
    quest_frenchTranslation varchar
(30) default null
);

create table answer (
    answer_id integer not null primary key auto_increment,
    answer_descr varchar
(30) default null,
    quest_id integer not null
);

insert into question
values
    (1, 'family', 'anglais', 'Famille');
insert into question
values
    (2, 'obrigado', 'portugais', 'merci');
insert into question
values
    (3, 'cuchara', 'espagnol', 'cuillière');
insert into question
values
    (4, 'дом', 'russe', 'maison');
insert into question
values
    (5, 'coucou', 'french', 'coucou');
insert into question
values
    (6, 'sympathetic', 'english', 'compatissant');