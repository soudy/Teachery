<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

// Hardcoded keys haha >:)
$keys = [
    // terence
    '1a08d84b050968de913c859c1eecc9e54b677b4f' => 'MD2A',
    //steven
    '4068f0880b399410602d694b3cc711c8a8f4727e' => 'MD2B',
    // mirko
    '935782bdc81e5b4be5680f0a407ea20e1213c9d1' => 'MD2C',
];

if (!isset($_POST['validation_key']))
    die();


$key = filter_input(INPUT_POST, 'validation_key', FILTER_SANITIZE_STRING);

if (!isset($keys[$key]))
    die();


$file = $keys[$key];

if (!file_exists("cache/$file.json")){
    // create the json from the CSV file
    
    if (!file_exists(__DIR__."/classes/$file.csv"))
        die('No file found');
    
    $handle = fopen(__DIR__."/classes/$file.csv", "r");
    if ($handle === FALSE)
        die('Cant open file');
    
    $row = 0;
    $users = [];
    $keys = [];
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        $member = [];
        for ($c=0; $c < $num; $c++) {
            if ($row == 0)
                $keys[] = $data[$c];
            else
                $member[$keys[$c]] = $data[$c];
        }
        if ($row != 0)
            $users[] = $member;
        $row++;
    }
    fclose($handle);

    $handle = fopen(__DIR__."/cache/$file.json", "w");
    if ($handle === FALSE)
        die ('Something went wrong with caching');
    
    fputs($handle, json_encode($users));   
}

include(__DIR__."/cache/$file.json");
