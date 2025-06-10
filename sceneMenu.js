class SceneMenu extends Phaser.Scene {
  constructor() {
    super({ key: "sceneMenu" });
  }

  init(data) {
    this.highScore = localStorage.getItem("highScore") || 0;
  }

  preload() {
    // Load Properties dari folder assets
    this.load.setBaseURL("assets/");
    this.load.image("BGPlay", "images/BGPlay.png");
    this.load.image("Title", "images/Title.png");
    this.load.image("ButtonPlay", "images/ButtonPlay.png");
    this.load.image("ButtonSoundOn", "images/ButtonSoundOn.png");
    this.load.image("ButtonSoundOff", "images/ButtonSoundOff.png");
    this.load.image("ButtonMusicOn", "images/ButtonMusicOn.png");
    this.load.image("ButtonMusicOff", "images/ButtonMusicOff.png");
    this.load.audio("snd_menu", "audio/music_menu.mp3");
    this.load.audio("snd_touchshooter", "audio/fx_touch.mp3");
  }

  create() {
    // Posisi layar
    const X = this.game.canvas.width / 2;
    const Y = this.game.canvas.height / 2;

    // Tambahkan background dan judul
    this.add.image(X, Y, "BGPlay");
    this.add.image(X, Y - 250, "Title");
    this.add
      .text(X,Y - 50, `High Score: ${this.highScore}`, {
        fontSize: "54px",
        color: "#ffff00",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);
    
    // Tombol Play dan Music
    this.ButtonPlay = this.add.image(X, Y + 200, "ButtonPlay").setInteractive();
    this.ButtonMusic = this.add
      .image(X_POSITION.LEFT + 70, Y_POSITION.TOP + 70, "ButtonMusicOn")
      .setInteractive();

    let musicState = parseInt(localStorage["music_enabled"] || "1");

    if (musicState === 0) {
      this.ButtonMusic.setTexture("ButtonMusicOff");
    }

    if (!this.sound.get("snd_menu")) {
      this.music = this.sound.add("snd_menu", { loop: true, volume: 0.5 });
      if (musicState === 1) {
        this.music.play();
      }
    }

    // Efek hover
    this.input.on("gameobjectover", (_, gameObject) => {
      if (gameObject === this.ButtonPlay || gameObject === this.ButtonMusic) {
        gameObject.setTint(0x999999);
      }
    });

    this.input.on("gameobjectdown", (_, gameObject) => {
      if (gameObject === this.ButtonPlay || gameObject === this.ButtonMusic) {
        gameObject.setTint(0x999999);
      }
    });

    this.input.on("gameobjectout", (_, gameObject) => {
      if (gameObject === this.ButtonPlay || gameObject === this.ButtonMusic) {
        gameObject.clearTint();
      }
    });

    // Event klik
    this.input.on("gameobjectup", (_, gameObject) => {
      gameObject.clearTint();
      this.sound.play("snd_touchshooter", { volume: 0.5 });

      if (gameObject === this.ButtonPlay) {
        this.scene.start("scenePilihHero");
      }

      if (gameObject === this.ButtonMusic) {
        let isMusicActive = parseInt(localStorage["music_enabled"] || "1");

        if (isMusicActive === 0) {
          this.ButtonMusic.setTexture("ButtonMusicOn");
          localStorage["music_enabled"] = 1;
          this.music.play();
        } else {
          this.ButtonMusic.setTexture("ButtonMusicOff");
          localStorage["music_enabled"] = 0;
          this.music.stop();
        }
      }
    });
  }

  update() {}
}
