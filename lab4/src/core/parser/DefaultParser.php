<?php

require_once './IParser.php';

const $URL_SEPARATOR = "/";

class DefaultParser implements IParser {
    public function parse($path) {

    }

    public function parseTemplate($stringTemplate) {
        $templateParts = explode($URL_SEPARATOR, $stringTemplate);
        var_dump($templateParts);
    }
}