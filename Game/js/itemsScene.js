class itemsScene extends Phaser.Scene
{
    constructor(){
        super({key:"itemsScene"});
    }
    preload(){

        this.load.setPath("assets/map/Sprite-Sheets/");
        this.load.image('Level-1_TileSheet','Castelvania-Sheet.png');

        this.load.setPath("assets/map/");
        this.load.tilemapTiledJSON('level_1','Cstelvania_NES_Level-1.json');

    }
    create(){
        

        
        
    
    }

    

    update(){
        
        
    }
}