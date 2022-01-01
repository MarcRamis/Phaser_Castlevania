class heartPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "heart");
        this.s = _scene;    
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.51, 0);
        this.play('Heart', true);
        this.body.setSize(13, 11);
        this.body.setOffset(2, 3);
    }

    playerCollided()
    {
        mainCharacterPrefs.mana += 5;
        this.s.ui.SetHearts(mainCharacterPrefs.mana);
        this.destroy();
        this.s.takeItem.play();
    }
}