class gameState extends Phaser.Scene
{
    constructor()
    { //crea la escena
        super(
        {
            key:"gameState"
        });
    }
    preload()
    { //carga los assets en memoria
        this.cameras.main.setBackgroundColor("#4488AA");
        var rutaImg = 'assets/img/';
        var rutaSnd = 'assets/snd/';
        
        
        this.load.image('RedEnemy', rutaImg+'Enemy-Box.png');
        this.load.spritesheet('enemyGhoul',rutaImg+'Enemy-Ghoul.png',
        {frameWidth: 16, frameHeight: 32});
        this.load.spritesheet('enemyPanther',rutaImg+'Enemy-Panther.png',
        {frameWidth: 32, frameHeight: 16});
        
        //Bat
        this.load.spritesheet('bat',rutaImg+'Enemy-Bat.png',
        {frameWidth: 16, frameHeight: 14});

        //FishMan
        this.load.spritesheet('fishMan',rutaImg+'Enemy-FishMan.png',{frameWidth:16, frameHeight:31});
        this.load.image('shoot', rutaImg+'Shoot.png');
    }
    
    loadPools()
    {
        this.enemies = this.physics.add.group();
        this.panthers = this.physics.add.group();
    }
    
    create()
    { //carga los assets en pantalla desde memoria
        this.loadPools();
        this.loadAnimations();
        this.physics.add.overlap
        (
            this.enemies,
            null,
            this
        );
        
        this.physics.add.overlap
        (
            this.panthers,
            null,
            this
        );

        
        this.redEnemy = new ghoulPrefab(this, 16, 32, 'enemyGhoul', -1);
        this.enemies.add(this.redEnemy);
        this.redEnemy.body.collideWorldBounds = true;
        
        /*var redEnemy = this.physics.add.image(20,20, 'RedEnemy');*/
        this.redEnemy.Move(1);

        this.redEnemy = new pantherPrefab(this, 32, 32, 'enemyPanther', -1);
        
        this.panthers.add(this.redEnemy);
        this.redEnemy.body.collideWorldBounds = true;
        
        this.redEnemy = new pantherPrefab(this, 82, 124, 'enemyPanther', 1);
        
        this.panthers.add(this.redEnemy);
        this.redEnemy.body.collideWorldBounds = true;
        
        //Bat
        this.bat = new batPrefab(this,16,25, 'bat',-1);
        this.enemies.add(this.bat);
        this.bat.body.collideWorldBounds = true;
        this.bat.Move(1);
        this.bat.body.setGravity(0,-1000);

        //FishMan
        this.fishMan = new fishMan(this,50,191,'fishMan', -1);
        this.enemies.add(this.fishMan);
        this.fishMan.body.collideWorldBounds = false;
        this.fishMan.body.setGravity(0,-1000);

        /*var redEnemy = this.physics.add.image(20,20, 'RedEnemy');*/
        //this.redEnemy.DetectFloor(1);
        //this.redEnemy.Move(1);
    }

    loadSounds()
    {
    }

    loadAnimations()
    {
        //Ghoul-Anim
        this.anims.create({
            key: 'ghoulWalk-Left',
            frames: this.anims.generateFrameNumbers('enemyGhoul', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'ghoulWalk-Right',
            frames: this.anims.generateFrameNumbers('enemyGhoul', { start: 2, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        //Panther-Anim
        this.anims.create({
            key: 'pantherWalk-Left',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherWalk-Right',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 6, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherJump-Left',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 2, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherJump-Right',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 5, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherIdle-Left',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 3, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pantherIdle-Right',
            frames: this.anims.generateFrameNumbers('enemyPanther', { start: 4, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'batWalk-Right',
            frames: this.anims.generateFrameNumbers('bat', { start: 3, end: 5 }),
            frameRate: 7,
            repeat: -1
        });  
        this.anims.create({
            key: 'batWalk-Left',
            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 2 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'fishmanWalk-Right',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 3, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'fishmanWalk-Left',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 2, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'fishmanJump',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 3, end: 3 }),

        });
        this.anims.create({
            key: 'fishmanShoot-Right',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 5, end: 5 }),

        });
        this.anims.create({
            key: 'fishmanShoot-Left',
            frames: this.anims.generateFrameNumbers('fishMan', { start: 0, end: 0 }),

        });

    }

    loadPulls()
    {
    }


    update()
    { //actualiza assets
        // if(!redEnemy.active)
        //     {
        //         this.redEnemy.active = true;
        //         this.redEnemy.body.reset(this.redEnemy.width,this.redEnemy.height);
        //         this.redEnemy.Move(1);
        //     }


        // Phaser.Actions.Call(this.panthers.getChildren(), function(){
        //     //this.children.panthers.DetectFloor(1);
        // }, this);
        // for(var i = 0; i < this.panthers.children.length; i++)
        // {
        //     this.panthers.children[i].SetPlayerDirection(-1);
        //     this.panthers.children[i].Move(-1);
        //     this.panthers[i].body.setVelocityX(25 * -1);
        // }

        // this.panthers.forEachAlive(function (enemy)
        // {
        //     enemy.SetPlayerDirection(1);
        // }, this);
        
        
        //Bat
        this.bat.Update();
        
        //FishMan
        this.fishMan.Update();


        this.panthers.children.iterate((child) => 
        {
            //child.SetPlayerDirection(1);
            child.Jump(1);
            //child.GetPlayerPos(new Phaser.Math.Vector2(255, 255));
        })

    }


}
