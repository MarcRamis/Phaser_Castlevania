var gamePrefs=
{
    speedNave:2,
    speedBullet:-100,
    speedEnemy:20,
    BULLET_ENEMY_SPEED:100,
    POWER_UP_SPEED:20,
    puntos:0
}

var config=
{
    type: Phaser.AUTO,
    width:256,
    height:240,
    //scene:[menu,gameState], //array con los niveles
    scene:[gameState],
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

