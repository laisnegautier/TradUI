<?php
// Importing DBConfig.php file.
include 'dbconfig.php';

$message = '';

// Creating connection.
$connection = mysqli_connect($HostName, $DatabaseUser, $HostPass, $DatabaseName);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$json = json_decode(file_get_contents('php://input'), true);

$queryQuestions = "SELECT quest_word FROM question";

$query_result = $connection->query($queryQuestions);

if ($query_result === true) {
    //this.setState(questions : $queryQuestions)
} else {
    $message = 'Error! Try Again.';
}

echo json_encode($message);

$connection->close();