var gamePrefs=
{
    gameWidth:2816,
    gameHeight:208,
    playerWidth:224
}

var mainCharacterPrefs=
{
    jumpForce:300,
    frameRate:6,
    frameRateAttack:16,
    isAttacking:false,
    isSpecialAttacking:false,
    isLargeAttack:false,
    speed:100
}

var config=
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    //Scenes --> 'playerScene' 'level1', & 'gameState' 
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
