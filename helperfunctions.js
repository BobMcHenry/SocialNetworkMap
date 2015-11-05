
	
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