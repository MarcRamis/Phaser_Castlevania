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

        this.initialY = _positionY;
        
        this.framesWalk = 0;
        this.framesWalkLimit = 200;

        this.framesShoot = 0;
        this.framesShootLimit = 50;

        this.shoot = false;
        this.offsetY = -10;

        this.takeDamageOnce = true;
    }

    preUpdate(time,delta)
    {

        super.preUpdate(time, delta);

    }

    Update(_playerpos)
    {
        if(this.FishState == FishState.JUMP){
            this.anims.play("fishmanJump");
            this.body.setVelocity(0, -200);
            if(this.y <= this.initialY - 100)
            {
                this.FishState = FishState.FALL;
                this.s.physics.add.collider(this, this.s.walls);
            }
        }
        else if(this.FishState == FishState.FALL){
            this.anims.play("fishmanJump");

            this.body.collideWorldBounds = true;
            this.body.setGravity(0,200);

            if(this.body.onFloor()){
                this.FishState = FishState.WALK;
            }
        }
        else if(this.FishState == FishState.WALK){
            this.framesWalk++;
            if(this.body.velocity.x == 0)
            {
                this.Move(this.direction * -1);
                this.direction *= -1;
            }
        }
        else if(this.FishState == FishState.SHOOT){
            this.Shoot();
        }

        if(this.framesWalk >= this.framesWalkLimit){
            this.FishState = FishState.SHOOT;
            this.framesWalk = 0;
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


        this.auxDir = this.direction;
        this.body.setVelocity(0,0);


        this.framesShoot++;

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


        if (this.framesShoot >= this.framesShootLimit) {

            this.FishState = FishState.WALK;
            this.Move(this.auxDir);
            this.framesShoot = 0;
            this.shoot = false;

        }

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