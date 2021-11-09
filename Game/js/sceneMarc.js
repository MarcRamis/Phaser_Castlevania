class sceneMarc extends Phaser.Scene
{
    constructor()
    { //crea la escena
        super(
        {
            key:"sceneMarc"
        });
    }
    preload()
    { //carga los assets en memoria
        this.cameras.main.setBackgroundColor("#4488AA");
        var rutaImg = 'assets/img/';
        var rutaSnd = 'assets/snd/';

        this.load.spritesheet('mainCharacter', rutaImg + 'maincharacter_walk.png',{frameWidth:16,frameHeight:31});

    }
    create()
    { //carga los assets en pantalla desde memoria
        this.mainCharacter = this.physics.add.sprite(config.width/2, config.height, 'mainCharacter');
        this.mainCharacter.body.collideWorldBounds = true;

        this.loadAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    loadSounds()
    {
    }

    loadAnimations()
    {
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('mainCharacter',{start:0,end:2}),
            frameRate: mainCharacterPrefs.frameRate,
            repeat:-1           
        })
        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('mainCharacter',{start:3,end:5}),
            frameRate:mainCharacterPrefs.frameRate,
            repeat:-1           
        })
    }

    loadPulls()
    {
    }


    update()
    { //actualiza assets
        if (this.cursors.right.isDown)
        {
            this.mainCharacter.play('right',true);
            this.mainCharacter.x += mainCharacterPrefs.speed;
        }
        else if (this.cursors.left.isDown){
            this.mainCharacter.play('left',true);
            this.mainCharacter.x -= mainCharacterPrefs.speed;
        }
        else if(this.cursors.down.isDown || this.cursors.up.isDown)
        {

        }
        else{
            this.mainCharacter.setFrame(0);
        }
    }
}