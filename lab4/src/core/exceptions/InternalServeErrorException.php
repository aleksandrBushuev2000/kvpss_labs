<?php

class InternalServeErrorException extends Exception {
    public function __construct($message) {
        parent::__construct($message);
    }
}