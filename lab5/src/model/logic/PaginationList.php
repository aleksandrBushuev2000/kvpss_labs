<?php

namespace model\logic;

class PaginationList {
    public $items;
    public $page;
    public $perPage;
    public $isEnd;

    public function __construct($items, $page, $perPage, $count) {
        $this->items = $items;
        $this->page = $page;
        $this->perPage = $perPage;
        $this->isEnd = $page * $perPage > $count;
    }
}