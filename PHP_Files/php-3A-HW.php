<?php
	$colors = ["red", "blue", "green"];
	$links = ["RIT"=>"http://www.rit.edu", "RPI"=>"http://www.rpi.edu", "MCC"=>"http://www.monroecc.edu"];
	$colorList = "";
	$linksList = "";

	foreach ($colors as $value) 
	{
		$colorList .= "<li>$value</li>\n";
	}
	foreach ($links as $key => $value) {
		$linksList .= "<li><a href=$value>$key</a></li>";
	}

	echo "<h1>HELLO</h1><ol>$colorList</ol><ul>$linksList</ul>";
?>