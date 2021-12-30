class morningStarPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "Morning-Star");
        this.s = _scene;
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.51, 0);
        this.play('MorningStar', true);
        this.body.setSize(17, 17);
    }

    playerCollided()
    {
        mainCharacterPrefs.isLargeAttack = true;
        this.destroy();
        this.s.takeItem.play();
    }   
}