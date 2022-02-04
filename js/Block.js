(function() {
    window.Block = function() {
        // 得到随机的方块
        // 罗列所有的类型
        var allType = ["S","T","O","L","J","I","Z"];
        // 从所有的类型中随机得到一种类型
        this.type = allType[parseInt(Math.random() * allType.length)];
        // 该类型有几种状态
        this.allDir = fangkuai[this.type].length;
        // 随机获取其中一种状态
        this.dir = parseInt(Math.random() * this.allDir);
        this.code = fangkuai[this.type][this.dir];
        this.row = 0;
        this.col = 4;
    }
    Block.prototype.render = function() {
        // 渲染四行四列的方块
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(this.code[i][j] != 0){
                    game.setColor(i + this.row,j + this.col,game.block.code[i][j]);
                }
                if(game.nextBlock.code[i][j] != 0){
                    game.setNextColor(i,j,game.nextBlock.code[i][j]);
                }
            }
        }
    }
    Block.prototype.check = function(row,col) {
        // 判断停止
        for(var i = 0; i < 4; i++) {
            for(var j = 0; j < 4; j++){
                if(this.code[i][j] != 0 && game.map.mapCode[i+row][j+col] != 0) {
                    return false;
                }
            }
        }
        return true; 
    }
    Block.prototype.checkDown = function() {
        // 预判断
        if (this.check(this.row+1,this.col)){
            this.row++;
        } else {
            // 下落到底的状态，渲染新的方法
            game.block = game.nextBlock;
            game.nextBlock = new Block();
            // 方块到底了，渲染到地图上
            this.renderMap();
            // 判断是否可以消行
            game.map.checkRemove();
            // 判读时候游戏结束
            this.checkOver();
        }
    }
    Block.prototype.checkLeft = function() {
        if(this.check(this.row,this.col - 1)){
            this.col --;
        }
    }
    Block.prototype.checkRight = function() {
        if(this.check(this.row,this.col + 1)){
            this.col ++;
        }
    }
    Block.prototype.checkEnd = function() {
        while(this.check(this.row+1,this.col)){
            this.row++;
        }
    }
    // 方块旋转
    Block.prototype.checkRot = function() {
        // 存储旧的形态
        this.oldDir = this.dir;
        this.dir++;
        if(this.dir > this.allDir - 1){
            this.dir = 0;
        }
        this.code = fangkuai[this.type][this.dir];
        // 若改变形态会影响地图，则不改变      
        if(!this.check(this.row,this.col)){
            this.dir = this.oldDir;
            this.code = fangkuai[this.type][this.dir];
        }
    }
    Block.prototype.renderMap = function() {
        for (var i = 0; i < 4; i++){
            for (var j = 0; j < 4; j++){
                if(this.code[i][j] != 0){
                    game.map.mapCode[i+this.row][j+this.col] = this.code[i][j];
                }
            }
        }
    }
    Block.prototype.checkOver = function() {
        for(var i = 0; i < game.col; i++) {
            if(game.map.mapCode[0][i] != 0){
                clearInterval(game.timer);
                alert("游戏结束！您当前的得分为："+ game.score);
            }
        }
    }
})()