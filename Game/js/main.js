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
    isStairs:false,
    isDiagonalMovementRight: false,
    isDiagonalMovementLeft: false,
    speed:100,
    mana:0,
    stage:1,
    score:0,
    timer:300,
    weapon: WeaponType.NONE,
    comeFromWater: false
}

var config=
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[level1, level1Water],
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
            gravity:{y:1000}
        }
    }
}
var juego = new Phaser.Game(config);
