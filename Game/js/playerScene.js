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
        var rutaSnd = 'assets/snd/';

        this.load.spritesheet('player', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });
    }
    create() { //carga los assets en pantalla desde memoria
        this.loadAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new playerPrefab(this, config.width / 2, config.height, 'player');
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
            key: 'attack',
            frames: this.anims.generateFrameNumbers('player', { frames: [14, 13, 12] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: 1
        })
        this.anims.create({
            key: 'crouch_attack',
            frames: this.anims.generateFrameNumbers('player', { frames: [17, 16, 15] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: -1
        })
    }

    loadPulls() {
    }

    update() { //actualiza assets

        this.player.Update();
    }
}