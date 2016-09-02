# autoCompleteTextbox

The autoCompltetTextbox is a directive which is designed to act as a default auto-complete textbox of html which uses the dataset to populate itself.

The problem with that is one cannot customize the information to be shown in the list, the item to be selected and format of displaying them.

Here all these problems are solved. Just inject 'autoCompleteTextBoxModule' in your module and start using it...!


DEMO

	angular.module('myApp',['autoCompleteTextBoxModule'])
	.controller('myCtrl',function($scope,$http,$timeout){
		$scope.displayArray1 = ['name','city']; //The keys you want to display in the autoComplete list should be given in form of an array.
		$scope.displayArray2 = ['name','gender','email'];

		activate();

		function activate(){
		//This function simply gets the json data 
		//and assigns it to $scope.arrayOfJson object.
			$http.get("tempJson.json")
			.then(function(response){
				$scope.arrayOfJson = response.data.data;
			});
		}

		//Function1 and Function2 are 2 
		//different functions given as callback to the
		//directive. Hence they will be called when a
		//choice is made in the directive.
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
	});
			

THIS IS HOW TO USE THE DIRECTIVE


	<auto-complete-textbox 
		placeholdertext="Enter Name" //CONTENT YOU WANT TO BE PLACED IN THE PLACEHOLDER. 
		array='arrayOfJson' //THE ARRAY YOU WANT TO SEARCH THROUGH.
		output="myObject1" //THE OBJECT WHICH WILL BE THE OUTPUT OF YOUR SEARCH. ULTIMATELY THE CHOICE YOU MADE.
		search = "name" // THE KEY WHICH YOU WANT TO BE SEARCH THROUGH FROM YOUR ARRAY.
		display = "displayArray1" //THE ARRAY OF KEYS THAT YOU WANT TO BE DISPLAYED INSIDE YOUR SEARCH.
		callback="function1()"> //THE CALLBACK FUNCTION WHICH WILL BE CALLED WHEN YOU CLICK ANY OF THE ITEMS LISTED AUTOMATICALLY.
	</auto-complete-textbox>





THE INSIDE HTML OF DIRECTIVE

	<div id="mainContainer">
		<input class="form-control margin-top-10" id="inputBox" placeholder="{{placeholdertext}}" ng-model="inputBox" ng-click="show=true" ng-change="doSearch()">

		<ul ng-show="showList.length > 0" class="form-control list-group" id="autoList">
			<a href="#" ng-click="choose(srch)" ng-repeat = "srch in showList track by $index" class="list-group-item hoverable" ng-bind-html="generateDisplay(srch)"></a>
		</ul>
	</div>



If you want to edit the autocomplete list, edit the following function inside the directive.js

	$scope.generateDisplay = function(x){
		var strng = "";
		for(var i = 0; i < $scope.display.length; i++)
			strng += "<label>"+x[[$scope.display[i]]] + "</label> <br>"; // 
		return strng.substring(0, strng.length - 2);
	}
			
'ngSanitize' has been injected already. So edit it the way you want and generate your custom display



The index.html will demonstrate the working of the directive.

All the best!!! :D
