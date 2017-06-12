
app.controller('CEM-Dashboard-Ctrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$mdToast', '$localStorage', '$authService', '$InView', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $mdToast, $localStorage, $authService, $InView){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

    $scope.Cases = [];
    $scope.WaitingCustomerAction = [];
    $scope.WaitingAppirioAction = [];
    $scope.UserId = $authService.ViewAsUser.Id;
    $scope.UserContactId = $authService.ViewAsUser.ContactId;
    $scope.conn = $authService.conn;
    var PracticeName = 'Cloud Management - SFDC';
    var PracticeFilter = " and pse__Practice__r.Name like '"+PracticeName+"'";

    $scope.AccountQuery =  " SELECT Id, Name, "+  
             " (SELECT Id, OwnerId, Owner.Name, Owner.Email, Priority, Account.Name, Account.Id, CaseNumber, Subject, CreatedDate, Thread_ID__c, Status,Status_Notes_Next_Steps__c, Cloud_Management_Lead__r.Full_Name__c, Contact.Name, Contact.Id, Contact.Email, Additional_Emails_for_Notifications__c, SLA_Met__c FROM cases Where (Cloud_Management_Lead__c = '"+$scope.UserContactId+"' OR Cloud_Management_Lead__c = '' ) and IsClosed = false order by Priority,CreatedDate)," + 
             " (SELECT PSE__Project_ID__c FROM pse__Projects__r WHERE IsClosed__c = \'No\'"+PracticeFilter+")" +
             " FROM Account " +
             " <<WhereClause>> " +
             " ORDER BY Name";

    $scope.AccountQuery = $scope.AccountQuery.replace("<<WhereClause>>", " WHERE Id in (SELECT pse__Account__c FROM pse__Proj__c where (NOT Name like '%DBLCLK%') and pse__Is_Active__c = true AND pse__Project_Manager__c = '"+$scope.UserContactId+"') ");

    $scope.UserId = $authService.ViewAsUser.Id;
    $scope.conn = $authService.conn;


  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };

  $scope.processCases = function(accountsWithCases){

    for(var i = 0; i < accountsWithCases.records.length; i++)
    {
      var account = accountsWithCases.records[i];
      $InView.AddAccount(account);

      if( account.Cases != null && account.Cases.records != null ){
        for( var x = 0; x < account.Cases.records.length; x++){
          var Case = account.Cases.records[x];
          $scope.Cases.push(Case);

          if( Case.Status == "Fixed - Pending Release" || Case.Status == "Appirio Work in Progress" || Case.Status == "Escalated" || Case.Status == "New") {
            Case.WaitingOnAppirio = true;
            $scope.WaitingAppirioAction.push(Case);
          }
          else{
            Case.WaitingOnAppirio = false;
            $scope.WaitingCustomerAction.push(Case);
          }
        }
      }
    }
    
    $scope.$apply();

  }


  $scope.conn.query($scope.AccountQuery).then(function(res){
    
    $scope.processCases(res);

  });


}]);


function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};