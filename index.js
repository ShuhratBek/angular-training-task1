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
		.directive('wordValidation', function() {
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					// validate incorrect
					ctrl.$validators.incorrect = function(modelValue, viewValue) {
						return (/^([A-Z][a-z]+)\s?([A-Z][a-z]+)?$/).test(viewValue);
				    };
				}
			};
		})
		.directive('ageValidation', function() {
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					// validate incorrect
					ctrl.$validators.incorrect = function(modelValue, viewValue) {
				        return isNumber(viewValue);
				    };

					ctrl.$validators.noSpaces = function(modelValue, viewValue) {
						return (/^[^\s]+$/).test(viewValue);
					};

  					if (angular.isDefined(attrs.ageMin)) {
						ctrl.$validators.ageMin = function(modelValue, viewValue) {
							if(isNumber(viewValue)) {
					        	return  toInt(attrs.ageMin) <= toInt(viewValue);
					        }
					    };
  					}

  					if (angular.isDefined(attrs.ageMax)) {
						ctrl.$validators.ageMax = function(modelValue, viewValue) {
							if(isNumber(viewValue)) {
					        	return toInt(viewValue) <= toInt(attrs.ageMax);
					        }
					    };
  					}

  					function toInt(val) {
  						return parseInt(val, 10);
  					}

  					function isNumber(val) {
  						return (/^(?!\s.*$)[1-9]+[0-9]+(?!\s.*$)$/).test(val);
  					}
				}
			};
		})
		.directive('birthdayValidation', function($window) {
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
		})
		.controller("MainCtrl", MainCtrl);

	MainCtrl.$inject = ['$mdToast'];

	function MainCtrl($mdToast) {
		var vm = this;
		// The controllerAs syntax uses this inside controllers which gets bound to $scope
		// https://github.com/johnpapa/angular-styleguide#style-y031

		vm.result = {};

		// Submits form
		vm.submit = function(isValid) {
			if(isValid) {
				angular.copy(vm.user, vm.result);
				$mdToast.show(
					$mdToast
						.simple()
						.textContent('Form Submitted!')
				);
			}
		};
	}
