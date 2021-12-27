import Datatype from 'faker/lib/datatype';
import Mersenne from 'faker/lib/mersenne';
import Unique from 'faker/lib/unique';
import Random from 'faker/lib/random';
import Helpers from 'faker/lib/helpers';

function Faker(opts) {
	var self = this;

	opts = opts || {};

	var locales = self.locales || opts.locales || {};
	var locale = self.locale || opts.locale || 'en';
	var localeFallback = self.localeFallback || opts.localeFallback || 'en';

	self.locales = locales;
	self.locale = locale;
	self.localeFallback = localeFallback;
	self.definitions = {};
	self.unique = new Unique(self).unique;
	self.mersenne = new Mersenne();
	self.random = new Random(self);
	self.helpers = new Helpers(self);
	self.datatype = new Datatype(self);
}

var faker = new Faker({ locale: 'en', localeFallback: 'en' });
faker.locales.en = {};

export default faker;
