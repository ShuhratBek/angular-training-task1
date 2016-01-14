(function() {
	'use strict';

	angular
		.module('task1App', [
			'ngAnimate', 
			'ngAria', 
			'ngSanitize', 
			'ngMessages', 
			'ngMaterial'
		])
		.config(function($mdThemingProvider) {
			// Theme configuration for angular-material
			$mdThemingProvider
				.theme('default')
				.primaryPalette('teal');
		})
		.controller("MainCtrl", MainCtrl)
		.directive('age', function() {
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					// validate incorrect
					ctrl.$validators.incorrect = function(modelValue, viewValue) {
				        return ctrl.$isEmpty(viewValue) || /[0-9]/.test(viewValue);
				    };

				    //validate adult
					ctrl.$validators.adult = function(modelValue, viewValue) {
				        return (viewValue >= 18 && viewValue <= 65);
				    };
				}
			};
		})
		.directive('birthday', function($window) {
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					// Connect to Moment.js				
	                var moment = $window.moment;

	                // Check date is valid
	                function isDate(value) {
	                    var m = moment(value, 'DD MMMM YYYY', true);
	                    return m.isValid();
	                };

	                // validate
					ctrl.$validators.incorrect = function(modelValue, viewValue) {
				        return isDate(viewValue);
				    };
				}
			};
		});

	function MainCtrl(){
		var vm = this;
		// The controllerAs syntax uses this inside controllers which gets bound to $scope
		// https://github.com/johnpapa/angular-styleguide#style-y031

		vm.result = {};

		// Submits form
		vm.submit = function(){
			angular.copy(vm.user, vm.result);
		};
	}
})();
