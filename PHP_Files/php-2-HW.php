<?PHP
	define("PI", 3.14159);
	$radius = 10;
	$area = PI * $radius * $radius;
	$circumference = 2 * PI * $radius;
  echo "<p>The area of a radius $radius circle is $area</p>";
  echo "<p>The circumference of the same circle is $circumference</p>";
?>