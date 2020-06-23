<?php

namespace model\db;

use model\db\exceptions\DataLayerException;

use PDO;
use Throwable;

class CommentGateway implements ITableGateway {
    private PDO $connection;
    private $tableName = "comments";

    public function __construct(PDO $connection) {
        $this->connection = $connection;
    }

    /**
     * @param array $data
     * @throws DataLayerException
    */
    public function insert(array $data) : void {
        try {
            $table = $this->tableName;
            $data["id"] = uniqid("", true);
            $insertQuery = $this->connection->prepare(
                "INSERT INTO $table (id, author, email, message) values (?, ?, ?, ?)"
            );
            $insertQuery->bindParam(1, $data["id"]);
            $insertQuery->bindParam(2, $data["author"]);
            $insertQuery->bindParam(3, $data["email"]);
            $insertQuery->bindParam(4, $data["text"]);
            $insertQuery->execute();
        } catch (Throwable $exception) {
            throw new DataLayerException($exception->getMessage(), $exception->getCode(), $exception->getPrevious());
        }
    }

    /**
     * @param int $page
     * @param int $perPage
     * @throws DataLayerException
    */
    public function getPage(int $page, int $perPage) {
        try {
            $output = [];

            $offset = ($page - 1) * $perPage;
            $table = $this->tableName;
            $findQuery = $this->connection->prepare(
                "SELECT * FROM $table ORDER BY '$table.date' LIMIT ? OFFSET ?"
            );

            $findQuery->setFetchMode(PDO::FETCH_ASSOC);
            while ($comment = $findQuery->fetch()) {
                array_push($output, $comment);
            }

            $findQuery->bindParam(1, $perPage);
            $findQuery->bindParam(2, $offset);
        } catch (Throwable $exception) {
            throw new DataLayerException($exception->getMessage(), $exception->getCode(), $exception->getPrevious());
        }
    }

    public function getById(string $id) {
        $table = $this->tableName;
        $sqlStatement = "SELECT * FROM ${table} WHERE id = ${id} ";
        $query = $this->connection->prepare($sqlStatement);
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $result = $query->fetch();
        if ($result != false) {
            return $result;
        }
        return null;
    }

    public function update(string $id, $data) {
        throw new DataLayerException("Method not implemented now");
    }

    /**
     * @param string $id
     * @throws DataLayerException
    */
    public function delete(string $id) : void {
        try {
            $table = $this->tableName;
            $deleteQuery = $this->connection->prepare("DELETE FROM $table WHERE id = ?");
            $deleteQuery->bindParam(1, $id);
            $deleteQuery->execute();
        } catch (Throwable $exception) {
            throw new DataLayerException($exception->getMessage(), $exception->getCode(), $exception->getPrevious());
        }
    }

    public function count() : int {
        $table = $this->tableName;
        return $this->connection->query("SELECT * FROM $table COUNT ");
    }
}