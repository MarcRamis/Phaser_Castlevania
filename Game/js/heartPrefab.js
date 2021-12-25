class heartPrefab extends dropItem
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "heart");
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.51, 0);
        this.play('Heart', true);
        this.body.setSize(13, 11);
        this.body.setOffset(2, 3);
        this.body.collideWorldBounds = true;
    }
    
    preUpdate()
    {
        if (dropItem.taken)
        {
            this.destroy();
        }
    }

    playerCollided()
    {
        dropItem.taken = true;
    }
}