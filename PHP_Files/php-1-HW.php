<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<?php 
		$pageTitle = "PHP HW 1";
	?>
	<title>
		<?php
			echo $pageTitle;
		?>
	</title>
</head>
<body>
	<?php
		echo "<h1>$pageTitle</h1>";
		echo "<div><p>THis page is mostly empty for some reason.</p></div>";
		echo "<hr>";
		echo "<p>Page accessed on: " . date("Y-m-d H:i:s");
	?>
</body>
</html>