import colors from './colors';
import {FIRE, WATER, EARTH, AIR, icons} from '../alchemyElements';

const defaultData = [
  {
    index: 0,
    title: 'Fire',
    id: FIRE,
    icon: icons[FIRE],
    // fill: '#E42149',
    fill: colors.red[3],
    color: colors.red[5],
    size: 5 / 16,
    text:
      'Fire is considered as the material part of Light. It is the beginning of creativity -Sacred Fire-. That energy that you feel when you get ideas, when you start a project, when your mind give the impulse of a movement til that movement is done.  I connect my conscious to the Fire, It is me and i am It. A burning dance, projection of lights and shadows. The shape appear.',
    values: [
      {
        parentId: FIRE,
        index: 0,
        outerLabel: 'caos',
        icon: '↗',
        innerLabel: "l'io",
        // fill: '#E42149',
        fill: colors.red[3],
        color: colors.red[5],
        size: 5 / 16,
      },
      {
        index: 1,
        parentId: FIRE,
        outerLabel: 'scelta',
        icon: '↜',
        innerLabel: 'azione',
        fill: colors.orange[3],
        color: colors.orange[5],
        size: 3 / 16,
      },
    ]
  },
  {
    index: 1,
    title: 'Earth',
    id: EARTH,
    fill: colors.orange[3],
    color: colors.orange[5],
    icon: icons[EARTH],
    size: 3 / 16,
    text:
      'Path of matter, of unity. Materialisation of the movement.  Under the light of the fire shapes takes place. Molecular system exist. Climbing Golem grow. From chaos a movement is born, give his own vibration to the entire system. Turn and turn and turn. Gyrating movement everywhere. Light caress the soil, soil embrace the sky. The trans can take place.',
    values: [
      {
        parentId: EARTH,
        index: 2,
        outerLabel: 'Attezioen',
        innerLabel: 'La Forma',
        icon: '◗',
        // fill: '#FFF146',
        fill: colors.yellow[3],
        color: colors.yellow[5],
        size: 3 / 16,
      },
      {
        parentId: EARTH,
        index: 3,
        outerLabel: 'Repulsion',
        innerLabel: 'La Forma',
        fill: colors.lime[3],
        color: colors.lime[5],
        size: 3 / 16,
      },
    ]
  },
  {
    index: 2,
    id: AIR,
    title: 'Air',
    icon: icons[AIR],
    // fill: '#FFF146',
    fill: colors.yellow[3],
    color: colors.yellow[5],
    size: 3 / 16,
    text:
      "Path of transmission, communication, duality- multiplicity.  Air, The permanent movement: inspiration- expiration guide a pneumatic of every instant and that air is going everywhere, in each part of my body. The air is what I share with all beings of Planet Earth. It is the element which leads me to enter in contact with the Other. When.i move i sculpt the air, and the air, invisible sculpt my movement. It is flotting like the ideas, full of wind which blow on the mill's wheel. And more i guide my respiration, less i use energy.",
    values: [
      {
        parentId: AIR,
        index: 4,
        outerLabel: 'dialobo',
        icon: '↯',
        innerLabel: "l'altro",
        fill: colors.cyan[3],
        color: colors.cyan[5],
        size: 3 / 16,
      },
      {
        parentId: AIR,
        index: 5,
        outerLabel: 'Reflessione',
        innerLabel: "Il'se",
        icon: '↹',
        fill: colors.fuschia[3],
        color: colors.fuschia[5],
        size: 3 / 16,
      },
    ]
  },
  {
    index: 3,
    title: 'Water',
    icon: icons[WATER],
    id: WATER,
    fill: colors.lime[3],
    color: colors.blue[3],
    size: 3 / 16,
    text:
      'Path of vibrations, emotional world. Diving into the other side of myself, the up-side-down. The All.  After discovering the One, i do the epxperience of the All. My emotions move inside and create movements outside which create emotions inside which... and create a wave all around me, and affect what is in the area. I can create a storm like i can create a peacefull weather. Whatever it will be, it will be in accordance with the cosmos, link to it.',
    values: [
      {
        parentId: WATER,
        index: 6,
        outerLabel: 'transformation',
        icon: '⇝',
        innerLabel: "Il'se",
        fill: colors.indigo[3],
        color: colors.indigo[5],
        size: 3 / 16,
      },
      {
        parentId: WATER,
        index: 7,
        outerLabel: 'integrazione',
        icon: '▣',
        innerLabel: 'Il Tutto',
        fill: '#0091E5',
        color: colors.blue[5],
        size: 5 / 16,
      },
    ]
  },
];
export default defaultData;
