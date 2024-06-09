<?php
require_once __DIR__.'/../models/Hero.php';
require_once __DIR__.'/../helpers/Response.php';
require_once __DIR__.'/../config/config.php';

class HeroController {
    private $db;
    private $hero;
    private $config;

    public function __construct($db) {
        $this->db = $db;
        $this->hero = new Hero($db);
        $this->config = include(__DIR__.'/../config/config.php');
    }

    public function create($data) {

        $images = [];
        $images_fullPath = [];
        $baseUrl = $this->config['base_url'];

        try {
            // Check if files are uploaded
            if (!empty($_FILES['images'])) {
                foreach ($_FILES['images']['name'] as $key => $image) {
                    $ext = pathinfo($_FILES['images']['name'][$key], PATHINFO_EXTENSION);
                    $name = time() . "." . $ext;
                    move_uploaded_file($_FILES['images']['tmp_name'][$key], __DIR__ . "/../uploads/$name");
                    $images[] = $baseUrl . "/uploads/$name";
                    $images_fullPath[] = __DIR__ . "/../uploads/$name";
                }
            }

            // Parse JSON data from the form
            $data = json_decode($_POST['imageData'], true);
            
            $this->hero->name = $data['name'];
            $this->hero->date_of_dead = date('Y-m-d',strtotime($data['date_of_dead']));
            $this->hero->address = $data['address'];
            $this->hero->details = $data['details'];
            $this->hero->images = json_encode($images, true);
            $this->hero->is_featured = $data['is_featured'];

            if ($this->hero->create()) {
                Response::json(['message' => 'Hero created successfully. Awaiting approval.']);
            } else {
                Response::error('Hero creation failed.');
            }
        } catch (\Exception $e) {
            foreach ($images_fullPath as $image) {
                unlink($image);
            }
            Response::error($e->getMessage());
        }
    }

    public function update($id, $data) {
        $this->hero->id = $id;
        $this->hero->name = $data['name'];
        $this->hero->date_of_dead = $data['date_of_dead'];
        $this->hero->address = $data['address'];
        $this->hero->details = $data['details'];
        $this->hero->images = json_encode($data['images']);
        $this->hero->is_featured = $data['is_featured'];

        if ($this->hero->update()) {
            Response::json(['message' => 'Hero updated successfully. Awaiting approval.']);
        } else {
            Response::error('Hero update failed.');
        }
    }

    public function approve($id) {
        if ($this->hero->approve($id)) {
            Response::json(['message' => 'Hero approved successfully.']);
        } else {
            Response::error('Hero approval failed.');
        }
    }

    public function delete($id) {
        if ($this->hero->delete($id)) {
            Response::json(['message' => 'Hero deleted successfully.']);
        } else {
            Response::error('Hero deletion failed.');
        }
    }

    public function getAllApproved() {
        $stmt = $this->hero->getAllApproved();
        $heroes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $responseData = array_map(function ($hero) {
            // Check if images is a string (assuming it's encoded JSON)
            if (is_string($hero['images'])) {
                $decodedImages = json_decode($hero['images'], true);
                // Ensure successful decoding (optional)
                if (json_last_error() === JSON_ERROR_NONE) {
                    $hero['images'] = $decodedImages;
                }
            }
            return $hero;
        }, $heroes);
        

        Response::json($responseData);
    }
    public function getById($id){
        $stmt = $this->hero->getById($id);
        $hero = $stmt->fetch(PDO::FETCH_ASSOC);
        if($hero){
            if (is_string($hero['images'])) {
                $decodedImages = json_decode($hero['images'], true);
                $hero['images'] = $decodedImages;
            }
        }

        Response::json($hero);

    }
}