	function getNetworkIcon(cl){
		var key = Object.keys(cl);

		console.log("1: " + cl.length);
		console.log("2: " + key[0]);
		var highest = 0;
		var highStr = "";
		for (var i = 0; i < key.length; i++){
			console.log("3: " + highest + " " + highStr);
			if (cl[key[i]].length > highest){
				highest = cl[key[i]].length; 
				highStr = key[i];
				console.log("4: " + highest + " " + highStr);
			}
		}

		console.log("*************returning " + highStr);
//["Coffee", "Professional", "Hybrid", "Academic", "Friends", "Family", "CommLead"]
		switch(highStr){
			case ""+key[0]:
				return "coffee.png";
				break;
			case key[1]:
				return "business.png";
				break;
			case key[2]:
				return "icon.png";
				break;
			case key[3]:
				return "academic.png";
				break;
			case key[4]:
				return "friends.png";
				break;
			case key[5]:
				return "family.png";
				break;
			case key[6]:
				return "commlead.svg";
				break;
		}
	}
	
	function allNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			lines[i].setVisible(true);
			lines[i].setOptions({strokeWeight:0.8});
			myMarkers[i].setVisible(true);
			myMarkers[i].setIcon(
			  			{
			  				url: getNetworkIcon(cityList["CityMap"][i][3]),
			  				scaledSize:new google.maps.Size(32, 32),
			  				anchor:new google.maps.Point(16,16),
			  				zIndex:5

			  			}
				);
			//url: getNetworkIcon(cityList["CityMap"][i][3])
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
				myMarkers[i].setIcon(
					{
						url:"coffee.png",
			  			scaledSize:new google.maps.Size(32, 32),
			  			anchor:new google.maps.Point(16,16),
			  			zIndex:5 
			  		}
				);

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
				myMarkers[i].setIcon(
					{
						url:"business.png",
			  			scaledSize:new google.maps.Size(32, 32),
			  			anchor:new google.maps.Point(16,16),
			  			zIndex:5 
			  		}
				);
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
				myMarkers[i].setIcon(
					{
						url:"icon.png",
			  			scaledSize:new google.maps.Size(32, 32),
			  			anchor:new google.maps.Point(16,16),
			  			zIndex:5 
			  		}
				);
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
				myMarkers[i].setIcon(
					{
						url:"friends.png",
			  			scaledSize:new google.maps.Size(32, 32),
			  			anchor:new google.maps.Point(16,16),
			  			zIndex:5 
			  		}
				);
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
				myMarkers[i].setIcon(
					{
						url:"academic.png",
			  			scaledSize:new google.maps.Size(32, 32),
			  			anchor:new google.maps.Point(16,16),
			  			zIndex:5 
			  		}
				);
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
				myMarkers[i].setIcon(
					{
						url:"family.png",
			  			scaledSize:new google.maps.Size(32, 32),
			  			anchor:new google.maps.Point(16,16),
			  			zIndex:5 
			  		}
				);
			}
		}
	}
		function commLeadNet(cityList, lines, myMarkers){
		for (var i = 0; i < myMarkers.length; i++){
			if (cityList["CityMap"][i][3]["CommLead"].length < 1){
				lines[i].setVisible(false);
				myMarkers[i].setVisible(false);
			} else {
				lines[i].setVisible(true);
				lines[i].setOptions({strokeWeight:1.5});
				myMarkers[i].setVisible(true);
				myMarkers[i].setIcon(
					{
						url:"commlead.svg",
			  			scaledSize:new google.maps.Size(48, 48),
			  			anchor:new google.maps.Point(24,24),
			  			zIndex:5 
			  		}
				);

			}
		}
	}




	function setOpenWin(iw){
		openWin = iw;
	}

	function getIW(index){
		return infowindows[index];
	}