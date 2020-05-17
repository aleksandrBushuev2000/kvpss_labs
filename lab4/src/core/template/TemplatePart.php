<?php

require_once __DIR__."/exceptions/TemplatePartException.php";

class TemplatePart {

    private $name;
    private $isAlias;
    private $isOptional;
    private $dataType;
    private $initialValue;

    public function __set($key, $value) {
        if ($key == "name" && !$value) {
            throw new TemplatePartException("Empty name");
        }
        $this->key = $value;
        return $this;
    }
    
    public function __call($method, $arg) {
        $this->$method = $arg[0];
        return $this;
    }

    public function __get($key) {
        return $this->$key;
    }
}