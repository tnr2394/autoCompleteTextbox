angular.module('autoCompleteTextBoxModule',['ngSanitize'])
.directive('autoCompleteTextbox', [function () {
	return {
		restrict: 'EA',
		scope : {
			placeholdertext : '@',
			search : '@',
			display : '=',
			array : '=',
			output : '=',
			callback : '&callback'
		},
		templateUrl : 'dist/directive.html',
		controller : function($scope){
			$scope.showList = [];
			$scope.show=false;
			$scope.choose = function(x){
				$scope.showList=[];
				$scope.myObject = x;
				$scope.output = x;
				$scope.callback();
				$scope.inputBox = x[[$scope.search]];
			}

			$scope.doSearch = function(){
				$scope.showList = [];
				var param = $scope.inputBox;
				param = param.toLowerCase();
				for(var i = 0; i<$scope.array.length; i++){
					if($scope.array[i][[$scope.search]].toLowerCase().includes(param))
						$scope.showList.push($scope.array[i]);
				}
			}
			
			$scope.generateDisplay = function(x){
				var strng = "";
				for(var i = 0; i < $scope.display.length; i++)
					strng += "<label>"+x[[$scope.display[i]]] + "</label> <br>";
				return strng.substring(0, strng.length - 2);
			}
		}
	};
}])


