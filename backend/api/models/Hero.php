<?php
class Hero {
    private $conn;
    private $table = 'heroes';

    public $id;
    public $name;
    public $date_of_dead;
    public $address;
    public $details;
    public $images;
    public $is_featured;
    public $approved;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table . " SET name=:name, date_of_dead=:date_of_dead, address=:address, details=:details, images=:images, is_featured=:is_featured, approved=0";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->date_of_dead = htmlspecialchars(strip_tags($this->date_of_dead));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->details = htmlspecialchars(strip_tags($this->details));
        $this->images = $this->images;
        $this->is_featured = htmlspecialchars(strip_tags($this->is_featured));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':date_of_dead', $this->date_of_dead);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':details', $this->details);
        $stmt->bindParam(':images', $this->images);
        $stmt->bindParam(':is_featured', $this->is_featured);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table . " SET name=:name, date_of_dead=:date_of_dead, address=:address, details=:details, images=:images, is_featured=:is_featured WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->date_of_dead = htmlspecialchars(strip_tags($this->date_of_dead));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->details = htmlspecialchars(strip_tags($this->details));
        $this->images = htmlspecialchars(strip_tags($this->images));
        $this->is_featured = htmlspecialchars(strip_tags($this->is_featured));

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':date_of_dead', $this->date_of_dead);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':details', $this->details);
        $stmt->bindParam(':images', $this->images);
        $stmt->bindParam(':is_featured', $this->is_featured);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function approve($id) {
        $query = "UPDATE " . $this->table . " SET approved=1 WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id) {
        $query = "DELETE FROM " . $this->table . " WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getAllApproved() {
        $query = "SELECT * FROM " . $this->table . " WHERE approved=1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE approved=1 AND id = $id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}