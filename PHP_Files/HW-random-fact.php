<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link href="https://fonts.googleapis.com/css?family=Lobster+Two" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Kosugi" rel="stylesheet">
	<title>Random Quote</title>

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
		<h1>Random Quote</h1>
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
			echo "<p>{$quotes[rand(0, 6)]}</p>";
		?>
		<form action="HW-random-fact.php" method="post">
			<input type="submit" value="New Quote!">
		</form>
	</div>
</body>
</html>