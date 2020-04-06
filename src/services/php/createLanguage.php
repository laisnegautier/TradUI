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

$query = "INSERT INTO answerLanguage(answer_descr, quest_id) values('$json[input]', '$json[questionId]')";

$query_result = $connection->query($query);

if ($query_result === true) {
    $message = 'Success!';
} else {
    $message = 'Error! Try Again.';
}

echo json_encode($message);

$connection->close();
