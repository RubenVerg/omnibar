import type { Glyph, GlyphRepr, Glyphs, Meaning } from './types';

const C = 'C', D = 'D', dy = 'dy', ex = 'ex', vi = 'vi', dz = 'dz', n2 = 'n2';

const m = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 'm', urls } as Meaning);
const d = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 'd', urls } as Meaning);
const a = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 'a', urls } as Meaning);
const c = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 'c', urls } as Meaning);
const r = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 'r', urls } as Meaning);
const h = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 'h', urls } as Meaning);
const s = (name: string, description: string | undefined = undefined, urls: Record<string, string> = {}) => ({ name, description, category: 's', urls } as Meaning);

const gl = (glyph: GlyphRepr, ...meanings: [string, ...string[]][]) => ({ glyph, meanings: meanings.map(_ => [_[0], _.slice(1)]) } as Glyph);

const glyphs: Glyphs = {
	categories: {
		m: { name: 'Monadic function', color: '#fdffb6' },
		d: { name: 'Dyadic function', color: '#ffd6a5' },
		a: { name: 'Monadic operator', color: '#9bf6ff' },
		c: { name: 'Dyadic operator', color: '#a0c4ff' },
		r: { name: 'Array', color: '#ffadad' },
		h: { name: 'Hyperator', color: '#caffbf' },
		s: { name: 'Syntax', color: '#ffc6ff' },
	},
	dialects: {
		C: { name: 'Core APL', children: ['D', 'dz', 'n2'] },
		D: { name: 'Core Dyalog APL', children: ['dy', 'ex', 'vi'] },
		dy: { name: 'Dyalog APL' },
		ex: { name: 'Extended Dyalog APL' },
		vi: { name: 'Dyalog APL Vision' },
		dz: { name: 'dzaima/APL' },
		n2: { name: 'NARS2000' },
	},
	urls: {
		wiki: { name: 'APL Wiki' },
		dyalog: { name: 'Dyalog Reference' },
		nars2000: { name: 'NARS2000 Wiki' },
		paper: { name: 'Paper' },
	},
	meanings: {
		conj: m('Conjugate', '(Hyper)complex conjugate', { wiki: 'https://aplwiki.com/wiki/Conjugate' }),
		add: d('Addition', undefined, { wiki: 'https://aplwiki.com/wiki/Add' }),
		plusId: m('Identity'),
		neg: m('Negate', undefined, { wiki: 'https://aplwiki.com/wiki/Negate' }),
		sub: m('Subtraction', undefined, { wiki: 'https://aplwiki.com/wiki/Subtract' }),
		flipLetterCase: m('Flip Letter Case'),
		sign: m('Signum', undefined, { wiki: 'https://aplwiki.com/wiki/Signum' }),
		dir: m('Direction', 'Complex signum', { wiki: 'https://aplwiki.com/wiki/Signum' }),
		mul: d('Multiplication', undefined, { wiki: 'https://aplwiki.com/wiki/Times' }),
		queryLetterCase: m('Query Letter Case'),
		setLetterCase: m('Set Letter Case'),
		rec: m('Reciprocal', undefined, { wiki: 'https://aplwiki.com/wiki/Reciprocal' }),
		div: d('Division', undefined, { wiki: 'https://aplwiki.com/wiki/Divide' }),
		toTitleCase: m('To Title Case'),
		exp: m('Exponential', 'Power with Euler\'s number as the base', { wiki: 'https://aplwiki.com/wiki/Exponential' }),
		pow: d('Power', undefined, { wiki: 'https://aplwiki.com/wiki/Power_(function)' }),
		sqrt: m('Square Root', undefined, { wiki: 'https://aplwiki.com/wiki/Square_Root' }),
		root: d('Root', undefined, { wiki: 'https://aplwiki.com/wiki/Root' }),
		ln: m('Natural Logarithm', undefined, { wiki: 'https://aplwiki.com/wiki/Natural_Logarithm' }),
		log: d('Logarithm', undefined, { wiki: 'https://aplwiki.com/wiki/Logarithm' }),
		mInv: m('Matrix Inverse', undefined, { wiki: 'https://aplwiki.com/wiki/Matrix_Inverse' }),
		mDiv: d('Matrix Division', undefined, { wiki: 'https://aplwiki.com/wiki/Matrix_Divide' }),
		piT: m('Pi Times', undefined, { wiki: 'https://aplwiki.com/wiki/Pi_Times' }),
		circ: d('Circular Functions', 'A range of trigonometric and related functions selected using the left argument', { wiki: 'https://aplwiki.com/wiki/Circular' }),
		fact: m('Factorial', undefined, { wiki: 'https://aplwiki.com/wiki/Factorial' }),
		binom: d('Binomial Coefficient', undefined, { wiki: 'https://aplwiki.com/wiki/Binomial' }),
		roll: m('Roll', 'Random integer(s) in the range defined by the argument, or random float (0; 1) if the element is 0', { wiki: 'https://aplwiki.com/wiki/Roll' }),
		deal: d('Deal', 'Right argument random selections from the range defined by the left argument', { wiki: 'https://aplwiki.com/wiki/Deal' }),
		abs: m('Absolute Value', undefined, { wiki: 'https://aplwiki.com/wiki/Magnitude' }),
		mag: m('Magnitude', undefined, { wiki: 'https://aplwiki.com/wiki/Magnitude' }),
		mod: d('Residue', undefined, { wiki: 'https://aplwiki.com/wiki/Residue' }),
		caseFold: m('Case Fold'),
		ceil: m('Ceiling', 'The smallest integer greater than or equal to the argument', { wiki: 'https://aplwiki.com/wiki/Ceiling' }),
		max: d('Maximum', 'The largest argument', { wiki: 'https://aplwiki.com/wiki/Maximum' }),
		toUpper: m('To Uppercase'),
		floor: m('Floor', 'The largest integer less than or equal to the argument', { wiki: 'https://aplwiki.com/wiki/Floor' }),
		min: d('Minimum', 'The smallest argument', { wiki: 'https://aplwiki.com/wiki/Minimum' }),
		toLower: m('To Lowercase'),
		decode: d('Decode', 'Evaluate the right argument in the base defined by the left argument', { wiki: 'https://aplwiki.com/wiki/Decode' }),
		decode2: m('Base-2 Decode'),
		encode: d('Encode', 'Represent the right argument in the base defined by the left argument', { wiki: 'https://aplwiki.com/wiki/Encode' }),
		encode2: m('Base-2 Encode'),
		type: m('Type', 'Prototype array corresponding to the argument', { wiki: 'https://aplwiki.com/wiki/Type' }),
		same: m('Same', 'The argument, unchanged', { wiki: 'https://aplwiki.com/wiki/Identity' }),
		right: d('Right', 'The right argument, unchanged', { wiki: 'https://aplwiki.com/wiki/Identity' }),
		left: d('Left', 'The left argument, unchanged', { wiki: 'https://aplwiki.com/wiki/Identity' }),
		eq: d('Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Equal_to' }),
		isType: m('Is Type?', 'Equal to type'),
		dimension: m('Dimension', 'Hypercomplex dimension (1, 2, 4, or 8)'),
		neq: d('Not Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Not_Equal_to' }),
		nubSieve: m('Nub Sieve', 'Mask that marks the first occurrence of each element', { wiki: 'https://aplwiki.com/wiki/Nub_Sieve' }),
		isNotType: m('Is Not Type?', 'Not equal to type'),
		norm: m('Norm', 'Argument times the conjugate of the argument'),
		leq: d('Less Than or Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Less_than_or_Equal_to' }),
		isNonneg: m('Is Nonnegative?'),
		isInvisible: m('Is Invisible Character?'),
		sortAsc: m('Sort Ascending'),
		le: d('Less Than', undefined, { wiki: 'https://aplwiki.com/wiki/Less_than' }),
		isPos: m('Is Positive?'),
		isControl: m('Is Control Character?'),
		majorCells: m('Major Cells'),
		condense: m('Condense', 'Compress a real array into an array of hypercomplex numbers', { nars2000: 'https://wiki.nars2000.org/index.php?title=Condense' }),
		ge: d('Greater Than', undefined, { wiki: 'https://aplwiki.com/wiki/Greater_than' }),
		isNeg: m('Is Negative?'),
		isVisible: m('Is Visible Character?'),
		join: m('Join', 'Merge array of arrays into single array'),
		dilate: m('Dilate', 'Expand an array of hypercomplex numbers into an array of reals', { nars2000: 'https://wiki.nars2000.org/index.php?title=Dilate' }),
		geq: d('Greater Than or Equal To', undefined, { wiki: 'https://aplwiki.com/wiki/Greater_than_or_Equal_to' }),
		isNonpos: m('Is Nonpositive?'),
		isNotControl: m('Is Not Control Character?'),
		sortDesc: m('Sort Descending'),
		match: d('Match', 'Compare the whole arrays for equality', { wiki: 'https://aplwiki.com/wiki/Match' }),
		depth: m('Depth', 'Level of nesting', { wiki: 'https://aplwiki.com/wiki/Depth' }),
		mismatch: d('Not Match', undefined, { wiki: 'https://aplwiki.com/wiki/Not_Match' }),
		tally: m('Tally', 'The amount of major cells', { wiki: 'https://aplwiki.com/wiki/Tally' }),
		or: d('Or', undefined, { wiki: 'https://aplwiki.com/wiki/Or' }),
		gcd: d('Greatest Common Divisor', undefined, { wiki: 'https://aplwiki.com/wiki/GCD' }),
		demote: m('Demote', 'Combine two leading axes'),
		gcdM: m('Monadic GCD', 'GCD reduction (any 1?)'),
		and: d('And', undefined, { wiki: 'https://aplwiki.com/wiki/And' }),
		lcm: d('Least Common Multiple', undefined, { wiki: 'https://aplwiki.com/wiki/LCM' }),
		promote: m('Promote', 'Add a length-1 axis before the other axes', { wiki: 'https://aplwiki.com/wiki/Promote' }),
		lcmM: m('Monadic LCM', 'LCM reduction (all 1?)'),
		nor: d('Nor', undefined, { wiki: 'https://aplwiki.com/wiki/Nor' }),
		notAnyEqualToType: m('Not Any Equal To Type'),
		notAll: m('Not All', 'Any 0?'),
		nand: d('Nand', undefined, { wiki: 'https://aplwiki.com/wiki/Nand' }),
		notAllEqualToType: m('Not All Equal To Type'),
		none: m('None', 'All 0?'),
		mix: m('Mix', 'Combine all elements into a single array', { wiki: 'https://aplwiki.com/wiki/Mix' }),
		take: d('Take', undefined, { wiki: 'https://aplwiki.com/wiki/Take' }),
		split: m('Split', 'Convert an axis to a level of nesting', { wiki: 'https://aplwiki.com/wiki/Split' }),
		drop: d('Drop', undefined, { wiki: 'https://aplwiki.com/wiki/Drop' }),
		enclose: m('Enclose', 'Wrap the argument into a nested scalar', { wiki: 'https://aplwiki.com/wiki/Enclose' }),
		penclose: d('Partitioned Enclose', 'Split the right argument into pieces specified by the left argument', { wiki: 'https://aplwiki.com/wiki/Partitioned_Enclose' }),
		partition: d('Partition', 'Split the right argument into pieces specified by the left argument', { wiki: 'https://aplwiki.com/wiki/Partition' }),
		first: m('First', 'The first element of the argument', { wiki: 'https://aplwiki.com/wiki/First' }),
		pick: d('Pick', 'Extract a value through layers of nesting', { wiki: 'https://aplwiki.com/wiki/Pick' }),
		nest: m('Nest', 'Enclose if simple', { wiki: 'https://aplwiki.com/wiki/Nest' }),
		subset: d('Subset', 'Is subset?', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sets' }),
		discloseIfScalar: m('Disclose If Scalar'),
		saneIndex: d('Sane Index', 'Function form of bracket indexing', { wiki: 'https://aplwiki.com/wiki/From' }),
		last: m('Last', 'Last element in ravel order'),
		superset: d('Superset', 'Is superset?', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sets' }),
		index: d('Index', 'Items of the right argument as specified by the left argument', { wiki: 'https://aplwiki.com/wiki/Index_(function)' }),
		materialize: m('Materialize', 'Cast the argument to an array', { wiki: 'https://aplwiki.com/wiki/Materialise' }),
		mapKV: m('Map Key/Value Pairs'),
		gradeUp: m('Grade Up', 'Indices that sort the argument in ascending order', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		gradeDown: m('Grade Down', 'Indices that sort the argument in descending order', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		gradeUpD: m('Dyadic Grade Up', 'Indices that sort the right argument in ascending order, according to the left argument', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		gradeDownD: m('Dyadic Grade Up', 'Indices that sort the right argument in descending order, according to the left argument', { wiki: 'https://aplwiki.com/wiki/Grade' }),
		indexGenerator: m('Index Generator', 'Indices with shaoe specified by the argument', { wiki: 'https://aplwiki.com/wiki/Index_Generator' }),
		indexOf: d('Index Of', undefined, { wiki: 'https://aplwiki.com/wiki/Index_Of' }),
		where: m('Where', 'True indices in the argument mask', { wiki: 'https://aplwiki.com/wiki/Indices' }),
		intervalIndex: d('Interval Index', 'Determine fitting interval, left argument giving beginning points', { wiki: 'https://aplwiki.com/wiki/Interval_Index' }),
		arrayLookup: d('Array Lookup', 'Like ⍳, but on major cells'),
		elementOf: d('Element Of', undefined, { wiki: 'https://aplwiki.com/wiki/Membership' }),
		enlist: m('Enlist', 'All simple elements of the argument, traversing nested elements', { wiki: 'https://aplwiki.com/wiki/Enlist' }),
		find: d('Find', 'Mask of the start corners of the appearances of the left argument in the right argument', { wiki: 'https://aplwiki.com/wiki/Find' }),
		union: d('Union', 'The left argument catenated with the elements of the right argument that don\'t appear in the left argument', { wiki: 'https://aplwiki.com/wiki/Union' }),
		nub: m('Unique', 'Unique elements', { wiki: 'https://aplwiki.com/wiki/Unique' }),
		intersection: d('Intersection', 'All elements of the left argument that appear in the right argument', { wiki: 'https://aplwiki.com/wiki/Intersection' }),
		nubIn: m('Nub in', 'Table of which elements are their unique', { wiki: 'https://aplwiki.com/wiki/Nub_in' }),
		not: m('Not', undefined, { wiki: 'https://aplwiki.com/wiki/Not' }),
		m1: m('1 Minus', 'Like Not but extended to floats [0; 1]'),
		without: d('Without', 'All elements of the left argument that don\'t appear in the right argument', { wiki: 'https://aplwiki.com/wiki/Without' }),
		symDiff: d('Symmetric Difference', 'Elements that appear in exactly one of the arguments', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sets' }),
		reduce: a('Reduce', undefined, { wiki: 'https://aplwiki.com/wiki/Reduce' }),
		reduceF: a('Reduce First', undefined, { wiki: 'https://aplwiki.com/wiki/Reduce' }),
		wreduce: a('Windowed Reduce', undefined, { wiki: 'https://aplwiki.com/wiki/Windowed_Reduce' }),
		wreduceF: a('Windowed Reduce First', undefined, { wiki: 'https://aplwiki.com/wiki/Windowed_Reduce' }),
		replicate: d('Replicate', undefined, { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		replicateF: d('Replicate First', undefined, { wiki: 'https://aplwiki.com/wiki/Replicate' }),
		scan: a('Scan', undefined, { wiki: 'https://aplwiki.com/wiki/Scan' }),
		scanF: a('Scan First', undefined, { wiki: 'https://aplwiki.com/wiki/Scan' }),
		expand: d('Expand', undefined, { wiki: 'https://aplwiki.com/wiki/Expand' }),
		expandF: d('Expand First', undefined, { wiki: 'https://aplwiki.com/wiki/Expand' }),
		applyRight: a('Apply To Right Argument (?)', '⊢∘f'),
		ravel: m('Ravel', 'All elements of the argument as a vector', { wiki: 'https://aplwiki.com/wiki/Ravel' }),
		cat: d('Catenate', undefined, { wiki: 'https://aplwiki.com/wiki/Catenate' }),
		table: m('Ravel Items', undefined, { wiki: 'https://aplwiki.com/wiki/Table' }),
		catF: d('Catenate First', undefined, { wiki: 'https://aplwiki.com/wiki/Catenate' }),
		shape: m('Shape', undefined, { wiki: 'https://aplwiki.com/wiki/Shape' }),
		reshape: d('Reshape', undefined, { wiki: 'https://aplwiki.com/wiki/Reshape' }),
		reverse: m('Reverse', undefined, { wiki: 'https://aplwiki.com/wiki/Reverse' }),
		rotate: d('Rotate', undefined, { wiki: 'https://aplwiki.com/wiki/Rotate' }),
		reverseF: m('Reverse First', undefined, { wiki: 'https://aplwiki.com/wiki/Reverse' }),
		rotateF: d('Rotate First', undefined, { wiki: 'https://aplwiki.com/wiki/Rotate' }),
		transpose: m('Transpose', undefined, { wiki: 'https://aplwiki.com/wiki/Transpose#Monadic_usage' }),
		transposeD: d('Dyadic Transpose', undefined, { wiki: 'https://aplwiki.com/wiki/Transpose#Dyadic_usage' }),
		each: a('Each', 'Apply a function to each element of a/two array(s)', { wiki: 'https://aplwiki.com/wiki/Each' }),
		constant: a('Constant', 'A function that always returns the operand', { wiki: 'https://aplwiki.com/wiki/Constant' }),
		commute: a('Commute', 'Call the operand with the arguments swapped (dyadic call) or duplicated (monadic call)', { wiki: 'https://aplwiki.com/wiki/Commute' }),
		repeat: a('Repeat', 'Repeat a function until a predicate is satisfied or a specified number of times', { wiki: 'https://aplwiki.com/wiki/Power_(operator)' }),
		cumulativeRepeat: a('Cumulative Repeat', 'Like ⍣, but collect intermediary results'),
		convolution: c('Convolution', undefined, { nars2000: 'https://wiki.nars2000.org/index.php?title=Convolution' }),
		innerProduct: c('Inner Product', 'Apply a function to each pair in the arguments and combine the results with another function', { wiki: 'https://aplwiki.com/wiki/Inner_Product' }),
		alternant: c('Alternant', 'Generalized discriminant', { nars2000: 'https://wiki.nars2000.org/index.php?title=Determinant_Operator' }),
		outerProduct: a('Outer Product', 'Apply a function to the cartesian product of the two arguments', { wiki: 'https://aplwiki.com/wiki/Outer_Product' }),
		after: c('After', 'Preprocess the right argument to a function with another function', { wiki: 'https://aplwiki.com/wiki/Beside' }),
		bind: c('Bind', 'Bind an argument to a dyadic function, making it monadic', { wiki: 'https://aplwiki.com/wiki/Bind' }),
		before: c('Before', 'Preprocess the left argument to a function with another function', { wiki: 'https://aplwiki.com/wiki/Reverse_Compose' }),
		atop: c('Atop', 'Call a monad using the result of a dyad as the argument', { wiki: 'https://aplwiki.com/wiki/Atop_(operator)' }),
		atRank: c('Rank', 'Apply a function at a specified rank', { wiki: 'https://aplwiki.com/wiki/Rank_(operator)' }),
		over: c('Over', 'Preprocess all arguments to a function with another function', { wiki: 'https://aplwiki.com/wiki/Over' }),
		atDepth: c('Depth', 'APply a function at a specified depth', { wiki: 'https://aplwiki.com/wiki/Depth_(operator)' }),
		under: c('Under', 'Apply a function, then another function, then the first function\'s inverse', { wiki: 'https://aplwiki.com/wiki/Under' }),
		eachLeft: a('Each Left', 'Each, only on the left argument'),
		eachRight: a('Each Right', 'Each, only on the right argument'),
		at: c('At', 'Transform selected elements of an array', { wiki: 'https://aplwiki.com/wiki/At' }),
		obverse: c('Obverse', 'Specify the inverse function for a function'),
		evalInput: s('Evaluated Input'),
		stdout: s('Standard Output'),
		sys: s('System Name', 'First character of a system name', { wiki: 'https://aplwiki.com/wiki/Quad_name' }),
		stringInput: s('String Input'),
		stderr: s('Standard Error'),
		variant: c('Variant', 'Select a related function', { wiki: 'https://aplwiki.com/wiki/Variant', dyalog: 'https://help.dyalog.com/18.2/Content/Language/Primitive%20Operators/Variant.htm', nars2000: 'https://wiki.nars2000.org/index.php?title=Variant' }),
		keyI: a('Key (Indices)', 'Apply a function to unique elements of an array and their indices', { wiki: 'https://aplwiki.com/wiki/Key' }),
		keyV: a('Key (Values)', 'Apply a function to unique elements of the right array and the corrersponding entries in the left array'),
		keyVocI: a('Key With Vocabulary (Indices)', 'Locations of each element in the vocabulary in the argument'),
		keyVocV: a('Key With Vocabulary (Values)', 'Elements of the left argument corresponding to locations of elements in the vocabulary in the right argument'),
		getMap: a('Get In Map'),
		setMap: a('Set In Map'),
		diagonals: a('Diagonals', 'Apply a function to each diagonal of a matrix'),
		stencil: c('Stencil', 'Apply a function to windows of an array', { wiki: 'https://aplwiki.com/wiki/Stencil' }),
		beam: a('I-Beam', 'Access non-primitive, implementation specific functions', { wiki: 'https://aplwiki.com/wiki/I-Beam', dyalog: 'https://help.dyalog.com/18.2/Content/Language/Primitive%20Operators/I%20Beam.htm' }),
		execute: m('Execute', undefined, { wiki: 'https://aplwiki.com/wiki/Execute' }),
		format: m('Format', undefined, { wiki: 'https://aplwiki.com/wiki/Format#Monadic_form' }),
		dformat: m('Format With Specification', 'Format specifying column widths, decimal places and optionally scientific notation', { wiki: 'https://aplwiki.com/wiki/Format#Dyadic_form' }),
		zilde: r('Zilde', 'Empty numeric vector', { wiki: 'https://aplwiki.com/wiki/Zilde' }),
		dfns: r('Dfns Workspace'),
		inf: r('Infinity', 'The largest number'),
		ninf: r('Negative Infinity', 'The smallest number'),
		nan: r('Not a Number'),
		cartM: m('Imaginary', 'i * arg', { wiki: 'https://aplwiki.com/wiki/Imaginary' }),
		cartD: d('Complex', 'left + i * right', { wiki: 'https://aplwiki.com/wiki/Complex_(function)' }),
		stringEnhancement: d('String Enhancement', '${expr} inside a string is evaluated'),
		range: d('Range', undefined, { wiki: 'https://aplwiki.com/wiki/Range' }),
		multisets: a('Multisets', 'Turns set functions into multiset functions', { nars2000: 'https://wiki.nars2000.org/index.php?title=Multisets' }),
		countIn: d('Count In', 'Count occurrences of each of the left argument in the right argument'),
		probab: a('Probability-logical Function', 'Multiplicative fuzzy logic (probabalistic) function corresponding to the Boolean function given'),
		merge: d('Merge', 'Compose array by choosing each element from the corresponding element in each of a set of sources', { wiki: 'https://aplwiki.com/wiki/Case' }),
		pair: d('Pair', undefined, { wiki: 'https://aplwiki.com/wiki/Pair' }),
		halfPair: m('Half Pair'),
		factors: m('Factors'),
		primeRelated: d('Prime Related Functions', 'Prime-related functions on the right argument, selected by left argument'),
		primeFactors: m('Prime Factors'),
		null: a('Null', 'The identity operator, useful for casting hybrids to functions', { nars2000: 'https://wiki.nars2000.org/index.php?title=Null' }),
		combinatorial: a('Combinatorial', 'Combinatorial functions selected by the operand', { nars2000: 'https://wiki.nars2000.org/index.php?title=Combinatorial' }),
		matrix: a('Matrix', 'Apply a function to a diagonalizable matrix', { nars2000: 'https://wiki.nars2000.org/index.php?title=Matrix' }),
		deriv: a('Derivative', undefined, { nars2000: 'https://wiki.nars2000.org/index.php?title=Derivative' }),
		integ: a('Integral', undefined, { nars2000: 'https://wiki.nars2000.org/index.php?title=Integral' }),
		transform: h('Transform', undefined, { paper: 'http://www.sudleyplace.com/APL/A%20Transform%20Hyperator%20in%20APL.pdf' }),
		dfn: s('Dfn', 'Wrap a dfn (anonymous function) definition', { wiki: 'https://aplwiki.com/wiki/Dfn' }),
		dop: s('Dop', 'Wrap a dop (anonymous operator) definition', { wiki: 'https://aplwiki.com/wiki/Dfn' }),
		dhyp: s('Dhyp', 'Wrap a dhyp (anonimous hyperator) definition', { nars2000: 'https://wiki.nars2000.org/index.php?title=Anonymous_Functions/Operators/Hyperators' }),
		larg: s('Left Argument'),
		rarg: s('Right Argument'),
		lop: s('Left Operand'),
		rop: s('Right Operand'),
		lhyp: s('Left Hyperand'),
		rhyp: s('Right Hyperand'),
		axisArg: s('Axis Argument'),
		guard: s('Guard', 'Dfn guard: run RHS if LHS is true', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Guards.htm' }),
		control: s('Control Structure', 'Begin a control structure name', { wiki: 'https://aplwiki.com/wiki/Control_structure' }),
		label: s('Label', 'Target for a branch', { dyalog: 'https://help.dyalog.com/18.2/Content/Language/Defined%20Functions%20and%20Operators/TradFns/Statements.htm' }),
		errorGuard: s('Error Guard', 'If an error of the LHS category occurs, return the RHS', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Error%20Guards.htm' }),
		bindex: s('Index', 'Index into an array', { wiki: 'https://aplwiki.com/wiki/Indexing' }),
		axis: s('Function Axis', 'Specify an axis for a function', { wiki: 'https://aplwiki.com/wiki/Function_axis' }),
		semi: s('Axis Separator', 'Inside a bracket index, separates the different axes', { wiki: 'https://aplwiki.com/wiki/Indexing' }),
		assign: s('Assignment', undefined, { wiki: 'https://aplwiki.com/wiki/Assignment' }),
		return: s('Return', 'Return early from a dfn'),
		sink: s('Sink', 'Don\'t print the result of an expression', { nars2000: 'https://wiki.nars2000.org/index.php?title=Sink' }),
		branch: s('Branch', undefined, { wiki: 'https://aplwiki.com/wiki/Branch' }),
		tradfn: s('Tradfn Definition', undefined, { wiki: 'https://aplwiki.com/wiki/Defined_function_(traditional)' }),
		recfn: s('Recurse Function', 'In a dfn, refer to the dfn itself', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Recursion.htm' }),
		recop: s('Recurse Function', 'In a dop, refer to the dop itself', { dyalog: 'https://help.dyalog.com/latest/#Language/Defined%20Functions%20and%20Operators/DynamicFunctions/Recursion.htm' }),
		rechyp: s('Recurse Function', 'In a dhyp, refer to the dhyp itself', { nars2000: 'https://wiki.nars2000.org/index.php?title=Anonymous_Functions/Operators/Hyperators#Recursion' }),
		negative: s('Negative', 'Mark a number as negative', { wiki: 'https://aplwiki.com/wiki/High_minus' }),
		inverse: s('Inverse', 'The inverse of a function'),
		eS: s('Exponential Separator', 'Separates the multiplier and exponent of a number'),
		jS: s('Complex Separator', 'Separates the real and imaginary part of a complex number'),
		adS: s('Complex Angle Degrees'),
		ahS: s('Complex Angle Signed Half Unit'),
		arS: s('Complex Angle Radians'),
		auS: s('Complex Angle Unsigned Unit'),
		bS: s('Base Point Notation'),
		gS: s('Gamma Point Notation'),
		pS: s('Pi Point Notation'),
		rS: s('Rational Notation'),
		vS: s('Multiprecision Float'),
		xS: s('Euler Point Notation'),
		zS: s('Zeta Point Notation'),
		ball: s('Ball Arithmetic Notation'),
		ijkS: s('Quaternion Notation'),
		ijklS: s('Octonion Notation'),
		sep: s('Statement Separator'),
		comment: s('Comment', 'Start a comment that ends at the end of the line'),
		char: s('Character Literal', 'Character vector/scalar delimiter'),
		str: s('String Literal', 'Like a character literal, but with escapes'),
		spawn: a('Spawn', 'Run the operand in a green thread', { wiki: 'https://aplwiki.com/wiki/Spawn' }),
		rootNs: r('Root Namespace'),
		parentNs: r('Parent Namespace'),
	},
	glyphs: [
		gl('+', ['conj', D, n2], ['add', C], ['plusId', dz]),
		gl('-', ['neg', C], ['sub', C], ['flipLetterCase', ex, dz]),
		gl('×', ['sign', C], ['dir', D, n2], ['mul', C], ['queryLetterCase', ex, dz], ['setLetterCase', ex]),
		gl('÷', ['rec', C], ['div', C], ['toTitleCase', ex]),
		gl('*', ['exp', C], ['pow', C]),
		gl('√', ['sqrt', ex, vi, dz, n2], ['root', ex, vi, dz, n2]),
		gl('⍟', ['ln', C], ['log', C]),
		gl('⌹', ['mInv', D, n2], ['mDiv', D, n2]),
		gl('○', ['piT', C], ['circ', C]),
		gl('!', ['fact', C], ['binom', C]),
		gl('?', ['roll', C], ['deal', C]),
		gl('|', ['abs', C], ['mag', D, n2], ['mod', C], ['caseFold', ex]),
		gl('⌈', ['ceil', C], ['max', C], ['toUpper', ex, dz]),
		gl('⌊', ['floor', C], ['min', C], ['toLower', ex, dz]),
		gl('⊥', ['decode', C], ['decode2', ex, dz]),
		gl('⊤', ['encode', C], ['encode2', ex, dz], ['type', n2]),
		gl('⊢', ['same', C], ['right', C]),
		gl('⊣', ['same', C], ['left', C]),
		gl('=', ['eq', C], ['isType', ex], ['dimension', n2]),
		gl('≠', ['neq', C], ['nubSieve', dy, vi], ['isNotType', ex], ['norm', n2]),
		gl('≤', ['leq', C], ['isNonneg', ex], ['isInvisible', ex], ['sortAsc', vi]),
		gl('<', ['le', C], ['isPos', ex], ['isControl', ex], ['majorCells', vi], ['sortAsc', dz], ['condense', n2]),
		gl('>', ['ge', C], ['isNeg', ex], ['isVisible', ex], ['join', vi], ['sortDesc', dz], ['dilate', n2]),
		gl('≥', ['geq', C], ['isNonpos', ex], ['isNotControl', ex], ['sortDesc', vi]),
		gl('≡', ['match', C], ['depth', C]),
		gl('≢', ['mismatch', C], ['tally', C]),
		gl('∨', ['or', C], ['gcd', D, dz, n2], ['sortDesc', ex], ['demote', vi], ['gcdM', dz]),
		gl('∧', ['and', C], ['lcm', D, dz, n2], ['sortAsc', ex], ['promote', vi], ['lcmM', dz]),
		gl('⍱', ['nor', C], ['notAnyEqualToType', ex], ['notAll', dz]),
		gl('⍲', ['nand', C], ['notAllEqualToType', ex], ['none', dz]),
		gl('↑', ['mix', D, dz], ['take', C], ['first', n2]),
		gl('↓', ['split', D, dz], ['drop', C]),
		gl('⊂', ['enclose', C], ['penclose', D, dz], ['partition', n2]),
		gl('⊃', ['first', D, dz], ['pick', C], ['mix', n2]),
		gl('⊆', ['nest', D], ['partition', D], ['subset', n2]),
		gl('⊇', ['discloseIfScalar', ex], ['saneIndex', ex, vi, dz], ['last', vi], ['superset', n2]),
		gl('⌷', ['index', C], ['materialize', D], ['mapKV', dz]),
		gl('⍋', ['gradeUp', C], ['gradeUpD', C]),
		gl('⍒', ['gradeDown', C], ['gradeDownD', C]),
		gl('⍳', ['indexGenerator', C], ['indexOf', C]),
		gl('⍸', ['where', C], ['intervalIndex', D], ['arrayLookup', n2]),
		gl('∊', ['elementOf', C], ['enlist', C]),
		gl('⍷', ['find', C], ['type', ex, vi]),
		gl('∪', ['union', C], ['nub', C]),
		gl('∩', ['intersection', C], ['nubIn', ex]),
		gl('~', ['not', C], ['without', C], ['m1', ex]),
		gl('§', ['symDiff', n2]),
		gl('/', ['reduce', D, dz, n2], ['wreduce', D, dz, n2], ['replicate', D, n2]),
		gl('⌿', ['reduceF', D, n2], ['wreduceF', D, n2], ['replicateF', D, dz, n2]),
		gl('\\', ['scan', C], ['expand', C], ['outerProduct', ex]),
		gl('⍀', ['scanF', C], ['expandF', C], ['applyRight', ex]),
		gl(',', ['ravel', C], ['cat', C]),
		gl('⍪', ['table', C], ['catF', C]),
		gl('⍴', ['shape', C], ['reshape', C]),
		gl('⌽', ['reverse', C], ['rotate', C]),
		gl('⊖', ['reverseF', C], ['rotateF', C]),
		gl('⍉', ['transpose', C], ['transposeD', C]),
		gl('¨', ['each', C]),
		gl('⍨', ['constant', D, dz], ['commute', D, dz, n2]),
		gl('⍣', ['repeat', C]),
		gl('⍡', ['cumulativeRepeat', dz], ['convolution', n2]),
		gl('.', ['innerProduct', C], ['alternant', n2]),
		gl('∙', ['innerProduct', ex], ['alternant', ex]),
		gl('∘.', ['outerProduct', C]),
		gl('∘', ['after', C], ['bind', C]),
		gl('⍛', ['before', ex, vi, dz]),
		gl('⍤', ['atop', C], ['atRank', D, n2]),
		gl('⍥', ['over', C], ['atDepth', ex, vi]),
		gl('⍢', ['under', ex, vi, dz]),
		gl('ᐵ', ['eachLeft', dz]),
		gl('ᑈ', ['eachRight', dz]),
		gl('@', ['at', D, dz]),
		gl('⍫', ['obverse', ex, vi, dz]),
		gl('⎕', ['evalInput', C], ['stdout', C], ['sys', C]),
		gl('⍞', ['stringInput', C], ['stderr', C]),
		gl('⍠', ['variant', D, n2]),
		gl('⌸', ['keyI', D, dz], ['keyV', D, dz], ['keyVocI', vi], ['keyVocV', vi], ['getMap', dz], ['setMap', dz]),
		gl('⍁', ['diagonals', dz]),
		gl('⌺', ['stencil', D]),
		gl('⌶', ['beam', D]),
		gl('⍎', ['execute', C]),
		gl('⍕', ['format', C], ['dformat', D, n2]),
		gl('⍬', ['zilde', C]),
		gl('⌂', ['dfns', ex]),
		gl('∞', ['inf', ex, dz, n2]),
		gl('¯∞', ['ninf', ex, dz, n2]),
		gl('∅', ['nan', n2]),
		gl('#', ['rootNs', D]),
		gl('##', ['parentNs', D]),
		gl('⌾', ['cartD', ex], ['cartM', ex], ['outerProduct', dz]),
		gl('$', ['stringEnhancement', ex, vi]),
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
		gl('&', ['spawn', D]),
		gl('{}', ['dfn', D, dz, n2], ['dop', D, dz, n2], ['dhyp', n2]),
		gl('⍺', ['larg', D, dz, n2]),
		gl('⍵', ['rarg', D, dz, n2]),
		gl('⍺⍺', ['lop', D, n2]),
		gl('⍶', ['lop', dz]),
		gl('⍵⍵', ['rop', D, n2]),
		gl('⍹', ['rop', dz]),
		gl('⍺⍺⍺', ['lhyp', n2]),
		gl('⍵⍵⍵', ['rhyp', n2]),
		gl('χ', ['axisArg', n2]),
		gl(':', ['guard', D, dz, n2], ['control', D, n2], ['label', D]),
		gl('::', ['errorGuard', D]),
		gl('[]', ['bindex', C], ['axis', D, n2]),
		gl(';', ['semi', C]),
		gl('←', ['assign', C], ['return', dz], ['sink', n2]),
		gl('→', ['branch', D, n2]),
		gl('∇', ['tradfn', D, n2], ['recfn', D, dz, n2]),
		gl('∇∇', ['recop', D, n2]),
		gl('∇∇∇', ['rechyp', n2]),
		gl('¯', ['negative', C], ['inverse', ex]),
		gl('E', ['eS', D, dz, n2]),
		gl('e', ['eS', D, dz, n2]),
		gl('J', ['jS', D, n2]),
		gl('j', ['jS', D]),
		gl('i', ['jS', n2]),
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
		gl('⋄', ['sep', C]),
		gl('⍝', ['comment', C]),
		gl('\'', ['char', C]),
		gl('"', ['str', dz]),
	],
}

export default glyphs;