var gamePrefs=
{
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
    width:2816, //2816  256
    height:208, // 208  240
    //Scenes --> 'playerScene' 'level1', & 'gameState' 
    scene:[level1],
    render:{
        pixelArt:true
    },
    scale:{
        mode:Phaser.Scale.FIT,
        // width:2816 /1.5,
        // height:208,
        width:256,
        height:208,
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
