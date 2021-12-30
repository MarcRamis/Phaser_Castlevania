class ghoulPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag, _startDirection)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.s = _scene;
        this.setOrigin(0.5,0.5);
        //this.anims.play('idleEnemy');
        this.health = 1;
        this.direction = _startDirection;
        this.takeDamageOnce = true;
    }

    preUpdate(time,delta)
    {
        if(this.body.velocity.x == 0)
        {
            this.Move(this.direction * -1);
            this.direction *= -1;
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
            this.anims.play('ghoulWalk-Left');
        }
        this.body.setVelocityX(25 * _direction);
        //this.direction = _direction;
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