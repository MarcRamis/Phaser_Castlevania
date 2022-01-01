var gamePrefs=
{
    gameWidth:2816,
    gameHeight:208,
    playerWidth:224,
    bossFinalEvent:false,
    bossHealth:16
}

var mainCharacterPrefs=
{
    health:16,
    jumpForce:300,
    frameRate:6,
    frameRateAttack:16,
    isAttacking:false,
    isSpecialAttacking:false,
    isLargeAttack:false,
    speed:100,
    mana:0,
    stage:1,
    weapon: WeaponType.NONE
}

var config=
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    //Scenes --> 'level1' & 'level1Water' 
    scene:[level1],
    render:{
        pixelArt:true
    },
    scale:{
        mode:Phaser.Scale.FIT,
        width: gamePrefs.playerWidth,
        height: gamePrefs.gameHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:1000},
            debug:true
        }
    }
}
var juego = new Phaser.Game(config);
