class magicCrystalPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "magicCrystal");
        this.s = _scene;
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.51, 0);
        this.play('magicCrystal', true);
        this.body.setSize(13, 15);
        this.body.setOffset(2, 0);
    }
    playerCollided()
    {
        this.destroy();
        this.s.takeItem.play();
    }
}