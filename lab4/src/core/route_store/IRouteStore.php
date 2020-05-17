<?php

interface IRouteStore {
    public function push($method, $template);
    public function match($path);
}