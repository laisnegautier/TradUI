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
(30) default null,
    quest_order integer default null
);

create table answerLanguage (
    answerL_id integer not null primary key auto_increment,
    answerL_descr varchar
(30) default null,
    quest_id integer not null,
    constraint fk_answerL_quest foreign key
(quest_id) references question
(quest_id) 

);

create table answerTranslation (
    answerT_id integer not null primary key auto_increment,
    answerT_descr varchar
(30) default null,
    quest_id integer not null,
    constraint fk_answerT_quest foreign key
(quest_id) references question
(quest_id) 

);

insert into question
values
    (1, 'eventually', 'anglais', 'finalement', 1);
insert into question
values
    (2, 'obrigado', 'portugais', 'merci', 2);
insert into question
values
    (3, 'cuchara', 'espagnol', 'cuillière', 3);
insert into question
values
    (4, 'дом', 'russe', 'maison', 4);
insert into question
values
    (5, 'schön', 'allemand', 'beau', 5);
insert into question
values
    (6, 'direttore', 'italien', 'directeur', 6);


insert into answerTranslation
values
    (1, 'manager', 6);

insert into answerTranslation
values
    (1, 'joli', 5);