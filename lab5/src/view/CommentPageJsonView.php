<?php

namespace view;

use model\logic\PaginationList;

class CommentPageJsonView implements IView {
    private PaginationList $comments;

    public function __construct(PaginationList $comments) {
        $this->comments = $comments;
    }

    public function render(): void {
        $jsonComments = [
            "items" => $this->comments->items,
            "isEnd" => $this->comments->isEnd,
            "page" => $this->comments->page,
            "perPage" => $this->comments->perPage
        ];
        print(json_encode($jsonComments));
    }
}