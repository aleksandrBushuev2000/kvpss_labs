<?php

require_once ('vendor/autoload.php');

use SimpleRouter\handlers\IRequestHandler;
use SimpleRouter\Router;
use SimpleRouter\request\Request;

$router = Router::getInstance();

$router->get("/", new class implements IRequestHandler {
   public function handle(Request $req) {
       if (!is_null($req->getRequestQueryValueByKey("id"))) {
           switch ($req->getRequestQueryValueByKey("id")) {
               case "form" : print(file_get_contents($_SERVER['DOCUMENT_ROOT']."/inc/table.inc.html")); break;
               case "table" : print(file_get_contents($_SERVER['DOCUMENT_ROOT']."/inc/form.inc.html")); break;
               default : print(file_get_contents($_SERVER['DOCUMENT_ROOT']."/inc/table.inc.html")); break;
           }
       } else {
		   print(file_get_contents($_SERVER['DOCUMENT_ROOT']."/inc/index.inc.html"));
	   }
   }
});

$router->get("/form", new class implements IRequestHandler {
    public function handle(Request $req) {
        print(file_get_contents($_SERVER['DOCUMENT_ROOT']."/inc/form.inc.html"));
    }
});

$router->get("/table", new class implements IRequestHandler {
    public function handle(Request $req) {
        print(file_get_contents($_SERVER['DOCUMENT_ROOT']."/inc/table.inc.html"));
    }
});

$router->handle();