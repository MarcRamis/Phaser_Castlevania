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
        this.walk = false;
        this.walkVelocity = 30;


    }

    preUpdate(time,delta)
    {

        super.preUpdate(time, delta);

    }
    
    Update()
    {
        console.log(this.body.velocity.x);

        if(this.y > 100 && this.fall == false){
            this.body.setVelocity(0, -90);
        }
        else{
            this.fall = true;
        }
        
        if(this.fall && this.walk == false){
            this.body.collideWorldBounds = true;
            this.body.setVelocity(0, 90);
            if(this.y >= 159)
                this.walk = true;
        }

        if(this.walk){
            if(this.body.velocity.x == 0)
            {
                console.log("Choque");
                this.Move(this.direction * -1);
                this.direction *= -1;
            }
            
            this.body.setVelocity(this.direction * this.walkVelocity,0 );
        }

        // If timer == 0 -> Disparar();


    }

    Move(_direction)
    {
        

        this.body.setVelocity(25 * this.dir, 30 * this.directionY);
    }
    
    Disparar(){
        this.setVelocity(0,0);
        
    }
    
    
}