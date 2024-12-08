import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

// Space Scene (enhanced layout)
class SpaceScene extends Phaser.Scene {
    furniture: Phaser.GameObjects.Image[] = [];
    selectedObject: Phaser.GameObjects.Image | null = null;

    constructor() {
        super('SpaceScene');
    }

    preload() {
        // Load images for furniture (Make sure the paths are correct)
        this.load.image('table', 'tableset.png');
        this.load.image('conferencetable', 'conferencetable.png');
        this.load.image('sofa', 'sofaset.png'); // Additional furniture for variety
        this.load.image('background', 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/N4XpyYnWRAiFz9CP/jDBuCZ53Lz9AwEGxROt7m4'); // Background image for the scene
    }

    create() {
        // Set background image and grid
        this.add.image(400, 300, 'background').setOrigin(0.5); // Centered background
        this.createGrid();

        // Create furniture layout with different areas
        this.createFurnitureLayout();
    }

    createGrid() {
        const gridSize = 50;
        const width = this.game.config.width as number;
        const height = this.game.config.height as number;

        // Create subtle grid for alignment
        for (let x = 0; x < width; x += gridSize) {
            for (let y = 0; y < height; y += gridSize) {
                this.add.rectangle(x, y, gridSize, gridSize, 0xcccccc, 0.1)
                    .setOrigin(0)
                    .setStrokeStyle(1, 0xaaaaaa, 0.2);
            }
        }
    }

   createFurnitureLayout() {
        const furnitureConfig = [
            { type: 'table', x: 250, y: 100, width: 200, height: 100},
            { type: 'conferencetable', x: 700, y: 50, width: 150, height: 100 },
            { type: 'sofa', x: 600, y: 600, width: 200, height: 100 },
            { type: 'sofa', x: 300, y: 600, width: 200, height: 100 },
        ];

        // Create furniture with enhanced interactions
        furnitureConfig.forEach((config) => {
            const imageKey = config.type === 'table' ? 'table' : config.type === 'sofa' ? 'sofa' : config.type === 'conferencetable' ? 'conferencetable': 'chair';
            const furniture = this.add.image(config.x, config.y, imageKey)
                .setOrigin(0)
                .setInteractive()
                .setDisplaySize(config.width, config.height)
                .setAlpha(0.8);

            // Add name text on top of the furniture
            this.add.text(config.x + config.width / 2, config.y + config.height / 2, config.name, {
                font: '14px Arial',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            // Hover effects for furniture
            furniture.on('pointerover', () => {
                furniture.setAlpha(1); // Full opacity when hovered
                furniture.setScale(1.05); // Slight zoom effect on hover
            });

            furniture.on('pointerout', () => {
                furniture.setAlpha(0.8); // Return to normal opacity
                furniture.setScale(1); // Reset scale
            });

            // Click interactions to select furniture
            furniture.on('pointerdown', () => {
                if (this.selectedObject) {
                    this.selectedObject.setStrokeStyle(2, 0x000000, 0.3); // Deselect previous object
                }

                this.selectedObject = furniture;
                furniture.setStrokeStyle(4, 0xff0000, 1); // Highlight selected object
                console.log(`Selected: ${config.name}`); // Display selected furniture name in console
            });
        });
    }
}

// Phaser Game Component
const PhaserSpaceLayout = () => {
    const gameRef = useRef<Phaser.Game | null>(null);
    const parentEl = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Game configuration
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            
            parent: parentEl.current!,
            scene: [SpaceScene],
            backgroundColor: 0xf0f0f0
        };

        // Create the game instance
        const game = new Phaser.Game(config);

        gameRef.current = game;

        // Cleanup function
        return () => {
            game.destroy(true);
            gameRef.current = null;
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div className="p-4 bg-gray-100">
            <div ref={parentEl} className="mx-auto border-2 border-gray-300 rounded-lg shadow-lg"></div>
        </div>
    );
};

export default PhaserSpaceLayout;
