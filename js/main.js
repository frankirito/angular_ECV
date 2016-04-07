(function() {

	const app = angular.module("dvdStore", []);

	app.controller("StoreController", ($scope, $http) => {

		/**
		*	Functions
		*/

		$scope.getFilms = (callback) => {

			$http({
				method: 'GET',
				url: 'js/films.json'
			}).then(function(response) {
				$scope.films = response.data;
				if(callback) callback();
			});
		};

		$scope.changeTab = (which, val) => {
			$scope.tabs[which] = val;
		};

		$scope.getTabVal = (which) => {
			return $scope.tabs[which];
		};

		$scope.getNumber = (num) => {
		    return new Array(num);   
		};

		$scope.addToCart = (film) => {

			if($scope.cartTitles.indexOf(film.title) === -1) {
				$scope.cart.push(film);
				$scope.cartTitles.push(film.title);

				swal({
					title: film.title + " a été ajouté au panier !",
					type: "success",
					timer: 1000,
					showConfirmButton: false
				});

			} else {
				swal({
					title: film.title + " est déjà dans votre panier !",
					type: "error",
					timer: 1000,
					showConfirmButton: false
				});
			}

			console.log($scope.cart);
		};

		$scope.cart = [];
		$scope.cartTitles = [];

		/**
		*	Execution
		*/

		$scope.getFilms(function() {

			// Created in order to define tabs titles while ng-repeat
			$scope.tabName = ["", "Product", "Synopsis", "Team"];
			$scope.tabs = [];

			// Used to put in active class the first tab foreach film
			for (var i = 0; i < $scope.films.length; i++) $scope.tabs[i] = 1;

			// Make for in ng-repeat
			$scope.number = $scope.tabName.length - 1;
		});
	});

})();
