<?php

namespace App\Controllers;

use App\Config\Database;
use PDO;

class StatsController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getStats() {
        if (!$this->db) {
            return [
                'usersCount' => 0,
                'examsCount' => 0,
                'batchesCount' => 0,
                'questionsCount' => 0
            ];
        }

        $usersCount = $this->db->query("SELECT COUNT(*) FROM users WHERE deleted_at IS NULL")->fetchColumn();
        $examsCount = $this->db->query("SELECT COUNT(*) FROM exams WHERE deleted_at IS NULL")->fetchColumn();
        $batchesCount = $this->db->query("SELECT COUNT(*) FROM batches WHERE deleted_at IS NULL")->fetchColumn();
        $questionsCount = $this->db->query("SELECT COUNT(*) FROM questions WHERE deleted_at IS NULL")->fetchColumn();

        return [
            'usersCount' => (int) $usersCount,
            'examsCount' => (int) $examsCount,
            'batchesCount' => (int) $batchesCount,
            'questionsCount' => (int) $questionsCount
        ];
    }
}
