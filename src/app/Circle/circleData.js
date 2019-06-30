import colors from '../colors';
import {FIRE, WATER, EARTH, AIR, icons} from '../alchemyElements';

import {fireFill, fireStroke, waterFill, waterStroke, earthFill, earthStroke, airFill, airStroke} from '../alchemyElements';
const defaultData = [
  {
    index: 0,
    title: 'Fire',
    id: FIRE,
    icon: icons[FIRE],
    // fill: '#E42149',
    fill: fireFill,
    color: fireStroke,
    size: 5 / 16,
    text:
      'La genesi, secondo la prospettiva alchimista, narra che la terra sia stata creata a partire dal sole, quindi dal fuoco che rappresenta la volontà viva e autentica, il potere personale, la manifestazione del proprio essere, trasformando i propri limiti e paure in potere creatore e rigeneratore.',
    values: [
      {
        parentId: FIRE,
        index: 0,
        outerLabel: 'caos',
        icon: '↗',
        innerLabel: "l'io",
        // fill: '#E42149',
        // fill: colors.red[3],
        // color: colors.red[5],
    fill: fireFill,
    color: fireStroke,
        size: 5 / 16,
      },
      {
        index: 1,
        parentId: FIRE,
        outerLabel: 'scelta',
        icon: '↜',
        innerLabel: 'azione',
        // fill: colors.orange[3],
    fill: fireFill,
    color: fireStroke,
        // color: colors.orange[5],
    fill: fireFill,
    color: fireStroke,
        size: 3 / 16,
      },
    ]
  },
  {
    index: 1,
    title: 'Earth',
    id: EARTH,
    fill: earthFill,
    color: earthStroke,
    icon: icons[EARTH],
    size: 3 / 16,
    text:
      'La seconda fase della creazione coinvolge la terra, la materia staccatasi dal sole che ha preso una sua vita indipendente. Qui la terra rappresenta la concretizzazione , il lavoro, la realizzazione della volontà.',
    values: [
      {
        parentId: EARTH,
        index: 2,
        outerLabel: 'Attezioen',
        innerLabel: 'La Forma',
        icon: '◗',
        // fill: '#FFF146',
    fill: earthFill,
    color: earthStroke,
        size: 3 / 16,
      },
      {
        parentId: EARTH,
        index: 3,
        outerLabel: 'Repulsion',
        innerLabel: 'La Forma',
    fill: earthFill,
    color: earthStroke,
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
    fill: earthFill,
    color: earthStroke,
    size: 3 / 16,
    text:
      "Dopo la concretizzazione subentra la riflessione sull'azione compiuta, infatti la terza fase è rappresentata dall'elemento aria che è simbolicamente legato al discernimento, al pensiero, al giudizio, alla presa di coscienza, e nel fisico si traduce in direzione e leggerezza. ",
    values: [
      {
        parentId: AIR,
        index: 4,
        outerLabel: 'dialobo',
        icon: '↯',
        innerLabel: "l'altro",
        fill: airFill,
        color: airStroke,
        size: 3 / 16,
      },
      {
        parentId: AIR,
        index: 5,
        outerLabel: 'Reflessione',
        innerLabel: "Il'se",
        icon: '↹',
        fill: airFill,
        color: airStroke,
        size: 3 / 16,
      },
    ]
  },
  {
    index: 3,
    title: 'Water',
    icon: icons[WATER],
    id: WATER,
    fill: waterFill,
    color: waterStroke,
    size: 3 / 16,
    text:
      "La quarta fase è rappresentata dall'elemento acqua che simboleggia l’ adattamento , l’integrazione, la fluidità. L'acqua rappresenta la possibilità di integrare e far scorrere le esperienze all'interno della nostra vita.",
    values: [
      {
        parentId: WATER,
        index: 6,
        outerLabel: 'transformation',
        icon: '⇝',
        innerLabel: "Il'se",
    fill: waterFill,
    color: waterStroke,
        size: 3 / 16,
      },
      {
        parentId: WATER,
        index: 7,
        outerLabel: 'integrazione',
        icon: '▣',
        innerLabel: 'Il Tutto',
        fill: '#0091E5',
    fill: waterFill,
    color: waterStroke,
        size: 5 / 16,
      },
    ]
  },
];
export default defaultData;
