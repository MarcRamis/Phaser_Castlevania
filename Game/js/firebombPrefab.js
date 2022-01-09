class firebombPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag, _direction, _isDropItem) {
        super(_scene, _positionX, _positionY, _spriteTag, _isDropItem);
        this.scene = _scene;
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
                this.body.setVelocity(200 * this.direction, 0);
                this.doOnce = false;
            }

            // Flip
            if (this.direction > 0) {
                this.flipX = true;
            }
            else {
                this.flipX = false;
            }
        }

    }

    makeFire() {
        new firePrefab(this.scene, this.x, this.y, 'firebomb_fire');
        this.scene.crystalFire.play();
        this.destroy();
    }
    playerCollided() {
        
        if (this.isDropItem) {

            this.destroy();
            this.s.player.currentWeapon = WeaponType.FIREBOMB;
            mainCharacterPrefs.weapon = WeaponType.FIREBOMB;
            this.s.ui.SetWeaponImage(WeaponType.FIREBOMB);

        }
    }
}