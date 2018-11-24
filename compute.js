const normalActivity = {
	period: { min: 15000, max: 135000 },
	amount: { min: 0.4, max: 0.8 }
};
const volcanoEruption = {
	period: { min: 6000, max: 12000 },
	amount: { min: 0.005, max: 0.01 }
};
const metalEruption = {
	period: { min: 480, max: 1080 },
	amount: { min: 1/60, max: 0.1 }
};
const normalEruption = {
	period: { min: 60, max: 1140 },
	amount: { min: 0.1, max: 0.9 }
};

const volcanoes = {
	gas: [
		{
			name: 'Cool Steam Vent',
			shortName: 'SteamCold',
			material: ['Steam', 110],
			avgYield: { min: 200, max: 2500 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Steam Vent (500C)',
			shortName: 'SteamHot',
			material: ['Steam', 500],
			avgYield: { min: 10, max: 100 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Carbon Dioxide Vent',
			shortName: 'CO2Vent',
			material: ['Carbon Dioxide', 500],
			avgYield: { min: 5, max: 50 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Hydrogen Vent',
			shortName: 'HVent',
			material: ['Hydrogen', 500],
			avgYield: { min: 5, max: 50 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Hot Polluted Oxygen Vent',
			shortName: 'PO2',
			material: ['Polluted Oxygen', 500],
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Infectious Polluted Oxygen Vent',
			shortName: 'IPO2',
			material: ['Polluted Oxygen', 60],
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Chlorine Gas Vent',
			shortName: 'Chl',
			material: ['Chlorine', 500],
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Natural Gas Geyser',
			shortName: 'NatGas',
			material: ['Natural Gas', 150],
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		}
	],
	liq: [
		{
			name: 'Water Geyser',
			shortName: 'Water',
			material: ['Water', 95],
			avgYield: { min: 500, max: 5000 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Cool Slush Geyser',
			shortName: 'Slush',
			material: ['Polluted Water', -10],
			avgYield: { min: 500, max: 5000 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Polluted Water Vent',
			shortName: 'PWater',
			material: ['Polluted Water', 30],
			avgYield: { min: 500, max: 5000 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Carbon Dioxide Geyser',
			shortName: 'CO2Geyser',
			material: ['Carbon Dioxide', -55.15],
			avgYield: { min: 3, max: 30 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Leaky Oil Fissure',
			shortName: 'Oil',
			material: ['Crude Oil', 326.85],
			avgYield: { min: 1, max: 250 },
			eruption: {
				period: { min: 600, max: 600 },
				amount: { min: 1, max: 1 }
			},
			activity: normalActivity
		}
	],
	volc: [
		{
			name: 'Minor Volcano',
			shortName: 'VolcSmall',
			material: ['Magma', 1726.85],
			avgYield: { min: 100, max: 1000 },
			eruption: volcanoEruption,
			activity: normalActivity
		},
		{
			name: 'Volcano',
			shortName: 'VolcBig',
			material: ['Magma', 1726.85],
			avgYield: { min: 200, max: 2000 },
			eruption: volcanoEruption,
			activity: normalActivity
		},
		{
			name: 'Copper Volcano',
			shortName: 'Copper',
			material: ['Copper', 2226.85],
			avgYield: { min: 50, max: 500 },
			eruption: metalEruption,
			activity: normalActivity
		},
		{
			name: 'Iron Volcano',
			shortName: 'Iron',
			material: ['Iron', 2526.85],
			avgYield: { min: 50, max: 500 },
			eruption: metalEruption,
			activity: normalActivity
		},
		{
			name: 'Gold Volcano',
			shortName: 'Gold',
			material: ['Gold', 2626.85],
			avgYield: { min: 50, max: 500 },
			eruption: metalEruption,
			activity: normalActivity
		}
	]
};

const materials = {
	'Steam': 4.179,
	'Water': 4.179,
	'Polluted Water': 4.179,
	'Carbon Dioxide': 0.846,
	'Hydrogen': 2.4,
	'Polluted Oxygen': 1.01,
	'Chlorine': 0.48,
	'Crude Oil': 1.69,
	'Natural Gas': 2.191,
	'Magma': 1,
	'Copper': 0.385,
	'Iron': 0.449,
	'Gold': 0.129
};

const calcRoll = (low, high, val) => {
	const val1 = (val-low) / (high-low);
	if (val1 < 0) return [val1, 0];
	if (val1 > 1) return [val1, 1];
	
	//Inverse of: y = 1 - ((log((1.0 / (x * 0.995054754 + 0.002472623) - 1.0)) + 6) / 12)
	//This is the function that the game uses to convert raw rolls, causing them to bunch up towards the middle a lot.
	const pow = Math.pow(Math.E, val1*12);
	const val2 = 1 - (404.431 - 0.00248491 * pow) / (403.429 + pow);
	
	return [val1, val2];
};

const rollify = (input, data) => {
	if (typeof data === 'object') {
		if (data.min) {
			return { value: input, roll: calcRoll(data.min, data.max, input) };
		}
		else {
			const result = {};
			Object.keys(input).forEach((key, index) => {
				result[key] = rollify(input[key], data[key]);
			});
			return result;
		}
	}
	else return input;
};

const analyze = (type, rate, eruption, activity, startTemp, endTemp) => {
	if (!type || !rate || !eruption || !startTemp || !endTemp) return;
	let volcano = null;
	[...volcanoes.gas, ...volcanoes.liq, ...volcanoes.volc].forEach(volc => {
		if (volc.name === type) {
			volcano = volc;
			return;
		}
	});
	if (!volcano) return;
	
	const result = {};
	
	let data = {};
	data.eruption = { period: eruption.length, amount: eruption.amount/eruption.length };
	data.activity = activity && { period: activity.length, amount: activity.amount/activity.length };
	if (data.activity) {
		data.avgYield = rate * data.eruption.amount * data.activity.amount;
		result.volcano = rollify(data, volcano);
		
		result.storage = {};
		result.storage.activeRate = rate * data.eruption.amount;
		result.storage.excessRate = result.storage.activeRate - data.avgYield;
		result.storage.totalStorage = result.storage.excessRate * activity.amount;
	}
	else {
		data.avgYield = rate * data.eruption.amount * (volcano.activity.amount.min + volcano.activity.amount.max) / 2;
		data.avgYieldRange = [Math.max(rate * data.eruption.amount * volcano.activity.amount.min, volcano.avgYield.min), Math.min(rate * data.eruption.amount * volcano.activity.amount.max, volcano.avgYield.max)];
		result.volcano = rollify(data, volcano);
		result.volcano.avgYieldRange[0] = rollify(result.volcano.avgYieldRange[0], volcano.avgYield);
		result.volcano.avgYieldRange[1] = rollify(result.volcano.avgYieldRange[1], volcano.avgYield);
	}
	result.volcano.name = type;
	if (!volcano.material) return result;
	
	result.cooling = {};
	result.cooling.targetTemp = 20; // room temperature
	result.cooling.perGramDTU = (materials[volcano.material[0]] * (volcano.material[1] - result.cooling.targetTemp));
	if (data.activity) {
		result.cooling.perSecDTU = result.cooling.perGramDTU * result.volcano.avgYield.value;
	}
	else {
		result.cooling.perSecDTU = [result.cooling.perGramDTU * result.volcano.avgYieldRange[0].value, result.cooling.perGramDTU * result.volcano.avgYieldRange[1].value];
	}
	
	return result;
};