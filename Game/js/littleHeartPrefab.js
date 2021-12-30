class littleHeartPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "littleHeart");
        this.s = _scene;
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.51, 0);
        this.play('Little-Heart', true);
        this.body.setSize(9, 9);
        this.body.setOffset(4, 4);
    }
    playerCollided()
    {
        this.destroy();
        this.s.takeItem.play();
    }
}