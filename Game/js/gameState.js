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
    }
    
    loadPools()
    {
        this.enemies = this.physics.add.group();
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
        
        this.redEnemy = new ghoulPrefab(this, 16, 32, 'enemyGhoul', -1);
        this.enemies.add(this.redEnemy);
        this.redEnemy.body.collideWorldBounds = true;
        
        /*var redEnemy = this.physics.add.image(20,20, 'RedEnemy');*/
        this.redEnemy.Move(-1);
    }

    loadSounds()
    {
    }

    loadAnimations()
    {
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
    }

    loadPulls()
    {
    }


    update()
    { //actualiza assets
        if(!this.redEnemy.active)
            {
                this.redEnemy.active = true;
                this.redEnemy.body.reset(this.redEnemy.width,this.redEnemy.height);
                this.redEnemy.Move(1);
            }
    }
}