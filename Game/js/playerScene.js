class playerScene extends Phaser.Scene {
    constructor() { //crea la escena
        super(
            {
                key: "playerScene"
            });
    }
    preload() { //carga los assets en memoria
        this.cameras.main.setBackgroundColor("#4488AA");
        var rutaImg = 'assets/img/';
        var rutaImgWeapons = 'assets/img/weapons/';
        var rutaSnd = 'assets/snd/';

        this.load.spritesheet('player', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });

        //---------ENEMIES----------//

        //---------ITEMS----------//
        this.load.spritesheet('items', rutaImg + 'Items.png', { frameWidth: 16, frameHeight: 16 });

        //---------WEAPONS----------//
        //this.load.image('morningStar', rutaImgWeapons + 'MorningStar.png');
        this.load.image('axe', rutaImgWeapons + 'Axe.png');
        this.load.image('firebomb', rutaImgWeapons + 'FireBomb.png');
        this.load.image('dagger', rutaImgWeapons + 'Dagger.png');
        this.load.spritesheet('firebomb_fire', rutaImgWeapons + 'FireBomb_fire.png', { frameWidth: 16, frameHeight: 15 });

        //---------AUDIO----------//
    }
    create() { //carga los assets en pantalla desde memoria
        this.loadPlayerAnimations();
        this.loadWeaponAnimations();
        this.loadItemsSheet();
        
        this.morningStar = new morningStarPrefab(this, 50, 100);
        this.player = new playerPrefab(this, config.scale.width / 2, config.scale.height, 'player');
        
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
    update() { //actualiza assets

        this.player.Update();
    }
}