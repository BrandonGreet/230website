<?PHP
	$server =  $_SERVER["SERVER_NAME"];
	$ip =  $_SERVER["REMOTE_ADDR"];
	$ua =  $_SERVER["HTTP_USER_AGENT"];
	echo "<p>The server is: $server</p>";
	echo "<p>Your IP address is: $ip</p>";
	echo "<p>Your browser is: $ua</p>";
	echo "<p>The server IP address is {$_SERVER["SERVER_ADDR"]}</p>";
	echo "<p>The server software is {$_SERVER["SERVER_SOFTWARE"]}</p>";
	echo "<p>The server time is ".date("m/d/Y H:i:s")."</p>";
?>