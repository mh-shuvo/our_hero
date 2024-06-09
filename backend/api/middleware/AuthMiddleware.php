<?php
require_once __DIR__.'/../helpers/JWT.php';

class AuthMiddleware {
    public static function authenticate() {
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $matches = [];
            if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
                $jwt = $matches[1];
                return JWTHandler::decode($jwt);
            }
        }
        Response::error('Unauthorized', 401);
    }
}
