<?php

namespace model\db\exceptions;

use Exception;
use Throwable;

class DataLayerException extends Exception {
    public function __construct($message = "", $code = 0, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}