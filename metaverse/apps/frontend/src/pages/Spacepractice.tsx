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
        this.load.image('table', 'table.jpeg');
        this.load.image('chair', 'sofa.jpg');
        this.load.image('sofa', 'sofa.jpg'); // Additional furniture for variety
        this.load.image('background', 'homebg.avif'); // Background image for the scene
    }

    create() {
        // Set background image and grid
        this.add.image(400, 300, 'background').setOrigin(0.5); // Centered background
        this.createGrid();

        // Create furniture layout with different areas
        this.createFurnitureLayout();

        // Add title text
        this.add.text(
            this.cameras.main.width / 2,
            30,
            'Interactive Office Space Layout',
            { font: '24px Arial', color: '#000000' }
        ).setOrigin(0.5);
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
            // Conference Room Area
            { type: 'table', x: 200, y: 200, width: 200, height: 100, name: 'Conference Table' },
            { type: 'chair', x: 150, y: 150, width: 50, height: 50, name: 'Chair 1' },
            { type: 'chair', x: 250, y: 150, width: 50, height: 50, name: 'Chair 2' },
            { type: 'chair', x: 350, y: 150, width: 50, height: 50, name: 'Chair 3' },

            // Collaboration Area
            { type: 'sofa', x: 600, y: 400, width: 200, height: 100, name: 'Collaboration Sofa' },
            { type: 'chair', x: 550, y: 350, width: 50, height: 50, name: 'Collab Chair 1' },
            { type: 'chair', x: 650, y: 350, width: 50, height: 50, name: 'Collab Chair 2' },

            // Casual Area
            { type: 'table', x: 100, y: 450, width: 120, height: 70, name: 'Casual Table' },
            { type: 'chair', x: 50, y: 400, width: 50, height: 50, name: 'Casual Chair 1' },
            { type: 'chair', x: 150, y: 400, width: 50, height: 50, name: 'Casual Chair 2' },

            // Lounge Area
            { type: 'sofa', x: 500, y: 100, width: 250, height: 120, name: 'Lounge Sofa' },
        ];

        // Create furniture with enhanced interactions
        furnitureConfig.forEach((config) => {
            const imageKey = config.type === 'table' ? 'table' : config.type === 'sofa' ? 'sofa' : 'chair';
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
            width: 800,
            height: 600,
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
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-center">Interactive Office Space Layout</h2>
                <p className="text-center text-gray-600 mt-2">Click on furniture to select, hover to highlight</p>
            </div>

            <div ref={parentEl} className="mx-auto border-2 border-gray-300 rounded-lg shadow-lg"></div>
        </div>
    );
};

export default PhaserSpaceLayout;
