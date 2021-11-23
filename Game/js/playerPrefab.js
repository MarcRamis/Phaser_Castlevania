class playerPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag) {
        super(_scene, _positionX, _positionY, _spriteTag);

        // Init Main character
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5, 0);
        this.body.setSize(16, 30);
        this.body.setOffset(44, 5);
        this.body.collideWorldBounds = true;

        // Init chain
        this.chain = _scene.add.rectangle(this.x, this.y - 35, 22, 6);
        this.chain.setOrigin(0.5, 0.5);
        _scene.add.existing(this.chain);
        _scene.physics.world.enable(this.chain);
        this.chain.body.allowGravity = false;
        //_scene.physics.add.overlap(this, this.chain);

        // Init inputs
        this.cursors = _scene.input.keyboard.createCursorKeys();
        this._time = _scene.time;
    }

    Update() {
        // Movement, inputs player
        this.Move();
        this.Jump();
        this.Attack();

        // Collisions
        this.SetBoxColliders();
    }

    Move() {

        if (!mainCharacterPrefs.isAttacking) {
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
            else if (this.cursors.down.isDown) {
                this.body.velocity.x = 0;
                this.setFrame(3);
            }
            else {
                this.body.velocity.x = 0;
                this.setFrame(0);
            }
        }
    }

    Jump() {
        if (!mainCharacterPrefs.isAttacking) {
            if (this.cursors.up.isDown &&
                this.body.onFloor() && Phaser.Input.Keyboard.DownDuration(this.cursors.up, 100)) {
                this.body.velocity.y = -mainCharacterPrefs.jumpForce;
            }
        }
    }

    Attack() {

        // Large attack
        if (this.cursors.space.isDown
            && !this.cursors.down.isDown
            && !mainCharacterPrefs.isAttacking
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 100)
            && mainCharacterPrefs.isLargeAttack) {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;
            this.play('normal_large_attack', true);

        }
        // Normal attack
        else if (this.cursors.space.isDown
            && !this.cursors.down.isDown
            && !mainCharacterPrefs.isAttacking
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 100)
            && !mainCharacterPrefs.isLargeAttack) {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;
            this.play('normal_attack', true);
        }
        // Crouch Large Attack
        else if (this.cursors.space.isDown
            && this.cursors.down.isDown
            && !mainCharacterPrefs.isAttacking
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 100)
            && mainCharacterPrefs.isLargeAttack) {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;
            this.play('crouch_large_attack', true);

        }
        // Crouch attack
        else if (this.cursors.space.isDown
            && this.cursors.down.isDown
            && !mainCharacterPrefs.isAttacking
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 100)
            && !mainCharacterPrefs.isLargeAttack) {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;
            this.play('crouch_attack', true);
        }

        // Special attack
        if (this.cursors.shift.isDown
            && !mainCharacterPrefs.isAttacking
            && Phaser.Input.Keyboard.DownDuration(this.cursors.shift, 100)) {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;
            this.play('special_attack', true);
        }
    }
    AttackUp() {
        mainCharacterPrefs.isAttacking = false;
    }
    SetBoxColliders() {

        // CROUCH
        if (this.cursors.down.isDown) {
            this.body.setSize(16, 23);
            this.body.setOffset(44, 12);
        }
        // DEFAULT
        else {
            this.body.setSize(16, 30);
            this.body.setOffset(44, 5);
        }

        // CROUCH ATTACK RIGHT & NO LARGE ATTACK
        if (this.cursors.down.isDown
            && !this.flipX
            && mainCharacterPrefs.isAttacking
            && !mainCharacterPrefs.isLargeAttack) {

            this.chain.body.setSize(22, 6);
            this.chain.x = this.x + 24;
            this.chain.y = this.y + 22;
        }
        // CROUCH ATTACK LEFT & NO LARGE ATTACK
        else if (this.cursors.down.isDown
            && this.flipX
            && mainCharacterPrefs.isAttacking
            && !mainCharacterPrefs.isLargeAttack) {
            this.body.setSize(44, 23);
            this.body.setOffset(16, 12);

            this.chain.body.setSize(22, 6);
            this.chain.x = this.x - 24;
            this.chain.y = this.y + 22;
        }
        // UP ATTACK RIGHT & NO LARGE ATTACK
        else if (!this.flipX
            && mainCharacterPrefs.isAttacking
            && !mainCharacterPrefs.isLargeAttack) {
            this.body.setSize(44, 30);
            this.body.setOffset(44, 5);

            this.chain.body.setSize(22, 6);
            this.chain.x = this.x + 24;
            this.chain.y = this.y + 15;
        }
        // UP ATTACK LEFT & NO LARGE ATTACK
        else if (this.flipX
            && mainCharacterPrefs.isAttacking
            && !mainCharacterPrefs.isLargeAttack) {
            this.body.setSize(44, 30);
            this.body.setOffset(16, 5);

            this.chain.x = this.x - 24;
            this.chain.y = this.y + 15;
        }
        // CROUCH ATTACK RIGHT & LARGE ATTACK
        else if (this.cursors.down.isDown
            && !this.flipX
            && mainCharacterPrefs.isAttacking
            && mainCharacterPrefs.isLargeAttack) {

            this.chain.body.setSize(38, 6);
            this.chain.x = this.x + 32;
            this.chain.y = this.y + 24;
        }
        // CROUCH ATTACK LEFT & LARGE ATTACK
        else if (this.cursors.down.isDown
            && this.flipX
            && mainCharacterPrefs.isAttacking
            && mainCharacterPrefs.isLargeAttack) {
            this.body.setSize(60, 23);
            this.body.setOffset(0, 12);

            this.chain.body.setSize(38, 6);
            this.chain.x = this.x - 32;
            this.chain.y = this.y + 24;
        }
        // UP ATTACK RIGHT & NO LARGE ATTACK
        else if (!this.flipX
            && mainCharacterPrefs.isAttacking
            && mainCharacterPrefs.isLargeAttack) {

            this.chain.body.setSize(38, 6);
            this.chain.x = this.x + 32;
            this.chain.y = this.y + 17;
        }
        // UP ATTACK LEFT & NO LARGE ATTACK
        else if (this.flipX
            && mainCharacterPrefs.isAttacking
            && mainCharacterPrefs.isLargeAttack) {
            this.chain.body.setSize(38, 6);
            this.chain.x = this.x - 32;
            this.chain.y = this.y + 17;
        }
        else
        {
            this.chain.body.setSize(0, 0);
            this.chain.x =0;
            this.chain.y =0;
        }
    }

}