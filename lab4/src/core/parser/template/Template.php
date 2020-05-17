<?php

class Template {

    public __construct() {
        $length = 0;
        $parts = [];
    }

    public function pushPart($part = null) {
        if ($part != null) {
            array_push($parts, $part);
            return true;
        }
        return false;
    }

    private $length;
    private $parts;
}