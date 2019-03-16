import {FIRE, WATER, EARTH, AIR} from '../alchemyElements';

const events = [
  {title: 'Event', date: '24/06/19', type: FIRE},
  {title: 'Event 1', date: '24/06/19', type: WATER},
  {title: 'Event 2', date: '24/06/19', type: FIRE},
  {title: 'YOYO EVENT', date: '24/06/19', type: WATER},
  {title: 'WOrkShop', date: '24/06/19', type: EARTH},
  {title: 'yoyo event what', date: '24/06/19', type: WATER},
  {title: 'another event yoyo', date: '24/06/19', type: AIR},
  {title: 'dance workshop', date: '24/06/19', type: AIR},
  {title: 'tarot night', date: '24/06/19', type: FIRE},
  {title: 'music jam', date: '24/06/19', type: WATER},
  {title: 'DIY workshop', date: '24/06/19', type: AIR},
  {title: 'Bike atelier', date: '24/06/19', type: EARTH},
  {title: 'another free jam party', date: '24/06/19', type: WATER},
  {title: 'Vogueing workshop', date: '24/06/19', type: WATER},
  {title: 'Disco Party', date: '24/06/19', type: AIR},
  {title: 'Dance Improvisation', date: '24/06/19', type: FIRE},
  {title: 'House Party', date: '24/06/19', type: WATER},
  {title: 'History of dance music', date: '24/06/19', type: WATER},
  {title: 'DJ workshop', date: '24/06/19', type: AIR},
  {title: 'mask workshop', date: '24/06/19', type: AIR},
  {title: 'final parade', date: '24/06/19', type: EARTH},
].map((d, i) => ({id: i, ...d}));

export default events;
