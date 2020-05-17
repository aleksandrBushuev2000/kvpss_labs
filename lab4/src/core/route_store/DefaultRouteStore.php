<?php

require_once 'IRouteStore.php';
require_once "DefaultRouteStorePathParser.php";
require_once __DIR__."/../route_comparator/RouteComparator.php";

require_once __DIR__."/../exceptions/NotFoundException.php";

class DefaultRouteStore implements IRouteStore {
    private $routes;
    private $parser;
    private $comparator;

    public function __construct() {

        $this->parser = new DefaultRouteStorePathParser();
        $this->comparator = new RouteComparator();

        $this->routes = array();
        $this->routes["GET"] = array();
        $this->routes["HEAD"] = array();
        $this->routes["POST"] = array();
        $this->routes["PUT"] = array();
        $this->routes["DELETE"] = array();
        $this->routes["OPTIONS"] = array();
    }

    public function push($method, $template) {
        if (is_null($this->routes[$method])) {
            $this->$routes[$method] = array();
        }
        array_push($this->routes[$method], $template);
        return true;
    }

    public function match($path) {
        $parsedPath = $this->parser->parse($path);
        $method = $_SERVER["REQUEST_METHOD"];
        $bucket = $this->routes[$method];
        if (isset($bucket)) {
            $propsAndHandler = $this->comparator->compare($parsedPath, $bucket);
            if ($propsAndHandler === null) {
                throw new NotFoundException("Cannot ".$_SERVER['REQUEST_METHOD']." ".$path);               
            } else {
                return $propsAndHandler;
            }      
        } else {
            throw new NotFoundException("Cannot ".$_SERVER['REQUEST_METHOD']." ".$path);    
        }
    }
}