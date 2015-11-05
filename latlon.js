
	
	function allNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			lines[i].setVisible(true);
			lines[i].setOptions({strokeWeight:0.8});
			myMarkers[i].setVisible(true);
		}
	}
	function coffeeNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			if (cityList["CityMap"][i][3]["Coffee"].length < 1){
				lines[i].setVisible(false);
				myMarkers[i].setVisible(false);
			} else {
				lines[i].setVisible(true);
				lines[i].setOptions({strokeWeight:1.5});
				myMarkers[i].setVisible(true);

			}
		}
	}
		function proNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			if (cityList["CityMap"][i][3]["Professional"].length < 1){
				lines[i].setVisible(false);
				myMarkers[i].setVisible(false);
			} else {
				lines[i].setVisible(true);
				lines[i].setOptions({strokeWeight:1.5});
				myMarkers[i].setVisible(true);
			}
		}
	}
		function hybridNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			if (cityList["CityMap"][i][3]["Hybrid"].length < 1){
				lines[i].setVisible(false);
				myMarkers[i].setVisible(false);
			} else {
				lines[i].setVisible(true);
				lines[i].setOptions({strokeWeight:1.5});
				myMarkers[i].setVisible(true);
			}
		}
	}
		function friendsNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			if (cityList["CityMap"][i][3]["Friends"].length < 1){
				lines[i].setVisible(false);
				myMarkers[i].setVisible(false);
			} else {
				lines[i].setVisible(true);
				lines[i].setOptions({strokeWeight:1.5});
				myMarkers[i].setVisible(true);
			}
		}
	}
		function academicNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			if (cityList["CityMap"][i][3]["Academic"].length < 1){
				lines[i].setVisible(false);
				myMarkers[i].setVisible(false);
			} else {
				lines[i].setVisible(true);
				lines[i].setOptions({strokeWeight:1.5});
				myMarkers[i].setVisible(true);
			}
		}
	}
		function familyNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			if (cityList["CityMap"][i][3]["Family"].length < 1){
				lines[i].setVisible(false);
				myMarkers[i].setVisible(false);
			} else {
				lines[i].setVisible(true);
				lines[i].setOptions({strokeWeight:1.5});
				myMarkers[i].setVisible(true);
			}
		}
	}



	function setOpenWin(iw){
		openWin = iw;
	}

	function getIW(index){
		return infowindows[index];
	}

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
	var zoomLevel=2;

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
	
	
	// myMarkers[0].setIcon(
	// 	{
	// 		url:"home.png",
	// 		origin: new google.maps.Point(0,0),
	// 		anchor:new google.maps.Point(16,16),
	// 		scaledSize:new google.maps.Size(32, 32), 
	// 		zIndex:1

	// 	}
	// );
	
	var totalStates = "<br><a href=\"#\" onclick=\"map.setZoom(2);map.setCenter(new google.maps.LatLng(40,-90))\">Total Cities in Network: " + cityList["CityMap"].length + "</a>";
	totalStates += "<br><button id=\"totb\" onClick=\"allNet(cityList, lines, myMarkers)\">Total: " + totalNetwork+ "</button>";
	totalStates += " <button id=\"cofb\" onClick=\"coffeeNet(cityList, lines, myMarkers)\">Coffee: " + totalCoffee + "</button>"; 
	totalStates += " <button id=\"prob\" onClick=\"proNet(cityList, lines, myMarkers)\">Professional: " + totalPro+ "</button>";
	totalStates += " <button id=\"frib\" onClick=\"friendsNet(cityList, lines, myMarkers)\">Friends: " + totalFriends+ "</button>";
	totalStates += " <br><button id=\"hybb\" onClick=\"hybridNet(cityList, lines, myMarkers)\">Hybrid: " + totalHybrid+ "</button>";
	totalStates += " <button id=\"acab\" onClick=\"academicNet(cityList, lines, myMarkers)\">Academic: " + totalAcademic+ "</button>";
	totalStates += " <button id=\"famb\" onClick=\"familyNet(cityList, lines, myMarkers)\">Family: " + totalFamily+ "</button>"; 
	
	document.getElementById("infoPane").innerHTML += totalStates;


	var myCenter =new google.maps.LatLng(40,-90) ;
	//Map properties
	var mapProp = {
	  center: myCenter,
	  zoom: zoomLevel,
	  mapTypeId: google.maps.MapTypeId.TERRAIN,
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
	var styles = [
	  {
	    stylers: [
	      // { hue: "#00ffe6" },
	      // { saturation: -20 }
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
	//myMarkers[0].setZIndex(google.maps.Marker.MAX_ZINDEX+1); 

}

// Initialize map on load. 
google.maps.event.addDomListener(window, 'load', initialize);


function populate(){

	return { "CityMap": [
	[ "Seattle, Washington", 47.60621,-122.332071, 
		{
			"Coffee":["Taylor Murphy", "Allison Hardy" , "Andrew Arguelles","Brian P Henley","Deejay Brower","Hannah Jones","Heather Siverson","Jonathan Angle","Katie Tague","Kelli A Taylor","Kelsey Batrack","Kennah Broweleit","Kim Berkley","Kylie Provost","Lizzie Humphries","Lizzie Rodrigue","Luke Elliott","Lyndsay Field Dyk","Madison Young","Maryclare Griffin","Matt Dalton","Mike J. Cannon","Sean Lieb","Stephen Brenden","Torin Bracey","Trent Siverson","Velton Ross","Vi Thai Nguyen"], 
			"Professional":["Jim Balazic","Pete Grondal","Jim Freeze"],
			"Hybrid":["Thierry Fortuner", "Ala Khan", "Alexandra Gunnoe", "Alexis Diana", "Amber Rose", "Andy Heye", "Anita Verna Crofts", "Ann Ho", "Anna Micheel", "Bob McHenry", "Brian Shook", "Bryan Frasier", "Caleb Buse", "Cameron Lacombe", "Carrie Hawthorne", "Casey Griffin", "Cassandra Schwartz ", "Cassie Wang", "Chad Bever", "Chloe Horning", "Chris Clark", "Chris Hawley", "Cody Heyn", "Cole Palen", "Dean Shimabukuro", "Elias Demisse", "Elizabeth Ziolkowski Berg", "Evan Kolius", "Hanson Hosein", "Hilary Lombard", "Ian Block", "Ian Newhall", "Jacob Christensen", "Jamie Rasmus", "Jared Sholk", "Jeff Samiljan", "Jennifer Burns", "Jennifer Buse", "Jihee Kim", "Jill Reddish", "Joe Hunich", "Joseph Pavey", "Jovana Teodorovic", "Katie Zacharkiw", "Kelly Merrill", "Ken Smith", "Kyle Richey", "Leigh Burmesch", "Lindsay Sieverkropp", "Logan Tegman", "Mark Guenther", "Michael Barela", "Michael Stein", "Naomi Thalenberg", "Nicholas Holman", "Paul Von Hagen", "Phil Melton", "Price Hall", "Raven Kelly Smith", "Renick Woods", "Ricky Poole", "Sam Larkin", "Scott Macklin", "Scott Morris", "Stephen Schroeder", "Steve Stansfeld", "Thomas Sergneri", "Tim Hurley", "Will Taylor Llapitan"],
			"Academic":["Bill Zumeta", "Aaron Katz"],
			"Friends":["Adina Ewing","Alex Herbig","Andrew Hernandez","Andrew Salituri","Arielle Corson","Aubree Wilson","Beth Milstid","Billie Jean Tague","Brandy Westmore","Christopher McCool","Corey Skurka","Craig Bruce","Danette Ver Woert","Debbie Bryant","Elizabeth Kennedy","Elizabeth Woods","Erin Suderman","Jen Okimoto","Jihee Kim","Joe Bryant","John Varela","Kate Howland","Kathleen Moser","Kathleen Murray","Kathy Block","Keely Bryant","Liz Marie","Luke Rasmus","Max Benas","Melissa Naylor","Micah Dodson","Michael Henreckson","Michael Villanueva","Mindy Byram","Nicole McFarland","Peter Cecil O'Higgins","Rachel Nicole Rae","Rachel Olson","Rajan Cheriel","Ryan Bailey","Ryan Fitts","Sarah Samson","Shane Kodad","Shelby Huff","Stephanos Prufrock"],
			"Family":["Jenny Lurene Lemley"] 
		} ],
	[ "Abilene, Texas", 32.448736,-99.733144, 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Anna Marie Van Fleet", "Kristen Harris Bridwell"],
			"Family":[] 
		} ],
	[ "Abernathy, Texas", 33.8322,-101.8431, 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Lisa McNabb"],
			"Family":[] 
		} ],
	[ "Albuquerque, New Mexico", 35.085334,-106.605553 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Eric Keith Boyd-Gerber", "Erin Moya"],
			"Family":[] 
		} ],

	[ "Albany, New York", 42.652579,-73.756232 ,
		{
			"Coffee":[], 
			"Professional":["Lena Carpenter"],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Dane Minnick"],
			"Family":[] 
		} ],

	[ "Amarillo, Texas", 35.221997,-101.831297 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Amber Merydith Biddler","Austin Allan Bagwell","Bekah Purl","Andrew Carrano","Ashley Forti","Bretta Kotara","Broc Carter","Colton Harada","Colton Wedeking","Corey D. Nathan","Dani Morton","Daniel Zewde","Lindsay Haworth Gomez","Lori Rozzell James","Luisa Mireles","Marcus Langford","Martin Barbosa","Matt West","Miguel A Benavides Jr.","Roger Wyrick","Ryan Hazelwood","Seph Stiles","Sheryl Proctor","Stacey Ovalle","Stephanie James","Tawni BÃ¼hler","Trav Ruiz","Travis Kotara","Trey Roach","Tyson Taylor","Vanessa Bendinskas","Wilson Lemieux"],
			"Academic":["Zivorad Filipovic"],
			"Friends":["Allison Hall Bromwell","Ashley Meadows Walker","Aundrea Banner","Bonnie Beckham","Brandon Beckham","Calvin Day","Chasta Pham","Chuck Waltrip","Curt Moore","Danielle Holden","Duncan Ventura","Edward Duarte","Emily Clark","Frankie Tabares Sanchez","Georgia Romig","Halei Story","Hope Lynn Chasco","Imelda Saavedra","Jeff Horne","Jonas Leon","Katie Lynn Eddins","Katie Perkins","Keltin R. Wiens","Koehler Wendt"],
			"Family":[] 
		} ],

	[ "Atlanta, Georgia", 33.748995,-84.387982 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Thomas Mahan"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Austin, Texas", 30.267153,-97.743061 ,
		{
			"Coffee":["Betsy Lackey","Matt Irving","Tamar Madrigal"], 
			"Professional":[],
			"Hybrid":["Bryan Au-Young","Emily Petersen","Logan Hooks","Ryan Todd Garza","Micah Vasquez","Tori Vasquez"],
			"Academic":[],
			"Friends":["Amie Beckett","Avery Beckett","Bonnie Moses","Britney Ware","Brittany Platt","Chris Denny","Katy Dodd","Keith Kohanek","Laura Oliver","Lauren Vasquez","Matt Vickery","Michael Fensterbush","Mike Dorsey","Pamela Noboa Cass","Peter Craig","Sean Troyer","Suzi Nelson"],
			"Family":[] 
		} ],

	[ "Arlington, Texas",32.735687,-97.108066
,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Jeff Bethke", "Owen Moheet"],
			"Family":[] 
		} ],

	[ "Bangkok, Thailand", 13.756331,100.501765 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Meena Tang"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Bedford, Texas", 32.8467,-97.1397 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Ashton Billard"],
			"Family":[] 
		} ],

	[ "Beijing, China", 39.904211,116.407395 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Cecilia Yatianzhuo Wang","Cynthia Cheng","Yuchen Xiao","Yunyun Chan"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],
	
	[ "Bellevue, Washington", 47.6000,-122.1667 ,
		{
			"Coffee":[], 
			"Professional":["Deborah Ritner","Nicole Bolling"],
			"Hybrid":["Cara D'Amato"],
			"Academic":[],
			"Friends":["Heather Johnson Heltzel"],
			"Family":[] 
		} ],
	
	[ "Bellingham, Washington", 48.74908,-122.478147 ,
		{
			"Coffee":["Thomas Tague"], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Berlin, Germany", 52.520007,13.404954 ,
		{
			"Coffee":[], 
			"Professional":["Bryan Cooke"],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Theresa Bohm"],
			"Family":[] 
		} ],

	[ "Bowling Green, Ohio", 41.374774,-83.651323 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Andrew Sowder"],
			"Family":[] 
		} ],

	[ "Brooklyn, New York", 40.678178,-73.944158 ,
		{
			"Coffee":["Holly Fujishige"], 
			"Professional":["Karali Pitzele"],
			"Hybrid":["Gabriel Lawrence"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Canyon, Texas", 34.980334,-101.918802 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Aaron Sams","Alexandria Gruhlkey","Amber Moore","Andrew Garay","Anna McVey","Anthony Smith","Blane Dickson","Brandy Lea Roberts","Callie Grice","Courtney Jessica Inman","Emma Marshall","Evan Grice","Honnah Taylor","Johnny Story","Josh Durham","Melissa Maldonado-Smith","Niki Brown","Randy Ray","Zach Barnes"],
			"Academic":["Emily Kinski","Butler Cain","Trudy Hanson","Kim Bruce"],
			"Friends":["Nikki Juarez"],
			"Family":[] 
		} ],

	[ "Chengdu, China", 30.572269,104.066541 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Yiyun Long"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Chiang Mai, Thailand", 18.787747,98.993128 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Sonia Nicholas"],
			"Family":[] 
		} ],

	[ "Chicago, Illinois", 41.878114,-87.629798 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Houston Howell", "Piero Taliente"],
			"Academic":[],
			"Friends":["Lacey Chester","MaryBeth Searls","Piero Taliente","Sandi Adamson"],
			"Family":[] 
		} ],

	[ "Cleveland, Ohio", 41.49932,-81.694361 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Garett Jones"],
			"Family":[] 
		} ],


	[ "Colorado Springs, Colorado", 38.833882,-104.821363 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Sydney Harris"],
			"Academic":[],
			"Friends":["Will Riner"],
			"Family":[] 
		} ],

	[ "Comfort, Texas", 29.967715,-98.905034 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Shannon Strauss"],
			"Family":[] 
		} ],

	[ "Dallas, Texas", 32.776664,-96.796988 ,
		{
			"Coffee":["Allison Moore","Dave Hill","Jordan Martin"], 
			"Professional":[],
			"Hybrid":["Amber Clodfelter","Chelsea Riddle","Crystal Sanders","Erin Hartigan","Hilery Harris- Hill","Krystina Martinez","Lance Caden Conaway","Matty Harmel","Teresa Dunn","Troy Reich"],
			"Academic":[],
			"Friends":["Abe Kotara","Chad Wilborn","Chandra Brock","Ashley Gill","Elyse Tucker","Emily Anne Bennett McGee","Ethan Uranga","Kate Heyde","Kristen Gallegos","Lauren Milner","Quin Murphy","Rita Lambert","Robert Bitz","Trevor Reidy","Wes Murphy","Whitney Dometrius"],
			"Family":["Debra Gilcrease Shumate"] 
		} ],

	[ "Denver, Colorado", 39.739236,-104.990251 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Ben Willms"],
			"Family":[] 
		} ],

	[ "Dubai, UAE", 25.204849,55.270783 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Julie Ruiz"],
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
			"Friends":["Kelsey A. Kemp"],
			"Family":[] 
		} ],

	[ "Edmonton, Alberta", 53.544389,-113.490927 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Jeana Marie Ridley"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Ellensburg, Washington", 46.996514,-120.547847 ,
		{
			"Coffee":["Tim Dyk"], 
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
			"Family":["Paula Gilcrease Cassidy"] 
		} ],

	[ "Fort Lauderdale, Florida", 26.122439,-80.137317 ,
		{
			"Coffee":["David Anderson"], 
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
			"Family":["Leslie Wilson", "Rose Marie Gross"] 
		} ],

	[ "Fort Worth, Texas", 32.755488,-97.330766 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Jessica Haggerty", "Kate Hearne"],
			"Family":[] 
		} ],

	[ "Fresno, California", 36.746842,-119.772587 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Joan Lee"],
			"Family":[] 
		} ],

	[ "Georgetown, Texas", 30.633262,-97.677984 ,
		{
			"Coffee":["Kirby Smith"], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Accra, Ghana",5.603717,-0.186964,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":["Enyonam Millicent"],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Grapeland, Texas", 31.491845,-95.478561 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Jacob Cameron Wyers"],
			"Family":[] 
		} ],

	[ "Grapevine, Texas", 32.934292,-97.078065 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Stephanie Hazel"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Greeley, Colorado", 40.423314,-104.709132 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Kory Zulauf"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Gro&#223;bettlingen, Germany", 48.591771,9.310414 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Yvette Pfeiffer"],
			"Family":[] 
		} ],

	[ "Guam", 13.444304,144.793731 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Josias Hernandez","Royce Guerra"],
			"Academic":[],
			"Friends":["John Halloran","Elmer Dulla","Krysten Carlson","Lawrence Cruz","Rafael Baza"],
			"Family":[] 
		} ],

	[ "Hamburg, Germany", 53.551085,9.993682 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Filip Egert", "Hannes Detjen"],
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
			"Friends":["Jamelyn French"],
			"Family":[] 
		} ],

	[ "Honolulu, Hawaii", 21.306944,-157.858333 ,
		{
			"Coffee":[], 
			"Professional":["Matt McMillan"],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Houston, Texas", 29.760427,-95.369803 ,
		{
			"Coffee":["Christy Troutman","Joseph Peters","Matt Salazar"], 
			"Professional":[],
			"Hybrid":["Jessica Perkins"],
			"Academic":[],
			"Friends":["Christine Nicole","Margaret Whitehead","Mary Burroughs","Mia Christina","Preston Mitchener","Tony De Litta","Travis Kelley"],
			"Family":[] 
		} ],

	[ "Jeddah, Saudi Arabia", 21.285407,39.237551 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Albaraa Albairuti"],
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
			"Friends":["Randall Box"],
			"Family":[] 
		} ],

	[ "Kansas City, Kansas", 39.114053,-94.627464 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Jacob Thomas", "Jeny McCray"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Kansas City, Missouri", 39.099727,-94.578567 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Dae Smith"],
			"Academic":[],
			"Friends":["Josh Kelso"],
			"Family":[] 
		} ],
	["Kent, Washington",47.380934,-122.234843,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Dave Anderson","Peter Ellis"],
			"Family":[] 
		} ],

	[ "Kerrville, Texas", 30.047433,-99.140319 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Steven Blakeley"],
			"Family":[] 
		} ],

	[ "Las Vegas, NV", 36.169941,-115.13983 ,
		{
			"Coffee":["Cole McBride"], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Los Angeles, California", 34.052234,-118.243685 ,
		{
			"Coffee":["Akaash Saini","Alissa Beyer","Nathanael Long","Wade Burden","Skylar Grant Stevens"], 
			"Professional":["Mike Masters"],
			"Hybrid":["Christine Upton","Jordan Upton","Erik LeDrew","Ryan Leedy","Tyler Sweeney"],
			"Academic":[],
			"Friends":["Cassy A. Rivera","Joey Ryan","Yazeed Hiyari","Zachary Binks"],
			"Family":[] 
		} ],

	[ "Levelland, Texas", 33.587316,-102.37796 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Tammy Amos"],
			"Academic":["Bethany Borba","Brent Wheeler","Cary C Banks","Chris Neal","Dolf Guardiola","Ed Marsh","Greg Cook","John Reid ","Wade Prescott McNutt"],
			"Friends":["Adrianne Bush","Anna Marie Waldrip","Brittany Payton","Zach James","Ziyad Alomari"],
			"Family":[] 
		} ],

	[ "Lubbock, Texas", 33.577863,-101.855166 ,
		{
			"Coffee":["Alexander Hawkins Isett","Amanda Stewart","Caleb Jude Green","Corbin Biehler","Daniel Moss","Hannah Gill","Jessica Akin","Jiminey Fallin","John Mark Rogers","Katie Howell","Mattie Mae Sims","Nick Isett","Nicole Gutierrez","Victoria Isett"], 
			"Professional":[],
			"Hybrid":["Aaron Thomas","Chris Jenkins","Isaac Bermea","J'Rhea Carrillo","Jennifer Fraley-Nowacek","Judy Carpenter Howell","Julia Erin","Justin Lentz","Justin Thomas Williams","Kenna Pruitt","Lane Formby","Mike Nghiem","Steven Pilger","Taylor Harrell","Thomas Boyd","Wes Condray"],
			"Academic":["Suzanne Fortenberry Hamilton"],
			"Friends":["Allie Leigh","Amy Renee Gates","Andrew Searcy","Andrew West","Ann Cox","Anthony AP Perez","Anthony Mann","Armand Neri","Ashlee Paetzold Jolly","Ashley Brooke Webb","Ashley Martin","Ashtunn Akin","Barrett Pierce","Becky Straut Collier","Ben Laycock","Beth Krissa","Bobby Martinez","Brad Ruiz","Brady Collier","Brady Stoker","Brandon Tate","Brett Womble","Brian Chandler","Brian Drake","Brian Wilkins","Brianna Brewer","Britney Rice Limon","Brittany Brock","Brittney Bixler Stoker","Allie Timms","Amanda Fowler Griffith","Callie Mayes","Casey Lampert","Cassie Pene-Mogg","Celso Garcia","Cherenda Dobitz","Chip Darden","Chris Galanos","Chris Key","Chris Pettyjohn","Chrystal Gist","Clay Cristy","Cody Kimbrough","Colby McClellan","Courtney Brooks","D.j. Perez","Dacey Dunlap Carson","Danae Purtell","Daniel Gutierrez","Dawn Conwright","Devanie Cantrell","Dustin Perez","Dustin Petkau","Ellen Hood","Emily Green Brannon","Emily Joy Booker","Erin Dipprey","Erin Smith","Gabe Orta","Gabe Palacios","Gabriel Garcia","Gail Shooter","Gary Chandler","Gary Gates","Heath Stone","Henry Castillo","Humberto Del Valle","Jackie Eckman","Jade Booher","Jade Cooper Lagoski","Jake Warren","Jeff Koerner","Jenna Johnson","Jeremy Driscoll","Jeremy Graves","Jonathan Beck","Jordan Simmons","Jose Del Valle","Josef Blake","Katie Smith Trevino","Keith Gist","Kalen Dozier","Kallan Sanders","Kameron Rogers","Kassie McNelly","Kathleen Nations","Katie Smith Trevino","Keith Gist","Kevin Hardegree","Klarissa Mariscal","Kolbe Cotter","Kory Peterson","Krystal Kohanek Moyers","Kylen Karr McFarlin","Kyndra Smith","Lacy Prock","Laura Trent Taylor","Lisa Boden","Luke Howell","Lupe Flores","Lyndsi Dudley","Maegan Guthrie-Romero","Marcie Beeck Wilkins","Marcus Lowry","Mark Nix","Matt Patridge","Matthew Rider","Mikaela Forkner","Mikah Wisian","Milagros Gaytan","Mindy Aguilar","Mitchell Rambo","Morgan Worth","Natalie Thomas","Nathan Kaufman","Rachel R-Cat Porter","Rebecca Treadwell","Roland Adams","Ryan Pearson","Sara Hunter","Sara McNallen","Sarah Barbre Harper","Sawyer Howell","Sean Canaday","Sean Rude","Shelbi Bonds","Skylar Johnson","Spencer Gill","Stephanie Lambert","Stephanie Saldivar","Stephen Elliott","Stepheni Jayne","Steven Lunsford","Swade Moyers","Tamara Haney","Tanner Cruce","Taylor Freeman","Taylor Stoker","Taylor Wolf","Tiffany Padilla","Tim Fuentes","Timothy Fabrizzio Osaghae","Tony Harper","Trevor James","Wes Graves","Whitney Martin-Rister"],
			"Family":["Melissa Gross","Shay Word","Venita Gross"] 
		} ],


	[ "Luxembourg City, Luxembourg", 49.611621,6.131935 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Monica Trantow"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Marlborough, Massachusetts", 42.345927,-71.552287 ,
		{
			"Coffee":["Will Walkup"], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Mercer Island, Washington",47.570655,-122.222067,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Evan Kolius"],
			"Academic":[],
			"Friends":["Danielle Johnson", "Lucy Turner"],
			"Family":[] 
		} ],

	[ "Mendecino, California", 39.307674,-123.799459 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Jesse DeLuca"],
			"Family":[] 
		} ],

	[ "Miami, Florida", 25.76168,-80.19179 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["JosÃ© MontaÃ±ez"],
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
			"Friends":["Chelsea Brianne Petty","Hayley Barber","Jordan Goodsell","Kendall Thomas","Michael Barber","Tizoc Strong"],
			"Family":[] 
		} ],

	[ "Midlothian, Texas", 32.482361,-96.994449, 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Natalie Holleman"],
			"Family":[] 
		} ],

	[ "Minneapolis, Minnesota", 44.977753,-93.265011 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Christopher Shaffer", "Clarissa Shaffer"],
			"Family":[] 
		} ],

	[ "Morgantown, West Virginia", 39.629526,-79.955897 ,
		{
			"Coffee":["Jeth Walkup"], 
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
			"Hybrid":["Katerina Sinitskaya"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Nanjing, China", 32.060255,118.796877 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Jianchun Lexie Chen"],
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
			"Friends":["Mark Kubena", "Tyler Dozier"],
			"Family":[] 
		} ],

	[ "New Deal, Texas", 33.737305,-101.836559 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Sara Jones"],
			"Family":[] 
		} ],

	[ "New York City, New York", 40.712784,-74.005941 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Bart Williams"],
			"Academic":[],
			"Friends":["Meg Rose"],
			"Family":[] 
		} ],

	[ "Oklahoma City, Oklahoma", 35.46756,-97.516428 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Adam Snider", "Viri Diaz"],
			"Academic":[],
			"Friends":["Jadiah Jene Joi Riley"],
			"Family":[] 
		} ],

	[ "Olympia, Washington", 47.037874,-122.900695 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Taylor Briaun Meyer"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Omaha, Nebraska", 41.252363,-95.997988 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Hayden Ray"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Paducah, Kentucky", 37.083389,-88.600048, 
		{
			"Coffee":["Thomas Charles Paessler"], 
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
			"Family":["Kathryn Alexandra"] 
		} ],

	[ "Pelham, New York", 40.899648,-73.803675 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Sam Wiley"],
			"Family":[] 
		} ],

	[ "Plano, Texas", 33.019843,-96.698886 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Becky Ortega","Dalton Ortega","Holly Golvach"],
			"Family":[] 
		} ],

	[ "Tyler, Texas", 32.35126,-95.301062 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Caleb Milligan"],
			"Family":[] 
		} ],

	[ "Portland, OR", 45.523062,-122.676482 ,
		{
			"Coffee":["Kirstin Soto", "Robbie Krask"], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Jesse Dearing", "Katie Dearing"],
			"Family":[] 
		} ],

	[ "Porto Alegre, Brazil", -30.034647,-51.217658 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Thiago Biesdorf Teixeira"],
			"Family":[] 
		} ],

	[ "Qingdao, Shandong", 36.067117,120.382612 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Summer Tong Sun"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Quito, Ecuador", -0.180653,-78.467838 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["MarÃ­a Dolores Molina"],
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
			"Friends":["Rochelle Jones"],
			"Family":[] 
		} ],

	[ "Redmond, Washington", 47.673988,-122.121512 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Aimery Fortuner"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Issaquah, Washington", 47.530101,-122.032619 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Cody Heyn"],
			"Academic":[],
			"Friends":["Taryn Graham"],
			"Family":[] 
		} ],

	[ "Renton, Washington", 47.482878,-122.217066 ,
		{
			"Coffee":["Mike Moskowitz"], 
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
			"Friends":["Tara Chester"],
			"Family":[] 
		} ],

	[ "San Antonio, Texas", 29.424122,-98.493628 ,
		{
			"Coffee":["Erik Beruvides"], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Chris York", "Colin Harris", "Shannan Sowder Pfeifer"],
			"Family":[] 
		} ],

	[ "San Diego, California", 32.715738,-117.161084 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Ashley Myrriah"],
			"Academic":[],
			"Friends":["Loweri Williams"],
			"Family":[] 
		} ],

	[ "San Francisco, California", 37.77493,-122.419416 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Ethan Terry", "Matthew Homyak"],
			"Academic":[],
			"Friends":["Alyssa Monath","Amy M Walsh","Bryan Darling","Jenny Beck","Nnena Ukuku"],
			"Family":["Matthew Gross"] 
		} ],

	[ "San Marcos, TX", 29.883275,-97.941394 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Leah Hatcher"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Salvador, El Salvador", 13.69294,-89.218191 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["J Alberto Martinez-Interiano"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "San Sebastian, Spain", 43.318334,-1.981231 ,
		{
			"Coffee":["Landon Cotham"], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Santa Barbara, California", 34.420831,-119.69819 ,
		{
			"Coffee":[], 
			"Professional":["Clif Magness"],
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
			"Friends":["Yngrid Abudinen"],
			"Family":[] 
		} ],

	[ "Scottsdale, Arizona", 33.49417,-111.926052 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Ashley Bergeron"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Shallowater, Texas", 33.688973,-101.998227 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Junior Vasquez","Katrina Litsch Ballentine","Matthew Ballentine","Mickie Vasquez","Tammy Tobola Roberts","Trestia Moore Elliott"],
			"Academic":[],
			"Friends":["Adrian Martinez","Angela Miller","Antonio Garza","Ash Castilleja","Ashley Martinez","Ashley Siegel","Beth Elmore","Bethany Browne","Chase Stewart","Cody Pack","Dehdra Draper","Dustin Kimbrell","Edna Lopez","Eric VonBerg","Jacob Bewley","Jerrod Carr","Jesse Hill","Joey Trevino","John Paul Trocchio","Josh Winters","Julie Haralson Jones","Kelly Halpain","Kory Ware","Kristi Jones","Kristina McCravey","Kyle Carroll","Lace Cristan-Beckum","Laura Ellis Campbell","Megan Blair","Melissa Beaty Johnson","Miguel Cardenas","Nathan Riojas","Nicole Dudley","Nicole Hargrove","Samantha Bethune","Shannon Mink","Shawn Pebsworth","Whitney Ward"],
			"Family":[] 
		} ],

	[ "Shanghai, China", 31.230416,121.473701 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Jiajia Wang", "Jun Fan"],
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
			"Family":["Fernella Graves Gilcrease"] 
		} ],

	[ "Slaton, Texas", 33.437311,-101.643491 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":["Brent Whiteaker"] 
		} ],

	[ "St. Louis, Missouri", 38.627003,-90.199404 ,
		{
			"Coffee":["T.j. Macke"], 
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
			"Friends":["Jay Messamore"],
			"Family":["Sue Whiteaker", "Sherry Whiteaker"] 
		} ],

	[ "Taipei, Taiwan", 25.032969,121.565418 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Oscar Huang"],
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
			"Family":["Justin Whiteaker"] 
		} ],

	[ "Victoria, British Columbia", 48.428421,-123.365644 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Darren Szpak", "Stephanie Pound"],
			"Family":[] 
		} ],

	[ "Waco, Texas", 31.549333,-97.14667 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Brittany Bagwell"],
			"Family":[] 
		} ],

	[ "Wake Forest, North Carolina", 35.979873,-78.509723 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":[],
			"Family":["Leslie Graves Nunnery"] 
		} ],

	[ "Washington, D.C.", 38.907192,-77.036871 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Ciro Peredo", "Ryan Janssen"],
			"Family":[] 
		} ],

	[ "White Deer, Texas", 35.435324,-101.172935 , 
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Thomas Kotara"],
			"Family":[] 
		} ],

	[ "Wichita Falls, Texas", 33.913709,-98.493387 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Corey Zotz", "Kimbra Kell Thomas"],
			"Family":[] 
		} ],

	[ "Wichita, Kansas", 37.687176,-97.330053 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Kendra Brown", "Stephanie Jaime"],
			"Family":[] 
		} ],

	[ "Wroclaw, Poland", 51.107885,17.038538 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":[],
			"Academic":[],
			"Friends":["Jacek Jonca-Jasinski"],
			"Family":[] 
		} ],

	[ "Yoder, Wyoming", 41.916912,-104.295788 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Jason Senteney"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Zhangzhou, China", 24.512949,117.647481 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Jing Cai"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ],

	[ "Zhuzhou, China", 27.82755,113.134003 ,
		{
			"Coffee":[], 
			"Professional":[],
			"Hybrid":["Yixuan Long"],
			"Academic":[],
			"Friends":[],
			"Family":[] 
		} ]

	]}

}