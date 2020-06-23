<?php

namespace controller;

use view\FormView;

use SimpleRouter\handlers\IRequestHandler;
use SimpleRouter\request\Request;

class FormGetController implements IRequestHandler {
    public function handle(Request $req) {
        (new FormView())->render();
    }
}