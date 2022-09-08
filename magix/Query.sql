create database magix_db character set utf8;
create user 'magix_user'@'localhost' identified by 'AAAaaa111';
grant all on magix_db.* to 'magix_user'@'localhost';

CREATE TABLE article (
	id INT AUTO_INCREMENT,
	titre VARCHAR(40) NOT NULL,
	creation DATE NOT NULL,
	texte text NOT NULL,
    auteur VARCHAR(40) NOT NULL,
	PRIMARY KEY pk_article(id)
) engine = innoDB;

CREATE TABLE comments (
	id INT AUTO_INCREMENT,
    nom VARCHAR(40) NOT NULL,
    texte VARCHAR(250) NOT NULL,
	articleId INT NOT NULL,
	PRIMARY KEY pk_comments(id),
    CONSTRAINT fk_comments
    FOREIGN KEY (articleId) 
        REFERENCES article(id)
) engine = innoDB;


