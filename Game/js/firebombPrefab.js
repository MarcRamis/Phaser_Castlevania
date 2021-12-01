class firebombPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag,_direction)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5);
        this.setScale(1);
        //this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
        this.direction = _direction;
        this.doOnce = true;
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        
        // Impulse
        if (this.doOnce){
            this.body.setVelocityX(150 * this.direction);
            this.doOnce = false;
        }

        // Flip
        if (this.direction < 0)
        {
            this.flipX = true;  
        }
        else{
            this.flipX = false;
        }        
    }
}