class lampPrefab extends Phaser.GameObjects.Sprite
{
   
    constructor(_scene,_positionX,_positionY,_spriteTag)
    {
        
        super(_scene,_positionX,_positionY,_spriteTag);
        _scene.add.existing(this);
        this.s = _scene;
        this.setOrigin(0.5,0.5);
        this.anims.play("lampIdle");
        this.testTimer = 0;
        this.alive = true;
         this.dropItems = this.s.physics.add.group();

    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }

    Test(){
        this.testTimer++;
        if(this.testTimer >= 50 && this.alive){
            this.Destroy();
            this.alive = false;

        }
    }

    Destroy(){
        this.anims.play('lampDestroy');
        this.SpawnItem();
        this.on('animationcomplete', this.SetUnactive);
    }
    SetUnactive(){ 
        this.setActive(false).setVisible(false);
    }

    SpawnItem(){
        this.createRandomObject(this.x, this.y, this.dropItems); 
        
    }


    createDropItem(_typeItemTag, _posX, _posY, _dropItemsGroup) //To add to the prefab
    {
        switch(_typeItemTag)
        {
            case "LittleHeart":
                this.item = new littleHeartPrefab(this.s, _posX, _posY);
                _dropItemsGroup.add(this.item);
                this.item.body.collideWorldBounds = true;
            break;
            case "Heart":
                this.item = new heartPrefab(this.s, _posX, _posY);
                _dropItemsGroup.add(this.item);
                this.item.body.collideWorldBounds = true;
            break;
            case "MorningStar":
                this.item = new morningStarPrefab(this.s, _posX, _posY);
                _dropItemsGroup.add(this.item);
                this.item.body.collideWorldBounds = true;
                break;
            default:
                this.item = new littleHeartPrefab(this.s, _posX, _posY);
                _dropItemsGroup.add(this.item);
                this.item.body.collideWorldBounds = true;
                break;
        }
    }

    createRandomObject(_posX, _posY, _dropItemsGroup) //To add to the prefab
    {
        var randNum = Math.random() * 100;

        if(randNum < 40)
        {
            this.createDropItem("LittleHeart", _posX, _posY, _dropItemsGroup);
        }
        else if(randNum < 80)
        {
            this.createDropItem("Heart", _posX, _posY, _dropItemsGroup);
        }
        else
        {
            this.createDropItem("MorningStar", _posX, _posY, _dropItemsGroup);
        }

    }

}