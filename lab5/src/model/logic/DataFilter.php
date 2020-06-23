<?php

namespace model\logic;

class DataFilter {
    public function isValidGetCommentPageParams($page, $perPage) : bool {
        return is_int($page) && $page > 0 && is_int($perPage) && $perPage > 0;
    }

    public function checkAndValidateComment(& $comment) : bool {
        if (!is_array($comment)) return false;

        $commentFields = ['author', 'email', 'text'];
        foreach ($commentFields as $index => $field) {
            if (!isset($comment[$field]) || trim($comment[$field]) == 0) {
                return false;
            } else {
                $comment[$field] = trim(strip_tags($comment['field']));
            }
        }

        $comment['email'] = filter_var($comment['email'], FILTER_VALIDATE_EMAIL);
        if ($comment['email'] == false) return false;

        return true;
    }
}