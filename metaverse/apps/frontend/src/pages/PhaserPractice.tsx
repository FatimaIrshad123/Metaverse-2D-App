import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const sizes = {
  width: 1000,
  height: 800,
};

class GameScene extends Phaser.Scene {
  avatar!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('avatar', '/avatar.png');
    this.load.image('background', 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/N4XpyYnWRAiFz9CP/jDBuCZ53Lz9AwEGxROt7m4');
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
   
    this.avatar = this.physics.add.sprite(sizes.width / 2, sizes.height / 2, 'avatar');
    this.avatar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard!.createCursorKeys() ?? undefined;
  }

  update() {
    const speed = 200;

    if (this.cursors?.left?.isDown) {
      this.avatar.setVelocityX(-speed);
    } else if (this.cursors?.right?.isDown) {
      this.avatar.setVelocityX(speed);
    } else {
      this.avatar.setVelocityX(0);
    }

    if (this.cursors?.up?.isDown) {
      this.avatar.setVelocityY(-speed);
    } else if (this.cursors?.down?.isDown) {
      this.avatar.setVelocityY(speed);
    } else {
      this.avatar.setVelocityY(0);
    }
  }
}

const PhaserPractice: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: sizes.width,
      height: sizes.height,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: true,
        },
      },
      scene: [GameScene],
      parent: gameContainerRef.current ?? undefined, // Attach the game to the div
    };

    const game = new Phaser.Game(config);

    return () => {
      // Clean up the Phaser game instance on unmount
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainerRef} style={{ width: sizes.width, height: sizes.height }} />;
};

export default PhaserPractice;
