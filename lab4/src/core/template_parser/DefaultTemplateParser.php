<?php

require_once 'ITemplateParser.php';
require_once "DefaultAliasParser.php";

require_once __DIR__."/../template/Template.php";
require_once __DIR__."/../template/TemplatePart.php";

require_once __DIR__."/exceptions/ParseException.php";

class DefaultTemplateParser implements ITemplateParser {
    private $URL_SEPARATOR = "/";
    private $aliasParser = null;

    private function hasAlias($part) {
        return strpos($part, "{") == 0 && strrpos($part, "}") == strlen($part) - 1;
    }


    private function getTemplatePart($part) {
        if ($this->hasAlias($part)) {
            return $this->aliasParser->parse($part);
        } else {
            $res = new TemplatePart();
            return $res->name($part)->isAlias(false)->isOptional(false)->datatype("")->defaultValue("");
        }
    }

    private function removeSpaces($parts) {
        return array_map(function($element) {
            return implode(explode(" ", $element));
        }, $parts);
    }

    private function filterEmpty($parts) {
        return array_filter($parts, function($element) {
            return $element != "";
        });
    } 

    private function urlToArray($urlTemplate) {
        $templateParts = explode($this->URL_SEPARATOR, $urlTemplate);
        $templateParts = $this->removeSpaces($templateParts);
        $templateParts = $this->filterEmpty($templateParts); 
        $templateParts = array_values($templateParts);
        return $templateParts;
    }

    public function parseTemplate($urlTemplate, $handler) {
        try {
            $templateParts = $this->urlToArray($urlTemplate);
            $template = new Template($handler);
            for ($i = 0; $i < count($templateParts); $i++) {
                $templatePart = $this->getTemplatePart($templateParts[$i]);
                $template->push($templatePart);
            }

            return $template;
        } catch(Trowable $e) {
            throw new ParseException($e->getMessage());
        }
    }

    public function __construct() {
        $this->aliasParser = new DefaultAliasParser();
    }
}