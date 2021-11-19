class playerPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag) {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5, 0.5);
        this.body.setSize(16, 36)
        this.body.collideWorldBounds = true;

        this.cursors = _scene.input.keyboard.createCursorKeys();
    }

    Update() {
        this.Move();
        this.Jump();
        this.Attack();
    }

    Move() {
        if (this.cursors.right.isDown) {
            this.body.velocity.x = mainCharacterPrefs.speed;
            this.flipX = false;
            this.play('walk', true);
        }
        else if (this.cursors.left.isDown) {
            this.body.velocity.x = -mainCharacterPrefs.speed;
            this.flipX = true;
            this.play('walk', true);
        }
        else if (this.cursors.down.isDown){
            this.body.velocity.x = 0;
            this.setFrame(7);
        }
        else {
            this.body.velocity.x = 0;
            this.setFrame(0);
        }
    }

    Jump() {
        if (this.cursors.up.isDown &&
            this.body.onFloor() && Phaser.Input.Keyboard.DownDuration(this.cursors.up, 250)) {
            this.body.velocity.y = -mainCharacterPrefs.jumpForce;
        }
    }

    Attack() {

    }

}