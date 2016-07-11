
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(rootX, rootY)
{
	var stack = [{ x: rootX, y: rootY }];
	while (stack.length > 0)
	{
		var front = stack.pop();
		var x = front.x;
		var y = front.y;
		if (x === y)
		{
			continue;
		}
		if (typeof x === 'object')
		{
			var c = 0;
			for (var key in x)
			{
				++c;
				if (!(key in y))
				{
					return false;
				}
				if (key === 'ctor')
				{
					continue;
				}
				stack.push({ x: x[key], y: y[key] });
			}
			if ('ctor' in x)
			{
				stack.push({ x: x.ctor, y: y.ctor});
			}
			if (c !== Object.keys(y).length)
			{
				return false;
			}
		}
		else if (typeof x === 'function')
		{
			throw new Error('Equality error: general function equality is ' +
							'undecidable, and therefore, unsupported');
		}
		else
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	var ord;
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}
	else if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b
			? EQ
			: a < b
				? LT
				: GT;
	}
	else if (x.ctor === '::' || x.ctor === '[]')
	{
		while (true)
		{
			if (x.ctor === '[]' && y.ctor === '[]')
			{
				return EQ;
			}
			if (x.ctor !== y.ctor)
			{
				return x.ctor === '[]' ? LT : GT;
			}
			ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
	}
	else if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}
	else
	{
		throw new Error('Comparison error: comparison is only defined on ints, ' +
						'floats, times, chars, strings, lists of comparable values, ' +
						'and tuples of comparable values.');
	}
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};
	for (var key in oldRecord)
	{
		var value = (key in updatedFields) ? updatedFields[key] : oldRecord[key];
		newRecord[key] = value;
	}
	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		var name = v.func ? v.func.name : v.name;
		return '<function' + (name === '' ? '' : ':') + name + '>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin' || v.ctor === 'Set_elm_builtin')
		{
			var name, list;
			if (v.ctor === 'Set_elm_builtin')
			{
				name = 'Set';
				list = A2(
					_elm_lang$core$List$map,
					function(x) {return x._0; },
					_elm_lang$core$Dict$toList(v._0)
				);
			}
			else
			{
				name = 'Dict';
				list = _elm_lang$core$Dict$toList(v);
			}
			return name + '.fromList ' + toString(list);
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p0) {
		var _p1 = _p0;
		return A2(f, _p1._0, _p1._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$snd = function (_p2) {
	var _p3 = _p2;
	return _p3._1;
};
var _elm_lang$core$Basics$fst = function (_p4) {
	var _p5 = _p4;
	return _p5._0;
};
var _elm_lang$core$Basics$always = F2(
	function (a, _p6) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$Never = function (a) {
	return {ctor: 'Never', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$oneOf = function (maybes) {
	oneOf:
	while (true) {
		var _p1 = maybes;
		if (_p1.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p3 = _p1._0;
			var _p2 = _p3;
			if (_p2.ctor === 'Nothing') {
				var _v3 = _p1._1;
				maybes = _v3;
				continue oneOf;
			} else {
				return _p3;
			}
		}
	}
};
var _elm_lang$core$Maybe$andThen = F2(
	function (maybeValue, callback) {
		var _p4 = maybeValue;
		if (_p4.ctor === 'Just') {
			return callback(_p4._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p5 = maybe;
		if (_p5.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p5._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p6 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p6.ctor === '_Tuple2') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p6._0._0, _p6._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p7 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p7.ctor === '_Tuple3') && (_p7._0.ctor === 'Just')) && (_p7._1.ctor === 'Just')) && (_p7._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p7._0._0, _p7._1._0, _p7._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p8 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p8.ctor === '_Tuple4') && (_p8._0.ctor === 'Just')) && (_p8._1.ctor === 'Just')) && (_p8._2.ctor === 'Just')) && (_p8._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p8._0._0, _p8._1._0, _p8._2._0, _p8._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p9 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p9.ctor === '_Tuple5') && (_p9._0.ctor === 'Just')) && (_p9._1.ctor === 'Just')) && (_p9._2.ctor === 'Just')) && (_p9._3.ctor === 'Just')) && (_p9._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p9._0._0, _p9._1._0, _p9._2._0, _p9._3._0, _p9._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}


function range(lo, hi)
{
	var list = Nil;
	if (lo <= hi)
	{
		do
		{
			list = Cons(hi, list);
		}
		while (hi-- > lo);
	}
	return list;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,
	range: range,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return _elm_lang$core$Basics$not(
			A2(
				_elm_lang$core$List$any,
				function (_p2) {
					return _elm_lang$core$Basics$not(
						isOkay(_p2));
				},
				list));
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			_elm_lang$core$Native_List.range(
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						_elm_lang$core$List_ops['::'],
						f(x),
						acc);
				}),
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (x, xs$) {
				return pred(x) ? A2(_elm_lang$core$List_ops['::'], x, xs$) : xs$;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return A2(_elm_lang$core$List_ops['::'], _p10._0, xs);
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			_elm_lang$core$Native_List.fromArray(
				[]),
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$List_ops['::'], x, y);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return A2(
						_elm_lang$core$List_ops['::'],
						A2(f, x, _p11._0),
						accAcc);
				} else {
					return _elm_lang$core$Native_List.fromArray(
						[]);
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				_elm_lang$core$Native_List.fromArray(
					[b]),
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return A2(_elm_lang$core$List_ops['::'], x, y);
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		_elm_lang$core$Native_List.fromArray(
			[]),
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$List_ops['::'], x, _p16),
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: A2(_elm_lang$core$List_ops['::'], x, _p15)
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: _elm_lang$core$Native_List.fromArray(
					[])
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: A2(_elm_lang$core$List_ops['::'], _p19._0, _p20._0),
				_1: A2(_elm_lang$core$List_ops['::'], _p19._1, _p20._1)
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: _elm_lang$core$Native_List.fromArray(
				[])
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var step = F2(
				function (x, rest) {
					return A2(
						_elm_lang$core$List_ops['::'],
						sep,
						A2(_elm_lang$core$List_ops['::'], x, rest));
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_p21._1);
			return A2(_elm_lang$core$List_ops['::'], _p21._0, spersed);
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var _p22 = list;
			if (_p22.ctor === '[]') {
				return list;
			} else {
				return A2(
					_elm_lang$core$List_ops['::'],
					_p22._0,
					A2(_elm_lang$core$List$take, n - 1, _p22._1));
			}
		}
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v23 = A2(_elm_lang$core$List_ops['::'], value, result),
					_v24 = n - 1,
					_v25 = value;
				result = _v23;
				n = _v24;
				value = _v25;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			_elm_lang$core$Native_List.fromArray(
				[]),
			n,
			value);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (result, callback) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$formatError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function addPublicModule(object, name, main)
{
	var init = main ? makeEmbed(name, main) : mainIsUndefined(name);

	object['worker'] = function worker(flags)
	{
		return init(undefined, flags, false);
	}

	object['embed'] = function embed(domNode, flags)
	{
		return init(domNode, flags, true);
	}

	object['fullscreen'] = function fullscreen(flags)
	{
		return init(document.body, flags, true);
	};
}


// PROGRAM FAIL

function mainIsUndefined(name)
{
	return function(domNode)
	{
		var message = 'Cannot initialize module `' + name +
			'` because it has no `main` value!\nWhat should I show on screen?';
		domNode.innerHTML = errorHtml(message);
		throw new Error(message);
	};
}

function errorHtml(message)
{
	return '<div style="padding-left:1em;">'
		+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
		+ '<pre style="padding-left:1em;">' + message + '</pre>'
		+ '</div>';
}


// PROGRAM SUCCESS

function makeEmbed(moduleName, main)
{
	return function embed(rootDomNode, flags, withRenderer)
	{
		try
		{
			var program = mainToProgram(moduleName, main);
			if (!withRenderer)
			{
				program.renderer = dummyRenderer;
			}
			return makeEmbedHelp(moduleName, program, rootDomNode, flags);
		}
		catch (e)
		{
			rootDomNode.innerHTML = errorHtml(e.message);
			throw e;
		}
	};
}

function dummyRenderer()
{
	return { update: function() {} };
}


// MAIN TO PROGRAM

function mainToProgram(moduleName, wrappedMain)
{
	var main = wrappedMain.main;

	if (typeof main.init === 'undefined')
	{
		var emptyBag = batch(_elm_lang$core$Native_List.Nil);
		var noChange = _elm_lang$core$Native_Utils.Tuple2(
			_elm_lang$core$Native_Utils.Tuple0,
			emptyBag
		);

		return _elm_lang$virtual_dom$VirtualDom$programWithFlags({
			init: function() { return noChange; },
			view: function() { return main; },
			update: F2(function() { return noChange; }),
			subscriptions: function () { return emptyBag; }
		});
	}

	var flags = wrappedMain.flags;
	var init = flags
		? initWithFlags(moduleName, main.init, flags)
		: initWithoutFlags(moduleName, main.init);

	return _elm_lang$virtual_dom$VirtualDom$programWithFlags({
		init: init,
		view: main.view,
		update: main.update,
		subscriptions: main.subscriptions,
	});
}

function initWithoutFlags(moduleName, realInit)
{
	return function init(flags)
	{
		if (typeof flags !== 'undefined')
		{
			throw new Error(
				'You are giving module `' + moduleName + '` an argument in JavaScript.\n'
				+ 'This module does not take arguments though! You probably need to change the\n'
				+ 'initialization code to something like `Elm.' + moduleName + '.fullscreen()`'
			);
		}
		return realInit();
	};
}

function initWithFlags(moduleName, realInit, flagDecoder)
{
	return function init(flags)
	{
		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Err')
		{
			throw new Error(
				'You are trying to initialize module `' + moduleName + '` with an unexpected argument.\n'
				+ 'When trying to convert it to a usable Elm value, I run into this problem:\n\n'
				+ result._0
			);
		}
		return realInit(result._0);
	};
}


// SETUP RUNTIME SYSTEM

function makeEmbedHelp(moduleName, program, rootDomNode, flags)
{
	var init = program.init;
	var update = program.update;
	var subscriptions = program.subscriptions;
	var view = program.view;
	var makeRenderer = program.renderer;

	// ambient state
	var managers = {};
	var renderer;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var results = init(flags);
		var model = results._0;
		renderer = makeRenderer(rootDomNode, enqueue, view(model));
		var cmds = results._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			renderer.update(view(model));
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, handleMsg, loop);
	}

	var task = A2(andThen, init, loop);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			var value = converter(cmdList._0);
			for (var i = 0; i < subs.length; i++)
			{
				subs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function send(value)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, value);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		var value = result._0;
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	mainToProgram: mainToProgram,
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,
	addPublicModule: addPublicModule,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(task, callback)
{
	return {
		ctor: '_Task_andThen',
		task: task,
		callback: callback
	};
}

function onError(task, callback)
{
	return {
		ctor: '_Task_onError',
		task: task,
		callback: callback
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		numSteps = step(numSteps, process);
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	_elm_lang$core$Native_List.fromArray(
		[]));
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	_elm_lang$core$Native_List.fromArray(
		[]));
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$lazy$Native_Lazy = function() {

function memoize(thunk)
{
    var value;
    var isForced = false;
    return function(tuple0) {
        if (!isForced) {
            value = thunk(tuple0);
            isForced = true;
        }
        return value;
    };
}

return {
    memoize: memoize
};

}();

var _elm_lang$lazy$Lazy$force = function (_p0) {
	var _p1 = _p0;
	return _p1._0(
		{ctor: '_Tuple0'});
};
var _elm_lang$lazy$Lazy$Lazy = function (a) {
	return {ctor: 'Lazy', _0: a};
};
var _elm_lang$lazy$Lazy$lazy = function (thunk) {
	return _elm_lang$lazy$Lazy$Lazy(
		_elm_lang$lazy$Native_Lazy.memoize(thunk));
};
var _elm_lang$lazy$Lazy$map = F2(
	function (f, a) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p2) {
				var _p3 = _p2;
				return f(
					_elm_lang$lazy$Lazy$force(a));
			});
	});
var _elm_lang$lazy$Lazy$map2 = F3(
	function (f, a, b) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p4) {
				var _p5 = _p4;
				return A2(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b));
			});
	});
var _elm_lang$lazy$Lazy$map3 = F4(
	function (f, a, b, c) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p6) {
				var _p7 = _p6;
				return A3(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c));
			});
	});
var _elm_lang$lazy$Lazy$map4 = F5(
	function (f, a, b, c, d) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p8) {
				var _p9 = _p8;
				return A4(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d));
			});
	});
var _elm_lang$lazy$Lazy$map5 = F6(
	function (f, a, b, c, d, e) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p10) {
				var _p11 = _p10;
				return A5(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d),
					_elm_lang$lazy$Lazy$force(e));
			});
	});
var _elm_lang$lazy$Lazy$apply = F2(
	function (f, x) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p12) {
				var _p13 = _p12;
				return A2(
					_elm_lang$lazy$Lazy$force,
					f,
					_elm_lang$lazy$Lazy$force(x));
			});
	});
var _elm_lang$lazy$Lazy$andThen = F2(
	function (a, callback) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p14) {
				var _p15 = _p14;
				return _elm_lang$lazy$Lazy$force(
					callback(
						_elm_lang$lazy$Lazy$force(a)));
			});
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;
	var i = 0;
	var is = [];
	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}
	return _elm_lang$core$Native_List.fromArray(is);
}

function toInt(s)
{
	var len = s.length;
	if (len === 0)
	{
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
	}
	var start = 0;
	if (s[0] === '-')
	{
		if (len === 1)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
		}
		start = 1;
	}
	for (var i = start; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int" );
		}
	}
	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function toFloat(s)
{
	var len = s.length;
	if (len === 0)
	{
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
	}
	var start = 0;
	if (s[0] === '-')
	{
		if (len === 1)
		{
			return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
		}
		start = 1;
	}
	var dotCount = 0;
	for (var i = start; i < len; ++i)
	{
		var c = s[i];
		if ('0' <= c && c <= '9')
		{
			continue;
		}
		if (c === '.')
		{
			dotCount += 1;
			if (dotCount <= 1)
			{
				continue;
			}
		}
		return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float" );
	}
	return _elm_lang$core$Result$Ok(parseFloat(s));
}

function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[i - 1],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _Bogdanp$elm_combine$Combine$app = function (p) {
	var _p0 = p;
	if (_p0.ctor === 'Parser') {
		return _p0._0;
	} else {
		return _elm_lang$lazy$Lazy$force(_p0._0);
	}
};
var _Bogdanp$elm_combine$Combine$parse = F2(
	function (p, input) {
		return A2(
			_Bogdanp$elm_combine$Combine$app,
			p,
			{input: input, position: 0});
	});
var _Bogdanp$elm_combine$Combine$Context = F2(
	function (a, b) {
		return {input: a, position: b};
	});
var _Bogdanp$elm_combine$Combine$RecursiveParser = function (a) {
	return {ctor: 'RecursiveParser', _0: a};
};
var _Bogdanp$elm_combine$Combine$rec = function (t) {
	return _Bogdanp$elm_combine$Combine$RecursiveParser(
		_elm_lang$lazy$Lazy$lazy(
			function (_p1) {
				var _p2 = _p1;
				return _Bogdanp$elm_combine$Combine$app(
					t(
						{ctor: '_Tuple0'}));
			}));
};
var _Bogdanp$elm_combine$Combine$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _Bogdanp$elm_combine$Combine$primitive = _Bogdanp$elm_combine$Combine$Parser;
var _Bogdanp$elm_combine$Combine$bimap = F3(
	function (fok, ferr, p) {
		return _Bogdanp$elm_combine$Combine$Parser(
			function (cx) {
				var _p3 = A2(_Bogdanp$elm_combine$Combine$app, p, cx);
				if (_p3._0.ctor === 'Ok') {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Result$Ok(
							fok(_p3._0._0)),
						_1: _p3._1
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Result$Err(
							ferr(_p3._0._0)),
						_1: _p3._1
					};
				}
			});
	});
var _Bogdanp$elm_combine$Combine$map = F2(
	function (f, p) {
		return A3(_Bogdanp$elm_combine$Combine$bimap, f, _elm_lang$core$Basics$identity, p);
	});
var _Bogdanp$elm_combine$Combine$mapError = _Bogdanp$elm_combine$Combine$bimap(_elm_lang$core$Basics$identity);
var _Bogdanp$elm_combine$Combine$andThen = F2(
	function (p, f) {
		return _Bogdanp$elm_combine$Combine$Parser(
			function (cx) {
				var _p4 = A2(_Bogdanp$elm_combine$Combine$app, p, cx);
				if (_p4._0.ctor === 'Ok') {
					return A2(
						_Bogdanp$elm_combine$Combine$app,
						f(_p4._0._0),
						_p4._1);
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Result$Err(_p4._0._0),
						_1: _p4._1
					};
				}
			});
	});
var _Bogdanp$elm_combine$Combine$sequence = function (ps) {
	var accumulate = F3(
		function (acc, ps, cx) {
			accumulate:
			while (true) {
				var _p5 = ps;
				if (_p5.ctor === '[]') {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Result$Ok(
							_elm_lang$core$List$reverse(acc)),
						_1: cx
					};
				} else {
					var _p6 = A2(_Bogdanp$elm_combine$Combine$app, _p5._0, cx);
					if (_p6._0.ctor === 'Ok') {
						var _v6 = A2(_elm_lang$core$List_ops['::'], _p6._0._0, acc),
							_v7 = _p5._1,
							_v8 = _p6._1;
						acc = _v6;
						ps = _v7;
						cx = _v8;
						continue accumulate;
					} else {
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Result$Err(_p6._0._0),
							_1: _p6._1
						};
					}
				}
			}
		});
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			return A3(
				accumulate,
				_elm_lang$core$Native_List.fromArray(
					[]),
				ps,
				cx);
		});
};
var _Bogdanp$elm_combine$Combine$fail = function (ms) {
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Result$Err(ms),
				_1: cx
			};
		});
};
var _Bogdanp$elm_combine$Combine$succeed = function (r) {
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Result$Ok(r),
				_1: cx
			};
		});
};
var _Bogdanp$elm_combine$Combine$andMap = F2(
	function (lp, rp) {
		return A2(
			_Bogdanp$elm_combine$Combine$andThen,
			lp,
			function (f) {
				return A2(
					_Bogdanp$elm_combine$Combine$andThen,
					rp,
					function (x) {
						return _Bogdanp$elm_combine$Combine$succeed(
							f(x));
					});
			});
	});
var _Bogdanp$elm_combine$Combine$between = F3(
	function (lp, rp, p) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(
				_Bogdanp$elm_combine$Combine$andMap,
				A2(
					_Bogdanp$elm_combine$Combine$map,
					_elm_lang$core$Basics$flip(
						function (_p7) {
							return _elm_lang$core$Basics$always(
								_elm_lang$core$Basics$always(_p7));
						}),
					lp),
				p),
			rp);
	});
var _Bogdanp$elm_combine$Combine$skip = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine$andThen,
		p,
		_elm_lang$core$Basics$always(
			_Bogdanp$elm_combine$Combine$succeed(
				{ctor: '_Tuple0'})));
};
var _Bogdanp$elm_combine$Combine$count = F2(
	function (n, p) {
		var accumulate = F2(
			function (x, acc) {
				return (_elm_lang$core$Native_Utils.cmp(x, 0) < 1) ? _Bogdanp$elm_combine$Combine$succeed(
					_elm_lang$core$List$reverse(acc)) : A2(
					_Bogdanp$elm_combine$Combine$andThen,
					p,
					function (res) {
						return A2(
							accumulate,
							x - 1,
							A2(_elm_lang$core$List_ops['::'], res, acc));
					});
			});
		return A2(
			accumulate,
			n,
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _Bogdanp$elm_combine$Combine$string = function (s) {
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			if (A2(_elm_lang$core$String$startsWith, s, cx.input)) {
				var len = _elm_lang$core$String$length(s);
				var rem = A2(_elm_lang$core$String$dropLeft, len, cx.input);
				var pos = cx.position + len;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Ok(s),
					_1: _elm_lang$core$Native_Utils.update(
						cx,
						{input: rem, position: pos})
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Err(
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$core$Basics_ops['++'],
								'expected ',
								_elm_lang$core$Basics$toString(s))
							])),
					_1: cx
				};
			}
		});
};
var _Bogdanp$elm_combine$Combine$parens = A2(
	_Bogdanp$elm_combine$Combine$between,
	_Bogdanp$elm_combine$Combine$string('('),
	_Bogdanp$elm_combine$Combine$string(')'));
var _Bogdanp$elm_combine$Combine$braces = A2(
	_Bogdanp$elm_combine$Combine$between,
	_Bogdanp$elm_combine$Combine$string('{'),
	_Bogdanp$elm_combine$Combine$string('}'));
var _Bogdanp$elm_combine$Combine$brackets = A2(
	_Bogdanp$elm_combine$Combine$between,
	_Bogdanp$elm_combine$Combine$string('['),
	_Bogdanp$elm_combine$Combine$string(']'));
var _Bogdanp$elm_combine$Combine$regex = function (pattern) {
	var pattern$ = A2(_elm_lang$core$String$startsWith, '^', pattern) ? pattern : A2(_elm_lang$core$Basics_ops['++'], '^', pattern);
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			var _p8 = A3(
				_elm_lang$core$Regex$find,
				_elm_lang$core$Regex$AtMost(1),
				_elm_lang$core$Regex$regex(pattern$),
				cx.input);
			if ((_p8.ctor === '::') && (_p8._1.ctor === '[]')) {
				var _p9 = _p8._0;
				var len = _elm_lang$core$String$length(_p9.match);
				var rem = A2(_elm_lang$core$String$dropLeft, len, cx.input);
				var pos = cx.position + len;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Ok(_p9.match),
					_1: _elm_lang$core$Native_Utils.update(
						cx,
						{input: rem, position: pos})
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Err(
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$core$Basics_ops['++'],
								'expected input matching Regexp /',
								A2(_elm_lang$core$Basics_ops['++'], pattern$, '/'))
							])),
					_1: cx
				};
			}
		});
};
var _Bogdanp$elm_combine$Combine$while = function (pred) {
	var accumulate = F2(
		function (acc, cx) {
			accumulate:
			while (true) {
				var _p10 = _elm_lang$core$String$uncons(cx.input);
				if (_p10.ctor === 'Just') {
					var _p11 = _p10._0._0;
					if (pred(_p11)) {
						var pos = cx.position + 1;
						var c = A2(_elm_lang$core$String$cons, _p11, '');
						var _v11 = A2(_elm_lang$core$Basics_ops['++'], acc, c),
							_v12 = _elm_lang$core$Native_Utils.update(
							cx,
							{input: _p10._0._1, position: pos});
						acc = _v11;
						cx = _v12;
						continue accumulate;
					} else {
						return {ctor: '_Tuple2', _0: acc, _1: cx};
					}
				} else {
					return {ctor: '_Tuple2', _0: acc, _1: cx};
				}
			}
		});
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			var _p12 = A2(accumulate, '', cx);
			var res = _p12._0;
			var cx$ = _p12._1;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Result$Ok(res),
				_1: cx$
			};
		});
};
var _Bogdanp$elm_combine$Combine$end = _Bogdanp$elm_combine$Combine$Parser(
	function (cx) {
		return _elm_lang$core$Native_Utils.eq(cx.input, '') ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Result$Ok(
				{ctor: '_Tuple0'}),
			_1: cx
		} : {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Result$Err(
				_elm_lang$core$Native_List.fromArray(
					['expected end of input'])),
			_1: cx
		};
	});
var _Bogdanp$elm_combine$Combine$or = F2(
	function (lp, rp) {
		return _Bogdanp$elm_combine$Combine$Parser(
			function (cx) {
				var res = A2(_Bogdanp$elm_combine$Combine$app, lp, cx);
				var _p13 = res;
				if (_p13._0.ctor === 'Ok') {
					return res;
				} else {
					var res$ = A2(_Bogdanp$elm_combine$Combine$app, rp, cx);
					var _p14 = res$;
					if (_p14._0.ctor === 'Ok') {
						return res$;
					} else {
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Result$Err(
								A2(_elm_lang$core$Basics_ops['++'], _p13._0._0, _p14._0._0)),
							_1: cx
						};
					}
				}
			});
	});
var _Bogdanp$elm_combine$Combine$choice = function (xs) {
	return A3(
		_elm_lang$core$List$foldr,
		_Bogdanp$elm_combine$Combine$or,
		_Bogdanp$elm_combine$Combine$fail(
			_elm_lang$core$Native_List.fromArray(
				[])),
		xs);
};
var _Bogdanp$elm_combine$Combine$optional = F2(
	function (res, p) {
		return A2(
			_Bogdanp$elm_combine$Combine$or,
			p,
			_Bogdanp$elm_combine$Combine$succeed(res));
	});
var _Bogdanp$elm_combine$Combine$chainl = F2(
	function (p, op) {
		var accumulate = function (x) {
			return A2(
				_Bogdanp$elm_combine$Combine$or,
				A2(
					_Bogdanp$elm_combine$Combine$andThen,
					op,
					function (f) {
						return A2(
							_Bogdanp$elm_combine$Combine$andThen,
							p,
							function (y) {
								return accumulate(
									A2(f, x, y));
							});
					}),
				_Bogdanp$elm_combine$Combine$succeed(x));
		};
		return A2(_Bogdanp$elm_combine$Combine$andThen, p, accumulate);
	});
var _Bogdanp$elm_combine$Combine$chainr = F2(
	function (p, op) {
		var accumulate = function (x) {
			return A2(
				_Bogdanp$elm_combine$Combine$or,
				A2(
					_Bogdanp$elm_combine$Combine$andThen,
					op,
					function (f) {
						return A2(
							_Bogdanp$elm_combine$Combine$andThen,
							A2(_Bogdanp$elm_combine$Combine$andThen, p, accumulate),
							function (y) {
								return _Bogdanp$elm_combine$Combine$succeed(
									A2(f, x, y));
							});
					}),
				_Bogdanp$elm_combine$Combine$succeed(x));
		};
		return A2(_Bogdanp$elm_combine$Combine$andThen, p, accumulate);
	});
var _Bogdanp$elm_combine$Combine$maybe = function (p) {
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			var _p15 = A2(_Bogdanp$elm_combine$Combine$app, p, cx);
			if ((_p15.ctor === '_Tuple2') && (_p15._0.ctor === 'Ok')) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Ok(
						_elm_lang$core$Maybe$Just(_p15._0._0)),
					_1: _p15._1
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Ok(_elm_lang$core$Maybe$Nothing),
					_1: cx
				};
			}
		});
};
var _Bogdanp$elm_combine$Combine$many = function (p) {
	var accumulate = F2(
		function (acc, cx) {
			accumulate:
			while (true) {
				var _p16 = A2(_Bogdanp$elm_combine$Combine$app, p, cx);
				if ((_p16.ctor === '_Tuple2') && (_p16._0.ctor === 'Ok')) {
					var _p17 = _p16._1;
					if (_elm_lang$core$Native_Utils.eq(cx, _p17)) {
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$List$reverse(acc),
							_1: cx
						};
					} else {
						var _v17 = A2(_elm_lang$core$List_ops['::'], _p16._0._0, acc),
							_v18 = _p17;
						acc = _v17;
						cx = _v18;
						continue accumulate;
					}
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$List$reverse(acc),
						_1: cx
					};
				}
			}
		});
	return _Bogdanp$elm_combine$Combine$Parser(
		function (cx) {
			var _p18 = A2(
				accumulate,
				_elm_lang$core$Native_List.fromArray(
					[]),
				cx);
			var res = _p18._0;
			var cx$ = _p18._1;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Result$Ok(res),
				_1: cx$
			};
		});
};
var _Bogdanp$elm_combine$Combine$many1 = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine$andMap,
		A2(
			_Bogdanp$elm_combine$Combine$map,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$List_ops['::'], x, y);
				}),
			p),
		_Bogdanp$elm_combine$Combine$many(p));
};
var _Bogdanp$elm_combine$Combine$skipMany1 = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine$andThen,
		_Bogdanp$elm_combine$Combine$many1(
			_Bogdanp$elm_combine$Combine$skip(p)),
		_elm_lang$core$Basics$always(
			_Bogdanp$elm_combine$Combine$succeed(
				{ctor: '_Tuple0'})));
};
var _Bogdanp$elm_combine$Combine$sepBy1 = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(
				_Bogdanp$elm_combine$Combine$map,
				F2(
					function (x, y) {
						return A2(_elm_lang$core$List_ops['::'], x, y);
					}),
				p),
			_Bogdanp$elm_combine$Combine$many(
				A2(
					_Bogdanp$elm_combine$Combine$andMap,
					A2(
						_Bogdanp$elm_combine$Combine$map,
						_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always),
						sep),
					p)));
	});
var _Bogdanp$elm_combine$Combine$sepBy = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine$or,
			A2(_Bogdanp$elm_combine$Combine$sepBy1, sep, p),
			_Bogdanp$elm_combine$Combine$succeed(
				_elm_lang$core$Native_List.fromArray(
					[])));
	});
var _Bogdanp$elm_combine$Combine$sepEndBy1 = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(
				_Bogdanp$elm_combine$Combine$map,
				_elm_lang$core$Basics$always,
				A2(_Bogdanp$elm_combine$Combine$sepBy1, sep, p)),
			_Bogdanp$elm_combine$Combine$maybe(sep));
	});
var _Bogdanp$elm_combine$Combine$sepEndBy = F2(
	function (sep, p) {
		return A2(
			_Bogdanp$elm_combine$Combine$or,
			A2(_Bogdanp$elm_combine$Combine$sepEndBy1, sep, p),
			_Bogdanp$elm_combine$Combine$succeed(
				_elm_lang$core$Native_List.fromArray(
					[])));
	});
var _Bogdanp$elm_combine$Combine$skipMany = function (p) {
	return A2(
		_Bogdanp$elm_combine$Combine$andThen,
		_Bogdanp$elm_combine$Combine$many(
			_Bogdanp$elm_combine$Combine$skip(p)),
		_elm_lang$core$Basics$always(
			_Bogdanp$elm_combine$Combine$succeed(
				{ctor: '_Tuple0'})));
};
var _Bogdanp$elm_combine$Combine$manyTill = F2(
	function (p, end) {
		var accumulate = F2(
			function (acc, cx) {
				accumulate:
				while (true) {
					var _p19 = A2(_Bogdanp$elm_combine$Combine$app, end, cx);
					if (_p19._0.ctor === 'Ok') {
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Result$Ok(
								_elm_lang$core$List$reverse(acc)),
							_1: _p19._1
						};
					} else {
						var _p20 = A2(_Bogdanp$elm_combine$Combine$app, p, cx);
						if ((_p20.ctor === '_Tuple2') && (_p20._0.ctor === 'Ok')) {
							var _v21 = A2(_elm_lang$core$List_ops['::'], _p20._0._0, acc),
								_v22 = _p20._1;
							acc = _v21;
							cx = _v22;
							continue accumulate;
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Result$Err(_p19._0._0),
								_1: _p19._1
							};
						}
					}
				}
			});
		return _Bogdanp$elm_combine$Combine$Parser(
			accumulate(
				_elm_lang$core$Native_List.fromArray(
					[])));
	});

var _Bogdanp$elm_combine$Combine_Infix_ops = _Bogdanp$elm_combine$Combine_Infix_ops || {};
_Bogdanp$elm_combine$Combine_Infix_ops['<|>'] = _Bogdanp$elm_combine$Combine$or;
var _Bogdanp$elm_combine$Combine_Infix_ops = _Bogdanp$elm_combine$Combine_Infix_ops || {};
_Bogdanp$elm_combine$Combine_Infix_ops['*>'] = F2(
	function (lp, rp) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(
				_Bogdanp$elm_combine$Combine$map,
				_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always),
				lp),
			rp);
	});
var _Bogdanp$elm_combine$Combine_Infix_ops = _Bogdanp$elm_combine$Combine_Infix_ops || {};
_Bogdanp$elm_combine$Combine_Infix_ops['<*'] = F2(
	function (lp, rp) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(_Bogdanp$elm_combine$Combine$map, _elm_lang$core$Basics$always, lp),
			rp);
	});
var _Bogdanp$elm_combine$Combine_Infix_ops = _Bogdanp$elm_combine$Combine_Infix_ops || {};
_Bogdanp$elm_combine$Combine_Infix_ops['<?>'] = F2(
	function (p, m) {
		return A2(
			_Bogdanp$elm_combine$Combine$mapError,
			function (_p0) {
				return _elm_lang$core$Native_List.fromArray(
					[m]);
			},
			p);
	});
var _Bogdanp$elm_combine$Combine_Infix_ops = _Bogdanp$elm_combine$Combine_Infix_ops || {};
_Bogdanp$elm_combine$Combine_Infix_ops['<$'] = function (res) {
	return _Bogdanp$elm_combine$Combine$map(
		function (_p1) {
			return res;
		});
};
var _Bogdanp$elm_combine$Combine_Infix_ops = _Bogdanp$elm_combine$Combine_Infix_ops || {};
_Bogdanp$elm_combine$Combine_Infix_ops['<*>'] = _Bogdanp$elm_combine$Combine$andMap;
var _Bogdanp$elm_combine$Combine_Infix_ops = _Bogdanp$elm_combine$Combine_Infix_ops || {};
_Bogdanp$elm_combine$Combine_Infix_ops['<$>'] = _Bogdanp$elm_combine$Combine$map;

var _Bogdanp$elm_combine$Combine_Char$crlf = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	A2(
		_Bogdanp$elm_combine$Combine_Infix_ops['<$'],
		_elm_lang$core$Native_Utils.chr('\n'),
		_Bogdanp$elm_combine$Combine$regex('\r\n')),
	'expected crlf');
var _Bogdanp$elm_combine$Combine_Char$satisfy = function (pred) {
	return _Bogdanp$elm_combine$Combine$primitive(
		function (cx) {
			var message = 'could not satisfy predicate';
			var _p0 = _elm_lang$core$String$uncons(cx.input);
			if (_p0.ctor === 'Just') {
				var _p1 = _p0._0._0;
				return pred(_p1) ? {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Ok(_p1),
					_1: _elm_lang$core$Native_Utils.update(
						cx,
						{input: _p0._0._1, position: cx.position + 1})
				} : {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Err(
						_elm_lang$core$Native_List.fromArray(
							[message])),
					_1: cx
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Err(
						_elm_lang$core$Native_List.fromArray(
							[message])),
					_1: cx
				};
			}
		});
};
var _Bogdanp$elm_combine$Combine_Char$char = function (c) {
	return A2(
		_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
		_Bogdanp$elm_combine$Combine_Char$satisfy(
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(c)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected ',
			_elm_lang$core$Basics$toString(c)));
};
var _Bogdanp$elm_combine$Combine_Char$anyChar = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		_elm_lang$core$Basics$always(true)),
	'expected any character');
var _Bogdanp$elm_combine$Combine_Char$oneOf = function (cs) {
	return A2(
		_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
		_Bogdanp$elm_combine$Combine_Char$satisfy(
			A2(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, cs)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected one of ',
			_elm_lang$core$Basics$toString(cs)));
};
var _Bogdanp$elm_combine$Combine_Char$noneOf = function (cs) {
	return A2(
		_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
		_Bogdanp$elm_combine$Combine_Char$satisfy(
			function (_p2) {
				return _elm_lang$core$Basics$not(
					A3(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, cs, _p2));
			}),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'expected none of ',
			_elm_lang$core$Basics$toString(cs)));
};
var _Bogdanp$elm_combine$Combine_Char$space = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr(' '))),
	'expected space');
var _Bogdanp$elm_combine$Combine_Char$tab = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr('\t'))),
	'expected tab');
var _Bogdanp$elm_combine$Combine_Char$newline = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(
			_elm_lang$core$Native_Utils.chr('\n'))),
	'expected newline');
var _Bogdanp$elm_combine$Combine_Char$eol = A2(_Bogdanp$elm_combine$Combine_Infix_ops['<|>'], _Bogdanp$elm_combine$Combine_Char$newline, _Bogdanp$elm_combine$Combine_Char$crlf);
var _Bogdanp$elm_combine$Combine_Char$lower = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isLower),
	'expected a lowercase character');
var _Bogdanp$elm_combine$Combine_Char$upper = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isUpper),
	'expected an uppercase character');
var _Bogdanp$elm_combine$Combine_Char$digit = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isDigit),
	'expected a digit');
var _Bogdanp$elm_combine$Combine_Char$octDigit = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isOctDigit),
	'expected an octal digit');
var _Bogdanp$elm_combine$Combine_Char$hexDigit = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	_Bogdanp$elm_combine$Combine_Char$satisfy(_elm_lang$core$Char$isHexDigit),
	'expected a hexadecimal digit');

var _Bogdanp$elm_combine$Combine_Num$digit = function () {
	var toDigit = function (c) {
		return _elm_lang$core$Char$toCode(c) - _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('0'));
	};
	return A2(
		_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
		A2(_Bogdanp$elm_combine$Combine_Infix_ops['<$>'], toDigit, _Bogdanp$elm_combine$Combine_Char$digit),
		'expected a digit');
}();
var _Bogdanp$elm_combine$Combine_Num$sign = A2(
	_Bogdanp$elm_combine$Combine$optional,
	1,
	_Bogdanp$elm_combine$Combine$choice(
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_Bogdanp$elm_combine$Combine_Infix_ops['<$'],
				1,
				_Bogdanp$elm_combine$Combine$string('+')),
				A2(
				_Bogdanp$elm_combine$Combine_Infix_ops['<$'],
				-1,
				_Bogdanp$elm_combine$Combine$string('-'))
			])));
var _Bogdanp$elm_combine$Combine_Num$unwrap = F2(
	function (f, s) {
		var _p0 = f(s);
		if (_p0.ctor === 'Ok') {
			return _p0._0;
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'Combine.Num',
				{
					start: {line: 19, column: 3},
					end: {line: 24, column: 73}
				},
				_p0)(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'impossible state in Combine.Num.unwrap: ',
					_elm_lang$core$Basics$toString(_p0._0)));
		}
	});
var _Bogdanp$elm_combine$Combine_Num$toInt = _Bogdanp$elm_combine$Combine_Num$unwrap(_elm_lang$core$String$toInt);
var _Bogdanp$elm_combine$Combine_Num$int = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	A2(
		_Bogdanp$elm_combine$Combine$andMap,
		A2(
			_Bogdanp$elm_combine$Combine$map,
			F2(
				function (x, y) {
					return x * y;
				}),
			_Bogdanp$elm_combine$Combine_Num$sign),
		A2(
			_Bogdanp$elm_combine$Combine_Infix_ops['<$>'],
			_Bogdanp$elm_combine$Combine_Num$toInt,
			_Bogdanp$elm_combine$Combine$regex('(0|[1-9][0-9]*)'))),
	'expected an integer');
var _Bogdanp$elm_combine$Combine_Num$toFloat = _Bogdanp$elm_combine$Combine_Num$unwrap(_elm_lang$core$String$toFloat);
var _Bogdanp$elm_combine$Combine_Num$float = A2(
	_Bogdanp$elm_combine$Combine_Infix_ops['<?>'],
	A2(
		_Bogdanp$elm_combine$Combine$andMap,
		A2(
			_Bogdanp$elm_combine$Combine$map,
			function (_p2) {
				return F2(
					function (x, y) {
						return x * y;
					})(
					_elm_lang$core$Basics$toFloat(_p2));
			},
			_Bogdanp$elm_combine$Combine_Num$sign),
		A2(
			_Bogdanp$elm_combine$Combine_Infix_ops['<$>'],
			_Bogdanp$elm_combine$Combine_Num$toFloat,
			_Bogdanp$elm_combine$Combine$regex('(0|[1-9][0-9]*)(\\.[0-9]+)'))),
	'expected a float');

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(_elm_lang$core$List_ops['::'], key, keyList);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(_elm_lang$core$List_ops['::'], value, valueList);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					_elm_lang$core$List_ops['::'],
					{ctor: '_Tuple2', _0: key, _1: value},
					list);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]),
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				var _p3 = _p2;
				var _p9 = _p3._1;
				var _p8 = _p3._0;
				var _p4 = _p8;
				if (_p4.ctor === '[]') {
					return {
						ctor: '_Tuple2',
						_0: _p8,
						_1: A3(rightStep, rKey, rValue, _p9)
					};
				} else {
					var _p7 = _p4._1;
					var _p6 = _p4._0._1;
					var _p5 = _p4._0._0;
					return (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) ? {
						ctor: '_Tuple2',
						_0: _p7,
						_1: A3(leftStep, _p5, _p6, _p9)
					} : ((_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) ? {
						ctor: '_Tuple2',
						_0: _p8,
						_1: A3(rightStep, rKey, rValue, _p9)
					} : {
						ctor: '_Tuple2',
						_0: _p7,
						_1: A4(bothStep, _p5, _p6, rValue, _p9)
					});
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				_elm_lang$core$Native_List.fromArray(
					[
						'Internal red-black tree invariant violated, expected ',
						msg,
						' and got ',
						_elm_lang$core$Basics$toString(c),
						'/',
						lgot,
						'/',
						rgot,
						'\nPlease report this bug to <https://github.com/elm-lang/core/issues>'
					])));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v11_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v11_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v11_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v13 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v14 = _p14._3;
				n = _v13;
				dict = _v14;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v17 = targetKey,
							_v18 = _p15._3;
						targetKey = _v17;
						dict = _v18;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v19 = targetKey,
							_v20 = _p15._4;
						targetKey = _v19;
						dict = _v20;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v23 = _p18._1,
					_v24 = _p18._2,
					_v25 = _p18._4;
				k = _v23;
				v = _v24;
				r = _v25;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v33_6:
	do {
		_v33_5:
		do {
			_v33_4:
			do {
				_v33_3:
				do {
					_v33_2:
					do {
						_v33_1:
						do {
							_v33_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v33_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v33_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v33_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v33_3;
																		} else {
																			break _v33_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v33_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v33_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v33_4;
																	} else {
																		break _v33_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v33_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v33_1;
																} else {
																	break _v33_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v33_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v33_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v33_5;
																	} else {
																		break _v33_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v33_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v33_5;
																	} else {
																		break _v33_6;
																	}
																}
															} else {
																break _v33_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v33_5;
															} else {
																break _v33_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v33_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v33_3;
																} else {
																	break _v33_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v33_4;
															} else {
																break _v33_6;
															}
														default:
															break _v33_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v33_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v33_1;
														} else {
															break _v33_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v33_5;
													} else {
														break _v33_6;
													}
												default:
													break _v33_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v33_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v33_3;
														} else {
															break _v33_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v33_4;
													} else {
														break _v33_6;
													}
												default:
													break _v33_6;
											}
										} else {
											break _v33_6;
										}
									}
								} else {
									break _v33_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (c, l, r) {
		var _p29 = {ctor: '_Tuple2', _0: l, _1: r};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = c;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: c, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						c,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: c, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						c,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var l$ = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, c, k, v, l$, r);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _avh4$elm_diff$Diff$tokenizeLines = function (s) {
	var tokens = A2(_elm_lang$core$String$split, '\n', s);
	var n = _elm_lang$core$List$length(tokens);
	return _elm_lang$core$Native_Utils.eq(s, '') ? _elm_lang$core$Native_List.fromArray(
		[]) : A2(
		_elm_lang$core$List$indexedMap,
		F2(
			function (i, s) {
				return (_elm_lang$core$Native_Utils.cmp(i, n - 1) < 0) ? A2(_elm_lang$core$Basics_ops['++'], s, '\n') : s;
			}),
		tokens);
};
var _avh4$elm_diff$Diff$val = F3(
	function (row, col, s) {
		return A2(
			_elm_lang$core$Dict$get,
			{ctor: '_Tuple2', _0: row, _1: col},
			s);
	});
var _avh4$elm_diff$Diff$orCrash = function (m) {
	var _p0 = m;
	if (_p0.ctor === 'Just') {
		return _p0._0;
	} else {
		return _elm_lang$core$Native_Utils.crashCase(
			'Diff',
			{
				start: {line: 114, column: 5},
				end: {line: 119, column: 37}
			},
			_p0)('No options');
	}
};
var _avh4$elm_diff$Diff$bestScore = F2(
	function (ma, mb) {
		var _p2 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (_p2._1.ctor === 'Nothing') {
			return _p2._0;
		} else {
			if (_p2._0.ctor === 'Nothing') {
				return _p2._1;
			} else {
				var _p4 = _p2._1._0._0;
				var _p3 = _p2._0._0._0;
				return (_elm_lang$core$Native_Utils.cmp(_p4, _p3) > 0) ? _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: _p4, _1: _p2._1._0._1}) : _elm_lang$core$Maybe$Just(
					{ctor: '_Tuple2', _0: _p3, _1: _p2._0._0._1});
			}
		}
	});
var _avh4$elm_diff$Diff$score = F3(
	function (add, c, _p5) {
		var _p6 = _p5;
		return {
			ctor: '_Tuple2',
			_0: _p6._0 + add,
			_1: A2(_elm_lang$core$List_ops['::'], c, _p6._1)
		};
	});
var _avh4$elm_diff$Diff$scores = F4(
	function (tl, t, l, _p7) {
		var _p8 = _p7;
		return A2(
			_elm_lang$core$Maybe$map,
			A2(_avh4$elm_diff$Diff$score, _p8._1, _p8._2),
			function () {
				var _p9 = _p8._0;
				switch (_p9.ctor) {
					case 'UseA':
						return t;
					case 'UseB':
						return l;
					default:
						return tl;
				}
			}());
	});
var _avh4$elm_diff$Diff$Removed = function (a) {
	return {ctor: 'Removed', _0: a};
};
var _avh4$elm_diff$Diff$Added = function (a) {
	return {ctor: 'Added', _0: a};
};
var _avh4$elm_diff$Diff$Changed = F2(
	function (a, b) {
		return {ctor: 'Changed', _0: a, _1: b};
	});
var _avh4$elm_diff$Diff$NoChange = function (a) {
	return {ctor: 'NoChange', _0: a};
};
var _avh4$elm_diff$Diff$mergeAll = F2(
	function (next, list) {
		var _p10 = {ctor: '_Tuple2', _0: next, _1: list};
		_v5_8:
		do {
			if ((_p10.ctor === '_Tuple2') && (_p10._1.ctor === '::')) {
				switch (_p10._0.ctor) {
					case 'Added':
						switch (_p10._1._0.ctor) {
							case 'Added':
								return A2(
									_elm_lang$core$List_ops['::'],
									_avh4$elm_diff$Diff$Added(
										A2(_elm_lang$core$Basics_ops['++'], _p10._0._0, _p10._1._0._0)),
									_p10._1._1);
							case 'Removed':
								return A2(
									_elm_lang$core$List_ops['::'],
									A2(_avh4$elm_diff$Diff$Changed, _p10._1._0._0, _p10._0._0),
									_p10._1._1);
							case 'Changed':
								return A2(
									_elm_lang$core$List_ops['::'],
									A2(
										_avh4$elm_diff$Diff$Changed,
										_p10._1._0._0,
										A2(_elm_lang$core$Basics_ops['++'], _p10._0._0, _p10._1._0._1)),
									_p10._1._1);
							default:
								break _v5_8;
						}
					case 'Removed':
						switch (_p10._1._0.ctor) {
							case 'Removed':
								return A2(
									_elm_lang$core$List_ops['::'],
									_avh4$elm_diff$Diff$Removed(
										A2(_elm_lang$core$Basics_ops['++'], _p10._0._0, _p10._1._0._0)),
									_p10._1._1);
							case 'Added':
								return A2(
									_elm_lang$core$List_ops['::'],
									A2(_avh4$elm_diff$Diff$Changed, _p10._0._0, _p10._1._0._0),
									_p10._1._1);
							case 'Changed':
								return A2(
									_elm_lang$core$List_ops['::'],
									A2(
										_avh4$elm_diff$Diff$Changed,
										A2(_elm_lang$core$Basics_ops['++'], _p10._0._0, _p10._1._0._0),
										_p10._1._0._1),
									_p10._1._1);
							default:
								break _v5_8;
						}
					case 'NoChange':
						if (_p10._1._0.ctor === 'NoChange') {
							return A2(
								_elm_lang$core$List_ops['::'],
								_avh4$elm_diff$Diff$NoChange(
									A2(_elm_lang$core$Basics_ops['++'], _p10._0._0, _p10._1._0._0)),
								_p10._1._1);
						} else {
							break _v5_8;
						}
					default:
						if (_p10._1._0.ctor === 'Changed') {
							return A2(
								_elm_lang$core$List_ops['::'],
								A2(
									_avh4$elm_diff$Diff$Changed,
									A2(_elm_lang$core$Basics_ops['++'], _p10._0._0, _p10._1._0._0),
									A2(_elm_lang$core$Basics_ops['++'], _p10._0._1, _p10._1._0._1)),
								_p10._1._1);
						} else {
							break _v5_8;
						}
				}
			} else {
				break _v5_8;
			}
		} while(false);
		return A2(_elm_lang$core$List_ops['::'], next, list);
	});
var _avh4$elm_diff$Diff$UseB = {ctor: 'UseB'};
var _avh4$elm_diff$Diff$UseA = {ctor: 'UseA'};
var _avh4$elm_diff$Diff$UseBoth = {ctor: 'UseBoth'};
var _avh4$elm_diff$Diff$choices = F2(
	function (a, b) {
		return _elm_lang$core$Native_Utils.eq(a, b) ? _elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple3',
				_0: _avh4$elm_diff$Diff$UseA,
				_1: 0,
				_2: _avh4$elm_diff$Diff$Removed(a)
			},
				{
				ctor: '_Tuple3',
				_0: _avh4$elm_diff$Diff$UseB,
				_1: 0,
				_2: _avh4$elm_diff$Diff$Added(b)
			},
				{
				ctor: '_Tuple3',
				_0: _avh4$elm_diff$Diff$UseBoth,
				_1: 1,
				_2: _avh4$elm_diff$Diff$NoChange(a)
			}
			]) : _elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple3',
				_0: _avh4$elm_diff$Diff$UseA,
				_1: 0,
				_2: _avh4$elm_diff$Diff$Removed(a)
			},
				{
				ctor: '_Tuple3',
				_0: _avh4$elm_diff$Diff$UseB,
				_1: 0,
				_2: _avh4$elm_diff$Diff$Added(b)
			},
				{
				ctor: '_Tuple3',
				_0: _avh4$elm_diff$Diff$UseBoth,
				_1: 0,
				_2: A2(_avh4$elm_diff$Diff$Changed, a, b)
			}
			]);
	});
var _avh4$elm_diff$Diff$best = F5(
	function (tl, t, l, a, b) {
		return _avh4$elm_diff$Diff$orCrash(
			A3(
				_elm_lang$core$List$foldl,
				_avh4$elm_diff$Diff$bestScore,
				_elm_lang$core$Maybe$Nothing,
				A2(
					_elm_lang$core$List$map,
					A3(_avh4$elm_diff$Diff$scores, tl, t, l),
					A2(_avh4$elm_diff$Diff$choices, a, b))));
	});
var _avh4$elm_diff$Diff$calcCell = F3(
	function (_p12, _p11, s) {
		var _p13 = _p12;
		var _p16 = _p13._0;
		var _p14 = _p11;
		var _p15 = _p14._0;
		return A3(
			_elm_lang$core$Dict$insert,
			{ctor: '_Tuple2', _0: _p16, _1: _p15},
			A5(
				_avh4$elm_diff$Diff$best,
				A3(_avh4$elm_diff$Diff$val, _p16 - 1, _p15 - 1, s),
				A3(_avh4$elm_diff$Diff$val, _p16 - 1, _p15, s),
				A3(_avh4$elm_diff$Diff$val, _p16, _p15 - 1, s),
				_p13._1,
				_p14._1),
			s);
	});
var _avh4$elm_diff$Diff$calcRow = F3(
	function (bs, _p17, d) {
		var _p18 = _p17;
		return A3(
			_elm_lang$core$List$foldl,
			_avh4$elm_diff$Diff$calcCell(
				{ctor: '_Tuple2', _0: _p18._0, _1: _p18._1}),
			d,
			A2(
				_elm_lang$core$List$indexedMap,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				bs));
	});
var _avh4$elm_diff$Diff$initialGrid = F2(
	function (az, bs) {
		return function (d) {
			return A3(
				_elm_lang$core$List$foldl,
				function (a) {
					return A2(
						_avh4$elm_diff$Diff$calcCell,
						a,
						{ctor: '_Tuple2', _0: -1, _1: ''});
				},
				d,
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					az));
		}(
			A3(
				_avh4$elm_diff$Diff$calcRow,
				bs,
				{ctor: '_Tuple2', _0: -1, _1: ''},
				A2(
					_elm_lang$core$Dict$singleton,
					{ctor: '_Tuple2', _0: -1, _1: -1},
					{
						ctor: '_Tuple2',
						_0: 0,
						_1: _elm_lang$core$Native_List.fromArray(
							[])
					})));
	});
var _avh4$elm_diff$Diff$calcGrid = F2(
	function (az, bs) {
		return A3(
			_elm_lang$core$List$foldl,
			_avh4$elm_diff$Diff$calcRow(bs),
			A2(_avh4$elm_diff$Diff$initialGrid, az, bs),
			A2(
				_elm_lang$core$List$indexedMap,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				az));
	});
var _avh4$elm_diff$Diff$diff = F3(
	function (tokenize, a, b) {
		var bs = tokenize(b);
		var az = tokenize(a);
		return _elm_lang$core$Native_Utils.eq(
			az,
			_elm_lang$core$Native_List.fromArray(
				[])) ? A3(
			_elm_lang$core$List$foldr,
			_avh4$elm_diff$Diff$mergeAll,
			_elm_lang$core$Native_List.fromArray(
				[]),
			A2(_elm_lang$core$List$map, _avh4$elm_diff$Diff$Added, bs)) : (_elm_lang$core$Native_Utils.eq(
			bs,
			_elm_lang$core$Native_List.fromArray(
				[])) ? A3(
			_elm_lang$core$List$foldr,
			_avh4$elm_diff$Diff$mergeAll,
			_elm_lang$core$Native_List.fromArray(
				[]),
			A2(_elm_lang$core$List$map, _avh4$elm_diff$Diff$Removed, az)) : A3(
			_elm_lang$core$List$foldl,
			_avh4$elm_diff$Diff$mergeAll,
			_elm_lang$core$Native_List.fromArray(
				[]),
			A2(
				_elm_lang$core$Maybe$withDefault,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$Maybe$map,
					function (_p19) {
						var _p20 = _p19;
						return _p20._1;
					},
					A2(
						_elm_lang$core$Dict$get,
						{
							ctor: '_Tuple2',
							_0: -1 + _elm_lang$core$List$length(az),
							_1: -1 + _elm_lang$core$List$length(bs)
						},
						A2(_avh4$elm_diff$Diff$calcGrid, az, bs))))));
	});
var _avh4$elm_diff$Diff$diffChars = _avh4$elm_diff$Diff$diff(
	_elm_lang$core$String$split(''));
var _avh4$elm_diff$Diff$diffLines = _avh4$elm_diff$Diff$diff(_avh4$elm_diff$Diff$tokenizeLines);

var _elm_community$basics_extra$Basics_Extra_ops = _elm_community$basics_extra$Basics_Extra_ops || {};
_elm_community$basics_extra$Basics_Extra_ops['=>'] = F2(
	function (v0, v1) {
		return {ctor: '_Tuple2', _0: v0, _1: v1};
	});
var _elm_community$basics_extra$Basics_Extra$never = function (n) {
	never:
	while (true) {
		var _v0 = n;
		n = _v0;
		continue never;
	}
};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		_elm_lang$core$Native_List.range(
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function decodeObject(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function decodeTuple(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'tuple',
		func: f,
		decoders: decoders
	};
}

function andThen(decoder, callback)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function customAndThen(decoder, callback)
{
	return {
		ctor: '<decoder>',
		tag: 'customAndThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function decodeObject1(f, d1)
{
	return decodeObject(f, [d1]);
}

function decodeObject2(f, d1, d2)
{
	return decodeObject(f, [d1, d2]);
}

function decodeObject3(f, d1, d2, d3)
{
	return decodeObject(f, [d1, d2, d3]);
}

function decodeObject4(f, d1, d2, d3, d4)
{
	return decodeObject(f, [d1, d2, d3, d4]);
}

function decodeObject5(f, d1, d2, d3, d4, d5)
{
	return decodeObject(f, [d1, d2, d3, d4, d5]);
}

function decodeObject6(f, d1, d2, d3, d4, d5, d6)
{
	return decodeObject(f, [d1, d2, d3, d4, d5, d6]);
}

function decodeObject7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return decodeObject(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function decodeObject8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return decodeObject(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODING TUPLES

function decodeTuple1(f, d1)
{
	return decodeTuple(f, [d1]);
}

function decodeTuple2(f, d1, d2)
{
	return decodeTuple(f, [d1, d2]);
}

function decodeTuple3(f, d1, d2, d3)
{
	return decodeTuple(f, [d1, d2, d3]);
}

function decodeTuple4(f, d1, d2, d3, d4)
{
	return decodeTuple(f, [d1, d2, d3, d4]);
}

function decodeTuple5(f, d1, d2, d3, d4, d5)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5]);
}

function decodeTuple6(f, d1, d2, d3, d4, d5, d6)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5, d6]);
}

function decodeTuple7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function decodeTuple8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return decodeTuple(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok')
				? result
				: badField(field, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'tuple':
			var decoders = decoder.decoders;
			var len = decoders.length;

			if ( !(value instanceof Array) || value.length !== len )
			{
				return badPrimitive('a Tuple with ' + len + ' entries', value);
			}

			var answer = decoder.func;
			for (var i = 0; i < len; i++)
			{
				var result = runHelp(decoders[i], value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'customAndThen':
			var result = runHelp(decoder.decoder, value);
			if (result.tag !== 'ok')
			{
				return result;
			}
			var realResult = decoder.callback(result.value);
			if (realResult.ctor === 'Err')
			{
				return badPrimitive('something custom', value);
			}
			return ok(realResult._0);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'map-many':
		case 'tuple':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
		case 'customAndThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),

	decodeObject1: F2(decodeObject1),
	decodeObject2: F3(decodeObject2),
	decodeObject3: F4(decodeObject3),
	decodeObject4: F5(decodeObject4),
	decodeObject5: F6(decodeObject5),
	decodeObject6: F7(decodeObject6),
	decodeObject7: F8(decodeObject7),
	decodeObject8: F9(decodeObject8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	decodeTuple1: F2(decodeTuple1),
	decodeTuple2: F3(decodeTuple2),
	decodeTuple3: F4(decodeTuple3),
	decodeTuple4: F5(decodeTuple4),
	decodeTuple5: F6(decodeTuple5),
	decodeTuple6: F7(decodeTuple6),
	decodeTuple7: F8(decodeTuple7),
	decodeTuple8: F9(decodeTuple8),

	andThen: F2(andThen),
	customAndThen: F2(customAndThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$tuple8 = _elm_lang$core$Native_Json.decodeTuple8;
var _elm_lang$core$Json_Decode$tuple7 = _elm_lang$core$Native_Json.decodeTuple7;
var _elm_lang$core$Json_Decode$tuple6 = _elm_lang$core$Native_Json.decodeTuple6;
var _elm_lang$core$Json_Decode$tuple5 = _elm_lang$core$Native_Json.decodeTuple5;
var _elm_lang$core$Json_Decode$tuple4 = _elm_lang$core$Native_Json.decodeTuple4;
var _elm_lang$core$Json_Decode$tuple3 = _elm_lang$core$Native_Json.decodeTuple3;
var _elm_lang$core$Json_Decode$tuple2 = _elm_lang$core$Native_Json.decodeTuple2;
var _elm_lang$core$Json_Decode$tuple1 = _elm_lang$core$Native_Json.decodeTuple1;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$customDecoder = _elm_lang$core$Native_Json.customAndThen;
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$object8 = _elm_lang$core$Native_Json.decodeObject8;
var _elm_lang$core$Json_Decode$object7 = _elm_lang$core$Native_Json.decodeObject7;
var _elm_lang$core$Json_Decode$object6 = _elm_lang$core$Native_Json.decodeObject6;
var _elm_lang$core$Json_Decode$object5 = _elm_lang$core$Native_Json.decodeObject5;
var _elm_lang$core$Json_Decode$object4 = _elm_lang$core$Native_Json.decodeObject4;
var _elm_lang$core$Json_Decode$object3 = _elm_lang$core$Native_Json.decodeObject3;
var _elm_lang$core$Json_Decode$object2 = _elm_lang$core$Native_Json.decodeObject2;
var _elm_lang$core$Json_Decode$object1 = _elm_lang$core$Native_Json.decodeObject1;
var _elm_lang$core$Json_Decode_ops = _elm_lang$core$Json_Decode_ops || {};
_elm_lang$core$Json_Decode_ops[':='] = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$Json_Decode_ops[':='], x, y);
				}),
			decoder,
			fields);
	});
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.decodeObject1;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

//import Native.Json //

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';



////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (!a.options === b.options)
	{
		if (a.stopPropagation !== b.stopPropagation || a.preventDefault !== b.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}



////////////  RENDERER  ////////////


function renderer(parent, tagger, initialVirtualNode)
{
	var eventNode = { tagger: tagger, parent: undefined };

	var domNode = render(initialVirtualNode, eventNode);
	parent.appendChild(domNode);

	var state = 'NO_REQUEST';
	var currentVirtualNode = initialVirtualNode;
	var nextVirtualNode = initialVirtualNode;

	function registerVirtualNode(vNode)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextVirtualNode = vNode;
	}

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/core/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var patches = diff(currentVirtualNode, nextVirtualNode);
				domNode = applyPatches(domNode, currentVirtualNode, patches, eventNode);
				currentVirtualNode = nextVirtualNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return { update: registerVirtualNode };
}


var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(cb) { setTimeout(cb, 1000 / 60); };



////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = {
				tagger: tagger,
				parent: eventNode
			};

			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return document.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? document.createElementNS(vNode.namespace, vNode.tag)
				: document.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? document.createElementNS(vNode.namespace, vNode.tag)
				: document.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return redraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			domNode.elm_event_node_ref.tagger = patch.data;
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			var data = patch.data;

			// end inserts
			var endInserts = data.endInserts;
			var end;
			if (typeof endInserts !== 'undefined')
			{
				if (endInserts.length === 1)
				{
					var insert = endInserts[0];
					var entry = insert.entry;
					var end = entry.tag === 'move'
						? entry.data
						: render(entry.vnode, patch.eventNode);
				}
				else
				{
					end = document.createDocumentFragment();
					for (var i = 0; i < endInserts.length; i++)
					{
						var insert = endInserts[i];
						var entry = insert.entry;
						var node = entry.tag === 'move'
							? entry.data
							: render(entry.vnode, patch.eventNode);
						end.appendChild(node);
					}
				}
			}

			// removals
			domNode = applyPatchesHelp(domNode, data.patches);

			// inserts
			var inserts = data.inserts;
			for (var i = 0; i < inserts.length; i++)
			{
				var insert = inserts[i];
				var entry = insert.entry;
				var node = entry.tag === 'move'
					? entry.data
					: render(entry.vnode, patch.eventNode);
				domNode.insertBefore(node, domNode.childNodes[insert.index]);
			}

			if (typeof end !== 'undefined')
			{
				domNode.appendChild(end);
			}

			return domNode;

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function redraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}



////////////  PROGRAMS  ////////////


function programWithFlags(details)
{
	return {
		init: details.init,
		update: details.update,
		subscriptions: details.subscriptions,
		view: details.view,
		renderer: renderer
	};
}


return {
	node: node,
	text: text,

	custom: custom,

	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	programWithFlags: programWithFlags
};

}();
var _elm_lang$virtual_dom$VirtualDom$programWithFlags = _elm_lang$virtual_dom$Native_VirtualDom.programWithFlags;
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main$ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$svg = _elm_lang$html$Html$node('svg');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$svg$Svg$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$svg$Svg$svgNamespace = A2(
	_elm_lang$virtual_dom$VirtualDom$property,
	'namespace',
	_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
var _elm_lang$svg$Svg$node = F3(
	function (name, attributes, children) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			name,
			A2(_elm_lang$core$List_ops['::'], _elm_lang$svg$Svg$svgNamespace, attributes),
			children);
	});
var _elm_lang$svg$Svg$svg = _elm_lang$svg$Svg$node('svg');
var _elm_lang$svg$Svg$foreignObject = _elm_lang$svg$Svg$node('foreignObject');
var _elm_lang$svg$Svg$animate = _elm_lang$svg$Svg$node('animate');
var _elm_lang$svg$Svg$animateColor = _elm_lang$svg$Svg$node('animateColor');
var _elm_lang$svg$Svg$animateMotion = _elm_lang$svg$Svg$node('animateMotion');
var _elm_lang$svg$Svg$animateTransform = _elm_lang$svg$Svg$node('animateTransform');
var _elm_lang$svg$Svg$mpath = _elm_lang$svg$Svg$node('mpath');
var _elm_lang$svg$Svg$set = _elm_lang$svg$Svg$node('set');
var _elm_lang$svg$Svg$a = _elm_lang$svg$Svg$node('a');
var _elm_lang$svg$Svg$defs = _elm_lang$svg$Svg$node('defs');
var _elm_lang$svg$Svg$g = _elm_lang$svg$Svg$node('g');
var _elm_lang$svg$Svg$marker = _elm_lang$svg$Svg$node('marker');
var _elm_lang$svg$Svg$mask = _elm_lang$svg$Svg$node('mask');
var _elm_lang$svg$Svg$missingGlyph = _elm_lang$svg$Svg$node('missingGlyph');
var _elm_lang$svg$Svg$pattern = _elm_lang$svg$Svg$node('pattern');
var _elm_lang$svg$Svg$switch = _elm_lang$svg$Svg$node('switch');
var _elm_lang$svg$Svg$symbol = _elm_lang$svg$Svg$node('symbol');
var _elm_lang$svg$Svg$desc = _elm_lang$svg$Svg$node('desc');
var _elm_lang$svg$Svg$metadata = _elm_lang$svg$Svg$node('metadata');
var _elm_lang$svg$Svg$title = _elm_lang$svg$Svg$node('title');
var _elm_lang$svg$Svg$feBlend = _elm_lang$svg$Svg$node('feBlend');
var _elm_lang$svg$Svg$feColorMatrix = _elm_lang$svg$Svg$node('feColorMatrix');
var _elm_lang$svg$Svg$feComponentTransfer = _elm_lang$svg$Svg$node('feComponentTransfer');
var _elm_lang$svg$Svg$feComposite = _elm_lang$svg$Svg$node('feComposite');
var _elm_lang$svg$Svg$feConvolveMatrix = _elm_lang$svg$Svg$node('feConvolveMatrix');
var _elm_lang$svg$Svg$feDiffuseLighting = _elm_lang$svg$Svg$node('feDiffuseLighting');
var _elm_lang$svg$Svg$feDisplacementMap = _elm_lang$svg$Svg$node('feDisplacementMap');
var _elm_lang$svg$Svg$feFlood = _elm_lang$svg$Svg$node('feFlood');
var _elm_lang$svg$Svg$feFuncA = _elm_lang$svg$Svg$node('feFuncA');
var _elm_lang$svg$Svg$feFuncB = _elm_lang$svg$Svg$node('feFuncB');
var _elm_lang$svg$Svg$feFuncG = _elm_lang$svg$Svg$node('feFuncG');
var _elm_lang$svg$Svg$feFuncR = _elm_lang$svg$Svg$node('feFuncR');
var _elm_lang$svg$Svg$feGaussianBlur = _elm_lang$svg$Svg$node('feGaussianBlur');
var _elm_lang$svg$Svg$feImage = _elm_lang$svg$Svg$node('feImage');
var _elm_lang$svg$Svg$feMerge = _elm_lang$svg$Svg$node('feMerge');
var _elm_lang$svg$Svg$feMergeNode = _elm_lang$svg$Svg$node('feMergeNode');
var _elm_lang$svg$Svg$feMorphology = _elm_lang$svg$Svg$node('feMorphology');
var _elm_lang$svg$Svg$feOffset = _elm_lang$svg$Svg$node('feOffset');
var _elm_lang$svg$Svg$feSpecularLighting = _elm_lang$svg$Svg$node('feSpecularLighting');
var _elm_lang$svg$Svg$feTile = _elm_lang$svg$Svg$node('feTile');
var _elm_lang$svg$Svg$feTurbulence = _elm_lang$svg$Svg$node('feTurbulence');
var _elm_lang$svg$Svg$font = _elm_lang$svg$Svg$node('font');
var _elm_lang$svg$Svg$fontFace = _elm_lang$svg$Svg$node('fontFace');
var _elm_lang$svg$Svg$fontFaceFormat = _elm_lang$svg$Svg$node('fontFaceFormat');
var _elm_lang$svg$Svg$fontFaceName = _elm_lang$svg$Svg$node('fontFaceName');
var _elm_lang$svg$Svg$fontFaceSrc = _elm_lang$svg$Svg$node('fontFaceSrc');
var _elm_lang$svg$Svg$fontFaceUri = _elm_lang$svg$Svg$node('fontFaceUri');
var _elm_lang$svg$Svg$hkern = _elm_lang$svg$Svg$node('hkern');
var _elm_lang$svg$Svg$vkern = _elm_lang$svg$Svg$node('vkern');
var _elm_lang$svg$Svg$linearGradient = _elm_lang$svg$Svg$node('linearGradient');
var _elm_lang$svg$Svg$radialGradient = _elm_lang$svg$Svg$node('radialGradient');
var _elm_lang$svg$Svg$stop = _elm_lang$svg$Svg$node('stop');
var _elm_lang$svg$Svg$circle = _elm_lang$svg$Svg$node('circle');
var _elm_lang$svg$Svg$ellipse = _elm_lang$svg$Svg$node('ellipse');
var _elm_lang$svg$Svg$image = _elm_lang$svg$Svg$node('image');
var _elm_lang$svg$Svg$line = _elm_lang$svg$Svg$node('line');
var _elm_lang$svg$Svg$path = _elm_lang$svg$Svg$node('path');
var _elm_lang$svg$Svg$polygon = _elm_lang$svg$Svg$node('polygon');
var _elm_lang$svg$Svg$polyline = _elm_lang$svg$Svg$node('polyline');
var _elm_lang$svg$Svg$rect = _elm_lang$svg$Svg$node('rect');
var _elm_lang$svg$Svg$use = _elm_lang$svg$Svg$node('use');
var _elm_lang$svg$Svg$feDistantLight = _elm_lang$svg$Svg$node('feDistantLight');
var _elm_lang$svg$Svg$fePointLight = _elm_lang$svg$Svg$node('fePointLight');
var _elm_lang$svg$Svg$feSpotLight = _elm_lang$svg$Svg$node('feSpotLight');
var _elm_lang$svg$Svg$altGlyph = _elm_lang$svg$Svg$node('altGlyph');
var _elm_lang$svg$Svg$altGlyphDef = _elm_lang$svg$Svg$node('altGlyphDef');
var _elm_lang$svg$Svg$altGlyphItem = _elm_lang$svg$Svg$node('altGlyphItem');
var _elm_lang$svg$Svg$glyph = _elm_lang$svg$Svg$node('glyph');
var _elm_lang$svg$Svg$glyphRef = _elm_lang$svg$Svg$node('glyphRef');
var _elm_lang$svg$Svg$textPath = _elm_lang$svg$Svg$node('textPath');
var _elm_lang$svg$Svg$text$ = _elm_lang$svg$Svg$node('text');
var _elm_lang$svg$Svg$tref = _elm_lang$svg$Svg$node('tref');
var _elm_lang$svg$Svg$tspan = _elm_lang$svg$Svg$node('tspan');
var _elm_lang$svg$Svg$clipPath = _elm_lang$svg$Svg$node('clipPath');
var _elm_lang$svg$Svg$colorProfile = _elm_lang$svg$Svg$node('colorProfile');
var _elm_lang$svg$Svg$cursor = _elm_lang$svg$Svg$node('cursor');
var _elm_lang$svg$Svg$filter = _elm_lang$svg$Svg$node('filter');
var _elm_lang$svg$Svg$script = _elm_lang$svg$Svg$node('script');
var _elm_lang$svg$Svg$style = _elm_lang$svg$Svg$node('style');
var _elm_lang$svg$Svg$view = _elm_lang$svg$Svg$node('view');

var _elm_lang$svg$Svg_Attributes$writingMode = _elm_lang$virtual_dom$VirtualDom$attribute('writing-mode');
var _elm_lang$svg$Svg_Attributes$wordSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('word-spacing');
var _elm_lang$svg$Svg_Attributes$visibility = _elm_lang$virtual_dom$VirtualDom$attribute('visibility');
var _elm_lang$svg$Svg_Attributes$unicodeBidi = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-bidi');
var _elm_lang$svg$Svg_Attributes$textRendering = _elm_lang$virtual_dom$VirtualDom$attribute('text-rendering');
var _elm_lang$svg$Svg_Attributes$textDecoration = _elm_lang$virtual_dom$VirtualDom$attribute('text-decoration');
var _elm_lang$svg$Svg_Attributes$textAnchor = _elm_lang$virtual_dom$VirtualDom$attribute('text-anchor');
var _elm_lang$svg$Svg_Attributes$stroke = _elm_lang$virtual_dom$VirtualDom$attribute('stroke');
var _elm_lang$svg$Svg_Attributes$strokeWidth = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-width');
var _elm_lang$svg$Svg_Attributes$strokeOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-opacity');
var _elm_lang$svg$Svg_Attributes$strokeMiterlimit = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-miterlimit');
var _elm_lang$svg$Svg_Attributes$strokeLinejoin = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linejoin');
var _elm_lang$svg$Svg_Attributes$strokeLinecap = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-linecap');
var _elm_lang$svg$Svg_Attributes$strokeDashoffset = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dashoffset');
var _elm_lang$svg$Svg_Attributes$strokeDasharray = _elm_lang$virtual_dom$VirtualDom$attribute('stroke-dasharray');
var _elm_lang$svg$Svg_Attributes$stopOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('stop-opacity');
var _elm_lang$svg$Svg_Attributes$stopColor = _elm_lang$virtual_dom$VirtualDom$attribute('stop-color');
var _elm_lang$svg$Svg_Attributes$shapeRendering = _elm_lang$virtual_dom$VirtualDom$attribute('shape-rendering');
var _elm_lang$svg$Svg_Attributes$pointerEvents = _elm_lang$virtual_dom$VirtualDom$attribute('pointer-events');
var _elm_lang$svg$Svg_Attributes$overflow = _elm_lang$virtual_dom$VirtualDom$attribute('overflow');
var _elm_lang$svg$Svg_Attributes$opacity = _elm_lang$virtual_dom$VirtualDom$attribute('opacity');
var _elm_lang$svg$Svg_Attributes$mask = _elm_lang$virtual_dom$VirtualDom$attribute('mask');
var _elm_lang$svg$Svg_Attributes$markerStart = _elm_lang$virtual_dom$VirtualDom$attribute('marker-start');
var _elm_lang$svg$Svg_Attributes$markerMid = _elm_lang$virtual_dom$VirtualDom$attribute('marker-mid');
var _elm_lang$svg$Svg_Attributes$markerEnd = _elm_lang$virtual_dom$VirtualDom$attribute('marker-end');
var _elm_lang$svg$Svg_Attributes$lightingColor = _elm_lang$virtual_dom$VirtualDom$attribute('lighting-color');
var _elm_lang$svg$Svg_Attributes$letterSpacing = _elm_lang$virtual_dom$VirtualDom$attribute('letter-spacing');
var _elm_lang$svg$Svg_Attributes$kerning = _elm_lang$virtual_dom$VirtualDom$attribute('kerning');
var _elm_lang$svg$Svg_Attributes$imageRendering = _elm_lang$virtual_dom$VirtualDom$attribute('image-rendering');
var _elm_lang$svg$Svg_Attributes$glyphOrientationVertical = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-vertical');
var _elm_lang$svg$Svg_Attributes$glyphOrientationHorizontal = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-orientation-horizontal');
var _elm_lang$svg$Svg_Attributes$fontWeight = _elm_lang$virtual_dom$VirtualDom$attribute('font-weight');
var _elm_lang$svg$Svg_Attributes$fontVariant = _elm_lang$virtual_dom$VirtualDom$attribute('font-variant');
var _elm_lang$svg$Svg_Attributes$fontStyle = _elm_lang$virtual_dom$VirtualDom$attribute('font-style');
var _elm_lang$svg$Svg_Attributes$fontStretch = _elm_lang$virtual_dom$VirtualDom$attribute('font-stretch');
var _elm_lang$svg$Svg_Attributes$fontSize = _elm_lang$virtual_dom$VirtualDom$attribute('font-size');
var _elm_lang$svg$Svg_Attributes$fontSizeAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('font-size-adjust');
var _elm_lang$svg$Svg_Attributes$fontFamily = _elm_lang$virtual_dom$VirtualDom$attribute('font-family');
var _elm_lang$svg$Svg_Attributes$floodOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('flood-opacity');
var _elm_lang$svg$Svg_Attributes$floodColor = _elm_lang$virtual_dom$VirtualDom$attribute('flood-color');
var _elm_lang$svg$Svg_Attributes$filter = _elm_lang$virtual_dom$VirtualDom$attribute('filter');
var _elm_lang$svg$Svg_Attributes$fill = _elm_lang$virtual_dom$VirtualDom$attribute('fill');
var _elm_lang$svg$Svg_Attributes$fillRule = _elm_lang$virtual_dom$VirtualDom$attribute('fill-rule');
var _elm_lang$svg$Svg_Attributes$fillOpacity = _elm_lang$virtual_dom$VirtualDom$attribute('fill-opacity');
var _elm_lang$svg$Svg_Attributes$enableBackground = _elm_lang$virtual_dom$VirtualDom$attribute('enable-background');
var _elm_lang$svg$Svg_Attributes$dominantBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('dominant-baseline');
var _elm_lang$svg$Svg_Attributes$display = _elm_lang$virtual_dom$VirtualDom$attribute('display');
var _elm_lang$svg$Svg_Attributes$direction = _elm_lang$virtual_dom$VirtualDom$attribute('direction');
var _elm_lang$svg$Svg_Attributes$cursor = _elm_lang$virtual_dom$VirtualDom$attribute('cursor');
var _elm_lang$svg$Svg_Attributes$color = _elm_lang$virtual_dom$VirtualDom$attribute('color');
var _elm_lang$svg$Svg_Attributes$colorRendering = _elm_lang$virtual_dom$VirtualDom$attribute('color-rendering');
var _elm_lang$svg$Svg_Attributes$colorProfile = _elm_lang$virtual_dom$VirtualDom$attribute('color-profile');
var _elm_lang$svg$Svg_Attributes$colorInterpolation = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation');
var _elm_lang$svg$Svg_Attributes$colorInterpolationFilters = _elm_lang$virtual_dom$VirtualDom$attribute('color-interpolation-filters');
var _elm_lang$svg$Svg_Attributes$clip = _elm_lang$virtual_dom$VirtualDom$attribute('clip');
var _elm_lang$svg$Svg_Attributes$clipRule = _elm_lang$virtual_dom$VirtualDom$attribute('clip-rule');
var _elm_lang$svg$Svg_Attributes$clipPath = _elm_lang$virtual_dom$VirtualDom$attribute('clip-path');
var _elm_lang$svg$Svg_Attributes$baselineShift = _elm_lang$virtual_dom$VirtualDom$attribute('baseline-shift');
var _elm_lang$svg$Svg_Attributes$alignmentBaseline = _elm_lang$virtual_dom$VirtualDom$attribute('alignment-baseline');
var _elm_lang$svg$Svg_Attributes$zoomAndPan = _elm_lang$virtual_dom$VirtualDom$attribute('zoomAndPan');
var _elm_lang$svg$Svg_Attributes$z = _elm_lang$virtual_dom$VirtualDom$attribute('z');
var _elm_lang$svg$Svg_Attributes$yChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('yChannelSelector');
var _elm_lang$svg$Svg_Attributes$y2 = _elm_lang$virtual_dom$VirtualDom$attribute('y2');
var _elm_lang$svg$Svg_Attributes$y1 = _elm_lang$virtual_dom$VirtualDom$attribute('y1');
var _elm_lang$svg$Svg_Attributes$y = _elm_lang$virtual_dom$VirtualDom$attribute('y');
var _elm_lang$svg$Svg_Attributes$xmlSpace = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var _elm_lang$svg$Svg_Attributes$xmlLang = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
var _elm_lang$svg$Svg_Attributes$xmlBase = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
var _elm_lang$svg$Svg_Attributes$xlinkType = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
var _elm_lang$svg$Svg_Attributes$xlinkTitle = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:title');
var _elm_lang$svg$Svg_Attributes$xlinkShow = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:show');
var _elm_lang$svg$Svg_Attributes$xlinkRole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
var _elm_lang$svg$Svg_Attributes$xlinkHref = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
var _elm_lang$svg$Svg_Attributes$xlinkArcrole = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
var _elm_lang$svg$Svg_Attributes$xlinkActuate = A2(_elm_lang$virtual_dom$VirtualDom$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
var _elm_lang$svg$Svg_Attributes$xChannelSelector = _elm_lang$virtual_dom$VirtualDom$attribute('xChannelSelector');
var _elm_lang$svg$Svg_Attributes$x2 = _elm_lang$virtual_dom$VirtualDom$attribute('x2');
var _elm_lang$svg$Svg_Attributes$x1 = _elm_lang$virtual_dom$VirtualDom$attribute('x1');
var _elm_lang$svg$Svg_Attributes$xHeight = _elm_lang$virtual_dom$VirtualDom$attribute('x-height');
var _elm_lang$svg$Svg_Attributes$x = _elm_lang$virtual_dom$VirtualDom$attribute('x');
var _elm_lang$svg$Svg_Attributes$widths = _elm_lang$virtual_dom$VirtualDom$attribute('widths');
var _elm_lang$svg$Svg_Attributes$width = _elm_lang$virtual_dom$VirtualDom$attribute('width');
var _elm_lang$svg$Svg_Attributes$viewTarget = _elm_lang$virtual_dom$VirtualDom$attribute('viewTarget');
var _elm_lang$svg$Svg_Attributes$viewBox = _elm_lang$virtual_dom$VirtualDom$attribute('viewBox');
var _elm_lang$svg$Svg_Attributes$vertOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-y');
var _elm_lang$svg$Svg_Attributes$vertOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('vert-origin-x');
var _elm_lang$svg$Svg_Attributes$vertAdvY = _elm_lang$virtual_dom$VirtualDom$attribute('vert-adv-y');
var _elm_lang$svg$Svg_Attributes$version = _elm_lang$virtual_dom$VirtualDom$attribute('version');
var _elm_lang$svg$Svg_Attributes$values = _elm_lang$virtual_dom$VirtualDom$attribute('values');
var _elm_lang$svg$Svg_Attributes$vMathematical = _elm_lang$virtual_dom$VirtualDom$attribute('v-mathematical');
var _elm_lang$svg$Svg_Attributes$vIdeographic = _elm_lang$virtual_dom$VirtualDom$attribute('v-ideographic');
var _elm_lang$svg$Svg_Attributes$vHanging = _elm_lang$virtual_dom$VirtualDom$attribute('v-hanging');
var _elm_lang$svg$Svg_Attributes$vAlphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('v-alphabetic');
var _elm_lang$svg$Svg_Attributes$unitsPerEm = _elm_lang$virtual_dom$VirtualDom$attribute('units-per-em');
var _elm_lang$svg$Svg_Attributes$unicodeRange = _elm_lang$virtual_dom$VirtualDom$attribute('unicode-range');
var _elm_lang$svg$Svg_Attributes$unicode = _elm_lang$virtual_dom$VirtualDom$attribute('unicode');
var _elm_lang$svg$Svg_Attributes$underlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('underline-thickness');
var _elm_lang$svg$Svg_Attributes$underlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('underline-position');
var _elm_lang$svg$Svg_Attributes$u2 = _elm_lang$virtual_dom$VirtualDom$attribute('u2');
var _elm_lang$svg$Svg_Attributes$u1 = _elm_lang$virtual_dom$VirtualDom$attribute('u1');
var _elm_lang$svg$Svg_Attributes$type$ = _elm_lang$virtual_dom$VirtualDom$attribute('type');
var _elm_lang$svg$Svg_Attributes$transform = _elm_lang$virtual_dom$VirtualDom$attribute('transform');
var _elm_lang$svg$Svg_Attributes$to = _elm_lang$virtual_dom$VirtualDom$attribute('to');
var _elm_lang$svg$Svg_Attributes$title = _elm_lang$virtual_dom$VirtualDom$attribute('title');
var _elm_lang$svg$Svg_Attributes$textLength = _elm_lang$virtual_dom$VirtualDom$attribute('textLength');
var _elm_lang$svg$Svg_Attributes$targetY = _elm_lang$virtual_dom$VirtualDom$attribute('targetY');
var _elm_lang$svg$Svg_Attributes$targetX = _elm_lang$virtual_dom$VirtualDom$attribute('targetX');
var _elm_lang$svg$Svg_Attributes$target = _elm_lang$virtual_dom$VirtualDom$attribute('target');
var _elm_lang$svg$Svg_Attributes$tableValues = _elm_lang$virtual_dom$VirtualDom$attribute('tableValues');
var _elm_lang$svg$Svg_Attributes$systemLanguage = _elm_lang$virtual_dom$VirtualDom$attribute('systemLanguage');
var _elm_lang$svg$Svg_Attributes$surfaceScale = _elm_lang$virtual_dom$VirtualDom$attribute('surfaceScale');
var _elm_lang$svg$Svg_Attributes$style = _elm_lang$virtual_dom$VirtualDom$attribute('style');
var _elm_lang$svg$Svg_Attributes$string = _elm_lang$virtual_dom$VirtualDom$attribute('string');
var _elm_lang$svg$Svg_Attributes$strikethroughThickness = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-thickness');
var _elm_lang$svg$Svg_Attributes$strikethroughPosition = _elm_lang$virtual_dom$VirtualDom$attribute('strikethrough-position');
var _elm_lang$svg$Svg_Attributes$stitchTiles = _elm_lang$virtual_dom$VirtualDom$attribute('stitchTiles');
var _elm_lang$svg$Svg_Attributes$stemv = _elm_lang$virtual_dom$VirtualDom$attribute('stemv');
var _elm_lang$svg$Svg_Attributes$stemh = _elm_lang$virtual_dom$VirtualDom$attribute('stemh');
var _elm_lang$svg$Svg_Attributes$stdDeviation = _elm_lang$virtual_dom$VirtualDom$attribute('stdDeviation');
var _elm_lang$svg$Svg_Attributes$startOffset = _elm_lang$virtual_dom$VirtualDom$attribute('startOffset');
var _elm_lang$svg$Svg_Attributes$spreadMethod = _elm_lang$virtual_dom$VirtualDom$attribute('spreadMethod');
var _elm_lang$svg$Svg_Attributes$speed = _elm_lang$virtual_dom$VirtualDom$attribute('speed');
var _elm_lang$svg$Svg_Attributes$specularExponent = _elm_lang$virtual_dom$VirtualDom$attribute('specularExponent');
var _elm_lang$svg$Svg_Attributes$specularConstant = _elm_lang$virtual_dom$VirtualDom$attribute('specularConstant');
var _elm_lang$svg$Svg_Attributes$spacing = _elm_lang$virtual_dom$VirtualDom$attribute('spacing');
var _elm_lang$svg$Svg_Attributes$slope = _elm_lang$virtual_dom$VirtualDom$attribute('slope');
var _elm_lang$svg$Svg_Attributes$seed = _elm_lang$virtual_dom$VirtualDom$attribute('seed');
var _elm_lang$svg$Svg_Attributes$scale = _elm_lang$virtual_dom$VirtualDom$attribute('scale');
var _elm_lang$svg$Svg_Attributes$ry = _elm_lang$virtual_dom$VirtualDom$attribute('ry');
var _elm_lang$svg$Svg_Attributes$rx = _elm_lang$virtual_dom$VirtualDom$attribute('rx');
var _elm_lang$svg$Svg_Attributes$rotate = _elm_lang$virtual_dom$VirtualDom$attribute('rotate');
var _elm_lang$svg$Svg_Attributes$result = _elm_lang$virtual_dom$VirtualDom$attribute('result');
var _elm_lang$svg$Svg_Attributes$restart = _elm_lang$virtual_dom$VirtualDom$attribute('restart');
var _elm_lang$svg$Svg_Attributes$requiredFeatures = _elm_lang$virtual_dom$VirtualDom$attribute('requiredFeatures');
var _elm_lang$svg$Svg_Attributes$requiredExtensions = _elm_lang$virtual_dom$VirtualDom$attribute('requiredExtensions');
var _elm_lang$svg$Svg_Attributes$repeatDur = _elm_lang$virtual_dom$VirtualDom$attribute('repeatDur');
var _elm_lang$svg$Svg_Attributes$repeatCount = _elm_lang$virtual_dom$VirtualDom$attribute('repeatCount');
var _elm_lang$svg$Svg_Attributes$renderingIntent = _elm_lang$virtual_dom$VirtualDom$attribute('rendering-intent');
var _elm_lang$svg$Svg_Attributes$refY = _elm_lang$virtual_dom$VirtualDom$attribute('refY');
var _elm_lang$svg$Svg_Attributes$refX = _elm_lang$virtual_dom$VirtualDom$attribute('refX');
var _elm_lang$svg$Svg_Attributes$radius = _elm_lang$virtual_dom$VirtualDom$attribute('radius');
var _elm_lang$svg$Svg_Attributes$r = _elm_lang$virtual_dom$VirtualDom$attribute('r');
var _elm_lang$svg$Svg_Attributes$primitiveUnits = _elm_lang$virtual_dom$VirtualDom$attribute('primitiveUnits');
var _elm_lang$svg$Svg_Attributes$preserveAspectRatio = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAspectRatio');
var _elm_lang$svg$Svg_Attributes$preserveAlpha = _elm_lang$virtual_dom$VirtualDom$attribute('preserveAlpha');
var _elm_lang$svg$Svg_Attributes$pointsAtZ = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtZ');
var _elm_lang$svg$Svg_Attributes$pointsAtY = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtY');
var _elm_lang$svg$Svg_Attributes$pointsAtX = _elm_lang$virtual_dom$VirtualDom$attribute('pointsAtX');
var _elm_lang$svg$Svg_Attributes$points = _elm_lang$virtual_dom$VirtualDom$attribute('points');
var _elm_lang$svg$Svg_Attributes$pointOrder = _elm_lang$virtual_dom$VirtualDom$attribute('point-order');
var _elm_lang$svg$Svg_Attributes$patternUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternUnits');
var _elm_lang$svg$Svg_Attributes$patternTransform = _elm_lang$virtual_dom$VirtualDom$attribute('patternTransform');
var _elm_lang$svg$Svg_Attributes$patternContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('patternContentUnits');
var _elm_lang$svg$Svg_Attributes$pathLength = _elm_lang$virtual_dom$VirtualDom$attribute('pathLength');
var _elm_lang$svg$Svg_Attributes$path = _elm_lang$virtual_dom$VirtualDom$attribute('path');
var _elm_lang$svg$Svg_Attributes$panose1 = _elm_lang$virtual_dom$VirtualDom$attribute('panose-1');
var _elm_lang$svg$Svg_Attributes$overlineThickness = _elm_lang$virtual_dom$VirtualDom$attribute('overline-thickness');
var _elm_lang$svg$Svg_Attributes$overlinePosition = _elm_lang$virtual_dom$VirtualDom$attribute('overline-position');
var _elm_lang$svg$Svg_Attributes$origin = _elm_lang$virtual_dom$VirtualDom$attribute('origin');
var _elm_lang$svg$Svg_Attributes$orientation = _elm_lang$virtual_dom$VirtualDom$attribute('orientation');
var _elm_lang$svg$Svg_Attributes$orient = _elm_lang$virtual_dom$VirtualDom$attribute('orient');
var _elm_lang$svg$Svg_Attributes$order = _elm_lang$virtual_dom$VirtualDom$attribute('order');
var _elm_lang$svg$Svg_Attributes$operator = _elm_lang$virtual_dom$VirtualDom$attribute('operator');
var _elm_lang$svg$Svg_Attributes$offset = _elm_lang$virtual_dom$VirtualDom$attribute('offset');
var _elm_lang$svg$Svg_Attributes$numOctaves = _elm_lang$virtual_dom$VirtualDom$attribute('numOctaves');
var _elm_lang$svg$Svg_Attributes$name = _elm_lang$virtual_dom$VirtualDom$attribute('name');
var _elm_lang$svg$Svg_Attributes$mode = _elm_lang$virtual_dom$VirtualDom$attribute('mode');
var _elm_lang$svg$Svg_Attributes$min = _elm_lang$virtual_dom$VirtualDom$attribute('min');
var _elm_lang$svg$Svg_Attributes$method = _elm_lang$virtual_dom$VirtualDom$attribute('method');
var _elm_lang$svg$Svg_Attributes$media = _elm_lang$virtual_dom$VirtualDom$attribute('media');
var _elm_lang$svg$Svg_Attributes$max = _elm_lang$virtual_dom$VirtualDom$attribute('max');
var _elm_lang$svg$Svg_Attributes$mathematical = _elm_lang$virtual_dom$VirtualDom$attribute('mathematical');
var _elm_lang$svg$Svg_Attributes$maskUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskUnits');
var _elm_lang$svg$Svg_Attributes$maskContentUnits = _elm_lang$virtual_dom$VirtualDom$attribute('maskContentUnits');
var _elm_lang$svg$Svg_Attributes$markerWidth = _elm_lang$virtual_dom$VirtualDom$attribute('markerWidth');
var _elm_lang$svg$Svg_Attributes$markerUnits = _elm_lang$virtual_dom$VirtualDom$attribute('markerUnits');
var _elm_lang$svg$Svg_Attributes$markerHeight = _elm_lang$virtual_dom$VirtualDom$attribute('markerHeight');
var _elm_lang$svg$Svg_Attributes$local = _elm_lang$virtual_dom$VirtualDom$attribute('local');
var _elm_lang$svg$Svg_Attributes$limitingConeAngle = _elm_lang$virtual_dom$VirtualDom$attribute('limitingConeAngle');
var _elm_lang$svg$Svg_Attributes$lengthAdjust = _elm_lang$virtual_dom$VirtualDom$attribute('lengthAdjust');
var _elm_lang$svg$Svg_Attributes$lang = _elm_lang$virtual_dom$VirtualDom$attribute('lang');
var _elm_lang$svg$Svg_Attributes$keyTimes = _elm_lang$virtual_dom$VirtualDom$attribute('keyTimes');
var _elm_lang$svg$Svg_Attributes$keySplines = _elm_lang$virtual_dom$VirtualDom$attribute('keySplines');
var _elm_lang$svg$Svg_Attributes$keyPoints = _elm_lang$virtual_dom$VirtualDom$attribute('keyPoints');
var _elm_lang$svg$Svg_Attributes$kernelUnitLength = _elm_lang$virtual_dom$VirtualDom$attribute('kernelUnitLength');
var _elm_lang$svg$Svg_Attributes$kernelMatrix = _elm_lang$virtual_dom$VirtualDom$attribute('kernelMatrix');
var _elm_lang$svg$Svg_Attributes$k4 = _elm_lang$virtual_dom$VirtualDom$attribute('k4');
var _elm_lang$svg$Svg_Attributes$k3 = _elm_lang$virtual_dom$VirtualDom$attribute('k3');
var _elm_lang$svg$Svg_Attributes$k2 = _elm_lang$virtual_dom$VirtualDom$attribute('k2');
var _elm_lang$svg$Svg_Attributes$k1 = _elm_lang$virtual_dom$VirtualDom$attribute('k1');
var _elm_lang$svg$Svg_Attributes$k = _elm_lang$virtual_dom$VirtualDom$attribute('k');
var _elm_lang$svg$Svg_Attributes$intercept = _elm_lang$virtual_dom$VirtualDom$attribute('intercept');
var _elm_lang$svg$Svg_Attributes$in2 = _elm_lang$virtual_dom$VirtualDom$attribute('in2');
var _elm_lang$svg$Svg_Attributes$in$ = _elm_lang$virtual_dom$VirtualDom$attribute('in');
var _elm_lang$svg$Svg_Attributes$ideographic = _elm_lang$virtual_dom$VirtualDom$attribute('ideographic');
var _elm_lang$svg$Svg_Attributes$id = _elm_lang$virtual_dom$VirtualDom$attribute('id');
var _elm_lang$svg$Svg_Attributes$horizOriginY = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-y');
var _elm_lang$svg$Svg_Attributes$horizOriginX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-origin-x');
var _elm_lang$svg$Svg_Attributes$horizAdvX = _elm_lang$virtual_dom$VirtualDom$attribute('horiz-adv-x');
var _elm_lang$svg$Svg_Attributes$height = _elm_lang$virtual_dom$VirtualDom$attribute('height');
var _elm_lang$svg$Svg_Attributes$hanging = _elm_lang$virtual_dom$VirtualDom$attribute('hanging');
var _elm_lang$svg$Svg_Attributes$gradientUnits = _elm_lang$virtual_dom$VirtualDom$attribute('gradientUnits');
var _elm_lang$svg$Svg_Attributes$gradientTransform = _elm_lang$virtual_dom$VirtualDom$attribute('gradientTransform');
var _elm_lang$svg$Svg_Attributes$glyphRef = _elm_lang$virtual_dom$VirtualDom$attribute('glyphRef');
var _elm_lang$svg$Svg_Attributes$glyphName = _elm_lang$virtual_dom$VirtualDom$attribute('glyph-name');
var _elm_lang$svg$Svg_Attributes$g2 = _elm_lang$virtual_dom$VirtualDom$attribute('g2');
var _elm_lang$svg$Svg_Attributes$g1 = _elm_lang$virtual_dom$VirtualDom$attribute('g1');
var _elm_lang$svg$Svg_Attributes$fy = _elm_lang$virtual_dom$VirtualDom$attribute('fy');
var _elm_lang$svg$Svg_Attributes$fx = _elm_lang$virtual_dom$VirtualDom$attribute('fx');
var _elm_lang$svg$Svg_Attributes$from = _elm_lang$virtual_dom$VirtualDom$attribute('from');
var _elm_lang$svg$Svg_Attributes$format = _elm_lang$virtual_dom$VirtualDom$attribute('format');
var _elm_lang$svg$Svg_Attributes$filterUnits = _elm_lang$virtual_dom$VirtualDom$attribute('filterUnits');
var _elm_lang$svg$Svg_Attributes$filterRes = _elm_lang$virtual_dom$VirtualDom$attribute('filterRes');
var _elm_lang$svg$Svg_Attributes$externalResourcesRequired = _elm_lang$virtual_dom$VirtualDom$attribute('externalResourcesRequired');
var _elm_lang$svg$Svg_Attributes$exponent = _elm_lang$virtual_dom$VirtualDom$attribute('exponent');
var _elm_lang$svg$Svg_Attributes$end = _elm_lang$virtual_dom$VirtualDom$attribute('end');
var _elm_lang$svg$Svg_Attributes$elevation = _elm_lang$virtual_dom$VirtualDom$attribute('elevation');
var _elm_lang$svg$Svg_Attributes$edgeMode = _elm_lang$virtual_dom$VirtualDom$attribute('edgeMode');
var _elm_lang$svg$Svg_Attributes$dy = _elm_lang$virtual_dom$VirtualDom$attribute('dy');
var _elm_lang$svg$Svg_Attributes$dx = _elm_lang$virtual_dom$VirtualDom$attribute('dx');
var _elm_lang$svg$Svg_Attributes$dur = _elm_lang$virtual_dom$VirtualDom$attribute('dur');
var _elm_lang$svg$Svg_Attributes$divisor = _elm_lang$virtual_dom$VirtualDom$attribute('divisor');
var _elm_lang$svg$Svg_Attributes$diffuseConstant = _elm_lang$virtual_dom$VirtualDom$attribute('diffuseConstant');
var _elm_lang$svg$Svg_Attributes$descent = _elm_lang$virtual_dom$VirtualDom$attribute('descent');
var _elm_lang$svg$Svg_Attributes$decelerate = _elm_lang$virtual_dom$VirtualDom$attribute('decelerate');
var _elm_lang$svg$Svg_Attributes$d = _elm_lang$virtual_dom$VirtualDom$attribute('d');
var _elm_lang$svg$Svg_Attributes$cy = _elm_lang$virtual_dom$VirtualDom$attribute('cy');
var _elm_lang$svg$Svg_Attributes$cx = _elm_lang$virtual_dom$VirtualDom$attribute('cx');
var _elm_lang$svg$Svg_Attributes$contentStyleType = _elm_lang$virtual_dom$VirtualDom$attribute('contentStyleType');
var _elm_lang$svg$Svg_Attributes$contentScriptType = _elm_lang$virtual_dom$VirtualDom$attribute('contentScriptType');
var _elm_lang$svg$Svg_Attributes$clipPathUnits = _elm_lang$virtual_dom$VirtualDom$attribute('clipPathUnits');
var _elm_lang$svg$Svg_Attributes$class = _elm_lang$virtual_dom$VirtualDom$attribute('class');
var _elm_lang$svg$Svg_Attributes$capHeight = _elm_lang$virtual_dom$VirtualDom$attribute('cap-height');
var _elm_lang$svg$Svg_Attributes$calcMode = _elm_lang$virtual_dom$VirtualDom$attribute('calcMode');
var _elm_lang$svg$Svg_Attributes$by = _elm_lang$virtual_dom$VirtualDom$attribute('by');
var _elm_lang$svg$Svg_Attributes$bias = _elm_lang$virtual_dom$VirtualDom$attribute('bias');
var _elm_lang$svg$Svg_Attributes$begin = _elm_lang$virtual_dom$VirtualDom$attribute('begin');
var _elm_lang$svg$Svg_Attributes$bbox = _elm_lang$virtual_dom$VirtualDom$attribute('bbox');
var _elm_lang$svg$Svg_Attributes$baseProfile = _elm_lang$virtual_dom$VirtualDom$attribute('baseProfile');
var _elm_lang$svg$Svg_Attributes$baseFrequency = _elm_lang$virtual_dom$VirtualDom$attribute('baseFrequency');
var _elm_lang$svg$Svg_Attributes$azimuth = _elm_lang$virtual_dom$VirtualDom$attribute('azimuth');
var _elm_lang$svg$Svg_Attributes$autoReverse = _elm_lang$virtual_dom$VirtualDom$attribute('autoReverse');
var _elm_lang$svg$Svg_Attributes$attributeType = _elm_lang$virtual_dom$VirtualDom$attribute('attributeType');
var _elm_lang$svg$Svg_Attributes$attributeName = _elm_lang$virtual_dom$VirtualDom$attribute('attributeName');
var _elm_lang$svg$Svg_Attributes$ascent = _elm_lang$virtual_dom$VirtualDom$attribute('ascent');
var _elm_lang$svg$Svg_Attributes$arabicForm = _elm_lang$virtual_dom$VirtualDom$attribute('arabic-form');
var _elm_lang$svg$Svg_Attributes$amplitude = _elm_lang$virtual_dom$VirtualDom$attribute('amplitude');
var _elm_lang$svg$Svg_Attributes$allowReorder = _elm_lang$virtual_dom$VirtualDom$attribute('allowReorder');
var _elm_lang$svg$Svg_Attributes$alphabetic = _elm_lang$virtual_dom$VirtualDom$attribute('alphabetic');
var _elm_lang$svg$Svg_Attributes$additive = _elm_lang$virtual_dom$VirtualDom$attribute('additive');
var _elm_lang$svg$Svg_Attributes$accumulate = _elm_lang$virtual_dom$VirtualDom$attribute('accumulate');
var _elm_lang$svg$Svg_Attributes$accelerate = _elm_lang$virtual_dom$VirtualDom$attribute('accelerate');
var _elm_lang$svg$Svg_Attributes$accentHeight = _elm_lang$virtual_dom$VirtualDom$attribute('accent-height');

var _elm_lang$core$Color$fmod = F2(
	function (f, n) {
		var integer = _elm_lang$core$Basics$floor(f);
		return (_elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics_ops['%'], integer, n)) + f) - _elm_lang$core$Basics$toFloat(integer);
	});
var _elm_lang$core$Color$rgbToHsl = F3(
	function (red, green, blue) {
		var b = _elm_lang$core$Basics$toFloat(blue) / 255;
		var g = _elm_lang$core$Basics$toFloat(green) / 255;
		var r = _elm_lang$core$Basics$toFloat(red) / 255;
		var cMax = A2(
			_elm_lang$core$Basics$max,
			A2(_elm_lang$core$Basics$max, r, g),
			b);
		var cMin = A2(
			_elm_lang$core$Basics$min,
			A2(_elm_lang$core$Basics$min, r, g),
			b);
		var c = cMax - cMin;
		var lightness = (cMax + cMin) / 2;
		var saturation = _elm_lang$core$Native_Utils.eq(lightness, 0) ? 0 : (c / (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)));
		var hue = _elm_lang$core$Basics$degrees(60) * (_elm_lang$core$Native_Utils.eq(cMax, r) ? A2(_elm_lang$core$Color$fmod, (g - b) / c, 6) : (_elm_lang$core$Native_Utils.eq(cMax, g) ? (((b - r) / c) + 2) : (((r - g) / c) + 4)));
		return {ctor: '_Tuple3', _0: hue, _1: saturation, _2: lightness};
	});
var _elm_lang$core$Color$hslToRgb = F3(
	function (hue, saturation, lightness) {
		var hue$ = hue / _elm_lang$core$Basics$degrees(60);
		var chroma = (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)) * saturation;
		var x = chroma * (1 - _elm_lang$core$Basics$abs(
			A2(_elm_lang$core$Color$fmod, hue$, 2) - 1));
		var _p0 = (_elm_lang$core$Native_Utils.cmp(hue$, 0) < 0) ? {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(hue$, 1) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: x, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(hue$, 2) < 0) ? {ctor: '_Tuple3', _0: x, _1: chroma, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(hue$, 3) < 0) ? {ctor: '_Tuple3', _0: 0, _1: chroma, _2: x} : ((_elm_lang$core$Native_Utils.cmp(hue$, 4) < 0) ? {ctor: '_Tuple3', _0: 0, _1: x, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(hue$, 5) < 0) ? {ctor: '_Tuple3', _0: x, _1: 0, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(hue$, 6) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: 0, _2: x} : {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0}))))));
		var r = _p0._0;
		var g = _p0._1;
		var b = _p0._2;
		var m = lightness - (chroma / 2);
		return {ctor: '_Tuple3', _0: r + m, _1: g + m, _2: b + m};
	});
var _elm_lang$core$Color$toRgb = function (color) {
	var _p1 = color;
	if (_p1.ctor === 'RGBA') {
		return {red: _p1._0, green: _p1._1, blue: _p1._2, alpha: _p1._3};
	} else {
		var _p2 = A3(_elm_lang$core$Color$hslToRgb, _p1._0, _p1._1, _p1._2);
		var r = _p2._0;
		var g = _p2._1;
		var b = _p2._2;
		return {
			red: _elm_lang$core$Basics$round(255 * r),
			green: _elm_lang$core$Basics$round(255 * g),
			blue: _elm_lang$core$Basics$round(255 * b),
			alpha: _p1._3
		};
	}
};
var _elm_lang$core$Color$toHsl = function (color) {
	var _p3 = color;
	if (_p3.ctor === 'HSLA') {
		return {hue: _p3._0, saturation: _p3._1, lightness: _p3._2, alpha: _p3._3};
	} else {
		var _p4 = A3(_elm_lang$core$Color$rgbToHsl, _p3._0, _p3._1, _p3._2);
		var h = _p4._0;
		var s = _p4._1;
		var l = _p4._2;
		return {hue: h, saturation: s, lightness: l, alpha: _p3._3};
	}
};
var _elm_lang$core$Color$HSLA = F4(
	function (a, b, c, d) {
		return {ctor: 'HSLA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$hsla = F4(
	function (hue, saturation, lightness, alpha) {
		return A4(
			_elm_lang$core$Color$HSLA,
			hue - _elm_lang$core$Basics$turns(
				_elm_lang$core$Basics$toFloat(
					_elm_lang$core$Basics$floor(hue / (2 * _elm_lang$core$Basics$pi)))),
			saturation,
			lightness,
			alpha);
	});
var _elm_lang$core$Color$hsl = F3(
	function (hue, saturation, lightness) {
		return A4(_elm_lang$core$Color$hsla, hue, saturation, lightness, 1);
	});
var _elm_lang$core$Color$complement = function (color) {
	var _p5 = color;
	if (_p5.ctor === 'HSLA') {
		return A4(
			_elm_lang$core$Color$hsla,
			_p5._0 + _elm_lang$core$Basics$degrees(180),
			_p5._1,
			_p5._2,
			_p5._3);
	} else {
		var _p6 = A3(_elm_lang$core$Color$rgbToHsl, _p5._0, _p5._1, _p5._2);
		var h = _p6._0;
		var s = _p6._1;
		var l = _p6._2;
		return A4(
			_elm_lang$core$Color$hsla,
			h + _elm_lang$core$Basics$degrees(180),
			s,
			l,
			_p5._3);
	}
};
var _elm_lang$core$Color$grayscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$greyscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$RGBA = F4(
	function (a, b, c, d) {
		return {ctor: 'RGBA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$rgba = _elm_lang$core$Color$RGBA;
var _elm_lang$core$Color$rgb = F3(
	function (r, g, b) {
		return A4(_elm_lang$core$Color$RGBA, r, g, b, 1);
	});
var _elm_lang$core$Color$lightRed = A4(_elm_lang$core$Color$RGBA, 239, 41, 41, 1);
var _elm_lang$core$Color$red = A4(_elm_lang$core$Color$RGBA, 204, 0, 0, 1);
var _elm_lang$core$Color$darkRed = A4(_elm_lang$core$Color$RGBA, 164, 0, 0, 1);
var _elm_lang$core$Color$lightOrange = A4(_elm_lang$core$Color$RGBA, 252, 175, 62, 1);
var _elm_lang$core$Color$orange = A4(_elm_lang$core$Color$RGBA, 245, 121, 0, 1);
var _elm_lang$core$Color$darkOrange = A4(_elm_lang$core$Color$RGBA, 206, 92, 0, 1);
var _elm_lang$core$Color$lightYellow = A4(_elm_lang$core$Color$RGBA, 255, 233, 79, 1);
var _elm_lang$core$Color$yellow = A4(_elm_lang$core$Color$RGBA, 237, 212, 0, 1);
var _elm_lang$core$Color$darkYellow = A4(_elm_lang$core$Color$RGBA, 196, 160, 0, 1);
var _elm_lang$core$Color$lightGreen = A4(_elm_lang$core$Color$RGBA, 138, 226, 52, 1);
var _elm_lang$core$Color$green = A4(_elm_lang$core$Color$RGBA, 115, 210, 22, 1);
var _elm_lang$core$Color$darkGreen = A4(_elm_lang$core$Color$RGBA, 78, 154, 6, 1);
var _elm_lang$core$Color$lightBlue = A4(_elm_lang$core$Color$RGBA, 114, 159, 207, 1);
var _elm_lang$core$Color$blue = A4(_elm_lang$core$Color$RGBA, 52, 101, 164, 1);
var _elm_lang$core$Color$darkBlue = A4(_elm_lang$core$Color$RGBA, 32, 74, 135, 1);
var _elm_lang$core$Color$lightPurple = A4(_elm_lang$core$Color$RGBA, 173, 127, 168, 1);
var _elm_lang$core$Color$purple = A4(_elm_lang$core$Color$RGBA, 117, 80, 123, 1);
var _elm_lang$core$Color$darkPurple = A4(_elm_lang$core$Color$RGBA, 92, 53, 102, 1);
var _elm_lang$core$Color$lightBrown = A4(_elm_lang$core$Color$RGBA, 233, 185, 110, 1);
var _elm_lang$core$Color$brown = A4(_elm_lang$core$Color$RGBA, 193, 125, 17, 1);
var _elm_lang$core$Color$darkBrown = A4(_elm_lang$core$Color$RGBA, 143, 89, 2, 1);
var _elm_lang$core$Color$black = A4(_elm_lang$core$Color$RGBA, 0, 0, 0, 1);
var _elm_lang$core$Color$white = A4(_elm_lang$core$Color$RGBA, 255, 255, 255, 1);
var _elm_lang$core$Color$lightGrey = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$grey = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGrey = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightGray = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$gray = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGray = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightCharcoal = A4(_elm_lang$core$Color$RGBA, 136, 138, 133, 1);
var _elm_lang$core$Color$charcoal = A4(_elm_lang$core$Color$RGBA, 85, 87, 83, 1);
var _elm_lang$core$Color$darkCharcoal = A4(_elm_lang$core$Color$RGBA, 46, 52, 54, 1);
var _elm_lang$core$Color$Radial = F5(
	function (a, b, c, d, e) {
		return {ctor: 'Radial', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Color$radial = _elm_lang$core$Color$Radial;
var _elm_lang$core$Color$Linear = F3(
	function (a, b, c) {
		return {ctor: 'Linear', _0: a, _1: b, _2: c};
	});
var _elm_lang$core$Color$linear = _elm_lang$core$Color$Linear;

var _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString = function (color) {
	var _p0 = _elm_lang$core$Color$toRgb(color);
	var red = _p0.red;
	var green = _p0.green;
	var blue = _p0.blue;
	var alpha = _p0.alpha;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'rgba(',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(red),
			A2(
				_elm_lang$core$Basics_ops['++'],
				',',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(green),
					A2(
						_elm_lang$core$Basics_ops['++'],
						',',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(blue),
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(alpha),
									')'))))))));
};
var _elm_community$elm_material_icons$Material_Icons_Internal$icon = F3(
	function (path, color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d(path),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});

var _elm_community$elm_material_icons$Material_Icons_Action$zoom_out = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z');
var _elm_community$elm_material_icons$Material_Icons_Action$zoom_in = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z');
var _elm_community$elm_material_icons$Material_Icons_Action$youtube_searched_for = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z');
var _elm_community$elm_material_icons$Material_Icons_Action$work = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$visibility_off = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z');
var _elm_community$elm_material_icons$Material_Icons_Action$visibility = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_week = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_stream = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 18h17v-6H4v6zM4 5v6h17V5H4z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_quilt = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_module = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_list = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_headline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_day = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_column = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_carousel = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_array = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z');
var _elm_community$elm_material_icons$Material_Icons_Action$view_agenda = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z');
var _elm_community$elm_material_icons$Material_Icons_Action$verified_user = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Action$turned_in_not = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z');
var _elm_community$elm_material_icons$Material_Icons_Action$turned_in = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$trending_up = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z');
var _elm_community$elm_material_icons$Material_Icons_Action$trending_flat = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M22 12l-4-4v3H3v2h15v3z');
var _elm_community$elm_material_icons$Material_Icons_Action$trending_down = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z');
var _elm_community$elm_material_icons$Material_Icons_Action$translate = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z');
var _elm_community$elm_material_icons$Material_Icons_Action$track_changes = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z');
var _elm_community$elm_material_icons$Material_Icons_Action$toll = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z');
var _elm_community$elm_material_icons$Material_Icons_Action$today = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z');
var _elm_community$elm_material_icons$Material_Icons_Action$toc = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$thumps_up_down = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$thumb_up = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z');
var _elm_community$elm_material_icons$Material_Icons_Action$thumb_down = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z');
var _elm_community$elm_material_icons$Material_Icons_Action$theaters = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$tab_unselected = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$tab = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z');
var _elm_community$elm_material_icons$Material_Icons_Action$system_update_alt = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$swap_vertical_circle = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$swap_vert = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z');
var _elm_community$elm_material_icons$Material_Icons_Action$swap_horiz = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z');
var _elm_community$elm_material_icons$Material_Icons_Action$supervisor_account = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z');
var _elm_community$elm_material_icons$Material_Icons_Action$subject = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z');
var _elm_community$elm_material_icons$Material_Icons_Action$store = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z');
var _elm_community$elm_material_icons$Material_Icons_Action$stars = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z');
var _elm_community$elm_material_icons$Material_Icons_Action$star_rate = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 18 18')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$spellcheck = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z');
var _elm_community$elm_material_icons$Material_Icons_Action$speaker_notes = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$shopping_cart = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$shopping_basket = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z');
var _elm_community$elm_material_icons$Material_Icons_Action$shop_two = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z');
var _elm_community$elm_material_icons$Material_Icons_Action$shop = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_voice = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_remote = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_power = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_phone = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_overscan = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_input_svideo = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_input_hdmi = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_input_composite = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_input_component = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_input_antenna = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_ethernet = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_cell = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_brightness = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_bluetooth = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_backup_restore = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings_application = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z');
var _elm_community$elm_material_icons$Material_Icons_Action$settings = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$search = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z');
var _elm_community$elm_material_icons$Material_Icons_Action$schedule = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$fillOpacity('.9'),
							_elm_lang$svg$Svg_Attributes$d('M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$room = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$restore = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z');
var _elm_community$elm_material_icons$Material_Icons_Action$report_problem = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z');
var _elm_community$elm_material_icons$Material_Icons_Action$reorder = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z');
var _elm_community$elm_material_icons$Material_Icons_Action$redeem = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z');
var _elm_community$elm_material_icons$Material_Icons_Action$receipt = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z');
var _elm_community$elm_material_icons$Material_Icons_Action$question_answer = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z');
var _elm_community$elm_material_icons$Material_Icons_Action$query_builder = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z');
var _elm_community$elm_material_icons$Material_Icons_Action$print = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z');
var _elm_community$elm_material_icons$Material_Icons_Action$power_settings_new = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z');
var _elm_community$elm_material_icons$Material_Icons_Action$polymer = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z');
var _elm_community$elm_material_icons$Material_Icons_Action$play_for_work = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z');
var _elm_community$elm_material_icons$Material_Icons_Action$picture_in_picture = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_scan_wifi = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_phone_msg = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_media = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_identity = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_device_information = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_data_setting = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_contact_calendar = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z');
var _elm_community$elm_material_icons$Material_Icons_Action$perm_camera_mic = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z');
var _elm_community$elm_material_icons$Material_Icons_Action$payment = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$pageview = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z');
var _elm_community$elm_material_icons$Material_Icons_Action$open_with = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z');
var _elm_community$elm_material_icons$Material_Icons_Action$open_in_new = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z');
var _elm_community$elm_material_icons$Material_Icons_Action$open_in_browser = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z');
var _elm_community$elm_material_icons$Material_Icons_Action$offline_pin = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$note_add = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z');
var _elm_community$elm_material_icons$Material_Icons_Action$markunread_mailbox = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$loyalty = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z');
var _elm_community$elm_material_icons$Material_Icons_Action$lock_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-5.1c1.71 0 3.1 1.39 3.1 3.1v2H9V6h-.1c0-1.71 1.39-3.1 3.1-3.1zM18 20H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z');
var _elm_community$elm_material_icons$Material_Icons_Action$lock_open = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z');
var _elm_community$elm_material_icons$Material_Icons_Action$lock = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$list = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z');
var _elm_community$elm_material_icons$Material_Icons_Action$launch = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z');
var _elm_community$elm_material_icons$Material_Icons_Action$language = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z');
var _elm_community$elm_material_icons$Material_Icons_Action$label_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z');
var _elm_community$elm_material_icons$Material_Icons_Action$label = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z');
var _elm_community$elm_material_icons$Material_Icons_Action$invert_colors = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z');
var _elm_community$elm_material_icons$Material_Icons_Action$input = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z');
var _elm_community$elm_material_icons$Material_Icons_Action$info_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$info = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$https = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$http = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z');
var _elm_community$elm_material_icons$Material_Icons_Action$hourglass_full = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z');
var _elm_community$elm_material_icons$Material_Icons_Action$hourglass_empty = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z');
var _elm_community$elm_material_icons$Material_Icons_Action$home = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z');
var _elm_community$elm_material_icons$Material_Icons_Action$history = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$opacity('.9'),
							_elm_lang$svg$Svg_Attributes$d('M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$highlight_off = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Action$help_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z');
var _elm_community$elm_material_icons$Material_Icons_Action$help = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z');
var _elm_community$elm_material_icons$Material_Icons_Action$group_work = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$grade = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z');
var _elm_community$elm_material_icons$Material_Icons_Action$gif = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M24 24H0V0h24v24z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$get_app = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z');
var _elm_community$elm_material_icons$Material_Icons_Action$flip_to_front = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$flip_to_back = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$flight_takeoff = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$flight_land = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('c'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('d'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#c'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#d)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$find_replace = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z');
var _elm_community$elm_material_icons$Material_Icons_Action$find_in_page = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z');
var _elm_community$elm_material_icons$Material_Icons_Action$feedback = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z');
var _elm_community$elm_material_icons$Material_Icons_Action$favorite_border = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z');
var _elm_community$elm_material_icons$Material_Icons_Action$favorite = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
var _elm_community$elm_material_icons$Material_Icons_Action$face = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Action$extension = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z');
var _elm_community$elm_material_icons$Material_Icons_Action$explore = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z');
var _elm_community$elm_material_icons$Material_Icons_Action$exit_to_app = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$event_seat = F2(
	function (color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Action$event = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z');
var _elm_community$elm_material_icons$Material_Icons_Action$eject = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M5 17h14v2H5zm7-12L5.33 15h13.34z');
var _elm_community$elm_material_icons$Material_Icons_Action$done_all = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z');
var _elm_community$elm_material_icons$Material_Icons_Action$done = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z');
var _elm_community$elm_material_icons$Material_Icons_Action$dns = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z');
var _elm_community$elm_material_icons$Material_Icons_Action$description = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z');
var _elm_community$elm_material_icons$Material_Icons_Action$delete = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z');
var _elm_community$elm_material_icons$Material_Icons_Action$dashboard = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z');
var _elm_community$elm_material_icons$Material_Icons_Action$credit_card = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$code = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z');
var _elm_community$elm_material_icons$Material_Icons_Action$class = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z');
var _elm_community$elm_material_icons$Material_Icons_Action$chrome_reader_mode = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z');
var _elm_community$elm_material_icons$Material_Icons_Action$check_circle = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z');
var _elm_community$elm_material_icons$Material_Icons_Action$change_history = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z');
var _elm_community$elm_material_icons$Material_Icons_Action$card_travel = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z');
var _elm_community$elm_material_icons$Material_Icons_Action$card_membership = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z');
var _elm_community$elm_material_icons$Material_Icons_Action$card_giftcard = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z');
var _elm_community$elm_material_icons$Material_Icons_Action$camera_enhance = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zM12 17l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z');
var _elm_community$elm_material_icons$Material_Icons_Action$cached = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z');
var _elm_community$elm_material_icons$Material_Icons_Action$build = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z');
var _elm_community$elm_material_icons$Material_Icons_Action$bug_report = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$bookmark_border = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z');
var _elm_community$elm_material_icons$Material_Icons_Action$bookmark = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Action$book = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z');
var _elm_community$elm_material_icons$Material_Icons_Action$backup = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z');
var _elm_community$elm_material_icons$Material_Icons_Action$autorenew = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z');
var _elm_community$elm_material_icons$Material_Icons_Action$assignment_turned_in = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Action$assignment_returned = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z');
var _elm_community$elm_material_icons$Material_Icons_Action$assignment_return = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z');
var _elm_community$elm_material_icons$Material_Icons_Action$assignment_late = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z');
var _elm_community$elm_material_icons$Material_Icons_Action$assignment_ind = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z');
var _elm_community$elm_material_icons$Material_Icons_Action$assignment = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$assessment = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z');
var _elm_community$elm_material_icons$Material_Icons_Action$aspect_ratio = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z');
var _elm_community$elm_material_icons$Material_Icons_Action$announcement = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$android = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z');
var _elm_community$elm_material_icons$Material_Icons_Action$alarm_on = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z');
var _elm_community$elm_material_icons$Material_Icons_Action$alarm_off = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z');
var _elm_community$elm_material_icons$Material_Icons_Action$alarm_add = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z');
var _elm_community$elm_material_icons$Material_Icons_Action$alarm = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z');
var _elm_community$elm_material_icons$Material_Icons_Action$add_shopping_cart = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z');
var _elm_community$elm_material_icons$Material_Icons_Action$account_circle = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z');
var _elm_community$elm_material_icons$Material_Icons_Action$account_box = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z');
var _elm_community$elm_material_icons$Material_Icons_Action$account_balance_with_wallet = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z');
var _elm_community$elm_material_icons$Material_Icons_Action$account_balance = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z');
var _elm_community$elm_material_icons$Material_Icons_Action$accessibility = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z');
var _elm_community$elm_material_icons$Material_Icons_Action$three_d_rotation = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z');

var _elm_community$elm_material_icons$Material_Icons_Av$web = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z');
var _elm_community$elm_material_icons$Material_Icons_Av$volume_up = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z');
var _elm_community$elm_material_icons$Material_Icons_Av$volume_off = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z');
var _elm_community$elm_material_icons$Material_Icons_Av$volume_mute = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 9v6h4l5 5V4l-5 5H7z');
var _elm_community$elm_material_icons$Material_Icons_Av$volume_down = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z');
var _elm_community$elm_material_icons$Material_Icons_Av$videocam_off = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z');
var _elm_community$elm_material_icons$Material_Icons_Av$videocam = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z');
var _elm_community$elm_material_icons$Material_Icons_Av$video_library = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z');
var _elm_community$elm_material_icons$Material_Icons_Av$surround_sound = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.76 16.24l-1.41 1.41C4.78 16.1 4 14.05 4 12c0-2.05.78-4.1 2.34-5.66l1.41 1.41C6.59 8.93 6 10.46 6 12s.59 3.07 1.76 4.24zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.66 1.66l-1.41-1.41C17.41 15.07 18 13.54 18 12s-.59-3.07-1.76-4.24l1.41-1.41C19.22 7.9 20 9.95 20 12c0 2.05-.78 4.1-2.34 5.66zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Av$subtitles = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z');
var _elm_community$elm_material_icons$Material_Icons_Av$stop = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 6h12v12H6z');
var _elm_community$elm_material_icons$Material_Icons_Av$sort_by_alpha = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z');
var _elm_community$elm_material_icons$Material_Icons_Av$snooze = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z');
var _elm_community$elm_material_icons$Material_Icons_Av$skip_previous = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 6h2v12H6zm3.5 6l8.5 6V6z');
var _elm_community$elm_material_icons$Material_Icons_Av$skip_next = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z');
var _elm_community$elm_material_icons$Material_Icons_Av$shuffle = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z');
var _elm_community$elm_material_icons$Material_Icons_Av$replay_5 = F2(
	function (color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.3 8.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.4.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.7z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Av$replay_30 = F2(
	function (color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-2.4 8.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5c0-.1-.1-.2-.1-.3s-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Av$replay = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z');
var _elm_community$elm_material_icons$Material_Icons_Av$replay_10 = F2(
	function (color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.1 11H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1c.2.1.3.2.5.3s.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Av$repeat_one = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z');
var _elm_community$elm_material_icons$Material_Icons_Av$repeat = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z');
var _elm_community$elm_material_icons$Material_Icons_Av$recent_actors = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21 5v14h2V5h-2zm-4 14h2V5h-2v14zM14 5H2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM8 7.75c1.24 0 2.25 1.01 2.25 2.25S9.24 12.25 8 12.25 5.75 11.24 5.75 10 6.76 7.75 8 7.75zM12.5 17h-9v-.75c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V17z');
var _elm_community$elm_material_icons$Material_Icons_Av$radio = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z');
var _elm_community$elm_material_icons$Material_Icons_Av$queue_music = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z');
var _elm_community$elm_material_icons$Material_Icons_Av$queue = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z');
var _elm_community$elm_material_icons$Material_Icons_Av$playlist_add = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z');
var _elm_community$elm_material_icons$Material_Icons_Av$play_circle_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Av$play_circle_filled = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z');
var _elm_community$elm_material_icons$Material_Icons_Av$play_arrow = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M8 5v14l11-7z');
var _elm_community$elm_material_icons$Material_Icons_Av$pause_circle_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z');
var _elm_community$elm_material_icons$Material_Icons_Av$pause_circle_filled = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z');
var _elm_community$elm_material_icons$Material_Icons_Av$pause = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 19h4V5H6v14zm8-14v14h4V5h-4z');
var _elm_community$elm_material_icons$Material_Icons_Av$not_interested = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z');
var _elm_community$elm_material_icons$Material_Icons_Av$new_releases = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z');
var _elm_community$elm_material_icons$Material_Icons_Av$movie = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z');
var _elm_community$elm_material_icons$Material_Icons_Av$mic_off = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z');
var _elm_community$elm_material_icons$Material_Icons_Av$mic_none = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1.2-9.1c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2l-.01 6.2c0 .66-.53 1.2-1.19 1.2-.66 0-1.2-.54-1.2-1.2V4.9zm6.5 6.1c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z');
var _elm_community$elm_material_icons$Material_Icons_Av$mic = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z');
var _elm_community$elm_material_icons$Material_Icons_Av$loop = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z');
var _elm_community$elm_material_icons$Material_Icons_Av$library_music = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z');
var _elm_community$elm_material_icons$Material_Icons_Av$library_books = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z');
var _elm_community$elm_material_icons$Material_Icons_Av$library_add = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z');
var _elm_community$elm_material_icons$Material_Icons_Av$high_quality = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 11H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm7-1c0 .55-.45 1-1 1h-.75v1.5h-1.5V15H14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4zm-3.5-.5h2v-3h-2v3z');
var _elm_community$elm_material_icons$Material_Icons_Av$hearing = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 4-4h-2c0 1.1-.9 2-2 2zM7.64 2.64L6.22 1.22C4.23 3.21 3 5.96 3 9s1.23 5.79 3.22 7.78l1.41-1.41C6.01 13.74 5 11.49 5 9s1.01-4.74 2.64-6.36zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z');
var _elm_community$elm_material_icons$Material_Icons_Av$hd = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z');
var _elm_community$elm_material_icons$Material_Icons_Av$games = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z');
var _elm_community$elm_material_icons$Material_Icons_Av$forward_5 = F2(
	function (color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M24 24H0V0h24v24z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.7.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.5.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.6z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Av$forward_30 = F2(
	function (color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M24 24H0V0h24v24z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M9.6 13.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5zM4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Av$forward_10 = F2(
	function (color, size) {
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		var stringSize = _elm_lang$core$Basics$toString(size);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M24 24H0V0h24v24z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.8 3H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _elm_community$elm_material_icons$Material_Icons_Av$fast_rewind = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z');
var _elm_community$elm_material_icons$Material_Icons_Av$fast_forward = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z');
var _elm_community$elm_material_icons$Material_Icons_Av$explicit = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z');
var _elm_community$elm_material_icons$Material_Icons_Av$equalizer = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z');
var _elm_community$elm_material_icons$Material_Icons_Av$closed_caption = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z');
var _elm_community$elm_material_icons$Material_Icons_Av$av_timer = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z');
var _elm_community$elm_material_icons$Material_Icons_Av$album = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z');
var _elm_community$elm_material_icons$Material_Icons_Av$airplay = F2(
	function (color, size) {
		var stringSize = _elm_lang$core$Basics$toString(size);
		var stringColor = _elm_community$elm_material_icons$Material_Icons_Internal$toRgbaString(color);
		return A2(
			_elm_lang$svg$Svg$svg,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$svg$Svg_Attributes$width(stringSize),
					_elm_lang$svg$Svg_Attributes$height(stringSize),
					_elm_lang$svg$Svg_Attributes$viewBox('0 0 24 24')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('a'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$defs,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$path,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$id('c'),
									_elm_lang$svg$Svg_Attributes$d('M0 0h24v24H0V0z')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('b')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#a'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A3(
					_elm_lang$virtual_dom$VirtualDom$node,
					'clipPath',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$id('d'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#b)')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$svg$Svg$use,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$svg$Svg_Attributes$xlinkHref('#c'),
									_elm_lang$svg$Svg_Attributes$overflow('visible')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						])),
					A2(
					_elm_lang$svg$Svg$path,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$svg$Svg_Attributes$d('M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'),
							_elm_lang$svg$Svg_Attributes$clipPath('url(#d)'),
							_elm_lang$svg$Svg_Attributes$fill(stringColor)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});

var _elm_community$elm_material_icons$Material_Icons_Content$undo = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z');
var _elm_community$elm_material_icons$Material_Icons_Content$text_format = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z');
var _elm_community$elm_material_icons$Material_Icons_Content$sort = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$send = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M2.01 21L23 12 2.01 3 2 10l15 2-15 2z');
var _elm_community$elm_material_icons$Material_Icons_Content$select_all = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z');
var _elm_community$elm_material_icons$Material_Icons_Content$save = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z');
var _elm_community$elm_material_icons$Material_Icons_Content$report = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z');
var _elm_community$elm_material_icons$Material_Icons_Content$reply_all = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z');
var _elm_community$elm_material_icons$Material_Icons_Content$reply = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z');
var _elm_community$elm_material_icons$Material_Icons_Content$remove_circle_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Content$remove_circle = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$remove = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 13H5v-2h14v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$redo = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z');
var _elm_community$elm_material_icons$Material_Icons_Content$markunread = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$mail = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$link = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z');
var _elm_community$elm_material_icons$Material_Icons_Content$inbox = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3H4.99c-1.1 0-1.98.9-1.98 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.34 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z');
var _elm_community$elm_material_icons$Material_Icons_Content$gesture = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z');
var _elm_community$elm_material_icons$Material_Icons_Content$forward = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 8V4l8 8-8 8v-4H4V8z');
var _elm_community$elm_material_icons$Material_Icons_Content$font_download = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z');
var _elm_community$elm_material_icons$Material_Icons_Content$flag = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z');
var _elm_community$elm_material_icons$Material_Icons_Content$filter_list = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$drafts = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z');
var _elm_community$elm_material_icons$Material_Icons_Content$create = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');
var _elm_community$elm_material_icons$Material_Icons_Content$content_paste = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z');
var _elm_community$elm_material_icons$Material_Icons_Content$content_cut = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z');
var _elm_community$elm_material_icons$Material_Icons_Content$content_copy = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z');
var _elm_community$elm_material_icons$Material_Icons_Content$clear = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
var _elm_community$elm_material_icons$Material_Icons_Content$block = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Content$backspace = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z');
var _elm_community$elm_material_icons$Material_Icons_Content$archive = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z');
var _elm_community$elm_material_icons$Material_Icons_Content$add_circle_outline = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z');
var _elm_community$elm_material_icons$Material_Icons_Content$add_circle = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$add_box = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z');
var _elm_community$elm_material_icons$Material_Icons_Content$add = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z');

var _elm_community$elm_material_icons$Material_Icons_Navigation$unfold_more = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$unfold_less = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$refresh = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$more_vert = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$more_horiz = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$menu = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$fullscreen_exit = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$fullscreen = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$expand_more = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$expand_less = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$close = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$chevron_right = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$chevron_left = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$check = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$cancel = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$arrow_forward = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$arrow_drop_up = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 14l5-5 5 5z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$arrow_drop_down_circle = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$arrow_drop_down = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M7 10l5 5 5-5z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$arrow_back = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z');
var _elm_community$elm_material_icons$Material_Icons_Navigation$apps = _elm_community$elm_material_icons$Material_Icons_Internal$icon('M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z');

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_p1._0,
				_elm_lang$core$Platform$sendToApp(router)));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (f, task) {
		return A2(
			_elm_lang$core$Task$onError,
			task,
			function (err) {
				return _elm_lang$core$Task$fail(
					f(err));
			});
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			});
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					});
			});
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							taskC,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							});
					});
			});
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							taskC,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									taskD,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									});
							});
					});
			});
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskA,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskB,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							taskC,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									taskD,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											taskE,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											});
									});
							});
					});
			});
	});
var _elm_lang$core$Task$andMap = F2(
	function (taskFunc, taskValue) {
		return A2(
			_elm_lang$core$Task$andThen,
			taskFunc,
			function (func) {
				return A2(
					_elm_lang$core$Task$andThen,
					taskValue,
					function (value) {
						return _elm_lang$core$Task$succeed(
							func(value));
					});
			});
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p2 = tasks;
	if (_p2.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Native_List.fromArray(
				[]));
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$List_ops['::'], x, y);
				}),
			_p2._0,
			_elm_lang$core$Task$sequence(_p2._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p3) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$toMaybe = function (task) {
	return A2(
		_elm_lang$core$Task$onError,
		A2(_elm_lang$core$Task$map, _elm_lang$core$Maybe$Just, task),
		function (_p4) {
			return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
		});
};
var _elm_lang$core$Task$fromMaybe = F2(
	function ($default, maybe) {
		var _p5 = maybe;
		if (_p5.ctor === 'Just') {
			return _elm_lang$core$Task$succeed(_p5._0);
		} else {
			return _elm_lang$core$Task$fail($default);
		}
	});
var _elm_lang$core$Task$toResult = function (task) {
	return A2(
		_elm_lang$core$Task$onError,
		A2(_elm_lang$core$Task$map, _elm_lang$core$Result$Ok, task),
		function (msg) {
			return _elm_lang$core$Task$succeed(
				_elm_lang$core$Result$Err(msg));
		});
};
var _elm_lang$core$Task$fromResult = function (result) {
	var _p6 = result;
	if (_p6.ctor === 'Ok') {
		return _elm_lang$core$Task$succeed(_p6._0);
	} else {
		return _elm_lang$core$Task$fail(_p6._0);
	}
};
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p9, _p8, _p7) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$T = function (a) {
	return {ctor: 'T', _0: a};
};
var _elm_lang$core$Task$perform = F3(
	function (onFail, onSuccess, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$T(
				A2(
					_elm_lang$core$Task$onError,
					A2(_elm_lang$core$Task$map, onSuccess, task),
					function (x) {
						return _elm_lang$core$Task$succeed(
							onFail(x));
					})));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$T(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Native_Scheduler.spawn(
					A2(
						_elm_lang$core$Time$setInterval,
						_p1,
						A2(_elm_lang$core$Platform$sendToSelf, router, _p1))),
				function (id) {
					return A3(
						_elm_lang$core$Time$spawnHelp,
						router,
						_p0._1,
						A3(_elm_lang$core$Dict$insert, _p1, id, processes));
				});
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				_elm_lang$core$Native_List.fromArray(
					[_p6]),
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				A2(_elm_lang$core$List_ops['::'], _p6, _p4._0),
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Time$now,
				function (time) {
					return A2(
						_elm_lang$core$Task$andThen,
						_elm_lang$core$Task$sequence(
							A2(
								_elm_lang$core$List$map,
								function (tagger) {
									return A2(
										_elm_lang$core$Platform$sendToApp,
										router,
										tagger(time));
								},
								_p7._0)),
						function (_p8) {
							return _elm_lang$core$Task$succeed(state);
						});
				});
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						_elm_lang$core$Native_Scheduler.kill(id),
						function (_p14) {
							return _p13._2;
						})
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: A2(_elm_lang$core$List_ops['::'], interval, _p18._0),
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			killTask,
			function (_p20) {
				return A2(
					_elm_lang$core$Task$andThen,
					A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict),
					function (newProcesses) {
						return _elm_lang$core$Task$succeed(
							A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
					});
			});
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Random$onSelfMsg = F3(
	function (_p1, _p0, seed) {
		return _elm_lang$core$Task$succeed(seed);
	});
var _elm_lang$core$Random$magicNum8 = 2147483562;
var _elm_lang$core$Random$range = function (_p2) {
	return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
};
var _elm_lang$core$Random$magicNum7 = 2137383399;
var _elm_lang$core$Random$magicNum6 = 2147483563;
var _elm_lang$core$Random$magicNum5 = 3791;
var _elm_lang$core$Random$magicNum4 = 40692;
var _elm_lang$core$Random$magicNum3 = 52774;
var _elm_lang$core$Random$magicNum2 = 12211;
var _elm_lang$core$Random$magicNum1 = 53668;
var _elm_lang$core$Random$magicNum0 = 40014;
var _elm_lang$core$Random$step = F2(
	function (_p3, seed) {
		var _p4 = _p3;
		return _p4._0(seed);
	});
var _elm_lang$core$Random$onEffects = F3(
	function (router, commands, seed) {
		var _p5 = commands;
		if (_p5.ctor === '[]') {
			return _elm_lang$core$Task$succeed(seed);
		} else {
			var _p6 = A2(_elm_lang$core$Random$step, _p5._0._0, seed);
			var value = _p6._0;
			var newSeed = _p6._1;
			return A2(
				_elm_lang$core$Task$andThen,
				A2(_elm_lang$core$Platform$sendToApp, router, value),
				function (_p7) {
					return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
				});
		}
	});
var _elm_lang$core$Random$listHelp = F4(
	function (list, n, generate, seed) {
		listHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$reverse(list),
					_1: seed
				};
			} else {
				var _p8 = generate(seed);
				var value = _p8._0;
				var newSeed = _p8._1;
				var _v2 = A2(_elm_lang$core$List_ops['::'], value, list),
					_v3 = n - 1,
					_v4 = generate,
					_v5 = newSeed;
				list = _v2;
				n = _v3;
				generate = _v4;
				seed = _v5;
				continue listHelp;
			}
		}
	});
var _elm_lang$core$Random$minInt = -2147483648;
var _elm_lang$core$Random$maxInt = 2147483647;
var _elm_lang$core$Random$iLogBase = F2(
	function (b, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, b) < 0) ? 1 : (1 + A2(_elm_lang$core$Random$iLogBase, b, (i / b) | 0));
	});
var _elm_lang$core$Random$command = _elm_lang$core$Native_Platform.leaf('Random');
var _elm_lang$core$Random$Generator = function (a) {
	return {ctor: 'Generator', _0: a};
};
var _elm_lang$core$Random$list = F2(
	function (n, _p9) {
		var _p10 = _p9;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				return A4(
					_elm_lang$core$Random$listHelp,
					_elm_lang$core$Native_List.fromArray(
						[]),
					n,
					_p10._0,
					seed);
			});
	});
var _elm_lang$core$Random$map = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p13 = _p12._0(seed0);
				var a = _p13._0;
				var seed1 = _p13._1;
				return {
					ctor: '_Tuple2',
					_0: func(a),
					_1: seed1
				};
			});
	});
var _elm_lang$core$Random$map2 = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p18 = _p16._0(seed0);
				var a = _p18._0;
				var seed1 = _p18._1;
				var _p19 = _p17._0(seed1);
				var b = _p19._0;
				var seed2 = _p19._1;
				return {
					ctor: '_Tuple2',
					_0: A2(func, a, b),
					_1: seed2
				};
			});
	});
var _elm_lang$core$Random$pair = F2(
	function (genA, genB) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			genA,
			genB);
	});
var _elm_lang$core$Random$map3 = F4(
	function (func, _p22, _p21, _p20) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p25 = _p20;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p26 = _p23._0(seed0);
				var a = _p26._0;
				var seed1 = _p26._1;
				var _p27 = _p24._0(seed1);
				var b = _p27._0;
				var seed2 = _p27._1;
				var _p28 = _p25._0(seed2);
				var c = _p28._0;
				var seed3 = _p28._1;
				return {
					ctor: '_Tuple2',
					_0: A3(func, a, b, c),
					_1: seed3
				};
			});
	});
var _elm_lang$core$Random$map4 = F5(
	function (func, _p32, _p31, _p30, _p29) {
		var _p33 = _p32;
		var _p34 = _p31;
		var _p35 = _p30;
		var _p36 = _p29;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p37 = _p33._0(seed0);
				var a = _p37._0;
				var seed1 = _p37._1;
				var _p38 = _p34._0(seed1);
				var b = _p38._0;
				var seed2 = _p38._1;
				var _p39 = _p35._0(seed2);
				var c = _p39._0;
				var seed3 = _p39._1;
				var _p40 = _p36._0(seed3);
				var d = _p40._0;
				var seed4 = _p40._1;
				return {
					ctor: '_Tuple2',
					_0: A4(func, a, b, c, d),
					_1: seed4
				};
			});
	});
var _elm_lang$core$Random$map5 = F6(
	function (func, _p45, _p44, _p43, _p42, _p41) {
		var _p46 = _p45;
		var _p47 = _p44;
		var _p48 = _p43;
		var _p49 = _p42;
		var _p50 = _p41;
		return _elm_lang$core$Random$Generator(
			function (seed0) {
				var _p51 = _p46._0(seed0);
				var a = _p51._0;
				var seed1 = _p51._1;
				var _p52 = _p47._0(seed1);
				var b = _p52._0;
				var seed2 = _p52._1;
				var _p53 = _p48._0(seed2);
				var c = _p53._0;
				var seed3 = _p53._1;
				var _p54 = _p49._0(seed3);
				var d = _p54._0;
				var seed4 = _p54._1;
				var _p55 = _p50._0(seed4);
				var e = _p55._0;
				var seed5 = _p55._1;
				return {
					ctor: '_Tuple2',
					_0: A5(func, a, b, c, d, e),
					_1: seed5
				};
			});
	});
var _elm_lang$core$Random$andThen = F2(
	function (_p56, callback) {
		var _p57 = _p56;
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p58 = _p57._0(seed);
				var result = _p58._0;
				var newSeed = _p58._1;
				var _p59 = callback(result);
				var genB = _p59._0;
				return genB(newSeed);
			});
	});
var _elm_lang$core$Random$State = F2(
	function (a, b) {
		return {ctor: 'State', _0: a, _1: b};
	});
var _elm_lang$core$Random$initState = function (s$) {
	var s = A2(_elm_lang$core$Basics$max, s$, 0 - s$);
	var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
	var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
	var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
	return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
};
var _elm_lang$core$Random$next = function (_p60) {
	var _p61 = _p60;
	var _p63 = _p61._1;
	var _p62 = _p61._0;
	var k$ = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
	var s2$ = (_elm_lang$core$Random$magicNum4 * (_p63 - (k$ * _elm_lang$core$Random$magicNum3))) - (k$ * _elm_lang$core$Random$magicNum5);
	var s2$$ = (_elm_lang$core$Native_Utils.cmp(s2$, 0) < 0) ? (s2$ + _elm_lang$core$Random$magicNum7) : s2$;
	var k = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
	var s1$ = (_elm_lang$core$Random$magicNum0 * (_p62 - (k * _elm_lang$core$Random$magicNum1))) - (k * _elm_lang$core$Random$magicNum2);
	var s1$$ = (_elm_lang$core$Native_Utils.cmp(s1$, 0) < 0) ? (s1$ + _elm_lang$core$Random$magicNum6) : s1$;
	var z = s1$$ - s2$$;
	var z$ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
	return {
		ctor: '_Tuple2',
		_0: z$,
		_1: A2(_elm_lang$core$Random$State, s1$$, s2$$)
	};
};
var _elm_lang$core$Random$split = function (_p64) {
	var _p65 = _p64;
	var _p68 = _p65._1;
	var _p67 = _p65._0;
	var _p66 = _elm_lang$core$Basics$snd(
		_elm_lang$core$Random$next(_p65));
	var t1 = _p66._0;
	var t2 = _p66._1;
	var new_s2 = _elm_lang$core$Native_Utils.eq(_p68, 1) ? (_elm_lang$core$Random$magicNum7 - 1) : (_p68 - 1);
	var new_s1 = _elm_lang$core$Native_Utils.eq(_p67, _elm_lang$core$Random$magicNum6 - 1) ? 1 : (_p67 + 1);
	return {
		ctor: '_Tuple2',
		_0: A2(_elm_lang$core$Random$State, new_s1, t2),
		_1: A2(_elm_lang$core$Random$State, t1, new_s2)
	};
};
var _elm_lang$core$Random$Seed = function (a) {
	return {ctor: 'Seed', _0: a};
};
var _elm_lang$core$Random$int = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (_p69) {
				var _p70 = _p69;
				var _p75 = _p70._0;
				var base = 2147483561;
				var f = F3(
					function (n, acc, state) {
						f:
						while (true) {
							var _p71 = n;
							if (_p71 === 0) {
								return {ctor: '_Tuple2', _0: acc, _1: state};
							} else {
								var _p72 = _p75.next(state);
								var x = _p72._0;
								var state$ = _p72._1;
								var _v27 = n - 1,
									_v28 = x + (acc * base),
									_v29 = state$;
								n = _v27;
								acc = _v28;
								state = _v29;
								continue f;
							}
						}
					});
				var _p73 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p73._0;
				var hi = _p73._1;
				var k = (hi - lo) + 1;
				var n = A2(_elm_lang$core$Random$iLogBase, base, k);
				var _p74 = A3(f, n, 1, _p75.state);
				var v = _p74._0;
				var state$ = _p74._1;
				return {
					ctor: '_Tuple2',
					_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
					_1: _elm_lang$core$Random$Seed(
						_elm_lang$core$Native_Utils.update(
							_p75,
							{state: state$}))
				};
			});
	});
var _elm_lang$core$Random$bool = A2(
	_elm_lang$core$Random$map,
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(1),
	A2(_elm_lang$core$Random$int, 0, 1));
var _elm_lang$core$Random$float = F2(
	function (a, b) {
		return _elm_lang$core$Random$Generator(
			function (seed) {
				var _p76 = A2(
					_elm_lang$core$Random$step,
					A2(_elm_lang$core$Random$int, _elm_lang$core$Random$minInt, _elm_lang$core$Random$maxInt),
					seed);
				var number = _p76._0;
				var newSeed = _p76._1;
				var negativeOneToOne = _elm_lang$core$Basics$toFloat(number) / _elm_lang$core$Basics$toFloat(_elm_lang$core$Random$maxInt - _elm_lang$core$Random$minInt);
				var _p77 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p77._0;
				var hi = _p77._1;
				var scaled = ((lo + hi) / 2) + ((hi - lo) * negativeOneToOne);
				return {ctor: '_Tuple2', _0: scaled, _1: newSeed};
			});
	});
var _elm_lang$core$Random$initialSeed = function (n) {
	return _elm_lang$core$Random$Seed(
		{
			state: _elm_lang$core$Random$initState(n),
			next: _elm_lang$core$Random$next,
			split: _elm_lang$core$Random$split,
			range: _elm_lang$core$Random$range
		});
};
var _elm_lang$core$Random$init = A2(
	_elm_lang$core$Task$andThen,
	_elm_lang$core$Time$now,
	function (t) {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(t)));
	});
var _elm_lang$core$Random$Generate = function (a) {
	return {ctor: 'Generate', _0: a};
};
var _elm_lang$core$Random$generate = F2(
	function (tagger, generator) {
		return _elm_lang$core$Random$command(
			_elm_lang$core$Random$Generate(
				A2(_elm_lang$core$Random$map, tagger, generator)));
	});
var _elm_lang$core$Random$cmdMap = F2(
	function (func, _p78) {
		var _p79 = _p78;
		return _elm_lang$core$Random$Generate(
			A2(_elm_lang$core$Random$map, func, _p79._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Random'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Random$init, onEffects: _elm_lang$core$Random$onEffects, onSelfMsg: _elm_lang$core$Random$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Random$cmdMap};

var _elm_community$random_extra$Random_Extra$flatMap6 = F7(
	function (constructor, generatorA, generatorB, generatorC, generatorD, generatorE, generatorF) {
		return A2(
			_elm_lang$core$Random$andThen,
			generatorA,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					generatorB,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							generatorC,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									generatorD,
									function (d) {
										return A2(
											_elm_lang$core$Random$andThen,
											generatorE,
											function (e) {
												return A2(
													_elm_lang$core$Random$andThen,
													generatorF,
													function (f) {
														return A6(constructor, a, b, c, d, e, f);
													});
											});
									});
							});
					});
			});
	});
var _elm_community$random_extra$Random_Extra$flatMap5 = F6(
	function (constructor, generatorA, generatorB, generatorC, generatorD, generatorE) {
		return A2(
			_elm_lang$core$Random$andThen,
			generatorA,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					generatorB,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							generatorC,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									generatorD,
									function (d) {
										return A2(
											_elm_lang$core$Random$andThen,
											generatorE,
											function (e) {
												return A5(constructor, a, b, c, d, e);
											});
									});
							});
					});
			});
	});
var _elm_community$random_extra$Random_Extra$flatMap4 = F5(
	function (constructor, generatorA, generatorB, generatorC, generatorD) {
		return A2(
			_elm_lang$core$Random$andThen,
			generatorA,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					generatorB,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							generatorC,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									generatorD,
									function (d) {
										return A4(constructor, a, b, c, d);
									});
							});
					});
			});
	});
var _elm_community$random_extra$Random_Extra$flatMap3 = F4(
	function (constructor, generatorA, generatorB, generatorC) {
		return A2(
			_elm_lang$core$Random$andThen,
			generatorA,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					generatorB,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							generatorC,
							function (c) {
								return A3(constructor, a, b, c);
							});
					});
			});
	});
var _elm_community$random_extra$Random_Extra$flatMap2 = F3(
	function (constructor, generatorA, generatorB) {
		return A2(
			_elm_lang$core$Random$andThen,
			generatorA,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					generatorB,
					function (b) {
						return A2(constructor, a, b);
					});
			});
	});
var _elm_community$random_extra$Random_Extra$flatMap = _elm_lang$core$Basics$flip(_elm_lang$core$Random$andThen);
var _elm_community$random_extra$Random_Extra$rangeLengthList = F3(
	function (minLength, maxLength, generator) {
		return A2(
			_elm_community$random_extra$Random_Extra$flatMap,
			function (len) {
				return A2(_elm_lang$core$Random$list, len, generator);
			},
			A2(_elm_lang$core$Random$int, minLength, maxLength));
	});
var _elm_community$random_extra$Random_Extra$result = F3(
	function (genBool, genErr, genVal) {
		return A2(
			_elm_lang$core$Random$andThen,
			genBool,
			function (b) {
				return b ? A2(_elm_lang$core$Random$map, _elm_lang$core$Result$Ok, genVal) : A2(_elm_lang$core$Random$map, _elm_lang$core$Result$Err, genErr);
			});
	});
var _elm_community$random_extra$Random_Extra$sample = function () {
	var find = F2(
		function (k, ys) {
			find:
			while (true) {
				var _p0 = ys;
				if (_p0.ctor === '[]') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_elm_lang$core$Native_Utils.eq(k, 0)) {
						return _elm_lang$core$Maybe$Just(_p0._0);
					} else {
						var _v1 = k - 1,
							_v2 = _p0._1;
						k = _v1;
						ys = _v2;
						continue find;
					}
				}
			}
		});
	return function (xs) {
		return A2(
			_elm_lang$core$Random$map,
			function (i) {
				return A2(find, i, xs);
			},
			A2(
				_elm_lang$core$Random$int,
				0,
				_elm_lang$core$List$length(xs) - 1));
	};
}();
var _elm_community$random_extra$Random_Extra$frequency = function (pairs) {
	var pick = F2(
		function (choices, n) {
			pick:
			while (true) {
				var _p1 = choices;
				if ((_p1.ctor === '::') && (_p1._0.ctor === '_Tuple2')) {
					var _p2 = _p1._0._0;
					if (_elm_lang$core$Native_Utils.cmp(n, _p2) < 1) {
						return _p1._0._1;
					} else {
						var _v4 = _p1._1,
							_v5 = n - _p2;
						choices = _v4;
						n = _v5;
						continue pick;
					}
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Random.Extra',
						{
							start: {line: 153, column: 13},
							end: {line: 161, column: 79}
						},
						_p1)('Empty list passed to Random.Extra.frequency!');
				}
			}
		});
	var total = _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$map,
			function (_p4) {
				return _elm_lang$core$Basics$abs(
					_elm_lang$core$Basics$fst(_p4));
			},
			pairs));
	return A2(
		_elm_lang$core$Random$andThen,
		A2(_elm_lang$core$Random$float, 0, total),
		pick(pairs));
};
var _elm_community$random_extra$Random_Extra$choices = function (gens) {
	return _elm_community$random_extra$Random_Extra$frequency(
		A2(
			_elm_lang$core$List$map,
			function (g) {
				return {ctor: '_Tuple2', _0: 1, _1: g};
			},
			gens));
};
var _elm_community$random_extra$Random_Extra$choice = F2(
	function (x, y) {
		return A2(
			_elm_lang$core$Random$map,
			function (b) {
				return b ? x : y;
			},
			_elm_lang$core$Random$bool);
	});
var _elm_community$random_extra$Random_Extra$oneIn = function (n) {
	return A2(
		_elm_lang$core$Random$map,
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(1),
		A2(_elm_lang$core$Random$int, 1, n));
};
var _elm_community$random_extra$Random_Extra$andMap = F2(
	function (funcGenerator, generator) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			funcGenerator,
			generator);
	});
var _elm_community$random_extra$Random_Extra$map6 = F7(
	function (f, generatorA, generatorB, generatorC, generatorD, generatorE, generatorF) {
		return A2(
			_elm_community$random_extra$Random_Extra$andMap,
			A6(_elm_lang$core$Random$map5, f, generatorA, generatorB, generatorC, generatorD, generatorE),
			generatorF);
	});
var _elm_community$random_extra$Random_Extra$constant = function (value) {
	return A2(
		_elm_lang$core$Random$map,
		function (_p5) {
			return value;
		},
		_elm_lang$core$Random$bool);
};
var _elm_community$random_extra$Random_Extra$filter = F2(
	function (predicate, generator) {
		return A2(
			_elm_lang$core$Random$andThen,
			generator,
			function (a) {
				return predicate(a) ? _elm_community$random_extra$Random_Extra$constant(a) : A2(_elm_community$random_extra$Random_Extra$filter, predicate, generator);
			});
	});
var _elm_community$random_extra$Random_Extra$together = function (generators) {
	var _p6 = generators;
	if (_p6.ctor === '[]') {
		return _elm_community$random_extra$Random_Extra$constant(
			_elm_lang$core$Native_List.fromArray(
				[]));
	} else {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (x, y) {
					return A2(_elm_lang$core$List_ops['::'], x, y);
				}),
			_p6._0,
			_elm_community$random_extra$Random_Extra$together(_p6._1));
	}
};
var _elm_community$random_extra$Random_Extra$maybe = F2(
	function (genBool, genA) {
		return A2(
			_elm_lang$core$Random$andThen,
			genBool,
			function (b) {
				return b ? A2(_elm_lang$core$Random$map, _elm_lang$core$Maybe$Just, genA) : _elm_community$random_extra$Random_Extra$constant(_elm_lang$core$Maybe$Nothing);
			});
	});

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$dom$Native_Dom = function() {

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

return {
	onDocument: F3(on(document)),
	onWindow: F3(on(window))
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$html$Html_App$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html_App$program = function (app) {
	return _elm_lang$html$Html_App$programWithFlags(
		_elm_lang$core$Native_Utils.update(
			app,
			{
				init: function (_p0) {
					return app.init;
				}
			}));
};
var _elm_lang$html$Html_App$beginnerProgram = function (_p1) {
	var _p2 = _p1;
	return _elm_lang$html$Html_App$programWithFlags(
		{
			init: function (_p3) {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_p2.model,
					_elm_lang$core$Native_List.fromArray(
						[]));
			},
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p2.update, msg, model),
						_elm_lang$core$Native_List.fromArray(
							[]));
				}),
			view: _p2.view,
			subscriptions: function (_p4) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html_App$map = _elm_lang$virtual_dom$VirtualDom$map;

var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'charset', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type$ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$autosave = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'autosave', value);
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'form', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'media', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'rel', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Basics$fst,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Basics$snd, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode_ops[':='], 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['target', 'checked']),
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['target', 'value']),
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _elm_lang$keyboard$Keyboard$onSelfMsg = F3(
	function (router, _p0, state) {
		var _p1 = _p0;
		var _p2 = A2(_elm_lang$core$Dict$get, _p1.category, state);
		if (_p2.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p1.keyCode));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p2._0.taggers)),
				function (_p3) {
					return _elm_lang$core$Task$succeed(state);
				});
		}
	});
var _elm_lang$keyboard$Keyboard_ops = _elm_lang$keyboard$Keyboard_ops || {};
_elm_lang$keyboard$Keyboard_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			t1,
			function (_p4) {
				return t2;
			});
	});
var _elm_lang$keyboard$Keyboard$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$keyboard$Keyboard$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p5 = maybeValues;
		if (_p5.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				_elm_lang$core$Native_List.fromArray(
					[value]));
		} else {
			return _elm_lang$core$Maybe$Just(
				A2(_elm_lang$core$List_ops['::'], value, _p5._0));
		}
	});
var _elm_lang$keyboard$Keyboard$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p6 = subs;
			if (_p6.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p6._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p6._0._0,
					_elm_lang$keyboard$Keyboard$categorizeHelpHelp(_p6._0._1),
					subDict);
				subs = _v4;
				subDict = _v5;
				continue categorizeHelp;
			}
		}
	});
var _elm_lang$keyboard$Keyboard$categorize = function (subs) {
	return A2(_elm_lang$keyboard$Keyboard$categorizeHelp, subs, _elm_lang$core$Dict$empty);
};
var _elm_lang$keyboard$Keyboard$keyCode = A2(_elm_lang$core$Json_Decode_ops[':='], 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$keyboard$Keyboard$subscription = _elm_lang$core$Native_Platform.leaf('Keyboard');
var _elm_lang$keyboard$Keyboard$Watcher = F2(
	function (a, b) {
		return {taggers: a, pid: b};
	});
var _elm_lang$keyboard$Keyboard$Msg = F2(
	function (a, b) {
		return {category: a, keyCode: b};
	});
var _elm_lang$keyboard$Keyboard$onEffects = F3(
	function (router, newSubs, oldState) {
		var rightStep = F3(
			function (category, taggers, task) {
				return A2(
					_elm_lang$core$Task$andThen,
					task,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$core$Process$spawn(
								A3(
									_elm_lang$dom$Dom_LowLevel$onDocument,
									category,
									_elm_lang$keyboard$Keyboard$keyCode,
									function (_p7) {
										return A2(
											_elm_lang$core$Platform$sendToSelf,
											router,
											A2(_elm_lang$keyboard$Keyboard$Msg, category, _p7));
									})),
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, pid),
										state));
							});
					});
			});
		var bothStep = F4(
			function (category, _p8, taggers, task) {
				var _p9 = _p8;
				return A2(
					_elm_lang$core$Task$andThen,
					task,
					function (state) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$core$Dict$insert,
								category,
								A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, _p9.pid),
								state));
					});
			});
		var leftStep = F3(
			function (category, _p10, task) {
				var _p11 = _p10;
				return A2(
					_elm_lang$keyboard$Keyboard_ops['&>'],
					_elm_lang$core$Process$kill(_p11.pid),
					task);
			});
		return A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			oldState,
			_elm_lang$keyboard$Keyboard$categorize(newSubs),
			_elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty));
	});
var _elm_lang$keyboard$Keyboard$MySub = F2(
	function (a, b) {
		return {ctor: 'MySub', _0: a, _1: b};
	});
var _elm_lang$keyboard$Keyboard$presses = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keypress', tagger));
};
var _elm_lang$keyboard$Keyboard$downs = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keydown', tagger));
};
var _elm_lang$keyboard$Keyboard$ups = function (tagger) {
	return _elm_lang$keyboard$Keyboard$subscription(
		A2(_elm_lang$keyboard$Keyboard$MySub, 'keyup', tagger));
};
var _elm_lang$keyboard$Keyboard$subMap = F2(
	function (func, _p12) {
		var _p13 = _p12;
		return A2(
			_elm_lang$keyboard$Keyboard$MySub,
			_p13._0,
			function (_p14) {
				return func(
					_p13._1(_p14));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Keyboard'] = {pkg: 'elm-lang/keyboard', init: _elm_lang$keyboard$Keyboard$init, onEffects: _elm_lang$keyboard$Keyboard$onEffects, onSelfMsg: _elm_lang$keyboard$Keyboard$onSelfMsg, tag: 'sub', subMap: _elm_lang$keyboard$Keyboard$subMap};

var _elm_lang$mouse$Mouse$onSelfMsg = F3(
	function (router, _p0, state) {
		var _p1 = _p0;
		var _p2 = A2(_elm_lang$core$Dict$get, _p1.category, state);
		if (_p2.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p1.position));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p2._0.taggers)),
				function (_p3) {
					return _elm_lang$core$Task$succeed(state);
				});
		}
	});
var _elm_lang$mouse$Mouse_ops = _elm_lang$mouse$Mouse_ops || {};
_elm_lang$mouse$Mouse_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			t1,
			function (_p4) {
				return t2;
			});
	});
var _elm_lang$mouse$Mouse$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$mouse$Mouse$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p5 = maybeValues;
		if (_p5.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				_elm_lang$core$Native_List.fromArray(
					[value]));
		} else {
			return _elm_lang$core$Maybe$Just(
				A2(_elm_lang$core$List_ops['::'], value, _p5._0));
		}
	});
var _elm_lang$mouse$Mouse$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p6 = subs;
			if (_p6.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p6._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p6._0._0,
					_elm_lang$mouse$Mouse$categorizeHelpHelp(_p6._0._1),
					subDict);
				subs = _v4;
				subDict = _v5;
				continue categorizeHelp;
			}
		}
	});
var _elm_lang$mouse$Mouse$categorize = function (subs) {
	return A2(_elm_lang$mouse$Mouse$categorizeHelp, subs, _elm_lang$core$Dict$empty);
};
var _elm_lang$mouse$Mouse$subscription = _elm_lang$core$Native_Platform.leaf('Mouse');
var _elm_lang$mouse$Mouse$Position = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _elm_lang$mouse$Mouse$position = A3(
	_elm_lang$core$Json_Decode$object2,
	_elm_lang$mouse$Mouse$Position,
	A2(_elm_lang$core$Json_Decode_ops[':='], 'pageX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode_ops[':='], 'pageY', _elm_lang$core$Json_Decode$int));
var _elm_lang$mouse$Mouse$Watcher = F2(
	function (a, b) {
		return {taggers: a, pid: b};
	});
var _elm_lang$mouse$Mouse$Msg = F2(
	function (a, b) {
		return {category: a, position: b};
	});
var _elm_lang$mouse$Mouse$onEffects = F3(
	function (router, newSubs, oldState) {
		var rightStep = F3(
			function (category, taggers, task) {
				return A2(
					_elm_lang$core$Task$andThen,
					task,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$core$Process$spawn(
								A3(
									_elm_lang$dom$Dom_LowLevel$onDocument,
									category,
									_elm_lang$mouse$Mouse$position,
									function (_p7) {
										return A2(
											_elm_lang$core$Platform$sendToSelf,
											router,
											A2(_elm_lang$mouse$Mouse$Msg, category, _p7));
									})),
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$mouse$Mouse$Watcher, taggers, pid),
										state));
							});
					});
			});
		var bothStep = F4(
			function (category, _p8, taggers, task) {
				var _p9 = _p8;
				return A2(
					_elm_lang$core$Task$andThen,
					task,
					function (state) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$core$Dict$insert,
								category,
								A2(_elm_lang$mouse$Mouse$Watcher, taggers, _p9.pid),
								state));
					});
			});
		var leftStep = F3(
			function (category, _p10, task) {
				var _p11 = _p10;
				return A2(
					_elm_lang$mouse$Mouse_ops['&>'],
					_elm_lang$core$Process$kill(_p11.pid),
					task);
			});
		return A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			oldState,
			_elm_lang$mouse$Mouse$categorize(newSubs),
			_elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty));
	});
var _elm_lang$mouse$Mouse$MySub = F2(
	function (a, b) {
		return {ctor: 'MySub', _0: a, _1: b};
	});
var _elm_lang$mouse$Mouse$clicks = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'click', tagger));
};
var _elm_lang$mouse$Mouse$moves = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousemove', tagger));
};
var _elm_lang$mouse$Mouse$downs = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousedown', tagger));
};
var _elm_lang$mouse$Mouse$ups = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mouseup', tagger));
};
var _elm_lang$mouse$Mouse$subMap = F2(
	function (func, _p12) {
		var _p13 = _p12;
		return A2(
			_elm_lang$mouse$Mouse$MySub,
			_p13._0,
			function (_p14) {
				return func(
					_p13._1(_p14));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Mouse'] = {pkg: 'elm-lang/mouse', init: _elm_lang$mouse$Mouse$init, onEffects: _elm_lang$mouse$Mouse$onEffects, onSelfMsg: _elm_lang$mouse$Mouse$onSelfMsg, tag: 'sub', subMap: _elm_lang$mouse$Mouse$subMap};

var _elm_lang$navigation$Native_Navigation = function() {

function go(n)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		if (n !== 0)
		{
			history.go(n);
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function pushState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.pushState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function replaceState(url)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		history.replaceState({}, '', url);
		callback(_elm_lang$core$Native_Scheduler.succeed(getLocation()));
	});
}

function getLocation()
{
	var location = document.location;

	return {
		href: location.href,
		host: location.host,
		hostname: location.hostname,
		protocol: location.protocol,
		origin: location.origin,
		port_: location.port,
		pathname: location.pathname,
		search: location.search,
		hash: location.hash,
		username: location.username,
		password: location.password
	};
}


return {
	go: go,
	pushState: pushState,
	replaceState: replaceState,
	getLocation: getLocation
};

}();

var _elm_lang$navigation$Navigation$replaceState = _elm_lang$navigation$Native_Navigation.replaceState;
var _elm_lang$navigation$Navigation$pushState = _elm_lang$navigation$Native_Navigation.pushState;
var _elm_lang$navigation$Navigation$go = _elm_lang$navigation$Native_Navigation.go;
var _elm_lang$navigation$Navigation$spawnPopState = function (router) {
	return _elm_lang$core$Process$spawn(
		A3(
			_elm_lang$dom$Dom_LowLevel$onWindow,
			'popstate',
			_elm_lang$core$Json_Decode$value,
			function (_p0) {
				return A2(
					_elm_lang$core$Platform$sendToSelf,
					router,
					_elm_lang$navigation$Native_Navigation.getLocation(
						{ctor: '_Tuple0'}));
			}));
};
var _elm_lang$navigation$Navigation_ops = _elm_lang$navigation$Navigation_ops || {};
_elm_lang$navigation$Navigation_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			task1,
			function (_p1) {
				return task2;
			});
	});
var _elm_lang$navigation$Navigation$notify = F3(
	function (router, subs, location) {
		var send = function (_p2) {
			var _p3 = _p2;
			return A2(
				_elm_lang$core$Platform$sendToApp,
				router,
				_p3._0(location));
		};
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(_elm_lang$core$List$map, send, subs)),
			_elm_lang$core$Task$succeed(
				{ctor: '_Tuple0'}));
	});
var _elm_lang$navigation$Navigation$onSelfMsg = F3(
	function (router, location, state) {
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			A3(_elm_lang$navigation$Navigation$notify, router, state.subs, location),
			_elm_lang$core$Task$succeed(state));
	});
var _elm_lang$navigation$Navigation$cmdHelp = F3(
	function (router, subs, cmd) {
		var _p4 = cmd;
		switch (_p4.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$go(_p4._0);
			case 'New':
				return A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$navigation$Navigation$pushState(_p4._0),
					A2(_elm_lang$navigation$Navigation$notify, router, subs));
			default:
				return A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$navigation$Navigation$replaceState(_p4._0),
					A2(_elm_lang$navigation$Navigation$notify, router, subs));
		}
	});
var _elm_lang$navigation$Navigation$updateHelp = F2(
	function (func, _p5) {
		var _p6 = _p5;
		return {
			ctor: '_Tuple2',
			_0: _p6._0,
			_1: A2(_elm_lang$core$Platform_Cmd$map, func, _p6._1)
		};
	});
var _elm_lang$navigation$Navigation$subscription = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$command = _elm_lang$core$Native_Platform.leaf('Navigation');
var _elm_lang$navigation$Navigation$Location = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {href: a, host: b, hostname: c, protocol: d, origin: e, port_: f, pathname: g, search: h, hash: i, username: j, password: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$navigation$Navigation$State = F2(
	function (a, b) {
		return {subs: a, process: b};
	});
var _elm_lang$navigation$Navigation$init = _elm_lang$core$Task$succeed(
	A2(
		_elm_lang$navigation$Navigation$State,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p7) {
		var _p8 = _p7;
		var _p10 = _p8.process;
		var stepState = function () {
			var _p9 = {ctor: '_Tuple2', _0: subs, _1: _p10};
			_v4_2:
			do {
				if (_p9._0.ctor === '[]') {
					if (_p9._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$core$Process$kill(_p9._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v4_2;
					}
				} else {
					if (_p9._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$navigation$Navigation$spawnPopState(router),
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A2(
										_elm_lang$navigation$Navigation$State,
										subs,
										_elm_lang$core$Maybe$Just(pid)));
							});
					} else {
						break _v4_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p10));
		}();
		return A2(
			_elm_lang$navigation$Navigation_ops['&>'],
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					A2(_elm_lang$navigation$Navigation$cmdHelp, router, subs),
					cmds)),
			stepState);
	});
var _elm_lang$navigation$Navigation$UserMsg = function (a) {
	return {ctor: 'UserMsg', _0: a};
};
var _elm_lang$navigation$Navigation$Change = function (a) {
	return {ctor: 'Change', _0: a};
};
var _elm_lang$navigation$Navigation$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _elm_lang$navigation$Navigation$makeParser = _elm_lang$navigation$Navigation$Parser;
var _elm_lang$navigation$Navigation$Modify = function (a) {
	return {ctor: 'Modify', _0: a};
};
var _elm_lang$navigation$Navigation$modifyUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Modify(url));
};
var _elm_lang$navigation$Navigation$New = function (a) {
	return {ctor: 'New', _0: a};
};
var _elm_lang$navigation$Navigation$newUrl = function (url) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$New(url));
};
var _elm_lang$navigation$Navigation$Jump = function (a) {
	return {ctor: 'Jump', _0: a};
};
var _elm_lang$navigation$Navigation$back = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(0 - n));
};
var _elm_lang$navigation$Navigation$forward = function (n) {
	return _elm_lang$navigation$Navigation$command(
		_elm_lang$navigation$Navigation$Jump(n));
};
var _elm_lang$navigation$Navigation$cmdMap = F2(
	function (_p11, myCmd) {
		var _p12 = myCmd;
		switch (_p12.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$Jump(_p12._0);
			case 'New':
				return _elm_lang$navigation$Navigation$New(_p12._0);
			default:
				return _elm_lang$navigation$Navigation$Modify(_p12._0);
		}
	});
var _elm_lang$navigation$Navigation$Monitor = function (a) {
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (_p13, stuff) {
		var _p14 = _p13;
		var _p16 = _p14._0;
		var location = _elm_lang$navigation$Native_Navigation.getLocation(
			{ctor: '_Tuple0'});
		var init = function (flags) {
			return A2(
				_elm_lang$navigation$Navigation$updateHelp,
				_elm_lang$navigation$Navigation$UserMsg,
				A2(
					stuff.init,
					flags,
					_p16(location)));
		};
		var view = function (model) {
			return A2(
				_elm_lang$html$Html_App$map,
				_elm_lang$navigation$Navigation$UserMsg,
				stuff.view(model));
		};
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(_elm_lang$navigation$Navigation$Change)),
						A2(
						_elm_lang$core$Platform_Sub$map,
						_elm_lang$navigation$Navigation$UserMsg,
						stuff.subscriptions(model))
					]));
		};
		var update = F2(
			function (msg, model) {
				return A2(
					_elm_lang$navigation$Navigation$updateHelp,
					_elm_lang$navigation$Navigation$UserMsg,
					function () {
						var _p15 = msg;
						if (_p15.ctor === 'Change') {
							return A2(
								stuff.urlUpdate,
								_p16(_p15._0),
								model);
						} else {
							return A2(stuff.update, _p15._0, model);
						}
					}());
			});
		return _elm_lang$html$Html_App$programWithFlags(
			{init: init, view: view, update: update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$program = F2(
	function (parser, stuff) {
		return A2(
			_elm_lang$navigation$Navigation$programWithFlags,
			parser,
			_elm_lang$core$Native_Utils.update(
				stuff,
				{
					init: function (_p17) {
						return stuff.init;
					}
				}));
	});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p18) {
		var _p19 = _p18;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p20) {
				return func(
					_p19._0(_p20));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Navigation'] = {pkg: 'elm-lang/navigation', init: _elm_lang$navigation$Navigation$init, onEffects: _elm_lang$navigation$Navigation$onEffects, onSelfMsg: _elm_lang$navigation$Navigation$onSelfMsg, tag: 'fx', cmdMap: _elm_lang$navigation$Navigation$cmdMap, subMap: _elm_lang$navigation$Navigation$subMap};

var _elm_lang$window$Native_Window = function()
{

var size = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)	{
	callback(_elm_lang$core$Native_Scheduler.succeed({
		width: window.innerWidth,
		height: window.innerHeight
	}));
});

return {
	size: size
};

}();
var _elm_lang$window$Window_ops = _elm_lang$window$Window_ops || {};
_elm_lang$window$Window_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			t1,
			function (_p0) {
				return t2;
			});
	});
var _elm_lang$window$Window$onSelfMsg = F3(
	function (router, dimensions, state) {
		var _p1 = state;
		if (_p1.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (_p2) {
				var _p3 = _p2;
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p3._0(dimensions));
			};
			return A2(
				_elm_lang$window$Window_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p1._0.subs)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$window$Window$init = _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
var _elm_lang$window$Window$size = _elm_lang$window$Native_Window.size;
var _elm_lang$window$Window$width = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.width;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$height = A2(
	_elm_lang$core$Task$map,
	function (_) {
		return _.height;
	},
	_elm_lang$window$Window$size);
var _elm_lang$window$Window$onEffects = F3(
	function (router, newSubs, oldState) {
		var _p4 = {ctor: '_Tuple2', _0: oldState, _1: newSubs};
		if (_p4._0.ctor === 'Nothing') {
			if (_p4._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing);
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$core$Process$spawn(
						A3(
							_elm_lang$dom$Dom_LowLevel$onWindow,
							'resize',
							_elm_lang$core$Json_Decode$succeed(
								{ctor: '_Tuple0'}),
							function (_p5) {
								return A2(
									_elm_lang$core$Task$andThen,
									_elm_lang$window$Window$size,
									_elm_lang$core$Platform$sendToSelf(router));
							})),
					function (pid) {
						return _elm_lang$core$Task$succeed(
							_elm_lang$core$Maybe$Just(
								{subs: newSubs, pid: pid}));
					});
			}
		} else {
			if (_p4._1.ctor === '[]') {
				return A2(
					_elm_lang$window$Window_ops['&>'],
					_elm_lang$core$Process$kill(_p4._0._0.pid),
					_elm_lang$core$Task$succeed(_elm_lang$core$Maybe$Nothing));
			} else {
				return _elm_lang$core$Task$succeed(
					_elm_lang$core$Maybe$Just(
						{subs: newSubs, pid: _p4._0._0.pid}));
			}
		}
	});
var _elm_lang$window$Window$subscription = _elm_lang$core$Native_Platform.leaf('Window');
var _elm_lang$window$Window$Size = F2(
	function (a, b) {
		return {width: a, height: b};
	});
var _elm_lang$window$Window$MySub = function (a) {
	return {ctor: 'MySub', _0: a};
};
var _elm_lang$window$Window$resizes = function (tagger) {
	return _elm_lang$window$Window$subscription(
		_elm_lang$window$Window$MySub(tagger));
};
var _elm_lang$window$Window$subMap = F2(
	function (func, _p6) {
		var _p7 = _p6;
		return _elm_lang$window$Window$MySub(
			function (_p8) {
				return func(
					_p7._0(_p8));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Window'] = {pkg: 'elm-lang/window', init: _elm_lang$window$Window$init, onEffects: _elm_lang$window$Window$onEffects, onSelfMsg: _elm_lang$window$Window$onSelfMsg, tag: 'sub', subMap: _elm_lang$window$Window$subMap};

var _jinjor$elm_inline_hover$InlineHover$isValidChars = function (list) {
	isValidChars:
	while (true) {
		var _p0 = list;
		if (_p0.ctor === '::') {
			var _p1 = _p0._0;
			if (_elm_lang$core$Char$isLower(_p1) || _elm_lang$core$Native_Utils.eq(
				_p1,
				_elm_lang$core$Native_Utils.chr('-'))) {
				var _v1 = _p0._1;
				list = _v1;
				continue isValidChars;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
};
var _jinjor$elm_inline_hover$InlineHover$isValidKey = function (s) {
	return (!_elm_lang$core$Native_Utils.eq(s, '')) && (A2(
		_elm_lang$core$List$any,
		_elm_lang$core$Char$isLower,
		_elm_lang$core$String$toList(s)) && A2(
		_elm_lang$core$List$all,
		function (c) {
			return _elm_lang$core$Char$isLower(c) || _elm_lang$core$Native_Utils.eq(
				c,
				_elm_lang$core$Native_Utils.chr('-'));
		},
		_elm_lang$core$String$toList(s)));
};
var _jinjor$elm_inline_hover$InlineHover$toCamelCase = function (s) {
	return _elm_lang$core$String$fromList(
		_elm_lang$core$List$reverse(
			_elm_lang$core$Basics$snd(
				A3(
					_elm_lang$core$List$foldl,
					F2(
						function (c, _p2) {
							var _p3 = _p2;
							var _p4 = _p3._1;
							return _elm_lang$core$Native_Utils.eq(
								c,
								_elm_lang$core$Native_Utils.chr('-')) ? {ctor: '_Tuple2', _0: true, _1: _p4} : (_p3._0 ? {
								ctor: '_Tuple2',
								_0: false,
								_1: A2(
									_elm_lang$core$List_ops['::'],
									_elm_lang$core$Char$toUpper(c),
									_p4)
							} : {
								ctor: '_Tuple2',
								_0: false,
								_1: A2(_elm_lang$core$List_ops['::'], c, _p4)
							});
						}),
					{
						ctor: '_Tuple2',
						_0: false,
						_1: _elm_lang$core$Native_List.fromArray(
							[])
					},
					_elm_lang$core$String$toList(s)))));
};
var _jinjor$elm_inline_hover$InlineHover$enterEach = function (_p5) {
	var _p6 = _p5;
	var _p8 = _p6._0;
	var escapedValue = function (_p7) {
		return A2(
			_elm_lang$core$String$join,
			'\"',
			A2(_elm_lang$core$String$split, '\'', _p7));
	}(_p6._1);
	var keyCamel = _jinjor$elm_inline_hover$InlineHover$toCamelCase(_p8);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'this.setAttribute(\'data-hover-',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_p8,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'\', this.style.',
				A2(
					_elm_lang$core$Basics_ops['++'],
					keyCamel,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'||\'\');',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'this.style.',
							A2(
								_elm_lang$core$Basics_ops['++'],
								keyCamel,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'=\'',
									A2(_elm_lang$core$Basics_ops['++'], escapedValue, '\'')))))))));
};
var _jinjor$elm_inline_hover$InlineHover$leaveEach = function (_p9) {
	var _p10 = _p9;
	var _p11 = _p10._0;
	var keyCamel = _jinjor$elm_inline_hover$InlineHover$toCamelCase(_p11);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'this.style.',
		A2(
			_elm_lang$core$Basics_ops['++'],
			keyCamel,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'=this.getAttribute(\'data-hover-',
				A2(_elm_lang$core$Basics_ops['++'], _p11, '\')||\'\';'))));
};
var _jinjor$elm_inline_hover$InlineHover$hover = F4(
	function (styles, tag, attrs, children) {
		var validStyles = A2(
			_elm_lang$core$List$filter,
			function (_p12) {
				var _p13 = _p12;
				return _jinjor$elm_inline_hover$InlineHover$isValidKey(_p13._0);
			},
			styles);
		var enter = A2(
			_elm_lang$html$Html_Attributes$attribute,
			'onmouseenter',
			A2(
				_elm_lang$core$String$join,
				';',
				A2(_elm_lang$core$List$map, _jinjor$elm_inline_hover$InlineHover$enterEach, validStyles)));
		var leave = A2(
			_elm_lang$html$Html_Attributes$attribute,
			'onmouseleave',
			A2(
				_elm_lang$core$String$join,
				';',
				A2(_elm_lang$core$List$map, _jinjor$elm_inline_hover$InlineHover$leaveEach, validStyles)));
		return A2(
			tag,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Native_List.fromArray(
					[enter, leave]),
				attrs),
			children);
	});

var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$head = function (_p0) {
	var _p1 = _p0;
	return _p1._0;
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$takeHelp = F3(
	function (result, n, list) {
		takeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _p2 = list;
				if (_p2.ctor === '[]') {
					return result;
				} else {
					var _v2 = A2(_elm_lang$core$List_ops['::'], _p2._0, result),
						_v3 = n - 1,
						_v4 = _p2._1;
					result = _v2;
					n = _v3;
					list = _v4;
					continue takeHelp;
				}
			}
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMapManyHelp = F4(
	function (result, n, f, list) {
		findMapManyHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _p3 = list;
				if (_p3.ctor === '[]') {
					return result;
				} else {
					var _p5 = _p3._1;
					var _p4 = f(_p3._0);
					if (_p4.ctor === 'Just') {
						var _v7 = A2(_elm_lang$core$List_ops['::'], _p4._0, result),
							_v8 = n - 1,
							_v9 = f,
							_v10 = _p5;
						result = _v7;
						n = _v8;
						f = _v9;
						list = _v10;
						continue findMapManyHelp;
					} else {
						var _v11 = result,
							_v12 = n,
							_v13 = f,
							_v14 = _p5;
						result = _v11;
						n = _v12;
						f = _v13;
						list = _v14;
						continue findMapManyHelp;
					}
				}
			}
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMapHelp = F2(
	function (f, list) {
		findMapHelp:
		while (true) {
			var _p6 = list;
			if (_p6.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p7 = f(_p6._0);
				if (_p7.ctor === 'Nothing') {
					var _v17 = f,
						_v18 = _p6._1;
					f = _v17;
					list = _v18;
					continue findMapHelp;
				} else {
					return _p7;
				}
			}
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findHelp = F2(
	function (f, list) {
		findHelp:
		while (true) {
			var _p8 = list;
			if (_p8.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p9 = _p8._0;
				if (f(_p9)) {
					return _elm_lang$core$Maybe$Just(_p9);
				} else {
					var _v20 = f,
						_v21 = _p8._1;
					f = _v20;
					list = _v21;
					continue findHelp;
				}
			}
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList = function (_p10) {
	var _p11 = _p10;
	return A2(_elm_lang$core$List_ops['::'], _p11._0, _p11._1);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$filter = F2(
	function (match, nel) {
		return A2(
			_elm_lang$core$List$filter,
			match,
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(nel));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$filterMap = F2(
	function (match, nel) {
		return A2(
			_elm_lang$core$List$filterMap,
			match,
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(nel));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$find = F2(
	function (f, nel) {
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findHelp,
			f,
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(nel));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMap = F2(
	function (f, nel) {
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMapHelp,
			f,
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(nel));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMapMany = F3(
	function (n, f, nel) {
		return _elm_lang$core$List$reverse(
			A4(
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMapManyHelp,
				_elm_lang$core$Native_List.fromArray(
					[]),
				n,
				f,
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(nel)));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$take = F2(
	function (n, nel) {
		return _elm_lang$core$List$reverse(
			A3(
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$takeHelp,
				_elm_lang$core$Native_List.fromArray(
					[]),
				n,
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(nel)));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$Nel = F2(
	function (a, b) {
		return {ctor: 'Nel', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$map = F2(
	function (f, _p12) {
		var _p13 = _p12;
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$Nel,
			f(_p13._0),
			A2(_elm_lang$core$List$map, f, _p13._1));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$concat = F2(
	function (list, _p14) {
		var _p15 = _p14;
		var _p18 = _p15._1;
		var _p17 = _p15._0;
		var _p16 = list;
		if (_p16.ctor === '::') {
			return A2(
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$Nel,
				_p16._0,
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p16._1,
					A2(_elm_lang$core$List_ops['::'], _p17, _p18)));
		} else {
			return A2(_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$Nel, _p17, _p18);
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$cons = F2(
	function ($new, _p19) {
		var _p20 = _p19;
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$Nel,
			$new,
			A2(_elm_lang$core$List_ops['::'], _p20._0, _p20._1));
	});

var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Property = F2(
	function (a, b) {
		return {ctor: 'Property', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Union = F2(
	function (a, b) {
		return {ctor: 'Union', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Value = function (a) {
	return {ctor: 'Value', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$TupleLiteral = function (a) {
	return {ctor: 'TupleLiteral', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$ListLiteral = function (a) {
	return {ctor: 'ListLiteral', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$StringLiteral = function (a) {
	return {ctor: 'StringLiteral', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Record = function (a) {
	return {ctor: 'Record', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$PropertyX = F3(
	function (a, b, c) {
		return {ctor: 'PropertyX', _0: a, _1: b, _2: c};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$UnionX = F3(
	function (a, b, c) {
		return {ctor: 'UnionX', _0: a, _1: b, _2: c};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$ValueX = F2(
	function (a, b) {
		return {ctor: 'ValueX', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$TupleLiteralX = F2(
	function (a, b) {
		return {ctor: 'TupleLiteralX', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$ListLiteralX = F2(
	function (a, b) {
		return {ctor: 'ListLiteralX', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$StringLiteralX = F2(
	function (a, b) {
		return {ctor: 'StringLiteralX', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$RecordX = F2(
	function (a, b) {
		return {ctor: 'RecordX', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachId = F2(
	function (id, ast) {
		var _p0 = ast;
		switch (_p0.ctor) {
			case 'Record':
				return A2(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$RecordX,
					id,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachIdToList, id, _p0._0));
			case 'StringLiteral':
				return A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$StringLiteralX, id, _p0._0);
			case 'ListLiteral':
				return A2(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$ListLiteralX,
					id,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachIdToList, id, _p0._0));
			case 'TupleLiteral':
				return A2(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$TupleLiteralX,
					id,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachIdToList, id, _p0._0));
			case 'Value':
				return A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$ValueX, id, _p0._0);
			case 'Union':
				var _p1 = _p0._0;
				var id$ = A2(
					_elm_lang$core$Basics_ops['++'],
					id,
					A2(_elm_lang$core$Basics_ops['++'], '.', _p1));
				return A3(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$UnionX,
					id$,
					_p1,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachIdToList, id$, _p0._1));
			default:
				var _p2 = _p0._0;
				var id$ = A2(
					_elm_lang$core$Basics_ops['++'],
					id,
					A2(_elm_lang$core$Basics_ops['++'], '.', _p2));
				return A3(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$PropertyX,
					id$,
					_p2,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachId, id$, _p0._1));
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachIdToList = F2(
	function (id, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (index, p) {
					return A2(
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachId,
						A2(
							_elm_lang$core$Basics_ops['++'],
							id,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'.',
								_elm_lang$core$Basics$toString(index))),
						p);
				}),
			list);
	});

var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$equal = _Bogdanp$elm_combine$Combine$string('=');
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$comma = _Bogdanp$elm_combine$Combine$string(',');
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces = _Bogdanp$elm_combine$Combine$regex('[ ]*');
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaced = function (p) {
	return A3(_Bogdanp$elm_combine$Combine$between, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces, p);
};

var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$propertyKey = _Bogdanp$elm_combine$Combine$regex('[^ ]+');
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$tag = _Bogdanp$elm_combine$Combine$regex('[A-Z][a-zA-Z0-9_.]*');
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$singleUnion = _Bogdanp$elm_combine$Combine$rec(
	function (_p0) {
		return A2(
			_Bogdanp$elm_combine$Combine$map,
			function (tag) {
				return A2(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Union,
					tag,
					_elm_lang$core$Native_List.fromArray(
						[]));
			},
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$tag);
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$null = A2(
	_Bogdanp$elm_combine$Combine$map,
	_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Value,
	_Bogdanp$elm_combine$Combine$regex('[a-z]+'));
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$internalStructure = A2(
	_Bogdanp$elm_combine$Combine$map,
	_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Value,
	_Bogdanp$elm_combine$Combine$regex('<[^>]*>'));
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$numberLiteral = A2(
	_Bogdanp$elm_combine$Combine$map,
	_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Value,
	_Bogdanp$elm_combine$Combine$regex('(\\-)?[0-9][0-9.]*'));
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$stringLiteral = A2(
	_Bogdanp$elm_combine$Combine$map,
	_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$StringLiteral,
	A3(
		_Bogdanp$elm_combine$Combine$between,
		_Bogdanp$elm_combine$Combine$string('\"'),
		_Bogdanp$elm_combine$Combine$string('\"'),
		_Bogdanp$elm_combine$Combine$regex('(\\\\\"|[^\"])*')));
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$expression = _Bogdanp$elm_combine$Combine$rec(
	function (_p1) {
		return A2(_Bogdanp$elm_combine$Combine$or, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$union, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$expressionWithoutUnion);
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$expressionWithoutUnion = _Bogdanp$elm_combine$Combine$rec(
	function (_p2) {
		return A2(
			_Bogdanp$elm_combine$Combine$or,
			A2(
				_Bogdanp$elm_combine$Combine$or,
				A2(
					_Bogdanp$elm_combine$Combine$or,
					A2(
						_Bogdanp$elm_combine$Combine$or,
						A2(
							_Bogdanp$elm_combine$Combine$or,
							A2(_Bogdanp$elm_combine$Combine$or, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$record, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$listLiteral),
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$tupleLiteral),
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$internalStructure),
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$stringLiteral),
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$numberLiteral),
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$null);
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$listLiteral = _Bogdanp$elm_combine$Combine$rec(
	function (_p3) {
		return A2(
			_Bogdanp$elm_combine$Combine$map,
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$ListLiteral,
			_Bogdanp$elm_combine$Combine$brackets(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$items));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$items = _Bogdanp$elm_combine$Combine$rec(
	function (_p4) {
		return _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaced(
			A2(
				_Bogdanp$elm_combine$Combine$sepBy,
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$comma,
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaced(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$expression)));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$record = _Bogdanp$elm_combine$Combine$rec(
	function (_p5) {
		return A2(
			_Bogdanp$elm_combine$Combine$map,
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Record,
			_Bogdanp$elm_combine$Combine$braces(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$properties));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$properties = _Bogdanp$elm_combine$Combine$rec(
	function (_p6) {
		return _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaced(
			A2(_Bogdanp$elm_combine$Combine$sepBy, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$comma, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$property));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$property = _Bogdanp$elm_combine$Combine$rec(
	function (_p7) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(
				_Bogdanp$elm_combine$Combine$andMap,
				A2(
					_Bogdanp$elm_combine$Combine$andMap,
					A2(
						_Bogdanp$elm_combine$Combine$andMap,
						A2(
							_Bogdanp$elm_combine$Combine$andMap,
							A2(
								_Bogdanp$elm_combine$Combine$andMap,
								A2(
									_Bogdanp$elm_combine$Combine$map,
									F7(
										function (_p12, key, _p11, _p10, _p9, value, _p8) {
											return A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Property, key, value);
										}),
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces),
								_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$propertyKey),
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces),
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$equal),
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces),
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$expression),
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces);
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$tupleLiteral = _Bogdanp$elm_combine$Combine$rec(
	function (_p13) {
		return A2(
			_Bogdanp$elm_combine$Combine$map,
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$TupleLiteral,
			_Bogdanp$elm_combine$Combine$parens(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$items));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$union = _Bogdanp$elm_combine$Combine$rec(
	function (_p14) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(
				_Bogdanp$elm_combine$Combine$map,
				F2(
					function (tag, tail) {
						return A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$Union, tag, tail);
					}),
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$tag),
			_Bogdanp$elm_combine$Combine$many(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$unionParam));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$unionParam = _Bogdanp$elm_combine$Combine$rec(
	function (_p15) {
		return A2(
			_Bogdanp$elm_combine$Combine$andMap,
			A2(
				_Bogdanp$elm_combine$Combine$map,
				F2(
					function (_p16, exp) {
						return exp;
					}),
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaces),
			A2(_Bogdanp$elm_combine$Combine$or, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$singleUnion, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$expressionWithoutUnion));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$parse = function (s) {
	return A2(
		_elm_lang$core$Result$formatError,
		_elm_lang$core$String$join(','),
		_elm_lang$core$Basics$fst(
			A2(
				_Bogdanp$elm_combine$Combine$parse,
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Util$spaced(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$expression),
				s)));
};

var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTabHover = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'background-color', _1: '#555'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailViewHead = _elm_lang$core$Native_List.fromArray(
	[]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$diffOrModelDetailViewContainer = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'position', _1: 'relative'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$lineBase = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'padding-left', _1: '10px'},
		{ctor: '_Tuple2', _0: 'white-space', _1: 'pre'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$omittedLine = _jinjor$elm_time_travel$TimeTravel_Internal_Styles$lineBase;
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$normalLine = _jinjor$elm_time_travel$TimeTravel_Internal_Styles$lineBase;
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$deletedLine = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'background-color', _1: 'rgba(255, 100, 100, 0.15)'}
		]),
	_jinjor$elm_time_travel$TimeTravel_Internal_Styles$lineBase);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$addedLine = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'background-color', _1: 'rgba(100, 255, 100, 0.15)'}
		]),
	_jinjor$elm_time_travel$TimeTravel_Internal_Styles$lineBase);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgTreeViewItemRowHover = function (selected) {
	return selected ? _elm_lang$core$Native_List.fromArray(
		[]) : _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'background-color', _1: '#555'}
		]);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$subPain = function (fixedToLeft) {
	return _elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: 'box-shadow',
			_1: fixedToLeft ? 'rgba(0, 0, 0, 0.15) 6px -3px 6px inset' : 'rgba(0, 0, 0, 0.15) -6px -3px 6px inset'
		}
		]);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgViewHover = function (selected) {
	return selected ? _elm_lang$core$Native_List.fromArray(
		[]) : _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'background-color', _1: '#555'}
		]);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$itemBackground = function (selected) {
	return _elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: 'background-color',
			_1: selected ? 'rgba(0, 0, 0, 0.5)' : ''
		}
		]);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailFlagmentToggle = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'white-space', _1: 'pre'},
		{ctor: '_Tuple2', _0: 'display', _1: 'inline'},
		{ctor: '_Tuple2', _0: 'background-color', _1: '#777'},
		{ctor: '_Tuple2', _0: 'cursor', _1: 'pointer'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailFlagmentToggleExpand = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'position', _1: 'relative'},
			{ctor: '_Tuple2', _0: 'left', _1: '-16px'},
			{ctor: '_Tuple2', _0: 'margin-right', _1: '-14px'}
		]),
	_jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailFlagmentToggle);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailFlagment = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'white-space', _1: 'pre'},
		{ctor: '_Tuple2', _0: 'display', _1: 'inline'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelViewContainer = _elm_lang$core$Native_List.fromArray(
	[]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugViewTheme = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'background-color', _1: '#444'},
		{ctor: '_Tuple2', _0: 'color', _1: '#eee'},
		{ctor: '_Tuple2', _0: 'font-family', _1: 'calibri, helvetica, arial, sans-serif'},
		{ctor: '_Tuple2', _0: 'font-size', _1: '14px'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailView = F2(
	function (fixedToLeft, opened) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'position', _1: 'absolute'},
					{ctor: '_Tuple2', _0: 'width', _1: '320px'},
					{
					ctor: '_Tuple2',
					_0: fixedToLeft ? 'right' : 'left',
					_1: '-320px'
				},
					{ctor: '_Tuple2', _0: 'box-sizing', _1: 'border-box'}
				]),
			A2(
				_elm_lang$core$Basics_ops['++'],
				_jinjor$elm_time_travel$TimeTravel_Internal_Styles$subPain(fixedToLeft),
				_jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugViewTheme));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTab = function (active) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'border-radius', _1: '3px 3px 0 0'},
				{ctor: '_Tuple2', _0: 'height', _1: '30px'},
				{ctor: '_Tuple2', _0: 'top', _1: '-30px'},
				{ctor: '_Tuple2', _0: 'cursor', _1: 'pointer'},
				{ctor: '_Tuple2', _0: 'position', _1: 'absolute'},
				{ctor: '_Tuple2', _0: 'text-align', _1: 'center'},
				{ctor: '_Tuple2', _0: 'line-height', _1: '30px'}
			]),
		A2(
			_elm_lang$core$Basics_ops['++'],
			active ? _elm_lang$core$Native_List.fromArray(
				[]) : _elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'box-shadow', _1: 'rgba(0, 0, 0, 0.25) 0px -1px 5px inset'}
				]),
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugViewTheme));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTabModel = F2(
	function (fixedToLeft, active) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'width', _1: '130px'},
					{
					ctor: '_Tuple2',
					_0: 'left',
					_1: fixedToLeft ? '10px' : '0'
				}
				]),
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTab(active));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTabDiff = F2(
	function (fixedToLeft, active) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'width', _1: '170px'},
					{
					ctor: '_Tuple2',
					_0: 'left',
					_1: fixedToLeft ? '150px' : '140px'
				}
				]),
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTab(active));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$panelBorder = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'border-bottom', _1: 'solid 1px #666'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel = function (visible) {
	return _elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: 'padding',
			_1: visible ? '20px' : '0 20px'
		},
			{ctor: '_Tuple2', _0: 'overflow', _1: 'hidden'}
		]);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$filterView = function (visible) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'background-color', _1: '#333'},
				{ctor: '_Tuple2', _0: 'transition', _1: 'height ease 0.3s, padding ease 0.3s'},
				{
				ctor: '_Tuple2',
				_0: 'height',
				_1: visible ? '' : '0'
			}
			]),
		A2(
			_elm_lang$core$Basics_ops['++'],
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panelBorder,
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(visible)));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$headerView = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'display', _1: 'flex'},
			{ctor: '_Tuple2', _0: 'justify-content', _1: 'flex-end'}
		]),
	_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(true));
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$subHeaderView = A2(_elm_lang$core$Basics_ops['++'], _jinjor$elm_time_travel$TimeTravel_Internal_Styles$headerView, _jinjor$elm_time_travel$TimeTravel_Internal_Styles$panelBorder);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelView = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'height', _1: '150px'},
			{ctor: '_Tuple2', _0: 'box-sizing', _1: 'border-box'}
		]),
	A2(
		_elm_lang$core$Basics_ops['++'],
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panelBorder,
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(true)));
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgListView = _jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(true);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgTreeView = A2(
	_elm_lang$core$Basics_ops['++'],
	_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(true),
	_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panelBorder);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailedMsgView = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'white-space', _1: 'pre'}
		]),
	A2(
		_elm_lang$core$Basics_ops['++'],
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(true),
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panelBorder));
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$diffView = _jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(true);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$pointer = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'cursor', _1: 'pointer'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$iconButton = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'padding', _1: '10px 10px 6px 10px'},
			{ctor: '_Tuple2', _0: 'border', _1: 'solid 1px #666'},
			{ctor: '_Tuple2', _0: 'border-radius', _1: '3px'}
		]),
	_jinjor$elm_time_travel$TimeTravel_Internal_Styles$pointer);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$buttonView = function (left) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		left ? _elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'margin-right', _1: 'auto'}
			]) : _elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'margin-left', _1: 'auto'}
			]),
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$iconButton);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$toggleModelDetailIcon = A2(
	_elm_lang$core$Basics_ops['++'],
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'right', _1: '20px'},
			{ctor: '_Tuple2', _0: 'top', _1: '20px'},
			{ctor: '_Tuple2', _0: 'position', _1: 'absolute'}
		]),
	A2(_elm_lang$core$Basics_ops['++'], _jinjor$elm_time_travel$TimeTravel_Internal_Styles$iconButton, _jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugViewTheme));
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgView = function (selected) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'white-space', _1: 'nowrap'},
				{ctor: '_Tuple2', _0: 'text-overflow', _1: 'ellipsis'},
				{ctor: '_Tuple2', _0: 'overflow', _1: 'hidden'}
			]),
		A2(
			_elm_lang$core$Basics_ops['++'],
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$itemBackground(selected),
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$pointer));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgTreeViewItemRow = function (selected) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'white-space', _1: 'pre'},
				{ctor: '_Tuple2', _0: 'text-overflow', _1: 'ellipsis'},
				{ctor: '_Tuple2', _0: 'overflow', _1: 'hidden'}
			]),
		A2(
			_elm_lang$core$Basics_ops['++'],
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$itemBackground(selected),
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$pointer));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$buttonHover = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'background-color', _1: '#555'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$button = _elm_lang$core$Native_List.fromArray(
	[
		{ctor: '_Tuple2', _0: 'padding', _1: '10px'},
		{ctor: '_Tuple2', _0: 'border', _1: 'solid 1px #666'},
		{ctor: '_Tuple2', _0: 'border-radius', _1: '3px'},
		{ctor: '_Tuple2', _0: 'cursor', _1: 'pointer'}
	]);
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$zIndex = {modelDetailView: '2147483646', debugView: '2147483646', resyncView: '2147483645'};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugView = function (fixedToLeft) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'position', _1: 'fixed'},
				{ctor: '_Tuple2', _0: 'width', _1: '250px'},
				{ctor: '_Tuple2', _0: 'top', _1: '0'},
				{
				ctor: '_Tuple2',
				_0: fixedToLeft ? 'left' : 'right',
				_1: '0'
			},
				{ctor: '_Tuple2', _0: 'bottom', _1: '0'},
				{ctor: '_Tuple2', _0: 'z-index', _1: _jinjor$elm_time_travel$TimeTravel_Internal_Styles$zIndex.debugView}
			]),
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugViewTheme);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$minimizedButton = function (fixedToLeft) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'position', _1: 'fixed'},
				{ctor: '_Tuple2', _0: 'bottom', _1: '0'},
				{
				ctor: '_Tuple2',
				_0: fixedToLeft ? 'left' : 'right',
				_1: '0'
			},
				{ctor: '_Tuple2', _0: 'z-index', _1: _jinjor$elm_time_travel$TimeTravel_Internal_Styles$zIndex.debugView}
			]),
		A2(_elm_lang$core$Basics_ops['++'], _jinjor$elm_time_travel$TimeTravel_Internal_Styles$iconButton, _jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugViewTheme));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailView = function (fixedToLeft) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'width', _1: '320px'},
				{ctor: '_Tuple2', _0: 'z-index', _1: _jinjor$elm_time_travel$TimeTravel_Internal_Styles$zIndex.modelDetailView},
				{ctor: '_Tuple2', _0: 'box-sizing', _1: 'border-box'}
			]),
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$panel(true));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Styles$resyncView = function (sync) {
	return _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'z-index', _1: _jinjor$elm_time_travel$TimeTravel_Internal_Styles$zIndex.resyncView},
			{ctor: '_Tuple2', _0: 'position', _1: 'fixed'},
			{ctor: '_Tuple2', _0: 'top', _1: '0'},
			{ctor: '_Tuple2', _0: 'bottom', _1: '0'},
			{ctor: '_Tuple2', _0: 'left', _1: '0'},
			{ctor: '_Tuple2', _0: 'right', _1: '0'},
			{ctor: '_Tuple2', _0: 'background-color', _1: 'rgba(0, 0, 0, 0.15)'},
			{
			ctor: '_Tuple2',
			_0: 'opacity',
			_1: sync ? '0' : '1'
		},
			{
			ctor: '_Tuple2',
			_0: 'pointer-events',
			_1: sync ? 'none' : ''
		},
			{ctor: '_Tuple2', _0: 'transition', _1: 'opacity ease 0.5s'}
		]);
};

var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatHelp = F4(
	function (formatPlain, formatListed, formatLong, model) {
		var _p0 = model;
		switch (_p0.ctor) {
			case 'Plain':
				return formatPlain(_p0._0);
			case 'Listed':
				return formatListed(_p0._0);
			default:
				return A3(formatLong, _p0._0, _p0._1, _p0._2);
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatPlainAsHtml = function (s) {
	return _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_elm_lang$html$Html$span,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailFlagment)
					]),
				A2(_elm_lang$core$String$startsWith, '\"', s) ? _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$title(s)
					]) : _elm_lang$core$Native_List.fromArray(
					[])),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(s)
				]))
		]);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsHtml = F3(
	function (transformMsg, expandedTree, model) {
		return A4(
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatHelp,
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatPlainAsHtml,
			function (list) {
				return A2(
					_elm_lang$core$List$concatMap,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsHtml, transformMsg, expandedTree),
					list);
			},
			F3(
				function (id, alt, children) {
					return A2(_elm_lang$core$Set$member, id, expandedTree) ? A2(
						_elm_lang$core$List_ops['::'],
						A2(
							_elm_lang$html$Html$span,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailFlagmentToggleExpand),
									_elm_lang$html$Html_Events$onClick(
									transformMsg(id))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(' - ')
								])),
						A2(
							_elm_lang$core$List$concatMap,
							A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsHtml, transformMsg, expandedTree),
							children)) : _elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$span,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailFlagmentToggle),
									_elm_lang$html$Html_Events$onClick(
									transformMsg(id))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(alt)
								]))
						]);
				}),
			model);
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString = function (model) {
	return A4(
		_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatHelp,
		_elm_lang$core$Basics$identity,
		function (_p1) {
			return A2(
				_elm_lang$core$String$join,
				'',
				A2(_elm_lang$core$List$map, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString, _p1));
		},
		F3(
			function (_p3, _p2, children) {
				return A2(
					_elm_lang$core$String$join,
					'',
					A2(_elm_lang$core$List$map, _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString, children));
			}),
		model);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent = function (context) {
	return A2(_elm_lang$core$String$repeat, context.nest, '  ');
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Context = F3(
	function (a, b, c) {
		return {nest: a, parens: b, wordsLimit: c};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Long = F3(
	function (a, b, c) {
		return {ctor: 'Long', _0: a, _1: b, _2: c};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Listed = function (a) {
	return {ctor: 'Listed', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain = function (a) {
	return {ctor: 'Plain', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$joinX = F2(
	function (s, list) {
		var _p4 = list;
		if (_p4.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			if (_p4._1.ctor === '[]') {
				return _elm_lang$core$Native_List.fromArray(
					[_p4._0]);
			} else {
				return A2(
					_elm_lang$core$List_ops['::'],
					_p4._0,
					A2(
						_elm_lang$core$List_ops['::'],
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(s),
						A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$joinX, s, _p4._1)));
			}
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelFromListLike = F7(
	function (canFold, id, indent, wordsLimit, start, end, list) {
		var _p5 = list;
		if (_p5.ctor === '[]') {
			return _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
				A2(_elm_lang$core$Basics_ops['++'], start, end));
		} else {
			var singleLine = _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Listed(
				A2(
					_elm_lang$core$List_ops['::'],
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
						A2(_elm_lang$core$Basics_ops['++'], start, ' ')),
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$joinX, ', ', list),
						_elm_lang$core$Native_List.fromArray(
							[
								_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
								A2(_elm_lang$core$Basics_ops['++'], ' ', end))
							]))));
			var singleLineStr = _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString(singleLine);
			var $long = (_elm_lang$core$Native_Utils.cmp(
				_elm_lang$core$String$length(singleLineStr),
				wordsLimit) > 0) || A2(_elm_lang$core$String$contains, '\n', singleLineStr);
			return (((!_elm_lang$core$Native_Utils.eq(indent, '')) && canFold) && $long) ? A3(
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Long,
				id,
				A2(
					_elm_lang$core$Basics_ops['++'],
					start,
					A2(_elm_lang$core$Basics_ops['++'], ' .. ', end)),
				A2(
					_elm_lang$core$List_ops['::'],
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
						A2(_elm_lang$core$Basics_ops['++'], start, ' ')),
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$joinX,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\n',
								A2(_elm_lang$core$Basics_ops['++'], indent, ', ')),
							list),
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Native_List.fromArray(
								[
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
									A2(_elm_lang$core$Basics_ops['++'], '\n', indent))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(end)
								]))))) : ($long ? _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Listed(
				A2(
					_elm_lang$core$List_ops['::'],
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
						A2(_elm_lang$core$Basics_ops['++'], start, ' ')),
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$joinX,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\n',
								A2(_elm_lang$core$Basics_ops['++'], indent, ', ')),
							list),
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Native_List.fromArray(
								[
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
									A2(_elm_lang$core$Basics_ops['++'], '\n', indent))
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(end)
								]))))) : singleLine);
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelWithContext = F2(
	function (c, ast) {
		var _p6 = ast;
		switch (_p6.ctor) {
			case 'RecordX':
				return A7(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelFromListLike,
					true,
					_p6._0,
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent(c),
					c.wordsLimit,
					'{',
					'}',
					A2(
						_elm_lang$core$List$map,
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelWithContext(
							_elm_lang$core$Native_Utils.update(
								c,
								{nest: c.nest + 1})),
						_p6._1));
			case 'PropertyX':
				var _p7 = _p6._1;
				var s = A2(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelWithContext,
					_elm_lang$core$Native_Utils.update(
						c,
						{parens: false, nest: c.nest + 1}),
					_p6._2);
				var str = _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString(s);
				return _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Listed(
					A2(
						_elm_lang$core$List_ops['::'],
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
							A2(_elm_lang$core$Basics_ops['++'], _p7, ' = ')),
						(A2(_elm_lang$core$String$contains, '\n', str) || (_elm_lang$core$Native_Utils.cmp(
							_elm_lang$core$String$length(
								A2(
									_elm_lang$core$Basics_ops['++'],
									_p7,
									A2(_elm_lang$core$Basics_ops['++'], ' = ', str))),
							c.wordsLimit) > 0)) ? _elm_lang$core$Native_List.fromArray(
							[
								_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\n',
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent(
										_elm_lang$core$Native_Utils.update(
											c,
											{nest: c.nest + 1})))),
								s
							]) : _elm_lang$core$Native_List.fromArray(
							[s])));
			case 'StringLiteralX':
				return _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\"',
						A2(_elm_lang$core$Basics_ops['++'], _p6._1, '\"')));
			case 'ValueX':
				return _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(_p6._1);
			case 'UnionX':
				var _p9 = _p6._2;
				var _p8 = _p6._1;
				var tailX = A2(
					_elm_lang$core$List$map,
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelWithContext(
						_elm_lang$core$Native_Utils.update(
							c,
							{nest: c.nest + 1, parens: true})),
					_p9);
				var joinedTailStr = _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Listed(tailX));
				var multiLine = A2(_elm_lang$core$String$contains, '\n', joinedTailStr) || (_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$String$length(
						A2(_elm_lang$core$Basics_ops['++'], _p8, joinedTailStr)),
					c.wordsLimit) > 0);
				var s = _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Listed(
					multiLine ? A2(
						_elm_lang$core$List_ops['::'],
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p8,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\n',
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent(
										_elm_lang$core$Native_Utils.update(
											c,
											{nest: c.nest + 1}))))),
						A2(
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$joinX,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\n',
								_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent(
									_elm_lang$core$Native_Utils.update(
										c,
										{nest: c.nest + 1}))),
							tailX)) : A2(
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$joinX,
						' ',
						A2(
							_elm_lang$core$List_ops['::'],
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(_p8),
							tailX)));
				return (_elm_lang$core$Basics$not(
					_elm_lang$core$List$isEmpty(_p9)) && c.parens) ? _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Listed(
					_elm_lang$core$Native_List.fromArray(
						[
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain('('),
							s,
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$Plain(
							multiLine ? A2(
								_elm_lang$core$Basics_ops['++'],
								'\n',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent(c),
									')')) : ')')
						])) : s;
			case 'ListLiteralX':
				return A7(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelFromListLike,
					true,
					_p6._0,
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent(c),
					c.wordsLimit,
					'[',
					']',
					A2(
						_elm_lang$core$List$map,
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelWithContext(
							_elm_lang$core$Native_Utils.update(
								c,
								{parens: false, nest: c.nest + 1})),
						_p6._1));
			default:
				return A7(
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelFromListLike,
					false,
					_p6._0,
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$indent(c),
					c.wordsLimit,
					'(',
					')',
					A2(
						_elm_lang$core$List$map,
						_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelWithContext(
							_elm_lang$core$Native_Utils.update(
								c,
								{parens: false, nest: c.nest + 1})),
						_p6._1));
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModel = _jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModelWithContext(
	{nest: 0, parens: false, wordsLimit: 40});

var _jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$root = function (_p0) {
	var _p1 = _p0;
	return _p1._0;
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$Node = F2(
	function (a, b) {
		return {ctor: 'Node', _0: a, _1: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$singleton = function (a) {
	return A2(
		_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$Node,
		a,
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$addChild = F2(
	function ($new, _p2) {
		var _p3 = _p2;
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$Node,
			_p3._0,
			A2(
				_elm_lang$core$List_ops['::'],
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$singleton($new),
				_p3._1));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$addChildAt = F3(
	function (f, $new, tree) {
		var _p4 = tree;
		var a = _p4._0;
		var list = _p4._1;
		var _p5 = f(a) ? A2(_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$addChild, $new, tree) : tree;
		var a$ = _p5._0;
		var list$ = _p5._1;
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$Node,
			a$,
			A2(
				_elm_lang$core$List$map,
				A2(_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$addChildAt, f, $new),
				list$));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$sortEachBranchBy = F2(
	function (f, _p6) {
		var _p7 = _p6;
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$Node,
			_p7._0,
			A2(
				_elm_lang$core$List$sortBy,
				function (_p8) {
					return f(
						_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$root(_p8));
				},
				A2(
					_elm_lang$core$List$map,
					_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$sortEachBranchBy(f),
					_p7._1)));
	});

var _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$format = function (msgLike) {
	var _p0 = msgLike;
	switch (_p0.ctor) {
		case 'Message':
			return _elm_lang$core$Basics$toString(_p0._0);
		case 'UrlData':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'[Nav] ',
				_elm_lang$core$Basics$toString(_p0._0));
		default:
			return '[Init]';
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$Init = {ctor: 'Init'};
var _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$UrlData = function (a) {
	return {ctor: 'UrlData', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$Message = function (a) {
	return {ctor: 'Message', _0: a};
};

var _jinjor$elm_time_travel$TimeTravel_Internal_Model$encodeSetting = function (settings) {
	return A2(
		_elm_lang$core$Json_Encode$encode,
		0,
		_elm_lang$core$Json_Encode$object(
			_elm_lang$core$Native_List.fromArray(
				[
					{
					ctor: '_Tuple2',
					_0: 'fixedToLeft',
					_1: _elm_lang$core$Json_Encode$bool(settings.fixedToLeft)
				},
					{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$list(
						A2(
							_elm_lang$core$List$map,
							function (_p0) {
								var _p1 = _p0;
								return _elm_lang$core$Json_Encode$list(
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$core$Json_Encode$string(_p1._0),
											_elm_lang$core$Json_Encode$bool(_p1._1)
										]));
							},
							settings.filter))
				}
				])));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$saveSetting = F2(
	function (save, model) {
		return A2(
			_elm_lang$core$Platform_Cmd$map,
			_elm_community$basics_extra$Basics_Extra$never,
			save(
				{
					type_: 'save',
					settings: _jinjor$elm_time_travel$TimeTravel_Internal_Model$encodeSetting(
						{fixedToLeft: model.fixedToLeft, filter: model.filter})
				}));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$msgRootOf = F2(
	function (id, history) {
		msgRootOf:
		while (true) {
			var _p2 = A2(
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$find,
				function (item) {
					return _elm_lang$core$Native_Utils.eq(item.id, id);
				},
				history);
			if (_p2.ctor === 'Just') {
				var _p4 = _p2._0;
				var _p3 = _p4.causedBy;
				if (_p3.ctor === 'Just') {
					var _v3 = _p3._0,
						_v4 = history;
					id = _v3;
					history = _v4;
					continue msgRootOf;
				} else {
					return _elm_lang$core$Maybe$Just(_p4);
				}
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedMsgTree = function (model) {
	var _p5 = model.selectedMsg;
	if (_p5.ctor === 'Just') {
		var _p6 = A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$msgRootOf, _p5._0, model.history);
		if (_p6.ctor === 'Just') {
			var f = F2(
				function (item, tree) {
					return A3(
						_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$addChildAt,
						function (i) {
							return _elm_lang$core$Native_Utils.eq(
								item.causedBy,
								_elm_lang$core$Maybe$Just(i.id));
						},
						item,
						tree);
				});
			return _elm_lang$core$Maybe$Just(
				A2(
					_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$sortEachBranchBy,
					function (item) {
						return item.id;
					},
					A3(
						_elm_lang$core$List$foldr,
						f,
						_jinjor$elm_time_travel$TimeTravel_Internal_Util_RTree$singleton(_p6._0),
						_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(model.history))));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectFirstIfSync = function (model) {
	return model.sync ? _elm_lang$core$Native_Utils.update(
		model,
		{
			selectedMsg: _elm_lang$core$Maybe$Just(
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$head(model.history).id)
		}) : model;
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedAndOldAst = function (model) {
	var _p7 = model.selectedMsg;
	if (_p7.ctor === 'Just') {
		var _p10 = _p7._0;
		var newAndOld = A3(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMapMany,
			2,
			function (item) {
				return (_elm_lang$core$Native_Utils.eq(item.id, _p10) || _elm_lang$core$Native_Utils.eq(item.id, _p10 - 1)) ? _elm_lang$core$Maybe$Just(item.lazyModelAst) : _elm_lang$core$Maybe$Nothing;
			},
			model.history);
		var _p8 = newAndOld;
		_v8_2:
		do {
			if (((_p8.ctor === '::') && (_p8._0.ctor === 'Just')) && (_p8._0._0.ctor === 'Ok')) {
				if (_p8._1.ctor === '::') {
					if ((_p8._1._0.ctor === 'Just') && (_p8._1._0._0.ctor === 'Ok')) {
						return _elm_lang$core$Maybe$Just(
							{ctor: '_Tuple2', _0: _p8._1._0._0._0, _1: _p8._0._0._0});
					} else {
						break _v8_2;
					}
				} else {
					var _p9 = _p8._0._0._0;
					return _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple2', _0: _p9, _1: _p9});
				}
			} else {
				break _v8_2;
			}
		} while(false);
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedMsgAst = function (model) {
	var _p11 = model.selectedMsg;
	if (_p11.ctor === 'Just') {
		var _p12 = A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$findMap,
			function (item) {
				return _elm_lang$core$Native_Utils.eq(item.id, _p11._0) ? _elm_lang$core$Maybe$Just(item.lazyMsgAst) : _elm_lang$core$Maybe$Nothing;
			},
			model.history);
		if (((_p12.ctor === 'Just') && (_p12._0.ctor === 'Just')) && (_p12._0._0.ctor === 'Ok')) {
			return _elm_lang$core$Maybe$Just(_p12._0._0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$makeChanges = F2(
	function (oldAst, newAst) {
		return _elm_lang$core$Native_Utils.eq(oldAst, newAst) ? _elm_lang$core$Native_List.fromArray(
			[]) : A2(
			_avh4$elm_diff$Diff$diffLines,
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString(
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModel(oldAst)),
			_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString(
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModel(newAst)));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyDiffHelp = F2(
	function (model, item) {
		var newDiff = function () {
			var _p13 = item.lazyDiff;
			if (_p13.ctor === 'Just') {
				return _elm_lang$core$Maybe$Just(_p13._0);
			} else {
				var _p14 = _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedAndOldAst(model);
				if (_p14.ctor === 'Just') {
					return _elm_lang$core$Maybe$Just(
						A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$makeChanges, _p14._0._0, _p14._0._1));
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			}
		}();
		return _elm_lang$core$Native_Utils.update(
			item,
			{lazyDiff: newDiff});
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyAstHelp = function (item) {
	return _elm_lang$core$Native_Utils.update(
		item,
		{
			lazyMsgAst: function () {
				if (_elm_lang$core$Native_Utils.eq(item.lazyMsgAst, _elm_lang$core$Maybe$Nothing)) {
					var _p15 = item.msg;
					switch (_p15.ctor) {
						case 'Message':
							return _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Result$map,
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachId(''),
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$parse(
										_elm_lang$core$Basics$toString(_p15._0))));
						case 'UrlData':
							return _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$core$Result$map,
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachId(''),
									_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$parse(
										_elm_lang$core$Basics$toString(_p15._0))));
						default:
							return _elm_lang$core$Maybe$Just(
								_elm_lang$core$Result$Err(''));
					}
				} else {
					return item.lazyMsgAst;
				}
			}(),
			lazyModelAst: _elm_lang$core$Native_Utils.eq(item.lazyModelAst, _elm_lang$core$Maybe$Nothing) ? _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$Result$map,
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_AST$attachId(''),
					_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Parser$parse(
						_elm_lang$core$Basics$toString(item.model)))) : item.lazyModelAst
		});
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$mapHistory = F2(
	function (f, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				history: A2(_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$map, f, model.history)
			});
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyAst = function (model) {
	var _p16 = model.selectedMsg;
	if (_p16.ctor === 'Just') {
		var _p17 = _p16._0;
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Model$mapHistory,
			function (item) {
				return (_elm_lang$core$Native_Utils.eq(item.id, _p17) || _elm_lang$core$Native_Utils.eq(item.id, _p17 - 1)) ? _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyAstHelp(item) : item;
			},
			model);
	} else {
		return model;
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyDiff = function (model) {
	if (model.showModelDetail) {
		return model;
	} else {
		var _p18 = model.selectedMsg;
		if (_p18.ctor === 'Just') {
			return A2(
				_jinjor$elm_time_travel$TimeTravel_Internal_Model$mapHistory,
				function (item) {
					return _elm_lang$core$Native_Utils.eq(item.id, _p18._0) ? A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyDiffHelp, model, item) : item;
				},
				model);
		} else {
			return model;
		}
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$futureToHistory = function (model) {
	return _elm_lang$core$Native_Utils.update(
		model,
		{
			future: _elm_lang$core$Native_List.fromArray(
				[]),
			history: A2(_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$concat, model.future, model.history)
		});
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateFilter = F2(
	function (msgLike, filterOptions) {
		var str = function () {
			var _p19 = msgLike;
			switch (_p19.ctor) {
				case 'Message':
					return _elm_lang$core$Basics$toString(_p19._0);
				case 'UrlData':
					return '[Nav] ';
				default:
					return '';
			}
		}();
		var _p20 = _elm_lang$core$String$words(str);
		if (_p20.ctor === '::') {
			var _p23 = _p20._0;
			var exists = A2(
				_elm_lang$core$List$any,
				function (_p21) {
					var _p22 = _p21;
					return _elm_lang$core$Native_Utils.eq(_p22._0, _p23);
				},
				filterOptions);
			return exists ? filterOptions : A2(
				_elm_lang$core$List_ops['::'],
				{ctor: '_Tuple2', _0: _p23, _1: true},
				filterOptions);
		} else {
			return filterOptions;
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedItem = function (model) {
	var _p24 = {ctor: '_Tuple2', _0: model.sync, _1: model.selectedMsg};
	if (_p24._0 === true) {
		return _elm_lang$core$Maybe$Just(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$head(model.history));
	} else {
		if (_p24._1.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$head(model.history));
		} else {
			return A2(
				_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$find,
				function (item) {
					return _elm_lang$core$Native_Utils.eq(item.id, _p24._1._0);
				},
				model.history);
		}
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$newItem = F4(
	function (id, msg, causedBy, model) {
		return {id: id, msg: msg, causedBy: causedBy, model: model, lazyMsgAst: _elm_lang$core$Maybe$Nothing, lazyModelAst: _elm_lang$core$Maybe$Nothing, lazyDiff: _elm_lang$core$Maybe$Nothing};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateOnIncomingUserMsg = F4(
	function (transformMsg, update, _p25, model) {
		var _p26 = _p25;
		var _p29 = _p26._1;
		var megLike = _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$Message(_p29);
		var _p27 = model.history;
		var last = _p27._0;
		var past = _p27._1;
		var _p28 = A2(update, _p29, last.model);
		var newRawUserModel = _p28._0;
		var userCmd = _p28._1;
		var nextItem = A4(_jinjor$elm_time_travel$TimeTravel_Internal_Model$newItem, model.msgId, megLike, _p26._0, newRawUserModel);
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			_jinjor$elm_time_travel$TimeTravel_Internal_Model$selectFirstIfSync(
				_elm_lang$core$Native_Utils.update(
					model,
					{
						filter: A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$updateFilter, megLike, model.filter),
						msgId: model.msgId + 1,
						future: _elm_lang$core$Basics$not(model.sync) ? A2(_elm_lang$core$List_ops['::'], nextItem, model.future) : model.future,
						history: model.sync ? A2(_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$cons, nextItem, model.history) : model.history
					})),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$core$Platform_Cmd$map,
					transformMsg,
					A2(
						_elm_lang$core$Platform_Cmd$map,
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							})(model.msgId),
						userCmd))
				]));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$urlUpdateOnIncomingData = F4(
	function (transformMsg, urlUpdate, data, model) {
		var msgLike = _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$UrlData(data);
		var _p30 = model.history;
		var last = _p30._0;
		var past = _p30._1;
		var _p31 = A2(urlUpdate, data, last.model);
		var newRawUserModel = _p31._0;
		var userCmd = _p31._1;
		var nextItem = A4(_jinjor$elm_time_travel$TimeTravel_Internal_Model$newItem, model.msgId, msgLike, _elm_lang$core$Maybe$Nothing, newRawUserModel);
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			_jinjor$elm_time_travel$TimeTravel_Internal_Model$selectFirstIfSync(
				_elm_lang$core$Native_Utils.update(
					model,
					{
						filter: A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$updateFilter, msgLike, model.filter),
						msgId: model.msgId + 1,
						future: _elm_lang$core$Basics$not(model.sync) ? A2(_elm_lang$core$List_ops['::'], nextItem, model.future) : model.future,
						history: model.sync ? A2(_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$cons, nextItem, model.history) : model.history
					})),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$core$Platform_Cmd$map,
					transformMsg,
					A2(
						_elm_lang$core$Platform_Cmd$map,
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							})(model.msgId),
						userCmd))
				]));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$initItem = function (model) {
	return A4(_jinjor$elm_time_travel$TimeTravel_Internal_Model$newItem, 0, _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$Init, _elm_lang$core$Maybe$Nothing, model);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$init = function (model) {
	return {
		future: _elm_lang$core$Native_List.fromArray(
			[]),
		history: A2(
			_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$Nel,
			_jinjor$elm_time_travel$TimeTravel_Internal_Model$initItem(model),
			_elm_lang$core$Native_List.fromArray(
				[])),
		filter: _elm_lang$core$Native_List.fromArray(
			[]),
		sync: true,
		showModelDetail: true,
		expand: false,
		msgId: 1,
		selectedMsg: _elm_lang$core$Maybe$Nothing,
		showDiff: false,
		fixedToLeft: false,
		expandedTree: _elm_lang$core$Set$empty,
		minimized: false
	};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$HistoryItem = F7(
	function (a, b, c, d, e, f, g) {
		return {id: a, msg: b, causedBy: c, model: d, lazyMsgAst: e, lazyModelAst: f, lazyDiff: g};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return {future: a, history: b, filter: c, sync: d, showModelDetail: e, expand: f, msgId: g, selectedMsg: h, showDiff: i, fixedToLeft: j, expandedTree: k, minimized: l};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$Settings = F2(
	function (a, b) {
		return {fixedToLeft: a, filter: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$settingsDecoder = A3(
	_elm_lang$core$Json_Decode$object2,
	_jinjor$elm_time_travel$TimeTravel_Internal_Model$Settings,
	A2(_elm_lang$core$Json_Decode_ops[':='], 'fixedToLeft', _elm_lang$core$Json_Decode$bool),
	A2(
		_elm_lang$core$Json_Decode_ops[':='],
		'filter',
		_elm_lang$core$Json_Decode$list(
			A3(
				_elm_lang$core$Json_Decode$tuple2,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				_elm_lang$core$Json_Decode$string,
				_elm_lang$core$Json_Decode$bool))));
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$decodeSettings = _elm_lang$core$Json_Decode$decodeString(_jinjor$elm_time_travel$TimeTravel_Internal_Model$settingsDecoder);
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$OutgoingMsg = F2(
	function (a, b) {
		return {type_: a, settings: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$IncomingMsg = F2(
	function (a, b) {
		return {type_: a, settings: b};
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleMinimize = {ctor: 'ToggleMinimize'};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleModelTree = function (a) {
	return {ctor: 'ToggleModelTree', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleModelDetail = function (a) {
	return {ctor: 'ToggleModelDetail', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$Receive = function (a) {
	return {ctor: 'Receive', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleLayout = {ctor: 'ToggleLayout'};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$Resync = {ctor: 'Resync'};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$SelectMsg = function (a) {
	return {ctor: 'SelectMsg', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleFilter = function (a) {
	return {ctor: 'ToggleFilter', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleExpand = {ctor: 'ToggleExpand'};
var _jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleSync = {ctor: 'ToggleSync'};

var _jinjor$elm_time_travel$TimeTravel_Internal_Update$updateAfterUserMsg = F2(
	function (save, model) {
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			model,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$saveSetting, save, model)
				]));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Update$toggleSet = F2(
	function (a, set) {
		return A2(
			A2(_elm_lang$core$Set$member, a, set) ? _elm_lang$core$Set$remove : _elm_lang$core$Set$insert,
			a,
			set);
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_Update$update = F3(
	function (save, message, model) {
		var _p0 = message;
		switch (_p0.ctor) {
			case 'Receive':
				var _p2 = _p0._0;
				if (_elm_lang$core$Native_Utils.eq(_p2.type_, 'load')) {
					var _p1 = _jinjor$elm_time_travel$TimeTravel_Internal_Model$decodeSettings(_p2.settings);
					if (_p1.ctor === 'Ok') {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{fixedToLeft: _p1._0.fixedToLeft, filter: _p1._0.filter}),
							_elm_lang$core$Native_List.fromArray(
								[]));
					} else {
						return A2(
							_elm_lang$core$Debug$log,
							'err decoing',
							A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								_elm_lang$core$Native_List.fromArray(
									[])));
					}
				} else {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						_elm_lang$core$Native_List.fromArray(
							[]));
				}
			case 'ToggleSync':
				var nextSync = _elm_lang$core$Basics$not(model.sync);
				var newModel = (nextSync ? _jinjor$elm_time_travel$TimeTravel_Internal_Model$futureToHistory : _elm_lang$core$Basics$identity)(
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$selectFirstIfSync(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								selectedMsg: nextSync ? _elm_lang$core$Maybe$Nothing : model.selectedMsg,
								sync: nextSync,
								showModelDetail: false
							})));
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'ToggleExpand':
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{
						expand: _elm_lang$core$Basics$not(model.expand)
					});
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'ToggleFilter':
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{
						filter: A2(
							_elm_lang$core$List$map,
							function (_p3) {
								var _p4 = _p3;
								var _p6 = _p4._1;
								var _p5 = _p4._0;
								return _elm_lang$core$Native_Utils.eq(_p0._0, _p5) ? {
									ctor: '_Tuple2',
									_0: _p5,
									_1: _elm_lang$core$Basics$not(_p6)
								} : {ctor: '_Tuple2', _0: _p5, _1: _p6};
							},
							model.filter)
					});
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$saveSetting, save, newModel)
						]));
			case 'SelectMsg':
				var newModel = _jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyDiff(
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyAst(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								selectedMsg: _elm_lang$core$Maybe$Just(_p0._0),
								sync: false
							})));
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'Resync':
				var newModel = _jinjor$elm_time_travel$TimeTravel_Internal_Model$futureToHistory(
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$selectFirstIfSync(
						_elm_lang$core$Native_Utils.update(
							model,
							{sync: true, showModelDetail: false})));
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'ToggleLayout':
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{
						fixedToLeft: _elm_lang$core$Basics$not(model.fixedToLeft)
					});
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_jinjor$elm_time_travel$TimeTravel_Internal_Model$saveSetting, save, newModel)
						]));
			case 'ToggleModelDetail':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$updateLazyDiff(
						_elm_lang$core$Native_Utils.update(
							model,
							{showModelDetail: _p0._0})),
					_elm_lang$core$Native_List.fromArray(
						[]));
			case 'ToggleModelTree':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							expandedTree: A2(_jinjor$elm_time_travel$TimeTravel_Internal_Update$toggleSet, _p0._0, model.expandedTree)
						}),
					_elm_lang$core$Native_List.fromArray(
						[]));
			default:
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$futureToHistory(
						_jinjor$elm_time_travel$TimeTravel_Internal_Model$selectFirstIfSync(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									minimized: _elm_lang$core$Basics$not(model.minimized),
									sync: true
								}))),
					_elm_lang$core$Native_List.fromArray(
						[]));
		}
	});

var _jinjor$elm_time_travel$TimeTravel_Internal_Icons$minimize = function (minimized) {
	return A2(
		minimized ? _elm_community$elm_material_icons$Material_Icons_Content$add : _elm_community$elm_material_icons$Material_Icons_Content$remove,
		_elm_lang$core$Color$white,
		24);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Icons$toggleModelDetail = A2(_elm_community$elm_material_icons$Material_Icons_Content$content_copy, _elm_lang$core$Color$white, 24);
var _jinjor$elm_time_travel$TimeTravel_Internal_Icons$layout = A2(_elm_community$elm_material_icons$Material_Icons_Action$swap_horiz, _elm_lang$core$Color$white, 24);
var _jinjor$elm_time_travel$TimeTravel_Internal_Icons$filterExpand = function (expanded) {
	return A2(
		expanded ? _elm_community$elm_material_icons$Material_Icons_Navigation$arrow_drop_up : _elm_community$elm_material_icons$Material_Icons_Navigation$arrow_drop_down,
		_elm_lang$core$Color$white,
		24);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Icons$filter = function (enabled) {
	return A2(
		_elm_community$elm_material_icons$Material_Icons_Content$filter_list,
		enabled ? _elm_lang$core$Color$white : _elm_lang$core$Color$gray,
		24);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_Icons$sync = function ($synchronized) {
	return A2(
		$synchronized ? _elm_community$elm_material_icons$Material_Icons_Av$pause : _elm_community$elm_material_icons$Material_Icons_Av$play_arrow,
		_elm_lang$core$Color$white,
		24);
};

var _jinjor$elm_time_travel$TimeTravel_Internal_MsgTreeView$itemRow = F4(
	function (onSelect, indent, selectedMsg, item) {
		return A4(
			_jinjor$elm_inline_hover$InlineHover$hover,
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgTreeViewItemRowHover(
				_elm_lang$core$Native_Utils.eq(selectedMsg, item.id)),
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(
					_jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgTreeViewItemRow(
						_elm_lang$core$Native_Utils.eq(selectedMsg, item.id))),
					_elm_lang$html$Html_Events$onClick(
					onSelect(item.id))
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(_elm_lang$core$String$repeat, indent, '    '),
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(item.id),
							A2(
								_elm_lang$core$Basics_ops['++'],
								': ',
								_jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$format(item.msg)))))
				]));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_MsgTreeView$viewTree = F4(
	function (onSelect, indent, selectedMsg, _p0) {
		var _p1 = _p0;
		return A2(
			_elm_lang$core$List_ops['::'],
			A4(_jinjor$elm_time_travel$TimeTravel_Internal_MsgTreeView$itemRow, onSelect, indent, selectedMsg, _p1._0),
			A2(
				_elm_lang$core$List$concatMap,
				A3(_jinjor$elm_time_travel$TimeTravel_Internal_MsgTreeView$viewTree, onSelect, indent + 1, selectedMsg),
				_p1._1));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_MsgTreeView$view = F3(
	function (onSelect, selectedMsg, tree) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgTreeView)
				]),
			A4(_jinjor$elm_time_travel$TimeTravel_Internal_MsgTreeView$viewTree, onSelect, 0, selectedMsg, tree));
	});

var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$normalLine = function (s) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$normalLine)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(s)
			]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$addedLine = function (s) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$addedLine)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(s)
			]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$deletedLine = function (s) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$deletedLine)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(s)
			]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$omittedLine = A2(
	_elm_lang$html$Html$div,
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$omittedLine)
		]),
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$html$Html$text('...')
		]));
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$lines = function (s) {
	return A2(
		_elm_lang$core$List$filter,
		F2(
			function (x, y) {
				return !_elm_lang$core$Native_Utils.eq(x, y);
			})(''),
		_elm_lang$core$String$lines(s));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Omit = {ctor: 'Omit'};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$tmpToResult = F4(
	function (additionalLines, next, tmp, result) {
		return _elm_lang$core$Native_Utils.eq(
			result,
			_elm_lang$core$Native_List.fromArray(
				[])) ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: A2(
				_elm_lang$core$List_ops['::'],
				next,
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_elm_lang$core$List$take, additionalLines, tmp),
					(_elm_lang$core$Native_Utils.cmp(
						_elm_lang$core$List$length(tmp),
						additionalLines) > 0) ? _elm_lang$core$Native_List.fromArray(
						[_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Omit]) : _elm_lang$core$Native_List.fromArray(
						[])))
		} : ((_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(tmp),
			additionalLines * 2) > 0) ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: A2(
				_elm_lang$core$List_ops['::'],
				next,
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_elm_lang$core$List$take, additionalLines, tmp),
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_List.fromArray(
							[_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Omit]),
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(
								_elm_lang$core$List$drop,
								_elm_lang$core$List$length(tmp) - additionalLines,
								tmp),
							result))))
		} : {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: A2(
				_elm_lang$core$List_ops['::'],
				next,
				A2(_elm_lang$core$Basics_ops['++'], tmp, result))
		});
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Add = function (a) {
	return {ctor: 'Add', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Delete = function (a) {
	return {ctor: 'Delete', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Normal = function (a) {
	return {ctor: 'Normal', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$reduceLines = function (list) {
	var additionalLines = 2;
	var _p0 = A3(
		_elm_lang$core$List$foldr,
		F2(
			function (line, _p1) {
				var _p2 = _p1;
				var _p5 = _p2._0;
				var _p4 = _p2._1;
				var _p3 = line;
				switch (_p3.ctor) {
					case 'Normal':
						return {
							ctor: '_Tuple2',
							_0: A2(
								_elm_lang$core$List_ops['::'],
								_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Normal(_p3._0),
								_p5),
							_1: _p4
						};
					case 'Delete':
						return A4(
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$tmpToResult,
							additionalLines,
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Delete(_p3._0),
							_p5,
							_p4);
					case 'Add':
						return A4(
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$tmpToResult,
							additionalLines,
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Add(_p3._0),
							_p5,
							_p4);
					default:
						return {ctor: '_Tuple2', _0: _p5, _1: _p4};
				}
			}),
		{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: _elm_lang$core$Native_List.fromArray(
				[])
		},
		list);
	var tmp = _p0._0;
	var result = _p0._1;
	return _elm_lang$core$Native_Utils.eq(
		result,
		_elm_lang$core$Native_List.fromArray(
			[])) ? _elm_lang$core$Native_List.fromArray(
		[]) : ((_elm_lang$core$Native_Utils.cmp(
		_elm_lang$core$List$length(tmp),
		additionalLines) > 0) ? A2(
		_elm_lang$core$List_ops['::'],
		_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Omit,
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$List$drop,
				_elm_lang$core$List$length(tmp) - additionalLines,
				tmp),
			result)) : A2(_elm_lang$core$Basics_ops['++'], tmp, result));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$view = function (changes) {
	var list = A2(
		_elm_lang$core$List$concatMap,
		function (change) {
			var _p6 = change;
			switch (_p6.ctor) {
				case 'NoChange':
					return A2(
						_elm_lang$core$List$map,
						_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Normal,
						_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$lines(_p6._0));
				case 'Changed':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$List$map,
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Delete,
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$lines(_p6._0)),
						A2(
							_elm_lang$core$List$map,
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Add,
							_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$lines(_p6._1)));
				case 'Added':
					return A2(
						_elm_lang$core$List$map,
						_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Add,
						_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$lines(_p6._0));
				default:
					return A2(
						_elm_lang$core$List$map,
						_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$Delete,
						_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$lines(_p6._0));
			}
		},
		changes);
	var linesView = A2(
		_elm_lang$core$List$map,
		function (line) {
			var _p7 = line;
			switch (_p7.ctor) {
				case 'Normal':
					return _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$normalLine(_p7._0);
				case 'Delete':
					return _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$deletedLine(_p7._0);
				case 'Add':
					return _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$addedLine(_p7._0);
				default:
					return _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$omittedLine;
			}
		},
		_jinjor$elm_time_travel$TimeTravel_Internal_DiffView$reduceLines(list));
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$diffView)
			]),
		linesView);
};

var _jinjor$elm_time_travel$TimeTravel_Internal_View$detailTab = F3(
	function (style$, msg, name) {
		return A4(
			_jinjor$elm_inline_hover$InlineHover$hover,
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTabHover,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(style$),
					_elm_lang$html$Html_Events$onClick(msg)
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(name)
				]));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$filterMapUntilLimitHelp = F4(
	function (result, limit, f, list) {
		filterMapUntilLimitHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(limit, 0) < 1) {
				return result;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return result;
				} else {
					var _p2 = _p0._1;
					var _p1 = f(_p0._0);
					if (_p1.ctor === 'Just') {
						var _v2 = A2(_elm_lang$core$List_ops['::'], _p1._0, result),
							_v3 = limit - 1,
							_v4 = f,
							_v5 = _p2;
						result = _v2;
						limit = _v3;
						f = _v4;
						list = _v5;
						continue filterMapUntilLimitHelp;
					} else {
						var _v6 = result,
							_v7 = limit,
							_v8 = f,
							_v9 = _p2;
						result = _v6;
						limit = _v7;
						f = _v8;
						list = _v9;
						continue filterMapUntilLimitHelp;
					}
				}
			}
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$filterMapUntilLimit = F3(
	function (limit, f, list) {
		return _elm_lang$core$List$reverse(
			A4(
				_jinjor$elm_time_travel$TimeTravel_Internal_View$filterMapUntilLimitHelp,
				_elm_lang$core$Native_List.fromArray(
					[]),
				limit,
				f,
				list));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$msgView = F3(
	function (filterOptions, selectedMsg, _p3) {
		var _p4 = _p3;
		var _p10 = _p4.msg;
		var _p9 = _p4.id;
		var str = _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$format(_p10);
		var visible = _elm_lang$core$Native_Utils.eq(_p10, _jinjor$elm_time_travel$TimeTravel_Internal_MsgLike$Init) || function () {
			var _p5 = _elm_lang$core$String$words(str);
			if (_p5.ctor === '::') {
				return A2(
					_elm_lang$core$List$any,
					function (_p6) {
						var _p7 = _p6;
						return _elm_lang$core$Native_Utils.eq(_p5._0, _p7._0) && _p7._1;
					},
					filterOptions);
			} else {
				return false;
			}
		}();
		var selected = function () {
			var _p8 = selectedMsg;
			if (_p8.ctor === 'Just') {
				return _elm_lang$core$Native_Utils.eq(_p8._0, _p9);
			} else {
				return false;
			}
		}();
		return visible ? _elm_lang$core$Maybe$Just(
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Basics$toString(_p9),
				_1: A4(
					_jinjor$elm_inline_hover$InlineHover$hover,
					_jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgViewHover(selected),
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$style(
							_jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgView(selected)),
							_elm_lang$html$Html_Events$onClick(
							_jinjor$elm_time_travel$TimeTravel_Internal_Model$SelectMsg(_p9))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p9),
								A2(_elm_lang$core$Basics_ops['++'], ': ', str)))
						]))
			}) : _elm_lang$core$Maybe$Nothing;
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$msgListView = F4(
	function (filterOptions, selectedMsg, items, detailView) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					detailView,
					A3(
					_elm_lang$html$Html_Keyed$node,
					'div',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$msgListView)
						]),
					A3(
						_jinjor$elm_time_travel$TimeTravel_Internal_View$filterMapUntilLimit,
						60,
						A2(_jinjor$elm_time_travel$TimeTravel_Internal_View$msgView, filterOptions, selectedMsg),
						items))
				]));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$modelDetailView = F4(
	function (fixedToLeft, expandedTree, lazyModelAst, userModel) {
		var _p11 = lazyModelAst;
		if ((_p11.ctor === 'Just') && (_p11._0.ctor === 'Ok')) {
			var html = A3(
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsHtml,
				_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleModelTree,
				expandedTree,
				_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModel(_p11._0._0));
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(
						_jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelDetailView(fixedToLeft))
					]),
				html);
		} else {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$modelView)
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(
						_elm_lang$core$Basics$toString(userModel))
					]));
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$detailView = function (model) {
	if (_elm_lang$core$Basics$not(model.sync)) {
		var head = A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailViewHead)
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A3(
					_jinjor$elm_time_travel$TimeTravel_Internal_View$detailTab,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTabModel, model.fixedToLeft, model.showModelDetail),
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleModelDetail(true),
					'Model'),
					A3(
					_jinjor$elm_time_travel$TimeTravel_Internal_View$detailTab,
					A2(
						_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailTabDiff,
						model.fixedToLeft,
						_elm_lang$core$Basics$not(model.showModelDetail)),
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleModelDetail(false),
					'Messages and Diff')
				]));
		var detailedMsgView = function () {
			var _p12 = _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedMsgAst(model);
			if (_p12.ctor === 'Just') {
				return A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailedMsgView)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$formatAsString(
								_jinjor$elm_time_travel$TimeTravel_Internal_Parser_Formatter$makeModel(_p12._0)))
						]));
			} else {
				return _elm_lang$html$Html$text('');
			}
		}();
		var diffView = function () {
			var _p13 = _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedItem(model);
			if (_p13.ctor === 'Just') {
				var _p14 = _p13._0.lazyDiff;
				if (_p14.ctor === 'Just') {
					return _jinjor$elm_time_travel$TimeTravel_Internal_DiffView$view(_p14._0);
				} else {
					return _elm_lang$html$Html$text('');
				}
			} else {
				return _elm_lang$html$Html$text('');
			}
		}();
		var msgTreeView = function () {
			var _p15 = {
				ctor: '_Tuple2',
				_0: model.selectedMsg,
				_1: _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedMsgTree(model)
			};
			if (((_p15.ctor === '_Tuple2') && (_p15._0.ctor === 'Just')) && (_p15._1.ctor === 'Just')) {
				return A3(_jinjor$elm_time_travel$TimeTravel_Internal_MsgTreeView$view, _jinjor$elm_time_travel$TimeTravel_Internal_Model$SelectMsg, _p15._0._0, _p15._1._0);
			} else {
				return _elm_lang$html$Html$text('');
			}
		}();
		var body = function () {
			if (model.showModelDetail) {
				var _p16 = _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedItem(model);
				if (_p16.ctor === 'Just') {
					var _p17 = _p16._0;
					return A2(
						_elm_lang$core$List_ops['::'],
						A4(_jinjor$elm_time_travel$TimeTravel_Internal_View$modelDetailView, model.fixedToLeft, model.expandedTree, _p17.lazyModelAst, _p17.model),
						_elm_lang$core$Native_List.fromArray(
							[]));
				} else {
					return _elm_lang$core$Native_List.fromArray(
						[]);
				}
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[msgTreeView, detailedMsgView, diffView]);
			}
		}();
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$detailView, model.fixedToLeft, true))
				]),
			A2(_elm_lang$core$List_ops['::'], head, body));
	} else {
		return _elm_lang$html$Html$text('');
	}
};
var _jinjor$elm_time_travel$TimeTravel_Internal_View$filterItemView = function (_p18) {
	var _p19 = _p18;
	var _p20 = _p19._0;
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$label,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$input,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$type$('checkbox'),
								_elm_lang$html$Html_Attributes$checked(_p19._1),
								_elm_lang$html$Html_Events$onClick(
								_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleFilter(_p20))
							]),
						_elm_lang$core$Native_List.fromArray(
							[])),
						_elm_lang$html$Html$text(_p20)
					]))
			]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_View$filterView = F2(
	function (visible, filterOptions) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(
					_jinjor$elm_time_travel$TimeTravel_Internal_Styles$filterView(visible))
				]),
			A2(_elm_lang$core$List$map, _jinjor$elm_time_travel$TimeTravel_Internal_View$filterItemView, filterOptions));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$buttonView = F3(
	function (onClickMsg, buttonStyle, inner) {
		return A4(
			_jinjor$elm_inline_hover$InlineHover$hover,
			_jinjor$elm_time_travel$TimeTravel_Internal_Styles$buttonHover,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$style(buttonStyle),
					_elm_lang$html$Html_Events$onClick(onClickMsg)
				]),
			inner);
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$headerView = F4(
	function (fixedToLeft, sync, expand, filterOptions) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$style(_jinjor$elm_time_travel$TimeTravel_Internal_Styles$headerView)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_jinjor$elm_time_travel$TimeTravel_Internal_View$buttonView,
							_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleLayout,
							_jinjor$elm_time_travel$TimeTravel_Internal_Styles$buttonView(true),
							_elm_lang$core$Native_List.fromArray(
								[_jinjor$elm_time_travel$TimeTravel_Internal_Icons$layout])),
							A3(
							_jinjor$elm_time_travel$TimeTravel_Internal_View$buttonView,
							_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleMinimize,
							_jinjor$elm_time_travel$TimeTravel_Internal_Styles$buttonView(true),
							_elm_lang$core$Native_List.fromArray(
								[
									_jinjor$elm_time_travel$TimeTravel_Internal_Icons$minimize(false)
								])),
							A3(
							_jinjor$elm_time_travel$TimeTravel_Internal_View$buttonView,
							_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleSync,
							_jinjor$elm_time_travel$TimeTravel_Internal_Styles$buttonView(false),
							_elm_lang$core$Native_List.fromArray(
								[
									_jinjor$elm_time_travel$TimeTravel_Internal_Icons$sync(sync)
								])),
							A3(
							_jinjor$elm_time_travel$TimeTravel_Internal_View$buttonView,
							_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleExpand,
							_jinjor$elm_time_travel$TimeTravel_Internal_Styles$buttonView(false),
							_elm_lang$core$Native_List.fromArray(
								[
									_jinjor$elm_time_travel$TimeTravel_Internal_Icons$filterExpand(expand)
								]))
						])),
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_View$filterView, expand, filterOptions)
				]));
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$resyncView = function (sync) {
	return sync ? _elm_lang$html$Html$text('') : A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$style(
				_jinjor$elm_time_travel$TimeTravel_Internal_Styles$resyncView(sync)),
				_elm_lang$html$Html_Events$onMouseDown(_jinjor$elm_time_travel$TimeTravel_Internal_Model$Resync)
			]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_View$minimizedDebugView = function (model) {
	return A3(
		_jinjor$elm_time_travel$TimeTravel_Internal_View$buttonView,
		_jinjor$elm_time_travel$TimeTravel_Internal_Model$ToggleMinimize,
		_jinjor$elm_time_travel$TimeTravel_Internal_Styles$minimizedButton(model.fixedToLeft),
		_elm_lang$core$Native_List.fromArray(
			[
				_jinjor$elm_time_travel$TimeTravel_Internal_Icons$minimize(true)
			]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_View$normalDebugView = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_jinjor$elm_time_travel$TimeTravel_Internal_View$resyncView(model.sync),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(
						_jinjor$elm_time_travel$TimeTravel_Internal_Styles$debugView(model.fixedToLeft))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A4(_jinjor$elm_time_travel$TimeTravel_Internal_View$headerView, model.fixedToLeft, model.sync, model.expand, model.filter),
						A4(
						_jinjor$elm_time_travel$TimeTravel_Internal_View$msgListView,
						model.filter,
						model.selectedMsg,
						_jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$toList(model.history),
						_jinjor$elm_time_travel$TimeTravel_Internal_View$detailView(model))
					]))
			]));
};
var _jinjor$elm_time_travel$TimeTravel_Internal_View$debugView = function (model) {
	return (model.minimized ? _jinjor$elm_time_travel$TimeTravel_Internal_View$minimizedDebugView : _jinjor$elm_time_travel$TimeTravel_Internal_View$normalDebugView)(model);
};
var _jinjor$elm_time_travel$TimeTravel_Internal_View$userView = F2(
	function (userView, model) {
		var _p21 = _jinjor$elm_time_travel$TimeTravel_Internal_Model$selectedItem(model);
		if (_p21.ctor === 'Just') {
			return userView(_p21._0.model);
		} else {
			return _elm_lang$html$Html$text('Error: Unable to render');
		}
	});
var _jinjor$elm_time_travel$TimeTravel_Internal_View$view = F4(
	function (transformUserMsg, transformDebuggerMsg, userViewFunc, model) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html_App$map,
					transformUserMsg,
					A2(_jinjor$elm_time_travel$TimeTravel_Internal_View$userView, userViewFunc, model)),
					A2(
					_elm_lang$html$Html_App$map,
					transformDebuggerMsg,
					_jinjor$elm_time_travel$TimeTravel_Internal_View$debugView(model))
				]));
	});

var _jinjor$elm_time_travel$TimeTravel_Navigation$OptionsWithFlags = F5(
	function (a, b, c, d, e) {
		return {init: a, update: b, urlUpdate: c, view: d, subscriptions: e};
	});
var _jinjor$elm_time_travel$TimeTravel_Navigation$UserMsg = function (a) {
	return {ctor: 'UserMsg', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Navigation$DebuggerMsg = function (a) {
	return {ctor: 'DebuggerMsg', _0: a};
};
var _jinjor$elm_time_travel$TimeTravel_Navigation$wrap = function (_p0) {
	var _p1 = _p0;
	var subscriptions$ = function (model) {
		var item = _jinjor$elm_time_travel$TimeTravel_Internal_Util_Nel$head(model.history);
		return A2(
			_elm_lang$core$Platform_Sub$map,
			function (c) {
				return _jinjor$elm_time_travel$TimeTravel_Navigation$UserMsg(
					{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: c});
			},
			_p1.subscriptions(item.model));
	};
	var view$ = function (model) {
		return A4(
			_jinjor$elm_time_travel$TimeTravel_Internal_View$view,
			function (c) {
				return _jinjor$elm_time_travel$TimeTravel_Navigation$UserMsg(
					{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: c});
			},
			_jinjor$elm_time_travel$TimeTravel_Navigation$DebuggerMsg,
			_p1.view,
			model);
	};
	var urlUpdate$ = F2(
		function (data, model) {
			return A4(
				_jinjor$elm_time_travel$TimeTravel_Internal_Model$urlUpdateOnIncomingData,
				function (_p2) {
					var _p3 = _p2;
					return _jinjor$elm_time_travel$TimeTravel_Navigation$UserMsg(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Just(_p3._0),
							_1: _p3._1
						});
				},
				_p1.urlUpdate,
				data,
				model);
		});
	var init$ = F2(
		function (flags, data) {
			var _p4 = A2(_p1.init, flags, data);
			var model = _p4._0;
			var cmd = _p4._1;
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_jinjor$elm_time_travel$TimeTravel_Internal_Model$init(model),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$core$Platform_Cmd$map,
						function (msg) {
							return _jinjor$elm_time_travel$TimeTravel_Navigation$UserMsg(
								{
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(0),
									_1: msg
								});
						},
						cmd)
					]));
		});
	var outgoingMsg = _elm_lang$core$Basics$always(_elm_lang$core$Platform_Cmd$none);
	var update$ = F2(
		function (msg, model) {
			var _p5 = msg;
			if (_p5.ctor === 'UserMsg') {
				return A4(
					_jinjor$elm_time_travel$TimeTravel_Internal_Model$updateOnIncomingUserMsg,
					function (_p6) {
						var _p7 = _p6;
						return _jinjor$elm_time_travel$TimeTravel_Navigation$UserMsg(
							{
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Just(_p7._0),
								_1: _p7._1
							});
					},
					_p1.update,
					_p5._0,
					model);
			} else {
				var _p8 = A3(_jinjor$elm_time_travel$TimeTravel_Internal_Update$update, outgoingMsg, _p5._0, model);
				var m = _p8._0;
				var c = _p8._1;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					m,
					_elm_lang$core$Native_List.fromArray(
						[
							A2(_elm_lang$core$Platform_Cmd$map, _jinjor$elm_time_travel$TimeTravel_Navigation$DebuggerMsg, c)
						]));
			}
		});
	return {init: init$, update: update$, view: view$, subscriptions: subscriptions$, urlUpdate: urlUpdate$};
};
var _jinjor$elm_time_travel$TimeTravel_Navigation$programWithFlags = F2(
	function (parser, options) {
		return A2(
			_elm_lang$navigation$Navigation$programWithFlags,
			parser,
			_jinjor$elm_time_travel$TimeTravel_Navigation$wrap(options));
	});
var _jinjor$elm_time_travel$TimeTravel_Navigation$program = F2(
	function (parser, _p9) {
		var _p10 = _p9;
		return A2(
			_jinjor$elm_time_travel$TimeTravel_Navigation$programWithFlags,
			parser,
			{
				init: F2(
					function (flags, data) {
						return _p10.init(data);
					}),
				view: _p10.view,
				update: _p10.update,
				subscriptions: _p10.subscriptions,
				urlUpdate: _p10.urlUpdate
			});
	});

var _mordrax$cotwelm$CharCreation_Data$AttributeModel = F5(
	function (a, b, c, d, e) {
		return {ava: a, str: b, dex: c, con: d, $int: e};
	});
var _mordrax$cotwelm$CharCreation_Data$Model = F4(
	function (a, b, c, d) {
		return {name: a, attributes: b, gender: c, difficulty: d};
	});
var _mordrax$cotwelm$CharCreation_Data$CancelGame = {ctor: 'CancelGame'};
var _mordrax$cotwelm$CharCreation_Data$StartGame = {ctor: 'StartGame'};
var _mordrax$cotwelm$CharCreation_Data$Attributes = F2(
	function (a, b) {
		return {ctor: 'Attributes', _0: a, _1: b};
	});
var _mordrax$cotwelm$CharCreation_Data$Difficulty = function (a) {
	return {ctor: 'Difficulty', _0: a};
};
var _mordrax$cotwelm$CharCreation_Data$Gender = function (a) {
	return {ctor: 'Gender', _0: a};
};
var _mordrax$cotwelm$CharCreation_Data$Name = function (a) {
	return {ctor: 'Name', _0: a};
};
var _mordrax$cotwelm$CharCreation_Data$Female = {ctor: 'Female'};
var _mordrax$cotwelm$CharCreation_Data$Male = {ctor: 'Male'};
var _mordrax$cotwelm$CharCreation_Data$Impossible = {ctor: 'Impossible'};
var _mordrax$cotwelm$CharCreation_Data$Hard = {ctor: 'Hard'};
var _mordrax$cotwelm$CharCreation_Data$Intermediate = {ctor: 'Intermediate'};
var _mordrax$cotwelm$CharCreation_Data$Easy = {ctor: 'Easy'};
var _mordrax$cotwelm$CharCreation_Data$Dexterity = {ctor: 'Dexterity'};
var _mordrax$cotwelm$CharCreation_Data$Constitution = {ctor: 'Constitution'};
var _mordrax$cotwelm$CharCreation_Data$Intelligence = {ctor: 'Intelligence'};
var _mordrax$cotwelm$CharCreation_Data$Strength = {ctor: 'Strength'};
var _mordrax$cotwelm$CharCreation_Data$Available = {ctor: 'Available'};

var _mordrax$cotwelm$CharCreation_AttributeDescriptions$initModel = {
	ava: _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 0, _1: 'You are at your maximum potential! Go get\'em tiger!'},
			{ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 50, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 100, _1: 'Training is for wimps, you like pain, you like it alot!'}
		]),
	str: _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 0, _1: 'Unable to push open a unlocked door whos hinges has recently been serviced with WD40.'},
			{ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 20, _1: 'Stunted by a career in software engineering, the mind is strong but there is high muscle atrophy'},
			{ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 50, _1: 'Of average strength!!!'},
			{ctor: '_Tuple2', _0: 60, _1: 'Likes to gym during lunch..'},
			{ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 100, _1: 'Hammers are for wimps!! You hit with your FISTS!'}
		]),
	$int: _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 0, _1: 'Dumb'},
			{ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 50, _1: 'Smart enough to be at the peak of the standard distribution curve.'},
			{ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 100, _1: 'Smart'}
		]),
	con: _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 0, _1: 'You\'re having a BAD day, everyday! It\'s like you\'ve got two kids that keep waking you up at night, EVERY night!'},
			{ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 50, _1: 'Able to outrun a hungry hippo!'},
			{ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 100, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'}
		]),
	dex: _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 0, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 50, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
			{ctor: '_Tuple2', _0: 100, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'}
		])
};
var _mordrax$cotwelm$CharCreation_AttributeDescriptions$maybeDescriptionToString = function (desc) {
	var _p0 = desc;
	if (_p0.ctor === 'Nothing') {
		return 'No description matches';
	} else {
		return _elm_lang$core$Basics$snd(_p0._0);
	}
};
var _mordrax$cotwelm$CharCreation_AttributeDescriptions$isLessThanAttribute = F2(
	function (val, _p1) {
		var _p2 = _p1;
		return _elm_lang$core$Native_Utils.cmp(val, _p2._0) < 0;
	});
var _mordrax$cotwelm$CharCreation_AttributeDescriptions$firstMatchingDescription = F2(
	function (val, descriptions) {
		return _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				_mordrax$cotwelm$CharCreation_AttributeDescriptions$isLessThanAttribute(val),
				descriptions));
	});
var _mordrax$cotwelm$CharCreation_AttributeDescriptions$getDescription = F2(
	function (attr, val) {
		var _p3 = attr;
		switch (_p3.ctor) {
			case 'Strength':
				return _mordrax$cotwelm$CharCreation_AttributeDescriptions$maybeDescriptionToString(
					A2(_mordrax$cotwelm$CharCreation_AttributeDescriptions$firstMatchingDescription, val, _mordrax$cotwelm$CharCreation_AttributeDescriptions$initModel.str));
			case 'Available':
				return _mordrax$cotwelm$CharCreation_AttributeDescriptions$maybeDescriptionToString(
					A2(_mordrax$cotwelm$CharCreation_AttributeDescriptions$firstMatchingDescription, val, _mordrax$cotwelm$CharCreation_AttributeDescriptions$initModel.ava));
			case 'Intelligence':
				return _mordrax$cotwelm$CharCreation_AttributeDescriptions$maybeDescriptionToString(
					A2(_mordrax$cotwelm$CharCreation_AttributeDescriptions$firstMatchingDescription, val, _mordrax$cotwelm$CharCreation_AttributeDescriptions$initModel.$int));
			case 'Constitution':
				return _mordrax$cotwelm$CharCreation_AttributeDescriptions$maybeDescriptionToString(
					A2(_mordrax$cotwelm$CharCreation_AttributeDescriptions$firstMatchingDescription, val, _mordrax$cotwelm$CharCreation_AttributeDescriptions$initModel.con));
			default:
				return _mordrax$cotwelm$CharCreation_AttributeDescriptions$maybeDescriptionToString(
					A2(_mordrax$cotwelm$CharCreation_AttributeDescriptions$firstMatchingDescription, val, _mordrax$cotwelm$CharCreation_AttributeDescriptions$initModel.dex));
		}
	});
var _mordrax$cotwelm$CharCreation_AttributeDescriptions$Model = F5(
	function (a, b, c, d, e) {
		return {str: a, $int: b, dex: c, con: d, ava: e};
	});

var _mordrax$cotwelm$CharCreation_Attributes$getAttributeDescription = F2(
	function (attr, val) {
		return A2(_mordrax$cotwelm$CharCreation_AttributeDescriptions$getDescription, attr, val);
	});
var _mordrax$cotwelm$CharCreation_Attributes$getDataPercent = function (val) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'data-percent',
		_elm_lang$core$Basics$toString(val));
};
var _mordrax$cotwelm$CharCreation_Attributes$getAttributeValue = F2(
	function (attr, model) {
		var _p0 = attr;
		switch (_p0.ctor) {
			case 'Available':
				return model.ava;
			case 'Strength':
				return model.str;
			case 'Intelligence':
				return model.$int;
			case 'Constitution':
				return model.con;
			default:
				return model.dex;
		}
	});
var _mordrax$cotwelm$CharCreation_Attributes$progressBarStyle = function (val) {
	return _elm_lang$html$Html_Attributes$style(
		_elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple2',
				_0: 'width',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(val),
					'%')
			},
				{ctor: '_Tuple2', _0: 'min-width', _1: '0'}
			]));
};
var _mordrax$cotwelm$CharCreation_Attributes$viewButtons = function (attr) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('ui buttons')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$button,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui icon button'),
						_elm_lang$html$Html_Events$onClick(
						A2(_mordrax$cotwelm$CharCreation_Data$Attributes, attr, -5))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$i,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui icon minus')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					])),
				A2(
				_elm_lang$html$Html$button,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui icon button'),
						_elm_lang$html$Html_Events$onClick(
						A2(_mordrax$cotwelm$CharCreation_Data$Attributes, attr, 5))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$i,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui icon plus')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					]))
			]));
};
var _mordrax$cotwelm$CharCreation_Attributes$viewAttribute = F3(
	function (attr, model, buttons) {
		var val = A2(_mordrax$cotwelm$CharCreation_Attributes$getAttributeValue, attr, model);
		var description = A2(_mordrax$cotwelm$CharCreation_Attributes$getAttributeDescription, attr, val);
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('ui segments')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('ui segment left aligned')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$h4,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('ui header')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(attr))
								])),
							A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('ui indicating progress'),
									_mordrax$cotwelm$CharCreation_Attributes$getDataPercent(val)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html$div,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$class('bar'),
											_mordrax$cotwelm$CharCreation_Attributes$progressBarStyle(val)
										]),
									_elm_lang$core$Native_List.fromArray(
										[])),
									A2(
									_elm_lang$html$Html$div,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$class('label')
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(description)
										]))
								])),
							buttons ? _mordrax$cotwelm$CharCreation_Attributes$viewButtons(attr) : A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						]))
				]));
	});
var _mordrax$cotwelm$CharCreation_Attributes$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A3(_mordrax$cotwelm$CharCreation_Attributes$viewAttribute, _mordrax$cotwelm$CharCreation_Data$Available, model, false),
				A3(_mordrax$cotwelm$CharCreation_Attributes$viewAttribute, _mordrax$cotwelm$CharCreation_Data$Strength, model, true),
				A3(_mordrax$cotwelm$CharCreation_Attributes$viewAttribute, _mordrax$cotwelm$CharCreation_Data$Intelligence, model, true),
				A3(_mordrax$cotwelm$CharCreation_Attributes$viewAttribute, _mordrax$cotwelm$CharCreation_Data$Dexterity, model, true),
				A3(_mordrax$cotwelm$CharCreation_Attributes$viewAttribute, _mordrax$cotwelm$CharCreation_Data$Constitution, model, true)
			]));
};
var _mordrax$cotwelm$CharCreation_Attributes$update = F3(
	function (attr, val, model) {
		var _p1 = attr;
		switch (_p1.ctor) {
			case 'Available':
				return _elm_lang$core$Native_Utils.update(
					model,
					{ava: model.ava + val});
			case 'Strength':
				return _elm_lang$core$Native_Utils.update(
					model,
					{str: model.str + val, ava: model.ava - val});
			case 'Intelligence':
				return _elm_lang$core$Native_Utils.update(
					model,
					{$int: model.$int + val, ava: model.ava - val});
			case 'Constitution':
				return _elm_lang$core$Native_Utils.update(
					model,
					{con: model.con + val, ava: model.ava - val});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{dex: model.dex + val, ava: model.ava - val});
		}
	});
var _mordrax$cotwelm$CharCreation_Attributes$initModel = {ava: 100, str: 20, dex: 30, con: 40, $int: 60};

var _mordrax$cotwelm$CharCreation_Name$view = function (playerName) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('ui vertical segment')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui labeled fluid input')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui label')
							]),
						_elm_lang$core$Native_List.fromArray(
							[])),
						A2(
						_elm_lang$html$Html$input,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$name('name'),
								_elm_lang$html$Html_Attributes$placeholder('What word did your mother utter as you came kicking and screaming into this world?'),
								_elm_lang$html$Html_Events$onInput(_mordrax$cotwelm$CharCreation_Data$Name),
								_elm_lang$html$Html_Attributes$value(playerName)
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					]))
			]));
};

var _mordrax$cotwelm$CharCreation_Gender$view = function (gender) {
	var activeFemale = _elm_lang$core$Native_Utils.eq(gender, _mordrax$cotwelm$CharCreation_Data$Female) ? 'active' : '';
	var activeMale = _elm_lang$core$Native_Utils.eq(gender, _mordrax$cotwelm$CharCreation_Data$Male) ? 'active' : '';
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('equal width column')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui large buttons')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$button,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class(
								A2(_elm_lang$core$Basics_ops['++'], 'ui labeled icon button ', activeMale)),
								_elm_lang$html$Html_Events$onClick(
								_mordrax$cotwelm$CharCreation_Data$Gender(_mordrax$cotwelm$CharCreation_Data$Male))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$i,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('large male icon')
									]),
								_elm_lang$core$Native_List.fromArray(
									[])),
								_elm_lang$html$Html$text('Male')
							])),
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('or')
							]),
						_elm_lang$core$Native_List.fromArray(
							[])),
						A2(
						_elm_lang$html$Html$button,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class(
								A2(_elm_lang$core$Basics_ops['++'], 'ui labeled icon button ', activeFemale)),
								_elm_lang$html$Html_Events$onClick(
								_mordrax$cotwelm$CharCreation_Data$Gender(_mordrax$cotwelm$CharCreation_Data$Female))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$i,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('large female icon')
									]),
								_elm_lang$core$Native_List.fromArray(
									[])),
								_elm_lang$html$Html$text('Female')
							]))
					]))
			]));
};

var _mordrax$cotwelm$CharCreation_Difficulty$iconButton = F3(
	function (diff, active, a) {
		return A2(
			_elm_lang$html$Html$button,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class(
					A2(_elm_lang$core$Basics_ops['++'], 'ui icon button ', active)),
					_elm_lang$html$Html_Events$onClick(
					_mordrax$cotwelm$CharCreation_Data$Difficulty(diff))
				]),
			a);
	});
var _mordrax$cotwelm$CharCreation_Difficulty$easyButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_Difficulty$iconButton,
		_mordrax$cotwelm$CharCreation_Data$Easy,
		active,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$i,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('huge green circle icon')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					])),
				A2(
				_elm_lang$html$Html$label,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Easy')
					]))
			]));
};
var _mordrax$cotwelm$CharCreation_Difficulty$intermediateButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_Difficulty$iconButton,
		_mordrax$cotwelm$CharCreation_Data$Intermediate,
		active,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$i,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('huge blue square icon')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					])),
				A2(
				_elm_lang$html$Html$label,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Intermediate')
					]))
			]));
};
var _mordrax$cotwelm$CharCreation_Difficulty$hardButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_Difficulty$iconButton,
		_mordrax$cotwelm$CharCreation_Data$Hard,
		active,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$i,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('huge black square icon')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					])),
				A2(
				_elm_lang$html$Html$label,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Hard')
					]))
			]));
};
var _mordrax$cotwelm$CharCreation_Difficulty$impossibleButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_Difficulty$iconButton,
		_mordrax$cotwelm$CharCreation_Data$Impossible,
		active,
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$i,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('huge yellow warning sign icon')
							]),
						_elm_lang$core$Native_List.fromArray(
							[]))
					])),
				A2(
				_elm_lang$html$Html$label,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Impossible')
					]))
			]));
};
var _mordrax$cotwelm$CharCreation_Difficulty$view = function (difficulty) {
	var activeImpossible = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$CharCreation_Data$Impossible) ? 'active' : '';
	var activeHard = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$CharCreation_Data$Hard) ? 'active' : '';
	var activeIntermediate = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$CharCreation_Data$Intermediate) ? 'active' : '';
	var activeEasy = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$CharCreation_Data$Easy) ? 'active' : '';
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('four ui buttons')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_mordrax$cotwelm$CharCreation_Difficulty$easyButton(activeEasy),
				_mordrax$cotwelm$CharCreation_Difficulty$intermediateButton(activeIntermediate),
				_mordrax$cotwelm$CharCreation_Difficulty$hardButton(activeHard),
				_mordrax$cotwelm$CharCreation_Difficulty$impossibleButton(activeImpossible)
			]));
};

var _mordrax$cotwelm$CharCreation_CharCreation$view = function (model) {
	var bgStyle = _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'backgroundColor', _1: 'black'}
		]);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'Name: ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								model.name,
								A2(
									_elm_lang$core$Basics_ops['++'],
									' Difficulty: ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(model.difficulty),
										A2(
											_elm_lang$core$Basics_ops['++'],
											' Gender: ',
											_elm_lang$core$Basics$toString(model.gender)))))))
					])),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui middle aligned center aligned grid')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui one column')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$div,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('ui stacked vertical segment')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_mordrax$cotwelm$CharCreation_Name$view(model.name)
									])),
								A2(
								_elm_lang$html$Html$div,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_mordrax$cotwelm$CharCreation_Attributes$view(model.attributes)
									])),
								A2(
								_elm_lang$html$Html$div,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('ui vertical segments')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_elm_lang$html$Html$div,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$class('ui vertical segment')
											]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('Character Gender')
											])),
										A2(
										_elm_lang$html$Html$div,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$class('ui vertical segment')
											]),
										_elm_lang$core$Native_List.fromArray(
											[
												_mordrax$cotwelm$CharCreation_Gender$view(model.gender)
											]))
									])),
								_mordrax$cotwelm$CharCreation_Difficulty$view(model.difficulty),
								A2(
								_elm_lang$html$Html$button,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('ui button primary'),
										_elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$CharCreation_Data$StartGame)
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Ok')
									])),
								A2(
								_elm_lang$html$Html$button,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('ui button')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Cancel')
									])),
								A2(
								_elm_lang$html$Html$button,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('ui button')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('View Icon')
									])),
								A2(
								_elm_lang$html$Html$button,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('ui button')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text('Help')
									]))
							]))
					]))
			]));
};
var _mordrax$cotwelm$CharCreation_CharCreation$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'Name':
				return _elm_lang$core$Native_Utils.update(
					model,
					{name: _p0._0});
			case 'Gender':
				return _elm_lang$core$Native_Utils.update(
					model,
					{gender: _p0._0});
			case 'Difficulty':
				return _elm_lang$core$Native_Utils.update(
					model,
					{difficulty: _p0._0});
			case 'Attributes':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						attributes: A3(_mordrax$cotwelm$CharCreation_Attributes$update, _p0._0, _p0._1, model.attributes)
					});
			default:
				return model;
		}
	});
var _mordrax$cotwelm$CharCreation_CharCreation$initChar = {name: 'testing', attributes: _mordrax$cotwelm$CharCreation_Attributes$initModel, gender: _mordrax$cotwelm$CharCreation_Data$Female, difficulty: _mordrax$cotwelm$CharCreation_Data$Hard};

var _mordrax$cotwelm$Stats$combatStats = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return {ctor: '_Tuple3', _0: _p2.damageRange, _1: _p2.ac, _2: _p2.hitChance};
};
var _mordrax$cotwelm$Stats$isDead = function (_p3) {
	var _p4 = _p3;
	return _elm_lang$core$Native_Utils.cmp(_p4._0.currentHP, 0) < 0;
};
var _mordrax$cotwelm$Stats$Model = F7(
	function (a, b, c, d, e, f, g) {
		return {maxHP: a, currentHP: b, maxSP: c, currentSP: d, damageRange: e, ac: f, hitChance: g};
	});
var _mordrax$cotwelm$Stats$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Stats$new = F2(
	function (hp, sp) {
		return _mordrax$cotwelm$Stats$A(
			A7(
				_mordrax$cotwelm$Stats$Model,
				hp,
				hp,
				sp,
				sp,
				{ctor: '_Tuple2', _0: 1, _1: 6},
				0,
				50));
	});
var _mordrax$cotwelm$Stats$Dead = {ctor: 'Dead'};
var _mordrax$cotwelm$Stats$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Stats$takeHit = F2(
	function (damage, _p5) {
		var _p6 = _p5;
		var _p7 = _p6._0;
		var hp$ = _p7.currentHP - damage;
		var msg = (_elm_lang$core$Native_Utils.cmp(hp$, 0) > 0) ? _mordrax$cotwelm$Stats$Ok : _mordrax$cotwelm$Stats$Dead;
		return {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Stats$A(
				_elm_lang$core$Native_Utils.update(
					_p7,
					{currentHP: hp$})),
			_1: msg
		};
	});

var _mordrax$cotwelm$Dice$d = F2(
	function (faces, seed) {
		var intGenerator = A2(_elm_lang$core$Random$int, 1, faces);
		var _p0 = faces;
		switch (_p0) {
			case 0:
				return {ctor: '_Tuple2', _0: 0, _1: seed};
			case 1:
				return {ctor: '_Tuple2', _0: 1, _1: seed};
			default:
				return A2(_elm_lang$core$Random$step, intGenerator, seed);
		}
	});

var _mordrax$cotwelm$Combat$attack = F3(
	function (attacker, defender, seed) {
		var _p0 = _mordrax$cotwelm$Stats$combatStats(attacker);
		var min = _p0._0._0;
		var max = _p0._0._1;
		var toHit = _p0._2;
		var bonus = min - 1;
		var _p1 = A2(_mordrax$cotwelm$Dice$d, max - bonus, seed);
		var cappedDamage = _p1._0;
		var seed$ = _p1._1;
		var damage = cappedDamage + bonus;
		var _p2 = A2(_mordrax$cotwelm$Stats$takeHit, damage, defender);
		var stats$ = _p2._0;
		var msg = _p2._1;
		return {ctor: '_Tuple2', _0: stats$, _1: seed$};
	});

var _mordrax$cotwelm$Utils_Mass$info = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return {ctor: '_Tuple2', _0: _p2.bulk, _1: _p2.weight};
};
var _mordrax$cotwelm$Utils_Mass$Model = F2(
	function (a, b) {
		return {bulk: a, weight: b};
	});
var _mordrax$cotwelm$Utils_Mass$Mass = function (a) {
	return {ctor: 'Mass', _0: a};
};
var _mordrax$cotwelm$Utils_Mass$new = F2(
	function (bulk, weight) {
		return _mordrax$cotwelm$Utils_Mass$Mass(
			A2(_mordrax$cotwelm$Utils_Mass$Model, bulk, weight));
	});
var _mordrax$cotwelm$Utils_Mass$add = F2(
	function (_p4, _p3) {
		var _p5 = _p4;
		var _p8 = _p5._0;
		var _p6 = _p3;
		var _p7 = _p6._0;
		return _mordrax$cotwelm$Utils_Mass$Mass(
			{bulk: _p8.bulk + _p7.bulk, weight: _p8.weight + _p7.weight});
	});
var _mordrax$cotwelm$Utils_Mass$subtract = F2(
	function (_p10, _p9) {
		var _p11 = _p10;
		var _p14 = _p11._0;
		var _p12 = _p9;
		var _p13 = _p12._0;
		return _mordrax$cotwelm$Utils_Mass$Mass(
			{bulk: _p14.bulk - _p13.bulk, weight: _p14.weight - _p13.weight});
	});
var _mordrax$cotwelm$Utils_Mass$TooBulky = {ctor: 'TooBulky'};
var _mordrax$cotwelm$Utils_Mass$TooHeavy = {ctor: 'TooHeavy'};
var _mordrax$cotwelm$Utils_Mass$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Utils_Mass$ltOrEqTo = F2(
	function (_p16, _p15) {
		var _p17 = _p16;
		var _p21 = _p17._0;
		var _p18 = _p15;
		var _p20 = _p18._0;
		var bulkWeight = {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.cmp(_p21.bulk, _p20.bulk) > 0,
			_1: _elm_lang$core$Native_Utils.cmp(_p21.weight, _p20.weight) > 0
		};
		var _p19 = bulkWeight;
		_v7_2:
		do {
			if (_p19.ctor === '_Tuple2') {
				if (_p19._0 === true) {
					return _mordrax$cotwelm$Utils_Mass$TooBulky;
				} else {
					if (_p19._1 === true) {
						return _mordrax$cotwelm$Utils_Mass$TooHeavy;
					} else {
						break _v7_2;
					}
				}
			} else {
				break _v7_2;
			}
		} while(false);
		return _mordrax$cotwelm$Utils_Mass$Ok;
	});

var _mordrax$cotwelm$Container$list = function (_p0) {
	var _p1 = _p0;
	return _p1._0.items;
};
var _mordrax$cotwelm$Container$getMass = function (_p2) {
	var _p3 = _p2;
	return _p3._0.currentMass;
};
var _mordrax$cotwelm$Container$capacity = function (_p4) {
	var _p5 = _p4;
	return _p5._0.capacity;
};
var _mordrax$cotwelm$Container$Model = F5(
	function (a, b, c, d, e) {
		return {capacity: a, currentMass: b, items: c, getMass: d, equals: e};
	});
var _mordrax$cotwelm$Container$MassMsg = function (a) {
	return {ctor: 'MassMsg', _0: a};
};
var _mordrax$cotwelm$Container$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Container$ContainerModel = function (a) {
	return {ctor: 'ContainerModel', _0: a};
};
var _mordrax$cotwelm$Container$new = F3(
	function (capacity, getMass, equals) {
		return _mordrax$cotwelm$Container$ContainerModel(
			A5(
				_mordrax$cotwelm$Container$Model,
				capacity,
				A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0),
				_elm_lang$core$Native_List.fromArray(
					[]),
				getMass,
				equals));
	});
var _mordrax$cotwelm$Container$add = F2(
	function (item, _p6) {
		var _p7 = _p6;
		var _p9 = _p7._0;
		var mass = _p9.getMass(item);
		var mass$ = A2(_mordrax$cotwelm$Utils_Mass$add, mass, _p9.currentMass);
		var _p8 = A2(_mordrax$cotwelm$Utils_Mass$ltOrEqTo, mass$, _p9.capacity);
		if (_p8.ctor === 'Ok') {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Container$ContainerModel(
					_elm_lang$core$Native_Utils.update(
						_p9,
						{
							currentMass: mass$,
							items: A2(_elm_lang$core$List_ops['::'], item, _p9.items)
						})),
				_1: _mordrax$cotwelm$Container$Ok
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Container$ContainerModel(_p9),
				_1: _mordrax$cotwelm$Container$MassMsg(_p8)
			};
		}
	});
var _mordrax$cotwelm$Container$take = F2(
	function (item, _p10) {
		var _p11 = _p10;
		var _p12 = _p11._0;
		var itemMass = _p12.getMass(item);
		var mass$ = A2(_mordrax$cotwelm$Utils_Mass$subtract, _p12.currentMass, itemMass);
		var notEquals = function (x) {
			return _elm_lang$core$Basics$not(
				A2(_p12.equals, item, x));
		};
		var itemsWithoutIdItem = A2(_elm_lang$core$List$filter, notEquals, _p12.items);
		return _mordrax$cotwelm$Container$ContainerModel(
			_elm_lang$core$Native_Utils.update(
				_p12,
				{items: itemsWithoutIdItem, currentMass: mass$}));
	});

var _mordrax$cotwelm$Utils_IdGenerator$equals = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p3 = _p0;
		return _elm_lang$core$Native_Utils.eq(_p2._0, _p3._0);
	});
var _mordrax$cotwelm$Utils_IdGenerator$IDModel = function (a) {
	return {ctor: 'IDModel', _0: a};
};
var _mordrax$cotwelm$Utils_IdGenerator$new = _mordrax$cotwelm$Utils_IdGenerator$IDModel(0);
var _mordrax$cotwelm$Utils_IdGenerator$ID = function (a) {
	return {ctor: 'ID', _0: a};
};
var _mordrax$cotwelm$Utils_IdGenerator$getUniqueId = function (_p4) {
	var _p5 = _p4;
	var _p6 = _p5._0;
	return {
		ctor: '_Tuple2',
		_0: _mordrax$cotwelm$Utils_IdGenerator$ID(_p6 + 1),
		_1: _mordrax$cotwelm$Utils_IdGenerator$IDModel(_p6 + 1)
	};
};
var _mordrax$cotwelm$Utils_IdGenerator$assignId = F2(
	function (toA, _p7) {
		var _p8 = _p7;
		var _p9 = _mordrax$cotwelm$Utils_IdGenerator$getUniqueId(_p8._1);
		var id = _p9._0;
		var generator$ = _p9._1;
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$List_ops['::'],
				toA(id),
				_p8._0),
			_1: generator$
		};
	});

var _mordrax$cotwelm$Item_TypeDef$MassMsg = function (a) {
	return {ctor: 'MassMsg', _0: a};
};
var _mordrax$cotwelm$Item_TypeDef$NestedItem = {ctor: 'NestedItem'};
var _mordrax$cotwelm$Item_TypeDef$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Item_TypeDef$Enchanted = {ctor: 'Enchanted'};
var _mordrax$cotwelm$Item_TypeDef$Cursed = {ctor: 'Cursed'};
var _mordrax$cotwelm$Item_TypeDef$Normal = {ctor: 'Normal'};
var _mordrax$cotwelm$Item_TypeDef$Unidentified = {ctor: 'Unidentified'};
var _mordrax$cotwelm$Item_TypeDef$Identified = {ctor: 'Identified'};
var _mordrax$cotwelm$Item_TypeDef$TwoHandedSword = {ctor: 'TwoHandedSword'};
var _mordrax$cotwelm$Item_TypeDef$BastardSword = {ctor: 'BastardSword'};
var _mordrax$cotwelm$Item_TypeDef$MorningStar = {ctor: 'MorningStar'};
var _mordrax$cotwelm$Item_TypeDef$BroadSword = {ctor: 'BroadSword'};
var _mordrax$cotwelm$Item_TypeDef$BattleAxe = {ctor: 'BattleAxe'};
var _mordrax$cotwelm$Item_TypeDef$LongSword = {ctor: 'LongSword'};
var _mordrax$cotwelm$Item_TypeDef$WarHammer = {ctor: 'WarHammer'};
var _mordrax$cotwelm$Item_TypeDef$Axe = {ctor: 'Axe'};
var _mordrax$cotwelm$Item_TypeDef$Flail = {ctor: 'Flail'};
var _mordrax$cotwelm$Item_TypeDef$Mace = {ctor: 'Mace'};
var _mordrax$cotwelm$Item_TypeDef$ShortSword = {ctor: 'ShortSword'};
var _mordrax$cotwelm$Item_TypeDef$Spear = {ctor: 'Spear'};
var _mordrax$cotwelm$Item_TypeDef$Quarterstaff = {ctor: 'Quarterstaff'};
var _mordrax$cotwelm$Item_TypeDef$HandAxe = {ctor: 'HandAxe'};
var _mordrax$cotwelm$Item_TypeDef$Hammer = {ctor: 'Hammer'};
var _mordrax$cotwelm$Item_TypeDef$Dagger = {ctor: 'Dagger'};
var _mordrax$cotwelm$Item_TypeDef$Club = {ctor: 'Club'};
var _mordrax$cotwelm$Item_TypeDef$BrokenSword = {ctor: 'BrokenSword'};
var _mordrax$cotwelm$Item_TypeDef$EnchantedHelmOfStorms = {ctor: 'EnchantedHelmOfStorms'};
var _mordrax$cotwelm$Item_TypeDef$HelmetOfDetectMonsters = {ctor: 'HelmetOfDetectMonsters'};
var _mordrax$cotwelm$Item_TypeDef$MeteoricSteelHelmet = {ctor: 'MeteoricSteelHelmet'};
var _mordrax$cotwelm$Item_TypeDef$SteelHelmet = {ctor: 'SteelHelmet'};
var _mordrax$cotwelm$Item_TypeDef$IronHelmet = {ctor: 'IronHelmet'};
var _mordrax$cotwelm$Item_TypeDef$LeatherHelmet = {ctor: 'LeatherHelmet'};
var _mordrax$cotwelm$Item_TypeDef$BrokenHelmet = {ctor: 'BrokenHelmet'};
var _mordrax$cotwelm$Item_TypeDef$ElvenChainMail = {ctor: 'ElvenChainMail'};
var _mordrax$cotwelm$Item_TypeDef$MeteoricSteelPlate = {ctor: 'MeteoricSteelPlate'};
var _mordrax$cotwelm$Item_TypeDef$PlateArmour = {ctor: 'PlateArmour'};
var _mordrax$cotwelm$Item_TypeDef$PlateMail = {ctor: 'PlateMail'};
var _mordrax$cotwelm$Item_TypeDef$SplintMail = {ctor: 'SplintMail'};
var _mordrax$cotwelm$Item_TypeDef$ChainMail = {ctor: 'ChainMail'};
var _mordrax$cotwelm$Item_TypeDef$ScaleMail = {ctor: 'ScaleMail'};
var _mordrax$cotwelm$Item_TypeDef$RingMail = {ctor: 'RingMail'};
var _mordrax$cotwelm$Item_TypeDef$StuddedLeatherArmour = {ctor: 'StuddedLeatherArmour'};
var _mordrax$cotwelm$Item_TypeDef$LeatherArmour = {ctor: 'LeatherArmour'};
var _mordrax$cotwelm$Item_TypeDef$RustyArmour = {ctor: 'RustyArmour'};
var _mordrax$cotwelm$Item_TypeDef$LargeMeteoricSteelShield = {ctor: 'LargeMeteoricSteelShield'};
var _mordrax$cotwelm$Item_TypeDef$MediumMeteoricSteelShield = {ctor: 'MediumMeteoricSteelShield'};
var _mordrax$cotwelm$Item_TypeDef$SmallMeteoricSteelShield = {ctor: 'SmallMeteoricSteelShield'};
var _mordrax$cotwelm$Item_TypeDef$LargeSteelShield = {ctor: 'LargeSteelShield'};
var _mordrax$cotwelm$Item_TypeDef$MediumSteelShield = {ctor: 'MediumSteelShield'};
var _mordrax$cotwelm$Item_TypeDef$SmallSteelShield = {ctor: 'SmallSteelShield'};
var _mordrax$cotwelm$Item_TypeDef$LargeIronShield = {ctor: 'LargeIronShield'};
var _mordrax$cotwelm$Item_TypeDef$MediumIronShield = {ctor: 'MediumIronShield'};
var _mordrax$cotwelm$Item_TypeDef$SmallIronShield = {ctor: 'SmallIronShield'};
var _mordrax$cotwelm$Item_TypeDef$LargeWoodenShield = {ctor: 'LargeWoodenShield'};
var _mordrax$cotwelm$Item_TypeDef$MediumWoodenShield = {ctor: 'MediumWoodenShield'};
var _mordrax$cotwelm$Item_TypeDef$SmallWoodenShield = {ctor: 'SmallWoodenShield'};
var _mordrax$cotwelm$Item_TypeDef$BrokenShield = {ctor: 'BrokenShield'};
var _mordrax$cotwelm$Item_TypeDef$BracersOfDefenseVS = {ctor: 'BracersOfDefenseVS'};
var _mordrax$cotwelm$Item_TypeDef$BracersOfDefenseS = {ctor: 'BracersOfDefenseS'};
var _mordrax$cotwelm$Item_TypeDef$BracersOfDefenseNormal = {ctor: 'BracersOfDefenseNormal'};
var _mordrax$cotwelm$Item_TypeDef$NormalBracers = {ctor: 'NormalBracers'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfStrengthVS = {ctor: 'GauntletOfStrengthVS'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfStrengthS = {ctor: 'GauntletOfStrengthS'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfStrength = {ctor: 'GauntletOfStrength'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfDexterityVS = {ctor: 'GauntletOfDexterityVS'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfDexterityS = {ctor: 'GauntletOfDexterityS'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfDexterity = {ctor: 'GauntletOfDexterity'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfSlayingVS_VS = {ctor: 'GauntletOfSlayingVS_VS'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfSlayingS_S = {ctor: 'GauntletOfSlayingS_S'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfSlaying = {ctor: 'GauntletOfSlaying'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfProtectionVS = {ctor: 'GauntletOfProtectionVS'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfProtectionS = {ctor: 'GauntletOfProtectionS'};
var _mordrax$cotwelm$Item_TypeDef$GauntletOfProtection = {ctor: 'GauntletOfProtection'};
var _mordrax$cotwelm$Item_TypeDef$NormalGauntlets = {ctor: 'NormalGauntlets'};
var _mordrax$cotwelm$Item_TypeDef$EnchantedLargePackOfHolding = {ctor: 'EnchantedLargePackOfHolding'};
var _mordrax$cotwelm$Item_TypeDef$EnchantedMediumPackOfHolding = {ctor: 'EnchantedMediumPackOfHolding'};
var _mordrax$cotwelm$Item_TypeDef$EnchantedSmallPackOfHolding = {ctor: 'EnchantedSmallPackOfHolding'};
var _mordrax$cotwelm$Item_TypeDef$LargeChest = {ctor: 'LargeChest'};
var _mordrax$cotwelm$Item_TypeDef$MediumChest = {ctor: 'MediumChest'};
var _mordrax$cotwelm$Item_TypeDef$SmallChest = {ctor: 'SmallChest'};
var _mordrax$cotwelm$Item_TypeDef$LargePack = {ctor: 'LargePack'};
var _mordrax$cotwelm$Item_TypeDef$MediumPack = {ctor: 'MediumPack'};
var _mordrax$cotwelm$Item_TypeDef$SmallPack = {ctor: 'SmallPack'};
var _mordrax$cotwelm$Item_TypeDef$LargeBag = {ctor: 'LargeBag'};
var _mordrax$cotwelm$Item_TypeDef$MediumBag = {ctor: 'MediumBag'};
var _mordrax$cotwelm$Item_TypeDef$SmallBag = {ctor: 'SmallBag'};
var _mordrax$cotwelm$Item_TypeDef$WandQuiverBelt = {ctor: 'WandQuiverBelt'};
var _mordrax$cotwelm$Item_TypeDef$UtilityBelt = {ctor: 'UtilityBelt'};
var _mordrax$cotwelm$Item_TypeDef$FourSlotBelt = {ctor: 'FourSlotBelt'};
var _mordrax$cotwelm$Item_TypeDef$ThreeSlotBelt = {ctor: 'ThreeSlotBelt'};
var _mordrax$cotwelm$Item_TypeDef$TwoSlotBelt = {ctor: 'TwoSlotBelt'};
var _mordrax$cotwelm$Item_TypeDef$NoOp1 = {ctor: 'NoOp1'};
var _mordrax$cotwelm$Item_TypeDef$NoOp2 = {ctor: 'NoOp2'};
var _mordrax$cotwelm$Item_TypeDef$NoOp3 = {ctor: 'NoOp3'};
var _mordrax$cotwelm$Item_TypeDef$NoOp4 = {ctor: 'NoOp4'};

var _mordrax$cotwelm$Item_Data$Model = F8(
	function (a, b, c, d, e, f, g, h) {
		return {id: a, name: b, buy: c, sell: d, css: e, status: f, isIdentified: g, mass: h};
	});
var _mordrax$cotwelm$Item_Data$ItemModel = F8(
	function (a, b, c, d, e, f, g, h) {
		return {id: a, name: b, buy: c, sell: d, css: e, status: f, isIdentified: g, mass: h};
	});
var _mordrax$cotwelm$Item_Data$ArmourModel = F2(
	function (a, b) {
		return {ac: a, baseItem: b};
	});
var _mordrax$cotwelm$Item_Data$BeltModel = F5(
	function (a, b, c, d, e) {
		return {slot: a, scroll: b, wand: c, potion: d, container: e};
	});
var _mordrax$cotwelm$Item_Data$PackModel = function (a) {
	return {container: a};
};

var _mordrax$cotwelm$Item_Weapon$WeaponModel = F2(
	function (a, b) {
		return {$class: a, baseItem: b};
	});
var _mordrax$cotwelm$Item_Weapon$WM = F2(
	function (a, b) {
		return {ctor: 'WM', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Weapon$newWeapon = F4(
	function (weaponType, id, status, idStatus) {
		var _p0 = weaponType;
		switch (_p0.ctor) {
			case 'BrokenSword':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$BrokenSword,
					{
						$class: 0,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Broken Sword',
							1000,
							5000,
							'BrokenSword',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25))
					});
			case 'Club':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Club,
					{
						$class: 1,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Club',
							1500,
							3000,
							'Club',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 105, 60))
					});
			case 'Dagger':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Dagger,
					{
						$class: 2,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Dagger',
							500,
							500,
							'Sword',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 420, 240))
					});
			case 'Hammer':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Hammer,
					{
						$class: 2,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Hammer',
							2000,
							3000,
							'Hammer',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 420, 240))
					});
			case 'HandAxe':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$HandAxe,
					{
						$class: 3,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Hand Axe',
							1000,
							3000,
							'Axe',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 472, 270))
					});
			case 'Quarterstaff':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Quarterstaff,
					{
						$class: 3,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Quarterstaff',
							750,
							5000,
							'Spear',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 648, 360))
					});
			case 'Spear':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Spear,
					{
						$class: 4,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Spear',
							1500,
							5000,
							'Spear',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 840, 480))
					});
			case 'ShortSword':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$ShortSword,
					{
						$class: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Short Sword',
							1000,
							5000,
							'Sword',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1470, 840))
					});
			case 'Mace':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Mace,
					{
						$class: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Mace',
							2500,
							4375,
							'Mace',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1728, 960))
					});
			case 'Flail':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Flail,
					{
						$class: 6,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Flail',
							2000,
							3250,
							'Flail',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1512, 840))
					});
			case 'Axe':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$Axe,
					{
						$class: 6,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Axe',
							2000,
							5000,
							'Axe',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1944, 1080))
					});
			case 'WarHammer':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$WarHammer,
					{
						$class: 7,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'War Hammer',
							1400,
							7500,
							'Hammer',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 2160, 1200))
					});
			case 'LongSword':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$LongSword,
					{
						$class: 8,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Long Sword',
							1500,
							8000,
							'Sword',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800))
					});
			case 'BattleAxe':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$BattleAxe,
					{
						$class: 8,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Battle Axe',
							3000,
							6000,
							'Axe',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 2160, 1200))
					});
			case 'BroadSword':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$BroadSword,
					{
						$class: 9,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Broad Sword',
							1600,
							9000,
							'Sword',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800))
					});
			case 'MorningStar':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$MorningStar,
					{
						$class: 10,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Morning Star',
							3000,
							9000,
							'MorningStar',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 2160, 1200))
					});
			case 'BastardSword':
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$BastardSword,
					{
						$class: 11,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Bastard Sword',
							3000,
							10000,
							'Sword',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 4320, 2400))
					});
			default:
				return A2(
					_mordrax$cotwelm$Item_Weapon$WM,
					_mordrax$cotwelm$Item_TypeDef$TwoHandedSword,
					{
						$class: 12,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Two Handed Sword',
							5000,
							12000,
							'Sword',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 6360, 3600))
					});
		}
	});

var _mordrax$cotwelm$Item_Armour$ArmourM = F2(
	function (a, b) {
		return {ctor: 'ArmourM', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Armour$newArmour = F4(
	function (armourType, id, status, idStatus) {
		var _p0 = armourType;
		switch (_p0.ctor) {
			case 'RustyArmour':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$RustyArmour,
					{
						ac: 0,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Rusty Armour',
							10000,
							30000,
							'BrokenArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25))
					});
			case 'LeatherArmour':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$LeatherArmour,
					{
						ac: 6,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Leather Armour',
							5000,
							2400,
							'LeatherArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1080, 600))
					});
			case 'StuddedLeatherArmour':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$StuddedLeatherArmour,
					{
						ac: 12,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Studded Leather Armour',
							7000,
							25000,
							'LeatherArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3150, 1800))
					});
			case 'RingMail':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$RingMail,
					{
						ac: 18,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Ring Mail',
							8000,
							30000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 6300, 3600))
					});
			case 'ScaleMail':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$ScaleMail,
					{
						ac: 24,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Scale Mail',
							9000,
							30000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 10800, 6000))
					});
			case 'ChainMail':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$ChainMail,
					{
						ac: 30,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Chain Mail',
							10000,
							30000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 16200, 9000))
					});
			case 'SplintMail':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$SplintMail,
					{
						ac: 36,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Splint Mail',
							12000,
							40000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 27000, 15000))
					});
			case 'PlateMail':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$PlateMail,
					{
						ac: 42,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Plate Mail',
							15000,
							40000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 42000, 24000))
					});
			case 'PlateArmour':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$PlateArmour,
					{
						ac: 48,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Plate Armour',
							15000,
							60000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 42000, 24000))
					});
			case 'MeteoricSteelPlate':
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$MeteoricSteelPlate,
					{
						ac: 54,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Meteoric Steel Plate',
							5000,
							30000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 105000, 60000))
					});
			default:
				return A2(
					_mordrax$cotwelm$Item_Armour$ArmourM,
					_mordrax$cotwelm$Item_TypeDef$ElvenChainMail,
					{
						ac: 52,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Elven Chain Mail',
							50000,
							24000,
							'MetalArmour',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 162000, 90000))
					});
		}
	});

var _mordrax$cotwelm$Item_Shield$ShieldM = F2(
	function (a, b) {
		return {ctor: 'ShieldM', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Shield$newShield = F4(
	function (shieldType, id, status, idStatus) {
		var _p0 = shieldType;
		switch (_p0.ctor) {
			case 'BrokenShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$BrokenShield,
					{
						ac: 0,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Broken Shield',
							4000,
							35000,
							'BrokenShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25))
					});
			case 'SmallWoodenShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$SmallWoodenShield,
					{
						ac: 3,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Small Wooden Shield',
							3000,
							15000,
							'WoodShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 525, 300))
					});
			case 'MediumWoodenShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$MediumWoodenShield,
					{
						ac: 6,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Medium Wooden Shield',
							4000,
							35000,
							'WoodShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1050, 600))
					});
			case 'LargeWoodenShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$LargeWoodenShield,
					{
						ac: 9,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Large Wooden Shield',
							5000,
							50000,
							'WoodShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 2100, 1200))
					});
			case 'SmallIronShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$SmallIronShield,
					{
						ac: 6,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Small Iron Shield',
							4000,
							15000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1260, 720))
					});
			case 'MediumIronShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$MediumIronShield,
					{
						ac: 9,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Medium Iron Shield',
							5000,
							35000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 2592, 1440))
					});
			case 'LargeIronShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$LargeIronShield,
					{
						ac: 12,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Large Iron Shield',
							6000,
							50000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3150, 1800))
					});
			case 'SmallSteelShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$SmallSteelShield,
					{
						ac: 9,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Small Steel Shield',
							4000,
							15000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 2730, 1560))
					});
			case 'MediumSteelShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$MediumSteelShield,
					{
						ac: 12,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Medium Steel Shield',
							5000,
							35000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3360, 1920))
					});
			case 'LargeSteelShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$LargeSteelShield,
					{
						ac: 15,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Large Steel Shield',
							6000,
							50000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 4200, 2400))
					});
			case 'SmallMeteoricSteelShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$SmallMeteoricSteelShield,
					{
						ac: 15,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Small Meteoric Steel Shield',
							2500,
							10000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 4620, 2640))
					});
			case 'MediumMeteoricSteelShield':
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$MediumMeteoricSteelShield,
					{
						ac: 18,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Medium Meteoric Steel Shield',
							3500,
							25000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 5940, 3300))
					});
			default:
				return A2(
					_mordrax$cotwelm$Item_Shield$ShieldM,
					_mordrax$cotwelm$Item_TypeDef$LargeMeteoricSteelShield,
					{
						ac: 21,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Large Meteoric Steel Shield',
							4500,
							35000,
							'MetalShield',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 7560, 4200))
					});
		}
	});

var _mordrax$cotwelm$Item_Helmet$HelmetM = F2(
	function (a, b) {
		return {ctor: 'HelmetM', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Helmet$newHelmet = F4(
	function (helmetType, id, status, idStatus) {
		var _p0 = helmetType;
		switch (_p0.ctor) {
			case 'BrokenHelmet':
				return A2(
					_mordrax$cotwelm$Item_Helmet$HelmetM,
					_mordrax$cotwelm$Item_TypeDef$BrokenHelmet,
					{
						ac: 0,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Broken Helmet',
							1000,
							1000,
							'BrokenHelmet',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25))
					});
			case 'LeatherHelmet':
				return A2(
					_mordrax$cotwelm$Item_Helmet$HelmetM,
					_mordrax$cotwelm$Item_TypeDef$LeatherHelmet,
					{
						ac: 3,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Leather Helmet',
							500,
							500,
							'LeatherHelmet',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 525, 300))
					});
			case 'IronHelmet':
				return A2(
					_mordrax$cotwelm$Item_Helmet$HelmetM,
					_mordrax$cotwelm$Item_TypeDef$IronHelmet,
					{
						ac: 6,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Iron Helmet',
							2000,
							2000,
							'MetalHelmet',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1050, 600))
					});
			case 'SteelHelmet':
				return A2(
					_mordrax$cotwelm$Item_Helmet$HelmetM,
					_mordrax$cotwelm$Item_TypeDef$SteelHelmet,
					{
						ac: 9,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Steel Helmet',
							2500,
							2000,
							'MetalHelmet',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3150, 1800))
					});
			case 'MeteoricSteelHelmet':
				return A2(
					_mordrax$cotwelm$Item_Helmet$HelmetM,
					_mordrax$cotwelm$Item_TypeDef$MeteoricSteelHelmet,
					{
						ac: 15,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Meteoric Steel Helmet',
							1000,
							2000,
							'MetalHelmet',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 10500, 6000))
					});
			case 'HelmetOfDetectMonsters':
				return A2(
					_mordrax$cotwelm$Item_Helmet$HelmetM,
					_mordrax$cotwelm$Item_TypeDef$HelmetOfDetectMonsters,
					{
						ac: 9,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Helmet Of Detect Monsters',
							2500,
							2000,
							'HelmetOfDetectMonsters',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 42000, 24000))
					});
			default:
				return A2(
					_mordrax$cotwelm$Item_Helmet$HelmetM,
					_mordrax$cotwelm$Item_TypeDef$EnchantedHelmOfStorms,
					{
						ac: 25,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Enchanted Helm Of Storms',
							1000,
							2000,
							'EnchantedHelmOfStorms',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1050000, 600000))
					});
		}
	});

var _mordrax$cotwelm$Item_Bracers$BracersM = F2(
	function (a, b) {
		return {ctor: 'BracersM', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Bracers$newBracers = F4(
	function (bracersType, id, status, idStatus) {
		var _p0 = bracersType;
		switch (_p0.ctor) {
			case 'NormalBracers':
				return A2(
					_mordrax$cotwelm$Item_Bracers$BracersM,
					_mordrax$cotwelm$Item_TypeDef$NormalBracers,
					{
						ac: 3,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Bracers',
							500,
							2000,
							'Bracers',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 108, 60))
					});
			case 'BracersOfDefenseNormal':
				return A2(
					_mordrax$cotwelm$Item_Bracers$BracersM,
					_mordrax$cotwelm$Item_TypeDef$BracersOfDefenseNormal,
					{
						ac: 8,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Bracers Of Defense Normal',
							500,
							2000,
							'BracersEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 1836, 1020))
					});
			case 'BracersOfDefenseS':
				return A2(
					_mordrax$cotwelm$Item_Bracers$BracersM,
					_mordrax$cotwelm$Item_TypeDef$BracersOfDefenseS,
					{
						ac: 13,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Bracers Of Defense Strong',
							500,
							2000,
							'BracersEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 5616, 3120))
					});
			default:
				return A2(
					_mordrax$cotwelm$Item_Bracers$BracersM,
					_mordrax$cotwelm$Item_TypeDef$BracersOfDefenseVS,
					{
						ac: 18,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Bracers Of Defense Very Strong',
							500,
							2000,
							'BracersEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 11556, 6420))
					});
		}
	});

var _mordrax$cotwelm$Item_Gauntlets$GauntletsM = F2(
	function (a, b) {
		return {ctor: 'GauntletsM', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Gauntlets$newGauntlets = F4(
	function (gauntletType, id, status, idStatus) {
		var _p0 = gauntletType;
		switch (_p0.ctor) {
			case 'NormalGauntlets':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$NormalGauntlets,
					{
						ac: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet',
							500,
							2000,
							'Gauntlet',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 105, 60))
					});
			case 'GauntletOfProtection':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfProtection,
					{
						ac: 10,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Protection',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 2625, 1500))
					});
			case 'GauntletOfProtectionS':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfProtectionS,
					{
						ac: 15,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Protection Strong',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 6300, 3600))
					});
			case 'GauntletOfProtectionVS':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfProtectionVS,
					{
						ac: 20,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Protection Very Strong',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 12420, 6900))
					});
			case 'GauntletOfSlaying':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfSlaying,
					{
						ac: 0,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Slaying',
							500,
							2000,
							'GauntletOfSlaying',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3780, 2100))
					});
			case 'GauntletOfSlayingS_S':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfSlayingS_S,
					{
						ac: 0,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Slaying Strong',
							500,
							2000,
							'GauntletOfSlaying',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 7560, 4200))
					});
			case 'GauntletOfSlayingVS_VS':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfSlayingVS_VS,
					{
						ac: 0,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Slaying Very Strong',
							500,
							2000,
							'GauntletOfSlaying',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 13125, 7500))
					});
			case 'GauntletOfDexterity':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfDexterity,
					{
						ac: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Dexterity',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800))
					});
			case 'GauntletOfDexterityS':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfDexterityS,
					{
						ac: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Dexterity Strong',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 7020, 3900))
					});
			case 'GauntletOfDexterityVS':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfDexterityVS,
					{
						ac: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Dexterity Very Strong',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 12960, 7200))
					});
			case 'GauntletOfStrength':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfStrength,
					{
						ac: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Strength',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800))
					});
			case 'GauntletOfStrengthS':
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfStrengthS,
					{
						ac: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Strength Strong',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0))
					});
			default:
				return A2(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsM,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfStrengthVS,
					{
						ac: 5,
						baseItem: A8(
							_mordrax$cotwelm$Item_Data$Model,
							id,
							'Gauntlet Of Strength Very Strong',
							500,
							2000,
							'GauntletEnchanted',
							status,
							idStatus,
							A2(_mordrax$cotwelm$Utils_Mass$new, 12960, 7200))
					});
		}
	});

var _mordrax$cotwelm$Item_Belt$BeltModelTag = F3(
	function (a, b, c) {
		return {ctor: 'BeltModelTag', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Belt$newBelt = F5(
	function (beltType, id, status, idStatus, newContainer) {
		var _p0 = beltType;
		switch (_p0.ctor) {
			case 'TwoSlotBelt':
				return A3(
					_mordrax$cotwelm$Item_Belt$BeltModelTag,
					_mordrax$cotwelm$Item_TypeDef$TwoSlotBelt,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Two Slot Belt',
						300,
						300,
						'SlotBelt',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					A5(
						_mordrax$cotwelm$Item_Data$BeltModel,
						2,
						0,
						0,
						0,
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 2100, 3100))));
			case 'ThreeSlotBelt':
				return A3(
					_mordrax$cotwelm$Item_Belt$BeltModelTag,
					_mordrax$cotwelm$Item_TypeDef$ThreeSlotBelt,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Three Slot Belt',
						300,
						300,
						'SlotBelt',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					A5(
						_mordrax$cotwelm$Item_Data$BeltModel,
						3,
						0,
						0,
						0,
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 2600, 3600))));
			case 'FourSlotBelt':
				return A3(
					_mordrax$cotwelm$Item_Belt$BeltModelTag,
					_mordrax$cotwelm$Item_TypeDef$FourSlotBelt,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Four Slot Belt',
						300,
						300,
						'SlotBelt',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					A5(
						_mordrax$cotwelm$Item_Data$BeltModel,
						4,
						0,
						0,
						0,
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 3100, 4100))));
			case 'UtilityBelt':
				return A3(
					_mordrax$cotwelm$Item_Belt$BeltModelTag,
					_mordrax$cotwelm$Item_TypeDef$UtilityBelt,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Utility Belt',
						1350,
						1800,
						'UtilityBelt',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					A5(
						_mordrax$cotwelm$Item_Data$BeltModel,
						2,
						4,
						4,
						0,
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 3100, 4100))));
			default:
				return A3(
					_mordrax$cotwelm$Item_Belt$BeltModelTag,
					_mordrax$cotwelm$Item_TypeDef$WandQuiverBelt,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Wand Quiver Belt',
						300,
						300,
						'WandQuiverBelt',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					A5(
						_mordrax$cotwelm$Item_Data$BeltModel,
						2,
						0,
						0,
						4,
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 3100, 4100))));
		}
	});

var _mordrax$cotwelm$Item_Pack$PM = F3(
	function (a, b, c) {
		return {ctor: 'PM', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Pack$newPack = F5(
	function (packType, id, status, idStatus, newContainer) {
		var _p0 = packType;
		switch (_p0.ctor) {
			case 'SmallBag':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$SmallBag,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Small Bag',
						300,
						500,
						'Bag',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 5000, 6000))));
			case 'MediumBag':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$MediumBag,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Medium Bag',
						500,
						700,
						'Bag',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 10000, 12000))));
			case 'LargeBag':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$LargeBag,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Large Bag',
						900,
						900,
						'Bag',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 15000, 18000))));
			case 'SmallPack':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$SmallPack,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Small Pack',
						1000,
						1000,
						'Pack',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 12000, 50000))));
			case 'MediumPack':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$MediumPack,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Medium Pack',
						2000,
						1500,
						'Pack',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 22000, 75000))));
			case 'LargePack':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$LargePack,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Large Pack',
						4000,
						100000,
						'Pack',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 35000, 100000))));
			case 'SmallChest':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$SmallChest,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Small Chest',
						5000,
						100000,
						'Chest',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 100000, 50000))));
			case 'MediumChest':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$MediumChest,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Medium Chest',
						15000,
						150000,
						'Chest',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 100000, 150000))));
			case 'LargeChest':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$LargeChest,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Large Chest',
						25000,
						250000,
						'Chest',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 100000, 250000))));
			case 'EnchantedSmallPackOfHolding':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$EnchantedSmallPackOfHolding,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Enchanted Small Pack Of Holding',
						5000,
						75000,
						'EnchantedPack',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 50000, 150000))));
			case 'EnchantedMediumPackOfHolding':
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$EnchantedMediumPackOfHolding,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Enchanted Medium Pack Of Holding',
						7500,
						100000,
						'EnchantedPack',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 75000, 200000))));
			default:
				return A3(
					_mordrax$cotwelm$Item_Pack$PM,
					_mordrax$cotwelm$Item_TypeDef$EnchantedLargePackOfHolding,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Enchanted Large Pack Of Holding',
						10000,
						125000,
						'EnchantedPack',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$PackModel(
						newContainer(
							A2(_mordrax$cotwelm$Utils_Mass$new, 100000, 250000))));
		}
	});

var _mordrax$cotwelm$Item_Purse$toLeastSilvers = function (coins) {
	return {
		ctor: '_Tuple2',
		_0: A2(_elm_lang$core$Basics_ops['%'], coins, 100),
		_1: (coins / 100) | 0
	};
};
var _mordrax$cotwelm$Item_Purse$toLeastGold = function (coins) {
	var _p0 = _mordrax$cotwelm$Item_Purse$toLeastSilvers(coins);
	var copper = _p0._0;
	var silver = _p0._1;
	return {
		ctor: '_Tuple3',
		_0: copper,
		_1: A2(_elm_lang$core$Basics_ops['%'], silver, 100),
		_2: (silver / 100) | 0
	};
};
var _mordrax$cotwelm$Item_Purse$toLeastCoins = function (coins) {
	var _p1 = _mordrax$cotwelm$Item_Purse$toLeastGold(coins);
	var copper = _p1._0;
	var silver = _p1._1;
	var gold = _p1._2;
	return {
		ctor: '_Tuple4',
		_0: copper,
		_1: silver,
		_2: A2(_elm_lang$core$Basics_ops['%'], gold, 100),
		_3: (gold / 100) | 0
	};
};
var _mordrax$cotwelm$Item_Purse$getCoins = function (_p2) {
	var _p3 = _p2;
	var _p4 = _p3._0;
	return {ctor: '_Tuple4', _0: _p4.copper, _1: _p4.silver, _2: _p4.gold, _3: _p4.platinum};
};
var _mordrax$cotwelm$Item_Purse$Model = F5(
	function (a, b, c, d, e) {
		return {copper: a, silver: b, gold: c, platinum: d, baseItem: e};
	});
var _mordrax$cotwelm$Item_Purse$purses = F3(
	function (op, p1, p2) {
		return A5(
			_mordrax$cotwelm$Item_Purse$Model,
			A2(op, p1.copper, p2.copper),
			A2(op, p1.silver, p2.silver),
			A2(op, p1.gold, p2.gold),
			A2(op, p1.platinum, p2.platinum),
			p1.baseItem);
	});
var _mordrax$cotwelm$Item_Purse$PurseM = function (a) {
	return {ctor: 'PurseM', _0: a};
};
var _mordrax$cotwelm$Item_Purse$newPurse = F3(
	function (id, status, idStatus) {
		return _mordrax$cotwelm$Item_Purse$PurseM(
			{
				copper: 100,
				silver: 10,
				gold: 1,
				platinum: 1,
				baseItem: A8(
					_mordrax$cotwelm$Item_Data$ItemModel,
					id,
					'Purse',
					0,
					0,
					'Purse',
					status,
					idStatus,
					A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0))
			});
	});
var _mordrax$cotwelm$Item_Purse$add = F2(
	function (coppers, _p5) {
		var _p6 = _p5;
		var _p7 = _mordrax$cotwelm$Item_Purse$toLeastCoins(coppers);
		var c = _p7._0;
		var s = _p7._1;
		var g = _p7._2;
		var p = _p7._3;
		return _mordrax$cotwelm$Item_Purse$PurseM(
			_elm_lang$core$Native_Utils.update(
				_p6._0,
				{copper: _p6._0.copper + c, silver: _p6._0.silver + s, gold: _p6._0.gold + g, platinum: _p6._0.platinum + p}));
	});
var _mordrax$cotwelm$Item_Purse$merge = F2(
	function (_p9, _p8) {
		var _p10 = _p9;
		var _p11 = _p8;
		return _mordrax$cotwelm$Item_Purse$PurseM(
			A3(
				_mordrax$cotwelm$Item_Purse$purses,
				F2(
					function (x, y) {
						return x + y;
					}),
				_p10._0,
				_p11._0));
	});
var _mordrax$cotwelm$Item_Purse$remove = F2(
	function (copperToRemove, _p12) {
		var _p13 = _p12;
		var _p18 = _p13._0;
		var _p17 = _p13._0.copper;
		var totalSilvers = _p17 + (_p13._0.silver * 100);
		var totalGold = totalSilvers + (_p13._0.gold * 10000);
		var totalPlatinum = totalGold + (_p13._0.platinum * 1000000);
		if (_elm_lang$core$Native_Utils.cmp(copperToRemove, _p17) < 1) {
			return _elm_lang$core$Result$Ok(
				_mordrax$cotwelm$Item_Purse$PurseM(
					_elm_lang$core$Native_Utils.update(
						_p18,
						{copper: _p17 - copperToRemove})));
		} else {
			if (_elm_lang$core$Native_Utils.cmp(copperToRemove, totalSilvers) < 1) {
				var _p14 = _mordrax$cotwelm$Item_Purse$toLeastSilvers(totalSilvers - copperToRemove);
				var copper$ = _p14._0;
				var silver$ = _p14._1;
				return _elm_lang$core$Result$Ok(
					_mordrax$cotwelm$Item_Purse$PurseM(
						_elm_lang$core$Native_Utils.update(
							_p18,
							{copper: copper$, silver: silver$})));
			} else {
				if (_elm_lang$core$Native_Utils.cmp(copperToRemove, totalGold) < 1) {
					var _p15 = _mordrax$cotwelm$Item_Purse$toLeastGold(totalGold - copperToRemove);
					var copper$ = _p15._0;
					var silver$ = _p15._1;
					var gold$ = _p15._2;
					return _elm_lang$core$Result$Ok(
						_mordrax$cotwelm$Item_Purse$PurseM(
							_elm_lang$core$Native_Utils.update(
								_p18,
								{copper: copper$, silver: silver$, gold: gold$})));
				} else {
					if (_elm_lang$core$Native_Utils.cmp(copperToRemove, totalPlatinum) < 1) {
						var _p16 = _mordrax$cotwelm$Item_Purse$toLeastCoins(totalPlatinum - copperToRemove);
						var copper$ = _p16._0;
						var silver$ = _p16._1;
						var gold$ = _p16._2;
						var platinum$ = _p16._3;
						return _elm_lang$core$Result$Ok(
							_mordrax$cotwelm$Item_Purse$PurseM(
								_elm_lang$core$Native_Utils.update(
									_p18,
									{copper: copper$, silver: silver$, gold: gold$, platinum: platinum$})));
					} else {
						return _elm_lang$core$Result$Err('Not enough coins to remove!');
					}
				}
			}
		}
	});
var _mordrax$cotwelm$Item_Purse$NotEnoughCoins = {ctor: 'NotEnoughCoins'};
var _mordrax$cotwelm$Item_Purse$Ok = {ctor: 'Ok'};

var _mordrax$cotwelm$Item_Item$newFoldableItem = F2(
	function (_p0, id) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: _p1._1(id)
		};
	});
var _mordrax$cotwelm$Item_Item$getModel = function (item) {
	var _p2 = item;
	switch (_p2.ctor) {
		case 'ItemWeapon':
			return _p2._0._1.baseItem;
		case 'ItemArmour':
			return _p2._0._1.baseItem;
		case 'ItemShield':
			return _p2._0._1.baseItem;
		case 'ItemHelmet':
			return _p2._0._1.baseItem;
		case 'ItemBracers':
			return _p2._0._1.baseItem;
		case 'ItemGauntlets':
			return _p2._0._1.baseItem;
		case 'ItemBelt':
			return _p2._0._1;
		case 'ItemPack':
			return _p2._0._1;
		case 'ItemPurse':
			return _p2._0._0.baseItem;
		case 'ItemNeckwear':
			return _p2._0._1;
		case 'ItemOvergarment':
			return _p2._0._1;
		case 'ItemRing':
			return _p2._0._1;
		default:
			return _p2._0._1;
	}
};
var _mordrax$cotwelm$Item_Item$equals = F2(
	function (a, b) {
		var modelB = _mordrax$cotwelm$Item_Item$getModel(b);
		var modelA = _mordrax$cotwelm$Item_Item$getModel(a);
		return A2(_mordrax$cotwelm$Utils_IdGenerator$equals, modelA.id, modelB.id);
	});
var _mordrax$cotwelm$Item_Item$viewSlot = F2(
	function (item, extraContent) {
		var model = _mordrax$cotwelm$Item_Item$getModel(item);
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('card')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('image')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html$i,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$class(
											A2(_elm_lang$core$Basics_ops['++'], 'cotwItem ', model.css))
										]),
									_elm_lang$core$Native_List.fromArray(
										[]))
								])),
							A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('content')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html$a,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$class('header')
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text(model.name)
										])),
									A2(
									_elm_lang$html$Html$div,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$class('meta')
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_elm_lang$html$Html$span,
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html_Attributes$class('date')
												]),
											_elm_lang$core$Native_List.fromArray(
												[
													_elm_lang$html$Html$text('')
												]))
										])),
									A2(
									_elm_lang$html$Html$div,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$class('description'),
											_elm_lang$html$Html_Attributes$style(
											_elm_lang$core$Native_List.fromArray(
												[
													{ctor: '_Tuple2', _0: 'maxWidth', _1: '7em'}
												]))
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html$text('')
										]))
								])),
							A2(
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('extra content')
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(extraContent)
								]))
						]))
				]));
	});
var _mordrax$cotwelm$Item_Item$view = function (item) {
	return A2(_mordrax$cotwelm$Item_Item$viewSlot, item, '');
};
var _mordrax$cotwelm$Item_Item$isCursed = function (item) {
	var _p3 = _mordrax$cotwelm$Item_Item$getModel(item);
	var status = _p3.status;
	var _p4 = status;
	if (_p4.ctor === 'Cursed') {
		return true;
	} else {
		return false;
	}
};
var _mordrax$cotwelm$Item_Item$getMass = function (item) {
	var model = _mordrax$cotwelm$Item_Item$getModel(item);
	return model.mass;
};
var _mordrax$cotwelm$Item_Item$newContainer = function (mass) {
	return A3(_mordrax$cotwelm$Container$new, mass, _mordrax$cotwelm$Item_Item$getMass, _mordrax$cotwelm$Item_Item$equals);
};
var _mordrax$cotwelm$Item_Item$costOf = function (item) {
	return function (_) {
		return _.buy;
	}(
		_mordrax$cotwelm$Item_Item$getModel(item));
};
var _mordrax$cotwelm$Item_Item$priceOf = function (item) {
	return function (_) {
		return _.sell;
	}(
		_mordrax$cotwelm$Item_Item$getModel(item));
};
var _mordrax$cotwelm$Item_Item$toPurse = function (item) {
	var _p5 = item;
	if (_p5.ctor === 'ItemPurse') {
		return _elm_lang$core$Maybe$Just(_p5._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _mordrax$cotwelm$Item_Item$packContents = function (_p6) {
	var _p7 = _p6;
	return _mordrax$cotwelm$Container$list(_p7._2.container);
};
var _mordrax$cotwelm$Item_Item$packInfo = function (_p8) {
	var _p9 = _p8;
	var _p10 = _p9._2;
	return {
		ctor: '_Tuple2',
		_0: _mordrax$cotwelm$Container$getMass(_p10.container),
		_1: _mordrax$cotwelm$Container$capacity(_p10.container)
	};
};
var _mordrax$cotwelm$Item_Item$removeFromPack = F2(
	function (item, _p11) {
		var _p12 = _p11;
		var _p13 = _p12._2;
		return A3(
			_mordrax$cotwelm$Item_Pack$PM,
			_p12._0,
			_p12._1,
			_elm_lang$core$Native_Utils.update(
				_p13,
				{
					container: A2(_mordrax$cotwelm$Container$take, item, _p13.container)
				}));
	});
var _mordrax$cotwelm$Item_Item$Boots = function (a) {
	return {ctor: 'Boots', _0: a};
};
var _mordrax$cotwelm$Item_Item$Ring = function (a) {
	return {ctor: 'Ring', _0: a};
};
var _mordrax$cotwelm$Item_Item$Overgarment = function (a) {
	return {ctor: 'Overgarment', _0: a};
};
var _mordrax$cotwelm$Item_Item$Neckwear = function (a) {
	return {ctor: 'Neckwear', _0: a};
};
var _mordrax$cotwelm$Item_Item$Purse = {ctor: 'Purse'};
var _mordrax$cotwelm$Item_Item$Pack = function (a) {
	return {ctor: 'Pack', _0: a};
};
var _mordrax$cotwelm$Item_Item$Belt = function (a) {
	return {ctor: 'Belt', _0: a};
};
var _mordrax$cotwelm$Item_Item$Gauntlets = function (a) {
	return {ctor: 'Gauntlets', _0: a};
};
var _mordrax$cotwelm$Item_Item$Bracers = function (a) {
	return {ctor: 'Bracers', _0: a};
};
var _mordrax$cotwelm$Item_Item$Helmet = function (a) {
	return {ctor: 'Helmet', _0: a};
};
var _mordrax$cotwelm$Item_Item$Shield = function (a) {
	return {ctor: 'Shield', _0: a};
};
var _mordrax$cotwelm$Item_Item$Armour = function (a) {
	return {ctor: 'Armour', _0: a};
};
var _mordrax$cotwelm$Item_Item$Weapon = function (a) {
	return {ctor: 'Weapon', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemBoots = function (a) {
	return {ctor: 'ItemBoots', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemRing = function (a) {
	return {ctor: 'ItemRing', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemOvergarment = function (a) {
	return {ctor: 'ItemOvergarment', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemNeckwear = function (a) {
	return {ctor: 'ItemNeckwear', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemPurse = function (a) {
	return {ctor: 'ItemPurse', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemPack = function (a) {
	return {ctor: 'ItemPack', _0: a};
};
var _mordrax$cotwelm$Item_Item$addToPack = F2(
	function (item, pack) {
		var _p14 = pack;
		var packType = _p14._0;
		var model = _p14._1;
		var packModel = _p14._2;
		var _p15 = A2(_mordrax$cotwelm$Container$add, item, packModel.container);
		var container$ = _p15._0;
		var msg = _p15._1;
		var isItemThePack = A2(
			_mordrax$cotwelm$Item_Item$equals,
			item,
			_mordrax$cotwelm$Item_Item$ItemPack(pack));
		var _p16 = A2(_elm_lang$core$Debug$log, 'is item the pack: ', isItemThePack);
		if (_elm_lang$core$Native_Utils.eq(isItemThePack, true)) {
			return {ctor: '_Tuple2', _0: pack, _1: _mordrax$cotwelm$Item_TypeDef$NestedItem};
		} else {
			var _p17 = msg;
			if (_p17.ctor === 'Ok') {
				return {
					ctor: '_Tuple2',
					_0: A3(
						_mordrax$cotwelm$Item_Pack$PM,
						packType,
						model,
						_elm_lang$core$Native_Utils.update(
							packModel,
							{container: container$})),
					_1: _mordrax$cotwelm$Item_TypeDef$Ok
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: pack,
					_1: _mordrax$cotwelm$Item_TypeDef$MassMsg(_p17._0)
				};
			}
		}
	});
var _mordrax$cotwelm$Item_Item$ItemBelt = function (a) {
	return {ctor: 'ItemBelt', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemGauntlets = function (a) {
	return {ctor: 'ItemGauntlets', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemBracers = function (a) {
	return {ctor: 'ItemBracers', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemHelmet = function (a) {
	return {ctor: 'ItemHelmet', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemShield = function (a) {
	return {ctor: 'ItemShield', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemArmour = function (a) {
	return {ctor: 'ItemArmour', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemWeapon = function (a) {
	return {ctor: 'ItemWeapon', _0: a};
};
var _mordrax$cotwelm$Item_Item$newWithOptions = F4(
	function (itemType, id, status, idStatus) {
		var _p18 = itemType;
		switch (_p18.ctor) {
			case 'Weapon':
				return _mordrax$cotwelm$Item_Item$ItemWeapon(
					A4(_mordrax$cotwelm$Item_Weapon$newWeapon, _p18._0, id, status, idStatus));
			case 'Armour':
				return _mordrax$cotwelm$Item_Item$ItemArmour(
					A4(_mordrax$cotwelm$Item_Armour$newArmour, _p18._0, id, status, idStatus));
			case 'Shield':
				return _mordrax$cotwelm$Item_Item$ItemShield(
					A4(_mordrax$cotwelm$Item_Shield$newShield, _p18._0, id, status, idStatus));
			case 'Helmet':
				return _mordrax$cotwelm$Item_Item$ItemHelmet(
					A4(_mordrax$cotwelm$Item_Helmet$newHelmet, _p18._0, id, status, idStatus));
			case 'Bracers':
				return _mordrax$cotwelm$Item_Item$ItemBracers(
					A4(_mordrax$cotwelm$Item_Bracers$newBracers, _p18._0, id, status, idStatus));
			case 'Gauntlets':
				return _mordrax$cotwelm$Item_Item$ItemGauntlets(
					A4(_mordrax$cotwelm$Item_Gauntlets$newGauntlets, _p18._0, id, status, idStatus));
			case 'Belt':
				return _mordrax$cotwelm$Item_Item$ItemBelt(
					A5(_mordrax$cotwelm$Item_Belt$newBelt, _p18._0, id, status, idStatus, _mordrax$cotwelm$Item_Item$newContainer));
			case 'Pack':
				return _mordrax$cotwelm$Item_Item$ItemPack(
					A5(_mordrax$cotwelm$Item_Pack$newPack, _p18._0, id, status, idStatus, _mordrax$cotwelm$Item_Item$newContainer));
			case 'Purse':
				return _mordrax$cotwelm$Item_Item$ItemPurse(
					A3(_mordrax$cotwelm$Item_Purse$newPurse, id, status, idStatus));
			default:
				return _mordrax$cotwelm$Item_Item$ItemWeapon(
					A4(_mordrax$cotwelm$Item_Weapon$newWeapon, _mordrax$cotwelm$Item_TypeDef$Dagger, id, status, idStatus));
		}
	});
var _mordrax$cotwelm$Item_Item$new = F2(
	function (itemType, id) {
		return A4(_mordrax$cotwelm$Item_Item$newWithOptions, itemType, id, _mordrax$cotwelm$Item_TypeDef$Normal, _mordrax$cotwelm$Item_TypeDef$Identified);
	});
var _mordrax$cotwelm$Item_Item$NeckwearModelTag = F2(
	function (a, b) {
		return {ctor: 'NeckwearModelTag', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Item$OvergarmentModelTag = F2(
	function (a, b) {
		return {ctor: 'OvergarmentModelTag', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Item$RingModelTag = F2(
	function (a, b) {
		return {ctor: 'RingModelTag', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Item$BootsModelTag = F2(
	function (a, b) {
		return {ctor: 'BootsModelTag', _0: a, _1: b};
	});

var _mordrax$cotwelm$Equipment$setSlot = F2(
	function (_p0, model) {
		var _p1 = _p0;
		var _p18 = _p1._1;
		var _p2 = _p1._0;
		switch (_p2.ctor) {
			case 'Weapon':
				var _p3 = _p18;
				if ((_p3.ctor === 'Just') && (_p3._0.ctor === 'ItemWeapon')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							weapon: _elm_lang$core$Maybe$Just(_p3._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{weapon: _elm_lang$core$Maybe$Nothing});
				}
			case 'Freehand':
				var _p4 = _p18;
				if (_p4.ctor === 'Just') {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							freehand: _elm_lang$core$Maybe$Just(_p4._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{freehand: _elm_lang$core$Maybe$Nothing});
				}
			case 'Armour':
				var _p5 = _p18;
				if ((_p5.ctor === 'Just') && (_p5._0.ctor === 'ItemArmour')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							armour: _elm_lang$core$Maybe$Just(_p5._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{armour: _elm_lang$core$Maybe$Nothing});
				}
			case 'Shield':
				var _p6 = _p18;
				if ((_p6.ctor === 'Just') && (_p6._0.ctor === 'ItemShield')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							shield: _elm_lang$core$Maybe$Just(_p6._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{shield: _elm_lang$core$Maybe$Nothing});
				}
			case 'Helmet':
				var _p7 = _p18;
				if ((_p7.ctor === 'Just') && (_p7._0.ctor === 'ItemHelmet')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							helmet: _elm_lang$core$Maybe$Just(_p7._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{helmet: _elm_lang$core$Maybe$Nothing});
				}
			case 'Bracers':
				var _p8 = _p18;
				if ((_p8.ctor === 'Just') && (_p8._0.ctor === 'ItemBracers')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							bracers: _elm_lang$core$Maybe$Just(_p8._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{bracers: _elm_lang$core$Maybe$Nothing});
				}
			case 'Gauntlets':
				var _p9 = _p18;
				if ((_p9.ctor === 'Just') && (_p9._0.ctor === 'ItemGauntlets')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							gauntlets: _elm_lang$core$Maybe$Just(_p9._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{gauntlets: _elm_lang$core$Maybe$Nothing});
				}
			case 'Belt':
				var _p10 = _p18;
				if ((_p10.ctor === 'Just') && (_p10._0.ctor === 'ItemBelt')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							belt: _elm_lang$core$Maybe$Just(_p10._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{belt: _elm_lang$core$Maybe$Nothing});
				}
			case 'Purse':
				var _p11 = _p18;
				if ((_p11.ctor === 'Just') && (_p11._0.ctor === 'ItemPurse')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							purse: _elm_lang$core$Maybe$Just(_p11._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{purse: _elm_lang$core$Maybe$Nothing});
				}
			case 'Pack':
				var _p12 = _p18;
				if ((_p12.ctor === 'Just') && (_p12._0.ctor === 'ItemPack')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							pack: _elm_lang$core$Maybe$Just(_p12._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{pack: _elm_lang$core$Maybe$Nothing});
				}
			case 'Neckwear':
				var _p13 = _p18;
				if ((_p13.ctor === 'Just') && (_p13._0.ctor === 'ItemNeckwear')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							neckwear: _elm_lang$core$Maybe$Just(_p13._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{neckwear: _elm_lang$core$Maybe$Nothing});
				}
			case 'Overgarment':
				var _p14 = _p18;
				if ((_p14.ctor === 'Just') && (_p14._0.ctor === 'ItemOvergarment')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							overgarment: _elm_lang$core$Maybe$Just(_p14._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{overgarment: _elm_lang$core$Maybe$Nothing});
				}
			case 'LeftRing':
				var _p15 = _p18;
				if ((_p15.ctor === 'Just') && (_p15._0.ctor === 'ItemRing')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							leftRing: _elm_lang$core$Maybe$Just(_p15._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{leftRing: _elm_lang$core$Maybe$Nothing});
				}
			case 'RightRing':
				var _p16 = _p18;
				if ((_p16.ctor === 'Just') && (_p16._0.ctor === 'ItemRing')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							rightRing: _elm_lang$core$Maybe$Just(_p16._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{rightRing: _elm_lang$core$Maybe$Nothing});
				}
			default:
				var _p17 = _p18;
				if ((_p17.ctor === 'Just') && (_p17._0.ctor === 'ItemBoots')) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							boots: _elm_lang$core$Maybe$Just(_p17._0._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{boots: _elm_lang$core$Maybe$Nothing});
				}
		}
	});
var _mordrax$cotwelm$Equipment$get = F2(
	function (slot, _p19) {
		var _p20 = _p19;
		var _p22 = _p20._0;
		var _p21 = slot;
		switch (_p21.ctor) {
			case 'Weapon':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemWeapon, _p22.weapon);
			case 'Freehand':
				return _p22.freehand;
			case 'Armour':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemArmour, _p22.armour);
			case 'Shield':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemShield, _p22.shield);
			case 'Helmet':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemHelmet, _p22.helmet);
			case 'Bracers':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemBracers, _p22.bracers);
			case 'Gauntlets':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemGauntlets, _p22.gauntlets);
			case 'Belt':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemBelt, _p22.belt);
			case 'Purse':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemPurse, _p22.purse);
			case 'Pack':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemPack, _p22.pack);
			case 'Neckwear':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemNeckwear, _p22.neckwear);
			case 'Overgarment':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemOvergarment, _p22.overgarment);
			case 'LeftRing':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemRing, _p22.leftRing);
			case 'RightRing':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemRing, _p22.rightRing);
			default:
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemBoots, _p22.boots);
		}
	});
var _mordrax$cotwelm$Equipment$getPackContent = function (_p23) {
	var _p24 = _p23;
	var _p25 = _p24._0.pack;
	if (_p25.ctor === 'Just') {
		return _mordrax$cotwelm$Item_Item$packContents(_p25._0);
	} else {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	}
};
var _mordrax$cotwelm$Equipment$fold = F3(
	function (f, acc, list) {
		fold:
		while (true) {
			var _p26 = list;
			if (_p26.ctor === '[]') {
				return acc;
			} else {
				var nextAcc = A2(
					_elm_lang$core$Result$andThen,
					acc,
					f(_p26._0));
				var _v22 = f,
					_v23 = nextAcc,
					_v24 = _p26._1;
				f = _v22;
				acc = _v23;
				list = _v24;
				continue fold;
			}
		}
	});
var _mordrax$cotwelm$Equipment$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return {weapon: a, freehand: b, armour: c, shield: d, helmet: e, bracers: f, gauntlets: g, belt: h, purse: i, pack: j, neckwear: k, overgarment: l, leftRing: m, rightRing: n, boots: o};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _mordrax$cotwelm$Equipment$EM = function (a) {
	return {ctor: 'EM', _0: a};
};
var _mordrax$cotwelm$Equipment$new = _mordrax$cotwelm$Equipment$EM(
	{weapon: _elm_lang$core$Maybe$Nothing, freehand: _elm_lang$core$Maybe$Nothing, armour: _elm_lang$core$Maybe$Nothing, shield: _elm_lang$core$Maybe$Nothing, helmet: _elm_lang$core$Maybe$Nothing, bracers: _elm_lang$core$Maybe$Nothing, gauntlets: _elm_lang$core$Maybe$Nothing, belt: _elm_lang$core$Maybe$Nothing, purse: _elm_lang$core$Maybe$Nothing, pack: _elm_lang$core$Maybe$Nothing, neckwear: _elm_lang$core$Maybe$Nothing, overgarment: _elm_lang$core$Maybe$Nothing, leftRing: _elm_lang$core$Maybe$Nothing, rightRing: _elm_lang$core$Maybe$Nothing, boots: _elm_lang$core$Maybe$Nothing});
var _mordrax$cotwelm$Equipment$unequip = F2(
	function (slot, _p27) {
		var _p28 = _p27;
		var _p30 = _p28._0;
		var maybeItem = A2(
			_mordrax$cotwelm$Equipment$get,
			slot,
			_mordrax$cotwelm$Equipment$EM(_p30));
		var _p29 = maybeItem;
		if (_p29.ctor === 'Just') {
			return _mordrax$cotwelm$Item_Item$isCursed(_p29._0) ? _elm_lang$core$Result$Err('You cannot remove a cursed item!') : _elm_lang$core$Result$Ok(
				_mordrax$cotwelm$Equipment$EM(
					A2(
						_mordrax$cotwelm$Equipment$setSlot,
						{ctor: '_Tuple2', _0: slot, _1: _elm_lang$core$Maybe$Nothing},
						_p30)));
		} else {
			return _elm_lang$core$Result$Ok(
				_mordrax$cotwelm$Equipment$EM(_p30));
		}
	});
var _mordrax$cotwelm$Equipment$removeFromPack = F2(
	function (item, _p31) {
		var _p32 = _p31;
		var _p34 = _p32._0;
		var noChange = _mordrax$cotwelm$Equipment$EM(_p34);
		var _p33 = _p34.pack;
		if (_p33.ctor === 'Nothing') {
			return noChange;
		} else {
			return _mordrax$cotwelm$Equipment$EM(
				_elm_lang$core$Native_Utils.update(
					_p34,
					{
						pack: _elm_lang$core$Maybe$Just(
							A2(_mordrax$cotwelm$Item_Item$removeFromPack, item, _p33._0))
					}));
		}
	});
var _mordrax$cotwelm$Equipment$updatePurseContents = F2(
	function (purse, _p35) {
		var _p36 = _p35;
		return _mordrax$cotwelm$Equipment$EM(
			_elm_lang$core$Native_Utils.update(
				_p36._0,
				{
					purse: _elm_lang$core$Maybe$Just(purse)
				}));
	});
var _mordrax$cotwelm$Equipment$Boots = {ctor: 'Boots'};
var _mordrax$cotwelm$Equipment$RightRing = {ctor: 'RightRing'};
var _mordrax$cotwelm$Equipment$LeftRing = {ctor: 'LeftRing'};
var _mordrax$cotwelm$Equipment$Overgarment = {ctor: 'Overgarment'};
var _mordrax$cotwelm$Equipment$Neckwear = {ctor: 'Neckwear'};
var _mordrax$cotwelm$Equipment$Pack = {ctor: 'Pack'};
var _mordrax$cotwelm$Equipment$Purse = {ctor: 'Purse'};
var _mordrax$cotwelm$Equipment$Belt = {ctor: 'Belt'};
var _mordrax$cotwelm$Equipment$Gauntlets = {ctor: 'Gauntlets'};
var _mordrax$cotwelm$Equipment$Bracers = {ctor: 'Bracers'};
var _mordrax$cotwelm$Equipment$Helmet = {ctor: 'Helmet'};
var _mordrax$cotwelm$Equipment$Shield = {ctor: 'Shield'};
var _mordrax$cotwelm$Equipment$Armour = {ctor: 'Armour'};
var _mordrax$cotwelm$Equipment$Freehand = {ctor: 'Freehand'};
var _mordrax$cotwelm$Equipment$Weapon = {ctor: 'Weapon'};
var _mordrax$cotwelm$Equipment$WrongSlotForItemType = {ctor: 'WrongSlotForItemType'};
var _mordrax$cotwelm$Equipment$equip = F2(
	function (_p38, _p37) {
		var _p39 = _p38;
		var _p40 = _p37;
		var _p42 = _p40._0;
		var _p41 = {ctor: '_Tuple2', _0: _p39._0, _1: _p39._1};
		_v32_10:
		do {
			if (_p41.ctor === '_Tuple2') {
				switch (_p41._0.ctor) {
					case 'Weapon':
						if (_p41._1.ctor === 'ItemWeapon') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											weapon: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Freehand':
						return _elm_lang$core$Result$Ok(
							_mordrax$cotwelm$Equipment$EM(
								_elm_lang$core$Native_Utils.update(
									_p42,
									{
										freehand: _elm_lang$core$Maybe$Just(_p41._1)
									})));
					case 'Armour':
						if (_p41._1.ctor === 'ItemArmour') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											armour: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Shield':
						if (_p41._1.ctor === 'ItemShield') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											shield: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Helmet':
						if (_p41._1.ctor === 'ItemHelmet') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											helmet: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Bracers':
						if (_p41._1.ctor === 'ItemBracers') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											bracers: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Gauntlets':
						if (_p41._1.ctor === 'ItemGauntlets') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											gauntlets: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Belt':
						if (_p41._1.ctor === 'ItemBelt') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											belt: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Purse':
						if (_p41._1.ctor === 'ItemPurse') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											purse: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					case 'Pack':
						if (_p41._1.ctor === 'ItemPack') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$EM(
									_elm_lang$core$Native_Utils.update(
										_p42,
										{
											pack: _elm_lang$core$Maybe$Just(_p41._1._0)
										})));
						} else {
							break _v32_10;
						}
					default:
						break _v32_10;
				}
			} else {
				break _v32_10;
			}
		} while(false);
		return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$WrongSlotForItemType);
	});
var _mordrax$cotwelm$Equipment$NoPackEquipped = {ctor: 'NoPackEquipped'};
var _mordrax$cotwelm$Equipment$ItemMsg = function (a) {
	return {ctor: 'ItemMsg', _0: a};
};
var _mordrax$cotwelm$Equipment$MassResult = function (a) {
	return {ctor: 'MassResult', _0: a};
};
var _mordrax$cotwelm$Equipment$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Equipment$putInPack = F2(
	function (item, _p43) {
		var _p44 = _p43;
		var _p47 = _p44._0;
		var noChange = {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Equipment$EM(_p47),
			_1: _mordrax$cotwelm$Equipment$Ok
		};
		var _p45 = _p47.pack;
		if (_p45.ctor === 'Nothing') {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$EM(_p47),
				_1: _mordrax$cotwelm$Equipment$NoPackEquipped
			};
		} else {
			var _p46 = A2(_mordrax$cotwelm$Item_Item$addToPack, item, _p45._0);
			var pack$ = _p46._0;
			var msg = _p46._1;
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$EM(
					_elm_lang$core$Native_Utils.update(
						_p47,
						{
							pack: _elm_lang$core$Maybe$Just(pack$)
						})),
				_1: _mordrax$cotwelm$Equipment$ItemMsg(msg)
			};
		}
	});
var _mordrax$cotwelm$Equipment$init = function (idGenerator) {
	var preFoldedItems = A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Item_Item$newFoldableItem,
		_elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Weapon,
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Dagger))
			},
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Armour,
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$ScaleMail))
			},
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Shield,
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$LargeIronShield))
			},
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Helmet,
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$LeatherHelmet))
			},
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Gauntlets,
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Gauntlets(_mordrax$cotwelm$Item_TypeDef$NormalGauntlets))
			},
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Belt,
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Belt(_mordrax$cotwelm$Item_TypeDef$TwoSlotBelt))
			},
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Purse,
				_1: _mordrax$cotwelm$Item_Item$new(_mordrax$cotwelm$Item_Item$Purse)
			},
				{
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$Pack,
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$MediumPack))
			}
			]));
	var _p48 = A3(
		_elm_lang$core$List$foldl,
		_mordrax$cotwelm$Utils_IdGenerator$assignId,
		{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: idGenerator
		},
		preFoldedItems);
	var itemsWithSlots = _p48._0;
	var idGenerator$ = _p48._1;
	var _p49 = _mordrax$cotwelm$Utils_IdGenerator$getUniqueId(idGenerator$);
	var id = _p49._0;
	var idGenerator$$ = _p49._1;
	var ths = A2(
		_mordrax$cotwelm$Item_Item$new,
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$TwoHandedSword),
		id);
	var equipment$ = function () {
		var _p50 = A3(
			_mordrax$cotwelm$Equipment$fold,
			_mordrax$cotwelm$Equipment$equip,
			_elm_lang$core$Result$Ok(_mordrax$cotwelm$Equipment$new),
			itemsWithSlots);
		if (_p50.ctor === 'Ok') {
			return _p50._0;
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'Equipment',
				{
					start: {line: 136, column: 13},
					end: {line: 141, column: 66}
				},
				_p50)('Failed to initialise equipment!');
		}
	}();
	var _p52 = A2(_mordrax$cotwelm$Equipment$putInPack, ths, equipment$);
	var equipmentWithTHS = _p52._0;
	return {ctor: '_Tuple2', _0: idGenerator$$, _1: equipmentWithTHS};
};

var _mordrax$cotwelm$Utils_Vector$boxIntersect = F2(
	function (target, _p0) {
		var _p1 = _p0;
		var _p3 = _p1._0;
		var _p2 = _p1._1;
		var isWithinY = (_elm_lang$core$Native_Utils.cmp(target.y, _p3.y) > -1) && (_elm_lang$core$Native_Utils.cmp(target.y, _p2.y) < 1);
		var isWithinX = (_elm_lang$core$Native_Utils.cmp(target.x, _p3.x) > -1) && (_elm_lang$core$Native_Utils.cmp(target.x, _p2.x) < 1);
		return isWithinX && isWithinY;
	});
var _mordrax$cotwelm$Utils_Vector$scale = F2(
	function (magnitude, _p4) {
		var _p5 = _p4;
		return {x: _p5.x * magnitude, y: _p5.y * magnitude};
	});
var _mordrax$cotwelm$Utils_Vector$sub = F2(
	function (a, b) {
		return {x: a.x - b.x, y: a.y - b.y};
	});
var _mordrax$cotwelm$Utils_Vector$add = F2(
	function (v1, v2) {
		return {x: v1.x + v2.x, y: v1.y + v2.y};
	});
var _mordrax$cotwelm$Utils_Vector$equal = F2(
	function (v1, v2) {
		return _elm_lang$core$Native_Utils.eq(v1.x, v2.x) && _elm_lang$core$Native_Utils.eq(v1.y, v2.y);
	});
var _mordrax$cotwelm$Utils_Vector$new = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var _mordrax$cotwelm$Utils_Vector$Vector = F2(
	function (a, b) {
		return {x: a, y: b};
	});

var _mordrax$cotwelm$Hero$Hero = F3(
	function (a, b, c) {
		return {base: a, position: b, stats: c};
	});
var _mordrax$cotwelm$Hero$Model = function (a) {
	return {name: a};
};
var _mordrax$cotwelm$Hero$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Hero$init = {
	base: _mordrax$cotwelm$Hero$A(
		_mordrax$cotwelm$Hero$Model('Bob the Brave')),
	position: A2(_mordrax$cotwelm$Utils_Vector$new, 11, 17),
	stats: A2(_mordrax$cotwelm$Stats$new, 20, 10)
};

var _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle = function (v) {
	return _elm_lang$html$Html_Attributes$style(
		_elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple2',
				_0: 'top',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(v.y * 32),
					'px')
			},
				{
				ctor: '_Tuple2',
				_0: 'left',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(v.x * 32),
					'px')
			}
			]));
};

var _mordrax$cotwelm$GameData_Types$DungeonLevel = function (a) {
	return {ctor: 'DungeonLevel', _0: a};
};
var _mordrax$cotwelm$GameData_Types$DungeonLevelOne = {ctor: 'DungeonLevelOne'};
var _mordrax$cotwelm$GameData_Types$Farm = {ctor: 'Farm'};
var _mordrax$cotwelm$GameData_Types$Village = {ctor: 'Village'};

var _mordrax$cotwelm$GameData_Building$buildingType = function (_p0) {
	var _p1 = _p0;
	return _p1._0.buildingType;
};
var _mordrax$cotwelm$GameData_Building$isBuildingAtPosition = F2(
	function (pos, _p2) {
		var _p3 = _p2;
		var _p4 = _p3._0;
		var bottomLeft = A2(
			_mordrax$cotwelm$Utils_Vector$sub,
			A2(_mordrax$cotwelm$Utils_Vector$add, _p4.pos, _p4.size),
			A2(_mordrax$cotwelm$Utils_Vector$new, 1, 1));
		return A2(
			_mordrax$cotwelm$Utils_Vector$boxIntersect,
			pos,
			{ctor: '_Tuple2', _0: _p4.pos, _1: bottomLeft});
	});
var _mordrax$cotwelm$GameData_Building$view = function (_p5) {
	var _p6 = _p5;
	var _p7 = _p6._0;
	var posStyle = _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(_p7.pos);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'tile ',
					_elm_lang$core$Basics$toString(_p7.tile))),
				posStyle
			]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _mordrax$cotwelm$GameData_Building$Model = F6(
	function (a, b, c, d, e, f) {
		return {tile: a, entry: b, pos: c, name: d, size: e, buildingType: f};
	});
var _mordrax$cotwelm$GameData_Building$Link = F2(
	function (a, b) {
		return {area: a, pos: b};
	});
var _mordrax$cotwelm$GameData_Building$BM = function (a) {
	return {ctor: 'BM', _0: a};
};
var _mordrax$cotwelm$GameData_Building$new = F4(
	function (buildingTile, pos, name, buildingType) {
		var newBuilding = F2(
			function (entry, size) {
				return _mordrax$cotwelm$GameData_Building$BM(
					A6(_mordrax$cotwelm$GameData_Building$Model, buildingTile, entry, pos, name, size, buildingType));
			});
		var _p8 = buildingTile;
		switch (_p8.ctor) {
			case 'Gate_NS':
				return A2(
					newBuilding,
					A2(_mordrax$cotwelm$Utils_Vector$new, 1, 0),
					A2(_mordrax$cotwelm$Utils_Vector$new, 3, 1));
			case 'Hut_EF':
				return A2(
					newBuilding,
					A2(_mordrax$cotwelm$Utils_Vector$new, 0, 1),
					A2(_mordrax$cotwelm$Utils_Vector$new, 2, 2));
			case 'StrawHouse_EF':
				return A2(
					newBuilding,
					A2(_mordrax$cotwelm$Utils_Vector$new, 2, 1),
					A2(_mordrax$cotwelm$Utils_Vector$new, 3, 3));
			case 'StrawHouse_WF':
				return A2(
					newBuilding,
					A2(_mordrax$cotwelm$Utils_Vector$new, 0, 1),
					A2(_mordrax$cotwelm$Utils_Vector$new, 3, 3));
			case 'BurntStrawHouse_WF':
				return A2(
					newBuilding,
					A2(_mordrax$cotwelm$Utils_Vector$new, 0, 1),
					A2(_mordrax$cotwelm$Utils_Vector$new, 3, 3));
			case 'HutTemple_NF':
				return A2(
					newBuilding,
					A2(_mordrax$cotwelm$Utils_Vector$new, 2, 0),
					A2(_mordrax$cotwelm$Utils_Vector$new, 5, 6));
			default:
				return A2(
					newBuilding,
					A2(_mordrax$cotwelm$Utils_Vector$new, 0, 0),
					A2(_mordrax$cotwelm$Utils_Vector$new, 1, 1));
		}
	});
var _mordrax$cotwelm$GameData_Building$JunkShop = {ctor: 'JunkShop'};
var _mordrax$cotwelm$GameData_Building$PotionStore = {ctor: 'PotionStore'};
var _mordrax$cotwelm$GameData_Building$GeneralStore = {ctor: 'GeneralStore'};
var _mordrax$cotwelm$GameData_Building$WeaponSmith = {ctor: 'WeaponSmith'};
var _mordrax$cotwelm$GameData_Building$Ordinary = {ctor: 'Ordinary'};
var _mordrax$cotwelm$GameData_Building$ShopType = function (a) {
	return {ctor: 'ShopType', _0: a};
};
var _mordrax$cotwelm$GameData_Building$LinkType = function (a) {
	return {ctor: 'LinkType', _0: a};
};
var _mordrax$cotwelm$GameData_Building$newLink = F2(
	function (area, pos) {
		return _mordrax$cotwelm$GameData_Building$LinkType(
			A2(_mordrax$cotwelm$GameData_Building$Link, area, pos));
	});
var _mordrax$cotwelm$GameData_Building$MineEntrance = {ctor: 'MineEntrance'};
var _mordrax$cotwelm$GameData_Building$HutTemple_NF = {ctor: 'HutTemple_NF'};
var _mordrax$cotwelm$GameData_Building$BurntStrawHouse_WF = {ctor: 'BurntStrawHouse_WF'};
var _mordrax$cotwelm$GameData_Building$StrawHouse_WF = {ctor: 'StrawHouse_WF'};
var _mordrax$cotwelm$GameData_Building$StrawHouse_EF = {ctor: 'StrawHouse_EF'};
var _mordrax$cotwelm$GameData_Building$Hut_EF = {ctor: 'Hut_EF'};
var _mordrax$cotwelm$GameData_Building$Gate_NS = {ctor: 'Gate_NS'};

var _mordrax$cotwelm$GameData_ASCIIMaps$dungeonLevelOneMap = _elm_lang$core$Native_List.fromArray(
	['^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^dooo^^ood^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^doooooddooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^doddoooooooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^dod^^oooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^od^^^oooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^o^^^^dooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^o^^^^^dod^dod^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^dood^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^ooood^^^^^o^^^^^^^^^^doood^^^', '^^^^^^^^^^^^oooooo^^^^o^^^^^^^^^^ooooo^^^', '^^^^^^^^^^^^dooooo^^^^o^^^^^^^^^^ooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^^^^^^dooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^^dooooooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^dod^^^doooo^^^', '^^^^^^^^^^^^^od^^^^^^^od^^dod^^^^^^^oo^^^', '^^^^^^^^^^^^^dod^^^^^^doddod^^^^^^^ood^^^', '^^^^^^^^^^^^^^dod^^^^^^dood^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^do^^^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^od^^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^dod^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^dod^^^do^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^dod^^od^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^doddo^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^dood^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^']);
var _mordrax$cotwelm$GameData_ASCIIMaps$farmMap = _elm_lang$core$Native_List.fromArray(
	['^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^#^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^.,,,^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^,,.,,,,,^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^,,,,,,,.,,,,,,^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^,,,,,,,,.,,,,,,,,,^^^^^^^^^^^^^^^', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', '.................................................', '.................................................', ',,,,,,,,,,,,,,,,,,,,,,,..;,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,###,,=', ',,,,,,,,,,,,,,,,;..........................###,,=', ',,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,###,,=', ',,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=======', ',,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,.,,,,,=======,,,,,,,,,,,,,,,,,,=======', '========,,###,,,,=======,,,,,,,,,,,,,,,,,,,,,,,,,']);
var _mordrax$cotwelm$GameData_ASCIIMaps$villageMap = _elm_lang$core$Native_List.fromArray(
	['========,,###,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '===,,,,,;...,,,!###=====', '===###!;.;,.,,;.###=====', '===###..;,,.,;.;###=====', '===###,,,,,...;,,,,,,===', '===,,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,!###,,,,===', '====,,,##.....###,,,,===', '====,,,##!,.,,###,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,###!...!###,======', '====,,###..e..###,======', '====,,###,...,###,======', '====,,,,,,,.,,,,,,======', '====,,,,,,,.!,,,,,======', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '========================']);

var _mordrax$cotwelm$Monster_Monster$view = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1.base;
	var model = _p2._0;
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(_p1.position),
				_elm_lang$html$Html_Attributes$class(
				A2(_elm_lang$core$Basics_ops['++'], 'tile monster ', model.css))
			]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _mordrax$cotwelm$Monster_Monster$damageRange = function (_p3) {
	var _p4 = _p3;
	var _p5 = _p4.base;
	var model = _p5._0;
	return {ctor: '_Tuple2', _0: model.level, _1: model.level * 4};
};
var _mordrax$cotwelm$Monster_Monster$Monster = F4(
	function (a, b, c, d) {
		return {base: a, position: b, stats: c, id: d};
	});
var _mordrax$cotwelm$Monster_Monster$Model = F3(
	function (a, b, c) {
		return {level: a, css: b, name: c};
	});
var _mordrax$cotwelm$Monster_Monster$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Monster_Monster$new = F3(
	function (monsterType, pos, id) {
		var newSpellcaster = F5(
			function ($class, css, name, hp, sp) {
				return A4(
					_mordrax$cotwelm$Monster_Monster$Monster,
					_mordrax$cotwelm$Monster_Monster$A(
						A3(_mordrax$cotwelm$Monster_Monster$Model, $class, css, name)),
					pos,
					A2(_mordrax$cotwelm$Stats$new, hp, sp),
					id);
			});
		var newMonster = F4(
			function ($class, css, name, hp) {
				return A5(newSpellcaster, $class, css, name, hp, 0);
			});
		var _p6 = monsterType;
		switch (_p6.ctor) {
			case 'GiantRat':
				return A4(newMonster, 1, 'giantRat', 'Giant Rat', 2);
			case 'Goblin':
				return A4(newMonster, 1, 'goblin', 'Goblin', 1);
			case 'GiantBat':
				return A4(newMonster, 2, 'giantBat', 'Giant Bat', 1);
			case 'Hobgoblin':
				return A4(newMonster, 2, 'hobgoblin', 'Hobgoblin', 1);
			case 'Kobold':
				return A4(newMonster, 2, 'kobold', 'Kobold', 1);
			case 'LargeSnake':
				return A4(newMonster, 3, 'largeSnake', 'Large Snake', 1);
			case 'Skeleton':
				return A4(newMonster, 3, 'skeleton', 'Skeleton', 1);
			case 'WildDog':
				return A4(newMonster, 3, 'wildDog', 'Wild Dog', 1);
			case 'Viper':
				return A4(newMonster, 5, 'viper', 'Viper', 1);
			case 'GoblinFighter':
				return A4(newMonster, 6, 'goblinFighter', 'Goblin Fighter', 1);
			case 'GiantRedAnt':
				return A4(newMonster, 7, 'giantRedAnt', 'Giant Red Ant', 1);
			case 'WalkingCorpse':
				return A4(newMonster, 7, 'walkingCorpse', 'Walking Corpse', 1);
			case 'Bandit':
				return A4(newMonster, 10, 'bandit', 'Bandit', 1);
			case 'GiantTrapdoorSpider':
				return A4(newMonster, 10, 'giantTrapdoorSpider', 'Giant Trapdoor Spider', 1);
			case 'HugeLizard':
				return A4(newMonster, 10, 'hugeLizard', 'Huge Lizard', 1);
			case 'RatMan':
				return A4(newMonster, 10, 'rat', 'Rat-Man', 1);
			case 'Slime':
				return A4(newMonster, 10, 'slime', 'Slime', 1);
			case 'GiantScorpion':
				return A4(newMonster, 11, 'giantScorpion', 'Giant Scorpion', 1);
			case 'GrayWolf':
				return A4(newMonster, 11, 'grayWolf', 'Gray Wolf', 1);
			case 'GelantinousGlob':
				return A4(newMonster, 14, 'gelantinousGlob', 'Gelantinous Glob', 1);
			case 'SmirkingSneakThief':
				return A4(newMonster, 15, 'smirkingSneakThief', 'Smirking Sneak Thief', 1);
			case 'CarrionCreeper':
				return A4(newMonster, 16, 'carrionCreeper', 'Carrion Creeper', 1);
			case 'HugeOgre':
				return A4(newMonster, 16, 'hugeOgre', 'Huge Ogre', 1);
			case 'Shadow':
				return A4(newMonster, 16, 'shadow', 'Shadow', 1);
			case 'AnimatedWoodenStatue':
				return A4(newMonster, 17, 'animatedWoodenStatue', 'Animated Wooden Statue', 1);
			case 'BrownBear':
				return A4(newMonster, 17, 'brownBear', 'Brown Bear', 1);
			case 'YoungGreenDragon':
				return A4(newMonster, 18, 'youngGreenDragon', 'Young Green Dragon', 1);
			case 'YoungWhiteDragon':
				return A4(newMonster, 18, 'youngWhiteDragon', 'Young White Dragon', 1);
			case 'Manticore':
				return A4(newMonster, 19, 'manticore', 'Manticore', 1);
			case 'EerieGhost':
				return A4(newMonster, 20, 'eerieGhost', 'Eerie Ghost', 1);
			case 'GruesomeTroll':
				return A4(newMonster, 20, 'gruesomeTroll', 'Gruesome Troll', 1);
			case 'YoungBlueDragon':
				return A4(newMonster, 20, 'youngBlueDragon', 'Young Blue Dragon', 1);
			case 'YoungRedDragon':
				return A4(newMonster, 20, 'youngRedDragon', 'Young Red Dragon', 1);
			case 'AnimatedBronzeStatue':
				return A4(newMonster, 25, 'animatedBronzeStatue', 'Animated Bronze Statue', 1);
			case 'EvilWarrior':
				return A4(newMonster, 25, 'evilWarrior', 'Evil Warrior', 1);
			case 'WolfMan':
				return A4(newMonster, 25, 'wolf', 'Wolf-Man', 1);
			case 'CaveBear':
				return A4(newMonster, 27, 'caveBear', 'Cave Bear', 1);
			case 'WhiteWolf':
				return A4(newMonster, 28, 'whiteWolf', 'White Wolf', 1);
			case 'Berserker':
				return A4(newMonster, 30, 'berserker', 'Berserker', 1);
			case 'AnimatedIronStatue':
				return A4(newMonster, 35, 'animatedIronStatue', 'Animated Iron Statue', 1);
			case 'TunnelWight':
				return A4(newMonster, 35, 'tunnelWight', 'Tunnel Wight', 1);
			case 'YoungAdultBlueDragon':
				return A4(newMonster, 35, 'youngAdultBlueDragon', 'Young Adult Blue Dragon', 1);
			case 'YoungAdultGreenDragon':
				return A4(newMonster, 35, 'youngAdultGreenDragon', 'Young Adult Green Dragon', 1);
			case 'YoungAdultWhiteDragon':
				return A4(newMonster, 35, 'youngAdultWhiteDragon', 'Young Adult White Dragon', 1);
			case 'PaleWraith':
				return A4(newMonster, 37, 'paleWraith', 'Pale Wraith', 1);
			case 'BarrowWight':
				return A4(newMonster, 40, 'barrowWight', 'Barrow Wight', 1);
			case 'BearMan':
				return A4(newMonster, 40, 'bear', 'Bear-Man', 1);
			case 'DustElemental':
				return A4(newMonster, 40, 'dustElemental', 'Dust Elemental', 1);
			case 'HillGiant':
				return A4(newMonster, 40, 'hillGiant', 'Hill Giant', 1);
			case 'YoungAdultRedDragon':
				return A4(newMonster, 40, 'youngAdultRedDragon', 'Young Adult Red Dragon', 1);
			case 'Wizard':
				return A4(newMonster, 45, 'wizard', 'Wizard', 1);
			case 'BullMan':
				return A4(newMonster, 50, 'bull', 'Bull-Man', 1);
			case 'CastleWight':
				return A4(newMonster, 50, 'castleWight', 'Castle Wight', 1);
			case 'DarkWraith':
				return A4(newMonster, 50, 'darkWraith', 'Dark Wraith', 1);
			case 'IceElemental':
				return A4(newMonster, 50, 'iceElemental', 'Ice Elemental', 1);
			case 'Spectre':
				return A4(newMonster, 50, 'spectre', 'Spectre', 1);
			case 'AnimatedMarbleStatue':
				return A4(newMonster, 52, 'animatedMarbleStatue', 'Animated Marble Statue', 1);
			case 'AdultBlueDragon':
				return A4(newMonster, 55, 'adultBlueDragon', 'Adult Blue Dragon', 1);
			case 'AdultGreenDragon':
				return A4(newMonster, 55, 'adultGreenDragon', 'Adult Green Dragon', 1);
			case 'AdultWhiteDragon':
				return A4(newMonster, 55, 'adultWhiteDragon', 'Adult White Dragon', 1);
			case 'AirElemental':
				return A4(newMonster, 55, 'airElemental', 'Air Elemental', 1);
			case 'MagmaElemental':
				return A4(newMonster, 55, 'magmaElemental', 'Magma Elemental', 1);
			case 'StoneGiant':
				return A4(newMonster, 55, 'stoneGiant', 'Stone Giant', 1);
			case 'TwoHeadedGiant':
				return A4(newMonster, 55, 'twoHeadedGiant', 'Two Headed Giant', 1);
			case 'AdultRedDragon':
				return A4(newMonster, 60, 'adultRedDragon', 'Adult Red Dragon', 1);
			case 'FireElemental':
				return A4(newMonster, 60, 'fireElemental', 'Fire Elemental', 1);
			case 'FrostGiant':
				return A4(newMonster, 60, 'frostGiant', 'Frost Giant', 1);
			case 'SpikedDevil':
				return A4(newMonster, 60, 'spikedDevil', 'Spiked Devil', 1);
			case 'WaterElemental':
				return A4(newMonster, 60, 'waterElemental', 'Water Elemental', 1);
			case 'EarthElemental':
				return A4(newMonster, 65, 'earthElemental', 'Earth Elemental', 1);
			case 'Necromancer':
				return A4(newMonster, 65, 'necromancer', 'Necromancer', 1);
			case 'Vampire':
				return A4(newMonster, 65, 'vampire', 'Vampire', 1);
			case 'AbyssWraith':
				return A4(newMonster, 70, 'abyssWraith', 'Abyss Wraith', 1);
			case 'Utgardhalok':
				return A4(newMonster, 70, 'utgardhalok', 'Utgardhalok', 1);
			case 'FireGiant':
				return A4(newMonster, 75, 'fireGiant', 'Fire Giant', 1);
			case 'OldBlueDragon':
				return A4(newMonster, 75, 'oldBlueDragon', 'Old Blue Dragon', 1);
			case 'OldGreenDragon':
				return A4(newMonster, 75, 'oldGreenDragon', 'Old Green Dragon', 1);
			case 'OldWhiteDragon':
				return A4(newMonster, 75, 'oldWhiteDragon', 'Old White Dragon', 1);
			case 'HornedDevil':
				return A4(newMonster, 80, 'hornedDevil', 'Horned Devil', 1);
			case 'OldRedDragon':
				return A4(newMonster, 80, 'oldRedDragon', 'Old Red Dragon', 1);
			case 'Rungnir':
				return A4(newMonster, 80, 'rungnir', 'Rungnir', 1);
			case 'IceDevil':
				return A4(newMonster, 85, 'iceDevil', 'Ice Devil', 1);
			case 'Thrym':
				return A4(newMonster, 90, 'thrym', 'Thrym', 1);
			case 'VeryOldGreenDragon':
				return A4(newMonster, 90, 'veryOldGreenDragon', 'Very Old Green Dragon', 1);
			case 'VeryOldWhiteDragon':
				return A4(newMonster, 90, 'veryOldWhiteDragon', 'Very Old White Dragon', 1);
			case 'VeryOldBlueDragon':
				return A4(newMonster, 95, 'veryOldBlueDragon', 'Very Old Blue Dragon', 1);
			case 'AbyssFiend':
				return A4(newMonster, 100, 'abyssFiend', 'Abyss Fiend', 1);
			case 'Thiassa':
				return A4(newMonster, 100, 'thiassa', 'Thiassa', 1);
			case 'VeryOldRedDragon':
				return A4(newMonster, 100, 'veryOldRedDragon', 'Very Old Red Dragon', 1);
			case 'AncientGreenDragon':
				return A4(newMonster, 105, 'ancientGreenDragon', 'Ancient Green Dragon', 1);
			case 'AncientWhiteDragon':
				return A4(newMonster, 105, 'ancientWhiteDragon', 'Ancient White Dragon', 1);
			case 'AncientBlueDragon':
				return A4(newMonster, 110, 'ancientBlueDragon', 'Ancient Blue Dragon', 1);
			case 'AncientRedDragon':
				return A4(newMonster, 120, 'ancientRedDragon', 'Ancient Red Dragon', 1);
			default:
				return A4(newMonster, 344, 'sultur', 'Sultur', 1);
		}
	});
var _mordrax$cotwelm$Monster_Monster$Sultur = {ctor: 'Sultur'};
var _mordrax$cotwelm$Monster_Monster$AncientRedDragon = {ctor: 'AncientRedDragon'};
var _mordrax$cotwelm$Monster_Monster$AncientBlueDragon = {ctor: 'AncientBlueDragon'};
var _mordrax$cotwelm$Monster_Monster$AncientWhiteDragon = {ctor: 'AncientWhiteDragon'};
var _mordrax$cotwelm$Monster_Monster$AncientGreenDragon = {ctor: 'AncientGreenDragon'};
var _mordrax$cotwelm$Monster_Monster$VeryOldRedDragon = {ctor: 'VeryOldRedDragon'};
var _mordrax$cotwelm$Monster_Monster$Thiassa = {ctor: 'Thiassa'};
var _mordrax$cotwelm$Monster_Monster$AbyssFiend = {ctor: 'AbyssFiend'};
var _mordrax$cotwelm$Monster_Monster$VeryOldBlueDragon = {ctor: 'VeryOldBlueDragon'};
var _mordrax$cotwelm$Monster_Monster$VeryOldWhiteDragon = {ctor: 'VeryOldWhiteDragon'};
var _mordrax$cotwelm$Monster_Monster$VeryOldGreenDragon = {ctor: 'VeryOldGreenDragon'};
var _mordrax$cotwelm$Monster_Monster$Thrym = {ctor: 'Thrym'};
var _mordrax$cotwelm$Monster_Monster$IceDevil = {ctor: 'IceDevil'};
var _mordrax$cotwelm$Monster_Monster$Rungnir = {ctor: 'Rungnir'};
var _mordrax$cotwelm$Monster_Monster$OldRedDragon = {ctor: 'OldRedDragon'};
var _mordrax$cotwelm$Monster_Monster$HornedDevil = {ctor: 'HornedDevil'};
var _mordrax$cotwelm$Monster_Monster$OldWhiteDragon = {ctor: 'OldWhiteDragon'};
var _mordrax$cotwelm$Monster_Monster$OldGreenDragon = {ctor: 'OldGreenDragon'};
var _mordrax$cotwelm$Monster_Monster$OldBlueDragon = {ctor: 'OldBlueDragon'};
var _mordrax$cotwelm$Monster_Monster$FireGiant = {ctor: 'FireGiant'};
var _mordrax$cotwelm$Monster_Monster$Utgardhalok = {ctor: 'Utgardhalok'};
var _mordrax$cotwelm$Monster_Monster$AbyssWraith = {ctor: 'AbyssWraith'};
var _mordrax$cotwelm$Monster_Monster$Vampire = {ctor: 'Vampire'};
var _mordrax$cotwelm$Monster_Monster$Necromancer = {ctor: 'Necromancer'};
var _mordrax$cotwelm$Monster_Monster$EarthElemental = {ctor: 'EarthElemental'};
var _mordrax$cotwelm$Monster_Monster$WaterElemental = {ctor: 'WaterElemental'};
var _mordrax$cotwelm$Monster_Monster$SpikedDevil = {ctor: 'SpikedDevil'};
var _mordrax$cotwelm$Monster_Monster$FrostGiant = {ctor: 'FrostGiant'};
var _mordrax$cotwelm$Monster_Monster$FireElemental = {ctor: 'FireElemental'};
var _mordrax$cotwelm$Monster_Monster$AdultRedDragon = {ctor: 'AdultRedDragon'};
var _mordrax$cotwelm$Monster_Monster$TwoHeadedGiant = {ctor: 'TwoHeadedGiant'};
var _mordrax$cotwelm$Monster_Monster$StoneGiant = {ctor: 'StoneGiant'};
var _mordrax$cotwelm$Monster_Monster$MagmaElemental = {ctor: 'MagmaElemental'};
var _mordrax$cotwelm$Monster_Monster$AirElemental = {ctor: 'AirElemental'};
var _mordrax$cotwelm$Monster_Monster$AdultWhiteDragon = {ctor: 'AdultWhiteDragon'};
var _mordrax$cotwelm$Monster_Monster$AdultGreenDragon = {ctor: 'AdultGreenDragon'};
var _mordrax$cotwelm$Monster_Monster$AdultBlueDragon = {ctor: 'AdultBlueDragon'};
var _mordrax$cotwelm$Monster_Monster$AnimatedMarbleStatue = {ctor: 'AnimatedMarbleStatue'};
var _mordrax$cotwelm$Monster_Monster$Spectre = {ctor: 'Spectre'};
var _mordrax$cotwelm$Monster_Monster$IceElemental = {ctor: 'IceElemental'};
var _mordrax$cotwelm$Monster_Monster$DarkWraith = {ctor: 'DarkWraith'};
var _mordrax$cotwelm$Monster_Monster$CastleWight = {ctor: 'CastleWight'};
var _mordrax$cotwelm$Monster_Monster$BullMan = {ctor: 'BullMan'};
var _mordrax$cotwelm$Monster_Monster$Wizard = {ctor: 'Wizard'};
var _mordrax$cotwelm$Monster_Monster$YoungAdultRedDragon = {ctor: 'YoungAdultRedDragon'};
var _mordrax$cotwelm$Monster_Monster$HillGiant = {ctor: 'HillGiant'};
var _mordrax$cotwelm$Monster_Monster$DustElemental = {ctor: 'DustElemental'};
var _mordrax$cotwelm$Monster_Monster$BearMan = {ctor: 'BearMan'};
var _mordrax$cotwelm$Monster_Monster$BarrowWight = {ctor: 'BarrowWight'};
var _mordrax$cotwelm$Monster_Monster$PaleWraith = {ctor: 'PaleWraith'};
var _mordrax$cotwelm$Monster_Monster$YoungAdultWhiteDragon = {ctor: 'YoungAdultWhiteDragon'};
var _mordrax$cotwelm$Monster_Monster$YoungAdultGreenDragon = {ctor: 'YoungAdultGreenDragon'};
var _mordrax$cotwelm$Monster_Monster$YoungAdultBlueDragon = {ctor: 'YoungAdultBlueDragon'};
var _mordrax$cotwelm$Monster_Monster$TunnelWight = {ctor: 'TunnelWight'};
var _mordrax$cotwelm$Monster_Monster$AnimatedIronStatue = {ctor: 'AnimatedIronStatue'};
var _mordrax$cotwelm$Monster_Monster$Berserker = {ctor: 'Berserker'};
var _mordrax$cotwelm$Monster_Monster$WhiteWolf = {ctor: 'WhiteWolf'};
var _mordrax$cotwelm$Monster_Monster$CaveBear = {ctor: 'CaveBear'};
var _mordrax$cotwelm$Monster_Monster$WolfMan = {ctor: 'WolfMan'};
var _mordrax$cotwelm$Monster_Monster$EvilWarrior = {ctor: 'EvilWarrior'};
var _mordrax$cotwelm$Monster_Monster$AnimatedBronzeStatue = {ctor: 'AnimatedBronzeStatue'};
var _mordrax$cotwelm$Monster_Monster$YoungRedDragon = {ctor: 'YoungRedDragon'};
var _mordrax$cotwelm$Monster_Monster$YoungBlueDragon = {ctor: 'YoungBlueDragon'};
var _mordrax$cotwelm$Monster_Monster$GruesomeTroll = {ctor: 'GruesomeTroll'};
var _mordrax$cotwelm$Monster_Monster$EerieGhost = {ctor: 'EerieGhost'};
var _mordrax$cotwelm$Monster_Monster$Manticore = {ctor: 'Manticore'};
var _mordrax$cotwelm$Monster_Monster$YoungWhiteDragon = {ctor: 'YoungWhiteDragon'};
var _mordrax$cotwelm$Monster_Monster$YoungGreenDragon = {ctor: 'YoungGreenDragon'};
var _mordrax$cotwelm$Monster_Monster$BrownBear = {ctor: 'BrownBear'};
var _mordrax$cotwelm$Monster_Monster$AnimatedWoodenStatue = {ctor: 'AnimatedWoodenStatue'};
var _mordrax$cotwelm$Monster_Monster$Shadow = {ctor: 'Shadow'};
var _mordrax$cotwelm$Monster_Monster$HugeOgre = {ctor: 'HugeOgre'};
var _mordrax$cotwelm$Monster_Monster$CarrionCreeper = {ctor: 'CarrionCreeper'};
var _mordrax$cotwelm$Monster_Monster$SmirkingSneakThief = {ctor: 'SmirkingSneakThief'};
var _mordrax$cotwelm$Monster_Monster$GelantinousGlob = {ctor: 'GelantinousGlob'};
var _mordrax$cotwelm$Monster_Monster$GrayWolf = {ctor: 'GrayWolf'};
var _mordrax$cotwelm$Monster_Monster$GiantScorpion = {ctor: 'GiantScorpion'};
var _mordrax$cotwelm$Monster_Monster$Slime = {ctor: 'Slime'};
var _mordrax$cotwelm$Monster_Monster$RatMan = {ctor: 'RatMan'};
var _mordrax$cotwelm$Monster_Monster$HugeLizard = {ctor: 'HugeLizard'};
var _mordrax$cotwelm$Monster_Monster$GiantTrapdoorSpider = {ctor: 'GiantTrapdoorSpider'};
var _mordrax$cotwelm$Monster_Monster$Bandit = {ctor: 'Bandit'};
var _mordrax$cotwelm$Monster_Monster$WalkingCorpse = {ctor: 'WalkingCorpse'};
var _mordrax$cotwelm$Monster_Monster$GiantRedAnt = {ctor: 'GiantRedAnt'};
var _mordrax$cotwelm$Monster_Monster$GoblinFighter = {ctor: 'GoblinFighter'};
var _mordrax$cotwelm$Monster_Monster$Viper = {ctor: 'Viper'};
var _mordrax$cotwelm$Monster_Monster$WildDog = {ctor: 'WildDog'};
var _mordrax$cotwelm$Monster_Monster$Skeleton = {ctor: 'Skeleton'};
var _mordrax$cotwelm$Monster_Monster$LargeSnake = {ctor: 'LargeSnake'};
var _mordrax$cotwelm$Monster_Monster$Kobold = {ctor: 'Kobold'};
var _mordrax$cotwelm$Monster_Monster$Hobgoblin = {ctor: 'Hobgoblin'};
var _mordrax$cotwelm$Monster_Monster$GiantBat = {ctor: 'GiantBat'};
var _mordrax$cotwelm$Monster_Monster$Goblin = {ctor: 'Goblin'};
var _mordrax$cotwelm$Monster_Monster$GiantRat = {ctor: 'GiantRat'};

var _mordrax$cotwelm$Tile$tileToHtml = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1.base;
	var model = _p2._0;
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'tile ',
					_elm_lang$core$Basics$toString(model.tile))),
				_mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(_p1.position)
			]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _mordrax$cotwelm$Tile$isSolid = function (_p3) {
	var _p4 = _p3;
	var _p5 = _p4.base;
	var solid = _p5._0.solid;
	return solid;
};
var _mordrax$cotwelm$Tile$Model = F4(
	function (a, b, c, d) {
		return {tile: a, solid: b, items: c, occupant: d};
	});
var _mordrax$cotwelm$Tile$Tile = F2(
	function (a, b) {
		return {base: a, position: b};
	});
var _mordrax$cotwelm$Tile$Empty = {ctor: 'Empty'};
var _mordrax$cotwelm$Tile$M = function (a) {
	return {ctor: 'M', _0: a};
};
var _mordrax$cotwelm$Tile$H = function (a) {
	return {ctor: 'H', _0: a};
};
var _mordrax$cotwelm$Tile$B = function (a) {
	return {ctor: 'B', _0: a};
};
var _mordrax$cotwelm$Tile$Base = function (a) {
	return {ctor: 'Base', _0: a};
};
var _mordrax$cotwelm$Tile$TreasurePile = {ctor: 'TreasurePile'};
var _mordrax$cotwelm$Tile$Well = {ctor: 'Well'};
var _mordrax$cotwelm$Tile$Crop = {ctor: 'Crop'};
var _mordrax$cotwelm$Tile$White90Cave10 = {ctor: 'White90Cave10'};
var _mordrax$cotwelm$Tile$White50Cave50 = {ctor: 'White50Cave50'};
var _mordrax$cotwelm$Tile$Grass10Cave90 = {ctor: 'Grass10Cave90'};
var _mordrax$cotwelm$Tile$Grass50Cave50 = {ctor: 'Grass50Cave50'};
var _mordrax$cotwelm$Tile$WallLitDgn = {ctor: 'WallLitDgn'};
var _mordrax$cotwelm$Tile$WaterPath = {ctor: 'WaterPath'};
var _mordrax$cotwelm$Tile$WaterGrass = {ctor: 'WaterGrass'};
var _mordrax$cotwelm$Tile$WallDarkDgn = {ctor: 'WallDarkDgn'};
var _mordrax$cotwelm$Tile$PathGrass = {ctor: 'PathGrass'};
var _mordrax$cotwelm$Tile$PathRock = {ctor: 'PathRock'};
var _mordrax$cotwelm$Tile$LitDgn = {ctor: 'LitDgn'};
var _mordrax$cotwelm$Tile$Path = {ctor: 'Path'};
var _mordrax$cotwelm$Tile$Water = {ctor: 'Water'};
var _mordrax$cotwelm$Tile$DarkDgn = {ctor: 'DarkDgn'};
var _mordrax$cotwelm$Tile$Grass = {ctor: 'Grass'};
var _mordrax$cotwelm$Tile$Rock = {ctor: 'Rock'};
var _mordrax$cotwelm$Tile$asciiTileData = function ($char) {
	var _p6 = $char;
	switch (_p6.valueOf()) {
		case '^':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Rock, _1: true};
		case ',':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Grass, _1: false};
		case 'o':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$DarkDgn, _1: false};
		case '~':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Water, _1: false};
		case '.':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Path, _1: false};
		case 'O':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$LitDgn, _1: false};
		case '_':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$PathRock, _1: false};
		case ';':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$PathGrass, _1: false};
		case 'd':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WallDarkDgn, _1: false};
		case 'w':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WaterGrass, _1: false};
		case 'W':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WaterPath, _1: false};
		case 'D':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WallLitDgn, _1: false};
		case 'g':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Grass50Cave50, _1: false};
		case 'G':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Grass10Cave90, _1: true};
		case 'c':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$White50Cave50, _1: true};
		case 'C':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$White90Cave10, _1: false};
		case '=':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Crop, _1: true};
		case 'e':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Well, _1: true};
		default:
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Grass, _1: false};
	}
};
var _mordrax$cotwelm$Tile$toTile = F3(
	function (y, x, asciiTile) {
		var _p7 = _mordrax$cotwelm$Tile$asciiTileData(asciiTile);
		var tileType = _p7._0;
		var solid = _p7._1;
		var pos = {x: x, y: y};
		return A2(
			_mordrax$cotwelm$Tile$Tile,
			_mordrax$cotwelm$Tile$Base(
				A4(
					_mordrax$cotwelm$Tile$Model,
					tileType,
					solid,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_mordrax$cotwelm$Tile$Empty)),
			pos);
	});
var _mordrax$cotwelm$Tile$toTiles = F2(
	function (y, asciiTiles) {
		return A2(
			_elm_lang$core$List$indexedMap,
			_mordrax$cotwelm$Tile$toTile(y),
			asciiTiles);
	});
var _mordrax$cotwelm$Tile$mapOneRowToTiles = F2(
	function (y, asciiRow) {
		var asciiChars = _elm_lang$core$String$toList(asciiRow);
		return A2(_mordrax$cotwelm$Tile$toTiles, y, asciiChars);
	});
var _mordrax$cotwelm$Tile$mapToTiles = function (asciiMap) {
	var tiles = A2(_elm_lang$core$List$indexedMap, _mordrax$cotwelm$Tile$mapOneRowToTiles, asciiMap);
	return _elm_lang$core$List$concat(tiles);
};

var _mordrax$cotwelm$Game_Maps$dungeonLevelOneBuildings = function () {
	var mineEntrance = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$Farm,
		A2(_mordrax$cotwelm$Utils_Vector$new, 24, 2));
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$MineEntrance,
			A2(_mordrax$cotwelm$Utils_Vector$new, 22, 40),
			'Mine Exit',
			mineEntrance)
		]);
}();
var _mordrax$cotwelm$Game_Maps$farmBuildings = function () {
	var mineExit = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$DungeonLevelOne,
		A2(_mordrax$cotwelm$Utils_Vector$new, 22, 39));
	var villageGate = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$Village,
		A2(_mordrax$cotwelm$Utils_Vector$new, 11, 1));
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$Gate_NS,
			A2(_mordrax$cotwelm$Utils_Vector$new, 10, 32),
			'Farm Gate',
			villageGate),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 43, 23),
			'Adopted Parents House',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$MineEntrance,
			A2(_mordrax$cotwelm$Utils_Vector$new, 24, 1),
			'Mine Entrance',
			mineExit)
		]);
}();
var _mordrax$cotwelm$Game_Maps$villageBuildings = function () {
	var farmGate = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$Farm,
		A2(_mordrax$cotwelm$Utils_Vector$new, 11, 31));
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$Gate_NS,
			A2(_mordrax$cotwelm$Utils_Vector$new, 10, 0),
			'Village Gate',
			farmGate),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_EF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 3, 6),
			'Junk Shop',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 16, 5),
			'Private House',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$Hut_EF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 7, 13),
			'Potion Store',
			_mordrax$cotwelm$GameData_Building$ShopType(_mordrax$cotwelm$GameData_Building$PotionStore)),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 14, 12),
			'Private House 2',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_EF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 6, 17),
			'Weapon Shop',
			_mordrax$cotwelm$GameData_Building$ShopType(_mordrax$cotwelm$GameData_Building$WeaponSmith)),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 14, 17),
			'General Store',
			_mordrax$cotwelm$GameData_Building$ShopType(_mordrax$cotwelm$GameData_Building$GeneralStore)),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$HutTemple_NF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 9, 22),
			'Odin\'s Temple',
			_mordrax$cotwelm$GameData_Building$Ordinary)
		]);
}();
var _mordrax$cotwelm$Game_Maps$getASCIIMap = function (area) {
	var _p0 = area;
	switch (_p0.ctor) {
		case 'Village':
			return _mordrax$cotwelm$GameData_ASCIIMaps$villageMap;
		case 'Farm':
			return _mordrax$cotwelm$GameData_ASCIIMaps$farmMap;
		case 'DungeonLevelOne':
			return _mordrax$cotwelm$GameData_ASCIIMaps$dungeonLevelOneMap;
		default:
			return _elm_lang$core$Native_List.fromArray(
				[]);
	}
};
var _mordrax$cotwelm$Game_Maps$getBuildings = function (_p1) {
	var _p2 = _p1;
	var _p4 = _p2._0;
	var maybeBuildings = A2(
		_elm_lang$core$Dict$get,
		_elm_lang$core$Basics$toString(_p4.currentArea),
		_p4.buildings);
	var _p3 = maybeBuildings;
	if (_p3.ctor === 'Just') {
		return _p3._0;
	} else {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	}
};
var _mordrax$cotwelm$Game_Maps$getMap = function (_p5) {
	var _p6 = _p5;
	var _p8 = _p6._0;
	var maybeMap = A2(
		_elm_lang$core$Dict$get,
		_elm_lang$core$Basics$toString(_p8.currentArea),
		_p8.maps);
	var _p7 = maybeMap;
	if (_p7.ctor === 'Just') {
		return _p7._0;
	} else {
		return _elm_lang$core$Dict$empty;
	}
};
var _mordrax$cotwelm$Game_Maps$Model = F3(
	function (a, b, c) {
		return {currentArea: a, maps: b, buildings: c};
	});
var _mordrax$cotwelm$Game_Maps$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Game_Maps$init = function () {
	var toKVPair = function (tile) {
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Basics$toString(tile.position),
			_1: tile
		};
	};
	var getTiles = function (area) {
		return _mordrax$cotwelm$Tile$mapToTiles(
			_mordrax$cotwelm$Game_Maps$getASCIIMap(area));
	};
	var tilesToTuples = function (area) {
		return A2(
			_elm_lang$core$List$map,
			toKVPair,
			getTiles(area));
	};
	return _mordrax$cotwelm$Game_Maps$A(
		{
			currentArea: _mordrax$cotwelm$GameData_Types$Village,
			maps: _elm_lang$core$Dict$fromList(
				_elm_lang$core$Native_List.fromArray(
					[
						{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toString(_mordrax$cotwelm$GameData_Types$Village),
						_1: _elm_lang$core$Dict$fromList(
							tilesToTuples(_mordrax$cotwelm$GameData_Types$Village))
					},
						{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toString(_mordrax$cotwelm$GameData_Types$Farm),
						_1: _elm_lang$core$Dict$fromList(
							tilesToTuples(_mordrax$cotwelm$GameData_Types$Farm))
					},
						{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toString(_mordrax$cotwelm$GameData_Types$DungeonLevelOne),
						_1: _elm_lang$core$Dict$fromList(
							tilesToTuples(_mordrax$cotwelm$GameData_Types$DungeonLevelOne))
					}
					])),
			buildings: _elm_lang$core$Dict$fromList(
				_elm_lang$core$Native_List.fromArray(
					[
						{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toString(_mordrax$cotwelm$GameData_Types$Village),
						_1: _mordrax$cotwelm$Game_Maps$villageBuildings
					},
						{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toString(_mordrax$cotwelm$GameData_Types$Farm),
						_1: _mordrax$cotwelm$Game_Maps$farmBuildings
					},
						{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toString(_mordrax$cotwelm$GameData_Types$DungeonLevelOne),
						_1: _mordrax$cotwelm$Game_Maps$dungeonLevelOneBuildings
					}
					]))
		});
}();
var _mordrax$cotwelm$Game_Maps$updateArea = F2(
	function (area, _p9) {
		var _p10 = _p9;
		return _mordrax$cotwelm$Game_Maps$A(
			_elm_lang$core$Native_Utils.update(
				_p10._0,
				{currentArea: area}));
	});
var _mordrax$cotwelm$Game_Maps$mapToHtml = F2(
	function (area, _p11) {
		var _p12 = _p11;
		var _p13 = _p12._0;
		var buildingsHtml = A2(
			_elm_lang$core$List$map,
			_mordrax$cotwelm$GameData_Building$view,
			_mordrax$cotwelm$Game_Maps$getBuildings(
				_mordrax$cotwelm$Game_Maps$A(_p13)));
		var listOfTiles = A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Basics$snd,
			_elm_lang$core$Dict$toList(
				_mordrax$cotwelm$Game_Maps$getMap(
					_mordrax$cotwelm$Game_Maps$A(_p13))));
		var tilesHtml = A2(_elm_lang$core$List$map, _mordrax$cotwelm$Tile$tileToHtml, listOfTiles);
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			A2(_elm_lang$core$Basics_ops['++'], tilesHtml, buildingsHtml));
	});
var _mordrax$cotwelm$Game_Maps$view = function (_p14) {
	var _p15 = _p14;
	var _p16 = _p15._0;
	return A2(
		_mordrax$cotwelm$Game_Maps$mapToHtml,
		_p16.currentArea,
		_mordrax$cotwelm$Game_Maps$A(_p16));
};

var _mordrax$cotwelm$Shop_Shop$shield = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$BrokenShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$SmallWoodenShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$MediumWoodenShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$LargeWoodenShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$SmallIronShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$MediumIronShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$LargeIronShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$SmallSteelShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$MediumSteelShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$LargeSteelShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$SmallMeteoricSteelShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$MediumMeteoricSteelShield)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$LargeMeteoricSteelShield))
	]);
var _mordrax$cotwelm$Shop_Shop$pack = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$SmallBag)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$MediumBag)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$LargeBag)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$SmallPack)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$MediumPack)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$LargePack)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$SmallChest)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$MediumChest)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$LargeChest)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$EnchantedSmallPackOfHolding)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$EnchantedMediumPackOfHolding)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$EnchantedLargePackOfHolding))
	]);
var _mordrax$cotwelm$Shop_Shop$helmet = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$BrokenHelmet)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$LeatherHelmet)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$IronHelmet)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$SteelHelmet)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$MeteoricSteelHelmet)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$HelmetOfDetectMonsters))
	]);
var _mordrax$cotwelm$Shop_Shop$gauntlets = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Gauntlets(_mordrax$cotwelm$Item_TypeDef$NormalGauntlets))
	]);
var _mordrax$cotwelm$Shop_Shop$bracers = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Bracers(_mordrax$cotwelm$Item_TypeDef$NormalBracers))
	]);
var _mordrax$cotwelm$Shop_Shop$belt = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Belt(_mordrax$cotwelm$Item_TypeDef$TwoSlotBelt)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Belt(_mordrax$cotwelm$Item_TypeDef$ThreeSlotBelt)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Belt(_mordrax$cotwelm$Item_TypeDef$FourSlotBelt)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Belt(_mordrax$cotwelm$Item_TypeDef$UtilityBelt)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Belt(_mordrax$cotwelm$Item_TypeDef$WandQuiverBelt))
	]);
var _mordrax$cotwelm$Shop_Shop$armour = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$RustyArmour)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$LeatherArmour)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$StuddedLeatherArmour)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$RingMail)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$ScaleMail)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$ChainMail)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$SplintMail)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$PlateMail)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$PlateArmour)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$MeteoricSteelPlate)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$ElvenChainMail))
	]);
var _mordrax$cotwelm$Shop_Shop$junkShop = _elm_lang$core$Native_List.fromArray(
	[]);
var _mordrax$cotwelm$Shop_Shop$potionStore = _elm_lang$core$Native_List.fromArray(
	[]);
var _mordrax$cotwelm$Shop_Shop$generalStore = _elm_lang$core$List$concat(
	_elm_lang$core$Native_List.fromArray(
		[_mordrax$cotwelm$Shop_Shop$armour, _mordrax$cotwelm$Shop_Shop$gauntlets, _mordrax$cotwelm$Shop_Shop$bracers, _mordrax$cotwelm$Shop_Shop$shield, _mordrax$cotwelm$Shop_Shop$helmet, _mordrax$cotwelm$Shop_Shop$pack, _mordrax$cotwelm$Shop_Shop$belt]));
var _mordrax$cotwelm$Shop_Shop$weaponSmith = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Club)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Dagger)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Hammer)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$HandAxe)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Quarterstaff)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Spear)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$ShortSword)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Mace)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Flail)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Axe)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$WarHammer)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$LongSword)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$BattleAxe)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$BroadSword)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$MorningStar)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$BastardSword)),
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$TwoHandedSword))
	]);
var _mordrax$cotwelm$Shop_Shop$list = function (_p0) {
	var _p1 = _p0;
	var _p3 = _p1._0;
	var _p2 = _p3.currentShop;
	switch (_p2.ctor) {
		case 'WeaponSmith':
			return _p3.weaponSmith;
		case 'GeneralStore':
			return _p3.generalStore;
		case 'PotionStore':
			return _p3.potionStore;
		default:
			return _p3.junkShop;
	}
};
var _mordrax$cotwelm$Shop_Shop$replenish = F3(
	function (itemFactories, idGenerator, seed) {
		var defaultProduct = function (maybe) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				_mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$BrokenSword)),
				maybe);
		};
		var itemGenerator = A2(
			_elm_lang$core$Random$map,
			defaultProduct,
			_elm_community$random_extra$Random_Extra$sample(itemFactories));
		var itemsGenerator = function (n) {
			return A2(_elm_lang$core$Random$list, n, itemGenerator);
		};
		var _p4 = A2(
			_elm_lang$core$Random$step,
			itemsGenerator(10),
			seed);
		var foldableProducts = _p4._0;
		var _p5 = A3(
			_elm_lang$core$List$foldl,
			_mordrax$cotwelm$Utils_IdGenerator$assignId,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: idGenerator
			},
			foldableProducts);
		var products = _p5._0;
		var idGenerator$ = _p5._1;
		return {ctor: '_Tuple2', _0: idGenerator$, _1: products};
	});
var _mordrax$cotwelm$Shop_Shop$removeFrom = F2(
	function (item, model) {
		var equals = _mordrax$cotwelm$Item_Item$equals;
		var removeFromShop = function (shop) {
			return A2(
				_elm_lang$core$List$filter,
				function (x) {
					return _elm_lang$core$Basics$not(
						A2(equals, item, x));
				},
				shop);
		};
		var _p6 = model.currentShop;
		switch (_p6.ctor) {
			case 'WeaponSmith':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						weaponSmith: removeFromShop(model.weaponSmith)
					});
			case 'GeneralStore':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						generalStore: removeFromShop(model.generalStore)
					});
			case 'PotionStore':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						potionStore: removeFromShop(model.potionStore)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						junkShop: removeFromShop(model.junkShop)
					});
		}
	});
var _mordrax$cotwelm$Shop_Shop$addTo = F2(
	function (item, model) {
		var _p7 = model.currentShop;
		switch (_p7.ctor) {
			case 'WeaponSmith':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						weaponSmith: A2(_elm_lang$core$List_ops['::'], item, model.weaponSmith)
					});
			case 'GeneralStore':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						generalStore: A2(_elm_lang$core$List_ops['::'], item, model.generalStore)
					});
			case 'PotionStore':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						potionStore: A2(_elm_lang$core$List_ops['::'], item, model.potionStore)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						junkShop: A2(_elm_lang$core$List_ops['::'], item, model.junkShop)
					});
		}
	});
var _mordrax$cotwelm$Shop_Shop$Model = F5(
	function (a, b, c, d, e) {
		return {currentShop: a, weaponSmith: b, generalStore: c, potionStore: d, junkShop: e};
	});
var _mordrax$cotwelm$Shop_Shop$PopulateShop = function (a) {
	return {ctor: 'PopulateShop', _0: a};
};
var _mordrax$cotwelm$Shop_Shop$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Shop_Shop$getSeed = A3(
	_elm_lang$core$Task$perform,
	function (x) {
		return _mordrax$cotwelm$Shop_Shop$Ok;
	},
	function (a) {
		return _mordrax$cotwelm$Shop_Shop$PopulateShop(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(
					_elm_lang$core$Time$inSeconds(a))));
	},
	_elm_lang$core$Time$now);
var _mordrax$cotwelm$Shop_Shop$SM = function (a) {
	return {ctor: 'SM', _0: a};
};
var _mordrax$cotwelm$Shop_Shop$new = {
	ctor: '_Tuple2',
	_0: _mordrax$cotwelm$Shop_Shop$SM(
		A5(
			_mordrax$cotwelm$Shop_Shop$Model,
			_mordrax$cotwelm$GameData_Building$WeaponSmith,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]))),
	_1: _mordrax$cotwelm$Shop_Shop$getSeed
};
var _mordrax$cotwelm$Shop_Shop$setCurrentShopType = F2(
	function (shopType, _p8) {
		var _p9 = _p8;
		return _mordrax$cotwelm$Shop_Shop$SM(
			_elm_lang$core$Native_Utils.update(
				_p9._0,
				{currentShop: shopType}));
	});
var _mordrax$cotwelm$Shop_Shop$give = F2(
	function (item, _p10) {
		var _p11 = _p10;
		return _mordrax$cotwelm$Shop_Shop$SM(
			A2(_mordrax$cotwelm$Shop_Shop$addTo, item, _p11._0));
	});
var _mordrax$cotwelm$Shop_Shop$sell = F3(
	function (item, purse, _p12) {
		var _p13 = _p12;
		var price = _mordrax$cotwelm$Item_Item$priceOf(item);
		var _p14 = A2(_elm_lang$core$Debug$log, 'Item purchase price:', price);
		var _p15 = A2(_mordrax$cotwelm$Item_Purse$remove, price, purse);
		if (_p15.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				{
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Shop_Shop$SM(
						A2(_mordrax$cotwelm$Shop_Shop$removeFrom, item, _p13._0)),
					_1: _p15._0
				});
		} else {
			return _elm_lang$core$Result$Err('Cannot afford item!');
		}
	});
var _mordrax$cotwelm$Shop_Shop$buy = F3(
	function (item, purse, _p16) {
		var _p17 = _p16;
		var cost = _mordrax$cotwelm$Item_Item$costOf(item);
		var _p18 = A2(_elm_lang$core$Debug$log, 'Item sell price:', cost);
		return {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Shop_Shop$SM(
				A2(_mordrax$cotwelm$Shop_Shop$addTo, item, _p17._0)),
			_1: A2(_mordrax$cotwelm$Item_Purse$add, cost, purse)
		};
	});
var _mordrax$cotwelm$Shop_Shop$update = F3(
	function (msg, generator, _p19) {
		var _p20 = _p19;
		var _p28 = _p20._0;
		var _p21 = msg;
		if (_p21.ctor === 'PopulateShop') {
			var _p26 = _p21._0;
			var _p22 = A3(_mordrax$cotwelm$Shop_Shop$replenish, _mordrax$cotwelm$Shop_Shop$weaponSmith, generator, _p26);
			var generatorWeaponSmith = _p22._0;
			var weaponSmithProducts = _p22._1;
			var _p23 = A3(_mordrax$cotwelm$Shop_Shop$replenish, _mordrax$cotwelm$Shop_Shop$generalStore, generatorWeaponSmith, _p26);
			var generatorGeneralStore = _p23._0;
			var generalStoreProducts = _p23._1;
			var _p24 = A3(_mordrax$cotwelm$Shop_Shop$replenish, _mordrax$cotwelm$Shop_Shop$potionStore, generatorGeneralStore, _p26);
			var generatorPotionStore = _p24._0;
			var potionStoreProducts = _p24._1;
			var _p25 = A3(_mordrax$cotwelm$Shop_Shop$replenish, _mordrax$cotwelm$Shop_Shop$junkShop, generatorPotionStore, _p26);
			var generatorJunkShop = _p25._0;
			var junkShopProducts = _p25._1;
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Shop_Shop$SM(
					_elm_lang$core$Native_Utils.update(
						_p28,
						{weaponSmith: weaponSmithProducts, generalStore: generalStoreProducts, potionStore: potionStoreProducts, junkShop: junkShopProducts})),
				_1: generatorJunkShop
			};
		} else {
			var _p27 = A2(_elm_lang$core$Debug$log, 'Shop.update, unexpected msg', msg);
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Shop_Shop$SM(_p28),
				_1: generator
			};
		}
	});

var _mordrax$cotwelm$Utils_DragDrop$getDisplacement = function (_p0) {
	var _p1 = _p0;
	var _p5 = _p1.position;
	var _p2 = _p1.dragging;
	if (_p2.ctor === 'Nothing') {
		return _p5;
	} else {
		var _p4 = _p2._0.start;
		var _p3 = _p2._0.current;
		return A2(_elm_lang$mouse$Mouse$Position, (_p5.x + _p3.x) - _p4.x, (_p5.y + _p3.y) - _p4.y);
	}
};
var _mordrax$cotwelm$Utils_DragDrop$view = function (_p6) {
	var _p7 = _p6;
	var _p9 = _p7._0;
	var pointerEventStyle = _elm_lang$html$Html_Attributes$style(
		_elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'pointer-events', _1: 'none'}
			]));
	var newPos = _mordrax$cotwelm$Utils_DragDrop$getDisplacement(_p9);
	var px = function (x) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px');
	};
	var positionStyle = _elm_lang$html$Html_Attributes$style(
		_elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple2',
				_0: 'top',
				_1: px(newPos.y)
			},
				{
				ctor: '_Tuple2',
				_0: 'left',
				_1: px(newPos.x)
			},
				{ctor: '_Tuple2', _0: 'position', _1: 'absolute'},
				{ctor: '_Tuple2', _0: 'cursor', _1: 'move'}
			]));
	var _p8 = _p9.dragging;
	if (_p8.ctor === 'Just') {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[positionStyle, pointerEventStyle]),
			_elm_lang$core$Native_List.fromArray(
				[_p8._0.html]));
	} else {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	}
};
var _mordrax$cotwelm$Utils_DragDrop$getDragSourceDropTarget = function (_p10) {
	var _p11 = _p10;
	var _p12 = _p11._0;
	return {ctor: '_Tuple2', _0: _p12.dragSource, _1: _p12.dropTarget};
};
var _mordrax$cotwelm$Utils_DragDrop$Model = F4(
	function (a, b, c, d) {
		return {dragSource: a, dropTarget: b, position: c, dragging: d};
	});
var _mordrax$cotwelm$Utils_DragDrop$Dragging = F3(
	function (a, b, c) {
		return {start: a, current: b, html: c};
	});
var _mordrax$cotwelm$Utils_DragDrop$DragDropModel = function (a) {
	return {ctor: 'DragDropModel', _0: a};
};
var _mordrax$cotwelm$Utils_DragDrop$NoDrag = {ctor: 'NoDrag'};
var _mordrax$cotwelm$Utils_DragDrop$DragSource = function (a) {
	return {ctor: 'DragSource', _0: a};
};
var _mordrax$cotwelm$Utils_DragDrop$NoDrop = {ctor: 'NoDrop'};
var _mordrax$cotwelm$Utils_DragDrop$new = _mordrax$cotwelm$Utils_DragDrop$DragDropModel(
	{
		dragSource: _mordrax$cotwelm$Utils_DragDrop$NoDrag,
		dropTarget: _mordrax$cotwelm$Utils_DragDrop$NoDrop,
		position: A2(_elm_lang$mouse$Mouse$Position, 0, 0),
		dragging: _elm_lang$core$Maybe$Nothing
	});
var _mordrax$cotwelm$Utils_DragDrop$update = F2(
	function (msg, _p13) {
		var _p14 = _p13;
		var _p19 = _p14._0;
		var atDrag = F3(
			function (source, html, pos) {
				return A4(
					_mordrax$cotwelm$Utils_DragDrop$Model,
					source,
					_p19.dropTarget,
					_p19.position,
					A2(
						_elm_lang$core$Maybe$map,
						function (_p15) {
							var _p16 = _p15;
							return A3(_mordrax$cotwelm$Utils_DragDrop$Dragging, _p16.start, pos, html);
						},
						_p19.dragging));
			});
		var startDrag = F3(
			function (source, html, pos) {
				return A4(
					_mordrax$cotwelm$Utils_DragDrop$Model,
					source,
					_p19.dropTarget,
					pos,
					_elm_lang$core$Maybe$Just(
						A3(_mordrax$cotwelm$Utils_DragDrop$Dragging, pos, pos, html)));
			});
		var _p17 = msg;
		switch (_p17.ctor) {
			case 'Start':
				return _mordrax$cotwelm$Utils_DragDrop$DragDropModel(
					A3(startDrag, _p17._0, _p17._1, _p17._2));
			case 'At':
				return _mordrax$cotwelm$Utils_DragDrop$DragDropModel(
					A3(atDrag, _p17._0, _p17._1, _p17._2));
			case 'End':
				return _elm_lang$core$Native_Utils.crashCase(
					'Utils.DragDrop',
					{
						start: {line: 85, column: 9},
						end: {line: 101, column: 62}
					},
					_p17)('This needs to be handled higher up, DragDrop currently does not know how to tell the parent how to handle the End event');
			case 'MouseOver':
				return _mordrax$cotwelm$Utils_DragDrop$DragDropModel(
					_elm_lang$core$Native_Utils.update(
						_p19,
						{dropTarget: _p17._0}));
			default:
				return _mordrax$cotwelm$Utils_DragDrop$DragDropModel(
					_elm_lang$core$Native_Utils.update(
						_p19,
						{dropTarget: _mordrax$cotwelm$Utils_DragDrop$NoDrop}));
		}
	});
var _mordrax$cotwelm$Utils_DragDrop$DropTarget = function (a) {
	return {ctor: 'DropTarget', _0: a};
};
var _mordrax$cotwelm$Utils_DragDrop$MouseLeave = {ctor: 'MouseLeave'};
var _mordrax$cotwelm$Utils_DragDrop$MouseOver = function (a) {
	return {ctor: 'MouseOver', _0: a};
};
var _mordrax$cotwelm$Utils_DragDrop$droppable = F3(
	function (target, _p20, html) {
		var _p21 = _p20;
		var mouseLeaveStyle = _elm_lang$html$Html_Events$onMouseLeave(_mordrax$cotwelm$Utils_DragDrop$MouseLeave);
		var dropTarget = _mordrax$cotwelm$Utils_DragDrop$DropTarget(target);
		var borderStyle = _elm_lang$core$Native_Utils.eq(_p21._0.dropTarget, dropTarget) ? _elm_lang$html$Html_Attributes$style(
			_elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'border', _1: '1px solid'}
				])) : _elm_lang$html$Html_Attributes$style(
			_elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'border', _1: 'none'}
				]));
		var mouseOverStyle = A2(
			_elm_lang$html$Html_Events$on,
			'mouseover',
			_elm_lang$core$Json_Decode$succeed(
				_mordrax$cotwelm$Utils_DragDrop$MouseOver(dropTarget)));
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[mouseOverStyle, mouseLeaveStyle, borderStyle]),
			_elm_lang$core$Native_List.fromArray(
				[html]));
	});
var _mordrax$cotwelm$Utils_DragDrop$End = function (a) {
	return {ctor: 'End', _0: a};
};
var _mordrax$cotwelm$Utils_DragDrop$At = F3(
	function (a, b, c) {
		return {ctor: 'At', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Utils_DragDrop$subscriptions = function (_p22) {
	var _p23 = _p22;
	var _p26 = _p23._0;
	var _p24 = _p26.dragSource;
	if (_p24.ctor === 'NoDrag') {
		return _elm_lang$core$Native_List.fromArray(
			[_elm_lang$core$Platform_Sub$none]);
	} else {
		var _p25 = _p26.dragging;
		if (_p25.ctor === 'Just') {
			return _elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$mouse$Mouse$moves(
					A2(_mordrax$cotwelm$Utils_DragDrop$At, _p24, _p25._0.html)),
					_elm_lang$mouse$Mouse$ups(_mordrax$cotwelm$Utils_DragDrop$End)
				]);
		} else {
			return _elm_lang$core$Native_List.fromArray(
				[_elm_lang$core$Platform_Sub$none]);
		}
	}
};
var _mordrax$cotwelm$Utils_DragDrop$Start = F3(
	function (a, b, c) {
		return {ctor: 'Start', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Utils_DragDrop$draggable = F3(
	function (draggableHtml, source, _p27) {
		var _p28 = _p27;
		var pointerEventStyle = function () {
			var _p29 = _p28._0.dragging;
			if (_p29.ctor === 'Just') {
				return _elm_lang$html$Html_Attributes$style(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'pointer-events', _1: 'none'}
						]));
			} else {
				return _elm_lang$html$Html_Attributes$style(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'pointer-events', _1: 'inherit'}
						]));
			}
		}();
		var dragSource = _mordrax$cotwelm$Utils_DragDrop$DragSource(source);
		var onMouseDown = A3(
			_elm_lang$html$Html_Events$onWithOptions,
			'mousedown',
			{stopPropagation: true, preventDefault: true},
			A2(
				_elm_lang$core$Json_Decode$map,
				A2(_mordrax$cotwelm$Utils_DragDrop$Start, dragSource, draggableHtml),
				_elm_lang$mouse$Mouse$position));
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[onMouseDown, pointerEventStyle]),
			_elm_lang$core$Native_List.fromArray(
				[draggableHtml]));
	});

var _mordrax$cotwelm$Game_Data$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {name: a, hero: b, map: c, currentScreen: d, dnd: e, equipment: f, shop: g, idGen: h, monsters: i, seed: j, windowSize: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _mordrax$cotwelm$Game_Data$DragShop = F2(
	function (a, b) {
		return {ctor: 'DragShop', _0: a, _1: b};
	});
var _mordrax$cotwelm$Game_Data$DragPack = F2(
	function (a, b) {
		return {ctor: 'DragPack', _0: a, _1: b};
	});
var _mordrax$cotwelm$Game_Data$DragSlot = F2(
	function (a, b) {
		return {ctor: 'DragSlot', _0: a, _1: b};
	});
var _mordrax$cotwelm$Game_Data$DropShop = function (a) {
	return {ctor: 'DropShop', _0: a};
};
var _mordrax$cotwelm$Game_Data$DropEquipment = function (a) {
	return {ctor: 'DropEquipment', _0: a};
};
var _mordrax$cotwelm$Game_Data$DropPack = function (a) {
	return {ctor: 'DropPack', _0: a};
};
var _mordrax$cotwelm$Game_Data$BuildingScreen = function (a) {
	return {ctor: 'BuildingScreen', _0: a};
};
var _mordrax$cotwelm$Game_Data$InventoryScreen = {ctor: 'InventoryScreen'};
var _mordrax$cotwelm$Game_Data$MapScreen = {ctor: 'MapScreen'};
var _mordrax$cotwelm$Game_Data$DnDMsg = function (a) {
	return {ctor: 'DnDMsg', _0: a};
};
var _mordrax$cotwelm$Game_Data$InventoryMsg = {ctor: 'InventoryMsg'};

var _mordrax$cotwelm$Game_Keyboard$dirToVector = function (dir) {
	var _p0 = dir;
	switch (_p0.ctor) {
		case 'Up':
			return A2(_mordrax$cotwelm$Utils_Vector$new, 0, -1);
		case 'Down':
			return A2(_mordrax$cotwelm$Utils_Vector$new, 0, 1);
		case 'Left':
			return A2(_mordrax$cotwelm$Utils_Vector$new, -1, 0);
		default:
			return A2(_mordrax$cotwelm$Utils_Vector$new, 1, 0);
	}
};
var _mordrax$cotwelm$Game_Keyboard$NoOp = {ctor: 'NoOp'};
var _mordrax$cotwelm$Game_Keyboard$keycodeToMsg = F2(
	function (map, code) {
		var maybeMsg = A2(_elm_lang$core$Dict$get, code, map);
		var _p1 = maybeMsg;
		if (_p1.ctor === 'Just') {
			return _p1._0;
		} else {
			return _mordrax$cotwelm$Game_Keyboard$NoOp;
		}
	});
var _mordrax$cotwelm$Game_Keyboard$Inventory = {ctor: 'Inventory'};
var _mordrax$cotwelm$Game_Keyboard$Map = {ctor: 'Map'};
var _mordrax$cotwelm$Game_Keyboard$playerKeymapUps = _elm_lang$core$Dict$fromList(
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 27, _1: _mordrax$cotwelm$Game_Keyboard$Map},
			{ctor: '_Tuple2', _0: 73, _1: _mordrax$cotwelm$Game_Keyboard$Inventory}
		]));
var _mordrax$cotwelm$Game_Keyboard$KeyDir = function (a) {
	return {ctor: 'KeyDir', _0: a};
};
var _mordrax$cotwelm$Game_Keyboard$Right = {ctor: 'Right'};
var _mordrax$cotwelm$Game_Keyboard$Left = {ctor: 'Left'};
var _mordrax$cotwelm$Game_Keyboard$Down = {ctor: 'Down'};
var _mordrax$cotwelm$Game_Keyboard$Up = {ctor: 'Up'};
var _mordrax$cotwelm$Game_Keyboard$playerKeymap = _elm_lang$core$Dict$fromList(
	_elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: 87,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Up)
		},
			{
			ctor: '_Tuple2',
			_0: 119,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Up)
		},
			{
			ctor: '_Tuple2',
			_0: 83,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Down)
		},
			{
			ctor: '_Tuple2',
			_0: 115,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Down)
		},
			{
			ctor: '_Tuple2',
			_0: 65,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Left)
		},
			{
			ctor: '_Tuple2',
			_0: 97,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Left)
		},
			{
			ctor: '_Tuple2',
			_0: 68,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Right)
		},
			{
			ctor: '_Tuple2',
			_0: 100,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Right)
		}
		]));
var _mordrax$cotwelm$Game_Keyboard$subscriptions = _elm_lang$core$Native_List.fromArray(
	[
		_elm_lang$keyboard$Keyboard$ups(
		_mordrax$cotwelm$Game_Keyboard$keycodeToMsg(_mordrax$cotwelm$Game_Keyboard$playerKeymapUps)),
		_elm_lang$keyboard$Keyboard$presses(
		_mordrax$cotwelm$Game_Keyboard$keycodeToMsg(_mordrax$cotwelm$Game_Keyboard$playerKeymap))
	]);

var _mordrax$cotwelm$Game_Collision$isMonsterObstruction = F2(
	function (monster, monsters) {
		return A2(
			_elm_lang$core$List$any,
			_mordrax$cotwelm$Utils_Vector$equal(monster.position),
			A2(
				_elm_lang$core$List$map,
				function (_) {
					return _.position;
				},
				monsters));
	});
var _mordrax$cotwelm$Game_Collision$pathMonster = F2(
	function (monster, hero) {
		var _p0 = A2(_mordrax$cotwelm$Utils_Vector$sub, hero.position, monster.position);
		var x = _p0.x;
		var y = _p0.y;
		var moveVector = A2(
			_mordrax$cotwelm$Utils_Vector$new,
			(x / _elm_lang$core$Basics$abs(x)) | 0,
			(y / _elm_lang$core$Basics$abs(y)) | 0);
		return _elm_lang$core$Native_Utils.update(
			monster,
			{
				position: A2(_mordrax$cotwelm$Utils_Vector$add, monster.position, moveVector)
			});
	});
var _mordrax$cotwelm$Game_Collision$defend = F2(
	function (monster, _p1) {
		var _p2 = _p1;
		var _p4 = _p2.hero;
		var _p3 = A3(_mordrax$cotwelm$Combat$attack, monster.stats, _p4.stats, _p2.seed);
		var heroStats$ = _p3._0;
		var seed$ = _p3._1;
		var hero$ = _elm_lang$core$Native_Utils.update(
			_p4,
			{stats: heroStats$});
		return _elm_lang$core$Native_Utils.update(
			_p2,
			{hero: hero$, seed: seed$});
	});
var _mordrax$cotwelm$Game_Collision$attack = F2(
	function (monster, _p5) {
		var _p6 = _p5;
		var monstersWithoutMonster = A2(
			_elm_lang$core$List$filter,
			function (x) {
				return _elm_lang$core$Basics$not(
					A2(_mordrax$cotwelm$Utils_IdGenerator$equals, monster.id, x.id));
			},
			_p6.monsters);
		var _p7 = A3(_mordrax$cotwelm$Combat$attack, _p6.hero.stats, monster.stats, _p6.seed);
		var monsterStats = _p7._0;
		var seed$ = _p7._1;
		var monster$ = _elm_lang$core$Native_Utils.update(
			monster,
			{stats: monsterStats});
		var monsters$ = _mordrax$cotwelm$Stats$isDead(monster$.stats) ? monstersWithoutMonster : A2(_elm_lang$core$List_ops['::'], monster$, monstersWithoutMonster);
		return _elm_lang$core$Native_Utils.update(
			_p6,
			{monsters: monsters$});
	});
var _mordrax$cotwelm$Game_Collision$buildingAtPosition = F2(
	function (pos, buildings) {
		var buildingsAtTile = A2(
			_elm_lang$core$List$filter,
			_mordrax$cotwelm$GameData_Building$isBuildingAtPosition(pos),
			buildings);
		var _p8 = buildingsAtTile;
		if (_p8.ctor === '::') {
			return _elm_lang$core$Maybe$Just(_p8._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _mordrax$cotwelm$Game_Collision$queryPosition = F2(
	function (pos, _p9) {
		var _p10 = _p9;
		var _p12 = _p10.map;
		var isHero = A2(_mordrax$cotwelm$Utils_Vector$equal, _p10.hero.position, pos);
		var maybeMonster = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				function (x) {
					return A2(_mordrax$cotwelm$Utils_Vector$equal, pos, x.position);
				},
				_p10.monsters));
		var maybeBuilding = A2(
			_mordrax$cotwelm$Game_Collision$buildingAtPosition,
			pos,
			_mordrax$cotwelm$Game_Maps$getBuildings(_p12));
		var maybeTile = A2(
			_elm_lang$core$Dict$get,
			_elm_lang$core$Basics$toString(pos),
			_mordrax$cotwelm$Game_Maps$getMap(_p12));
		var tileObstruction = function () {
			var _p11 = maybeTile;
			if (_p11.ctor === 'Just') {
				return _mordrax$cotwelm$Tile$isSolid(_p11._0);
			} else {
				return false;
			}
		}();
		return {ctor: '_Tuple4', _0: tileObstruction, _1: maybeBuilding, _2: maybeMonster, _3: isHero};
	});
var _mordrax$cotwelm$Game_Collision$moveMonsters = F3(
	function (monsters, movedMonsters, _p13) {
		moveMonsters:
		while (true) {
			var _p14 = _p13;
			var _p19 = _p14;
			var _p15 = monsters;
			if (_p15.ctor === '[]') {
				return _elm_lang$core$Native_Utils.update(
					_p19,
					{monsters: movedMonsters});
			} else {
				var _p18 = _p15._1;
				var _p17 = _p15._0;
				var movedMonster = A2(_mordrax$cotwelm$Game_Collision$pathMonster, _p17, _p14.hero);
				var obstructions = A2(_mordrax$cotwelm$Game_Collision$queryPosition, movedMonster.position, _p19);
				var isObstructedByMovedMonsters = A2(_mordrax$cotwelm$Game_Collision$isMonsterObstruction, movedMonster, movedMonsters);
				var _p16 = obstructions;
				_v7_4:
				do {
					if (_p16.ctor === '_Tuple4') {
						if (_p16._3 === true) {
							var model$ = A2(_mordrax$cotwelm$Game_Collision$defend, _p17, _p19);
							var _v8 = _p18,
								_v9 = A2(_elm_lang$core$List_ops['::'], _p17, movedMonsters),
								_v10 = model$;
							monsters = _v8;
							movedMonsters = _v9;
							_p13 = _v10;
							continue moveMonsters;
						} else {
							if (_p16._0 === true) {
								var _v11 = _p18,
									_v12 = A2(_elm_lang$core$List_ops['::'], _p17, movedMonsters),
									_v13 = _p19;
								monsters = _v11;
								movedMonsters = _v12;
								_p13 = _v13;
								continue moveMonsters;
							} else {
								if (_p16._1.ctor === 'Just') {
									var _v14 = _p18,
										_v15 = A2(_elm_lang$core$List_ops['::'], _p17, movedMonsters),
										_v16 = _p19;
									monsters = _v14;
									movedMonsters = _v15;
									_p13 = _v16;
									continue moveMonsters;
								} else {
									if (_p16._2.ctor === 'Just') {
										var _v17 = _p18,
											_v18 = A2(_elm_lang$core$List_ops['::'], _p17, movedMonsters),
											_v19 = _p19;
										monsters = _v17;
										movedMonsters = _v18;
										_p13 = _v19;
										continue moveMonsters;
									} else {
										break _v7_4;
									}
								}
							}
						}
					} else {
						break _v7_4;
					}
				} while(false);
				if (isObstructedByMovedMonsters) {
					var _v20 = _p18,
						_v21 = A2(_elm_lang$core$List_ops['::'], _p17, movedMonsters),
						_v22 = _p19;
					monsters = _v20;
					movedMonsters = _v21;
					_p13 = _v22;
					continue moveMonsters;
				} else {
					var _v23 = _p18,
						_v24 = A2(_elm_lang$core$List_ops['::'], movedMonster, movedMonsters),
						_v25 = _p19;
					monsters = _v23;
					movedMonsters = _v24;
					_p13 = _v25;
					continue moveMonsters;
				}
			}
		}
	});
var _mordrax$cotwelm$Game_Collision$enterBuilding = F2(
	function (building, _p20) {
		var _p21 = _p20;
		var _p24 = _p21;
		var _p22 = _mordrax$cotwelm$GameData_Building$buildingType(building);
		switch (_p22.ctor) {
			case 'LinkType':
				var _p23 = _p22._0;
				return _elm_lang$core$Native_Utils.update(
					_p24,
					{
						map: A2(_mordrax$cotwelm$Game_Maps$updateArea, _p23.area, _p21.map),
						hero: _elm_lang$core$Native_Utils.update(
							_p21.hero,
							{position: _p23.pos})
					});
			case 'ShopType':
				return _elm_lang$core$Native_Utils.update(
					_p24,
					{
						currentScreen: _mordrax$cotwelm$Game_Data$BuildingScreen(building),
						shop: A2(_mordrax$cotwelm$Shop_Shop$setCurrentShopType, _p22._0, _p24.shop)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					_p24,
					{
						currentScreen: _mordrax$cotwelm$Game_Data$BuildingScreen(building)
					});
		}
	});
var _mordrax$cotwelm$Game_Collision$tryMoveHero = F2(
	function (dir, _p25) {
		var _p26 = _p25;
		var _p29 = _p26;
		var _p28 = _p26.hero;
		var movedHero = _elm_lang$core$Native_Utils.update(
			_p28,
			{
				position: A2(
					_mordrax$cotwelm$Utils_Vector$add,
					_p28.position,
					_mordrax$cotwelm$Game_Keyboard$dirToVector(dir))
			});
		var obstructions = A2(_mordrax$cotwelm$Game_Collision$queryPosition, movedHero.position, _p29);
		var _p27 = obstructions;
		_v29_1:
		do {
			_v29_0:
			do {
				if (_p27._0 === true) {
					if (_p27._2.ctor === 'Just') {
						break _v29_0;
					} else {
						if (_p27._1.ctor === 'Just') {
							break _v29_1;
						} else {
							return _p29;
						}
					}
				} else {
					if (_p27._2.ctor === 'Just') {
						break _v29_0;
					} else {
						if (_p27._1.ctor === 'Just') {
							break _v29_1;
						} else {
							return _elm_lang$core$Native_Utils.update(
								_p29,
								{hero: movedHero});
						}
					}
				}
			} while(false);
			return A2(_mordrax$cotwelm$Game_Collision$attack, _p27._2._0, _p29);
		} while(false);
		return A2(_mordrax$cotwelm$Game_Collision$enterBuilding, _p27._1._0, _p29);
	});

var _mordrax$cotwelm$Game_Inventory$viewPurse = function (_p0) {
	var _p1 = _p0;
	var maybeCoins = function (x) {
		return _elm_lang$core$Maybe$Just(
			_mordrax$cotwelm$Item_Purse$getCoins(x));
	};
	var maybePurseContents = A2(
		_elm_lang$core$Maybe$andThen,
		A2(
			_elm_lang$core$Maybe$andThen,
			A2(_mordrax$cotwelm$Equipment$get, _mordrax$cotwelm$Equipment$Purse, _p1.equipment),
			_mordrax$cotwelm$Item_Item$toPurse),
		maybeCoins);
	var _p2 = maybePurseContents;
	if ((_p2.ctor === 'Just') && (_p2._0.ctor === '_Tuple4')) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('ui grid')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('CoinsCopper cotwItem')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(_p2._0._0))
						])),
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('CoinsSilver cotwItem')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(_p2._0._1))
						])),
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('CoinsGold cotwItem')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(_p2._0._2))
						])),
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('CoinsPlatinum cotwItem')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(_p2._0._3))
						]))
				]));
	} else {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	}
};
var _mordrax$cotwelm$Game_Inventory$viewEquipment = F2(
	function (equipment, dnd) {
		var drawItem = F2(
			function (item, slot) {
				return A3(
					_mordrax$cotwelm$Utils_DragDrop$draggable,
					A2(
						_mordrax$cotwelm$Item_Item$viewSlot,
						item,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'Slot: ',
							_elm_lang$core$Basics$toString(slot))),
					A2(_mordrax$cotwelm$Game_Data$DragSlot, item, slot),
					dnd);
			});
		var getEquipment = function (slot) {
			return A2(_mordrax$cotwelm$Equipment$get, slot, equipment);
		};
		var drawSlot = function (slot) {
			var slotName = A2(
				_elm_lang$core$Basics_ops['++'],
				'Slot: [',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(slot),
					']'));
			var _p3 = getEquipment(slot);
			if (_p3.ctor === 'Just') {
				return A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('three wide column equipmentSlot')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(drawItem, _p3._0, slot)
						]));
			} else {
				return A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('three wide column equipmentSlot')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_mordrax$cotwelm$Utils_DragDrop$droppable,
							_mordrax$cotwelm$Game_Data$DropEquipment(slot),
							dnd,
							A2(
								_elm_lang$html$Html$div,
								_elm_lang$core$Native_List.fromArray(
									[]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text(slotName)
									])))
						]));
			}
		};
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('ui grid')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					drawSlot(_mordrax$cotwelm$Equipment$Weapon),
					drawSlot(_mordrax$cotwelm$Equipment$Freehand),
					drawSlot(_mordrax$cotwelm$Equipment$Armour),
					drawSlot(_mordrax$cotwelm$Equipment$Shield),
					drawSlot(_mordrax$cotwelm$Equipment$Helmet),
					drawSlot(_mordrax$cotwelm$Equipment$Bracers),
					drawSlot(_mordrax$cotwelm$Equipment$Gauntlets),
					drawSlot(_mordrax$cotwelm$Equipment$Belt),
					drawSlot(_mordrax$cotwelm$Equipment$Purse),
					drawSlot(_mordrax$cotwelm$Equipment$Pack),
					drawSlot(_mordrax$cotwelm$Equipment$Neckwear),
					drawSlot(_mordrax$cotwelm$Equipment$Overgarment),
					drawSlot(_mordrax$cotwelm$Equipment$LeftRing),
					drawSlot(_mordrax$cotwelm$Equipment$RightRing),
					drawSlot(_mordrax$cotwelm$Equipment$Boots)
				]));
	});
var _mordrax$cotwelm$Game_Inventory$viewContainer = F2(
	function (containerItem, _p4) {
		var _p5 = _p4;
		var makeDraggable = F2(
			function (pack, item) {
				return A3(
					_mordrax$cotwelm$Utils_DragDrop$draggable,
					_mordrax$cotwelm$Item_Item$view(item),
					A2(_mordrax$cotwelm$Game_Data$DragPack, item, pack),
					_p5.dnd);
			});
		var items = _mordrax$cotwelm$Equipment$getPackContent(_p5.equipment);
		var _p6 = containerItem;
		if (_p6.ctor === 'ItemPack') {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui cards')
					]),
				A2(
					_elm_lang$core$List$map,
					makeDraggable(_p6._0),
					items));
		} else {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Item in pack equipment slot is not a pack, how did it get there?!')
					]));
		}
	});
var _mordrax$cotwelm$Game_Inventory$viewShop = function (_p7) {
	var _p8 = _p7;
	var _p10 = _p8.shop;
	var _p9 = _p8.dnd;
	var makeDraggable = F2(
		function (shop, item) {
			return A3(
				_mordrax$cotwelm$Utils_DragDrop$draggable,
				_mordrax$cotwelm$Item_Item$view(item),
				A2(_mordrax$cotwelm$Game_Data$DragShop, item, shop),
				_p9);
		});
	var items = _mordrax$cotwelm$Shop_Shop$list(_p10);
	var droppableDiv = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('ui cards')
			]),
		A2(
			_elm_lang$core$List$map,
			makeDraggable(_p10),
			items));
	var droppableShop = A3(
		_mordrax$cotwelm$Utils_DragDrop$droppable,
		_mordrax$cotwelm$Game_Data$DropShop(_p10),
		_p9,
		droppableDiv);
	return droppableShop;
};
var _mordrax$cotwelm$Game_Inventory$viewPack = F2(
	function (maybePack, _p11) {
		var _p12 = _p11;
		var packStyle = _elm_lang$html$Html_Attributes$style(
			_elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'background', _1: 'lightblue'},
					{ctor: '_Tuple2', _0: 'min-height', _1: '100px'}
				]));
		var droppableHtml = function (pack) {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[packStyle]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_mordrax$cotwelm$Game_Inventory$viewContainer,
						_mordrax$cotwelm$Item_Item$ItemPack(pack),
						_p12)
					]));
		};
		var _p13 = maybePack;
		if (_p13.ctor === 'Just') {
			var _p14 = _p13._0;
			return A3(
				_mordrax$cotwelm$Utils_DragDrop$droppable,
				_mordrax$cotwelm$Game_Data$DropPack(_p14),
				_p12.dnd,
				droppableHtml(_p14));
		} else {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('You have no pack! Equip a pack to use this space.')
					]));
		}
	});
var _mordrax$cotwelm$Game_Inventory$toInventoryMsg = function (dragDropMsg) {
	return _mordrax$cotwelm$Game_Data$DnDMsg(dragDropMsg);
};
var _mordrax$cotwelm$Game_Inventory$subscriptions = function (_p15) {
	var _p16 = _p15;
	return A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Platform_Sub$map(_mordrax$cotwelm$Game_Inventory$toInventoryMsg),
		_mordrax$cotwelm$Utils_DragDrop$subscriptions(_p16.dnd));
};
var _mordrax$cotwelm$Game_Inventory$viewPackInfo = function (maybeItem) {
	var _p17 = maybeItem;
	if (_p17.ctor === 'Just') {
		var print = F3(
			function (name, a, b) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					name,
					A2(
						_elm_lang$core$Basics_ops['++'],
						': ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(a),
							A2(
								_elm_lang$core$Basics_ops['++'],
								' / ',
								_elm_lang$core$Basics$toString(b)))));
			});
		var _p18 = _mordrax$cotwelm$Item_Item$packInfo(_p17._0);
		var curMass = _p18._0;
		var capMass = _p18._1;
		var _p19 = _mordrax$cotwelm$Utils_Mass$info(curMass);
		var curBulk = _p19._0;
		var curWeight = _p19._1;
		var _p20 = _mordrax$cotwelm$Utils_Mass$info(capMass);
		var capBulk = _p20._0;
		var capWeight = _p20._1;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A3(print, 'Bulk', curBulk, capBulk),
			A2(
				_elm_lang$core$Basics_ops['++'],
				', ',
				A3(print, 'Weight', curWeight, capWeight)));
	} else {
		return '';
	}
};
var _mordrax$cotwelm$Game_Inventory$viewGround = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _mordrax$cotwelm$Game_Inventory$viewShopPackPurse = function (_p21) {
	var _p22 = _p21;
	var _p25 = _p22;
	var maybePack = function () {
		var _p23 = A2(_mordrax$cotwelm$Equipment$get, _mordrax$cotwelm$Equipment$Pack, _p22.equipment);
		if ((_p23.ctor === 'Just') && (_p23._0.ctor === 'ItemPack')) {
			return _elm_lang$core$Maybe$Just(_p23._0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	}();
	var columnWidth = F2(
		function (width, children) {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$Basics_ops['++'], width, ' wide column'))
					]),
				children);
		});
	var header = function (title) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('ui block header')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(title)
				]));
	};
	var groundHtml = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				header('Ground'),
				_mordrax$cotwelm$Game_Inventory$viewGround(_p25)
			]));
	var shopHtml = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				header('Shop'),
				_mordrax$cotwelm$Game_Inventory$viewShop(_p25)
			]));
	var shopGroundHtml = function () {
		var _p24 = _p22.currentScreen;
		if (_p24.ctor === 'BuildingScreen') {
			return shopHtml;
		} else {
			return groundHtml;
		}
	}();
	var packHtml = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				header(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Pack: (',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_mordrax$cotwelm$Game_Inventory$viewPackInfo(maybePack),
						')'))),
				A2(_mordrax$cotwelm$Game_Inventory$viewPack, maybePack, _p25)
			]));
	var purseHtml = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				header('Purse'),
				_mordrax$cotwelm$Game_Inventory$viewPurse(_p25)
			]));
	return A2(
		_elm_lang$html$Html_App$map,
		_mordrax$cotwelm$Game_Inventory$toInventoryMsg,
		A2(
			columnWidth,
			'ten',
			_elm_lang$core$Native_List.fromArray(
				[shopGroundHtml, packHtml, purseHtml])));
};
var _mordrax$cotwelm$Game_Inventory$view = function (_p26) {
	var _p27 = _p26;
	var _p28 = _p27.dnd;
	var columnWidth = F2(
		function (width, children) {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$Basics_ops['++'], width, ' wide column'))
					]),
				children);
		});
	var equipmentColumn = A2(
		columnWidth,
		'six',
		_elm_lang$core$Native_List.fromArray(
			[
				A2(_mordrax$cotwelm$Game_Inventory$viewEquipment, _p27.equipment, _p28)
			]));
	var heading = function (title) {
		return A2(
			_elm_lang$html$Html$span,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('ui text container segment')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(title)
				]));
	};
	var header = function (title) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('ui block header')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(title)
				]));
	};
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				heading('Inventory screen'),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui two column grid')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_elm_lang$html$Html_App$map, _mordrax$cotwelm$Game_Inventory$toInventoryMsg, equipmentColumn),
						_mordrax$cotwelm$Game_Inventory$viewShopPackPurse(_p27)
					])),
				A2(
				_elm_lang$html$Html_App$map,
				_mordrax$cotwelm$Game_Inventory$toInventoryMsg,
				_mordrax$cotwelm$Utils_DragDrop$view(_p28))
			]));
};
var _mordrax$cotwelm$Game_Inventory$handleDrop = F3(
	function (drop, item, model) {
		var _p29 = drop;
		switch (_p29.ctor) {
			case 'DropPack':
				var _p30 = A2(_mordrax$cotwelm$Equipment$putInPack, item, model.equipment);
				var equipment$ = _p30._0;
				var equipMsg = _p30._1;
				var success = _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						model,
						{equipment: equipment$}));
				var _p31 = equipMsg;
				switch (_p31.ctor) {
					case 'Ok':
						return success;
					case 'NoPackEquipped':
						return _elm_lang$core$Result$Err('Can\'t add to the pack. No packed equipped!');
					case 'ItemMsg':
						if (_p31._0.ctor === 'Ok') {
							return success;
						} else {
							return _elm_lang$core$Result$Err(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'Dropping into pack with unhandled item msg',
									_elm_lang$core$Basics$toString(_p31._0)));
						}
					default:
						return _elm_lang$core$Result$Err(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Dropping into pack failed with unhanded msg: ',
								_elm_lang$core$Basics$toString(_p31)));
				}
			case 'DropEquipment':
				var _p32 = A2(
					_mordrax$cotwelm$Equipment$equip,
					{ctor: '_Tuple2', _0: _p29._0, _1: item},
					model.equipment);
				if (_p32.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							model,
							{equipment: _p32._0}));
				} else {
					return _elm_lang$core$Result$Err(
						_elm_lang$core$Basics$toString(_p32._0));
				}
			default:
				var maybePurse = A2(
					_elm_lang$core$Maybe$andThen,
					A2(_mordrax$cotwelm$Equipment$get, _mordrax$cotwelm$Equipment$Purse, model.equipment),
					_mordrax$cotwelm$Item_Item$toPurse);
				var _p33 = maybePurse;
				if (_p33.ctor === 'Just') {
					var _p34 = A3(_mordrax$cotwelm$Shop_Shop$buy, item, _p33._0, _p29._0);
					var shop$ = _p34._0;
					var purse$ = _p34._1;
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								shop: shop$,
								equipment: A2(_mordrax$cotwelm$Equipment$updatePurseContents, purse$, model.equipment)
							}));
				} else {
					return _elm_lang$core$Result$Err('No purse to hold coins!');
				}
		}
	});
var _mordrax$cotwelm$Game_Inventory$dragFromShop = F3(
	function (item, shop, _p35) {
		var _p36 = _p35;
		var _p39 = _p36.equipment;
		var maybePurse = A2(
			_elm_lang$core$Maybe$andThen,
			A2(_mordrax$cotwelm$Equipment$get, _mordrax$cotwelm$Equipment$Purse, _p39),
			_mordrax$cotwelm$Item_Item$toPurse);
		var buyResult = function () {
			var _p37 = maybePurse;
			if (_p37.ctor === 'Just') {
				return A3(_mordrax$cotwelm$Shop_Shop$sell, item, _p37._0, shop);
			} else {
				return _elm_lang$core$Result$Err('No purse to buy anything with!');
			}
		}();
		var _p38 = buyResult;
		if (_p38.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						_p36,
						{
							shop: _p38._0._0,
							equipment: A2(_mordrax$cotwelm$Equipment$updatePurseContents, _p38._0._1, _p39)
						}),
					_1: item
				});
		} else {
			return _elm_lang$core$Result$Err(_p38._0);
		}
	});
var _mordrax$cotwelm$Game_Inventory$handleDrag = F2(
	function (drag, model) {
		var _p40 = drag;
		switch (_p40.ctor) {
			case 'DragSlot':
				var unequipRes = A2(_mordrax$cotwelm$Equipment$unequip, _p40._1, model.equipment);
				var _p41 = unequipRes;
				if (_p41.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{equipment: _p41._0}),
							_1: _p40._0
						});
				} else {
					return _elm_lang$core$Result$Err(_p41._0);
				}
			case 'DragPack':
				var _p43 = _p40._0;
				var _p42 = A2(_elm_lang$core$Debug$log, 'TODO: Remove item from the pack.container and return just the item', 1);
				var modelItemRemoved = _elm_lang$core$Native_Utils.update(
					model,
					{
						equipment: A2(_mordrax$cotwelm$Equipment$removeFromPack, _p43, model.equipment)
					});
				return _elm_lang$core$Result$Ok(
					{ctor: '_Tuple2', _0: modelItemRemoved, _1: _p43});
			default:
				return A3(_mordrax$cotwelm$Game_Inventory$dragFromShop, _p40._0, _p40._1, model);
		}
	});
var _mordrax$cotwelm$Game_Inventory$handleDragDrop = F3(
	function (dragSource, dropTarget, model) {
		var noChange = model;
		var handleDrop$ = F2(
			function (item, modelWithDrag) {
				var _p44 = A3(_mordrax$cotwelm$Game_Inventory$handleDrop, dropTarget, item, modelWithDrag);
				if (_p44.ctor === 'Ok') {
					return _p44._0;
				} else {
					var _p45 = A2(_elm_lang$core$Debug$log, 'Drop failed: ', _p44._0);
					return noChange;
				}
			});
		var dragResult = A2(_mordrax$cotwelm$Game_Inventory$handleDrag, dragSource, model);
		var _p46 = dragResult;
		if (_p46.ctor === 'Ok') {
			return A2(handleDrop$, _p46._0._1, _p46._0._0);
		} else {
			var _p47 = A2(_elm_lang$core$Debug$log, 'Drag failed: ', _p46._0);
			return noChange;
		}
	});
var _mordrax$cotwelm$Game_Inventory$handleMouseUp = function (_p48) {
	var _p49 = _p48;
	var _p51 = _p49;
	var modelDnDReinit = _elm_lang$core$Native_Utils.update(
		_p51,
		{dnd: _mordrax$cotwelm$Utils_DragDrop$new});
	var noChange = modelDnDReinit;
	var _p50 = _mordrax$cotwelm$Utils_DragDrop$getDragSourceDropTarget(_p51.dnd);
	if (_p50._0.ctor === 'NoDrag') {
		return noChange;
	} else {
		if (_p50._1.ctor === 'NoDrop') {
			return noChange;
		} else {
			return A3(_mordrax$cotwelm$Game_Inventory$handleDragDrop, _p50._0._0, _p50._1._0, modelDnDReinit);
		}
	}
};
var _mordrax$cotwelm$Game_Inventory$update = F2(
	function (msg, model) {
		var _p52 = msg;
		if (_p52.ctor === 'DnDMsg') {
			if (_p52._0.ctor === 'End') {
				return _mordrax$cotwelm$Game_Inventory$handleMouseUp(model);
			} else {
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						dnd: A2(_mordrax$cotwelm$Utils_DragDrop$update, _p52._0, model.dnd)
					});
			}
		} else {
			return A2(_elm_lang$core$Debug$log, 'Update: No other messages implemented', model);
		}
	});

var _mordrax$cotwelm$Monster_Monsters$init = function (gen) {
	var monsterFactory = _elm_lang$core$Native_List.fromArray(
		[
			A2(
			_mordrax$cotwelm$Monster_Monster$new,
			_mordrax$cotwelm$Monster_Monster$GiantRat,
			A2(_mordrax$cotwelm$Utils_Vector$new, 10, 1)),
			A2(
			_mordrax$cotwelm$Monster_Monster$new,
			_mordrax$cotwelm$Monster_Monster$Kobold,
			A2(_mordrax$cotwelm$Utils_Vector$new, 4, 10)),
			A2(
			_mordrax$cotwelm$Monster_Monster$new,
			_mordrax$cotwelm$Monster_Monster$Hobgoblin,
			A2(_mordrax$cotwelm$Utils_Vector$new, 5, 11)),
			A2(
			_mordrax$cotwelm$Monster_Monster$new,
			_mordrax$cotwelm$Monster_Monster$LargeSnake,
			A2(_mordrax$cotwelm$Utils_Vector$new, 11, 1))
		]);
	return A3(
		_elm_lang$core$List$foldl,
		_mordrax$cotwelm$Utils_IdGenerator$assignId,
		{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: gen
		},
		monsterFactory);
};

var _mordrax$cotwelm$Game_Game$viewHero = function (hero) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('tile maleHero'),
				_mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(hero.position)
			]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _mordrax$cotwelm$Game_Game$viewBuilding = function (building) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$h1,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('TODO: Get the internal view of the building')
					]))
			]));
};
var _mordrax$cotwelm$Game_Game$viewHUD = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text('messages')
			]));
};
var _mordrax$cotwelm$Game_Game$viewMonsters = function (_p0) {
	var _p1 = _p0;
	var monsterHtml = function (monster) {
		return _mordrax$cotwelm$Monster_Monster$view(monster);
	};
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(_elm_lang$core$List$map, monsterHtml, _p1.monsters));
};
var _mordrax$cotwelm$Game_Game$viewMap = function (_p2) {
	var _p3 = _p2;
	var _p8 = _p3.windowSize;
	var _p7 = _p3;
	var px = function (x) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px');
	};
	var _p4 = {ctor: '_Tuple2', _0: ((_p8.width / 32) | 0) * 16, _1: ((_p8.height / 32) | 0) * 16};
	var xOff = _p4._0;
	var yOff = _p4._1;
	var _p5 = A2(_mordrax$cotwelm$Utils_Vector$scale, 32, _p7.hero.position);
	var x = _p5.x;
	var y = _p5.y;
	var title = A2(
		_elm_lang$html$Html$h1,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(
				A2(_elm_lang$core$Basics_ops['++'], 'Welcome to Castle of the Winds: ', _p7.name))
			]));
	var _p6 = A2(_elm_lang$core$Debug$log, 'size: ', _p8);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$style(
				_elm_lang$core$Native_List.fromArray(
					[
						{ctor: '_Tuple2', _0: 'position', _1: 'relative'},
						{ctor: '_Tuple2', _0: 'overflow', _1: 'hidden'},
						{
						ctor: '_Tuple2',
						_0: 'width',
						_1: px(_p8.width)
					},
						{
						ctor: '_Tuple2',
						_0: 'height',
						_1: px(_p8.height)
					}
					]))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(
						_elm_lang$core$Native_List.fromArray(
							[
								{ctor: '_Tuple2', _0: 'position', _1: 'relative'},
								{
								ctor: '_Tuple2',
								_0: 'top',
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									'-',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(y - yOff),
										'px'))
							},
								{
								ctor: '_Tuple2',
								_0: 'left',
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									'-',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(x - xOff),
										'px'))
							}
							]))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_mordrax$cotwelm$Game_Maps$view(_p7.map),
						_mordrax$cotwelm$Game_Game$viewHero(_p7.hero),
						_mordrax$cotwelm$Game_Game$viewMonsters(_p7)
					]))
			]));
};
var _mordrax$cotwelm$Game_Game$update = F2(
	function (msg, model) {
		var _p9 = msg;
		switch (_p9.ctor) {
			case 'InvMsg':
				return {
					ctor: '_Tuple2',
					_0: A2(_mordrax$cotwelm$Game_Inventory$update, _p9._0, model),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ShopMsg':
				var _p10 = A3(_mordrax$cotwelm$Shop_Shop$update, _p9._0, model.idGen, model.shop);
				var shop$ = _p10._0;
				var idGen$ = _p10._1;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{shop: shop$, idGen: idGen$}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Keyboard':
				switch (_p9._0.ctor) {
					case 'KeyDir':
						var model$ = A2(_mordrax$cotwelm$Game_Collision$tryMoveHero, _p9._0._0, model);
						var movedMovedMonsters = A3(
							_mordrax$cotwelm$Game_Collision$moveMonsters,
							model$.monsters,
							_elm_lang$core$Native_List.fromArray(
								[]),
							model$);
						return {ctor: '_Tuple2', _0: movedMovedMonsters, _1: _elm_lang$core$Platform_Cmd$none};
					case 'Map':
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{currentScreen: _mordrax$cotwelm$Game_Data$MapScreen}),
							_1: _elm_lang$core$Platform_Cmd$none
						};
					case 'Inventory':
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{currentScreen: _mordrax$cotwelm$Game_Data$InventoryScreen}),
							_1: _elm_lang$core$Platform_Cmd$none
						};
					default:
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				}
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{windowSize: _p9._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _mordrax$cotwelm$Game_Game$WindowSize = function (a) {
	return {ctor: 'WindowSize', _0: a};
};
var _mordrax$cotwelm$Game_Game$ShopMsg = function (a) {
	return {ctor: 'ShopMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$initGame = function (seed) {
	var _p11 = _mordrax$cotwelm$Shop_Shop$new;
	var newShop = _p11._0;
	var shopCmd = _p11._1;
	var cmd = A2(
		_elm_lang$core$Platform_Cmd$map,
		function (x) {
			return _mordrax$cotwelm$Game_Game$ShopMsg(x);
		},
		shopCmd);
	var idGenerator = _mordrax$cotwelm$Utils_IdGenerator$new;
	var _p12 = _mordrax$cotwelm$Equipment$init(idGenerator);
	var idGenerator$ = _p12._0;
	var equipment = _p12._1;
	var _p13 = _mordrax$cotwelm$Monster_Monsters$init(idGenerator$);
	var monsters = _p13._0;
	var idGenerator$$ = _p13._1;
	return {
		ctor: '_Tuple2',
		_0: {
			name: 'A new game',
			hero: _mordrax$cotwelm$Hero$init,
			map: _mordrax$cotwelm$Game_Maps$init,
			currentScreen: _mordrax$cotwelm$Game_Data$MapScreen,
			dnd: _mordrax$cotwelm$Utils_DragDrop$new,
			equipment: equipment,
			shop: newShop,
			idGen: idGenerator$$,
			monsters: monsters,
			seed: seed,
			windowSize: {width: 640, height: 640}
		},
		_1: cmd
	};
};
var _mordrax$cotwelm$Game_Game$InvMsg = function (a) {
	return {ctor: 'InvMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$view = function (model) {
	var _p14 = model.currentScreen;
	switch (_p14.ctor) {
		case 'MapScreen':
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui grid container')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui row')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('menu')
							])),
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui row')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html$text('buttons menu')
							])),
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui row')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_mordrax$cotwelm$Game_Game$viewMap(model)
							])),
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui row')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_mordrax$cotwelm$Game_Game$viewHUD(model)
							]))
					]));
		case 'BuildingScreen':
			var _p16 = _p14._0;
			var _p15 = _mordrax$cotwelm$GameData_Building$buildingType(_p16);
			if (_p15.ctor === 'ShopType') {
				return A2(
					_elm_lang$html$Html_App$map,
					_mordrax$cotwelm$Game_Game$InvMsg,
					_mordrax$cotwelm$Game_Inventory$view(model));
			} else {
				return _mordrax$cotwelm$Game_Game$viewBuilding(_p16);
			}
		default:
			return A2(
				_elm_lang$html$Html_App$map,
				_mordrax$cotwelm$Game_Game$InvMsg,
				_mordrax$cotwelm$Game_Inventory$view(model));
	}
};
var _mordrax$cotwelm$Game_Game$Keyboard = function (a) {
	return {ctor: 'Keyboard', _0: a};
};
var _mordrax$cotwelm$Game_Game$subscriptions = function (model) {
	var windowSubs = _elm_lang$window$Window$resizes(
		function (x) {
			return _mordrax$cotwelm$Game_Game$WindowSize(x);
		});
	var toKeyboardMsg = function (x) {
		return A2(_elm_lang$core$Platform_Sub$map, _mordrax$cotwelm$Game_Game$Keyboard, x);
	};
	var keyboardSubs = A2(_elm_lang$core$List$map, toKeyboardMsg, _mordrax$cotwelm$Game_Keyboard$subscriptions);
	var toInvMsg = function (x) {
		return A2(_elm_lang$core$Platform_Sub$map, _mordrax$cotwelm$Game_Game$InvMsg, x);
	};
	var inventorySubs = A2(
		_elm_lang$core$List$map,
		toInvMsg,
		_mordrax$cotwelm$Game_Inventory$subscriptions(model));
	return A2(
		_elm_lang$core$List_ops['::'],
		windowSubs,
		A2(_elm_lang$core$Basics_ops['++'], inventorySubs, keyboardSubs));
};

var _mordrax$cotwelm$SplashView$Overview = {ctor: 'Overview'};
var _mordrax$cotwelm$SplashView$LoadGame = {ctor: 'LoadGame'};
var _mordrax$cotwelm$SplashView$NewGame = {ctor: 'NewGame'};
var _mordrax$cotwelm$SplashView$view = function () {
	var bgStyle = _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 'backgroundColor', _1: 'black'}
		]);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('ui center aligned middle aligned grid'),
				_elm_lang$html$Html_Attributes$style(bgStyle)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui one column')
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui column')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$img,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$src('/assets/landing_cotw1.jpg')
									]),
								_elm_lang$core$Native_List.fromArray(
									[]))
							])),
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui column')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$img,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$src('/assets/landing_cotw2.jpg')
									]),
								_elm_lang$core$Native_List.fromArray(
									[]))
							])),
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui column')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_elm_lang$html$Html$div,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('ui buttons')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_elm_lang$html$Html$button,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$class('ui button primary'),
												_elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$SplashView$NewGame)
											]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('New Game')
											])),
										A2(
										_elm_lang$html$Html$button,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$class('ui button'),
												_elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$SplashView$LoadGame)
											]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('Load Game')
											])),
										A2(
										_elm_lang$html$Html$button,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$class('ui button'),
												_elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$SplashView$Overview)
											]),
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html$text('Overview')
											]))
									]))
							]))
					]))
			]));
}();

var _mordrax$cotwelm$Main$fromUrl = function (url) {
	return A2(_elm_lang$core$String$dropLeft, 2, url);
};
var _mordrax$cotwelm$Main$urlParser = _elm_lang$navigation$Navigation$makeParser(
	function (_p0) {
		return _mordrax$cotwelm$Main$fromUrl(
			function (_) {
				return _.hash;
			}(_p0));
	});
var _mordrax$cotwelm$Main$Model = F3(
	function (a, b, c) {
		return {currentPage: a, character: b, game: c};
	});
var _mordrax$cotwelm$Main$InitSeed = function (a) {
	return {ctor: 'InitSeed', _0: a};
};
var _mordrax$cotwelm$Main$getSeed = function () {
	var fail = function (x) {
		var _p1 = A2(_elm_lang$core$Debug$log, 'FATAL: Unable to get a random seed.', x);
		return _mordrax$cotwelm$Main$InitSeed(
			_elm_lang$core$Random$initialSeed(92374093709223));
	};
	var generateSeed = function (timeNow) {
		return _elm_lang$core$Random$initialSeed(
			_elm_lang$core$Basics$round(
				_elm_lang$core$Time$inSeconds(timeNow)));
	};
	return A3(
		_elm_lang$core$Task$perform,
		function (x) {
			return fail(x);
		},
		function (timeNow) {
			return _mordrax$cotwelm$Main$InitSeed(
				generateSeed(timeNow));
		},
		_elm_lang$core$Time$now);
}();
var _mordrax$cotwelm$Main$GameMsg = function (a) {
	return {ctor: 'GameMsg', _0: a};
};
var _mordrax$cotwelm$Main$subscriptions = function (model) {
	var toMsg = function (x) {
		return A2(_elm_lang$core$Platform_Sub$map, _mordrax$cotwelm$Main$GameMsg, x);
	};
	var gameSubs = function (game) {
		return A2(
			_elm_lang$core$List$map,
			toMsg,
			_mordrax$cotwelm$Game_Game$subscriptions(game));
	};
	var _p2 = model.game;
	if (_p2.ctor === 'Nothing') {
		return _elm_lang$core$Platform_Sub$none;
	} else {
		return _elm_lang$core$Platform_Sub$batch(
			gameSubs(_p2._0));
	}
};
var _mordrax$cotwelm$Main$CharCreationMsg = function (a) {
	return {ctor: 'CharCreationMsg', _0: a};
};
var _mordrax$cotwelm$Main$SplashMsg = function (a) {
	return {ctor: 'SplashMsg', _0: a};
};
var _mordrax$cotwelm$Main$view = function (model) {
	var _p3 = model.currentPage;
	switch (_p3.ctor) {
		case 'CharCreationPage':
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html_App$map,
						_mordrax$cotwelm$Main$CharCreationMsg,
						_mordrax$cotwelm$CharCreation_CharCreation$view(model.character))
					]));
		case 'SplashPage':
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_elm_lang$html$Html_App$map, _mordrax$cotwelm$Main$SplashMsg, _mordrax$cotwelm$SplashView$view)
					]));
		case 'GamePage':
			var _p4 = model.game;
			if (_p4.ctor === 'Nothing') {
				return A2(
					_elm_lang$html$Html$h1,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text('There is no game state. A possible reason is that you have not created a character.')
						]));
			} else {
				return A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html_App$map,
							_mordrax$cotwelm$Main$GameMsg,
							_mordrax$cotwelm$Game_Game$view(_p4._0))
						]));
			}
		default:
			return A2(
				_elm_lang$html$Html$h1,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Page not implemented!')
					]));
	}
};
var _mordrax$cotwelm$Main$NotImplementedPage = {ctor: 'NotImplementedPage'};
var _mordrax$cotwelm$Main$update = F2(
	function (msg, model) {
		var _p5 = msg;
		switch (_p5.ctor) {
			case 'SplashMsg':
				if (_p5._0.ctor === 'NewGame') {
					return {
						ctor: '_Tuple2',
						_0: model,
						_1: _elm_lang$navigation$Navigation$newUrl('#/charCreation')
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{currentPage: _mordrax$cotwelm$Main$NotImplementedPage}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'CharCreationMsg':
				if (_p5._0.ctor === 'StartGame') {
					return {
						ctor: '_Tuple2',
						_0: model,
						_1: _elm_lang$navigation$Navigation$newUrl('#/game')
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								character: A2(_mordrax$cotwelm$CharCreation_CharCreation$update, _p5._0, model.character)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'GameMsg':
				var _p6 = model.game;
				if (_p6.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				} else {
					var _p7 = A2(_mordrax$cotwelm$Game_Game$update, _p5._0, _p6._0);
					var game$ = _p7._0;
					var cmd = _p7._1;
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								game: _elm_lang$core$Maybe$Just(game$)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			default:
				var _p8 = _mordrax$cotwelm$Game_Game$initGame(_p5._0);
				var game = _p8._0;
				var gameCmds = _p8._1;
				var mainCmds = A2(
					_elm_lang$core$Platform_Cmd$map,
					function (x) {
						return _mordrax$cotwelm$Main$GameMsg(x);
					},
					gameCmds);
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							game: _elm_lang$core$Maybe$Just(game)
						}),
					_1: mainCmds
				};
		}
	});
var _mordrax$cotwelm$Main$ShopPage = {ctor: 'ShopPage'};
var _mordrax$cotwelm$Main$GamePage = {ctor: 'GamePage'};
var _mordrax$cotwelm$Main$CharCreationPage = {ctor: 'CharCreationPage'};
var _mordrax$cotwelm$Main$SplashPage = {ctor: 'SplashPage'};
var _mordrax$cotwelm$Main$urlUpdate = F2(
	function (url, model) {
		return _elm_lang$core$Native_Utils.eq(url, 'charCreation') ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$Main$CharCreationPage}),
			_1: _elm_lang$core$Platform_Cmd$none
		} : (_elm_lang$core$Native_Utils.eq(url, 'game') ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$Main$GamePage}),
			_1: _elm_lang$core$Platform_Cmd$none
		} : (_elm_lang$core$Native_Utils.eq(url, 'inventory') ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$Main$GamePage}),
			_1: _elm_lang$core$Platform_Cmd$none
		} : {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$Main$SplashPage}),
			_1: _elm_lang$core$Platform_Cmd$none
		}));
	});
var _mordrax$cotwelm$Main$initModel = function (url) {
	var model = {currentPage: _mordrax$cotwelm$Main$GamePage, character: _mordrax$cotwelm$CharCreation_CharCreation$initChar, game: _elm_lang$core$Maybe$Nothing};
	var _p9 = A2(_mordrax$cotwelm$Main$urlUpdate, url, model);
	var modelWithUrl = _p9._0;
	var urlCmds = _p9._1;
	return {
		ctor: '_Tuple2',
		_0: modelWithUrl,
		_1: _elm_lang$core$Platform_Cmd$batch(
			_elm_lang$core$Native_List.fromArray(
				[urlCmds, _mordrax$cotwelm$Main$getSeed]))
	};
};
var _mordrax$cotwelm$Main$main = {
	main: A2(
		_jinjor$elm_time_travel$TimeTravel_Navigation$program,
		_mordrax$cotwelm$Main$urlParser,
		{init: _mordrax$cotwelm$Main$initModel, update: _mordrax$cotwelm$Main$update, view: _mordrax$cotwelm$Main$view, urlUpdate: _mordrax$cotwelm$Main$urlUpdate, subscriptions: _mordrax$cotwelm$Main$subscriptions})
};

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
_elm_lang$core$Native_Platform.addPublicModule(Elm['Main'], 'Main', typeof _mordrax$cotwelm$Main$main === 'undefined' ? null : _mordrax$cotwelm$Main$main);

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

