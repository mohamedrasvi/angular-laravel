var app = angular.module('myApp', [])

app.controller('usersController', function($scope, $http){
	
	

	$scope.fetchAllUsers = function(){
		$http.get('http://localhost:8000/api/users').then(function(response){
			$scope.users = response.data;
		});
	};
	
	
	// set default birthday value
	$scope.birthday = "1900-07-15";
	
	// create function to get age
	$scope.calculateAge = function(birthday){
	    var birthday = new Date(birthday);
	    var today = new Date();
	    var age = ((today - birthday) / (31557600000));
	    var age = Math.floor( age );
	    return age;
	  }
	
	
	// assign default value to date_of_birth
	if(!$scope.date_of_birth){
	
		$scope.date_of_birth = $scope.birthday;
		
	}

	$scope.fetchAllUsers();

	$scope.storeUser = function(){


		// get the age and asign to age scope
		$scope.age = $scope.calculateAge($scope.date_of_birth);
		
		
		
		var dataObj = {
			name: $scope.name,
			cpf: $scope.cpf,
			email: $scope.email,
			date_of_birth: $scope.date_of_birth,
			age: $scope.age,
		}

		$http.post('http://localhost:8000/api/users', dataObj).then(function(response){
			if(response.data.message){
				$scope.storeUserResponse = response.data;
			} else {
				$scope.name = "";
				$scope.cpf = "";
				$scope.email = "";
				$scope.date_of_birth = "";
				$scope.age = "";
				$scope.storeUserResponse = "";
				$scope.fetchAllUsers();
			}
			
		});
	};

	$scope.showUser = function(id){
		$http.get('http://localhost:8000/api/users/' + id).then(function(response){
			$scope.showName = response.data.name;
			$scope.showCPF = response.data.cpf;
			$scope.showEmail = response.data.email;
			$scope.showDateOfBirth = response.data.date_of_birth;
			$scope.showAge = response.data.age;
			$scope.showId = response.data.id;
		});
	};

	$scope.updateUser = function(id){
		
		// get the age and asign to age scope
		$scope.showAge = $scope.calculateAge($scope.showDateOfBirth);
		var dataObj = {
			name: $scope.showName,
			cpf: $scope.showCPF,
			email: $scope.showEmail,
			date_of_birth: $scope.showDateOfBirth,
			age: $scope.showAge,
		}

		$http.put('http://localhost:8000/api/users/' + id, dataObj).then(function(response){
			if(response.data.message){
				$scope.updateUserResponse = response.data;
			} else {
				$('#myModal').modal('hide');
				$scope.fetchAllUsers();
			}
		});
	};

	$scope.destroyUser = function(id){
		$http.delete('http://localhost:8000/api/users/' + id).then(function(response){
			$scope.destroyUserResponse = response.data;
			console.log(response.data);
			$scope.fetchAllUsers();
		});
	};




});
