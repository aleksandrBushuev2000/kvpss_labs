<?php

require_once "./exceptions/TemplatePartException.php";

class TemplatePart {

    public __construct($name_, $isAlias_) {
        if ($name_) {
            $name = $name_;
            $isAlias = $isAlias_;
        } else {
            throw new TemplatePartException("Invalid template: empty name");
        }
    } 

    public function getName() {
        return $name;
    }

    public function getIsAlias() {
        return $isAlias;
    }

    private $name;
    private $isAlias;
}