# autoCompleteTextbox

The autoCompltetTextbox is a directive which is designed to act as a default auto-complete textbox of html which uses the dataset to populate itself.

The problem with that is one cannot customize the information to be shown in the list, the item to be selected and format of displaying them.

Here all these problems are solved. Just inject 'autoCompleteTextBoxModule' in your module and start using it...!


## Installation

to install this,

	bower install angular-auto-complete-textbox-tirthraj

and then, add following to your html.

    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
   
   
   After these file have been added to your .html page, add following code for bower-install
   
   
    <script src="bower_components/angular-auto-complete-textbox-tirthraj/dist/js/directive.js"></script>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
            <link rel="stylesheet" href="bower_components/angular-auto-complete-textbox-tirthraj/dist/css/style.css">
		


## Usage

THIS IS HOW TO USE THE DIRECTIVE


	<auto-complete-textbox 
		placeholdertext="Enter Name" //CONTENT YOU WANT TO BE PLACED IN THE PLACEHOLDER. 
		array='arrayOfJson' //THE ARRAY YOU WANT TO SEARCH THROUGH.
		output="myObject1" //THE OBJECT WHICH WILL BE THE OUTPUT OF YOUR SEARCH. ULTIMATELY THE CHOICE YOU MADE.
		search = "name" // THE KEY WHICH YOU WANT TO BE SEARCH THROUGH FROM YOUR ARRAY.
		display = "displayArray1" //THE ARRAY OF KEYS THAT YOU WANT TO BE DISPLAYED INSIDE YOUR SEARCH.
		callback="function1()"> //THE CALLBACK FUNCTION WHICH WILL BE CALLED WHEN YOU CLICK ANY OF THE ITEMS LISTED AUTOMATICALLY.
	</auto-complete-textbox>

	
* `placeholdertext` holds content you would like in placeholder of the textbox.
* `array` takes the array of json-objects from which it will execute the search.
* `output` it is the scope variable that would hold the output, thereby the search result object.
* `search` would take an array of the keys within which you want to search. ie, if your json array has each object with keys like name, email, city,phone and gender, then the value for your `search` should be something like 

	`var searchInput = ['name','email','phone']` to search all the name, email and phone.  

* `display` will also hold an array as the searchInput does. It will be used to render your auto-complete list below the textbox. So pass all the keys in this array which you want to display in your auto-complete-textbox.
* `callback` is the function which will be called when a choice is made from the array below. You must click the item from the auto-complete list.

## DEMO
`autoCompeleteTextBoxModule` must be injected into the main module as given. 

	angular.module('myApp',['autoCompleteTextBoxModule'])
	.controller('myCtrl',function($scope,$http,$timeout){
		$scope.displayArray = ['name','city']; //The keys you want to display in the autoComplete list should be given in form of an array.

		activate();

		function activate(){
		//This function simply gets the json data 
		//and assigns it to $scope.arrayOfJson object.
			$http.get("tempJson.json")
			.then(function(response){
				$scope.arrayOfJson = response.data.data;
			});
		}

		//Function1 is function given as callback to the
		//directive. Hence it will be called when a
		//choice is made from the list.
        
		$scope.function1 = function(){
        //$timeout() is to be used necessarily.
        
			$timeout(function(){
				console.log($scope.myObject1);
				$scope.$apply();
			});
		}
	});
			



## HTML OF DIRECTIVE

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
			
`'ngSanitize'` has been injected already. So edit it the way you want and generate your custom display



The `index.html` will demonstrate the working of the directive.

All the best!!! :D
