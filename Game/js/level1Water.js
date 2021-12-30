class level1Water extends Phaser.Scene {
    constructor() {
        super({ key: "level1Water" });
    }
    preload() {
        //---------PATHS----------//
        var rutaMap = "assets/map/";
        var rutaImg = 'assets/img/';
        var rutaImgWeapons = 'assets/img/weapons/';
        var rutaSnd = 'assets/snd/';
        var rutaSndEffect = 'assets/snd/effects/';

        //---------HUD----------//
        this.load.image('FilledHealth', 'assets/img/FilledHealth.png');
        this.load.image('EmptyHealth', 'assets/img/EmptyHealth.png');
        this.load.image('FilledEnemyHealth', 'assets/img/FilledEnemyHealth.png');
        this.load.image('uiHeart', 'assets/img/uiHeart.png');
        this.load.image('uiP', 'assets/img/uiP.png');
        this.load.image('weaponUi', 'assets/img/weaponUi.png');

        //---------MAP----------//
        var rutaMapSheet = "assets/map/Sprite-Sheets/";
        this.load.image('Castelvania-Sheet-Water', rutaMapSheet + 'Castelvania-Sheet-Water.png');
        this.load.tilemapTiledJSON('level_1Water', rutaMap + 'Castelvania_NES_Level-1_Water.json');

        //---------BACKGROUND----------//
        this.cameras.main.setBackgroundColor("#4488AA");

        //---------PLAYER----------//
        this.load.spritesheet('player', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });

        //---------ENEMIES----------//
        //FishMan
        this.load.spritesheet('fishMan', rutaImg + 'Enemy-FishMan.png', { frameWidth: 16, frameHeight: 31 });

        this.load.image('shoot', rutaImg + 'Shoot.png');

        //---------ITEMS----------//
        this.load.image('Lamp', rutaMapSheet + 'Lamp.png');
        this.load.spritesheet('items', rutaImg + 'Items.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lamp', rutaImg + 'lamp.png', { frameWidth: 10, frameHeight: 16 });

        //---------WEAPONS----------//
        this.load.image('dagger', rutaImgWeapons + 'Dagger.png');
        this.load.image('axe', rutaImgWeapons + 'Axe.png');
        this.load.image('firebomb', rutaImgWeapons + 'FireBomb.png');
        this.load.spritesheet('firebomb_fire', rutaImgWeapons + 'FireBomb_fire.png', { frameWidth: 16, frameHeight: 15 });

        //---------AUDIO----------//
        this.load.audio('ost', rutaSnd + 'ost.mp3');
        this.load.audio('hit', rutaSndEffect + 'hit.wav');
        this.load.audio('takeItem', rutaSndEffect + 'takeItem.wav');
        this.load.audio('crystalFire', rutaSndEffect + 'crystal.wav');
    }
    create() {

        // Animations
        this.loadPlayerAnimations();
        this.loadWeaponAnimations();
        this.loadItemsSheet();
        this.loadEnemyAnimations();

        // Sounds
        this.loadSounds();

        // Pools
        this.loadPools();

        // Map
        this.loadMap();

        // Player
        this.player = new playerPrefab(this, 50, 50, 'player');

        // Utility
        this.setCamera();
        this.setCollisions();

        // Hud
        this.ui = new uiPrefab();
        this.ui.create(this);
        this.ui.SetHealthUi(mainCharacterPrefs.health);
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
    loadEnemyAnimations() {
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
        this.physics.world.setBounds(0, 0, gamePrefs.gameWidth / 5.5, gamePrefs.gameHeight);

        this.map.setCollisionBetween(1, 77, true, true, 'Ground'); //Indicamos las colisiones con paredes/suelo/techo
        this.physics.add.collider(this.player, this.walls); // Ahora con el player

        this.map.setCollisionBetween(1, 77, true, true, 'Water'); //Indicamos las colisiones con el agua
        this.physics.add.collider(this.player, this.water, function () { mainCharacterPrefs.health = 0; });

        this.lamps.children.iterate(lamp => {
            this.physics.add.overlap(lamp, this.player.chain, this.destroyLamp, mainCharacterPrefs.isAttacking, this);
        });

        this.enemies.children.iterate(enemy => {
            this.physics.add.overlap(enemy, this.player, this.playerTakeDamage, null, this);
            this.physics.add.overlap(enemy, this.player.chain, this.enemyTakeDamage, mainCharacterPrefs.isAttacking, this);
        });
        this.physics.add.overlap
        (
            this.enemies,
            this.weapons,
            this.enemyTakeDamage,
            null,
            this
        );
    }
    loadMap() {
        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('level_1Water');
        //Cargo los Tilesets
        this.map.addTilesetImage('Lamp');
        this.map.addTilesetImage('Castelvania-Sheet-Water');
        //Pintamos las capas/layers
        this.hud = this.map.createLayer('HUD', 'Castelvania-Sheet-Water');
        this.walls = this.map.createLayer('Ground', 'Castelvania-Sheet-Water');
        this.map.createLayer('BackGround', 'Castelvania-Sheet-Water');
        this.stairs = this.map.createLayer('Stairs', 'Castelvania-Sheet-Water');
        this.stairsNextScene = this.map.createLayer('Stairs-ChangeLevel', 'Castelvania-Sheet-Water');

        // Leemos toda la información de las lámparas y enemigos en el mapa
        this.map.objects.forEach(layerData => {
            switch (layerData.name) {
                case ('Lamps-Obj'):
                    layerData.objects.forEach(lamp => {
                        this.lamp = new lampPrefab(this, lamp.x + 8, lamp.y - 8, 'lamp'); //Aqui se suman valores cambiarlo en el prefab directamente
                        this.lamps.add(this.lamp);
                        this.lamp.body.allowGravity = false;
                    });
                    break;
                case ('Enemies'):
                    layerData.objects.forEach(enemy => {
                        switch (enemy.properties[0].value) {
                            case ('Fishman'):
                                this.fishMan = new fishMan(this, enemy.x, enemy.y, 'fishMan', -1);
                                this.enemies.add(this.fishMan);
                                this.fishMan.body.collideWorldBounds = true;
                                this.fishMan.body.setGravity(0, -1000);
                                break;
                        }
                    });
                    break;
            }
        });

        this.water = this.map.createLayer('Water', 'Castelvania-Sheet-Water');
    }
    loadSounds() {
        this.ost = this.sound.add('ost');
        this.ost.loop = true;
        this.ost.play();

        this.hit = this.sound.add('hit');
        this.takeItem = this.sound.add('takeItem');
        this.crystalFire = this.sound.add('crystalFire');
    }
    setCamera() {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gamePrefs.gameWidth / 5.5, gamePrefs.gameHeight);
    }

    loadPools() {
        this.weapons = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.lamps = this.physics.add.group();
    }
    update() {
        this.player.Update();

        this.enemies.children.iterate(enemy => {
            enemy.Update(new Phaser.Math.Vector2(this.player.x, this.player.y));
        });
    }
    destroyLamp(_lamp, _chain) {
        _lamp.Destroy();
    }
    killPlayer(_player, _water) {
        mainCharacterPrefs.health = 0;
    }
    changeScene() {
        this.scene.start('level1');
    }
    enemyTakeDamage(_enemy, _chain) {
        _enemy.TakeDamage();
    }
    playerTakeDamage(_enemy, _player) {
        _player.TakeDamage();
    }
}