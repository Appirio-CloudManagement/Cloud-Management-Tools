app.controller('Story-Dashboard-Ctrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$mdToast', '$authService', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $authService){
  $scope.Stories = [];
  $scope.UserId = $authService.ViewAsUser.Id;
  $scope.UserContactId = $authService.ViewAsUser.ContactId;
  $scope.conn = $authService.conn;

  console.log("story-dashboard");
  var story_soql =  "SELECT Id, Name, Description__c, Acceptance_Criteria__c, Story_Name__c, Status__c, Dev_Owner__r.Salesforce_User_Id__c, (SELECT Id, Name, Task_Name__c, Status__c, Due_Date__c FROM Task_Story_Rel__r) FROM CMC_Story__c WHERE Dev_Owner__r.Salesforce_User_Id__c = '" + $scope.UserId.slice(0, -3)  + "'";
  var story_soql =  "SELECT Id, Name, Description__c, Acceptance_Criteria__c, Story_Name__c, Status__c, Dev_Owner__r.Salesforce_User_Id__c, Product__c, (SELECT Id, Name, Task_Name__c, Status__c, Due_Date__c FROM Task_Story_Rel__r) FROM CMC_Story__c WHERE Product__c LIKE \'%Cloud Management%\'  LIMIT 3";
  $scope.conn.query(story_soql).then(function(res) {
    $scope.Stories = res.records;
  });
  for(var i = 0; i < $scope.Stories.length; i++){
    $scope.Tasks = $scope.Task_Story_Rel__r.records;
    for(var j = 0; j < $scope.Tasks.length; j++){
      
    }
  }
}]);
