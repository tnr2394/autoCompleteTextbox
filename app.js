angular.module('myApp',['ngSanitize'])
.controller('myCtrl',function($scope,$http,$timeout){
	activate();
	$scope.myObject = null;
	$scope.displayBonafied = ['name','grno'];
	$scope.displayReject = ['name','sid','address'];

	$scope.generateBonafied = function(x){
		$timeout(function(){
			$scope.$apply();
			console.log("generateBonafied",$scope.myObject);
		});
		// alert(x.name); 
	}

	$scope.reject = function(x){$timeout(function(){
			$scope.$apply();
			console.log("reject",$scope.myObject2);
		});}
	function activate(){
		$http.post("http://132.140.160.112/collegeAdmin/server/admin/student/getStudents.php")
		.then(function(response){
			$scope.students = response.data;
		});
	}
})
		