

	var cityList = populate();
	var lines=[];
	var myMarkers = [];
	var infowindows = [];
	var map;
	var openWin;
	var myCenter;
//Init function
function initialize() {

	var totalCoffee=0;
	var totalPro=0;
	var totalFriends=0;
	var totalHybrid=0;
	var totalAcademic=0;
	var totalFamily=0;
	var zoomLevel=6;

	for (var i = 0; i < cityList["CityMap"].length; i++){
		totalCoffee   += cityList["CityMap"][i][3]["Coffee"].length;
		totalPro      += cityList["CityMap"][i][3]["Professional"].length;
		totalFriends  += cityList["CityMap"][i][3]["Friends"].length;
		totalHybrid   += cityList["CityMap"][i][3]["Hybrid"].length;
		totalAcademic += cityList["CityMap"][i][3]["Academic"].length;
		totalFamily   += cityList["CityMap"][i][3]["Family"].length;
	}
	var totalNetwork = totalCoffee + totalPro + totalFriends + totalHybrid + totalAcademic + totalFamily;
	//console.log(totalNetwork);

	for (var i = 0; i < cityList["CityMap"].length; i++ )
	{
			myMarkers.push(
			  new google.maps.Marker(
			  	{
			  		position:new google.maps.LatLng(cityList["CityMap"][i][1],cityList["CityMap"][i][2]),
			  		icon: 
			  			{
			  				url:"icon.png",
			  				scaledSize:new google.maps.Size(24, 26),
			  				anchor:new google.maps.Point(12,13),
			  				zIndex:5

			  			},
			  		title:cityList["CityMap"][i][0]
			  	}
			  )
			);
	}
	
	var totalStates = "<br><h1 onclick=\"map.setZoom(2);map.setCenter(new google.maps.LatLng(40,-90))\">Total Cities in Network: " + cityList["CityMap"].length + "</h1>";
	totalStates += "<br><button id=\"totb\" onClick=\"allNet(cityList, lines, myMarkers)\">Total: " + totalNetwork+ "</button>";
	totalStates += " <button id=\"cofb\" onClick=\"coffeeNet(cityList, lines, myMarkers)\">Coffee: " + totalCoffee + "</button>"; 
	totalStates += " <button id=\"prob\" onClick=\"proNet(cityList, lines, myMarkers)\">Professional: " + totalPro+ "</button>";
	totalStates += " <button id=\"frib\" onClick=\"friendsNet(cityList, lines, myMarkers)\">Friends: " + totalFriends+ "</button>";
	totalStates += " <br><button id=\"hybb\" onClick=\"hybridNet(cityList, lines, myMarkers)\">Hybrid: " + totalHybrid+ "</button>";
	totalStates += " <button id=\"acab\" onClick=\"academicNet(cityList, lines, myMarkers)\">Academic: " + totalAcademic+ "</button>";
	totalStates += " <button id=\"famb\" onClick=\"familyNet(cityList, lines, myMarkers)\">Family: " + totalFamily+ "</button>"; 
	
	document.getElementById("infoPane").innerHTML += totalStates;


	var myCenter =new google.maps.LatLng(47.6252144,-122.4698705) ;
	//Map properties
	var mapProp = {
	  center: myCenter,
	  zoom: zoomLevel,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
	  disableDefaultUI:true
	};

	// Build map in DOM
	map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	




	//event listener setup
	for (var i=0; i < myMarkers.length ; i++){
		myMarkers[i].setMap(map); 

		var iw = new google.maps.InfoWindow(	
		  			{ /* content:"<div>"+myMarkers[i].getTitle()+"</div>"*/ } );
		infowindows.push(iw);

		  		var localTotal = cityList["CityMap"][i][3]["Coffee"].length
		  		+ cityList["CityMap"][i][3]["Professional"].length
		  		+ cityList["CityMap"][i][3]["Friends"].length
		  		+ cityList["CityMap"][i][3]["Hybrid"].length
		  		+ cityList["CityMap"][i][3]["Academic"].length
		  		+ cityList["CityMap"][i][3]["Family"].length;

				var infoText="<div style=\"font-family:quicksandbook\">"
				infoText += "<span class=\"title\">Network in " + myMarkers[i].getTitle() + "</span>";
				infoText += "<br>Percent of total network: " + (localTotal/totalNetwork *100).toPrecision(4) + "%";
				infoText += "<br>Coffee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; " + cityList["CityMap"][i][3]["Coffee"].length;
			  	infoText += "<br>Professional&nbsp;:&nbsp; " + cityList["CityMap"][i][3]["Professional"].length;
				infoText += "<br>Friends&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; " + cityList["CityMap"][i][3]["Friends"].length; 
				infoText += "<br>Hybrid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; " + cityList["CityMap"][i][3]["Hybrid"].length;
				infoText += "<br>Academic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; " + cityList["CityMap"][i][3]["Academic"].length;
				infoText += "<br>Family&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; " + cityList["CityMap"][i][3]["Family"].length + "</div>";

				infowindows[i].setContent(infoText);
				openWin = infowindows[i];
		google.maps.event.addListener(myMarkers[i], 'click', (function(index) {
			//console.log("Test before IIFE");
			return function(){
				//console.log("Test after IIFE");
		  		
		  		if (openWin != null){
		  			openWin.close();
		  		}


		  		infowindows[index].open(map, myMarkers[index]);

				openWin = infowindows[index];	

				//populate names	  		
		  		var coffeeNames="";
		  		for (var i = 0; i < cityList["CityMap"][index][3]["Coffee"].length; i++){
		  			coffeeNames += cityList["CityMap"][index][3]["Coffee"][i] + "<br>";
		  		}
		  		document.getElementById("coffeeList").innerHTML = "<span class=\"title\">Coffee: </span><br>" + coffeeNames;
		  		
		  		var proNames="";
		  		for (var i = 0; i < cityList["CityMap"][index][3]["Professional"].length; i++){

		  			proNames += cityList["CityMap"][index][3]["Professional"][i] + "<br>";
		  		}
		  		document.getElementById("proList").innerHTML = "<span class=\"title\">Professional: </span><br>" + proNames;
		  		
		  		var friendNames="";
		  		for (var i = 0; i < cityList["CityMap"][index][3]["Friends"].length; i++){
		  			friendNames += cityList["CityMap"][index][3]["Friends"][i] + "<br>";
		  		}
		  		document.getElementById("friendList").innerHTML = "<span class=\"title\">Friends: </span><br>" + friendNames;

		  		var hybridNames="";
		  		for (var i = 0; i < cityList["CityMap"][index][3]["Hybrid"].length; i++){
		  			hybridNames += cityList["CityMap"][index][3]["Hybrid"][i] + "<br>";
		  		}
		  		document.getElementById("hybridList").innerHTML = "<span class=\"title\">Hybrid: </span><br>" + hybridNames;
		  		
		  		var academicNames="";
		  		for (var i = 0; i < cityList["CityMap"][index][3]["Academic"].length; i++){
		  			academicNames += cityList["CityMap"][index][3]["Academic"][i] + "<br>";
		  		}
		  		document.getElementById("academicList").innerHTML = "<span class=\"title\">Academic: </span><br>" + academicNames;
		  		
		  		var familyNames="";
		  		for (var i = 0; i < cityList["CityMap"][index][3]["Family"].length; i++){
		  			familyNames += cityList["CityMap"][index][3]["Family"][i] + "<br>";
		  		}
		  		document.getElementById("familyList").innerHTML = "<span class=\"title\">Family: </span><br>" + familyNames;
		  	}
  			})(i));


  		google.maps.event.addListener(infowindows[i],'closeclick',(function(index){
  			return function(){
  				//myMarkers[index].setMap(null);
  				document.getElementById("coffeeList").innerHTML = "<span class=\"title\">Coffee: </span><br>";
  				document.getElementById("proList").innerHTML = "<span class=\"title\">Professional: </span><br>";
  				document.getElementById("friendList").innerHTML = "<span class=\"title\">Friends: </span><br>";
  				document.getElementById("hybridList").innerHTML = "<span class=\"title\">Hybrid: </span><br>";
  				document.getElementById("academicList").innerHTML = "<span class=\"title\">Academic: </span><br>";
  				document.getElementById("familyList").innerHTML = "<span class=\"title\">Family: </span><br>";
  				//console.log("Test on close event");
  				//map.setZoom(2);
		  		//map.setCenter(myCenter);
  			}
  		}) (i) );	
	}

	
	// Draw all lines
	for (var i = 0; i < myMarkers.length; i++){
		//myMarkers[i].setMap(map);
		
		var line = new google.maps.Polyline({
		  path:[ myMarkers[0].getPosition(), myMarkers[i].getPosition() ],
		  strokeColor:"#0064B4",
		  strokeOpacity:0.8,
		  strokeWeight:.8
		});
		
		line.setMap(map);
		lines.push(line);
		
	}
	//cityList["CityMap"][i][0]
	var cityNameList="";
	var iwLink;
	for (var i = 0; i < myMarkers.length; i++){
		console.log(myMarkers.length);
		iwLink=infowindows[i];
		cityNameList += 
					"<a href=\"#\" onclick=\"openWin.close();"
										+"setOpenWin(getIW("+i+"));"
										+"openWin.open(map, myMarkers["+i+"]);"
										+"map.setZoom(5);"
										+"map.setCenter(myMarkers["+i+"].getPosition());"
										+"google.maps.event.trigger(myMarkers["+i+"], \'click\')\">" 
					+ myMarkers[i].getTitle() + "</a><br>";

	}
	document.getElementById("cities").innerHTML = cityNameList;

	//Styling rules for map. 
	// var styles = [
	//   {
	//     stylers: [
	//       // {hue: '#020201'},
 //          {visibility: 'simplified'},
 //          // {gamma: 0.5},
 //          // {weight: 0.5}
	//     ]
	//   },{
	//     featureType: "road",
	//     elementType: "geometry",
	//     stylers: [
	//       { lightness: 75 },
	//       { visibility: "simplified" }
	//     ]
	//   },{
	//     featureType: "road",
	//     elementType: "labels",
	//     stylers: [
	//       { visibility: "off" }
	//     ]
	//   },{
	//   featureType: "water",
 //   		 stylers: [
 //        { gamma: 0.38 }
 //    ]
	// }];
	// // Set styling rules
	// map.setOptions({styles: styles});
	//myMarkers[0].setZIndex(google.maps.Marker.MAX_ZINDEX+1); 

}

// Initialize map on load. 
google.maps.event.addDomListener(window, 'load', initialize);


