<?php

require_once ('vendor/autoload.php');

use controller\CommentPageGetController;
use controller\FormGetController;
use controller\IndexGetController;
use controller\CommentPagePostController;
use controller\CommentApiCallController;

use SimpleRouter\plugins\JsonBodyParserPlugin;
use SimpleRouter\Router;

use SimpleRouter\template_parser\exceptions\ParseException;

try {
    $router = Router::getInstance();

    $router->get("/", new IndexGetController());
    $router->get("/form", new FormGetController());
    $router->get("/comments/", new CommentPageGetController());
    $router->get("/api/v1/comments/{page : integer}/{perPage : integer} = 10", new CommentApiCallController());
    $router->post("/comments/", new CommentPagePostController(), [
        new JsonBodyParserPlugin()
    ]);

    $router->handle();
} catch (ParseException $e) {
    exit(100);
}



