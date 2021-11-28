class fishMan extends Phaser.GameObjects.Sprite
{
    
    constructor(_scene,_positionX,_positionY,_spriteTag, _startDirection)
    {
        
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.health = 1;
        this.direction = _startDirection;
        this.fall = false;


    }

    preUpdate(time,delta)
    {

        super.preUpdate(time, delta);

    }
    
    Jump()
    {
        console.log(this.y);

        if(this.y > 100 && this.fall == false){
            this.body.setVelocity(0, -90);

        }
        else{
            this.fall = true;
        }
        if(this.fall){
            this.body.collideWorldBounds = true;
            this.body.setVelocity(0, 90);



        }

    }

    Move(_direction)
    {
        

        this.body.setVelocity(25 * this.dir, 30 * this.directionY);
    }
    
    
    
}