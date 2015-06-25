var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise("/home");
    
    $stateProvider.state('home', {
        url: "/home",
        templateUrl: "app/home/home.html",
        controller: 'HomeController'
    });
    
});