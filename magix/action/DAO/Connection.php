<?php

    class Connection {
        private static $connection;

        public static function getConnection() {
            if (empty(Connection::$connection)) {
                Connection::$connection = new PDO("mysql:host=localhost;dbname=magix_db", "magix_user", "AAAaaa111");
                Connection::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                Connection::$connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }

            return Connection::$connection;
        }
    }