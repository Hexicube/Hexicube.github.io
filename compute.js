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
			avgYield: { min: 200, max: 2500 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Steam Vent (500C)',
			avgYield: { min: 10, max: 100 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Carbon Dioxide Vent',
			avgYield: { min: 5, max: 50 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Hydrogen Vent',
			avgYield: { min: 5, max: 50 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Hot Polluted Oxygen Vent',
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Infectious Polluted Oxygen Vent',
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Chlorine Gas Vent',
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Natural Gas Geyser',
			avgYield: { min: 15, max: 180 },
			eruption: normalEruption,
			activity: normalActivity
		}
	],
	liq: [
		{
			name: 'Water Geyser',
			avgYield: { min: 500, max: 5000 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Cool Slush Geyser',
			avgYield: { min: 500, max: 5000 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Polluted Water Vent',
			avgYield: { min: 500, max: 5000 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Carbon Dioxide Geyser',
			avgYield: { min: 3, max: 30 },
			eruption: normalEruption,
			activity: normalActivity
		},
		{
			name: 'Leaky Oil Fissure',
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
			material: 'magma',
			temp: 1726.85,
			avgYield: { min: 100, max: 1000 },
			eruption: volcanoEruption,
			activity: normalActivity
		},
		{
			name: 'Volcano',
			material: 'magma',
			temp: 1726.85,
			avgYield: { min: 200, max: 2000 },
			eruption: volcanoEruption,
			activity: normalActivity
		},
		{
			name: 'Copper Volcano',
			material: 'copper',
			temp: 2226.85,
			avgYield: { min: 50, max: 500 },
			eruption: metalEruption,
			activity: normalActivity
		},
		{
			name: 'Iron Volcano',
			material: 'iron',
			temp: 2526.85,
			avgYield: { min: 50, max: 500 },
			eruption: metalEruption,
			activity: normalActivity
		},
		{
			name: 'Gold Volcano',
			material: 'gold',
			temp: 2626.85,
			avgYield: { min: 50, max: 500 },
			eruption: metalEruption,
			activity: normalActivity
		}
	]
};

const materials = {
	crude_oil: {
		name: 'Crude Oil',
		spHeat: 1.69,
		melt: { material: 'petroleum', temp: 400 }
	},
	petroleum: {
		name: 'Petroleum',
		spHeat: 1.76,
		melt: { material: 'nat_gas', temp: 540 }
	},
	nat_gas: {
		name: 'Natural Gas',
		spHeat: 2.191
	},
	magma: {
		name: 'Magma',
		spHeat: 0.2
	},
	copper: {
		name: 'Copper',
		spHeat: 0.385
	},
	iron: {
		name: 'Iron',
		spHeat: 0.449
	},
	gold: {
		name: 'Gold',
		spHeat: 0.129
	}
};

const calcRoll = (low, high, val) => {
	const val1 = (val-low) / (high-low);
	if (val1 < 0 || val1 > 1) return [val1];
	
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
};

const analyze = (type, rate, eruption, activity, startTemp, endTemp) => {
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
	data.activity = { period: activity.length, amount: activity.amount/activity.length };
	data.avgYield = rate * data.eruption.amount * data.activity.amount;
	result.volcano = rollify(data, volcano);
	result.volcano.name = type;
	if (!volcano.material) return result;
	result.volcano.temp = volcano.temp;
	result.volcano.material = materials[volcano.material];
	
	data = {};
	
	data.preHeat = {};
	data.preHeat.startTemp = startTemp;
	data.preHeat.endTemp = endTemp;
	data.preHeat.neededHeatForPetro = (materials.crude_oil.melt.temp - startTemp) * materials.crude_oil.spHeat;
	data.preHeat.natGasTempAfterPetro = data.preHeat.endTemp - (data.preHeat.neededHeatForPetro / materials.nat_gas.spHeat);
	data.preHeat.natGasExtraHeat = (data.preHeat.natGasTempAfterPetro - materials.crude_oil.melt.temp) * materials.nat_gas.spHeat;
	data.preHeat.finalTemp = materials.crude_oil.melt.temp + ((data.preHeat.natGasExtraHeat / materials[materials.crude_oil.melt.material].spHeat) / 2);
	
	data.phase1 = { startHeat: startTemp, endHeat: materials.crude_oil.melt.temp, spHeat: materials.crude_oil.spHeat };
	data.phase1.neededHeat = data.phase1.spHeat * (data.phase1.endHeat - data.phase1.startHeat);
	data.phase2 = { startHeat: data.phase1.endHeat, endHeat: endTemp, spHeat: materials[materials.crude_oil.melt.material].spHeat };
	data.phase2.neededHeat = data.phase2.spHeat * (data.phase2.endHeat - data.phase2.startHeat);
	
	data.overall = {};
	data.overall.availHeatPerGram = result.volcano.material.spHeat * (result.volcano.temp - endTemp);
	data.overall.neededHeat = data.phase1.neededHeat + data.phase2.neededHeat;
	data.overall.gramRatio = data.overall.availHeatPerGram / data.overall.neededHeat;
	data.overall.finalRate = data.overall.gramRatio * result.volcano.avgYield.value;
	data.overall.genCount = data.overall.finalRate / 90;
	data.overall.powerOutput = data.overall.genCount * 800;
	
	data.phase2x = { startHeat: data.preHeat.finalTemp, endHeat: endTemp, spHeat: materials[materials.crude_oil.melt.material].spHeat };
	data.phase2x.neededHeat = data.phase2x.spHeat * (data.phase2x.endHeat - data.phase2x.startHeat);
	
	data.overallPreHeat = {};
	data.overallPreHeat.availHeatPerGram = result.volcano.material.spHeat * (result.volcano.temp - endTemp);
	data.overallPreHeat.neededHeat = data.phase2x.neededHeat;
	data.overallPreHeat.gramRatio = data.overallPreHeat.availHeatPerGram / data.overallPreHeat.neededHeat;
	data.overallPreHeat.finalRate = data.overallPreHeat.gramRatio * result.volcano.avgYield.value;
	data.overallPreHeat.genCount = data.overallPreHeat.finalRate / 90;
	data.overallPreHeat.powerOutput = data.overallPreHeat.genCount * 800;
	
	result.production = data;
	
	return result;
};