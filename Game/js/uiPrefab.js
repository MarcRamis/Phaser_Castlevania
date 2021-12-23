class uiPrefab{
    create(scene){
        this.totalScore =0;

        //--SCORE
        this.scoreText = scene.add.text(2, 2, 'SCORE - 000000', 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        .setOrigin(0,0);
        //--PLAYER HEALTH
        this.player = scene.add.text(2, 11, 'PLAYER ', 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        //--ENEMY HEALTH
        this.player = scene.add.text(2, 20, 'ENEMY ', 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
    }

    addScore(_score){
        this.totalScore += _score;
        if(this.totalScore >= 999999){
            this.totalScore = 999999;
        }
        this.scoreText.setText('SCORE-'+ (this.totalScore));

    }

}