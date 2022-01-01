class moneyBagPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "MoneyBag");
        this.s = _scene;
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.play('MoneyBag', true);
        this.setOrigin(0.51, 0);
        this.body.setSize(17, 17);
    }

    playerCollided()
    {
        mainCharacterPrefs.score += 100;
        this.s.ui.AddScore(100);
        this.s.takeItem.play();
        this.destroy();
    }   
}