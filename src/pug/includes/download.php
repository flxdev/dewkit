<?php
    $config = file_exists(__DIR__ . '\assets\config.json') ? json_decode(file_get_contents(__DIR__ . '\assets\config.json'), true) : false;
?>