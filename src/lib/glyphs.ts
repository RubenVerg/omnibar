import type { Glyph, GlyphRepr, Glyphs, Meaning } from './types';

export const categories = {
	m: { name: 'Monadic function', bgColor: '#fdffb6', fgColor: '#ccac2b' },
	d: { name: 'Dyadic function', bgColor: '#ffd6a5', fgColor: '#ff4500' },
	a: { name: 'Monadic operator', bgColor: '#9bf6ff', fgColor: '#0dd3bb' },
	c: { name: 'Dyadic operator', bgColor: '#a0c4ff', fgColor: '#7193ff' },
	r: { name: 'Array', bgColor: '#ffadad', fgColor: '#ea0027' },
	h: { name: 'Hyperator', bgColor: '#caffbf', fgColor: '#94e044' },
	s: { name: 'Syntax', bgColor: '#ffc6ff', fgColor: '#ff66ac' },
}

const dy = 'dy', ex = 'ex', vi = 'vi', dz = 'dz', n2 = 'n2', a2 = 'a2';

const
	R = 'R',
	My = 'My', xDy = 'xDy',
	uAy = '(uA)y', xuAy = 'x(uA)y', mAy = '(mA)y', xmAy = 'x(mA)y', dAy = '(dA)y',xdAy = 'x(dA)y',
	uCvy = '(uCv)y', xuCvy = 'x(uCv)y', uCny = '(uCn)y', xuCny = 'x(uCn)y', uCey = '(uCe)y', xuCey = 'x(uCe)y',
	mCvy = '(mCv)y', xmCvy = 'x(mCv)y', mCny = '(mCn)y', xmCny = 'x(mCn)y', mCey = '(mCe)y', xmCey = 'x(mCe)y',
	dCvy = '(dCv)y', xdCvy = 'x(dCv)y', dCny = '(dCn)y', xdCny = 'x(dCn)y', dCey = '(dCe)y', xdCey = 'x(dCe)y';

const me = (patterns: string[], name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, patterns, description, category: 'm', urls } as Meaning);
const sy = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 's', urls } as Meaning);

const gl = (glyph: GlyphRepr, ...meanings: [string, ...string[]][]) => ({ glyph, meanings: meanings.map(_ => [_[0], _.slice(1)]) } as Glyph);

export const glyphs: Glyphs = {
	dialects: {
		dy: { name: 'Dyalog APL', shortName: 'Dy' },
		ex: { name: 'Extended Dyalog APL', shortName: 'ExD' },
		vi: { name: 'Dyalog APL Vision', shortName: 'DVi' },
		dz: { name: 'dzaima/APL', shortName: 'dz' },
		n2: { name: 'NARS2000', shortName: 'N2k' },
		a2: { name: 'APL2', shortName: 'A2' },
	},
	urls: {
		wiki: { name: 'APL Wiki' },
		dyalog: { name: 'Dyalog Reference' },
		nars2000: { name: 'NARS2000 Wiki' },
		paper: { name: 'Paper' },
	},
	meanings: {
		conj: me([My], 'Conjugate', '(Hyper)complex conjugate', { wiki: 'https://aplwiki.com/wiki/Conjugate' }),
		add: me([xDy], 'Addition', undefined, { wiki: 'https://aplwiki.com/wiki/Add' }),
		plusId: me([My], 'Identity'),
		neg: me([My], 'Negate', undefined, { wiki: 'https://aplwiki.com/wiki/Negate' }),
		sub: me([My], 'Subtraction', undefined, { wiki: 'https://aplwiki.com/wiki/Subtract' }),
		flipLetterCase: me([My], 'Flip Letter Case'),
		sign: me([My], 'Signum', undefined, { wiki: 'https://aplwiki.com/wiki/Signum' }),
		dir: me([My], 'Direction', 'Complex signum', { wiki: 'https://aplwiki.com/wiki/Signum' }),
		mul: me([xDy], 'Multiplication', undefined, { wiki: 'https://aplwiki.com/wiki/Times' }),
		queryLetterCase: me([My], 'Query Letter Case'),
		setLetterCase: me([My], 'Set Letter Case'),
		rec: me([My], 'Reciprocal', undefined, { wiki: 'https://aplwiki.com/wiki/Reciprocal' }),
		div: me([xDy], 'Division', undefined, { wiki: 'https://aplwiki.com/wiki/Divide' }),
		toTitleCase: me([My], 'To Title Case'),
		exp: me([My], 'Exponential', 'Power with Euler\'s number as the base', { wiki: 'https://aplwiki.com/wiki/Exponential' }),
		pow: me([xDy], 'Power', undefined, { wiki: 'https://aplwiki.com/wiki/Power_(function)' }),
		sqrt: me([My], 'Square Root', undefined, { wiki: 'https://aplwiki.com/wiki/Square_Root' }),
		root: me([xDy], 'Root', undefined, { wiki: 'https://aplwiki.com/wiki/Root' }),
		ln: me([My], 'Natural Logarithm', undefined, { wiki: 'https://aplwiki.com/wiki/Natural_Logarithm' }),
		log: me([xDy], 'Logarithm', undefined, { wiki: 'https://aplwiki.com/wiki/Logarithm' }),
		mInv: me([My], 'Matrix Inverse', undefined, { wiki: 'https://aplwiki.com/wiki/Matrix_Inverse' }),
		mDiv: me([xDy], 'Matrix Division', undefined, { wiki: 'https://aplwiki.com/wiki/Matrix_Divide' }),
		piT: me([My], 'Pi Times', undefined, { wiki: 'https://aplwiki.com/wiki/Pi_Times' }),
		circ: me([xDy], 'Circular Functions', 'A range of trigonometric and related functions selected using the left argument', { wiki: 'https://aplwiki.com/wiki/Circular' }),
		fact: me([My], 'Factorial', undefined, { wiki: 'https://aplwiki.com/wiki/Factorial' }),
		binom: me([xDy], 'Binomial Coefficient', undefined, { wiki: 'https://aplwiki.com/wiki/Binomial' }),
		roll: me([My], 'Roll', 'Random integeme([R], s) in the range defined by the argument, or random float (0; 1) if the element is 0', { wiki: 'https://aplwiki.com/wiki/Roll' }),
		deal: me([xDy], 'Deal', 'Right argument random selections from the range defined by the left argument', { wiki: 'https://aplwiki.com/wiki/Deal' }),
		abs: me([My], 'Absolute Value', undefined, { wiki: 'https://aplwiki.com/wiki/Magnitude' }),
		mag: me([My], 'Magnitude', undefined, { wiki: 'https://aplwiki.com/wiki/Magnitude' }),
		mod: me([xDy], 'Residue', undefined, { wiki: 'https://aplwiki.com/wiki/Residue' }),
		caseFold: me([My], 'Case Fold'),
		ceil: me([My], 'Ceiling', 'The smallest integer greater than or equal to the argument', { wiki: 'https://aplwiki.com/wiki/Ceiling' }),
		max: me([xDy], 'Maximum', 'The largest argument', { wiki: 'https://aplwiki.com/wiki/Maximum' }),
		toUpper: me([My], 'To Uppercase'),
		floor: me([My], 'Floor', 'The largest integer less than or equal to the argument', { wiki: 'https://aplwiki.com/wiki/Floor' }),
		min: me([xDy], 'Minimum', 'The smallest argument', { wiki: 'https://aplwiki.com/wiki/Minimum' }),
		toLower: me([My], 'To Lowercase'),
		decode: me([xDy], 'Decode', 'Evaluate the right argument in the base defined by the left argument', { wiki: 'https://aplwiki.com/wiki/Decode' }),
		decode2: me([My], 'Base-2 Decode'),
		encode: me([xDy], 'Encode', 'Represent the right argument in the base defined by the left argument', { wiki: 'https://aplwiki.com/wiki/Encode' }),
		encode2: me([My], 'Base-2 Encode'),
		type: me([My], 'Type', 'Prototype array corresponding to the argument', { wiki: 'https://aplwiki.com/wiki/Type' }),
		same: me([My], 'Same', 'The argument, unchanged', { wiki: 'https://aplwiki.com/wiki/Identity' }),
		right: me([xDy], 'Right', 'The right argument, unchanged', { wiki: 'https://aplwiki.com/wiki/Identity' }),
		left: me([xDy], 'Left', 'The left argument, unchanged', { wiki: 'https://aplwiki.com/wiki/Identity' }),
		eq: me([xDy], 'Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Equal_to' }),
		isType: me([My], 'Is Type?', 'Equal to type'),
		dimension: me([My], 'Dimension', 'Hypercomplex dimension (1, 2, 4, or 8)'),
		neq: me([xDy], 'Not Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Not_Equal_to' }),
		nubSieve: me([My], 'Nub Sieve', 'Mask that marks the first occurrence of each element', { wiki: 'https://aplwiki.com/wiki/Nub_Sieve' }),
		isNotType: me([My], 'Is Not Type?', 'Not equal to type'),
		norm: me([My], 'Norm', 'Argument times the conjugate of the argument'),
		leq: me([xDy], 'Less Than or Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Less_than_or_Equal_to' }),
		isNonneg: me([My], 'Is Nonnegative?'),
		isInvisible: me([My], 'Is Invisible Character?'),
		sortAsc: me([My], 'Sort Ascending'),
		le: me([xDy], 'Less Than', undefined, { wiki: 'https://aplwiki.com/wiki/Less_than' }),
		isPos: me([My], 'Is Positive?'),
		isControl: me([My], 'Is Control Character?'),
		majorCells: me([My], 'Major Cells'),
		condense: me([My], 'Condense', 'Compress a real array into an array of hypercomplex numbers', { nars2000: 'https://wiki.nars2000.org/index.php?title=Condense' }),
		ge: me([xDy], 'Greater Than', undefined, { wiki: 'https://aplwiki.com/wiki/Greater_than' }),
		isNeg: me([My], 'Is Negative?'),
		isVisible: me([My], 'Is Visible Character?'),
		join: me([My], 'Join', 'Merge array of arrays into single array', { wiki: 'https://aplwiki.com/wiki/Raze' }),
		dilate: me([My], 'Dilate', 'Expand an array of hypercomplex numbers into an array of reals', { nars2000: 'https://wiki.nars2000.org/index.php?title=Dilate' }),
		geq: me([xDy], 'Greater Than or Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Greater_than_or_Equal_to' }),
		isNonpos: me([My], 'Is Nonpositive?'),
		isNotControl: me([My], 'Is Not Control Character?'),
		sortDesc: me([My], 'Sort Descending'),
		match: me([xDy], 'Match', 'Compare the whole arrays for equality', { wiki: 'https://aplwiki.com/wiki/Match' }),
		depth: me([My], 'Depth', 'Level of nesting', { wiki: 'https://aplwiki.com/wiki/Depth' }),
		mismatch: me([xDy], 'Not Match', undefined, { wiki: 'https://aplwiki.com/wiki/Not_Match' }),
		tally: me([My], 'Tally', 'The amount of major cells', { wiki: 'https://aplwiki.com/wiki/Tally' }),
		or: me([xDy], 'Or', undefined, { wiki: 'https://aplwiki.com/wiki/Or' }),
		gcd: me([xDy], 'Greatest Common Divisor', undefined, { wiki: 'https://aplwiki.com/wiki/GCD' }),
		demote: me([My], 'Demote', 'Combine two leading axes'),
		gcdM: me([My], 'Monadic GCD', 'GCD reduction (any 1?)'),
		and: me([xDy], 'And', undefined, { wiki: 'https://aplwiki.com/wiki/And' }),
		lcm: me([xDy], 'Least Common Multiple', undefined, { wiki: 'https://aplwiki.com/wiki/LCM' }),
		promote: me([My], 'Promote', 'Add a length-1 axis before the other axes', { wiki: 'https://aplwiki.com/wiki/Promote' }),
		lcmM: me([My], 'Monadic LCM', 'LCM reduction (all 1?)'),
		nor: me([xDy], 'Nor', undefined, { wiki: 'https://aplwiki.com/wiki/Nor' }),
		notAnyEqualToType: me([My], 'Not Any Equal To Type'),
		notAll: me([My], 'Not All', 'Any 0?'),
		nand: me([xDy], 'Nand', undefined, { wiki: 'https://aplwiki.com/wiki/Nand' }),
		notAllEqualToType: me([My], 'Not All Equal To Type'),
		none: me([My], 'None', 'All 0?'),
		mix: me([My], 'Mix', 'Combine all elements into a single array', { wiki: 'https://aplwiki.com/wiki/Mix' }),
		take: me([xDy], 'Take', undefined, { wiki: 'https://aplwiki.com/wiki/Take' }),
		split: me([My], 'Split', 'Convert an axis to a level of nesting', { wiki: 'https://aplwiki.com/wiki/Split' }),
		drop: me([xDy], 'Drop', undefined, { wiki: 'https://aplwiki.com/wiki/Drop' }),
		enclose: me([My], 'Enclose', 'Wrap the argument into a nested scalar', { wiki: 'https://aplwiki.com/wiki/Enclose' }),
		penclose: me([xDy], 'Partitioned Enclose', 'Split the right argument into pieces specified by the left argument', { wiki: 'https://aplwiki.com/wiki/Partitioned_Enclose' }),
		partition: me([xDy], 'Partition', 'Split the right argument into pieces specified by the left argument', { wiki: 'https://aplwiki.com/wiki/Partition' }),
		first: me([My], 'First', 'The first element of the argument', { wiki: 'https://aplwiki.com/wiki/First' }),
		pick: me([xDy], 'Pick', 'Extract a value through layers of nesting', { wiki: 'https://aplwiki.com/wiki/Pick' }),
		nest: me([My], 'Nest', 'Enclose if simple', { wiki: 'https://aplwiki.com/wiki/Nest' }),
		subset: me([xDy], 'Subset', 'Is subset?', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sets' }),
		discloseIfScalar: me([My], 'Disclose If Scalar'),
		from: me([xDy], 'From', 'Function form of bracket indexing', { wiki: 'https://aplwiki.com/wiki/From' }),
		last: me([My], 'Last', 'Last element in ravel order'),
		superset: me([xDy], 'Superset', 'Is superset?', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sets' }),
		index: me([xDy], 'Index', 'Items of the right argument as specified by the left argument', { wiki: 'https://aplwiki.com/wiki/Index_(function)' }),
		materialize: me([My], 'Materialize', 'Cast the argument to an array', { wiki: 'https://aplwiki.com/wiki/Materialise' }),
		mapKV: me([My], 'Map Key/Value Pairs'),
		gradeUp: me([My], 'Grade Up', 'Indices that sort the argument in ascending order', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		gradeDown: me([My], 'Grade Down', 'Indices that sort the argument in descending order', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		gradeUpD: me([My], 'Dyadic Grade Up', 'Indices that sort the right argument in ascending order, according to the left argument', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		gradeDownD: me([My], 'Dyadic Grade Up', 'Indices that sort the right argument in descending order, according to the left argument', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		indexGenerator: me([My], 'Index Generator', 'Indices with shaoe specified by the argument', { wiki: 'https://aplwiki.com/wiki/Index_Generator' }),
		indexOf: me([xDy], 'Index Of', undefined, { wiki: 'https://aplwiki.com/wiki/Index_Of' }),
		where: me([My], 'Where', 'True indices in the argument mask', { wiki: 'https://aplwiki.com/wiki/Indices' }),
		intervalIndex: me([xDy], 'Interval Index', 'Determine fitting interval, left argument giving beginning points', { wiki: 'https://aplwiki.com/wiki/Interval_Index' }),
		arrayLookup: me([xDy], 'Array Lookup', 'Like ⍳, but on major cells'),
		elementOf: me([xDy], 'Element Of', undefined, { wiki: 'https://aplwiki.com/wiki/Membership' }),
		enlist: me([My], 'Enlist', 'All simple elements of the argument, traversing nested elements', { wiki: 'https://aplwiki.com/wiki/Enlist' }),
		find: me([xDy], 'Find', 'Mask of the start corners of the appearances of the left argument in the right argument', { wiki: 'https://aplwiki.com/wiki/Find' }),
		union: me([xDy], 'Union', 'The left argument catenated with the elements of the right argument that don\'t appear in the left argument', { wiki: 'https://aplwiki.com/wiki/Union' }),
		nub: me([My], 'Unique', 'Unique elements', { wiki: 'https://aplwiki.com/wiki/Unique' }),
		intersection: me([xDy], 'Intersection', 'All elements of the left argument that appear in the right argument', { wiki: 'https://aplwiki.com/wiki/Intersection' }),
		nubIn: me([My], 'Nub in', 'Table of which elements are their unique', { wiki: 'https://aplwiki.com/wiki/Nub_in' }),
		not: me([My], 'Not', undefined, { wiki: 'https://aplwiki.com/wiki/Not' }),
		m1: me([My], '1 Minus', 'Like Not but extended to floats [0; 1]'),
		without: me([xDy], 'Without', 'All elements of the left argument that don\'t appear in the right argument', { wiki: 'https://aplwiki.com/wiki/Without' }),
		symDiff: me([xDy], 'Symmetric Difference', 'Elements that appear in exactly one of the arguments', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sets' }),
		reduce: me([dAy], 'Reduce', undefined, { wiki: 'https://aplwiki.com/wiki/Reduce' }),
		reduceF: me([dAy], 'Reduce First', undefined, { wiki: 'https://aplwiki.com/wiki/Reduce' }),
		wreduce: me([xdAy], 'Windowed Reduce', undefined, { wiki: 'https://aplwiki.com/wiki/Windowed_Reduce' }),
		wreduceF: me([xdAy], 'Windowed Reduce First', undefined, { wiki: 'https://aplwiki.com/wiki/Windowed_Reduce' }),
		compress: me([xDy], 'Compress', 'Select elements of the right argument marked by the left argument mask', { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		replicate: me([xDy], 'Replicate', undefined, { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		compressO: me([uAy], 'Compress', 'Select elements of the argument marked by the operand mask', { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		replicateO: me([uAy], 'Replicate', undefined, { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		compressF: me([xDy], 'Compress First', 'Select elements of the right argument marked by the left argument mask', { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		replicateF: me([xDy], 'Replicate First', undefined, { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		compressOF: me([uAy], 'Compress First', 'Select elements of the argument marked by the operand mask', { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		replicateOF: me([uAy], 'Replicate First', undefined, { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		scan: me([dAy], 'Scan', undefined, { wiki: 'https://aplwiki.com/wiki/Scan' }),
		scanF: me([dAy], 'Scan First', undefined, { wiki: 'https://aplwiki.com/wiki/Scan' }),
		expand: me([xDy], 'Expand', undefined, { wiki: 'https://aplwiki.com/wiki/Expand' }),
		expandF: me([xDy], 'Expand First', undefined, { wiki: 'https://aplwiki.com/wiki/Expand' }),
		expandO: me([uAy], 'Expand', undefined, { wiki: 'https://aplwiki.com/wiki/Expand' }),
		expandOF: me([uAy], 'Expand First', undefined, { wiki: 'https://aplwiki.com/wiki/Expand' }),
		applyRight: me([xmAy], 'Apply To Right Argument (?)', '⊢∘f'),
		ravel: me([My], 'Ravel', 'All elements of the argument as a vector', { wiki: 'https://aplwiki.com/wiki/Ravel' }),
		cat: me([xDy], 'Catenate', undefined, { wiki: 'https://aplwiki.com/wiki/Catenate' }),
		table: me([My], 'Ravel Items', undefined, { wiki: 'https://aplwiki.com/wiki/Table' }),
		catF: me([xDy], 'Catenate First', undefined, { wiki: 'https://aplwiki.com/wiki/Catenate' }),
		shape: me([My], 'Shape', undefined, { wiki: 'https://aplwiki.com/wiki/Shape' }),
		reshape: me([xDy], 'Reshape', undefined, { wiki: 'https://aplwiki.com/wiki/Reshape' }),
		reverse: me([My], 'Reverse', undefined, { wiki: 'https://aplwiki.com/wiki/Reverse' }),
		rotate: me([xDy], 'Rotate', undefined, { wiki: 'https://aplwiki.com/wiki/Rotate' }),
		reverseF: me([My], 'Reverse First', undefined, { wiki: 'https://aplwiki.com/wiki/Reverse' }),
		rotateF: me([xDy], 'Rotate First', undefined, { wiki: 'https://aplwiki.com/wiki/Rotate' }),
		transpose: me([My], 'Transpose', undefined, { wiki: 'https://aplwiki.com/wiki/Transpose#Monadic_usage' }),
		transposeD: me([xDy], 'Dyadic Transpose', undefined, { wiki: 'https://aplwiki.com/wiki/Transpose#Dyadic_usage' }),
		each1: me([mAy], 'Each', 'Apply a function to each element of an array', { wiki: 'https://aplwiki.com/wiki/Each' }),
		each2: me([xdAy], 'Each', 'Apply a function to each element of two arrays', { wiki: 'https://aplwiki.com/wiki/Each' }),
		constant: me([uAy, xuAy], 'Constant', 'A function that always returns the operand', { wiki: 'https://aplwiki.com/wiki/Constant' }),
		commute: me([xdAy], 'Commute', 'Call the operand with the arguments swapped', { wiki: 'https://aplwiki.com/wiki/Commute' }),
		duplicate: me([dAy], 'Duplicate', 'Call the operand with the argument as both left and right', { wiki: 'https://aplwiki.com/wiki/Commute' }),
		repeat: me([mCvy, xdCvy], 'Repeat', 'Repeat a function a specified number of times', { wiki: 'https://aplwiki.com/wiki/Power_(operator)' }),
		until: me([mCey, xdCey], 'Repeat Until', 'Repeat a function until a predicate is satisfied', { wiki: 'https://aplwiki.com/wiki/Power_(operator)' }),
		cumulativeRepeat: me([mCvy, xdCvy, mCey, xdCey], 'Cumulative Repeat', 'Like ⍣, but collect intermediary results'),
		convolution: me([xdCey], 'Convolution', undefined, { nars2000: 'https://wiki.nars2000.org/index.php?title=Convolution' }),
		innerProduct: me([xdCey], 'Inner Product', 'Apply a function to each pair in the arguments and combine the results with another function', { wiki: 'https://aplwiki.com/wiki/Inner_Product' }),
		alternant: me([dCey], 'Alternant', 'Generalized discriminant', { nars2000: 'https://wiki.nars2000.org/index.php?title=Determinant_Operator' }),
		outerProduct: me([xdAy], 'Outer Product', 'Apply a function to the cartesian product of the two arguments', { wiki: 'https://aplwiki.com/wiki/Outer_Product' }),
		compose: me([mCny], 'Compose', 'Apply a function after another', { wiki: 'https://aplwiki.com/wiki/Compose' }),
		after: me([xdCey], 'After', 'Preprocess the right argument to a function with another function', { wiki: 'https://aplwiki.com/wiki/Beside' }),
		bind: me([dCvy, uCey], 'Bind', 'Bind an argument to a dyadic function, making it monadic', { wiki: 'https://aplwiki.com/wiki/Bind' }),
		before: me([mCey, xmCey], 'Before', 'Preprocess the left argument to a function with another function', { wiki: 'https://aplwiki.com/wiki/Reverse_Compose' }),
		atop: me([xmCey], 'Atop', 'Call a monad using the result of a dyad as the argument', { wiki: 'https://aplwiki.com/wiki/Atop_(operator)' }),
		atRank: me([mCvy, xdCvy], 'Rank', 'Apply a function at a specified rank', { wiki: 'https://aplwiki.com/wiki/Rank_(operator)' }),
		over: me([xdCey], 'Over', 'Preprocess all arguments to a function with another function', { wiki: 'https://aplwiki.com/wiki/Over' }),
		atDepth: me([mCvy, xdCvy], 'Depth', 'APply a function at a specified depth', { wiki: 'https://aplwiki.com/wiki/Depth_(operator)' }),
		under: me([mCny, xdCny], 'Under', 'Apply a function, then another function, then the first function\'s inverse', { wiki: 'https://aplwiki.com/wiki/Under' }),
		eachLeft: me([xdAy], 'Each Left', 'Each, only on the left argument'),
		eachRight: me([xdAy], 'Each Right', 'Each, only on the right argument'),
		at: me([mCny, mCvy, uCny, uCvy], 'At', 'Transform selected elements of an array', { wiki: 'https://aplwiki.com/wiki/At' }),
		obverse: me([mCny, xdCey], 'Obverse', 'Specify the inverse function for a function'),
		evalInput: sy('Evaluated Input'),
		stdout: sy('Standard Output'),
		sys: sy('System Name', 'First character of a system name', { wiki: 'https://aplwiki.com/wiki/Quad_name' }),
		stringInput: sy('String Input'),
		stderr: sy('Standard Error'),
		variant: me([mCvy, xdCvy], 'Variant', 'Select a related function', { wiki: 'https://aplwiki.com/wiki/Variant', dyalog: 'https://help.dyalog.com/18.2/Content/Language/Primitive%20Operators/Variant.htm', nars2000: 'https://wiki.nars2000.org/index.php?title=Variant' }),
		keyI: me([dAy], 'Key (Indices)', 'Apply a function to unique elements of an array and their indices', { wiki: 'https://aplwiki.com/wiki/Key' }),
		keyV: me([xdAy] ,'Key (Values)', 'Apply a function to unique elements of the right array and the corrersponding entries in the left array'),
		keyVocI: me([uAy], 'Key With Vocabulary (Indices)', 'Locations of each element in the vocabulary in the argument'),
		keyVocV: me([xuAy], 'Key With Vocabulary (Values)', 'Elements of the left argument corresponding to locations of elements in the vocabulary in the right argument'),
		getMap: me([uAy], 'Get In Map'),
		setMap: me([xuAy], 'Set In Map'),
		diagonals: me([mAy], 'Diagonals', 'Apply a function to each diagonal of a matrix'),
		stencil: me([dCvy], 'Stencil', 'Apply a function to windows of an array', { wiki: 'https://aplwiki.com/wiki/Stencil' }),
		beam: me([uAy, xuAy], 'I-Beam', 'Access non-primitive, implementation specific functions', { wiki: 'https://aplwiki.com/wiki/I-Beam', dyalog: 'https://help.dyalog.com/18.2/Content/Language/Primitive%20Operators/I%20Beam.htm' }),
		execute: me([My], 'Execute', undefined, { wiki: 'https://aplwiki.com/wiki/Execute' }),
		format: me([My], 'Format', undefined, { wiki: 'https://aplwiki.com/wiki/Format#Monadic_form' }),
		dformat: me([xDy], 'Format With Specification', 'Format specifying column widths, decimal places and optionally scientific notation', { wiki: 'https://aplwiki.com/wiki/Format#Dyadic_form' }),
		zilde: me([R], 'Zilde', 'Empty numeric vector', { wiki: 'https://aplwiki.com/wiki/Zilde' }),
		inf: me([R], 'Infinity', 'The largest number'),
		ninf: me([R], 'Negative Infinity', 'The smallest number'),
		nan: me([R], 'Not a Number'),
		cartM: me([My], 'Imaginary', 'i × arg', { wiki: 'https://aplwiki.com/wiki/Imaginary' }),
		cartD: me([xDy], 'Complex', 'left + i × right', { wiki: 'https://aplwiki.com/wiki/Complex_(function)' }),
		mstringE: me([My], 'String Enhancement (Monadic)', '${expr} inside a string is evaluated'),
		dstringE: me([xDy], 'String Enhancement (Dyadic)', '${idx} is replaced with the corresponding item in the argumennt'),
		range: me([xDy], 'Range', undefined, { wiki: 'https://aplwiki.com/wiki/Range' }),
		multisets: me([mAy, xdAy], 'Multisets', 'Turns set functions into multiset functions', { nars2000: 'https://wiki.nars2000.org/index.php?title=Multisets' }),
		countIn: me([xDy], 'Count In', 'Count occurrences of each of the left argument in the right argument'),
		probab: me([xdAy], 'Probability-logical Function', 'Multiplicative fuzzy logic (probabalistic) function corresponding to the Boolean function given'),
		merge: me([xDy], 'Merge', 'Compose array by choosing each element from the corresponding element in each of a set of sources', { wiki: 'https://aplwiki.com/wiki/Case' }),
		pair: me([xDy], 'Pair', undefined, { wiki: 'https://aplwiki.com/wiki/Pair' }),
		halfPair: me([My], 'Half Pair'),
		factors: me([My], 'Factors'),
		primeRelated: me([xDy], 'Prime Related Functions', 'Prime-related functions on the right argument, selected by left argument'),
		primeFactors: me([My], 'Prime Factors'),
		null: me([mAy, xdAy], 'Null', 'The identity operator, useful for casting hybrids to functions', { nars2000: 'https://wiki.nars2000.org/index.php?title=Null' }),
		combinatorial: me([xuAy], 'Combinatorial', 'Combinatorial functions selected by the operand', { nars2000: 'https://wiki.nars2000.org/index.php?title=Combinatorial' }),
		matrix: me([mAy, xdAy], 'Matrix', 'Apply a function to a diagonalizable matrix', { nars2000: 'https://wiki.nars2000.org/index.php?title=Matrix' }),
		deriv: me([mAy, xdAy], 'Derivative', undefined, { nars2000: 'https://wiki.nars2000.org/index.php?title=Derivative' }),
		integ: me([xmAy], 'Integral', undefined, { nars2000: 'https://wiki.nars2000.org/index.php?title=Integral' }),
		transform: me(['(d(mH)e)y'], 'Transform', undefined, { paper: 'http://www.sudleyplace.com/APL/A%20Transform%20Hyperator%20in%20APL.pdf' }),
		dfn: sy('Dfn', 'Wrap a dfn (anonymous function) definition', { wiki: 'https://aplwiki.com/wiki/Dfn' }),
		dop: sy('Dop', 'Wrap a dop (anonymous operator) definition', { wiki: 'https://aplwiki.com/wiki/Dfn' }),
		dhyp: sy('Dhyp', 'Wrap a dhyp (anonimous hyperator) definition', { nars2000: 'https://wiki.nars2000.org/index.php?title=Anonymous_Functions/Operators/Hyperators' }),
		larg: sy('Left Argument'),
		rarg: sy('Right Argument'),
		lop: sy('Left Operand'),
		rop: sy('Right Operand'),
		lhyp: sy('Left Hyperand'),
		rhyp: sy('Right Hyperand'),
		axisArg: sy('Axis Argument'),
		guard: sy('Guard', 'Dfn guard: run RHS if LHS is true', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Guards.htm' }),
		control: sy('Control Structure', 'Begin a control structure name', { wiki: 'https://aplwiki.com/wiki/Control_structure' }),
		label: sy('Label', 'Target for a branch', { dyalog: 'https://help.dyalog.com/18.2/Content/Language/Defined%20Functions%20and%20Operators/TradFns/Statements.htm' }),
		errorGuard: sy('Error Guard', 'If an error of the LHS category occurs, return the RHS', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Error%20Guards.htm' }),
		bindex: sy('Index', 'Index into an array', { wiki: 'https://aplwiki.com/wiki/Indexing' }),
		axis: sy('Function Axis', 'Specify an axis for a function', { wiki: 'https://aplwiki.com/wiki/Function_axis' }),
		semi: sy('Axis Separator', 'Inside a bracket index, separates the different axes', { wiki: 'https://aplwiki.com/wiki/Indexing' }),
		assign: sy('Assignment', undefined, { wiki: 'https://aplwiki.com/wiki/Assignment' }),
		return: sy('Return', 'Return early from a dfn'),
		sink: sy('Sink', 'Don\'t print the result of an expression', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sink' }),
		branch: sy('Branch', undefined, { wiki: 'https://aplwiki.com/wiki/Branch' }),
		tradfn: sy('Tradfn Definition', undefined, { wiki: 'https://aplwiki.com/wiki/Defined_function_(traditional)' }),
		recfn: sy('Recurse Function', 'In a dfn, refer to the dfn itself', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Recursion.htm' }),
		recop: sy('Recurse Function', 'In a dop, refer to the dop itself', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Recursion.htm' }),
		rechyp: sy('Recurse Function', 'In a dhyp, refer to the dhyp itself', { nars2000: 'https://wiki.nars2000.org/index.php?title=Anonymous_Functions/Operators/Hyperators#Recursion' }),
		negative: sy('Negative', 'Mark a number as negative', { wiki: 'https://aplwiki.com/wiki/High_minus' }),
		inverse: sy('Inverse', 'The inverse of a function'),
		dfns: sy('Dfns Workspace'),
		eS: sy('Exponential Separator', 'Separates the multiplier and exponent of a number'),
		jS: sy('Complex Separator', 'Separates the real and imaginary part of a complex number'),
		adS: sy('Complex Angle Degrees'),
		ahS: sy('Complex Angle Signed Half Unit'),
		arS: sy('Complex Angle Radians'),
		auS: sy('Complex Angle Unsigned Unit'),
		bS: sy('Base Point Notation'),
		gS: sy('Gamma Point Notation'),
		pS: sy('Pi Point Notation'),
		rS: sy('Rational Notation'),
		vS: sy('Multiprecision Float'),
		xS: sy('Euler Point Notation'),
		zS: sy('Zeta Point Notation'),
		ball: sy('Ball Arithmetic Notation'),
		ijkS: sy('Quaternion Notation'),
		ijklS: sy('Octonion Notation'),
		sep: sy('Statement Separator'),
		comment: sy('Comment', 'Start a comment that ends at the end of the line'),
		char: sy('Character Literal', 'Character vector/scalar delimiter'),
		str: sy('String Literal', 'Like a character literal, but with escapes and always a vector'),
		spawn: me([mAy, xdAy], 'Spawn', 'Run the operand in a green thread', { wiki: 'https://aplwiki.com/wiki/Spawn' }),
		rootNs: me([R], 'Root Namespace'),
		parentNs: me([R], 'Parent Namespace'),
		rank: me([My], 'Rank'),
		formatByExample: me([xDy], 'Format By Example', 'Format the right argument accoding to the left argument "example"', { wiki: 'https://aplwiki.com/wiki/Format#Dyadic_form' }),
	},
	glyphs: [
		gl('+', ['conj', dy, ex, vi, n2, a2], ['add', dy, ex, vi, dz, n2, a2], ['plusId', dz]),
		gl('-', ['neg', dy, ex, vi, dz, n2, a2], ['sub', dy, ex, vi, dz, n2, a2], ['flipLetterCase', ex, dz]),
		gl('×', ['sign', dy, ex, vi, dz, n2, a2], ['dir', dy, ex, vi, n2, a2], ['mul', dy, ex, vi, dz, n2, a2], ['queryLetterCase', ex, dz], ['setLetterCase', ex]),
		gl('÷', ['rec', dy, ex, vi, dz, n2, a2], ['div', dy, ex, vi, dz, n2, a2], ['toTitleCase', ex]),
		gl('*', ['exp', dy, ex, vi, dz, n2, a2], ['pow', dy, ex, vi, dz, n2, a2]),
		gl('√', ['sqrt', ex, vi, dz, n2], ['root', ex, vi, dz, n2]),
		gl('⍟', ['ln', dy, ex, vi, dz, n2, a2], ['log', dy, ex, vi, dz, n2, a2]),
		gl('⌹', ['mInv', dy, ex, vi, n2, a2], ['mDiv', dy, ex, vi, n2, a2]),
		gl('○', ['piT', dy, ex, vi, dz, n2, a2], ['circ', dy, ex, vi, dz, n2, a2]),
		gl('!', ['fact', dy, ex, vi, dz, n2, a2], ['binom', dy, ex, vi, dz, n2, a2]),
		gl('?', ['roll', dy, ex, vi, dz, n2, a2], ['deal', dy, ex, vi, dz, n2, a2]),
		gl('|', ['abs', dy, ex, vi, dz, n2, a2], ['mag', dy, ex, vi, n2, a2], ['mod', dy, ex, vi, dz, n2, a2], ['caseFold', ex]),
		gl('⌈', ['ceil', dy, ex, vi, dz, n2, a2], ['max', dy, ex, vi, dz, n2, a2], ['toUpper', ex, dz]),
		gl('⌊', ['floor', dy, ex, vi, dz, n2, a2], ['min', dy, ex, vi, dz, n2, a2], ['toLower', ex, dz]),
		gl('⊥', ['decode', dy, ex, vi, dz, n2, a2], ['decode2', ex, dz]),
		gl('⊤', ['encode', dy, ex, vi, dz, n2, a2], ['encode2', ex, dz], ['type', n2]),
		gl('⊢', ['same', dy, ex, vi, dz, n2], ['right', dy, ex, vi, dz, n2]),
		gl('⊣', ['same', dy, ex, vi, dz, n2], ['left', dy, ex, vi, dz, n2]),
		gl('=', ['eq', dy, ex, vi, dz, n2, a2], ['isType', ex], ['rank', vi], ['dimension', n2]),
		gl('≠', ['neq', dy, ex, vi, dz, n2, a2], ['nubSieve', dy, vi], ['isNotType', ex], ['norm', n2]),
		gl('≤', ['leq', dy, ex, vi, dz, n2, a2], ['isNonneg', ex], ['isInvisible', ex], ['sortAsc', vi]),
		gl('<', ['le', dy, ex, vi, dz, n2, a2], ['isPos', ex], ['isControl', ex], ['majorCells', vi], ['sortAsc', dz], ['condense', n2]),
		gl('>', ['ge', dy, ex, vi, dz, n2, a2], ['isNeg', ex], ['isVisible', ex], ['join', vi], ['sortDesc', dz], ['dilate', n2]),
		gl('≥', ['geq', dy, ex, vi, dz, n2, a2], ['isNonpos', ex], ['isNotControl', ex], ['sortDesc', vi]),
		gl('≡', ['match', dy, ex, vi, dz, n2, a2], ['depth', dy, ex, vi, dz, n2, a2]),
		gl('≢', ['mismatch', dy, ex, vi, dz, n2], ['tally', dy, ex, vi, dz, n2]),
		gl('∨', ['or', dy, ex, vi, dz, n2, a2], ['gcd', dy, ex, vi, dz, n2], ['sortDesc', ex], ['demote', vi], ['gcdM', dz]),
		gl('∧', ['and', dy, ex, vi, dz, n2, a2], ['lcm', dy, ex, vi, dz, n2], ['sortAsc', ex], ['promote', vi], ['lcmM', dz]),
		gl('⍱', ['nor', dy, ex, vi, dz, n2, a2], ['notAnyEqualToType', ex], ['notAll', dz]),
		gl('⍲', ['nand', dy, ex, vi, dz, n2, a2], ['notAllEqualToType', ex], ['none', dz]),
		gl('↑', ['mix', dy, ex, vi, dz], ['take', dy, ex, vi, dz, n2, a2], ['first', n2, a2]),
		gl('↓', ['split', dy, ex, vi, dz], ['drop', dy, ex, vi, dz, n2, a2]),
		gl('⊂', ['enclose', dy, ex, vi, dz, n2, a2], ['penclose', dy, ex, vi, dz], ['partition', n2, a2]),
		gl('⊃', ['first', dy, ex, vi, dz], ['pick', dy, ex, vi, dz, n2, a2], ['mix', n2, a2]),
		gl('⊆', ['nest', dy, ex, vi], ['partition', dy, ex, vi], ['subset', n2]),
		gl('⊇', ['discloseIfScalar', ex], ['from', ex, vi, dz], ['last', vi], ['superset', n2]),
		gl('⌷', ['index', dy, ex, vi, dz, n2, a2], ['materialize', dy, ex, vi], ['mapKV', dz]),
		gl('⍋', ['gradeUp', dy, ex, vi, dz, n2, a2], ['gradeUpD', dy, ex, vi, dz, n2, a2]),
		gl('⍒', ['gradeDown', dy, ex, vi, dz, n2, a2], ['gradeDownD', dy, ex, vi, dz, n2, a2]),
		gl('⍳', ['indexGenerator', dy, ex, vi, dz, n2, a2], ['indexOf', dy, ex, vi, dz, n2, a2]),
		gl('⍸', ['where', dy, ex, vi, dz, n2], ['intervalIndex', dy, ex, vi], ['arrayLookup', n2]),
		gl('∊', ['elementOf', dy, ex, vi, dz, n2, a2], ['enlist', dy, ex, vi, dz, n2, a2]),
		gl('⍷', ['find', dy, ex, vi, dz, n2, a2], ['type', ex, vi]),
		gl('∪', ['union', dy, ex, vi, dz, n2], ['nub', dy, ex, vi, dz, n2]),
		gl('∩', ['intersection', dy, ex, vi, dz, n2], ['nubIn', ex]),
		gl('~', ['not', dy, ex, vi, dz, n2, a2], ['without', dy, ex, vi, dz, n2, a2], ['m1', ex]),
		gl('§', ['symDiff', n2]),
		gl('/', ['reduce', dy, ex, vi, dz, n2, a2], ['wreduce', dy, ex, vi, dz, n2, a2], ['compress', dy, ex, vi, n2], ['replicate', dy, ex, vi, n2], ['compressO', a2], ['replicateO', a2]),
		gl('⌿', ['reduceF', dy, ex, vi, n2, a2], ['wreduceF', dy, ex, vi, n2, a2], ['compressF', dy, ex, vi, dz, n2], ['replicateF', dy, ex, vi, dz, n2], ['compressOF', a2], ['replicateOF', a2]),
		gl('\\', ['scan', dy, ex, vi, dz, n2, a2], ['expand', dy, ex, vi, dz, n2], ['outerProduct', ex], ['expandO', a2]),
		gl('⍀', ['scanF', dy, ex, vi, dz, n2, a2], ['expandF', dy, ex, vi, dz, n2], ['applyRight', ex], ['expandOF', a2]),
		gl(',', ['ravel', dy, ex, vi, dz, n2, a2], ['cat', dy, ex, vi, dz, n2, a2]),
		gl('⍪', ['table', dy, ex, vi, dz, n2], ['catF', dy, ex, vi, dz, n2]),
		gl('⍴', ['shape', dy, ex, vi, dz, n2, a2], ['reshape', dy, ex, vi, dz, n2, a2]),
		gl('⌽', ['reverse', dy, ex, vi, dz, n2, a2], ['rotate', dy, ex, vi, dz, n2, a2]),
		gl('⊖', ['reverseF', dy, ex, vi, dz, n2, a2], ['rotateF', dy, ex, vi, dz, n2, a2]),
		gl('⍉', ['transpose', dy, ex, vi, dz, n2, a2], ['transposeD', dy, ex, vi, dz, n2, a2]),
		gl('¨', ['each1', dy, ex, vi, dz, n2, a2], ['each2', dy, ex, vi, dz, n2, a2]),
		gl('⍨', ['constant', dy, ex, vi, dz], ['commute', dy, ex, vi, dz, n2], ['duplicate', dy, ex, vi, dz, n2]),
		gl('⍣', ['repeat', dy, ex, vi, dz, n2], ['until', dy, ex, vi, dz, n2]),
		gl('⍡', ['cumulativeRepeat', dz], ['convolution', n2]),
		gl('.', ['innerProduct', dy, ex, vi, dz, n2, a2], ['alternant', n2]),
		gl('∙', ['innerProduct', ex], ['alternant', ex]),
		gl('∘.', ['outerProduct', dy, ex, vi, dz, n2, a2]),
		gl('∘', ['compose', dy, ex, vi, dz, n2], ['after', dy, ex, vi, dz, n2], ['bind', dy, ex, vi, dz, n2]),
		gl('⍛', ['before', ex, vi, dz]),
		gl('⍤', ['compose', dy, ex, vi, dz, n2], ['atop', dy, ex, vi, dz, n2], ['atRank', dy, ex, vi, n2]),
		gl('⍥', ['compose', dy, ex, vi, dz, n2], ['over', dy, ex, vi, dz, n2], ['atDepth', ex, vi]),
		gl('⍢', ['under', ex, vi, dz]),
		gl('ᐵ', ['eachLeft', dz]),
		gl('ᑈ', ['eachRight', dz]),
		gl('@', ['at', dy, ex, vi, dz]),
		gl('⍫', ['obverse', ex, vi, dz]),
		gl('⎕', ['evalInput', dy, ex, vi, dz, n2, a2], ['stdout', dy, ex, vi, dz, n2, a2], ['sys', dy, ex, vi, dz, n2, a2]),
		gl('⍞', ['stringInput', dy, ex, vi, dz, n2, a2], ['stderr', dy, ex, vi, dz, n2, a2]),
		gl('⍠', ['variant', dy, ex, vi, n2]),
		gl('⌸', ['keyI', dy, ex, vi, dz], ['keyV', dy, ex, vi, dz], ['keyVocI', vi], ['keyVocV', vi], ['getMap', dz], ['setMap', dz]),
		gl('⍁', ['diagonals', dz]),
		gl('⌺', ['stencil', dy, ex, vi]),
		gl('⌶', ['beam', dy, ex, vi]),
		gl('⍎', ['execute', dy, ex, vi, dz, n2, a2]),
		gl('⍕', ['format', dy, ex, vi, dz, n2, a2], ['dformat', dy, ex, vi, n2, a2], ['formatByExample', a2]),
		gl('⍬', ['zilde', dy, ex, vi, dz, n2]),
		gl('∞', ['inf', ex, dz, n2]),
		gl('¯∞', ['ninf', ex, dz, n2]),
		gl('∅', ['nan', n2]),
		gl('#', ['rootNs', dy, ex, vi]),
		gl('##', ['parentNs', dy, ex, vi]),
		gl('⌾', ['cartD', ex], ['cartM', ex], ['outerProduct', dz]),
		gl('$', ['mstringE', ex, vi], ['dstringE', ex, vi]),
		gl('…', ['range', ex, dz]),
		gl('..', ['range', n2]),
		gl('⍦', ['multisets', n2]),
		gl('⍧', ['nubSieve', ex, dz], ['countIn', ex, dz]),
		gl('%', ['probab', ex], ['merge', dz]),
		gl('⍮', ['pair', ex, dz], ['halfPair', ex, dz]),
		gl('⍭', ['factors', ex], ['primeRelated', ex]),
		gl('π', ['primeFactors', n2], ['primeRelated', n2]),
		gl('⊙', ['null', n2]),
		gl('‼', ['combinatorial', n2]),
		gl('⌻', ['matrix', n2]),
		gl('∂', ['deriv', n2]),
		gl('∫', ['integ', n2]),
		gl('⍑', ['transform', n2]),
		gl('&', ['spawn', dy, ex, vi]),
		gl('{}', ['dfn', dy, ex, vi, dz, n2], ['dop', dy, ex, vi, dz, n2], ['dhyp', n2]),
		gl('⍺', ['larg', dy, ex, vi, dz, n2]),
		gl('⍵', ['rarg', dy, ex, vi, dz, n2]),
		gl('⍺⍺', ['lop', dy, ex, vi, n2]),
		gl('⍶', ['lop', dz]),
		gl('⍵⍵', ['rop', dy, ex, vi, n2]),
		gl('⍹', ['rop', dz]),
		gl('⍺⍺⍺', ['lhyp', n2]),
		gl('⍵⍵⍵', ['rhyp', n2]),
		gl('χ', ['axisArg', n2]),
		gl(':', ['guard', dy, ex, vi, dz, n2], ['control', dy, ex, vi, n2], ['label', dy, ex, vi]),
		gl('::', ['errorGuard', dy, ex, vi]),
		gl('[]', ['bindex', dy, ex, vi, dz, n2, a2], ['axis', dy, ex, vi, n2, a2]),
		gl(';', ['semi', dy, ex, vi, dz, n2, a2]),
		gl('←', ['assign', dy, ex, vi, dz, n2, a2], ['return', dz], ['sink', n2]),
		gl('→', ['branch', dy, ex, vi, n2, a2]),
		gl('∇', ['tradfn', dy, ex, vi, n2, a2], ['recfn', dy, ex, vi, dz, n2]),
		gl('∇∇', ['recop', dy, ex, vi, n2]),
		gl('∇∇∇', ['rechyp', n2]),
		gl('¯', ['negative', dy, ex, vi, dz, n2, a2], ['inverse', ex]),
		gl('⌂', ['dfns', ex]),
		gl('E', ['eS', dy, ex, vi, dz, n2]),
		gl('e', ['eS', dy, ex, vi, dz, n2]),
		gl('J', ['jS', dy, ex, vi, n2, a2]),
		gl('j', ['jS', dy, ex, vi]),
		gl('i', ['jS', n2]),
		gl('D', ['adS', a2]),
		gl('R', ['arS', a2]),
		gl('ad', ['adS', n2]),
		gl('ah', ['ahS', n2]),
		gl('ar', ['arS', n2]),
		gl('au', ['auS', n2]),
		gl('b', ['bS', n2]),
		gl('g', ['gS', n2]),
		gl('p', ['pS', n2]),
		gl('r', ['rS', n2]),
		gl('v', ['vS', n2]),
		gl('x', ['xS', n2]),
		gl('z', ['zS', n2]),
		gl('±', ['ball', n2]),
		gl('ijk', ['ijkS', n2]),
		gl('ijkl', ['ijklS', n2]),
		gl('⋄', ['sep', dy, ex, vi, dz, n2, a2]),
		gl('⍝', ['comment', dy, ex, vi, dz, n2, a2]),
		gl('\'', ['char', dy, ex, vi, dz, n2, a2]),
		gl('"', ['str', dz]),
	],
};
