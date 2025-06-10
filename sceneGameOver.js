class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "sceneGameOver" });
  }

  init(data) {
    this.currentScore = parseInt(localStorage.getItem("currentScore")) || 0;
    this.highScore = parseInt(localStorage.getItem("highScore")) || 0;

    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      localStorage.setItem("highScore", this.highScore);
    }
  }

  preload() {
    this.load.setBaseURL("assets/");
    this.load.image("BGPlay", "images/BGPlay.png");
    this.load.image("ButtonPlay", "images/ButtonPlay.png");
    this.load.image("ButtonMenu", "images/ButtonMenu.png");
    this.load.audio("snd_gameover", "audio/music_gameover.mp3");
    this.load.audio("snd_touchshooter", "audio/fx_touch.mp3");
  }

  create() {
    this.add.image(0, 0, "BGPlay").setOrigin(0, 0);

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const styleTitle = { fontSize: "80px", fill: "#ff0000", fontFamily: "Arial" };
    const styleScore = { fontSize: "48px", fill: "#ffffff", fontFamily: "Arial" };
    const styleHigh = { fontSize: "48px", fill: "#ffff00", fontFamily: "Arial" };

    this.add.text(centerX, centerY - 260, "GAME OVER", styleTitle).setOrigin(0.5);
    this.add.text(centerX, centerY - 125, `Skor Mu: ${this.currentScore}`, styleScore).setOrigin(0.5);
    this.add.text(centerX, centerY - 50, `High Score: ${this.highScore}`, styleHigh).setOrigin(0.5);

    this.buttonPlay = this.add.image(centerX, centerY + 200, "ButtonPlay").setInteractive();
    this.buttonMenu = this.add.image(X_POSITION.LEFT + 70, Y_POSITION.TOP + 120, "ButtonMenu").setInteractive();

    this.gameOverMusic = this.sound.add("snd_gameover", { volume: 0.5, loop: false });
    if (!this.gameOverMusic.isPlaying) this.gameOverMusic.play();

    this.input.on("gameobjectover", (_, go) => go.setTint(0x999999));
    this.input.on("gameobjectdown", (_, go) => go.setTint(0x999999));
    this.input.on("gameobjectout", (_, go) => go.clearTint());

    this.input.on("gameobjectup", (_, go) => {
      go.clearTint();
      this.sound.play("snd_touchshooter", { volume: 0.5 });
      if (this.gameOverMusic.isPlaying) this.gameOverMusic.stop();

      if (go === this.buttonPlay) {
        this.scene.start("scenePlay");
      } else if (go === this.buttonMenu) {
        this.scene.start("sceneMenu");
      }
    });
  }

  update() {}
}
