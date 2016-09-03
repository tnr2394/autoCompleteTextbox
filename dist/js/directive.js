angular.module('autoCompleteTextBoxModule',['ngSanitize'])
.directive('autoCompleteTextbox', [function () {
	return {
		restrict: 'EA',
		scope : {
			placeholdertext : '@',
			search : '=',
			display : '=',
			array : '=',
			output : '=',
			callback : '&callback'
		},
		template : '<div id="mainContainer"><input class="form-control margin-top-10" id="inputBox" placeholder="{{placeholdertext}}" ng-model="inputBox" ng-click="show=true" ng-change="doSearch()"><ul ng-show="showList.length > 0" class="form-control list-group z-100" id="autoList"><a href="#" ng-click="choose(srch)" ng-repeat = "srch in showList track by $index" class="list-group-item hoverable" ng-bind-html="generateDisplay(srch)"></a></ul></div>',
		controller : function($scope,$timeout){
			$scope.showList = [];
			$scope.show=false;
			// loadKeyList();
			// function loadKeyList(){
			// 	$timeout(function(){
			// 		$scope.keyList = Object.keys($scope.array[0]);
			// 	},true);
			// }

			$scope.choose = function(x){
				$scope.showList=[];
				$scope.myObject = x;
				$scope.output = x;
				$scope.callback();
				$scope.inputBox = x[[$scope.search]];
			}

			$scope.doSearchExpired = function(){
				$scope.showList = [];
				var param = $scope.inputBox;
				param = param.toLowerCase();
				for(var i = 0; i<$scope.array.length; i++){
					if($scope.array[i][[$scope.search]].toLowerCase().includes(param))
						$scope.showList.push($scope.array[i]);
				}
			}
			$scope.doSearch = function(){
				$scope.showList = [];
				var param = $scope.inputBox;
				param = param.toLowerCase();
				for(var i = 0; i<$scope.array.length; i++){
					for(var j = 0; j<$scope.search.length; j++){
						if(String($scope.array[i][[$scope.search[j]]]).toLowerCase().includes(param))
							$scope.showList.push($scope.array[i]);
					}
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


