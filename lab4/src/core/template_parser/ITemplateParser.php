<?php

interface ITemplateParser {
    /**
     * Parse template
     * @param <string> path - request path (template, f.e. /members/{memberId}/{sectionName}/)
     * @param <IRequestHandler> handler - request handler with "handle" method
     * @return <Template> template
     */
    public function parseTemplate($path, $handler);
}