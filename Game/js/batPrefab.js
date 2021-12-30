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
        this.active = false;
    }

    preUpdate(time,delta)
    {
        if(this.body.velocity.x == 0 && this.active)
        {
            this.Move(this.dir * -1);
        }
        super.preUpdate(time, delta);

    }

    Update(_playerpos){
        if(Phaser.Math.Distance.Between(_playerpos.x, _playerpos.y, this.x, this.y) < (230) / 1.2 || this.active)
        {
            if(!this.active)
            {
                this.active = true; 
                this.body.reset(this.x,this.y);
                this.Move(this.direction);
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
        console.log("Bat taking damage");
    }
}