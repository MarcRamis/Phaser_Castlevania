class itemsScene extends Phaser.Scene
{
    constructor(){
        super({key:"itemsScene"});
    }
    preload(){
        //Items
        this.load.setPath("assets/img/");
        this.load.spritesheet('items','Items.png', { frameWidth: 16, frameHeight: 16 });

    }
    create(){
        this.cameras.main.setBackgroundColor("#4488AA");
        this.loadPools();
        this.loadItemsSheet();
        // this.item = this.physics.add.sprite(100,100,'items').setOrigin(0.51, 0);
        // this.item.play('Little-Heart', true);
        // this.item.body.setSize(9, 10);
        // this.item.body.setOffset(4, 4);
        // this.item.body.collideWorldBounds = true;
        
        // this.item = this.physics.add.sprite(50,100,'items').setOrigin(0.5, 0);
        // this.item.play('Heart', true);
        // this.item.body.setSize(13, 12);
        // this.item.body.setOffset(2, 3);
        // this.item.body.collideWorldBounds = true;
        this.item = new littleHeartPrefab(this, 25, 25);
        this.dropItems.add(this.item);
        this.item.body.collideWorldBounds = true;
        this.item = new heartPrefab(this, 200, 10);
        this.dropItems.add(this.item);
        this.item.body.collideWorldBounds = true;
        this.item = new morningStarPrefab(this, 50, 100);
        this.dropItems.add(this.item);
        this.item.body.collideWorldBounds = true;
        this.physics.add.overlap
        (
            this.dropItems,
            //this.player,
            this.destroyItem,
            null,
            this
        );
        
        this.physics.add.collider
        (
            this.dropItems, 
            this.worldBounds
        );


    }

    loadItemsSheet()
    {
        this.anims.create({
            key: 'Little-Heart',
            frames: this.anims.generateFrameNumbers('items', { frames: [0] }),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'Heart',
            frames: this.anims.generateFrameNumbers('items', { frames: [1] }),
            frameRate: 0,
            repeat: -1
        })
        this.anims.create({
            key: 'MorningStar',
            frames: this.anims.generateFrameNumbers('items', { frames: [2] }),
            frameRate: 0,
            repeat: -1
        })
    }

    destroyItem(_dropItem, _player)
    {
        _dropItem.destroy();
    }

    loadPools()
    {
        this.dropItems = this.physics.add.group();
    }


    update(){
        
        
    }
}