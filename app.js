angular.module('myApp',['autoCompleteTextBoxModule'])
.controller('myCtrl',function($scope,$http,$timeout){

	$scope.displayArray = ['name','city','email','ip_address'];
	$scope.searchAra = ['name','email','city','ip_address'];
	activate();
	function activate(){
		$http.get("tempJson.json")
		.then(function(response){
			$scope.arrayOfJson = response.data.data;
		});
	}

	$scope.function1 = function(){
		$timeout(function(){
			console.log($scope.myObject1);
			$scope.$apply();
		});
	}

	$scope.function2 = function(){
		$timeout(function(){
			console.log($scope.myObject2);
			$scope.$apply();
		});

	}
})
		