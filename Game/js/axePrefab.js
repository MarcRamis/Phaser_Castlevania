class axePrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag,_direction)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5);
        this.setScale(1);
        //this.body.allowGravity = false;
        this.direction = _direction;
        this.doOnce = true;
    }

    preUpdate(time, delta)
    {
        if (this.doOnce){
            this.body.setVelocity(70 * this.direction, -300);
            this.doOnce = false;
        }
        
        super.preUpdate(time, delta);
    }

}