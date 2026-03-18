<?php

namespace App\Controllers;

use App\Config\Database;
use PDO;

class BlogController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getBlogBySlug($slug) {
        if (!$this->db) {
            return null;
        }

        $query = "SELECT b.*, c.name as category_name, a.name as author_name 
                  FROM blogs b 
                  LEFT JOIN categories c ON b.category_id = c.id 
                  LEFT JOIN admins a ON b.author_id = a.id 
                  WHERE b.slug = :slug AND b.status = 'published' AND b.deleted_at IS NULL 
                  LIMIT 1";
                  
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
