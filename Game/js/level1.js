class level1 extends Phaser.Scene{
    constructor(){
        super({key:"level1"});
    }
    preload(){
        //this.load.setPath("assets/sprites/");
        //---------MAP----------//
        var rutaMapSheet = "assets/map/Sprite-Sheets/";
        this.load.image('Level-1_TileSheet', rutaMapSheet + 'Castelvania-Sheet.png');
        this.load.image('Lamp', rutaMapSheet + 'Lamp.png');

        var rutaMap = "assets/map/";
        this.load.tilemapTiledJSON('level_1', rutaMap + 'Cstelvania_NES_Level-1.json');

        //---------BACKGROUND----------//
        this.cameras.main.setBackgroundColor("#4488AA");
        var rutaImg = 'assets/img/';
        var rutaImgWeapons = 'assets/img/weapons/';
        var rutaSnd = 'assets/snd/';

        this.load.spritesheet('player', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });

        //---------ENEMIES----------//

        //---------ITEMS----------//
        this.load.spritesheet('items', rutaImg + 'Items.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lamp',rutaImg+'lamp.png',{frameWidth:10, frameHeight:16});
        
        //---------WEAPONS----------//
        //this.load.image('morningStar', rutaImgWeapons + 'MorningStar.png');
        this.load.image('axe', rutaImgWeapons + 'Axe.png');
        this.load.image('firebomb', rutaImgWeapons + 'FireBomb.png');
        this.load.spritesheet('firebomb_fire', rutaImgWeapons + 'FireBomb_fire.png', { frameWidth: 16, frameHeight: 15 });

        //---------AUDIO----------//

    }
    create(){
        //Pintamos el nivel
        //Parse the file
        this.levelData = this.cache.json.get('lamps');
        //console.log(this.levelData);
        //console.log(this.levelData.layers[0]);
        /*this.levelData.layers.forEach(layerData => {
            if(layerData.name == "Lamps-Obj")
            {
                console.log("Entro");
            }
        });*/
        //Cargo el JSON
        this.map = this.add.tilemap('level_1');
        
        //Cargo los Tilesets
        this.map.addTilesetImage('Lamp');
        this.map.addTilesetImage('Level-1_TileSheet');
        //Pintamos las capas/layers
        this.walls = this.map.createLayer('Ground','Level-1_TileSheet');
        this.map.createLayer('BackGround','Level-1_TileSheet');
        this.stairs = this.map.createLayer('Stairs','Level-1_TileSheet');
        this.stairsNextScene = this.map.createLayer('Stairs-ChangeScene','Level-1_TileSheet');
        this.doors = this.map.createLayer('Door','Level-1_TileSheet');
        this.map.createLayer('Lamps','Lamp');

        //Indicamos las colisiones con paredes/suelo/techo
        this.map.setCollisionBetween(1,11,true,true,'Ground');

        //Player
        this.loadPlayerAnimations();
        this.loadWeaponAnimations();
        this.loadItemsSheet();
        
        //Creamos todas las lamparas del nivel
        this.map.objects.forEach(layerData => {
            //console.log(layerData.name);
            if(layerData.name == 'Lamps-Obj')
            {
                //console.log(layerData.objects);
                layerData.objects.forEach(lamp => {
                    this.lamp = new lampPrefab(this,lamp.x + 8,lamp.y - 8,'lamp'); //Aqui se suman valores cambiarlo en el prefab directamente
                });
            }
        });

        this.morningStar = new morningStarPrefab(this, 50, 100);
        this.player = new playerPrefab(this, 50, 100, 'player');
        
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
    setCollisions() {
        this.physics.add.overlap
            (
                this.player,
                this.morningStar,
                this.morningStar.playerCollided,
                null,
                this
            );
    }

    update(){
        this.player.Update();
    }
}
