<?php
$host = "10.16.39.156";
$port = "5432";
$dbname = "benchmark_db";
$user = "postgres";
$password = "1234";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}
die("Connected: " );

$query = "SELECT sys_name, bn, value1 FROM dummy.fio";
$result = pg_query($conn, $query);

if (!$result) {
    die("Query failed: " . pg_last_error());
}

$data = array();

while ($row = pg_fetch_assoc($result)) {
    $sys_name = $row["sys_name"];
    $bn = $row["bn"];
    $value1 = intval($row["value1"]);

    // Check if series already exists in the data array
    if (array_key_exists($sys_name, $data)) {
        $data[$sys_name]["data"][$bn] = $value1;
    } else {
        $data[$sys_name] = array(
            "label" => $sys_name,
            "data" => array($bn => $value1),
        );
    }
}

pg_close($conn);

header("Content-Type: application/json");
echo json_encode($data);
?>
