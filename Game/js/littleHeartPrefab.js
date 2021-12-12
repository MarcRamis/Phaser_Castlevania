class littleHeartPrefab extends dropItem
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "littleHeart");
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.51, 0);
        this.play('Little-Heart', true);
        this.body.setSize(9, 9);
        this.body.setOffset(4, 4);
        this.body.collideWorldBounds = true;
        
        
    }
}