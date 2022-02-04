(function() {
    // 地图矩阵
    window.Map = function() {
        this.mapCode = [
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,1,2,3,4,5,6,7,0,0],
            [9,9,9,9,9,9,9,9,9,9,9,9]
        ]
    }
    Map.prototype.render = function() {
        for (var i = 0; i < 20; i++){
            for (var j = 0; j < 12; j++){
                if(this.mapCode[i][j] != 0){
                    game.setColor(i,j,this.mapCode[i][j])
                }
            }
        }
    }
    Map.prototype.checkRemove = function() {
        for(var i = 0; i < 20; i++){
            if(this.mapCode[i].indexOf(0) == -1) {
                this.mapCode.splice(i,1);
                this.mapCode.unshift([0,0,0,0,0,0,0,0,0,0,0,0]);

                if(game.during <= 30 && game.during >=21){
                    game.score += 50;
                }else if (game.during < 21 && game.during >=12){
                    game.score += 100
                }else if (game.during < 12 && game.during >=3){
                    game.score += 500
                }
                document.getElementById("score").innerHTML = "分数："+game.score;
                if (game.score % 100 == 0 && game.during > 3){
                    game.during -= 3;
                }
            }
        }
    }
})()