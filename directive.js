angular.module('myApp')
.directive('myDirective', [function () {
	return {
		restrict: 'EA',
		scope : {
			placeholdertext : '@',
			buttontext : '@',
			search : '@',
			display : '=',
			array : '=',
			output : '=',
			callback : '&callback'
		},
		templateUrl : 'directive.html',
		controller : function($scope){
			$scope.showList = [];
			$scope.show=false;
			$scope.choose = function(x){
				$scope.showList=[];
				$scope.myObject = x;
				$scope.callback($scope.myObject);
				$scope.output = x;
				$scope.inputBox = x[[$scope.search]];}
			$scope.doSearch = function(){
				$scope.showList = [];
				var param = $scope.inputBox;
				param = param.toLowerCase();
				for(var i = 0; i<$scope.array.length; i++){
					if($scope.array[i][[$scope.search]].toLowerCase().includes(param))
						$scope.showList.push($scope.array[i]);
				}}
			$scope.generateDisplay = function(x){
				var strng = "";
				for(var i = 0; i < $scope.display.length; i++){

					strng += "<label>"+x[[$scope.display[i]]] + "</label> <br>";
				}
				strng = strng.substring(0, strng.length - 2);
				return strng;
			}
			$scope.returnObject = function(index){
				$scope.output = $scope.array[index];
				console.log(index);
				return $scope.output;}
		}
	};
}])


