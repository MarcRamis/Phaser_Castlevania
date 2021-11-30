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
        
        //---------WEAPONS----------//
        this.load.image('morningStar', rutaImgWeapons + 'MorningStar.png');
        this.load.image('axe', rutaImgWeapons + 'Axe.png');

        //---------AUDIO----------//
    }
    create() { //carga los assets en pantalla desde memoria
        this.loadAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new playerPrefab(this, config.scale.width / 2, config.scale.height, 'player');
        //this.axe = new axePrefab(this,this.player.x, this.player.y - 20,'axe', 1);
    }

    loadSounds() {
    }

    loadAnimations() {
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

    loadPulls() {
    }

    update() { //actualiza assets

        this.player.Update();
    }
}