<?php

interface IParser {
    /**
     * Parse path and return new Request Instance
     * @param <string> path - request path
     * @return <Request> req 
     */
    public function parse($path);

    /**
     * Parse template
     * @param <string> path - request path (template, f.e. /members/{memberId}/{sectionName}/)
     * @return <Request> req 
     */
    public function parseTemplate($path);
}