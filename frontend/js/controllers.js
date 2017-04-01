var app = angular.module('myApp', []);

app.controller('usersController', function($scope, $http){

	$scope.fetchAllUsers = function(){
		$http.get('http://crud.dev/api/users').then(function(response){
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

		$http.post('http://crud.dev/api/users', dataObj).then(function(response){
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

	$scope.destroyUser = function(id){
		$http.delete('http://crud.dev/api/users/' + id).then(function(response){
			$scope.destroyUserResponse = response.data;
			console.log(response.data);
			$scope.fetchAllUsers();
		});
	};




});