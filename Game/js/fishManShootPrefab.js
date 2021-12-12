
class fishManShoot extends Phaser.GameObjects.Sprite
{
   
    constructor(_scene,_positionX,_positionY,_spriteTag, _startDirection)
    {
        
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.s = _scene;
        this.setOrigin(0.5,0.5);
        this.direction = _startDirection;
        this.s.physics.add.existing(this);
        this.body.setGravity(0,-1000);
        this.body.setVelocity(50* _startDirection, 0);
        if(_startDirection<0){
            this.flipX = true;

        }
        //  this.scene.time.delayedCall(20,this.Destroy, null, this.scene);

    }

    Destroy(){
        this.destroy();
    }

    preUpdate(time,delta)
    {

        super.preUpdate(time, delta);

    }
    
}