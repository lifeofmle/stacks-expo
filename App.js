import React from 'react';
import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import { Box, Floor } from './renderers';
import { Physics, CreateBox } from './systems';

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);

const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });

Matter.World.add(world, [initialBox, floor]);

export default class App extends React.Component {
  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[Physics, CreateBox]}
        entities={{
          physics: {
            engine: engine,
            world: world
          },
          initialBox: {
            body: initialBox,
            size: [boxSize, boxSize],
            renderer: Box
          },
          floor: {
            body: floor,
            size: [width, boxSize],
            renderer: Floor
          }
        }}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
});
