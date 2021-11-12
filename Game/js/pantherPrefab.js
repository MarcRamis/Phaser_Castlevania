class pantherPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.anims.play('pantherIdle-Left');
        this.health = 1;
        this.playerDirection = 1;
        this.animName = "Default";
        //this.body.collideWorldBounds = true;
    }

    preUpdate(time,delta)
    {
        if((this.x >= 256/*+this.body.weight*/) || (this.x <= 0/*-this.body.weight*/))
        {
            //console.log('i fucking died');
            //this.active = false;
            this.body.setVelocityX(0);
        }
        
        this.DetectFloor(this.playerDirection);

        super.preUpdate(time, delta);
    }
    
    SetPlayerDirection(_playerDirection)
    {
        this.playerDirection = _playerDirection;
    }

    Jump(_playerDirection)
    {
        if(_direction > 0 && this.animName !="pantherJump-Right")
        {
            this.anims.play('pantherJump-Right');
            this.animName ="pantherJump-Right";
        }
        else if(_direction < 0 && this.animName !="pantherJump-Left")
        {
            this.anims.play('pantherJump-Left');
            this.animName ="pantherJump-Left";
        }
        this.body.setAcceleration(15 * _playerDirection, 15 * _playerDirection);



    }

    DetectFloor(_playerDirection)
    {
        if(this.body.onFloor())
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
        this.body.setVelocityX(25 * _playerDirection);
    }
    
    
}