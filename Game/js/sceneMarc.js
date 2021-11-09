class sceneMarc extends Phaser.Scene
{
    constructor()
    { //crea la escena
        super(
        {
            key:"sceneMarc"
        });
    }
    preload()
    { //carga los assets en memoria
        this.cameras.main.setBackgroundColor("#4488AA");
        var rutaImg = 'assets/img/';
        var rutaSnd = 'assets/snd/';

    }
    create()
    { //carga los assets en pantalla desde memoria
    }

    loadSounds()
    {
    }

    loadAnimations()
    {
    }

    loadPulls()
    {
    }


    update()
    { //actualiza assets

    }
}