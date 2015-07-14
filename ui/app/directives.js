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
            
            // Render the fancy bar-charts
            var canvas = angular.element(element[0]).find('canvas')[0];
            
            
            //Colors
            // DarkBlue filled #111D35
            // DarkBlue unfilled #D1D1D1
            // Blue filled #4A4FCB
            // Blue unfilled #B6B8EA
            // Green filled #62B55E
            // Green unfilled #C0E1BE
            // Orange filled #FF9059
            // Orange unfilled #FFD2BC
            
            // Make it visually fill the positioned parent
            canvas.style.width ='100%';
            // ...then set the internal size to match
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            var ctx = canvas.getContext('2d');
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;
            
            // left edge
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, 4, height - 20 );
            
            // right edge
            ctx.fillRect(width - 4, 0, 4, height - 20);
            
            function drawPercentageBar(startX, startY, width, height, percentFilled, fillColor, unfilledColor){
                
                var renderedPixels = percentFilled * width;
                ctx.fillStyle = fillColor;
                ctx.fillRect(startX, startY, renderedPixels, height);
                
                ctx.fillStyle = unfilledColor;
                ctx.fillRect( startX + renderedPixels, startY, width - renderedPixels, height);
                
                //draw left-black-edge last
                ctx.fillStyle = '#000000';
                ctx.fillRect(startX, startY, 4, height);
            }
            
            function drawSubScore(startX, startY, text ){
                ctx.fillStyle = '#888888';
                ctx.fillText(text, startX, startY );
            }
            
            drawPercentageBar(0, 0, width - 4, 24, scope.score/scope.maxScore, '#111D35', '#D1D1D1');
            
            // render component scores
            var colors = [
                ['#4A4FCB', '#B6B8EA'],
                ['#62B55E','#C0E1BE'],
                ['#FF9059','#FFD2BC']
            ]
            
            var componentScoreXStart = 0;
            
            for( var i in scope.ratingModel.components ){
                var component = scope.ratingModel.components[i]; 
                var componentPercent = component.score / component.maxScore;
                
                var componentPercentOfWhole = component.maxScore / scope.maxScore;
                var componentWidth = componentPercentOfWhole * (width - 4);
                
                drawPercentageBar(componentScoreXStart, 30, componentWidth, 12, componentPercent, colors[i][0], colors[i][1]);
                drawSubScore(componentScoreXStart, 30 + 12 + 10, component.score + ' / ' + component.maxScore);
                componentScoreXStart += componentWidth;
            }
            
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