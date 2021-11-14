class batPrefab extends Phaser.GameObjects.Sprite
{
    
    constructor(_scene,_positionX,_positionY,_spriteTag, _startDirection)
    {
        
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        //this.anims.play('idleEnemy');
        this.health = 1;
        this.direction = _startDirection;
        this.posX = _positionX;
        this.posY = _positionY;
        this.directionY = 1;
        this.dir;
    }

    preUpdate(time,delta)
    {
        if(this.body.velocity.x == 0)
        {
            this.Move(this.dir * -1);
        }
        super.preUpdate(time, delta);

    }
    
    Move(_direction)
    {
        
        this.dir=_direction;
        if(_direction > 0)
        {
            this.anims.play('batWalk-Right');
        }
        else
        {
            this.anims.play('batWalk-Left');
        }
        this.body.setVelocity(25 * this.dir, 30 * this.directionY);
    }
    
    
    
}