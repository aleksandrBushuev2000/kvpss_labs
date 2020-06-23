<?php

namespace controller;

use model\logic\exceptions\TransactException;
use model\logic\TransactionFacade;
use SimpleRouter\exceptions\RouteException;
use SimpleRouter\handlers\IRequestHandler;
use SimpleRouter\request\Request;

class CommentPagePostController implements IRequestHandler {
    public function handle(Request $req) {
        try {
            $body = $req->getRequestVariableByKey("body");
            (new TransactionFacade())->postCommentTransaction($body);
        } catch (TransactException $e) {
            throw new RouteException($e->getMessage(), $e->getCode());
        }
    }
}