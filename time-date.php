<?php
// set time zone;
date_default_timezone_set('Europe/London');
// actual server time&date;
$day = date('l');
$date = date('d/M');
$time = date('H:i:s');

echo json_encode(array($day, $date, $time));

?>