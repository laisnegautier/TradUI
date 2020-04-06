<?php
// Importing DBConfig.php file.
include 'dbconfig.php';

// Creating connection.
$connection = mysqli_connect($HostName, $DatabaseUser, $HostPass, $DatabaseName);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$queryLanguages = "SELECT answer_descr FROM answerTranslation WHERE quest_id = " . $_GET["id"];

$query_result = $connection->query($queryLanguages);

// Conversion en JSON
$dbdata = array();

//Fetch into associative array
while ($row = $query_result->fetch_assoc()) {
    $dbdata[] = $row;
}

//Print array in JSON format
echo json_encode($dbdata);

//echo json_encode($message);

$connection->close();
