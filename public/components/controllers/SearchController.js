
app.controller('SearchCtrl', ['$scope', 'RecipeSearch', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$window', '$mdMedia', function($scope, RecipeSearch, $mdBottomSheet, $mdSidenav, $mdDialog, $window, $mdMedia){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.Recipes = RecipeSearch.Recipes;
  $scope.numColumns = 5;//defaulted to 5;

  $scope.Columns = [];

  $scope.menu = [
    {
      link : '',
      title: 'Search Recipes',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'Weekly Planner',
      icon: 'event'
    },
    {
      link : '',
      title: 'Recipe Books',
      icon: 'book'
    },
    {
      link : '',
      title: 'Shopping Lists',
      icon: 'list'
    }
  ];
  $scope.admin = [
    {
      link : 'showListBottomSheet($event)',
      title: 'My Settings',
      icon: 'settings'
    }
  ];
  $scope.alert = '';



  var w = angular.element($window).bind('resize', 
    function () {
      $scope.onWindowResize();
    }
  );;


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


  $scope.onWindowResize = function()
  {
    if($mdMedia('xl') == true)
    {
      $scope.numColumns = 6;
      $scope.widthColumns = 16.66;
    }
    else if($mdMedia('lg') == true)
    {
      $scope.numColumns = 5;
      $scope.widthColumns = 20;
    }
    else if($mdMedia('md') == true)
    {
      $scope.numColumns = 4;
      $scope.widthColumns = 25;
    }
    else if($mdMedia('sm') == true)
    {
      $scope.numColumns = 3;
      $scope.widthColumns = 33.33;
    }
    else if($mdMedia('xs') == true)
    {
      $scope.numColumns = 2;
      $scope.widthColumns = 50;
    }
    
    console.log('xs='+$mdMedia('xs'));
    console.log('sm='+$mdMedia('sm'));
    console.log('md='+$mdMedia('md'));
    console.log('lg='+$mdMedia('lg'));
    console.log('xl='+$mdMedia('xl'));
    console.log('$scope.numColumns='+$scope.numColumns);

    $scope.Columns = [];
    for(var i = 0; i < $scope.numColumns; i++)
      $scope.Columns.push({index:i, width: $scope.widthColumns});

    if( $scope.Recipes != null && $scope.Recipes != undefined )
      for(var i = 0; i < $scope.Recipes.length; i++)
        $scope.Recipes[i].colNum = $scope.Recipes[i].index%$scope.numColumns;
    
    //$scope.$apply();
  };

  /********************************************/
  /******* METHODS TO CALL ON PAGE LOAD *******/
  
  $scope.onWindowResize();
  /********************************************/


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