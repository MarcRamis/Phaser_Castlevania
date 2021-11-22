class playerPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag) {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5, 0.5);
        this.body.setSize(16, 36)
        this.body.collideWorldBounds = true;

        this.cursors = _scene.input.keyboard.createCursorKeys();
        this._time = _scene.time;
        this._anims = _scene.anims;
    }

    Update() {
        this.Move();
        this.Jump();
        this.Attack();
    }

    Move() {

        if (!mainCharacterPrefs.isAttacking)
        {
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
        if (!mainCharacterPrefs.isAttacking)
        {
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
            && mainCharacterPrefs.isLargeAttack)
        {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;  
            this.play('normal_large_attack',true);
            
        }
        // Normal attack
        else if (this.cursors.space.isDown
            && !this.cursors.down.isDown 
            && !mainCharacterPrefs.isAttacking 
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 100)
            && !mainCharacterPrefs.isLargeAttack)
        {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;  
            this.play('normal_attack',true);
        }
        else if (this.cursors.space.isDown
            && this.cursors.down.isDown
            && !mainCharacterPrefs.isAttacking 
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 100)
            && !mainCharacterPrefs.isLargeAttack)
        {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);

            this.body.velocity.x = 0;  
            this.play('crouch_attack',true);
        }
        
        // Special attack
        if(this.cursors.shift.isDown 
            && !mainCharacterPrefs.isAttacking
            && Phaser.Input.Keyboard.DownDuration(this.cursors.shift, 100))
        {
            mainCharacterPrefs.isAttacking = true;
            this._time.delayedCall(300, this.AttackUp, null, this);
            
            this.body.velocity.x = 0;
            this.play('special_attack',true);
        }
    }
    AttackUp()
    {
        mainCharacterPrefs.isAttacking = false;
    }

}