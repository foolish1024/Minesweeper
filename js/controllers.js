minesweeper.controller("MinesweeperController", function($scope, mineFieldService){
    $scope.minefield = mineFieldService.createMinefield();
    $scope.isWinMsgVisible = false;
    $scope.isLostMsgVisible = false;
    
    $scope.uncoverSpot = function(spot){
        if($scope.isWinMsgVisible || $scope.isLostMsgVisible){
            return;
        }
        spot.isCovered = false;
        mineFieldService.uncoverEmptySpot($scope.minefield, spot);
        if(spot.content == "mine"){
            $scope.isLostMsgVisible = true;
        } else {
            if(mineFieldService.hasWon($scope.minefield)){
                $scope.isWinMsgVisible = true;
            }
        }
    }
    
    //响应右击事件
    $scope.setFlag = function(spot){
        if(spot.flag == "none"){
            spot.flag = "mine";
        } else if(spot.flag == "mine"){
            spot.flag = "suspect";
        } else{
            spot.flag = "none";
        }
    }
    
    //重新开始
    $scope.restart = function(){
        $scope.minefield = mineFieldService.createMinefield();
        $scope.isWinMsgVisible = false;
        $scope.isLostMsgVisible = false;
    }
});