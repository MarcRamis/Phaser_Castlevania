class firePrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag) {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        //_scene.physics.world.enable(this);
        this.setOrigin(0.5);
        this.play('fireAnim', true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        }, _scene);
    }
}