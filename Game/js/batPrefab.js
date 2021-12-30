class batPrefab extends Phaser.GameObjects.Sprite
{
    
    constructor(_scene,_positionX,_positionY,_spriteTag, _startDirection)
    {
        
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.s = _scene;
        this.setOrigin(0.5,0.5);
        this.health = 1;
        this.direction = _startDirection;
        this.posX = _positionX;
        this.posY = _positionY;
        this.directionY = 1;
        this.dir;

        this.takeDamageOnce = true;
    }

    preUpdate(time,delta)
    {
        if(this.body.velocity.x == 0)
        {
            this.Move(this.dir * -1);
        }
        super.preUpdate(time, delta);

    }

    Update(){

        if(!this.active)
        {
            this.active = true; 
            this.body.reset(this.redEnemy.width,this.redEnemy.height);
            this.Move(1);
        }
        if(this.y >= this.posY+10){
            this.directionY = -1;
            this.Move(this.dir);
        }
        if(this.y <= this.posY-10){

             this.directionY = 1;
             this.Move(this.dir);

        }

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