class uiPrefab{

    // Para que funcione: 
    //     En el preLoad:
    //     this.load.image('FilledHealth','assets/img/FilledHealth.png');
    //     this.load.image('EmptyHealth','assets/img/EmptyHealth.png');
    //     this.load.image('FilledEnemyHealth','assets/img/FilledEnemyHealth.png');
    //     this.load.image('uiHeart','assets/img/uiHeart.png');
    //     this.load.image('uiP','assets/img/uiP.png');
    //     this.load.image('weaponUi','assets/img/weaponUi.png');
    

    //     Llamar al create

    create(scene){ 
        this.counter=0;  
        this.s = scene; 
        this.startingPlayerX = 43; 
        this.startingPlayerY = 16; 

        this.startingEnemyY = this.startingPlayerY + 9;
        this.xSeparation = 4; 


        
        this.totalScore =0;
        this.playerHealth = 0;
        this.enemyHealth = 0;

        //--SCORE
        this.scoreText = scene.add.text(2, 2, 'SCORE - 000000', 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        this.scoreText.fixedToCamera = true;
        this.scoreText.setScrollFactor(0);


        //--PLAYER HEALTH
        this.playerHealth = scene.add.text(2, 11, 'PLAYER ', 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        this.playerHealth.fixedToCamera = true;
        this.playerHealth.setScrollFactor(0);
        

        //--ENEMY HEALTH
        this.enemyHealth = scene.add.text(2, 20, 'ENEMY ', 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        this.SetEnemyHealthUi(16);
        this.enemyHealth.setScrollFactor(0);

        //--TIME
        this.time = 300;    
        this.timeUi = scene.add.text(100, 2, 'TIME ', 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        this.timeUi.setText('TIME  '+ (this.time));
        this.timeUi.setScrollFactor(0);

        scene.time.addEvent({
            delay:1000,
            callback:this.ReduceTime,
            callbackScope:this,
            repeat:-1
        });

        //--STAGE
        this.stage = 1;    
        this.stageUi = scene.add.text(170, 2, 'STAGE  0'+ (this.stage), 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        }) 
        this.stageUi.setScrollFactor(0);

        //--HEARTS
        this.hearts = 0;
        var heartsImage = this.s.add.sprite(174,17,'uiHeart');
        heartsImage.setScrollFactor(0);

        this.heartsText = scene.add.text(180, 12, '- ' +(this.hearts) , 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        this.heartsText.setScrollFactor(0);

        //--P
        this.P = 0;
        var pImage = this.s.add.sprite(174,26,'uiP');
        pImage.setScrollFactor(0);
        this.pText = scene.add.text(180, 20, '- ' +(this.P) , 
        {fontFamily: 'Arial', 
         fontSize: '9px',   
         color:'#fff'
        })
        this.pText.fixedToCamera = true;
        this.pText.setScrollFactor(0);


        //--WEAPON ->TESTING
        var weaponImage = this.s.add.sprite(128,22,'weaponUi').setScrollFactor(0);
        weaponImage.setScrollFactor(0);
        
        // this.SetHealthUi(5);
        // this.SetEnemyHealthUi(14);
    }

    SetWeaponImage(w) {
        switch (w) {
            case WeaponType.AXE:
                this.s.add.sprite(128,22,'weaponUi').setScrollFactor(0);
                this.s.add.sprite(128, 23, 'axe').setScrollFactor(0);
                break;
            case WeaponType.FIREBOMB:
                this.s.add.sprite(128,22,'weaponUi').setScrollFactor(0);
                this.s.add.sprite(128, 22, 'firebomb').setScrollFactor(0);
                break;
            case WeaponType.DAGGER:
                this.s.add.sprite(128,22,'weaponUi').setScrollFactor(0);
                this.s.add.sprite(128, 22, 'dagger').setScrollFactor(0);
                break;
        }
    }
    //Hearts
    SetHearts(h){
        this.hearts = h;
        this.heartsText.setText('- '+ (h));

    }
    AddHearts(h){
        this.hearts+=h;
        this.heartsText.setText('- '+ (h));
    }
    ReduceHearts(h){
        this.hearts -=h;
        if(this.hearts<0){
            this.hearts = 0;
        }
    }
    GetHearts(){
        return this.hearts;
    }

    //P
    SetP(h){
        this.P = h;
    }
    AddP(h){
        this.P+=h;
    }
    ReduceP(h){
        this.P -=h;
        if(this.P<0){
            this.P = 0;
        }
    }
    GetP(){
        return this.P;
    }


    //Stage
    AddStage(){
        this.stage++
        this.stageUi.setText('STAGE  '+ (this.stage));
    }

    SetStage(s){
        this.stage = s;
        this.stageUi.setText('STAGE  '+ (this.stage));

    }
    //Time
    ReduceTime(){
        this.time--;
        this.timeUi.setText('TIME  '+ (this.time));
        if(this.time<=0){
            this.s.player.Reset();
        }

    }

    //Score
    AddScore(_score){
        this.totalScore += _score;
        if(this.totalScore >= 999999){
            this.totalScore = 999999;
        }
        this.scoreText.setText('SCORE-'+ (this.totalScore));


    }

    //Healths
    SetHealthUi(hp){
        this.playerHealth = hp;
        this.auxPosX = this.startingPlayerX;
        for(this.i = 1; this.i<=16; this.i++){
            if(hp>=this.i){
                var image = this.s.add.sprite(this.auxPosX,this.startingPlayerY,'FilledHealth');
                image.setScrollFactor(0);
                this.auxPosX = this.auxPosX + this.xSeparation;
            }
            else{
                var image = this.s.add.sprite(this.auxPosX,this.startingPlayerY,'EmptyHealth');
                image.setScrollFactor(0);
                this.auxPosX = this.auxPosX + this.xSeparation;
            }
        }
    }
    SetEnemyHealthUi(ehp){
        this.enemyAuxPosX = this.startingPlayerX;
        for(this.e = 1; this.e<=16; this.e++){
            if(ehp>=this.e){
                var image = this.s.add.sprite(this.enemyAuxPosX,this.startingEnemyY,'FilledEnemyHealth');
                image.setScrollFactor(0);
                this.enemyAuxPosX = this.enemyAuxPosX + this.xSeparation;
            }
            else{
                var image = this.s.add.sprite(this.enemyAuxPosX,this.startingEnemyY,'EmptyHealth');
                image.setScrollFactor(0);
                this.enemyAuxPosX = this.enemyAuxPosX + this.xSeparation;
            }
        }
    }

}