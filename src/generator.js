const checkIsArray = (item) =>
	typeof item == 'object' ? (Array.isArray(item) ? 1 : 0) : -1;

const generateObjectType = (item) => {
	let text = '{';
	for (let i of Object.keys(item)) {
		text += `${i}: ` + generateType(item[i]) + ';';
	}

	return text + '}';
};

/**
 *
 * @param {Array} item
 */
const generateArrayType = (item) => {
	// package types into set for uniqueness
	const set = new Set();
	item.forEach((i) => {
		if (checkIsArray(i) == -1) {
			// Prims
			return set.add(typeof i);
		}
		if (checkIsArray(i) == 1) {
			// Arrays
			return set.add(generateArrayType(i));
		}

		// Objects
		return set.add(generateObjectType(i));
	});

	// return single string of types
	let types = [];
	set.forEach((t) => (t != undefined ? types.push(t) : null));
	return 'Array<' + types.join('|') + '>';
};

const generateType = (item) => {
	const isArray = checkIsArray(item);
	if (isArray == 1) {
		return generateArrayType(item);
	}

	if (isArray == 0) {
		return generateObjectType(item);
	}
	return typeof item;
};

export const generateTypes = (item) => {
	if (checkIsArray(item) == 0) {
		const types = [];
		for (let i of Object.keys(item)) {
			types.push({ key: i, type: generateType(item[i]) });
		}

		return types;
	}

	if (checkIsArray(item) == 1) {
		const types = [];
		for (let i of item) {
			types.push({ key: i, type: generateType(i) });
		}
		return types;
	}

	return generateType(item);
};

/**
 *
 * @param {Array<{key: string, type: string|Array<any}>} typedef
 */
export const serialize = (typedef) => {
	let text = '{\n';
	const f = (typedef) => {
		if (checkIsArray(typedef.type) == 1) {
			return serialize(typedef.type);
		}

		return `${typedef.key}: ${typedef.type};\n`;
	};

	for (let i of typedef) {
		text += f(i);
	}

	return text + '}';
};