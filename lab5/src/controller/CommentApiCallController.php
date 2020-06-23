<?php

namespace controller;

use SimpleRouter\handlers\IRequestHandler;
use SimpleRouter\request\Request;

use model\logic\TransactionFacade;
use model\logic\exceptions\TransactException;

use SimpleRouter\exceptions\RouteException;
use view\CommentPageJsonView;

class CommentApiCallController implements IRequestHandler{
    public function handle(Request $req) {
        try {
            $page = $req->getRequestParamByKey("page");
            $perPage = $req->getRequestParamByKey("perPage");
            $list = (new TransactionFacade())->getCommentPageTransaction($page, $perPage);
            (new CommentPageJsonView($list))->render();
        } catch (TransactException $e) {
            throw new RouteException($e->getMessage(), $e->getCode());
        }
    }
}