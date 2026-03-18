<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../core/bootstrap.php';

use App\Controllers\StatsController;
use App\Controllers\BatchController;
use App\Controllers\BlogController;
use App\Controllers\AuthController;

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$response = ["status" => "error", "message" => "Endpoint not found"];

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Simple routing based on path segments
$segments = explode('/', trim($path, '/'));
$api_index = array_search('api', $segments);
$endpoint = ($api_index !== false && isset($segments[$api_index + 1])) ? $segments[$api_index + 1] : '';

if ($endpoint === 'stats') {
    $controller = new StatsController();
    $data = $controller->getStats();
    $response = ["status" => "success", "data" => $data];
} elseif ($endpoint === 'batches') {
    $controller = new BatchController();
    $data = $controller->getLiveBatches();
    $response = ["status" => "success", "data" => $data];
} elseif ($endpoint === 'public-exams') {
    $controller = new BatchController();
    $data = $controller->getPublicExams();
    $response = ["status" => "success", "data" => $data];
} elseif ($endpoint === 'blog' && isset($segments[$api_index + 2])) {
    $slug = $segments[$api_index + 2];
    $controller = new BlogController();
    $data = $controller->getBlogBySlug($slug);
    if ($data) {
        $response = ["status" => "success", "data" => $data];
    } else {
        http_response_code(404);
        $response = ["status" => "error", "message" => "Blog post not found"];
    }
} elseif ($endpoint === 'login' && $method === 'POST') {
    $controller = new AuthController();
    $identifier = $input['identifier'] ?? '';
    $password = $input['password'] ?? '';
    $response = $controller->login($identifier, $password);
} elseif ($endpoint === 'register' && $method === 'POST') {
    $controller = new AuthController();
    $response = $controller->register($input);
}

echo json_encode($response);