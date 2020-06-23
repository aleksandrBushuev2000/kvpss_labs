<?php

namespace controller;

use SimpleRouter\handlers\IRequestHandler;
use SimpleRouter\request\Request;

use model\logic\TransactionFacade;
use model\logic\exceptions\TransactException;

use SimpleRouter\exceptions\RouteException;
use view\CommentPageView;

class CommentPageGetController implements IRequestHandler {
    public function handle(Request $req) {
        try {
            $commentPaginationList = (new TransactionFacade())->getCommentPageTransaction(1, 10);
            (new CommentPageView($commentPaginationList))->render();
        } catch (TransactException $e) {
            throw new RouteException($e->getMessage(), $e->getCode());
        }
    }
}