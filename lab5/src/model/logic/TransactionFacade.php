<?php

namespace model\logic;

use model\db\exceptions\DataLayerException;
use model\db\GatewayFactory;
use model\logic\exceptions\TransactException;

class TransactionFacade {

    private GatewayFactory $factory;
    private DataFilter $filter;

    public function __construct() {
        $this->factory = new GatewayFactory();
        $this->filter = new DataFilter();
    }

    /**
     * @param int $page
     * @param int $perPage
     * @return PaginationList
     * @throws TransactException
    */
    public function getCommentPageTransaction($page, $perPage) {
        if ($this->filter->isValidGetCommentPageParams($page, $perPage)) {
            try {
                $perPage = $perPage > $this->MAX_PER_PAGE_COUNT ? $this->MAX_PER_PAGE_COUNT : $perPage;
                $gateway = $this->factory->create("comments");
                $comments = $gateway->getPage($page, $perPage);
                $count = $gateway->count();
                return new PaginationList($comments, $page, $perPage, $count);
            } catch (DataLayerException $e) {
                throw new TransactException("Server Error", 500, $e);
            }

        } else {
            throw new TransactException("Invalid Payload", 404);
        }
    }

    /**
     * @param array $comment
     * @throws TransactException
    */
    public function postCommentTransaction(& $comment) {
        if ($this->filter->checkAndValidateComment($comment)) {
            try {
                $this->factory->create("comments")->insert($comment);
            } catch (DataLayerException $e) {
                throw new TransactException("Server Error", 500, $e);
            }
        } else {
            throw new TransactException("Invalid Payload", 400);
        }
    }

    private $MAX_PER_PAGE_COUNT = 10;
}