<?php

require_once __DIR__."/../IRequestHandler.php";

class InternalServeErrorHandler implements IRequestHandler {
    public function handle($req) {
        http_response_code(500);
        echo "Internal Server Error";
    }
}