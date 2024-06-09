<?php
require_once __DIR__.'/../_core/router.php';
require_once __DIR__.'/../config/config.php';
require_once __DIR__.'/../helpers/JWT.php';
require_once __DIR__.'/../helpers/Response.php';
require_once __DIR__.'/../middleware/AuthMiddleware.php';
require_once __DIR__.'/../controllers/AuthController.php';
require_once __DIR__.'/../controllers/HeroController.php';


$config = include(__DIR__.'/../config/config.php');
JWTHandler::init($config);

$dbConfig = $config['db'];
$dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset=utf8mb4";
$db = new PDO($dsn, $dbConfig['username'], $dbConfig['password']);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$requestMethod = $_SERVER['REQUEST_METHOD'];

// Register routes
Router::get('/', function () {
    throw new Exception('Invalid endpoint', 404); // Handle invalid root access
    // print_r($_SERVER['HTTP_HOST']);
});

// Authentication routes (assuming POST for login and logout)
Router::post('/register', function () use ($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    $authController = new AuthController($db);
    $authController->register($data);
});

Router::post('/login', function () use ($db) {
    $data = json_decode(file_get_contents('php://input'), true);
    $authController = new AuthController($db);
    $decoded = $authController->login($data); // Assuming login returns decoded user data
});

Router::post('/logout', function () use ($db) {
    $authenticate(); // Perform authentication check
    $authController = new AuthController($db);
    $authController->logout();
});

// Profile route (assuming authenticated access)
Router::get('/profile', function () use ($db) {
    $decoded = AuthMiddleware::authenticate();
    $authController = new AuthController($db);
    $authController->getUserProfile($decoded['id']);
});

// Profile route (assuming authenticated access)
Router::post('/profile', function () use ($db) {
    $decoded = AuthMiddleware::authenticate();
    $data = json_decode(file_get_contents('php://input'), true);
    $authController = new AuthController($db);
    $authController->updateProfile($decoded['id'], $data);
});

// Hero routes (assuming authenticated access)
Router::get('/heroes', function () use ($db) {
    $heroController = new HeroController($db);
    $heroes = $heroController->getAllApproved();
});

Router::post('/hero', function () use ($db) {
    $decoded = AuthMiddleware::authenticate();
    if (!in_array($decoded['role'], ['admin', 'moderator'])) {
        throw new Exception('Unauthorized access', 403); // Handle unauthorized creation
    }
    $data = json_decode(file_get_contents('php://input'), true);
    $heroController = new HeroController($db);
    $heroController->create($data);
});

Router::post('/hero/update', function () use ($db) {
    $decoded = AuthMiddleware::authenticate();
    if (!in_array($decoded['role'], ['admin', 'moderator'])) {
        throw new Exception('Unauthorized access', 403); // Handle unauthorized update
    }
    $id = (int) $_GET['id']; // Cast to integer for type safety
    $data = json_decode(file_get_contents('php://input'), true);
    $heroController = new HeroController($db);
    $heroController->update($id, $data);
});

Router::post('/hero/approve', function () use ($db) {
    $decoded = AuthMiddleware::authenticate();
    if ($decoded['role'] !== 'admin') {
        throw new Exception('Unauthorized access', 403); // Handle unauthorized approval
    }
    $id = (int) $_GET['id']; // Cast to integer for type safety
    $heroController = new HeroController($db);
    $heroController->approve($id);
});

Router::delete('/hero/delete', function () use ($db) {
    $decoded = AuthMiddleware::authenticate();
    if ($decoded['role'] !== 'admin') {
        throw new Exception('Unauthorized access', 403); // Handle unauthorized deletion
    }
    $id = (int) $_GET['id']; // Cast to integer for type safety
    $heroController = new HeroController($db);
    $heroController->delete($id);
});

// Single hero details route
Router::get('/heroes/(\w+)', function ($id) use ($db) {
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
});
        