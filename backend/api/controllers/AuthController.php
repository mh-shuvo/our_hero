
<?php
require_once __DIR__.'/../models/User.php';
require_once __DIR__.'/../helpers/JWT.php';
require_once __DIR__.'/../helpers/Response.php';

class AuthController {
    private $db;
    private $user;

    public function __construct($db) {
        $this->db = $db;
        $this->user = new User($db);
    }

    public function register($data) {
        $this->user->name = $data['name'];
        $this->user->email = $data['email'];
        $this->user->password = $data['password'];
        $this->user->role = $data['role'];

        if ($this->user->register()) {
            Response::json(['message' => 'User registered successfully. Awaiting approval.']);
        } else {
            Response::error('User registration failed.');
        }
    }

    public function login($data) {
        $this->user->email = $data['email'];
        $stmt = $this->user->login();

        if ($stmt->rowCount() == 1) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($data['password'], $row['password'])) {
                if ($row['approved'] == 1) {
                    $token = JWTHandler::encode(['id' => $row['id'], 'role' => $row['role']]);
                    $row['token'] = $token;
                    Response::json(['user' => $row]);
                } else {
                    Response::error('User not approved.');
                }
            } else {
                Response::error('Incorrect password.');
            }
        } else {
            Response::error('User not found.');
        }
    }

    public function getUserProfile($id){
        $stmt = $this->user->getById($id);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user){
            Response::json($user);
        }else{
            Response::error('User not found.');
        }
    }
}
