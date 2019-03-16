import Matter from "matter-js";
import { Box } from '../renderers';

let boxIds = 0;
export const CreateBox = (entities, { touches, screen }) => {
    let world = entities["physics"].world;
    let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
    touches.filter(t => t.type === "press").forEach(t => {
            let body = Matter.Bodies.rectangle(
                       t.event.pageX, t.event.pageY,
                       boxSize, boxSize,
                       {
                         frictionAir: 0.021
                       });
            Matter.World.add(world, [body]);
                entities[++boxIds] = {
                    body: body,
                    size: [boxSize, boxSize],
                    renderer: Box
                };
             });
    return entities;
};
