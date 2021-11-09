var gamePrefs=
{
}

var mainCharacterPrefs=
{
    frameRate:5,
    speed:1.2
}

var config=
{
    type: Phaser.AUTO,
    width:128,
    height:256,
    //scene:[menu,gameState], //array con los niveles
    scene:[sceneMarc],
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
            gravity:{y:10},
            debug:true
        }
    }
}
var juego = new Phaser.Game(config);

