import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

class SpaceScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SpaceScene' });
    this.stars = [];
    this.parallaxLayers = [];
  }

  preload() {
    // Load room elements
    this.load.image('floor', '/api/placeholder/400/300');
    this.load.image('wall', '/api/placeholder/400/300');
    this.load.image('star', '/api/placeholder/10/10');
    this.load.image('table', '/api/placeholder/200/150');
    this.load.image('sofa', '/api/placeholder/250/150');
    this.load.image('chair', '/api/placeholder/100/100');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background layers with parallax effect
    this.createParallaxBackground(width, height);

    // Create interactive furniture
    this.createFurniture(width, height);

    // Create subtle star animation
    this.createStarField(width, height);
  }

  createParallaxBackground(width, height) {
    // Wall background
    const wall = this.add.image(width / 2, height / 2, 'wall')
      .setDisplaySize(width, height)
      .setAlpha(0.7);
    this.parallaxLayers.push(wall);

    // Floor with slight movement
    const floor = this.add.image(width / 2, height / 2, 'floor')
      .setDisplaySize(width * 0.9, height * 0.8)
      .setAlpha(0.9);
    this.parallaxLayers.push(floor);
  }

  createFurniture(width, height) {
    // Table
    const table = this.add.image(width / 2, height / 2, 'table')
      .setInteractive()
      .on('pointerover', () => table.setTint(0x88ff88))
      .on('pointerout', () => table.clearTint());

    // Sofas
    const sofa1 = this.add.image(width * 0.3, height * 0.8, 'sofa')
      .setInteractive()
      .on('pointerover', () => sofa1.setTint(0x88ff88))
      .on('pointerout', () => sofa1.clearTint());

    const sofa2 = this.add.image(width * 0.7, height * 0.8, 'sofa')
      .setInteractive()
      .on('pointerover', () => sofa2.setTint(0x88ff88))
      .on('pointerout', () => sofa2.clearTint());

    // Chairs
    const chairs = [
      { x: width * 0.4, y: height * 0.4 },
      { x: width * 0.6, y: height * 0.4 },
      { x: width * 0.4, y: height * 0.6 },
      { x: width * 0.6, y: height * 0.6 }
    ];

    chairs.forEach(pos => {
      const chair = this.add.image(pos.x, pos.y, 'chair')
        .setInteractive()
        .on('pointerover', () => chair.setTint(0x88ff88))
        .on('pointerout', () => chair.clearTint());
    });
  }

  createStarField(width, height) {
    // Create a subtle star field with movement
    for (let i = 0; i < 100; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const star = this.add.image(x, y, 'star')
        .setAlpha(Phaser.Math.FloatBetween(0.1, 0.5));
      
      // Subtle star movement
      this.tweens.add({
        targets: star,
        x: x + Phaser.Math.Between(-20, 20),
        y: y + Phaser.Math.Between(-20, 20),
        duration: Phaser.Math.Between(3000, 5000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      this.stars.push(star);
    }
  }

  update() {
    // Parallax effect
    this.parallaxLayers.forEach((layer, index) => {
      const parallaxFactor = (index + 1) * 0.1;
      layer.x = this.cameras.main.scrollX * parallaxFactor;
      layer.y = this.cameras.main.scrollY * parallaxFactor;
    });
  }
}

const InteractiveSpace = () => {
  const gameRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Phaser game configuration
    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: [SpaceScene],
      backgroundColor: 0x000033,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    // Create game instance
    const game = new Phaser.Game(config);

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Phaser Game Container */}
      <div ref={gameRef} className="absolute inset-0 z-0"></div>

      {/* Overlay Info */}
      {selectedItem && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 
          bg-white/30 backdrop-blur-md rounded-full px-6 py-2 
          flex items-center space-x-2 shadow-lg z-50">
          <span>📍</span>
          <span className="text-white font-medium">
            {selectedItem}
          </span>
        </div>
      )}
    </div>
  );
};

export default InteractiveSpace;