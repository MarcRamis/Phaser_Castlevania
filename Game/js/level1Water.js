class level1Water extends Phaser.Scene{
    constructor(){
        super({key:"level1Water"});
    }
    preload(){
        //---------PATHS----------//
        var rutaMap = "assets/map/";
        var rutaImg = 'assets/img/';
        var rutaImgWeapons = 'assets/img/weapons/';
        var rutaSnd = 'assets/snd/';

        //---------MAP----------//
        var rutaMapSheet = "assets/map/Sprite-Sheets/";
        this.load.image('Castelvania-Sheet-Water', rutaMapSheet + 'Castelvania-Sheet-Water.png');
        this.load.tilemapTiledJSON('level_1Water', rutaMap + 'Castelvania_NES_Level-1_Water.json');
        
        //---------BACKGROUND----------//
        this.cameras.main.setBackgroundColor("#4488AA");
        
        //---------PLAYER----------//
        this.load.spritesheet('player', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });

        //---------ENEMIES----------//
        //Ghoul
        this.load.spritesheet('enemyGhoul',rutaImg+'Enemy-Ghoul.png',
        {frameWidth: 16, frameHeight: 32});
        //Panther
        this.load.spritesheet('enemyPanther',rutaImg+'Enemy-Panther.png',
        {frameWidth: 32, frameHeight: 16});
        //Bat
        this.load.spritesheet('bat',rutaImg+'Enemy-Bat.png',
        {frameWidth: 16, frameHeight: 14});
        //FishMan
        this.load.spritesheet('fishMan',rutaImg+'Enemy-FishMan.png',{frameWidth:16, frameHeight:31});

        this.load.image('shoot', rutaImg+'Shoot.png');

        //---------ITEMS----------//
        this.load.image('Lamp', rutaMapSheet + 'Lamp.png');
        this.load.spritesheet('items', rutaImg + 'Items.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lamp',rutaImg+'lamp.png',{frameWidth:10, frameHeight:16});
        
        //---------WEAPONS----------//
        this.load.image('dagger', rutaImgWeapons + 'Dagger.png');
        this.load.image('axe', rutaImgWeapons + 'Axe.png');
        this.load.image('firebomb', rutaImgWeapons + 'FireBomb.png');
        this.load.spritesheet('firebomb_fire', rutaImgWeapons + 'FireBomb_fire.png', { frameWidth: 16, frameHeight: 15 });

        //---------AUDIO----------//
    }
    create(){
        
        // Animations
        this.loadPlayerAnimations();
        this.loadWeaponAnimations();
        this.loadItemsSheet();
        this.loadEnemyAnimations();

        // Pools
        this.loadPools();
        // Map
        this.loadMap();       

        // Player
        this.player = new playerPrefab(this, 50, 100, 'player');
        
        // Utility
        this.setCamera();
        this.setCollisions();
    }

    loadPlayerAnimations() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'normal_attack',
            frames: this.anims.generateFrameNumbers('player', { frames: [12, 13, 14] }),
            frameRate: mainCharacterPrefs.frameRateAttack,
            repeat: 0
        })
        this.anims.create({
            key: 'normal_large_attack',
            frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8] }),
            frameRate: mainCharacterPrefs.frameRateAttack,
            repeat: 0
        })
        this.anims.create({
            key: 'special_attack',
            frames: this.anims.generateFrameNumbers('player', { frames: [9, 10, 11] }),
            frameRate: mainCharacterPrefs.frameRateAttack,
            repeat: 0
        })
        this.anims.create({
            key: 'crouch_attack',
            frames: this.anims.generateFrameNumbers('player', { frames: [15, 16, 17] }),
            frameRate: mainCharacterPrefs.frameRateAttack,
            repeat: 0
        })
        this.anims.create({
            key: 'crouch_large_attack',
            frames: this.anims.generateFrameNumbers('player', { frames: [18, 19, 20] }),
            frameRate: mainCharacterPrefs.frameRateAttack,
            repeat: 0
        })
    }
    loadWeaponAnimations() {
        this.anims.create({
            key: 'fireAnim',
            frames: this.anims.generateFrameNumbers('firebomb_fire', { frames: [0, 1, 2, 3, 4] }),
            frameRate: 4,
            repeat: 0
        })
    }
    loadItemsSheet() {
        this.anims.create({
            key: 'Little-Heart',
            frames: this.anims.generateFrameNumbers('items', { frames: [0] }),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'Heart',
            frames: this.anims.generateFrameNumbers('items', { frames: [1] }),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'MorningStar',
            frames: this.anims.generateFrameNumbers('items', { frames: [2] }),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'lampIdle',
            frames: this.anims.generateFrameNumbers('lamp', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1

        });
        this.anims.create({
            key: 'lampDestroy',
            frames: this.anims.generateFrameNumbers('lamp', { start: 2, end: 5 }),
            frameRate: 8,
            repeat: 0

        });
    }
    loadEnemyAnimations()
    {
        //Ghoul-Anim
        this.anims.create({
            key: 'ghoulWalk-Left',
            frames: this.anims.generateFrameNumbers('enemyGhoul', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ghoulWalk-Right',
            frames: this.anims.generateFrameNumbers('enemyGhoul', { start: 2, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        //Panther-Anim
        this.anims.create({
            key: 'pantherWalk-Left',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherWalk-Right',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 6, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherJump-Left',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 2, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherJump-Right',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 5, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherIdle-Left',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 3, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherIdle-Right',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 4, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'batWalk-Right',
            frames: this.anims.generateFrameNumbers('bat', { start: 3, end: 5 }),
            frameRate: 7,
            repeat: -1
        });  
        this.anims.create({
            key: 'batWalk-Left',
            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 2 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'fishmanWalk-Right',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 3, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'fishmanWalk-Left',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 2, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'fishmanJump',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 3, end: 3 }),

        });
        this.anims.create({
            key: 'fishmanShoot-Right',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 5, end: 5 }),

        });
        this.anims.create({
            key: 'fishmanShoot-Left',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 0, end: 0 }),

        });   
    }
    setCollisions() {
        this.map.setCollisionBetween(1,77,true,true,'Ground'); //Indicamos las colisiones con paredes/suelo/techo
        this.physics.add.collider(this.player, this.walls); // Ahora con el player
        // this.physics.add.overlap
        //     (
        //         this.player,
        //         this.morningStar,
        //         this.morningStar.playerCollided,
        //         null,
        //         this
        //     );
    }
    loadMap()
    {
        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('level_1Water');
        //Cargo los Tilesets
        this.map.addTilesetImage('Lamp');
        this.map.addTilesetImage('Castelvania-Sheet-Water');
        //Pintamos las capas/layers
        this.hud = this.map.createLayer('HUD','Castelvania-Sheet-Water');
        this.walls = this.map.createLayer('Ground','Castelvania-Sheet-Water');
        this.map.createLayer('BackGround','Castelvania-Sheet-Water');
        this.stairs = this.map.createLayer('Stairs','Castelvania-Sheet-Water');
        this.stairsNextScene = this.map.createLayer('Stairs-ChangeLevel','Castelvania-Sheet-Water');

        // Leemos toda la información de las lámparas y enemigos en el mapa
        this.map.objects.forEach(layerData => {
            switch(layerData.name)
            {
                case('Lamps-Obj'):
                layerData.objects.forEach(lamp => {
                    this.lamp = new lampPrefab(this,lamp.x + 8,lamp.y - 8,'lamp'); //Aqui se suman valores cambiarlo en el prefab directamente
                    this.lamps.add(this.lamp);  
                    this.lamp.body.allowGravity = false;
                });
                break;
                case('Enemies'):
                layerData.objects.forEach(enemy => {
                    switch(enemy.properties[0].value)
                    {
                        case('Ghoul'):
                        this.ghoul = new ghoulPrefab(this, enemy.x, enemy.y-64, 'enemyGhoul', 1);
                        this.enemies.add(this.ghoul);
                        this.ghoul.body.collideWorldBounds = true;
                        break;

                        case('Panther'):
                        this.panther = new pantherPrefab(this, enemy.x, enemy.y-64, 'enemyPanther', -1);
                        this.panthers.add(this.panther);
                        this.panther.body.collideWorldBounds = true;
                        break;

                        case('Bat'):
                        this.bat = new batPrefab(this, enemy.x, enemy.y, 'bat', -1);
                        this.bats.add(this.bat);
                        this.bat.body.collideWorldBounds = true;
                        this.bat.Move(-1);
                        this.bat.body.setGravity(0,-1000);
                        break;
                    }
                });
                break; 
            }
        });
    }
    setCamera()
    {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gamePrefs.gameWidth, gamePrefs.gameHeight);
    }

    loadPools()
    {
        this.enemies = this.physics.add.group();
        this.panthers = this.physics.add.group();
        this.bats = this.physics.add.group();
        this.lamps = this.physics.add.group();
    }
    update(){
        this.player.Update();
    }
}