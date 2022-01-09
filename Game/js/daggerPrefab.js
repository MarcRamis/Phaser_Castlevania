class daggerPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag, _direction, _isDropItem) {
        super(_scene, _positionX, _positionY + 10, _spriteTag, _isDropItem);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.setOrigin(0.5);
        this.setScale(0.8);
        if (_isDropItem) {
            this.body.allowGravity = true;
        }
        else {
            this.body.allowGravity = false;
        }
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
                this.body.setVelocityX(90 * this.direction);
                this.doOnce = false;
            }

            // Flip
            if (this.direction > 0) {
                this.flipX = false;
            }
            else {
                this.flipX = true;
            }

            this.timer = this.s.time.addEvent
            (
                {
                    delay: 5000, //ms
                    callback: function () {
                        this.destroy();
                    },
                    callbackScope: this,
                    repeat: 0
                }
            );
        }
    }
    playerCollided() {

        if (this.isDropItem) {

            this.destroy();
            this.s.player.currentWeapon = WeaponType.DAGGER;
            mainCharacterPrefs.weapon = WeaponType.DAGGER;

            this.s.ui.SetWeaponImage(WeaponType.DAGGER);

        }
    }
}