<?php
    require_once("action/DAO/Connection.php");

    class guideDAO {

        public static function getArticle() {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM article");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            return $statement->fetchAll();
        }

        public static function getComment($articleId) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM comments WHERE articleId = ?");
            $statement->bindParam(1, $articleId);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }
        public static function addArticle($titre, $creation, $texte, $auteur){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT into article(titre, creation, texte,auteur) values (?,?,?,?)");
            $statement->bindParam(1, $titre);
            $statement->bindParam(2, $creation);
            $statement->bindParam(3, $texte);
            $statement->bindParam(4, $auteur);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }
        public static function addComment($nom, $texte, $articleId) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("INSERT into comments(nom, texte,articleId) values (?, ?, ?)");
            $statement->bindParam(1, $nom);
            $statement->bindParam(2, $texte);
            $statement->bindParam(3, $articleId);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }
        public static function editArticle($titre, $texte, $auteur,$articleId){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("UPDATE article SET texte = ?, auteur = ? WHERE id = ?");
            $statement->bindParam(1, $texte);
            $statement->bindParam(2, $auteur);
            $statement->bindParam(3, $articleId);
            
            $statement->execute();

            return $statement->fetchAll();
        }
        public static function removeArticle($articleId){
            $connection = Connection::getConnection();
            $statement = $connection->prepare("DELETE FROM comments WHERE articleId = ?");
            $statement->bindParam(1, $articleId);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $statement = $connection->prepare("DELETE FROM article WHERE id = ?");
            $statement->bindParam(1, $articleId);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

    }