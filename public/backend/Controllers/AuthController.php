<?php

namespace App\Controllers;

use App\Config\Database;
use PDO;

class AuthController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function login($identifier, $password) {
        if (!$this->db) {
            return ["status" => "error", "message" => "Database connection failed"];
        }

        // Search by roll_number or phone
        $query = "SELECT * FROM users WHERE (roll_number = :identifier OR phone = :identifier) AND deleted_at IS NULL LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':identifier', $identifier);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Remove password from user data
            unset($user['password']);
            
            // In a real app, generate a proper JWT here.
            // For this prototype, we'll return a simple token.
            $token = base64_encode(json_encode(['id' => $user['id'], 'exp' => time() + (86400 * 30)]));
            
            return [
                "status" => "success",
                "message" => "Login successful",
                "data" => [
                    "user" => $user,
                    "token" => $token
                ]
            ];
        }

        return ["status" => "error", "message" => "Invalid roll number/phone or password"];
    }

    public function register($data) {
        if (!$this->db) {
            return ["status" => "error", "message" => "Database connection failed"];
        }

        // Basic validation
        if (empty($data['name']) || empty($data['roll_number']) || empty($data['password'])) {
            return ["status" => "error", "message" => "Name, roll number, and password are required"];
        }

        // Check if user already exists
        $checkQuery = "SELECT id FROM users WHERE roll_number = :roll_number OR (phone = :phone AND phone IS NOT NULL)";
        $checkStmt = $this->db->prepare($checkQuery);
        $checkStmt->bindParam(':roll_number', $data['roll_number']);
        $phone = $data['phone'] ?? null;
        $checkStmt->bindParam(':phone', $phone);
        $checkStmt->execute();

        if ($checkStmt->fetch()) {
            return ["status" => "error", "message" => "User with this roll number or phone already exists"];
        }

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        
        // Insert new user
        $query = "INSERT INTO users (id, name, roll_number, password, phone, created_at, updated_at) 
                  VALUES (UUID(), :name, :roll_number, :password, :phone, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':roll_number', $data['roll_number']);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':phone', $phone);

        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Registration successful"];
        }

        return ["status" => "error", "message" => "Registration failed"];
    }
}
