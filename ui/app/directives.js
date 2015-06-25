app.directive('privacyRating', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ratingModel: '='
        },
        controller: function ($scope, $element, $attrs) {
        },
        templateUrl: 'app/privacyRating.html',
        link: function (scope, element, attrs) {
            
            if( !scope || !scope.ratingModel || !scope.ratingModel.components ){
                return;
            }
            
            // Compute the total score from the components
            var score = 0;
            var maxScore = 0;
            
            for( var i in scope.ratingModel.components ){
                var component = scope.ratingModel.components[i];
                
                score += component.score;
                maxScore += component.maxScore;                
            }
            
            scope.score = score;
            scope.maxScore = maxScore;
            
        }
    };
});

app.directive('overallRating', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ratingModel: '='
        },
        controller: function ($scope, $element, $attrs) {
        },
        templateUrl: 'app/overallRating.html',
        link: function (scope, element, attrs) {
            
            if( !scope || !scope.ratingModel || !scope.ratingModel.length ){
                return;
            }
            
            // Compute the total score from the components
            var score = 0;
            var maxScore = 0;
            
            var categories = scope.ratingModel;
            
            for( var i in categories ){
                var category = categories[i];
                
                for( var j in category.components ){
                    var component = category.components[j];
                    score += component.score;
                    maxScore += component.maxScore;
                }            
            }
            
            scope.score = score;
            scope.maxScore = maxScore;
            
        }
    };
});