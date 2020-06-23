<?php

namespace view;

use model\logic\PaginationList;

class CommentPageView implements IView {

    private PaginationList $comments;

    public function __construct(PaginationList $comments) {
        $this->comments = $comments;
    }

    private $TABLE_START = '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>3.3 Гостевая книга</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body>
            <header class="navbar navbar-expand-md navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#page-navbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <nav class="collapse navbar-collapse" id="page-navbar">
                    <a class="navbar-brand pr-2" href="#">Поликлиника №1</a>
                    <ul class="navbar-nav mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Главная</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/table">Таблица</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/form">Форма</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div id="app">
                <a href="/form" class="nav-link">Оставить отзыв в гостевой книге</a>
                <table id="table" class="table-striped table-bordered">
        ';

        private $TABLE_END = '</div>
        </body>
        </html>';


    private function createCommentView() : string {
        $commentRows = '';
        foreach ($this->comments->items as $index => $comment) {
            $author = $comment['author'];
            $message = $comment['message'];
            $email = $comment['email'];
            $commentRows .= "<div class='table-row'>
                <div class='table-cell'>$author</div>
                <div class='table-cell'>$email</div>
                <div class='table-cell'>$message</div>
            </div>";
        }
        return $commentRows;
    }

    public function render(): void {
        $tableHtml = '<table class="table-striped table-bordered">';
        $buttonHtml = $this->comments->isEnd ? "" : '<button id="load-comments-button"></button>';
        $commentsHtml = $this->createCommentView();
        print($this->TABLE_START.$tableHtml.$commentsHtml.$buttonHtml."</table>".$this->TABLE_END);
    }
}