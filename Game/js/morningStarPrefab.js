class morningStarPrefab extends dropItem
{
    constructor(_scene,_positionX,_positionY)
    {
        super(_scene, _positionX, _positionY, "Morning-Star");
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.51, 0);
        this.play('MorningStar', true);
        this.body.setSize(17, 17);
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
        mainCharacterPrefs.isLargeAttack = true;
        dropItem.taken = true;
    }
}