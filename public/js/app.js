(function(){
	/**
	* Dom manipulation to select car owner
	*/
	var cards = document.querySelectorAll('.card');
	for(var i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', function(){
			// Enable confirm ride button
			var hasClass = document.querySelector('#confirm-ride').classList.contains("disabled");
			if(hasClass)
				document.querySelector('#confirm-ride').removeAttribute("disabled"); 
			document.querySelector('#confirm-ride').classList = 'btn btn-default btn-pool';
			
			//Remove previously selected classes
			for(var j = 0; j < cards.length; j++) {
				cards[j].style.background = "#fff";
				var rmActiveProfile = cards[j].childNodes[1];
				var rmSelectedProfile = cards[j].childNodes[3];
				rmActiveProfile.classList = 'profile-pic profile-active';
				rmSelectedProfile.classList += ' hide';

				console.log(cards[j], cards[j].childNodes[1]);

				var rmRemoveRating = cards[j].childNodes[7];
				var rmAddCall = cards[j].childNodes[9];
				rmRemoveRating.classList = 'profile-rating pull-right';
				rmAddCall.classList += ' hide';           
			}
			var activeProfile = this.childNodes[1];
			var selectedProfile = this.childNodes[3];
			this.style.background = "#92d7ff";
			activeProfile.classList.add('hide');
			selectedProfile.classList.remove('hide');

			var removeRating = this.childNodes[7];
			var addCall = this.childNodes[9];
			removeRating.classList.add('hide');
			addCall.classList.remove('hide');
		});
	}

	function getRequest(url) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		xhttp.send();
	}

	/**
	* Login related functions
	*/
	var errorMsgElement = document.getElementById("errorMsg");
	function loginUser() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		errorMsgElement.innerHTML = "";

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var userArray = JSON.parse(this.responseText);
				// console.log(this.responseText, userArray);
				if(userArray.length > 0) {
					window.location = "http://localhost:8080/locationSearch.html";
				} else {
					errorMsgElement.innerHTML = "Invalid username or password.";
				}
			}
		};
		xhttp.open("GET", "http://localhost:3000/users?username="+username+"&password="+password, true);
		xhttp.send();
	}
	var loginButton = document.getElementById("login-btn") ? document.getElementById("login-btn") : '';
	if(loginButton) {
		loginButton.addEventListener('click', function(event) {
			event.preventDefault();
			loginUser();
		}, false);
	}

	/**
	* Common post method 
	*/
	function postRequest(url, data) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this);
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader('Content-type', 'application/json');
		xhttp.send(data);
	}

	/**
	* Registration related functions starts
	*/
	function registerFormData() {
		var data = {
			"username": "",
			"email": "",
			"mobile": 0,
			"password": "",
			"carmodel": ""
		};

		// Get form data
		var fullname = document.getElementById("fullname");
		var email = document.getElementById("email");
		var mobile = document.getElementById("mobile");
		var password = document.getElementById("password");
		var carModel = document.getElementById("carmod");

		// Set form values to the data object
		data.username = fullname;
		data.email = email;
		data.mobile = mobile;
		data.password = password;
		data.carmodel = carModel;

		return JSON.stringify(data);
	}

	function registerUser() {
		var data = registerFormData();
		postRequest("http://localhost:3000/users", data);
	}
	var registerButton = document.getElementById("register-btn") ? document.getElementById("register-btn") : '';
	if(registerButton) {
		registerButton.addEventListener('click', function(event) {
			event.preventDefault();
			registerUser();
		}, false);
	}

	/**
	* Search location
	*/
	var destinationValue = document.getElementById("to") ? document.getElementById("to") : '';
	if(destinationValue) {
		destinationValue.addEventListener("keydown", function (e) {
			// checks whether the pressed key is "Enter"
			if (e.keyCode === 13) {
				searchOwners(e);
			}
		});
	}
	
	function searchOwners(e) {
		var start = document.getElementById("from").value;
		var destination = e.target.value;
		// purvi lotus appartment, hosapalaya road
		var xhttp = new XMLHttpRequest();
		var appendElement = document.getElementById("append");
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var ownerArray = JSON.parse(this.responseText);
				var arrayLength = ownerArray.length;
				if(arrayLength > 0) {
					console.log(ownerArray);
					var html = '';
					for(var i = 0; arrayLength > i; i++) {
						console.log(ownerArray[i]);
						var htmlCode = '<div class="col-md-6">'+
							'<div class="card">'+
								'<div class="profile-pic profile-active">'+
									'<i class="fas fa-user"></i>'+
								'</div>'+
								'<div class="profile-pic profile-selected hide">'+
									'<i class="fas fa-check"></i>'+
								'</div>'+
								'<div class="profile-desc pull-left">'+
									'<div>'+
										'<div class="profile-name pull-left">'+
											'<h3>John Doe <small><i>6 min(s) away</i></small></h3>'+
										'</div>'+
									'</div>'+
									'<div class="route-n-car">'+
										'<p class="route">Route: <b>Koramangala to Whitefield</b></p>'+
										'<p class="car">Car: <b>Polo</b>&nbsp; Seats available: <b>3</b> </p>'+
									'</div>'+
								'</div>'+
								'<div class="profile-rating pull-right">'+
									'<p>4.5 | <i class="fa fa-star"></i></p>'+
								'</div>'+
								'<div class="profile-rating call pull-right hide">'+
									'<i class="fas fa-phone"></i>'+
								'</div>'+
							'</div>'+
						'</div>';
						html += htmlCode;
					}
					appendElement.innerHTML = html;
				} else {
					console.log("Else");
				}
			}
		};
		xhttp.open("GET", "http://localhost:3000/owners?from="+start+"&to="+destination, true);
		xhttp.send();
	};

})();