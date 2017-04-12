
app.controller('AssignmentView-Ctrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$mdToast', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.WeekTemplate = {
  							name : '3/12 - 3/18',
  							startDate : '3/12/2017',
  							endDate : '3/18/2017',
  							ScheduledLOE : 28,
  							CompletedLOE : 24, /* only relevent for current and past weeks */
  							RemainingLOE : function(){return this.ScheduledLOE-this.CompletedLOE;}
  							
  							
  						};

	console.log($scope.WeekTemplate);
	console.log($scope.WeekTemplate.RemainingLOE());

  $scope.EngineerTemplate = {
  								Name : 'Connor Flynn',
  								PastDueStories : [],
  								Availability : []
  							};

  $scope.selected = [];

  $scope.SampleData = {};
  $scope.SampleData.Engineers = [];




  

}]);