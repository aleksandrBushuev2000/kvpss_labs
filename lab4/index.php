<?php

error_reporting(E_ALL);

require_once __DIR__."/src/core/autoload.php";

$router = Router::getInstance();

class Handler {
    public function handle($req) {
        var_dump($req);
    }
}

$router->get("/articles/{page?}/{category? : integer}/watch/", new Handler());
$router->get("/news/{category : integer}/{page? : integer = 1}/{perPage? : integer = 10}", new Handler());
//$router->get("/article/{name}", null);

//$router->get("/services/{category}/{name}/{serviceId}/", null);
//$router->get("/services/{name}/", null);
//$router->get("/about/", null);

$router->handle();