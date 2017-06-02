app.controller('topToolbar-Ctrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$mdToast', '$localStorage', 
	function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $localStorage){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
 }]);