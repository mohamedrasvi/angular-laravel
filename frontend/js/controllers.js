var app = angular.module('myApp', []);

app.controller('usersController', function($scope, $http){
	
	$http.get('http://crud.dev/api/users').then(function(response){
		$scope.users = response.data;
	});


	$scope.saveUser = function(){

		var dataObj = {
			name: $scope.name,
			email: $scope.email,
			telefone: $scope.telefone
		}

		$http.post('http://crud.dev/api/users', dataObj).then(function(response){
			$scope.postResponse = response.data;
		});
	};

});