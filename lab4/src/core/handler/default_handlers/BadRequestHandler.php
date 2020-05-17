<?php

require_once __DIR__."/../IRequestHandler.php";

class BadRequestHandler implements IRequestHandler {
    public function handle($req) {
        http_response_code(400);
        echo "Bad Request";
    }
}