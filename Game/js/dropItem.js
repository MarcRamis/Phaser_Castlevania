class dropItem extends Phaser.GameObjects.Sprite
{
    
    constructor(_scene,_positionX,_positionY,_spriteTag)
    {
        
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.posX = _positionX;
        this.posY = _positionY;
        this.tag = _spriteTag;

        this.taken = false;
    }
    DestroyItem()
    {
        if (this.taken)
        {
            this.destroy();
        }

    }

}