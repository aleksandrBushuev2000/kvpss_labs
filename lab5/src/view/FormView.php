<?php

namespace view;

class FormView implements IView {
    public function render() : void  {
        print(file_get_contents($_SERVER['DOCUMENT_ROOT']."/src/view/inc/form.html"));
    }
}