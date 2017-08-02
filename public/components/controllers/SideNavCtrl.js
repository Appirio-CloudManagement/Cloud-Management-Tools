

app.controller('SideNavCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$window', '$mdMedia', '$authService', '$localStorage', function($scope, $mdSidenav, $mdDialog, $window, $mdMedia, $authService, $localStorage){
  
    console.log('$authService.User');
    console.log($authService.User);

    $scope.UserName = $authService.ViewAsUser.FirstName + ' ' + $authService.ViewAsUser.LastName;
    $scope.UserEmail = $authService.ViewAsUser.Email;
    $scope.UserPhone = $authService.ViewAsUser.Phone;
    $scope.SmallPhotoUrl = $authService.ViewAsUser.SmallPhotoUrl;
    $scope.conn = $authService.conn;

    //$scope.ViewAsContactId = $authService.User.ViewAsContactId;
    //$scope.ViewAsUserID = $authService.User.ViewAsUserID;


      $scope.menuItems = [
            {
              subHeaderTitle : null,
              title : 'Cases & Milestones',
              link : '#/CEM-Dashboard',
              icon : 'view_quilt'
            },
            {
              subHeaderTitle : null,
              title : 'Sprint Summary',
              link : 'Sprints',
              icon : 'list'
            },
            {
              subHeaderTitle : null,
              title : 'Backlog/Requested Stories',
              link : 'UnassignedStories',
              icon : 'book'
            },
            {
              subHeaderTitle : null,
              title : 'Cases',
              link : '#/Case-Dashboard',
              icon : 'view_quilt'
            },
            {
              subHeaderTitle :'Your Environments',
              title : 'Production (1)',
              link : 'EV1',
              icon : 'cloud_queue'
            },
            {
              subHeaderTitle :'Your Environments',
              title : 'UAT / Stage',
              link : 'EV2',
              icon : 'cloud_queue'
            },
            {
              subHeaderTitle :'Management',
              title : 'CM Assignments',
              link : 'CMC-angular-extension/index.html/#/CloudMgmt-Assignments',
              icon : 'people'
            },
            {
              subHeaderTitle :'Management',
              title : 'My Settings',
              link : 'Management',
              icon : 'settings'
            }

          ];

        $scope.subHeaders = [{title:'Your Environments'},{title:'Management'},{title:'View as ...'}];

      $scope.getSubMenuItems = function(menuHeader) {
        var children = [];
        for (var i = 0; i < $scope.menuItems.length; i++)
          if ($scope.menuItems[i].subHeaderTitle == menuHeader.title) 
            children.push($scope.menuItems[i]);
        return children;
      };
      $scope.openLink = function(link) {
        console.log(link);
        if( link.Id != null && link.Id != undefined )
          $scope.setViewAsUser(link);
        else
          window.open('/'+link,"_self");
      }


      $scope.getCEMList = function(){
        var CEM_soql =  "Select Id, pse__Salesforce_User__r.Id, pse__Salesforce_User__r.FirstName, pse__Salesforce_User__r.LastName, pse__Salesforce_User__r.SmallPhotoUrl, pse__Salesforce_User__r.FullPhotoUrl, pse__Salesforce_User__r.Email FROM Contact "
                  + "WHERE pse__Salesforce_User__c != null and pse__Salesforce_User__r.IsActive = true and Id IN (Select pse__project_manager__c from pse__proj__c where pse__practice__r.name like 'Cloud Management%' AND pse__Is_Active__c = true) order by pse__Salesforce_User__r.LastName asc";

        $scope.conn.query(CEM_soql).then(function(res) {
        
          $scope.CEMList = res.records;

          for(var i = 0; i < $scope.CEMList.length; i++)
          {
            $scope.CEMList[i].ContactId = $scope.CEMList[i].Id;
            $scope.CEMList[i].Id = $scope.CEMList[i].pse__Salesforce_User__r.Id.trim();
            $scope.CEMList[i].FirstName = $scope.CEMList[i].pse__Salesforce_User__r.FirstName;
            $scope.CEMList[i].LastName = $scope.CEMList[i].pse__Salesforce_User__r.LastName;
            $scope.CEMList[i].SmallPhotoUrl =$scope.CEMList[i].pse__Salesforce_User__r.SmallPhotoUrl;
            $scope.CEMList[i].FullPhotoUrl =$scope.CEMList[i].pse__Salesforce_User__r.FullPhotoUrl;
            $scope.CEMList[i].Email = $scope.CEMList[i].pse__Salesforce_User__r.Email;
            //$scope.CEMList[i].isViewAsUser = ($scope.viewAsUser.Id == $scope.CEMList[i].Id);
            $scope.CEMList[i].FullName = $scope.CEMList[i].FirstName + ' ' + $scope.CEMList[i].LastName;
            var CEM = {
              subHeaderTitle :'View as ...',
              title : $scope.CEMList[i].FullName,
              link : $scope.CEMList[i],
              icon : 'account_circle'
              };


            //if( $scope.CEMList[i].Id == $scope.ViewAsUserId ) // for some reason this if statement wasn't working.  used FullName instead.            
            if($scope.CEMList[i].FullName != $scope.UserName)
              $scope.menuItems.push(CEM);


          }
          
          $scope.$apply();

        });
      }

      $scope.setViewAsUser = function(CEM)
      {
        console.log('calling setViewAsUser');
        $localStorage.ViewAsUser = CEM;
        window.location.reload(false); 
        
      }


      $scope.getCEMList();
}]);



/*
angular.module('CMC-Ext').directive('menulistitems', function() {
  return {
    replace: true,
    template: '<div>'+
                '<md-list>'+
                  '<md-item ng-repeat="item in menuItems | filter:{ subHeaderTitle : null}" ng-click="openLink(item.link)">'+
                      '<md-item-content md-ink-ripple layout="row" layout-align="start center">'+
                        '<div class="inset">'+
                          '<ng-md-icon icon="{{item.icon}}"></ng-md-icon>'+
                        '</div>'+
                        '<div class="inset">{{item.title}}'+
                        '</div>'+
                      '</md-item-content>'+
                  '</md-item>'+
                  '<div ng-repeat="header in subHeaders">'+
                    '<md-divider></md-divider>'+
                    '<md-subheader>{{header.title}}</md-subheader>'+
                    '<md-item ng-repeat="item in getSubMenuItems(header)" ng-click="openLink(item.link)">'+
                        '<md-item-content md-ink-ripple layout="row" layout-align="start center">'+
                          '<div class="inset">'+
                            '<ng-md-icon icon="{{item.icon}}"></ng-md-icon>'+
                          '</div>'+
                          '<div class="inset">{{item.title}}'+
                          '</div>'+
                        '</md-item-content>'+
                    '</md-item>'+
                  '</div>'+
                '</md-list>'+
              '</div>',
    controller: 'SideNavCtrl'
  };
});
*/