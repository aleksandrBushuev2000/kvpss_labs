<?php

interface IRequestHandler {

    /**
     * Handles request
     * @param <Request> $req - Request object
     * @return void
     */
    public function handle($req);
}