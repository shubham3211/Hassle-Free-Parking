//Note: This example requires that you consent to location sharing when
//prompted by your browser. If you see the error "The Geolocation service
//failed.", it means you probably did not give permission for the browser to
//locate you.
var map, infoWindow, latitude, longitude;
var location_list;
var source, destination;
var pyrmont;
var directionsDisplay;
var marker = [];
var myArr;
var count = 0;

google.maps.event.addDomListener(window, 'load', function() {
	new google.maps.places.SearchBox(document.getElementById('userloc'));
	new google.maps.places.SearchBox(document.getElementById('dest'));
	directionsDisplay = new google.maps.DirectionsRenderer({
		'draggable' : true,
		'suppressMarkers' : true
	});
});

function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		center : {
			lat : 28.6315,
			lng : 77.2167
		},
		zoom : 15
	});
	infoWindow = new google.maps.InfoWindow;
	google.maps.event.addDomListener(window, 'load', function() {
		new google.maps.places.SearchBox(document.getElementById('src'));
		new google.maps.places.SearchBox(document.getElementById('dest'));
		directionsDisplay = new google.maps.DirectionsRenderer({
			'draggable' : true
		});
	});
	if (navigator.geolocation) {
		navigator.geolocation
		.getCurrentPosition(
				function(position) {
					geocoder = new google.maps.Geocoder();

					var pos = {
							lat : position.coords.latitude,
							lng : position.coords.longitude
					};
					latitude = pos.lat;
					longitude = pos.lng;
					var image = 'https://maps.google.com/mapfiles/kml/shapes/';
					geocoder
					.geocode(
							{
								'latLng' : pos
							},
							function(results, status) {
								// alert('Location Found');

								if (status == google.maps.GeocoderStatus.OK) {
									var result = results[0];
									// look for locality tag and administrative_area_level_1
									var city = "";
									var state = "";
									for (var i = 0, len = result.address_components.length; i < len; i++) {
										var ac = result.address_components[i];
										if (ac.types.indexOf("locality") >= 0)
											city = ac.long_name;
										if (ac.types.indexOf("administrative_area_level_1") >= 0)
											state = ac.long_name;
									}

									if (city != '' && state != '') {														
										result.geometry.location.lat = latitude;
										result.geometry.location.lng = longitude;
										alert(result.formatted_address);
										// alert(result.place_id);
										// alert(result.typesstreet_address);
										// alert(result.long_name);
										document.getElementById("userloc").value = result.formatted_address;
									}
								}
							});

					// map.setCenter(pos);
					pyrmont = {
							lat : latitude,
							lng : longitude
					};
					// Parking Locator
					map = new google.maps.Map(document.getElementById('map'), {
						center : pyrmont,
						zoom : 15
					});

					var beachMarker = new google.maps.Marker({
						position : pyrmont,
						map : map,

					});

					// ----------------------------------//

					// MANUAL SELECTION

					var input = document.getElementById('userloc');
					// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

					var autocomplete = new google.maps.places.Autocomplete(input);
					autocomplete.bindTo('bounds', map);

					infowindow = new google.maps.InfoWindow();
					marker = new google.maps.Marker({
						map : map,
						anchorPoint : new google.maps.Point(0, -29)
					});

					autocomplete.addListener('place_changed',function() {
								infowindow.close();
								marker.setVisible(false);
								var place = autocomplete.getPlace();
								if (!place.geometry) {
									window.alert("Autocomplete's returned place contains no geometry");
									return;
								}

								// If the place has a geometry, then present it on a map.
								if (place.geometry.viewport) {
									map.fitBounds(place.geometry.viewport);
								} else {
									map.setCenter(place.geometry.location);
									map.setZoom(17);
								}

								marker.setPosition(place.geometry.location);
								marker.setVisible(true);
								infowindow.setContent('<div><strong>'+ place.name);
								infowindow.open(map, marker);
								latitude = place.geometry.location.lat();
								longitude = place.geometry.location.lng();
								pyrmont = {
										lat : latitude,
										lng : longitude
								};
								map = new google.maps.Map(
										document.getElementById('map'),
										{
											zoom : 12,
											center : pyrmont
										});
								
								beachMarker = new google.maps.Marker(
										{
											position : pyrmont,
											map : map,

										});

							});

					// -----------------------------------------------------------//

				},
				function() {

					handleLocationError(true, infoWindow, map.getCenter());
					var input = document.getElementById('userloc');
					// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

					var autocomplete = new google.maps.places.Autocomplete(input);
					autocomplete.bindTo('bounds', map);
					map = new google.maps.Map(document.getElementById('map'), {
						center : {
							lat : 28.6315,
							lng : 77.2167
						},
						zoom : 15
					});
					var infowindow = new google.maps.InfoWindow();
					marker = new google.maps.Marker({
						map : map,
						anchorPoint : new google.maps.Point(0, -29)
					});

					autocomplete.addListener('place_changed',function() {
								infowindow.close();
								marker.setVisible(false);
								var place = autocomplete.getPlace();
								if (!place.geometry) {
									window.alert("Autocomplete's returned place contains no geometry");
									return;
								}

								// If the place has a geometry,
								// then present it on a map.
								if (place.geometry.viewport) {
									map.fitBounds(place.geometry.viewport);
								} else {
									map.setCenter(place.geometry.location);
									map.setZoom(17);
								}

								marker.setPosition(place.geometry.location);
								marker.setVisible(true);
								infowindow.setContent('<div><strong>'+ place.name);
								infowindow.open(map, marker);
								latitude = place.geometry.location.lat();
								longitude = place.geometry.location.lng();
								
								pyrmont = {
										lat : latitude,
										lng : longitude
								};

								map = new google.maps.Map(
										document.getElementById('map'),
										{
											zoom : 12,
											center : pyrmont
										});
								var beachMarker = new google.maps.Marker(
										{
											position : pyrmont,
											map : map,

										});

							});

				});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}
//---------- END of function initMap ----------------------------------------//

//---------AJAX call---------------------//

function serveletCall(place, row) {

	// alert("In servlet call " + place);
	var xmlhttp = new XMLHttpRequest();
	var url = "parking";
	var geocode = place.toString();
	var len = geocode.length;
	var sub = geocode.substr(1, len - 2);
	sub = sub.substr(0, sub.indexOf(',')) + '_' + sub.substr(sub.indexOf(' ') + 1);

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			myArr = JSON.parse(this.responseText);

			if(myArr[0] != null){
				
			var c1 = document.getElementById("r" + row + "c1");
			c1.innerHTML = myArr[0].totalCapacity;

			var c2 = document.getElementById("r" + row + "c2");
			c2.innerHTML = myArr[0].vacant;

			var c4 = document.getElementById("r" + row + "c4");
			c4.innerHTML = myArr[0].price;
			}

		}
	};
	xmlhttp.open("GET", "parking" + "?p=" + sub, true);
	xmlhttp.send(sub);

}
//-------END AJAX call------------------//

//----------Show parking list on button click----------//

function addList() {
	count = 0;
	map = new google.maps.Map(document.getElementById('map'), {
		zoom : 12,
		center : pyrmont
	});

	var beachMarker = new google.maps.Marker({
		position : pyrmont,
		map : map,

	});
	var trafficLayer = new google.maps.TrafficLayer();
	trafficLayer.setMap(map);
	var trafficLayer = new google.maps.TrafficLayer();
	trafficLayer.setMap(map);

	document.getElementById("myTable").innerHTML = "";
	document.getElementById("dest").value = "";
	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location : pyrmont,
		radius : 2000,
		type : [ 'parking' ]

	}, callback1);

}

//-------------------- " results " stores parking
//names-----------------------------//
function callback1(results, status) {
	location_list = results;
	// alert('In function callback'+ results);
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}

}

//-----------Create parking marker-----------------//

function createMarker(place) {

	var placeLoc = place.geometry.location;
	// alert(placeLoc);
	serveletCall(placeLoc, count);

	var im = 'https://maps.google.com/mapfiles/kml/shapes/';

	marker = new google.maps.Marker({
		map : map,
		position : place.geometry.location,
		icon : im + 'parking_lot_maps.png'

	});

	// ---------------------Parking name insertion in Table-----------------------//

	var tabid = document.getElementById("myTable");

	var row = tabid.insertRow(tabid.rows.length);
	row.id = "r" + count;
	var cell = row.insertCell(0);
	cell.id = "r" + count + "c0";


	cell.innerHTML = place.name; // place.vicinity for short address
	cell.value = place.name;
	cell.class = "loc_cell";
	cell.style.fontFamily = "Arial";
	cell.onclick = function() {
		foo(place);
	};
	// alert(cell.value);
	source = document.getElementById("userloc").value;
	destination = document.getElementById("dest").value;

	// ----------------cell creation for data input-------------------//

	var cell1 = row.insertCell(1);
	cell1.id = "r" + count + "c1";
	
	var cell2 = row.insertCell(2);
	cell2.id = "r" + count + "c2";
	
	var cell3 = row.insertCell(3);
	cell3.style.color = "#ff7600";
	cell3.style.fontSize = "13px";
	cell3.style.fontFamily = "Arial";

	// --------------------Set Value of Distance Column----------//

	var service = new google.maps.DistanceMatrixService();

	service.getDistanceMatrix({
		origins : [ source ],

		destinations : [ place.vicinity ],
		travelMode : google.maps.TravelMode.DRIVING,
		unitSystem : google.maps.UnitSystem.METRIC,
		avoidHighways : false,
		avoidTolls : false
	}, function(response, status) {
		// alert('inbass');
		if (status == google.maps.DistanceMatrixStatus.OK
				&& response.rows[0].elements[0].status != "ZERO_RESULTS") {
			// alert('in2');
			var distance = response.rows[0].elements[0].distance.text;
			var duration = response.rows[0].elements[0].duration.text;

			cell3.innerHTML = distance;
		} else {
			alert("Unable to find the distance via road.");
		}
	});
	var cell4 = row.insertCell(4);
	cell4.id = "r" + count + "c4";
	// cell4.innerHTML = null;
	// alert(place.name);
	// maketable(place);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.vicinity);
		infowindow.open(map, this);
		document.getElementById('dest').value = place.vicinity;
		destination = document.getElementById("dest").value;
		foo(place);
	});
	count++;
}

//-------------foo sets value in Destination text box------------//

function foo(x) {

	var d = document.getElementById('dest');
	if (d.style.display == 'none')
		d.style.display = 'block';
	else
		d.style.display = 'block';
	// ---------calculation-----------//

	// alert(x.formatted_address);
	//alert(x.vicinity);
	document.getElementById("dest").value = x.name + "," + x.vicinity;
	source = document.getElementById("userloc").value;
	destination = document.getElementById("dest").value;

	// ------------------Distance & Time----------------//

	// alert('dist');

	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix({
		origins : [ pyrmont ],
		destinations : [ x.geometry.location ],
		travelMode : google.maps.TravelMode.DRIVING,
		unitSystem : google.maps.UnitSystem.METRIC,
		avoidHighways : false,
		avoidTolls : false
	}, function(response, status) {
		if (status == google.maps.DistanceMatrixStatus.OK
				&& response.rows[0].elements[0].status != "ZERO_RESULTS") {

			var distance = response.rows[0].elements[0].distance.text;
			var duration = response.rows[0].elements[0].duration.text;
			var dvDistance = document.getElementById("metrics");
			metrics.innerHTML = "";
			metrics.innerHTML += "Distance:   " + distance + "<br />";
			metrics.innerHTML += "Duration:   " + duration;

		} else {
			alert("Unable to find the distance via road.");
		}
	});

	//alert("find route");
	var directionsService = new google.maps.DirectionsService();

	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('panel'));

	// *********DIRECTIONS AND ROUTE**********************//

	var request = {
			origin : pyrmont,
			destination : x.geometry.location,
			provideRouteAlternatives : true,
			travelMode : google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});

}

function showpanel() {
	var e = document.getElementById('panel');
	if (e.style.display == 'none')
		e.style.display = 'block';
	else
		e.style.display = 'none';

}

/*
 * 
 * 
 * function maketable(place) { // User Location Marker
 * 
 * var tabid = document.getElementById("myTable"); tabid.innerHTML=""; for (var
 * i = 0; i < location_list.length; i++) { var row =
 * tabid.insertRow(tabid.rows.length); var cell = row.insertCell(0);
 * cell.innerHTML = location_list[i].name; cell.value=location_list[i].name;
 * //alert(location_list[i].name); cell.class = "loc_cell"; var place =
 * location_list[i]; //alert("Place ="+ place.name); cell.onclick =
 * function(){foo(place);};//"foo()";
 * 
 * 
 * //----------------cell creation for data input-------------------//
 * 
 * var cell1=row.insertCell(1); cell1.innerHTML=null; var
 * cell2=row.insertCell(2); cell2.innerHTML=null; var cell3=row.insertCell(3);
 * cell3.innerHTML=null; } }
 */

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);

	infoWindow
	.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.'
			: 'Error: Your browser doesn\'t support geolocation.');

	infoWindow.open(map);
}
