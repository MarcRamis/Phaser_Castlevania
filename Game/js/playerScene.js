class playerScene extends Phaser.Scene {
    constructor() { //crea la escena
        super(
            {
                key: "sceneMarc"
            });
    }
    preload() { //carga los assets en memoria
        this.cameras.main.setBackgroundColor("#4488AA");
        var rutaImg = 'assets/img/';
        var rutaSnd = 'assets/snd/';

        this.load.spritesheet('mainCharacter', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });
        this.load.spritesheet('player', rutaImg + 'maincharacter_anim.png', { frameWidth: 104, frameHeight: 35 });
    }
    create() { //carga los assets en pantalla desde memoria
        this.mainCharacter = this.physics.add.sprite(config.width / 2, config.height, 'mainCharacter').setOrigin(0.5, 0.5).setBodySize(16, 31, true);
        this.mainCharacter.body.collideWorldBounds = true;
        this.mainCharacter.body.setGravity(0,-900);
        this.loadAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new playerPrefab(this, config.width- 200, config.height - 200,'player');
    }

    loadSounds() {
    }

    loadAnimations() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mainCharacter', { frames: [3, 4, 5] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mainCharacter', { frames: [0, 1, 2] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'crouch_left',
            frames: this.anims.generateFrameNumbers('mainCharacter', { frames: [6] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: -1
        })
        this.anims.create({
            key: 'crouch_right',
            frames: this.anims.generateFrameNumbers('mainCharacter', { frames: [7] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: -1
        })

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('mainCharacter', { frames: [14, 13, 12] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: 1
        })
        this.anims.create({
            key: 'crouch_attack',
            frames: this.anims.generateFrameNumbers('mainCharacter', { frames: [17, 16, 15] }),
            frameRate: mainCharacterPrefs.frameRate,
            repeat: -1
        })
    }

    loadPulls() {
    }
    // MovePlayer()
    // {
    //     if (this.cursors.right.isDown)
    //     {
    //         this.player.body.velocity.x += mainCharacterPrefs.speed;
    //     }
    //     // else if (this.cursors.left.isDown)
    //     // {
    //     //     this.velocity.x -= mainCharacterPrefs.speed;
    //     // }
    //     // else{
    //     //     this.velocity.x = 0;
    //     // }
    // }


    update() { //actualiza assets
        this.inputMainCharacterController();
       
        //this.player.Move()
        //this.jump();        
        //this.move();
        this.player.Update();
        //this.player.Jump();
        //this.MovePlayer();
    }

    attack() {
        // if (this.cursors.space.isDown){
        //     this.mainCharacter.play('attack', true);
        // }
    }

    jump()
    {
        if (mainCharacterPrefs.up == true) {
            if (mainCharacterPrefs.canJump) {
                mainCharacterPrefs.canJump = false;
                mainCharacterPrefs.isInAir = true;
                this.mainCharacter.setVelocityY(-mainCharacterPrefs.jumpForce);

                this.jumpingTimer = this.time.addEvent
                    (
                        {
                            delay: 1600, //ms
                            callback:
                                function () {
                                    mainCharacterPrefs.canJump = true;
                                    mainCharacterPrefs.isInAir = false;
                                },
                            callbackScope: this,
                            repeat: 0
                        }
                    );
            }
        }
    }

    move() {
        if (mainCharacterPrefs.right == true) {
            this.mainCharacter.play('right', true);
            this.mainCharacter.x += mainCharacterPrefs.speed;
        }
        else if (mainCharacterPrefs.left == true) {
            this.mainCharacter.play('left', true);
            this.mainCharacter.x -= mainCharacterPrefs.speed;
        }
        else if (mainCharacterPrefs.down == true) {
            if (mainCharacterPrefs.rightSide == false) {
                this.mainCharacter.play('crouch_left', true);
            }
            else {
                this.mainCharacter.play('crouch_right', true);
            }
        }
        else {
           if (mainCharacterPrefs.rightSide == false) {
                this.mainCharacter.setFrame(3);
            }
            else {
               this.mainCharacter.setFrame(0);
           }
        }

        if (mainCharacterPrefs.isCrouching) {
            if (mainCharacterPrefs.rightSide == false) {
                this.mainCharacter.play('crouch_left', true);
            }
            else {
                this.mainCharacter.play('crouch_left', true);
            }
        }

    }
    inputMainCharacterController() {
        if (this.cursors.right.isDown) {
            mainCharacterPrefs.right = true;
            mainCharacterPrefs.rightSide = true;
        }
        else {
            mainCharacterPrefs.right = false;
        }
        if (this.cursors.left.isDown) {
            mainCharacterPrefs.left = true;
            mainCharacterPrefs.rightSide = false;
        }
        else {
            mainCharacterPrefs.left = false;
        }
        if (this.cursors.down.isDown) {
            mainCharacterPrefs.down = true;
            mainCharacterPrefs.isCrouching = true;
        }
        else {
            mainCharacterPrefs.down = false;
            mainCharacterPrefs.isCrouching = false;
        }
        if (this.cursors.up.isDown) {
            mainCharacterPrefs.up = true;
        }
        else {
            mainCharacterPrefs.up = false;
        }
        if (this.cursors.space.isDown)
        {
            mainCharacterPrefs.space = false;
        }
    }
}