class pantherPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        //this.anims.play('idleEnemy');
        this.health = 1;
        this.playerDirection;
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
        if(_direction > 0)
        {
            this.anims.play('pantherJump-Right');
        }
        else
        {
            this.anims.play('pantherJump-Left');
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
        if(_playerDirection > 0)
        {
            this.anims.play('pantherWalk-Right');
        }
        else
        {
            this.anims.play('pantherWalk-Left');
        }
        this.body.setVelocityX(25 * _playerDirection);
    }
    
    
}