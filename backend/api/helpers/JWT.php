<?php
require_once __DIR__.'/../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
class JWTHandler {
    private static $secret;
    private static $expiry;

    public static function init($config) {
        self::$secret = $config['jwt']['secret'];
        self::$expiry = $config['jwt']['expiry'];
    }

    public static function encode($payload) {
        $payload['exp'] = time() + self::$expiry;
        return JWT::encode($payload, self::$secret,'HS256');
    }

    public static function decode($jwt) {
        try {
            $headers = null; // Initialize $headers variable
            return (array)JWT::decode($jwt,new Key(self::$secret, 'HS256'));
        } catch (Exception $e) {
            Response::error('Unauthorized', 401);
        }
    }
}
