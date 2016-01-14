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
		$mdThemingProvider
			.theme('default')
			.primaryPalette('teal');
	})
	.controller("MainCtrl", MainCtrl)
	.directive('age', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$validators.incorrect = function(modelValue, viewValue) {
			        return ctrl.$isEmpty(modelValue) || /[0-9]/.test(viewValue);
			    };
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
                var moment = $window.moment;
                function isDate(value) {
                    var m = moment(value, 'DD MMMM YYYY', true);
                    return m.isValid();
                };

                ctrl.$parsers.push(function(value) {
                    if (!value || value.length === 0) {
                         return value;
                    };
                    ctrl.$setValidity('incorrect', isDate(value));
                    return value;
                });
			}
		};
	});

function MainCtrl(){
	var vm = this;
	vm.result = {};
	vm.submit = function(){
		angular.copy(vm.user, vm.result);
	};
}