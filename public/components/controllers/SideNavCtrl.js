

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


app.controller('SideNavCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$window', '$mdMedia', function($scope, $mdSidenav, $mdDialog, $window, $mdMedia){
  
      $scope.menuItems = [
            {
              subHeaderTitle : null,
              title : 'Cases & Milestones',
              link : 'CMC-angular-extension/index.html/#/CasesMilestones',
              icon : 'view_quilt'
            }/*,
            {
              subHeaderTitle : undefined,
              title : 'Upcoming Milestones',
              link : 'CM-Milestones',
              icon : 'event'
            }*/,
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
              subHeaderTitle :'Your Environments',
              title : 'Production (1)',
              link : 'Search Recipes',
              icon : 'cloud_queue'
            },
            {
              subHeaderTitle :'Your Environments',
              title : 'UAT / Stage',
              link : 'Search Recipes',
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
              link : 'Search Recipes',
              icon : 'settings'
            },
            {
              subHeaderTitle :'Login as ...',
              title : 'Person 1',
              link : '',
              icon : 'account_circle'
            },
            {
              subHeaderTitle :'Login as ...',
              title : 'Person 2',
              link : '',
              icon : 'account_circle'
            },
            {
              subHeaderTitle :'Login as ...',
              title : 'Person 3',
              link : '',
              icon : 'account_circle'
            }
          ];

        $scope.subHeaders = [{title:'Your Environments'},{title:'Management'},{title:'Login as ...'}];

      $scope.getSubMenuItems = function(menuHeader) {
        var children = [];
        for (var i = 0; i < $scope.menuItems.length; i++)
          if ($scope.menuItems[i].subHeaderTitle == menuHeader.title) 
            children.push($scope.menuItems[i]);
        return children;
      };
      $scope.openLink = function(link) {
        window.open('/'+link,"_self");
      }
}]);