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

        if (_direction > 0) {
            this.anims.play('ghoulWalk-Right');
        }
        else {
            this.anims.play('ghoulWalk-Left');
        }
        this.body.setVelocity(_directionX, _directionY)
    }

    TakeDamage() {
        if (this.takeDamageOnce) {
            this.s.hit.play();
            gamePrefs.bossHealth -= 2;
            // Set health on HUD
            
            this.takeDamageOnce = false;
            this.takeDamageTimer = this.s.time.addEvent
            (
                {
                    delay: 1000, //ms
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