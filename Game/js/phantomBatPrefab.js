const EMachineState = {
    IDLE: 'idle', // Is not doing anything
    FIGHT: 'fight' // Starts the battle
};

const EMachineStateAttackLong = {
    RIGHT: 'right', // Goes to the right pos
    DOWN: 'down', // Goes to the down pos
    LEFT: 'left' // Goes to the left pos
};
const EMachineStateAttackShort = {
    RND: 'random', // Goes to random location
    P1: 'player' // Goes to player location
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

        this.currentAttackLong = EMachineStateAttackLong.RIGHT;
        this.currentAttackShort = EMachineStateAttackShort.RND;

        this.anims.play('phantomBat-Idle');
        this.body.setSize(16,16);
        this.body.setOffset(24,8);

        this.playerPos;

        this.speed = 50;

        this.doRandom = true;
        this.stopGoingToPlayer = false;

        this.randPosX = 0;
        this.randPosY = 0;
        this.randDirectionX = 1;
        this.randDirectionY = 1;
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
        this.playerPos = new Phaser.Math.Vector2(_directionX, _directionY);
        //this.body.setVelocity(this.speed * _directionX, this.speed * _directionY)
    }

    AttackLong()
    {
        switch(this.currentAttackLong)
        {
            case EMachineStateAttackLong.RIGHT:
            this.GoRight();
            break;
            case EMachineStateAttackLong.DOWN:
            this.GoDown();
            break;
            case EMachineStateAttackLong.LEFT:
            this.GoLeft();
            break;
        }
    }

    AttackShort()
    {
        switch(this.currentAttackShort)
        {
            case EMachineStateAttackShort.RND:
            this.GoRandomPos();
            break;
            case EMachineStateAttackShort.P1:
            this.GoPlayerPos()
            break;
        }
    }

    GoRight()
    {
        if(this.x <= 2780)
        {
            this.body.setVelocityX(this.speed * 1);
        }
        else
        {
            this.body.setVelocityX(0);
        }
        if(this.y >= 145 && this.y <= 150)
        {
            this.body.setVelocityY(0);
        }
        else if(this.y >= 155)
        {
            this.body.setVelocityY(this.speed * -1);
        }
        else
        {
            this.body.setVelocityY(this.speed * 1);
        }
        if(this.x >= 2780 && this.y >= 145)
        {
            this.waitTimer = this.s.time.addEvent
                (
                    {
                        delay: 1000, //ms
                        callback: function () {
                            this.currentAttackLong = EMachineStateAttackLong.DOWN;
                        },
                        callbackScope: this,
                        repeat: 0
                    }
                );
        }
    }
    GoDown()
    {
        if(this.x <= 2670)
        {
            this.body.setVelocityX(this.speed * 1);
        }
        else if(this.x >= 2670)
        {
            this.body.setVelocityX(this.speed * -1)
        }
        if(this.y < 180)
        {
            this.body.setVelocityY(this.speed * 1);
        }
        else
        {
            this.body.setVelocityY(0);
        }
        if((this.x > 2670 && this.x < 2672) && this.y >= 180)
        {
            this.currentAttackLong = EMachineStateAttackLong.LEFT;
        }
    }
    GoLeft()
    {
        console.log("Left");
        if(this.x >= 2610)
        {
            this.body.setVelocityX(this.speed * -1);
        }
        else
        {
            this.body.setVelocityX(0);
        }
        if(this.y >= 145 && this.y <= 150)
        {
            this.body.setVelocityY(0);
            console.log("Stop Go up");
        }
        else if(this.y >= 150)
        {
            console.log("Go up");
            this.body.setVelocityY(this.speed * -1);
        }
        else
        {
            this.body.setVelocityY(this.speed * 1);
        }
        if(this.x <= 2610 && (this.y >= 145 && this.y <= 150))
        {
            this.waitTimer = this.s.time.addEvent
                (
                    {
                        delay: 1000, //ms
                        callback: function () {
                            this.currentAttackLong = EMachineStateAttackLong.RIGHT;
                        },
                        callbackScope: this,
                        repeat: 0
                    }
                );
        }
    }
    GoRandomPos()
    {
        if(this.doRandom)
        {
            this.randPosX = 2610 + (Math.random() * 170);
            this.randPosY = 49 + (Math.random() * 131);
            console.log(this.randPosX);
            console.log(this.randPosY);
            
            this.doRandom = false;
        }
        if(Phaser.Math.Distance.Between(this.randPosX, this.randPosY, this.x, this.y) < 5)
        {
            this.body.setVelocity(0, 0);
            this.waitTimer = this.s.time.addEvent
                (
                    {
                        delay: 1000, //ms
                        callback: this.ChangeShortAttackState(),
                        callbackScope: this,
                        repeat: 0
                    }
                );
        }
        else
        {
            if(this.x <= this.randPosX + 4 && this.x >= this.randPosX - 4)
            {
                this.randDirectionX = 0;
            }
            else if(this.x < this.randPosX)
            {
                this.randDirectionX = 1;
            }
            else
            {
                this.randDirectionX = -1;
            }
            if(this.y <= this.randPosY + 4 && this.y >= this.randPosY - 4)
            {
                this.randDirectionY = 0;
            }
            else if(this.y < this.randPosY)
            {
                this.randDirectionY = 1;
            }
            else
            {
                this.randDirectionY = -1;
            }
            this.body.setVelocity(this.speed * this.randDirectionX, this.speed * this.randDirectionY);
        }
    }
    GoPlayerPos()
    {
        if(Phaser.Math.Distance.Between(this.playerPos.x, this.playerPos.y, this.x, this.y) < 6)
        {
            this.currentAttackShort = EMachineStateAttackShort.RND;
            this.doRandom = true;
        }
        else
        {
            var playerDirectionX;
            var playerDirectionY;
            if(this.x <= this.playerPos.x + 4 && this.x >= this.playerPos.x - 4)
            {
                playerDirectionX = 0;
            }
            else if(this.x < this.playerPos.x)
            {
                playerDirectionX = 1;
            }
            else
            {
                playerDirectionX = -1;
            }
            if(this.y <= this.playerPos.y + 4 && this.y >= this.playerPos.y - 4)
            {
                playerDirectionY = 0;
            }
            else if(this.y < this.playerPos.y)
            {
                playerDirectionY = 1;
            }
            else
            {
                playerDirectionY = -1;
            }
            this.body.setVelocity(this.speed * playerDirectionX, this.speed * playerDirectionY);
            if(!this.stopGoingToPlayer)
            {   
                this.stopGoingToPlayer = true;
                this.waitTimer = this.s.time.addEvent
                (
                    {
                        delay: 1500, //ms
                        callback: function () {
                            this.currentAttackShort = EMachineStateAttackShort.RND;
                            this.doRandom = true;
                            this.stopGoingToPlayer = false;
                        },
                        callbackScope: this,
                        repeat: 0
                    }
                );
            }
            
        }
    }
    ChangeShortAttackState()
    {
        var randValue = Math.random() * 100;
        this.doRandom = true;
        if(randValue < 50)
        {
            this.currentAttackShort = EMachineStateAttackShort.RND;
        }
        else
        {
            this.currentAttackShort = EMachineStateAttackShort.P1;
        }
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