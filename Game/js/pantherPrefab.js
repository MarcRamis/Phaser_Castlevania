class pantherPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag, _directionToStartIdle)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.s = _scene;
        this.setOrigin(0.5,0.5);
        if(_directionToStartIdle < 1)
            this.anims.play('pantherIdle-Left');
        else
            this.anims.play('pantherIdle-Right');
        this.health = 1;
        this.playerDirection = _directionToStartIdle;
        this.animName = "Idle";
        this.alreadyJumped = false;
        this.canMove = false;
        this.takeDamageOnce = true;
        this.directionDecided = false;
        this.velocity = 40;
    }

    preUpdate(time,delta)
    {
        this.DetectFloor(this.playerDirection);
        if(this.body.velocity.x == 0 && this.canMove)
        {
            this.Move(this.playerDirection * -1);
            console.log("Entro");
            this.playerDirection *= -1;
        }

        super.preUpdate(time, delta);
    }
    
    SetPlayerDirection(_playerDirection)
    {
        this.playerDirection = _playerDirection;
    }

    GetPlayerPos(_playerPos)
    {
        if(!this.directionDecided)
        {
            if(_playerPos.x < this.x)
            {
                this.SetPlayerDirection(-1);
            }
            else
            {
                this.SetPlayerDirection(1);
            }
        }
        

        this.GetPlayerDistance(_playerPos);

    }

    GetPlayerDistance(_playerpos)
    {
        if(Phaser.Math.Distance.Between(_playerpos.x, _playerpos.y, this.x, this.y) < (230) / 3.5 && (_playerpos.y + 16 < this.y + 25 && _playerpos.y + 16 > this.y - 25) )
        {
            this.Jump(this.playerDirection);
        }
    }
    
    Jump(_playerDirection)
    {
        if(!this.alreadyJumped && this.body.onFloor())
        {
            if(_playerDirection > 0 && this.animName !="pantherJump-Right")
            {
                this.anims.play('pantherJump-Right');
                this.animName ="pantherJump-Right";
            }
            else if(_playerDirection < 0 && this.animName !="pantherJump-Left")
            {
                this.anims.play('pantherJump-Left');
                this.animName ="pantherJump-Left";
            }
            this.body.setVelocity(150 * _playerDirection, -250);
            this.alreadyJumped = true;
            
            this.scene.time.delayedCall(500, this.changeBool, null, this);  // delay in ms
            
            
        }

    }

    changeBool() 
    {
        this.canMove = true;
    }

    DetectFloor(_playerDirection)
    {
        if(this.canMove && this.alreadyJumped && this.body.onFloor() && !this.directionDecided)
        {
            this.Move(_playerDirection);
        }
    }

    Move(_playerDirection)
    {
        if(_playerDirection > 0 && this.animName !="pantherWalk-Right")
        {
            this.anims.play('pantherWalk-Right');
            this.animName ="pantherWalk-Right";
        }
        else if (_playerDirection < 0 && this.animName !="pantherWalk-Left")
        {
            this.anims.play('pantherWalk-Left') && this.animName !="pantherWalk-Left";
            this.animName ="pantherWalk-Left";
        }
        this.body.setVelocityX(this.velocity * _playerDirection);
        this.directionDecided = true;
    }
    
    TakeDamage()
    {
        if (this.takeDamageOnce){
            
            this.takeDamageOnce = false;
            
            this.s.hit.play();
            this.destroy();

            this.lamp = new lampPrefab(this.s, this.x, this.y, 'lamp');
            this.lamp.createRandomObject(this.x,this.y);
            this.lamp.destroy();
        }
    }
}