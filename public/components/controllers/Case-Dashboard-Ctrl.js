app.controller('Case-Dashboard-Ctrl', ['$scope', '$mdSidenav', '$authService', '$localStorage', function($scope, $mdSidenav, $authService, $localStorage){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  $localStorage.currPage = 'Cases';
  $scope.cases = [];
  $scope.load = false;
  $scope.UserId = $authService.ViewAsUser.Id;
  $scope.UserContactId = $authService.ViewAsUser.ContactId;
  $scope.conn = $authService.conn;
  $scope.showing = '';


  var case_soql =  "SELECT Id, CaseNumber, Subject, Description, Status, Steps_to_Reproduce__c, Status_Notes_Next_Steps__c, Actual_LOE__c, Estimated_LOE__c, Bug__c, Product1__c FROM Case WHERE Status != 'Closed' AND Product1__c = 'Cloud Management Support' AND OwnerId = '" + $scope.UserId + "' LIMIT 15";
  $scope.conn.query(case_soql).then(function(res) {
    $scope.cases = res.records;
    $scope.load = true;
    if($scope.cases.length > 0){
      $scope.showing = $scope.cases[0];
    }
    $scope.$applyAsync();
  });

  $scope.updateView = function(item){
    $scope.showing = item;
  }
}]);
