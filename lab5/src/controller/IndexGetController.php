<?php

namespace controller;

use view\IndexView;

use SimpleRouter\handlers\IRequestHandler;
use SimpleRouter\request\Request;

class IndexGetController implements IRequestHandler {
    public function handle(Request $req) {
        (new IndexView())->render();
    }
}