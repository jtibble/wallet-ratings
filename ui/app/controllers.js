app.controller('HomeController', function ($scope) {
    
    function makeNewCategory(title, categoryArray){
        
        return function(scores){
            
            var components = [];
            
            for( var i in scores ){
                components.push( {
                    score: scores[i],
                    maxScore: categoryArray[i]
                });
            }
            
            return {
                components: components
            }
        };
    }
    
    
    var categoryScores = [];
    
    var receivingAddressScores = makeNewCategory('Receiving Address Generation & Backup', [10, 1, 9] )([10, 1, 1]);
    var changeAddressScores = makeNewCategory('Receiving Address Generation & Backup', [7, 7, 6] )([7, 1, 1]);
    var blockchainObserverScores = makeNewCategory('Receiving Address Generation & Backup', [2, 12, 8] )([0, 7, 0]);
    var networkObserverScores = makeNewCategory('Receiving Address Generation & Backup', [11, 8, 6] )([7, 7, 5]);
    var recipientScores = makeNewCategory('Receiving Address Generation & Backup', [6, 6] )([0, 6]);
    
    categoryScores.push( receivingAddressScores );
    categoryScores.push( changeAddressScores );
    categoryScores.push( blockchainObserverScores );
    categoryScores.push( networkObserverScores );
    categoryScores.push( recipientScores );
    
    $scope.categoryScores = categoryScores;
    $scope.categoryTitles = [
        'Receiving Address Generation & Backup',
        'Change Address Generation & Backup',
        'Privacy from Blockchain Observers',
        'Privacy from Network Observers',
        'Privacy for Transaction Recipients'
    ];
});
