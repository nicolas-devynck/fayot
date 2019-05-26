<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>Statistiques</title>
		<!-- Encodage UTF8 -->
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="Content-Type" content="UTF-8">
		<!-- Meta pour les robots -->
		<meta name="Copyright" content="Devynck nicolas">
		<!-- Meta pour les ecran mobile HD -->
		<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
		<!-- Liens : Jquery, CSS, favicon ... -->
    <script type="text/javascript" src="files/jquery.js"></script>
		<script type="text/javascript" src="files/var.js"></script>
		<script type="text/javascript" src="files/core.js"></script>
		<script type="text/javascript" src="files/script.js"></script>
		<script type="text/javascript" src="files/jsSimpleDatePickr.js"></script>
		<link rel="stylesheet" type="text/css" href="files/style.css">
		<link rel="icon" type="image/png" href="files/logo.png" />
	</head>
	<body>
		<div id="calendarMain" class="calendarMain"></div>
		<script type="text/javascript">
		var myCalendar = new jsSimpleDatePickr();
		myCalendar.CalAdd({
		'divId': 'calendarMain',
		'dateMask': 'JJ/MM/AAAA',
		'dateCentury': 20,
		'titleMask': 'M AAAA',
		'navType': '01',
		'classTable': 'jsCalendar',
		'classDay': 'day',
		'classDaySelected': 'selectedDay',
		'monthLst': ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
		'dayLst': ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		'hideOnClick': false,
		'showOnLaunch': false
		});
		</script>
  </body>
</html>
