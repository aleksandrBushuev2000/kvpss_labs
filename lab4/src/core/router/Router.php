<?php

require_once __DIR__."/../exceptions/UndefinedHttpMethodException.php";
require_once __DIR__."/../template_parser/DefaultTemplateParser.php";
require_once __DIR__."/../route_store/DefaultRouteStore.php";
require_once __DIR__."/../request_parser/DefaultRequestParser.php";

class Router {

    private $templateParser;
    private $requestParser;
    private $store;

    private static $Router = null;
    private static $isRequestAlreadyHandled = false;

    private $handlers = [
        "404" => null,
        "500" => null,
        "400" => null,
    ];

    private $AVAIBLE_HTTP_METHODS = [
        "GET" => true,
        "HEAD" => true,
        "POST" => true,
        "PUT" => true,
        "DELETE" => true,
        "PATCH" => true,
        "TRACE" => true,
        "CONNECT" => true,
        "OPTIONS" => true,
    ];

    private function __construct() {
        $this->templateParser = new DefaultTemplateParser();
        $this->requestParser = new DefaultRequestParser();
        $this->store = new DefaultRouteStore();
    }

    public function set404Handler($handler) {
        $this->handlers["404"] = $handler;
    }

    public function set500Handler($handler) {
        $this->handlers["500"] = $handler;
    }

    public function set400Handler($handler) {
        $this->handlers["400"] = $handler;
    }

    public static function getInstance() {
        if (self::$Router == null) {
            self::$Router = new self();
        }
        return self::$Router;
    }

    public function __call($method, $arg) {
        $httpRequestMethod = strtoupper($method);
        if (isset($this->AVAIBLE_HTTP_METHODS[$httpRequestMethod])) {
            $path = $arg[0];
            $handler = $arg[1];
            $this->request($httpRequestMethod, $path, $handler);
        } else {
            throw new UndefinedHttpMethodException("Undefined http method: ".$httpRequestMethod);
        }
    }

    public function request($method, $path, $handler) {
        $template = $this->templateParser->parseTemplate($path, $handler);
        $this->store->push($method, $template);
    }

    private function parseRequest($path) {
        try {
            return $this->requestParser->parse();
        } catch(Exception $e) {
            throw new BadRequestException("Bad request");
        } 
    }

    private function requireErrorHandlers() {
        if (!isset($this->handlers["400"])) {
            require_once __DIR__."/../handler/default_handlers/BadRequestHandler.php";
            $this->handlers["400"] = new BadRequestHandler();
        }
        if (!isset($this->handlers["500"])) {
            require_once __DIR__."/../handler/default_handlers/InternalServeErrorHandler.php";
            $this->handlers["500"] = new InternalServeErrorHandler();
        }
        if (!isset($this->handlers["404"])) {
            require_once __DIR__."/../handler/default_handlers/NotFoundHandler.php";
            $this->handlers["404"] = new NotFoundHandler();
        }
    }

    public function handle() {
        try {
            $this->requireErrorHandlers();
            $path = $_SERVER['REQUEST_URI'];
            $req = $this->requestParser->parse();
            $handlerAndParams = $this->store->match($path);
            $req->params = $handlerAndParams->params;
            $handlerAndParams->handler->handle($req);
        } catch(BadRequestException $e) {
            $this->handlers["400"]->handle(null);
        } catch(NotFoundException $e) {
            $this->handlers["404"]->handle(null);
        } catch(Exception $e) {
            $this->handlers["500"]->handle(null);
        } catch(Error $e) {
            $this->handlers["500"]->handle(null);
        }
    }
}
