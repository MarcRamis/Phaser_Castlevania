class level1 extends Phaser.Scene {
    constructor() {
        super({ key: "level1" });
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
        this.load.image('Level-1_TileSheet', rutaMapSheet + 'Castelvania-Sheet.png');
        this.load.tilemapTiledJSON('level_1', rutaMap + 'Cstelvania_NES_Level-1.json');

        //---------BACKGROUND----------//
        this.cameras.main.setBackgroundColor("#4488AA");

        //---------PLAYER----------//
        this.load.spritesheet('player', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });

        //---------ENEMIES----------//
        //Ghoul
        this.load.spritesheet('enemyGhoul', rutaImg + 'Enemy-Ghoul.png',
            { frameWidth: 16, frameHeight: 32 });
        //Panther
        this.load.spritesheet('enemyPanther', rutaImg + 'Enemy-Panther.png',
            { frameWidth: 32, frameHeight: 16 });
        //Bat
        this.load.spritesheet('bat', rutaImg + 'Enemy-Bat.png',
            { frameWidth: 16, frameHeight: 14 });
        //PhantomBat
        this.load.spritesheet('phantomBat', rutaImg + 'PhantomBat.png',
            { frameWidth: 64, frameHeight: 32 });
        //---------ITEMS----------//
        this.load.image('Lamp', rutaMapSheet + 'Lamp.png');
        this.load.spritesheet('items', rutaImg + 'Items.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lamp', rutaImg + 'lamp.png', { frameWidth: 10, frameHeight: 16 });
        this.load.spritesheet('MagicCrystal', rutaImg + 'MagicCrystal.png', { frameWidth: 16, frameHeight: 16 });

        //---------WEAPONS----------//
        this.load.image('dagger', rutaImgWeapons + 'Dagger.png');
        this.load.image('axe', rutaImgWeapons + 'Axe.png');
        this.load.image('firebomb', rutaImgWeapons + 'FireBomb.png');
        this.load.spritesheet('firebomb_fire', rutaImgWeapons + 'FireBomb_fire.png', { frameWidth: 16, frameHeight: 15 });

        //---------AUDIO----------//
        this.load.audio('ost', rutaSnd + 'ostStage1.mp3');
        this.load.audio('bossOst', rutaSnd + 'boss.mp3');
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

        //PhantomBat
        this.phantomBat = new phantomBatPrefab(this, 2671, 49, 'phantomBat');
        this.spawnMagicCrystalOnce = false;
        
        // Player
        this.player = new playerPrefab(this, 35, 160, 'player');
        this.player.body.setCollideWorldBounds(true);

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
        this.anims.create({
            key: 'magicCrystal',
            frames: this.anims.generateFrameNumbers('MagicCrystal', { start: 0, end: 1 }),
            frameRate: 8,
            repeat: -1

        });
    }
    loadEnemyAnimations() {
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
            key: 'phantomBat-Idle',
            frames: this.anims.generateFrameNumbers('phantomBat', { start: 2, end: 2 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'phantomBat-Fly',
            frames: this.anims.generateFrameNumbers('phantomBat', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });
    }
    loadMap() {
        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('level_1');
        //Cargo los Tilesets
        this.map.addTilesetImage('Lamp');
        this.map.addTilesetImage('Level-1_TileSheet');
        //Pintamos las capas/layers
        this.hud = this.map.createLayer('HUD', 'Level-1_TileSheet');
        this.walls = this.map.createLayer('Ground', 'Level-1_TileSheet');
        this.map.createLayer('BackGround', 'Level-1_TileSheet');
        this.stairsLeft = this.map.createLayer('Stairs-Left', 'Level-1_TileSheet');
        this.stairsRight = this.map.createLayer('Stairs-Right', 'Level-1_TileSheet');
        this.stairsNextScene = this.map.createLayer('Stairs-ChangeScene', 'Level-1_TileSheet');
        this.doors = this.map.createLayer('Door', 'Level-1_TileSheet');

        this.map.setCollisionBetween(1, 77, true, true, 'Ground'); //Indicamos las colisiones con paredes/suelo/techo

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
                            case ('Ghoul'):
                                this.ghoul = new ghoulPrefab(this, enemy.x, enemy.y - 32, 'enemyGhoul', -1);
                                this.enemies.add(this.ghoul);
                                this.ghoul.body.collideWorldBounds = true;
                                break;

                            case ('Panther'):
                                this.panther = new pantherPrefab(this, enemy.x, enemy.y - 32, 'enemyPanther', -1);
                                this.panthers.add(this.panther);
                                this.panther.body.collideWorldBounds = true;
                                break;

                            case ('Bat'):
                                this.bat = new batPrefab(this, enemy.x, enemy.y - 32, 'bat', -1);
                                this.bats.add(this.bat);

                                this.bat.body.allowGravity = false;
                                this.bat.body.collideWorldBounds = true;
                                break;
                        }
                    });
                    break;
            }
        });
    }
    loadSounds() {
        this.ost = this.sound.add('ost');
        this.ost.loop = true;
        this.ost.play();

        this.bossOst = this.sound.add('bossOst');

        this.hit = this.sound.add('hit');
        this.takeItem = this.sound.add('takeItem');
        this.crystalFire = this.sound.add('crystalFire');
    }
    setCamera() {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, gamePrefs.gameWidth, gamePrefs.gameHeight);
    }
    setCollisions() {

        // World size
        this.physics.world.setBounds(0, 0, gamePrefs.gameWidth, gamePrefs.gameHeight);

        // Player with ground
        this.physics.add.collider(this.player, this.walls);

        // Enemies with player & ground
        this.enemies.children.iterate(enemy => {
            this.physics.add.collider(enemy, this.walls);

            this.physics.add.overlap(enemy, this.player, this.playerTakeDamage, null, this);
            this.physics.add.overlap(enemy, this.player.chain, this.enemyTakeDamage, mainCharacterPrefs.isAttacking, this);
        });
        this.panthers.children.iterate(panther => {
            this.physics.add.collider(panther, this.walls);

            this.physics.add.overlap(panther, this.player, this.playerTakeDamage, null, this);
            this.physics.add.overlap(panther, this.player.chain, this.enemyTakeDamage, mainCharacterPrefs.isAttacking, this);
        });
        this.bats.children.iterate(bat => {

            this.physics.add.overlap(bat, this.player, this.playerTakeDamage, null, this);
            this.physics.add.overlap(bat, this.player.chain, this.enemyTakeDamage, mainCharacterPrefs.isAttacking, this);
        });
        this.lamps.children.iterate(lamp => {
            this.physics.add.overlap(lamp, this.player.chain, this.destroyLamp, mainCharacterPrefs.isAttacking, this);
        });

        // Weapons Group with enemies
        this.physics.add.overlap(this.enemies, this.weapons, this.enemyTakeDamage, null, this);
        this.physics.add.overlap(this.bats, this.weapons, this.enemyTakeDamage, null, this);
        this.physics.add.overlap(this.panthers, this.weapons, this.enemyTakeDamage, null, this);

        // Phantom Bat with player & weapons
        this.physics.add.overlap(this.phantomBat, this.player, this.playerTakeDamageFromBoss, null, this);
        this.physics.add.overlap(this.phantomBat, this.player.chain, this.enemyBossTakeDamageFromChain, null, this);
        this.physics.add.overlap(this.phantomBat, this.weapons, this.enemyBossTakeDamageFromWeapon, null, this);
    }
    loadPools() {
        this.weapons = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.panthers = this.physics.add.group();
        this.bats = this.physics.add.group();
        this.lamps = this.physics.add.group();
    }
    update() {

        this.player.Update();

        this.bats.children.iterate(bat => {
            bat.Update(new Phaser.Math.Vector2(this.player.x, this.player.y));
        });
        this.enemies.children.iterate(enemy => {
            enemy.GetPlayerDistance(new Phaser.Math.Vector2(this.player.x, this.player.y));
        });
        this.panthers.children.iterate(panther => {
            panther.GetPlayerDistance(new Phaser.Math.Vector2(this.player.x, this.player.y));
        });

        // Start boss fight
        if (this.player.x > 2666) {
            this.waitTimer = this.time.addEvent
                (
                    {
                        delay: 2000, //ms
                        callback: function() {
                            if (!gamePrefs.bossFinalEvent) {
                                gamePrefs.bossFinalEvent = true;
                                this.EventBossFinal();
                            }
                        },
                        callbackScope: this,
                        repeat: 0
                    }
                );
            
        }
        if (gamePrefs.bossFinalEvent)
        {
            if (gamePrefs.bossHealth <= 0)
            {
                if(!this.spawnMagicCrystalOnce)
                {
                    this.spawnMagicCrystalOnce = true;
                    this.magicCrystal = new magicCrystalPrefab(this, 2671, 100);
                    this.physics.add.collider(this.magicCrystal, this.walls);
                    this.physics.add.overlap(this.magicCrystal, this.player, this.Reset, null, this);
                    this.phantomBat.DieEvent();
                }
                
            }
            else
            {
                this.phantomBat.Update();
            }
        }
    }

    changeScene() {
        this.scene.start('level1Water');
    }
    destroyLamp(_lamp, _chain) {
        _lamp.Destroy();
    }
    enemyTakeDamage(_enemy, _chain) {
        _enemy.TakeDamage();
    }
    playerTakeDamage(_enemy, _player) {
        _player.TakeDamage(1);
    }
    playerTakeDamageFromBoss(_enemy, _player) {
        _player.TakeDamage(2);
    }
    enemyBossTakeDamageFromChain(_phantomBat, _chain) {

        if (this.phantomBat.currentState == EMachineState.FIGHT) {

            this.phantomBat.TakeDamage(1);
        }
    }
    enemyBossTakeDamageFromWeapon(_phantomBat, _chain) {

        if (this.phantomBat.currentState == EMachineState.FIGHT) {

            this.phantomBat.TakeDamage(2);
        }
    }

    EventBossFinal() {

        // Set bounds size to the main fight
        this.physics.world.setBounds(2592, 0, gamePrefs.playerWidth, gamePrefs.gameHeight);
        this.cameras.main.setBounds(2592, 0, gamePrefs.playerWidth, gamePrefs.gameHeight);

        // Kill enemies because they TP to the boss fight (for bounds size) 
        this.enemies.clear(true, true);
        this.panthers.clear(true, true);
        this.bats.clear(true, true);

        // Start Boss Fight Music
        this.ost.stop();
        this.bossOst.loop = true;
        this.bossOst.play();

        // Start phantom fight
        this.phantomBat.currentState = EMachineState.FIGHT;
    }

    Reset()
    {
        this.player.Reset();
    }
}
