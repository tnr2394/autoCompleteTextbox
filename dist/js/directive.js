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
		controller : ['$scope','$timeout',function($scope,$timeout){
			$scope.showList = [];$scope.show=false;
			$scope.choose = function(x){$scope.showList=[],$scope.myObject=x,$scope.output=x,$scope.callback(),$scope.inputBox=x[[$scope.search[0]]];}
			$scope.doSearch = function(){$scope.showList=[];var param=$scope.inputBox;param=param.toLowerCase();for(var i=0;i<$scope.array.length;i++)for(var j=0;j<$scope.search.length;j++)String($scope.array[i][[$scope.search[j]]]).toLowerCase().includes(param)&&$scope.showList.push($scope.array[i]);}
			$scope.generateDisplay=function(a){for(var b="",c=0;c<$scope.display.length;c++)b+="<label>"+a[[$scope.display[c]]]+"</label> <br>";return b.substring(0,b.length-2)};
		}]
	};
}])