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
    }

    loadPulls()
    {
    }


    update()
    { //actualiza assets
        /*if(!redEnemy.active)
            {
                this.redEnemy.active = true;
                this.redEnemy.body.reset(this.redEnemy.width,this.redEnemy.height);
                this.redEnemy.Move(1);
            }*/


        /*Phaser.Actions.Call(this.panthers.getChildren(), function(){
            //this.children.panthers.DetectFloor(1);
        }, this);*/
        /*for(var i = 0; i < this.panthers.children.length; i++)
        {
            this.panthers.children[i].SetPlayerDirection(-1);
            this.panthers.children[i].Move(-1);
            this.panthers[i].body.setVelocityX(25 * -1);
        }*/

        /*this.panthers.forEachAlive(function (enemy)
        {
            enemy.SetPlayerDirection(1);
        }, this);*/

        this.panthers.children.iterate((child) => 
        {
            //child.SetPlayerDirection(1);
            //child.Jump(1);
            child.GetPlayerPos(new Phaser.Math.Vector2(255, 255));
        })

    }


}
