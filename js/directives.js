//显示图片
minesweeper.directive("mineGrid", function(){
    return {
        restrict:'E',
        replace:false,
        templateUrl:'../templates/mineGrid.html'
    }
});

//右击事件
minesweeper.directive("ngRightClick", function($parse){
    return function(scope, element, attrs){
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event){
            scope.$apply(function(){
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    }
});