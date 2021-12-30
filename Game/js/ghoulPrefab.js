class ghoulPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag, _startDirection)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        //this.anims.play('idleEnemy');
        this.health = 1;
        this.direction = _startDirection;
        this.startMoving = false;
    }

    preUpdate(time,delta)
    {
        if(this.body.velocity.x == 0 && this.startMoving)
        {
            this.Move(this.direction * -1);
            this.direction *= -1;
        }

        super.preUpdate(time, delta);
    }

    GetPlayerDistance(_playerpos)
    {
        if(Phaser.Math.Distance.Between(_playerpos.x, _playerpos.y, this.x, this.y) < (230) / 1.2)
        {
            if(!this.startMoving)
            {   
                this.ChooseDirection(_playerpos)
                this.Move(this.direction);
                this.startMoving = true;
            }
        }
    }

    Move(_direction)
    {
        
        if(_direction > 0)
        {
            this.anims.play('ghoulWalk-Right');
        }
        else
        {
            this.anims.play('ghoulWalk-Left');
        }
        this.body.setVelocityX(25 * _direction);
        
        
    }
    
    TakeDamage()
    {
        console.log("Ghoul taking damage");
    }

    ChooseDirection(_playerpos)
    {
        if(_playerpos.x < this.x)
        {
            this.direction = -1;
        }
        else
        {
            this.direction = 1;
        }
    }

}