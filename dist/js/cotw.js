
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

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
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
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
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

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
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

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
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
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

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
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = A2(_elm_lang$core$List_ops['::'], _p22._0, taken);
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				_elm_lang$core$Native_List.fromArray(
					[])));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return _elm_lang$core$Native_List.fromArray(
											[_p23._1._0, _p23._1._1._0]);
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return _elm_lang$core$Native_List.fromArray(
												[_p23._1._0, _p23._1._1._0, _p23._1._1._1._0]);
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? A2(
												_elm_lang$core$List_ops['::'],
												_p26,
												A2(
													_elm_lang$core$List_ops['::'],
													_p27,
													A2(
														_elm_lang$core$List_ops['::'],
														_p28,
														A2(
															_elm_lang$core$List_ops['::'],
															_p25,
															A2(_elm_lang$core$List$takeTailRec, n - 4, _p24))))) : A2(
												_elm_lang$core$List_ops['::'],
												_p26,
												A2(
													_elm_lang$core$List_ops['::'],
													_p27,
													A2(
														_elm_lang$core$List_ops['::'],
														_p28,
														A2(
															_elm_lang$core$List_ops['::'],
															_p25,
															A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)))));
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return _elm_lang$core$Native_List.fromArray(
					[_p23._1._0]);
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = A2(_elm_lang$core$List_ops['::'], value, result),
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
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
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
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
	
	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

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
				stepState:
				while (true) {
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
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
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
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
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
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
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
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
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
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
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
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
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

function badCustom(msg)
{
	return { tag: 'custom', msg: msg };
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

			case 'custom':
				return 'A `customDecoder` failed'
					+ (context === '_' ? '' : ' at ' + context)
					+ ' with the message: ' + problem.msg;

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
				return badCustom(realResult._0);
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

var _debois$elm_dom$DOM$className = A2(
	_elm_lang$core$Json_Decode$at,
	_elm_lang$core$Native_List.fromArray(
		['className']),
	_elm_lang$core$Json_Decode$string);
var _debois$elm_dom$DOM$scrollTop = A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$scrollLeft = A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetTop = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetLeft = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetHeight = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetHeight', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetWidth = A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetWidth', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$childNodes = function (decoder) {
	var loop = F2(
		function (idx, xs) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				_elm_lang$core$Json_Decode$maybe(
					A2(
						_elm_lang$core$Json_Decode_ops[':='],
						_elm_lang$core$Basics$toString(idx),
						decoder)),
				function (_p0) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Json_Decode$succeed(xs),
						A2(
							_elm_lang$core$Maybe$map,
							function (x) {
								return A2(
									loop,
									idx + 1,
									A2(_elm_lang$core$List_ops['::'], x, xs));
							},
							_p0));
				});
		});
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$List$reverse,
		A2(
			_elm_lang$core$Json_Decode_ops[':='],
			'childNodes',
			A2(
				loop,
				0,
				_elm_lang$core$Native_List.fromArray(
					[]))));
};
var _debois$elm_dom$DOM$childNode = function (idx) {
	return _elm_lang$core$Json_Decode$at(
		_elm_lang$core$Native_List.fromArray(
			[
				'childNodes',
				_elm_lang$core$Basics$toString(idx)
			]));
};
var _debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'parentElement', decoder);
};
var _debois$elm_dom$DOM$previousSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'previousSibling', decoder);
};
var _debois$elm_dom$DOM$nextSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'nextSibling', decoder);
};
var _debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return _elm_lang$core$Json_Decode$oneOf(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$core$Json_Decode_ops[':='],
					'offsetParent',
					_elm_lang$core$Json_Decode$null(x)),
					A2(_elm_lang$core$Json_Decode_ops[':='], 'offsetParent', decoder)
				]));
	});
var _debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			A5(
				_elm_lang$core$Json_Decode$object4,
				F4(
					function (scrollLeft, scrollTop, offsetLeft, offsetTop) {
						return {ctor: '_Tuple2', _0: (x + offsetLeft) - scrollLeft, _1: (y + offsetTop) - scrollTop};
					}),
				_debois$elm_dom$DOM$scrollLeft,
				_debois$elm_dom$DOM$scrollTop,
				_debois$elm_dom$DOM$offsetLeft,
				_debois$elm_dom$DOM$offsetTop),
			function (_p1) {
				var _p2 = _p1;
				var _p4 = _p2._1;
				var _p3 = _p2._0;
				return A2(
					_debois$elm_dom$DOM$offsetParent,
					{ctor: '_Tuple2', _0: _p3, _1: _p4},
					A2(_debois$elm_dom$DOM$position, _p3, _p4));
			});
	});
var _debois$elm_dom$DOM$boundingClientRect = A4(
	_elm_lang$core$Json_Decode$object3,
	F3(
		function (_p5, width, height) {
			var _p6 = _p5;
			return {top: _p6._1, left: _p6._0, width: width, height: height};
		}),
	A2(_debois$elm_dom$DOM$position, 0, 0),
	_debois$elm_dom$DOM$offsetWidth,
	_debois$elm_dom$DOM$offsetHeight);
var _debois$elm_dom$DOM$target = function (decoder) {
	return A2(_elm_lang$core$Json_Decode_ops[':='], 'target', decoder);
};
var _debois$elm_dom$DOM$Rectangle = F4(
	function (a, b, c, d) {
		return {top: a, left: b, width: c, height: d};
	});

var _debois$elm_parts$Parts$map2nd = F2(
	function (f, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: f(_p1._1)
		};
	});
var _debois$elm_parts$Parts$map1st = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: f(_p3._0),
			_1: _p3._1
		};
	});
var _debois$elm_parts$Parts$generalize = F4(
	function (upd, f, m, c) {
		return _elm_lang$core$Maybe$Just(
			A2(
				_debois$elm_parts$Parts$map2nd,
				_elm_lang$core$Platform_Cmd$map(f),
				A2(upd, m, c)));
	});
var _debois$elm_parts$Parts$update = F2(
	function (_p4, c) {
		var _p5 = _p4;
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: c, _1: _elm_lang$core$Platform_Cmd$none},
			_p5._0(c));
	});
var _debois$elm_parts$Parts$update$ = F2(
	function (_p6, c) {
		var _p7 = _p6;
		return _p7._0(c);
	});
var _debois$elm_parts$Parts$indexed = F3(
	function (get, set, model0) {
		return {
			ctor: '_Tuple2',
			_0: F2(
				function (idx, c) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						model0,
						A2(
							_elm_lang$core$Dict$get,
							idx,
							get(c)));
				}),
			_1: F3(
				function (idx, model, c) {
					return A2(
						set,
						A3(
							_elm_lang$core$Dict$insert,
							idx,
							model,
							get(c)),
						c);
				})
		};
	});
var _debois$elm_parts$Parts$accessors = F4(
	function (get0, set0, model0, idx) {
		var _p8 = A3(_debois$elm_parts$Parts$indexed, get0, set0, model0);
		var get = _p8._0;
		var set = _p8._1;
		return {
			get: get(idx),
			set: set(idx),
			map: F2(
				function (f, c) {
					return A3(
						_elm_lang$core$Basics$flip,
						set(idx),
						c,
						f(
							A2(get, idx, c)));
				}),
			reset: function (c) {
				return function (m) {
					return A2(set0, m, c);
				}(
					A2(
						_elm_lang$core$Dict$remove,
						idx,
						get0(c)));
			}
		};
	});
var _debois$elm_parts$Parts$embedUpdate = F6(
	function (get, set, update, f, msg, c) {
		return A2(
			_elm_lang$core$Maybe$map,
			_debois$elm_parts$Parts$map1st(
				A2(_elm_lang$core$Basics$flip, set, c)),
			A3(
				update,
				f,
				msg,
				get(c)));
	});
var _debois$elm_parts$Parts$embedView = F2(
	function (get, view) {
		return function (_p9) {
			return view(
				get(_p9));
		};
	});
var _debois$elm_parts$Parts$Accessors = F4(
	function (a, b, c, d) {
		return {get: a, set: b, map: c, reset: d};
	});
var _debois$elm_parts$Parts$Msg = function (a) {
	return {ctor: 'Msg', _0: a};
};
var _debois$elm_parts$Parts$partial = F3(
	function (fwd, upd, msg) {
		return _debois$elm_parts$Parts$Msg(
			function (c) {
				return A3(
					upd,
					function (_p10) {
						return fwd(
							A3(_debois$elm_parts$Parts$partial, fwd, upd, _p10));
					},
					msg,
					c);
			});
	});
var _debois$elm_parts$Parts$pack = F5(
	function (update, get0, set0, model0, fwd) {
		var _p11 = A3(_debois$elm_parts$Parts$indexed, get0, set0, model0);
		var get = _p11._0;
		var set = _p11._1;
		return function (idx) {
			return function (_p12) {
				return fwd(
					A3(
						_debois$elm_parts$Parts$partial,
						fwd,
						A3(
							_debois$elm_parts$Parts$embedUpdate,
							get(idx),
							set(idx),
							update),
						_p12));
			};
		};
	});
var _debois$elm_parts$Parts$create = F6(
	function (view, update, get0, set0, model0, fwd) {
		var embeddedUpdate = A5(_debois$elm_parts$Parts$pack, update, get0, set0, model0, fwd);
		var get = _elm_lang$core$Basics$fst(
			A3(_debois$elm_parts$Parts$indexed, get0, set0, model0));
		return F2(
			function (idx, c) {
				return A2(
					view,
					embeddedUpdate(idx),
					A2(get, idx, c));
			});
	});
var _debois$elm_parts$Parts$pack1 = F4(
	function (update, get, set, fwd) {
		return function (_p13) {
			return fwd(
				A3(
					_debois$elm_parts$Parts$partial,
					fwd,
					A3(_debois$elm_parts$Parts$embedUpdate, get, set, update),
					_p13));
		};
	});
var _debois$elm_parts$Parts$create1 = F5(
	function (view, update, get, set, fwd) {
		var embeddedUpdate = function (_p14) {
			return fwd(
				A3(
					_debois$elm_parts$Parts$partial,
					fwd,
					A3(_debois$elm_parts$Parts$embedUpdate, get, set, update),
					_p14));
		};
		return A2(
			_debois$elm_parts$Parts$embedView,
			get,
			view(embeddedUpdate));
	});

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

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _debois$elm_mdl$Material_Helpers$noAttr = A2(_elm_lang$html$Html_Attributes$attribute, 'data-elm-mdl-noop', '');
var _debois$elm_mdl$Material_Helpers$delay = F2(
	function (t, x) {
		return A3(
			_elm_lang$core$Task$perform,
			_elm_lang$core$Basics$always(x),
			_elm_lang$core$Basics$always(x),
			_elm_lang$core$Process$sleep(t));
	});
var _debois$elm_mdl$Material_Helpers$cssTransitionStep = function (x) {
	return A2(_debois$elm_mdl$Material_Helpers$delay, 50, x);
};
var _debois$elm_mdl$Material_Helpers$cmd = function (msg) {
	return A3(
		_elm_lang$core$Task$perform,
		_elm_lang$core$Basics$always(msg),
		_elm_lang$core$Basics$always(msg),
		_elm_lang$core$Task$succeed(msg));
};
var _debois$elm_mdl$Material_Helpers$lift = F6(
	function (get, set, fwd, update, action, model) {
		var _p0 = A2(
			update,
			action,
			get(model));
		var submodel$ = _p0._0;
		var e = _p0._1;
		return {
			ctor: '_Tuple2',
			_0: A2(set, model, submodel$),
			_1: A2(_elm_lang$core$Platform_Cmd$map, fwd, e)
		};
	});
var _debois$elm_mdl$Material_Helpers$lift$ = F5(
	function (get, set, update, action, model) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				set,
				model,
				A2(
					update,
					action,
					get(model))),
			_1: _elm_lang$core$Platform_Cmd$none
		};
	});
var _debois$elm_mdl$Material_Helpers$map2nd = F2(
	function (f, _p1) {
		var _p2 = _p1;
		return {
			ctor: '_Tuple2',
			_0: _p2._0,
			_1: f(_p2._1)
		};
	});
var _debois$elm_mdl$Material_Helpers$map1st = F2(
	function (f, _p3) {
		var _p4 = _p3;
		return {
			ctor: '_Tuple2',
			_0: f(_p4._0),
			_1: _p4._1
		};
	});
var _debois$elm_mdl$Material_Helpers$blurOn = function (evt) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		A2(_elm_lang$core$Basics_ops['++'], 'on', evt),
		'this.blur()');
};
var _debois$elm_mdl$Material_Helpers$effect = F2(
	function (e, x) {
		return {ctor: '_Tuple2', _0: x, _1: e};
	});
var _debois$elm_mdl$Material_Helpers$pure = _debois$elm_mdl$Material_Helpers$effect(_elm_lang$core$Platform_Cmd$none);
var _debois$elm_mdl$Material_Helpers$filter = F3(
	function (elem, attr, html) {
		return A2(
			elem,
			attr,
			A2(
				_elm_lang$core$List$filterMap,
				function (x) {
					return x;
				},
				html));
	});

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

var _debois$elm_mdl$Material_Options_Internal$None = {ctor: 'None'};
var _debois$elm_mdl$Material_Options_Internal$Set = function (a) {
	return {ctor: 'Set', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Many = function (a) {
	return {ctor: 'Many', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Attribute = function (a) {
	return {ctor: 'Attribute', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$attribute = _debois$elm_mdl$Material_Options_Internal$Attribute;
var _debois$elm_mdl$Material_Options_Internal$CSS = function (a) {
	return {ctor: 'CSS', _0: a};
};
var _debois$elm_mdl$Material_Options_Internal$Class = function (a) {
	return {ctor: 'Class', _0: a};
};

var _debois$elm_mdl$Material_Options$attribute = _debois$elm_mdl$Material_Options_Internal$Attribute;
var _debois$elm_mdl$Material_Options$stylesheet = function (css) {
	return A3(
		_elm_lang$html$Html$node,
		'style',
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(css)
			]));
};
var _debois$elm_mdl$Material_Options$data = F2(
	function (key, val) {
		return _debois$elm_mdl$Material_Options_Internal$Attribute(
			A2(
				_elm_lang$html$Html_Attributes$attribute,
				A2(_elm_lang$core$Basics_ops['++'], 'data-', key),
				val));
	});
var _debois$elm_mdl$Material_Options$set = _debois$elm_mdl$Material_Options_Internal$Set;
var _debois$elm_mdl$Material_Options$nop = _debois$elm_mdl$Material_Options_Internal$None;
var _debois$elm_mdl$Material_Options$when = F2(
	function (prop, guard) {
		return guard ? prop : _debois$elm_mdl$Material_Options$nop;
	});
var _debois$elm_mdl$Material_Options$maybe = function (prop) {
	return A2(_elm_lang$core$Maybe$withDefault, _debois$elm_mdl$Material_Options$nop, prop);
};
var _debois$elm_mdl$Material_Options$many = _debois$elm_mdl$Material_Options_Internal$Many;
var _debois$elm_mdl$Material_Options$css = F2(
	function (key, value) {
		return _debois$elm_mdl$Material_Options_Internal$CSS(
			{ctor: '_Tuple2', _0: key, _1: value});
	});
var _debois$elm_mdl$Material_Options$center = _debois$elm_mdl$Material_Options$many(
	_elm_lang$core$Native_List.fromArray(
		[
			A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
			A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center'),
			A2(_debois$elm_mdl$Material_Options$css, 'justify-content', 'center')
		]));
var _debois$elm_mdl$Material_Options$scrim = function (opacity) {
	return A2(
		_debois$elm_mdl$Material_Options$css,
		'background',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(opacity),
				'))')));
};
var _debois$elm_mdl$Material_Options$cs = function (c) {
	return _debois$elm_mdl$Material_Options_Internal$Class(c);
};
var _debois$elm_mdl$Material_Options$disabled = function (v) {
	return _debois$elm_mdl$Material_Options_Internal$Attribute(
		_elm_lang$html$Html_Attributes$disabled(v));
};
var _debois$elm_mdl$Material_Options$addAttributes = F2(
	function (summary, attrs) {
		return _elm_lang$core$List$concat(
			_elm_lang$core$Native_List.fromArray(
				[
					attrs,
					_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$style(summary.css)
					]),
					_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$String$join, ' ', summary.classes))
					]),
					summary.attrs
				]));
	});
var _debois$elm_mdl$Material_Options$collect1 = F3(
	function (f, option, acc) {
		var _p0 = option;
		switch (_p0.ctor) {
			case 'Class':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						classes: A2(_elm_lang$core$List_ops['::'], _p0._0, acc.classes)
					});
			case 'CSS':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						css: A2(_elm_lang$core$List_ops['::'], _p0._0, acc.css)
					});
			case 'Attribute':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						attrs: A2(_elm_lang$core$List_ops['::'], _p0._0, acc.attrs)
					});
			case 'Many':
				return A3(
					_elm_lang$core$List$foldl,
					_debois$elm_mdl$Material_Options$collect1(f),
					acc,
					_p0._0);
			case 'Set':
				return _elm_lang$core$Native_Utils.update(
					acc,
					{
						config: A2(f, _p0._0, acc.config)
					});
			default:
				return acc;
		}
	});
var _debois$elm_mdl$Material_Options$recollect = _elm_lang$core$List$foldl(
	_debois$elm_mdl$Material_Options$collect1(
		F2(
			function (x, y) {
				return x(y);
			})));
var _debois$elm_mdl$Material_Options$collect = function (config0) {
	return _debois$elm_mdl$Material_Options$recollect(
		{
			classes: _elm_lang$core$Native_List.fromArray(
				[]),
			css: _elm_lang$core$Native_List.fromArray(
				[]),
			attrs: _elm_lang$core$Native_List.fromArray(
				[]),
			config: config0
		});
};
var _debois$elm_mdl$Material_Options$apply = F4(
	function (summary, ctor, options, attrs) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options$addAttributes,
				A2(_debois$elm_mdl$Material_Options$recollect, summary, options),
				attrs));
	});
var _debois$elm_mdl$Material_Options$collect$ = function (options) {
	return A3(
		_elm_lang$core$List$foldl,
		_debois$elm_mdl$Material_Options$collect1(
			F2(
				function (_p2, _p1) {
					return {ctor: '_Tuple0'};
				})),
		{
			classes: _elm_lang$core$Native_List.fromArray(
				[]),
			css: _elm_lang$core$Native_List.fromArray(
				[]),
			attrs: _elm_lang$core$Native_List.fromArray(
				[]),
			config: {ctor: '_Tuple0'}
		},
		options);
};
var _debois$elm_mdl$Material_Options$styled = F2(
	function (ctor, props) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options$addAttributes,
				_debois$elm_mdl$Material_Options$collect$(props),
				_elm_lang$core$Native_List.fromArray(
					[])));
	});
var _debois$elm_mdl$Material_Options$div = _debois$elm_mdl$Material_Options$styled(_elm_lang$html$Html$div);
var _debois$elm_mdl$Material_Options$span = _debois$elm_mdl$Material_Options$styled(_elm_lang$html$Html$span);
var _debois$elm_mdl$Material_Options$styled$ = F3(
	function (ctor, props, attrs) {
		return ctor(
			A2(
				_debois$elm_mdl$Material_Options$addAttributes,
				_debois$elm_mdl$Material_Options$collect$(props),
				attrs));
	});
var _debois$elm_mdl$Material_Options$img = F2(
	function (options, attrs) {
		return A4(
			_debois$elm_mdl$Material_Options$styled$,
			_elm_lang$html$Html$img,
			options,
			attrs,
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _debois$elm_mdl$Material_Options$Summary = F4(
	function (a, b, c, d) {
		return {classes: a, css: b, attrs: c, config: d};
	});

var _debois$elm_mdl$Material_Ripple$styles = F2(
	function (m, frame) {
		var r = m.rect;
		var toPx = function (k) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(
					_elm_lang$core$Basics$round(k)),
				'px');
		};
		var offset = A2(
			_elm_lang$core$Basics_ops['++'],
			'translate(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				toPx(m.x),
				A2(
					_elm_lang$core$Basics_ops['++'],
					', ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						toPx(m.y),
						')'))));
		var rippleSize = toPx(
			(_elm_lang$core$Basics$sqrt((r.width * r.width) + (r.height * r.height)) * 2.0) + 2.0);
		var scale = _elm_lang$core$Native_Utils.eq(frame, 0) ? 'scale(0.0001, 0.0001)' : '';
		var transformString = A2(
			_elm_lang$core$Basics_ops['++'],
			'translate(-50%, -50%) ',
			A2(_elm_lang$core$Basics_ops['++'], offset, scale));
		return _elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 'width', _1: rippleSize},
				{ctor: '_Tuple2', _0: 'height', _1: rippleSize},
				{ctor: '_Tuple2', _0: '-webkit-transform', _1: transformString},
				{ctor: '_Tuple2', _0: '-ms-transform', _1: transformString},
				{ctor: '_Tuple2', _0: 'transform', _1: transformString}
			]);
	});
var _debois$elm_mdl$Material_Ripple$Metrics = F3(
	function (a, b, c) {
		return {rect: a, x: b, y: c};
	});
var _debois$elm_mdl$Material_Ripple$computeMetrics = function (g) {
	var rect = g.rect;
	var set = F2(
		function (x, y) {
			return _elm_lang$core$Maybe$Just(
				{ctor: '_Tuple2', _0: x - rect.left, _1: y - rect.top});
		});
	return A2(
		_elm_lang$core$Maybe$map,
		function (_p0) {
			var _p1 = _p0;
			return A3(_debois$elm_mdl$Material_Ripple$Metrics, rect, _p1._0, _p1._1);
		},
		function () {
			var _p2 = {ctor: '_Tuple4', _0: g.clientX, _1: g.clientY, _2: g.touchX, _3: g.touchY};
			_v1_3:
			do {
				if (_p2.ctor === '_Tuple4') {
					if ((_p2._0.ctor === 'Just') && (_p2._1.ctor === 'Just')) {
						if ((_p2._0._0 === 0.0) && (_p2._1._0 === 0.0)) {
							return _elm_lang$core$Maybe$Just(
								{ctor: '_Tuple2', _0: rect.width / 2.0, _1: rect.height / 2.0});
						} else {
							return A2(set, _p2._0._0, _p2._1._0);
						}
					} else {
						if ((_p2._2.ctor === 'Just') && (_p2._3.ctor === 'Just')) {
							return A2(set, _p2._2._0, _p2._3._0);
						} else {
							break _v1_3;
						}
					}
				} else {
					break _v1_3;
				}
			} while(false);
			return _elm_lang$core$Maybe$Nothing;
		}());
};
var _debois$elm_mdl$Material_Ripple$Model = F3(
	function (a, b, c) {
		return {animation: a, metrics: b, ignoringMouseDown: c};
	});
var _debois$elm_mdl$Material_Ripple$DOMState = F6(
	function (a, b, c, d, e, f) {
		return {rect: a, clientX: b, clientY: c, touchX: d, touchY: e, type$: f};
	});
var _debois$elm_mdl$Material_Ripple$geometryDecoder = A7(
	_elm_lang$core$Json_Decode$object6,
	_debois$elm_mdl$Material_Ripple$DOMState,
	A2(_elm_lang$core$Json_Decode_ops[':='], 'currentTarget', _debois$elm_dom$DOM$boundingClientRect),
	_elm_lang$core$Json_Decode$maybe(
		A2(_elm_lang$core$Json_Decode_ops[':='], 'clientX', _elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(_elm_lang$core$Json_Decode_ops[':='], 'clientY', _elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$at,
			_elm_lang$core$Native_List.fromArray(
				['touches', '0', 'clientX']),
			_elm_lang$core$Json_Decode$float)),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$at,
			_elm_lang$core$Native_List.fromArray(
				['touches', '0', 'clientY']),
			_elm_lang$core$Json_Decode$float)),
	A2(_elm_lang$core$Json_Decode_ops[':='], 'type', _elm_lang$core$Json_Decode$string));
var _debois$elm_mdl$Material_Ripple$Inert = {ctor: 'Inert'};
var _debois$elm_mdl$Material_Ripple$model = {animation: _debois$elm_mdl$Material_Ripple$Inert, metrics: _elm_lang$core$Maybe$Nothing, ignoringMouseDown: false};
var _debois$elm_mdl$Material_Ripple$Frame = function (a) {
	return {ctor: 'Frame', _0: a};
};
var _debois$elm_mdl$Material_Ripple$view$ = F2(
	function (attrs, model) {
		var styling = function () {
			var _p3 = {ctor: '_Tuple2', _0: model.metrics, _1: model.animation};
			if ((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) {
				if (_p3._1.ctor === 'Frame') {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p3._0._0, _p3._1._0);
				} else {
					return A2(_debois$elm_mdl$Material_Ripple$styles, _p3._0._0, 1);
				}
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}();
		return A2(
			_elm_lang$html$Html$span,
			attrs,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$classList(
							_elm_lang$core$Native_List.fromArray(
								[
									{ctor: '_Tuple2', _0: 'mdl-ripple', _1: true},
									{
									ctor: '_Tuple2',
									_0: 'is-animating',
									_1: !_elm_lang$core$Native_Utils.eq(
										model.animation,
										_debois$elm_mdl$Material_Ripple$Frame(0))
								},
									{
									ctor: '_Tuple2',
									_0: 'is-visible',
									_1: !_elm_lang$core$Native_Utils.eq(model.animation, _debois$elm_mdl$Material_Ripple$Inert)
								}
								])),
							_elm_lang$html$Html_Attributes$style(styling)
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _debois$elm_mdl$Material_Ripple$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Ripple$update = F2(
	function (action, model) {
		var _p4 = action;
		switch (_p4.ctor) {
			case 'Down':
				var _p5 = _p4._0;
				return (_elm_lang$core$Native_Utils.eq(_p5.type$, 'mousedown') && model.ignoringMouseDown) ? _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{ignoringMouseDown: false})) : A2(
					_debois$elm_mdl$Material_Helpers$effect,
					_debois$elm_mdl$Material_Helpers$cssTransitionStep(_debois$elm_mdl$Material_Ripple$Tick),
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(0),
							metrics: _debois$elm_mdl$Material_Ripple$computeMetrics(_p5),
							ignoringMouseDown: _elm_lang$core$Native_Utils.eq(_p5.type$, 'touchstart') ? true : model.ignoringMouseDown
						}));
			case 'Up':
				return _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{animation: _debois$elm_mdl$Material_Ripple$Inert}));
			default:
				return _debois$elm_mdl$Material_Helpers$pure(
					_elm_lang$core$Native_Utils.update(
						model,
						{
							animation: _debois$elm_mdl$Material_Ripple$Frame(1)
						}));
		}
	});
var _debois$elm_mdl$Material_Ripple$Up = {ctor: 'Up'};
var _debois$elm_mdl$Material_Ripple$upOn$ = F2(
	function (f, name) {
		return A2(
			_elm_lang$html$Html_Events$on,
			name,
			_elm_lang$core$Json_Decode$succeed(
				f(_debois$elm_mdl$Material_Ripple$Up)));
	});
var _debois$elm_mdl$Material_Ripple$upOn = _debois$elm_mdl$Material_Ripple$upOn$(_elm_lang$core$Basics$identity);
var _debois$elm_mdl$Material_Ripple$Down = function (a) {
	return {ctor: 'Down', _0: a};
};
var _debois$elm_mdl$Material_Ripple$downOn$ = F2(
	function (f, name) {
		return A2(
			_elm_lang$html$Html_Events$on,
			name,
			A2(
				_elm_lang$core$Json_Decode$map,
				function (_p6) {
					return f(
						_debois$elm_mdl$Material_Ripple$Down(_p6));
				},
				_debois$elm_mdl$Material_Ripple$geometryDecoder));
	});
var _debois$elm_mdl$Material_Ripple$downOn = _debois$elm_mdl$Material_Ripple$downOn$(_elm_lang$core$Basics$identity);
var _debois$elm_mdl$Material_Ripple$view = function (_p7) {
	return _debois$elm_mdl$Material_Ripple$view$(
		A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$List$append,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Ripple$upOn('mouseup'),
					_debois$elm_mdl$Material_Ripple$upOn('mouseleave'),
					_debois$elm_mdl$Material_Ripple$upOn('touchend'),
					_debois$elm_mdl$Material_Ripple$upOn('blur'),
					_debois$elm_mdl$Material_Ripple$downOn('mousedown'),
					_debois$elm_mdl$Material_Ripple$downOn('touchstart')
				]),
			_p7));
};

var _debois$elm_mdl$Material_Button$icon = _debois$elm_mdl$Material_Options$cs('mdl-button--icon');
var _debois$elm_mdl$Material_Button$minifab = _debois$elm_mdl$Material_Options$cs('mdl-button--mini-fab');
var _debois$elm_mdl$Material_Button$fab = _debois$elm_mdl$Material_Options$cs('mdl-button--fab');
var _debois$elm_mdl$Material_Button$raised = _debois$elm_mdl$Material_Options$cs('mdl-button--raised');
var _debois$elm_mdl$Material_Button$flat = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Button$blurAndForward = function (event) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		A2(_elm_lang$core$Basics_ops['++'], 'on', event),
		'this.blur(); (function(self) { var e = document.createEvent(\'Event\'); e.initEvent(\'touchcancel\', true, true); self.lastChild.dispatchEvent(e); }(this));');
};
var _debois$elm_mdl$Material_Button$accent = _debois$elm_mdl$Material_Options$cs('mdl-button--accent');
var _debois$elm_mdl$Material_Button$primary = _debois$elm_mdl$Material_Options$cs('mdl-button--primary');
var _debois$elm_mdl$Material_Button$colored = _debois$elm_mdl$Material_Options$cs('mdl-button--colored');
var _debois$elm_mdl$Material_Button$plain = _debois$elm_mdl$Material_Options$nop;
var _debois$elm_mdl$Material_Button$disabled = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{disabled: true});
	});
var _debois$elm_mdl$Material_Button$ripple = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Button$onClick = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					onClick: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Events$onClick(x))
				});
		});
};
var _debois$elm_mdl$Material_Button$defaultConfig = {ripple: false, onClick: _elm_lang$core$Maybe$Nothing, disabled: false};
var _debois$elm_mdl$Material_Button$view = F4(
	function (lift, model, config, html) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Button$defaultConfig, config);
		var startListeners = summary.config.ripple ? _elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$core$Maybe$Just(
				A2(_debois$elm_mdl$Material_Ripple$downOn$, lift, 'mousedown')),
				_elm_lang$core$Maybe$Just(
				A2(_debois$elm_mdl$Material_Ripple$downOn$, lift, 'touchstart'))
			]) : _elm_lang$core$Native_List.fromArray(
			[]);
		var stopListeners = function () {
			var handle = function (_p0) {
				return _elm_lang$core$Maybe$Just(
					(summary.config.ripple ? _debois$elm_mdl$Material_Button$blurAndForward : _debois$elm_mdl$Material_Helpers$blurOn)(_p0));
			};
			return _elm_lang$core$Native_List.fromArray(
				[
					handle('mouseup'),
					handle('mouseleave'),
					handle('touchend')
				]);
		}();
		var misc = _elm_lang$core$Native_List.fromArray(
			[
				summary.config.onClick,
				summary.config.disabled ? _elm_lang$core$Maybe$Just(
				_elm_lang$html$Html_Attributes$disabled(true)) : _elm_lang$core$Maybe$Nothing
			]);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$button,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-button'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-button'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					summary.config.ripple)
				]),
			A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				_elm_lang$core$List$concat(
					_elm_lang$core$Native_List.fromArray(
						[startListeners, stopListeners, misc]))),
			summary.config.ripple ? _elm_lang$core$List$concat(
				_elm_lang$core$Native_List.fromArray(
					[
						html,
						_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html_App$map,
							lift,
							A2(
								_debois$elm_mdl$Material_Ripple$view$,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('mdl-button__ripple-container'),
										_debois$elm_mdl$Material_Ripple$upOn('blur'),
										_debois$elm_mdl$Material_Ripple$upOn('touchcancel')
									]),
								model))
						])
					])) : html);
	});
var _debois$elm_mdl$Material_Button$update = function (action) {
	return _debois$elm_mdl$Material_Ripple$update(action);
};
var _debois$elm_mdl$Material_Button$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Button$view,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Button$update),
	function (_) {
		return _.button;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{button: x});
		}),
	_debois$elm_mdl$Material_Ripple$model);
var _debois$elm_mdl$Material_Button$defaultModel = _debois$elm_mdl$Material_Ripple$model;
var _debois$elm_mdl$Material_Button$Config = F3(
	function (a, b, c) {
		return {ripple: a, onClick: b, disabled: c};
	});

var _debois$elm_mdl$Material_Textfield$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'Input':
				return _elm_lang$core$Native_Utils.update(
					model,
					{value: _p0._0});
			case 'Blur':
				return _elm_lang$core$Native_Utils.update(
					model,
					{isFocused: false});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{isFocused: true});
		}
	});
var _debois$elm_mdl$Material_Textfield$defaultModel = {isFocused: false, value: ''};
var _debois$elm_mdl$Material_Textfield$cols = function (cols) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					cols: _elm_lang$core$Maybe$Just(cols)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$rows = function (rows) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					rows: _elm_lang$core$Maybe$Just(rows)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$style = function (style) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					style: A2(_elm_lang$core$Basics_ops['++'], style, config.style)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$on = F2(
	function (event, decoder) {
		return _debois$elm_mdl$Material_Options$set(
			function (config) {
				return _elm_lang$core$Native_Utils.update(
					config,
					{
						listeners: A2(
							_elm_lang$core$Basics_ops['++'],
							config.listeners,
							_elm_lang$core$Native_List.fromArray(
								[
									A2(_elm_lang$html$Html_Events$on, event, decoder)
								]))
					});
			});
	});
var _debois$elm_mdl$Material_Textfield$onInput = function (f) {
	return A2(
		_debois$elm_mdl$Material_Textfield$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, f, _elm_lang$html$Html_Events$targetValue));
};
var _debois$elm_mdl$Material_Textfield$onBlur = function (f) {
	return A2(
		_debois$elm_mdl$Material_Textfield$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(f));
};
var _debois$elm_mdl$Material_Textfield$onFocus = function (f) {
	return A2(
		_debois$elm_mdl$Material_Textfield$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(f));
};
var _debois$elm_mdl$Material_Textfield$disabled = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{disabled: true});
	});
var _debois$elm_mdl$Material_Textfield$maxlength = function (v) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					maxlength: _elm_lang$core$Maybe$Just(v)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$autofocus = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{autofocus: true});
	});
var _debois$elm_mdl$Material_Textfield$value = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					value: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$error = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					error: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$floatingLabel = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{labelFloat: true});
	});
var _debois$elm_mdl$Material_Textfield$label = function (str) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					labelText: _elm_lang$core$Maybe$Just(str)
				});
		});
};
var _debois$elm_mdl$Material_Textfield$Config = function (a) {
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
													return {labelText: a, labelFloat: b, error: c, value: d, disabled: e, onInput: f, kind: g, rows: h, cols: i, autofocus: j, maxlength: k, style: l, listeners: m};
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
var _debois$elm_mdl$Material_Textfield$Model = F2(
	function (a, b) {
		return {isFocused: a, value: b};
	});
var _debois$elm_mdl$Material_Textfield$Password = {ctor: 'Password'};
var _debois$elm_mdl$Material_Textfield$password = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Password});
	});
var _debois$elm_mdl$Material_Textfield$Textarea = {ctor: 'Textarea'};
var _debois$elm_mdl$Material_Textfield$textarea = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Textarea});
	});
var _debois$elm_mdl$Material_Textfield$Text = {ctor: 'Text'};
var _debois$elm_mdl$Material_Textfield$defaultConfig = {
	labelText: _elm_lang$core$Maybe$Nothing,
	labelFloat: false,
	error: _elm_lang$core$Maybe$Nothing,
	value: _elm_lang$core$Maybe$Nothing,
	disabled: false,
	kind: _debois$elm_mdl$Material_Textfield$Text,
	onInput: _elm_lang$core$Maybe$Nothing,
	rows: _elm_lang$core$Maybe$Nothing,
	cols: _elm_lang$core$Maybe$Nothing,
	autofocus: false,
	maxlength: _elm_lang$core$Maybe$Nothing,
	style: _elm_lang$core$Native_List.fromArray(
		[]),
	listeners: _elm_lang$core$Native_List.fromArray(
		[])
};
var _debois$elm_mdl$Material_Textfield$text$ = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{kind: _debois$elm_mdl$Material_Textfield$Text});
	});
var _debois$elm_mdl$Material_Textfield$Input = function (a) {
	return {ctor: 'Input', _0: a};
};
var _debois$elm_mdl$Material_Textfield$Focus = {ctor: 'Focus'};
var _debois$elm_mdl$Material_Textfield$Blur = {ctor: 'Blur'};
var _debois$elm_mdl$Material_Textfield$view = F3(
	function (lift, model, options) {
		var _p1 = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Textfield$defaultConfig, options);
		var summary = _p1;
		var config = _p1.config;
		var val = A2(_elm_lang$core$Maybe$withDefault, model.value, config.value);
		var isTextarea = _elm_lang$core$Native_Utils.eq(config.kind, _debois$elm_mdl$Material_Textfield$Textarea);
		var elementFunction = isTextarea ? _elm_lang$html$Html$textarea : _elm_lang$html$Html$input;
		var typeAttributes = function () {
			var _p2 = config.kind;
			switch (_p2.ctor) {
				case 'Text':
					return _elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('text')
						]);
				case 'Password':
					return _elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('password')
						]);
				default:
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_List.fromArray(
							[]),
						A2(
							_elm_lang$core$Basics_ops['++'],
							function () {
								var _p3 = config.rows;
								if (_p3.ctor === 'Just') {
									return _elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$rows(_p3._0)
										]);
								} else {
									return _elm_lang$core$Native_List.fromArray(
										[]);
								}
							}(),
							function () {
								var _p4 = config.cols;
								if (_p4.ctor === 'Just') {
									return _elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$cols(_p4._0)
										]);
								} else {
									return _elm_lang$core$Native_List.fromArray(
										[]);
								}
							}()));
			}
		}();
		var maxlength = function () {
			var _p5 = config.maxlength;
			if (_p5.ctor === 'Just') {
				return _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$maxlength(_p5._0)
					]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}();
		var listeners = config.listeners;
		var textValue = function () {
			var _p6 = config.value;
			if (_p6.ctor === 'Just') {
				return _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$value(_p6._0)
					]);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}();
		var defaultInput = function () {
			var _p7 = config.value;
			if (_p7.ctor === 'Just') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$html$Html_Events$on,
						'input',
						A2(
							_elm_lang$core$Json_Decode$map,
							function (_p8) {
								return lift(
									_debois$elm_mdl$Material_Textfield$Input(_p8));
							},
							_elm_lang$html$Html_Events$targetValue)));
			}
		}();
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-textfield'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-textfield'),
					_debois$elm_mdl$Material_Options$cs('is-upgraded'),
					config.labelFloat ? _debois$elm_mdl$Material_Options$cs('mdl-textfield--floating-label') : _debois$elm_mdl$Material_Options$nop,
					(!_elm_lang$core$Native_Utils.eq(config.error, _elm_lang$core$Maybe$Nothing)) ? _debois$elm_mdl$Material_Options$cs('is-invalid') : _debois$elm_mdl$Material_Options$nop,
					(!_elm_lang$core$Native_Utils.eq(val, '')) ? _debois$elm_mdl$Material_Options$cs('is-dirty') : _debois$elm_mdl$Material_Options$nop,
					(model.isFocused && _elm_lang$core$Basics$not(config.disabled)) ? _debois$elm_mdl$Material_Options$cs('is-focused') : _debois$elm_mdl$Material_Options$nop,
					config.disabled ? _debois$elm_mdl$Material_Options$cs('is-disabled') : _debois$elm_mdl$Material_Options$nop
				]),
			A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html_Events$on,
							'focusin',
							_elm_lang$core$Json_Decode$succeed(
								lift(_debois$elm_mdl$Material_Textfield$Focus)))),
						_elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html_Events$on,
							'focusout',
							_elm_lang$core$Json_Decode$succeed(
								lift(_debois$elm_mdl$Material_Textfield$Blur)))),
						defaultInput
					])),
			_elm_lang$core$Native_List.fromArray(
				[
					A4(
					_debois$elm_mdl$Material_Options$styled$,
					elementFunction,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$many(config.style),
							_debois$elm_mdl$Material_Options$cs('mdl-textfield__input'),
							A2(_debois$elm_mdl$Material_Options$css, 'outline', 'none')
						]),
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$disabled(config.disabled),
								_elm_lang$html$Html_Attributes$autofocus(config.autofocus)
							]),
						A2(
							_elm_lang$core$Basics_ops['++'],
							textValue,
							A2(
								_elm_lang$core$Basics_ops['++'],
								typeAttributes,
								A2(_elm_lang$core$Basics_ops['++'], maxlength, listeners)))),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$label,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-textfield__label')
						]),
					function () {
						var _p9 = config.labelText;
						if (_p9.ctor === 'Just') {
							return _elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(_p9._0)
								]);
						} else {
							return _elm_lang$core$Native_List.fromArray(
								[]);
						}
					}()),
					A2(
					_elm_lang$core$Maybe$withDefault,
					A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[]),
						_elm_lang$core$Native_List.fromArray(
							[])),
					A2(
						_elm_lang$core$Maybe$map,
						function (e) {
							return A2(
								_elm_lang$html$Html$span,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('mdl-textfield__error')
									]),
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html$text(e)
									]));
						},
						config.error))
				]));
	});
var _debois$elm_mdl$Material_Textfield$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Textfield$view,
	F3(
		function (_p10, msg, model) {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '_Tuple2',
					_0: A2(_debois$elm_mdl$Material_Textfield$update, msg, model),
					_1: _elm_lang$core$Platform_Cmd$none
				});
		}),
	function (_) {
		return _.textfield;
	},
	F2(
		function (x, c) {
			return _elm_lang$core$Native_Utils.update(
				c,
				{textfield: x});
		}),
	_debois$elm_mdl$Material_Textfield$defaultModel);

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

var _debois$elm_mdl$Material_Icon$size48 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '48px');
var _debois$elm_mdl$Material_Icon$size36 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '36px');
var _debois$elm_mdl$Material_Icon$size24 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '24px');
var _debois$elm_mdl$Material_Icon$size18 = A2(_debois$elm_mdl$Material_Options$css, 'font-size', '18px');
var _debois$elm_mdl$Material_Icon$onClick = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onClick: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Events$onClick(x))
				});
		});
};
var _debois$elm_mdl$Material_Icon$defaultConfig = {onClick: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Icon$view = F2(
	function (name, options) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Icon$defaultConfig, options);
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$i,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('material-icons')
				]),
			A2(
				_elm_lang$core$Maybe$withDefault,
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$Maybe$map,
					A2(
						_elm_lang$core$Basics$flip,
						F2(
							function (x, y) {
								return A2(_elm_lang$core$List_ops['::'], x, y);
							}),
						_elm_lang$core$Native_List.fromArray(
							[])),
					summary.config.onClick)),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(name)
				]));
	});
var _debois$elm_mdl$Material_Icon$i = function (name) {
	return A2(
		_debois$elm_mdl$Material_Icon$view,
		name,
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _debois$elm_mdl$Material_Icon$Config = function (a) {
	return {onClick: a};
};

var _debois$elm_mdl$Material_Menu_Geometry$Geometry = F5(
	function (a, b, c, d, e) {
		return {button: a, menu: b, container: c, offsetTops: d, offsetHeights: e};
	});
var _debois$elm_mdl$Material_Menu_Geometry$Element = F4(
	function (a, b, c, d) {
		return {offsetTop: a, offsetLeft: b, offsetHeight: c, bounds: d};
	});
var _debois$elm_mdl$Material_Menu_Geometry$element = A5(_elm_lang$core$Json_Decode$object4, _debois$elm_mdl$Material_Menu_Geometry$Element, _debois$elm_dom$DOM$offsetTop, _debois$elm_dom$DOM$offsetLeft, _debois$elm_dom$DOM$offsetHeight, _debois$elm_dom$DOM$boundingClientRect);
var _debois$elm_mdl$Material_Menu_Geometry$decode = A6(
	_elm_lang$core$Json_Decode$object5,
	_debois$elm_mdl$Material_Menu_Geometry$Geometry,
	_debois$elm_dom$DOM$target(_debois$elm_mdl$Material_Menu_Geometry$element),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(_debois$elm_dom$DOM$childNode, 1, _debois$elm_mdl$Material_Menu_Geometry$element))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(_debois$elm_mdl$Material_Menu_Geometry$element)),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(
				_debois$elm_dom$DOM$childNode,
				1,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetTop)))),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(
				_debois$elm_dom$DOM$childNode,
				1,
				_debois$elm_dom$DOM$childNodes(_debois$elm_dom$DOM$offsetHeight)))));

var _debois$elm_mdl$Material_Menu$toPx = function (_p0) {
	return A3(
		_elm_lang$core$Basics$flip,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		'px',
		_elm_lang$core$Basics$toString(_p0));
};
var _debois$elm_mdl$Material_Menu$rect = F4(
	function (x, y, w, h) {
		return function (coords) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'rect(',
				A2(_elm_lang$core$Basics_ops['++'], coords, ')'));
		}(
			A2(
				_elm_lang$core$String$join,
				' ',
				A2(
					_elm_lang$core$List$map,
					_debois$elm_mdl$Material_Menu$toPx,
					_elm_lang$core$Native_List.fromArray(
						[x, y, w, h]))));
	});
var _debois$elm_mdl$Material_Menu$onKeyDown = function (action) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'keydown',
		{preventDefault: true, stopPropagation: false},
		A2(_elm_lang$core$Json_Decode$map, action, _elm_lang$html$Html_Events$keyCode));
};
var _debois$elm_mdl$Material_Menu$onClick = F2(
	function (decoder, action) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'click',
			A2(_elm_lang$core$Json_Decode$map, action, decoder));
	});
var _debois$elm_mdl$Material_Menu$withGeometry = F2(
	function (model, f) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_debois$elm_mdl$Material_Options$nop,
			A2(_elm_lang$core$Maybe$map, f, model.geometry));
	});
var _debois$elm_mdl$Material_Menu$icon = function (name) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{icon: name});
		});
};
var _debois$elm_mdl$Material_Menu$ripple = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Menu$onSelect = function (msg) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onSelect: _elm_lang$core$Maybe$Just(msg)
				});
		});
};
var _debois$elm_mdl$Material_Menu$disabled = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{enabled: false});
	});
var _debois$elm_mdl$Material_Menu$divider = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{divider: true});
	});
var _debois$elm_mdl$Material_Menu$defaultItemConfig = {enabled: true, divider: false, onSelect: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Menu$constant = {transitionDurationSeconds: 0.3, transitionDurationFraction: 0.8, closeTimeout: 150};
var _debois$elm_mdl$Material_Menu$transitionDuration = _debois$elm_mdl$Material_Menu$constant.transitionDurationSeconds * _debois$elm_mdl$Material_Menu$constant.transitionDurationFraction;
var _debois$elm_mdl$Material_Menu$Model = F4(
	function (a, b, c, d) {
		return {ripples: a, animationState: b, geometry: c, index: d};
	});
var _debois$elm_mdl$Material_Menu$Item = F2(
	function (a, b) {
		return {options: a, html: b};
	});
var _debois$elm_mdl$Material_Menu$item = _debois$elm_mdl$Material_Menu$Item;
var _debois$elm_mdl$Material_Menu$ItemConfig = F3(
	function (a, b, c) {
		return {enabled: a, divider: b, onSelect: c};
	});
var _debois$elm_mdl$Material_Menu$Config = F3(
	function (a, b, c) {
		return {alignment: a, ripple: b, icon: c};
	});
var _debois$elm_mdl$Material_Menu$Closing = {ctor: 'Closing'};
var _debois$elm_mdl$Material_Menu$Opened = {ctor: 'Opened'};
var _debois$elm_mdl$Material_Menu$clip = F3(
	function (model, config, geometry) {
		var height = geometry.menu.bounds.height;
		var width = geometry.menu.bounds.width;
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'clip',
			function () {
				if (_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)) {
					return A4(_debois$elm_mdl$Material_Menu$rect, 0, width, height, 0);
				} else {
					var _p1 = config.alignment;
					switch (_p1.ctor) {
						case 'BottomRight':
							return A4(_debois$elm_mdl$Material_Menu$rect, 0, width, 0, width);
						case 'TopLeft':
							return A4(_debois$elm_mdl$Material_Menu$rect, height, 0, height, 0);
						case 'TopRight':
							return A4(_debois$elm_mdl$Material_Menu$rect, height, width, height, width);
						default:
							return '';
					}
				}
			}());
	});
var _debois$elm_mdl$Material_Menu$Opening = {ctor: 'Opening'};
var _debois$elm_mdl$Material_Menu$isActive = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening);
};
var _debois$elm_mdl$Material_Menu$Idle = {ctor: 'Idle'};
var _debois$elm_mdl$Material_Menu$defaultModel = {ripples: _elm_lang$core$Dict$empty, animationState: _debois$elm_mdl$Material_Menu$Idle, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Menu$Key = F2(
	function (a, b) {
		return {ctor: 'Key', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Material_Menu$subscriptions = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) ? _elm_lang$mouse$Mouse$clicks(_debois$elm_mdl$Material_Menu$Click) : _elm_lang$core$Platform_Sub$none;
};
var _debois$elm_mdl$Material_Menu$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$Tick = {ctor: 'Tick'};
var _debois$elm_mdl$Material_Menu$Close = {ctor: 'Close'};
var _debois$elm_mdl$Material_Menu$Select = F2(
	function (a, b) {
		return {ctor: 'Select', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Menu$update = F3(
	function (fwd, msg, model) {
		update:
		while (true) {
			var _p2 = msg;
			switch (_p2.ctor) {
				case 'Open':
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								animationState: function () {
									var _p3 = model.animationState;
									if (_p3.ctor === 'Opened') {
										return _debois$elm_mdl$Material_Menu$Opened;
									} else {
										return _debois$elm_mdl$Material_Menu$Opening;
									}
								}(),
								geometry: _elm_lang$core$Maybe$Just(_p2._0)
							}),
						_1: _debois$elm_mdl$Material_Helpers$cmd(
							fwd(_debois$elm_mdl$Material_Menu$Tick))
					};
				case 'Tick':
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{animationState: _debois$elm_mdl$Material_Menu$Opened}));
				case 'Close':
					return _debois$elm_mdl$Material_Helpers$pure(
						_elm_lang$core$Native_Utils.update(
							model,
							{animationState: _debois$elm_mdl$Material_Menu$Idle, geometry: _elm_lang$core$Maybe$Nothing, index: _elm_lang$core$Maybe$Nothing}));
				case 'Select':
					var cmds = A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Maybe$Just(
								A2(
									_debois$elm_mdl$Material_Helpers$delay,
									_debois$elm_mdl$Material_Menu$constant.closeTimeout,
									fwd(_debois$elm_mdl$Material_Menu$Close))),
								A2(_elm_lang$core$Maybe$map, _debois$elm_mdl$Material_Helpers$cmd, _p2._1)
							]));
					var model$ = _elm_lang$core$Native_Utils.update(
						model,
						{animationState: _debois$elm_mdl$Material_Menu$Closing});
					return {
						ctor: '_Tuple2',
						_0: model$,
						_1: _elm_lang$core$Platform_Cmd$batch(cmds)
					};
				case 'Ripple':
					var _p6 = _p2._0;
					var _p4 = A2(
						_debois$elm_mdl$Material_Ripple$update,
						_p2._1,
						A2(
							_elm_lang$core$Maybe$withDefault,
							_debois$elm_mdl$Material_Ripple$model,
							A2(_elm_lang$core$Dict$get, _p6, model.ripples)));
					var model$ = _p4._0;
					var effects = _p4._1;
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								ripples: A3(_elm_lang$core$Dict$insert, _p6, model$, model.ripples)
							}),
						_1: A2(
							_elm_lang$core$Platform_Cmd$map,
							function (_p5) {
								return fwd(
									A2(_debois$elm_mdl$Material_Menu$Ripple, _p6, _p5));
							},
							effects)
					};
				case 'Click':
					if (_debois$elm_mdl$Material_Menu$isActive(model)) {
						var _p7 = model.geometry;
						if (_p7.ctor === 'Just') {
							var inside = F2(
								function (_p9, _p8) {
									var _p10 = _p9;
									var _p15 = _p10.y;
									var _p14 = _p10.x;
									var _p11 = _p8;
									var _p13 = _p11.top;
									var _p12 = _p11.left;
									return (_elm_lang$core$Native_Utils.cmp(
										_p12,
										_elm_lang$core$Basics$toFloat(_p14)) < 1) && ((_elm_lang$core$Native_Utils.cmp(
										_elm_lang$core$Basics$toFloat(_p14),
										_p12 + _p11.width) < 1) && ((_elm_lang$core$Native_Utils.cmp(
										_p13,
										_elm_lang$core$Basics$toFloat(_p15)) < 1) && (_elm_lang$core$Native_Utils.cmp(
										_elm_lang$core$Basics$toFloat(_p15),
										_p13 + _p11.height) < 1)));
								});
							if (A2(inside, _p2._0, _p7._0.menu.bounds)) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							} else {
								var _v6 = fwd,
									_v7 = _debois$elm_mdl$Material_Menu$Close,
									_v8 = model;
								fwd = _v6;
								msg = _v7;
								model = _v8;
								continue update;
							}
						} else {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								_elm_lang$core$Native_List.fromArray(
									[]));
						}
					} else {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							_elm_lang$core$Native_List.fromArray(
								[]));
					}
				default:
					var _p24 = _p2._0;
					var _p16 = _p2._1;
					switch (_p16) {
						case 13:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var _p17 = model.index;
								if (_p17.ctor === 'Just') {
									var _p19 = _p17._0;
									var cmd = A3(
										_elm_lang$core$Basics$flip,
										_elm_lang$core$Maybe$andThen,
										function (_p18) {
											return function (_) {
												return _.onSelect;
											}(
												function (_) {
													return _.config;
												}(_p18));
										},
										_elm_lang$core$List$head(
											A2(_elm_lang$core$List$drop, _p19, _p24)));
									var _v11 = fwd,
										_v12 = A2(_debois$elm_mdl$Material_Menu$Select, _p19 + 1, cmd),
										_v13 = model;
									fwd = _v11;
									msg = _v12;
									model = _v13;
									continue update;
								} else {
									var _v14 = fwd,
										_v15 = _debois$elm_mdl$Material_Menu$Close,
										_v16 = model;
									fwd = _v14;
									msg = _v15;
									model = _v16;
									continue update;
								}
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						case 27:
							var _v17 = fwd,
								_v18 = _debois$elm_mdl$Material_Menu$Close,
								_v19 = model;
							fwd = _v17;
							msg = _v18;
							model = _v19;
							continue update;
						case 32:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var _v20 = fwd,
									_v21 = A2(_debois$elm_mdl$Material_Menu$Key, _p24, 13),
									_v22 = model;
								fwd = _v20;
								msg = _v21;
								model = _v22;
								continue update;
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						case 40:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var items = A2(
									_elm_lang$core$List$indexedMap,
									F2(
										function (v0, v1) {
											return {ctor: '_Tuple2', _0: v0, _1: v1};
										}),
									_p24);
								return A3(
									_elm_lang$core$Basics$flip,
									F2(
										function (x, y) {
											return A2(_elm_lang$core$Platform_Cmd_ops['!'], x, y);
										}),
									_elm_lang$core$Native_List.fromArray(
										[]),
									A2(
										_elm_lang$core$Maybe$withDefault,
										model,
										A2(
											_elm_lang$core$Maybe$map,
											function (_p20) {
												return function (index$) {
													return _elm_lang$core$Native_Utils.update(
														model,
														{
															index: _elm_lang$core$Maybe$Just(index$)
														});
												}(
													_elm_lang$core$Basics$fst(_p20));
											},
											_elm_lang$core$List$head(
												A2(
													_elm_lang$core$List$filter,
													function (_p21) {
														return function (_) {
															return _.enabled;
														}(
															function (_) {
																return _.config;
															}(
																_elm_lang$core$Basics$snd(_p21)));
													},
													A2(
														_elm_lang$core$List$drop,
														1 + A2(_elm_lang$core$Maybe$withDefault, -1, model.index),
														A2(_elm_lang$core$Basics_ops['++'], items, items)))))));
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						case 38:
							if (_debois$elm_mdl$Material_Menu$isActive(model)) {
								var items = A2(
									_elm_lang$core$List$indexedMap,
									F2(
										function (v0, v1) {
											return {ctor: '_Tuple2', _0: v0, _1: v1};
										}),
									_p24);
								return _debois$elm_mdl$Material_Helpers$pure(
									A2(
										_elm_lang$core$Maybe$withDefault,
										model,
										A2(
											_elm_lang$core$Maybe$map,
											function (_p22) {
												return function (index$) {
													return _elm_lang$core$Native_Utils.update(
														model,
														{
															index: _elm_lang$core$Maybe$Just(index$)
														});
												}(
													_elm_lang$core$Basics$fst(_p22));
											},
											_elm_lang$core$List$head(
												A2(
													_elm_lang$core$List$filter,
													function (_p23) {
														return function (_) {
															return _.enabled;
														}(
															function (_) {
																return _.config;
															}(
																_elm_lang$core$Basics$snd(_p23)));
													},
													A2(
														_elm_lang$core$List$drop,
														_elm_lang$core$List$length(_p24) - A2(_elm_lang$core$Maybe$withDefault, 0, model.index),
														_elm_lang$core$List$reverse(
															A2(_elm_lang$core$Basics_ops['++'], items, items))))))));
							} else {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									_elm_lang$core$Native_List.fromArray(
										[]));
							}
						default:
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								_elm_lang$core$Native_List.fromArray(
									[]));
					}
			}
		}
	});
var _debois$elm_mdl$Material_Menu$update$ = F3(
	function (fwd, msg, model) {
		return _elm_lang$core$Maybe$Just(
			A3(_debois$elm_mdl$Material_Menu$update, fwd, msg, model));
	});
var _debois$elm_mdl$Material_Menu$pack = A4(
	_debois$elm_parts$Parts$pack,
	_debois$elm_mdl$Material_Menu$update$,
	function (_) {
		return _.menu;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{menu: x});
		}),
	_debois$elm_mdl$Material_Menu$defaultModel);
var _debois$elm_mdl$Material_Menu$subs = function (lift) {
	return function (_p25) {
		return _elm_lang$core$Platform_Sub$batch(
			A3(
				_elm_lang$core$Dict$foldl,
				F3(
					function (idx, model, ss) {
						return A2(
							_elm_lang$core$List_ops['::'],
							A2(
								_elm_lang$core$Platform_Sub$map,
								A2(_debois$elm_mdl$Material_Menu$pack, lift, idx),
								_debois$elm_mdl$Material_Menu$subscriptions(model)),
							ss);
					}),
				_elm_lang$core$Native_List.fromArray(
					[]),
				function (_) {
					return _.menu;
				}(_p25)));
	};
};
var _debois$elm_mdl$Material_Menu$Open = function (a) {
	return {ctor: 'Open', _0: a};
};
var _debois$elm_mdl$Material_Menu$TopRight = {ctor: 'TopRight'};
var _debois$elm_mdl$Material_Menu$topRight = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$TopRight});
	});
var _debois$elm_mdl$Material_Menu$TopLeft = {ctor: 'TopLeft'};
var _debois$elm_mdl$Material_Menu$topLeft = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$TopLeft});
	});
var _debois$elm_mdl$Material_Menu$delay = F4(
	function (alignment, height, offsetTop, offsetHeight) {
		var t = (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) ? ((((height - offsetTop) - offsetHeight) / height) * _debois$elm_mdl$Material_Menu$transitionDuration) : ((offsetTop / height) * _debois$elm_mdl$Material_Menu$transitionDuration);
		return A2(
			_debois$elm_mdl$Material_Options$css,
			'transition-delay',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(t),
				's'));
	});
var _debois$elm_mdl$Material_Menu$view1 = F8(
	function (lift, config, model, offsetTop, offsetHeight, index, summary, item) {
		var canSelect = summary.config.enabled && (!_elm_lang$core$Native_Utils.eq(summary.config.onSelect, _elm_lang$core$Maybe$Nothing));
		var hasRipple = config.ripple && canSelect;
		var ripple = function (_p26) {
			return lift(
				A2(_debois$elm_mdl$Material_Menu$Ripple, index, _p26));
		};
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$li,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-menu__item'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					config.ripple),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-menu__item--full-bleed-divider'),
					summary.config.divider),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(_debois$elm_mdl$Material_Options$css, 'background-color', 'rgb(238,238,238)'),
					_elm_lang$core$Native_Utils.eq(
						model.index,
						_elm_lang$core$Maybe$Just(index))),
					function () {
					var _p27 = {
						ctor: '_Tuple2',
						_0: model.geometry,
						_1: _debois$elm_mdl$Material_Menu$isActive(model)
					};
					if (((_p27.ctor === '_Tuple2') && (_p27._0.ctor === 'Just')) && (_p27._1 === true)) {
						return A4(_debois$elm_mdl$Material_Menu$delay, config.alignment, _p27._0._0.menu.bounds.height, offsetTop, offsetHeight);
					} else {
						return _debois$elm_mdl$Material_Options$nop;
					}
				}(),
					A2(_debois$elm_mdl$Material_Options$css, 'display', 'flex'),
					A2(_debois$elm_mdl$Material_Options$css, 'align-items', 'center')
				]),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$filterMap,
					_elm_lang$core$Basics$identity,
					_elm_lang$core$Native_List.fromArray(
						[
							canSelect ? _elm_lang$core$Maybe$Just(
							_elm_lang$html$Html_Events$onClick(
								lift(
									A2(_debois$elm_mdl$Material_Menu$Select, index, summary.config.onSelect)))) : _elm_lang$core$Maybe$Nothing,
							_elm_lang$core$Basics$not(summary.config.enabled) ? _elm_lang$core$Maybe$Just(
							A2(_elm_lang$html$Html_Attributes$attribute, 'disabled', 'disabled')) : _elm_lang$core$Maybe$Nothing,
							_elm_lang$core$Maybe$Just(
							A2(
								_elm_lang$html$Html_Attributes$property,
								'tabindex',
								_elm_lang$core$Json_Encode$string('-1')))
						])),
				hasRipple ? _elm_lang$core$Native_List.fromArray(
					[
						A2(_debois$elm_mdl$Material_Ripple$downOn$, ripple, 'mousedown'),
						A2(_debois$elm_mdl$Material_Ripple$downOn$, ripple, 'touchstart'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'mouseup'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'mouseleave'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'touchend'),
						A2(_debois$elm_mdl$Material_Ripple$upOn$, ripple, 'blur')
					]) : _elm_lang$core$Native_List.fromArray(
					[])),
			hasRipple ? A2(
				F2(
					function (x, y) {
						return A2(_elm_lang$core$Basics_ops['++'], x, y);
					}),
				item.html,
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$html$Html_App$map,
						ripple,
						A2(
							_debois$elm_mdl$Material_Ripple$view$,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-menu__item-ripple-container')
								]),
							A2(
								_elm_lang$core$Maybe$withDefault,
								_debois$elm_mdl$Material_Ripple$model,
								A2(_elm_lang$core$Dict$get, index, model.ripples))))
					])) : item.html);
	});
var _debois$elm_mdl$Material_Menu$BottomRight = {ctor: 'BottomRight'};
var _debois$elm_mdl$Material_Menu$bottomRight = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomRight});
	});
var _debois$elm_mdl$Material_Menu$BottomLeft = {ctor: 'BottomLeft'};
var _debois$elm_mdl$Material_Menu$defaultConfig = {alignment: _debois$elm_mdl$Material_Menu$BottomLeft, ripple: false, icon: 'more_vert'};
var _debois$elm_mdl$Material_Menu$bottomLeft = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{alignment: _debois$elm_mdl$Material_Menu$BottomLeft});
	});
var _debois$elm_mdl$Material_Menu$containerGeometry = F2(
	function (alignment, geometry) {
		return _debois$elm_mdl$Material_Options$many(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_debois$elm_mdl$Material_Options$css,
					'width',
					_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
					A2(
					_debois$elm_mdl$Material_Options$css,
					'height',
					_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height)),
					(_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
					_debois$elm_mdl$Material_Options$css,
					'top',
					_debois$elm_mdl$Material_Menu$toPx(geometry.button.offsetTop + geometry.button.offsetHeight)) : _debois$elm_mdl$Material_Options$nop,
					function () {
					if (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomRight) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
						var right = function (e) {
							return e.bounds.left + e.bounds.width;
						};
						return A2(
							_debois$elm_mdl$Material_Options$css,
							'right',
							_debois$elm_mdl$Material_Menu$toPx(
								right(geometry.container) - right(geometry.menu)));
					} else {
						return _debois$elm_mdl$Material_Options$nop;
					}
				}(),
					function () {
					if (_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopRight)) {
						var bottom = geometry.container.bounds.top + geometry.container.bounds.height;
						return A2(
							_debois$elm_mdl$Material_Options$css,
							'bottom',
							_debois$elm_mdl$Material_Menu$toPx(bottom - geometry.button.bounds.top));
					} else {
						return _debois$elm_mdl$Material_Options$nop;
					}
				}(),
					(_elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$TopLeft) || _elm_lang$core$Native_Utils.eq(alignment, _debois$elm_mdl$Material_Menu$BottomLeft)) ? A2(
					_debois$elm_mdl$Material_Options$css,
					'left',
					_debois$elm_mdl$Material_Menu$toPx(geometry.menu.offsetLeft)) : _debois$elm_mdl$Material_Options$nop
				]));
	});
var _debois$elm_mdl$Material_Menu$view = F4(
	function (lift, model, properties, items) {
		var itemSummaries = A2(
			_elm_lang$core$List$map,
			function (_p28) {
				return A2(
					_debois$elm_mdl$Material_Options$collect,
					_debois$elm_mdl$Material_Menu$defaultItemConfig,
					function (_) {
						return _.options;
					}(_p28));
			},
			items);
		var numItems = _elm_lang$core$List$length(items);
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Menu$defaultConfig, properties);
		var config = summary.config;
		var alignment = function () {
			var _p29 = config.alignment;
			switch (_p29.ctor) {
				case 'BottomLeft':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-left');
				case 'BottomRight':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--bottom-right');
				case 'TopLeft':
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-left');
				default:
					return _debois$elm_mdl$Material_Options$cs('mdl-menu--top-right');
			}
		}();
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html_App$map,
					lift,
					A3(
						_debois$elm_mdl$Material_Options$styled,
						_elm_lang$html$Html$button,
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$cs('mdl-button'),
								_debois$elm_mdl$Material_Options$cs('mdl-js-button'),
								_debois$elm_mdl$Material_Options$cs('mdl-button--icon'),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options_Internal$attribute(
									_debois$elm_mdl$Material_Menu$onKeyDown(
										_debois$elm_mdl$Material_Menu$Key(itemSummaries))),
								_debois$elm_mdl$Material_Menu$isActive(model)),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options_Internal$attribute(
									A2(_debois$elm_mdl$Material_Menu$onClick, _debois$elm_mdl$Material_Menu_Geometry$decode, _debois$elm_mdl$Material_Menu$Open)),
								!_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened))
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								A2(
								_debois$elm_mdl$Material_Icon$view,
								config.icon,
								_elm_lang$core$Native_List.fromArray(
									[
										_debois$elm_mdl$Material_Options$cs('material-icons'),
										A2(_debois$elm_mdl$Material_Options$css, 'pointer-events', 'none')
									]))
							]))),
					A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-menu__container'),
							_debois$elm_mdl$Material_Options$cs('is-upgraded'),
							A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options$cs('is-visible'),
							_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opened) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)),
							A2(
							_debois$elm_mdl$Material_Menu$withGeometry,
							model,
							_debois$elm_mdl$Material_Menu$containerGeometry(config.alignment))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$div,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-menu__outline'),
									alignment,
									A2(
									_debois$elm_mdl$Material_Menu$withGeometry,
									model,
									function (geometry) {
										return _debois$elm_mdl$Material_Options$many(
											_elm_lang$core$Native_List.fromArray(
												[
													A2(
													_debois$elm_mdl$Material_Options$css,
													'width',
													_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.width)),
													A2(
													_debois$elm_mdl$Material_Options$css,
													'height',
													_debois$elm_mdl$Material_Menu$toPx(geometry.menu.bounds.height))
												]));
									})
								]),
							_elm_lang$core$Native_List.fromArray(
								[])),
							A3(
							_debois$elm_mdl$Material_Options$styled,
							_elm_lang$html$Html$ul,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-menu'),
									_debois$elm_mdl$Material_Options$cs('mdl-js-menu'),
									A2(
									_debois$elm_mdl$Material_Options$when,
									_debois$elm_mdl$Material_Options$cs('is-animating'),
									_elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Opening) || _elm_lang$core$Native_Utils.eq(model.animationState, _debois$elm_mdl$Material_Menu$Closing)),
									A2(
									_debois$elm_mdl$Material_Menu$withGeometry,
									model,
									A2(_debois$elm_mdl$Material_Menu$clip, model, config)),
									alignment
								]),
							function () {
								var _p30 = model.geometry;
								if (_p30.ctor === 'Just') {
									var _p31 = _p30._0;
									return A6(
										_elm_lang$core$List$map5,
										A3(_debois$elm_mdl$Material_Menu$view1, lift, config, model),
										_p31.offsetTops,
										_p31.offsetHeights,
										_elm_lang$core$Native_List.range(0, numItems - 1),
										itemSummaries,
										items);
								} else {
									return A4(
										_elm_lang$core$List$map3,
										A5(_debois$elm_mdl$Material_Menu$view1, lift, config, model, 0, 0),
										_elm_lang$core$Native_List.range(0, numItems - 1),
										itemSummaries,
										items);
								}
							}())
						]))
				]));
	});
var _debois$elm_mdl$Material_Menu$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Menu$view,
	_debois$elm_mdl$Material_Menu$update$,
	function (_) {
		return _.menu;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{menu: x});
		}),
	_debois$elm_mdl$Material_Menu$defaultModel);

var _debois$elm_mdl$Material_Snackbar$enqueue = F2(
	function (contents, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				queue: A2(
					_elm_lang$core$List$append,
					model.queue,
					_elm_lang$core$Native_List.fromArray(
						[contents]))
			});
	});
var _debois$elm_mdl$Material_Snackbar$snackbar = F3(
	function (payload, message, label) {
		return {
			message: message,
			action: _elm_lang$core$Maybe$Just(label),
			payload: payload,
			timeout: 2750,
			fade: 250
		};
	});
var _debois$elm_mdl$Material_Snackbar$toast = F2(
	function (payload, message) {
		return {message: message, action: _elm_lang$core$Maybe$Nothing, payload: payload, timeout: 2750, fade: 250};
	});
var _debois$elm_mdl$Material_Snackbar$Contents = F5(
	function (a, b, c, d, e) {
		return {message: a, action: b, payload: c, timeout: d, fade: e};
	});
var _debois$elm_mdl$Material_Snackbar$Model = F3(
	function (a, b, c) {
		return {queue: a, state: b, seq: c};
	});
var _debois$elm_mdl$Material_Snackbar$Fading = function (a) {
	return {ctor: 'Fading', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Active = function (a) {
	return {ctor: 'Active', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Inert = {ctor: 'Inert'};
var _debois$elm_mdl$Material_Snackbar$model = {
	queue: _elm_lang$core$Native_List.fromArray(
		[]),
	state: _debois$elm_mdl$Material_Snackbar$Inert,
	seq: -1
};
var _debois$elm_mdl$Material_Snackbar$Clicked = {ctor: 'Clicked'};
var _debois$elm_mdl$Material_Snackbar$Timeout = {ctor: 'Timeout'};
var _debois$elm_mdl$Material_Snackbar$Move = F2(
	function (a, b) {
		return {ctor: 'Move', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Snackbar$next = function (model) {
	return _elm_lang$core$Platform_Cmd$map(
		_debois$elm_mdl$Material_Snackbar$Move(model.seq));
};
var _debois$elm_mdl$Material_Snackbar$view = function (model) {
	var isActive = function () {
		var _p0 = model.state;
		switch (_p0.ctor) {
			case 'Inert':
				return false;
			case 'Active':
				return true;
			default:
				return false;
		}
	}();
	var contents = function () {
		var _p1 = model.state;
		switch (_p1.ctor) {
			case 'Inert':
				return _elm_lang$core$Maybe$Nothing;
			case 'Active':
				return _elm_lang$core$Maybe$Just(_p1._0);
			default:
				return _elm_lang$core$Maybe$Just(_p1._0);
		}
	}();
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$classList(
				_elm_lang$core$Native_List.fromArray(
					[
						{ctor: '_Tuple2', _0: 'mdl-js-snackbar', _1: true},
						{ctor: '_Tuple2', _0: 'mdl-snackbar', _1: true},
						{ctor: '_Tuple2', _0: 'mdl-snackbar--active', _1: isActive}
					]))
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$class('mdl-snackbar__text')
					]),
				A2(
					_elm_lang$core$Maybe$withDefault,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$Maybe$map,
						function (c) {
							return _elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(c.message)
								]);
						},
						contents))),
				A2(
				_elm_lang$html$Html$button,
				A2(
					_elm_lang$core$List_ops['::'],
					_elm_lang$html$Html_Attributes$class('mdl-snackbar__action'),
					A2(
						_elm_lang$core$List_ops['::'],
						_elm_lang$html$Html_Attributes$type$('button'),
						A2(
							_elm_lang$core$Maybe$withDefault,
							_elm_lang$core$Native_List.fromArray(
								[]),
							A2(
								_elm_lang$core$Maybe$map,
								_elm_lang$core$Basics$always(
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Events$onClick(
											A2(_debois$elm_mdl$Material_Snackbar$Move, model.seq, _debois$elm_mdl$Material_Snackbar$Clicked))
										])),
								A3(
									_elm_lang$core$Basics$flip,
									_elm_lang$core$Maybe$andThen,
									function (_) {
										return _.action;
									},
									contents))))),
				A2(
					_elm_lang$core$Maybe$withDefault,
					_elm_lang$core$Native_List.fromArray(
						[]),
					A2(
						_elm_lang$core$Maybe$map,
						function (action) {
							return _elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text(action)
								]);
						},
						A3(
							_elm_lang$core$Basics$flip,
							_elm_lang$core$Maybe$andThen,
							function (_) {
								return _.action;
							},
							contents))))
			]));
};
var _debois$elm_mdl$Material_Snackbar$Click = function (a) {
	return {ctor: 'Click', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$End = function (a) {
	return {ctor: 'End', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$Begin = function (a) {
	return {ctor: 'Begin', _0: a};
};
var _debois$elm_mdl$Material_Snackbar$tryDequeue = function (model) {
	var _p2 = {ctor: '_Tuple2', _0: model.state, _1: model.queue};
	if (((_p2.ctor === '_Tuple2') && (_p2._0.ctor === 'Inert')) && (_p2._1.ctor === '::')) {
		var _p3 = _p2._1._0;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					state: _debois$elm_mdl$Material_Snackbar$Active(_p3),
					queue: _p2._1._1,
					seq: model.seq + 1
				}),
			_1: _elm_lang$core$Platform_Cmd$batch(
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$core$Platform_Cmd$map,
						_debois$elm_mdl$Material_Snackbar$Move(model.seq + 1),
						A2(_debois$elm_mdl$Material_Helpers$delay, _p3.timeout, _debois$elm_mdl$Material_Snackbar$Timeout)),
						_debois$elm_mdl$Material_Helpers$cmd(
						_debois$elm_mdl$Material_Snackbar$Begin(_p3.payload))
					]))
		};
	} else {
		return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
	}
};
var _debois$elm_mdl$Material_Snackbar$move = F2(
	function (transition, model) {
		var _p4 = {ctor: '_Tuple2', _0: model.state, _1: transition};
		_v3_4:
		do {
			if (_p4.ctor === '_Tuple2') {
				if (_p4._1.ctor === 'Clicked') {
					if (_p4._0.ctor === 'Active') {
						var _p5 = _p4._0._0;
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{
									state: _debois$elm_mdl$Material_Snackbar$Fading(_p5)
								}),
							_1: _elm_lang$core$Platform_Cmd$batch(
								_elm_lang$core$Native_List.fromArray(
									[
										A2(
										_debois$elm_mdl$Material_Snackbar$next,
										model,
										A2(_debois$elm_mdl$Material_Helpers$delay, _p5.fade, _debois$elm_mdl$Material_Snackbar$Timeout)),
										_debois$elm_mdl$Material_Helpers$cmd(
										_debois$elm_mdl$Material_Snackbar$Click(_p5.payload))
									]))
						};
					} else {
						break _v3_4;
					}
				} else {
					switch (_p4._0.ctor) {
						case 'Inert':
							return _debois$elm_mdl$Material_Snackbar$tryDequeue(model);
						case 'Active':
							var _p6 = _p4._0._0;
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{
										state: _debois$elm_mdl$Material_Snackbar$Fading(_p6)
									}),
								_1: _elm_lang$core$Platform_Cmd$batch(
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Snackbar$next,
											model,
											A2(_debois$elm_mdl$Material_Helpers$delay, _p6.fade, _debois$elm_mdl$Material_Snackbar$Timeout))
										]))
							};
						default:
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{state: _debois$elm_mdl$Material_Snackbar$Inert}),
								_1: _elm_lang$core$Platform_Cmd$batch(
									_elm_lang$core$Native_List.fromArray(
										[
											A2(
											_debois$elm_mdl$Material_Snackbar$next,
											model,
											_debois$elm_mdl$Material_Helpers$cmd(_debois$elm_mdl$Material_Snackbar$Timeout)),
											_debois$elm_mdl$Material_Helpers$cmd(
											_debois$elm_mdl$Material_Snackbar$End(_p4._0._0.payload))
										]))
							};
					}
				}
			} else {
				break _v3_4;
			}
		} while(false);
		return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
	});
var _debois$elm_mdl$Material_Snackbar$update = F2(
	function (action, model) {
		var _p7 = action;
		if (_p7.ctor === 'Move') {
			return _elm_lang$core$Native_Utils.eq(_p7._0, model.seq) ? A2(_debois$elm_mdl$Material_Snackbar$move, _p7._1, model) : {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		} else {
			return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _debois$elm_mdl$Material_Snackbar$add = F2(
	function (contents, model) {
		return _debois$elm_mdl$Material_Snackbar$tryDequeue(
			A2(_debois$elm_mdl$Material_Snackbar$enqueue, contents, model));
	});

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

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

var _debois$elm_mdl$Material_Layout$drawerView = F3(
	function (lift, isVisible, elems) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__drawer', _1: true},
							{ctor: '_Tuple2', _0: 'is-visible', _1: isVisible}
						]))
				]),
			elems);
	});
var _debois$elm_mdl$Material_Layout$onKeypressFilterSpaceAndEnter = A2(_elm_lang$html$Html_Attributes$attribute, 'onkeypress', '\n  (function (evt) {\n     if (evt && evt.type === \"keydown\" && (evt.keyCode === 32 || evt.keyCode === 13)) {\n       evt.preventDefault();\n     }\n   })(window.event);\n  ');
var _debois$elm_mdl$Material_Layout$toList = function (x) {
	var _p0 = x;
	if (_p0.ctor === 'Nothing') {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	} else {
		return _elm_lang$core$Native_List.fromArray(
			[_p0._0]);
	}
};
var _debois$elm_mdl$Material_Layout$isWaterfall = function (mode) {
	var _p1 = mode;
	if (_p1.ctor === 'Waterfall') {
		return true;
	} else {
		return false;
	}
};
var _debois$elm_mdl$Material_Layout$row = function (styles) {
	return _debois$elm_mdl$Material_Options$div(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-layout__header-row'),
			styles));
};
var _debois$elm_mdl$Material_Layout$link = F2(
	function (styles, contents) {
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$a,
			A2(
				_elm_lang$core$List_ops['::'],
				_debois$elm_mdl$Material_Options$cs('mdl-navigation__link'),
				A2(
					_elm_lang$core$List_ops['::'],
					_debois$elm_mdl$Material_Options_Internal$attribute(
						A2(_elm_lang$html$Html_Attributes$attribute, 'tabindex', '1')),
					styles)),
			contents);
	});
var _debois$elm_mdl$Material_Layout$href = function (_p2) {
	return _debois$elm_mdl$Material_Options_Internal$attribute(
		_elm_lang$html$Html_Attributes$href(_p2));
};
var _debois$elm_mdl$Material_Layout$onClick = function (_p3) {
	return _debois$elm_mdl$Material_Options_Internal$attribute(
		_elm_lang$html$Html_Events$onClick(_p3));
};
var _debois$elm_mdl$Material_Layout$navigation = F2(
	function (styles, contents) {
		return A2(
			_elm_lang$html$Html$nav,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class('mdl-navigation')
				]),
			contents);
	});
var _debois$elm_mdl$Material_Layout$title = function (styles) {
	return _debois$elm_mdl$Material_Options$span(
		A2(
			_elm_lang$core$List_ops['::'],
			_debois$elm_mdl$Material_Options$cs('mdl-layout__title'),
			styles));
};
var _debois$elm_mdl$Material_Layout$spacer = A2(
	_elm_lang$html$Html$div,
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$html$Html_Attributes$class('mdl-layout-spacer')
		]),
	_elm_lang$core$Native_List.fromArray(
		[]));
var _debois$elm_mdl$Material_Layout$onSelectTab = function (f) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onSelectTab: _elm_lang$core$Maybe$Just(
						function (_p4) {
							return _elm_lang$html$Html_Events$onClick(
								f(_p4));
						})
				});
		});
};
var _debois$elm_mdl$Material_Layout$moreTabs = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{moreTabs: true});
	});
var _debois$elm_mdl$Material_Layout$selectedTab = function (k) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{selectedTab: k});
		});
};
var _debois$elm_mdl$Material_Layout$transparentHeader = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{transparentHeader: true});
	});
var _debois$elm_mdl$Material_Layout$rippleTabs = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{rippleTabs: true});
	});
var _debois$elm_mdl$Material_Layout$fixedTabs = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedTabs: true});
	});
var _debois$elm_mdl$Material_Layout$fixedDrawer = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedDrawer: true});
	});
var _debois$elm_mdl$Material_Layout$fixedHeader = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{fixedHeader: true});
	});
var _debois$elm_mdl$Material_Layout$setTabsWidth$ = F2(
	function (width, model) {
		var x = model.tabScrollState;
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				tabScrollState: _elm_lang$core$Native_Utils.update(
					x,
					{
						width: _elm_lang$core$Maybe$Just(width)
					})
			});
	});
var _debois$elm_mdl$Material_Layout$setTabsWidth = F2(
	function (w, container) {
		return _elm_lang$core$Native_Utils.update(
			container,
			{
				layout: A2(_debois$elm_mdl$Material_Layout$setTabsWidth$, w, container.layout)
			});
	});
var _debois$elm_mdl$Material_Layout$defaultTabScrollState = {canScrollRight: true, canScrollLeft: false, width: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Layout$defaultModel = {ripples: _elm_lang$core$Dict$empty, isSmallScreen: false, isCompact: false, isAnimating: false, isScrolled: false, isDrawerOpen: false, tabScrollState: _debois$elm_mdl$Material_Layout$defaultTabScrollState};
var _debois$elm_mdl$Material_Layout$TabScrollState = F3(
	function (a, b, c) {
		return {canScrollLeft: a, canScrollRight: b, width: c};
	});
var _debois$elm_mdl$Material_Layout$Model = F7(
	function (a, b, c, d, e, f, g) {
		return {ripples: a, isSmallScreen: b, isCompact: c, isAnimating: d, isScrolled: e, isDrawerOpen: f, tabScrollState: g};
	});
var _debois$elm_mdl$Material_Layout$Config = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {fixedHeader: a, fixedDrawer: b, fixedTabs: c, rippleTabs: d, mode: e, selectedTab: f, onSelectTab: g, transparentHeader: h, moreTabs: i};
	});
var _debois$elm_mdl$Material_Layout$Contents = F4(
	function (a, b, c, d) {
		return {header: a, drawer: b, tabs: c, main: d};
	});
var _debois$elm_mdl$Material_Layout$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Layout$NOP = {ctor: 'NOP'};
var _debois$elm_mdl$Material_Layout$TransitionEnd = {ctor: 'TransitionEnd'};
var _debois$elm_mdl$Material_Layout$TransitionHeader = function (a) {
	return {ctor: 'TransitionHeader', _0: a};
};
var _debois$elm_mdl$Material_Layout$update$ = F3(
	function (f, action, model) {
		update$:
		while (true) {
			var _p5 = action;
			switch (_p5.ctor) {
				case 'NOP':
					return _elm_lang$core$Maybe$Nothing;
				case 'Resize':
					var _p6 = _p5._0;
					var tabScrollState = A2(
						_elm_lang$core$Maybe$withDefault,
						model.tabScrollState,
						A2(
							_elm_lang$core$Maybe$map,
							function (tabsWidth) {
								var tabScrollState = model.tabScrollState;
								return _elm_lang$core$Native_Utils.update(
									tabScrollState,
									{
										canScrollRight: _elm_lang$core$Native_Utils.cmp(tabsWidth + (2 * 56), _p6) > 0
									});
							},
							model.tabScrollState.width));
					var isSmall = _elm_lang$core$Native_Utils.cmp(1024, _p6) > 0;
					return (_elm_lang$core$Native_Utils.eq(isSmall, model.isSmallScreen) && _elm_lang$core$Native_Utils.eq(tabScrollState.canScrollRight, model.tabScrollState.canScrollRight)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									isSmallScreen: isSmall,
									isDrawerOpen: _elm_lang$core$Basics$not(isSmall) && model.isDrawerOpen,
									tabScrollState: tabScrollState
								})));
				case 'ToggleDrawer':
					return _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									isDrawerOpen: _elm_lang$core$Basics$not(model.isDrawerOpen)
								})));
				case 'Ripple':
					var _p8 = _p5._0;
					return _elm_lang$core$Maybe$Just(
						A2(
							_debois$elm_mdl$Material_Helpers$map2nd,
							_elm_lang$core$Platform_Cmd$map(
								function (_p7) {
									return f(
										A2(_debois$elm_mdl$Material_Layout$Ripple, _p8, _p7));
								}),
							A2(
								_debois$elm_mdl$Material_Helpers$map1st,
								function (ripple$) {
									return _elm_lang$core$Native_Utils.update(
										model,
										{
											ripples: A3(_elm_lang$core$Dict$insert, _p8, ripple$, model.ripples)
										});
								},
								A2(
									_debois$elm_mdl$Material_Ripple$update,
									_p5._1,
									A2(
										_elm_lang$core$Maybe$withDefault,
										_debois$elm_mdl$Material_Ripple$model,
										A2(_elm_lang$core$Dict$get, _p8, model.ripples))))));
				case 'ScrollTab':
					var _p9 = _p5._0;
					return (!_elm_lang$core$Native_Utils.eq(model.tabScrollState, _p9)) ? _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{tabScrollState: _p9}))) : _elm_lang$core$Maybe$Nothing;
				case 'ScrollPane':
					var isScrolled = _elm_lang$core$Native_Utils.cmp(0.0, _p5._1) < 0;
					if (!_elm_lang$core$Native_Utils.eq(isScrolled, model.isScrolled)) {
						var _v3 = f,
							_v4 = _debois$elm_mdl$Material_Layout$TransitionHeader(
							{toCompact: isScrolled, fixedHeader: _p5._0}),
							_v5 = _elm_lang$core$Native_Utils.update(
							model,
							{isScrolled: isScrolled});
						f = _v3;
						action = _v4;
						model = _v5;
						continue update$;
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				case 'TransitionHeader':
					var _p10 = _p5._0.toCompact;
					var headerVisible = _elm_lang$core$Basics$not(model.isSmallScreen) || _p5._0.fixedHeader;
					var model$ = _elm_lang$core$Native_Utils.update(
						model,
						{isCompact: _p10, isAnimating: headerVisible});
					return _elm_lang$core$Basics$not(model.isAnimating) ? _elm_lang$core$Maybe$Just(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{isCompact: _p10, isAnimating: headerVisible}),
							_1: A2(
								_debois$elm_mdl$Material_Helpers$delay,
								200,
								f(_debois$elm_mdl$Material_Layout$TransitionEnd))
						}) : _elm_lang$core$Maybe$Nothing;
				default:
					return _elm_lang$core$Maybe$Just(
						_debois$elm_mdl$Material_Helpers$pure(
							_elm_lang$core$Native_Utils.update(
								model,
								{isAnimating: false})));
			}
		}
	});
var _debois$elm_mdl$Material_Layout$update = F2(
	function (msg, model) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none},
			A3(_debois$elm_mdl$Material_Layout$update$, _elm_lang$core$Basics$identity, msg, model));
	});
var _debois$elm_mdl$Material_Layout$pack = function (fwd) {
	return A4(
		_debois$elm_parts$Parts$pack1,
		_debois$elm_mdl$Material_Layout$update$,
		function (_) {
			return _.layout;
		},
		F2(
			function (x, c) {
				return _elm_lang$core$Native_Utils.update(
					c,
					{layout: x});
			}),
		fwd);
};
var _debois$elm_mdl$Material_Layout$ScrollPane = F2(
	function (a, b) {
		return {ctor: 'ScrollPane', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Layout$ScrollTab = function (a) {
	return {ctor: 'ScrollTab', _0: a};
};
var _debois$elm_mdl$Material_Layout$Resize = function (a) {
	return {ctor: 'Resize', _0: a};
};
var _debois$elm_mdl$Material_Layout$init = function () {
	var measureScreenSize = A3(
		_elm_lang$core$Task$perform,
		function (_p11) {
			return _debois$elm_mdl$Material_Layout$Resize(
				A2(_elm_lang$core$Debug$log, 'Can\'t get initial window dimensions. Guessing ', 1025));
		},
		_debois$elm_mdl$Material_Layout$Resize,
		_elm_lang$window$Window$width);
	return {ctor: '_Tuple2', _0: _debois$elm_mdl$Material_Layout$defaultModel, _1: measureScreenSize};
}();
var _debois$elm_mdl$Material_Layout$sub0 = function (lift) {
	return A2(
		_elm_lang$core$Platform_Cmd$map,
		_debois$elm_mdl$Material_Layout$pack(lift),
		_elm_lang$core$Basics$snd(_debois$elm_mdl$Material_Layout$init));
};
var _debois$elm_mdl$Material_Layout$subscriptions = function (model) {
	return _elm_lang$window$Window$resizes(
		function (_p12) {
			return _debois$elm_mdl$Material_Layout$Resize(
				function (_) {
					return _.width;
				}(_p12));
		});
};
var _debois$elm_mdl$Material_Layout$subs = function (lift) {
	return function (_p13) {
		return A2(
			_elm_lang$core$Platform_Sub$map,
			_debois$elm_mdl$Material_Layout$pack(lift),
			_debois$elm_mdl$Material_Layout$subscriptions(
				function (_) {
					return _.layout;
				}(_p13)));
	};
};
var _debois$elm_mdl$Material_Layout$ToggleDrawer = {ctor: 'ToggleDrawer'};
var _debois$elm_mdl$Material_Layout$drawerButton = function (lift) {
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
						_elm_lang$html$Html_Attributes$class('mdl-layout__drawer-button'),
						_elm_lang$html$Html_Attributes$tabindex(1),
						_elm_lang$html$Html_Events$onClick(
						lift(_debois$elm_mdl$Material_Layout$ToggleDrawer)),
						A3(
						_elm_lang$html$Html_Events$onWithOptions,
						'keydown',
						{stopPropagation: false, preventDefault: false},
						A2(
							_elm_lang$core$Json_Decode$map,
							function (_p14) {
								return lift(
									function (key) {
										var _p15 = key;
										switch (_p15) {
											case 32:
												return _debois$elm_mdl$Material_Layout$ToggleDrawer;
											case 13:
												return _debois$elm_mdl$Material_Layout$ToggleDrawer;
											default:
												return _debois$elm_mdl$Material_Layout$NOP;
										}
									}(_p14));
							},
							_elm_lang$html$Html_Events$keyCode))
					]),
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Icon$i('menu')
					]))
			]));
};
var _debois$elm_mdl$Material_Layout$obfuscator = F2(
	function (lift, isVisible) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__obfuscator', _1: true},
							{ctor: '_Tuple2', _0: 'is-visible', _1: isVisible}
						])),
					_elm_lang$html$Html_Events$onClick(
					lift(_debois$elm_mdl$Material_Layout$ToggleDrawer))
				]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _debois$elm_mdl$Material_Layout$toggleDrawer = function (lift) {
	return A2(_debois$elm_mdl$Material_Layout$pack, lift, _debois$elm_mdl$Material_Layout$ToggleDrawer);
};
var _debois$elm_mdl$Material_Layout$LinkProp = {ctor: 'LinkProp'};
var _debois$elm_mdl$Material_Layout$Waterfall = function (a) {
	return {ctor: 'Waterfall', _0: a};
};
var _debois$elm_mdl$Material_Layout$waterfall = function (b) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					mode: _debois$elm_mdl$Material_Layout$Waterfall(b)
				});
		});
};
var _debois$elm_mdl$Material_Layout$Scrolling = {ctor: 'Scrolling'};
var _debois$elm_mdl$Material_Layout$scrolling = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{mode: _debois$elm_mdl$Material_Layout$Scrolling});
	});
var _debois$elm_mdl$Material_Layout$Seamed = {ctor: 'Seamed'};
var _debois$elm_mdl$Material_Layout$seamed = _debois$elm_mdl$Material_Options$set(
	function (config) {
		return _elm_lang$core$Native_Utils.update(
			config,
			{mode: _debois$elm_mdl$Material_Layout$Seamed});
	});
var _debois$elm_mdl$Material_Layout$Standard = {ctor: 'Standard'};
var _debois$elm_mdl$Material_Layout$defaultConfig = {fixedHeader: false, fixedDrawer: false, fixedTabs: false, rippleTabs: true, mode: _debois$elm_mdl$Material_Layout$Standard, onSelectTab: _elm_lang$core$Maybe$Nothing, selectedTab: -1, moreTabs: false, transparentHeader: false};
var _debois$elm_mdl$Material_Layout$headerView = F4(
	function (lift, config, model, _p16) {
		var _p17 = _p16;
		var mode = function () {
			var _p18 = config.mode;
			switch (_p18.ctor) {
				case 'Standard':
					return '';
				case 'Scrolling':
					return 'mdl-layout__header--scroll';
				case 'Seamed':
					return 'mdl-layout__header--seamed';
				default:
					if (_p18._0 === true) {
						return 'mdl-layout__header--waterfall mdl-layout__header--waterfall-hide-top';
					} else {
						return 'mdl-layout__header--waterfall';
					}
			}
		}();
		return A2(
			_elm_lang$html$Html$header,
			A2(
				_elm_lang$core$List$append,
				_debois$elm_mdl$Material_Layout$isWaterfall(config.mode) ? _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Events$onClick(
						lift(
							_debois$elm_mdl$Material_Layout$TransitionHeader(
								{toCompact: false, fixedHeader: config.fixedHeader})))
					]) : _elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html_Attributes$classList(
						_elm_lang$core$Native_List.fromArray(
							[
								{ctor: '_Tuple2', _0: 'mdl-layout__header', _1: true},
								{
								ctor: '_Tuple2',
								_0: 'is-casting-shadow',
								_1: _elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) || (_debois$elm_mdl$Material_Layout$isWaterfall(config.mode) && model.isCompact)
							},
								{ctor: '_Tuple2', _0: 'is-animating', _1: model.isAnimating},
								{ctor: '_Tuple2', _0: 'is-compact', _1: model.isCompact},
								{
								ctor: '_Tuple2',
								_0: mode,
								_1: !_elm_lang$core$Native_Utils.eq(mode, '')
							},
								{ctor: '_Tuple2', _0: 'mdl-layout__header--transparent', _1: config.transparentHeader}
							]))
					])),
			A2(
				_elm_lang$core$List$concatMap,
				function (x) {
					return x;
				},
				_elm_lang$core$Native_List.fromArray(
					[
						_debois$elm_mdl$Material_Layout$toList(_p17._0),
						_p17._1,
						_debois$elm_mdl$Material_Layout$toList(_p17._2)
					])));
	});
var _debois$elm_mdl$Material_Layout$Right = {ctor: 'Right'};
var _debois$elm_mdl$Material_Layout$Left = {ctor: 'Left'};
var _debois$elm_mdl$Material_Layout$tabsView = F4(
	function (lift, config, model, _p19) {
		var _p20 = _p19;
		var _p23 = _p20._1;
		var chevron = F2(
			function (direction, offset) {
				var dir = function () {
					var _p21 = direction;
					if (_p21.ctor === 'Left') {
						return 'left';
					} else {
						return 'right';
					}
				}();
				return A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar-button'),
							_debois$elm_mdl$Material_Options$cs(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'mdl-layout__tab-bar-',
								A2(_elm_lang$core$Basics_ops['++'], dir, '-button'))),
							A2(
							_debois$elm_mdl$Material_Options$when,
							_debois$elm_mdl$Material_Options$cs('is-active'),
							(_elm_lang$core$Native_Utils.eq(direction, _debois$elm_mdl$Material_Layout$Left) && model.tabScrollState.canScrollLeft) || (_elm_lang$core$Native_Utils.eq(direction, _debois$elm_mdl$Material_Layout$Right) && model.tabScrollState.canScrollRight)),
							_debois$elm_mdl$Material_Options$many(_p23),
							A2(
							_debois$elm_mdl$Material_Options$when,
							A2(_debois$elm_mdl$Material_Options$css, 'display', 'inline-block'),
							_elm_lang$core$Basics$not(config.fixedTabs))
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_debois$elm_mdl$Material_Icon$view,
							A2(_elm_lang$core$Basics_ops['++'], 'chevron_', dir),
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Icon$size24,
									_debois$elm_mdl$Material_Options_Internal$attribute(
									A2(
										_elm_lang$html$Html_Attributes$attribute,
										'onclick',
										A2(
											_elm_lang$core$Basics_ops['++'],
											'document.getElementsByClassName(\'mdl-layout__tab-bar\')[0].scrollLeft += ',
											_elm_lang$core$Basics$toString(offset))))
								]))
						]));
			});
		return A2(
			_debois$elm_mdl$Material_Options$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar-container')
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A2(chevron, _debois$elm_mdl$Material_Layout$Left, -100),
					A2(
					_debois$elm_mdl$Material_Options$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_debois$elm_mdl$Material_Options$cs('mdl-layout__tab-bar'),
							A2(_debois$elm_mdl$Material_Options$css, 'position', 'relative'),
							A2(_debois$elm_mdl$Material_Options$css, 'scroll-behavior', 'smooth'),
							config.rippleTabs ? _debois$elm_mdl$Material_Options$many(
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
									_debois$elm_mdl$Material_Options$cs('mds-js-ripple-effect--ignore-events')
								])) : _debois$elm_mdl$Material_Options$nop,
							_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Standard) ? _debois$elm_mdl$Material_Options$cs('is-casting-shadow') : _debois$elm_mdl$Material_Options$nop,
							_debois$elm_mdl$Material_Options$many(_p23),
							_debois$elm_mdl$Material_Options_Internal$attribute(
							A2(
								_elm_lang$html$Html_Events$on,
								'scroll',
								_debois$elm_dom$DOM$target(
									A4(
										_elm_lang$core$Json_Decode$object3,
										F3(
											function (scrollWidth, clientWidth, scrollLeft) {
												return lift(
													_debois$elm_mdl$Material_Layout$ScrollTab(
														{
															canScrollLeft: _elm_lang$core$Native_Utils.cmp(scrollLeft, 0) > 0,
															canScrollRight: _elm_lang$core$Native_Utils.cmp(scrollWidth - clientWidth, scrollLeft + 1) > 0,
															width: _elm_lang$core$Maybe$Just(scrollWidth)
														}));
											}),
										A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollWidth', _elm_lang$core$Json_Decode$float),
										A2(_elm_lang$core$Json_Decode_ops[':='], 'clientWidth', _elm_lang$core$Json_Decode$float),
										A2(_elm_lang$core$Json_Decode_ops[':='], 'scrollLeft', _elm_lang$core$Json_Decode$float)))))
						]),
					A2(
						_elm_lang$core$List$indexedMap,
						F2(
							function (tabIndex, tab) {
								return A3(
									_debois$elm_mdl$Material_Helpers$filter,
									_elm_lang$html$Html$a,
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$html$Html_Attributes$classList(
											_elm_lang$core$Native_List.fromArray(
												[
													{ctor: '_Tuple2', _0: 'mdl-layout__tab', _1: true},
													{
													ctor: '_Tuple2',
													_0: 'is-active',
													_1: _elm_lang$core$Native_Utils.eq(tabIndex, config.selectedTab)
												}
												])),
											A2(
											_elm_lang$core$Maybe$withDefault,
											_debois$elm_mdl$Material_Helpers$noAttr,
											A2(
												_elm_lang$core$Maybe$map,
												F2(
													function (x, y) {
														return y(x);
													})(tabIndex),
												config.onSelectTab))
										]),
									_elm_lang$core$Native_List.fromArray(
										[
											_elm_lang$core$Maybe$Just(tab),
											config.rippleTabs ? _elm_lang$core$Maybe$Just(
											A2(
												_elm_lang$html$Html_App$map,
												function (_p22) {
													return lift(
														A2(_debois$elm_mdl$Material_Layout$Ripple, tabIndex, _p22));
												},
												A2(
													_debois$elm_mdl$Material_Ripple$view,
													_elm_lang$core$Native_List.fromArray(
														[
															_elm_lang$html$Html_Attributes$class('mdl-layout__tab-ripple-container')
														]),
													A2(
														_elm_lang$core$Maybe$withDefault,
														_debois$elm_mdl$Material_Ripple$model,
														A2(_elm_lang$core$Dict$get, tabIndex, model.ripples))))) : _elm_lang$core$Maybe$Nothing
										]));
							}),
						_p20._0)),
					A2(chevron, _debois$elm_mdl$Material_Layout$Right, 100)
				]));
	});
var _debois$elm_mdl$Material_Layout$view = F4(
	function (lift, model, options, _p24) {
		var _p25 = _p24;
		var _p33 = _p25.tabs;
		var _p32 = _p25.header;
		var _p31 = _p25.drawer;
		var hasDrawer = !_elm_lang$core$Native_Utils.eq(
			_p31,
			_elm_lang$core$Native_List.fromArray(
				[]));
		var hasTabs = _elm_lang$core$Basics$not(
			_elm_lang$core$List$isEmpty(
				_elm_lang$core$Basics$fst(_p33)));
		var hasHeader = hasTabs || _elm_lang$core$Basics$not(
			_elm_lang$core$List$isEmpty(_p32));
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Layout$defaultConfig, options);
		var config = summary.config;
		var _p26 = function () {
			var _p27 = {ctor: '_Tuple3', _0: _p31, _1: _p32, _2: config.fixedHeader};
			if ((_p27.ctor === '_Tuple3') && (_p27._0.ctor === '::')) {
				if ((_p27._1.ctor === '::') && (_p27._2 === true)) {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: _elm_lang$core$Maybe$Just(
							_debois$elm_mdl$Material_Layout$drawerButton(lift))
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Just(
							_debois$elm_mdl$Material_Layout$drawerButton(lift)),
						_1: _elm_lang$core$Maybe$Nothing
					};
				}
			} else {
				return {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing};
			}
		}();
		var contentDrawerButton = _p26._0;
		var headerDrawerButton = _p26._1;
		var drawerIsFixed = config.fixedDrawer && _elm_lang$core$Basics$not(model.isSmallScreen);
		var drawerIsVisible = model.isDrawerOpen && _elm_lang$core$Basics$not(drawerIsFixed);
		var tabsElems = _elm_lang$core$Basics$not(hasTabs) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A4(_debois$elm_mdl$Material_Layout$tabsView, lift, config, model, _p33));
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-layout__container', _1: true},
							{
							ctor: '_Tuple2',
							_0: 'has-scrolling-header',
							_1: _elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling)
						}
						]))
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					A3(
					_debois$elm_mdl$Material_Helpers$filter,
					_elm_lang$html$Html_Keyed$node('div'),
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$classList(
									_elm_lang$core$Native_List.fromArray(
										[
											{ctor: '_Tuple2', _0: 'mdl-layout ', _1: true},
											{ctor: '_Tuple2', _0: 'is-upgraded', _1: true},
											{ctor: '_Tuple2', _0: 'is-small-screen', _1: model.isSmallScreen},
											{ctor: '_Tuple2', _0: 'has-drawer', _1: hasDrawer},
											{ctor: '_Tuple2', _0: 'has-tabs', _1: hasTabs},
											{ctor: '_Tuple2', _0: 'mdl-js-layout', _1: true},
											{ctor: '_Tuple2', _0: 'mdl-layout--fixed-drawer', _1: config.fixedDrawer && hasDrawer},
											{ctor: '_Tuple2', _0: 'mdl-layout--fixed-header', _1: config.fixedHeader && hasHeader},
											{ctor: '_Tuple2', _0: 'mdl-layout--fixed-tabs', _1: config.fixedTabs && hasTabs}
										]))),
								drawerIsVisible ? _elm_lang$core$Maybe$Just(
								A2(
									_elm_lang$html$Html_Events$on,
									'keydown',
									A2(
										_elm_lang$core$Json_Decode$map,
										function (_p28) {
											return lift(
												function (key) {
													return _elm_lang$core$Native_Utils.eq(key, 27) ? _debois$elm_mdl$Material_Layout$ToggleDrawer : _debois$elm_mdl$Material_Layout$NOP;
												}(_p28));
										},
										_elm_lang$html$Html_Events$keyCode))) : _elm_lang$core$Maybe$Nothing
							])),
					_elm_lang$core$Native_List.fromArray(
						[
							hasHeader ? _elm_lang$core$Maybe$Just(
							A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								'elm-mdl-header',
								A4(
									_debois$elm_mdl$Material_Layout$headerView,
									lift,
									config,
									model,
									{ctor: '_Tuple3', _0: headerDrawerButton, _1: _p32, _2: tabsElems}))) : _elm_lang$core$Maybe$Nothing,
							_elm_lang$core$Basics$not(hasDrawer) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
							{
								ctor: '_Tuple2',
								_0: 'elm-mdl-drawer',
								_1: A3(_debois$elm_mdl$Material_Layout$drawerView, lift, drawerIsVisible, _p31)
							}),
							_elm_lang$core$Basics$not(hasDrawer) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
							{
								ctor: '_Tuple2',
								_0: 'elm-mdl-obfuscator',
								_1: A2(_debois$elm_mdl$Material_Layout$obfuscator, lift, drawerIsVisible)
							}),
							A2(
							_elm_lang$core$Maybe$map,
							F2(
								function (v0, v1) {
									return {ctor: '_Tuple2', _0: v0, _1: v1};
								})('elm-drawer-button'),
							contentDrawerButton),
							_elm_lang$core$Maybe$Just(
							A2(
								F2(
									function (v0, v1) {
										return {ctor: '_Tuple2', _0: v0, _1: v1};
									}),
								_elm_lang$core$Basics$toString(config.selectedTab),
								A3(
									_debois$elm_mdl$Material_Options$styled,
									_elm_lang$html$Html$main$,
									_elm_lang$core$Native_List.fromArray(
										[
											_debois$elm_mdl$Material_Options$cs('mdl-layout__content'),
											A2(
											_debois$elm_mdl$Material_Options$when,
											A2(_debois$elm_mdl$Material_Options$css, 'overflow-y', 'visible'),
											_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader),
											A2(
											_debois$elm_mdl$Material_Options$when,
											A2(_debois$elm_mdl$Material_Options$css, 'overflow-x', 'visible'),
											_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader),
											A2(
											_debois$elm_mdl$Material_Options$when,
											A2(_debois$elm_mdl$Material_Options$css, 'overflow', 'visible'),
											_elm_lang$core$Native_Utils.eq(config.mode, _debois$elm_mdl$Material_Layout$Scrolling) && config.fixedHeader),
											A2(
											_debois$elm_mdl$Material_Options$when,
											function (_p29) {
												return _debois$elm_mdl$Material_Options_Internal$attribute(
													A2(_elm_lang$html$Html_Events$on, 'scroll', _p29));
											}(
												A2(
													_elm_lang$core$Json_Decode$map,
													function (_p30) {
														return lift(
															A2(_debois$elm_mdl$Material_Layout$ScrollPane, config.fixedHeader, _p30));
													},
													_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$scrollTop))),
											_debois$elm_mdl$Material_Layout$isWaterfall(config.mode))
										]),
									_p25.main)))
						]))
				]));
	});
var _debois$elm_mdl$Material_Layout$render = A4(
	_debois$elm_parts$Parts$create1,
	_debois$elm_mdl$Material_Layout$view,
	_debois$elm_mdl$Material_Layout$update$,
	function (_) {
		return _.layout;
	},
	F2(
		function (x, c) {
			return _elm_lang$core$Native_Utils.update(
				c,
				{layout: x});
		}));

var _debois$elm_mdl$Material_Toggles$group = function (s) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					group: _elm_lang$core$Maybe$Just(
						_elm_lang$html$Html_Attributes$name(s))
				});
		});
};
var _debois$elm_mdl$Material_Toggles$value = function (b) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{value: b});
		});
};
var _debois$elm_mdl$Material_Toggles$disabled = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{isDisabled: true});
	});
var _debois$elm_mdl$Material_Toggles$ripple = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Toggles$onClick = function (x) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{
					onClick: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$html$Html_Events$on,
							'change',
							_elm_lang$core$Json_Decode$succeed(x)))
				});
		});
};
var _debois$elm_mdl$Material_Toggles$defaultConfig = {isDisabled: false, value: false, ripple: false, group: _elm_lang$core$Maybe$Nothing, onClick: _elm_lang$core$Maybe$Nothing};
var _debois$elm_mdl$Material_Toggles$defaultModel = {ripple: _debois$elm_mdl$Material_Ripple$model, isFocused: false};
var _debois$elm_mdl$Material_Toggles$Model = F2(
	function (a, b) {
		return {ripple: a, isFocused: b};
	});
var _debois$elm_mdl$Material_Toggles$Config = F5(
	function (a, b, c, d, e) {
		return {isDisabled: a, value: b, ripple: c, group: d, onClick: e};
	});
var _debois$elm_mdl$Material_Toggles$SetFocus = function (a) {
	return {ctor: 'SetFocus', _0: a};
};
var _debois$elm_mdl$Material_Toggles$Ripple = function (a) {
	return {ctor: 'Ripple', _0: a};
};
var _debois$elm_mdl$Material_Toggles$update = F2(
	function (action, model) {
		var _p0 = action;
		if (_p0.ctor === 'Ripple') {
			return A2(
				_debois$elm_mdl$Material_Helpers$map2nd,
				_elm_lang$core$Platform_Cmd$map(_debois$elm_mdl$Material_Toggles$Ripple),
				A2(
					_debois$elm_mdl$Material_Helpers$map1st,
					function (r) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{ripple: r});
					},
					A2(_debois$elm_mdl$Material_Ripple$update, _p0._0, model.ripple)));
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isFocused: _p0._0}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		}
	});
var _debois$elm_mdl$Material_Toggles$render = function (view) {
	return A5(
		_debois$elm_parts$Parts$create,
		view,
		_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Toggles$update),
		function (_) {
			return _.toggles;
		},
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.update(
					y,
					{toggles: x});
			}),
		_debois$elm_mdl$Material_Toggles$defaultModel);
};
var _debois$elm_mdl$Material_Toggles$top = F5(
	function (lift, group, model, summary, elems) {
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$label,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs(
					A2(_elm_lang$core$Basics_ops['++'], 'mdl-', group)),
					_debois$elm_mdl$Material_Options$cs(
					A2(_elm_lang$core$Basics_ops['++'], 'mdl-js-', group)),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					cfg.ripple),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect--ignore-events'),
					cfg.ripple),
					_debois$elm_mdl$Material_Options$cs('is-upgraded'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-checked'),
					cfg.value),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-focused'),
					model.isFocused)
				]),
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Helpers$blurOn('mouseup'),
					_elm_lang$html$Html_Events$onFocus(
					lift(
						_debois$elm_mdl$Material_Toggles$SetFocus(true))),
					_elm_lang$html$Html_Events$onBlur(
					lift(
						_debois$elm_mdl$Material_Toggles$SetFocus(false))),
					A2(_elm_lang$core$Maybe$withDefault, _debois$elm_mdl$Material_Helpers$noAttr, cfg.onClick)
				]),
			_elm_lang$core$List$concat(
				_elm_lang$core$Native_List.fromArray(
					[
						elems,
						cfg.ripple ? _elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html_App$map,
							function (_p1) {
								return lift(
									_debois$elm_mdl$Material_Toggles$Ripple(_p1));
							},
							A2(
								_debois$elm_mdl$Material_Ripple$view,
								_elm_lang$core$Native_List.fromArray(
									[
										_elm_lang$html$Html_Attributes$class('mdl-switch__ripple-container mdl-js-ripple-effect mdl-ripple--center')
									]),
								model.ripple))
						]) : _elm_lang$core$Native_List.fromArray(
						[])
					])));
	});
var _debois$elm_mdl$Material_Toggles$viewCheckbox = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'checkbox',
			model,
			summary,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('checkbox'),
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__input'),
							_elm_lang$html$Html_Attributes$disabled(cfg.isDisabled),
							_elm_lang$html$Html_Attributes$checked(cfg.value)
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__label')
						]),
					elems),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__focus-helper')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-checkbox__box-outline')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$span,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-checkbox__tick-outline')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						]))
				]));
	});
var _debois$elm_mdl$Material_Toggles$checkbox = _debois$elm_mdl$Material_Toggles$render(_debois$elm_mdl$Material_Toggles$viewCheckbox);
var _debois$elm_mdl$Material_Toggles$viewSwitch = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'switch',
			model,
			summary,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$input,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('checkbox'),
							_elm_lang$html$Html_Attributes$class('mdl-switch__input'),
							_elm_lang$html$Html_Attributes$disabled(cfg.isDisabled),
							_elm_lang$html$Html_Attributes$checked(cfg.value)
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-switch__label')
						]),
					elems),
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-switch__track')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-switch__thumb')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(
							_elm_lang$html$Html$span,
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html_Attributes$class('mdl-switch__focus-helper')
								]),
							_elm_lang$core$Native_List.fromArray(
								[]))
						]))
				]));
	});
var _debois$elm_mdl$Material_Toggles$switch = _debois$elm_mdl$Material_Toggles$render(_debois$elm_mdl$Material_Toggles$viewSwitch);
var _debois$elm_mdl$Material_Toggles$viewRadio = F4(
	function (lift, model, config, elems) {
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Toggles$defaultConfig, config);
		var cfg = summary.config;
		return A5(
			_debois$elm_mdl$Material_Toggles$top,
			lift,
			'radio',
			model,
			summary,
			_elm_lang$core$Native_List.fromArray(
				[
					A2(
					_elm_lang$html$Html$input,
					A2(
						_elm_lang$core$List$filterMap,
						_elm_lang$core$Basics$identity,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$type$('radio')),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$class('mdl-radio__button')),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$disabled(cfg.isDisabled)),
								_elm_lang$core$Maybe$Just(
								_elm_lang$html$Html_Attributes$checked(cfg.value)),
								cfg.group
							])),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-radio__label')
						]),
					elems),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-radio__outer-circle')
						]),
					_elm_lang$core$Native_List.fromArray(
						[])),
					A2(
					_elm_lang$html$Html$span,
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$class('mdl-radio__inner-circle')
						]),
					_elm_lang$core$Native_List.fromArray(
						[]))
				]));
	});
var _debois$elm_mdl$Material_Toggles$radio = _debois$elm_mdl$Material_Toggles$render(_debois$elm_mdl$Material_Toggles$viewRadio);

var _debois$elm_mdl$Material_Tooltip$set = F2(
	function (x, y) {
		return _elm_lang$core$Native_Utils.update(
			y,
			{tooltip: x});
	});
var _debois$elm_mdl$Material_Tooltip$container = function (elem) {
	return _debois$elm_mdl$Material_Options$set(
		function (options) {
			return _elm_lang$core$Native_Utils.update(
				options,
				{container: elem});
		});
};
var _debois$elm_mdl$Material_Tooltip$isTooltipClass = function (path) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		A2(_elm_lang$core$Json_Decode$at, path, _debois$elm_dom$DOM$className),
		function ($class) {
			return A2(_elm_lang$core$String$contains, 'mdl-tooltip', $class) ? _elm_lang$core$Json_Decode$succeed(true) : _elm_lang$core$Json_Decode$succeed(false);
		});
};
var _debois$elm_mdl$Material_Tooltip$sibling = function (d) {
	var valid = function (path) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			_debois$elm_mdl$Material_Tooltip$isTooltipClass(path),
			function (res) {
				return res ? A2(_elm_lang$core$Json_Decode$at, path, d) : _elm_lang$core$Json_Decode$fail('');
			});
	};
	var createPath = function (depth) {
		var parents = A2(_elm_lang$core$List$repeat, depth, 'parentElement');
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Native_List.fromArray(
				['target']),
			A2(
				_elm_lang$core$Basics_ops['++'],
				parents,
				_elm_lang$core$Native_List.fromArray(
					['nextSibling'])));
	};
	var paths = A2(
		_elm_lang$core$List$map,
		createPath,
		_elm_lang$core$Native_List.range(0, 4));
	return _elm_lang$core$Json_Decode$oneOf(
		A2(_elm_lang$core$List$map, valid, paths));
};
var _debois$elm_mdl$Material_Tooltip$update = F2(
	function (action, model) {
		var _p0 = action;
		if (_p0.ctor === 'Enter') {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isActive: true, domState: _p0._0}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{isActive: false}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		}
	});
var _debois$elm_mdl$Material_Tooltip$calculatePos = F2(
	function (pos, domState) {
		var getValuesFor = F2(
			function (l, r) {
				return (_elm_lang$core$Native_Utils.cmp(l + r, 0) < 0) ? {ctor: '_Tuple2', _0: 0, _1: 0} : {ctor: '_Tuple2', _0: l, _1: r};
			});
		var offsetHeight = domState.offsetHeight;
		var marginTop = -1 * (offsetHeight / 2);
		var offsetWidth = domState.offsetWidth;
		var marginLeft = -1 * (offsetWidth / 2);
		var props = domState.rect;
		var left = props.left + (props.width / 2);
		var _p1 = A2(getValuesFor, left, marginLeft);
		var newLeft = _p1._0;
		var newMarginLeft = _p1._1;
		var top = props.top + (props.height / 2);
		var _p2 = A2(getValuesFor, top, marginTop);
		var newTop = _p2._0;
		var newMarginTop = _p2._1;
		var out = function () {
			var _p3 = pos;
			switch (_p3.ctor) {
				case 'Left':
					return {left: (props.left - offsetWidth) - 10, top: newTop, marginTop: newMarginTop, marginLeft: 0};
				case 'Right':
					return {left: (props.left + props.width) + 10, top: newTop, marginTop: newMarginTop, marginLeft: 0};
				case 'Top':
					return {left: newLeft, top: (props.top - offsetHeight) - 10, marginTop: 0, marginLeft: newMarginLeft};
				default:
					return {left: newLeft, top: (props.top + props.height) + 10, marginTop: 0, marginLeft: newMarginLeft};
			}
		}();
		return out;
	});
var _debois$elm_mdl$Material_Tooltip$defaultDOMState = {
	rect: {left: 0, top: 0, width: 0, height: 0},
	offsetWidth: 0,
	offsetHeight: 0
};
var _debois$elm_mdl$Material_Tooltip$defaultPos = {left: 0, top: 0, marginLeft: 0, marginTop: 0};
var _debois$elm_mdl$Material_Tooltip$defaultModel = {isActive: false, domState: _debois$elm_mdl$Material_Tooltip$defaultDOMState};
var _debois$elm_mdl$Material_Tooltip$pack = A4(
	_debois$elm_parts$Parts$pack,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Tooltip$update),
	function (_) {
		return _.tooltip;
	},
	_debois$elm_mdl$Material_Tooltip$set,
	_debois$elm_mdl$Material_Tooltip$defaultModel);
var _debois$elm_mdl$Material_Tooltip$Model = F2(
	function (a, b) {
		return {isActive: a, domState: b};
	});
var _debois$elm_mdl$Material_Tooltip$Pos = F4(
	function (a, b, c, d) {
		return {left: a, top: b, marginLeft: c, marginTop: d};
	});
var _debois$elm_mdl$Material_Tooltip$DOMState = F3(
	function (a, b, c) {
		return {rect: a, offsetWidth: b, offsetHeight: c};
	});
var _debois$elm_mdl$Material_Tooltip$stateDecoder = A4(
	_elm_lang$core$Json_Decode$object3,
	_debois$elm_mdl$Material_Tooltip$DOMState,
	_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$boundingClientRect),
	_debois$elm_mdl$Material_Tooltip$sibling(_debois$elm_dom$DOM$offsetWidth),
	_debois$elm_mdl$Material_Tooltip$sibling(_debois$elm_dom$DOM$offsetHeight));
var _debois$elm_mdl$Material_Tooltip$Config = F3(
	function (a, b, c) {
		return {size: a, position: b, container: c};
	});
var _debois$elm_mdl$Material_Tooltip$Leave = {ctor: 'Leave'};
var _debois$elm_mdl$Material_Tooltip$onMouseLeave = F2(
	function (lift, idx) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseleave',
			_elm_lang$core$Json_Decode$succeed(
				A3(_debois$elm_mdl$Material_Tooltip$pack, lift, idx, _debois$elm_mdl$Material_Tooltip$Leave)));
	});
var _debois$elm_mdl$Material_Tooltip$onLeave = function (lift) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(
			lift(_debois$elm_mdl$Material_Tooltip$Leave)));
};
var _debois$elm_mdl$Material_Tooltip$Enter = function (a) {
	return {ctor: 'Enter', _0: a};
};
var _debois$elm_mdl$Material_Tooltip$onMouseEnter = F2(
	function (lift, idx) {
		return A2(
			_elm_lang$html$Html_Events$on,
			'mouseenter',
			A2(
				_elm_lang$core$Json_Decode$map,
				function (_p4) {
					return A3(
						_debois$elm_mdl$Material_Tooltip$pack,
						lift,
						idx,
						_debois$elm_mdl$Material_Tooltip$Enter(_p4));
				},
				_debois$elm_mdl$Material_Tooltip$stateDecoder));
	});
var _debois$elm_mdl$Material_Tooltip$attach = F2(
	function (lift, index) {
		return _debois$elm_mdl$Material_Options$many(
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options_Internal$attribute(
					A2(_debois$elm_mdl$Material_Tooltip$onMouseEnter, lift, index)),
					_debois$elm_mdl$Material_Options_Internal$attribute(
					A2(_debois$elm_mdl$Material_Tooltip$onMouseLeave, lift, index))
				]));
	});
var _debois$elm_mdl$Material_Tooltip$onEnter = function (lift) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		A2(
			_elm_lang$core$Json_Decode$map,
			function (_p5) {
				return lift(
					_debois$elm_mdl$Material_Tooltip$Enter(_p5));
			},
			_debois$elm_mdl$Material_Tooltip$stateDecoder));
};
var _debois$elm_mdl$Material_Tooltip$Large = {ctor: 'Large'};
var _debois$elm_mdl$Material_Tooltip$large = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{size: _debois$elm_mdl$Material_Tooltip$Large});
	});
var _debois$elm_mdl$Material_Tooltip$Default = {ctor: 'Default'};
var _debois$elm_mdl$Material_Tooltip$Bottom = {ctor: 'Bottom'};
var _debois$elm_mdl$Material_Tooltip$defaultConfig = {size: _debois$elm_mdl$Material_Tooltip$Default, position: _debois$elm_mdl$Material_Tooltip$Bottom, container: _elm_lang$html$Html$div};
var _debois$elm_mdl$Material_Tooltip$view = F4(
	function (lift, model, options, content) {
		var px = function (f) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(f),
				'px');
		};
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Tooltip$defaultConfig, options);
		var config = summary.config;
		var pos = model.isActive ? A2(_debois$elm_mdl$Material_Tooltip$calculatePos, config.position, model.domState) : _debois$elm_mdl$Material_Tooltip$defaultPos;
		return A3(
			_debois$elm_mdl$Material_Options$styled,
			config.container,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-tooltip'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('is-active'),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-tooltip--large'),
					_elm_lang$core$Native_Utils.eq(config.size, _debois$elm_mdl$Material_Tooltip$Large)),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'left',
						px(pos.left)),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'margin-left',
						px(pos.marginLeft)),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'top',
						px(pos.top)),
					model.isActive),
					A2(
					_debois$elm_mdl$Material_Options$when,
					A2(
						_debois$elm_mdl$Material_Options$css,
						'margin-top',
						px(pos.marginTop)),
					model.isActive)
				]),
			content);
	});
var _debois$elm_mdl$Material_Tooltip$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Tooltip$view,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Tooltip$update),
	function (_) {
		return _.tooltip;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{tooltip: x});
		}),
	_debois$elm_mdl$Material_Tooltip$defaultModel);
var _debois$elm_mdl$Material_Tooltip$bottom = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Bottom});
	});
var _debois$elm_mdl$Material_Tooltip$Top = {ctor: 'Top'};
var _debois$elm_mdl$Material_Tooltip$top = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Top});
	});
var _debois$elm_mdl$Material_Tooltip$Right = {ctor: 'Right'};
var _debois$elm_mdl$Material_Tooltip$right = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Right});
	});
var _debois$elm_mdl$Material_Tooltip$Left = {ctor: 'Left'};
var _debois$elm_mdl$Material_Tooltip$left = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{position: _debois$elm_mdl$Material_Tooltip$Left});
	});

var _debois$elm_mdl$Material_Tabs$activeTab = function (k) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{activeTab: k});
		});
};
var _debois$elm_mdl$Material_Tabs$onSelectTab = function (k) {
	return _debois$elm_mdl$Material_Options$set(
		function (config) {
			return _elm_lang$core$Native_Utils.update(
				config,
				{
					onSelectTab: _elm_lang$core$Maybe$Just(k)
				});
		});
};
var _debois$elm_mdl$Material_Tabs$ripple = _debois$elm_mdl$Material_Options$set(
	function (options) {
		return _elm_lang$core$Native_Utils.update(
			options,
			{ripple: true});
	});
var _debois$elm_mdl$Material_Tabs$defaultConfig = {ripple: false, onSelectTab: _elm_lang$core$Maybe$Nothing, activeTab: 0};
var _debois$elm_mdl$Material_Tabs$defaultModel = {ripples: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Material_Tabs$Model = function (a) {
	return {ripples: a};
};
var _debois$elm_mdl$Material_Tabs$Config = F3(
	function (a, b, c) {
		return {ripple: a, onSelectTab: b, activeTab: c};
	});
var _debois$elm_mdl$Material_Tabs$Ripple = F2(
	function (a, b) {
		return {ctor: 'Ripple', _0: a, _1: b};
	});
var _debois$elm_mdl$Material_Tabs$update = F2(
	function (action, model) {
		var _p0 = action;
		var _p2 = _p0._0;
		var _p1 = A2(
			_debois$elm_mdl$Material_Ripple$update,
			_p0._1,
			A2(
				_elm_lang$core$Maybe$withDefault,
				_debois$elm_mdl$Material_Ripple$model,
				A2(_elm_lang$core$Dict$get, _p2, model.ripples)));
		var ripple$ = _p1._0;
		var cmd = _p1._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{
					ripples: A3(_elm_lang$core$Dict$insert, _p2, ripple$, model.ripples)
				}),
			_1: A2(
				_elm_lang$core$Platform_Cmd$map,
				_debois$elm_mdl$Material_Tabs$Ripple(_p2),
				cmd)
		};
	});
var _debois$elm_mdl$Material_Tabs$view = F5(
	function (lift, model, options, tabs, tabContent) {
		var wrapContent = A2(
			_elm_lang$html$Html_Keyed$node,
			'div',
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$classList(
					_elm_lang$core$Native_List.fromArray(
						[
							{ctor: '_Tuple2', _0: 'mdl-tab__panel', _1: true},
							{ctor: '_Tuple2', _0: 'is-active', _1: true}
						]))
				]));
		var summary = A2(_debois$elm_mdl$Material_Options$collect, _debois$elm_mdl$Material_Tabs$defaultConfig, options);
		var config = summary.config;
		var unwrapLabel = F2(
			function (tabIdx, _p3) {
				var _p4 = _p3;
				var _p6 = _p4._0._1;
				return A3(
					_debois$elm_mdl$Material_Options$styled,
					_elm_lang$html$Html$a,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_List.fromArray(
							[
								_debois$elm_mdl$Material_Options$cs('mdl-tabs__tab'),
								A2(
								_debois$elm_mdl$Material_Options$when,
								_debois$elm_mdl$Material_Options$cs('is-active'),
								_elm_lang$core$Native_Utils.eq(tabIdx, config.activeTab)),
								A2(
								_elm_lang$core$Maybe$withDefault,
								_debois$elm_mdl$Material_Options$nop,
								A2(
									_elm_lang$core$Maybe$map,
									function (t) {
										return _debois$elm_mdl$Material_Options_Internal$attribute(
											_elm_lang$html$Html_Events$onClick(
												t(tabIdx)));
									},
									config.onSelectTab))
							]),
						_p4._0._0),
					config.ripple ? _elm_lang$core$List$concat(
						_elm_lang$core$Native_List.fromArray(
							[
								_p6,
								_elm_lang$core$Native_List.fromArray(
								[
									A2(
									_elm_lang$html$Html_App$map,
									function (_p5) {
										return lift(
											A2(_debois$elm_mdl$Material_Tabs$Ripple, tabIdx, _p5));
									},
									A2(
										_debois$elm_mdl$Material_Ripple$view,
										_elm_lang$core$Native_List.fromArray(
											[
												_elm_lang$html$Html_Attributes$classList(
												_elm_lang$core$Native_List.fromArray(
													[
														{ctor: '_Tuple2', _0: 'mdl-tabs__ripple-container', _1: true},
														{ctor: '_Tuple2', _0: 'mdl-tabs__ripple-js-effect', _1: true}
													]))
											]),
										A2(
											_elm_lang$core$Maybe$withDefault,
											_debois$elm_mdl$Material_Ripple$model,
											A2(_elm_lang$core$Dict$get, tabIdx, model.ripples))))
								])
							])) : _p6);
			});
		var links = A3(
			_debois$elm_mdl$Material_Options$styled,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-tabs__tab-bar')
				]),
			A2(_elm_lang$core$List$indexedMap, unwrapLabel, tabs));
		return A5(
			_debois$elm_mdl$Material_Options$apply,
			summary,
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_debois$elm_mdl$Material_Options$cs('mdl-tabs'),
					_debois$elm_mdl$Material_Options$cs('mdl-js-tabs'),
					_debois$elm_mdl$Material_Options$cs('is-upgraded'),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect'),
					config.ripple),
					A2(
					_debois$elm_mdl$Material_Options$when,
					_debois$elm_mdl$Material_Options$cs('mdl-js-ripple-effect--ignore-events'),
					config.ripple)
				]),
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					links,
					wrapContent(
					_elm_lang$core$Native_List.fromArray(
						[
							{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Basics$toString(config.activeTab),
							_1: A2(
								_elm_lang$html$Html$div,
								_elm_lang$core$Native_List.fromArray(
									[]),
								tabContent)
						}
						]))
				]));
	});
var _debois$elm_mdl$Material_Tabs$render = A5(
	_debois$elm_parts$Parts$create,
	_debois$elm_mdl$Material_Tabs$view,
	_debois$elm_parts$Parts$generalize(_debois$elm_mdl$Material_Tabs$update),
	function (_) {
		return _.tabs;
	},
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.update(
				y,
				{tabs: x});
		}),
	_debois$elm_mdl$Material_Tabs$defaultModel);
var _debois$elm_mdl$Material_Tabs$Label = function (a) {
	return {ctor: 'Label', _0: a};
};
var _debois$elm_mdl$Material_Tabs$label = F2(
	function (p, c) {
		return _debois$elm_mdl$Material_Tabs$Label(
			{ctor: '_Tuple2', _0: p, _1: c});
	});
var _debois$elm_mdl$Material_Tabs$textLabel = F2(
	function (p, c) {
		return A2(
			_debois$elm_mdl$Material_Tabs$label,
			p,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(c)
				]));
	});

var _debois$elm_mdl$Material$init = function (lift) {
	return _debois$elm_mdl$Material_Layout$sub0(lift);
};
var _debois$elm_mdl$Material$subscriptions = F2(
	function (lift, model) {
		return _elm_lang$core$Platform_Sub$batch(
			_elm_lang$core$Native_List.fromArray(
				[
					A2(_debois$elm_mdl$Material_Layout$subs, lift, model.mdl),
					A2(_debois$elm_mdl$Material_Menu$subs, lift, model.mdl)
				]));
	});
var _debois$elm_mdl$Material$update = F2(
	function (msg, model) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none},
			A2(
				_elm_lang$core$Maybe$map,
				_debois$elm_mdl$Material_Helpers$map1st(
					function (mdl) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{mdl: mdl});
					}),
				A2(_debois$elm_parts$Parts$update$, msg, model.mdl)));
	});
var _debois$elm_mdl$Material$model = {button: _elm_lang$core$Dict$empty, textfield: _elm_lang$core$Dict$empty, menu: _elm_lang$core$Dict$empty, snackbar: _elm_lang$core$Maybe$Nothing, layout: _debois$elm_mdl$Material_Layout$defaultModel, toggles: _elm_lang$core$Dict$empty, tooltip: _elm_lang$core$Dict$empty, tabs: _elm_lang$core$Dict$empty};
var _debois$elm_mdl$Material$Model = F8(
	function (a, b, c, d, e, f, g, h) {
		return {button: a, textfield: b, menu: c, snackbar: d, layout: e, toggles: f, tooltip: g, tabs: h};
	});

var _debois$elm_mdl$Material_Color$text = function (_p0) {
	var _p1 = _p0;
	return _debois$elm_mdl$Material_Options$cs(
		A2(_elm_lang$core$Basics_ops['++'], 'mdl-color-text--', _p1._0));
};
var _debois$elm_mdl$Material_Color$background = function (_p2) {
	var _p3 = _p2;
	return _debois$elm_mdl$Material_Options$cs(
		A2(_elm_lang$core$Basics_ops['++'], 'mdl-color--', _p3._0));
};
var _debois$elm_mdl$Material_Color$shadeName = function (shade) {
	var _p4 = shade;
	switch (_p4.ctor) {
		case 'S50':
			return '50';
		case 'S100':
			return '100';
		case 'S200':
			return '200';
		case 'S300':
			return '300';
		case 'S400':
			return '400';
		case 'S500':
			return '500';
		case 'S600':
			return '600';
		case 'S700':
			return '700';
		case 'S800':
			return '800';
		case 'S900':
			return '900';
		case 'A100':
			return 'A100';
		case 'A200':
			return 'A200';
		case 'A400':
			return 'A400';
		default:
			return 'A700';
	}
};
var _debois$elm_mdl$Material_Color$hueName = function (color) {
	var _p5 = color;
	switch (_p5.ctor) {
		case 'Indigo':
			return 'indigo';
		case 'Blue':
			return 'blue';
		case 'LightBlue':
			return 'light-blue';
		case 'Cyan':
			return 'cyan';
		case 'Teal':
			return 'teal';
		case 'Green':
			return 'green';
		case 'LightGreen':
			return 'light-green';
		case 'Lime':
			return 'lime';
		case 'Yellow':
			return 'yellow';
		case 'Amber':
			return 'amber';
		case 'Orange':
			return 'orange';
		case 'Brown':
			return 'brown';
		case 'BlueGrey':
			return 'blue-grey';
		case 'Grey':
			return 'grey';
		case 'DeepOrange':
			return 'deep-orange';
		case 'Red':
			return 'red';
		case 'Pink':
			return 'pink';
		case 'Purple':
			return 'purple';
		default:
			return 'deep-purple';
	}
};
var _debois$elm_mdl$Material_Color$scheme = F2(
	function (primary, accent) {
		var q = _elm_lang$core$String$map(
			function (x) {
				return _elm_lang$core$Native_Utils.eq(
					x,
					_elm_lang$core$Native_Utils.chr('-')) ? _elm_lang$core$Native_Utils.chr('_') : x;
			});
		var cssFile = function () {
			var _p6 = accent;
			switch (_p6.ctor) {
				case 'Grey':
					return '';
				case 'Brown':
					return '';
				case 'BlueGrey':
					return '';
				default:
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'.',
						A2(
							_elm_lang$core$Basics_ops['++'],
							q(
								_debois$elm_mdl$Material_Color$hueName(primary)),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'-',
								q(
									_debois$elm_mdl$Material_Color$hueName(accent)))));
			}
		}();
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'material',
			A2(_elm_lang$core$Basics_ops['++'], cssFile, '.min.css'));
	});
var _debois$elm_mdl$Material_Color$DeepPurple = {ctor: 'DeepPurple'};
var _debois$elm_mdl$Material_Color$Purple = {ctor: 'Purple'};
var _debois$elm_mdl$Material_Color$Pink = {ctor: 'Pink'};
var _debois$elm_mdl$Material_Color$Red = {ctor: 'Red'};
var _debois$elm_mdl$Material_Color$DeepOrange = {ctor: 'DeepOrange'};
var _debois$elm_mdl$Material_Color$Grey = {ctor: 'Grey'};
var _debois$elm_mdl$Material_Color$BlueGrey = {ctor: 'BlueGrey'};
var _debois$elm_mdl$Material_Color$Brown = {ctor: 'Brown'};
var _debois$elm_mdl$Material_Color$Orange = {ctor: 'Orange'};
var _debois$elm_mdl$Material_Color$Amber = {ctor: 'Amber'};
var _debois$elm_mdl$Material_Color$Yellow = {ctor: 'Yellow'};
var _debois$elm_mdl$Material_Color$Lime = {ctor: 'Lime'};
var _debois$elm_mdl$Material_Color$LightGreen = {ctor: 'LightGreen'};
var _debois$elm_mdl$Material_Color$Green = {ctor: 'Green'};
var _debois$elm_mdl$Material_Color$Teal = {ctor: 'Teal'};
var _debois$elm_mdl$Material_Color$Cyan = {ctor: 'Cyan'};
var _debois$elm_mdl$Material_Color$LightBlue = {ctor: 'LightBlue'};
var _debois$elm_mdl$Material_Color$Blue = {ctor: 'Blue'};
var _debois$elm_mdl$Material_Color$Indigo = {ctor: 'Indigo'};
var _debois$elm_mdl$Material_Color$hues = _elm_lang$core$Array$fromList(
	_elm_lang$core$Native_List.fromArray(
		[_debois$elm_mdl$Material_Color$Indigo, _debois$elm_mdl$Material_Color$Blue, _debois$elm_mdl$Material_Color$LightBlue, _debois$elm_mdl$Material_Color$Cyan, _debois$elm_mdl$Material_Color$Teal, _debois$elm_mdl$Material_Color$Green, _debois$elm_mdl$Material_Color$LightGreen, _debois$elm_mdl$Material_Color$Lime, _debois$elm_mdl$Material_Color$Yellow, _debois$elm_mdl$Material_Color$Amber, _debois$elm_mdl$Material_Color$Orange, _debois$elm_mdl$Material_Color$Brown, _debois$elm_mdl$Material_Color$BlueGrey, _debois$elm_mdl$Material_Color$Grey, _debois$elm_mdl$Material_Color$DeepOrange, _debois$elm_mdl$Material_Color$Red, _debois$elm_mdl$Material_Color$Pink, _debois$elm_mdl$Material_Color$Purple, _debois$elm_mdl$Material_Color$DeepPurple]));
var _debois$elm_mdl$Material_Color$accentHues = _elm_lang$core$Array$fromList(
	_elm_lang$core$Native_List.fromArray(
		[_debois$elm_mdl$Material_Color$Indigo, _debois$elm_mdl$Material_Color$Blue, _debois$elm_mdl$Material_Color$LightBlue, _debois$elm_mdl$Material_Color$Cyan, _debois$elm_mdl$Material_Color$Teal, _debois$elm_mdl$Material_Color$Green, _debois$elm_mdl$Material_Color$LightGreen, _debois$elm_mdl$Material_Color$Lime, _debois$elm_mdl$Material_Color$Yellow, _debois$elm_mdl$Material_Color$Amber, _debois$elm_mdl$Material_Color$Orange, _debois$elm_mdl$Material_Color$DeepOrange, _debois$elm_mdl$Material_Color$Red, _debois$elm_mdl$Material_Color$Pink, _debois$elm_mdl$Material_Color$Purple, _debois$elm_mdl$Material_Color$DeepPurple]));
var _debois$elm_mdl$Material_Color$A700 = {ctor: 'A700'};
var _debois$elm_mdl$Material_Color$A400 = {ctor: 'A400'};
var _debois$elm_mdl$Material_Color$A200 = {ctor: 'A200'};
var _debois$elm_mdl$Material_Color$A100 = {ctor: 'A100'};
var _debois$elm_mdl$Material_Color$S900 = {ctor: 'S900'};
var _debois$elm_mdl$Material_Color$S800 = {ctor: 'S800'};
var _debois$elm_mdl$Material_Color$S700 = {ctor: 'S700'};
var _debois$elm_mdl$Material_Color$S600 = {ctor: 'S600'};
var _debois$elm_mdl$Material_Color$S500 = {ctor: 'S500'};
var _debois$elm_mdl$Material_Color$S400 = {ctor: 'S400'};
var _debois$elm_mdl$Material_Color$S300 = {ctor: 'S300'};
var _debois$elm_mdl$Material_Color$S200 = {ctor: 'S200'};
var _debois$elm_mdl$Material_Color$S100 = {ctor: 'S100'};
var _debois$elm_mdl$Material_Color$S50 = {ctor: 'S50'};
var _debois$elm_mdl$Material_Color$shades = _elm_lang$core$Array$fromList(
	_elm_lang$core$Native_List.fromArray(
		[_debois$elm_mdl$Material_Color$S50, _debois$elm_mdl$Material_Color$S100, _debois$elm_mdl$Material_Color$S200, _debois$elm_mdl$Material_Color$S300, _debois$elm_mdl$Material_Color$S400, _debois$elm_mdl$Material_Color$S500, _debois$elm_mdl$Material_Color$S600, _debois$elm_mdl$Material_Color$S700, _debois$elm_mdl$Material_Color$S800, _debois$elm_mdl$Material_Color$S900, _debois$elm_mdl$Material_Color$A100, _debois$elm_mdl$Material_Color$A200, _debois$elm_mdl$Material_Color$A400, _debois$elm_mdl$Material_Color$A700]));
var _debois$elm_mdl$Material_Color$C = function (a) {
	return {ctor: 'C', _0: a};
};
var _debois$elm_mdl$Material_Color$color = F2(
	function (hue, shade) {
		return _debois$elm_mdl$Material_Color$C(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_debois$elm_mdl$Material_Color$hueName(hue),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'-',
					_debois$elm_mdl$Material_Color$shadeName(shade))));
	});
var _debois$elm_mdl$Material_Color$white = _debois$elm_mdl$Material_Color$C('white');
var _debois$elm_mdl$Material_Color$black = _debois$elm_mdl$Material_Color$C('black');
var _debois$elm_mdl$Material_Color$primary = _debois$elm_mdl$Material_Color$C('primary');
var _debois$elm_mdl$Material_Color$primaryDark = _debois$elm_mdl$Material_Color$C('primary-dark');
var _debois$elm_mdl$Material_Color$primaryContrast = _debois$elm_mdl$Material_Color$C('primary-contrast');
var _debois$elm_mdl$Material_Color$accent = _debois$elm_mdl$Material_Color$C('accent');
var _debois$elm_mdl$Material_Color$accentContrast = _debois$elm_mdl$Material_Color$C('accent-contrast');

var _debois$elm_mdl$Material_Scheme$scheme = F2(
	function (primary, accent) {
		return A2(
			_elm_lang$core$String$join,
			'\n',
			A2(
				_elm_lang$core$List$map,
				function (url) {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'@import url(',
						A2(_elm_lang$core$Basics_ops['++'], url, ');'));
				},
				_elm_lang$core$Native_List.fromArray(
					[
						A2(
						_elm_lang$core$Basics_ops['++'],
						'https://code.getmdl.io/1.1.3/',
						A2(_debois$elm_mdl$Material_Color$scheme, primary, accent)),
						'https://fonts.googleapis.com/icon?family=Material+Icons',
						'https://fonts.googleapis.com/css?family=Roboto:400,300,500|Roboto+Mono|Roboto+Condensed:400,700&subset=latin,latin-ext'
					])));
	});
var _debois$elm_mdl$Material_Scheme$topWithScheme = F3(
	function (primary, accent, content) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					A3(
					_elm_lang$html$Html$node,
					'style',
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html_Attributes$type$('text/css')
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							_elm_lang$html$Html$text(
							A2(_debois$elm_mdl$Material_Scheme$scheme, primary, accent))
						])),
					content
				]));
	});
var _debois$elm_mdl$Material_Scheme$top = function (content) {
	return A3(_debois$elm_mdl$Material_Scheme$topWithScheme, _debois$elm_mdl$Material_Color$Grey, _debois$elm_mdl$Material_Color$Grey, content);
};

var _elm_lang$core$Random$onSelfMsg = F3(
	function (_p1, _p0, seed) {
		return _elm_lang$core$Task$succeed(seed);
	});
var _elm_lang$core$Random$magicNum8 = 2147483562;
var _elm_lang$core$Random$range = function (_p2) {
	return {ctor: '_Tuple2', _0: 0, _1: _elm_lang$core$Random$magicNum8};
};
var _elm_lang$core$Random$magicNum7 = 2147483399;
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

var _elm_community$random_extra$Random_Array$choose = function (arr) {
	if (_elm_lang$core$Array$isEmpty(arr)) {
		return _elm_community$random_extra$Random_Extra$constant(
			{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: arr});
	} else {
		var front = function (i) {
			return A3(_elm_lang$core$Array$slice, 0, i, arr);
		};
		var lastIndex = _elm_lang$core$Array$length(arr) - 1;
		var back = function (i) {
			return _elm_lang$core$Native_Utils.eq(i, lastIndex) ? _elm_lang$core$Array$empty : A3(_elm_lang$core$Array$slice, i + 1, lastIndex + 1, arr);
		};
		var gen = A2(_elm_lang$core$Random$int, 0, lastIndex);
		return A2(
			_elm_lang$core$Random$map,
			function (index) {
				return {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$Array$get, index, arr),
					_1: A2(
						_elm_lang$core$Array$append,
						front(index),
						back(index))
				};
			},
			gen);
	}
};
var _elm_community$random_extra$Random_Array$shuffle = function (arr) {
	if (_elm_lang$core$Array$isEmpty(arr)) {
		return _elm_community$random_extra$Random_Extra$constant(arr);
	} else {
		var helper = function (_p0) {
			var _p1 = _p0;
			var _p6 = _p1._0;
			return A2(
				_elm_lang$core$Random$andThen,
				_elm_community$random_extra$Random_Array$choose(_p1._1),
				function (_p2) {
					var _p3 = _p2;
					var _p5 = _p3._1;
					var _p4 = _p3._0;
					if (_p4.ctor === 'Nothing') {
						return _elm_community$random_extra$Random_Extra$constant(
							{ctor: '_Tuple2', _0: _p6, _1: _p5});
					} else {
						return helper(
							{
								ctor: '_Tuple2',
								_0: A2(_elm_lang$core$List_ops['::'], _p4._0, _p6),
								_1: _p5
							});
					}
				});
		};
		return A2(
			_elm_lang$core$Random$map,
			function (_p7) {
				return _elm_lang$core$Array$fromList(
					_elm_lang$core$Basics$fst(_p7));
			},
			helper(
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_List.fromArray(
						[]),
					_1: arr
				}));
	}
};
var _elm_community$random_extra$Random_Array$sample = function (arr) {
	var gen = A2(
		_elm_lang$core$Random$int,
		0,
		_elm_lang$core$Array$length(arr) - 1);
	return A2(
		_elm_lang$core$Random$map,
		function (index) {
			return A2(_elm_lang$core$Array$get, index, arr);
		},
		gen);
};
var _elm_community$random_extra$Random_Array$array = F2(
	function (arrayLength, generator) {
		return A2(
			_elm_lang$core$Random$map,
			_elm_lang$core$Array$fromList,
			A2(_elm_lang$core$Random$list, arrayLength, generator));
	});
var _elm_community$random_extra$Random_Array$rangeLengthArray = F3(
	function (minLength, maxLength, generator) {
		return A2(
			_elm_community$random_extra$Random_Extra$flatMap,
			function (len) {
				return A2(_elm_community$random_extra$Random_Array$array, len, generator);
			},
			A2(_elm_lang$core$Random$int, minLength, maxLength));
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

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs$ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? A2(
			_elm_lang$core$List_ops['::'],
			group,
			A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs$)) : _elm_lang$core$Native_List.fromArray(
			[]);
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs$ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? A2(
			_elm_lang$core$List_ops['::'],
			group,
			A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs$)) : _elm_lang$core$Native_List.fromArray(
			[]);
	});
var _elm_community$list_extra$List_Extra$groupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$zip5 = _elm_lang$core$List$map5(
	F5(
		function (v0, v1, v2, v3, v4) {
			return {ctor: '_Tuple5', _0: v0, _1: v1, _2: v2, _3: v3, _4: v4};
		}));
var _elm_community$list_extra$List_Extra$zip4 = _elm_lang$core$List$map4(
	F4(
		function (v0, v1, v2, v3) {
			return {ctor: '_Tuple4', _0: v0, _1: v1, _2: v2, _3: v3};
		}));
var _elm_community$list_extra$List_Extra$zip3 = _elm_lang$core$List$map3(
	F3(
		function (v0, v1, v2) {
			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
		}));
var _elm_community$list_extra$List_Extra$zip = _elm_lang$core$List$map2(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _elm_community$list_extra$List_Extra$isPrefixOf = function (prefix) {
	return function (_p0) {
		return A2(
			_elm_lang$core$List$all,
			_elm_lang$core$Basics$identity,
			A3(
				_elm_lang$core$List$map2,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				prefix,
				_p0));
	};
};
var _elm_community$list_extra$List_Extra$isSuffixOf = F2(
	function (suffix, xs) {
		return A2(
			_elm_community$list_extra$List_Extra$isPrefixOf,
			_elm_lang$core$List$reverse(suffix),
			_elm_lang$core$List$reverse(xs));
	});
var _elm_community$list_extra$List_Extra$selectSplit = function (xs) {
	var _p1 = xs;
	if (_p1.ctor === '[]') {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	} else {
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		return A2(
			_elm_lang$core$List_ops['::'],
			{
				ctor: '_Tuple3',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: _p4,
				_2: _p5
			},
			A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple3',
						_0: A2(_elm_lang$core$List_ops['::'], _p4, _p3._0),
						_1: _p3._1,
						_2: _p3._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p5)));
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return A2(
			_elm_lang$core$List_ops['::'],
			{ctor: '_Tuple2', _0: _p9, _1: _p10},
			A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple2',
						_0: _p8._0,
						_1: A2(_elm_lang$core$List_ops['::'], _p9, _p8._1)
					};
				},
				_elm_community$list_extra$List_Extra$select(_p10)));
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p11 = list;
		if (_p11.ctor === '::') {
			var _p12 = _p11._0;
			return A2(
				_elm_lang$core$List_ops['::'],
				A2(_elm_lang$core$List_ops['::'], e, _p12),
				A2(_elm_lang$core$List_ops['::'], _p12, _p11._1));
		} else {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$core$Native_List.fromArray(
			[])
		]));
var _elm_community$list_extra$List_Extra$isInfixOf = F2(
	function (infix, xs) {
		return A2(
			_elm_lang$core$List$any,
			_elm_community$list_extra$List_Extra$isPrefixOf(infix),
			_elm_community$list_extra$List_Extra$tails(xs));
	});
var _elm_community$list_extra$List_Extra$inits = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			return A2(
				_elm_lang$core$List_ops['::'],
				_elm_lang$core$Native_List.fromArray(
					[]),
				A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return A2(_elm_lang$core$List_ops['::'], x, y);
						})(e),
					acc));
		}),
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$core$Native_List.fromArray(
			[])
		]));
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (cmp, xs$) {
		var _p13 = xs$;
		if (_p13.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			if (_p13._1.ctor === '[]') {
				return _elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$core$Native_List.fromArray(
						[_p13._0])
					]);
			} else {
				var _p15 = _p13._0;
				var _p14 = A2(_elm_community$list_extra$List_Extra$groupWhileTransitively, cmp, _p13._1);
				if (_p14.ctor === '::') {
					return A2(cmp, _p15, _p13._1._0) ? A2(
						_elm_lang$core$List_ops['::'],
						A2(_elm_lang$core$List_ops['::'], _p15, _p14._0),
						_p14._1) : A2(
						_elm_lang$core$List_ops['::'],
						_elm_lang$core$Native_List.fromArray(
							[_p15]),
						_p14);
				} else {
					return _elm_lang$core$Native_List.fromArray(
						[]);
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$stripPrefix = F2(
	function (prefix, xs) {
		var step = F2(
			function (e, m) {
				var _p16 = m;
				if (_p16.ctor === 'Nothing') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_p16._0.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Native_Utils.eq(e, _p16._0._0) ? _elm_lang$core$Maybe$Just(_p16._0._1) : _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		return A3(
			_elm_lang$core$List$foldl,
			step,
			_elm_lang$core$Maybe$Just(xs),
			prefix);
	});
var _elm_community$list_extra$List_Extra$dropWhileRight = function (p) {
	return A2(
		_elm_lang$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? _elm_lang$core$Native_List.fromArray(
					[]) : A2(_elm_lang$core$List_ops['::'], x, xs);
			}),
		_elm_lang$core$Native_List.fromArray(
			[]));
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p17) {
			var _p18 = _p17;
			var _p19 = _p18._0;
			return (p(x) && _p18._1) ? {
				ctor: '_Tuple2',
				_0: A2(_elm_lang$core$List_ops['::'], x, _p19),
				_1: true
			} : {ctor: '_Tuple2', _0: _p19, _1: false};
		});
	return function (_p20) {
		return _elm_lang$core$Basics$fst(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_List.fromArray(
						[]),
					_1: true
				},
				_p20));
	};
};
var _elm_community$list_extra$List_Extra$splitAt = F2(
	function (n, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List$take, n, xs),
			_1: A2(_elm_lang$core$List$drop, n, xs)
		};
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p21 = f(seed);
		if (_p21.ctor === 'Nothing') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			return A2(
				_elm_lang$core$List_ops['::'],
				_p21._0._0,
				A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p21._0._1));
		}
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs$) {
		var _p22 = xs$;
		if (_p22.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			if (_p22._1.ctor === '[]') {
				return _elm_lang$core$Native_List.fromArray(
					[_p22._0]);
			} else {
				var _p23 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p22._1);
				if (_p23.ctor === '::') {
					return A2(
						_elm_lang$core$List_ops['::'],
						A2(f, _p22._0, _p23._0),
						_p23);
				} else {
					return _elm_lang$core$Native_List.fromArray(
						[]);
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs$) {
		var _p24 = xs$;
		if (_p24.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[acc]);
		} else {
			var _p25 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p24._1);
			if (_p25.ctor === '::') {
				return A2(
					_elm_lang$core$List_ops['::'],
					A2(f, _p24._0, _p25._0),
					_p25);
			} else {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs$) {
		var _p26 = xs$;
		if (_p26.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p26._0, _p26._1);
		}
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p27 = m;
						if (_p27.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p27._0);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldr, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$foldl1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p28 = m;
						if (_p28.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p28._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (l1, l2, acc) {
		interweaveHelp:
		while (true) {
			var _p29 = {ctor: '_Tuple2', _0: l1, _1: l2};
			_v17_1:
			do {
				if (_p29._0.ctor === '::') {
					if (_p29._1.ctor === '::') {
						var _v18 = _p29._0._1,
							_v19 = _p29._1._1,
							_v20 = A2(
							_elm_lang$core$Basics_ops['++'],
							acc,
							_elm_lang$core$Native_List.fromArray(
								[_p29._0._0, _p29._1._0]));
						l1 = _v18;
						l2 = _v19;
						acc = _v20;
						continue interweaveHelp;
					} else {
						break _v17_1;
					}
				} else {
					if (_p29._1.ctor === '[]') {
						break _v17_1;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], acc, _p29._1);
					}
				}
			} while(false);
			return A2(_elm_lang$core$Basics_ops['++'], acc, _p29._0);
		}
	});
var _elm_community$list_extra$List_Extra$interweave = F2(
	function (l1, l2) {
		return A3(
			_elm_community$list_extra$List_Extra$interweaveHelp,
			l1,
			l2,
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _elm_community$list_extra$List_Extra$permutations = function (xs$) {
	var _p30 = xs$;
	if (_p30.ctor === '[]') {
		return _elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$core$Native_List.fromArray(
				[])
			]);
	} else {
		var f = function (_p31) {
			var _p32 = _p31;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return A2(_elm_lang$core$List_ops['::'], x, y);
					})(_p32._0),
				_elm_community$list_extra$List_Extra$permutations(_p32._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p30));
	}
};
var _elm_community$list_extra$List_Extra$isPermutationOf = F2(
	function (permut, xs) {
		return A2(
			_elm_lang$core$List$member,
			permut,
			_elm_community$list_extra$List_Extra$permutations(xs));
	});
var _elm_community$list_extra$List_Extra$subsequencesNonEmpty = function (xs) {
	var _p33 = xs;
	if (_p33.ctor === '[]') {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	} else {
		var _p34 = _p33._0;
		var f = F2(
			function (ys, r) {
				return A2(
					_elm_lang$core$List_ops['::'],
					ys,
					A2(
						_elm_lang$core$List_ops['::'],
						A2(_elm_lang$core$List_ops['::'], _p34, ys),
						r));
			});
		return A2(
			_elm_lang$core$List_ops['::'],
			_elm_lang$core$Native_List.fromArray(
				[_p34]),
			A3(
				_elm_lang$core$List$foldr,
				f,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p33._1)));
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return A2(
		_elm_lang$core$List_ops['::'],
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs));
};
var _elm_community$list_extra$List_Extra$isSubsequenceOf = F2(
	function (subseq, xs) {
		return A2(
			_elm_lang$core$List$member,
			subseq,
			_elm_community$list_extra$List_Extra$subsequences(xs));
	});
var _elm_community$list_extra$List_Extra$transpose = function (ll) {
	transpose:
	while (true) {
		var _p35 = ll;
		if (_p35.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			if (_p35._0.ctor === '[]') {
				var _v25 = _p35._1;
				ll = _v25;
				continue transpose;
			} else {
				var _p36 = _p35._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p36);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p36);
				return A2(
					_elm_lang$core$List_ops['::'],
					A2(_elm_lang$core$List_ops['::'], _p35._0._0, heads),
					_elm_community$list_extra$List_Extra$transpose(
						A2(_elm_lang$core$List_ops['::'], _p35._0._1, tails)));
			}
		}
	}
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p37) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p37));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p38) {
				return _elm_lang$core$Basics$not(
					pred(_p38));
			},
			list);
	});
var _elm_community$list_extra$List_Extra$removeAt = F2(
	function (index, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return l;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p39 = tail;
			if (_p39.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p39._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$singleton = function (x) {
	return _elm_lang$core$Native_List.fromArray(
		[x]);
};
var _elm_community$list_extra$List_Extra$setAt = F3(
	function (index, value, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p40 = tail;
			if (_p40.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$List$append,
						head,
						A2(_elm_lang$core$List_ops['::'], value, _p40._0)));
			}
		}
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p41 = xs;
		if (_p41.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var _p43 = _p41._1;
			var _p42 = _p41._0;
			return _elm_lang$core$Native_Utils.eq(x, _p42) ? _p43 : A2(
				_elm_lang$core$List_ops['::'],
				_p42,
				A2(_elm_community$list_extra$List_Extra$remove, x, _p43));
		}
	});
var _elm_community$list_extra$List_Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var _elm_community$list_extra$List_Extra$updateAt = F3(
	function (index, update, list) {
		return ((_elm_lang$core$Native_Utils.cmp(index, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(
			index,
			_elm_lang$core$List$length(list)) > -1)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A3(
				_elm_community$list_extra$List_Extra$updateIfIndex,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(index),
				update,
				list));
	});
var _elm_community$list_extra$List_Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var _elm_community$list_extra$List_Extra$replaceIf = F3(
	function (predicate, replacement, list) {
		return A3(
			_elm_community$list_extra$List_Extra$updateIf,
			predicate,
			_elm_lang$core$Basics$always(replacement),
			list);
	});
var _elm_community$list_extra$List_Extra$findIndices = function (p) {
	return function (_p44) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Basics$fst,
			A2(
				_elm_lang$core$List$filter,
				function (_p45) {
					var _p46 = _p45;
					return p(_p46._1);
				},
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p44)));
	};
};
var _elm_community$list_extra$List_Extra$findIndex = function (p) {
	return function (_p47) {
		return _elm_lang$core$List$head(
			A2(_elm_community$list_extra$List_Extra$findIndices, p, _p47));
	};
};
var _elm_community$list_extra$List_Extra$elemIndices = function (x) {
	return _elm_community$list_extra$List_Extra$findIndices(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$elemIndex = function (x) {
	return _elm_community$list_extra$List_Extra$findIndex(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			var _p48 = list;
			if (_p48.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p49 = _p48._0;
				if (predicate(_p49)) {
					return _elm_lang$core$Maybe$Just(_p49);
				} else {
					var _v31 = predicate,
						_v32 = _p48._1;
					predicate = _v31;
					list = _v32;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p50) {
		return _elm_lang$core$Basics$not(
			A2(_elm_lang$core$List$member, x, _p50));
	};
};
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$Basics$flip(_elm_lang$core$List$concatMap);
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			la,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					lb,
					function (b) {
						return _elm_lang$core$Native_List.fromArray(
							[
								A2(f, a, b)
							]);
					});
			});
	});
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			la,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					lb,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							lc,
							function (c) {
								return _elm_lang$core$Native_List.fromArray(
									[
										A3(f, a, b, c)
									]);
							});
					});
			});
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			la,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					lb,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							lc,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									ld,
									function (d) {
										return _elm_lang$core$Native_List.fromArray(
											[
												A4(f, a, b, c, d)
											]);
									});
							});
					});
			});
	});
var _elm_community$list_extra$List_Extra$andMap = F2(
	function (fl, l) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			fl,
			l);
	});
var _elm_community$list_extra$List_Extra$uniqueHelp = F3(
	function (f, existing, remaining) {
		uniqueHelp:
		while (true) {
			var _p51 = remaining;
			if (_p51.ctor === '[]') {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			} else {
				var _p53 = _p51._1;
				var _p52 = _p51._0;
				var computedFirst = f(_p52);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v34 = f,
						_v35 = existing,
						_v36 = _p53;
					f = _v34;
					existing = _v35;
					remaining = _v36;
					continue uniqueHelp;
				} else {
					return A2(
						_elm_lang$core$List_ops['::'],
						_p52,
						A3(
							_elm_community$list_extra$List_Extra$uniqueHelp,
							f,
							A2(_elm_lang$core$Set$insert, computedFirst, existing),
							_p53));
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A3(_elm_community$list_extra$List_Extra$uniqueHelp, f, _elm_lang$core$Set$empty, list);
	});
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A3(_elm_community$list_extra$List_Extra$uniqueHelp, _elm_lang$core$Basics$identity, _elm_lang$core$Set$empty, list);
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p54 = list;
			if (_p54.ctor === '[]') {
				return _elm_lang$core$Native_List.fromArray(
					[]);
			} else {
				if (predicate(_p54._0)) {
					var _v38 = predicate,
						_v39 = _p54._1;
					predicate = _v38;
					list = _v39;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = F2(
	function (predicate, list) {
		var _p55 = list;
		if (_p55.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var _p56 = _p55._0;
			return predicate(_p56) ? A2(
				_elm_lang$core$List_ops['::'],
				_p56,
				A2(_elm_community$list_extra$List_Extra$takeWhile, predicate, _p55._1)) : _elm_lang$core$Native_List.fromArray(
				[]);
		}
	});
var _elm_community$list_extra$List_Extra$span = F2(
	function (p, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_community$list_extra$List_Extra$takeWhile, p, xs),
			_1: A2(_elm_community$list_extra$List_Extra$dropWhile, p, xs)
		};
	});
var _elm_community$list_extra$List_Extra$break = function (p) {
	return _elm_community$list_extra$List_Extra$span(
		function (_p57) {
			return _elm_lang$core$Basics$not(
				p(_p57));
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs$) {
		var _p58 = xs$;
		if (_p58.ctor === '[]') {
			return _elm_lang$core$Native_List.fromArray(
				[]);
		} else {
			var _p60 = _p58._0;
			var _p59 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p60),
				_p58._1);
			var ys = _p59._0;
			var zs = _p59._1;
			return A2(
				_elm_lang$core$List_ops['::'],
				A2(_elm_lang$core$List_ops['::'], _p60, ys),
				A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs));
		}
	});
var _elm_community$list_extra$List_Extra$group = _elm_community$list_extra$List_Extra$groupWhile(
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		}));
var _elm_community$list_extra$List_Extra$minimumBy = F2(
	function (f, ls) {
		var minBy = F2(
			function (x, _p61) {
				var _p62 = _p61;
				var _p63 = _p62._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p63) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p62._0, _1: _p63};
			});
		var _p64 = ls;
		if (_p64.ctor === '::') {
			if (_p64._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p64._0);
			} else {
				var _p65 = _p64._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Basics$fst(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p65,
								_1: f(_p65)
							},
							_p64._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p66) {
				var _p67 = _p66;
				var _p68 = _p67._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p68) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p67._0, _1: _p68};
			});
		var _p69 = ls;
		if (_p69.ctor === '::') {
			if (_p69._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p69._0);
			} else {
				var _p70 = _p69._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Basics$fst(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p70,
								_1: f(_p70)
							},
							_p69._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p71 = xs;
	if (_p71.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p71._0, _1: _p71._1});
	}
};
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p72 = f(x);
		if (_p72.ctor === 'Just') {
			return A2(
				_elm_lang$core$List_ops['::'],
				x,
				A2(_elm_community$list_extra$List_Extra$iterate, f, _p72._0));
		} else {
			return _elm_lang$core$Native_List.fromArray(
				[x]);
		}
	});
var _elm_community$list_extra$List_Extra$getAt = F2(
	function (idx, xs) {
		return (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, idx, xs));
	});
var _elm_community$list_extra$List_Extra_ops = _elm_community$list_extra$List_Extra_ops || {};
_elm_community$list_extra$List_Extra_ops['!!'] = _elm_lang$core$Basics$flip(_elm_community$list_extra$List_Extra$getAt);
var _elm_community$list_extra$List_Extra$init = function () {
	var maybe = F2(
		function (d, f) {
			return function (_p73) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					d,
					A2(_elm_lang$core$Maybe$map, f, _p73));
			};
		});
	return A2(
		_elm_lang$core$List$foldr,
		function (_p74) {
			return A2(
				F2(
					function (x, y) {
						return function (_p75) {
							return x(
								y(_p75));
						};
					}),
				_elm_lang$core$Maybe$Just,
				A2(
					maybe,
					_elm_lang$core$Native_List.fromArray(
						[]),
					F2(
						function (x, y) {
							return A2(_elm_lang$core$List_ops['::'], x, y);
						})(_p74)));
		},
		_elm_lang$core$Maybe$Nothing);
}();
var _elm_community$list_extra$List_Extra$last = _elm_community$list_extra$List_Extra$foldl1(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));

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

var _krisajenkins$elm_astar$AStar_Generalised$reconstructPath = F2(
	function (cameFrom, goal) {
		var _p0 = A2(_elm_lang$core$Dict$get, goal, cameFrom);
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$Array$empty;
		} else {
			return A2(
				_elm_lang$core$Array$push,
				goal,
				A2(_krisajenkins$elm_astar$AStar_Generalised$reconstructPath, cameFrom, _p0._0));
		}
	});
var _krisajenkins$elm_astar$AStar_Generalised$updateCost = F3(
	function (current, neighbour, model) {
		var newCameFrom = A3(_elm_lang$core$Dict$insert, neighbour, current, model.cameFrom);
		var distanceTo = _elm_lang$core$Basics$toFloat(
			_elm_lang$core$Array$length(
				A2(_krisajenkins$elm_astar$AStar_Generalised$reconstructPath, newCameFrom, neighbour)));
		var newModel = _elm_lang$core$Native_Utils.update(
			model,
			{
				costs: A3(_elm_lang$core$Dict$insert, neighbour, distanceTo, model.costs),
				cameFrom: newCameFrom
			});
		var _p1 = A2(_elm_lang$core$Dict$get, neighbour, model.costs);
		if (_p1.ctor === 'Nothing') {
			return newModel;
		} else {
			return (_elm_lang$core$Native_Utils.cmp(distanceTo, _p1._0) < 0) ? newModel : model;
		}
	});
var _krisajenkins$elm_astar$AStar_Generalised$cheapestOpen = F2(
	function (costFn, model) {
		return A2(
			_elm_lang$core$Maybe$map,
			_elm_lang$core$Basics$fst,
			_elm_lang$core$List$head(
				A2(
					_elm_lang$core$List$sortBy,
					_elm_lang$core$Basics$snd,
					A2(
						_elm_lang$core$List$filterMap,
						function (position) {
							var _p2 = A2(_elm_lang$core$Dict$get, position, model.costs);
							if (_p2.ctor === 'Nothing') {
								return _elm_lang$core$Maybe$Nothing;
							} else {
								return _elm_lang$core$Maybe$Just(
									{
										ctor: '_Tuple2',
										_0: position,
										_1: _p2._0 + costFn(position)
									});
							}
						},
						_elm_lang$core$Set$toList(model.openSet)))));
	});
var _krisajenkins$elm_astar$AStar_Generalised$astar = F4(
	function (costFn, moveFn, goal, model) {
		astar:
		while (true) {
			var _p3 = A2(
				_krisajenkins$elm_astar$AStar_Generalised$cheapestOpen,
				costFn(goal),
				model);
			if (_p3.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p4 = _p3._0;
				if (_elm_lang$core$Native_Utils.eq(_p4, goal)) {
					return _elm_lang$core$Maybe$Just(
						A2(_krisajenkins$elm_astar$AStar_Generalised$reconstructPath, model.cameFrom, goal));
				} else {
					var neighbours = moveFn(_p4);
					var modelPopped = _elm_lang$core$Native_Utils.update(
						model,
						{
							openSet: A2(_elm_lang$core$Set$remove, _p4, model.openSet),
							evaluated: A2(_elm_lang$core$Set$insert, _p4, model.evaluated)
						});
					var newNeighbours = A2(_elm_lang$core$Set$diff, neighbours, modelPopped.evaluated);
					var modelWithNeighbours = _elm_lang$core$Native_Utils.update(
						modelPopped,
						{
							openSet: A2(_elm_lang$core$Set$union, modelPopped.openSet, newNeighbours)
						});
					var modelWithCosts = A3(
						_elm_lang$core$Set$foldl,
						_krisajenkins$elm_astar$AStar_Generalised$updateCost(_p4),
						modelWithNeighbours,
						newNeighbours);
					var _v4 = costFn,
						_v5 = moveFn,
						_v6 = goal,
						_v7 = modelWithCosts;
					costFn = _v4;
					moveFn = _v5;
					goal = _v6;
					model = _v7;
					continue astar;
				}
			}
		}
	});
var _krisajenkins$elm_astar$AStar_Generalised$initialModel = function (start) {
	return {
		evaluated: _elm_lang$core$Set$empty,
		openSet: _elm_lang$core$Set$singleton(start),
		costs: A2(_elm_lang$core$Dict$singleton, start, 0),
		cameFrom: _elm_lang$core$Dict$empty
	};
};
var _krisajenkins$elm_astar$AStar_Generalised$findPath = F4(
	function (costFn, moveFn, start, end) {
		return A2(
			_elm_lang$core$Maybe$map,
			_elm_lang$core$Array$toList,
			A4(
				_krisajenkins$elm_astar$AStar_Generalised$astar,
				costFn,
				moveFn,
				end,
				_krisajenkins$elm_astar$AStar_Generalised$initialModel(start)));
	});
var _krisajenkins$elm_astar$AStar_Generalised$Model = F4(
	function (a, b, c, d) {
		return {evaluated: a, openSet: b, costs: c, cameFrom: d};
	});

var _krisajenkins$elm_astar$AStar$pythagoreanCost = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p3 = _p0;
		var dy = _elm_lang$core$Basics$toFloat(
			_elm_lang$core$Basics$abs(_p2._1 - _p3._1));
		var dx = _elm_lang$core$Basics$toFloat(
			_elm_lang$core$Basics$abs(_p2._0 - _p3._0));
		return _elm_lang$core$Basics$abs(
			(_elm_lang$core$Basics$sqrt(2) * A2(_elm_lang$core$Basics$min, dx, dy)) + _elm_lang$core$Basics$abs(dy - dx));
	});
var _krisajenkins$elm_astar$AStar$straightLineCost = F2(
	function (_p5, _p4) {
		var _p6 = _p5;
		var _p7 = _p4;
		var dy = _elm_lang$core$Basics$abs(_p6._1 - _p7._1);
		var dx = _elm_lang$core$Basics$abs(_p6._0 - _p7._0);
		return _elm_lang$core$Basics$toFloat(dx + dy);
	});
var _krisajenkins$elm_astar$AStar$findPath = _krisajenkins$elm_astar$AStar_Generalised$findPath;

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

var _mordrax$cotwelm$Stats$printSP = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(_p2.currentSP),
		A2(
			_elm_lang$core$Basics_ops['++'],
			' / ',
			_elm_lang$core$Basics$toString(_p2.maxSP)));
};
var _mordrax$cotwelm$Stats$printHP = function (_p3) {
	var _p4 = _p3;
	var _p5 = _p4._0;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(_p5.currentHP),
		A2(
			_elm_lang$core$Basics_ops['++'],
			' / ',
			_elm_lang$core$Basics$toString(_p5.maxHP)));
};
var _mordrax$cotwelm$Stats$combatStats = function (_p6) {
	var _p7 = _p6;
	var _p8 = _p7._0;
	return {ctor: '_Tuple3', _0: _p8.damageRange, _1: _p8.ac, _2: _p8.hitChance};
};
var _mordrax$cotwelm$Stats$isDead = function (_p9) {
	var _p10 = _p9;
	return _elm_lang$core$Native_Utils.cmp(_p10._0.currentHP, 0) < 0;
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
	function (damage, _p11) {
		var _p12 = _p11;
		var _p13 = _p12._0;
		var hp$ = _p13.currentHP - damage;
		var msg = (_elm_lang$core$Native_Utils.cmp(hp$, 0) > 0) ? _mordrax$cotwelm$Stats$Ok : _mordrax$cotwelm$Stats$Dead;
		return {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Stats$A(
				_elm_lang$core$Native_Utils.update(
					_p13,
					{currentHP: hp$})),
			_1: msg
		};
	});

var _mordrax$cotwelm$Dice$rollD = F2(
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
var _mordrax$cotwelm$Dice$roll2D = F2(
	function (faces, seed) {
		var _p1 = A2(_mordrax$cotwelm$Dice$rollD, faces, seed);
		var a = _p1._0;
		var seed$ = _p1._1;
		var _p2 = A2(_mordrax$cotwelm$Dice$rollD, faces, seed$);
		var b = _p2._0;
		var seed$$ = _p2._1;
		return {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: a, _1: b},
			_1: seed$$
		};
	});
var _mordrax$cotwelm$Dice$roll3D = F2(
	function (faces, seed) {
		var _p3 = A2(_mordrax$cotwelm$Dice$roll2D, faces, seed);
		var a = _p3._0._0;
		var b = _p3._0._1;
		var seed$ = _p3._1;
		var _p4 = A2(_mordrax$cotwelm$Dice$rollD, faces, seed$);
		var c = _p4._0;
		var seed$$ = _p4._1;
		return {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple3', _0: a, _1: b, _2: c},
			_1: seed$$
		};
	});
var _mordrax$cotwelm$Dice$roll4D = F2(
	function (faces, seed) {
		var _p5 = A2(_mordrax$cotwelm$Dice$roll3D, faces, seed);
		var a = _p5._0._0;
		var b = _p5._0._1;
		var c = _p5._0._2;
		var seed$ = _p5._1;
		var _p6 = A2(_mordrax$cotwelm$Dice$rollD, faces, seed$);
		var d = _p6._0;
		var seed$$ = _p6._1;
		return {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple4', _0: a, _1: b, _2: c, _3: d},
			_1: seed$$
		};
	});
var _mordrax$cotwelm$Dice$roll = F2(
	function (faces, _p7) {
		var _p8 = _p7;
		var _p9 = A2(_mordrax$cotwelm$Dice$rollD, faces, _p8._1);
		var roll = _p9._0;
		var seed$ = _p9._1;
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List_ops['::'], roll, _p8._0),
			_1: seed$
		};
	});
var _mordrax$cotwelm$Dice$rollDs = F2(
	function (faces, seed) {
		return A3(
			_elm_lang$core$List$foldl,
			_mordrax$cotwelm$Dice$roll,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_List.fromArray(
					[]),
				_1: seed
			},
			faces);
	});
var _mordrax$cotwelm$Dice$d = function (faces) {
	return A2(_elm_lang$core$Random$int, 1, faces);
};
var _mordrax$cotwelm$Dice$d2d = F2(
	function (faces1, faces2) {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_mordrax$cotwelm$Dice$d(faces1),
			_mordrax$cotwelm$Dice$d(faces2));
	});

var _mordrax$cotwelm$Combat$attack = F3(
	function (attacker, defender, seed) {
		var _p0 = _mordrax$cotwelm$Stats$combatStats(attacker);
		var min = _p0._0._0;
		var max = _p0._0._1;
		var toHit = _p0._2;
		var bonus = min - 1;
		var _p1 = A2(_mordrax$cotwelm$Dice$rollD, max - bonus, seed);
		var cappedDamage = _p1._0;
		var seed$ = _p1._1;
		var damage = cappedDamage + bonus;
		var _p2 = A2(_mordrax$cotwelm$Stats$takeHit, damage, defender);
		var stats$ = _p2._0;
		var msg = _p2._1;
		return {ctor: '_Tuple3', _0: stats$, _1: seed$, _2: damage};
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

var _mordrax$cotwelm$Utils_Vector$boxIntersect = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p5 = _p2._1;
		var _p4 = _p2._0;
		var _p3 = _p0;
		var isWithinY = (_elm_lang$core$Native_Utils.cmp(_p5, _p3._0._1) > -1) && (_elm_lang$core$Native_Utils.cmp(_p5, _p3._1._1) < 1);
		var isWithinX = (_elm_lang$core$Native_Utils.cmp(_p4, _p3._0._0) > -1) && (_elm_lang$core$Native_Utils.cmp(_p4, _p3._1._0) < 1);
		return isWithinX && isWithinY;
	});
var _mordrax$cotwelm$Utils_Vector$scale = F2(
	function (magnitude, _p6) {
		var _p7 = _p6;
		return {ctor: '_Tuple2', _0: _p7._0 * magnitude, _1: _p7._1 * magnitude};
	});
var _mordrax$cotwelm$Utils_Vector$sub = F2(
	function (_p9, _p8) {
		var _p10 = _p9;
		var _p11 = _p8;
		return {ctor: '_Tuple2', _0: _p10._0 - _p11._0, _1: _p10._1 - _p11._1};
	});
var _mordrax$cotwelm$Utils_Vector$distance = F2(
	function (_p13, _p12) {
		var _p14 = _p13;
		var _p15 = _p12;
		var _p16 = A2(
			_mordrax$cotwelm$Utils_Vector$sub,
			{ctor: '_Tuple2', _0: _p14._0, _1: _p14._1},
			{ctor: '_Tuple2', _0: _p15._0, _1: _p15._1});
		var dx = _p16._0;
		var dy = _p16._1;
		return _elm_lang$core$Basics$sqrt(
			_elm_lang$core$Basics$toFloat(
				Math.pow(dx, 2) + Math.pow(dy, 2)));
	});
var _mordrax$cotwelm$Utils_Vector$add = F2(
	function (_p18, _p17) {
		var _p19 = _p18;
		var _p20 = _p17;
		return {ctor: '_Tuple2', _0: _p19._0 + _p20._0, _1: _p19._1 + _p20._1};
	});

var _mordrax$cotwelm$Dungeon_Rooms_Type$Room = F6(
	function (a, b, c, d, e, f) {
		return {doors: a, walls: b, floors: c, corners: d, roomType: e, dimension: f};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Type$DeadEnd = {ctor: 'DeadEnd'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$DiagonalSquares = {ctor: 'DiagonalSquares'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Circular = {ctor: 'Circular'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Potion = {ctor: 'Potion'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Diamond = {ctor: 'Diamond'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Cross = {ctor: 'Cross'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Rectangular = {ctor: 'Rectangular'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$NoDoor = {ctor: 'NoDoor'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Door = {ctor: 'Door'};

var _mordrax$cotwelm$Dungeon_Rooms_Config$shuffle = function (list) {
	return A2(
		_elm_lang$core$Random$map,
		_elm_lang$core$Array$toList,
		_elm_community$random_extra$Random_Array$shuffle(
			_elm_lang$core$Array$fromList(list)));
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$wallToDoor = function (wallGen) {
	return A2(
		_elm_lang$core$Random$map,
		function (pos) {
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$Door, _1: pos};
		},
		wallGen);
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$without = F2(
	function (wall, walls) {
		return A2(
			_elm_lang$core$List$filter,
			function (x) {
				return !_elm_lang$core$Native_Utils.eq(x, wall);
			},
			walls);
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$wallSampler = function (walls) {
	var _p0 = walls;
	if (_p0.ctor === '[]') {
		return _elm_community$random_extra$Random_Extra$constant(
			{ctor: '_Tuple2', _0: 0, _1: 0});
	} else {
		return A2(
			_elm_lang$core$Random$map,
			_elm_lang$core$Maybe$withDefault(_p0._0),
			_elm_community$random_extra$Random_Extra$sample(walls));
	}
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$addDoors = F2(
	function (nDoors, _p1) {
		var _p2 = _p1;
		var _p9 = _p2._0;
		var _p8 = _p2._1;
		var _p7 = _p2._2;
		var createGenerator = _elm_community$random_extra$Random_Extra$constant(
			{
				ctor: '_Tuple2',
				_0: A2(_elm_lang$core$Basics_ops['++'], _p9, _p8),
				_1: _p7
			});
		var _p3 = {ctor: '_Tuple2', _0: nDoors, _1: _p9};
		_v2_0:
		do {
			if (_p3._1.ctor === '[]') {
				if (_p3._0 === 0) {
					break _v2_0;
				} else {
					return createGenerator;
				}
			} else {
				if (_p3._0 === 0) {
					break _v2_0;
				} else {
					if (_p3._1._0.ctor === '[]') {
						return createGenerator;
					} else {
						var _p6 = _p3._1._0;
						var wallWithoutDoor = A2(_elm_lang$core$Basics$flip, _mordrax$cotwelm$Dungeon_Rooms_Config$without, _p6);
						var recurse = function (_p4) {
							var _p5 = _p4;
							return A2(
								_mordrax$cotwelm$Dungeon_Rooms_Config$addDoors,
								_p3._0 - 1,
								{
									ctor: '_Tuple3',
									_0: A2(
										_elm_lang$core$Basics_ops['++'],
										_p3._1._1,
										_elm_lang$core$Native_List.fromArray(
											[
												wallWithoutDoor(_p5._1)
											])),
									_1: _p8,
									_2: A2(_elm_lang$core$List_ops['::'], _p5, _p7)
								});
						};
						var generateWall = _mordrax$cotwelm$Dungeon_Rooms_Config$wallSampler(_p6);
						return A2(
							_elm_lang$core$Random$andThen,
							_mordrax$cotwelm$Dungeon_Rooms_Config$wallToDoor(generateWall),
							recurse);
					}
				}
			}
		} while(false);
		return createGenerator;
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomType = function (index) {
	var clampedIndex = A3(_elm_lang$core$Basics$clamp, 0, 100, index);
	return (_elm_lang$core$Native_Utils.cmp(clampedIndex, 40) < 0) ? _mordrax$cotwelm$Dungeon_Rooms_Type$Rectangular : ((_elm_lang$core$Native_Utils.cmp(clampedIndex, 50) < 0) ? _mordrax$cotwelm$Dungeon_Rooms_Type$Cross : ((_elm_lang$core$Native_Utils.cmp(clampedIndex, 60) < 0) ? _mordrax$cotwelm$Dungeon_Rooms_Type$Diamond : ((_elm_lang$core$Native_Utils.cmp(clampedIndex, 70) < 0) ? _mordrax$cotwelm$Dungeon_Rooms_Type$Potion : ((_elm_lang$core$Native_Utils.cmp(clampedIndex, 80) < 0) ? _mordrax$cotwelm$Dungeon_Rooms_Type$Circular : ((_elm_lang$core$Native_Utils.cmp(clampedIndex, 90) < 0) ? _mordrax$cotwelm$Dungeon_Rooms_Type$DiagonalSquares : _mordrax$cotwelm$Dungeon_Rooms_Type$DeadEnd)))));
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomTypeGenerator = A2(
	_elm_lang$core$Random$map,
	_mordrax$cotwelm$Dungeon_Rooms_Config$roomType,
	A2(_elm_lang$core$Random$int, 0, 100));
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomSizeGenerator = function (roomType) {
	var _p10 = roomType;
	switch (_p10.ctor) {
		case 'Rectangular':
			return A2(_elm_lang$core$Random$int, 4, 10);
		case 'Cross':
			return A2(_elm_lang$core$Random$int, 1, 4);
		case 'Diamond':
			return A2(_elm_lang$core$Random$int, 4, 10);
		case 'Potion':
			return A2(_elm_lang$core$Random$int, 4, 10);
		case 'Circular':
			return A2(_elm_lang$core$Random$int, 4, 10);
		case 'DiagonalSquares':
			return A2(_elm_lang$core$Random$int, 4, 10);
		default:
			return A2(_elm_lang$core$Random$int, 1, 1);
	}
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomSize = 10;
var _mordrax$cotwelm$Dungeon_Rooms_Config$size = 30;
var _mordrax$cotwelm$Dungeon_Rooms_Config$Model = F2(
	function (a, b) {
		return {dungeonSize: a, roomSize: b};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$init = A2(_mordrax$cotwelm$Dungeon_Rooms_Config$Model, 30, 10);
var _mordrax$cotwelm$Dungeon_Rooms_Config$A = function (a) {
	return {ctor: 'A', _0: a};
};

var _mordrax$cotwelm$Dungeon_Rooms_Cross$dot = F2(
	function (wallSize, axis) {
		return (wallSize + 1) * axis;
	});
var _mordrax$cotwelm$Dungeon_Rooms_Cross$floors = function (wallSize) {
	var axis = _mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize);
	var floorMiddles = _elm_lang$core$Native_List.range(
		axis(1) + 1,
		axis(2) - 1);
	var vertical = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		floorMiddles,
		_elm_lang$core$Native_List.range(
			axis(0) + 1,
			axis(3) - 1));
	var horizontal = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		_elm_lang$core$Native_List.range(
			axis(0) + 1,
			axis(3) - 1),
		floorMiddles);
	return _elm_lang$core$Set$toList(
		_elm_lang$core$Set$fromList(
			A2(_elm_lang$core$Basics_ops['++'], vertical, horizontal)));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$betweenDots = F3(
	function (wallSize, dot1, dot2) {
		return _elm_lang$core$Native_List.range(
			A2(_mordrax$cotwelm$Dungeon_Rooms_Cross$dot, wallSize, dot1) + 1,
			A2(_mordrax$cotwelm$Dungeon_Rooms_Cross$dot, wallSize, dot2) - 1);
	});
var _mordrax$cotwelm$Dungeon_Rooms_Cross$walls = function (wallSize) {
	var axis = _mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize);
	var topAxis = axis(0);
	var bottomAxis = axis(3);
	var between = _mordrax$cotwelm$Dungeon_Rooms_Cross$betweenDots(wallSize);
	var left = A2(between, 0, 1);
	var middle = A2(between, 1, 2);
	var horizontalTop = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		middle,
		_elm_lang$core$Native_List.fromArray(
			[topAxis]));
	var horizontalBottom = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		middle,
		_elm_lang$core$Native_List.fromArray(
			[bottomAxis]));
	var verticalTop = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		_elm_lang$core$Native_List.fromArray(
			[topAxis]),
		middle);
	var verticalBottom = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		_elm_lang$core$Native_List.fromArray(
			[bottomAxis]),
		middle);
	var right = A2(between, 2, 3);
	var horizontalMiddles = A2(
		_elm_lang$core$Basics_ops['++'],
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			left,
			_elm_lang$core$Native_List.fromArray(
				[
					axis(1),
					axis(2)
				])),
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			right,
			_elm_lang$core$Native_List.fromArray(
				[
					axis(1),
					axis(2)
				])));
	var verticalMiddles = A2(
		_elm_lang$core$Basics_ops['++'],
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_elm_lang$core$Native_List.fromArray(
				[
					axis(1),
					axis(2)
				]),
			left),
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_elm_lang$core$Native_List.fromArray(
				[
					axis(1),
					axis(2)
				]),
			right));
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Native_List.fromArray(
			[horizontalTop]),
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Native_List.fromArray(
				[horizontalBottom]),
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Native_List.fromArray(
					[verticalTop]),
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Native_List.fromArray(
						[verticalBottom]),
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Native_List.fromArray(
							[horizontalMiddles]),
						_elm_lang$core$Native_List.fromArray(
							[verticalMiddles]))))));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$dots = function (wallSize) {
	return A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize),
		_elm_lang$core$Native_List.range(0, 3));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$toRoomSize = function (wallSize) {
	return wallSize + 6;
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$corners = function (wallSize) {
	var allDots = _mordrax$cotwelm$Dungeon_Rooms_Cross$dots(wallSize);
	var grid = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		allDots,
		allDots);
	var roomSize = _mordrax$cotwelm$Dungeon_Rooms_Cross$toRoomSize(wallSize);
	var axis = _mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize);
	var corners = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		_elm_lang$core$Native_List.fromArray(
			[
				0,
				axis(3)
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				0,
				axis(3)
			]));
	var isNotCorner = function (_p0) {
		return _elm_lang$core$Basics$not(
			A3(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, corners, _p0));
	};
	return A2(_elm_lang$core$List$filter, isNotCorner, grid);
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$generateRoom = function (_p1) {
	var _p2 = _p1;
	var _p3 = _p2.wallSize;
	var roomSize = _mordrax$cotwelm$Dungeon_Rooms_Cross$toRoomSize(_p3);
	return _elm_community$random_extra$Random_Extra$constant(
		{
			doors: _p2.doors,
			walls: _elm_lang$core$List$concat(_p2.walls),
			floors: _mordrax$cotwelm$Dungeon_Rooms_Cross$floors(_p3),
			corners: _mordrax$cotwelm$Dungeon_Rooms_Cross$corners(_p3),
			roomType: _mordrax$cotwelm$Dungeon_Rooms_Type$Cross,
			dimension: {ctor: '_Tuple2', _0: roomSize, _1: roomSize}
		});
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$generateDoors = function (_p4) {
	var _p5 = _p4;
	var updateModel = function (_p6) {
		var _p7 = _p6;
		return _elm_lang$core$Native_Utils.update(
			_p5,
			{walls: _p7._0, doors: _p7._1});
	};
	var wallsDoorsGen = A2(
		_mordrax$cotwelm$Dungeon_Rooms_Config$addDoors,
		4,
		{
			ctor: '_Tuple3',
			_0: _p5.walls,
			_1: _elm_lang$core$Native_List.fromArray(
				[]),
			_2: _elm_lang$core$Native_List.fromArray(
				[])
		});
	return A2(_elm_lang$core$Random$map, updateModel, wallsDoorsGen);
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$generateWalls = function (_p8) {
	var _p9 = _p8;
	return _elm_community$random_extra$Random_Extra$constant(
		_elm_lang$core$Native_Utils.update(
			_p9,
			{
				walls: _mordrax$cotwelm$Dungeon_Rooms_Cross$walls(_p9.wallSize)
			}));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$shuffleWalls = function (model) {
	var updateModel = function (walls) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{walls: walls});
	};
	return A2(
		_elm_lang$core$Random$map,
		updateModel,
		_mordrax$cotwelm$Dungeon_Rooms_Config$shuffle(model.walls));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$Model = F3(
	function (a, b, c) {
		return {wallSize: a, walls: b, doors: c};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Cross$generateWallSize = A2(
	_elm_lang$core$Random$map,
	function (wallSize) {
		return A3(
			_mordrax$cotwelm$Dungeon_Rooms_Cross$Model,
			wallSize,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	},
	_mordrax$cotwelm$Dungeon_Rooms_Config$roomSizeGenerator(_mordrax$cotwelm$Dungeon_Rooms_Type$Cross));
var _mordrax$cotwelm$Dungeon_Rooms_Cross$generate = A2(
	_elm_lang$core$Random$andThen,
	A2(
		_elm_lang$core$Random$andThen,
		A2(
			_elm_lang$core$Random$andThen,
			A2(_elm_lang$core$Random$andThen, _mordrax$cotwelm$Dungeon_Rooms_Cross$generateWallSize, _mordrax$cotwelm$Dungeon_Rooms_Cross$generateWalls),
			_mordrax$cotwelm$Dungeon_Rooms_Cross$shuffleWalls),
		_mordrax$cotwelm$Dungeon_Rooms_Cross$generateDoors),
	_mordrax$cotwelm$Dungeon_Rooms_Cross$generateRoom);

var _mordrax$cotwelm$Dungeon_Rooms_Rectangular$addDoors = F2(
	function (nDoors, _p0) {
		addDoors:
		while (true) {
			var _p1 = _p0;
			var _p8 = _p1._0;
			var _p7 = _p1._3;
			var _p6 = _p1._1;
			var _p5 = _p1._2;
			var _p2 = {ctor: '_Tuple2', _0: nDoors, _1: _p8};
			_v1_0:
			do {
				if (_p2._1.ctor === '[]') {
					if (_p2._0 === 0) {
						break _v1_0;
					} else {
						return {
							ctor: '_Tuple3',
							_0: _elm_lang$core$List$concat(
								A2(_elm_lang$core$Basics_ops['++'], _p8, _p6)),
							_1: _p5,
							_2: _p7
						};
					}
				} else {
					if (_p2._0 === 0) {
						break _v1_0;
					} else {
						if (_p2._1._0.ctor === '[]') {
							return {
								ctor: '_Tuple3',
								_0: _elm_lang$core$List$concat(
									A2(_elm_lang$core$Basics_ops['++'], _p8, _p6)),
								_1: _p5,
								_2: _p7
							};
						} else {
							var _p4 = _p2._1._0;
							var randomDoorSampler = _mordrax$cotwelm$Dungeon_Rooms_Config$wallSampler(_p4);
							var _p3 = A2(_elm_lang$core$Random$step, randomDoorSampler, _p7);
							var door = _p3._0;
							var seed$ = _p3._1;
							var wallWithoutDoor = A2(
								_elm_lang$core$List$filter,
								function (x) {
									return !_elm_lang$core$Native_Utils.eq(x, door);
								},
								_p4);
							var _v2 = _p2._0 - 1,
								_v3 = {
								ctor: '_Tuple4',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									_p2._1._1,
									_elm_lang$core$Native_List.fromArray(
										[wallWithoutDoor])),
								_1: _p6,
								_2: A2(
									_elm_lang$core$List_ops['::'],
									{ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$Door, _1: door},
									_p5),
								_3: seed$
							};
							nDoors = _v2;
							_p0 = _v3;
							continue addDoors;
						}
					}
				}
			} while(false);
			return {
				ctor: '_Tuple3',
				_0: _elm_lang$core$List$concat(
					A2(_elm_lang$core$Basics_ops['++'], _p8, _p6)),
				_1: _p5,
				_2: _p7
			};
		}
	});
var _mordrax$cotwelm$Dungeon_Rooms_Rectangular$generate = F2(
	function (size, seed) {
		var doorGenerator = _mordrax$cotwelm$Dice$d(6);
		var _p9 = function (_p10) {
			var _p11 = _p10;
			return {
				ctor: '_Tuple2',
				_0: {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$Basics$max, 4, _p11._0._0),
					_1: A2(_elm_lang$core$Basics$max, 4, _p11._0._1)
				},
				_1: _p11._1
			};
		}(
			A2(_mordrax$cotwelm$Dice$roll2D, size, seed));
		var width = _p9._0._0;
		var height = _p9._0._1;
		var seed$ = _p9._1;
		var _p12 = {ctor: '_Tuple2', _0: width - 1, _1: height - 1};
		var xMax = _p12._0;
		var yMax = _p12._1;
		var corners = _elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: 0, _1: 0},
				{ctor: '_Tuple2', _0: xMax, _1: 0},
				{ctor: '_Tuple2', _0: 0, _1: yMax},
				{ctor: '_Tuple2', _0: xMax, _1: yMax}
			]);
		var walls = _elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$core$List$map,
				function (y) {
					return {ctor: '_Tuple2', _0: 0, _1: y};
				},
				_elm_lang$core$Native_List.range(1, yMax - 1)),
				A2(
				_elm_lang$core$List$map,
				function (y) {
					return {ctor: '_Tuple2', _0: xMax, _1: y};
				},
				_elm_lang$core$Native_List.range(1, yMax - 1)),
				A2(
				_elm_lang$core$List$map,
				function (x) {
					return {ctor: '_Tuple2', _0: x, _1: 0};
				},
				_elm_lang$core$Native_List.range(1, xMax - 1)),
				A2(
				_elm_lang$core$List$map,
				function (x) {
					return {ctor: '_Tuple2', _0: x, _1: yMax};
				},
				_elm_lang$core$Native_List.range(1, xMax - 1))
			]);
		var floors = A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_elm_lang$core$Native_List.range(1, xMax - 1),
			_elm_lang$core$Native_List.range(1, yMax - 1));
		var _p13 = A2(
			_elm_lang$core$Random$step,
			A2(
				_elm_lang$core$Random$pair,
				_mordrax$cotwelm$Dungeon_Rooms_Config$shuffle(walls),
				doorGenerator),
			seed$);
		var shuffledWalls = _p13._0._0;
		var nDoors = _p13._0._1;
		var seed$$ = _p13._1;
		var _p14 = A2(
			_mordrax$cotwelm$Dungeon_Rooms_Rectangular$addDoors,
			nDoors,
			{
				ctor: '_Tuple4',
				_0: shuffledWalls,
				_1: _elm_lang$core$Native_List.fromArray(
					[]),
				_2: _elm_lang$core$Native_List.fromArray(
					[]),
				_3: seed$$
			});
		var newWalls = _p14._0;
		var doors = _p14._1;
		var seed$$$ = _p14._2;
		return {
			ctor: '_Tuple2',
			_0: A6(
				_mordrax$cotwelm$Dungeon_Rooms_Type$Room,
				doors,
				newWalls,
				floors,
				corners,
				_mordrax$cotwelm$Dungeon_Rooms_Type$Rectangular,
				{ctor: '_Tuple2', _0: width, _1: height}),
			_1: seed$$$
		};
	});

var _mordrax$cotwelm$Dungeon_Room$diamondTemplate = _elm_lang$core$Native_List.fromArray(
	['....#....', '...#.#...', '..#...#..', '.#.....#.', '#.......#', '.#.....#.', '..#...#..', '...#.#...', '....#....']);
var _mordrax$cotwelm$Dungeon_Room$roomTypeAndSizeGenerator = function (roomType) {
	return A2(
		_elm_lang$core$Random$map,
		function (size) {
			return {ctor: '_Tuple2', _0: roomType, _1: size};
		},
		_mordrax$cotwelm$Dungeon_Rooms_Config$roomSizeGenerator(roomType));
};
var _mordrax$cotwelm$Dungeon_Room$init = {
	doors: _elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Dungeon_Rooms_Type$Door,
			_1: {ctor: '_Tuple2', _0: 0, _1: 0}
		}
		]),
	walls: _elm_lang$core$Native_List.fromArray(
		[]),
	floors: _elm_lang$core$Native_List.fromArray(
		[]),
	corners: _elm_lang$core$Native_List.fromArray(
		[
			{ctor: '_Tuple2', _0: 0, _1: 0}
		]),
	roomType: _mordrax$cotwelm$Dungeon_Rooms_Type$DeadEnd,
	dimension: {ctor: '_Tuple2', _0: 1, _1: 1}
};
var _mordrax$cotwelm$Dungeon_Room$diamond = F2(
	function (size, seed) {
		return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Room$init, _1: seed};
	});
var _mordrax$cotwelm$Dungeon_Room$potion = F2(
	function (size, seed) {
		return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Room$init, _1: seed};
	});
var _mordrax$cotwelm$Dungeon_Room$circular = F2(
	function (size, seed) {
		return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Room$init, _1: seed};
	});
var _mordrax$cotwelm$Dungeon_Room$diagonalSquares = F2(
	function (size, seed) {
		return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Room$init, _1: seed};
	});
var _mordrax$cotwelm$Dungeon_Room$generate = function (seed) {
	var gen = A2(_elm_lang$core$Random$andThen, _mordrax$cotwelm$Dungeon_Rooms_Config$roomTypeGenerator, _mordrax$cotwelm$Dungeon_Room$roomTypeAndSizeGenerator);
	var _p0 = A2(_elm_lang$core$Random$step, gen, seed);
	var roomType = _p0._0._0;
	var roomSize = _p0._0._1;
	var seed$ = _p0._1;
	var _p1 = A2(
		_elm_lang$core$Debug$log,
		'Generating...',
		{
			roomType: _elm_lang$core$Basics$toString(roomType),
			roomSize: _elm_lang$core$Basics$toString(_mordrax$cotwelm$Dungeon_Rooms_Config$size)
		});
	var _p2 = roomType;
	switch (_p2.ctor) {
		case 'Rectangular':
			return A2(_mordrax$cotwelm$Dungeon_Rooms_Rectangular$generate, _mordrax$cotwelm$Dungeon_Rooms_Config$size, seed$);
		case 'Cross':
			return A2(_elm_lang$core$Random$step, _mordrax$cotwelm$Dungeon_Rooms_Cross$generate, seed$);
		case 'Diamond':
			return A2(_mordrax$cotwelm$Dungeon_Room$diamond, _mordrax$cotwelm$Dungeon_Rooms_Config$size, seed$);
		case 'Potion':
			return A2(_mordrax$cotwelm$Dungeon_Room$potion, _mordrax$cotwelm$Dungeon_Rooms_Config$size, seed$);
		case 'Circular':
			return A2(_mordrax$cotwelm$Dungeon_Room$circular, _mordrax$cotwelm$Dungeon_Rooms_Config$size, seed$);
		case 'DiagonalSquares':
			return A2(_mordrax$cotwelm$Dungeon_Room$diagonalSquares, _mordrax$cotwelm$Dungeon_Rooms_Config$size, seed$);
		default:
			return {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Room$init, _1: seed$};
	}
};

var _mordrax$cotwelm$Utils_Lib$px = function (a) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(a),
		'px');
};
var _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html_Attributes$style(
		_elm_lang$core$Native_List.fromArray(
			[
				{
				ctor: '_Tuple2',
				_0: 'top',
				_1: _mordrax$cotwelm$Utils_Lib$px(_p1._1 * 32)
			},
				{
				ctor: '_Tuple2',
				_0: 'left',
				_1: _mordrax$cotwelm$Utils_Lib$px(_p1._0 * 32)
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
			{ctor: '_Tuple2', _0: 1, _1: 1});
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
					{ctor: '_Tuple2', _0: 1, _1: 0},
					{ctor: '_Tuple2', _0: 3, _1: 1});
			case 'Hut_EF':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 1},
					{ctor: '_Tuple2', _0: 2, _1: 2});
			case 'StrawHouse_EF':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 2, _1: 1},
					{ctor: '_Tuple2', _0: 3, _1: 3});
			case 'StrawHouse_WF':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 1},
					{ctor: '_Tuple2', _0: 3, _1: 3});
			case 'BurntStrawHouse_WF':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 1},
					{ctor: '_Tuple2', _0: 3, _1: 3});
			case 'HutTemple_NF':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 2, _1: 0},
					{ctor: '_Tuple2', _0: 5, _1: 6});
			default:
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					{ctor: '_Tuple2', _0: 1, _1: 1});
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
	position: {ctor: '_Tuple2', _0: 11, _1: 17},
	stats: A2(_mordrax$cotwelm$Stats$new, 20, 10)
};

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
var _mordrax$cotwelm$Monster_Monster$name = function (_p6) {
	var _p7 = _p6;
	var _p8 = _p7.base;
	var model = _p8._0;
	return model.name;
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
		var _p9 = monsterType;
		switch (_p9.ctor) {
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

var _mordrax$cotwelm$Tile$isSameType = F2(
	function (t1, t2) {
		var _p0 = t2.base;
		var m2 = _p0._0;
		var _p1 = t1.base;
		var m1 = _p1._0;
		return _elm_lang$core$Native_Utils.eq(m1.tile, m2.tile);
	});
var _mordrax$cotwelm$Tile$isSolid = function (_p2) {
	var _p3 = _p2;
	var _p4 = _p3.base;
	var solid = _p4._0.solid;
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
var _mordrax$cotwelm$Tile$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Tile$TreasurePile = {ctor: 'TreasurePile'};
var _mordrax$cotwelm$Tile$White90Cave10 = {ctor: 'White90Cave10'};
var _mordrax$cotwelm$Tile$White50Cave50 = {ctor: 'White50Cave50'};
var _mordrax$cotwelm$Tile$Grass10Cave90 = {ctor: 'Grass10Cave90'};
var _mordrax$cotwelm$Tile$Grass50Cave50 = {ctor: 'Grass50Cave50'};
var _mordrax$cotwelm$Tile$Pillar = {ctor: 'Pillar'};
var _mordrax$cotwelm$Tile$Cobweb = {ctor: 'Cobweb'};
var _mordrax$cotwelm$Tile$DoorBroken = {ctor: 'DoorBroken'};
var _mordrax$cotwelm$Tile$DoorOpen = {ctor: 'DoorOpen'};
var _mordrax$cotwelm$Tile$DoorClosed = {ctor: 'DoorClosed'};
var _mordrax$cotwelm$Tile$WallLitDgn = {ctor: 'WallLitDgn'};
var _mordrax$cotwelm$Tile$LitDgn = {ctor: 'LitDgn'};
var _mordrax$cotwelm$Tile$TownWall = {ctor: 'TownWall'};
var _mordrax$cotwelm$Tile$TownWallStop = {ctor: 'TownWallStop'};
var _mordrax$cotwelm$Tile$TownWallCorner = {ctor: 'TownWallCorner'};
var _mordrax$cotwelm$Tile$StairsDown = {ctor: 'StairsDown'};
var _mordrax$cotwelm$Tile$StairsUp = {ctor: 'StairsUp'};
var _mordrax$cotwelm$Tile$WaterPath = {ctor: 'WaterPath'};
var _mordrax$cotwelm$Tile$Path = {ctor: 'Path'};
var _mordrax$cotwelm$Tile$Throne = {ctor: 'Throne'};
var _mordrax$cotwelm$Tile$Status = {ctor: 'Status'};
var _mordrax$cotwelm$Tile$Altar = {ctor: 'Altar'};
var _mordrax$cotwelm$Tile$Fountain = {ctor: 'Fountain'};
var _mordrax$cotwelm$Tile$BlueSquare = {ctor: 'BlueSquare'};
var _mordrax$cotwelm$Tile$WaterGrass = {ctor: 'WaterGrass'};
var _mordrax$cotwelm$Tile$Water = {ctor: 'Water'};
var _mordrax$cotwelm$Tile$Ashes = {ctor: 'Ashes'};
var _mordrax$cotwelm$Tile$GreenWell = {ctor: 'GreenWell'};
var _mordrax$cotwelm$Tile$CastleParapet = {ctor: 'CastleParapet'};
var _mordrax$cotwelm$Tile$CastleWall = {ctor: 'CastleWall'};
var _mordrax$cotwelm$Tile$CastleCornerParapet = {ctor: 'CastleCornerParapet'};
var _mordrax$cotwelm$Tile$WallDarkDgn = {ctor: 'WallDarkDgn'};
var _mordrax$cotwelm$Tile$DarkDgn = {ctor: 'DarkDgn'};
var _mordrax$cotwelm$Tile$Wagon = {ctor: 'Wagon'};
var _mordrax$cotwelm$Tile$Well = {ctor: 'Well'};
var _mordrax$cotwelm$Tile$VegePatch = {ctor: 'VegePatch'};
var _mordrax$cotwelm$Tile$DestoyedVegePatch = {ctor: 'DestoyedVegePatch'};
var _mordrax$cotwelm$Tile$Crop = {ctor: 'Crop'};
var _mordrax$cotwelm$Tile$PathGrass = {ctor: 'PathGrass'};
var _mordrax$cotwelm$Tile$Grass = {ctor: 'Grass'};
var _mordrax$cotwelm$Tile$Favicon = {ctor: 'Favicon'};
var _mordrax$cotwelm$Tile$Sign = {ctor: 'Sign'};
var _mordrax$cotwelm$Tile$PortcullisOpen = {ctor: 'PortcullisOpen'};
var _mordrax$cotwelm$Tile$PortcullisClosed = {ctor: 'PortcullisClosed'};
var _mordrax$cotwelm$Tile$MineEntrance = {ctor: 'MineEntrance'};
var _mordrax$cotwelm$Tile$PathRock = {ctor: 'PathRock'};
var _mordrax$cotwelm$Tile$Rock = {ctor: 'Rock'};
var _mordrax$cotwelm$Tile$view = F2(
	function (_p5, neighbours) {
		var _p6 = _p5;
		var aOrb = F3(
			function (x, a, b) {
				return _elm_lang$core$Native_Utils.eq(x, a) || _elm_lang$core$Native_Utils.eq(x, b);
			});
		var getType = function (tile) {
			var _p7 = tile;
			var base = _p7.base;
			var _p8 = base;
			var model = _p8._0;
			return model.tile;
		};
		var halfTiles = _elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$PathRock, _1: _mordrax$cotwelm$Tile$Path},
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$PathGrass, _1: _mordrax$cotwelm$Tile$Path},
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WaterGrass, _1: _mordrax$cotwelm$Tile$Water},
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WaterPath, _1: _mordrax$cotwelm$Tile$Water},
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WallDarkDgn, _1: _mordrax$cotwelm$Tile$Rock},
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$WallLitDgn, _1: _mordrax$cotwelm$Tile$Rock}
			]);
		var _p9 = _p6.base;
		var model = _p9._0;
		var halfTile = A2(
			_elm_community$list_extra$List_Extra$find,
			function (x) {
				return _elm_lang$core$Native_Utils.eq(
					model.tile,
					_elm_lang$core$Basics$fst(x));
			},
			halfTiles);
		var rotation = function () {
			var _p10 = halfTile;
			if (_p10.ctor === 'Nothing') {
				return 0;
			} else {
				var _p14 = _p10._0._1;
				var checkDownRight = F2(
					function (down, right) {
						return A2(
							_elm_lang$core$List$all,
							function (x) {
								return A3(
									aOrb,
									getType(x),
									_p14,
									model.tile);
							},
							_elm_lang$core$Native_List.fromArray(
								[right, down])) ? -90 : 0;
					});
				var checkUpRight = F2(
					function (up, right) {
						return A2(
							_elm_lang$core$List$all,
							function (x) {
								return A3(
									aOrb,
									getType(x),
									_p14,
									model.tile);
							},
							_elm_lang$core$Native_List.fromArray(
								[up, right])) ? 180 : 0;
					});
				var checkUpLeft = F2(
					function (up, left) {
						return A2(
							_elm_lang$core$List$all,
							function (x) {
								return A3(
									aOrb,
									getType(x),
									_p14,
									model.tile);
							},
							_elm_lang$core$Native_List.fromArray(
								[up, left])) ? 90 : 0;
					});
				var _p11 = neighbours;
				if (((((_p11.ctor === '_Tuple4') && (_p11._0.ctor === 'Just')) && (_p11._1.ctor === 'Just')) && (_p11._2.ctor === 'Just')) && (_p11._3.ctor === 'Just')) {
					var _p13 = _p11._0._0;
					var _p12 = _p11._1._0;
					return (A2(checkUpLeft, _p13, _p11._3._0) + A2(checkUpRight, _p13, _p12)) + A2(checkDownRight, _p11._2._0, _p12);
				} else {
					return 0;
				}
			}
		}();
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html_Attributes$class(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'tile ',
						_elm_lang$core$Basics$toString(model.tile))),
					_elm_lang$html$Html_Attributes$style(
					_elm_lang$core$Native_List.fromArray(
						[
							{
							ctor: '_Tuple2',
							_0: 'transform',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								'rotate(',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(rotation),
									'deg)'))
						}
						])),
					_mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(_p6.position)
				]),
			_elm_lang$core$Native_List.fromArray(
				[]));
	});
var _mordrax$cotwelm$Tile$asciiTileMap = _elm_lang$core$Dict$fromList(
	_elm_lang$core$Native_List.fromArray(
		[
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('^'),
			_1: _mordrax$cotwelm$Tile$Rock
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr(','),
			_1: _mordrax$cotwelm$Tile$Grass
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('o'),
			_1: _mordrax$cotwelm$Tile$DarkDgn
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('~'),
			_1: _mordrax$cotwelm$Tile$Water
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('.'),
			_1: _mordrax$cotwelm$Tile$Path
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('O'),
			_1: _mordrax$cotwelm$Tile$LitDgn
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('_'),
			_1: _mordrax$cotwelm$Tile$PathRock
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr(';'),
			_1: _mordrax$cotwelm$Tile$PathGrass
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('d'),
			_1: _mordrax$cotwelm$Tile$WallDarkDgn
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('w'),
			_1: _mordrax$cotwelm$Tile$WaterGrass
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('W'),
			_1: _mordrax$cotwelm$Tile$WaterPath
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('D'),
			_1: _mordrax$cotwelm$Tile$WallLitDgn
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('g'),
			_1: _mordrax$cotwelm$Tile$Grass50Cave50
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('G'),
			_1: _mordrax$cotwelm$Tile$Grass10Cave90
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('c'),
			_1: _mordrax$cotwelm$Tile$White50Cave50
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('C'),
			_1: _mordrax$cotwelm$Tile$White90Cave10
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('='),
			_1: _mordrax$cotwelm$Tile$Crop
		},
			{
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('e'),
			_1: _mordrax$cotwelm$Tile$Well
		}
		]));
var _mordrax$cotwelm$Tile$asciiToTileType = function ($char) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_mordrax$cotwelm$Tile$Grass,
		A2(_elm_lang$core$Dict$get, $char, _mordrax$cotwelm$Tile$asciiTileMap));
};
var _mordrax$cotwelm$Tile$solidTiles = _elm_lang$core$Native_List.fromArray(
	[_mordrax$cotwelm$Tile$Rock, _mordrax$cotwelm$Tile$Grass10Cave90, _mordrax$cotwelm$Tile$White50Cave50, _mordrax$cotwelm$Tile$Crop, _mordrax$cotwelm$Tile$Well, _mordrax$cotwelm$Tile$PathRock, _mordrax$cotwelm$Tile$WallDarkDgn, _mordrax$cotwelm$Tile$WallLitDgn]);
var _mordrax$cotwelm$Tile$toTile = F2(
	function (_p15, tileType) {
		var _p16 = _p15;
		var solid = A2(_elm_lang$core$List$member, tileType, _mordrax$cotwelm$Tile$solidTiles);
		return A2(
			_mordrax$cotwelm$Tile$Tile,
			_mordrax$cotwelm$Tile$A(
				A4(
					_mordrax$cotwelm$Tile$Model,
					tileType,
					solid,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_mordrax$cotwelm$Tile$Empty)),
			{ctor: '_Tuple2', _0: _p16._0, _1: _p16._1});
	});
var _mordrax$cotwelm$Tile$mapToTiles = function (asciiMap) {
	var rowToTiles = F2(
		function (y, asciiRow) {
			return A2(
				_elm_lang$core$List$indexedMap,
				F2(
					function (x, $char) {
						return A2(
							_mordrax$cotwelm$Tile$toTile,
							{ctor: '_Tuple2', _0: x, _1: y},
							_mordrax$cotwelm$Tile$asciiToTileType($char));
					}),
				_elm_lang$core$String$toList(asciiRow));
		});
	var tiles = A2(_elm_lang$core$List$indexedMap, rowToTiles, asciiMap);
	return _elm_lang$core$List$concat(tiles);
};

var _mordrax$cotwelm$Dungeon_DungeonGenerator$neighbours = F2(
	function (map, position) {
		var isOutOfBounds = function (_p0) {
			var _p1 = _p0;
			var _p3 = _p1._1;
			var _p2 = _p1._0;
			return ((_elm_lang$core$Native_Utils.cmp(_p2, _mordrax$cotwelm$Dungeon_Rooms_Config$roomSize) > 0) || (_elm_lang$core$Native_Utils.cmp(_p3, _mordrax$cotwelm$Dungeon_Rooms_Config$roomSize) > 0)) ? true : (((_elm_lang$core$Native_Utils.cmp(_p2, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(_p3, 0) < 0)) ? true : false);
		};
		var isObstructed = function (_p4) {
			var _p5 = _p4;
			var _p7 = _p5;
			if (isOutOfBounds(_p7)) {
				return true;
			} else {
				var _p6 = A2(_elm_lang$core$Dict$get, _p7, map);
				if (_p6.ctor === 'Just') {
					return _mordrax$cotwelm$Tile$isSolid(_p6._0);
				} else {
					return false;
				}
			}
		};
		var add = F2(
			function (x, y) {
				return A2(
					_mordrax$cotwelm$Utils_Vector$add,
					position,
					{ctor: '_Tuple2', _0: x, _1: y});
			});
		var possibleNeighbours = function (vector) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Native_List.fromArray(
					[
						A2(add, -1, -1),
						A2(add, 0, -1),
						A2(add, 1, -1)
					]),
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Native_List.fromArray(
						[
							A2(add, -1, 0),
							A2(add, 1, 0)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(add, -1, 1),
							A2(add, 0, 1),
							A2(add, 1, 1)
						])));
		};
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$filter,
				function (x) {
					return _elm_lang$core$Basics$not(
						isObstructed(x));
				},
				possibleNeighbours(position)));
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$heuristic = F2(
	function (start, end) {
		var _p8 = A2(_mordrax$cotwelm$Utils_Vector$sub, start, end);
		var dx = _p8._0;
		var dy = _p8._1;
		return _elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics$max, dx, dy));
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$connectRooms = F3(
	function (_p10, _p9, map) {
		var _p11 = _p10;
		var _p12 = _p9;
		var _p13 = {ctor: '_Tuple2', _0: _p11._0.doors, _1: _p12._0.doors};
		if (_p13._0.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			if (_p13._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A4(
					_krisajenkins$elm_astar$AStar$findPath,
					_mordrax$cotwelm$Dungeon_DungeonGenerator$heuristic,
					_mordrax$cotwelm$Dungeon_DungeonGenerator$neighbours(map),
					A2(_mordrax$cotwelm$Utils_Vector$add, _p13._0._0._1, _p11._1),
					A2(_mordrax$cotwelm$Utils_Vector$add, _p13._1._0._1, _p12._1));
			}
		}
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$entranceToTileType = function (entrance) {
	var _p14 = entrance;
	if (_p14.ctor === 'Door') {
		return _mordrax$cotwelm$Tile$DoorClosed;
	} else {
		return _mordrax$cotwelm$Tile$DarkDgn;
	}
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$overlapsRooms = F3(
	function (newRoom, pos, rooms) {
		overlapsRooms:
		while (true) {
			var _p15 = rooms;
			if (_p15.ctor === '[]') {
				return false;
			} else {
				var _p16 = _p15._0;
				var roomBox = {
					ctor: '_Tuple2',
					_0: _p16.position,
					_1: A2(_mordrax$cotwelm$Utils_Vector$add, _p16.position, _p16.room.dimension)
				};
				if (A2(
					_elm_lang$core$List$any,
					function (x) {
						return A2(
							_mordrax$cotwelm$Utils_Vector$boxIntersect,
							A2(_mordrax$cotwelm$Utils_Vector$add, x, pos),
							roomBox);
					},
					newRoom.corners)) {
					return true;
				} else {
					var _v8 = newRoom,
						_v9 = pos,
						_v10 = _p15._1;
					newRoom = _v8;
					pos = _v9;
					rooms = _v10;
					continue overlapsRooms;
				}
			}
		}
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$roomToTiles = F2(
	function (room, startPos) {
		var items = _elm_lang$core$Native_List.fromArray(
			[
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$DarkDgn, _1: room.floors},
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Rock, _1: room.walls},
				{ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$Rock, _1: room.corners}
			]);
		var toWorldPos = function (localPos) {
			return A2(_mordrax$cotwelm$Utils_Vector$add, startPos, localPos);
		};
		var makeTiles = function (_p17) {
			var _p18 = _p17;
			return A2(
				_elm_lang$core$List$map,
				function (pos) {
					return A2(_mordrax$cotwelm$Tile$toTile, pos, _p18._0);
				},
				A2(_elm_lang$core$List$map, toWorldPos, _p18._1));
		};
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$List$concat(
				A2(_elm_lang$core$List$map, makeTiles, items)),
			A2(
				_elm_lang$core$List$map,
				function (_p19) {
					var _p20 = _p19;
					return A2(
						_mordrax$cotwelm$Tile$toTile,
						toWorldPos(_p20._1),
						_mordrax$cotwelm$Dungeon_DungeonGenerator$entranceToTileType(_p20._0));
				},
				room.doors));
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$fillWithWall = function (partialMap) {
	var addWallIfTileDoesNotExist = F2(
		function (x, y) {
			var _p21 = A2(
				_elm_lang$core$Dict$get,
				{ctor: '_Tuple2', _0: x, _1: y},
				partialMap);
			if (_p21.ctor === 'Nothing') {
				return A2(
					_mordrax$cotwelm$Tile$toTile,
					{ctor: '_Tuple2', _0: x, _1: y},
					_mordrax$cotwelm$Tile$Rock);
			} else {
				return _p21._0;
			}
		});
	return A3(
		_elm_community$list_extra$List_Extra$lift2,
		addWallIfTileDoesNotExist,
		_elm_lang$core$Native_List.range(0, _mordrax$cotwelm$Dungeon_Rooms_Config$size),
		_elm_lang$core$Native_List.range(0, _mordrax$cotwelm$Dungeon_Rooms_Config$size));
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$Model = {};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$DungeonRoom = F2(
	function (a, b) {
		return {position: a, room: b};
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$generateRooms = F2(
	function (nRooms, _p22) {
		generateRooms:
		while (true) {
			var _p23 = _p22;
			var _p30 = _p23._2;
			var _p29 = _p23._1;
			var _p28 = _p23._0;
			var _p24 = {ctor: '_Tuple2', _0: nRooms, _1: _p28};
			if (_p24._0 === 0) {
				return {ctor: '_Tuple2', _0: _p29, _1: _p30};
			} else {
				if (_p24._1 === 0) {
					return {ctor: '_Tuple2', _0: _p29, _1: _p30};
				} else {
					var _p27 = _p24._0;
					var _p25 = _mordrax$cotwelm$Dungeon_Room$generate(_p30);
					var room = _p25._0;
					var seed$ = _p25._1;
					var _p26 = A2(_mordrax$cotwelm$Dice$roll2D, 30, seed$);
					var pos = _p26._0;
					var seed$$ = _p26._1;
					if (A3(_mordrax$cotwelm$Dungeon_DungeonGenerator$overlapsRooms, room, pos, _p29)) {
						var _v16 = _p27,
							_v17 = {ctor: '_Tuple3', _0: _p28 - 1, _1: _p29, _2: seed$$};
						nRooms = _v16;
						_p22 = _v17;
						continue generateRooms;
					} else {
						var _v18 = _p27 - 1,
							_v19 = {
							ctor: '_Tuple3',
							_0: _p28 - 1,
							_1: A2(
								_elm_lang$core$List_ops['::'],
								A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$DungeonRoom, pos, room),
								_p29),
							_2: seed$$
						};
						nRooms = _v18;
						_p22 = _v19;
						continue generateRooms;
					}
				}
			}
		}
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$generate = function (seed) {
	var defaultPosition = function (x) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: 0, _1: 0},
			x);
	};
	var _p31 = A2(
		_mordrax$cotwelm$Dungeon_DungeonGenerator$generateRooms,
		3,
		{
			ctor: '_Tuple3',
			_0: 30,
			_1: _elm_lang$core$Native_List.fromArray(
				[]),
			_2: seed
		});
	var dungeonRooms = _p31._0;
	var seed$ = _p31._1;
	var tiles = _elm_lang$core$List$concat(
		A2(
			_elm_lang$core$List$map,
			function (x) {
				return A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$roomToTiles, x.room, x.position);
			},
			dungeonRooms));
	var toKVPair = function (tile) {
		return {ctor: '_Tuple2', _0: tile.position, _1: tile};
	};
	var map = _elm_lang$core$Dict$fromList(
		A2(_elm_lang$core$List$map, toKVPair, tiles));
	var roomSize = _elm_lang$core$Native_List.range(0, _mordrax$cotwelm$Dungeon_Rooms_Config$size);
	return {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Dict$fromList(
			A2(_elm_lang$core$List$map, toKVPair, tiles)),
		_1: seed$
	};
};

var _mordrax$cotwelm$GameData_ASCIIMaps$dungeonLevelOneMap = _elm_lang$core$Native_List.fromArray(
	['^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^dooo^^ood^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^doooooddooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^doddoooooooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^dod^^oooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^od^^^oooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^o^^^^dooo^ooo^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^o^^^^^dod^dod^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^dood^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^ooood^^^^^o^^^^^^^^^^doood^^^', '^^^^^^^^^^^^oooooo^^^^o^^^^^^^^^^ooooo^^^', '^^^^^^^^^^^^dooooo^^^^o^^^^^^^^^^ooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^^^^^^dooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^^dooooooooo^^^', '^^^^^^^^^^^^^o^^^^^^^^o^^^^dod^^^doooo^^^', '^^^^^^^^^^^^^od^^^^^^^od^^dod^^^^^^^oo^^^', '^^^^^^^^^^^^^dod^^^^^^doddod^^^^^^^ood^^^', '^^^^^^^^^^^^^^dod^^^^^^dood^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^do^^^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^od^^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^dod^^^^^o^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^dod^^^do^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^dod^^od^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^doddo^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^dood^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^']);
var _mordrax$cotwelm$GameData_ASCIIMaps$farmMap = _elm_lang$core$Native_List.fromArray(
	['^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^#^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^^^.,,,^^^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^^^^^^,,.,,,,,^^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^^,,,,,,,.,,,,,,^^^^^^^^^^^^^^^^^^', '^^^^^^^^^^^^^^^^,,,,,,,,.,,,,,,,,,^^^^^^^^^^^^^^^', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,', '.................................................', '.................................................', ',,,,,,,,,,,,,,,,,,,,,,,..;,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,', ',,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,###,,=', ',,,,,,,,,,,,,,,,;..........................###,,=', ',,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,###,,=', ',,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=', ',,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=======', ',,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======', '========,,,.,,,,,=======,,,,,,,,,,,,,,,,,,=======', '========,,###,,,,=======,,,,,,,,,,,,,,,,,,,,,,,,,']);
var _mordrax$cotwelm$GameData_ASCIIMaps$villageMap = _elm_lang$core$Native_List.fromArray(
	['========,,###,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '========,,,.,,,,========', '===,,,,,;...,,,!###=====', '===###!;.;,.,,;.###=====', '===###..;,,.,;.;###=====', '===###,,,,,...;,,,,,,===', '===,,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,!###,,,,===', '====,,,##.....###,,,,===', '====,,,##!,.,,###,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,,,,,,.,,,,,,,,,===', '====,,###!...!###,======', '====,,###..e..###,======', '====,,###,...,###,======', '====,,,,,,,.,,,,,,======', '====,,,,,,,.!,,,,,======', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '======,,,#####,=========', '========================']);

var _mordrax$cotwelm$Game_Maps$tileNeighbours = F2(
	function (map, _p0) {
		var _p1 = _p0;
		var getTile = A2(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, map);
		var addTilePosition = _mordrax$cotwelm$Utils_Vector$add(_p1.position);
		var getNeighbour = function (_p2) {
			return getTile(
				addTilePosition(_p2));
		};
		return {
			ctor: '_Tuple4',
			_0: getNeighbour(
				{ctor: '_Tuple2', _0: 0, _1: -1}),
			_1: getNeighbour(
				{ctor: '_Tuple2', _0: 1, _1: 0}),
			_2: getNeighbour(
				{ctor: '_Tuple2', _0: 0, _1: 1}),
			_3: getNeighbour(
				{ctor: '_Tuple2', _0: -1, _1: 0})
		};
	});
var _mordrax$cotwelm$Game_Maps$dungeonLevelOneBuildings = function () {
	var mineEntrance = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$Farm,
		{ctor: '_Tuple2', _0: 24, _1: 2});
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$MineEntrance,
			{ctor: '_Tuple2', _0: 22, _1: 40},
			'Mine Exit',
			mineEntrance)
		]);
}();
var _mordrax$cotwelm$Game_Maps$farmBuildings = function () {
	var mineExit = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$DungeonLevelOne,
		{ctor: '_Tuple2', _0: 22, _1: 39});
	var villageGate = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$Village,
		{ctor: '_Tuple2', _0: 11, _1: 1});
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$Gate_NS,
			{ctor: '_Tuple2', _0: 10, _1: 32},
			'Farm Gate',
			villageGate),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			{ctor: '_Tuple2', _0: 43, _1: 23},
			'Adopted Parents House',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$MineEntrance,
			{ctor: '_Tuple2', _0: 24, _1: 1},
			'Mine Entrance',
			mineExit)
		]);
}();
var _mordrax$cotwelm$Game_Maps$villageBuildings = function () {
	var farmGate = A2(
		_mordrax$cotwelm$GameData_Building$newLink,
		_mordrax$cotwelm$GameData_Types$Farm,
		{ctor: '_Tuple2', _0: 11, _1: 31});
	return _elm_lang$core$Native_List.fromArray(
		[
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$Gate_NS,
			{ctor: '_Tuple2', _0: 10, _1: 0},
			'Village Gate',
			farmGate),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_EF,
			{ctor: '_Tuple2', _0: 3, _1: 6},
			'Junk Shop',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			{ctor: '_Tuple2', _0: 16, _1: 5},
			'Private House',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$Hut_EF,
			{ctor: '_Tuple2', _0: 7, _1: 13},
			'Potion Store',
			_mordrax$cotwelm$GameData_Building$ShopType(_mordrax$cotwelm$GameData_Building$PotionStore)),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			{ctor: '_Tuple2', _0: 14, _1: 12},
			'Private House 2',
			_mordrax$cotwelm$GameData_Building$Ordinary),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_EF,
			{ctor: '_Tuple2', _0: 6, _1: 17},
			'Weapon Shop',
			_mordrax$cotwelm$GameData_Building$ShopType(_mordrax$cotwelm$GameData_Building$WeaponSmith)),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$StrawHouse_WF,
			{ctor: '_Tuple2', _0: 14, _1: 17},
			'General Store',
			_mordrax$cotwelm$GameData_Building$ShopType(_mordrax$cotwelm$GameData_Building$GeneralStore)),
			A4(
			_mordrax$cotwelm$GameData_Building$new,
			_mordrax$cotwelm$GameData_Building$HutTemple_NF,
			{ctor: '_Tuple2', _0: 9, _1: 22},
			'Odin\'s Temple',
			_mordrax$cotwelm$GameData_Building$Ordinary)
		]);
}();
var _mordrax$cotwelm$Game_Maps$getASCIIMap = function (area) {
	var _p3 = area;
	switch (_p3.ctor) {
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
var _mordrax$cotwelm$Game_Maps$getBuildings = function (_p4) {
	var _p5 = _p4;
	var _p7 = _p5._0;
	var maybeBuildings = A2(
		_elm_lang$core$Dict$get,
		_elm_lang$core$Basics$toString(_p7.currentArea),
		_p7.buildings);
	var _p6 = maybeBuildings;
	if (_p6.ctor === 'Just') {
		return _p6._0;
	} else {
		return _elm_lang$core$Native_List.fromArray(
			[]);
	}
};
var _mordrax$cotwelm$Game_Maps$currentAreaMap = function (_p8) {
	var _p9 = _p8;
	var _p11 = _p9._0;
	var maybeMap = A2(
		_elm_lang$core$Dict$get,
		_elm_lang$core$Basics$toString(_p11.currentArea),
		_p11.maps);
	var _p10 = maybeMap;
	if (_p10.ctor === 'Just') {
		return _p10._0;
	} else {
		return _elm_lang$core$Dict$empty;
	}
};
var _mordrax$cotwelm$Game_Maps$toTiles = function (_p12) {
	return A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Basics$snd,
		_elm_lang$core$Dict$toList(_p12));
};
var _mordrax$cotwelm$Game_Maps$draw = function (map) {
	var mapTiles = _mordrax$cotwelm$Game_Maps$toTiles(map);
	var neighbours = _mordrax$cotwelm$Game_Maps$tileNeighbours(map);
	var toHtml = function (tile) {
		return A2(
			_mordrax$cotwelm$Tile$view,
			tile,
			neighbours(tile));
	};
	return A2(_elm_lang$core$List$map, toHtml, mapTiles);
};
var _mordrax$cotwelm$Game_Maps$toMap = function (tiles) {
	return _elm_lang$core$Dict$fromList(
		A2(
			_elm_lang$core$List$map,
			function (_p13) {
				var _p14 = _p13;
				return {ctor: '_Tuple2', _0: _p14.position, _1: _p14};
			},
			tiles));
};
var _mordrax$cotwelm$Game_Maps$view = function (maps) {
	var buildingsHtml = A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$GameData_Building$view,
		_mordrax$cotwelm$Game_Maps$getBuildings(maps));
	var map = _mordrax$cotwelm$Game_Maps$currentAreaMap(maps);
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(
			_elm_lang$core$Basics_ops['++'],
			_mordrax$cotwelm$Game_Maps$draw(map),
			buildingsHtml));
};
var _mordrax$cotwelm$Game_Maps$Model = F3(
	function (a, b, c) {
		return {currentArea: a, maps: b, buildings: c};
	});
var _mordrax$cotwelm$Game_Maps$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Game_Maps$init = function (seed) {
	var _p15 = _mordrax$cotwelm$Dungeon_DungeonGenerator$generate(seed);
	var level = _p15._0;
	var seed$ = _p15._1;
	var toKVPair = function (tile) {
		return {ctor: '_Tuple2', _0: tile.position, _1: tile};
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
	return {
		ctor: '_Tuple3',
		_0: _mordrax$cotwelm$Game_Maps$A(
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
						},
							{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Basics$toString(
								_mordrax$cotwelm$GameData_Types$DungeonLevel(2)),
							_1: level
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
			}),
		_1: _elm_lang$core$Platform_Cmd$none,
		_2: seed$
	};
};
var _mordrax$cotwelm$Game_Maps$update = F2(
	function (msg, _p16) {
		var _p17 = _p16;
		var _p18 = A2(_elm_lang$core$Debug$log, 'maps update', 1);
		return _mordrax$cotwelm$Game_Maps$A(
			_elm_lang$core$Native_Utils.update(
				_p17._0,
				{currentArea: _mordrax$cotwelm$GameData_Types$Village}));
	});
var _mordrax$cotwelm$Game_Maps$updateArea = F2(
	function (area, _p19) {
		var _p20 = _p19;
		return _mordrax$cotwelm$Game_Maps$A(
			_elm_lang$core$Native_Utils.update(
				_p20._0,
				{currentArea: area}));
	});
var _mordrax$cotwelm$Game_Maps$GenerateDungeonLevel = function (a) {
	return {ctor: 'GenerateDungeonLevel', _0: a};
};

var _mordrax$cotwelm$Dungeon_Editor$init = {map: _elm_lang$core$Dict$empty, mdl: _debois$elm_mdl$Material$model};
var _mordrax$cotwelm$Dungeon_Editor$Model = F2(
	function (a, b) {
		return {map: a, mdl: b};
	});
var _mordrax$cotwelm$Dungeon_Editor$Mdl = function (a) {
	return {ctor: 'Mdl', _0: a};
};
var _mordrax$cotwelm$Dungeon_Editor$GenerateRoom = function (a) {
	return {ctor: 'GenerateRoom', _0: a};
};
var _mordrax$cotwelm$Dungeon_Editor$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'GenerateMap':
				return {
					ctor: '_Tuple2',
					_0: model,
					_1: A2(_elm_lang$core$Random$generate, _mordrax$cotwelm$Dungeon_Editor$GenerateRoom, _mordrax$cotwelm$Dungeon_Rooms_Cross$generate)
				};
			case 'GenerateRoom':
				var tiles = A2(
					_mordrax$cotwelm$Dungeon_DungeonGenerator$roomToTiles,
					_p0._0,
					{ctor: '_Tuple2', _0: 10, _1: 0});
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							map: _mordrax$cotwelm$Game_Maps$toMap(tiles)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return A2(_debois$elm_mdl$Material$update, _p0._0, model);
		}
	});
var _mordrax$cotwelm$Dungeon_Editor$GenerateMap = {ctor: 'GenerateMap'};
var _mordrax$cotwelm$Dungeon_Editor$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_debois$elm_mdl$Material_Scheme$top(
				A2(
					_elm_lang$html$Html$div,
					_elm_lang$core$Native_List.fromArray(
						[]),
					_elm_lang$core$Native_List.fromArray(
						[
							A5(
							_debois$elm_mdl$Material_Button$render,
							_mordrax$cotwelm$Dungeon_Editor$Mdl,
							_elm_lang$core$Native_List.fromArray(
								[0]),
							model.mdl,
							_elm_lang$core$Native_List.fromArray(
								[
									_debois$elm_mdl$Material_Button$colored,
									_debois$elm_mdl$Material_Button$ripple,
									_debois$elm_mdl$Material_Button$onClick(_mordrax$cotwelm$Dungeon_Editor$GenerateMap)
								]),
							_elm_lang$core$Native_List.fromArray(
								[
									_elm_lang$html$Html$text('Generate Dungeon')
								]))
						]))),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_mordrax$cotwelm$Game_Maps$draw(model.map))
			]));
};

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
											return function (l) {
												return {name: a, hero: b, maps: c, currentScreen: d, dnd: e, equipment: f, shop: g, idGen: h, monsters: i, seed: j, windowSize: k, messages: l};
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
			return {ctor: '_Tuple2', _0: 0, _1: -1};
		case 'Down':
			return {ctor: '_Tuple2', _0: 0, _1: 1};
		case 'Left':
			return {ctor: '_Tuple2', _0: -1, _1: 0};
		case 'Right':
			return {ctor: '_Tuple2', _0: 1, _1: 0};
		case 'UpLeft':
			return {ctor: '_Tuple2', _0: -1, _1: -1};
		case 'UpRight':
			return {ctor: '_Tuple2', _0: 1, _1: -1};
		case 'DownLeft':
			return {ctor: '_Tuple2', _0: -1, _1: 1};
		default:
			return {ctor: '_Tuple2', _0: 1, _1: 1};
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
var _mordrax$cotwelm$Game_Keyboard$KeyDir = function (a) {
	return {ctor: 'KeyDir', _0: a};
};
var _mordrax$cotwelm$Game_Keyboard$DownRight = {ctor: 'DownRight'};
var _mordrax$cotwelm$Game_Keyboard$DownLeft = {ctor: 'DownLeft'};
var _mordrax$cotwelm$Game_Keyboard$UpRight = {ctor: 'UpRight'};
var _mordrax$cotwelm$Game_Keyboard$UpLeft = {ctor: 'UpLeft'};
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
		},
			{
			ctor: '_Tuple2',
			_0: 38,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Up)
		},
			{
			ctor: '_Tuple2',
			_0: 40,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Down)
		},
			{
			ctor: '_Tuple2',
			_0: 37,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Left)
		},
			{
			ctor: '_Tuple2',
			_0: 39,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$Right)
		},
			{
			ctor: '_Tuple2',
			_0: 36,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$UpLeft)
		},
			{
			ctor: '_Tuple2',
			_0: 33,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$UpRight)
		},
			{
			ctor: '_Tuple2',
			_0: 35,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$DownLeft)
		},
			{
			ctor: '_Tuple2',
			_0: 34,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Game_Keyboard$DownRight)
		},
			{ctor: '_Tuple2', _0: 27, _1: _mordrax$cotwelm$Game_Keyboard$Map},
			{ctor: '_Tuple2', _0: 73, _1: _mordrax$cotwelm$Game_Keyboard$Inventory}
		]));
var _mordrax$cotwelm$Game_Keyboard$subscriptions = _elm_lang$core$Native_List.fromArray(
	[
		_elm_lang$keyboard$Keyboard$downs(
		_mordrax$cotwelm$Game_Keyboard$keycodeToMsg(_mordrax$cotwelm$Game_Keyboard$playerKeymap))
	]);

var _mordrax$cotwelm$Game_Collision$isMonsterObstruction = F2(
	function (monster, monsters) {
		return A2(
			_elm_lang$core$List$any,
			function (x) {
				return _elm_lang$core$Native_Utils.eq(x, monster.position);
			},
			A2(
				_elm_lang$core$List$map,
				function (_) {
					return _.position;
				},
				monsters));
	});
var _mordrax$cotwelm$Game_Collision$heuristic = F2(
	function (start, end) {
		var _p0 = A2(_mordrax$cotwelm$Utils_Vector$sub, start, end);
		var dx = _p0._0;
		var dy = _p0._1;
		return _elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics$max, dx, dy));
	});
var _mordrax$cotwelm$Game_Collision$newHitMessage = F3(
	function (attacker, defender, damage) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			attacker,
			A2(
				_elm_lang$core$Basics_ops['++'],
				' hit the ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					defender,
					A2(
						_elm_lang$core$Basics_ops['++'],
						' for ',
						A2(_elm_lang$core$Basics_ops['++'], damage, ' damage!')))));
	});
var _mordrax$cotwelm$Game_Collision$defend = F2(
	function (monster, _p1) {
		var _p2 = _p1;
		var _p5 = _p2;
		var _p4 = _p2.hero;
		var _p3 = A3(_mordrax$cotwelm$Combat$attack, monster.stats, _p4.stats, _p2.seed);
		var heroStats$ = _p3._0;
		var seed$ = _p3._1;
		var damage = _p3._2;
		var hero$ = _elm_lang$core$Native_Utils.update(
			_p4,
			{stats: heroStats$});
		var newMsg = A3(
			_mordrax$cotwelm$Game_Collision$newHitMessage,
			_mordrax$cotwelm$Monster_Monster$name(monster),
			'you',
			_elm_lang$core$Basics$toString(damage));
		return _elm_lang$core$Native_Utils.update(
			_p5,
			{
				hero: hero$,
				seed: seed$,
				messages: A2(_elm_lang$core$List_ops['::'], newMsg, _p5.messages)
			});
	});
var _mordrax$cotwelm$Game_Collision$attack = F2(
	function (monster, _p6) {
		var _p7 = _p6;
		var _p9 = _p7;
		var monstersWithoutMonster = A2(
			_elm_lang$core$List$filter,
			function (x) {
				return _elm_lang$core$Basics$not(
					A2(_mordrax$cotwelm$Utils_IdGenerator$equals, monster.id, x.id));
			},
			_p7.monsters);
		var _p8 = A3(_mordrax$cotwelm$Combat$attack, _p7.hero.stats, monster.stats, _p7.seed);
		var stats$ = _p8._0;
		var seed$ = _p8._1;
		var damage = _p8._2;
		var monster$ = _elm_lang$core$Native_Utils.update(
			monster,
			{stats: stats$});
		var monsters$ = _mordrax$cotwelm$Stats$isDead(monster$.stats) ? monstersWithoutMonster : A2(_elm_lang$core$List_ops['::'], monster$, monstersWithoutMonster);
		var newMsg = A3(
			_mordrax$cotwelm$Game_Collision$newHitMessage,
			'You',
			_mordrax$cotwelm$Monster_Monster$name(monster),
			_elm_lang$core$Basics$toString(damage));
		return _elm_lang$core$Native_Utils.update(
			_p9,
			{
				monsters: monsters$,
				messages: A2(_elm_lang$core$List_ops['::'], newMsg, _p9.messages)
			});
	});
var _mordrax$cotwelm$Game_Collision$buildingAtPosition = F2(
	function (pos, buildings) {
		var buildingsAtTile = A2(
			_elm_lang$core$List$filter,
			_mordrax$cotwelm$GameData_Building$isBuildingAtPosition(pos),
			buildings);
		var _p10 = buildingsAtTile;
		if (_p10.ctor === '::') {
			return _elm_lang$core$Maybe$Just(_p10._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _mordrax$cotwelm$Game_Collision$queryPosition = F2(
	function (pos, _p11) {
		var _p12 = _p11;
		var _p14 = _p12.maps;
		var isHero = _elm_lang$core$Native_Utils.eq(_p12.hero.position, pos);
		var maybeMonster = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				function (x) {
					return _elm_lang$core$Native_Utils.eq(pos, x.position);
				},
				_p12.monsters));
		var maybeBuilding = A2(
			_mordrax$cotwelm$Game_Collision$buildingAtPosition,
			pos,
			_mordrax$cotwelm$Game_Maps$getBuildings(_p14));
		var maybeTile = A2(
			_elm_lang$core$Dict$get,
			pos,
			_mordrax$cotwelm$Game_Maps$currentAreaMap(_p14));
		var tileObstruction = function () {
			var _p13 = maybeTile;
			if (_p13.ctor === 'Just') {
				return _mordrax$cotwelm$Tile$isSolid(_p13._0);
			} else {
				return true;
			}
		}();
		return {ctor: '_Tuple4', _0: tileObstruction, _1: maybeBuilding, _2: maybeMonster, _3: isHero};
	});
var _mordrax$cotwelm$Game_Collision$isObstructed = F2(
	function (position, model) {
		var _p15 = A2(_mordrax$cotwelm$Game_Collision$queryPosition, position, model);
		_v5_2:
		do {
			if (_p15.ctor === '_Tuple4') {
				if (_p15._3 === true) {
					return false;
				} else {
					if (((_p15._0 === false) && (_p15._1.ctor === 'Nothing')) && (_p15._2.ctor === 'Nothing')) {
						return false;
					} else {
						break _v5_2;
					}
				}
			} else {
				break _v5_2;
			}
		} while(false);
		return true;
	});
var _mordrax$cotwelm$Game_Collision$neighbours = F2(
	function (model, position) {
		var notObstructed = function (vector) {
			return _elm_lang$core$Basics$not(
				A2(_mordrax$cotwelm$Game_Collision$isObstructed, vector, model));
		};
		var add = F2(
			function (x, y) {
				return A2(
					_mordrax$cotwelm$Utils_Vector$add,
					position,
					{ctor: '_Tuple2', _0: x, _1: y});
			});
		var possibleNeighbours = function (vector) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Native_List.fromArray(
					[
						A2(add, -1, -1),
						A2(add, 0, -1),
						A2(add, 1, -1)
					]),
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Native_List.fromArray(
						[
							A2(add, -1, 0),
							A2(add, 1, 0)
						]),
					_elm_lang$core$Native_List.fromArray(
						[
							A2(add, -1, 1),
							A2(add, 0, 1),
							A2(add, 1, 1)
						])));
		};
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$filter,
				notObstructed,
				possibleNeighbours(position)));
	});
var _mordrax$cotwelm$Game_Collision$pathMonster = F3(
	function (monster, hero, model) {
		var path = A4(
			_krisajenkins$elm_astar$AStar$findPath,
			_mordrax$cotwelm$Game_Collision$heuristic,
			_mordrax$cotwelm$Game_Collision$neighbours(model),
			monster.position,
			hero.position);
		var _p16 = path;
		if (_p16.ctor === 'Nothing') {
			return monster;
		} else {
			if (_p16._0.ctor === '[]') {
				return monster;
			} else {
				return _elm_lang$core$Native_Utils.update(
					monster,
					{
						position: {ctor: '_Tuple2', _0: _p16._0._0._0, _1: _p16._0._0._1}
					});
			}
		}
	});
var _mordrax$cotwelm$Game_Collision$moveMonsters = F3(
	function (monsters, movedMonsters, _p17) {
		moveMonsters:
		while (true) {
			var _p18 = _p17;
			var _p23 = _p18;
			var _p19 = monsters;
			if (_p19.ctor === '[]') {
				return _elm_lang$core$Native_Utils.update(
					_p23,
					{monsters: movedMonsters});
			} else {
				var _p22 = _p19._1;
				var _p21 = _p19._0;
				var movedMonster = A3(_mordrax$cotwelm$Game_Collision$pathMonster, _p21, _p18.hero, _p23);
				var obstructions = A2(_mordrax$cotwelm$Game_Collision$queryPosition, movedMonster.position, _p23);
				var isObstructedByMovedMonsters = A2(_mordrax$cotwelm$Game_Collision$isMonsterObstruction, movedMonster, movedMonsters);
				var _p20 = obstructions;
				_v9_4:
				do {
					if (_p20.ctor === '_Tuple4') {
						if (_p20._3 === true) {
							var model$ = A2(_mordrax$cotwelm$Game_Collision$defend, _p21, _p23);
							var _v10 = _p22,
								_v11 = A2(_elm_lang$core$List_ops['::'], _p21, movedMonsters),
								_v12 = model$;
							monsters = _v10;
							movedMonsters = _v11;
							_p17 = _v12;
							continue moveMonsters;
						} else {
							if (_p20._0 === true) {
								var _v13 = _p22,
									_v14 = A2(_elm_lang$core$List_ops['::'], _p21, movedMonsters),
									_v15 = _p23;
								monsters = _v13;
								movedMonsters = _v14;
								_p17 = _v15;
								continue moveMonsters;
							} else {
								if (_p20._1.ctor === 'Just') {
									var _v16 = _p22,
										_v17 = A2(_elm_lang$core$List_ops['::'], _p21, movedMonsters),
										_v18 = _p23;
									monsters = _v16;
									movedMonsters = _v17;
									_p17 = _v18;
									continue moveMonsters;
								} else {
									if (_p20._2.ctor === 'Just') {
										var _v19 = _p22,
											_v20 = A2(_elm_lang$core$List_ops['::'], _p21, movedMonsters),
											_v21 = _p23;
										monsters = _v19;
										movedMonsters = _v20;
										_p17 = _v21;
										continue moveMonsters;
									} else {
										break _v9_4;
									}
								}
							}
						}
					} else {
						break _v9_4;
					}
				} while(false);
				if (isObstructedByMovedMonsters) {
					var _v22 = _p22,
						_v23 = A2(_elm_lang$core$List_ops['::'], _p21, movedMonsters),
						_v24 = _p23;
					monsters = _v22;
					movedMonsters = _v23;
					_p17 = _v24;
					continue moveMonsters;
				} else {
					var _v25 = _p22,
						_v26 = A2(_elm_lang$core$List_ops['::'], movedMonster, movedMonsters),
						_v27 = _p23;
					monsters = _v25;
					movedMonsters = _v26;
					_p17 = _v27;
					continue moveMonsters;
				}
			}
		}
	});
var _mordrax$cotwelm$Game_Collision$enterBuilding = F2(
	function (building, _p24) {
		var _p25 = _p24;
		var _p28 = _p25;
		var _p26 = _mordrax$cotwelm$GameData_Building$buildingType(building);
		switch (_p26.ctor) {
			case 'LinkType':
				var _p27 = _p26._0;
				return _elm_lang$core$Native_Utils.update(
					_p28,
					{
						maps: A2(_mordrax$cotwelm$Game_Maps$updateArea, _p27.area, _p25.maps),
						hero: _elm_lang$core$Native_Utils.update(
							_p25.hero,
							{position: _p27.pos})
					});
			case 'ShopType':
				return _elm_lang$core$Native_Utils.update(
					_p28,
					{
						currentScreen: _mordrax$cotwelm$Game_Data$BuildingScreen(building),
						shop: A2(_mordrax$cotwelm$Shop_Shop$setCurrentShopType, _p26._0, _p28.shop)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					_p28,
					{
						currentScreen: _mordrax$cotwelm$Game_Data$BuildingScreen(building)
					});
		}
	});
var _mordrax$cotwelm$Game_Collision$tryMoveHero = F2(
	function (dir, _p29) {
		var _p30 = _p29;
		var _p33 = _p30;
		var _p32 = _p30.hero;
		var movedHero = _elm_lang$core$Native_Utils.update(
			_p32,
			{
				position: A2(
					_mordrax$cotwelm$Utils_Vector$add,
					_p32.position,
					_mordrax$cotwelm$Game_Keyboard$dirToVector(dir))
			});
		var obstructions = A2(_mordrax$cotwelm$Game_Collision$queryPosition, movedHero.position, _p33);
		var _p31 = obstructions;
		_v31_1:
		do {
			_v31_0:
			do {
				if (_p31._0 === true) {
					if (_p31._2.ctor === 'Just') {
						break _v31_0;
					} else {
						if (_p31._1.ctor === 'Just') {
							break _v31_1;
						} else {
							return _p33;
						}
					}
				} else {
					if (_p31._2.ctor === 'Just') {
						break _v31_0;
					} else {
						if (_p31._1.ctor === 'Just') {
							break _v31_1;
						} else {
							return _elm_lang$core$Native_Utils.update(
								_p33,
								{hero: movedHero});
						}
					}
				}
			} while(false);
			return A2(_mordrax$cotwelm$Game_Collision$attack, _p31._2._0, _p33);
		} while(false);
		return A2(_mordrax$cotwelm$Game_Collision$enterBuilding, _p31._1._0, _p33);
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
			{ctor: '_Tuple2', _0: 10, _1: 1}),
			A2(
			_mordrax$cotwelm$Monster_Monster$new,
			_mordrax$cotwelm$Monster_Monster$Kobold,
			{ctor: '_Tuple2', _0: 4, _1: 10}),
			A2(
			_mordrax$cotwelm$Monster_Monster$new,
			_mordrax$cotwelm$Monster_Monster$Hobgoblin,
			{ctor: '_Tuple2', _0: 5, _1: 11}),
			A2(
			_mordrax$cotwelm$Monster_Monster$new,
			_mordrax$cotwelm$Monster_Monster$LargeSnake,
			{ctor: '_Tuple2', _0: 11, _1: 1})
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

var _mordrax$cotwelm$Game_Game$simpleBtn = function (txt) {
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html_Attributes$class('ui button')
			]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(txt)
			]));
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
var _mordrax$cotwelm$Game_Game$viewQuickMenu = A2(
	_elm_lang$html$Html$div,
	_elm_lang$core$Native_List.fromArray(
		[]),
	A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Game_Game$simpleBtn,
		_elm_lang$core$Native_List.fromArray(
			['Get', 'Free Hand', 'Search', 'Disarm', 'Rest', 'Save'])));
var _mordrax$cotwelm$Game_Game$viewMenu = A2(
	_elm_lang$html$Html$div,
	_elm_lang$core$Native_List.fromArray(
		[
			_elm_lang$html$Html_Attributes$class('ui buttons')
		]),
	A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Game_Game$simpleBtn,
		_elm_lang$core$Native_List.fromArray(
			['File', 'Character!', 'Inventory!', 'Map!', 'Spells', 'Activate', 'Verbs', 'Options', 'Window', 'Help'])));
var _mordrax$cotwelm$Game_Game$viewStats = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1.hero;
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
						_elm_lang$html$Html$text('Stats:')
					])),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'HP: ',
							_mordrax$cotwelm$Stats$printHP(_p2.stats)))
					])),
				A2(
				_elm_lang$html$Html$div,
				_elm_lang$core$Native_List.fromArray(
					[]),
				_elm_lang$core$Native_List.fromArray(
					[
						_elm_lang$html$Html$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'SP: ',
							_mordrax$cotwelm$Stats$printSP(_p2.stats)))
					]))
			]));
};
var _mordrax$cotwelm$Game_Game$viewMessages = function (model) {
	var msg = function (txt) {
		return A2(
			_elm_lang$html$Html$div,
			_elm_lang$core$Native_List.fromArray(
				[]),
			_elm_lang$core$Native_List.fromArray(
				[
					_elm_lang$html$Html$text(txt)
				]));
	};
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(_elm_lang$core$List$map, msg, model.messages));
};
var _mordrax$cotwelm$Game_Game$viewStatus = function (model) {
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
						_elm_lang$html$Html_Attributes$class('ui padded grid')
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
										{ctor: '_Tuple2', _0: 'overflow', _1: 'auto'},
										{ctor: '_Tuple2', _0: 'height', _1: '100px'}
									])),
								_elm_lang$html$Html_Attributes$class('ui twelve wide column')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_mordrax$cotwelm$Game_Game$viewMessages(model)
							])),
						A2(
						_elm_lang$html$Html$div,
						_elm_lang$core$Native_List.fromArray(
							[
								_elm_lang$html$Html_Attributes$class('ui four wide column')
							]),
						_elm_lang$core$Native_List.fromArray(
							[
								_mordrax$cotwelm$Game_Game$viewStats(model)
							]))
					]))
			]));
};
var _mordrax$cotwelm$Game_Game$viewMonsters = function (_p3) {
	var _p4 = _p3;
	var monsterHtml = function (monster) {
		return _mordrax$cotwelm$Monster_Monster$view(monster);
	};
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		A2(_elm_lang$core$List$map, monsterHtml, _p4.monsters));
};
var _mordrax$cotwelm$Game_Game$viewMap = function (_p5) {
	var _p6 = _p5;
	var _p10 = _p6.windowSize;
	var _p9 = _p6;
	var px = function (x) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px');
	};
	var _p7 = {ctor: '_Tuple2', _0: ((_p10.width / 32) | 0) * 16, _1: ((_p10.height / 32) | 0) * 16};
	var xOff = _p7._0;
	var yOff = _p7._1;
	var _p8 = A2(_mordrax$cotwelm$Utils_Vector$scale, 32, _p9.hero.position);
	var x = _p8._0;
	var y = _p8._1;
	var viewport = function (html) {
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
							_1: px(_p10.width)
						},
							{
							ctor: '_Tuple2',
							_0: 'height',
							_1: px(((_p10.height * 4) / 5) | 0)
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
									_1: px(yOff - y)
								},
									{
									ctor: '_Tuple2',
									_0: 'left',
									_1: px(xOff - x)
								}
								]))
						]),
					html)
				]));
	};
	var title = A2(
		_elm_lang$html$Html$h1,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_elm_lang$html$Html$text(
				A2(_elm_lang$core$Basics_ops['++'], 'Welcome to Castle of the Winds: ', _p9.name))
			]));
	return A2(
		_elm_lang$html$Html$div,
		_elm_lang$core$Native_List.fromArray(
			[]),
		_elm_lang$core$Native_List.fromArray(
			[
				_mordrax$cotwelm$Game_Game$viewMenu,
				_mordrax$cotwelm$Game_Game$viewQuickMenu,
				viewport(
				_elm_lang$core$Native_List.fromArray(
					[
						_mordrax$cotwelm$Game_Maps$view(_p9.maps),
						_mordrax$cotwelm$Game_Game$viewHero(_p9.hero),
						_mordrax$cotwelm$Game_Game$viewMonsters(_p9)
					])),
				_mordrax$cotwelm$Game_Game$viewStatus(_p9)
			]));
};
var _mordrax$cotwelm$Game_Game$update = F2(
	function (msg, model) {
		var _p11 = msg;
		switch (_p11.ctor) {
			case 'InvMsg':
				return {
					ctor: '_Tuple2',
					_0: A2(_mordrax$cotwelm$Game_Inventory$update, _p11._0, model),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ShopMsg':
				var _p12 = A3(_mordrax$cotwelm$Shop_Shop$update, _p11._0, model.idGen, model.shop);
				var shop$ = _p12._0;
				var idGen$ = _p12._1;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{shop: shop$, idGen: idGen$}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'MapsMsg':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							maps: A2(_mordrax$cotwelm$Game_Maps$update, _p11._0, model.maps)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'Keyboard':
				switch (_p11._0.ctor) {
					case 'KeyDir':
						var model$ = A2(_mordrax$cotwelm$Game_Collision$tryMoveHero, _p11._0._0, model);
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
						{windowSize: _p11._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _mordrax$cotwelm$Game_Game$WindowSize = function (a) {
	return {ctor: 'WindowSize', _0: a};
};
var _mordrax$cotwelm$Game_Game$initialWindowSizeCmd = A3(
	_elm_lang$core$Task$perform,
	function (x) {
		return A2(_elm_lang$core$Debug$log, 'Getting window size failed: ', x);
	},
	function (x) {
		return _mordrax$cotwelm$Game_Game$WindowSize(x);
	},
	_elm_lang$window$Window$size);
var _mordrax$cotwelm$Game_Game$MapsMsg = function (a) {
	return {ctor: 'MapsMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$ShopMsg = function (a) {
	return {ctor: 'ShopMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$initGame = function (seed) {
	var gameCmds = _mordrax$cotwelm$Game_Game$initialWindowSizeCmd;
	var _p13 = _mordrax$cotwelm$Game_Maps$init(seed);
	var maps = _p13._0;
	var mapCmd = _p13._1;
	var seed$ = _p13._2;
	var _p14 = _mordrax$cotwelm$Shop_Shop$new;
	var newShop = _p14._0;
	var shopCmd = _p14._1;
	var cmd = _elm_lang$core$Platform_Cmd$batch(
		_elm_lang$core$Native_List.fromArray(
			[
				A2(
				_elm_lang$core$Platform_Cmd$map,
				function (x) {
					return _mordrax$cotwelm$Game_Game$ShopMsg(x);
				},
				shopCmd),
				A2(
				_elm_lang$core$Platform_Cmd$map,
				function (x) {
					return _mordrax$cotwelm$Game_Game$MapsMsg(x);
				},
				mapCmd),
				gameCmds
			]));
	var idGenerator = _mordrax$cotwelm$Utils_IdGenerator$new;
	var _p15 = _mordrax$cotwelm$Equipment$init(idGenerator);
	var idGenerator$ = _p15._0;
	var equipment = _p15._1;
	var _p16 = _mordrax$cotwelm$Monster_Monsters$init(idGenerator$);
	var monsters = _p16._0;
	var idGenerator$$ = _p16._1;
	return {
		ctor: '_Tuple2',
		_0: {
			name: 'A new game',
			hero: _mordrax$cotwelm$Hero$init,
			maps: maps,
			currentScreen: _mordrax$cotwelm$Game_Data$MapScreen,
			dnd: _mordrax$cotwelm$Utils_DragDrop$new,
			equipment: equipment,
			shop: newShop,
			idGen: idGenerator$$,
			monsters: monsters,
			seed: seed$,
			windowSize: {width: 640, height: 640},
			messages: _elm_lang$core$Native_List.fromArray(
				['Welcome to castle of the winds!'])
		},
		_1: cmd
	};
};
var _mordrax$cotwelm$Game_Game$InvMsg = function (a) {
	return {ctor: 'InvMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$view = function (model) {
	var _p17 = model.currentScreen;
	switch (_p17.ctor) {
		case 'MapScreen':
			return _mordrax$cotwelm$Game_Game$viewMap(model);
		case 'BuildingScreen':
			var _p19 = _p17._0;
			var _p18 = _mordrax$cotwelm$GameData_Building$buildingType(_p19);
			if (_p18.ctor === 'ShopType') {
				return A2(
					_elm_lang$html$Html_App$map,
					_mordrax$cotwelm$Game_Game$InvMsg,
					_mordrax$cotwelm$Game_Inventory$view(model));
			} else {
				return _mordrax$cotwelm$Game_Game$viewBuilding(_p19);
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
var _mordrax$cotwelm$Main$Model = F4(
	function (a, b, c, d) {
		return {currentPage: a, character: b, game: c, editor: d};
	});
var _mordrax$cotwelm$Main$EditorMsg = function (a) {
	return {ctor: 'EditorMsg', _0: a};
};
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
		case 'EditorPage':
			return A2(
				_elm_lang$html$Html_App$map,
				_mordrax$cotwelm$Main$EditorMsg,
				_mordrax$cotwelm$Dungeon_Editor$view(model.editor));
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
			case 'EditorMsg':
				var _p8 = A2(_mordrax$cotwelm$Dungeon_Editor$update, _p5._0, model.editor);
				var editor$ = _p8._0;
				var cmds = _p8._1;
				var gameCmds = A2(
					_elm_lang$core$Platform_Cmd$map,
					function (x) {
						return _mordrax$cotwelm$Main$EditorMsg(x);
					},
					cmds);
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{editor: editor$}),
					_1: gameCmds
				};
			default:
				var _p9 = _mordrax$cotwelm$Game_Game$initGame(_p5._0);
				var game = _p9._0;
				var gameCmds = _p9._1;
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
var _mordrax$cotwelm$Main$EditorPage = {ctor: 'EditorPage'};
var _mordrax$cotwelm$Main$DungeonPage = {ctor: 'DungeonPage'};
var _mordrax$cotwelm$Main$ShopPage = {ctor: 'ShopPage'};
var _mordrax$cotwelm$Main$GamePage = {ctor: 'GamePage'};
var _mordrax$cotwelm$Main$CharCreationPage = {ctor: 'CharCreationPage'};
var _mordrax$cotwelm$Main$SplashPage = {ctor: 'SplashPage'};
var _mordrax$cotwelm$Main$urlUpdate = F2(
	function (url, model) {
		var setPage = function (x) {
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.update(
					model,
					{currentPage: x}),
				_1: _elm_lang$core$Platform_Cmd$none
			};
		};
		return _elm_lang$core$Native_Utils.eq(url, 'charCreation') ? setPage(_mordrax$cotwelm$Main$CharCreationPage) : (_elm_lang$core$Native_Utils.eq(url, 'game') ? setPage(_mordrax$cotwelm$Main$GamePage) : (_elm_lang$core$Native_Utils.eq(url, 'editor') ? setPage(_mordrax$cotwelm$Main$EditorPage) : setPage(_mordrax$cotwelm$Main$SplashPage)));
	});
var _mordrax$cotwelm$Main$initModel = function (url) {
	var model = {currentPage: _mordrax$cotwelm$Main$GamePage, character: _mordrax$cotwelm$CharCreation_CharCreation$initChar, game: _elm_lang$core$Maybe$Nothing, editor: _mordrax$cotwelm$Dungeon_Editor$init};
	var _p10 = A2(_mordrax$cotwelm$Main$urlUpdate, url, model);
	var modelWithUrl = _p10._0;
	var urlCmds = _p10._1;
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
		_elm_lang$navigation$Navigation$program,
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

