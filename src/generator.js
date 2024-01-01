export const getInferences = (obj, levels = 1, level = 1) => {
  if (Array.isArray(obj)) {
    return getInferences(obj[0], level);
  }

	const inferences = [];
	for (let k of Object.keys(obj)) {
		inferences.push({
			name: k,
			type: typeof obj[k],
			level,
			inferred:
				typeof obj[k] == 'object' && level <= levels
					? getInferences(obj[k], level + 1)
					: false,
		});
	}

	return inferences;
};

export const compress = (inference, atLevel = 0) => {
	if (!Array.isArray(inference)) {
		let t = `${'  '.repeat(inference.level)}${inference.name}:`;
		if (inference.inferred != false) {
			t += ' ' + compress(inference.inferred, atLevel + 1);
		} else {
			t += ` ${inference.type};\n`;
		}

		return t;
	}

	let t = '{\n';
	for (let i of inference) {
		t += compress(i, atLevel + 1);
	}

	t += ' '.repeat(atLevel) + '}\n';

	return t;
};

export const collator = (inferences, name = "TYPE") => {
	let infer = `type ${name} = {\n`;

	for (let i of inferences) {
		infer += compress(i, i.level);
	}

	infer += '}';
	return infer;
};