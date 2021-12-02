class firebombPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag,_direction)
    {
        super(_scene,_positionX,_positionY,_spriteTag);
        this.scene = _scene;
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5);
        this.setScale(1);
        //this.body.allowGravity = false;
        //this.body.collideWorldBounds = true;
        this.direction = _direction;
        this.doOnce = true;

        this.getCollisions();
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        
        // Impulse
        if (this.doOnce){
            this.body.setVelocity(200 * this.direction, 0);
            this.doOnce = false;
        }

        // Flip
        if (this.direction > 0)
        {
            this.flipX = true;  
        }
        else{
            this.flipX = false;
        }
        
        // Camera collisions -- NOT NECESSARY I WAS TESTING
        // if (this.x < this.width 
        //     || this.x > config.scale.width - this.width
        //     || this.y < this.height 
        //     || this.y > config.scale.height - this.height)
        // {
        //     this.makeFire();
        // }
    }

    getCollisions()
    {
        // this.scene.physics.add.overlap
        // (
        //     this,
        //     this.scene.ground,
        //     this.makeFire,
        //     null,
        //     this
        // );
    }

    makeFire()
    {
        new firePrefab(this.scene, this.x, this.y, 'firebomb_fire');
        this.destroy();
    }
}