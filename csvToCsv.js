	var categoryId = [1, 3, 4, 5, 6, 7, 8, 9, 10,11, 18, 21, 22];

	class client {
		constructor(clientInfo){
			this.clientData = clientInfo + "<br>";
		}

		formatClientInfo(){
			let clientDataAsArray = this.clientData.split(",");
			let formatedClientData = "";
				for(let i = 0 ; i < categoryId.length; i++){
					let currentId = categoryId[i];
					for(let x=0; x < clientDataAsArray.length; x++){
						if(currentId == x){
							formatedClientData += clientDataAsArray[x] + ",";
						}
					}
				}

			return formatedClientData + "<br>";
	}
	}

	function onDOMLoaded(event){
		var csvAsText;
		var startingClientInCSV = 1;
		var formatedClientList;

	//pulls from file stores in csvAsText
		function createText(){
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function(){
				csvAsText = xhttp.responseText;
			}
				xhttp.open("GET", "Clients.csv", false);
				xhttp.send();
		}

		createText();

	//Splits each csv row and puts them as elements in the csvLinesAsArray
		var csvLinesAsArray = csvAsText.split("\n");

	//unformatedClientList
		var unformatedClientList = [];

	//Puts unformated clients into the unformatedClientList
		for(let i = startingClientInCSV ; i < csvLinesAsArray.length; i++){
			unformatedClientList[i-1] = new client(csvLinesAsArray[i]);
		}
	//Formated ClientList
		var formatedClientList =[];
		var finalCsvData="";
		for(let i = 0; i < unformatedClientList.length; i++ ){
			formatedClientList.push(unformatedClientList[i].formatClientInfo())
		}
	//formated CategoryList Placed into ready Data
	var formatedCsvCategories = new client(csvLinesAsArray[0]);
	finalCsvData += formatedCsvCategories.formatClientInfo()
	//Formated csv Client Data ready for File
		for(let i=0; i <formatedClientList.length; i++){
			finalCsvData  += formatedClientList[i];
		}

		document.getElementById("main").innerHTML = finalCsvData;
	}

	document.addEventListener("DOMContentLoaded", onDOMLoaded);
