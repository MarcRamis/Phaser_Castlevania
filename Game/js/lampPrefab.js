class lampPrefab extends Phaser.GameObjects.Sprite {

    constructor(_scene, _positionX, _positionY, _spriteTag) {

        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        this.s = _scene;
        this.setOrigin(0.5, 0.5);
        this.anims.play("lampIdle");
        this.testTimer = 0;
        this.alive = true;

        this.destroyOnce = true;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    Test() {
        this.testTimer++;
        if (this.testTimer >= 50 && this.alive) {
            this.Destroy();
            this.alive = false;

        }
    }

    Destroy() {
        if (this.destroyOnce) {
            this.anims.play('lampDestroy');
            this.SpawnItem();
            this.on('animationcomplete', this.SetUnactive);
            this.s.hit.play();
            this.destroyOnce = false;
        }
    }
    SetUnactive() {
        this.setActive(false).setVisible(false);
    }

    SpawnItem() {
        this.createRandomObject(this.x, this.y);
    }


    createDropItem(_typeItemTag, _posX, _posY) //To add to the prefab
    {
        switch (_typeItemTag) {
            case "LittleHeart":
                this.item = new littleHeartPrefab(this.s, _posX, _posY);
                this.s.physics.add.collider(this.item, this.s.walls);
                this.s.physics.add.overlap(this.item, this.s.player, this.collideWithPlayer, null, this);
                break;
            case "Heart":
                this.item = new heartPrefab(this.s, _posX, _posY);
                this.s.physics.add.collider(this.item, this.s.walls);
                this.s.physics.add.overlap(this.item, this.s.player, this.collideWithPlayer, null, this);
                break;
            case "MorningStar":
                this.item = new morningStarPrefab(this.s, _posX, _posY);
                this.s.physics.add.collider(this.item, this.s.walls);
                this.s.physics.add.overlap(this.item, this.s.player, this.collideWithPlayer, null, this);
                break;
            case "Axe":
                this.item = new axePrefab(this.scene, this.x, this.y, 'axe', this.direction, true);
                this.s.physics.add.collider(this.item, this.s.walls);
                this.s.physics.add.overlap(this.item, this.s.player, this.collideWithPlayer, null, this);
                break;
            case "Dagger":
                this.item = new daggerPrefab(this.scene, this.x, this.y, 'dagger', this.direction, true);
                this.s.physics.add.collider(this.item, this.s.walls);
                this.s.physics.add.overlap(this.item, this.s.player, this.collideWithPlayer, null, this);
                break;
            case "Firebomb":
                this.item = new firebombPrefab(this.scene, this.x, this.y, 'firebomb', this.direction, true);
                this.s.physics.add.collider(this.item, this.s.walls);
                this.s.physics.add.overlap(this.item, this.s.player, this.collideWithPlayer, null, this);
                break;
            default:
                this.item = new littleHeartPrefab(this.s, _posX, _posY);
                this.s.physics.add.collider(this.item, this.s.walls);
                this.s.physics.add.overlap(this.item, this.s.player, this.collideWithPlayer, null, this);
                break;
        }
    }

    createRandomObject(_posX, _posY) //To add to the prefab
    {
        var randNum = Math.random() * 100;

        if (randNum < 40) {
        }
        else if (randNum < 60) {
            this.createDropItem("LittleHeart", _posX, _posY);
        }
        else if (randNum < 80) {
            this.createDropItem("Heart", _posX, _posY);
        }
        else if (randNum < 85){
            this.createDropItem("Axe", _posX, _posY);
        }
        else if (randNum < 90){
            this.createDropItem("Dagger", _posX, _posY);
        }
        else if (randNum < 95){
            this.createDropItem("Firebomb", _posX, _posY);
        }
        else {
            this.createDropItem("MorningStar", _posX, _posY);
        }

    }

    collideWithPlayer(_item, _player) {
        _item.playerCollided();
    }
}