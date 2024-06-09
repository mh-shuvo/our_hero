<?php
require_once __DIR__.'/../config/config.php';
require_once __DIR__.'/../helpers/JWT.php';
require_once __DIR__.'/../helpers/Response.php';
require_once __DIR__.'/../middleware/AuthMiddleware.php';
require_once __DIR__.'/../controllers/AuthController.php';
require_once __DIR__.'/../controllers/HeroController.php';


$config = include(__DIR__.'/../config/config.php');
JWTHandler::init($config);

$dbConfig = $config['db'];
$dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']}";
$db = new PDO($dsn, $dbConfig['username'], $dbConfig['password']);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$requestMethod = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '/';

$realPath = str_replace(["/api/", "//"], "/", $path);

switch ($realPath) {
    case '/':
        if ($requestMethod === 'GET') {
            Response::json([
                "result" => []
            ], 404);
        }
        break;
    case '/register':
        if ($requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            $authController = new AuthController($db);
            $authController->register($data);
        }
        break;

    case '/login':
        if ($requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            $authController = new AuthController($db);
            $authController->login($data);
        }
        break;

    case '/logout':
        $decoded = AuthMiddleware::authenticate();
        if ($requestMethod === 'POST') {
            $authController = new AuthController($db);
            $authController->logout();
        }
        break;

    case '/profile':
        $decoded = AuthMiddleware::authenticate();
        if ($requestMethod === 'PUT') {
            $data = json_decode(file_get_contents('php://input'), true);
            $authController = new AuthController($db);
            $authController->updateProfile($decoded['id'], $data);
        }
        break;

    case '/heroes':
        if ($requestMethod === 'GET') {
            $heroController = new HeroController($db);
            $heroController->getAllApproved();
        }
        break;

    case '/hero':
        $decoded = AuthMiddleware::authenticate();
        if ($decoded['role'] === 'admin' || $decoded['role'] === 'moderator') {
            if ($requestMethod === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                $heroController = new HeroController($db);
                $heroController->create($data);
            }
        }
        break;

    case '/hero/update':
        $decoded = AuthMiddleware::authenticate();
        if ($decoded['role'] === 'admin' || $decoded['role'] === 'moderator') {
            if ($requestMethod === 'POST') {
                $id = $_GET['id'];
                $data = json_decode(file_get_contents('php://input'), true);
                $heroController = new HeroController($db);
                $heroController->update($id, $data);
            }
        }
        break;

    case '/hero/approve':
        $decoded = AuthMiddleware::authenticate();
        if ($decoded['role'] === 'admin') {
            if ($requestMethod === 'POST') {
                $id = $_GET['id'];
                $heroController = new HeroController($db);
                $heroController->approve($id);
            }
        }
        break;

    case '/hero/delete':
        $decoded = AuthMiddleware::authenticate();
        if ($decoded['role'] === 'admin') {
            if ($requestMethod === 'DELETE') {
                $id = $_GET['id'];
                $heroController = new HeroController($db);
                $heroController->delete($id);
            }
        }
        break;
    case '/heroes/single': // New case for single hero details
        if ($requestMethod === 'GET') {
            $id = $_GET['id'];
            if (!is_null($id)) { // Check if ID is present
                $heroController = new HeroController($db);
                $hero = $heroController->getById($id);
                if ($hero) {
                    Response::json($hero);
                } else {
                    Response::error('Hero not found', 404);
                }
            } else {
                Response::error('Missing ID parameter', 400);
            }
        }
        break;

    default:
        Response::error('Not Found', 404);
        break;
}
