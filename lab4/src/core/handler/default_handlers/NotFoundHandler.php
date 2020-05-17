<?php

require_once __DIR__."/../IRequestHandler.php";

class NotFoundHandler implements IRequestHandler {
    public function handle($req) {
        http_response_code(404);
        echo "Cannot ".$_SERVER['REQUEST_METHOD']." ".$_SERVER['REQUEST_URI'];
    }
}