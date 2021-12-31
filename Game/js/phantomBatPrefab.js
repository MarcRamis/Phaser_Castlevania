const EMachineState = {
    IDLE: 'idle', // Is not doing anything
    FIGHT: 'fight' // Starts the battle
};

class phantomBatPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag) {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        
        this.s = _scene;
        
        this.setOrigin(0.5, 0.5);
        this.body.allowGravity = false;

        this.takeDamageOnce = true;

        this.currentState = EMachineState.IDLE;

        this.anims.play('phantomBat-Idle');
        this.body.setSize(16,16);
        this.body.setOffset(24,8);

        this.speed = 50;
    }

    Update() {
        switch (this.currentState) {
            case EMachineState.IDLE:
                break;
            case EMachineState.FIGHT:
                break;
        }
    }

    GetPlayerDistance(_playerpos) {
        if (Phaser.Math.Distance.Between(_playerpos.x, _playerpos.y, this.x, this.y) < (230) / 1.2) {
            if (!this.startMoving) {
                this.ChooseDirection(_playerpos)
                this.Move(this.direction);
                this.startMoving = true;
            }
        }
    }

    Move(_directionX,_directionY) {

        this.play('phantomBat-Fly',true);
        this.body.setSize(36,16);
        this.body.setOffset(16,6);

        //this.body.setVelocity(this.speed * _directionX, this.speed * _directionY)
    }

    TakeDamage(_health) {
        if (this.takeDamageOnce) {
            this.s.hit.play();
            gamePrefs.bossHealth -= _health;
            this.s.ui.SetEnemyHealthUi(gamePrefs.bossHealth);// Set health on HUD
            
            this.takeDamageOnce = false;
            this.takeDamageTimer = this.s.time.addEvent
            (
                {
                    delay: 500, //ms
                    callback: function () {
                        this.takeDamageOnce = true;
                    },
                    callbackScope: this,
                    repeat: 0
                }
            );
        }
    }

}