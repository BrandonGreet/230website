<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link href="https://fonts.googleapis.com/css?family=Lobster+Two" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Kosugi" rel="stylesheet">
	<title>Daily Quote</title>

	<style type="text/css">
		html {
			background-color: red;
		}
		div {
			background-color: yellow;
			padding: 10px;
			border: 17px groove lime;
			border-bottom: 19px dashed lime;
			border-radius: 66px 30px;
		}
		h1 {
			font-family: "Lobster Two", cursive;
			font-size: 72px;
			text-align: center;
			color: magenta;
		}
		p {
			font-family: "Kosugi", sans-serif;
			font-size: 40px;
			text-align: left;
			color: blue;
		}
	</style>
</head>
<body>
	<div>
		<h1>Daily Quote</h1>
		<br>
		<?php
			$quotes = [
								 "\"Beep Beep\" - Road Runner",
								 "\"\" - Coyote",
								 "\"What's up, Doc?\" - Bugs Bunny",
								 "\"Suffering Succotash\" - Daffy Duck",
								 "\"Say your pwayers, wabbit!\" - Elmer Fudd",
								 "\"Gee, Brain. What are we going to do tonight?\" - Pinky",
								 "\"The same thing we try to do every night, Pinky. Try to take over the world.\" - The Brain"
								];
			$curDay = date(D);
			$quoteToUse;
			switch ($curDay)
			{
				case "Mon":
					$quoteToUse = 0;
					break;
				case "Tue":
					$quoteToUse = 1;
					break;
				case "Wed":
					$quoteToUse = 2;
					break;
				case "Thu":
					$quoteToUse = 3;
					break;
				case "Fri":
					$quoteToUse = 4;
					break;
				case "Sat":
					$quoteToUse = 5;
					break;
				case "Sun":
					$quoteToUse = 6;
					break;
			}
			echo "<p>{$quotes[$quoteToUse]}</p>";
		?>
	</div>
</body>
</html>