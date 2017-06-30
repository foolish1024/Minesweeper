minesweeper.service("mineFieldService", function(){
    this.createMinefield = function(){
        var minefield = {};
        minefield.rows = [];
        for(var i=0;i<9;i++){
            var row = {};
            row.spots = [];
            for(var j=0;j<9;j++){
                var spot = {};
                spot.isCovered = true;
                spot.content = "empty";
                spot.flag = "none";
                spot.x = i;
                spot.y = j;
                row.spots.push(spot);
            }
            minefield.rows.push(row);
        }
        this.placeManyRandonMines(minefield);
        this.calculateAllNumbers(minefield);
        return minefield;
    }
    
    this.placeManyRandonMines = function(minefield){
        for(var i=0;i<10;i++){
            this.placeRandomMine(minefield);
        }
    }
    
    //随机生成地雷
    this.placeRandomMine = function(minefield){
        var row = Math.round(Math.random()*8);
        var col = Math.round(Math.random()*8);
        var spot = this.getSpot(minefield, row, col);
        spot.content = "mine";
    }
    
    this.getSpot = function(minefield, row, col){
        return minefield.rows[row].spots[col];
    }
    
    this.calculateAllNumbers = function(minefield){
        for(var x=0;x<9;x++){
            for(var y=0;y<9;y++){
                this.calculateNumber(minefield, x, y);
            }
        }
    }
    
    //方格中的数字
    this.calculateNumber = function(minefield, row, col){
        var thisSpot = this.getSpot(minefield, row, col);
        if(thisSpot.content == "mine"){
            return;
        }
        
        var mineCount = 0;
        if(row>0){
            //左上
            if(col>0){
                var spot = this.getSpot(minefield, row-1, col-1);
                if(spot.content == "mine"){
                    mineCount++;
                }
            }
            //正上
            var spot = this.getSpot(minefield, row-1, col);
            if(spot.content == "mine"){
                mineCount++;
            }
            //右上
            if(col<8){
                var spot = this.getSpot(minefield, row-1, col+1);
                if(spot.content == "mine"){
                    mineCount++;
                }
            }
        }
        //左侧
        if(col>0){
            var spot = this.getSpot(minefield, row, col-1);
            if(spot.content == "mine"){
                mineCount++;
            }
        }
        //右侧
        if(col<8){
            var spot = this.getSpot(minefield, row, col+1);
            if(spot.content == "mine"){
                mineCount++;
            }
        }
        if(row<8){
            //左下
            if(col>0){
                var spot = this.getSpot(minefield, row+1, col-1);
                if(spot.content == "mine"){
                    mineCount++;
                }
            }
            //正下
            var spot = this.getSpot(minefield, row+1, col);
            if(spot.content == "mine"){
                mineCount++;
            }
            //右下
            if(col<8){
                var spot = this.getSpot(minefield, row+1, col+1);
                if(spot.content == "mine"){
                    mineCount++;
                }
            }
        }
        
        if(mineCount>0){
            thisSpot.content = mineCount;
        }
    }
    
    //游戏胜利检测
    this.hasWon = function(minefield){
        for(var x=0;x<9;x++){
            for(var y=0;y<9;y++){
                var spot = this.getSpot(minefield, x, y);
                if(spot.isCovered && spot.content != "mine"){
                    return false;
                }
            }
        }
        return true;
    }
    
    //如果为空，自动翻开相邻为空的方格
    this.uncoverEmptySpot = function(minefield, spot){
        var x = spot.x;
        var y = spot.y;
        spot.isCovered = false;
        if(spot.content == "empty"){
            if(x-1>=0){
                var spot = this.getSpot(minefield, x-1, y);
                if(spot.isCovered == true){
                    this.uncoverEmptySpot(minefield, spot);
                }
            }
            if(x+1<=9){
                var spot = this.getSpot(minefield, x+1, y);
                if(spot.isCovered == true){
                    this.uncoverEmptySpot(minefield, spot);
                }
            }
            if(y-1>=0){
                var spot = this.getSpot(minefield, x, y-1);
                if(spot.isCovered == true){
                    this.uncoverEmptySpot(minefield, spot);
                }
            }
            if(y+1>=0){
                var spot = this.getSpot(minefield, x, y+1);
                if(spot.isCovered == true){
                    this.uncoverEmptySpot(minefield, spot);
                }
            }
        }
    }
});