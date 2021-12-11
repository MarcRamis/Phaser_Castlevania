const FishState = {
    JUMP: "JUMP",
    FALL: "FALL",
    WALK: "WALK",
    SHOOT: "SHOOT"
};
class fishMan extends Phaser.GameObjects.Sprite
{
   
    constructor(_scene,_positionX,_positionY,_spriteTag, _startDirection)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        this.s = _scene;
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.health = 1;
        this.direction = _startDirection;
        this.fall = false;
        this.walk = false;
        this.walkVelocity = 30;
        this.FishState = FishState.JUMP;

        this.probandoTimer = 0;
        this.probandoTimerQuieto = 0;

        this.shoot = false;
        this.offsetY = -10;
    }

    preUpdate(time,delta)
    {

        super.preUpdate(time, delta);

    }
    
    Update()
    {
        if(this.FishState == FishState.JUMP){
            this.anims.play("fishmanJump");
            this.body.setVelocity(0, -90);
            if(this.y <= 100)
                 this.FishState = FishState.FALL;
        }
        else if(this.FishState == FishState.FALL){
            this.anims.play("fishmanJump");

            this.body.collideWorldBounds = true;
            this.body.setVelocity(0, 90);
            if(this.y >= 159){
                this.FishState = FishState.WALK;

            }
        }
        else if(this.FishState == FishState.WALK){
            this.probandoTimer++;


            if(this.body.velocity.x == 0)
            {
                this.Move(this.direction * -1);
                this.direction *= -1;
            }
        }
        else if(this.FishState == FishState.SHOOT){
            this.Shoot();
        }

        if(this.probandoTimer >= 100){
            this.FishState = FishState.SHOOT;
            this.probandoTimer = 0;
        }

    }

    Move(_direction)
    {
        if(_direction > 0)
        {
            this.anims.play('fishmanWalk-Right');
        }
        else
        {

            this.anims.play('fishmanWalk-Left');
        }

        this.body.setVelocity(25 * _direction, 0);
    }


    
    Shoot(){
        
        this.anims.play('fishmanShoot');

        this.auxDir = this.direction;
        this.body.setVelocity(0,0);

        
        this.probandoTimerQuieto++;
        
        if(this.direction > 0)
        {
            this.anims.play('fishmanShoot-Right');
        }
        else
        {
            
            this.anims.play('fishmanShoot-Left');
        }


        if(!this.shoot){
            this.fishManShoot = new fishManShoot(this.s,this.x,this.y + this.offsetY,'shoot',this.auxDir);
            this.shoot = true;
        }
        

        if(this.probandoTimerQuieto>= 60){

            this.FishState = FishState.WALK;
            this.Move(this.auxDir);
            this.probandoTimerQuieto=0;
            this.shoot = false;

        }
        
    }
    
    
}