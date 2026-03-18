<?php

namespace App\Controllers;

use App\Config\Database;
use PDO;

class BatchController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getLiveBatches() {
        if (!$this->db) {
            return [];
        }

        $query = "SELECT * FROM batches WHERE status = 'live' AND deleted_at IS NULL ORDER BY created_at DESC";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getPublicExams() {
        if (!$this->db) {
            return [];
        }

        $query = "SELECT e.*, b.name as batch_name, b.slug as batch_slug 
                  FROM exams e 
                  JOIN batches b ON e.batch_id = b.id 
                  WHERE b.is_public = 1 AND e.status = 'live' AND e.deleted_at IS NULL 
                  LIMIT 6";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
