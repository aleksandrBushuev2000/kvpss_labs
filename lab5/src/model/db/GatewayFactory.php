<?php

namespace model\db;

use model\db\exceptions\DataLayerException;
use PDO;

class GatewayFactory {

    private ?PDO $connection = null;

    private function buildDsnString() {
        return "mysql:". DbConfig::$dbHost . ":" . DbConfig::$dbPort . ";" . "dbname=". DbConfig::$dbName;
    }

    private function createConnection() : PDO {
        $dsn = $this->buildDsnString();
        $PDO = new PDO($dsn, DbConfig::$user, DbConfig::$password);
        $PDO->setAttribute($PDO::ATTR_ERRMODE, $PDO::ERRMODE_EXCEPTION);
        return $PDO;
    }

    /**
     * @param string $gatewayName : name of gateway (lower case name)
     * @return ITableGateway
     * @throws DataLayerException
    */
    public function create(string $gatewayName) : ITableGateway {
        if (is_null($this->connection)) {
            $this->connection = $this->createConnection();
        }

        switch (strtolower($gatewayName)) {
            case "comments" : return new CommentGateway($this->connection);
            default : throw new DataLayerException("Invalid gateway name");
        }
    }
}