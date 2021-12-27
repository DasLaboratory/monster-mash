import faker from './js/slim-faker.js';
import monsters from './data/monsters.js';
import colors from 'faker/lib/locales/en/commerce/color.js';

function getColoredMonster() {
	const color = faker.random.arrayElement(colors).replace(/\s/g, '-').toLowerCase();
	const monster = faker.random.arrayElement(monsters).replace(/\s/g, '-').toLowerCase();
	return color + '-' + monster;
}

function getUniqueMonster() {
	return faker.unique(getColoredMonster, null, { maxTime: 500 });
}

export default getUniqueMonster;
