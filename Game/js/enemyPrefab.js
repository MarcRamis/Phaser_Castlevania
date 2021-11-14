class enemyPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        //this.anims.play('idleEnemy');
        this.health = 1;
    }

    preUpdate(time,delta)
    {
        if((this.x >= 256/*+this.body.weight*/) || (this.x <= 0/*-this.body.weight*/))
        {
            //console.log('i fucking died');
            //this.active = false;
            this.body.setVelocityX(0);
        }
        
        super.preUpdate(time, delta);
    }
    
    Move(_direction)
    {
        if(_direction > 0)
        {
            this.anims.play('ghoulWalk-Right');
        }
        else
        {
            this.anims.play('ghoulWalk-Right');
        }
        this.body.setVelocityX(25 * _direction);
    }
    
    
}