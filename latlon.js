
//Init function
function initialize() {
	var myMarkers = [];
	var cityList = populate();
	var infowindows = [];
	var openWin;
	var lines=[];

	var totalCoffee=0;
	var totalPro=0;
	var totalFriends=0;
	var totalHybrid=0;
	var totalAcademic=0;
	var totalFamily=0;

	for (var i = 0; i < cityList["CityMap"].length; i++){
		totalCoffee   += cityList["CityMap"][i][3]["Coffee"].length;
		totalPro      += cityList["CityMap"][i][3]["Professional"].length;
		totalFriends  += cityList["CityMap"][i][3]["Friends"].length;
		totalHybrid   += cityList["CityMap"][i][3]["Hybrid"].length;
		totalAcademic += cityList["CityMap"][i][3]["Academic"].length;
		totalFamily   += cityList["CityMap"][i][3]["Family"].length;
	}
	var totalNetwork = totalCoffee + totalPro + totalFriends + totalHybrid + totalAcademic + totalFamily;
	console.log(totalNetwork);

	for (var i = 0; i < cityList["CityMap"].length; i++ )
	{
		//console.log(cityList["CityMap"][i][1],cityList["CityMap"][i][2]);
		//myMarkers.push(new google.maps.LatLng(cityList["CityMap"][i][1],cityList["CityMap"][i][2]));
		myMarkers.push(
		  new google.maps.Marker(
		  	{
		  		position:new google.maps.LatLng(cityList["CityMap"][i][1],cityList["CityMap"][i][2]),
		  		icon: 
		  			{
		  				url:"icon.png",
		  				anchor:new google.maps.Point(6,6)
		  			},
		  		title:cityList["CityMap"][i][0]
		  	}
		  )
		);
	}	
	
	var totalStates = "<br>Total Cities in Network: " + cityList["CityMap"].length;
	totalStates += "<br>Total Size of All Networks: " + totalNetwork;
	totalStates += "<br>Coffee: " + totalCoffee + "  Professional: " + totalPro;
	totalStates += "  Friends: " + totalFriends + "  Hybrid: " + totalHybrid;
	totalStates += "  Academic: " + totalAcademic + "  Family: " + totalFamily; 
	document.getElementById("infoPane").innerHTML = totalStates;


	var myCenter = new google.maps.LatLng(41.850033, -87.6500523);
	//Map properties
	var mapProp = {
	  center:myCenter,
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	// Build map in DOM
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	
	//event listener setup
	for (var i=0; i < myMarkers.length; i++){
		myMarkers[i].setMap(map); 

		var iw = new google.maps.InfoWindow(	
		  			{ /* content:"<div>"+myMarkers[i].getTitle()+"</div>"*/ } );
		infowindows.push(iw);


		google.maps.event.addListener(myMarkers[i], 'click', (function(index) {
			console.log("Test before IIFE");
			return function(){
				console.log("Test after IIFE");
		  		
		  		if (openWin != null){
		  			openWin.close();
		  		}

		  		var localTotal = cityList["CityMap"][index][3]["Coffee"].length
		  		+ cityList["CityMap"][index][3]["Professional"].length
		  		+ cityList["CityMap"][index][3]["Friends"].length
		  		+ cityList["CityMap"][index][3]["Hybrid"].length
		  		+ cityList["CityMap"][index][3]["Academic"].length
		  		+ cityList["CityMap"][index][3]["Family"].length;

				var infoText="Network in " + myMarkers[index].getTitle() + ": "+ localTotal;
				infoText += "<br>Coffee: " + cityList["CityMap"][index][3]["Coffee"].length;
			  	infoText += "  Professional: " + cityList["CityMap"][index][3]["Professional"].length;
				infoText += "  Friends: " + cityList["CityMap"][index][3]["Friends"].length; 
				infoText += "  Hybrid: " + cityList["CityMap"][index][3]["Hybrid"].length;
				infoText += "  Academic: " + cityList["CityMap"][index][3]["Academic"].length;
				infoText += "  Family: " + cityList["CityMap"][index][3]["Family"].length;

				infowindows[index].setContent(infoText);
		  		infowindows[index].open(map, myMarkers[index]);

				openWin = infowindows[index];		  		
		  		document.getElementById("infoPane").innerHTML = totalStates + "<br><br>"+ infoText;

		  		map.setZoom(5);
		  		map.setCenter(myMarkers[index].getPosition());

		  	}
  			})(i));


  		google.maps.event.addListener(infowindows[i],'closeclick',(function(index){
  			return function(){
  				//myMarkers[index].setMap(null);
  				document.getElementById("infoPane").innerHTML = totalStates;
  				//console.log("Test on close event");
  				map.setZoom(4);
		  		map.setCenter(myMarkers[0].getPosition());
  			}
  		}) (i) );	
	}

	
	for (var i = 0; i < myMarkers.length; i++){
		//myMarkers[i].setMap(map);
		
		var line = new google.maps.Polyline({
		  path:[ myMarkers[0].getPosition(), myMarkers[i].getPosition() ],
		  strokeColor:"#0000FF",
		  strokeOpacity:0.8,
		  strokeWeight:.5
		});
		
		line.setMap(map);
		lines.push(line);
		
	}

	//Styling rules for map. 
	var styles = [
	  {
	    stylers: [
	      //{ hue: "#00ffe6" },
	      //{ saturation: -20 }
	    ]
	  },{
	    featureType: "road",
	    elementType: "geometry",
	    stylers: [
	      { lightness: 100 },
	      { visibility: "simplified" }
	    ]
	  },{
	    featureType: "road",
	    elementType: "labels",
	    stylers: [
	      { visibility: "off" }
	    ]
	  }
	];
	// Set styling rules
	map.setOptions({styles: styles});

}

// Initialize map on load. 
google.maps.event.addDomListener(window, 'load', initialize);


function populate(){

	return { "CityMap": [
	[ "Seattle, Washington", 47.60621,-122.332071, 
		{
			"Coffee":["Test", "", "", ""], 
			"Professional":[""],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],
	[ "Abilene, Texas", 32.448736,-99.733144, 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],
	[ "Abernathy, Texas", 33.8322,-101.8431, 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],
	[ "Abuquerque, New Mexico", 35.085334,-106.605553 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Albany, New York", 42.652579,-73.756232 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Amarillo, Texas", 35.221997,-101.831297 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Atlanta, Georgia", 33.748995,-84.387982 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Austin, Texas", 30.267153,-97.743061 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Avon, Colorado", 39.633067,-106.52222 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Bangkok, Thailand", 13.756331,100.501765 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Beijing, China", 39.904211,116.407395 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Bellingham, Washington", 48.74908,-122.478147 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Berlin, Germany", 52.520007,13.404954 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Bowling Green, Ohio", 41.374774,-83.651323 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Brooklyn, New York", 40.678178,-73.944158 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Canyon, Texas", 34.980334,-101.918802 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Chengdu, China", 30.572269,104.066541 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "chiang mai, thailand", 18.787747,98.993128 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Chicago, Illinois", 41.878114,-87.629798 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Cleveland, Ohio", 41.49932,-81.694361 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "College Station, Texas", 30.627977,-96.334407 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Colorado Springs, Colorado", 38.833882,-104.821363 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Comfort, Texas", 29.967715,-98.905034 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Dallas, Texas", 32.776664,-96.796988 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Denton, Texas", 33.214841,-97.133068 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Denver, Colorado", 39.739236,-104.990251 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Dubai, UAE", 25.204849,55.270783 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Durham, North Carolina", 35.994033,-78.898619 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Edmonton, Alberta", 53.544389,-113.490927 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Ellensburg, Washington", 46.996514,-120.547847 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Euless, TX", 32.837073,-97.081954 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Fort Lauderdale, Florida", 26.122439,-80.137317 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Fort Walton Beach, Florida", 30.420071,-86.617031 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Fort Worth, Texas", 32.755488,-97.330766 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Fresno, California", 36.746842,-119.772587 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Georgetown, Texas", 30.633262,-97.677984 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Ghana, Africa", 7.946527,-1.023194 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Grapeland, Texas", 31.491845,-95.478561 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Grapevine, Texas", 32.934292,-97.078065 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Greeley, Colorado", 40.423314,-104.709132 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Großbettlingen, Germany", 48.591771,9.310414 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Guam", 13.444304,144.793731 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Hamburg, Germany", 53.551085,9.993682 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Ho Chi Minh City, Vietnam", 10.823099,106.629664 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Honolulu, Hawaii", 21.306944,-157.858333 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Houston, Texas", 29.760427,-95.369803 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Jeddah, Saudi Arabia", 21.285407,39.237551 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Justin, Texas", 33.084844,-97.296129 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Kansas City, Kansas", 39.114053,-94.627464 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Kansas City, Missouri", 39.099727,-94.578567 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Kerrville, Texas", 30.047433,-99.140319 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Las Vegas, NV", 36.169941,-115.13983 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Levelland, Texas", 33.587316,-102.37796 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Los Angeles, California", 34.052234,-118.243685 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Lubbock, Texas", 33.577863,-101.855166 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],


	[ "Luxembourg, Luxembourg", 49.611621,6.131935 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Marlborough, Massachusetts", 42.345927,-71.552287 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Mendecino, California", 39.307674,-123.799459 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Miami, Florida", 25.76168,-80.19179 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["José Montañez"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Midland, Texas", 31.997346,-102.077915 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Midlothian, Texas", 32.482361,-96.994449, 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Minneapolis, Minnesota", 44.977753,-93.265011 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Morgantown, West Virginia", 39.629526,-79.955897 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Moscow, Russia", 55.755826,37.6173 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Nanjing, China", 32.060255,118.796877 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "New Braunfels, Texas", 29.703002,-98.124453 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "New York City, New York", 40.712784,-74.005941 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Oklahoma City, Oklahoma", 35.46756,-97.516428 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Olympia, Washington", 47.037874,-122.900695 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Omaha, Nebraska", 41.252363,-95.997988 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Paducah, Kentucky", 37.083389,-88.600048, 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Panama City, Florida", 30.158813,-85.660206 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Pelham, New York", 40.899648,-73.803675 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Portland, OR", 45.523062,-122.676482 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "porto alegre, brazil", -30.034647,-51.217658 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Qingdao, Shandong", 36.067117,120.382612 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Quito, Ecuador", -0.180653,-78.467838 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Red Oak, Texas", 32.53321,-96.8153 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Redmond, Washington", 47.673988,-122.121512 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Rockwall, Texas", 32.931234,-96.459709 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Antonio, Texas", 29.424122,-98.493628 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Diego, California", 32.715738,-117.161084 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Francisco, California", 37.77493,-122.419416 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Marcos, TX", 29.883275,-97.941394 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Salvador, El Salvador", 13.69294,-89.218191 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Sebastian, Spain", 43.318334,-1.981231 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Santa Barbara, California", 34.420831,-119.69819 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Santa Cruz de la Sierra, Bolivia", -17.814582,-63.156085 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Scottsdale, Arizona", 33.49417,-111.926052 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Shallowater, Texas", 33.688973,-101.998227 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Shanghai, China", 31.230416,121.473701 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Spur, Texas", 33.476477,-100.855686 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Sudan, Texas", 34.067864,-102.524362 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Taipei, Taiwan", 25.032969,121.565418 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Tempe, Arizona", 33.42551,-111.940005 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Victoria, British Columbia", 48.428421,-123.365644 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Waco, Texas", 31.549333,-97.14667 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Wake Forest, North Carolina", 35.979873,-78.509723 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Washington, D.C.", 38.907192,-77.036871 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "White Deer, Texas", 35.435324,-101.172935 , 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Wichita Falls, Texas", 33.913709,-98.493387 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Wichita, Kansas", 37.687176,-97.330053 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Wroclaw, Poland", 51.107885,17.038538 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Yoder, Wyoming", 41.916912,-104.295788 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Zhangzhou, China", 24.512949,117.647481 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Zhuzhou, China", 27.82755,113.134003 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ]

	]}

}