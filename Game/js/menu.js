class menu extends Phaser.Scene
{
    
    constructor()
    {
        super({key: "menu"});
    }
    
    preload()
    {
    }
    
    create()
    {
    }
    
    iniciaJuego()
    {
        
    }
    
    cambiaEscena()
    {
        this.scene.start('gameState');
    }
    
    update()
    {
    }
}