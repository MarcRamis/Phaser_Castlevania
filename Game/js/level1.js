class level1 extends Phaser.Scene{
    constructor(){
        super({key:"level1"});
    }
    preload(){
        //this.load.setPath("assets/sprites/");

        this.load.setPath("assets/map/Sprite-Sheets/");
        this.load.image('Level-1_TileSheet','Castelvania-Sheet.png');

        this.load.setPath("assets/map/");
        this.load.tilemapTiledJSON('level_1','Cstelvania_NES_Level-1.json');

    }
    create(){
        //Pintamos el nivel
        //Cargo el JSON
        this.map = this.add.tilemap('level_1');
        //Cargo los Tilesets
        this.map.addTilesetImage('Level-1_TileSheet');
        //Pintamos las capas/layers
        this.walls = this.map.createLayer('Ground','Level-1_TileSheet');
        this.map.createLayer('BackGround','Level-1_TileSheet');
        this.stairs = this.map.createLayer('Stairs','Level-1_TileSheet');
        this.stairsNextScene = this.map.createLayer('Stairs-ChangeScene','Level-1_TileSheet');
        this.doors = this.map.createLayer('Door','Level-1_TileSheet');
        //this.map.createLayer('moss_left_layer','tileset_moss');
        //this.map.createLayer('moss_right_layer','tileset_moss');
        //this.map.createLayer('moss_bottom_layer','tileset_moss');
        //Indicamos las colisiones con paredes/suelo/techo
        this.map.setCollisionBetween(1,11,true,true,'Ground');

        
        //Pintamos la puerta
        /*
        this.entry = this.physics.add.sprite(65,268,'entry');
        this.entry.body.allowGravity = false;
        this.entry.body.immovable = true;
        this.entry.body.setSize(24,34,true).setOffset(4,6);
        */
        //Pintamos al hero
        
        //Ajustamos el tamaño del body del hero y recolocamos el punto de pivote para cuadrarlo
  

        //this.physics.add.collider(this.hero,this.entry);


        //Creamos un listener para detectar colisiones entre el hero y las paredes
       
        //La camara sigue al jugador
        //this.cameras.main.startFollow(this.hero);
        //this.cameras.main.setBounds(0,0,gameOptions.level1Width, gameOptions.level1Height);

        
        //this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        

        /*this.anims.create({
            key:'run',
            frames:this.anims.generateFrameNumbers('hero',{start:2,end:5}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create({
            key:'gemIdle',
            frames:this.anims.generateFrameNumbers('gem',{start:0,end:4}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create({
            key:'jump',
            frames:this.anims.generateFrameNumbers('jumper',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create({
            key:'crawl',
            frames:this.anims.generateFrameNumbers('slime',{start:0,end:3}),
            frameRate:10,
            repeat:-1
        });*/

        //Pintamos las gemas
        
        //Cargamos el enemigo
        

        //Cargamos el enemigo
        
        //Cargamos animación del jumper <-- Me la he llevado al constructor
        //this.jumper.anims.play('jump',true);

        //Cargamos la barra de energía
        
        //Pintamos la UI
    
    }

    

    update(){
        //Movimiento izquierda-derecha
        
        //Salto
        
    }
}
