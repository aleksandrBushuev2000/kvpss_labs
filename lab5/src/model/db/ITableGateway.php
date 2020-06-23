<?php

namespace model\db;

interface ITableGateway {
    function getPage(int $page, int $perPage);
    function getById(string $id);
    function insert(array $data);
    function update(string $id, array $data);
    function delete(string $id);
    function count() : int;
}