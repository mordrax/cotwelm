
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
		node: null
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
	var eventNode = { tagger: tagger, parent: null };

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
		domNode: null,
		eventNode: null
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
		patches.push(makePatch('p-remove', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-insert', rootIndex, bChildren.slice(aLen)));
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

		case 'p-remove':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-insert':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
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

	programWithFlags: programWithFlags
};

}();
var _elm_lang$virtual_dom$VirtualDom$programWithFlags = _elm_lang$virtual_dom$Native_VirtualDom.programWithFlags;
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
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'draggable', value);
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
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'maxLength',
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
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'colSpan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'rowSpan',
		_elm_lang$core$Basics$toString(n));
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
				_elm_lang$html$Html_Attributes$class('ui middle aligned center aligned grid fullscreen'),
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

var _mordrax$cotwelm$Utils_Vector$boxIntersect = F2(
	function (target, _p0) {
		var _p1 = _p0;
		var _p3 = _p1._0;
		var _p2 = _p1._1;
		var isWithinY = (_elm_lang$core$Native_Utils.cmp(target.y, _p3.y) > -1) && (_elm_lang$core$Native_Utils.cmp(target.y, _p2.y) < 1);
		var isWithinX = (_elm_lang$core$Native_Utils.cmp(target.x, _p3.x) > -1) && (_elm_lang$core$Native_Utils.cmp(target.x, _p2.x) < 1);
		return isWithinX && isWithinY;
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

var _mordrax$cotwelm$Hero$pos = function (_p0) {
	var _p1 = _p0;
	return _p1._0.pos;
};
var _mordrax$cotwelm$Hero$Model = F2(
	function (a, b) {
		return {name: a, pos: b};
	});
var _mordrax$cotwelm$Hero$Hero = function (a) {
	return {ctor: 'Hero', _0: a};
};
var _mordrax$cotwelm$Hero$init = _mordrax$cotwelm$Hero$Hero(
	{
		name: 'Bob the Brave',
		pos: {x: 11, y: 17}
	});
var _mordrax$cotwelm$Hero$update = F2(
	function (msg, _p2) {
		var _p3 = _p2;
		var _p5 = _p3._0;
		var _p4 = msg;
		if (_p4.ctor === 'Move') {
			return _mordrax$cotwelm$Hero$Hero(
				_elm_lang$core$Native_Utils.update(
					_p5,
					{
						pos: A2(_mordrax$cotwelm$Utils_Vector$add, _p4._0, _p5.pos)
					}));
		} else {
			return _mordrax$cotwelm$Hero$Hero(
				_elm_lang$core$Native_Utils.update(
					_p5,
					{pos: _p4._0}));
		}
	});
var _mordrax$cotwelm$Hero$Teleport = function (a) {
	return {ctor: 'Teleport', _0: a};
};
var _mordrax$cotwelm$Hero$Move = function (a) {
	return {ctor: 'Move', _0: a};
};

var _mordrax$cotwelm$GameData_Types$DungeonLevel = function (a) {
	return {ctor: 'DungeonLevel', _0: a};
};
var _mordrax$cotwelm$GameData_Types$DungeonLevelOne = {ctor: 'DungeonLevelOne'};
var _mordrax$cotwelm$GameData_Types$Farm = {ctor: 'Farm'};
var _mordrax$cotwelm$GameData_Types$Village = {ctor: 'Village'};

var _mordrax$cotwelm$GameData_Building$Building = F6(
	function (a, b, c, d, e, f) {
		return {tile: a, entry: b, pos: c, name: d, size: e, link: f};
	});
var _mordrax$cotwelm$GameData_Building$Link = F2(
	function (a, b) {
		return {area: a, pos: b};
	});
var _mordrax$cotwelm$GameData_Building$MineEntrance = {ctor: 'MineEntrance'};
var _mordrax$cotwelm$GameData_Building$HutTemple_NF = {ctor: 'HutTemple_NF'};
var _mordrax$cotwelm$GameData_Building$BurntStrawHouse_WF = {ctor: 'BurntStrawHouse_WF'};
var _mordrax$cotwelm$GameData_Building$StrawHouse_WF = {ctor: 'StrawHouse_WF'};
var _mordrax$cotwelm$GameData_Building$StrawHouse_EF = {ctor: 'StrawHouse_EF'};
var _mordrax$cotwelm$GameData_Building$Hut_EF = {ctor: 'Hut_EF'};
var _mordrax$cotwelm$GameData_Building$Gate_NS = {ctor: 'Gate_NS'};
var _mordrax$cotwelm$GameData_Building$newWithLink = F4(
	function (buildingType, pos, name, link) {
		var partBuilding = {
			name: name,
			pos: pos,
			link: link,
			tile: _mordrax$cotwelm$GameData_Building$Gate_NS,
			size: A2(_mordrax$cotwelm$Utils_Vector$new, 0, 0),
			entry: A2(_mordrax$cotwelm$Utils_Vector$new, 0, 0)
		};
		var _p0 = buildingType;
		switch (_p0.ctor) {
			case 'Gate_NS':
				return _elm_lang$core$Native_Utils.update(
					partBuilding,
					{
						tile: _mordrax$cotwelm$GameData_Building$Gate_NS,
						size: A2(_mordrax$cotwelm$Utils_Vector$new, 3, 1),
						entry: A2(_mordrax$cotwelm$Utils_Vector$new, 1, 0)
					});
			case 'Hut_EF':
				return _elm_lang$core$Native_Utils.update(
					partBuilding,
					{
						tile: _mordrax$cotwelm$GameData_Building$Hut_EF,
						size: A2(_mordrax$cotwelm$Utils_Vector$new, 3, 3),
						entry: A2(_mordrax$cotwelm$Utils_Vector$new, 2, 1)
					});
			case 'StrawHouse_EF':
				return _elm_lang$core$Native_Utils.update(
					partBuilding,
					{
						tile: _mordrax$cotwelm$GameData_Building$StrawHouse_EF,
						size: A2(_mordrax$cotwelm$Utils_Vector$new, 3, 3),
						entry: A2(_mordrax$cotwelm$Utils_Vector$new, 2, 1)
					});
			case 'StrawHouse_WF':
				return _elm_lang$core$Native_Utils.update(
					partBuilding,
					{
						tile: _mordrax$cotwelm$GameData_Building$StrawHouse_WF,
						size: A2(_mordrax$cotwelm$Utils_Vector$new, 3, 3),
						entry: A2(_mordrax$cotwelm$Utils_Vector$new, 0, 1)
					});
			case 'BurntStrawHouse_WF':
				return _elm_lang$core$Native_Utils.update(
					partBuilding,
					{
						tile: _mordrax$cotwelm$GameData_Building$BurntStrawHouse_WF,
						size: A2(_mordrax$cotwelm$Utils_Vector$new, 3, 3),
						entry: A2(_mordrax$cotwelm$Utils_Vector$new, 0, 1)
					});
			case 'HutTemple_NF':
				return _elm_lang$core$Native_Utils.update(
					partBuilding,
					{
						tile: _mordrax$cotwelm$GameData_Building$HutTemple_NF,
						size: A2(_mordrax$cotwelm$Utils_Vector$new, 5, 6),
						entry: A2(_mordrax$cotwelm$Utils_Vector$new, 2, 0)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					partBuilding,
					{
						tile: _mordrax$cotwelm$GameData_Building$MineEntrance,
						size: A2(_mordrax$cotwelm$Utils_Vector$new, 1, 1),
						entry: A2(_mordrax$cotwelm$Utils_Vector$new, 0, 0)
					});
		}
	});
var _mordrax$cotwelm$GameData_Building$new = F3(
	function (buildingType, pos, name) {
		return A4(_mordrax$cotwelm$GameData_Building$newWithLink, buildingType, pos, name, _elm_lang$core$Maybe$Nothing);
	});

var _mordrax$cotwelm$GameData_ASCIIMaps$dungeonLevelOneMap = _elm_lang$core$Native_List.fromArray(
	['^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^dooo^^ood^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^doooooddooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^doddoooooooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^dod^^oooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^od^^^oooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^o^^^^dooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^o^^^^^dod^dod^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^dood^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^ooood^^^^^o^^^^^^^^^^doood^^^', '^^^^^^^^^^^^oooooo^^^^o^^^^^^^^^^ooooo^^^', '^^^^^^^^^^^^dooooo^^^^o^^^^^^^^^^ooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^^^^^^dooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^^dooooooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^dod^^^doooo^^^', '^^^^^^^^^^^^^od^^^^^^^od^^dod^^^^^^^oo^^^', '^^^^^^^^^^^^^dod^^^^^^doddod^^^^^^^ood^^^', '^^^^^^^^^^^^^^dod^^^^^^dood^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^do^^^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^od^^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^dod^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^dod^^^do^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^dod^^od^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^doddo^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^dood^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^']);
var _mordrax$cotwelm$GameData_ASCIIMaps$farmMap = _elm_lang$core$Native_List.fromArray(
	['^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^#^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^.,,,^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^,,.,,,,,^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^,,,,,,,.,,,,,,^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^,,,,,,,,.,,,,,,,,,^^^^^^^^^^^^^^^', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', '.................................................', '.................................................', ',,,,,,,,,,,,,,,,,,,,,,,..;,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,###,,=', ',,,,,,,,,,,,,,,,;..........................###,,=', ',,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,###,,=', ',,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=======', ',,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,.,,,,,=======,,,,,,,,,,,,,,,,,,=======', '========,,###,,,,=======,,,,,,,,,,,,,,,,,,,,,,,,,']);
var _mordrax$cotwelm$GameData_ASCIIMaps$villageMap = _elm_lang$core$Native_List.fromArray(
	['========,,###,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '===,,,,,;...,,,!###=====', '===###!;.;,.,,;.###=====', '===###..;,,.,;.;###=====', '===###,,,,,...;,,,,,,===', '===,,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,!###,,,,===', '====,,,##.....###,,,,===', '====,,,##!,.,,###,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,###!...!###,======', '====,,###..e..###,======', '====,,###,...,###,======', '====,,,,,,,.,,,,,,======', '====,,,,,,,.!,,,,,======', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '========================']);

var _mordrax$cotwelm$GameData_Tile$Tile = F4(
	function (a, b, c, d) {
		return {solid: a, tile: b, pos: c, building: d};
	});
var _mordrax$cotwelm$GameData_Tile$TreasurePile = {ctor: 'TreasurePile'};
var _mordrax$cotwelm$GameData_Tile$Well = {ctor: 'Well'};
var _mordrax$cotwelm$GameData_Tile$Crop = {ctor: 'Crop'};
var _mordrax$cotwelm$GameData_Tile$White90Cave10 = {ctor: 'White90Cave10'};
var _mordrax$cotwelm$GameData_Tile$White50Cave50 = {ctor: 'White50Cave50'};
var _mordrax$cotwelm$GameData_Tile$Grass10Cave90 = {ctor: 'Grass10Cave90'};
var _mordrax$cotwelm$GameData_Tile$Grass50Cave50 = {ctor: 'Grass50Cave50'};
var _mordrax$cotwelm$GameData_Tile$WallLitDgn = {ctor: 'WallLitDgn'};
var _mordrax$cotwelm$GameData_Tile$WaterPath = {ctor: 'WaterPath'};
var _mordrax$cotwelm$GameData_Tile$WaterGrass = {ctor: 'WaterGrass'};
var _mordrax$cotwelm$GameData_Tile$WallDarkDgn = {ctor: 'WallDarkDgn'};
var _mordrax$cotwelm$GameData_Tile$PathGrass = {ctor: 'PathGrass'};
var _mordrax$cotwelm$GameData_Tile$PathRock = {ctor: 'PathRock'};
var _mordrax$cotwelm$GameData_Tile$LitDgn = {ctor: 'LitDgn'};
var _mordrax$cotwelm$GameData_Tile$Path = {ctor: 'Path'};
var _mordrax$cotwelm$GameData_Tile$Water = {ctor: 'Water'};
var _mordrax$cotwelm$GameData_Tile$DarkDgn = {ctor: 'DarkDgn'};
var _mordrax$cotwelm$GameData_Tile$Grass = {ctor: 'Grass'};
var _mordrax$cotwelm$GameData_Tile$Rock = {ctor: 'Rock'};
var _mordrax$cotwelm$GameData_Tile$asciiTileData = function ($char) {
	var _p0 = $char;
	switch (_p0.valueOf()) {
		case '^':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Rock, _1: true};
		case ',':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Grass, _1: false};
		case 'o':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$DarkDgn, _1: false};
		case '~':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Water, _1: false};
		case '.':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Path, _1: false};
		case 'O':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$LitDgn, _1: false};
		case '_':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$PathRock, _1: false};
		case ';':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$PathGrass, _1: false};
		case 'd':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$WallDarkDgn, _1: false};
		case 'w':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$WaterGrass, _1: false};
		case 'W':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$WaterPath, _1: false};
		case 'D':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$WallLitDgn, _1: false};
		case 'g':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Grass50Cave50, _1: false};
		case 'G':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Grass10Cave90, _1: true};
		case 'c':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$White50Cave50, _1: true};
		case 'C':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$White90Cave10, _1: false};
		case '=':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Crop, _1: true};
		case 'e':
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Well, _1: true};
		default:
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$GameData_Tile$Grass, _1: false};
	}
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

var _mordrax$cotwelm$Game_Maps$toTile = F3(
	function (y, x, asciiTile) {
		var _p0 = _mordrax$cotwelm$GameData_Tile$asciiTileData(asciiTile);
		var tileType = _p0._0;
		var solid = _p0._1;
		var pos = {x: x, y: y};
		return {pos: pos, tile: tileType, solid: solid, building: _elm_lang$core$Maybe$Nothing};
	});
var _mordrax$cotwelm$Game_Maps$toTiles = F2(
	function (y, asciiTiles) {
		return A2(
			_elm_lang$core$List$indexedMap,
			_mordrax$cotwelm$Game_Maps$toTile(y),
			asciiTiles);
	});
var _mordrax$cotwelm$Game_Maps$mapOneRowToTiles = F2(
	function (y, asciiRow) {
		var asciiChars = _elm_lang$core$String$toList(asciiRow);
		return A2(_mordrax$cotwelm$Game_Maps$toTiles, y, asciiChars);
	});
var _mordrax$cotwelm$Game_Maps$mapToTiles = function (asciiMap) {
	var tiles = A2(_elm_lang$core$List$indexedMap, _mordrax$cotwelm$Game_Maps$mapOneRowToTiles, asciiMap);
	return _elm_lang$core$List$concat(tiles);
};
var _mordrax$cotwelm$Game_Maps$buildingToHtml = function (building) {
	var posStyle = _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(building.pos);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'tile ',
					_elm_lang$core$Basics$toString(building.tile))),
				posStyle
			]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _mordrax$cotwelm$Game_Maps$tileToHtml = function (tile) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'tile ',
					_elm_lang$core$Basics$toString(tile.tile))),
				_mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(tile.pos)
			]),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _mordrax$cotwelm$Game_Maps$dungeonLevelOneBuildings = function () {
	var mineEntrance = {
		area: _mordrax$cotwelm$GameData_Types$Farm,
		pos: A2(_mordrax$cotwelm$Utils_Vector$new, 24, 2)
	};
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$newWithLink,
			_mordrax$cotwelm$GameData_Building$MineEntrance,
			A2(_mordrax$cotwelm$Utils_Vector$new, 22, 40),
			'Mine Exit',
			_elm_lang$core$Maybe$Just(mineEntrance))
		]);
}();
var _mordrax$cotwelm$Game_Maps$farmBuildings = function () {
	var mineExit = {
		area: _mordrax$cotwelm$GameData_Types$DungeonLevelOne,
		pos: A2(_mordrax$cotwelm$Utils_Vector$new, 22, 39)
	};
	var villageGate = {
		area: _mordrax$cotwelm$GameData_Types$Village,
		pos: A2(_mordrax$cotwelm$Utils_Vector$new, 11, 1)
	};
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$newWithLink,
			_mordrax$cotwelm$GameData_Building$Gate_NS,
			A2(_mordrax$cotwelm$Utils_Vector$new, 10, 32),
			'Farm Gate',
			_elm_lang$core$Maybe$Just(villageGate)),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 43, 23),
			'Adopted Parents House'),
			A4(
			_mordrax$cotwelm$GameData_Building$newWithLink,
			_mordrax$cotwelm$GameData_Building$MineEntrance,
			A2(_mordrax$cotwelm$Utils_Vector$new, 24, 1),
			'Mine Entrance',
			_elm_lang$core$Maybe$Just(mineExit))
		]);
}();
var _mordrax$cotwelm$Game_Maps$villageBuildings = function () {
	var farmGate = {
		area: _mordrax$cotwelm$GameData_Types$Farm,
		pos: A2(_mordrax$cotwelm$Utils_Vector$new, 11, 31)
	};
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$newWithLink,
			_mordrax$cotwelm$GameData_Building$Gate_NS,
			A2(_mordrax$cotwelm$Utils_Vector$new, 10, 0),
			'Village Gate',
			_elm_lang$core$Maybe$Just(farmGate)),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_EF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 3, 6),
			'Junk Shop'),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 16, 5),
			'Private House'),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$Hut_EF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 7, 13),
			'Potion Store'),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 14, 12),
			'Private House 2'),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_EF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 6, 17),
			'Weapon Shop'),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 14, 17),
			'General Store'),
			A3(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$HutTemple_NF,
			A2(_mordrax$cotwelm$Utils_Vector$new, 9, 22),
			'Odin\'s Temple')
		]);
}();
var _mordrax$cotwelm$Game_Maps$getASCIIMap = function (area) {
	var _p1 = area;
	switch (_p1.ctor) {
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
var _mordrax$cotwelm$Game_Maps$getBuildings = F2(
	function (area, model) {
		var maybeBuildings = A2(
			_elm_lang$core$Dict$get,
			_elm_lang$core$Basics$toString(area),
			model.buildings);
		var _p2 = maybeBuildings;
		if (_p2.ctor === 'Just') {
			return _p2._0;
		} else {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		}
	});
var _mordrax$cotwelm$Game_Maps$getMap = F2(
	function (area, model) {
		var maybeMap = A2(
			_elm_lang$core$Dict$get,
			_elm_lang$core$Basics$toString(area),
			model.maps);
		var _p3 = maybeMap;
		if (_p3.ctor === 'Just') {
			return _p3._0;
		} else {
			return _elm_lang$core$Dict$empty;
		}
	});
var _mordrax$cotwelm$Game_Maps$mapToHtml = F2(
	function (area, model) {
		var buildingsHtml = A2(
			_elm_lang$core$List$map,
			_mordrax$cotwelm$Game_Maps$buildingToHtml,
			A2(_mordrax$cotwelm$Game_Maps$getBuildings, area, model));
		var listOfTiles = A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Basics$snd,
			_elm_lang$core$Dict$toList(
				A2(_mordrax$cotwelm$Game_Maps$getMap, area, model)));
		var tilesHtml = A2(_elm_lang$core$List$map, _mordrax$cotwelm$Game_Maps$tileToHtml, listOfTiles);
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			A2(_elm_lang$core$Basics_ops['++'], tilesHtml, buildingsHtml));
	});
var _mordrax$cotwelm$Game_Maps$view = function (model) {
	return A2(_mordrax$cotwelm$Game_Maps$mapToHtml, model.currentArea, model);
};
var _mordrax$cotwelm$Game_Maps$updateArea = F2(
	function (area, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{currentArea: area});
	});
var _mordrax$cotwelm$Game_Maps$initMaps = function () {
	var toKVPair = function (tile) {
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Basics$toString(tile.pos),
			_1: tile
		};
	};
	var getTiles = function (area) {
		return _mordrax$cotwelm$Game_Maps$mapToTiles(
			_mordrax$cotwelm$Game_Maps$getASCIIMap(area));
	};
	var tilesToTuples = function (area) {
		return A2(
			_elm_lang$core$List$map,
			toKVPair,
			getTiles(area));
	};
	return {
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
	};
}();
var _mordrax$cotwelm$Game_Maps$Model = F3(
	function (a, b, c) {
		return {currentArea: a, maps: b, buildings: c};
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
var _mordrax$cotwelm$Item_Data$WeaponModel = function (a) {
	return {$class: a};
};
var _mordrax$cotwelm$Item_Data$ArmourModel = function (a) {
	return {ac: a};
};
var _mordrax$cotwelm$Item_Data$BeltModel = F5(
	function (a, b, c, d, e) {
		return {slot: a, scroll: b, wand: c, potion: d, container: e};
	});
var _mordrax$cotwelm$Item_Data$PackModel = function (a) {
	return {container: a};
};

var _mordrax$cotwelm$Item_Weapon$WeaponModelTag = F3(
	function (a, b, c) {
		return {ctor: 'WeaponModelTag', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Weapon$newWeapon = F4(
	function (weaponType, id, status, idStatus) {
		var _p0 = weaponType;
		switch (_p0.ctor) {
			case 'BrokenSword':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$BrokenSword,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Broken Sword',
						1000,
						5000,
						'BrokenSword',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25)),
					_mordrax$cotwelm$Item_Data$WeaponModel(0));
			case 'Club':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Club,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Club',
						1500,
						3000,
						'Club',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 105, 60)),
					_mordrax$cotwelm$Item_Data$WeaponModel(1));
			case 'Dagger':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Dagger,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Dagger',
						500,
						500,
						'Sword',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 420, 240)),
					_mordrax$cotwelm$Item_Data$WeaponModel(2));
			case 'Hammer':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Hammer,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Hammer',
						2000,
						3000,
						'Hammer',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 420, 240)),
					_mordrax$cotwelm$Item_Data$WeaponModel(2));
			case 'HandAxe':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$HandAxe,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Hand Axe',
						1000,
						3000,
						'Axe',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 472, 270)),
					_mordrax$cotwelm$Item_Data$WeaponModel(3));
			case 'Quarterstaff':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Quarterstaff,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Quarterstaff',
						750,
						5000,
						'Spear',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 648, 360)),
					_mordrax$cotwelm$Item_Data$WeaponModel(3));
			case 'Spear':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Spear,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Spear',
						1500,
						5000,
						'Spear',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 840, 480)),
					_mordrax$cotwelm$Item_Data$WeaponModel(4));
			case 'ShortSword':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$ShortSword,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Short Sword',
						1000,
						5000,
						'Sword',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1470, 840)),
					_mordrax$cotwelm$Item_Data$WeaponModel(5));
			case 'Mace':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Mace,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Mace',
						2500,
						4375,
						'Mace',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1728, 960)),
					_mordrax$cotwelm$Item_Data$WeaponModel(5));
			case 'Flail':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Flail,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Flail',
						2000,
						3250,
						'Flail',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1512, 840)),
					_mordrax$cotwelm$Item_Data$WeaponModel(6));
			case 'Axe':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$Axe,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Axe',
						2000,
						5000,
						'Axe',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1944, 1080)),
					_mordrax$cotwelm$Item_Data$WeaponModel(6));
			case 'WarHammer':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$WarHammer,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'War Hammer',
						1400,
						7500,
						'Hammer',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 2160, 1200)),
					_mordrax$cotwelm$Item_Data$WeaponModel(7));
			case 'LongSword':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$LongSword,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Long Sword',
						1500,
						8000,
						'Sword',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800)),
					_mordrax$cotwelm$Item_Data$WeaponModel(8));
			case 'BattleAxe':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$BattleAxe,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Battle Axe',
						3000,
						6000,
						'Axe',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 2160, 1200)),
					_mordrax$cotwelm$Item_Data$WeaponModel(8));
			case 'BroadSword':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$BroadSword,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Broad Sword',
						1600,
						9000,
						'Sword',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800)),
					_mordrax$cotwelm$Item_Data$WeaponModel(9));
			case 'MorningStar':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$MorningStar,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Morning Star',
						3000,
						9000,
						'MorningStar',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 2160, 1200)),
					_mordrax$cotwelm$Item_Data$WeaponModel(10));
			case 'BastardSword':
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$BastardSword,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Bastard Sword',
						3000,
						10000,
						'Sword',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 4320, 2400)),
					_mordrax$cotwelm$Item_Data$WeaponModel(11));
			default:
				return A3(
					_mordrax$cotwelm$Item_Weapon$WeaponModelTag,
					_mordrax$cotwelm$Item_TypeDef$TwoHandedSword,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Two Handed Sword',
						5000,
						12000,
						'Sword',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 6360, 3600)),
					_mordrax$cotwelm$Item_Data$WeaponModel(12));
		}
	});

var _mordrax$cotwelm$Item_Armour$ArmourModelTag = F3(
	function (a, b, c) {
		return {ctor: 'ArmourModelTag', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Armour$newArmour = F4(
	function (armourType, id, status, idStatus) {
		var _p0 = armourType;
		switch (_p0.ctor) {
			case 'RustyArmour':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$RustyArmour,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Rusty Armour',
						10000,
						30000,
						'BrokenArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25)),
					_mordrax$cotwelm$Item_Data$ArmourModel(0));
			case 'LeatherArmour':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$LeatherArmour,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Leather Armour',
						5000,
						2400,
						'LeatherArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1080, 600)),
					_mordrax$cotwelm$Item_Data$ArmourModel(6));
			case 'StuddedLeatherArmour':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$StuddedLeatherArmour,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Studded Leather Armour',
						7000,
						25000,
						'LeatherArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3150, 1800)),
					_mordrax$cotwelm$Item_Data$ArmourModel(12));
			case 'RingMail':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$RingMail,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Ring Mail',
						8000,
						30000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 6300, 3600)),
					_mordrax$cotwelm$Item_Data$ArmourModel(18));
			case 'ScaleMail':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$ScaleMail,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Scale Mail',
						9000,
						30000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 10800, 6000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(24));
			case 'ChainMail':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$ChainMail,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Chain Mail',
						10000,
						30000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 16200, 9000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(30));
			case 'SplintMail':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$SplintMail,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Splint Mail',
						12000,
						40000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 27000, 15000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(36));
			case 'PlateMail':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$PlateMail,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Plate Mail',
						15000,
						40000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 42000, 24000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(42));
			case 'PlateArmour':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$PlateArmour,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Plate Armour',
						15000,
						60000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 42000, 24000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(48));
			case 'MeteoricSteelPlate':
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$MeteoricSteelPlate,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Meteoric Steel Plate',
						5000,
						30000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 105000, 60000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(54));
			default:
				return A3(
					_mordrax$cotwelm$Item_Armour$ArmourModelTag,
					_mordrax$cotwelm$Item_TypeDef$ElvenChainMail,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Elven Chain Mail',
						50000,
						24000,
						'MetalArmour',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 162000, 90000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(52));
		}
	});

var _mordrax$cotwelm$Item_Shield$ShieldModelTag = F3(
	function (a, b, c) {
		return {ctor: 'ShieldModelTag', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Shield$newShield = F4(
	function (shieldType, id, status, idStatus) {
		var _p0 = shieldType;
		switch (_p0.ctor) {
			case 'BrokenShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$BrokenShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Broken Shield',
						4000,
						35000,
						'BrokenShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25)),
					_mordrax$cotwelm$Item_Data$ArmourModel(0));
			case 'SmallWoodenShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$SmallWoodenShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Small Wooden Shield',
						3000,
						15000,
						'WoodShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 525, 300)),
					_mordrax$cotwelm$Item_Data$ArmourModel(3));
			case 'MediumWoodenShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$MediumWoodenShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Medium Wooden Shield',
						4000,
						35000,
						'WoodShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1050, 600)),
					_mordrax$cotwelm$Item_Data$ArmourModel(6));
			case 'LargeWoodenShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$LargeWoodenShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Large Wooden Shield',
						5000,
						50000,
						'WoodShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 2100, 1200)),
					_mordrax$cotwelm$Item_Data$ArmourModel(9));
			case 'SmallIronShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$SmallIronShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Small Iron Shield',
						4000,
						15000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1260, 720)),
					_mordrax$cotwelm$Item_Data$ArmourModel(6));
			case 'MediumIronShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$MediumIronShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Medium Iron Shield',
						5000,
						35000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 2592, 1440)),
					_mordrax$cotwelm$Item_Data$ArmourModel(9));
			case 'LargeIronShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$LargeIronShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Large Iron Shield',
						6000,
						50000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3150, 1800)),
					_mordrax$cotwelm$Item_Data$ArmourModel(12));
			case 'SmallSteelShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$SmallSteelShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Small Steel Shield',
						4000,
						15000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 2730, 1560)),
					_mordrax$cotwelm$Item_Data$ArmourModel(9));
			case 'MediumSteelShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$MediumSteelShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Medium Steel Shield',
						5000,
						35000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3360, 1920)),
					_mordrax$cotwelm$Item_Data$ArmourModel(12));
			case 'LargeSteelShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$LargeSteelShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Large Steel Shield',
						6000,
						50000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 4200, 2400)),
					_mordrax$cotwelm$Item_Data$ArmourModel(15));
			case 'SmallMeteoricSteelShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$SmallMeteoricSteelShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Small Meteoric Steel Shield',
						2500,
						10000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 4620, 2640)),
					_mordrax$cotwelm$Item_Data$ArmourModel(15));
			case 'MediumMeteoricSteelShield':
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$MediumMeteoricSteelShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Medium Meteoric Steel Shield',
						3500,
						25000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 5940, 3300)),
					_mordrax$cotwelm$Item_Data$ArmourModel(18));
			default:
				return A3(
					_mordrax$cotwelm$Item_Shield$ShieldModelTag,
					_mordrax$cotwelm$Item_TypeDef$LargeMeteoricSteelShield,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Large Meteoric Steel Shield',
						4500,
						35000,
						'MetalShield',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 7560, 4200)),
					_mordrax$cotwelm$Item_Data$ArmourModel(21));
		}
	});

var _mordrax$cotwelm$Item_Helmet$HelmetModelTag = F3(
	function (a, b, c) {
		return {ctor: 'HelmetModelTag', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Helmet$newHelmet = F4(
	function (helmetType, id, status, idStatus) {
		var _p0 = helmetType;
		switch (_p0.ctor) {
			case 'BrokenHelmet':
				return A3(
					_mordrax$cotwelm$Item_Helmet$HelmetModelTag,
					_mordrax$cotwelm$Item_TypeDef$BrokenHelmet,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Broken Helmet',
						1000,
						1000,
						'BrokenHelmet',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 25)),
					_mordrax$cotwelm$Item_Data$ArmourModel(0));
			case 'LeatherHelmet':
				return A3(
					_mordrax$cotwelm$Item_Helmet$HelmetModelTag,
					_mordrax$cotwelm$Item_TypeDef$LeatherHelmet,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Leather Helmet',
						500,
						500,
						'LeatherHelmet',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 525, 300)),
					_mordrax$cotwelm$Item_Data$ArmourModel(3));
			case 'IronHelmet':
				return A3(
					_mordrax$cotwelm$Item_Helmet$HelmetModelTag,
					_mordrax$cotwelm$Item_TypeDef$IronHelmet,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Iron Helmet',
						2000,
						2000,
						'MetalHelmet',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1050, 600)),
					_mordrax$cotwelm$Item_Data$ArmourModel(6));
			case 'SteelHelmet':
				return A3(
					_mordrax$cotwelm$Item_Helmet$HelmetModelTag,
					_mordrax$cotwelm$Item_TypeDef$SteelHelmet,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Steel Helmet',
						2500,
						2000,
						'MetalHelmet',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3150, 1800)),
					_mordrax$cotwelm$Item_Data$ArmourModel(9));
			case 'MeteoricSteelHelmet':
				return A3(
					_mordrax$cotwelm$Item_Helmet$HelmetModelTag,
					_mordrax$cotwelm$Item_TypeDef$MeteoricSteelHelmet,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Meteoric Steel Helmet',
						1000,
						2000,
						'MetalHelmet',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 10500, 6000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(15));
			case 'HelmetOfDetectMonsters':
				return A3(
					_mordrax$cotwelm$Item_Helmet$HelmetModelTag,
					_mordrax$cotwelm$Item_TypeDef$HelmetOfDetectMonsters,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Helmet Of Detect Monsters',
						2500,
						2000,
						'HelmetOfDetectMonsters',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 42000, 24000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(9));
			default:
				return A3(
					_mordrax$cotwelm$Item_Helmet$HelmetModelTag,
					_mordrax$cotwelm$Item_TypeDef$EnchantedHelmOfStorms,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Enchanted Helm Of Storms',
						1000,
						2000,
						'EnchantedHelmOfStorms',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1050000, 600000)),
					_mordrax$cotwelm$Item_Data$ArmourModel(25));
		}
	});

var _mordrax$cotwelm$Item_Bracers$BracersModelTag = F3(
	function (a, b, c) {
		return {ctor: 'BracersModelTag', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Bracers$newBracers = F4(
	function (bracersType, id, status, idStatus) {
		var _p0 = bracersType;
		switch (_p0.ctor) {
			case 'NormalBracers':
				return A3(
					_mordrax$cotwelm$Item_Bracers$BracersModelTag,
					_mordrax$cotwelm$Item_TypeDef$NormalBracers,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Bracers',
						500,
						2000,
						'Bracers',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 108, 60)),
					_mordrax$cotwelm$Item_Data$ArmourModel(3));
			case 'BracersOfDefenseNormal':
				return A3(
					_mordrax$cotwelm$Item_Bracers$BracersModelTag,
					_mordrax$cotwelm$Item_TypeDef$BracersOfDefenseNormal,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Bracers Of Defense Normal',
						500,
						2000,
						'BracersEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 1836, 1020)),
					_mordrax$cotwelm$Item_Data$ArmourModel(8));
			case 'BracersOfDefenseS':
				return A3(
					_mordrax$cotwelm$Item_Bracers$BracersModelTag,
					_mordrax$cotwelm$Item_TypeDef$BracersOfDefenseS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Bracers Of Defense Strong',
						500,
						2000,
						'BracersEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 5616, 3120)),
					_mordrax$cotwelm$Item_Data$ArmourModel(13));
			default:
				return A3(
					_mordrax$cotwelm$Item_Bracers$BracersModelTag,
					_mordrax$cotwelm$Item_TypeDef$BracersOfDefenseVS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Bracers Of Defense Very Strong',
						500,
						2000,
						'BracersEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 11556, 6420)),
					_mordrax$cotwelm$Item_Data$ArmourModel(18));
		}
	});

var _mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag = F3(
	function (a, b, c) {
		return {ctor: 'GauntletsModelTag', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Item_Gauntlets$newGauntlets = F4(
	function (gauntletType, id, status, idStatus) {
		var _p0 = gauntletType;
		switch (_p0.ctor) {
			case 'NormalGauntlets':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$NormalGauntlets,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet',
						500,
						2000,
						'Gauntlet',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 105, 60)),
					_mordrax$cotwelm$Item_Data$ArmourModel(5));
			case 'GauntletOfProtection':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfProtection,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Protection',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 2625, 1500)),
					_mordrax$cotwelm$Item_Data$ArmourModel(10));
			case 'GauntletOfProtectionS':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfProtectionS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Protection Strong',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 6300, 3600)),
					_mordrax$cotwelm$Item_Data$ArmourModel(15));
			case 'GauntletOfProtectionVS':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfProtectionVS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Protection Very Strong',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 12420, 6900)),
					_mordrax$cotwelm$Item_Data$ArmourModel(20));
			case 'GauntletOfSlaying':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfSlaying,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Slaying',
						500,
						2000,
						'GauntletOfSlaying',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3780, 2100)),
					_mordrax$cotwelm$Item_Data$ArmourModel(0));
			case 'GauntletOfSlayingS_S':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfSlayingS_S,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Slaying Strong',
						500,
						2000,
						'GauntletOfSlaying',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 7560, 4200)),
					_mordrax$cotwelm$Item_Data$ArmourModel(0));
			case 'GauntletOfSlayingVS_VS':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfSlayingVS_VS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Slaying Very Strong',
						500,
						2000,
						'GauntletOfSlaying',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 13125, 7500)),
					_mordrax$cotwelm$Item_Data$ArmourModel(0));
			case 'GauntletOfDexterity':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfDexterity,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Dexterity',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800)),
					_mordrax$cotwelm$Item_Data$ArmourModel(5));
			case 'GauntletOfDexterityS':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfDexterityS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Dexterity Strong',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 7020, 3900)),
					_mordrax$cotwelm$Item_Data$ArmourModel(5));
			case 'GauntletOfDexterityVS':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfDexterityVS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Dexterity Very Strong',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 12960, 7200)),
					_mordrax$cotwelm$Item_Data$ArmourModel(5));
			case 'GauntletOfStrength':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfStrength,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Strength',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 3240, 1800)),
					_mordrax$cotwelm$Item_Data$ArmourModel(5));
			case 'GauntletOfStrengthS':
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfStrengthS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Strength Strong',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)),
					_mordrax$cotwelm$Item_Data$ArmourModel(5));
			default:
				return A3(
					_mordrax$cotwelm$Item_Gauntlets$GauntletsModelTag,
					_mordrax$cotwelm$Item_TypeDef$GauntletOfStrengthVS,
					A8(
						_mordrax$cotwelm$Item_Data$Model,
						id,
						'Gauntlet Of Strength Very Strong',
						500,
						2000,
						'GauntletEnchanted',
						status,
						idStatus,
						A2(_mordrax$cotwelm$Utils_Mass$new, 12960, 7200)),
					_mordrax$cotwelm$Item_Data$ArmourModel(5));
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

var _mordrax$cotwelm$Item_Purse$getCoins = F2(
	function (coinType, _p0) {
		var _p1 = _p0;
		var _p3 = _p1._0;
		var _p2 = coinType;
		switch (_p2.ctor) {
			case 'Copper':
				return _p3.copper;
			case 'Silver':
				return _p3.silver;
			case 'Gold':
				return _p3.gold;
			default:
				return _p3.platinum;
		}
	});
var _mordrax$cotwelm$Item_Purse$Model = F4(
	function (a, b, c, d) {
		return {copper: a, silver: b, gold: c, platinum: d};
	});
var _mordrax$cotwelm$Item_Purse$purses = F3(
	function (op, p1, p2) {
		return A4(
			_mordrax$cotwelm$Item_Purse$Model,
			A2(op, p1.copper, p2.copper),
			A2(op, p1.silver, p2.silver),
			A2(op, p1.gold, p2.gold),
			A2(op, p1.platinum, p2.platinum));
	});
var _mordrax$cotwelm$Item_Purse$PurseModel = function (a) {
	return {ctor: 'PurseModel', _0: a};
};
var _mordrax$cotwelm$Item_Purse$new = _mordrax$cotwelm$Item_Purse$PurseModel(
	A4(_mordrax$cotwelm$Item_Purse$Model, 100, 10, 1, 0));
var _mordrax$cotwelm$Item_Purse$add = F2(
	function (copper, _p4) {
		var _p5 = _p4;
		return _mordrax$cotwelm$Item_Purse$PurseModel(_p5._0);
	});
var _mordrax$cotwelm$Item_Purse$merge = F2(
	function (_p7, _p6) {
		var _p8 = _p7;
		var _p9 = _p6;
		return _mordrax$cotwelm$Item_Purse$PurseModel(
			A3(
				_mordrax$cotwelm$Item_Purse$purses,
				F2(
					function (x, y) {
						return x + y;
					}),
				_p8._0,
				_p9._0));
	});
var _mordrax$cotwelm$Item_Purse$take = F2(
	function (_p11, _p10) {
		var _p12 = _p11;
		var _p13 = _p10;
		return _mordrax$cotwelm$Item_Purse$PurseModel(
			A3(
				_mordrax$cotwelm$Item_Purse$purses,
				F2(
					function (x, y) {
						return x - y;
					}),
				_p12._0,
				_p13._0));
	});
var _mordrax$cotwelm$Item_Purse$toPurseOfLeastCoins = function (coins) {
	var p = (coins / 1000000) | 0;
	var g = ((coins / 10000) | 0) - (p * 100);
	var s = (((coins / 100) | 0) - (g * 100)) - (p * 10000);
	var c = ((coins - (s * 100)) - (g * 10000)) - (p * 1000000);
	return _mordrax$cotwelm$Item_Purse$PurseModel(
		A4(_mordrax$cotwelm$Item_Purse$Model, c, s, g, p));
};
var _mordrax$cotwelm$Item_Purse$Platinum = {ctor: 'Platinum'};
var _mordrax$cotwelm$Item_Purse$Gold = {ctor: 'Gold'};
var _mordrax$cotwelm$Item_Purse$Silver = {ctor: 'Silver'};
var _mordrax$cotwelm$Item_Purse$Copper = {ctor: 'Copper'};
var _mordrax$cotwelm$Item_Purse$NotEnoughCoins = {ctor: 'NotEnoughCoins'};
var _mordrax$cotwelm$Item_Purse$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Item_Purse$remove = F2(
	function (copper, _p14) {
		var _p15 = _p14;
		return {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Item_Purse$PurseModel(_p15._0),
			_1: _mordrax$cotwelm$Item_Purse$Ok
		};
	});

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
			return _p2._0._1;
		case 'ItemArmour':
			return _p2._0._1;
		case 'ItemShield':
			return _p2._0._1;
		case 'ItemHelmet':
			return _p2._0._1;
		case 'ItemBracers':
			return _p2._0._1;
		case 'ItemGauntlets':
			return _p2._0._1;
		case 'ItemBelt':
			return _p2._0._1;
		case 'ItemPack':
			return _p2._0._1;
		case 'ItemPurse':
			return _p2._0._1;
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
var _mordrax$cotwelm$Item_Item$getPurse = function (item) {
	var _p5 = item;
	if (_p5.ctor === 'ItemPurse') {
		return _elm_lang$core$Maybe$Just(_p5._0._0);
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
var _mordrax$cotwelm$Item_Item$PurseModelTag = F2(
	function (a, b) {
		return {ctor: 'PurseModelTag', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Item$newPurse = F3(
	function (id, status, idStatus) {
		return A2(
			_mordrax$cotwelm$Item_Item$PurseModelTag,
			_mordrax$cotwelm$Item_Purse$new,
			A8(
				_mordrax$cotwelm$Item_Data$Model,
				id,
				'Purse',
				0,
				0,
				'Purse',
				status,
				idStatus,
				A2(_mordrax$cotwelm$Utils_Mass$new, 0, 0)));
	});
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
					A3(_mordrax$cotwelm$Item_Item$newPurse, id, status, idStatus));
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

var _mordrax$cotwelm$Equipment$setSlot = F3(
	function (slot, maybeItem, model) {
		var _p0 = slot;
		switch (_p0.ctor) {
			case 'Weapon':
				return _elm_lang$core$Native_Utils.update(
					model,
					{weapon: maybeItem});
			case 'Freehand':
				return _elm_lang$core$Native_Utils.update(
					model,
					{freehand: maybeItem});
			case 'Armour':
				return _elm_lang$core$Native_Utils.update(
					model,
					{armour: maybeItem});
			case 'Shield':
				return _elm_lang$core$Native_Utils.update(
					model,
					{shield: maybeItem});
			case 'Helmet':
				return _elm_lang$core$Native_Utils.update(
					model,
					{helmet: maybeItem});
			case 'Bracers':
				return _elm_lang$core$Native_Utils.update(
					model,
					{bracers: maybeItem});
			case 'Gauntlets':
				return _elm_lang$core$Native_Utils.update(
					model,
					{gauntlets: maybeItem});
			case 'Belt':
				return _elm_lang$core$Native_Utils.update(
					model,
					{belt: maybeItem});
			case 'Purse':
				return _elm_lang$core$Native_Utils.update(
					model,
					{purse: maybeItem});
			case 'Pack':
				return _elm_lang$core$Native_Utils.update(
					model,
					{pack: maybeItem});
			case 'Neckwear':
				return _elm_lang$core$Native_Utils.update(
					model,
					{neckwear: maybeItem});
			case 'Overgarment':
				return _elm_lang$core$Native_Utils.update(
					model,
					{overgarment: maybeItem});
			case 'LeftRing':
				return _elm_lang$core$Native_Utils.update(
					model,
					{leftRing: maybeItem});
			case 'RightRing':
				return _elm_lang$core$Native_Utils.update(
					model,
					{rightRing: maybeItem});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{boots: maybeItem});
		}
	});
var _mordrax$cotwelm$Equipment$getSlot = F2(
	function (slot, _p1) {
		var _p2 = _p1;
		var _p4 = _p2._0;
		var _p3 = slot;
		switch (_p3.ctor) {
			case 'Weapon':
				return _p4.weapon;
			case 'Freehand':
				return _p4.freehand;
			case 'Armour':
				return _p4.armour;
			case 'Shield':
				return _p4.shield;
			case 'Helmet':
				return _p4.helmet;
			case 'Bracers':
				return _p4.bracers;
			case 'Gauntlets':
				return _p4.gauntlets;
			case 'Belt':
				return _p4.belt;
			case 'Purse':
				return _p4.purse;
			case 'Pack':
				return _p4.pack;
			case 'Neckwear':
				return _p4.neckwear;
			case 'Overgarment':
				return _p4.overgarment;
			case 'LeftRing':
				return _p4.leftRing;
			case 'RightRing':
				return _p4.rightRing;
			default:
				return _p4.boots;
		}
	});
var _mordrax$cotwelm$Equipment$getPackContent = function (_p5) {
	var _p6 = _p5;
	var _p7 = _p6._0.pack;
	if ((_p7.ctor === 'Just') && (_p7._0.ctor === 'ItemPack')) {
		return _mordrax$cotwelm$Item_Item$packContents(_p7._0._0);
	} else {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	}
};
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
var _mordrax$cotwelm$Equipment$EquipmentModel = function (a) {
	return {ctor: 'EquipmentModel', _0: a};
};
var _mordrax$cotwelm$Equipment$init = function (idGenerator) {
	var preFoldedItems = A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Item_Item$newFoldableItem,
		_elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple2',
				_0: 'weapon',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$Dagger))
			},
				{
				ctor: '_Tuple2',
				_0: 'armour',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Armour(_mordrax$cotwelm$Item_TypeDef$ScaleMail))
			},
				{
				ctor: '_Tuple2',
				_0: 'shield',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Shield(_mordrax$cotwelm$Item_TypeDef$LargeIronShield))
			},
				{
				ctor: '_Tuple2',
				_0: 'helmet',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Helmet(_mordrax$cotwelm$Item_TypeDef$LeatherHelmet))
			},
				{
				ctor: '_Tuple2',
				_0: 'gauntlets',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Gauntlets(_mordrax$cotwelm$Item_TypeDef$NormalGauntlets))
			},
				{
				ctor: '_Tuple2',
				_0: 'belt',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Belt(_mordrax$cotwelm$Item_TypeDef$TwoSlotBelt))
			},
				{
				ctor: '_Tuple2',
				_0: 'purse',
				_1: _mordrax$cotwelm$Item_Item$new(_mordrax$cotwelm$Item_Item$Purse)
			},
				{
				ctor: '_Tuple2',
				_0: 'pack',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Pack(_mordrax$cotwelm$Item_TypeDef$MediumPack))
			},
				{
				ctor: '_Tuple2',
				_0: 'ths',
				_1: _mordrax$cotwelm$Item_Item$new(
					_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$TwoHandedSword))
			}
			]));
	var _p8 = A3(
		_elm_lang$core$List$foldl,
		_mordrax$cotwelm$Utils_IdGenerator$assignId,
		{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_List.fromArray(
				[]),
			_1: idGenerator
		},
		preFoldedItems);
	var idedItems = _p8._0;
	var idGenerator$ = _p8._1;
	var itemDict = _elm_lang$core$Dict$fromList(idedItems);
	var maybePack = A2(_elm_lang$core$Dict$get, 'pack', itemDict);
	var maybeTHS = A2(_elm_lang$core$Dict$get, 'ths', itemDict);
	var _p9 = function () {
		var _p10 = {ctor: '_Tuple2', _0: maybePack, _1: maybeTHS};
		if ((((_p10.ctor === '_Tuple2') && (_p10._0.ctor === 'Just')) && (_p10._0._0.ctor === 'ItemPack')) && (_p10._1.ctor === 'Just')) {
			return A2(_mordrax$cotwelm$Item_Item$addToPack, _p10._1._0, _p10._0._0._0);
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'Equipment',
				{
					start: {line: 119, column: 13},
					end: {line: 124, column: 56}
				},
				_p10)('This is not possible!');
		}
	}();
	var pack$ = _p9._0;
	return {
		ctor: '_Tuple2',
		_0: idGenerator$,
		_1: _mordrax$cotwelm$Equipment$EquipmentModel(
			{
				weapon: A2(_elm_lang$core$Dict$get, 'weapon', itemDict),
				freehand: _elm_lang$core$Maybe$Nothing,
				armour: A2(_elm_lang$core$Dict$get, 'armour', itemDict),
				shield: A2(_elm_lang$core$Dict$get, 'shield', itemDict),
				helmet: A2(_elm_lang$core$Dict$get, 'helmet', itemDict),
				bracers: A2(_elm_lang$core$Dict$get, 'bracers', itemDict),
				gauntlets: A2(_elm_lang$core$Dict$get, 'gauntlets', itemDict),
				belt: A2(_elm_lang$core$Dict$get, 'belt', itemDict),
				purse: A2(_elm_lang$core$Dict$get, 'purse', itemDict),
				pack: _elm_lang$core$Maybe$Just(
					_mordrax$cotwelm$Item_Item$ItemPack(pack$)),
				neckwear: _elm_lang$core$Maybe$Nothing,
				overgarment: _elm_lang$core$Maybe$Nothing,
				leftRing: _elm_lang$core$Maybe$Nothing,
				rightRing: _elm_lang$core$Maybe$Nothing,
				boots: _elm_lang$core$Maybe$Nothing
			})
	};
};
var _mordrax$cotwelm$Equipment$equip = F3(
	function (slot, item, _p12) {
		var _p13 = _p12;
		return _mordrax$cotwelm$Equipment$EquipmentModel(
			A3(
				_mordrax$cotwelm$Equipment$setSlot,
				slot,
				_elm_lang$core$Maybe$Just(item),
				_p13._0));
	});
var _mordrax$cotwelm$Equipment$unequip = F2(
	function (slot, _p14) {
		var _p15 = _p14;
		var _p17 = _p15._0;
		var maybeItem = A2(
			_mordrax$cotwelm$Equipment$getSlot,
			slot,
			_mordrax$cotwelm$Equipment$EquipmentModel(_p17));
		var _p16 = maybeItem;
		if (_p16.ctor === 'Just') {
			return _mordrax$cotwelm$Item_Item$isCursed(_p16._0) ? _elm_lang$core$Result$Err('You cannot remove a cursed item!') : _elm_lang$core$Result$Ok(
				_mordrax$cotwelm$Equipment$EquipmentModel(
					A3(_mordrax$cotwelm$Equipment$setSlot, slot, _elm_lang$core$Maybe$Nothing, _p17)));
		} else {
			return _elm_lang$core$Result$Ok(
				_mordrax$cotwelm$Equipment$EquipmentModel(_p17));
		}
	});
var _mordrax$cotwelm$Equipment$removeFromPack = F2(
	function (item, _p18) {
		var _p19 = _p18;
		var _p21 = _p19._0;
		var noChange = _mordrax$cotwelm$Equipment$EquipmentModel(_p21);
		var _p20 = _p21.pack;
		if (_p20.ctor === 'Nothing') {
			return noChange;
		} else {
			if (_p20._0.ctor === 'ItemPack') {
				return _mordrax$cotwelm$Equipment$EquipmentModel(
					_elm_lang$core$Native_Utils.update(
						_p21,
						{
							pack: _elm_lang$core$Maybe$Just(
								_mordrax$cotwelm$Item_Item$ItemPack(
									A2(_mordrax$cotwelm$Item_Item$removeFromPack, item, _p20._0._0)))
						}));
			} else {
				return A2(
					_elm_lang$core$Native_Utils.crash(
						'Equipment',
						{
							start: {line: 208, column: 17},
							end: {line: 208, column: 28}
						}),
					'The pack seems to be a non-pack!',
					1);
			}
		}
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
var _mordrax$cotwelm$Equipment$NoPackEquipped = {ctor: 'NoPackEquipped'};
var _mordrax$cotwelm$Equipment$ItemMsg = function (a) {
	return {ctor: 'ItemMsg', _0: a};
};
var _mordrax$cotwelm$Equipment$MassResult = function (a) {
	return {ctor: 'MassResult', _0: a};
};
var _mordrax$cotwelm$Equipment$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Equipment$putInPack = F2(
	function (item, _p22) {
		var _p23 = _p22;
		var _p26 = _p23._0;
		var noChange = {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Equipment$EquipmentModel(_p26),
			_1: _mordrax$cotwelm$Equipment$Ok
		};
		var _p24 = _p26.pack;
		if (_p24.ctor === 'Nothing') {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$EquipmentModel(_p26),
				_1: _mordrax$cotwelm$Equipment$NoPackEquipped
			};
		} else {
			if (_p24._0.ctor === 'ItemPack') {
				var _p25 = A2(_mordrax$cotwelm$Item_Item$addToPack, item, _p24._0._0);
				var pack$ = _p25._0;
				var msg = _p25._1;
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Equipment$EquipmentModel(
						_elm_lang$core$Native_Utils.update(
							_p26,
							{
								pack: _elm_lang$core$Maybe$Just(
									_mordrax$cotwelm$Item_Item$ItemPack(pack$))
							})),
					_1: _mordrax$cotwelm$Equipment$ItemMsg(msg)
				};
			} else {
				return noChange;
			}
		}
	});

var _mordrax$cotwelm$Shop_Shop$productList = _elm_lang$core$Native_List.fromArray(
	[
		_mordrax$cotwelm$Item_Item$new(
		_mordrax$cotwelm$Item_Item$Weapon(_mordrax$cotwelm$Item_TypeDef$BrokenSword)),
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
	return _p1._0.items;
};
var _mordrax$cotwelm$Shop_Shop$replenish = F2(
	function (idGenerator, seed) {
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
			_elm_community$random_extra$Random_Extra$sample(_mordrax$cotwelm$Shop_Shop$productList));
		var itemsGenerator = function (n) {
			return A2(_elm_lang$core$Random$list, n, itemGenerator);
		};
		var _p2 = A2(
			_elm_lang$core$Random$step,
			itemsGenerator(10),
			seed);
		var foldableProducts = _p2._0;
		var _p3 = A3(
			_elm_lang$core$List$foldl,
			_mordrax$cotwelm$Utils_IdGenerator$assignId,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: idGenerator
			},
			foldableProducts);
		var products = _p3._0;
		var idGenerator$ = _p3._1;
		return {ctor: '_Tuple2', _0: idGenerator$, _1: products};
	});
var _mordrax$cotwelm$Shop_Shop$Model = function (a) {
	return {items: a};
};
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
		_mordrax$cotwelm$Shop_Shop$Model(
			_elm_lang$core$Native_List.fromArray(
				[]))),
	_1: _mordrax$cotwelm$Shop_Shop$getSeed
};
var _mordrax$cotwelm$Shop_Shop$update = F3(
	function (msg, generator, _p4) {
		var _p5 = _p4;
		var _p9 = _p5._0;
		var _p6 = msg;
		if (_p6.ctor === 'PopulateShop') {
			var _p7 = A2(_mordrax$cotwelm$Shop_Shop$replenish, generator, _p6._0);
			var generator$ = _p7._0;
			var products = _p7._1;
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Shop_Shop$SM(
					_elm_lang$core$Native_Utils.update(
						_p9,
						{items: products})),
				_1: generator$
			};
		} else {
			var _p8 = A2(_elm_lang$core$Debug$log, 'Shop.update, unexpected msg', msg);
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Shop_Shop$SM(_p9),
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

var _mordrax$cotwelm$Game_Data$Model = F8(
	function (a, b, c, d, e, f, g, h) {
		return {name: a, hero: b, map: c, currentScreen: d, dnd: e, equipment: f, shop: g, idGen: h};
	});
var _mordrax$cotwelm$Game_Data$DragShop = function (a) {
	return {ctor: 'DragShop', _0: a};
};
var _mordrax$cotwelm$Game_Data$DragPack = F2(
	function (a, b) {
		return {ctor: 'DragPack', _0: a, _1: b};
	});
var _mordrax$cotwelm$Game_Data$DragSlot = F2(
	function (a, b) {
		return {ctor: 'DragSlot', _0: a, _1: b};
	});
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
var _mordrax$cotwelm$Game_Data$Right = {ctor: 'Right'};
var _mordrax$cotwelm$Game_Data$Left = {ctor: 'Left'};
var _mordrax$cotwelm$Game_Data$Down = {ctor: 'Down'};
var _mordrax$cotwelm$Game_Data$Up = {ctor: 'Up'};
var _mordrax$cotwelm$Game_Data$DnDMsg = function (a) {
	return {ctor: 'DnDMsg', _0: a};
};
var _mordrax$cotwelm$Game_Data$InventoryMsg = {ctor: 'InventoryMsg'};
var _mordrax$cotwelm$Game_Data$NoOp = {ctor: 'NoOp'};
var _mordrax$cotwelm$Game_Data$ShopMsg = function (a) {
	return {ctor: 'ShopMsg', _0: a};
};
var _mordrax$cotwelm$Game_Data$InvMsg = function (a) {
	return {ctor: 'InvMsg', _0: a};
};
var _mordrax$cotwelm$Game_Data$Inventory = {ctor: 'Inventory'};
var _mordrax$cotwelm$Game_Data$Map = {ctor: 'Map'};
var _mordrax$cotwelm$Game_Data$KeyDir = function (a) {
	return {ctor: 'KeyDir', _0: a};
};

var _mordrax$cotwelm$CotwData$GameMsg = function (a) {
	return {ctor: 'GameMsg', _0: a};
};
var _mordrax$cotwelm$CotwData$CharCreationMsg = function (a) {
	return {ctor: 'CharCreationMsg', _0: a};
};
var _mordrax$cotwelm$CotwData$SplashMsg = function (a) {
	return {ctor: 'SplashMsg', _0: a};
};
var _mordrax$cotwelm$CotwData$NotImplementedPage = {ctor: 'NotImplementedPage'};
var _mordrax$cotwelm$CotwData$ShopPage = {ctor: 'ShopPage'};
var _mordrax$cotwelm$CotwData$GamePage = {ctor: 'GamePage'};
var _mordrax$cotwelm$CotwData$CharCreationPage = {ctor: 'CharCreationPage'};
var _mordrax$cotwelm$CotwData$SplashPage = {ctor: 'SplashPage'};

var _mordrax$cotwelm$Game_Keyboard$keycodeToMsg = F2(
	function (map, code) {
		var maybeMsg = A2(_elm_lang$core$Dict$get, code, map);
		var a = A2(
			_elm_lang$core$Debug$log,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'keycode: ',
				_elm_lang$core$Basics$toString(code)),
			1);
		var _p0 = maybeMsg;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return _mordrax$cotwelm$Game_Data$NoOp;
		}
	});
var _mordrax$cotwelm$Game_Keyboard$dirToVector = function (dir) {
	var _p1 = dir;
	switch (_p1.ctor) {
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
var _mordrax$cotwelm$Game_Keyboard$playerKeymapUps = _elm_lang$core$Dict$fromList(
	_elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 27, _1: _mordrax$cotwelm$Game_Data$Map},
			{ctor: '_Tuple2', _0: 73, _1: _mordrax$cotwelm$Game_Data$Inventory}
		]));
var _mordrax$cotwelm$Game_Keyboard$playerKeymap = _elm_lang$core$Dict$fromList(
	_elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: 87,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Up)
		},
			{
			ctor: '_Tuple2',
			_0: 119,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Up)
		},
			{
			ctor: '_Tuple2',
			_0: 83,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Down)
		},
			{
			ctor: '_Tuple2',
			_0: 115,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Down)
		},
			{
			ctor: '_Tuple2',
			_0: 65,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Left)
		},
			{
			ctor: '_Tuple2',
			_0: 97,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Left)
		},
			{
			ctor: '_Tuple2',
			_0: 68,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Right)
		},
			{
			ctor: '_Tuple2',
			_0: 100,
			_1: _mordrax$cotwelm$Game_Data$KeyDir(_mordrax$cotwelm$Game_Data$Right)
		}
		]));
var _mordrax$cotwelm$Game_Keyboard$subscriptions = _elm_lang$core$Native_List.fromArray(
	[
		_elm_lang$keyboard$Keyboard$ups(
		_mordrax$cotwelm$Game_Keyboard$keycodeToMsg(_mordrax$cotwelm$Game_Keyboard$playerKeymapUps)),
		_elm_lang$keyboard$Keyboard$presses(
		_mordrax$cotwelm$Game_Keyboard$keycodeToMsg(_mordrax$cotwelm$Game_Keyboard$playerKeymap))
	]);

var _mordrax$cotwelm$Game_Collision$isBuildingAtPosition = F2(
	function (pos, building) {
		var bottomLeft = A2(
			_mordrax$cotwelm$Utils_Vector$sub,
			A2(_mordrax$cotwelm$Utils_Vector$add, building.pos, building.size),
			A2(_mordrax$cotwelm$Utils_Vector$new, 1, 1));
		return A2(
			_mordrax$cotwelm$Utils_Vector$boxIntersect,
			pos,
			{ctor: '_Tuple2', _0: building.pos, _1: bottomLeft});
	});
var _mordrax$cotwelm$Game_Collision$buildingAtPosition = F2(
	function (pos, buildings) {
		var buildingsAtTile = A2(
			_elm_lang$core$List$filter,
			_mordrax$cotwelm$Game_Collision$isBuildingAtPosition(pos),
			buildings);
		var _p0 = buildingsAtTile;
		if (_p0.ctor === '::') {
			return _elm_lang$core$Maybe$Just(_p0._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _mordrax$cotwelm$Game_Collision$thingsAtPosition = F2(
	function (pos, model) {
		var area = model.currentArea;
		var buildings = A2(_mordrax$cotwelm$Game_Maps$getBuildings, area, model);
		var building = A2(_mordrax$cotwelm$Game_Collision$buildingAtPosition, pos, buildings);
		var map = A2(_mordrax$cotwelm$Game_Maps$getMap, area, model);
		var tile = A2(
			_elm_lang$core$Dict$get,
			_elm_lang$core$Basics$toString(pos),
			map);
		return {ctor: '_Tuple2', _0: tile, _1: building};
	});
var _mordrax$cotwelm$Game_Collision$getObstructions = F2(
	function (pos, mapModel) {
		var _p1 = A2(_mordrax$cotwelm$Game_Collision$thingsAtPosition, pos, mapModel);
		var maybeTile = _p1._0;
		var maybeBuilding = _p1._1;
		var tileObstruction = function () {
			var _p2 = maybeTile;
			if (_p2.ctor === 'Just') {
				return _p2._0.solid;
			} else {
				return false;
			}
		}();
		var buildingObstruction = function () {
			var _p3 = maybeBuilding;
			if (_p3.ctor === 'Just') {
				return true;
			} else {
				return false;
			}
		}();
		return {ctor: '_Tuple2', _0: buildingObstruction || tileObstruction, _1: maybeBuilding};
	});
var _mordrax$cotwelm$Game_Collision$enterBuilding = F2(
	function (building, model) {
		var _p4 = building.link;
		if (_p4.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.update(
				model,
				{
					currentScreen: _mordrax$cotwelm$Game_Data$BuildingScreen(building)
				});
		} else {
			var _p5 = _p4._0;
			return _elm_lang$core$Native_Utils.update(
				model,
				{
					map: A2(_mordrax$cotwelm$Game_Maps$updateArea, _p5.area, model.map),
					hero: A2(
						_mordrax$cotwelm$Hero$update,
						_mordrax$cotwelm$Hero$Teleport(_p5.pos),
						model.hero)
				});
		}
	});
var _mordrax$cotwelm$Game_Collision$tryMoveHero = F2(
	function (dir, model) {
		var movedHero = A2(
			_mordrax$cotwelm$Hero$update,
			_mordrax$cotwelm$Hero$Move(
				_mordrax$cotwelm$Game_Keyboard$dirToVector(dir)),
			model.hero);
		var obstructions = A2(
			_mordrax$cotwelm$Game_Collision$getObstructions,
			_mordrax$cotwelm$Hero$pos(movedHero),
			model.map);
		var _p6 = obstructions;
		_v4_0:
		do {
			if (_p6._0 === true) {
				if (_p6._1.ctor === 'Just') {
					break _v4_0;
				} else {
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				}
			} else {
				if (_p6._1.ctor === 'Just') {
					break _v4_0;
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{hero: movedHero}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			}
		} while(false);
		return {
			ctor: '_Tuple2',
			_0: A2(_mordrax$cotwelm$Game_Collision$enterBuilding, _p6._1._0, model),
			_1: _elm_lang$core$Platform_Cmd$none
		};
	});

var _mordrax$cotwelm$Game_Inventory$viewPurse = function (_p0) {
	var _p1 = _p0;
	var maybePurse = A2(
		_elm_lang$core$Maybe$andThen,
		A2(_mordrax$cotwelm$Equipment$getSlot, _mordrax$cotwelm$Equipment$Purse, _p1.equipment),
		_mordrax$cotwelm$Item_Item$getPurse);
	var _p2 = maybePurse;
	if (_p2.ctor === 'Just') {
		var _p3 = _p2._0;
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
							_elm_lang$core$Basics$toString(
								A2(_mordrax$cotwelm$Item_Purse$getCoins, _mordrax$cotwelm$Item_Purse$Copper, _p3)))
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
							_elm_lang$core$Basics$toString(
								A2(_mordrax$cotwelm$Item_Purse$getCoins, _mordrax$cotwelm$Item_Purse$Silver, _p3)))
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
							_elm_lang$core$Basics$toString(
								A2(_mordrax$cotwelm$Item_Purse$getCoins, _mordrax$cotwelm$Item_Purse$Gold, _p3)))
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
							_elm_lang$core$Basics$toString(
								A2(_mordrax$cotwelm$Item_Purse$getCoins, _mordrax$cotwelm$Item_Purse$Platinum, _p3)))
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
			return A2(_mordrax$cotwelm$Equipment$getSlot, slot, equipment);
		};
		var drawSlot = function (slot) {
			var slotName = A2(
				_elm_lang$core$Basics_ops['++'],
				'Slot: [',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(slot),
					']'));
			var _p4 = getEquipment(slot);
			if (_p4.ctor === 'Just') {
				return A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('three wide column equipmentSlot')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(drawItem, _p4._0, slot)
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
	function (containerItem, _p5) {
		var _p6 = _p5;
		var itemToHtml = function (item) {
			return _mordrax$cotwelm$Item_Item$view(item);
		};
		var makeDraggable = F2(
			function (pack, item) {
				return A3(
					_mordrax$cotwelm$Utils_DragDrop$draggable,
					itemToHtml(item),
					A2(_mordrax$cotwelm$Game_Data$DragPack, item, pack),
					_p6.dnd);
			});
		var items = _mordrax$cotwelm$Equipment$getPackContent(_p6.equipment);
		var _p7 = containerItem;
		if (_p7.ctor === 'ItemPack') {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('ui cards')
					]),
				A2(
					_elm_lang$core$List$map,
					makeDraggable(_p7._0),
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
var _mordrax$cotwelm$Game_Inventory$viewShop = function (shop) {
	var items = _mordrax$cotwelm$Shop_Shop$list(shop);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('ui cards')
			]),
		A2(_elm_lang$core$List$map, _mordrax$cotwelm$Item_Item$view, items));
};
var _mordrax$cotwelm$Game_Inventory$viewPack = F2(
	function (maybeItem, _p8) {
		var _p9 = _p8;
		var highlightStyle = _elm_lang$html$Html_Attributes$style(
			_elm_lang$core$Native_List.fromArray(
				[
					{ctor: '_Tuple2', _0: 'background', _1: 'lightblue'}
				]));
		var droppableHtml = function (pack) {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[highlightStyle]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_mordrax$cotwelm$Game_Inventory$viewContainer,
						_mordrax$cotwelm$Item_Item$ItemPack(pack),
						_p9)
					]));
		};
		var _p10 = maybeItem;
		if ((_p10.ctor === 'Just') && (_p10._0.ctor === 'ItemPack')) {
			var _p11 = _p10._0._0;
			return A3(
				_mordrax$cotwelm$Utils_DragDrop$droppable,
				_mordrax$cotwelm$Game_Data$DropPack(_p11),
				_p9.dnd,
				droppableHtml(_p11));
		} else {
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text('Pack is empty')
					]));
		}
	});
var _mordrax$cotwelm$Game_Inventory$toInventoryMsg = function (dragDropMsg) {
	return _mordrax$cotwelm$Game_Data$DnDMsg(dragDropMsg);
};
var _mordrax$cotwelm$Game_Inventory$subscriptions = function (_p12) {
	var _p13 = _p12;
	return A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Platform_Sub$map(_mordrax$cotwelm$Game_Inventory$toInventoryMsg),
		_mordrax$cotwelm$Utils_DragDrop$subscriptions(_p13.dnd));
};
var _mordrax$cotwelm$Game_Inventory$viewPackInfo = function (maybeItem) {
	var _p14 = maybeItem;
	if ((_p14.ctor === 'Just') && (_p14._0.ctor === 'ItemPack')) {
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
		var _p15 = _mordrax$cotwelm$Item_Item$packInfo(_p14._0._0);
		var curMass = _p15._0;
		var capMass = _p15._1;
		var _p16 = _mordrax$cotwelm$Utils_Mass$info(curMass);
		var curBulk = _p16._0;
		var curWeight = _p16._1;
		var _p17 = _mordrax$cotwelm$Utils_Mass$info(capMass);
		var capBulk = _p17._0;
		var capWeight = _p17._1;
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
var _mordrax$cotwelm$Game_Inventory$view = function (_p18) {
	var _p19 = _p18;
	var _p22 = _p19;
	var _p21 = _p19.equipment;
	var _p20 = _p19.dnd;
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
				A2(_mordrax$cotwelm$Game_Inventory$viewEquipment, _p21, _p20)
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
	var headerClass = _elm_lang$html$Html_Attributes$class('ui block header');
	var header = function (title) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[headerClass]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(title)
				]));
	};
	var shopHtml = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				header('Shop'),
				_mordrax$cotwelm$Game_Inventory$viewShop(_p22.shop)
			]));
	var purseHtml = A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				header('Purse'),
				_mordrax$cotwelm$Game_Inventory$viewPurse(_p22)
			]));
	var maybePack = A2(_mordrax$cotwelm$Equipment$getSlot, _mordrax$cotwelm$Equipment$Pack, _p21);
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
				A2(_mordrax$cotwelm$Game_Inventory$viewPack, maybePack, _p22)
			]));
	var shopPackColumn = A2(
		columnWidth,
		'ten',
		_elm_lang$core$Native_List.fromArray(
			[shopHtml, packHtml, purseHtml]));
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
						A2(_elm_lang$html$Html_App$map, _mordrax$cotwelm$Game_Inventory$toInventoryMsg, shopPackColumn)
					])),
				A2(
				_elm_lang$html$Html_App$map,
				_mordrax$cotwelm$Game_Inventory$toInventoryMsg,
				_mordrax$cotwelm$Utils_DragDrop$view(_p20))
			]));
};
var _mordrax$cotwelm$Game_Inventory$handleDrop = F3(
	function (drop, item, model) {
		var _p23 = drop;
		if (_p23.ctor === 'DropPack') {
			var _p24 = A2(_mordrax$cotwelm$Equipment$putInPack, item, model.equipment);
			var equipment$ = _p24._0;
			var equipMsg = _p24._1;
			var success = _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					model,
					{equipment: equipment$}));
			var _p25 = equipMsg;
			_v11_3:
			do {
				switch (_p25.ctor) {
					case 'Ok':
						return success;
					case 'ItemMsg':
						if (_p25._0.ctor === 'Ok') {
							return success;
						} else {
							break _v11_3;
						}
					case 'NoPackEquipped':
						return _elm_lang$core$Result$Err('Can\'t add to the pack. No packed equipped!');
					default:
						break _v11_3;
				}
			} while(false);
			return _elm_lang$core$Result$Err(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Dropping into pack failed with unhanded msg: ',
					_elm_lang$core$Basics$toString(_p25)));
		} else {
			return _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					model,
					{
						equipment: A3(_mordrax$cotwelm$Equipment$equip, _p23._0, item, model.equipment)
					}));
		}
	});
var _mordrax$cotwelm$Game_Inventory$handleDrag = F2(
	function (drag, model) {
		var _p26 = drag;
		switch (_p26.ctor) {
			case 'DragSlot':
				var _p28 = _p26._0;
				var unequipRes = A2(_mordrax$cotwelm$Equipment$unequip, _p26._1, model.equipment);
				var _p27 = unequipRes;
				if (_p27.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{equipment: _p27._0}),
							_1: _p28
						});
				} else {
					return _elm_lang$core$Result$Ok(
						{ctor: '_Tuple2', _0: model, _1: _p28});
				}
			case 'DragPack':
				var _p29 = _p26._0;
				var modelItemRemoved = _elm_lang$core$Native_Utils.update(
					model,
					{
						equipment: A2(_mordrax$cotwelm$Equipment$removeFromPack, _p29, model.equipment)
					});
				return A3(
					_elm_lang$core$Debug$log,
					'TODO: Remove item from the pack.container and return just the item',
					_elm_lang$core$Result$Ok,
					{ctor: '_Tuple2', _0: modelItemRemoved, _1: _p29});
			default:
				return _elm_lang$core$Result$Ok(
					{ctor: '_Tuple2', _0: model, _1: _p26._0});
		}
	});
var _mordrax$cotwelm$Game_Inventory$handleDragDrop = F3(
	function (dragSource, dropTarget, model) {
		var noChange = model;
		var handleDrop$ = F2(
			function (item, modelWithDrag) {
				var _p30 = A3(_mordrax$cotwelm$Game_Inventory$handleDrop, dropTarget, item, modelWithDrag);
				if (_p30.ctor === 'Ok') {
					return _p30._0;
				} else {
					var _p31 = A2(_elm_lang$core$Debug$log, 'Drop failed: ', _p30._0);
					return noChange;
				}
			});
		var dragResult = A2(_mordrax$cotwelm$Game_Inventory$handleDrag, dragSource, model);
		var _p32 = dragResult;
		if (_p32.ctor === 'Ok') {
			return A2(handleDrop$, _p32._0._1, _p32._0._0);
		} else {
			var _p33 = A2(_elm_lang$core$Debug$log, 'Drag failed: ', _p32._0);
			return noChange;
		}
	});
var _mordrax$cotwelm$Game_Inventory$handleMouseUp = function (_p34) {
	var _p35 = _p34;
	var _p37 = _p35;
	var modelDnDReinit = _elm_lang$core$Native_Utils.update(
		_p37,
		{dnd: _mordrax$cotwelm$Utils_DragDrop$new});
	var noChange = modelDnDReinit;
	var _p36 = _mordrax$cotwelm$Utils_DragDrop$getDragSourceDropTarget(_p37.dnd);
	if (_p36._0.ctor === 'NoDrag') {
		return noChange;
	} else {
		if (_p36._1.ctor === 'NoDrop') {
			return noChange;
		} else {
			return A3(_mordrax$cotwelm$Game_Inventory$handleDragDrop, _p36._0._0, _p36._1._0, modelDnDReinit);
		}
	}
};
var _mordrax$cotwelm$Game_Inventory$update = F2(
	function (msg, model) {
		var _p38 = msg;
		if (_p38.ctor === 'DnDMsg') {
			if (_p38._0.ctor === 'End') {
				return _mordrax$cotwelm$Game_Inventory$handleMouseUp(model);
			} else {
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						dnd: A2(_mordrax$cotwelm$Utils_DragDrop$update, _p38._0, model.dnd)
					});
			}
		} else {
			return A2(_elm_lang$core$Debug$log, 'Update: No other messages implemented', model);
		}
	});

var _mordrax$cotwelm$Game_Game$viewHero = function (hero) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('tile maleHero'),
				_mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(
				_mordrax$cotwelm$Hero$pos(hero))
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
						_elm_lang$html$Html$text(building.name)
					]))
			]));
};
var _mordrax$cotwelm$Game_Game$viewMap = function (model) {
	var title = A2(
		_elm_lang$html$Html$h1,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(
				A2(_elm_lang$core$Basics_ops['++'], 'Welcome to Castle of the Winds: ', model.name))
			]));
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				title,
				_mordrax$cotwelm$Game_Maps$view(model.map),
				_mordrax$cotwelm$Game_Game$viewHero(model.hero)
			]));
};
var _mordrax$cotwelm$Game_Game$view = function (model) {
	var _p0 = model.currentScreen;
	switch (_p0.ctor) {
		case 'MapScreen':
			return _mordrax$cotwelm$Game_Game$viewMap(model);
		case 'BuildingScreen':
			return _mordrax$cotwelm$Game_Game$viewBuilding(_p0._0);
		default:
			return A2(
				_elm_lang$html$Html_App$map,
				_mordrax$cotwelm$Game_Data$InvMsg,
				_mordrax$cotwelm$Game_Inventory$view(model));
	}
};
var _mordrax$cotwelm$Game_Game$update = F2(
	function (msg, model) {
		var _p1 = msg;
		switch (_p1.ctor) {
			case 'KeyDir':
				return A2(_mordrax$cotwelm$Game_Collision$tryMoveHero, _p1._0, model);
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
			case 'InvMsg':
				return {
					ctor: '_Tuple2',
					_0: A2(_mordrax$cotwelm$Game_Inventory$update, _p1._0, model),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ShopMsg':
				var _p2 = A3(_mordrax$cotwelm$Shop_Shop$update, _p1._0, model.idGen, model.shop);
				var shop$ = _p2._0;
				var idGen$ = _p2._1;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{shop: shop$, idGen: idGen$}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _mordrax$cotwelm$Game_Game$initGame = function () {
	var _p3 = _mordrax$cotwelm$Shop_Shop$new;
	var newShop = _p3._0;
	var shopCmd = _p3._1;
	var cmd = A2(
		_elm_lang$core$Platform_Cmd$map,
		function (x) {
			return _mordrax$cotwelm$Game_Data$ShopMsg(x);
		},
		shopCmd);
	var idGenerator = _mordrax$cotwelm$Utils_IdGenerator$new;
	var _p4 = _mordrax$cotwelm$Equipment$init(idGenerator);
	var idGenerator$ = _p4._0;
	var equipment = _p4._1;
	return {
		ctor: '_Tuple2',
		_0: {name: 'A new game', hero: _mordrax$cotwelm$Hero$init, map: _mordrax$cotwelm$Game_Maps$initMaps, currentScreen: _mordrax$cotwelm$Game_Data$InventoryScreen, dnd: _mordrax$cotwelm$Utils_DragDrop$new, equipment: equipment, shop: newShop, idGen: idGenerator$},
		_1: cmd
	};
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
var _mordrax$cotwelm$Main$urlUpdate = F2(
	function (url, model) {
		return _elm_lang$core$Native_Utils.eq(url, 'charCreation') ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$CotwData$CharCreationPage}),
			_1: _elm_lang$core$Platform_Cmd$none
		} : (_elm_lang$core$Native_Utils.eq(url, 'game') ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$CotwData$GamePage}),
			_1: _elm_lang$core$Platform_Cmd$none
		} : (_elm_lang$core$Native_Utils.eq(url, 'inventory') ? {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$CotwData$GamePage}),
			_1: _elm_lang$core$Platform_Cmd$none
		} : {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{currentPage: _mordrax$cotwelm$CotwData$SplashPage}),
			_1: _elm_lang$core$Platform_Cmd$none
		}));
	});
var _mordrax$cotwelm$Main$view = function (model) {
	var _p1 = model.currentPage;
	switch (_p1.ctor) {
		case 'CharCreationPage':
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html_App$map,
						_mordrax$cotwelm$CotwData$CharCreationMsg,
						_mordrax$cotwelm$CharCreation_CharCreation$view(model.character))
					]));
		case 'SplashPage':
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(_elm_lang$html$Html_App$map, _mordrax$cotwelm$CotwData$SplashMsg, _mordrax$cotwelm$SplashView$view)
					]));
		case 'GamePage':
			return A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html_App$map,
						_mordrax$cotwelm$CotwData$GameMsg,
						_mordrax$cotwelm$Game_Game$view(model.game))
					]));
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
var _mordrax$cotwelm$Main$update = F2(
	function (msg, model) {
		var _p2 = msg;
		switch (_p2.ctor) {
			case 'SplashMsg':
				if (_p2._0.ctor === 'NewGame') {
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
							{currentPage: _mordrax$cotwelm$CotwData$NotImplementedPage}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'CharCreationMsg':
				if (_p2._0.ctor === 'StartGame') {
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
								character: A2(_mordrax$cotwelm$CharCreation_CharCreation$update, _p2._0, model.character)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			default:
				var _p3 = A2(_mordrax$cotwelm$Game_Game$update, _p2._0, model.game);
				var game$ = _p3._0;
				var cmd = _p3._1;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{game: game$}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _mordrax$cotwelm$Main$initModel = function (url) {
	var _p4 = _mordrax$cotwelm$Game_Game$initGame;
	var initGameState = _p4._0;
	var gameCmds = _p4._1;
	var gameMainCmds = A2(
		_elm_lang$core$Platform_Cmd$map,
		function (x) {
			return _mordrax$cotwelm$CotwData$GameMsg(x);
		},
		gameCmds);
	var model = {currentPage: _mordrax$cotwelm$CotwData$GamePage, character: _mordrax$cotwelm$CharCreation_CharCreation$initChar, game: initGameState};
	var _p5 = A2(_mordrax$cotwelm$Main$urlUpdate, url, model);
	var modelWithUrl = _p5._0;
	var urlCmds = _p5._1;
	return {
		ctor: '_Tuple2',
		_0: modelWithUrl,
		_1: _elm_lang$core$Platform_Cmd$batch(
			_elm_lang$core$Native_List.fromArray(
				[urlCmds, gameMainCmds]))
	};
};
var _mordrax$cotwelm$Main$subscriptions = function (model) {
	var inventorySubs = _mordrax$cotwelm$Game_Inventory$subscriptions(model.game);
	var convertToGameMsg = function (x) {
		return A2(_elm_lang$core$Platform_Sub$map, _mordrax$cotwelm$Game_Data$InvMsg, x);
	};
	var convertToMainMsg = function (x) {
		return A2(_elm_lang$core$Platform_Sub$map, _mordrax$cotwelm$CotwData$GameMsg, x);
	};
	var keyboardSubs = A2(_elm_lang$core$List$map, convertToMainMsg, _mordrax$cotwelm$Game_Keyboard$subscriptions);
	var inventorySubsGameMsg = A2(
		_elm_lang$core$List$map,
		convertToMainMsg,
		A2(_elm_lang$core$List$map, convertToGameMsg, inventorySubs));
	return _elm_lang$core$Platform_Sub$batch(
		A2(_elm_lang$core$List$append, keyboardSubs, inventorySubsGameMsg));
};
var _mordrax$cotwelm$Main$main = {
	main: A2(
		_elm_lang$navigation$Navigation$program,
		_mordrax$cotwelm$Main$urlParser,
		{init: _mordrax$cotwelm$Main$initModel, update: _mordrax$cotwelm$Main$update, view: _mordrax$cotwelm$Main$view, urlUpdate: _mordrax$cotwelm$Main$urlUpdate, subscriptions: _mordrax$cotwelm$Main$subscriptions})
};
var _mordrax$cotwelm$Main$Model = F3(
	function (a, b, c) {
		return {currentPage: a, character: b, game: c};
	});

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

