class axePrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag, _direction, _isDropItem) {
        super(_scene, _positionX, _positionY, _spriteTag, _isDropItem);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5);
        this.setScale(1);
        this.direction = _direction;
        this.doOnce = true;
        this.isDropItem = _isDropItem;
        this.s = _scene;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.isDropItem) {
            // Impulse
            if (this.doOnce) {
                this.body.setVelocity(90 * this.direction, -300);
                this.doOnce = false;
            }

            // Rotate
            if (this.direction < 0) {
                this.flipX = true;
            }
            else {
                this.flipX = false;
            }
            this.angle += 8 * this.direction;
        }
    }
    playerCollided() {

        if (this.isDropItem) {

            this.destroy();
            this.s.player.currentWeapon = WeaponType.AXE;
        }
    }
}