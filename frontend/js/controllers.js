var app = angular.module('myApp', []);

app.controller('usersController', function($scope, $http){

	$scope.fetchAllUsers = function(){
		$http.get('http://localhost:8000/api/users').then(function(response){
			$scope.users = response.data;
		});
	};

	$scope.fetchAllUsers();

	$scope.storeUser = function(){

		var dataObj = {
			name: $scope.name,
			email: $scope.email,
			telefone: $scope.telefone
		}

		$http.post('http://localhost:8000/api/users', dataObj).then(function(response){
			if(response.data.message){
				$scope.storeUserResponse = response.data;
			} else {
				$scope.name = "";
				$scope.email = "";
				$scope.telefone = "";
				$scope.storeUserResponse = "";
				$scope.fetchAllUsers();
			}
			
		});
	};

	$scope.showUser = function(id){
		$http.get('http://localhost:8000/api/users/' + id).then(function(response){
			$scope.showName = response.data.name;
			$scope.showEmail = response.data.email;
			$scope.showTelefone = response.data.telefone;
			$scope.showId = response.data.id;
		});
	};

	$scope.updateUser = function(id){
		var dataObj = {
			name: $scope.showName,
			email: $scope.showEmail,
			telefone: $scope.showTelefone
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