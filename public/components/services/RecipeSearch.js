var recipes = [
            {
              index : 1,
              colNum : undefined,
              title : 'Bees Knees',
              desc : 'test description',
              img : 'img/Bees-Knees.jpg'
            },
            {
              index : 2,
              colNum : undefined,
              title : 'Earl Grey Martini',
              desc : 'test description',
              img : 'img/Earl-Grey-Martini.jpg'
            },
            {
              index : 3,
              colNum : undefined,
              title : 'Honey Garlic Chicken',
              desc : 'test description',
              img : 'img/Honey-Garlic-Chicken.jpg'
            },
            {
              index : 4,
              colNum : undefined,
              title : 'Japanese Chicken Wings',
              desc : 'test description',
              img : 'img/Japanese-Chicken-Wings.jpg'
            },
            {
              index : 5,
              colNum : undefined,
              title : 'Poached Eggs Asparagus',
              desc : 'test description',
              img : 'img/Poached-Eggs-Asparagus.jpg'
            },
            {
              index : 6,
              colNum : undefined,
              title : 'Roquefort Pear Salad',
              desc : 'test description',
              img : 'img/roquefort-pear-salad.jpg'
            },
            {
              index : 7,
              colNum : undefined,
              title : 'Shrimp Florentine',
              desc : 'test description',
              img : 'img/Shrimp-Florentine.jpg'
            },
            {
              index : 8,
              colNum : undefined,
              title : 'Spinach Artichoke Dip',
              desc : 'test description',
              img : 'img/Spinach-Artichoke-Dip.jpg'
            },
            {
              index : 9,
              colNum : undefined,
              title : 'Sweet Dinner Rolls',
              desc : 'test description',
              img : 'img/sweet-dinner-rolls.jpg'
            },
            {
              index : 10,
              colNum : undefined,
              title : 'Tomato Garlic Pasta',
              desc : 'test description',
              img : 'img/tomato-garlic-pasta.jpg'
            },
            {
              index : 11,
              colNum : undefined,
              title : 'Vanilla Crapes',
              desc : 'test description',
              img : 'img/vanilla-crapes.jpg'
            },
            {
              index : 12,
              colNum : undefined,
              title : 'Worlds Best Lasagna',
              desc : 'test description',
              img : 'img/worlds-best-lasagna.jpg'
            }
          ];


angular.module('PlatRecipes')
  .service('RecipeSearch', ['$http', function($http) {
    var self = this;

    var TYPE_SUCCESS = 'success';
    var TYPE_ALERT = 'alert';

    

    self.Recipes = recipes;

    
    //for(var i = 0;i < self.Recipes.length; i++)
    //{
    //  self.Recipes[i].colNum = self.Recipes[i].index % 5;
    //  console.log(self.Recipes[i]);
    //}

    var getAlert = function(type, msg) {
      return {
        type: type,
        msg: msg
      };
    };

    var genericError = getAlert(TYPE_ALERT, 'An error has occurred. Please try again.');

    var genericSuccess = getAlert(TYPE_SUCCESS, 'Your submission was processed successfully.');

    self.getError = function(msg) {
      return (!msg) ? genericError : getAlert(TYPE_ALERT, msg);
    };

    self.getSuccess = function(msg) {
      return (!msg) ? genericSuccess : getAlert(TYPE_SUCCESS, msg);
    };


    self.SearchRecipes = function(searchString){

      return '';
    };

    self.getRecipes = function()
    {

  //$scope.getRecipeJson = function(searchString, page) 
      var apiKey = "bpcoW9an7WP3BogL8uxt6SV9NftMJH53";
      var TitleKeyword = searchString;
      var pg = page;
      if( pg == undefined )
        pg = 1;
      
      var urlBigOven = "http://api2.bigoven.com/Recipes?"
          + "pg="+pg
          + "&rpp=40"
          + "&title_kw="+TitleKeyword
            + "&api_key="+apiKey;

      $http({
        method: 'GET',
        url: urlBigOven})
          .then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
            },  function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });

      $.ajax({
              type: "GET",
              dataType: 'json',
              cache: false,
              url: url,
              success: function (data) {

                console.log(data);
                recipes = data.Results;

                for(var i = 0; i < recipes.length; i++)
                  $scope.buildRecipe(recipes[i]);

              }
          });
    }

  }]);