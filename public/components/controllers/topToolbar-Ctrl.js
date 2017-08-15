app.controller('topToolbar-Ctrl', ['$scope', '$state', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$mdToast', '$localStorage',
	function($scope, $state, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $localStorage){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

	$scope.title = $state.current.title;
 }]);
