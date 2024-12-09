import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const VirtualOfficeSpace = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    // Prevent multiple game instances
    if (gameRef.current?.children.length) return;

    // Base64 encoded placeholder images (replace with actual images)
    const images = {
      garden: 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/N4XpyYnWRAiFz9CP/jDBuCZ53Lz9AwEGxROt7m4',
      conferenceRoom: 'conferenceroom.jpg',
      courtyard: 'https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/N4XpyYnWRAiFz9CP/jDBuCZ53Lz9AwEGxROt7m4',
      officePlace: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
    };

    // Scene class for the virtual space
    class VirtualOfficeScene extends Phaser.Scene {
      preload() {
        // Load area images
        this.load.image('garden', images.garden);
        this.load.image('conferenceRoom', images.conferenceRoom);
        this.load.image('courtyard', images.courtyard);
        this.load.image('officePlace', images.officePlace);
      }

      create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Define areas with images and positions
        const areas = [
          {
            name: 'Garden',
            key: 'garden',
            x: width * 0.25,
            y: height * 0.25,
            width: width * 0.4,
            height: height * 0.4
          },
          {
            name: 'Conference Room',
            key: 'conferenceRoom',
            x: width * 0.75,
            y: height * 0.25,
            width: width * 0.4,
            height: height * 0.4
          },
          {
            name: 'Courtyard',
            key: 'courtyard',
            x: width * 0.25,
            y: height * 0.75,
            width: width * 0.4,
            height: height * 0.4
          },
          {
            name: 'Office Place',
            key: 'officePlace',
            x: width * 0.75,
            y: height * 0.75,
            width: width * 0.4,
            height: height * 0.4
          }
        ];

        // Create areas with images
        areas.forEach(area => {
          // Create area image
          const areaImage = this.add.image(area.x, area.y, area.key);
          areaImage.setDisplaySize(area.width, area.height);

          // Add area name text
          const text = this.add.text(
            area.x - area.width / 2 + 10, 
            area.y - area.height / 2 + 10, 
            area.name, 
            { 
              font: '16px Arial', 
              color: '#000000' 
            }
          );

          // Add some interactive elements
          this.addAreaElements(this, area);
        });

        // Enable camera drag to move around
        this.cameras.main.setScroll(0, 0);
      }

      addAreaElements(scene, area) {
        // Add some simple elements to each area
        switch(area.name) {
          case 'Garden':
            // Add some trees
            scene.add.circle(
              area.x - area.width/4, 
              area.y + area.height/4, 
              20, 
              0x228B22
            );
            scene.add.circle(
              area.x + area.width/4, 
              area.y - area.height/4, 
              15, 
              0x228B22
            );
            break;
          
          case 'Conference Room':
            // Add a table and chairs
            scene.add.rectangle(
              area.x, 
              area.y, 
              area.width/2, 
              area.height/3, 
              0x8B4513
            );
            scene.add.circle(
              area.x - area.width/4, 
              area.y - area.height/4, 
              10, 
              0xA0522D
            );
            scene.add.circle(
              area.x + area.width/4, 
              area.y + area.height/4, 
              10, 
              0xA0522D
            );
            break;
          
          case 'Courtyard':
            // Add a fountain
            scene.add.circle(
              area.x, 
              area.y, 
              30, 
              0x4169E1
            );
            break;
          
          case 'Office Place':
            // Add desks
            scene.add.rectangle(
              area.x - area.width/4, 
              area.y - area.height/4, 
              area.width/3, 
              area.height/5, 
              0xD2691E
            );
            scene.add.rectangle(
              area.x + area.width/4, 
              area.y + area.height/4, 
              area.width/3, 
              area.height/5, 
              0xD2691E
            );
            break;
        }
      }
    }

    // Phaser game configuration
    const config = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: VirtualOfficeScene,
      scale: {
        mode: Phaser.Scale.RESIZE
      }
    };

    // Create game instance
    const game = new Phaser.Game(config);

    // Cleanup function
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div 
      ref={gameRef} 
      className="w-full h-screen"
    ></div>
  );
};

export default VirtualOfficeSpace;