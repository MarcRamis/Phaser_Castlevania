var gamePrefs=
{
}

var mainCharacterPrefs=
{
    jumpForce:300,
    frameRate:6,
    frameRateAttack:16,
    isAttacking:false,
    isLargeAttack:true,
    speed:100
}

var config=
{
    type: Phaser.AUTO,
    width:256,
    height:240,
    //scene:[menu,gameState], //array con los niveles
    scene:[playerScene],
    render:{
        pixelArt:true
    },
    scale:{
        mode:Phaser.Scale.FIT,
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

