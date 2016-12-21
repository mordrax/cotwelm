
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

var _elm_lang$core$Native_Bitwise = function() {

return {
	and: F2(function and(a, b) { return a & b; }),
	or: F2(function or(a, b) { return a | b; }),
	xor: F2(function xor(a, b) { return a ^ b; }),
	complement: function complement(a) { return ~a; },
	shiftLeftBy: F2(function(offset, a) { return a << offset; }),
	shiftRightBy: F2(function(offset, a) { return a >> offset; }),
	shiftRightZfBy: F2(function(offset, a) { return a >>> offset; })
};

}();

var _elm_lang$core$Bitwise$shiftRightZfBy = _elm_lang$core$Native_Bitwise.shiftRightZfBy;
var _elm_lang$core$Bitwise$shiftRightBy = _elm_lang$core$Native_Bitwise.shiftRightBy;
var _elm_lang$core$Bitwise$shiftLeftBy = _elm_lang$core$Native_Bitwise.shiftLeftBy;
var _elm_lang$core$Bitwise$complement = _elm_lang$core$Native_Bitwise.complement;
var _elm_lang$core$Bitwise$xor = _elm_lang$core$Native_Bitwise.xor;
var _elm_lang$core$Bitwise$or = _elm_lang$core$Native_Bitwise.or;
var _elm_lang$core$Bitwise$and = _elm_lang$core$Native_Bitwise.and;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

var _Skinney$elm_array_exploration$Native_JsArray = function() {
/* A thin, but immutable, wrapper over native Javascript arrays. */

var empty = [];

function singleton(val) {
    return [val];
}

function length(arr) {
    return arr.length;
}

function initialize(size, offset, f) {
    var res = new Array(size);

    for (var i = 0; i < size; i++) {
        res[i] = f(offset + i);
    }

    return res;
}

// Create array from Elm list, containing at most max elements.
function listInitialize(ls, max) {
    var res = new Array(max);
    var i = 0;

    for (; i < max; i++) {
        if (ls.ctor === '[]') {
            break;
        }

        res[i] = ls._0;
        ls = ls._1;
    }

    res.length = i;

    return {
        ctor: '_Tuple2',
        _0: ls,
        _1: res
    };
}

// No bounds checking, use with caution!
function unsafeGet(idx, arr) {
    return arr[idx];
}

// No bounds checking, use with caution!
function unsafeSet(idx, val, arr) {
    var res = arr.slice();
    res[idx] = val;
    return res;
}

function push(val, arr) {
    var res = arr.slice();
    res.push(val);
    return res;
}

function foldl(f, init, arr) {
    var a = init,
        len = arr.length;

    for (var i = 0; i < len; i++) {
        a = A2(f, arr[i], a);
    }

    return a;
}

function foldr(f, init, arr) {
    var a = init;

    for (var i = arr.length - 1; i >= 0; i--) {
        a = A2(f, arr[i], a);
    }

    return a;
}

function map(f, arr) {
    var len = arr.length,
        copy = new Array(len);

    for (var i = 0; i < len; i++) {
        copy[i] = f(arr[i]);
    }

    return copy;
}

function slice(from, to, arr) {
    return arr.slice(from, to);
}

// Appends dest onto source, and makes sure it has max elements.
function merge(dest, source, max) {
    var destLen = dest.length,
        toCopy = max - destLen,
        sourceStop = toCopy > source.length ? source.length : toCopy,
        arr = new Array(destLen + sourceStop);

    for (var i = 0; i < destLen; i++) {
        arr[i] = dest[i];
    }

    for (var i = 0; i < sourceStop; i++) {
        arr[i + destLen] = source[i];
    }

    return arr;
}

return {
    empty: empty,
    singleton: singleton,
    length: length,
    initialize: F3(initialize),
    listInitialize: F2(listInitialize),
    unsafeGet: F2(unsafeGet),
    unsafeSet: F3(unsafeSet),
    push: F2(push),
    foldl: F3(foldl),
    foldr: F3(foldr),
    map: F2(map),
    slice: F3(slice),
    merge: F3(merge)
};

}();

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
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
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
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
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
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
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
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
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
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
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
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
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
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
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
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
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
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
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
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
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
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
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
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
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
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
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
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
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
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
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
				var _v27 = {ctor: '::', _0: value, _1: result},
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
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
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
	function (callback, result) {
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
var _elm_lang$core$Result$mapError = F2(
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

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
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
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

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
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
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
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
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
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
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

	function send(incomingValue)
	{
		currentSend(incomingValue);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

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

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
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
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
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
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _Skinney$elm_array_exploration$Array_JsArray$merge = _Skinney$elm_array_exploration$Native_JsArray.merge;
var _Skinney$elm_array_exploration$Array_JsArray$slice = _Skinney$elm_array_exploration$Native_JsArray.slice;
var _Skinney$elm_array_exploration$Array_JsArray$map = _Skinney$elm_array_exploration$Native_JsArray.map;
var _Skinney$elm_array_exploration$Array_JsArray$foldr = _Skinney$elm_array_exploration$Native_JsArray.foldr;
var _Skinney$elm_array_exploration$Array_JsArray$foldl = _Skinney$elm_array_exploration$Native_JsArray.foldl;
var _Skinney$elm_array_exploration$Array_JsArray$push = _Skinney$elm_array_exploration$Native_JsArray.push;
var _Skinney$elm_array_exploration$Array_JsArray$unsafeSet = _Skinney$elm_array_exploration$Native_JsArray.unsafeSet;
var _Skinney$elm_array_exploration$Array_JsArray$unsafeGet = _Skinney$elm_array_exploration$Native_JsArray.unsafeGet;
var _Skinney$elm_array_exploration$Array_JsArray$listInitialize = _Skinney$elm_array_exploration$Native_JsArray.listInitialize;
var _Skinney$elm_array_exploration$Array_JsArray$initialize = _Skinney$elm_array_exploration$Native_JsArray.initialize;
var _Skinney$elm_array_exploration$Array_JsArray$length = _Skinney$elm_array_exploration$Native_JsArray.length;
var _Skinney$elm_array_exploration$Array_JsArray$singleton = _Skinney$elm_array_exploration$Native_JsArray.singleton;
var _Skinney$elm_array_exploration$Array_JsArray$empty = _Skinney$elm_array_exploration$Native_JsArray.empty;
var _Skinney$elm_array_exploration$Array_JsArray$JsArray = function (a) {
	return {ctor: 'JsArray', _0: a};
};

var _Skinney$elm_array_exploration$Array_Hamt$translateIndex = F2(
	function (idx, arr) {
		var posIndex = (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? (arr.length + idx) : idx;
		return (_elm_lang$core$Native_Utils.cmp(posIndex, 0) < 0) ? 0 : ((_elm_lang$core$Native_Utils.cmp(posIndex, arr.length) > 0) ? arr.length : posIndex);
	});
var _Skinney$elm_array_exploration$Array_Hamt$foldl = F3(
	function (f, init, arr) {
		var helper = F2(
			function (i, acc) {
				var _p0 = i;
				if (_p0.ctor === 'SubTree') {
					return A3(_Skinney$elm_array_exploration$Array_JsArray$foldl, helper, acc, _p0._0);
				} else {
					return A3(_Skinney$elm_array_exploration$Array_JsArray$foldl, f, acc, _p0._0);
				}
			});
		var tree = A3(_Skinney$elm_array_exploration$Array_JsArray$foldl, helper, init, arr.tree);
		return A3(_Skinney$elm_array_exploration$Array_JsArray$foldl, f, tree, arr.tail);
	});
var _Skinney$elm_array_exploration$Array_Hamt$foldr = F3(
	function (f, init, arr) {
		var tail = A3(_Skinney$elm_array_exploration$Array_JsArray$foldr, f, init, arr.tail);
		var helper = F2(
			function (i, acc) {
				var _p1 = i;
				if (_p1.ctor === 'SubTree') {
					return A3(_Skinney$elm_array_exploration$Array_JsArray$foldr, helper, acc, _p1._0);
				} else {
					return A3(_Skinney$elm_array_exploration$Array_JsArray$foldr, f, acc, _p1._0);
				}
			});
		return A3(_Skinney$elm_array_exploration$Array_JsArray$foldr, helper, tail, arr.tree);
	});
var _Skinney$elm_array_exploration$Array_Hamt$toList = function (arr) {
	return A3(
		_Skinney$elm_array_exploration$Array_Hamt$foldr,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		arr);
};
var _Skinney$elm_array_exploration$Array_Hamt$tailPrefix = function (len) {
	return (_elm_lang$core$Native_Utils.cmp(len, 32) < 0) ? 0 : ((len >>> 5) << 5);
};
var _Skinney$elm_array_exploration$Array_Hamt$getHelp = F3(
	function (shift, idx, tree) {
		getHelp:
		while (true) {
			var pos = 31 & (idx >>> shift);
			var _p2 = A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, pos, tree);
			if (_p2.ctor === 'SubTree') {
				var _v3 = shift - 5,
					_v4 = idx,
					_v5 = _p2._0;
				shift = _v3;
				idx = _v4;
				tree = _v5;
				continue getHelp;
			} else {
				return A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, 31 & idx, _p2._0);
			}
		}
	});
var _Skinney$elm_array_exploration$Array_Hamt$unsafeGet = F2(
	function (idx, arr) {
		return (_elm_lang$core$Native_Utils.cmp(
			idx,
			_Skinney$elm_array_exploration$Array_Hamt$tailPrefix(arr.length)) > -1) ? A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, 31 & idx, arr.tail) : A3(_Skinney$elm_array_exploration$Array_Hamt$getHelp, arr.startShift, idx, arr.tree);
	});
var _Skinney$elm_array_exploration$Array_Hamt$get = F2(
	function (idx, arr) {
		return ((_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(idx, arr.length) > -1)) ? _elm_lang$core$Maybe$Nothing : ((_elm_lang$core$Native_Utils.cmp(
			idx,
			_Skinney$elm_array_exploration$Array_Hamt$tailPrefix(arr.length)) > -1) ? _elm_lang$core$Maybe$Just(
			A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, 31 & idx, arr.tail)) : _elm_lang$core$Maybe$Just(
			A3(_Skinney$elm_array_exploration$Array_Hamt$getHelp, arr.startShift, idx, arr.tree)));
	});
var _Skinney$elm_array_exploration$Array_Hamt$length = function (arr) {
	return arr.length;
};
var _Skinney$elm_array_exploration$Array_Hamt$toIndexedList = function (arr) {
	var helper = F2(
		function (n, _p3) {
			var _p4 = _p3;
			var _p5 = _p4._0;
			return {
				ctor: '_Tuple2',
				_0: _p5 - 1,
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: _p5, _1: n},
					_1: _p4._1
				}
			};
		});
	return _elm_lang$core$Tuple$second(
		A3(
			_Skinney$elm_array_exploration$Array_Hamt$foldr,
			helper,
			{
				ctor: '_Tuple2',
				_0: _Skinney$elm_array_exploration$Array_Hamt$length(arr) - 1,
				_1: {ctor: '[]'}
			},
			arr));
};
var _Skinney$elm_array_exploration$Array_Hamt$isEmpty = function (arr) {
	return _elm_lang$core$Native_Utils.eq(arr.length, 0);
};
var _Skinney$elm_array_exploration$Array_Hamt$Array = F4(
	function (a, b, c, d) {
		return {length: a, startShift: b, tree: c, tail: d};
	});
var _Skinney$elm_array_exploration$Array_Hamt$empty = A4(_Skinney$elm_array_exploration$Array_Hamt$Array, 0, 5, _Skinney$elm_array_exploration$Array_JsArray$empty, _Skinney$elm_array_exploration$Array_JsArray$empty);
var _Skinney$elm_array_exploration$Array_Hamt$Leaf = function (a) {
	return {ctor: 'Leaf', _0: a};
};
var _Skinney$elm_array_exploration$Array_Hamt$SubTree = function (a) {
	return {ctor: 'SubTree', _0: a};
};
var _Skinney$elm_array_exploration$Array_Hamt$initializeHelp = F4(
	function (subTreeSize, startIndex, stopIndex, f) {
		var len = stopIndex - startIndex;
		if (_elm_lang$core$Native_Utils.eq(len, 32)) {
			return _Skinney$elm_array_exploration$Array_Hamt$Leaf(
				A3(_Skinney$elm_array_exploration$Array_JsArray$initialize, 32, startIndex, f));
		} else {
			var nextSubTreeSize = (subTreeSize / 32) | 0;
			var helper = function (idx) {
				var start = startIndex + (subTreeSize * idx);
				var stop = A2(_elm_lang$core$Basics$min, start + subTreeSize, stopIndex);
				return A4(_Skinney$elm_array_exploration$Array_Hamt$initializeHelp, nextSubTreeSize, start, stop, f);
			};
			var numberOfSubTrees = _elm_lang$core$Basics$ceiling(
				_elm_lang$core$Basics$toFloat(len) / _elm_lang$core$Basics$toFloat(subTreeSize));
			return _Skinney$elm_array_exploration$Array_Hamt$SubTree(
				A3(_Skinney$elm_array_exploration$Array_JsArray$initialize, numberOfSubTrees, 0, helper));
		}
	});
var _Skinney$elm_array_exploration$Array_Hamt$initialize = F2(
	function (stop, f) {
		if (_elm_lang$core$Native_Utils.cmp(stop, 0) < 1) {
			return _Skinney$elm_array_exploration$Array_Hamt$empty;
		} else {
			if (_elm_lang$core$Native_Utils.cmp(stop, 32) < 0) {
				return {
					length: stop,
					startShift: 5,
					tree: _Skinney$elm_array_exploration$Array_JsArray$empty,
					tail: A3(_Skinney$elm_array_exploration$Array_JsArray$initialize, stop, 0, f)
				};
			} else {
				var tailLen = 31 & stop;
				var treeLen = stop - tailLen;
				var requiredTreeHeight = _elm_lang$core$Basics$floor(
					A2(
						_elm_lang$core$Basics$logBase,
						32,
						_elm_lang$core$Basics$toFloat(treeLen)));
				var subTreeSize = Math.pow(32, requiredTreeHeight);
				var nextSubTreeSize = (subTreeSize / 32) | 0;
				var numberOfSubTrees = _elm_lang$core$Basics$ceiling(
					_elm_lang$core$Basics$toFloat(treeLen) / _elm_lang$core$Basics$toFloat(subTreeSize));
				var helper = function (idx) {
					var startIndex = subTreeSize * idx;
					var stopIndex = A2(_elm_lang$core$Basics$min, startIndex + subTreeSize, treeLen);
					return A4(_Skinney$elm_array_exploration$Array_Hamt$initializeHelp, nextSubTreeSize, startIndex, stopIndex, f);
				};
				return {
					length: stop,
					startShift: requiredTreeHeight * 5,
					tree: A3(_Skinney$elm_array_exploration$Array_JsArray$initialize, numberOfSubTrees, 0, helper),
					tail: A3(_Skinney$elm_array_exploration$Array_JsArray$initialize, tailLen, treeLen, f)
				};
			}
		}
	});
var _Skinney$elm_array_exploration$Array_Hamt$repeat = F2(
	function (n, e) {
		return A2(
			_Skinney$elm_array_exploration$Array_Hamt$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _Skinney$elm_array_exploration$Array_Hamt$indexedMap = F2(
	function (f, arr) {
		var helper = function (idx) {
			return A2(
				f,
				idx,
				A2(_Skinney$elm_array_exploration$Array_Hamt$unsafeGet, idx, arr));
		};
		return A2(_Skinney$elm_array_exploration$Array_Hamt$initialize, arr.length, helper);
	});
var _Skinney$elm_array_exploration$Array_Hamt$setHelp = F4(
	function (shift, idx, val, tree) {
		var pos = 31 & (idx >>> shift);
		var _p6 = A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, pos, tree);
		if (_p6.ctor === 'SubTree') {
			var newSub = A4(_Skinney$elm_array_exploration$Array_Hamt$setHelp, shift - 5, idx, val, _p6._0);
			return A3(
				_Skinney$elm_array_exploration$Array_JsArray$unsafeSet,
				pos,
				_Skinney$elm_array_exploration$Array_Hamt$SubTree(newSub),
				tree);
		} else {
			var newLeaf = A3(_Skinney$elm_array_exploration$Array_JsArray$unsafeSet, 31 & idx, val, _p6._0);
			return A3(
				_Skinney$elm_array_exploration$Array_JsArray$unsafeSet,
				pos,
				_Skinney$elm_array_exploration$Array_Hamt$Leaf(newLeaf),
				tree);
		}
	});
var _Skinney$elm_array_exploration$Array_Hamt$set = F3(
	function (idx, val, arr) {
		return ((_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(idx, arr.length) > -1)) ? arr : ((_elm_lang$core$Native_Utils.cmp(
			idx,
			_Skinney$elm_array_exploration$Array_Hamt$tailPrefix(arr.length)) > -1) ? {
			length: arr.length,
			startShift: arr.startShift,
			tree: arr.tree,
			tail: A3(_Skinney$elm_array_exploration$Array_JsArray$unsafeSet, 31 & idx, val, arr.tail)
		} : {
			length: arr.length,
			startShift: arr.startShift,
			tree: A4(_Skinney$elm_array_exploration$Array_Hamt$setHelp, arr.startShift, idx, val, arr.tree),
			tail: arr.tail
		});
	});
var _Skinney$elm_array_exploration$Array_Hamt$pushTailHelp = F4(
	function (shift, idx, tail, tree) {
		var pos = 31 & (idx >>> shift);
		if (_elm_lang$core$Native_Utils.cmp(
			pos,
			_Skinney$elm_array_exploration$Array_JsArray$length(tree)) > -1) {
			return A2(
				_Skinney$elm_array_exploration$Array_JsArray$push,
				_Skinney$elm_array_exploration$Array_Hamt$Leaf(tail),
				tree);
		} else {
			var val = A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, pos, tree);
			var _p7 = val;
			if (_p7.ctor === 'SubTree') {
				var newSub = A4(_Skinney$elm_array_exploration$Array_Hamt$pushTailHelp, shift - 5, idx, tail, _p7._0);
				return A3(
					_Skinney$elm_array_exploration$Array_JsArray$unsafeSet,
					pos,
					_Skinney$elm_array_exploration$Array_Hamt$SubTree(newSub),
					tree);
			} else {
				var newSub = A4(
					_Skinney$elm_array_exploration$Array_Hamt$pushTailHelp,
					shift - 5,
					idx,
					tail,
					_Skinney$elm_array_exploration$Array_JsArray$singleton(val));
				return A3(
					_Skinney$elm_array_exploration$Array_JsArray$unsafeSet,
					pos,
					_Skinney$elm_array_exploration$Array_Hamt$SubTree(newSub),
					tree);
			}
		}
	});
var _Skinney$elm_array_exploration$Array_Hamt$pushTail = F2(
	function (newTail, arr) {
		var tailLen = _Skinney$elm_array_exploration$Array_JsArray$length(newTail);
		var newLen = (arr.length + tailLen) - _Skinney$elm_array_exploration$Array_JsArray$length(arr.tail);
		var overflow = _elm_lang$core$Native_Utils.cmp(newLen >>> 5, 1 << arr.startShift) > -1;
		var newTree = _elm_lang$core$Native_Utils.eq(tailLen, 32) ? A4(_Skinney$elm_array_exploration$Array_Hamt$pushTailHelp, arr.startShift, arr.length, newTail, arr.tree) : arr.tree;
		return {
			length: newLen,
			startShift: overflow ? (arr.startShift + 5) : arr.startShift,
			tree: overflow ? _Skinney$elm_array_exploration$Array_JsArray$singleton(
				_Skinney$elm_array_exploration$Array_Hamt$SubTree(newTree)) : newTree,
			tail: _elm_lang$core$Native_Utils.eq(tailLen, 32) ? _Skinney$elm_array_exploration$Array_JsArray$empty : newTail
		};
	});
var _Skinney$elm_array_exploration$Array_Hamt$fromListHelp = F2(
	function (list, arr) {
		fromListHelp:
		while (true) {
			var _p8 = A2(_Skinney$elm_array_exploration$Array_JsArray$listInitialize, list, 32);
			var newList = _p8._0;
			var newTail = _p8._1;
			var newArray = A2(_Skinney$elm_array_exploration$Array_Hamt$pushTail, newTail, arr);
			var _p9 = newList;
			if (_p9.ctor === '[]') {
				return newArray;
			} else {
				var _v10 = newList,
					_v11 = newArray;
				list = _v10;
				arr = _v11;
				continue fromListHelp;
			}
		}
	});
var _Skinney$elm_array_exploration$Array_Hamt$fromList = function (ls) {
	var _p10 = ls;
	if (_p10.ctor === '[]') {
		return _Skinney$elm_array_exploration$Array_Hamt$empty;
	} else {
		return A2(_Skinney$elm_array_exploration$Array_Hamt$fromListHelp, ls, _Skinney$elm_array_exploration$Array_Hamt$empty);
	}
};
var _Skinney$elm_array_exploration$Array_Hamt$filter = F2(
	function (f, arr) {
		var helper = F2(
			function (n, acc) {
				return f(n) ? {ctor: '::', _0: n, _1: acc} : acc;
			});
		return _Skinney$elm_array_exploration$Array_Hamt$fromList(
			A3(
				_Skinney$elm_array_exploration$Array_Hamt$foldr,
				helper,
				{ctor: '[]'},
				arr));
	});
var _Skinney$elm_array_exploration$Array_Hamt$push = F2(
	function (a, arr) {
		var newTail = A2(_Skinney$elm_array_exploration$Array_JsArray$push, a, arr.tail);
		return A2(_Skinney$elm_array_exploration$Array_Hamt$pushTail, newTail, arr);
	});
var _Skinney$elm_array_exploration$Array_Hamt$map = F2(
	function (f, arr) {
		var helper = function (i) {
			var _p11 = i;
			if (_p11.ctor === 'SubTree') {
				return _Skinney$elm_array_exploration$Array_Hamt$SubTree(
					A2(_Skinney$elm_array_exploration$Array_JsArray$map, helper, _p11._0));
			} else {
				return _Skinney$elm_array_exploration$Array_Hamt$Leaf(
					A2(_Skinney$elm_array_exploration$Array_JsArray$map, f, _p11._0));
			}
		};
		return {
			length: arr.length,
			startShift: arr.startShift,
			tree: A2(_Skinney$elm_array_exploration$Array_JsArray$map, helper, arr.tree),
			tail: A2(_Skinney$elm_array_exploration$Array_JsArray$map, f, arr.tail)
		};
	});
var _Skinney$elm_array_exploration$Array_Hamt$append = F2(
	function (a, b) {
		var tailMerge = F2(
			function (toMerge, arr) {
				var tailToInsert = A3(_Skinney$elm_array_exploration$Array_JsArray$merge, arr.tail, toMerge, 32);
				var tailLen = _Skinney$elm_array_exploration$Array_JsArray$length(tailToInsert);
				var newTree = _elm_lang$core$Native_Utils.eq(tailLen, 32) ? A4(_Skinney$elm_array_exploration$Array_Hamt$pushTailHelp, arr.startShift, arr.length, tailToInsert, arr.tree) : arr.tree;
				var toMergeLen = _Skinney$elm_array_exploration$Array_JsArray$length(toMerge);
				var leftOver = A2(
					_elm_lang$core$Basics$max,
					0,
					(_Skinney$elm_array_exploration$Array_JsArray$length(arr.tail) + toMergeLen) - 32);
				var newLen = arr.length + toMergeLen;
				var overflow = _elm_lang$core$Native_Utils.cmp(newLen >>> 5, 1 << arr.startShift) > -1;
				return {
					length: newLen,
					startShift: overflow ? (arr.startShift + 5) : arr.startShift,
					tree: overflow ? _Skinney$elm_array_exploration$Array_JsArray$singleton(
						_Skinney$elm_array_exploration$Array_Hamt$SubTree(newTree)) : newTree,
					tail: _elm_lang$core$Native_Utils.eq(tailLen, 32) ? A3(_Skinney$elm_array_exploration$Array_JsArray$slice, toMergeLen - leftOver, toMergeLen, toMerge) : tailToInsert
				};
			});
		var helper = F2(
			function (i, acc) {
				var _p12 = i;
				if (_p12.ctor === 'SubTree') {
					return A3(_Skinney$elm_array_exploration$Array_JsArray$foldl, helper, acc, _p12._0);
				} else {
					return A2(tailMerge, _p12._0, acc);
				}
			});
		return A2(
			tailMerge,
			b.tail,
			A3(_Skinney$elm_array_exploration$Array_JsArray$foldl, helper, a, b.tree));
	});
var _Skinney$elm_array_exploration$Array_Hamt$sliceRight = F2(
	function (end, arr) {
		if (_elm_lang$core$Native_Utils.eq(end, arr.length)) {
			return arr;
		} else {
			if (_elm_lang$core$Native_Utils.cmp(
				end,
				_Skinney$elm_array_exploration$Array_Hamt$tailPrefix(arr.length)) > -1) {
				return {
					length: end,
					startShift: arr.startShift,
					tree: arr.tree,
					tail: A3(_Skinney$elm_array_exploration$Array_JsArray$slice, 0, 31 & end, arr.tail)
				};
			} else {
				var hoistTree = F3(
					function (oldShift, newShift, tree) {
						hoistTree:
						while (true) {
							if (_elm_lang$core$Native_Utils.cmp(oldShift, newShift) < 1) {
								return tree;
							} else {
								var _p13 = A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, 0, tree);
								if (_p13.ctor === 'SubTree') {
									var _v16 = oldShift - 5,
										_v17 = newShift,
										_v18 = _p13._0;
									oldShift = _v16;
									newShift = _v17;
									tree = _v18;
									continue hoistTree;
								} else {
									return tree;
								}
							}
						}
					});
				var newShift = (_elm_lang$core$Native_Utils.cmp(end, 1024) < 0) ? 5 : (_elm_lang$core$Basics$floor(
					A2(
						_elm_lang$core$Basics$logBase,
						32,
						_elm_lang$core$Basics$toFloat(end))) * 5);
				var endIdx = _Skinney$elm_array_exploration$Array_Hamt$tailPrefix(end);
				var fetchNewTail = F2(
					function (shift, tree) {
						fetchNewTail:
						while (true) {
							var pos = 31 & (endIdx >>> shift);
							var _p14 = A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, pos, tree);
							if (_p14.ctor === 'SubTree') {
								var _v20 = shift - 5,
									_v21 = _p14._0;
								shift = _v20;
								tree = _v21;
								continue fetchNewTail;
							} else {
								return A3(_Skinney$elm_array_exploration$Array_JsArray$slice, 0, 31 & end, _p14._0);
							}
						}
					});
				var sliceTree = F2(
					function (shift, tree) {
						var lastPos = 31 & (endIdx >>> shift);
						var _p15 = A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, lastPos, tree);
						if (_p15.ctor === 'SubTree') {
							var newSub = A2(sliceTree, shift - 5, _p15._0);
							var _p16 = _Skinney$elm_array_exploration$Array_JsArray$length(newSub);
							switch (_p16) {
								case 0:
									return A3(_Skinney$elm_array_exploration$Array_JsArray$slice, 0, lastPos, tree);
								case 1:
									var val = A2(_Skinney$elm_array_exploration$Array_JsArray$unsafeGet, 0, newSub);
									var nodeToInsert = function () {
										var _p17 = val;
										if (_p17.ctor === 'SubTree') {
											return _Skinney$elm_array_exploration$Array_Hamt$SubTree(newSub);
										} else {
											return val;
										}
									}();
									return A3(
										_Skinney$elm_array_exploration$Array_JsArray$unsafeSet,
										lastPos,
										nodeToInsert,
										A3(_Skinney$elm_array_exploration$Array_JsArray$slice, 0, lastPos + 1, tree));
								default:
									return A3(
										_Skinney$elm_array_exploration$Array_JsArray$unsafeSet,
										lastPos,
										_Skinney$elm_array_exploration$Array_Hamt$SubTree(newSub),
										A3(_Skinney$elm_array_exploration$Array_JsArray$slice, 0, lastPos + 1, tree));
							}
						} else {
							return A3(_Skinney$elm_array_exploration$Array_JsArray$slice, 0, lastPos, tree);
						}
					});
				return {
					length: end,
					startShift: newShift,
					tree: A3(
						hoistTree,
						arr.startShift,
						newShift,
						A2(sliceTree, arr.startShift, arr.tree)),
					tail: A2(fetchNewTail, arr.startShift, arr.tree)
				};
			}
		}
	});
var _Skinney$elm_array_exploration$Array_Hamt$slice = F3(
	function (from, to, arr) {
		var correctTo = A2(_Skinney$elm_array_exploration$Array_Hamt$translateIndex, to, arr);
		var correctFrom = A2(_Skinney$elm_array_exploration$Array_Hamt$translateIndex, from, arr);
		if (_elm_lang$core$Native_Utils.cmp(correctFrom, correctTo) > 0) {
			return _Skinney$elm_array_exploration$Array_Hamt$empty;
		} else {
			if (_elm_lang$core$Native_Utils.cmp(correctFrom, 0) > 0) {
				var helper = function (i) {
					return A2(_Skinney$elm_array_exploration$Array_Hamt$unsafeGet, i + correctFrom, arr);
				};
				var len = correctTo - correctFrom;
				return A2(_Skinney$elm_array_exploration$Array_Hamt$initialize, len, helper);
			} else {
				return A2(_Skinney$elm_array_exploration$Array_Hamt$sliceRight, correctTo, arr);
			}
		}
	});

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
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
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
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
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
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
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
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
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
		A2(
			_elm_lang$core$List$range,
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

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
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

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
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

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
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

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
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

			case 'index':
				context += '[' + problem.index + ']';
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
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

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

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
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
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
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

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
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
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
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
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
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
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
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
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
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
					_0: {ctor: '::', _0: interval, _1: _p18._0},
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
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
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

var _mgold$elm_random_pcg$Random_Pcg$toJson = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$core$Json_Encode$list(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Encode$int(_p1._0),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Json_Encode$int(_p1._1),
				_1: {ctor: '[]'}
			}
		});
};
var _mgold$elm_random_pcg$Random_Pcg$mul32 = F2(
	function (a, b) {
		var bl = b & 65535;
		var bh = 65535 & (b >>> 16);
		var al = a & 65535;
		var ah = 65535 & (a >>> 16);
		return 0 | ((al * bl) + ((((ah * bl) + (al * bh)) << 16) >>> 0));
	});
var _mgold$elm_random_pcg$Random_Pcg$listHelp = F4(
	function (list, n, generate, seed) {
		listHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 1) < 0) {
				return {ctor: '_Tuple2', _0: list, _1: seed};
			} else {
				var _p2 = generate(seed);
				var value = _p2._0;
				var newSeed = _p2._1;
				var _v1 = {ctor: '::', _0: value, _1: list},
					_v2 = n - 1,
					_v3 = generate,
					_v4 = newSeed;
				list = _v1;
				n = _v2;
				generate = _v3;
				seed = _v4;
				continue listHelp;
			}
		}
	});
var _mgold$elm_random_pcg$Random_Pcg$minInt = -2147483648;
var _mgold$elm_random_pcg$Random_Pcg$maxInt = 2147483647;
var _mgold$elm_random_pcg$Random_Pcg$bit27 = 1.34217728e8;
var _mgold$elm_random_pcg$Random_Pcg$bit53 = 9.007199254740992e15;
var _mgold$elm_random_pcg$Random_Pcg$peel = function (_p3) {
	var _p4 = _p3;
	var _p5 = _p4._0;
	var word = (_p5 ^ (_p5 >>> ((_p5 >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var _mgold$elm_random_pcg$Random_Pcg$step = F2(
	function (_p6, seed) {
		var _p7 = _p6;
		return _p7._0(seed);
	});
var _mgold$elm_random_pcg$Random_Pcg$retry = F3(
	function (generator, predicate, seed) {
		retry:
		while (true) {
			var _p8 = A2(_mgold$elm_random_pcg$Random_Pcg$step, generator, seed);
			var candidate = _p8._0;
			var newSeed = _p8._1;
			if (predicate(candidate)) {
				return {ctor: '_Tuple2', _0: candidate, _1: newSeed};
			} else {
				var _v7 = generator,
					_v8 = predicate,
					_v9 = newSeed;
				generator = _v7;
				predicate = _v8;
				seed = _v9;
				continue retry;
			}
		}
	});
var _mgold$elm_random_pcg$Random_Pcg$Generator = function (a) {
	return {ctor: 'Generator', _0: a};
};
var _mgold$elm_random_pcg$Random_Pcg$list = F2(
	function (n, _p9) {
		var _p10 = _p9;
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
			function (seed) {
				return A4(
					_mgold$elm_random_pcg$Random_Pcg$listHelp,
					{ctor: '[]'},
					n,
					_p10._0,
					seed);
			});
	});
var _mgold$elm_random_pcg$Random_Pcg$constant = function (value) {
	return _mgold$elm_random_pcg$Random_Pcg$Generator(
		function (seed) {
			return {ctor: '_Tuple2', _0: value, _1: seed};
		});
};
var _mgold$elm_random_pcg$Random_Pcg$map = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
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
var _mgold$elm_random_pcg$Random_Pcg$map2 = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
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
var _mgold$elm_random_pcg$Random_Pcg$pair = F2(
	function (genA, genB) {
		return A3(
			_mgold$elm_random_pcg$Random_Pcg$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			genA,
			genB);
	});
var _mgold$elm_random_pcg$Random_Pcg$andMap = _mgold$elm_random_pcg$Random_Pcg$map2(
	F2(
		function (x, y) {
			return x(y);
		}));
var _mgold$elm_random_pcg$Random_Pcg$map3 = F4(
	function (func, _p22, _p21, _p20) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p25 = _p20;
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
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
var _mgold$elm_random_pcg$Random_Pcg$map4 = F5(
	function (func, _p32, _p31, _p30, _p29) {
		var _p33 = _p32;
		var _p34 = _p31;
		var _p35 = _p30;
		var _p36 = _p29;
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
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
var _mgold$elm_random_pcg$Random_Pcg$map5 = F6(
	function (func, _p45, _p44, _p43, _p42, _p41) {
		var _p46 = _p45;
		var _p47 = _p44;
		var _p48 = _p43;
		var _p49 = _p42;
		var _p50 = _p41;
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
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
var _mgold$elm_random_pcg$Random_Pcg$andThen = F2(
	function (callback, _p56) {
		var _p57 = _p56;
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
			function (seed) {
				var _p58 = _p57._0(seed);
				var result = _p58._0;
				var newSeed = _p58._1;
				var _p59 = callback(result);
				var generateB = _p59._0;
				return generateB(newSeed);
			});
	});
var _mgold$elm_random_pcg$Random_Pcg$maybe = F2(
	function (genBool, genA) {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			function (b) {
				return b ? A2(_mgold$elm_random_pcg$Random_Pcg$map, _elm_lang$core$Maybe$Just, genA) : _mgold$elm_random_pcg$Random_Pcg$constant(_elm_lang$core$Maybe$Nothing);
			},
			genBool);
	});
var _mgold$elm_random_pcg$Random_Pcg$filter = F2(
	function (predicate, generator) {
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
			A2(_mgold$elm_random_pcg$Random_Pcg$retry, generator, predicate));
	});
var _mgold$elm_random_pcg$Random_Pcg$Seed = F2(
	function (a, b) {
		return {ctor: 'Seed', _0: a, _1: b};
	});
var _mgold$elm_random_pcg$Random_Pcg$next = function (_p60) {
	var _p61 = _p60;
	var _p62 = _p61._1;
	return A2(_mgold$elm_random_pcg$Random_Pcg$Seed, ((_p61._0 * 1664525) + _p62) >>> 0, _p62);
};
var _mgold$elm_random_pcg$Random_Pcg$initialSeed = function (x) {
	var _p63 = _mgold$elm_random_pcg$Random_Pcg$next(
		A2(_mgold$elm_random_pcg$Random_Pcg$Seed, 0, 1013904223));
	var state1 = _p63._0;
	var incr = _p63._1;
	var state2 = (state1 + x) >>> 0;
	return _mgold$elm_random_pcg$Random_Pcg$next(
		A2(_mgold$elm_random_pcg$Random_Pcg$Seed, state2, incr));
};
var _mgold$elm_random_pcg$Random_Pcg$generate = F2(
	function (toMsg, generator) {
		return A2(
			_elm_lang$core$Task$perform,
			toMsg,
			A2(
				_elm_lang$core$Task$map,
				function (_p64) {
					return _elm_lang$core$Tuple$first(
						A2(
							_mgold$elm_random_pcg$Random_Pcg$step,
							generator,
							_mgold$elm_random_pcg$Random_Pcg$initialSeed(
								_elm_lang$core$Basics$round(_p64))));
				},
				_elm_lang$core$Time$now));
	});
var _mgold$elm_random_pcg$Random_Pcg$int = F2(
	function (a, b) {
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
			function (seed0) {
				var _p65 = (_elm_lang$core$Native_Utils.cmp(a, b) < 0) ? {ctor: '_Tuple2', _0: a, _1: b} : {ctor: '_Tuple2', _0: b, _1: a};
				var lo = _p65._0;
				var hi = _p65._1;
				var range = (hi - lo) + 1;
				if (_elm_lang$core$Native_Utils.eq((range - 1) & range, 0)) {
					return {
						ctor: '_Tuple2',
						_0: (((range - 1) & _mgold$elm_random_pcg$Random_Pcg$peel(seed0)) >>> 0) + lo,
						_1: _mgold$elm_random_pcg$Random_Pcg$next(seed0)
					};
				} else {
					var threshhold = A2(_elm_lang$core$Basics$rem, (0 - range) >>> 0, range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var seedN = _mgold$elm_random_pcg$Random_Pcg$next(seed);
							var x = _mgold$elm_random_pcg$Random_Pcg$peel(seed);
							if (_elm_lang$core$Native_Utils.cmp(x, threshhold) < 0) {
								var _v28 = seedN;
								seed = _v28;
								continue accountForBias;
							} else {
								return {
									ctor: '_Tuple2',
									_0: A2(_elm_lang$core$Basics$rem, x, range) + lo,
									_1: seedN
								};
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var _mgold$elm_random_pcg$Random_Pcg$bool = A2(
	_mgold$elm_random_pcg$Random_Pcg$map,
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		})(1),
	A2(_mgold$elm_random_pcg$Random_Pcg$int, 0, 1));
var _mgold$elm_random_pcg$Random_Pcg$choice = F2(
	function (x, y) {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (b) {
				return b ? x : y;
			},
			_mgold$elm_random_pcg$Random_Pcg$bool);
	});
var _mgold$elm_random_pcg$Random_Pcg$oneIn = function (n) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(1),
		A2(_mgold$elm_random_pcg$Random_Pcg$int, 1, n));
};
var _mgold$elm_random_pcg$Random_Pcg$sample = function () {
	var find = F2(
		function (k, ys) {
			find:
			while (true) {
				var _p66 = ys;
				if (_p66.ctor === '[]') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_elm_lang$core$Native_Utils.eq(k, 0)) {
						return _elm_lang$core$Maybe$Just(_p66._0);
					} else {
						var _v30 = k - 1,
							_v31 = _p66._1;
						k = _v30;
						ys = _v31;
						continue find;
					}
				}
			}
		});
	return function (xs) {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (i) {
				return A2(find, i, xs);
			},
			A2(
				_mgold$elm_random_pcg$Random_Pcg$int,
				0,
				_elm_lang$core$List$length(xs) - 1));
	};
}();
var _mgold$elm_random_pcg$Random_Pcg$float = F2(
	function (min, max) {
		return _mgold$elm_random_pcg$Random_Pcg$Generator(
			function (seed0) {
				var range = _elm_lang$core$Basics$abs(max - min);
				var n0 = _mgold$elm_random_pcg$Random_Pcg$peel(seed0);
				var hi = _elm_lang$core$Basics$toFloat(67108863 & n0) * 1.0;
				var seed1 = _mgold$elm_random_pcg$Random_Pcg$next(seed0);
				var n1 = _mgold$elm_random_pcg$Random_Pcg$peel(seed1);
				var lo = _elm_lang$core$Basics$toFloat(134217727 & n1) * 1.0;
				var val = ((hi * _mgold$elm_random_pcg$Random_Pcg$bit27) + lo) / _mgold$elm_random_pcg$Random_Pcg$bit53;
				var scaled = (val * range) + min;
				return {
					ctor: '_Tuple2',
					_0: scaled,
					_1: _mgold$elm_random_pcg$Random_Pcg$next(seed1)
				};
			});
	});
var _mgold$elm_random_pcg$Random_Pcg$frequency = function (pairs) {
	var pick = F2(
		function (choices, n) {
			pick:
			while (true) {
				var _p67 = choices;
				if ((_p67.ctor === '::') && (_p67._0.ctor === '_Tuple2')) {
					var _p68 = _p67._0._0;
					if (_elm_lang$core$Native_Utils.cmp(n, _p68) < 1) {
						return _p67._0._1;
					} else {
						var _v33 = _p67._1,
							_v34 = n - _p68;
						choices = _v33;
						n = _v34;
						continue pick;
					}
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Random.Pcg',
						{
							start: {line: 682, column: 13},
							end: {line: 690, column: 77}
						},
						_p67)('Empty list passed to Random.Pcg.frequency!');
				}
			}
		});
	var total = _elm_lang$core$List$sum(
		A2(
			_elm_lang$core$List$map,
			function (_p70) {
				return _elm_lang$core$Basics$abs(
					_elm_lang$core$Tuple$first(_p70));
			},
			pairs));
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$andThen,
		pick(pairs),
		A2(_mgold$elm_random_pcg$Random_Pcg$float, 0, total));
};
var _mgold$elm_random_pcg$Random_Pcg$choices = function (gens) {
	return _mgold$elm_random_pcg$Random_Pcg$frequency(
		A2(
			_elm_lang$core$List$map,
			function (g) {
				return {ctor: '_Tuple2', _0: 1, _1: g};
			},
			gens));
};
var _mgold$elm_random_pcg$Random_Pcg$independentSeed = _mgold$elm_random_pcg$Random_Pcg$Generator(
	function (seed0) {
		var gen = A2(_mgold$elm_random_pcg$Random_Pcg$int, 0, 4294967295);
		var _p71 = A2(
			_mgold$elm_random_pcg$Random_Pcg$step,
			A4(
				_mgold$elm_random_pcg$Random_Pcg$map3,
				F3(
					function (v0, v1, v2) {
						return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
					}),
				gen,
				gen,
				gen),
			seed0);
		var state = _p71._0._0;
		var b = _p71._0._1;
		var c = _p71._0._2;
		var seed1 = _p71._1;
		var incr = 1 | (b ^ c);
		return {
			ctor: '_Tuple2',
			_0: seed1,
			_1: _mgold$elm_random_pcg$Random_Pcg$next(
				A2(_mgold$elm_random_pcg$Random_Pcg$Seed, state, incr))
		};
	});
var _mgold$elm_random_pcg$Random_Pcg$fastForward = F2(
	function (delta0, _p72) {
		var _p73 = _p72;
		var _p76 = _p73._1;
		var helper = F6(
			function (accMult, accPlus, curMult, curPlus, delta, repeat) {
				helper:
				while (true) {
					var newDelta = delta >>> 1;
					var curMult_ = A2(_mgold$elm_random_pcg$Random_Pcg$mul32, curMult, curMult);
					var curPlus_ = A2(_mgold$elm_random_pcg$Random_Pcg$mul32, curMult + 1, curPlus);
					var _p74 = _elm_lang$core$Native_Utils.eq(delta & 1, 1) ? {
						ctor: '_Tuple2',
						_0: A2(_mgold$elm_random_pcg$Random_Pcg$mul32, accMult, curMult),
						_1: (A2(_mgold$elm_random_pcg$Random_Pcg$mul32, accPlus, curMult) + curPlus) >>> 0
					} : {ctor: '_Tuple2', _0: accMult, _1: accPlus};
					var accMult_ = _p74._0;
					var accPlus_ = _p74._1;
					if (_elm_lang$core$Native_Utils.eq(newDelta, 0)) {
						if ((_elm_lang$core$Native_Utils.cmp(delta0, 0) < 0) && repeat) {
							var _v36 = accMult_,
								_v37 = accPlus_,
								_v38 = curMult_,
								_v39 = curPlus_,
								_v40 = -1,
								_v41 = false;
							accMult = _v36;
							accPlus = _v37;
							curMult = _v38;
							curPlus = _v39;
							delta = _v40;
							repeat = _v41;
							continue helper;
						} else {
							return {ctor: '_Tuple2', _0: accMult_, _1: accPlus_};
						}
					} else {
						var _v42 = accMult_,
							_v43 = accPlus_,
							_v44 = curMult_,
							_v45 = curPlus_,
							_v46 = newDelta,
							_v47 = repeat;
						accMult = _v42;
						accPlus = _v43;
						curMult = _v44;
						curPlus = _v45;
						delta = _v46;
						repeat = _v47;
						continue helper;
					}
				}
			});
		var _p75 = A6(helper, 1, 0, 1664525, _p76, delta0, true);
		var accMultFinal = _p75._0;
		var accPlusFinal = _p75._1;
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$Seed,
			(A2(_mgold$elm_random_pcg$Random_Pcg$mul32, accMultFinal, _p73._0) + accPlusFinal) >>> 0,
			_p76);
	});
var _mgold$elm_random_pcg$Random_Pcg$fromJson = _elm_lang$core$Json_Decode$oneOf(
	{
		ctor: '::',
		_0: A3(
			_elm_lang$core$Json_Decode$map2,
			_mgold$elm_random_pcg$Random_Pcg$Seed,
			A2(_elm_lang$core$Json_Decode$index, 0, _elm_lang$core$Json_Decode$int),
			A2(_elm_lang$core$Json_Decode$index, 1, _elm_lang$core$Json_Decode$int)),
		_1: {
			ctor: '::',
			_0: A2(_elm_lang$core$Json_Decode$map, _mgold$elm_random_pcg$Random_Pcg$initialSeed, _elm_lang$core$Json_Decode$int),
			_1: {ctor: '[]'}
		}
	});

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
				function (_p7) {
					return A3(_elm_lang$core$Random$onEffects, router, _p5._1, newSeed);
				},
				A2(_elm_lang$core$Platform$sendToApp, router, value));
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
				var _v2 = {ctor: '::', _0: value, _1: list},
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
					{ctor: '[]'},
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
	function (callback, _p56) {
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
var _elm_lang$core$Random$initState = function (seed) {
	var s = A2(_elm_lang$core$Basics$max, seed, 0 - seed);
	var q = (s / (_elm_lang$core$Random$magicNum6 - 1)) | 0;
	var s2 = A2(_elm_lang$core$Basics_ops['%'], q, _elm_lang$core$Random$magicNum7 - 1);
	var s1 = A2(_elm_lang$core$Basics_ops['%'], s, _elm_lang$core$Random$magicNum6 - 1);
	return A2(_elm_lang$core$Random$State, s1 + 1, s2 + 1);
};
var _elm_lang$core$Random$next = function (_p60) {
	var _p61 = _p60;
	var _p63 = _p61._1;
	var _p62 = _p61._0;
	var k2 = (_p63 / _elm_lang$core$Random$magicNum3) | 0;
	var rawState2 = (_elm_lang$core$Random$magicNum4 * (_p63 - (k2 * _elm_lang$core$Random$magicNum3))) - (k2 * _elm_lang$core$Random$magicNum5);
	var newState2 = (_elm_lang$core$Native_Utils.cmp(rawState2, 0) < 0) ? (rawState2 + _elm_lang$core$Random$magicNum7) : rawState2;
	var k1 = (_p62 / _elm_lang$core$Random$magicNum1) | 0;
	var rawState1 = (_elm_lang$core$Random$magicNum0 * (_p62 - (k1 * _elm_lang$core$Random$magicNum1))) - (k1 * _elm_lang$core$Random$magicNum2);
	var newState1 = (_elm_lang$core$Native_Utils.cmp(rawState1, 0) < 0) ? (rawState1 + _elm_lang$core$Random$magicNum6) : rawState1;
	var z = newState1 - newState2;
	var newZ = (_elm_lang$core$Native_Utils.cmp(z, 1) < 0) ? (z + _elm_lang$core$Random$magicNum8) : z;
	return {
		ctor: '_Tuple2',
		_0: newZ,
		_1: A2(_elm_lang$core$Random$State, newState1, newState2)
	};
};
var _elm_lang$core$Random$split = function (_p64) {
	var _p65 = _p64;
	var _p68 = _p65._1;
	var _p67 = _p65._0;
	var _p66 = _elm_lang$core$Tuple$second(
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
								var nextState = _p72._1;
								var _v27 = n - 1,
									_v28 = x + (acc * base),
									_v29 = nextState;
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
				var nextState = _p74._1;
				return {
					ctor: '_Tuple2',
					_0: lo + A2(_elm_lang$core$Basics_ops['%'], v, k),
					_1: _elm_lang$core$Random$Seed(
						_elm_lang$core$Native_Utils.update(
							_p75,
							{state: nextState}))
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
	function (t) {
		return _elm_lang$core$Task$succeed(
			_elm_lang$core$Random$initialSeed(
				_elm_lang$core$Basics$round(t)));
	},
	_elm_lang$core$Time$now);
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

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
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
		return {ctor: '[]'};
	} else {
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _p4,
				_2: _p5
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: _p4, _1: _p3._0},
						_1: _p3._1,
						_2: _p3._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p5))
		};
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _p9, _1: _p10},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple2',
						_0: _p8._0,
						_1: {ctor: '::', _0: _p9, _1: _p8._1}
					};
				},
				_elm_community$list_extra$List_Extra$select(_p10))
		};
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p11 = list;
		if (_p11.ctor === '::') {
			var _p12 = _p11._0;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: e, _1: _p12},
				_1: {ctor: '::', _0: _p12, _1: _p11._1}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
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
			return {
				ctor: '::',
				_0: {ctor: '[]'},
				_1: A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(e),
					acc)
			};
		}),
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (cmp, xs_) {
		var _p13 = xs_;
		if (_p13.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p13._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p13._0,
						_1: {ctor: '[]'}
					},
					_1: {ctor: '[]'}
				};
			} else {
				var _p15 = _p13._0;
				var _p14 = A2(_elm_community$list_extra$List_Extra$groupWhileTransitively, cmp, _p13._1);
				if (_p14.ctor === '::') {
					return A2(cmp, _p15, _p13._1._0) ? {
						ctor: '::',
						_0: {ctor: '::', _0: _p15, _1: _p14._0},
						_1: _p14._1
					} : {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: _p15,
							_1: {ctor: '[]'}
						},
						_1: _p14
					};
				} else {
					return {ctor: '[]'};
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
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? {ctor: '[]'} : {ctor: '::', _0: x, _1: xs};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p17) {
			var _p18 = _p17;
			var _p19 = _p18._0;
			return (p(x) && _p18._1) ? {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: x, _1: _p19},
				_1: true
			} : {ctor: '_Tuple2', _0: _p19, _1: false};
		});
	return function (_p20) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
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
var _elm_community$list_extra$List_Extra$groupsOfVarying_ = F3(
	function (listOflengths, list, accu) {
		groupsOfVarying_:
		while (true) {
			var _p21 = {ctor: '_Tuple2', _0: listOflengths, _1: list};
			if (((_p21.ctor === '_Tuple2') && (_p21._0.ctor === '::')) && (_p21._1.ctor === '::')) {
				var _p22 = A2(_elm_community$list_extra$List_Extra$splitAt, _p21._0._0, list);
				var head = _p22._0;
				var tail = _p22._1;
				var _v10 = _p21._0._1,
					_v11 = tail,
					_v12 = {ctor: '::', _0: head, _1: accu};
				listOflengths = _v10;
				list = _v11;
				accu = _v12;
				continue groupsOfVarying_;
			} else {
				return _elm_lang$core$List$reverse(accu);
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying = F2(
	function (listOflengths, list) {
		return A3(
			_elm_community$list_extra$List_Extra$groupsOfVarying_,
			listOflengths,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p23 = f(seed);
		if (_p23.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _p23._0._0,
				_1: A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p23._0._1)
			};
		}
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs_) {
		var _p24 = xs_;
		if (_p24.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p24._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: _p24._0,
					_1: {ctor: '[]'}
				};
			} else {
				var _p25 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p24._1);
				if (_p25.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, _p24._0, _p25._0),
						_1: _p25
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs_) {
		var _p26 = xs_;
		if (_p26.ctor === '[]') {
			return {
				ctor: '::',
				_0: acc,
				_1: {ctor: '[]'}
			};
		} else {
			var _p27 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p26._1);
			if (_p27.ctor === '::') {
				return {
					ctor: '::',
					_0: A2(f, _p26._0, _p27._0),
					_1: _p27
				};
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs_) {
		var _p28 = xs_;
		if (_p28.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p28._0, _p28._1);
		}
	});
var _elm_community$list_extra$List_Extra$indexedFoldr = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p29) {
				var _p30 = _p29;
				var _p31 = _p30._0;
				return {
					ctor: '_Tuple2',
					_0: _p31 - 1,
					_1: A3(func, _p31, x, _p30._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$length(list) - 1,
					_1: acc
				},
				list));
	});
var _elm_community$list_extra$List_Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p32) {
				var _p33 = _p32;
				var _p34 = _p33._0;
				return {
					ctor: '_Tuple2',
					_0: _p34 + 1,
					_1: A3(func, _p34, x, _p33._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				step,
				{ctor: '_Tuple2', _0: 0, _1: acc},
				list));
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p35 = m;
						if (_p35.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p35._0);
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
						var _p36 = m;
						if (_p36.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p36._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (l1, l2, acc) {
		interweaveHelp:
		while (true) {
			var _p37 = {ctor: '_Tuple2', _0: l1, _1: l2};
			_v23_1:
			do {
				if (_p37._0.ctor === '::') {
					if (_p37._1.ctor === '::') {
						var _v24 = _p37._0._1,
							_v25 = _p37._1._1,
							_v26 = A2(
							_elm_lang$core$Basics_ops['++'],
							acc,
							{
								ctor: '::',
								_0: _p37._0._0,
								_1: {
									ctor: '::',
									_0: _p37._1._0,
									_1: {ctor: '[]'}
								}
							});
						l1 = _v24;
						l2 = _v25;
						acc = _v26;
						continue interweaveHelp;
					} else {
						break _v23_1;
					}
				} else {
					if (_p37._1.ctor === '[]') {
						break _v23_1;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._1);
					}
				}
			} while(false);
			return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._0);
		}
	});
var _elm_community$list_extra$List_Extra$interweave = F2(
	function (l1, l2) {
		return A3(
			_elm_community$list_extra$List_Extra$interweaveHelp,
			l1,
			l2,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$permutations = function (xs_) {
	var _p38 = xs_;
	if (_p38.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		var f = function (_p39) {
			var _p40 = _p39;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(_p40._0),
				_elm_community$list_extra$List_Extra$permutations(_p40._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p38));
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
	var _p41 = xs;
	if (_p41.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p42 = _p41._0;
		var f = F2(
			function (ys, r) {
				return {
					ctor: '::',
					_0: ys,
					_1: {
						ctor: '::',
						_0: {ctor: '::', _0: _p42, _1: ys},
						_1: r
					}
				};
			});
		return {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _p42,
				_1: {ctor: '[]'}
			},
			_1: A3(
				_elm_lang$core$List$foldr,
				f,
				{ctor: '[]'},
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p41._1))
		};
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return {
		ctor: '::',
		_0: {ctor: '[]'},
		_1: _elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs)
	};
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
		var _p43 = ll;
		if (_p43.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p43._0.ctor === '[]') {
				var _v31 = _p43._1;
				ll = _v31;
				continue transpose;
			} else {
				var _p44 = _p43._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p44);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p44);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p43._0._0, _1: heads},
					_1: _elm_community$list_extra$List_Extra$transpose(
						{ctor: '::', _0: _p43._0._1, _1: tails})
				};
			}
		}
	}
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p45) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p45));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p46) {
				return !pred(_p46);
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
			var _p47 = tail;
			if (_p47.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p47._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$singleton = function (x) {
	return {
		ctor: '::',
		_0: x,
		_1: {ctor: '[]'}
	};
};
var _elm_community$list_extra$List_Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_p49, _p48) {
				var _p50 = _p49;
				var _p51 = _p48;
				var result = A2(pred, _p50._0, _p51._0);
				var _p52 = result;
				if (_p52.ctor === 'EQ') {
					return A2(_elm_lang$core$Basics$compare, _p50._1, _p51._1);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, a) {
					return {ctor: '_Tuple2', _0: a, _1: i};
				}),
			list);
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(_elm_lang$core$List$sortWith, predWithIndex, listWithIndex));
	});
var _elm_community$list_extra$List_Extra$setAt = F3(
	function (index, value, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p53 = tail;
			if (_p53.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$List$append,
						head,
						{ctor: '::', _0: value, _1: _p53._0}));
			}
		}
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p54 = xs;
		if (_p54.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p56 = _p54._1;
			var _p55 = _p54._0;
			return _elm_lang$core$Native_Utils.eq(x, _p55) ? _p56 : {
				ctor: '::',
				_0: _p55,
				_1: A2(_elm_community$list_extra$List_Extra$remove, x, _p56)
			};
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
	return function (_p57) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$filter,
				function (_p58) {
					var _p59 = _p58;
					return p(_p59._1);
				},
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p57)));
	};
};
var _elm_community$list_extra$List_Extra$findIndex = function (p) {
	return function (_p60) {
		return _elm_lang$core$List$head(
			A2(_elm_community$list_extra$List_Extra$findIndices, p, _p60));
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
			var _p61 = list;
			if (_p61.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p62 = _p61._0;
				if (predicate(_p62)) {
					return _elm_lang$core$Maybe$Just(_p62);
				} else {
					var _v40 = predicate,
						_v41 = _p61._1;
					predicate = _v40;
					list = _v41;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p63) {
		return !A2(_elm_lang$core$List$member, x, _p63);
	};
};
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$List$concatMap;
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return {
							ctor: '::',
							_0: A2(f, a, b),
							_1: {ctor: '[]'}
						};
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return {
									ctor: '::',
									_0: A3(f, a, b, c),
									_1: {ctor: '[]'}
								};
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									function (d) {
										return {
											ctor: '::',
											_0: A4(f, a, b, c, d),
											_1: {ctor: '[]'}
										};
									},
									ld);
							},
							lc);
					},
					lb);
			},
			la);
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
			var _p64 = remaining;
			if (_p64.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p66 = _p64._1;
				var _p65 = _p64._0;
				var computedFirst = f(_p65);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v43 = f,
						_v44 = existing,
						_v45 = _p66;
					f = _v43;
					existing = _v44;
					remaining = _v45;
					continue uniqueHelp;
				} else {
					return {
						ctor: '::',
						_0: _p65,
						_1: A3(
							_elm_community$list_extra$List_Extra$uniqueHelp,
							f,
							A2(_elm_lang$core$Set$insert, computedFirst, existing),
							_p66)
					};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A3(_elm_community$list_extra$List_Extra$uniqueHelp, f, _elm_lang$core$Set$empty, list);
	});
var _elm_community$list_extra$List_Extra$allDifferentBy = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(list),
			_elm_lang$core$List$length(
				A2(_elm_community$list_extra$List_Extra$uniqueBy, f, list)));
	});
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A3(_elm_community$list_extra$List_Extra$uniqueHelp, _elm_lang$core$Basics$identity, _elm_lang$core$Set$empty, list);
};
var _elm_community$list_extra$List_Extra$allDifferent = function (list) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$List$length(list),
		_elm_lang$core$List$length(
			_elm_community$list_extra$List_Extra$unique(list)));
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p67 = list;
			if (_p67.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (predicate(_p67._0)) {
					var _v47 = predicate,
						_v48 = _p67._1;
					predicate = _v47;
					list = _v48;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = F2(
	function (predicate, list) {
		var _p68 = list;
		if (_p68.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p69 = _p68._0;
			return predicate(_p69) ? {
				ctor: '::',
				_0: _p69,
				_1: A2(_elm_community$list_extra$List_Extra$takeWhile, predicate, _p68._1)
			} : {ctor: '[]'};
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
		function (_p70) {
			return !p(_p70);
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs_) {
		var _p71 = xs_;
		if (_p71.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p73 = _p71._0;
			var _p72 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p73),
				_p71._1);
			var ys = _p72._0;
			var zs = _p72._1;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: _p73, _1: ys},
				_1: A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs)
			};
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
			function (x, _p74) {
				var _p75 = _p74;
				var _p76 = _p75._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p76) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p75._0, _1: _p76};
			});
		var _p77 = ls;
		if (_p77.ctor === '::') {
			if (_p77._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p77._0);
			} else {
				var _p78 = _p77._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p78,
								_1: f(_p78)
							},
							_p77._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p79) {
				var _p80 = _p79;
				var _p81 = _p80._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p81) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p80._0, _1: _p81};
			});
		var _p82 = ls;
		if (_p82.ctor === '::') {
			if (_p82._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p82._0);
			} else {
				var _p83 = _p82._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p83,
								_1: f(_p83)
							},
							_p82._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p84 = xs;
	if (_p84.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p84._0, _1: _p84._1});
	}
};
var _elm_community$list_extra$List_Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(index1, index2)) {
				return _elm_lang$core$Maybe$Just(l);
			} else {
				if (_elm_lang$core$Native_Utils.cmp(index1, index2) > 0) {
					var _v56 = index2,
						_v57 = index1,
						_v58 = l;
					index1 = _v56;
					index2 = _v57;
					l = _v58;
					continue swapAt;
				} else {
					if (_elm_lang$core$Native_Utils.cmp(index1, 0) < 0) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						var _p85 = A2(_elm_community$list_extra$List_Extra$splitAt, index1, l);
						var part1 = _p85._0;
						var tail1 = _p85._1;
						var _p86 = A2(_elm_community$list_extra$List_Extra$splitAt, index2 - index1, tail1);
						var head2 = _p86._0;
						var tail2 = _p86._1;
						return A3(
							_elm_lang$core$Maybe$map2,
							F2(
								function (_p88, _p87) {
									var _p89 = _p88;
									var _p90 = _p87;
									return _elm_lang$core$List$concat(
										{
											ctor: '::',
											_0: part1,
											_1: {
												ctor: '::',
												_0: {ctor: '::', _0: _p90._0, _1: _p89._1},
												_1: {
													ctor: '::',
													_0: {ctor: '::', _0: _p89._0, _1: _p90._1},
													_1: {ctor: '[]'}
												}
											}
										});
								}),
							_elm_community$list_extra$List_Extra$uncons(head2),
							_elm_community$list_extra$List_Extra$uncons(tail2));
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p91 = f(x);
		if (_p91.ctor === 'Just') {
			return {
				ctor: '::',
				_0: x,
				_1: A2(_elm_community$list_extra$List_Extra$iterate, f, _p91._0)
			};
		} else {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
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
			return function (_p92) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					d,
					A2(_elm_lang$core$Maybe$map, f, _p92));
			};
		});
	return A2(
		_elm_lang$core$List$foldr,
		function (x) {
			return function (_p93) {
				return _elm_lang$core$Maybe$Just(
					A3(
						maybe,
						{ctor: '[]'},
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(x),
						_p93));
			};
		},
		_elm_lang$core$Maybe$Nothing);
}();
var _elm_community$list_extra$List_Extra$last = _elm_community$list_extra$List_Extra$foldl1(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));

var _elm_community$maybe_extra$Maybe_Extra$filter = F2(
	function (f, m) {
		var _p0 = A2(_elm_lang$core$Maybe$map, f, m);
		if ((_p0.ctor === 'Just') && (_p0._0 === true)) {
			return m;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$traverseArray = function (f) {
	var step = F2(
		function (e, acc) {
			var _p1 = f(e);
			if (_p1.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$Array$push(_p1._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$Array$foldl,
		step,
		_elm_lang$core$Maybe$Just(_elm_lang$core$Array$empty));
};
var _elm_community$maybe_extra$Maybe_Extra$combineArray = _elm_community$maybe_extra$Maybe_Extra$traverseArray(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$traverse = function (f) {
	var step = F2(
		function (e, acc) {
			var _p2 = f(e);
			if (_p2.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(_p2._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$List$foldr,
		step,
		_elm_lang$core$Maybe$Just(
			{ctor: '[]'}));
};
var _elm_community$maybe_extra$Maybe_Extra$combine = _elm_community$maybe_extra$Maybe_Extra$traverse(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$maybeToArray = function (m) {
	var _p3 = m;
	if (_p3.ctor === 'Nothing') {
		return _elm_lang$core$Array$empty;
	} else {
		return A2(_elm_lang$core$Array$repeat, 1, _p3._0);
	}
};
var _elm_community$maybe_extra$Maybe_Extra$maybeToList = function (m) {
	var _p4 = m;
	if (_p4.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		return {
			ctor: '::',
			_0: _p4._0,
			_1: {ctor: '[]'}
		};
	}
};
var _elm_community$maybe_extra$Maybe_Extra$orElse = F2(
	function (ma, mb) {
		var _p5 = mb;
		if (_p5.ctor === 'Nothing') {
			return ma;
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orElseLazy = F2(
	function (fma, mb) {
		var _p6 = mb;
		if (_p6.ctor === 'Nothing') {
			return fma(
				{ctor: '_Tuple0'});
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orLazy = F2(
	function (ma, fmb) {
		var _p7 = ma;
		if (_p7.ctor === 'Nothing') {
			return fmb(
				{ctor: '_Tuple0'});
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$or = F2(
	function (ma, mb) {
		var _p8 = ma;
		if (_p8.ctor === 'Nothing') {
			return mb;
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$prev = _elm_lang$core$Maybe$map2(_elm_lang$core$Basics$always);
var _elm_community$maybe_extra$Maybe_Extra$next = _elm_lang$core$Maybe$map2(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));
var _elm_community$maybe_extra$Maybe_Extra$andMap = _elm_lang$core$Maybe$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _elm_community$maybe_extra$Maybe_Extra$unpack = F3(
	function (d, f, m) {
		var _p9 = m;
		if (_p9.ctor === 'Nothing') {
			return d(
				{ctor: '_Tuple0'});
		} else {
			return f(_p9._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$unwrap = F3(
	function (d, f, m) {
		var _p10 = m;
		if (_p10.ctor === 'Nothing') {
			return d;
		} else {
			return f(_p10._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$isJust = function (m) {
	var _p11 = m;
	if (_p11.ctor === 'Nothing') {
		return false;
	} else {
		return true;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$isNothing = function (m) {
	var _p12 = m;
	if (_p12.ctor === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$join = function (mx) {
	var _p13 = mx;
	if (_p13.ctor === 'Just') {
		return _p13._0;
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_community$maybe_extra$Maybe_Extra_ops = _elm_community$maybe_extra$Maybe_Extra_ops || {};
_elm_community$maybe_extra$Maybe_Extra_ops['?'] = F2(
	function (mx, x) {
		return A2(_elm_lang$core$Maybe$withDefault, x, mx);
	});

var _elm_community$random_extra$Random_Extra$andThen6 = F7(
	function (constructor, generatorA, generatorB, generatorC, generatorD, generatorE, generatorF) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Random$andThen,
											function (e) {
												return A2(
													_elm_lang$core$Random$andThen,
													function (f) {
														return A6(constructor, a, b, c, d, e, f);
													},
													generatorF);
											},
											generatorE);
									},
									generatorD);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen5 = F6(
	function (constructor, generatorA, generatorB, generatorC, generatorD, generatorE) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Random$andThen,
											function (e) {
												return A5(constructor, a, b, c, d, e);
											},
											generatorE);
									},
									generatorD);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen4 = F5(
	function (constructor, generatorA, generatorB, generatorC, generatorD) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Random$andThen,
									function (d) {
										return A4(constructor, a, b, c, d);
									},
									generatorD);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen3 = F4(
	function (constructor, generatorA, generatorB, generatorC) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Random$andThen,
							function (c) {
								return A3(constructor, a, b, c);
							},
							generatorC);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$andThen2 = F3(
	function (constructor, generatorA, generatorB) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Random$andThen,
					function (b) {
						return A2(constructor, a, b);
					},
					generatorB);
			},
			generatorA);
	});
var _elm_community$random_extra$Random_Extra$rangeLengthList = F3(
	function (minLength, maxLength, generator) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (len) {
				return A2(_elm_lang$core$Random$list, len, generator);
			},
			A2(_elm_lang$core$Random$int, minLength, maxLength));
	});
var _elm_community$random_extra$Random_Extra$result = F3(
	function (genBool, genErr, genVal) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (b) {
				return b ? A2(_elm_lang$core$Random$map, _elm_lang$core$Result$Ok, genVal) : A2(_elm_lang$core$Random$map, _elm_lang$core$Result$Err, genErr);
			},
			genBool);
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
							start: {line: 154, column: 13},
							end: {line: 162, column: 79}
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
					_elm_lang$core$Tuple$first(_p4));
			},
			pairs));
	return A2(
		_elm_lang$core$Random$andThen,
		pick(pairs),
		A2(_elm_lang$core$Random$float, 0, total));
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
	function (generator, funcGenerator) {
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
			generatorF,
			A6(_elm_lang$core$Random$map5, f, generatorA, generatorB, generatorC, generatorD, generatorE));
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
			function (a) {
				return predicate(a) ? _elm_community$random_extra$Random_Extra$constant(a) : A2(_elm_community$random_extra$Random_Extra$filter, predicate, generator);
			},
			generator);
	});
var _elm_community$random_extra$Random_Extra$combine = function (generators) {
	var _p6 = generators;
	if (_p6.ctor === '[]') {
		return _elm_community$random_extra$Random_Extra$constant(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Random$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p6._0,
			_elm_community$random_extra$Random_Extra$combine(_p6._1));
	}
};
var _elm_community$random_extra$Random_Extra$maybe = F2(
	function (genBool, genA) {
		return A2(
			_elm_lang$core$Random$andThen,
			function (b) {
				return b ? A2(_elm_lang$core$Random$map, _elm_lang$core$Maybe$Just, genA) : _elm_community$random_extra$Random_Extra$constant(_elm_lang$core$Maybe$Nothing);
			},
			genBool);
	});

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
			index: arguments[arguments.length - 2],
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
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
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

var _elm_community$string_extra$String_Extra$replacementCodePoint = 65533;
var _elm_community$string_extra$String_Extra$toCodePoints = function (string) {
	var allCodeUnits = A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Char$toCode,
		_elm_lang$core$String$toList(string));
	var combineAndReverse = F2(
		function (codeUnits, accumulated) {
			combineAndReverse:
			while (true) {
				var _p0 = codeUnits;
				if (_p0.ctor === '[]') {
					return accumulated;
				} else {
					var _p4 = _p0._0;
					var _p3 = _p0._1;
					if ((_elm_lang$core$Native_Utils.cmp(_p4, 0) > -1) && (_elm_lang$core$Native_Utils.cmp(_p4, 55295) < 1)) {
						var _v1 = _p3,
							_v2 = {ctor: '::', _0: _p4, _1: accumulated};
						codeUnits = _v1;
						accumulated = _v2;
						continue combineAndReverse;
					} else {
						if ((_elm_lang$core$Native_Utils.cmp(_p4, 55296) > -1) && (_elm_lang$core$Native_Utils.cmp(_p4, 56319) < 1)) {
							var _p1 = _p3;
							if (_p1.ctor === '[]') {
								return {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
							} else {
								var _p2 = _p1._0;
								if ((_elm_lang$core$Native_Utils.cmp(_p2, 56320) > -1) && (_elm_lang$core$Native_Utils.cmp(_p2, 57343) < 1)) {
									var codePoint = (65536 + ((_p4 - 55296) * 1024)) + (_p2 - 56320);
									var _v4 = _p1._1,
										_v5 = {ctor: '::', _0: codePoint, _1: accumulated};
									codeUnits = _v4;
									accumulated = _v5;
									continue combineAndReverse;
								} else {
									var _v6 = _p3,
										_v7 = {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
									codeUnits = _v6;
									accumulated = _v7;
									continue combineAndReverse;
								}
							}
						} else {
							if ((_elm_lang$core$Native_Utils.cmp(_p4, 57344) > -1) && (_elm_lang$core$Native_Utils.cmp(_p4, 65535) < 1)) {
								var _v8 = _p3,
									_v9 = {ctor: '::', _0: _p4, _1: accumulated};
								codeUnits = _v8;
								accumulated = _v9;
								continue combineAndReverse;
							} else {
								var _v10 = _p3,
									_v11 = {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
								codeUnits = _v10;
								accumulated = _v11;
								continue combineAndReverse;
							}
						}
					}
				}
			}
		});
	return _elm_lang$core$List$reverse(
		A2(
			combineAndReverse,
			allCodeUnits,
			{ctor: '[]'}));
};
var _elm_community$string_extra$String_Extra$fromCodePoints = function (allCodePoints) {
	var splitAndReverse = F2(
		function (codePoints, accumulated) {
			splitAndReverse:
			while (true) {
				var _p5 = codePoints;
				if (_p5.ctor === '[]') {
					return accumulated;
				} else {
					var _p7 = _p5._1;
					var _p6 = _p5._0;
					if ((_elm_lang$core$Native_Utils.cmp(_p6, 0) > -1) && (_elm_lang$core$Native_Utils.cmp(_p6, 55295) < 1)) {
						var _v13 = _p7,
							_v14 = {ctor: '::', _0: _p6, _1: accumulated};
						codePoints = _v13;
						accumulated = _v14;
						continue splitAndReverse;
					} else {
						if ((_elm_lang$core$Native_Utils.cmp(_p6, 65536) > -1) && (_elm_lang$core$Native_Utils.cmp(_p6, 1114111) < 1)) {
							var subtracted = _p6 - 65536;
							var leading = (subtracted >> 10) + 55296;
							var trailing = (subtracted & 1023) + 56320;
							var _v15 = _p7,
								_v16 = {
								ctor: '::',
								_0: trailing,
								_1: {ctor: '::', _0: leading, _1: accumulated}
							};
							codePoints = _v15;
							accumulated = _v16;
							continue splitAndReverse;
						} else {
							if ((_elm_lang$core$Native_Utils.cmp(_p6, 57344) > -1) && (_elm_lang$core$Native_Utils.cmp(_p6, 65535) < 1)) {
								var _v17 = _p7,
									_v18 = {ctor: '::', _0: _p6, _1: accumulated};
								codePoints = _v17;
								accumulated = _v18;
								continue splitAndReverse;
							} else {
								var _v19 = _p7,
									_v20 = {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
								codePoints = _v19;
								accumulated = _v20;
								continue splitAndReverse;
							}
						}
					}
				}
			}
		});
	var allCodeUnits = _elm_lang$core$List$reverse(
		A2(
			splitAndReverse,
			allCodePoints,
			{ctor: '[]'}));
	return _elm_lang$core$String$fromList(
		A2(_elm_lang$core$List$map, _elm_lang$core$Char$fromCode, allCodeUnits));
};
var _elm_community$string_extra$String_Extra$fromFloat = _elm_lang$core$Basics$toString;
var _elm_community$string_extra$String_Extra$fromInt = _elm_lang$core$Basics$toString;
var _elm_community$string_extra$String_Extra$leftOfBack = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				A2(_elm_lang$core$Basics$flip, _elm_lang$core$String$left, string),
				_elm_lang$core$List$head(
					_elm_lang$core$List$reverse(
						A2(_elm_lang$core$String$indexes, pattern, string)))));
	});
var _elm_community$string_extra$String_Extra$rightOfBack = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				function (_p8) {
					return A3(
						_elm_lang$core$Basics$flip,
						_elm_lang$core$String$dropLeft,
						string,
						A2(
							F2(
								function (x, y) {
									return x + y;
								}),
							_elm_lang$core$String$length(pattern),
							_p8));
				},
				_elm_lang$core$List$head(
					_elm_lang$core$List$reverse(
						A2(_elm_lang$core$String$indexes, pattern, string)))));
	});
var _elm_community$string_extra$String_Extra$firstResultHelp = F2(
	function ($default, list) {
		firstResultHelp:
		while (true) {
			var _p9 = list;
			if (_p9.ctor === '[]') {
				return $default;
			} else {
				if (_p9._0.ctor === 'Just') {
					return _p9._0._0;
				} else {
					var _v22 = $default,
						_v23 = _p9._1;
					$default = _v22;
					list = _v23;
					continue firstResultHelp;
				}
			}
		}
	});
var _elm_community$string_extra$String_Extra$firstResult = function (list) {
	return A2(_elm_community$string_extra$String_Extra$firstResultHelp, '', list);
};
var _elm_community$string_extra$String_Extra$leftOf = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$String$join,
			'',
			A2(
				_elm_lang$core$List$map,
				function (_p10) {
					return _elm_community$string_extra$String_Extra$firstResult(
						function (_) {
							return _.submatches;
						}(_p10));
				},
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'^(.*?)',
							_elm_lang$core$Regex$escape(pattern))),
					string)));
	});
var _elm_community$string_extra$String_Extra$rightOf = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$String$join,
			'',
			A2(
				_elm_lang$core$List$map,
				function (_p11) {
					return _elm_community$string_extra$String_Extra$firstResult(
						function (_) {
							return _.submatches;
						}(_p11));
				},
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Regex$escape(pattern),
							'(.*)$')),
					string)));
	});
var _elm_community$string_extra$String_Extra$stripTags = function (string) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('<\\/?[^>]+>'),
		_elm_lang$core$Basics$always(''),
		string);
};
var _elm_community$string_extra$String_Extra$toSentenceHelper = F3(
	function (lastPart, sentence, list) {
		toSentenceHelper:
		while (true) {
			var _p12 = list;
			if (_p12.ctor === '[]') {
				return sentence;
			} else {
				if (_p12._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						sentence,
						A2(_elm_lang$core$Basics_ops['++'], lastPart, _p12._0));
				} else {
					var _v25 = lastPart,
						_v26 = A2(
						_elm_lang$core$Basics_ops['++'],
						sentence,
						A2(_elm_lang$core$Basics_ops['++'], ', ', _p12._0)),
						_v27 = _p12._1;
					lastPart = _v25;
					sentence = _v26;
					list = _v27;
					continue toSentenceHelper;
				}
			}
		}
	});
var _elm_community$string_extra$String_Extra$toSentenceBaseCase = function (list) {
	var _p13 = list;
	_v28_2:
	do {
		if (_p13.ctor === '::') {
			if (_p13._1.ctor === '[]') {
				return _p13._0;
			} else {
				if (_p13._1._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_p13._0,
						A2(_elm_lang$core$Basics_ops['++'], ' and ', _p13._1._0));
				} else {
					break _v28_2;
				}
			}
		} else {
			break _v28_2;
		}
	} while(false);
	return '';
};
var _elm_community$string_extra$String_Extra$toSentenceOxford = function (list) {
	var _p14 = list;
	if (((_p14.ctor === '::') && (_p14._1.ctor === '::')) && (_p14._1._1.ctor === '::')) {
		return A3(
			_elm_community$string_extra$String_Extra$toSentenceHelper,
			', and ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p14._0,
				A2(_elm_lang$core$Basics_ops['++'], ', ', _p14._1._0)),
			{ctor: '::', _0: _p14._1._1._0, _1: _p14._1._1._1});
	} else {
		return _elm_community$string_extra$String_Extra$toSentenceBaseCase(list);
	}
};
var _elm_community$string_extra$String_Extra$toSentence = function (list) {
	var _p15 = list;
	if (((_p15.ctor === '::') && (_p15._1.ctor === '::')) && (_p15._1._1.ctor === '::')) {
		return A3(
			_elm_community$string_extra$String_Extra$toSentenceHelper,
			' and ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p15._0,
				A2(_elm_lang$core$Basics_ops['++'], ', ', _p15._1._0)),
			{ctor: '::', _0: _p15._1._1._0, _1: _p15._1._1._1});
	} else {
		return _elm_community$string_extra$String_Extra$toSentenceBaseCase(list);
	}
};
var _elm_community$string_extra$String_Extra$ellipsisWith = F3(
	function (howLong, append, string) {
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$String$length(string),
			howLong) < 1) ? string : A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$String$left,
				howLong - _elm_lang$core$String$length(append),
				string),
			append);
	});
var _elm_community$string_extra$String_Extra$ellipsis = F2(
	function (howLong, string) {
		return A3(_elm_community$string_extra$String_Extra$ellipsisWith, howLong, '...', string);
	});
var _elm_community$string_extra$String_Extra$countOccurrences = F2(
	function (needle, haystack) {
		return (_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(needle),
			0) || _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(haystack),
			0)) ? 0 : _elm_lang$core$List$length(
			A2(_elm_lang$core$String$indexes, needle, haystack));
	});
var _elm_community$string_extra$String_Extra$unindent = function (multilineSting) {
	var isNotWhitespace = function ($char) {
		return (!_elm_lang$core$Native_Utils.eq(
			$char,
			_elm_lang$core$Native_Utils.chr(' '))) && (!_elm_lang$core$Native_Utils.eq(
			$char,
			_elm_lang$core$Native_Utils.chr('\t')));
	};
	var countLeadingWhitespace = F2(
		function (count, line) {
			countLeadingWhitespace:
			while (true) {
				var _p16 = _elm_lang$core$String$uncons(line);
				if (_p16.ctor === 'Nothing') {
					return count;
				} else {
					var _p18 = _p16._0._1;
					var _p17 = _p16._0._0;
					switch (_p17.valueOf()) {
						case ' ':
							var _v33 = count + 1,
								_v34 = _p18;
							count = _v33;
							line = _v34;
							continue countLeadingWhitespace;
						case '\t':
							var _v35 = count + 1,
								_v36 = _p18;
							count = _v35;
							line = _v36;
							continue countLeadingWhitespace;
						default:
							return count;
					}
				}
			}
		});
	var lines = _elm_lang$core$String$lines(multilineSting);
	var minLead = A2(
		_elm_lang$core$Maybe$withDefault,
		0,
		_elm_lang$core$List$minimum(
			A2(
				_elm_lang$core$List$map,
				countLeadingWhitespace(0),
				A2(
					_elm_lang$core$List$filter,
					_elm_lang$core$String$any(isNotWhitespace),
					lines))));
	return A2(
		_elm_lang$core$String$join,
		'\n',
		A2(
			_elm_lang$core$List$map,
			_elm_lang$core$String$dropLeft(minLead),
			lines));
};
var _elm_community$string_extra$String_Extra$dasherize = function (string) {
	return _elm_lang$core$String$toLower(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('[_-\\s]+'),
			_elm_lang$core$Basics$always('-'),
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('([A-Z])'),
				function (_p19) {
					return A2(
						_elm_lang$core$String$append,
						'-',
						function (_) {
							return _.match;
						}(_p19));
				},
				_elm_lang$core$String$trim(string))));
};
var _elm_community$string_extra$String_Extra$underscored = function (string) {
	return _elm_lang$core$String$toLower(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('[_-\\s]+'),
			_elm_lang$core$Basics$always('_'),
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('([a-z\\d])([A-Z]+)'),
				function (_p20) {
					return A2(
						_elm_lang$core$String$join,
						'_',
						A2(
							_elm_lang$core$List$filterMap,
							_elm_lang$core$Basics$identity,
							function (_) {
								return _.submatches;
							}(_p20)));
				},
				_elm_lang$core$String$trim(string))));
};
var _elm_community$string_extra$String_Extra$unsurround = F2(
	function (wrap, string) {
		if (A2(_elm_lang$core$String$startsWith, wrap, string) && A2(_elm_lang$core$String$endsWith, wrap, string)) {
			var length = _elm_lang$core$String$length(wrap);
			return A2(
				_elm_lang$core$String$dropRight,
				length,
				A2(_elm_lang$core$String$dropLeft, length, string));
		} else {
			return string;
		}
	});
var _elm_community$string_extra$String_Extra$unquote = function (string) {
	return A2(_elm_community$string_extra$String_Extra$unsurround, '\"', string);
};
var _elm_community$string_extra$String_Extra$surround = F2(
	function (wrap, string) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			wrap,
			A2(_elm_lang$core$Basics_ops['++'], string, wrap));
	});
var _elm_community$string_extra$String_Extra$quote = function (string) {
	return A2(_elm_community$string_extra$String_Extra$surround, '\"', string);
};
var _elm_community$string_extra$String_Extra$camelize = function (string) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('[-_\\s]+(.)?'),
		function (_p21) {
			var _p22 = _p21;
			var _p23 = _p22.submatches;
			if ((_p23.ctor === '::') && (_p23._0.ctor === 'Just')) {
				return _elm_lang$core$String$toUpper(_p23._0._0);
			} else {
				return '';
			}
		},
		_elm_lang$core$String$trim(string));
};
var _elm_community$string_extra$String_Extra$isBlank = function (string) {
	return A2(
		_elm_lang$core$Regex$contains,
		_elm_lang$core$Regex$regex('^\\s*$'),
		string);
};
var _elm_community$string_extra$String_Extra$clean = function (string) {
	return _elm_lang$core$String$trim(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('\\s\\s+'),
			_elm_lang$core$Basics$always(' '),
			string));
};
var _elm_community$string_extra$String_Extra$softBreakRegexp = function (width) {
	return _elm_lang$core$Regex$regex(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'.{1,',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(width),
				'}(\\s+|$)|\\S+?(\\s+|$)')));
};
var _elm_community$string_extra$String_Extra$softEllipsis = F2(
	function (howLong, string) {
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$String$length(string),
			howLong) < 1) ? string : A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$String$append,
			'...',
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('([\\.,;:\\s])+$'),
				_elm_lang$core$Basics$always(''),
				A2(
					_elm_lang$core$String$join,
					'',
					A2(
						_elm_lang$core$List$map,
						function (_) {
							return _.match;
						},
						A3(
							_elm_lang$core$Regex$find,
							_elm_lang$core$Regex$AtMost(1),
							_elm_community$string_extra$String_Extra$softBreakRegexp(howLong),
							string)))));
	});
var _elm_community$string_extra$String_Extra$softBreak = F2(
	function (width, string) {
		return (_elm_lang$core$Native_Utils.cmp(width, 0) < 1) ? {ctor: '[]'} : A2(
			_elm_lang$core$List$map,
			function (_) {
				return _.match;
			},
			A3(
				_elm_lang$core$Regex$find,
				_elm_lang$core$Regex$All,
				_elm_community$string_extra$String_Extra$softBreakRegexp(width),
				string));
	});
var _elm_community$string_extra$String_Extra$softWrapWith = F3(
	function (width, separator, string) {
		return A2(
			_elm_lang$core$String$join,
			separator,
			A2(_elm_community$string_extra$String_Extra$softBreak, width, string));
	});
var _elm_community$string_extra$String_Extra$softWrap = F2(
	function (width, string) {
		return A3(_elm_community$string_extra$String_Extra$softWrapWith, width, '\n', string);
	});
var _elm_community$string_extra$String_Extra$breaker = F3(
	function (width, string, acc) {
		breaker:
		while (true) {
			var _p24 = string;
			if (_p24 === '') {
				return _elm_lang$core$List$reverse(acc);
			} else {
				var _v40 = width,
					_v41 = A2(_elm_lang$core$String$dropLeft, width, string),
					_v42 = {
					ctor: '::',
					_0: A3(_elm_lang$core$String$slice, 0, width, string),
					_1: acc
				};
				width = _v40;
				string = _v41;
				acc = _v42;
				continue breaker;
			}
		}
	});
var _elm_community$string_extra$String_Extra$break = F2(
	function (width, string) {
		return (_elm_lang$core$Native_Utils.eq(width, 0) || _elm_lang$core$Native_Utils.eq(string, '')) ? {
			ctor: '::',
			_0: string,
			_1: {ctor: '[]'}
		} : A3(
			_elm_community$string_extra$String_Extra$breaker,
			width,
			string,
			{ctor: '[]'});
	});
var _elm_community$string_extra$String_Extra$wrapWith = F3(
	function (width, separator, string) {
		return A2(
			_elm_lang$core$String$join,
			separator,
			A2(_elm_community$string_extra$String_Extra$break, width, string));
	});
var _elm_community$string_extra$String_Extra$wrap = F2(
	function (width, string) {
		return A3(_elm_community$string_extra$String_Extra$wrapWith, width, '\n', string);
	});
var _elm_community$string_extra$String_Extra$replaceSlice = F4(
	function (substitution, start, end, string) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A3(_elm_lang$core$String$slice, 0, start, string),
			A2(
				_elm_lang$core$Basics_ops['++'],
				substitution,
				A3(
					_elm_lang$core$String$slice,
					end,
					_elm_lang$core$String$length(string),
					string)));
	});
var _elm_community$string_extra$String_Extra$insertAt = F3(
	function (insert, pos, string) {
		return A4(_elm_community$string_extra$String_Extra$replaceSlice, insert, pos, pos, string);
	});
var _elm_community$string_extra$String_Extra$replace = F3(
	function (search, substitution, string) {
		return A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex(
				_elm_lang$core$Regex$escape(search)),
			function (_p25) {
				return substitution;
			},
			string);
	});
var _elm_community$string_extra$String_Extra$changeCase = F2(
	function (mutator, word) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				function (_p26) {
					var _p27 = _p26;
					return A2(
						_elm_lang$core$String$cons,
						mutator(_p27._0),
						_p27._1);
				},
				_elm_lang$core$String$uncons(word)));
	});
var _elm_community$string_extra$String_Extra$toSentenceCase = function (word) {
	return A2(_elm_community$string_extra$String_Extra$changeCase, _elm_lang$core$Char$toUpper, word);
};
var _elm_community$string_extra$String_Extra$toTitleCase = function (ws) {
	var uppercaseMatch = A3(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('\\w+'),
		function (_p28) {
			return _elm_community$string_extra$String_Extra$toSentenceCase(
				function (_) {
					return _.match;
				}(_p28));
		});
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('^([a-z])|\\s+([a-z])'),
		function (_p29) {
			return uppercaseMatch(
				function (_) {
					return _.match;
				}(_p29));
		},
		ws);
};
var _elm_community$string_extra$String_Extra$classify = function (string) {
	return _elm_community$string_extra$String_Extra$toSentenceCase(
		A3(
			_elm_community$string_extra$String_Extra$replace,
			' ',
			'',
			_elm_community$string_extra$String_Extra$camelize(
				A4(
					_elm_lang$core$Regex$replace,
					_elm_lang$core$Regex$All,
					_elm_lang$core$Regex$regex('[\\W_]'),
					_elm_lang$core$Basics$always(' '),
					string))));
};
var _elm_community$string_extra$String_Extra$humanize = function (string) {
	return _elm_community$string_extra$String_Extra$toSentenceCase(
		_elm_lang$core$String$toLower(
			_elm_lang$core$String$trim(
				A4(
					_elm_lang$core$Regex$replace,
					_elm_lang$core$Regex$All,
					_elm_lang$core$Regex$regex('_id$|[-_\\s]+'),
					_elm_lang$core$Basics$always(' '),
					A4(
						_elm_lang$core$Regex$replace,
						_elm_lang$core$Regex$All,
						_elm_lang$core$Regex$regex('[A-Z]'),
						function (_p30) {
							return A2(
								_elm_lang$core$String$append,
								'-',
								function (_) {
									return _.match;
								}(_p30));
						},
						string)))));
};
var _elm_community$string_extra$String_Extra$decapitalize = function (word) {
	return A2(_elm_community$string_extra$String_Extra$changeCase, _elm_lang$core$Char$toLower, word);
};

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

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

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


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
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
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


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


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

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

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
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
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
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
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


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

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

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { callback(); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


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
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
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
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
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

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
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
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
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

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
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
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
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
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
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
var _elm_lang$html$Html_Attributes$type_ = function (value) {
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
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
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
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
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
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
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
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
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

var _elm_lang$html$Html_Lazy$lazy3 = _elm_lang$virtual_dom$VirtualDom$lazy3;
var _elm_lang$html$Html_Lazy$lazy2 = _elm_lang$virtual_dom$VirtualDom$lazy2;
var _elm_lang$html$Html_Lazy$lazy = _elm_lang$virtual_dom$VirtualDom$lazy;

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
				function (_p3) {
					return _elm_lang$core$Task$succeed(state);
				},
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p2._0.taggers)));
		}
	});
var _elm_lang$keyboard$Keyboard_ops = _elm_lang$keyboard$Keyboard_ops || {};
_elm_lang$keyboard$Keyboard_ops['&>'] = F2(
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p4) {
				return task2;
			},
			task1);
	});
var _elm_lang$keyboard$Keyboard$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$keyboard$Keyboard$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p5 = maybeValues;
		if (_p5.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: value,
					_1: {ctor: '[]'}
				});
		} else {
			return _elm_lang$core$Maybe$Just(
				{ctor: '::', _0: value, _1: _p5._0});
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
var _elm_lang$keyboard$Keyboard$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
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
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, pid),
										state));
							},
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
									})));
					},
					task);
			});
		var bothStep = F4(
			function (category, _p8, taggers, task) {
				var _p9 = _p8;
				return A2(
					_elm_lang$core$Task$map,
					A2(
						_elm_lang$core$Dict$insert,
						category,
						A2(_elm_lang$keyboard$Keyboard$Watcher, taggers, _p9.pid)),
					task);
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

var _elm_lang$mouse$Mouse_ops = _elm_lang$mouse$Mouse_ops || {};
_elm_lang$mouse$Mouse_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return t2;
			},
			t1);
	});
var _elm_lang$mouse$Mouse$onSelfMsg = F3(
	function (router, _p1, state) {
		var _p2 = _p1;
		var _p3 = A2(_elm_lang$core$Dict$get, _p2.category, state);
		if (_p3.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p2.position));
			};
			return A2(
				_elm_lang$mouse$Mouse_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p3._0.taggers)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$mouse$Mouse$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$mouse$Mouse$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p4 = maybeValues;
		if (_p4.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: value,
					_1: {ctor: '[]'}
				});
		} else {
			return _elm_lang$core$Maybe$Just(
				{ctor: '::', _0: value, _1: _p4._0});
		}
	});
var _elm_lang$mouse$Mouse$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p5 = subs;
			if (_p5.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p5._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p5._0._0,
					_elm_lang$mouse$Mouse$categorizeHelpHelp(_p5._0._1),
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
	_elm_lang$core$Json_Decode$map2,
	_elm_lang$mouse$Mouse$Position,
	A2(_elm_lang$core$Json_Decode$field, 'pageX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'pageY', _elm_lang$core$Json_Decode$int));
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
				var tracker = A3(
					_elm_lang$dom$Dom_LowLevel$onDocument,
					category,
					_elm_lang$mouse$Mouse$position,
					function (_p6) {
						return A2(
							_elm_lang$core$Platform$sendToSelf,
							router,
							A2(_elm_lang$mouse$Mouse$Msg, category, _p6));
					});
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$mouse$Mouse$Watcher, taggers, pid),
										state));
							},
							_elm_lang$core$Process$spawn(tracker));
					},
					task);
			});
		var bothStep = F4(
			function (category, _p7, taggers, task) {
				var _p8 = _p7;
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$core$Dict$insert,
								category,
								A2(_elm_lang$mouse$Mouse$Watcher, taggers, _p8.pid),
								state));
					},
					task);
			});
		var leftStep = F3(
			function (category, _p9, task) {
				var _p10 = _p9;
				return A2(
					_elm_lang$mouse$Mouse_ops['&>'],
					_elm_lang$core$Process$kill(_p10.pid),
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
	function (func, _p11) {
		var _p12 = _p11;
		return A2(
			_elm_lang$mouse$Mouse$MySub,
			_p12._0,
			function (_p13) {
				return func(
					_p12._1(_p13));
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
			function (_p1) {
				return task2;
			},
			task1);
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
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$pushState(_p4._0));
			default:
				return A2(
					_elm_lang$core$Task$andThen,
					A2(_elm_lang$navigation$Navigation$notify, router, subs),
					_elm_lang$navigation$Navigation$replaceState(_p4._0));
		}
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
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing));
var _elm_lang$navigation$Navigation$onEffects = F4(
	function (router, cmds, subs, _p5) {
		var _p6 = _p5;
		var _p9 = _p6.process;
		var stepState = function () {
			var _p7 = {ctor: '_Tuple2', _0: subs, _1: _p9};
			_v3_2:
			do {
				if (_p7._0.ctor === '[]') {
					if (_p7._1.ctor === 'Just') {
						return A2(
							_elm_lang$navigation$Navigation_ops['&>'],
							_elm_lang$core$Process$kill(_p7._1._0),
							_elm_lang$core$Task$succeed(
								A2(_elm_lang$navigation$Navigation$State, subs, _elm_lang$core$Maybe$Nothing)));
					} else {
						break _v3_2;
					}
				} else {
					if (_p7._1.ctor === 'Nothing') {
						return A2(
							_elm_lang$core$Task$map,
							function (_p8) {
								return A2(
									_elm_lang$navigation$Navigation$State,
									subs,
									_elm_lang$core$Maybe$Just(_p8));
							},
							_elm_lang$navigation$Navigation$spawnPopState(router));
					} else {
						break _v3_2;
					}
				}
			} while(false);
			return _elm_lang$core$Task$succeed(
				A2(_elm_lang$navigation$Navigation$State, subs, _p9));
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
	function (_p10, myCmd) {
		var _p11 = myCmd;
		switch (_p11.ctor) {
			case 'Jump':
				return _elm_lang$navigation$Navigation$Jump(_p11._0);
			case 'New':
				return _elm_lang$navigation$Navigation$New(_p11._0);
			default:
				return _elm_lang$navigation$Navigation$Modify(_p11._0);
		}
	});
var _elm_lang$navigation$Navigation$Monitor = function (a) {
	return {ctor: 'Monitor', _0: a};
};
var _elm_lang$navigation$Navigation$program = F2(
	function (locationToMessage, stuff) {
		var init = stuff.init(
			_elm_lang$navigation$Native_Navigation.getLocation(
				{ctor: '_Tuple0'}));
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$program(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$programWithFlags = F2(
	function (locationToMessage, stuff) {
		var init = function (flags) {
			return A2(
				stuff.init,
				flags,
				_elm_lang$navigation$Native_Navigation.getLocation(
					{ctor: '_Tuple0'}));
		};
		var subs = function (model) {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$navigation$Navigation$subscription(
						_elm_lang$navigation$Navigation$Monitor(locationToMessage)),
					_1: {
						ctor: '::',
						_0: stuff.subscriptions(model),
						_1: {ctor: '[]'}
					}
				});
		};
		return _elm_lang$html$Html$programWithFlags(
			{init: init, view: stuff.view, update: stuff.update, subscriptions: subs});
	});
var _elm_lang$navigation$Navigation$subMap = F2(
	function (func, _p12) {
		var _p13 = _p12;
		return _elm_lang$navigation$Navigation$Monitor(
			function (_p14) {
				return func(
					_p13._0(_p14));
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
	function (task1, task2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return task2;
			},
			task1);
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
					function (pid) {
						return _elm_lang$core$Task$succeed(
							_elm_lang$core$Maybe$Just(
								{subs: newSubs, pid: pid}));
					},
					_elm_lang$core$Process$spawn(
						A3(
							_elm_lang$dom$Dom_LowLevel$onWindow,
							'resize',
							_elm_lang$core$Json_Decode$succeed(
								{ctor: '_Tuple0'}),
							function (_p5) {
								return A2(
									_elm_lang$core$Task$andThen,
									_elm_lang$core$Platform$sendToSelf(router),
									_elm_lang$window$Window$size);
							})));
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
		var newCosts = A3(_elm_lang$core$Dict$insert, neighbour, distanceTo, model.costs);
		var newModel = _elm_lang$core$Native_Utils.update(
			model,
			{costs: newCosts, cameFrom: newCameFrom});
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
			_elm_lang$core$Tuple$first,
			_elm_lang$core$List$head(
				A2(
					_elm_lang$core$List$sortBy,
					_elm_lang$core$Tuple$second,
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

var _mordrax$cotwelm$Attributes$descriptions = function (attribute) {
	var _p0 = attribute;
	switch (_p0.ctor) {
		case 'Available':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0, _1: 'You are at your maximum potential! Go get\'em tiger!'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 50, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 100, _1: 'Training is for wimps, you like pain, you like it alot!'},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			};
		case 'Strength':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0, _1: 'Unable to push open a unlocked door whos hinges has recently been serviced with WD40.'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 20, _1: 'Stunted by a career in software engineering, the mind is strong but muscle atrophy is high.'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 50, _1: 'Of average strength!!!'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 60, _1: 'Likes to gym during lunch..'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 100, _1: 'Hammers are for wimps!! You hit with your FISTS!'},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			};
		case 'Intelligence':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0, _1: 'Dumb'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 50, _1: 'Smart enough to be at the peak of the standard distribution curve.'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 100, _1: 'Smart'},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			};
		case 'Constitution':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0, _1: 'You\'re having a BAD day, everyday! It\'s like you\'ve got two kids that keep waking you up at night, EVERY night!'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 50, _1: 'Able to outrun a hungry hippo!'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 100, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			};
		default:
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 10, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 20, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 30, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 40, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 50, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 60, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 70, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 80, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 90, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 100, _1: 'TODO: Write something funny and informative about this level of attribute. PRs welcome!'},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			};
	}
};
var _mordrax$cotwelm$Attributes$isLessThanAttribute = F2(
	function (val, _p1) {
		var _p2 = _p1;
		return _elm_lang$core$Native_Utils.cmp(val, _p2._0) < 0;
	});
var _mordrax$cotwelm$Attributes$getDescription = F2(
	function (attribute, value) {
		var attributeDescriptions = _mordrax$cotwelm$Attributes$descriptions(attribute);
		return A2(
			_elm_lang$core$Maybe$withDefault,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'No description matches the value ',
				_elm_lang$core$Basics$toString(value)),
			A2(
				_elm_lang$core$Maybe$map,
				_elm_lang$core$Tuple$second,
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						_mordrax$cotwelm$Attributes$isLessThanAttribute(value),
						attributeDescriptions))));
	});
var _mordrax$cotwelm$Attributes$getDataPercent = function (val) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'data-percent',
		_elm_lang$core$Basics$toString(val));
};
var _mordrax$cotwelm$Attributes$getAttributeValue = F2(
	function (attr, model) {
		var _p3 = attr;
		switch (_p3.ctor) {
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
var _mordrax$cotwelm$Attributes$tickStyle = function (val) {
	return _elm_lang$html$Html_Attributes$style(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'width',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(val),
					'%')
			},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'min-width', _1: '0'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'border-right', _1: '1px solid gray'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'height', _1: '1.75em'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'position', _1: 'absolute'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'top', _1: '0'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'left', _1: '0'},
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		});
};
var _mordrax$cotwelm$Attributes$progressBarStyle = function (val) {
	return _elm_lang$html$Html_Attributes$style(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'width',
				_1: A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(val),
					'%')
			},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'min-width', _1: '0'},
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$Attributes$set = F2(
	function (_p4, model) {
		var _p5 = _p4;
		var _p7 = _p5._1;
		var _p6 = _p5._0;
		switch (_p6.ctor) {
			case 'Available':
				return _elm_lang$core$Native_Utils.update(
					model,
					{ava: _p7});
			case 'Strength':
				return _elm_lang$core$Native_Utils.update(
					model,
					{str: _p7});
			case 'Intelligence':
				return _elm_lang$core$Native_Utils.update(
					model,
					{$int: _p7});
			case 'Constitution':
				return _elm_lang$core$Native_Utils.update(
					model,
					{con: _p7});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{dex: _p7});
		}
	});
var _mordrax$cotwelm$Attributes$update = F2(
	function (msg, model) {
		var _p8 = msg;
		var _p10 = _p8._1;
		var _p9 = _p8._0;
		switch (_p9.ctor) {
			case 'Available':
				return _elm_lang$core$Native_Utils.update(
					model,
					{ava: model.ava + _p10});
			case 'Strength':
				return _elm_lang$core$Native_Utils.update(
					model,
					{str: model.str + _p10, ava: model.ava - _p10});
			case 'Intelligence':
				return _elm_lang$core$Native_Utils.update(
					model,
					{$int: model.$int + _p10, ava: model.ava - _p10});
			case 'Constitution':
				return _elm_lang$core$Native_Utils.update(
					model,
					{con: model.con + _p10, ava: model.ava - _p10});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{dex: model.dex + _p10, ava: model.ava - _p10});
		}
	});
var _mordrax$cotwelm$Attributes$initCustom = F4(
	function (str, dex, con, $int) {
		return {ava: 0, str: str, dex: dex, con: con, $int: $int};
	});
var _mordrax$cotwelm$Attributes$init = {ava: 100, str: 20, dex: 30, con: 40, $int: 60};
var _mordrax$cotwelm$Attributes$Attributes = F5(
	function (a, b, c, d, e) {
		return {ava: a, str: b, dex: c, con: d, $int: e};
	});
var _mordrax$cotwelm$Attributes$Update = F2(
	function (a, b) {
		return {ctor: 'Update', _0: a, _1: b};
	});
var _mordrax$cotwelm$Attributes$viewButtons = function (attribute) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('ui buttons'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$button,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('ui icon button'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onClick(
							A2(_mordrax$cotwelm$Attributes$Update, attribute, -5)),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$i,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('ui icon minus'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ui icon button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onClick(
								A2(_mordrax$cotwelm$Attributes$Update, attribute, 5)),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$i,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui icon plus'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$Attributes$viewAttribute = F3(
	function (attr, model, buttons) {
		var value = A2(_mordrax$cotwelm$Attributes$getAttributeValue, attr, model);
		var description = A2(_mordrax$cotwelm$Attributes$getDescription, attr, value);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui segments'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ui segment left aligned'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$h4,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui header'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(attr)),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('ui indicating progress'),
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Attributes$getDataPercent(value),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('bar'),
											_1: {
												ctor: '::',
												_0: _mordrax$cotwelm$Attributes$progressBarStyle(value),
												_1: {ctor: '[]'}
											}
										},
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('tick'),
												_1: {
													ctor: '::',
													_0: _mordrax$cotwelm$Attributes$tickStyle(25),
													_1: {ctor: '[]'}
												}
											},
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$div,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$class('tick'),
													_1: {
														ctor: '::',
														_0: _mordrax$cotwelm$Attributes$tickStyle(50),
														_1: {ctor: '[]'}
													}
												},
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$div,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('tick'),
														_1: {
															ctor: '::',
															_0: _mordrax$cotwelm$Attributes$tickStyle(75),
															_1: {ctor: '[]'}
														}
													},
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$div,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$class('label'),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text(description),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: buttons ? _mordrax$cotwelm$Attributes$viewButtons(attr) : A2(
									_elm_lang$html$Html$div,
									{ctor: '[]'},
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {ctor: '[]'}
			});
	});
var _mordrax$cotwelm$Attributes$Dexterity = {ctor: 'Dexterity'};
var _mordrax$cotwelm$Attributes$Constitution = {ctor: 'Constitution'};
var _mordrax$cotwelm$Attributes$Intelligence = {ctor: 'Intelligence'};
var _mordrax$cotwelm$Attributes$Strength = {ctor: 'Strength'};
var _mordrax$cotwelm$Attributes$Available = {ctor: 'Available'};
var _mordrax$cotwelm$Attributes$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A3(_mordrax$cotwelm$Attributes$viewAttribute, _mordrax$cotwelm$Attributes$Available, model, false),
			_1: {
				ctor: '::',
				_0: A3(_mordrax$cotwelm$Attributes$viewAttribute, _mordrax$cotwelm$Attributes$Strength, model, true),
				_1: {
					ctor: '::',
					_0: A3(_mordrax$cotwelm$Attributes$viewAttribute, _mordrax$cotwelm$Attributes$Intelligence, model, true),
					_1: {
						ctor: '::',
						_0: A3(_mordrax$cotwelm$Attributes$viewAttribute, _mordrax$cotwelm$Attributes$Dexterity, model, true),
						_1: {
							ctor: '::',
							_0: A3(_mordrax$cotwelm$Attributes$viewAttribute, _mordrax$cotwelm$Attributes$Constitution, model, true),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};

var _mordrax$cotwelm$Stats$printAOverB = F2(
	function (a, b) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(a),
			A2(
				_elm_lang$core$Basics_ops['++'],
				' / ',
				_elm_lang$core$Basics$toString(b)));
	});
var _mordrax$cotwelm$Stats$printSP = function (model) {
	return A2(_mordrax$cotwelm$Stats$printAOverB, model.currentSP, model.maxSP);
};
var _mordrax$cotwelm$Stats$printHP = function (model) {
	return A2(_mordrax$cotwelm$Stats$printAOverB, model.currentHP, model.maxHP);
};
var _mordrax$cotwelm$Stats$takeHit = F2(
	function (damage, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{currentHP: model.currentHP - damage});
	});
var _mordrax$cotwelm$Stats$isDead = function (model) {
	return _elm_lang$core$Native_Utils.cmp(model.currentHP, 0) < 0;
};
var _mordrax$cotwelm$Stats$spBonus = function (_p0) {
	var _p1 = _p0;
	return (_p1.$int / 5) | 0;
};
var _mordrax$cotwelm$Stats$hpBonus = function (_p2) {
	var _p3 = _p2;
	return ((_p3.con / 10) | 0) + ((_p3.str / 20) | 0);
};
var _mordrax$cotwelm$Stats$incLevel = F3(
	function (newLevel, attributes, stats) {
		var totalSpBonus = newLevel * _mordrax$cotwelm$Stats$spBonus(attributes);
		var totalHpBonus = newLevel * _mordrax$cotwelm$Stats$hpBonus(attributes);
		return _elm_lang$core$Native_Utils.update(
			stats,
			{currentHP: stats.currentHP + totalHpBonus, maxHP: stats.maxHP + totalHpBonus, hardMaxHP: stats.hardMaxHP + totalHpBonus, currentSP: stats.currentSP + totalSpBonus, maxSP: stats.maxSP + totalSpBonus, hardMaxSP: stats.hardMaxSP + totalSpBonus});
	});
var _mordrax$cotwelm$Stats$Stats = F7(
	function (a, b, c, d, e, f, g) {
		return {currentHP: a, maxHP: b, hardMaxHP: c, currentSP: d, maxSP: e, hardMaxSP: f, effects: g};
	});
var _mordrax$cotwelm$Stats$Effects = F5(
	function (a, b, c, d, e) {
		return {poison: a, adrenaline: b, burn: c, frost: d, shock: e};
	});
var _mordrax$cotwelm$Stats$Dead = {ctor: 'Dead'};
var _mordrax$cotwelm$Stats$Alive = {ctor: 'Alive'};
var _mordrax$cotwelm$Stats$AcutePoison = {ctor: 'AcutePoison'};
var _mordrax$cotwelm$Stats$MajorPoison = {ctor: 'MajorPoison'};
var _mordrax$cotwelm$Stats$MinorPoison = {ctor: 'MinorPoison'};
var _mordrax$cotwelm$Stats$NotPoisoned = {ctor: 'NotPoisoned'};
var _mordrax$cotwelm$Stats$CoolOff = function (a) {
	return {ctor: 'CoolOff', _0: a};
};
var _mordrax$cotwelm$Stats$Rush = function (a) {
	return {ctor: 'Rush', _0: a};
};
var _mordrax$cotwelm$Stats$Calm = {ctor: 'Calm'};
var _mordrax$cotwelm$Stats$Burning = function (a) {
	return {ctor: 'Burning', _0: a};
};
var _mordrax$cotwelm$Stats$NotBurning = {ctor: 'NotBurning'};
var _mordrax$cotwelm$Stats$Frozen = function (a) {
	return {ctor: 'Frozen', _0: a};
};
var _mordrax$cotwelm$Stats$NotFrozen = {ctor: 'NotFrozen'};
var _mordrax$cotwelm$Stats$Shocked = function (a) {
	return {ctor: 'Shocked', _0: a};
};
var _mordrax$cotwelm$Stats$NotShocked = {ctor: 'NotShocked'};
var _mordrax$cotwelm$Stats$init = function (attributes) {
	var sp = _mordrax$cotwelm$Stats$spBonus(attributes);
	var hp = _mordrax$cotwelm$Stats$hpBonus(attributes);
	return A7(
		_mordrax$cotwelm$Stats$Stats,
		hp,
		hp,
		hp,
		sp,
		sp,
		sp,
		A5(_mordrax$cotwelm$Stats$Effects, _mordrax$cotwelm$Stats$NotPoisoned, _mordrax$cotwelm$Stats$Calm, _mordrax$cotwelm$Stats$NotBurning, _mordrax$cotwelm$Stats$NotFrozen, _mordrax$cotwelm$Stats$NotShocked));
};
var _mordrax$cotwelm$Stats$initExperienced = F2(
	function (attributes, level) {
		return A3(
			_mordrax$cotwelm$Stats$incLevel,
			level,
			attributes,
			_mordrax$cotwelm$Stats$init(attributes));
	});

var _mordrax$cotwelm$Dice$range = F2(
	function (small, large) {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$int,
			A2(_elm_lang$core$Basics$min, small, large),
			A2(_elm_lang$core$Basics$max, small, large));
	});
var _mordrax$cotwelm$Dice$d = function (face) {
	return A2(_mordrax$cotwelm$Dice$range, 1, face);
};
var _mordrax$cotwelm$Dice$roll_ = F3(
	function (nDice, sides, currentDieRoll) {
		roll_:
		while (true) {
			var acc = function (face) {
				return A3(
					_mgold$elm_random_pcg$Random_Pcg$map2,
					F2(
						function (x, y) {
							return x + y;
						}),
					currentDieRoll,
					_mordrax$cotwelm$Dice$d(face));
			};
			var _p0 = nDice;
			if (_p0 === 0) {
				return currentDieRoll;
			} else {
				var _v1 = nDice - 1,
					_v2 = sides,
					_v3 = acc(sides);
				nDice = _v1;
				sides = _v2;
				currentDieRoll = _v3;
				continue roll_;
			}
		}
	});
var _mordrax$cotwelm$Dice$d2d = F2(
	function (f1, f2) {
		return A3(
			_mgold$elm_random_pcg$Random_Pcg$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			_mordrax$cotwelm$Dice$d(f1),
			_mordrax$cotwelm$Dice$d(f2));
	});
var _mordrax$cotwelm$Dice$roll = function (_p1) {
	var _p2 = _p1;
	var _p3 = _p2.sides;
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		function (x) {
			return x + _p2.bonus;
		},
		A3(
			_mordrax$cotwelm$Dice$roll_,
			_p2.nDice - 1,
			_p3,
			_mordrax$cotwelm$Dice$d(_p3)));
};
var _mordrax$cotwelm$Dice$pp = function (_p4) {
	var _p5 = _p4;
	var _p8 = _p5.sides;
	var _p7 = _p5.nDice;
	var _p6 = _p5.bonus;
	return (_elm_lang$core$Native_Utils.cmp(_p6, 0) > 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(_p7),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'D',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p8),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'+',
					_elm_lang$core$Basics$toString(_p6))))) : A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(_p7),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'D',
			_elm_lang$core$Basics$toString(_p8)));
};
var _mordrax$cotwelm$Dice$Dice = F3(
	function (a, b, c) {
		return {nDice: a, sides: b, bonus: c};
	});
var _mordrax$cotwelm$Dice$die = F3(
	function (nDice, sides, bonus) {
		return A3(
			_mordrax$cotwelm$Dice$Dice,
			A2(_elm_lang$core$Basics$min, 1, nDice),
			sides,
			bonus);
	});

var _mordrax$cotwelm$Utils_Direction$SW = {ctor: 'SW'};
var _mordrax$cotwelm$Utils_Direction$SE = {ctor: 'SE'};
var _mordrax$cotwelm$Utils_Direction$NW = {ctor: 'NW'};
var _mordrax$cotwelm$Utils_Direction$NE = {ctor: 'NE'};
var _mordrax$cotwelm$Utils_Direction$W = {ctor: 'W'};
var _mordrax$cotwelm$Utils_Direction$S = {ctor: 'S'};
var _mordrax$cotwelm$Utils_Direction$E = {ctor: 'E'};
var _mordrax$cotwelm$Utils_Direction$N = {ctor: 'N'};
var _mordrax$cotwelm$Utils_Direction$cardinalDirections = {
	ctor: '::',
	_0: _mordrax$cotwelm$Utils_Direction$N,
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Utils_Direction$E,
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Utils_Direction$S,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Direction$W,
				_1: {ctor: '[]'}
			}
		}
	}
};
var _mordrax$cotwelm$Utils_Direction$isCardinal = function (dir) {
	return A2(_elm_lang$core$List$member, dir, _mordrax$cotwelm$Utils_Direction$cardinalDirections);
};
var _mordrax$cotwelm$Utils_Direction$directions = {
	ctor: '::',
	_0: _mordrax$cotwelm$Utils_Direction$N,
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Utils_Direction$E,
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Utils_Direction$S,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Direction$W,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Utils_Direction$NE,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Utils_Direction$NW,
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Utils_Direction$SE,
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Utils_Direction$SW,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};

var _mordrax$cotwelm$Utils_Vector$boxIntersectYAxis = F2(
	function (yAxis, _p0) {
		var _p1 = _p0;
		return (_elm_lang$core$Native_Utils.cmp(yAxis, _p1._0._1) > -1) && (_elm_lang$core$Native_Utils.cmp(yAxis, _p1._1._1) < 1);
	});
var _mordrax$cotwelm$Utils_Vector$boxIntersectXAxis = F2(
	function (xAxis, _p2) {
		var _p3 = _p2;
		return (_elm_lang$core$Native_Utils.cmp(xAxis, _p3._0._0) > -1) && (_elm_lang$core$Native_Utils.cmp(xAxis, _p3._1._0) < 1);
	});
var _mordrax$cotwelm$Utils_Vector$boxIntersectVector = F2(
	function (_p5, _p4) {
		var _p6 = _p5;
		var _p9 = _p6._1;
		var _p8 = _p6._0;
		var _p7 = _p4;
		var isWithinY = (_elm_lang$core$Native_Utils.cmp(_p9, _p7._0._1) > -1) && (_elm_lang$core$Native_Utils.cmp(_p9, _p7._1._1) < 1);
		var isWithinX = (_elm_lang$core$Native_Utils.cmp(_p8, _p7._0._0) > -1) && (_elm_lang$core$Native_Utils.cmp(_p8, _p7._1._0) < 1);
		return isWithinX && isWithinY;
	});
var _mordrax$cotwelm$Utils_Vector$fromDirection = function (dir) {
	var _p10 = dir;
	switch (_p10.ctor) {
		case 'N':
			return {ctor: '_Tuple2', _0: 0, _1: 1};
		case 'S':
			return {ctor: '_Tuple2', _0: 0, _1: -1};
		case 'E':
			return {ctor: '_Tuple2', _0: 1, _1: 0};
		case 'W':
			return {ctor: '_Tuple2', _0: -1, _1: 0};
		case 'NE':
			return {ctor: '_Tuple2', _0: 1, _1: 1};
		case 'NW':
			return {ctor: '_Tuple2', _0: -1, _1: 1};
		case 'SE':
			return {ctor: '_Tuple2', _0: 1, _1: -1};
		default:
			return {ctor: '_Tuple2', _0: -1, _1: -1};
	}
};
var _mordrax$cotwelm$Utils_Vector$directions = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: {ctor: '_Tuple2', _0: 0, _1: 1},
			_1: _mordrax$cotwelm$Utils_Direction$N
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: 0, _1: -1},
				_1: _mordrax$cotwelm$Utils_Direction$S
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: 1, _1: 0},
					_1: _mordrax$cotwelm$Utils_Direction$E
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: -1, _1: 0},
						_1: _mordrax$cotwelm$Utils_Direction$W
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: {ctor: '_Tuple2', _0: 1, _1: 1},
							_1: _mordrax$cotwelm$Utils_Direction$NE
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: {ctor: '_Tuple2', _0: -1, _1: 1},
								_1: _mordrax$cotwelm$Utils_Direction$NW
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: {ctor: '_Tuple2', _0: 1, _1: -1},
									_1: _mordrax$cotwelm$Utils_Direction$SE
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: -1, _1: -1},
										_1: _mordrax$cotwelm$Utils_Direction$SW
									},
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	});
var _mordrax$cotwelm$Utils_Vector$rotate = F2(
	function (_p11, dir) {
		var _p12 = _p11;
		var angle = function () {
			var _p13 = dir;
			if (_p13.ctor === 'Left') {
				return 45;
			} else {
				return -45;
			}
		}();
		var _p14 = {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Basics$toFloat(_p12._0),
			_1: _elm_lang$core$Basics$toFloat(_p12._1)
		};
		var x = _p14._0;
		var y = _p14._1;
		var x_ = (x * _elm_lang$core$Basics$cos(angle)) - (y * _elm_lang$core$Basics$sin(angle));
		var y_ = (x * _elm_lang$core$Basics$sin(angle)) + (y * _elm_lang$core$Basics$cos(angle));
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Basics$round(x_),
			_1: _elm_lang$core$Basics$round(y_)
		};
	});
var _mordrax$cotwelm$Utils_Vector$rotateUnlessCardinal = F2(
	function (currentDirection, rotation) {
		var cardinalVectors = A2(_elm_lang$core$List$map, _mordrax$cotwelm$Utils_Vector$fromDirection, _mordrax$cotwelm$Utils_Direction$cardinalDirections);
		return A2(_elm_lang$core$List$member, currentDirection, cardinalVectors) ? currentDirection : A2(_mordrax$cotwelm$Utils_Vector$rotate, currentDirection, rotation);
	});
var _mordrax$cotwelm$Utils_Vector$map = F2(
	function (f, _p15) {
		var _p16 = _p15;
		return {
			ctor: '_Tuple2',
			_0: f(_p16._0),
			_1: f(_p16._1)
		};
	});
var _mordrax$cotwelm$Utils_Vector$scale = F2(
	function (magnitude, _p17) {
		var _p18 = _p17;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Basics$round(
				_elm_lang$core$Basics$toFloat(_p18._0) * magnitude),
			_1: _elm_lang$core$Basics$round(
				_elm_lang$core$Basics$toFloat(_p18._1) * magnitude)
		};
	});
var _mordrax$cotwelm$Utils_Vector$scaleInt = function (magnitude) {
	return _mordrax$cotwelm$Utils_Vector$scale(
		_elm_lang$core$Basics$toFloat(magnitude));
};
var _mordrax$cotwelm$Utils_Vector$sub = F2(
	function (_p20, _p19) {
		var _p21 = _p20;
		var _p22 = _p19;
		return {ctor: '_Tuple2', _0: _p21._0 - _p22._0, _1: _p21._1 - _p22._1};
	});
var _mordrax$cotwelm$Utils_Vector$distance = F2(
	function (_p24, _p23) {
		var _p25 = _p24;
		var _p26 = _p23;
		var _p27 = A2(
			_mordrax$cotwelm$Utils_Vector$sub,
			{ctor: '_Tuple2', _0: _p25._0, _1: _p25._1},
			{ctor: '_Tuple2', _0: _p26._0, _1: _p26._1});
		var dx = _p27._0;
		var dy = _p27._1;
		return _elm_lang$core$Basics$sqrt(
			_elm_lang$core$Basics$toFloat(
				Math.pow(dx, 2) + Math.pow(dy, 2)));
	});
var _mordrax$cotwelm$Utils_Vector$add = F2(
	function (_p29, _p28) {
		var _p30 = _p29;
		var _p31 = _p28;
		return {ctor: '_Tuple2', _0: _p30._0 + _p31._0, _1: _p30._1 + _p31._1};
	});
var _mordrax$cotwelm$Utils_Vector$neighbourInDirection = F2(
	function (vector, direction) {
		return A2(
			_mordrax$cotwelm$Utils_Vector$add,
			vector,
			_mordrax$cotwelm$Utils_Vector$fromDirection(direction));
	});
var _mordrax$cotwelm$Utils_Vector$neighbours = function (position) {
	return A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Utils_Vector$neighbourInDirection(position),
		_mordrax$cotwelm$Utils_Direction$directions);
};
var _mordrax$cotwelm$Utils_Vector$cardinalNeighbours = function (_p32) {
	var _p33 = _p32;
	return A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Utils_Vector$add(
			{ctor: '_Tuple2', _0: _p33._0, _1: _p33._1}),
		A2(_elm_lang$core$List$map, _mordrax$cotwelm$Utils_Vector$fromDirection, _mordrax$cotwelm$Utils_Direction$cardinalDirections));
};
var _mordrax$cotwelm$Utils_Vector$unit = function (_p34) {
	var _p35 = _p34;
	var _p37 = _p35._1;
	var _p36 = _p35._0;
	return {
		ctor: '_Tuple2',
		_0: (_p36 / _elm_lang$core$Basics$abs(_p36)) | 0,
		_1: (_p37 / _elm_lang$core$Basics$abs(_p37)) | 0
	};
};
var _mordrax$cotwelm$Utils_Vector$toDirection = function (vector) {
	var _p38 = A2(
		_elm_lang$core$Dict$get,
		_mordrax$cotwelm$Utils_Vector$unit(vector),
		_mordrax$cotwelm$Utils_Vector$directions);
	if (_p38.ctor === 'Just') {
		return _p38._0;
	} else {
		var _p39 = A2(
			_elm_lang$core$Debug$log,
			'ERROR: Could not get a direction from the unit vector: ',
			_mordrax$cotwelm$Utils_Vector$unit(vector));
		return _mordrax$cotwelm$Utils_Direction$W;
	}
};
var _mordrax$cotwelm$Utils_Vector$rotateCompass = F2(
	function (compass, rotation) {
		return _mordrax$cotwelm$Utils_Vector$toDirection(
			A3(
				_elm_lang$core$Basics$flip,
				_mordrax$cotwelm$Utils_Vector$rotate,
				rotation,
				_mordrax$cotwelm$Utils_Vector$fromDirection(compass)));
	});
var _mordrax$cotwelm$Utils_Vector$facing = F2(
	function (start, end) {
		return _mordrax$cotwelm$Utils_Vector$toDirection(
			_mordrax$cotwelm$Utils_Vector$unit(
				A2(_mordrax$cotwelm$Utils_Vector$sub, end, start)));
	});
var _mordrax$cotwelm$Utils_Vector$oppositeDirection = function (dir) {
	return _mordrax$cotwelm$Utils_Vector$toDirection(
		A2(
			_mordrax$cotwelm$Utils_Vector$scaleInt,
			-1,
			_mordrax$cotwelm$Utils_Vector$fromDirection(dir)));
};
var _mordrax$cotwelm$Utils_Vector$zero = {ctor: '_Tuple2', _0: 0, _1: 0};
var _mordrax$cotwelm$Utils_Vector$Right = {ctor: 'Right'};
var _mordrax$cotwelm$Utils_Vector$Left = {ctor: 'Left'};

var _mordrax$cotwelm$Utils_Mass$Mass = F2(
	function (a, b) {
		return {weight: a, bulk: b};
	});
var _mordrax$cotwelm$Utils_Mass$add = F2(
	function (a, b) {
		return A2(_mordrax$cotwelm$Utils_Mass$Mass, a.bulk + b.bulk, a.weight + b.weight);
	});
var _mordrax$cotwelm$Utils_Mass$subtract = F2(
	function (a, b) {
		return A2(_mordrax$cotwelm$Utils_Mass$Mass, a.bulk - b.bulk, a.weight - b.weight);
	});
var _mordrax$cotwelm$Utils_Mass$Capacity = F2(
	function (a, b) {
		return {maxWeight: a, maxBulk: b};
	});
var _mordrax$cotwelm$Utils_Mass$TooBulky = {ctor: 'TooBulky'};
var _mordrax$cotwelm$Utils_Mass$TooHeavy = {ctor: 'TooHeavy'};
var _mordrax$cotwelm$Utils_Mass$Success = {ctor: 'Success'};
var _mordrax$cotwelm$Utils_Mass$withinCapacity = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p3 = _p0;
		var _p4 = {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.cmp(_p2.bulk, _p3.maxBulk) > 0,
			_1: _elm_lang$core$Native_Utils.cmp(_p2.weight, _p3.maxWeight) > 0
		};
		_v2_2:
		do {
			if (_p4.ctor === '_Tuple2') {
				if (_p4._0 === true) {
					return _mordrax$cotwelm$Utils_Mass$TooBulky;
				} else {
					if (_p4._1 === true) {
						return _mordrax$cotwelm$Utils_Mass$TooHeavy;
					} else {
						break _v2_2;
					}
				}
			} else {
				break _v2_2;
			}
		} while(false);
		return _mordrax$cotwelm$Utils_Mass$Success;
	});

var _mordrax$cotwelm$Container$list = function (_p0) {
	var _p1 = _p0;
	return _p1._0.items;
};
var _mordrax$cotwelm$Container$mass = function (_p2) {
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
var _mordrax$cotwelm$Container$NestedItem = {ctor: 'NestedItem'};
var _mordrax$cotwelm$Container$MassMsg = function (a) {
	return {ctor: 'MassMsg', _0: a};
};
var _mordrax$cotwelm$Container$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Container$ContainerModel = function (a) {
	return {ctor: 'ContainerModel', _0: a};
};
var _mordrax$cotwelm$Container$init = F3(
	function (capacity, getMass, equals) {
		return _mordrax$cotwelm$Container$ContainerModel(
			A5(
				_mordrax$cotwelm$Container$Model,
				capacity,
				A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
				{ctor: '[]'},
				getMass,
				equals));
	});
var _mordrax$cotwelm$Container$set = F2(
	function (items, _p6) {
		var _p7 = _p6;
		return _mordrax$cotwelm$Container$ContainerModel(
			_elm_lang$core$Native_Utils.update(
				_p7._0,
				{items: items}));
	});
var _mordrax$cotwelm$Container$add = F2(
	function (item, _p8) {
		var _p9 = _p8;
		var _p11 = _p9._0;
		var log = function (x) {
			return A2(_elm_lang$core$Debug$log, 'comparing ', x);
		};
		var isNested = A2(
			_elm_lang$core$List$any,
			function (x) {
				return A2(
					_p11.equals,
					log(x),
					log(item));
			},
			_p11.items);
		var mass = _p11.getMass(item);
		var containerMassWithItem = A2(_mordrax$cotwelm$Utils_Mass$add, mass, _p11.currentMass);
		var isWithinCapacity = A2(_mordrax$cotwelm$Utils_Mass$withinCapacity, containerMassWithItem, _p11.capacity);
		var _p10 = {ctor: '_Tuple2', _0: isWithinCapacity, _1: isNested};
		if (_p10._1 === false) {
			if (_p10._0.ctor === 'Success') {
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Container$ContainerModel(
						_elm_lang$core$Native_Utils.update(
							_p11,
							{
								currentMass: containerMassWithItem,
								items: {ctor: '::', _0: item, _1: _p11.items}
							})),
					_1: _mordrax$cotwelm$Container$Ok
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Container$ContainerModel(_p11),
					_1: _mordrax$cotwelm$Container$MassMsg(_p10._0)
				};
			}
		} else {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Container$ContainerModel(_p11),
				_1: _mordrax$cotwelm$Container$NestedItem
			};
		}
	});
var _mordrax$cotwelm$Container$remove = F2(
	function (item, _p12) {
		var _p13 = _p12;
		var _p14 = _p13._0;
		var itemMass = _p14.getMass(item);
		var mass_ = A2(_mordrax$cotwelm$Utils_Mass$subtract, _p14.currentMass, itemMass);
		var notEquals = function (x) {
			return !A2(_p14.equals, item, x);
		};
		var itemsWithoutIdItem = A2(_elm_lang$core$List$filter, notEquals, _p14.items);
		return _mordrax$cotwelm$Container$ContainerModel(
			_elm_lang$core$Native_Utils.update(
				_p14,
				{items: itemsWithoutIdItem, currentMass: mass_}));
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
var _mordrax$cotwelm$Utils_IdGenerator$init = _mordrax$cotwelm$Utils_IdGenerator$IDModel(0);
var _mordrax$cotwelm$Utils_IdGenerator$ID = function (a) {
	return {ctor: 'ID', _0: a};
};
var _mordrax$cotwelm$Utils_IdGenerator$empty = _mordrax$cotwelm$Utils_IdGenerator$ID(-1);
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
		var generator_ = _p9._1;
		return {
			ctor: '_Tuple2',
			_0: {
				ctor: '::',
				_0: toA(id),
				_1: _p8._0
			},
			_1: generator_
		};
	});

var _mordrax$cotwelm$Item_Data$BaseItem = F7(
	function (a, b, c, d, e, f, g) {
		return {name: a, prices: b, css: c, mass: d, status: e, isIdentified: f, id: g};
	});
var _mordrax$cotwelm$Item_Data$Weapon = F4(
	function (a, b, c, d) {
		return {base: a, weaponType: b, wc: c, damage: d};
	});
var _mordrax$cotwelm$Item_Data$Armour = F3(
	function (a, b, c) {
		return {base: a, armourType: b, ac: c};
	});
var _mordrax$cotwelm$Item_Data$Gauntlets = F3(
	function (a, b, c) {
		return {base: a, gauntletsType: b, ac: c};
	});
var _mordrax$cotwelm$Item_Data$Helmet = F3(
	function (a, b, c) {
		return {base: a, helmetType: b, ac: c};
	});
var _mordrax$cotwelm$Item_Data$Bracers = F3(
	function (a, b, c) {
		return {base: a, bracersType: b, ac: c};
	});
var _mordrax$cotwelm$Item_Data$Shield = F3(
	function (a, b, c) {
		return {base: a, shieldType: b, ac: c};
	});
var _mordrax$cotwelm$Item_Data$Boots = F2(
	function (a, b) {
		return {base: a, bootsType: b};
	});
var _mordrax$cotwelm$Item_Data$Neckwear = F2(
	function (a, b) {
		return {base: a, neckwearType: b};
	});
var _mordrax$cotwelm$Item_Data$Overgarment = F2(
	function (a, b) {
		return {base: a, overgarmentType: b};
	});
var _mordrax$cotwelm$Item_Data$Ring = F2(
	function (a, b) {
		return {base: a, ringType: b};
	});
var _mordrax$cotwelm$Item_Data$MassMsg = function (a) {
	return {ctor: 'MassMsg', _0: a};
};
var _mordrax$cotwelm$Item_Data$NestedItem = {ctor: 'NestedItem'};
var _mordrax$cotwelm$Item_Data$ItemOk = {ctor: 'ItemOk'};
var _mordrax$cotwelm$Item_Data$Enchanted = {ctor: 'Enchanted'};
var _mordrax$cotwelm$Item_Data$Cursed = {ctor: 'Cursed'};
var _mordrax$cotwelm$Item_Data$Normal = {ctor: 'Normal'};
var _mordrax$cotwelm$Item_Data$AC = function (a) {
	return {ctor: 'AC', _0: a};
};
var _mordrax$cotwelm$Item_Data$Unidentified = {ctor: 'Unidentified'};
var _mordrax$cotwelm$Item_Data$Identified = {ctor: 'Identified'};
var _mordrax$cotwelm$Item_Data$ItemTypePlatinum = function (a) {
	return {ctor: 'ItemTypePlatinum', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeGold = function (a) {
	return {ctor: 'ItemTypeGold', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeSilver = function (a) {
	return {ctor: 'ItemTypeSilver', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeCopper = function (a) {
	return {ctor: 'ItemTypeCopper', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeBoots = function (a) {
	return {ctor: 'ItemTypeBoots', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeRing = function (a) {
	return {ctor: 'ItemTypeRing', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeOvergarment = function (a) {
	return {ctor: 'ItemTypeOvergarment', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeNeckwear = function (a) {
	return {ctor: 'ItemTypeNeckwear', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypePurse = {ctor: 'ItemTypePurse'};
var _mordrax$cotwelm$Item_Data$ItemTypePack = function (a) {
	return {ctor: 'ItemTypePack', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeBelt = function (a) {
	return {ctor: 'ItemTypeBelt', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeGauntlets = function (a) {
	return {ctor: 'ItemTypeGauntlets', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeBracers = function (a) {
	return {ctor: 'ItemTypeBracers', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeHelmet = function (a) {
	return {ctor: 'ItemTypeHelmet', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeShield = function (a) {
	return {ctor: 'ItemTypeShield', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeArmour = function (a) {
	return {ctor: 'ItemTypeArmour', _0: a};
};
var _mordrax$cotwelm$Item_Data$ItemTypeWeapon = function (a) {
	return {ctor: 'ItemTypeWeapon', _0: a};
};
var _mordrax$cotwelm$Item_Data$Prices = F2(
	function (a, b) {
		return {ctor: 'Prices', _0: a, _1: b};
	});
var _mordrax$cotwelm$Item_Data$WC = function (a) {
	return {ctor: 'WC', _0: a};
};
var _mordrax$cotwelm$Item_Data$LargeClaws = {ctor: 'LargeClaws'};
var _mordrax$cotwelm$Item_Data$Bow = {ctor: 'Bow'};
var _mordrax$cotwelm$Item_Data$Pincers = {ctor: 'Pincers'};
var _mordrax$cotwelm$Item_Data$Fangs = {ctor: 'Fangs'};
var _mordrax$cotwelm$Item_Data$Crossbow = {ctor: 'Crossbow'};
var _mordrax$cotwelm$Item_Data$SmallClaws = {ctor: 'SmallClaws'};
var _mordrax$cotwelm$Item_Data$TwoHandedSword = {ctor: 'TwoHandedSword'};
var _mordrax$cotwelm$Item_Data$BastardSword = {ctor: 'BastardSword'};
var _mordrax$cotwelm$Item_Data$MorningStar = {ctor: 'MorningStar'};
var _mordrax$cotwelm$Item_Data$BroadSword = {ctor: 'BroadSword'};
var _mordrax$cotwelm$Item_Data$BattleAxe = {ctor: 'BattleAxe'};
var _mordrax$cotwelm$Item_Data$LongSword = {ctor: 'LongSword'};
var _mordrax$cotwelm$Item_Data$WarHammer = {ctor: 'WarHammer'};
var _mordrax$cotwelm$Item_Data$Axe = {ctor: 'Axe'};
var _mordrax$cotwelm$Item_Data$Flail = {ctor: 'Flail'};
var _mordrax$cotwelm$Item_Data$Mace = {ctor: 'Mace'};
var _mordrax$cotwelm$Item_Data$ShortSword = {ctor: 'ShortSword'};
var _mordrax$cotwelm$Item_Data$Spear = {ctor: 'Spear'};
var _mordrax$cotwelm$Item_Data$Quarterstaff = {ctor: 'Quarterstaff'};
var _mordrax$cotwelm$Item_Data$HandAxe = {ctor: 'HandAxe'};
var _mordrax$cotwelm$Item_Data$Hammer = {ctor: 'Hammer'};
var _mordrax$cotwelm$Item_Data$Dagger = {ctor: 'Dagger'};
var _mordrax$cotwelm$Item_Data$Club = {ctor: 'Club'};
var _mordrax$cotwelm$Item_Data$BrokenSword = {ctor: 'BrokenSword'};
var _mordrax$cotwelm$Item_Data$EnchantedHelmOfStorms = {ctor: 'EnchantedHelmOfStorms'};
var _mordrax$cotwelm$Item_Data$HelmetOfDetectMonsters = {ctor: 'HelmetOfDetectMonsters'};
var _mordrax$cotwelm$Item_Data$MeteoricSteelHelmet = {ctor: 'MeteoricSteelHelmet'};
var _mordrax$cotwelm$Item_Data$SteelHelmet = {ctor: 'SteelHelmet'};
var _mordrax$cotwelm$Item_Data$IronHelmet = {ctor: 'IronHelmet'};
var _mordrax$cotwelm$Item_Data$LeatherHelmet = {ctor: 'LeatherHelmet'};
var _mordrax$cotwelm$Item_Data$BrokenHelmet = {ctor: 'BrokenHelmet'};
var _mordrax$cotwelm$Item_Data$ToughHide = {ctor: 'ToughHide'};
var _mordrax$cotwelm$Item_Data$Shell = {ctor: 'Shell'};
var _mordrax$cotwelm$Item_Data$Bones = {ctor: 'Bones'};
var _mordrax$cotwelm$Item_Data$SoftHide = {ctor: 'SoftHide'};
var _mordrax$cotwelm$Item_Data$ElvenChainMail = {ctor: 'ElvenChainMail'};
var _mordrax$cotwelm$Item_Data$MeteoricSteelPlate = {ctor: 'MeteoricSteelPlate'};
var _mordrax$cotwelm$Item_Data$PlateArmour = {ctor: 'PlateArmour'};
var _mordrax$cotwelm$Item_Data$PlateMail = {ctor: 'PlateMail'};
var _mordrax$cotwelm$Item_Data$SplintMail = {ctor: 'SplintMail'};
var _mordrax$cotwelm$Item_Data$ChainMail = {ctor: 'ChainMail'};
var _mordrax$cotwelm$Item_Data$ScaleMail = {ctor: 'ScaleMail'};
var _mordrax$cotwelm$Item_Data$RingMail = {ctor: 'RingMail'};
var _mordrax$cotwelm$Item_Data$StuddedLeatherArmour = {ctor: 'StuddedLeatherArmour'};
var _mordrax$cotwelm$Item_Data$LeatherArmour = {ctor: 'LeatherArmour'};
var _mordrax$cotwelm$Item_Data$RustyArmour = {ctor: 'RustyArmour'};
var _mordrax$cotwelm$Item_Data$LargeMeteoricSteelShield = {ctor: 'LargeMeteoricSteelShield'};
var _mordrax$cotwelm$Item_Data$MediumMeteoricSteelShield = {ctor: 'MediumMeteoricSteelShield'};
var _mordrax$cotwelm$Item_Data$SmallMeteoricSteelShield = {ctor: 'SmallMeteoricSteelShield'};
var _mordrax$cotwelm$Item_Data$LargeSteelShield = {ctor: 'LargeSteelShield'};
var _mordrax$cotwelm$Item_Data$MediumSteelShield = {ctor: 'MediumSteelShield'};
var _mordrax$cotwelm$Item_Data$SmallSteelShield = {ctor: 'SmallSteelShield'};
var _mordrax$cotwelm$Item_Data$LargeIronShield = {ctor: 'LargeIronShield'};
var _mordrax$cotwelm$Item_Data$MediumIronShield = {ctor: 'MediumIronShield'};
var _mordrax$cotwelm$Item_Data$SmallIronShield = {ctor: 'SmallIronShield'};
var _mordrax$cotwelm$Item_Data$LargeWoodenShield = {ctor: 'LargeWoodenShield'};
var _mordrax$cotwelm$Item_Data$MediumWoodenShield = {ctor: 'MediumWoodenShield'};
var _mordrax$cotwelm$Item_Data$SmallWoodenShield = {ctor: 'SmallWoodenShield'};
var _mordrax$cotwelm$Item_Data$BrokenShield = {ctor: 'BrokenShield'};
var _mordrax$cotwelm$Item_Data$BracersOfDefenseVS = {ctor: 'BracersOfDefenseVS'};
var _mordrax$cotwelm$Item_Data$BracersOfDefenseS = {ctor: 'BracersOfDefenseS'};
var _mordrax$cotwelm$Item_Data$BracersOfDefenseNormal = {ctor: 'BracersOfDefenseNormal'};
var _mordrax$cotwelm$Item_Data$NormalBracers = {ctor: 'NormalBracers'};
var _mordrax$cotwelm$Item_Data$GauntletOfStrengthVS = {ctor: 'GauntletOfStrengthVS'};
var _mordrax$cotwelm$Item_Data$GauntletOfStrengthS = {ctor: 'GauntletOfStrengthS'};
var _mordrax$cotwelm$Item_Data$GauntletOfStrength = {ctor: 'GauntletOfStrength'};
var _mordrax$cotwelm$Item_Data$GauntletOfDexterityVS = {ctor: 'GauntletOfDexterityVS'};
var _mordrax$cotwelm$Item_Data$GauntletOfDexterityS = {ctor: 'GauntletOfDexterityS'};
var _mordrax$cotwelm$Item_Data$GauntletOfDexterity = {ctor: 'GauntletOfDexterity'};
var _mordrax$cotwelm$Item_Data$GauntletOfSlayingVS_VS = {ctor: 'GauntletOfSlayingVS_VS'};
var _mordrax$cotwelm$Item_Data$GauntletOfSlayingS_S = {ctor: 'GauntletOfSlayingS_S'};
var _mordrax$cotwelm$Item_Data$GauntletOfSlaying = {ctor: 'GauntletOfSlaying'};
var _mordrax$cotwelm$Item_Data$GauntletOfProtectionVS = {ctor: 'GauntletOfProtectionVS'};
var _mordrax$cotwelm$Item_Data$GauntletOfProtectionS = {ctor: 'GauntletOfProtectionS'};
var _mordrax$cotwelm$Item_Data$GauntletOfProtection = {ctor: 'GauntletOfProtection'};
var _mordrax$cotwelm$Item_Data$NormalGauntlets = {ctor: 'NormalGauntlets'};
var _mordrax$cotwelm$Item_Data$EnchantedLargePackOfHolding = {ctor: 'EnchantedLargePackOfHolding'};
var _mordrax$cotwelm$Item_Data$EnchantedMediumPackOfHolding = {ctor: 'EnchantedMediumPackOfHolding'};
var _mordrax$cotwelm$Item_Data$EnchantedSmallPackOfHolding = {ctor: 'EnchantedSmallPackOfHolding'};
var _mordrax$cotwelm$Item_Data$LargeChest = {ctor: 'LargeChest'};
var _mordrax$cotwelm$Item_Data$MediumChest = {ctor: 'MediumChest'};
var _mordrax$cotwelm$Item_Data$SmallChest = {ctor: 'SmallChest'};
var _mordrax$cotwelm$Item_Data$LargePack = {ctor: 'LargePack'};
var _mordrax$cotwelm$Item_Data$MediumPack = {ctor: 'MediumPack'};
var _mordrax$cotwelm$Item_Data$SmallPack = {ctor: 'SmallPack'};
var _mordrax$cotwelm$Item_Data$LargeBag = {ctor: 'LargeBag'};
var _mordrax$cotwelm$Item_Data$MediumBag = {ctor: 'MediumBag'};
var _mordrax$cotwelm$Item_Data$SmallBag = {ctor: 'SmallBag'};
var _mordrax$cotwelm$Item_Data$WandQuiverBelt = {ctor: 'WandQuiverBelt'};
var _mordrax$cotwelm$Item_Data$UtilityBelt = {ctor: 'UtilityBelt'};
var _mordrax$cotwelm$Item_Data$FourSlotBelt = {ctor: 'FourSlotBelt'};
var _mordrax$cotwelm$Item_Data$ThreeSlotBelt = {ctor: 'ThreeSlotBelt'};
var _mordrax$cotwelm$Item_Data$TwoSlotBelt = {ctor: 'TwoSlotBelt'};
var _mordrax$cotwelm$Item_Data$NoOp1 = {ctor: 'NoOp1'};
var _mordrax$cotwelm$Item_Data$NoOp2 = {ctor: 'NoOp2'};
var _mordrax$cotwelm$Item_Data$NoOp3 = {ctor: 'NoOp3'};
var _mordrax$cotwelm$Item_Data$NoOp4 = {ctor: 'NoOp4'};

var _mordrax$cotwelm$Item_Weapon$init = F4(
	function (weaponType, status, idStatus, id) {
		var d = F3(
			function (n, faces, bonus) {
				return A3(_mordrax$cotwelm$Dice$Dice, n, faces, bonus);
			});
		var make = F6(
			function (name, _p1, css, _p0, wc, damage) {
				var _p2 = _p1;
				var _p3 = _p0;
				return {
					base: A7(
						_mordrax$cotwelm$Item_Data$BaseItem,
						name,
						A2(_mordrax$cotwelm$Item_Data$Prices, _p3._0, _p3._1),
						css,
						A2(_mordrax$cotwelm$Utils_Mass$Mass, _p2._0, _p2._1),
						status,
						idStatus,
						id),
					weaponType: weaponType,
					wc: wc,
					damage: damage
				};
			});
		var makeMonsterWeapon = F3(
			function (name, wc, damage) {
				return A6(
					make,
					name,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					'',
					{ctor: '_Tuple2', _0: 0, _1: 0},
					wc,
					damage);
			});
		var _p4 = weaponType;
		switch (_p4.ctor) {
			case 'BrokenSword':
				return A6(
					make,
					'Broken Sword',
					{ctor: '_Tuple2', _0: 1000, _1: 5000},
					'broken-sword',
					{ctor: '_Tuple2', _0: 0, _1: 25},
					_mordrax$cotwelm$Item_Data$WC(0),
					A3(d, 1, 6, -2));
			case 'Club':
				return A6(
					make,
					'Club',
					{ctor: '_Tuple2', _0: 1500, _1: 3000},
					'club',
					{ctor: '_Tuple2', _0: 105, _1: 60},
					_mordrax$cotwelm$Item_Data$WC(1),
					A3(d, 1, 6, 0));
			case 'Dagger':
				return A6(
					make,
					'Dagger',
					{ctor: '_Tuple2', _0: 500, _1: 500},
					'sword',
					{ctor: '_Tuple2', _0: 420, _1: 240},
					_mordrax$cotwelm$Item_Data$WC(2),
					A3(d, 1, 4, 0));
			case 'Hammer':
				return A6(
					make,
					'Hammer',
					{ctor: '_Tuple2', _0: 2000, _1: 3000},
					'hammer',
					{ctor: '_Tuple2', _0: 420, _1: 240},
					_mordrax$cotwelm$Item_Data$WC(2),
					A3(d, 1, 5, 0));
			case 'HandAxe':
				return A6(
					make,
					'Hand Axe',
					{ctor: '_Tuple2', _0: 1000, _1: 3000},
					'axe',
					{ctor: '_Tuple2', _0: 472, _1: 270},
					_mordrax$cotwelm$Item_Data$WC(3),
					A3(d, 1, 6, 0));
			case 'Quarterstaff':
				return A6(
					make,
					'Quarterstaff',
					{ctor: '_Tuple2', _0: 750, _1: 5000},
					'spear',
					{ctor: '_Tuple2', _0: 648, _1: 360},
					_mordrax$cotwelm$Item_Data$WC(3),
					A3(d, 1, 6, 0));
			case 'Spear':
				return A6(
					make,
					'Spear',
					{ctor: '_Tuple2', _0: 1500, _1: 5000},
					'spear',
					{ctor: '_Tuple2', _0: 840, _1: 480},
					_mordrax$cotwelm$Item_Data$WC(4),
					A3(d, 1, 8, 0));
			case 'ShortSword':
				return A6(
					make,
					'Short Sword',
					{ctor: '_Tuple2', _0: 1000, _1: 5000},
					'sword',
					{ctor: '_Tuple2', _0: 1470, _1: 840},
					_mordrax$cotwelm$Item_Data$WC(5),
					A3(d, 1, 6, 0));
			case 'Mace':
				return A6(
					make,
					'Mace',
					{ctor: '_Tuple2', _0: 2500, _1: 4375},
					'mace',
					{ctor: '_Tuple2', _0: 1728, _1: 960},
					_mordrax$cotwelm$Item_Data$WC(5),
					A3(d, 1, 6, 0));
			case 'Flail':
				return A6(
					make,
					'Flail',
					{ctor: '_Tuple2', _0: 2000, _1: 3250},
					'flail',
					{ctor: '_Tuple2', _0: 1512, _1: 840},
					_mordrax$cotwelm$Item_Data$WC(6),
					A3(d, 1, 7, 0));
			case 'Axe':
				return A6(
					make,
					'Axe',
					{ctor: '_Tuple2', _0: 2000, _1: 5000},
					'axe',
					{ctor: '_Tuple2', _0: 1944, _1: 1080},
					_mordrax$cotwelm$Item_Data$WC(6),
					A3(d, 1, 7, 0));
			case 'WarHammer':
				return A6(
					make,
					'War Hammer',
					{ctor: '_Tuple2', _0: 1400, _1: 7500},
					'hammer',
					{ctor: '_Tuple2', _0: 2160, _1: 1200},
					_mordrax$cotwelm$Item_Data$WC(7),
					A3(d, 1, 7, 0));
			case 'LongSword':
				return A6(
					make,
					'Long Sword',
					{ctor: '_Tuple2', _0: 1500, _1: 8000},
					'sword',
					{ctor: '_Tuple2', _0: 3240, _1: 1800},
					_mordrax$cotwelm$Item_Data$WC(8),
					A3(d, 1, 8, 0));
			case 'BattleAxe':
				return A6(
					make,
					'Battle Axe',
					{ctor: '_Tuple2', _0: 3000, _1: 6000},
					'axe',
					{ctor: '_Tuple2', _0: 2160, _1: 1200},
					_mordrax$cotwelm$Item_Data$WC(8),
					A3(d, 1, 9, 0));
			case 'BroadSword':
				return A6(
					make,
					'Broad Sword',
					{ctor: '_Tuple2', _0: 1600, _1: 9000},
					'sword',
					{ctor: '_Tuple2', _0: 3240, _1: 1800},
					_mordrax$cotwelm$Item_Data$WC(9),
					A3(d, 1, 10, 0));
			case 'MorningStar':
				return A6(
					make,
					'Morning Star',
					{ctor: '_Tuple2', _0: 3000, _1: 9000},
					'morning-star',
					{ctor: '_Tuple2', _0: 2160, _1: 1200},
					_mordrax$cotwelm$Item_Data$WC(10),
					A3(d, 1, 10, 0));
			case 'BastardSword':
				return A6(
					make,
					'Bastard Sword',
					{ctor: '_Tuple2', _0: 3000, _1: 10000},
					'sword',
					{ctor: '_Tuple2', _0: 4320, _1: 2400},
					_mordrax$cotwelm$Item_Data$WC(11),
					A3(d, 1, 10, 0));
			case 'TwoHandedSword':
				return A6(
					make,
					'Two Handed Sword',
					{ctor: '_Tuple2', _0: 5000, _1: 12000},
					'sword',
					{ctor: '_Tuple2', _0: 6360, _1: 3600},
					_mordrax$cotwelm$Item_Data$WC(12),
					A3(d, 1, 12, 0));
			case 'SmallClaws':
				return A3(
					makeMonsterWeapon,
					'Small Claws',
					_mordrax$cotwelm$Item_Data$WC(1),
					A3(d, 1, 3, 0));
			case 'Crossbow':
				return A3(
					makeMonsterWeapon,
					'Crossbow',
					_mordrax$cotwelm$Item_Data$WC(5),
					A3(d, 1, 12, 3));
			case 'Fangs':
				return A3(
					makeMonsterWeapon,
					'Fangs',
					_mordrax$cotwelm$Item_Data$WC(10),
					A3(d, 1, 2, 0));
			case 'Pincers':
				return A3(
					makeMonsterWeapon,
					'Pincers',
					_mordrax$cotwelm$Item_Data$WC(10),
					A3(d, 2, 6, 0));
			case 'Bow':
				return A3(
					makeMonsterWeapon,
					'Bow',
					_mordrax$cotwelm$Item_Data$WC(6),
					A3(d, 1, 6, 0));
			default:
				return A3(
					makeMonsterWeapon,
					'Large Claws',
					_mordrax$cotwelm$Item_Data$WC(8),
					A3(d, 2, 6, 0));
		}
	});
var _mordrax$cotwelm$Item_Weapon$damage = function (_p5) {
	var _p6 = _p5;
	return _p6.damage;
};

var _mordrax$cotwelm$Item_Armour$init = F4(
	function (armourType, status, idStatus, id) {
		var make = F5(
			function (name, _p1, css, _p0, ac) {
				var _p2 = _p1;
				var _p3 = _p0;
				return {
					base: A7(
						_mordrax$cotwelm$Item_Data$BaseItem,
						name,
						A2(_mordrax$cotwelm$Item_Data$Prices, _p3._0, _p3._1),
						css,
						A2(_mordrax$cotwelm$Utils_Mass$Mass, _p2._0, _p2._1),
						status,
						idStatus,
						id),
					armourType: armourType,
					ac: ac
				};
			});
		var makeMonsterArmour = F2(
			function (name, ac) {
				return A5(
					make,
					name,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					'',
					{ctor: '_Tuple2', _0: 0, _1: 0},
					ac);
			});
		var _p4 = armourType;
		switch (_p4.ctor) {
			case 'RustyArmour':
				return A5(
					make,
					'Rusty Armour',
					{ctor: '_Tuple2', _0: 10000, _1: 30000},
					'broken-armour',
					{ctor: '_Tuple2', _0: 0, _1: 25},
					_mordrax$cotwelm$Item_Data$AC(0));
			case 'LeatherArmour':
				return A5(
					make,
					'Leather Armour',
					{ctor: '_Tuple2', _0: 5000, _1: 2400},
					'leather-armour',
					{ctor: '_Tuple2', _0: 1080, _1: 600},
					_mordrax$cotwelm$Item_Data$AC(6));
			case 'StuddedLeatherArmour':
				return A5(
					make,
					'Studded Leather Armour',
					{ctor: '_Tuple2', _0: 7000, _1: 25000},
					'leather-armour',
					{ctor: '_Tuple2', _0: 3150, _1: 1800},
					_mordrax$cotwelm$Item_Data$AC(12));
			case 'RingMail':
				return A5(
					make,
					'Ring Mail',
					{ctor: '_Tuple2', _0: 8000, _1: 30000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 6300, _1: 3600},
					_mordrax$cotwelm$Item_Data$AC(18));
			case 'ScaleMail':
				return A5(
					make,
					'Scale Mail',
					{ctor: '_Tuple2', _0: 9000, _1: 30000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 10800, _1: 6000},
					_mordrax$cotwelm$Item_Data$AC(24));
			case 'ChainMail':
				return A5(
					make,
					'Chain Mail',
					{ctor: '_Tuple2', _0: 10000, _1: 30000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 16200, _1: 9000},
					_mordrax$cotwelm$Item_Data$AC(30));
			case 'SplintMail':
				return A5(
					make,
					'Splint Mail',
					{ctor: '_Tuple2', _0: 12000, _1: 40000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 27000, _1: 15000},
					_mordrax$cotwelm$Item_Data$AC(36));
			case 'PlateMail':
				return A5(
					make,
					'Plate Mail',
					{ctor: '_Tuple2', _0: 15000, _1: 40000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 42000, _1: 24000},
					_mordrax$cotwelm$Item_Data$AC(42));
			case 'PlateArmour':
				return A5(
					make,
					'Plate Armour',
					{ctor: '_Tuple2', _0: 15000, _1: 60000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 42000, _1: 24000},
					_mordrax$cotwelm$Item_Data$AC(48));
			case 'MeteoricSteelPlate':
				return A5(
					make,
					'Meteoric Steel Plate',
					{ctor: '_Tuple2', _0: 5000, _1: 30000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 105000, _1: 60000},
					_mordrax$cotwelm$Item_Data$AC(54));
			case 'ElvenChainMail':
				return A5(
					make,
					'Elven Chain Mail',
					{ctor: '_Tuple2', _0: 5000, _1: 24000},
					'metal-armour',
					{ctor: '_Tuple2', _0: 162000, _1: 90000},
					_mordrax$cotwelm$Item_Data$AC(52));
			case 'SoftHide':
				return A2(
					makeMonsterArmour,
					'Soft Hide',
					_mordrax$cotwelm$Item_Data$AC(2));
			case 'Bones':
				return A2(
					makeMonsterArmour,
					'Bones',
					_mordrax$cotwelm$Item_Data$AC(12));
			case 'Shell':
				return A2(
					makeMonsterArmour,
					'Shell',
					_mordrax$cotwelm$Item_Data$AC(18));
			default:
				return A2(
					makeMonsterArmour,
					'Tough Hide',
					_mordrax$cotwelm$Item_Data$AC(24));
		}
	});

var _mordrax$cotwelm$Item_Shield$init = F4(
	function (shieldType, status, idStatus, id) {
		var make = F5(
			function (name, mass, css, prices, ac) {
				return {
					base: A7(_mordrax$cotwelm$Item_Data$BaseItem, name, prices, css, mass, status, idStatus, id),
					shieldType: shieldType,
					ac: ac
				};
			});
		var _p0 = shieldType;
		switch (_p0.ctor) {
			case 'BrokenShield':
				return A5(
					make,
					'Broken Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 4000, 35000),
					'broken-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 0, 25),
					_mordrax$cotwelm$Item_Data$AC(0));
			case 'SmallWoodenShield':
				return A5(
					make,
					'Small Wooden Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 3000, 15000),
					'wood-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 525, 300),
					_mordrax$cotwelm$Item_Data$AC(3));
			case 'MediumWoodenShield':
				return A5(
					make,
					'Medium Wooden Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 4000, 35000),
					'wood-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 1050, 600),
					_mordrax$cotwelm$Item_Data$AC(6));
			case 'LargeWoodenShield':
				return A5(
					make,
					'Large Wooden Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 5000, 50000),
					'wood-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 2100, 1200),
					_mordrax$cotwelm$Item_Data$AC(9));
			case 'SmallIronShield':
				return A5(
					make,
					'Small Iron Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 4000, 15000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 1260, 720),
					_mordrax$cotwelm$Item_Data$AC(6));
			case 'MediumIronShield':
				return A5(
					make,
					'Medium Iron Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 5000, 35000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 2592, 1440),
					_mordrax$cotwelm$Item_Data$AC(9));
			case 'LargeIronShield':
				return A5(
					make,
					'Large Iron Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 6000, 50000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 3150, 1800),
					_mordrax$cotwelm$Item_Data$AC(12));
			case 'SmallSteelShield':
				return A5(
					make,
					'Small Steel Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 4000, 15000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 2730, 1560),
					_mordrax$cotwelm$Item_Data$AC(9));
			case 'MediumSteelShield':
				return A5(
					make,
					'Medium Steel Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 5000, 35000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 3360, 1920),
					_mordrax$cotwelm$Item_Data$AC(12));
			case 'LargeSteelShield':
				return A5(
					make,
					'Large Steel Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 6000, 50000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 4200, 2400),
					_mordrax$cotwelm$Item_Data$AC(15));
			case 'SmallMeteoricSteelShield':
				return A5(
					make,
					'Small Meteoric Steel Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 2500, 10000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 4620, 2640),
					_mordrax$cotwelm$Item_Data$AC(15));
			case 'MediumMeteoricSteelShield':
				return A5(
					make,
					'Medium Meteoric Steel Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 3500, 25000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 5940, 3300),
					_mordrax$cotwelm$Item_Data$AC(18));
			default:
				return A5(
					make,
					'Large Meteoric Steel Shield',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 4500, 35000),
					'metal-shield',
					A2(_mordrax$cotwelm$Item_Data$Prices, 7560, 4200),
					_mordrax$cotwelm$Item_Data$AC(21));
		}
	});

var _mordrax$cotwelm$Item_Helmet$init = F4(
	function (helmetType, status, idStatus, id) {
		var make = F5(
			function (name, mass, css, prices, ac) {
				return {
					base: A7(_mordrax$cotwelm$Item_Data$BaseItem, name, prices, css, mass, status, idStatus, id),
					helmetType: helmetType,
					ac: ac
				};
			});
		var _p0 = helmetType;
		switch (_p0.ctor) {
			case 'BrokenHelmet':
				return A5(
					make,
					'Broken Helmet',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 1000, 1000),
					'broken-helmet',
					A2(_mordrax$cotwelm$Item_Data$Prices, 0, 25),
					_mordrax$cotwelm$Item_Data$AC(0));
			case 'LeatherHelmet':
				return A5(
					make,
					'Leather Helmet',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 500),
					'leather-helmet',
					A2(_mordrax$cotwelm$Item_Data$Prices, 525, 300),
					_mordrax$cotwelm$Item_Data$AC(3));
			case 'IronHelmet':
				return A5(
					make,
					'Iron Helmet',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 2000, 2000),
					'metal-helmet',
					A2(_mordrax$cotwelm$Item_Data$Prices, 1050, 600),
					_mordrax$cotwelm$Item_Data$AC(6));
			case 'SteelHelmet':
				return A5(
					make,
					'Steel Helmet',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 2500, 2000),
					'metal-helmet',
					A2(_mordrax$cotwelm$Item_Data$Prices, 3150, 1800),
					_mordrax$cotwelm$Item_Data$AC(9));
			case 'MeteoricSteelHelmet':
				return A5(
					make,
					'Meteoric Steel Helmet',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 1000, 2000),
					'metal-helmet',
					A2(_mordrax$cotwelm$Item_Data$Prices, 10500, 6000),
					_mordrax$cotwelm$Item_Data$AC(15));
			case 'HelmetOfDetectMonsters':
				return A5(
					make,
					'Helmet Of Detect Monsters',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 2500, 2000),
					'helmet-of-detect-monsters',
					A2(_mordrax$cotwelm$Item_Data$Prices, 42000, 24000),
					_mordrax$cotwelm$Item_Data$AC(9));
			default:
				return A5(
					make,
					'Enchanted Helm Of Storms',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 1000, 2000),
					'enchanted-helm-of-storms',
					A2(_mordrax$cotwelm$Item_Data$Prices, 1050000, 600000),
					_mordrax$cotwelm$Item_Data$AC(25));
		}
	});

var _mordrax$cotwelm$Item_Bracers$init = F4(
	function (bracersType, status, idStatus, id) {
		var make = F5(
			function (name, mass, css, prices, ac) {
				return {
					base: A7(_mordrax$cotwelm$Item_Data$BaseItem, name, prices, css, mass, status, idStatus, id),
					bracersType: bracersType,
					ac: ac
				};
			});
		var _p0 = bracersType;
		switch (_p0.ctor) {
			case 'NormalBracers':
				return A5(
					make,
					'Bracers',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'bracers',
					A2(_mordrax$cotwelm$Item_Data$Prices, 108, 60),
					_mordrax$cotwelm$Item_Data$AC(3));
			case 'BracersOfDefenseNormal':
				return A5(
					make,
					'Bracers Of Defense Normal',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'bracers-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 1836, 1020),
					_mordrax$cotwelm$Item_Data$AC(8));
			case 'BracersOfDefenseS':
				return A5(
					make,
					'Bracers Of Defense Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'bracers-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 5616, 3120),
					_mordrax$cotwelm$Item_Data$AC(13));
			default:
				return A5(
					make,
					'Bracers Of Defense Very Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'bracers-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 11556, 6420),
					_mordrax$cotwelm$Item_Data$AC(18));
		}
	});

var _mordrax$cotwelm$Item_Gauntlets$init = F4(
	function (gauntletsType, status, idStatus, id) {
		var make = F5(
			function (name, mass, css, prices, ac) {
				return {
					base: A7(_mordrax$cotwelm$Item_Data$BaseItem, name, prices, css, mass, status, idStatus, id),
					gauntletsType: gauntletsType,
					ac: ac
				};
			});
		var _p0 = gauntletsType;
		switch (_p0.ctor) {
			case 'NormalGauntlets':
				return A5(
					make,
					'Gauntlet',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet',
					A2(_mordrax$cotwelm$Item_Data$Prices, 105, 60),
					_mordrax$cotwelm$Item_Data$AC(5));
			case 'GauntletOfProtection':
				return A5(
					make,
					'Gauntlet Of Protection',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 2625, 1500),
					_mordrax$cotwelm$Item_Data$AC(10));
			case 'GauntletOfProtectionS':
				return A5(
					make,
					'Gauntlet Of Protection Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 6300, 3600),
					_mordrax$cotwelm$Item_Data$AC(15));
			case 'GauntletOfProtectionVS':
				return A5(
					make,
					'Gauntlet Of Protection Very Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 12420, 6900),
					_mordrax$cotwelm$Item_Data$AC(20));
			case 'GauntletOfSlaying':
				return A5(
					make,
					'Gauntlet Of Slaying',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-of-slaying',
					A2(_mordrax$cotwelm$Item_Data$Prices, 3780, 2100),
					_mordrax$cotwelm$Item_Data$AC(0));
			case 'GauntletOfSlayingS_S':
				return A5(
					make,
					'Gauntlet Of Slaying Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-of-slaying',
					A2(_mordrax$cotwelm$Item_Data$Prices, 7560, 4200),
					_mordrax$cotwelm$Item_Data$AC(0));
			case 'GauntletOfSlayingVS_VS':
				return A5(
					make,
					'Gauntlet Of Slaying Very Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-of-slaying',
					A2(_mordrax$cotwelm$Item_Data$Prices, 13125, 7500),
					_mordrax$cotwelm$Item_Data$AC(0));
			case 'GauntletOfDexterity':
				return A5(
					make,
					'Gauntlet Of Dexterity',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 3240, 1800),
					_mordrax$cotwelm$Item_Data$AC(5));
			case 'GauntletOfDexterityS':
				return A5(
					make,
					'Gauntlet Of Dexterity Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 7020, 3900),
					_mordrax$cotwelm$Item_Data$AC(5));
			case 'GauntletOfDexterityVS':
				return A5(
					make,
					'Gauntlet Of Dexterity Very Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 12960, 7200),
					_mordrax$cotwelm$Item_Data$AC(5));
			case 'GauntletOfStrength':
				return A5(
					make,
					'Gauntlet Of Strength',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 3240, 1800),
					_mordrax$cotwelm$Item_Data$AC(5));
			case 'GauntletOfStrengthS':
				return A5(
					make,
					'Gauntlet Of Strength Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 0, 0),
					_mordrax$cotwelm$Item_Data$AC(5));
			default:
				return A5(
					make,
					'Gauntlet Of Strength Very Strong',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 500, 2000),
					'gauntlet-enchanted',
					A2(_mordrax$cotwelm$Item_Data$Prices, 12960, 7200),
					_mordrax$cotwelm$Item_Data$AC(5));
		}
	});

var _mordrax$cotwelm$Item_Belt$Belt = F3(
	function (a, b, c) {
		return {base: a, beltType: b, beltContainer: c};
	});
var _mordrax$cotwelm$Item_Belt$FourSlot = function (a) {
	return {ctor: 'FourSlot', _0: a};
};
var _mordrax$cotwelm$Item_Belt$ThreeSlot = function (a) {
	return {ctor: 'ThreeSlot', _0: a};
};
var _mordrax$cotwelm$Item_Belt$TwoSlot = function (a) {
	return {ctor: 'TwoSlot', _0: a};
};
var _mordrax$cotwelm$Item_Belt$initBeltContainer = function (beltType) {
	var _p0 = beltType;
	switch (_p0.ctor) {
		case 'TwoSlotBelt':
			return _mordrax$cotwelm$Item_Belt$TwoSlot(
				{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing});
		case 'ThreeSlotBelt':
			return _mordrax$cotwelm$Item_Belt$ThreeSlot(
				{ctor: '_Tuple3', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing, _2: _elm_lang$core$Maybe$Nothing});
		case 'FourSlotBelt':
			return _mordrax$cotwelm$Item_Belt$FourSlot(
				{ctor: '_Tuple4', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing, _2: _elm_lang$core$Maybe$Nothing, _3: _elm_lang$core$Maybe$Nothing});
		case 'UtilityBelt':
			return _mordrax$cotwelm$Item_Belt$TwoSlot(
				{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing});
		default:
			return _mordrax$cotwelm$Item_Belt$TwoSlot(
				{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing});
	}
};
var _mordrax$cotwelm$Item_Belt$init = F4(
	function (beltType, status, idStatus, id) {
		var make = F5(
			function (name, mass, css, prices, container) {
				return {
					base: A7(_mordrax$cotwelm$Item_Data$BaseItem, name, prices, css, mass, status, idStatus, id),
					beltType: beltType,
					beltContainer: _mordrax$cotwelm$Item_Belt$initBeltContainer(beltType)
				};
			});
		var _p1 = beltType;
		switch (_p1.ctor) {
			case 'TwoSlotBelt':
				return A5(
					make,
					'Two Slot Belt',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					'slot-belt',
					A2(_mordrax$cotwelm$Item_Data$Prices, 300, 300),
					_mordrax$cotwelm$Item_Belt$initBeltContainer(_mordrax$cotwelm$Item_Data$TwoSlotBelt));
			case 'ThreeSlotBelt':
				return A5(
					make,
					'Three Slot Belt',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					'slot-belt',
					A2(_mordrax$cotwelm$Item_Data$Prices, 300, 300),
					_mordrax$cotwelm$Item_Belt$initBeltContainer(_mordrax$cotwelm$Item_Data$ThreeSlotBelt));
			case 'FourSlotBelt':
				return A5(
					make,
					'Four Slot Belt',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					'slot-belt',
					A2(_mordrax$cotwelm$Item_Data$Prices, 300, 300),
					_mordrax$cotwelm$Item_Belt$initBeltContainer(_mordrax$cotwelm$Item_Data$FourSlotBelt));
			case 'UtilityBelt':
				return A5(
					make,
					'Utility Belt',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					'utility-belt',
					A2(_mordrax$cotwelm$Item_Data$Prices, 1350, 1800),
					_mordrax$cotwelm$Item_Belt$initBeltContainer(_mordrax$cotwelm$Item_Data$UtilityBelt));
			default:
				return A5(
					make,
					'Wand Quiver Belt',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					'wand-quiver-belt',
					A2(_mordrax$cotwelm$Item_Data$Prices, 300, 300),
					_mordrax$cotwelm$Item_Belt$initBeltContainer(_mordrax$cotwelm$Item_Data$WandQuiverBelt));
		}
	});

var _mordrax$cotwelm$Item_Pack$init = F5(
	function (packType, toContainer, status, idStatus, id) {
		var make = F5(
			function (name, price, css, mass, capacity) {
				return {
					base: A7(_mordrax$cotwelm$Item_Data$BaseItem, name, price, css, mass, status, idStatus, id),
					packType: packType,
					container: toContainer(capacity)
				};
			});
		var _p0 = packType;
		switch (_p0.ctor) {
			case 'SmallBag':
				return A5(
					make,
					'Small Bag',
					A2(_mordrax$cotwelm$Item_Data$Prices, 300, 500),
					'bag',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 5000, 6000));
			case 'MediumBag':
				return A5(
					make,
					'Medium Bag',
					A2(_mordrax$cotwelm$Item_Data$Prices, 500, 700),
					'bag',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 10000, 12000));
			case 'LargeBag':
				return A5(
					make,
					'Large Bag',
					A2(_mordrax$cotwelm$Item_Data$Prices, 900, 900),
					'bag',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 15000, 18000));
			case 'SmallPack':
				return A5(
					make,
					'Small Pack',
					A2(_mordrax$cotwelm$Item_Data$Prices, 1000, 1000),
					'pack',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 12000, 50000));
			case 'MediumPack':
				return A5(
					make,
					'Medium Pack',
					A2(_mordrax$cotwelm$Item_Data$Prices, 2000, 1500),
					'pack',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 22000, 75000));
			case 'LargePack':
				return A5(
					make,
					'Large Pack',
					A2(_mordrax$cotwelm$Item_Data$Prices, 4000, 100000),
					'pack',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 35000, 100000));
			case 'SmallChest':
				return A5(
					make,
					'Small Chest',
					A2(_mordrax$cotwelm$Item_Data$Prices, 5000, 100000),
					'chest',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 100000, 50000));
			case 'MediumChest':
				return A5(
					make,
					'Medium Chest',
					A2(_mordrax$cotwelm$Item_Data$Prices, 15000, 150000),
					'chest',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 100000, 150000));
			case 'LargeChest':
				return A5(
					make,
					'Large Chest',
					A2(_mordrax$cotwelm$Item_Data$Prices, 25000, 250000),
					'chest',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 100000, 250000));
			case 'EnchantedSmallPackOfHolding':
				return A5(
					make,
					'Enchanted Small Pack Of Holding',
					A2(_mordrax$cotwelm$Item_Data$Prices, 5000, 75000),
					'enchanted-pack',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 50000, 150000));
			case 'EnchantedMediumPackOfHolding':
				return A5(
					make,
					'Enchanted Medium Pack Of Holding',
					A2(_mordrax$cotwelm$Item_Data$Prices, 7500, 100000),
					'enchanted-pack',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 75000, 200000));
			default:
				return A5(
					make,
					'Enchanted Large Pack Of Holding',
					A2(_mordrax$cotwelm$Item_Data$Prices, 10000, 125000),
					'enchanted-pack',
					A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
					A2(_mordrax$cotwelm$Utils_Mass$Capacity, 100000, 250000));
		}
	});
var _mordrax$cotwelm$Item_Pack$remove = F2(
	function (item, pack) {
		var newContainer = A2(_mordrax$cotwelm$Container$remove, item, pack.container);
		return _elm_lang$core$Native_Utils.update(
			pack,
			{container: newContainer});
	});
var _mordrax$cotwelm$Item_Pack$add = F2(
	function (item, pack) {
		var _p1 = A2(_mordrax$cotwelm$Container$add, item, pack.container);
		var newContainer = _p1._0;
		var msgs = _p1._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				pack,
				{container: newContainer}),
			_1: msgs
		};
	});
var _mordrax$cotwelm$Item_Pack$contents = function (_p2) {
	var _p3 = _p2;
	return _mordrax$cotwelm$Container$list(_p3.container);
};
var _mordrax$cotwelm$Item_Pack$info = function (_p4) {
	var _p5 = _p4;
	var _p6 = _p5.container;
	return {
		ctor: '_Tuple2',
		_0: _mordrax$cotwelm$Container$mass(_p6),
		_1: _mordrax$cotwelm$Container$capacity(_p6)
	};
};
var _mordrax$cotwelm$Item_Pack$Pack = F3(
	function (a, b, c) {
		return {base: a, packType: b, container: c};
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
var _mordrax$cotwelm$Item_Purse$initCoinBaseItem = F4(
	function (name, css, id, value) {
		return A7(
			_mordrax$cotwelm$Item_Data$BaseItem,
			name,
			A2(_mordrax$cotwelm$Item_Data$Prices, value, value),
			css,
			A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
			_mordrax$cotwelm$Item_Data$Normal,
			_mordrax$cotwelm$Item_Data$Identified,
			id);
	});
var _mordrax$cotwelm$Item_Purse$initCoppers = F2(
	function (id, value) {
		return {
			base: A4(_mordrax$cotwelm$Item_Purse$initCoinBaseItem, 'Copper', 'coins-copper', id, value),
			value: value
		};
	});
var _mordrax$cotwelm$Item_Purse$initSilvers = F2(
	function (id, value) {
		return {
			base: A4(_mordrax$cotwelm$Item_Purse$initCoinBaseItem, 'Silver', 'coins-silver', id, value),
			value: value
		};
	});
var _mordrax$cotwelm$Item_Purse$initGolds = F2(
	function (id, value) {
		return {
			base: A4(_mordrax$cotwelm$Item_Purse$initCoinBaseItem, 'Gold', 'coins-gold', id, value),
			value: value
		};
	});
var _mordrax$cotwelm$Item_Purse$initPlatinums = F2(
	function (id, value) {
		return {
			base: A4(_mordrax$cotwelm$Item_Purse$initCoinBaseItem, 'Platinum', 'coins-platinum', id, value),
			value: value
		};
	});
var _mordrax$cotwelm$Item_Purse$CopperCoins = F2(
	function (a, b) {
		return {base: a, value: b};
	});
var _mordrax$cotwelm$Item_Purse$SilverCoins = F2(
	function (a, b) {
		return {base: a, value: b};
	});
var _mordrax$cotwelm$Item_Purse$GoldCoins = F2(
	function (a, b) {
		return {base: a, value: b};
	});
var _mordrax$cotwelm$Item_Purse$PlatinumCoins = F2(
	function (a, b) {
		return {base: a, value: b};
	});
var _mordrax$cotwelm$Item_Purse$Coins = F4(
	function (a, b, c, d) {
		return {copper: a, silver: b, gold: c, platinum: d};
	});
var _mordrax$cotwelm$Item_Purse$init = {
	base: A7(
		_mordrax$cotwelm$Item_Data$BaseItem,
		'Purse',
		A2(_mordrax$cotwelm$Item_Data$Prices, 0, 0),
		'Purse',
		A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
		_mordrax$cotwelm$Item_Data$Normal,
		_mordrax$cotwelm$Item_Data$Identified,
		_mordrax$cotwelm$Utils_IdGenerator$empty),
	coins: A4(_mordrax$cotwelm$Item_Purse$Coins, 100, 10, 1, 1)
};
var _mordrax$cotwelm$Item_Purse$merge_ = F3(
	function (op, c1, c2) {
		return A4(
			_mordrax$cotwelm$Item_Purse$Coins,
			A2(op, c1.copper, c2.copper),
			A2(op, c1.silver, c2.silver),
			A2(op, c1.gold, c2.gold),
			A2(op, c1.platinum, c2.platinum));
	});
var _mordrax$cotwelm$Item_Purse$toLeastCoins = function (coppers) {
	var _p1 = _mordrax$cotwelm$Item_Purse$toLeastGold(coppers);
	var copper = _p1._0;
	var silver = _p1._1;
	var gold = _p1._2;
	return A4(
		_mordrax$cotwelm$Item_Purse$Coins,
		copper,
		silver,
		A2(_elm_lang$core$Basics_ops['%'], gold, 100),
		(gold / 100) | 0);
};
var _mordrax$cotwelm$Item_Purse$add = F2(
	function (coppers, _p2) {
		var _p3 = _p2;
		var _p4 = _p3.coins;
		var leastCoins = _mordrax$cotwelm$Item_Purse$toLeastCoins(coppers);
		return _elm_lang$core$Native_Utils.update(
			_p3,
			{
				coins: A4(_mordrax$cotwelm$Item_Purse$Coins, _p4.copper + leastCoins.copper, _p4.silver + leastCoins.silver, _p4.gold + leastCoins.gold, _p4.platinum + leastCoins.platinum)
			});
	});
var _mordrax$cotwelm$Item_Purse$remove = F2(
	function (copperToRemove, _p5) {
		var _p6 = _p5;
		var _p10 = _p6;
		var _p9 = _p6.coins;
		var totalSilvers = _p9.copper + (_p9.silver * 100);
		var totalGold = totalSilvers + (_p9.gold * 10000);
		var totalPlatinum = totalGold + (_p9.platinum * 1000000);
		if (_elm_lang$core$Native_Utils.cmp(copperToRemove, _p9.copper) < 1) {
			return _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					_p10,
					{
						coins: _elm_lang$core$Native_Utils.update(
							_p9,
							{copper: _p9.copper - copperToRemove})
					}));
		} else {
			if (_elm_lang$core$Native_Utils.cmp(copperToRemove, totalSilvers) < 1) {
				var _p7 = _mordrax$cotwelm$Item_Purse$toLeastSilvers(totalSilvers - copperToRemove);
				var copper_ = _p7._0;
				var silver_ = _p7._1;
				return _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						_p10,
						{
							coins: _elm_lang$core$Native_Utils.update(
								_p9,
								{copper: copper_, silver: silver_})
						}));
			} else {
				if (_elm_lang$core$Native_Utils.cmp(copperToRemove, totalGold) < 1) {
					var _p8 = _mordrax$cotwelm$Item_Purse$toLeastGold(totalGold - copperToRemove);
					var copper_ = _p8._0;
					var silver_ = _p8._1;
					var gold_ = _p8._2;
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							_p10,
							{
								coins: _elm_lang$core$Native_Utils.update(
									_p9,
									{copper: copper_, silver: silver_, gold: gold_})
							}));
				} else {
					if (_elm_lang$core$Native_Utils.cmp(copperToRemove, totalPlatinum) < 1) {
						var coins = _mordrax$cotwelm$Item_Purse$toLeastCoins(totalPlatinum - copperToRemove);
						return _elm_lang$core$Result$Ok(
							_elm_lang$core$Native_Utils.update(
								_p10,
								{
									coins: _elm_lang$core$Native_Utils.update(
										coins,
										{copper: coins.copper, silver: coins.silver, gold: coins.gold, platinum: coins.platinum})
								}));
					} else {
						return _elm_lang$core$Result$Err('Not enough coins to remove!');
					}
				}
			}
		}
	});
var _mordrax$cotwelm$Item_Purse$Purse = F2(
	function (a, b) {
		return {base: a, coins: b};
	});
var _mordrax$cotwelm$Item_Purse$addCoins = F2(
	function (coins, purse) {
		return A2(
			_mordrax$cotwelm$Item_Purse$Purse,
			purse.base,
			A3(
				_mordrax$cotwelm$Item_Purse$merge_,
				F2(
					function (x, y) {
						return x + y;
					}),
				coins,
				purse.coins));
	});
var _mordrax$cotwelm$Item_Purse$merge = F2(
	function (p1, p2) {
		return A2(
			_mordrax$cotwelm$Item_Purse$Purse,
			p1.base,
			A3(
				_mordrax$cotwelm$Item_Purse$merge_,
				F2(
					function (x, y) {
						return x + y;
					}),
				p1.coins,
				p2.coins));
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
var _mordrax$cotwelm$Item_Item$getModel = function (anItem) {
	var _p2 = anItem;
	switch (_p2.ctor) {
		case 'ItemWeapon':
			return _p2._0.base;
		case 'ItemArmour':
			return _p2._0.base;
		case 'ItemShield':
			return _p2._0.base;
		case 'ItemHelmet':
			return _p2._0.base;
		case 'ItemBracers':
			return _p2._0.base;
		case 'ItemGauntlets':
			return _p2._0.base;
		case 'ItemBelt':
			return _p2._0.base;
		case 'ItemPack':
			return _p2._0.base;
		case 'ItemPurse':
			return _p2._0.base;
		case 'ItemNeckwear':
			return _p2._0.base;
		case 'ItemOvergarment':
			return _p2._0.base;
		case 'ItemRing':
			return _p2._0.base;
		case 'ItemBoots':
			return _p2._0.base;
		case 'ItemCopper':
			return _p2._0.base;
		case 'ItemSilver':
			return _p2._0.base;
		case 'ItemGold':
			return _p2._0.base;
		default:
			return _p2._0.base;
	}
};
var _mordrax$cotwelm$Item_Item$css = function (_p3) {
	return function (_) {
		return _.css;
	}(
		_mordrax$cotwelm$Item_Item$getModel(_p3));
};
var _mordrax$cotwelm$Item_Item$viewSlot = F2(
	function (item, extraContent) {
		var model = _mordrax$cotwelm$Item_Item$getModel(item);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('card'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('image'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$i,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class(
											A2(_elm_lang$core$Basics_ops['++'], 'cotw-item ', model.css)),
										_1: {ctor: '[]'}
									},
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('content'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$a,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('header'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text(model.name),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('meta'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$span,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('date'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text(''),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$div,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$class('description'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$style(
															{
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'maxWidth', _1: '7em'},
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text(''),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('extra content'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(extraContent),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {ctor: '[]'}
			});
	});
var _mordrax$cotwelm$Item_Item$view = function (item) {
	return A2(_mordrax$cotwelm$Item_Item$viewSlot, item, '');
};
var _mordrax$cotwelm$Item_Item$equals = F2(
	function (anItemA, anItemB) {
		var modelB = _mordrax$cotwelm$Item_Item$getModel(anItemB);
		var modelA = _mordrax$cotwelm$Item_Item$getModel(anItemA);
		return A2(_mordrax$cotwelm$Utils_IdGenerator$equals, modelA.id, modelB.id);
	});
var _mordrax$cotwelm$Item_Item$isCursed = function () {
	var isCursed = function (status) {
		return _elm_lang$core$Native_Utils.eq(status, _mordrax$cotwelm$Item_Data$Cursed);
	};
	return function (_p4) {
		return isCursed(
			function (_) {
				return _.status;
			}(
				_mordrax$cotwelm$Item_Item$getModel(_p4)));
	};
}();
var _mordrax$cotwelm$Item_Item$baseItemMass = function (_p5) {
	var _p6 = _p5;
	return _p6.mass;
};
var _mordrax$cotwelm$Item_Item$mass = function (_p7) {
	return function (_) {
		return _.mass;
	}(
		_mordrax$cotwelm$Item_Item$getModel(_p7));
};
var _mordrax$cotwelm$Item_Item$containerBuilder = function (capacity) {
	return A3(_mordrax$cotwelm$Container$init, capacity, _mordrax$cotwelm$Item_Item$mass, _mordrax$cotwelm$Item_Item$equals);
};
var _mordrax$cotwelm$Item_Item$costOf = function (item) {
	var _p8 = function (_) {
		return _.prices;
	}(
		_mordrax$cotwelm$Item_Item$getModel(item));
	var buy = _p8._0;
	var sell = _p8._1;
	return buy;
};
var _mordrax$cotwelm$Item_Item$priceOf = function (item) {
	var _p9 = function (_) {
		return _.prices;
	}(
		_mordrax$cotwelm$Item_Item$getModel(item));
	var buy = _p9._0;
	var sell = _p9._1;
	return sell;
};
var _mordrax$cotwelm$Item_Item$ItemPlatinum = function (a) {
	return {ctor: 'ItemPlatinum', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemGold = function (a) {
	return {ctor: 'ItemGold', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemSilver = function (a) {
	return {ctor: 'ItemSilver', _0: a};
};
var _mordrax$cotwelm$Item_Item$ItemCopper = function (a) {
	return {ctor: 'ItemCopper', _0: a};
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
		var _p10 = itemType;
		switch (_p10.ctor) {
			case 'ItemTypeWeapon':
				return _mordrax$cotwelm$Item_Item$ItemWeapon(
					A4(_mordrax$cotwelm$Item_Weapon$init, _p10._0, status, idStatus, id));
			case 'ItemTypeArmour':
				return _mordrax$cotwelm$Item_Item$ItemArmour(
					A4(_mordrax$cotwelm$Item_Armour$init, _p10._0, status, idStatus, id));
			case 'ItemTypeShield':
				return _mordrax$cotwelm$Item_Item$ItemShield(
					A4(_mordrax$cotwelm$Item_Shield$init, _p10._0, status, idStatus, id));
			case 'ItemTypeHelmet':
				return _mordrax$cotwelm$Item_Item$ItemHelmet(
					A4(_mordrax$cotwelm$Item_Helmet$init, _p10._0, status, idStatus, id));
			case 'ItemTypeBracers':
				return _mordrax$cotwelm$Item_Item$ItemBracers(
					A4(_mordrax$cotwelm$Item_Bracers$init, _p10._0, status, idStatus, id));
			case 'ItemTypeGauntlets':
				return _mordrax$cotwelm$Item_Item$ItemGauntlets(
					A4(_mordrax$cotwelm$Item_Gauntlets$init, _p10._0, status, idStatus, id));
			case 'ItemTypeBelt':
				return _mordrax$cotwelm$Item_Item$ItemBelt(
					A4(_mordrax$cotwelm$Item_Belt$init, _p10._0, status, idStatus, id));
			case 'ItemTypePack':
				return _mordrax$cotwelm$Item_Item$ItemPack(
					A5(_mordrax$cotwelm$Item_Pack$init, _p10._0, _mordrax$cotwelm$Item_Item$containerBuilder, status, idStatus, id));
			case 'ItemTypePurse':
				return _mordrax$cotwelm$Item_Item$ItemPurse(_mordrax$cotwelm$Item_Purse$init);
			case 'ItemTypeCopper':
				return _mordrax$cotwelm$Item_Item$ItemCopper(
					A2(_mordrax$cotwelm$Item_Purse$initCoppers, id, _p10._0));
			case 'ItemTypeSilver':
				return _mordrax$cotwelm$Item_Item$ItemSilver(
					A2(_mordrax$cotwelm$Item_Purse$initSilvers, id, _p10._0));
			case 'ItemTypeGold':
				return _mordrax$cotwelm$Item_Item$ItemGold(
					A2(_mordrax$cotwelm$Item_Purse$initGolds, id, _p10._0));
			case 'ItemTypePlatinum':
				return _mordrax$cotwelm$Item_Item$ItemPlatinum(
					A2(_mordrax$cotwelm$Item_Purse$initPlatinums, id, _p10._0));
			default:
				return _mordrax$cotwelm$Item_Item$ItemWeapon(
					A4(_mordrax$cotwelm$Item_Weapon$init, _mordrax$cotwelm$Item_Data$Dagger, status, idStatus, id));
		}
	});
var _mordrax$cotwelm$Item_Item$new = F2(
	function (itemType, id) {
		return A4(_mordrax$cotwelm$Item_Item$newWithOptions, itemType, id, _mordrax$cotwelm$Item_Data$Normal, _mordrax$cotwelm$Item_Data$Identified);
	});

var _mordrax$cotwelm$Utils_Lib$toCSS = function (str) {
	return _elm_lang$core$String$toLower(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('[^a-zA-Z]+'),
			function (_p0) {
				return '-';
			},
			str));
};
var _mordrax$cotwelm$Utils_Lib$foldResult = F3(
	function (f, acc, list) {
		foldResult:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return acc;
			} else {
				var nextAcc = A2(
					_elm_lang$core$Result$andThen,
					f(_p1._0),
					acc);
				var _v1 = f,
					_v2 = nextAcc,
					_v3 = _p1._1;
				f = _v1;
				acc = _v2;
				list = _v3;
				continue foldResult;
			}
		}
	});
var _mordrax$cotwelm$Utils_Lib$px = function (a) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(a),
		'px');
};
var _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle = function (_p2) {
	var _p3 = _p2;
	return _elm_lang$html$Html_Attributes$style(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'top',
				_1: _mordrax$cotwelm$Utils_Lib$px(_p3._1 * 32)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'left',
					_1: _mordrax$cotwelm$Utils_Lib$px(_p3._0 * 32)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$Utils_Lib$toScaledTilePosition = F2(
	function (_p4, scale) {
		var _p5 = _p4;
		var size = _elm_lang$core$Basics$round(scale * 32);
		return _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'top',
					_1: _mordrax$cotwelm$Utils_Lib$px(_p5._1 * size)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'left',
						_1: _mordrax$cotwelm$Utils_Lib$px(_p5._0 * size)
					},
					_1: {ctor: '[]'}
				}
			});
	});

var _mordrax$cotwelm$Equipment$unequip_ = F2(
	function (slot, model) {
		var _p0 = slot;
		switch (_p0.ctor) {
			case 'WeaponSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{weapon: _elm_lang$core$Maybe$Nothing});
			case 'FreehandSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{freehand: _elm_lang$core$Maybe$Nothing});
			case 'ArmourSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{armour: _elm_lang$core$Maybe$Nothing});
			case 'ShieldSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{shield: _elm_lang$core$Maybe$Nothing});
			case 'HelmetSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{helmet: _elm_lang$core$Maybe$Nothing});
			case 'BracersSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{bracers: _elm_lang$core$Maybe$Nothing});
			case 'GauntletsSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{gauntlets: _elm_lang$core$Maybe$Nothing});
			case 'BeltSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{belt: _elm_lang$core$Maybe$Nothing});
			case 'PurseSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{purse: _elm_lang$core$Maybe$Nothing});
			case 'PackSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{pack: _elm_lang$core$Maybe$Nothing});
			case 'NeckwearSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{neckwear: _elm_lang$core$Maybe$Nothing});
			case 'OvergarmentSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{overgarment: _elm_lang$core$Maybe$Nothing});
			case 'LeftRingSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{leftRing: _elm_lang$core$Maybe$Nothing});
			case 'RightRingSlot':
				return _elm_lang$core$Native_Utils.update(
					model,
					{rightRing: _elm_lang$core$Maybe$Nothing});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{boots: _elm_lang$core$Maybe$Nothing});
		}
	});
var _mordrax$cotwelm$Equipment$get = F2(
	function (slot, _p1) {
		var _p2 = _p1;
		var _p4 = _p2._0;
		var _p3 = slot;
		switch (_p3.ctor) {
			case 'WeaponSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemWeapon, _p4.weapon);
			case 'FreehandSlot':
				return _p4.freehand;
			case 'ArmourSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemArmour, _p4.armour);
			case 'ShieldSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemShield, _p4.shield);
			case 'HelmetSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemHelmet, _p4.helmet);
			case 'BracersSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemBracers, _p4.bracers);
			case 'GauntletsSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemGauntlets, _p4.gauntlets);
			case 'BeltSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemBelt, _p4.belt);
			case 'PurseSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemPurse, _p4.purse);
			case 'PackSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemPack, _p4.pack);
			case 'NeckwearSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemNeckwear, _p4.neckwear);
			case 'OvergarmentSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemOvergarment, _p4.overgarment);
			case 'LeftRingSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemRing, _p4.leftRing);
			case 'RightRingSlot':
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemRing, _p4.rightRing);
			default:
				return A2(_elm_lang$core$Maybe$map, _mordrax$cotwelm$Item_Item$ItemBoots, _p4.boots);
		}
	});
var _mordrax$cotwelm$Equipment$getArmour = function (_p5) {
	var _p6 = _p5;
	return _p6._0.armour;
};
var _mordrax$cotwelm$Equipment$getWeapon = function (_p7) {
	var _p8 = _p7;
	return _p8._0.weapon;
};
var _mordrax$cotwelm$Equipment$getPack = function (_p9) {
	var _p10 = _p9;
	return _p10._0.pack;
};
var _mordrax$cotwelm$Equipment$getPurse = function (_p11) {
	var _p12 = _p11;
	return _p12._0.purse;
};
var _mordrax$cotwelm$Equipment$getPackContent = function (_p13) {
	var _p14 = _p13;
	var _p15 = _p14._0.pack;
	if (_p15.ctor === 'Just') {
		return _mordrax$cotwelm$Item_Pack$contents(_p15._0);
	} else {
		return {ctor: '[]'};
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
var _mordrax$cotwelm$Equipment$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Equipment$init = _mordrax$cotwelm$Equipment$A(
	{weapon: _elm_lang$core$Maybe$Nothing, freehand: _elm_lang$core$Maybe$Nothing, armour: _elm_lang$core$Maybe$Nothing, shield: _elm_lang$core$Maybe$Nothing, helmet: _elm_lang$core$Maybe$Nothing, bracers: _elm_lang$core$Maybe$Nothing, gauntlets: _elm_lang$core$Maybe$Nothing, belt: _elm_lang$core$Maybe$Nothing, purse: _elm_lang$core$Maybe$Nothing, pack: _elm_lang$core$Maybe$Nothing, neckwear: _elm_lang$core$Maybe$Nothing, overgarment: _elm_lang$core$Maybe$Nothing, leftRing: _elm_lang$core$Maybe$Nothing, rightRing: _elm_lang$core$Maybe$Nothing, boots: _elm_lang$core$Maybe$Nothing});
var _mordrax$cotwelm$Equipment$unequip = F2(
	function (slot, _p16) {
		var _p17 = _p16;
		var _p19 = _p17._0;
		var maybeItem = A2(
			_mordrax$cotwelm$Equipment$get,
			slot,
			_mordrax$cotwelm$Equipment$A(_p19));
		var _p18 = maybeItem;
		if (_p18.ctor === 'Just') {
			return _mordrax$cotwelm$Item_Item$isCursed(_p18._0) ? _elm_lang$core$Result$Err('You cannot remove a cursed item!') : _elm_lang$core$Result$Ok(
				_mordrax$cotwelm$Equipment$A(
					A2(_mordrax$cotwelm$Equipment$unequip_, slot, _p19)));
		} else {
			return _elm_lang$core$Result$Ok(
				_mordrax$cotwelm$Equipment$A(_p19));
		}
	});
var _mordrax$cotwelm$Equipment$removeFromPack = F2(
	function (item, _p20) {
		var _p21 = _p20;
		var _p23 = _p21._0;
		var noChange = _mordrax$cotwelm$Equipment$A(_p23);
		var _p22 = _p23.pack;
		if (_p22.ctor === 'Nothing') {
			return noChange;
		} else {
			return _mordrax$cotwelm$Equipment$A(
				_elm_lang$core$Native_Utils.update(
					_p23,
					{
						pack: _elm_lang$core$Maybe$Just(
							A2(_mordrax$cotwelm$Item_Pack$remove, item, _p22._0))
					}));
		}
	});
var _mordrax$cotwelm$Equipment$setPurse = F2(
	function (purse, _p24) {
		var _p25 = _p24;
		return _mordrax$cotwelm$Equipment$A(
			_elm_lang$core$Native_Utils.update(
				_p25._0,
				{
					purse: _elm_lang$core$Maybe$Just(purse)
				}));
	});
var _mordrax$cotwelm$Equipment$putInPurse = F2(
	function (coins, equipment) {
		var purse = A2(
			_mordrax$cotwelm$Item_Purse$addCoins,
			coins,
			A2(
				_elm_lang$core$Maybe$withDefault,
				_mordrax$cotwelm$Item_Purse$init,
				_mordrax$cotwelm$Equipment$getPurse(equipment)));
		return A2(_mordrax$cotwelm$Equipment$setPurse, purse, equipment);
	});
var _mordrax$cotwelm$Equipment$BootsSlot = {ctor: 'BootsSlot'};
var _mordrax$cotwelm$Equipment$RightRingSlot = {ctor: 'RightRingSlot'};
var _mordrax$cotwelm$Equipment$LeftRingSlot = {ctor: 'LeftRingSlot'};
var _mordrax$cotwelm$Equipment$OvergarmentSlot = {ctor: 'OvergarmentSlot'};
var _mordrax$cotwelm$Equipment$NeckwearSlot = {ctor: 'NeckwearSlot'};
var _mordrax$cotwelm$Equipment$PackSlot = {ctor: 'PackSlot'};
var _mordrax$cotwelm$Equipment$PurseSlot = {ctor: 'PurseSlot'};
var _mordrax$cotwelm$Equipment$BeltSlot = {ctor: 'BeltSlot'};
var _mordrax$cotwelm$Equipment$GauntletsSlot = {ctor: 'GauntletsSlot'};
var _mordrax$cotwelm$Equipment$BracersSlot = {ctor: 'BracersSlot'};
var _mordrax$cotwelm$Equipment$HelmetSlot = {ctor: 'HelmetSlot'};
var _mordrax$cotwelm$Equipment$ShieldSlot = {ctor: 'ShieldSlot'};
var _mordrax$cotwelm$Equipment$ArmourSlot = {ctor: 'ArmourSlot'};
var _mordrax$cotwelm$Equipment$FreehandSlot = {ctor: 'FreehandSlot'};
var _mordrax$cotwelm$Equipment$WeaponSlot = {ctor: 'WeaponSlot'};
var _mordrax$cotwelm$Equipment$ItemAlreadyEquipped = {ctor: 'ItemAlreadyEquipped'};
var _mordrax$cotwelm$Equipment$WrongSlotForItemType = {ctor: 'WrongSlotForItemType'};
var _mordrax$cotwelm$Equipment$equip = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		var _p46 = _p29._0;
		var _p30 = {ctor: '_Tuple2', _0: _p28._0, _1: _p28._1};
		_v16_15:
		do {
			if (_p30.ctor === '_Tuple2') {
				switch (_p30._0.ctor) {
					case 'WeaponSlot':
						if (_p30._1.ctor === 'ItemWeapon') {
							var _p31 = _p46.weapon;
							if (_p31.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												weapon: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'FreehandSlot':
						var _p32 = _p46.freehand;
						if (_p32.ctor === 'Nothing') {
							return _elm_lang$core$Result$Ok(
								_mordrax$cotwelm$Equipment$A(
									_elm_lang$core$Native_Utils.update(
										_p46,
										{
											freehand: _elm_lang$core$Maybe$Just(_p30._1)
										})));
						} else {
							return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
						}
					case 'ArmourSlot':
						if (_p30._1.ctor === 'ItemArmour') {
							var _p33 = _p46.armour;
							if (_p33.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												armour: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'ShieldSlot':
						if (_p30._1.ctor === 'ItemShield') {
							var _p34 = _p46.shield;
							if (_p34.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												shield: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'HelmetSlot':
						if (_p30._1.ctor === 'ItemHelmet') {
							var _p35 = _p46.helmet;
							if (_p35.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												helmet: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'BracersSlot':
						if (_p30._1.ctor === 'ItemBracers') {
							var _p36 = _p46.bracers;
							if (_p36.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												bracers: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'GauntletsSlot':
						if (_p30._1.ctor === 'ItemGauntlets') {
							var _p37 = _p46.gauntlets;
							if (_p37.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												gauntlets: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'BeltSlot':
						if (_p30._1.ctor === 'ItemBelt') {
							var _p38 = _p46.belt;
							if (_p38.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												belt: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'PurseSlot':
						if (_p30._1.ctor === 'ItemPurse') {
							var _p39 = _p46.purse;
							if (_p39.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												purse: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'PackSlot':
						if (_p30._1.ctor === 'ItemPack') {
							var _p40 = _p46.pack;
							if (_p40.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												pack: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'NeckwearSlot':
						if (_p30._1.ctor === 'ItemNeckwear') {
							var _p41 = _p46.neckwear;
							if (_p41.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												neckwear: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'OvergarmentSlot':
						if (_p30._1.ctor === 'ItemOvergarment') {
							var _p42 = _p46.overgarment;
							if (_p42.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												overgarment: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'LeftRingSlot':
						if (_p30._1.ctor === 'ItemRing') {
							var _p43 = _p46.leftRing;
							if (_p43.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												leftRing: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					case 'RightRingSlot':
						if (_p30._1.ctor === 'ItemRing') {
							var _p44 = _p46.rightRing;
							if (_p44.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												rightRing: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
					default:
						if (_p30._1.ctor === 'ItemBoots') {
							var _p45 = _p46.boots;
							if (_p45.ctor === 'Nothing') {
								return _elm_lang$core$Result$Ok(
									_mordrax$cotwelm$Equipment$A(
										_elm_lang$core$Native_Utils.update(
											_p46,
											{
												boots: _elm_lang$core$Maybe$Just(_p30._1._0)
											})));
							} else {
								return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$ItemAlreadyEquipped);
							}
						} else {
							break _v16_15;
						}
				}
			} else {
				break _v16_15;
			}
		} while(false);
		return _elm_lang$core$Result$Err(_mordrax$cotwelm$Equipment$WrongSlotForItemType);
	});
var _mordrax$cotwelm$Equipment$equipMany = F2(
	function (itemSlotPairs, equipment) {
		var equippingResult = A3(
			_mordrax$cotwelm$Utils_Lib$foldResult,
			function (item) {
				return _mordrax$cotwelm$Equipment$equip(item);
			},
			_elm_lang$core$Result$Ok(equipment),
			itemSlotPairs);
		var _p47 = equippingResult;
		if (_p47.ctor === 'Ok') {
			return _p47._0;
		} else {
			return equipment;
		}
	});
var _mordrax$cotwelm$Equipment$NoPackEquipped = {ctor: 'NoPackEquipped'};
var _mordrax$cotwelm$Equipment$ContainerMsg = function (a) {
	return {ctor: 'ContainerMsg', _0: a};
};
var _mordrax$cotwelm$Equipment$MassResult = function (a) {
	return {ctor: 'MassResult', _0: a};
};
var _mordrax$cotwelm$Equipment$Success = {ctor: 'Success'};
var _mordrax$cotwelm$Equipment$putInPack_ = F2(
	function (item, _p48) {
		var _p49 = _p48;
		var _p52 = _p49._0;
		var noChange = {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Equipment$A(_p52),
			_1: _mordrax$cotwelm$Equipment$Success
		};
		var _p50 = _p52.pack;
		if (_p50.ctor === 'Nothing') {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$A(_p52),
				_1: _mordrax$cotwelm$Equipment$NoPackEquipped
			};
		} else {
			var _p51 = A2(_mordrax$cotwelm$Item_Pack$add, item, _p50._0);
			var packWithItem = _p51._0;
			var msg = _p51._1;
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$A(
					_elm_lang$core$Native_Utils.update(
						_p52,
						{
							pack: _elm_lang$core$Maybe$Just(packWithItem)
						})),
				_1: _mordrax$cotwelm$Equipment$ContainerMsg(msg)
			};
		}
	});
var _mordrax$cotwelm$Equipment$putInPack = F2(
	function (item, equipment) {
		var _p53 = item;
		switch (_p53.ctor) {
			case 'ItemCopper':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_mordrax$cotwelm$Equipment$putInPurse,
						A4(_mordrax$cotwelm$Item_Purse$Coins, _p53._0.value, 0, 0, 0),
						equipment),
					_1: _mordrax$cotwelm$Equipment$Success
				};
			case 'ItemSilver':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_mordrax$cotwelm$Equipment$putInPurse,
						A4(_mordrax$cotwelm$Item_Purse$Coins, 0, _p53._0.value, 0, 0),
						equipment),
					_1: _mordrax$cotwelm$Equipment$Success
				};
			case 'ItemGold':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_mordrax$cotwelm$Equipment$putInPurse,
						A4(_mordrax$cotwelm$Item_Purse$Coins, 0, 0, _p53._0.value, 0),
						equipment),
					_1: _mordrax$cotwelm$Equipment$Success
				};
			case 'ItemPlatinum':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_mordrax$cotwelm$Equipment$putInPurse,
						A4(_mordrax$cotwelm$Item_Purse$Coins, 0, 0, 0, _p53._0.value),
						equipment),
					_1: _mordrax$cotwelm$Equipment$Success
				};
			default:
				return A2(_mordrax$cotwelm$Equipment$putInPack_, item, equipment);
		}
	});

var _mordrax$cotwelm$GameData_Types$DungeonLevel = function (a) {
	return {ctor: 'DungeonLevel', _0: a};
};
var _mordrax$cotwelm$GameData_Types$DungeonLevelOne = {ctor: 'DungeonLevelOne'};
var _mordrax$cotwelm$GameData_Types$Farm = {ctor: 'Farm'};
var _mordrax$cotwelm$GameData_Types$Village = {ctor: 'Village'};
var _mordrax$cotwelm$GameData_Types$Female = {ctor: 'Female'};
var _mordrax$cotwelm$GameData_Types$Male = {ctor: 'Male'};
var _mordrax$cotwelm$GameData_Types$Impossible = {ctor: 'Impossible'};
var _mordrax$cotwelm$GameData_Types$Hard = {ctor: 'Hard'};
var _mordrax$cotwelm$GameData_Types$Intermediate = {ctor: 'Intermediate'};
var _mordrax$cotwelm$GameData_Types$Easy = {ctor: 'Easy'};

var _mordrax$cotwelm$Types$Giant = {ctor: 'Giant'};
var _mordrax$cotwelm$Types$Large = {ctor: 'Large'};
var _mordrax$cotwelm$Types$Medium = {ctor: 'Medium'};
var _mordrax$cotwelm$Types$Small = {ctor: 'Small'};
var _mordrax$cotwelm$Types$Tiny = {ctor: 'Tiny'};
var _mordrax$cotwelm$Types$Monster = {ctor: 'Monster'};
var _mordrax$cotwelm$Types$Hero = {ctor: 'Hero'};

var _mordrax$cotwelm$Hero_Hero$viewStats = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Stats:'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'HP: ',
								_mordrax$cotwelm$Stats$printHP(model.stats))),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'SP: ',
									_mordrax$cotwelm$Stats$printSP(model.stats))),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _mordrax$cotwelm$Hero_Hero$view = function (model) {
	var heroCss = _elm_lang$core$Native_Utils.eq(model.gender, _mordrax$cotwelm$GameData_Types$Male) ? 'male-hero' : 'female-hero';
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class(
				A2(_elm_lang$core$Basics_ops['++'], 'tile ', heroCss)),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(model.position),
				_1: {ctor: '[]'}
			}
		},
		{ctor: '[]'});
};
var _mordrax$cotwelm$Hero_Hero$equip = F2(
	function (_p0, model) {
		var _p1 = _p0;
		return A2(
			_elm_lang$core$Result$map,
			function (equipment) {
				return _elm_lang$core$Native_Utils.update(
					model,
					{equipment: equipment});
			},
			A2(
				_mordrax$cotwelm$Equipment$equip,
				{ctor: '_Tuple2', _0: _p1._0, _1: _p1._1},
				model.equipment));
	});
var _mordrax$cotwelm$Hero_Hero$level = function (hero) {
	return _elm_lang$core$Native_Utils.update(
		hero,
		{
			stats: A3(_mordrax$cotwelm$Stats$incLevel, 1, hero.attributes, hero.stats)
		});
};
var _mordrax$cotwelm$Hero_Hero$setStats = F2(
	function (stats, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{stats: stats});
	});
var _mordrax$cotwelm$Hero_Hero$stats = function (model) {
	return model.stats;
};
var _mordrax$cotwelm$Hero_Hero$position = function (model) {
	return model.position;
};
var _mordrax$cotwelm$Hero_Hero$teleport = F2(
	function (newPosition, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{position: newPosition});
	});
var _mordrax$cotwelm$Hero_Hero$move = F2(
	function (direction, model) {
		return function (x) {
			return _elm_lang$core$Native_Utils.update(
				model,
				{position: x});
		}(
			A2(
				_mordrax$cotwelm$Utils_Vector$add,
				model.position,
				_mordrax$cotwelm$Utils_Vector$fromDirection(direction)));
	});
var _mordrax$cotwelm$Hero_Hero$updateEquipment = F2(
	function (equipment, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{equipment: equipment});
	});
var _mordrax$cotwelm$Hero_Hero$init = F3(
	function (name, _p2, gender) {
		var _p3 = _p2;
		var _p4 = _p3;
		return {
			name: name,
			type_: _mordrax$cotwelm$Types$Hero,
			position: {ctor: '_Tuple2', _0: 11, _1: 17},
			stats: _mordrax$cotwelm$Stats$init(_p4),
			gender: gender,
			attributes: _p4,
			equipment: _mordrax$cotwelm$Equipment$init,
			expLevel: 1,
			bodySize: _mordrax$cotwelm$Types$Medium
		};
	});
var _mordrax$cotwelm$Hero_Hero$Hero = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {name: a, type_: b, position: c, stats: d, gender: e, attributes: f, equipment: g, expLevel: h, bodySize: i};
	});

var _mordrax$cotwelm$Lodash$combine = function (generators) {
	var _p0 = generators;
	if (_p0.ctor === '[]') {
		return _mgold$elm_random_pcg$Random_Pcg$constant(
			{ctor: '[]'});
	} else {
		return A3(
			_mgold$elm_random_pcg$Random_Pcg$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p0._0,
			_mordrax$cotwelm$Lodash$combine(_p0._1));
	}
};
var _mordrax$cotwelm$Lodash$sample2 = function () {
	var find = F2(
		function (k, ys) {
			find:
			while (true) {
				var _p1 = ys;
				if (_p1.ctor === '[]') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_elm_lang$core$Native_Utils.eq(k, 0)) {
						return _elm_lang$core$Maybe$Just(_p1._0);
					} else {
						var _v2 = k - 1,
							_v3 = _p1._1;
						k = _v2;
						ys = _v3;
						continue find;
					}
				}
			}
		});
	return function (xs) {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (i) {
				return A2(find, i, xs);
			},
			A2(
				_mgold$elm_random_pcg$Random_Pcg$int,
				0,
				_elm_lang$core$List$length(xs) - 1));
	};
}();
var _mordrax$cotwelm$Lodash$choose = function (arr) {
	if (_elm_lang$core$Array$isEmpty(arr)) {
		return _mgold$elm_random_pcg$Random_Pcg$constant(
			{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: arr});
	} else {
		var front = function (i) {
			return A3(_elm_lang$core$Array$slice, 0, i, arr);
		};
		var lastIndex = _elm_lang$core$Array$length(arr) - 1;
		var back = function (i) {
			return _elm_lang$core$Native_Utils.eq(i, lastIndex) ? _elm_lang$core$Array$empty : A3(_elm_lang$core$Array$slice, i + 1, lastIndex + 1, arr);
		};
		var gen = A2(_mgold$elm_random_pcg$Random_Pcg$int, 0, lastIndex);
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
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
var _mordrax$cotwelm$Lodash$shuffle_ = function (arr) {
	if (_elm_lang$core$Array$isEmpty(arr)) {
		return _mgold$elm_random_pcg$Random_Pcg$constant(arr);
	} else {
		var helper = function (_p2) {
			var _p3 = _p2;
			var _p8 = _p3._0;
			return A2(
				_mgold$elm_random_pcg$Random_Pcg$andThen,
				function (_p4) {
					var _p5 = _p4;
					var _p7 = _p5._1;
					var _p6 = _p5._0;
					if (_p6.ctor === 'Nothing') {
						return _mgold$elm_random_pcg$Random_Pcg$constant(
							{ctor: '_Tuple2', _0: _p8, _1: _p7});
					} else {
						return helper(
							{
								ctor: '_Tuple2',
								_0: {ctor: '::', _0: _p6._0, _1: _p8},
								_1: _p7
							});
					}
				},
				_mordrax$cotwelm$Lodash$choose(_p3._1));
		};
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (_p9) {
				return _elm_lang$core$Array$fromList(
					_elm_lang$core$Tuple$first(_p9));
			},
			helper(
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: arr
				}));
	}
};
var _mordrax$cotwelm$Lodash$range = F2(
	function (x, y) {
		return (_elm_lang$core$Native_Utils.cmp(x, y) < 0) ? A2(_elm_lang$core$List$range, x, y) : _elm_lang$core$List$reverse(
			A2(_elm_lang$core$List$range, y, x));
	});
var _mordrax$cotwelm$Lodash$without = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$filter,
			F2(
				function (x, y) {
					return !_elm_lang$core$Native_Utils.eq(x, y);
				})(x),
			xs);
	});
var _mordrax$cotwelm$Lodash$headWithDefault = F2(
	function ($default, xs) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			$default,
			_elm_lang$core$List$head(xs));
	});
var _mordrax$cotwelm$Lodash$shuffle = function (list) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_elm_lang$core$Array$toList,
		_mordrax$cotwelm$Lodash$shuffle_(
			_elm_lang$core$Array$fromList(list)));
};

var _mordrax$cotwelm$Monster_Monster$init = F2(
	function (monsterType, position) {
		var makeShield = function (shieldType) {
			return A2(
				_mordrax$cotwelm$Item_Item$new,
				_mordrax$cotwelm$Item_Data$ItemTypeShield(shieldType),
				_mordrax$cotwelm$Utils_IdGenerator$empty);
		};
		var makeArmour = function (armourType) {
			return A2(
				_mordrax$cotwelm$Item_Item$new,
				_mordrax$cotwelm$Item_Data$ItemTypeArmour(armourType),
				_mordrax$cotwelm$Utils_IdGenerator$empty);
		};
		var makeWeapon = function (weaponType) {
			return A2(
				_mordrax$cotwelm$Item_Item$new,
				_mordrax$cotwelm$Item_Data$ItemTypeWeapon(weaponType),
				_mordrax$cotwelm$Utils_IdGenerator$empty);
		};
		var basicEquipment = F2(
			function (weapon, armour) {
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _mordrax$cotwelm$Equipment$WeaponSlot,
						_1: makeWeapon(weapon)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _mordrax$cotwelm$Equipment$ArmourSlot,
							_1: makeArmour(armour)
						},
						_1: {ctor: '[]'}
					}
				};
			});
		var basicShieldEquipment = F3(
			function (weapon, shield, armour) {
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _mordrax$cotwelm$Equipment$ShieldSlot,
						_1: makeShield(shield)
					},
					_1: A2(basicEquipment, weapon, armour)
				};
			});
		var makeEquipment = function (equipment) {
			return A2(_mordrax$cotwelm$Equipment$equipMany, equipment, _mordrax$cotwelm$Equipment$init);
		};
		var make = F5(
			function (name, level, attributes, bodySize, itemSlotPair) {
				return {
					name: name,
					type_: _mordrax$cotwelm$Types$Monster,
					css: _mordrax$cotwelm$Utils_Lib$toCSS(name),
					position: position,
					stats: A2(_mordrax$cotwelm$Stats$initExperienced, attributes, level),
					attributes: attributes,
					equipment: makeEquipment(itemSlotPair),
					expLevel: level,
					bodySize: bodySize
				};
			});
		var _p0 = monsterType;
		switch (_p0.ctor) {
			case 'GiantRat':
				return A5(
					make,
					'Giant Rat',
					1,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 20, 60, 30, 5),
					_mordrax$cotwelm$Types$Small,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$SmallClaws, _mordrax$cotwelm$Item_Data$SoftHide));
			case 'Goblin':
				return A5(
					make,
					'Goblin',
					1,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 20, 60, 30, 30),
					_mordrax$cotwelm$Types$Small,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Club, _mordrax$cotwelm$Item_Data$LeatherArmour));
			case 'GiantBat':
				return A5(
					make,
					'Giant Bat',
					2,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Small,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$SmallClaws, _mordrax$cotwelm$Item_Data$SoftHide));
			case 'Hobgoblin':
				return A5(
					make,
					'Hobgoblin',
					2,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Spear, _mordrax$cotwelm$Item_Data$StuddedLeatherArmour));
			case 'Kobold':
				return A5(
					make,
					'Kobold',
					2,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Small,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Crossbow, _mordrax$cotwelm$Item_Data$ChainMail));
			case 'LargeSnake':
				return A5(
					make,
					'Large Snake',
					3,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Tiny,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Fangs, _mordrax$cotwelm$Item_Data$SoftHide));
			case 'Skeleton':
				return A5(
					make,
					'Skeleton',
					3,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$ShortSword, _mordrax$cotwelm$Item_Data$Bones));
			case 'WildDog':
				return A5(
					make,
					'Wild Dog',
					3,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Small,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$SmallClaws, _mordrax$cotwelm$Item_Data$SoftHide));
			case 'Viper':
				return A5(
					make,
					'Viper',
					5,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Tiny,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Fangs, _mordrax$cotwelm$Item_Data$SoftHide));
			case 'GoblinFighter':
				return A5(
					make,
					'Goblin Fighter',
					6,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Small,
					A3(basicShieldEquipment, _mordrax$cotwelm$Item_Data$ShortSword, _mordrax$cotwelm$Item_Data$MediumIronShield, _mordrax$cotwelm$Item_Data$StuddedLeatherArmour));
			case 'GiantRedAnt':
				return A5(
					make,
					'Giant Red Ant',
					7,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Pincers, _mordrax$cotwelm$Item_Data$Shell));
			case 'WalkingCorpse':
				return A5(
					make,
					'Walking Corpse',
					7,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 100, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$SmallClaws, _mordrax$cotwelm$Item_Data$SoftHide));
			case 'Bandit':
				return A5(
					make,
					'Bandit',
					10,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Bow, _mordrax$cotwelm$Item_Data$StuddedLeatherArmour));
			case 'GiantTrapdoorSpider':
				return A5(
					make,
					'Giant Trapdoor Spider',
					10,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Large,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$Pincers, _mordrax$cotwelm$Item_Data$Shell));
			case 'HugeLizard':
				return A5(
					make,
					'Huge Lizard',
					10,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Large,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$LargeClaws, _mordrax$cotwelm$Item_Data$ToughHide));
			case 'RatMan':
				return A5(
					make,
					'Rat-Man',
					10,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					A2(basicEquipment, _mordrax$cotwelm$Item_Data$MorningStar, _mordrax$cotwelm$Item_Data$ToughHide));
			case 'Slime':
				return A5(
					make,
					'Slime',
					10,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'GiantScorpion':
				return A5(
					make,
					'Giant Scorpion',
					11,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'GrayWolf':
				return A5(
					make,
					'Gray Wolf',
					11,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'GelantinousGlob':
				return A5(
					make,
					'Gelantinous Glob',
					14,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'SmirkingSneakThief':
				return A5(
					make,
					'Smirking Sneak Thief',
					15,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'CarrionCreeper':
				return A5(
					make,
					'Carrion Creeper',
					16,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'HugeOgre':
				return A5(
					make,
					'Huge Ogre',
					16,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Shadow':
				return A5(
					make,
					'Shadow',
					16,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AnimatedWoodenStatue':
				return A5(
					make,
					'Animated Wooden Statue',
					17,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'BrownBear':
				return A5(
					make,
					'Brown Bear',
					17,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungGreenDragon':
				return A5(
					make,
					'Young Green Dragon',
					18,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungWhiteDragon':
				return A5(
					make,
					'Young White Dragon',
					18,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Manticore':
				return A5(
					make,
					'Manticore',
					19,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'EerieGhost':
				return A5(
					make,
					'Eerie Ghost',
					20,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'GruesomeTroll':
				return A5(
					make,
					'Gruesome Troll',
					20,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungBlueDragon':
				return A5(
					make,
					'Young Blue Dragon',
					20,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungRedDragon':
				return A5(
					make,
					'Young Red Dragon',
					20,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AnimatedBronzeStatue':
				return A5(
					make,
					'Animated Bronze Statue',
					25,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'EvilWarrior':
				return A5(
					make,
					'Evil Warrior',
					25,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'WolfMan':
				return A5(
					make,
					'Wolf-Man',
					25,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'CaveBear':
				return A5(
					make,
					'Cave Bear',
					27,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'WhiteWolf':
				return A5(
					make,
					'White Wolf',
					28,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Berserker':
				return A5(
					make,
					'Berserker',
					30,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AnimatedIronStatue':
				return A5(
					make,
					'Animated Iron Statue',
					35,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'TunnelWight':
				return A5(
					make,
					'Tunnel Wight',
					35,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungAdultBlueDragon':
				return A5(
					make,
					'Young Adult Blue Dragon',
					35,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungAdultGreenDragon':
				return A5(
					make,
					'Young Adult Green Dragon',
					35,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungAdultWhiteDragon':
				return A5(
					make,
					'Young Adult White Dragon',
					35,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'PaleWraith':
				return A5(
					make,
					'Pale Wraith',
					37,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'BarrowWight':
				return A5(
					make,
					'Barrow Wight',
					40,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'BearMan':
				return A5(
					make,
					'Bear-Man',
					40,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'DustElemental':
				return A5(
					make,
					'Dust Elemental',
					40,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'HillGiant':
				return A5(
					make,
					'Hill Giant',
					40,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'YoungAdultRedDragon':
				return A5(
					make,
					'Young Adult Red Dragon',
					40,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Wizard':
				return A5(
					make,
					'Wizard',
					45,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'BullMan':
				return A5(
					make,
					'Bull-Man',
					50,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'CastleWight':
				return A5(
					make,
					'Castle Wight',
					50,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'DarkWraith':
				return A5(
					make,
					'Dark Wraith',
					50,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'IceElemental':
				return A5(
					make,
					'Ice Elemental',
					50,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Spectre':
				return A5(
					make,
					'Spectre',
					50,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AnimatedMarbleStatue':
				return A5(
					make,
					'Animated Marble Statue',
					52,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AdultBlueDragon':
				return A5(
					make,
					'Adult Blue Dragon',
					55,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AdultGreenDragon':
				return A5(
					make,
					'Adult Green Dragon',
					55,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AdultWhiteDragon':
				return A5(
					make,
					'Adult White Dragon',
					55,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AirElemental':
				return A5(
					make,
					'Air Elemental',
					55,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'MagmaElemental':
				return A5(
					make,
					'Magma Elemental',
					55,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'StoneGiant':
				return A5(
					make,
					'Stone Giant',
					55,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'TwoHeadedGiant':
				return A5(
					make,
					'Two Headed Giant',
					55,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AdultRedDragon':
				return A5(
					make,
					'Adult Red Dragon',
					60,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'FireElemental':
				return A5(
					make,
					'Fire Elemental',
					60,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'FrostGiant':
				return A5(
					make,
					'Frost Giant',
					60,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'SpikedDevil':
				return A5(
					make,
					'Spiked Devil',
					60,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'WaterElemental':
				return A5(
					make,
					'Water Elemental',
					60,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'EarthElemental':
				return A5(
					make,
					'Earth Elemental',
					65,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Necromancer':
				return A5(
					make,
					'Necromancer',
					65,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Vampire':
				return A5(
					make,
					'Vampire',
					65,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AbyssWraith':
				return A5(
					make,
					'Abyss Wraith',
					70,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Utgardhalok':
				return A5(
					make,
					'Utgardhalok',
					70,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'FireGiant':
				return A5(
					make,
					'Fire Giant',
					75,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'OldBlueDragon':
				return A5(
					make,
					'Old Blue Dragon',
					75,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'OldGreenDragon':
				return A5(
					make,
					'Old Green Dragon',
					75,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'OldWhiteDragon':
				return A5(
					make,
					'Old White Dragon',
					75,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'HornedDevil':
				return A5(
					make,
					'Horned Devil',
					80,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'OldRedDragon':
				return A5(
					make,
					'Old Red Dragon',
					80,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Rungnir':
				return A5(
					make,
					'Rungnir',
					80,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'IceDevil':
				return A5(
					make,
					'Ice Devil',
					85,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Thrym':
				return A5(
					make,
					'Thrym',
					90,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'VeryOldGreenDragon':
				return A5(
					make,
					'Very Old Green Dragon',
					90,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'VeryOldWhiteDragon':
				return A5(
					make,
					'Very Old White Dragon',
					90,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'VeryOldBlueDragon':
				return A5(
					make,
					'Very Old Blue Dragon',
					95,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AbyssFiend':
				return A5(
					make,
					'Abyss Fiend',
					100,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'Thiassa':
				return A5(
					make,
					'Thiassa',
					100,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'VeryOldRedDragon':
				return A5(
					make,
					'Very Old Red Dragon',
					100,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AncientGreenDragon':
				return A5(
					make,
					'Ancient Green Dragon',
					105,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AncientWhiteDragon':
				return A5(
					make,
					'Ancient White Dragon',
					105,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AncientBlueDragon':
				return A5(
					make,
					'Ancient Blue Dragon',
					110,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			case 'AncientRedDragon':
				return A5(
					make,
					'Ancient Red Dragon',
					120,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
			default:
				return A5(
					make,
					'Sultur',
					344,
					A5(_mordrax$cotwelm$Attributes$Attributes, 0, 50, 50, 50, 50),
					_mordrax$cotwelm$Types$Medium,
					{ctor: '[]'});
		}
	});
var _mordrax$cotwelm$Monster_Monster$remove = F2(
	function (monster, monsters) {
		return A2(
			_elm_lang$core$List$filter,
			function (x) {
				return !_elm_lang$core$Native_Utils.eq(monster.position, x.position);
			},
			monsters);
	});
var _mordrax$cotwelm$Monster_Monster$update = F2(
	function (monster, monsters) {
		return {
			ctor: '::',
			_0: monster,
			_1: A2(_mordrax$cotwelm$Monster_Monster$remove, monster, monsters)
		};
	});
var _mordrax$cotwelm$Monster_Monster$initForArena = function (monsterType) {
	return A2(
		_mordrax$cotwelm$Monster_Monster$init,
		monsterType,
		{ctor: '_Tuple2', _0: 0, _1: 0});
};
var _mordrax$cotwelm$Monster_Monster$view = function (_p1) {
	var _p2 = _p1;
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(_p2.position),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(
					A2(_elm_lang$core$Basics_ops['++'], 'tile monster ', _p2.css)),
				_1: {ctor: '[]'}
			}
		},
		{ctor: '[]'});
};
var _mordrax$cotwelm$Monster_Monster$Monster = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {name: a, type_: b, css: c, position: d, stats: e, attributes: f, equipment: g, expLevel: h, bodySize: i};
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
var _mordrax$cotwelm$Monster_Monster$types = {
	ctor: '::',
	_0: _mordrax$cotwelm$Monster_Monster$GiantRat,
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Monster_Monster$Goblin,
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Monster_Monster$GiantBat,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Monster_Monster$Hobgoblin,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Monster_Monster$Kobold,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Monster_Monster$LargeSnake,
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Monster_Monster$Skeleton,
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Monster_Monster$WildDog,
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Monster_Monster$Viper,
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Monster_Monster$GoblinFighter,
										_1: {
											ctor: '::',
											_0: _mordrax$cotwelm$Monster_Monster$GiantRedAnt,
											_1: {
												ctor: '::',
												_0: _mordrax$cotwelm$Monster_Monster$WalkingCorpse,
												_1: {
													ctor: '::',
													_0: _mordrax$cotwelm$Monster_Monster$Bandit,
													_1: {
														ctor: '::',
														_0: _mordrax$cotwelm$Monster_Monster$GiantTrapdoorSpider,
														_1: {
															ctor: '::',
															_0: _mordrax$cotwelm$Monster_Monster$HugeLizard,
															_1: {
																ctor: '::',
																_0: _mordrax$cotwelm$Monster_Monster$RatMan,
																_1: {
																	ctor: '::',
																	_0: _mordrax$cotwelm$Monster_Monster$Slime,
																	_1: {
																		ctor: '::',
																		_0: _mordrax$cotwelm$Monster_Monster$GiantScorpion,
																		_1: {
																			ctor: '::',
																			_0: _mordrax$cotwelm$Monster_Monster$GrayWolf,
																			_1: {
																				ctor: '::',
																				_0: _mordrax$cotwelm$Monster_Monster$GelantinousGlob,
																				_1: {
																					ctor: '::',
																					_0: _mordrax$cotwelm$Monster_Monster$SmirkingSneakThief,
																					_1: {
																						ctor: '::',
																						_0: _mordrax$cotwelm$Monster_Monster$CarrionCreeper,
																						_1: {
																							ctor: '::',
																							_0: _mordrax$cotwelm$Monster_Monster$HugeOgre,
																							_1: {
																								ctor: '::',
																								_0: _mordrax$cotwelm$Monster_Monster$Shadow,
																								_1: {
																									ctor: '::',
																									_0: _mordrax$cotwelm$Monster_Monster$AnimatedWoodenStatue,
																									_1: {
																										ctor: '::',
																										_0: _mordrax$cotwelm$Monster_Monster$BrownBear,
																										_1: {
																											ctor: '::',
																											_0: _mordrax$cotwelm$Monster_Monster$YoungGreenDragon,
																											_1: {
																												ctor: '::',
																												_0: _mordrax$cotwelm$Monster_Monster$YoungWhiteDragon,
																												_1: {
																													ctor: '::',
																													_0: _mordrax$cotwelm$Monster_Monster$Manticore,
																													_1: {
																														ctor: '::',
																														_0: _mordrax$cotwelm$Monster_Monster$EerieGhost,
																														_1: {
																															ctor: '::',
																															_0: _mordrax$cotwelm$Monster_Monster$GruesomeTroll,
																															_1: {
																																ctor: '::',
																																_0: _mordrax$cotwelm$Monster_Monster$YoungBlueDragon,
																																_1: {
																																	ctor: '::',
																																	_0: _mordrax$cotwelm$Monster_Monster$YoungRedDragon,
																																	_1: {
																																		ctor: '::',
																																		_0: _mordrax$cotwelm$Monster_Monster$AnimatedBronzeStatue,
																																		_1: {
																																			ctor: '::',
																																			_0: _mordrax$cotwelm$Monster_Monster$EvilWarrior,
																																			_1: {
																																				ctor: '::',
																																				_0: _mordrax$cotwelm$Monster_Monster$WolfMan,
																																				_1: {
																																					ctor: '::',
																																					_0: _mordrax$cotwelm$Monster_Monster$CaveBear,
																																					_1: {
																																						ctor: '::',
																																						_0: _mordrax$cotwelm$Monster_Monster$WhiteWolf,
																																						_1: {
																																							ctor: '::',
																																							_0: _mordrax$cotwelm$Monster_Monster$Berserker,
																																							_1: {
																																								ctor: '::',
																																								_0: _mordrax$cotwelm$Monster_Monster$AnimatedIronStatue,
																																								_1: {
																																									ctor: '::',
																																									_0: _mordrax$cotwelm$Monster_Monster$TunnelWight,
																																									_1: {
																																										ctor: '::',
																																										_0: _mordrax$cotwelm$Monster_Monster$YoungAdultBlueDragon,
																																										_1: {
																																											ctor: '::',
																																											_0: _mordrax$cotwelm$Monster_Monster$YoungAdultGreenDragon,
																																											_1: {
																																												ctor: '::',
																																												_0: _mordrax$cotwelm$Monster_Monster$YoungAdultWhiteDragon,
																																												_1: {
																																													ctor: '::',
																																													_0: _mordrax$cotwelm$Monster_Monster$PaleWraith,
																																													_1: {
																																														ctor: '::',
																																														_0: _mordrax$cotwelm$Monster_Monster$BarrowWight,
																																														_1: {
																																															ctor: '::',
																																															_0: _mordrax$cotwelm$Monster_Monster$BearMan,
																																															_1: {
																																																ctor: '::',
																																																_0: _mordrax$cotwelm$Monster_Monster$DustElemental,
																																																_1: {
																																																	ctor: '::',
																																																	_0: _mordrax$cotwelm$Monster_Monster$HillGiant,
																																																	_1: {
																																																		ctor: '::',
																																																		_0: _mordrax$cotwelm$Monster_Monster$YoungAdultRedDragon,
																																																		_1: {
																																																			ctor: '::',
																																																			_0: _mordrax$cotwelm$Monster_Monster$Wizard,
																																																			_1: {
																																																				ctor: '::',
																																																				_0: _mordrax$cotwelm$Monster_Monster$BullMan,
																																																				_1: {
																																																					ctor: '::',
																																																					_0: _mordrax$cotwelm$Monster_Monster$CastleWight,
																																																					_1: {
																																																						ctor: '::',
																																																						_0: _mordrax$cotwelm$Monster_Monster$DarkWraith,
																																																						_1: {
																																																							ctor: '::',
																																																							_0: _mordrax$cotwelm$Monster_Monster$IceElemental,
																																																							_1: {
																																																								ctor: '::',
																																																								_0: _mordrax$cotwelm$Monster_Monster$Spectre,
																																																								_1: {
																																																									ctor: '::',
																																																									_0: _mordrax$cotwelm$Monster_Monster$AnimatedMarbleStatue,
																																																									_1: {
																																																										ctor: '::',
																																																										_0: _mordrax$cotwelm$Monster_Monster$AdultBlueDragon,
																																																										_1: {
																																																											ctor: '::',
																																																											_0: _mordrax$cotwelm$Monster_Monster$AdultGreenDragon,
																																																											_1: {
																																																												ctor: '::',
																																																												_0: _mordrax$cotwelm$Monster_Monster$AdultWhiteDragon,
																																																												_1: {
																																																													ctor: '::',
																																																													_0: _mordrax$cotwelm$Monster_Monster$AirElemental,
																																																													_1: {
																																																														ctor: '::',
																																																														_0: _mordrax$cotwelm$Monster_Monster$MagmaElemental,
																																																														_1: {
																																																															ctor: '::',
																																																															_0: _mordrax$cotwelm$Monster_Monster$StoneGiant,
																																																															_1: {
																																																																ctor: '::',
																																																																_0: _mordrax$cotwelm$Monster_Monster$TwoHeadedGiant,
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: _mordrax$cotwelm$Monster_Monster$AdultRedDragon,
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: _mordrax$cotwelm$Monster_Monster$FireElemental,
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: _mordrax$cotwelm$Monster_Monster$FrostGiant,
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: _mordrax$cotwelm$Monster_Monster$SpikedDevil,
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: _mordrax$cotwelm$Monster_Monster$WaterElemental,
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: _mordrax$cotwelm$Monster_Monster$EarthElemental,
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: _mordrax$cotwelm$Monster_Monster$Necromancer,
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: _mordrax$cotwelm$Monster_Monster$Vampire,
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: _mordrax$cotwelm$Monster_Monster$AbyssWraith,
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: _mordrax$cotwelm$Monster_Monster$Utgardhalok,
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: _mordrax$cotwelm$Monster_Monster$FireGiant,
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: _mordrax$cotwelm$Monster_Monster$OldBlueDragon,
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: _mordrax$cotwelm$Monster_Monster$OldGreenDragon,
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: _mordrax$cotwelm$Monster_Monster$OldWhiteDragon,
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: _mordrax$cotwelm$Monster_Monster$HornedDevil,
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: _mordrax$cotwelm$Monster_Monster$OldRedDragon,
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: _mordrax$cotwelm$Monster_Monster$Rungnir,
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: _mordrax$cotwelm$Monster_Monster$IceDevil,
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: _mordrax$cotwelm$Monster_Monster$Thrym,
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: _mordrax$cotwelm$Monster_Monster$VeryOldGreenDragon,
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: _mordrax$cotwelm$Monster_Monster$VeryOldWhiteDragon,
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: _mordrax$cotwelm$Monster_Monster$VeryOldBlueDragon,
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: _mordrax$cotwelm$Monster_Monster$AbyssFiend,
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: _mordrax$cotwelm$Monster_Monster$Thiassa,
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: _mordrax$cotwelm$Monster_Monster$VeryOldRedDragon,
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: _mordrax$cotwelm$Monster_Monster$AncientGreenDragon,
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: _mordrax$cotwelm$Monster_Monster$AncientWhiteDragon,
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: _mordrax$cotwelm$Monster_Monster$AncientBlueDragon,
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: _mordrax$cotwelm$Monster_Monster$AncientRedDragon,
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: _mordrax$cotwelm$Monster_Monster$Sultur,
																																																																																														_1: {ctor: '[]'}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Monster_Monster$randomMonster = function (position) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		A2(_elm_lang$core$Basics$flip, _mordrax$cotwelm$Monster_Monster$init, position),
		A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			_elm_lang$core$Maybe$withDefault(_mordrax$cotwelm$Monster_Monster$GiantRat),
			A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				_elm_lang$core$List$head,
				_mordrax$cotwelm$Lodash$shuffle(_mordrax$cotwelm$Monster_Monster$types))));
};
var _mordrax$cotwelm$Monster_Monster$randomMonstersReducer = F2(
	function (position, monsters) {
		return function (monster) {
			return A3(
				_mgold$elm_random_pcg$Random_Pcg$map2,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				monster,
				monsters);
		}(
			_mordrax$cotwelm$Monster_Monster$randomMonster(position));
	});
var _mordrax$cotwelm$Monster_Monster$randomMonsters = function (positions) {
	return A3(
		_elm_lang$core$List$foldl,
		_mordrax$cotwelm$Monster_Monster$randomMonstersReducer,
		_mgold$elm_random_pcg$Random_Pcg$constant(
			{ctor: '[]'}),
		positions);
};

var _mordrax$cotwelm$Combat$defenderName = F2(
	function (_p0, adjective) {
		var _p1 = _p0;
		var _p3 = _p1.name;
		var _p2 = {ctor: '_Tuple2', _0: _p1.type_, _1: adjective};
		if (_p2._1.ctor === 'Possessive') {
			if (_p2._0.ctor === 'Hero') {
				return 'your';
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'the ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$String$toLower(_p3),
						'\'s'));
			}
		} else {
			if (_p2._0.ctor === 'Hero') {
				return 'you';
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'the ',
					_elm_lang$core$String$toLower(_p3));
			}
		}
	});
var _mordrax$cotwelm$Combat$attackerName = F2(
	function (_p4, adjective) {
		var _p5 = _p4;
		var _p7 = _p5.name;
		var _p6 = {ctor: '_Tuple2', _0: _p5.type_, _1: adjective};
		if (_p6._1.ctor === 'Possessive') {
			if (_p6._0.ctor === 'Hero') {
				return 'Your ';
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'The ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$String$toLower(_p7),
						'\'s'));
			}
		} else {
			if (_p6._0.ctor === 'Hero') {
				return 'You ';
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'The ',
					_elm_lang$core$String$toLower(_p7));
			}
		}
	});
var _mordrax$cotwelm$Combat$statusMsg = function (stats) {
	var healthPercent = _elm_lang$core$Basics$toFloat(stats.currentHP) / _elm_lang$core$Basics$toFloat(stats.hardMaxHP);
	return _elm_lang$core$Native_Utils.eq(healthPercent, 1) ? 'Still in top shape!' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.9) > -1) ? 'It is slightly injured.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.8) > -1) ? 'It\'s looking a little worried.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.7) > -1) ? 'It is taking the fight seriously now.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.6) > -1) ? 'It has a few decent wounds.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.5) > -1) ? 'It has seen better days.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.4) > -1) ? 'It looks bruised and battered, shoulders drooping.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.3) > -1) ? 'It doesn\'t look like it can handle much more.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.2) > -1) ? 'It saying it\'s prayers.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.1) > -1) ? 'It is bleeding from critical wounds.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, 0.0) > -1) ? 'It seems to be mortally wounded.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, -0.5) > -1) ? 'It is clinically dead.' : ((_elm_lang$core$Native_Utils.cmp(healthPercent, -1) > -1) ? 'It has been well and truly put down. Well done!' : 'It has been pummeled into an unrecognisable heap.'))))))))))));
};
var _mordrax$cotwelm$Combat$hitMsg = F3(
	function (_p9, _p8, defender) {
		var _p10 = _p9;
		var _p14 = _p10.att;
		var _p11 = _p8;
		var _p13 = _p11._0;
		var defenderAfterDamage = _elm_lang$core$Native_Utils.update(
			defender,
			{
				stats: A2(_mordrax$cotwelm$Stats$takeHit, _p13, defender.stats)
			});
		var addStatus = function (msg) {
			var _p12 = defender.type_;
			if (_p12.ctor === 'Hero') {
				return msg;
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					msg,
					_mordrax$cotwelm$Combat$statusMsg(defenderAfterDamage.stats));
			}
		};
		var defaultCritMsg = A2(
			_elm_lang$core$Basics_ops['++'],
			_p14,
			A2(
				_elm_lang$core$Basics_ops['++'],
				' found a weak spot in ',
				A2(_elm_lang$core$Basics_ops['++'], _p10.defr, ' defense! Ouch!')));
		var defaultHitMsg = A2(
			_elm_lang$core$Basics_ops['++'],
			_p14,
			A2(
				_elm_lang$core$Basics_ops['++'],
				' scored a hit on ',
				A2(_elm_lang$core$Basics_ops['++'], _p10.def, '!')));
		var hitMsgs = {ctor: '[]'};
		var critMsgs = {ctor: '[]'};
		return (_elm_lang$core$Native_Utils.cmp(_p13, _p11._1) > -1) ? A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (msg) {
				return {ctor: '_Tuple2', _0: msg, _1: defenderAfterDamage};
			},
			A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				addStatus,
				A2(
					_mgold$elm_random_pcg$Random_Pcg$map,
					_elm_lang$core$Maybe$withDefault(defaultCritMsg),
					_mgold$elm_random_pcg$Random_Pcg$sample(critMsgs)))) : A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (msg) {
				return {ctor: '_Tuple2', _0: msg, _1: defenderAfterDamage};
			},
			A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				addStatus,
				A2(
					_mgold$elm_random_pcg$Random_Pcg$map,
					_elm_lang$core$Maybe$withDefault(defaultHitMsg),
					_mgold$elm_random_pcg$Random_Pcg$sample(hitMsgs))));
	});
var _mordrax$cotwelm$Combat$blockedMsg = function (_p15) {
	var _p16 = _p15;
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_elm_lang$core$Maybe$withDefault(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p16.attr,
				A2(
					_elm_lang$core$Basics_ops['++'],
					' swing clanged against ',
					A2(_elm_lang$core$Basics_ops['++'], _p16.defr, ' shield.')))),
		_mgold$elm_random_pcg$Random_Pcg$sample(
			{ctor: '[]'}));
};
var _mordrax$cotwelm$Combat$missMsg = function (_p17) {
	var _p18 = _p17;
	var _p21 = _p18.def;
	var _p20 = _p18.attr;
	var _p19 = _p18.att;
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_elm_lang$core$Maybe$withDefault(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p20,
				A2(_elm_lang$core$Basics_ops['++'], ' fumbled attack complete missed ', _p21))),
		_mgold$elm_random_pcg$Random_Pcg$sample(
			{
				ctor: '::',
				_0: A2(
					_elm_lang$core$Basics_ops['++'],
					_p20,
					A2(_elm_lang$core$Basics_ops['++'], ' half arsed attack failed to hit ', _p21)),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_p20,
						A2(_elm_lang$core$Basics_ops['++'], ' fancy footwork did not fool ', _p21)),
					_1: {
						ctor: '::',
						_0: A2(_elm_lang$core$Basics_ops['++'], _p19, ' could not hit the broadside of a barn with that pathetic attempt.'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$core$Basics_ops['++'],
								_p19,
								A2(
									_elm_lang$core$Basics_ops['++'],
									' perform a decent attack but ',
									A2(_elm_lang$core$Basics_ops['++'], _p21, ' perfectly parried the shot.'))),
							_1: {ctor: '[]'}
						}
					}
				}
			}));
};
var _mordrax$cotwelm$Combat$attackSpeed = F2(
	function (weapon, _p22) {
		var _p23 = _p22;
		return 1;
	});
var _mordrax$cotwelm$Combat$damageCalculator = function (_p24) {
	var _p25 = _p24;
	var _p27 = _p25.attributes;
	var addStrToBonus = F2(
		function (str, die) {
			return _elm_lang$core$Native_Utils.update(
				die,
				{bonus: ((str / 10) | 0) + die.bonus});
		});
	var maybeWeapon = _mordrax$cotwelm$Equipment$getWeapon(_p25.equipment);
	var dice = function () {
		var _p26 = maybeWeapon;
		if (_p26.ctor === 'Just') {
			return A2(
				addStrToBonus,
				_p27.str,
				_mordrax$cotwelm$Item_Weapon$damage(_p26._0));
		} else {
			return A3(_mordrax$cotwelm$Dice$Dice, 1, (_p27.str / 10) | 0, 0);
		}
	}();
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		function (roll) {
			return {ctor: '_Tuple2', _0: roll, _1: (dice.nDice * dice.sides) + dice.bonus};
		},
		_mordrax$cotwelm$Dice$roll(dice));
};
var _mordrax$cotwelm$Combat$hitResult = F4(
	function (cth, names, defender, _p28) {
		var _p29 = _p28;
		var _p32 = _p29._1._1;
		var _p31 = _p29._0;
		var isCrit = _elm_lang$core$Native_Utils.cmp(_p31, cth.critRange) < 0;
		var cthThreshold = ((cth.baseCTH + cth.sizeModifier) + cth.weaponBulkPenalty) + cth.armourPenalty;
		var isHit = _elm_lang$core$Native_Utils.cmp(_p31, cthThreshold) < 0;
		var isBlocked = _elm_lang$core$Native_Utils.cmp(_p31, cthThreshold + cth.blockPenalty) < 0;
		var _p30 = {ctor: '_Tuple3', _0: isHit, _1: isCrit, _2: isBlocked};
		_v13_3:
		do {
			_v13_0:
			do {
				if (_p30.ctor === '_Tuple3') {
					if (_p30._0 === true) {
						if (_p30._1 === true) {
							break _v13_0;
						} else {
							return A3(
								_mordrax$cotwelm$Combat$hitMsg,
								names,
								{ctor: '_Tuple2', _0: _p29._1._0, _1: _p32},
								defender);
						}
					} else {
						if (_p30._1 === true) {
							break _v13_0;
						} else {
							if (_p30._2 === true) {
								return A2(
									_mgold$elm_random_pcg$Random_Pcg$map,
									function (msg) {
										return {ctor: '_Tuple2', _0: msg, _1: defender};
									},
									_mordrax$cotwelm$Combat$blockedMsg(names));
							} else {
								break _v13_3;
							}
						}
					}
				} else {
					break _v13_3;
				}
			} while(false);
			return A3(
				_mordrax$cotwelm$Combat$hitMsg,
				names,
				{ctor: '_Tuple2', _0: _p32, _1: _p32},
				defender);
		} while(false);
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (msg) {
				return {ctor: '_Tuple2', _0: msg, _1: defender};
			},
			_mordrax$cotwelm$Combat$missMsg(names));
	});
var _mordrax$cotwelm$Combat$bodySizeToDodge = function (bodySize) {
	var _p33 = bodySize;
	switch (_p33.ctor) {
		case 'Tiny':
			return 10;
		case 'Small':
			return 5;
		case 'Medium':
			return 0;
		case 'Large':
			return -5;
		default:
			return -10;
	}
};
var _mordrax$cotwelm$Combat$chanceToHit = F2(
	function (attacker, defender) {
		var sizeModifier = A3(
			_elm_lang$core$Basics$clamp,
			-10,
			10,
			_mordrax$cotwelm$Combat$bodySizeToDodge(defender.bodySize));
		var _p34 = {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Equipment$getWeapon(attacker.equipment),
			_1: _mordrax$cotwelm$Equipment$getArmour(attacker.equipment)
		};
		var weapon = _p34._0;
		var armour = _p34._1;
		var armourMass = A2(
			_elm_lang$core$Maybe$withDefault,
			A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
			A2(
				_elm_lang$core$Maybe$map,
				function (_p35) {
					return function (_) {
						return _.mass;
					}(
						function (_) {
							return _.base;
						}(_p35));
				},
				armour));
		var armourPenalty = _elm_lang$core$Basics$round(
			A3(
				_elm_lang$core$Basics$clamp,
				-20,
				0,
				((_elm_lang$core$Basics$toFloat(attacker.attributes.str) / 100) - (_elm_lang$core$Basics$toFloat(armourMass.weight) / 15000)) * 20));
		var weaponMass = A2(
			_elm_lang$core$Maybe$withDefault,
			A2(_mordrax$cotwelm$Utils_Mass$Mass, 0, 0),
			A2(
				_elm_lang$core$Maybe$map,
				function (_p36) {
					return function (_) {
						return _.mass;
					}(
						function (_) {
							return _.base;
						}(_p36));
				},
				weapon));
		var weaponBulkPenalty = _elm_lang$core$Basics$round(
			A3(
				_elm_lang$core$Basics$clamp,
				-15,
				15,
				(1 - (_elm_lang$core$Basics$toFloat(weaponMass.bulk) / 6000)) * 15));
		return {baseCTH: attacker.attributes.dex, armourPenalty: armourPenalty, weaponBulkPenalty: weaponBulkPenalty, sizeModifier: sizeModifier, blockPenalty: 5, critRange: 20};
	});
var _mordrax$cotwelm$Combat$CTH = F6(
	function (a, b, c, d, e, f) {
		return {baseCTH: a, weaponBulkPenalty: b, armourPenalty: c, sizeModifier: d, blockPenalty: e, critRange: f};
	});
var _mordrax$cotwelm$Combat$Names = F4(
	function (a, b, c, d) {
		return {att: a, attr: b, def: c, defr: d};
	});
var _mordrax$cotwelm$Combat$NonPossessive = {ctor: 'NonPossessive'};
var _mordrax$cotwelm$Combat$Possessive = {ctor: 'Possessive'};
var _mordrax$cotwelm$Combat$makeNames = F2(
	function (attacker, defender) {
		return {
			att: A2(_mordrax$cotwelm$Combat$attackerName, attacker, _mordrax$cotwelm$Combat$NonPossessive),
			attr: A2(_mordrax$cotwelm$Combat$attackerName, attacker, _mordrax$cotwelm$Combat$Possessive),
			def: A2(_mordrax$cotwelm$Combat$defenderName, defender, _mordrax$cotwelm$Combat$NonPossessive),
			defr: A2(_mordrax$cotwelm$Combat$defenderName, defender, _mordrax$cotwelm$Combat$Possessive)
		};
	});
var _mordrax$cotwelm$Combat$attack = F2(
	function (attacker, defender) {
		var names = A2(_mordrax$cotwelm$Combat$makeNames, attacker, defender);
		var damageDie = _mordrax$cotwelm$Combat$damageCalculator(attacker);
		var hitDie = A2(_mgold$elm_random_pcg$Random_Pcg$int, 1, 100);
		var cth = A2(_mordrax$cotwelm$Combat$chanceToHit, attacker, defender);
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			function (rolls) {
				return A4(_mordrax$cotwelm$Combat$hitResult, cth, names, defender, rolls);
			},
			A3(
				_mgold$elm_random_pcg$Random_Pcg$map2,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				hitDie,
				damageDie));
	});

var _mordrax$cotwelm$UI$inputWithIncDec = F2(
	function (val, msg) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui left action right action input'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ui icon button'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$i,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('minus icon'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$input,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$type_('number'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$value(
									_elm_lang$core$Basics$toString(val)),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui icon button'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$i,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('plus icon'),
										_1: {ctor: '[]'}
									},
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _mordrax$cotwelm$UI$labeledNumberWithStep = F5(
	function (convert, label, number, inc, msg) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui labeled input'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ui label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$input,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$type_('number'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$step(
									_elm_lang$core$Basics$toString(inc)),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onInput(
										function (input) {
											return msg(
												A2(convert, input, 0));
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$value(
											_elm_lang$core$Basics$toString(number)),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			});
	});
var _mordrax$cotwelm$UI$labeledFloat = F3(
	function (label, number, msg) {
		var toFloatWithDefault = F2(
			function (str, $default) {
				return A2(
					_elm_lang$core$Result$withDefault,
					$default,
					_elm_lang$core$String$toFloat(str));
			});
		return A5(_mordrax$cotwelm$UI$labeledNumberWithStep, toFloatWithDefault, label, number, 0.1, msg);
	});
var _mordrax$cotwelm$UI$labeledNumber_ = F4(
	function (convert, label, number, msg) {
		return A5(_mordrax$cotwelm$UI$labeledNumberWithStep, convert, label, number, 1.0, msg);
	});
var _mordrax$cotwelm$UI$labeledNumber = F3(
	function (label, number, msg) {
		var toIntWithDefault = F2(
			function (str, $default) {
				return A2(
					_elm_lang$core$Result$withDefault,
					$default,
					_elm_lang$core$String$toInt(str));
			});
		return A4(_mordrax$cotwelm$UI$labeledNumber_, toIntWithDefault, label, number, msg);
	});
var _mordrax$cotwelm$UI$labeled2TupleNumber = F4(
	function (label, _p0, minMsg, maxMsg) {
		var _p1 = _p0;
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$h4,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: A3(_mordrax$cotwelm$UI$labeledNumber, 'Min', _p1._0, minMsg),
							_1: {
								ctor: '::',
								_0: A3(_mordrax$cotwelm$UI$labeledNumber, 'Max', _p1._1, maxMsg),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			});
	});

var _mordrax$cotwelm$Arena$initHeroLookup = function (hero) {
	var reducer = F3(
		function (dict, hero, lvl) {
			reducer:
			while (true) {
				var _p0 = lvl;
				if (_p0 === 500) {
					return dict;
				} else {
					var _p1 = _p0;
					var nextLvlHero = _mordrax$cotwelm$Hero_Hero$level(hero);
					var _v1 = A3(_elm_lang$core$Dict$insert, _p1, nextLvlHero, dict),
						_v2 = nextLvlHero,
						_v3 = _p1 + 1;
					dict = _v1;
					hero = _v2;
					lvl = _v3;
					continue reducer;
				}
			}
		});
	return A3(reducer, _elm_lang$core$Dict$empty, hero, 1);
};
var _mordrax$cotwelm$Arena$initHero = A3(
	_mordrax$cotwelm$Hero_Hero$init,
	'Heox',
	A4(_mordrax$cotwelm$Attributes$initCustom, 50, 75, 50, 50),
	_mordrax$cotwelm$GameData_Types$Male);
var _mordrax$cotwelm$Arena$ppAttributes = function (_p2) {
	var _p3 = _p2;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(_p3.str),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'/',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p3.dex),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'/',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p3.con),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'/',
							_elm_lang$core$Basics$toString(_p3.$int)))))));
};
var _mordrax$cotwelm$Arena$welcomeView = A2(
	_elm_lang$html$Html$h1,
	{ctor: '[]'},
	{
		ctor: '::',
		_0: _elm_lang$html$Html$text('Welcome to the arena!'),
		_1: {ctor: '[]'}
	});
var _mordrax$cotwelm$Arena$ppArmour = function (item) {
	var _p4 = item;
	if ((_p4.ctor === 'Just') && (_p4._0.ctor === 'ItemArmour')) {
		var _p5 = _p4._0._0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_p5.base.name,
			A2(
				_elm_lang$core$Basics_ops['++'],
				' ( ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p5.ac),
					' )')));
	} else {
		return 'No armour';
	}
};
var _mordrax$cotwelm$Arena$ppWeapon = function (item) {
	var _p6 = item;
	if ((_p6.ctor === 'Just') && (_p6._0.ctor === 'ItemWeapon')) {
		var _p7 = _p6._0._0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_p7.base.name,
			A2(
				_elm_lang$core$Basics_ops['++'],
				' ( ',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_mordrax$cotwelm$Dice$pp(_p7.damage),
					' )')));
	} else {
		return 'No weapon';
	}
};
var _mordrax$cotwelm$Arena$matchView = function (_p8) {
	var _p9 = _p8;
	var _p12 = _p9.wins;
	var _p11 = _p9.monster;
	var _p10 = _p9.battles;
	var armour = _mordrax$cotwelm$Arena$ppArmour(
		A2(_mordrax$cotwelm$Equipment$get, _mordrax$cotwelm$Equipment$ArmourSlot, _p11.equipment));
	var weapon = _mordrax$cotwelm$Arena$ppWeapon(
		A2(_mordrax$cotwelm$Equipment$get, _mordrax$cotwelm$Equipment$WeaponSlot, _p11.equipment));
	var percent = function (a) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'  ( ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(a),
				'% )'));
	};
	var over = F2(
		function (a, b) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(a),
				A2(
					_elm_lang$core$Basics_ops['++'],
					' / ',
					_elm_lang$core$Basics$toString(b)));
		});
	return A2(
		_elm_lang$html$Html$tr,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$td,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(_p11.name),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$td,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(_p11.expLevel)),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$td,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								_mordrax$cotwelm$Arena$ppAttributes(_p11.attributes)),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$td,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(weapon),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$td,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(armour),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$td,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text(
											_elm_lang$core$Basics$toString(_p11.bodySize)),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$td,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text(
												_elm_lang$core$Basics$toString(_p11.stats.maxHP)),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$td,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text(
													A2(
														_elm_lang$core$Basics_ops['++'],
														A2(over, _p12, _p10),
														percent(
															(_elm_lang$core$Basics$toFloat(_p12) * 100) / _elm_lang$core$Basics$toFloat(_p10)))),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$td,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text(
														_elm_lang$core$Basics$toString(
															_elm_lang$core$Basics$toFloat(
																_elm_lang$core$List$sum(_p9.hpRemaining)) / _elm_lang$core$Basics$toFloat(_p10))),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _mordrax$cotwelm$Arena$combatView = function (_p13) {
	var _p14 = _p13;
	return A2(
		_elm_lang$html$Html$table,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('ui striped celled table'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$thead,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$th,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Type'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$th,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Level'),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$th,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('Attributes'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$th,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Weapon'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$th,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Armour'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$th,
											{ctor: '[]'},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text('Size'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$th,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('Hp'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$th,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('Win %'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$th,
														{ctor: '[]'},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Avg HP remaining'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$tbody,
					{ctor: '[]'},
					A2(_elm_lang$core$List$map, _mordrax$cotwelm$Arena$matchView, _p14.matches)),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$Arena$round = F4(
	function (hero, monster, heroAttacking, result) {
		var nextAttacker = !heroAttacking;
		var resultNextRound = _elm_lang$core$Native_Utils.update(
			result,
			{rounds: result.rounds + 1});
		return _mordrax$cotwelm$Stats$isDead(hero.stats) ? _mgold$elm_random_pcg$Random_Pcg$constant(
			_elm_lang$core$Native_Utils.update(
				result,
				{hpRemaining: 0})) : (_mordrax$cotwelm$Stats$isDead(monster.stats) ? _mgold$elm_random_pcg$Random_Pcg$constant(
			_elm_lang$core$Native_Utils.update(
				result,
				{hpRemaining: hero.stats.currentHP})) : (_elm_lang$core$Native_Utils.eq(heroAttacking, true) ? A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			function (_p15) {
				var _p16 = _p15;
				return A4(_mordrax$cotwelm$Arena$round, hero, _p16._1, nextAttacker, resultNextRound);
			},
			A2(_mordrax$cotwelm$Combat$attack, hero, monster)) : A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			function (_p17) {
				var _p18 = _p17;
				return A4(_mordrax$cotwelm$Arena$round, _p18._1, monster, nextAttacker, resultNextRound);
			},
			A2(_mordrax$cotwelm$Combat$attack, monster, hero))));
	});
var _mordrax$cotwelm$Arena$updateVSFromRoundResult = F2(
	function (_p19, vs) {
		var _p20 = _p19;
		var _p21 = _p20.hpRemaining;
		var incBattle = function (vs) {
			return _elm_lang$core$Native_Utils.update(
				vs,
				{battles: vs.battles + 1});
		};
		var addResult = function (vs) {
			return _elm_lang$core$Native_Utils.update(
				vs,
				{
					hpRemaining: {ctor: '::', _0: _p21, _1: vs.hpRemaining},
					rounds: {ctor: '::', _0: _p20.rounds, _1: vs.rounds}
				});
		};
		var addWin = function (vs) {
			return (_elm_lang$core$Native_Utils.cmp(_p21, 0) > 0) ? _elm_lang$core$Native_Utils.update(
				vs,
				{wins: vs.wins + 1}) : vs;
		};
		return incBattle(
			addResult(
				addWin(vs)));
	});
var _mordrax$cotwelm$Arena$maxRounds = 50;
var _mordrax$cotwelm$Arena$fights = function (_p22) {
	var _p23 = _p22;
	var _p25 = _p23;
	var _p24 = _p23.hero;
	var initRound = {rounds: 0, hpRemaining: _p24.stats.maxHP};
	return (_elm_lang$core$Native_Utils.cmp(_p25.battles, _mordrax$cotwelm$Arena$maxRounds) > -1) ? _mgold$elm_random_pcg$Random_Pcg$constant(_p25) : A2(
		_mgold$elm_random_pcg$Random_Pcg$andThen,
		_mordrax$cotwelm$Arena$fights,
		A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (res) {
				return A2(_mordrax$cotwelm$Arena$updateVSFromRoundResult, res, _p25);
			},
			A4(_mordrax$cotwelm$Arena$round, _p24, _p23.monster, true, initRound)));
};
var _mordrax$cotwelm$Arena$VS = F6(
	function (a, b, c, d, e, f) {
		return {hero: a, monster: b, battles: c, wins: d, hpRemaining: e, rounds: f};
	});
var _mordrax$cotwelm$Arena$initMatches = function (heroLookup) {
	var newMonster = function (monsterType) {
		return _mordrax$cotwelm$Monster_Monster$initForArena(monsterType);
	};
	var newMatch = function (monsterType) {
		var monster = newMonster(monsterType);
		return A6(
			_mordrax$cotwelm$Arena$VS,
			A2(
				_elm_lang$core$Maybe$withDefault,
				_mordrax$cotwelm$Arena$initHero,
				A2(_elm_lang$core$Dict$get, monster.expLevel, heroLookup)),
			monster,
			0,
			0,
			{ctor: '[]'},
			{ctor: '[]'});
	};
	return A2(
		_elm_lang$core$List$map,
		newMatch,
		A2(_elm_lang$core$List$take, 20, _mordrax$cotwelm$Monster_Monster$types));
};
var _mordrax$cotwelm$Arena$init = function () {
	var heroLookup = _mordrax$cotwelm$Arena$initHeroLookup(_mordrax$cotwelm$Arena$initHero);
	return {
		matches: _mordrax$cotwelm$Arena$initMatches(heroLookup),
		heroAttributes: _mordrax$cotwelm$Attributes$init,
		heroLookup: heroLookup
	};
}();
var _mordrax$cotwelm$Arena$RoundResult = F2(
	function (a, b) {
		return {rounds: a, hpRemaining: b};
	});
var _mordrax$cotwelm$Arena$Model = F3(
	function (a, b, c) {
		return {matches: a, heroAttributes: b, heroLookup: c};
	});
var _mordrax$cotwelm$Arena$SetAttribute = F2(
	function (a, b) {
		return {ctor: 'SetAttribute', _0: a, _1: b};
	});
var _mordrax$cotwelm$Arena$heroView = function (_p26) {
	var _p27 = _p26;
	var _p28 = _p27.attributes;
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'Hero attributes: ',
							_mordrax$cotwelm$Arena$ppAttributes(_p28))),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Hero HP: ',
								_elm_lang$core$Basics$toString(_p27.stats.maxHP))),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A3(
							_mordrax$cotwelm$UI$labeledNumber,
							'Str: ',
							_p28.str,
							_mordrax$cotwelm$Arena$SetAttribute(_mordrax$cotwelm$Attributes$Strength)),
						_1: {
							ctor: '::',
							_0: A3(
								_mordrax$cotwelm$UI$labeledNumber,
								'Dex: ',
								_p28.dex,
								_mordrax$cotwelm$Arena$SetAttribute(_mordrax$cotwelm$Attributes$Dexterity)),
							_1: {
								ctor: '::',
								_0: A3(
									_mordrax$cotwelm$UI$labeledNumber,
									'Con: ',
									_p28.con,
									_mordrax$cotwelm$Arena$SetAttribute(_mordrax$cotwelm$Attributes$Constitution)),
								_1: {
									ctor: '::',
									_0: A3(
										_mordrax$cotwelm$UI$labeledNumber,
										'Int: ',
										_p28.$int,
										_mordrax$cotwelm$Arena$SetAttribute(_mordrax$cotwelm$Attributes$Intelligence)),
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$Arena$FightResult = function (a) {
	return {ctor: 'FightResult', _0: a};
};
var _mordrax$cotwelm$Arena$fightCmd = function (model) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$generate,
		_mordrax$cotwelm$Arena$FightResult,
		_mordrax$cotwelm$Lodash$combine(
			A2(_elm_lang$core$List$map, _mordrax$cotwelm$Arena$fights, model.matches)));
};
var _mordrax$cotwelm$Arena$update = F2(
	function (msg, model) {
		var _p29 = msg;
		switch (_p29.ctor) {
			case 'Fight':
				var newModel = _elm_lang$core$Native_Utils.update(
					model,
					{
						matches: _mordrax$cotwelm$Arena$initMatches(model.heroLookup)
					});
				return {
					ctor: '_Tuple2',
					_0: newModel,
					_1: _mordrax$cotwelm$Arena$fightCmd(newModel)
				};
			case 'SetAttribute':
				var attributes_ = A2(
					_mordrax$cotwelm$Attributes$set,
					{ctor: '_Tuple2', _0: _p29._0, _1: _p29._1},
					model.heroAttributes);
				var heroLookup_ = _mordrax$cotwelm$Arena$initHeroLookup(
					A3(_mordrax$cotwelm$Hero_Hero$init, 'Heox', attributes_, _mordrax$cotwelm$GameData_Types$Male));
				var model_ = _elm_lang$core$Native_Utils.update(
					model,
					{
						heroLookup: heroLookup_,
						matches: _mordrax$cotwelm$Arena$initMatches(heroLookup_),
						heroAttributes: attributes_
					});
				return {
					ctor: '_Tuple2',
					_0: model_,
					_1: _mordrax$cotwelm$Arena$fightCmd(model_)
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{matches: _p29._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _mordrax$cotwelm$Arena$Fight = {ctor: 'Fight'};
var _mordrax$cotwelm$Arena$menuView = function () {
	var btn = F2(
		function (txt, msg) {
			return A2(
				_elm_lang$html$Html$button,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onClick(msg),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ui button'),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(txt),
					_1: {ctor: '[]'}
				});
		});
	return A2(
		_elm_lang$html$Html$h1,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(btn, 'Fight!', _mordrax$cotwelm$Arena$Fight),
			_1: {ctor: '[]'}
		});
}();
var _mordrax$cotwelm$Arena$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _mordrax$cotwelm$Arena$welcomeView,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Arena$menuView,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Arena$heroView(
						A2(
							_elm_lang$core$Maybe$withDefault,
							_mordrax$cotwelm$Arena$initHero,
							A2(_elm_lang$core$Dict$get, 1, model.heroLookup))),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Arena$combatView(model),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};

var _mordrax$cotwelm$CharCreation_CharCreation$info = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return {ctor: '_Tuple4', _0: _p2.name, _1: _p2.gender, _2: _p2.difficulty, _3: _p2.attributes};
};
var _mordrax$cotwelm$CharCreation_CharCreation$Model = F4(
	function (a, b, c, d) {
		return {name: a, attributes: b, gender: c, difficulty: d};
	});
var _mordrax$cotwelm$CharCreation_CharCreation$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$CharCreation_CharCreation$init = _mordrax$cotwelm$CharCreation_CharCreation$A(
	{name: 'testing', attributes: _mordrax$cotwelm$Attributes$init, gender: _mordrax$cotwelm$GameData_Types$Female, difficulty: _mordrax$cotwelm$GameData_Types$Hard});
var _mordrax$cotwelm$CharCreation_CharCreation$update = F2(
	function (msg, _p3) {
		var _p4 = _p3;
		var _p6 = _p4._0;
		var _p5 = msg;
		switch (_p5.ctor) {
			case 'Name':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$CharCreation_CharCreation$A(
						_elm_lang$core$Native_Utils.update(
							_p6,
							{name: _p5._0})),
					_1: false
				};
			case 'Gender':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$CharCreation_CharCreation$A(
						_elm_lang$core$Native_Utils.update(
							_p6,
							{gender: _p5._0})),
					_1: false
				};
			case 'Difficulty':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$CharCreation_CharCreation$A(
						_elm_lang$core$Native_Utils.update(
							_p6,
							{difficulty: _p5._0})),
					_1: false
				};
			case 'Attribute':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$CharCreation_CharCreation$A(
						_elm_lang$core$Native_Utils.update(
							_p6,
							{
								attributes: A2(_mordrax$cotwelm$Attributes$update, _p5._0, _p6.attributes)
							})),
					_1: false
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$CharCreation_CharCreation$A(_p6),
					_1: true
				};
		}
	});
var _mordrax$cotwelm$CharCreation_CharCreation$StartGame = {ctor: 'StartGame'};
var _mordrax$cotwelm$CharCreation_CharCreation$Attribute = function (a) {
	return {ctor: 'Attribute', _0: a};
};
var _mordrax$cotwelm$CharCreation_CharCreation$Difficulty = function (a) {
	return {ctor: 'Difficulty', _0: a};
};
var _mordrax$cotwelm$CharCreation_CharCreation$iconButton = F3(
	function (diff, active, a) {
		return A2(
			_elm_lang$html$Html$button,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(
					A2(_elm_lang$core$Basics_ops['++'], 'ui icon button ', active)),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onClick(
						_mordrax$cotwelm$CharCreation_CharCreation$Difficulty(diff)),
					_1: {ctor: '[]'}
				}
			},
			a);
	});
var _mordrax$cotwelm$CharCreation_CharCreation$easyButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_CharCreation$iconButton,
		_mordrax$cotwelm$GameData_Types$Easy,
		active,
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$i,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('huge green circle icon'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Easy'),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$CharCreation_CharCreation$intermediateButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_CharCreation$iconButton,
		_mordrax$cotwelm$GameData_Types$Intermediate,
		active,
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$i,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('huge blue square icon'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Intermediate'),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$CharCreation_CharCreation$hardButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_CharCreation$iconButton,
		_mordrax$cotwelm$GameData_Types$Hard,
		active,
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$i,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('huge black square icon'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Hard'),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$CharCreation_CharCreation$impossibleButton = function (active) {
	return A3(
		_mordrax$cotwelm$CharCreation_CharCreation$iconButton,
		_mordrax$cotwelm$GameData_Types$Impossible,
		active,
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$i,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('huge yellow warning sign icon'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Impossible'),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$CharCreation_CharCreation$difficultyView = function (difficulty) {
	var activeImpossible = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$GameData_Types$Impossible) ? 'active' : '';
	var activeHard = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$GameData_Types$Hard) ? 'active' : '';
	var activeIntermediate = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$GameData_Types$Intermediate) ? 'active' : '';
	var activeEasy = _elm_lang$core$Native_Utils.eq(difficulty, _mordrax$cotwelm$GameData_Types$Easy) ? 'active' : '';
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('four ui buttons'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _mordrax$cotwelm$CharCreation_CharCreation$easyButton(activeEasy),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$CharCreation_CharCreation$intermediateButton(activeIntermediate),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$CharCreation_CharCreation$hardButton(activeHard),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$CharCreation_CharCreation$impossibleButton(activeImpossible),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _mordrax$cotwelm$CharCreation_CharCreation$Gender = function (a) {
	return {ctor: 'Gender', _0: a};
};
var _mordrax$cotwelm$CharCreation_CharCreation$genderButton = F2(
	function (gender, isActive) {
		var icon = _elm_lang$core$Native_Utils.eq(gender, _mordrax$cotwelm$GameData_Types$Male) ? 'large male icon' : 'large female icon';
		var active = isActive ? 'active' : '';
		return A2(
			_elm_lang$html$Html$button,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(
					A2(_elm_lang$core$Basics_ops['++'], 'ui labeled icon button ', active)),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onClick(
						_mordrax$cotwelm$CharCreation_CharCreation$Gender(gender)),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$i,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class(icon),
						_1: {ctor: '[]'}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						_elm_lang$core$Basics$toString(gender)),
					_1: {ctor: '[]'}
				}
			});
	});
var _mordrax$cotwelm$CharCreation_CharCreation$genderView = function (gender) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('equal width column'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('ui large buttons'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_mordrax$cotwelm$CharCreation_CharCreation$genderButton,
						_mordrax$cotwelm$GameData_Types$Male,
						_elm_lang$core$Native_Utils.eq(gender, _mordrax$cotwelm$GameData_Types$Male)),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('or'),
								_1: {ctor: '[]'}
							},
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: A2(
								_mordrax$cotwelm$CharCreation_CharCreation$genderButton,
								_mordrax$cotwelm$GameData_Types$Female,
								_elm_lang$core$Native_Utils.eq(gender, _mordrax$cotwelm$GameData_Types$Female)),
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {ctor: '[]'}
		});
};
var _mordrax$cotwelm$CharCreation_CharCreation$Name = function (a) {
	return {ctor: 'Name', _0: a};
};
var _mordrax$cotwelm$CharCreation_CharCreation$nameView = function (playerName) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('ui vertical segment'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('ui labeled fluid input'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('ui label'),
							_1: {ctor: '[]'}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$input,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$name('name'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$placeholder('What word did your mother utter as you came kicking and screaming into this world?'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onInput(_mordrax$cotwelm$CharCreation_CharCreation$Name),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$value(playerName),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		});
};
var _mordrax$cotwelm$CharCreation_CharCreation$view = function (_p7) {
	var _p8 = _p7;
	var _p9 = _p8._0;
	var bgStyle = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'backgroundColor', _1: 'black'},
		_1: {ctor: '[]'}
	};
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'Name: ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p9.name,
								A2(
									_elm_lang$core$Basics_ops['++'],
									' Difficulty: ',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Basics$toString(_p9.difficulty),
										A2(
											_elm_lang$core$Basics_ops['++'],
											' Gender: ',
											_elm_lang$core$Basics$toString(_p9.gender))))))),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ui middle aligned center aligned grid'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui one column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('ui stacked vertical segment'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _mordrax$cotwelm$CharCreation_CharCreation$nameView(_p9.name),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$map,
												_mordrax$cotwelm$CharCreation_CharCreation$Attribute,
												_mordrax$cotwelm$Attributes$view(_p9.attributes)),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('ui vertical segments'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$div,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('ui vertical segment'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('Character Gender'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$div,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$class('ui vertical segment'),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _mordrax$cotwelm$CharCreation_CharCreation$genderView(_p9.gender),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _mordrax$cotwelm$CharCreation_CharCreation$difficultyView(_p9.difficulty),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$button,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('ui button primary'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$CharCreation_CharCreation$StartGame),
															_1: {ctor: '[]'}
														}
													},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('Ok'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$button,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$class('ui button'),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Cancel'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_elm_lang$html$Html$button,
															{
																ctor: '::',
																_0: _elm_lang$html$Html_Attributes$class('ui button'),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _elm_lang$html$Html$text('View Icon'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$html$Html$button,
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html_Attributes$class('ui button'),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html$text('Help'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};

var _mordrax$cotwelm$Item_Factory$Model = function (a) {
	return {idGenerator: a};
};
var _mordrax$cotwelm$Item_Factory$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Item_Factory$init = _mordrax$cotwelm$Item_Factory$A(
	_mordrax$cotwelm$Item_Factory$Model(_mordrax$cotwelm$Utils_IdGenerator$init));
var _mordrax$cotwelm$Item_Factory$make = F2(
	function (itemType, _p0) {
		var _p1 = _p0;
		var _p3 = _p1._0;
		var _p2 = _mordrax$cotwelm$Utils_IdGenerator$getUniqueId(_p3.idGenerator);
		var id = _p2._0;
		var idGenerator_ = _p2._1;
		return {
			ctor: '_Tuple2',
			_0: A2(_mordrax$cotwelm$Item_Item$new, itemType, id),
			_1: _mordrax$cotwelm$Item_Factory$A(
				_elm_lang$core$Native_Utils.update(
					_p3,
					{idGenerator: idGenerator_}))
		};
	});
var _mordrax$cotwelm$Item_Factory$makeReducer = F2(
	function (itemType, _p4) {
		var _p5 = _p4;
		var _p6 = A2(_mordrax$cotwelm$Item_Factory$make, itemType, _p5._1);
		var newItem = _p6._0;
		var newItemFactory = _p6._1;
		return {
			ctor: '_Tuple2',
			_0: {ctor: '::', _0: newItem, _1: _p5._0},
			_1: newItemFactory
		};
	});

var _mordrax$cotwelm$Shops$shield = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$BrokenShield),
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$SmallWoodenShield),
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$MediumWoodenShield),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$LargeWoodenShield),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$SmallIronShield),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$MediumIronShield),
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$LargeIronShield),
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$SmallSteelShield),
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$MediumSteelShield),
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$LargeSteelShield),
										_1: {
											ctor: '::',
											_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$SmallMeteoricSteelShield),
											_1: {
												ctor: '::',
												_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$MediumMeteoricSteelShield),
												_1: {
													ctor: '::',
													_0: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$LargeMeteoricSteelShield),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Shops$pack = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$SmallBag),
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$MediumBag),
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$LargeBag),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$SmallPack),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$MediumPack),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$LargePack),
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$SmallChest),
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$MediumChest),
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$LargeChest),
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$EnchantedSmallPackOfHolding),
										_1: {
											ctor: '::',
											_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$EnchantedMediumPackOfHolding),
											_1: {
												ctor: '::',
												_0: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$EnchantedLargePackOfHolding),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Shops$helmet = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypeHelmet(_mordrax$cotwelm$Item_Data$BrokenHelmet),
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Item_Data$ItemTypeHelmet(_mordrax$cotwelm$Item_Data$LeatherHelmet),
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Item_Data$ItemTypeHelmet(_mordrax$cotwelm$Item_Data$IronHelmet),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Item_Data$ItemTypeHelmet(_mordrax$cotwelm$Item_Data$SteelHelmet),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Item_Data$ItemTypeHelmet(_mordrax$cotwelm$Item_Data$MeteoricSteelHelmet),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Item_Data$ItemTypeHelmet(_mordrax$cotwelm$Item_Data$HelmetOfDetectMonsters),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Shops$gauntlets = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypeGauntlets(_mordrax$cotwelm$Item_Data$NormalGauntlets),
	_1: {ctor: '[]'}
};
var _mordrax$cotwelm$Shops$bracers = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypeBracers(_mordrax$cotwelm$Item_Data$NormalBracers),
	_1: {ctor: '[]'}
};
var _mordrax$cotwelm$Shops$belt = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypeBelt(_mordrax$cotwelm$Item_Data$TwoSlotBelt),
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Item_Data$ItemTypeBelt(_mordrax$cotwelm$Item_Data$ThreeSlotBelt),
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Item_Data$ItemTypeBelt(_mordrax$cotwelm$Item_Data$FourSlotBelt),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Item_Data$ItemTypeBelt(_mordrax$cotwelm$Item_Data$UtilityBelt),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Item_Data$ItemTypeBelt(_mordrax$cotwelm$Item_Data$WandQuiverBelt),
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Shops$armour = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$RustyArmour),
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$LeatherArmour),
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$StuddedLeatherArmour),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$RingMail),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$ScaleMail),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$ChainMail),
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$SplintMail),
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$PlateMail),
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$PlateArmour),
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$MeteoricSteelPlate),
										_1: {
											ctor: '::',
											_0: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$ElvenChainMail),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Shops$weapons = {
	ctor: '::',
	_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Club),
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Dagger),
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Hammer),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$HandAxe),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Quarterstaff),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Spear),
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$ShortSword),
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Mace),
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Flail),
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Axe),
										_1: {
											ctor: '::',
											_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$WarHammer),
											_1: {
												ctor: '::',
												_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$LongSword),
												_1: {
													ctor: '::',
													_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$BattleAxe),
													_1: {
														ctor: '::',
														_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$BroadSword),
														_1: {
															ctor: '::',
															_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$MorningStar),
															_1: {
																ctor: '::',
																_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$BastardSword),
																_1: {
																	ctor: '::',
																	_0: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$TwoHandedSword),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Shops$inventoryStock = function (shop) {
	var _p0 = shop;
	switch (_p0.ctor) {
		case 'WeaponSmith':
			return _mordrax$cotwelm$Shops$weapons;
		case 'GeneralStore':
			return _elm_lang$core$List$concat(
				{
					ctor: '::',
					_0: _mordrax$cotwelm$Shops$armour,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Shops$belt,
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Shops$bracers,
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Shops$gauntlets,
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Shops$helmet,
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Shops$pack,
										_1: {
											ctor: '::',
											_0: _mordrax$cotwelm$Shops$shield,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				});
		case 'PotionStore':
			return {ctor: '[]'};
		default:
			return {ctor: '[]'};
	}
};
var _mordrax$cotwelm$Shops$list = F2(
	function (shopType, stores) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '[]'},
			A2(
				_elm_lang$core$Dict$get,
				_elm_lang$core$Basics$toString(shopType),
				stores));
	});
var _mordrax$cotwelm$Shops$wares = function (_p1) {
	var _p2 = _p1;
	return _p2._0;
};
var _mordrax$cotwelm$Shops$replenish = F3(
	function (itemTypes, itemFactory, seed) {
		var defaultProduct = _elm_lang$core$Maybe$withDefault(
			_mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$BroadSword));
		var _p3 = function (x) {
			return A2(_mgold$elm_random_pcg$Random_Pcg$step, x, seed);
		}(
			A2(
				_mgold$elm_random_pcg$Random_Pcg$list,
				10,
				A2(
					_mgold$elm_random_pcg$Random_Pcg$map,
					defaultProduct,
					_mgold$elm_random_pcg$Random_Pcg$sample(itemTypes))));
		var generatedItemTypes = _p3._0;
		var seed_ = _p3._1;
		var _p4 = A3(
			_elm_lang$core$List$foldl,
			_mordrax$cotwelm$Item_Factory$makeReducer,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: itemFactory
			},
			generatedItemTypes);
		var products = _p4._0;
		var newItemFactory = _p4._1;
		return {ctor: '_Tuple3', _0: products, _1: newItemFactory, _2: seed_};
	});
var _mordrax$cotwelm$Shops$replenishReducer = F2(
	function (shopType, _p5) {
		var _p6 = _p5;
		var _p7 = A3(
			_mordrax$cotwelm$Shops$replenish,
			_mordrax$cotwelm$Shops$inventoryStock(shopType),
			_p6._1,
			_p6._2);
		var newItems = _p7._0;
		var itemFactory_ = _p7._1;
		var seed_ = _p7._2;
		var newStores = A3(
			_elm_lang$core$Dict$insert,
			_elm_lang$core$Basics$toString(shopType),
			newItems,
			_p6._0);
		return {ctor: '_Tuple3', _0: newStores, _1: itemFactory_, _2: seed_};
	});
var _mordrax$cotwelm$Shops$Model = function (a) {
	return {stores: a};
};
var _mordrax$cotwelm$Shops$PopulateShop = function (a) {
	return {ctor: 'PopulateShop', _0: a};
};
var _mordrax$cotwelm$Shops$getSeed = A2(
	_elm_lang$core$Task$perform,
	function (a) {
		return _mordrax$cotwelm$Shops$PopulateShop(
			_mgold$elm_random_pcg$Random_Pcg$initialSeed(
				_elm_lang$core$Basics$round(
					_elm_lang$core$Time$inSeconds(a))));
	},
	_elm_lang$core$Time$now);
var _mordrax$cotwelm$Shops$Ok = {ctor: 'Ok'};
var _mordrax$cotwelm$Shops$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Shops$updateShop = F2(
	function (_p9, _p8) {
		var _p10 = _p9;
		var _p11 = _p8;
		var _p12 = _p11._0;
		return _mordrax$cotwelm$Shops$A(
			_elm_lang$core$Native_Utils.update(
				_p12,
				{
					stores: A3(
						_elm_lang$core$Dict$insert,
						_elm_lang$core$Basics$toString(_p10._1),
						_p10._0,
						_p12.stores)
				}));
	});
var _mordrax$cotwelm$Shops$JunkShop = {ctor: 'JunkShop'};
var _mordrax$cotwelm$Shops$PotionStore = {ctor: 'PotionStore'};
var _mordrax$cotwelm$Shops$GeneralStore = {ctor: 'GeneralStore'};
var _mordrax$cotwelm$Shops$WeaponSmith = {ctor: 'WeaponSmith'};
var _mordrax$cotwelm$Shops$init = F2(
	function (seed, itemFactory) {
		var emptyStores = _elm_lang$core$Dict$fromList(
			{ctor: '[]'});
		var _p13 = A3(
			_elm_lang$core$List$foldl,
			_mordrax$cotwelm$Shops$replenishReducer,
			{ctor: '_Tuple3', _0: emptyStores, _1: itemFactory, _2: seed},
			{
				ctor: '::',
				_0: _mordrax$cotwelm$Shops$WeaponSmith,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Shops$GeneralStore,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Shops$PotionStore,
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Shops$JunkShop,
							_1: {ctor: '[]'}
						}
					}
				}
			});
		var stores = _p13._0;
		var itemFactory_ = _p13._1;
		var seed_ = _p13._2;
		return {
			ctor: '_Tuple3',
			_0: _mordrax$cotwelm$Shops$A(
				{stores: stores}),
			_1: itemFactory_,
			_2: seed_
		};
	});
var _mordrax$cotwelm$Shops$B = F2(
	function (a, b) {
		return {ctor: 'B', _0: a, _1: b};
	});
var _mordrax$cotwelm$Shops$shop = F2(
	function (shopType, _p14) {
		var _p15 = _p14;
		return A2(
			_mordrax$cotwelm$Shops$B,
			A2(_mordrax$cotwelm$Shops$list, shopType, _p15._0.stores),
			shopType);
	});
var _mordrax$cotwelm$Shops$sell = F3(
	function (item, purse, _p16) {
		var _p17 = _p16;
		var itemsWithout = function (item) {
			return A2(
				_elm_lang$core$List$filter,
				function (x) {
					return !A2(_mordrax$cotwelm$Item_Item$equals, item, x);
				},
				_p17._0);
		};
		var price = A2(
			_elm_lang$core$Debug$log,
			'Item purchase price:',
			_mordrax$cotwelm$Item_Item$priceOf(item));
		var _p18 = A2(_mordrax$cotwelm$Item_Purse$remove, price, purse);
		if (_p18.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				{
					ctor: '_Tuple2',
					_0: A2(
						_mordrax$cotwelm$Shops$B,
						itemsWithout(item),
						_p17._1),
					_1: _p18._0
				});
		} else {
			return _elm_lang$core$Result$Err('Cannot afford item!');
		}
	});
var _mordrax$cotwelm$Shops$buy = F3(
	function (item, purse, _p19) {
		var _p20 = _p19;
		var cost = A2(
			_elm_lang$core$Debug$log,
			'Item sell price:',
			_mordrax$cotwelm$Item_Item$costOf(item));
		return {
			ctor: '_Tuple2',
			_0: A2(
				_mordrax$cotwelm$Shops$B,
				{ctor: '::', _0: item, _1: _p20._0},
				_p20._1),
			_1: A2(_mordrax$cotwelm$Item_Purse$add, cost, purse)
		};
	});

var _mordrax$cotwelm$GameData_Building$buildingType = function (model) {
	return model.buildingType;
};
var _mordrax$cotwelm$GameData_Building$isBuildingAtPosition = F2(
	function (pos, model) {
		var bottomLeft = A2(
			_mordrax$cotwelm$Utils_Vector$sub,
			A2(_mordrax$cotwelm$Utils_Vector$add, model.position, model.size),
			{ctor: '_Tuple2', _0: 1, _1: 1});
		return A2(
			_mordrax$cotwelm$Utils_Vector$boxIntersectVector,
			pos,
			{ctor: '_Tuple2', _0: model.position, _1: bottomLeft});
	});
var _mordrax$cotwelm$GameData_Building$view = function (model) {
	var tileCss = A2(
		_elm_lang$core$String$dropLeft,
		1,
		_elm_community$string_extra$String_Extra$dasherize(
			_elm_lang$core$Basics$toString(model.tile)));
	var posStyle = _mordrax$cotwelm$Utils_Lib$vectorToHtmlStyle(model.position);
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class(
				A2(_elm_lang$core$Basics_ops['++'], 'tile ', tileCss)),
			_1: {
				ctor: '::',
				_0: posStyle,
				_1: {ctor: '[]'}
			}
		},
		{ctor: '[]'});
};
var _mordrax$cotwelm$GameData_Building$Building = F6(
	function (a, b, c, d, e, f) {
		return {tile: a, entry: b, position: c, name: d, size: e, buildingType: f};
	});
var _mordrax$cotwelm$GameData_Building$new = F4(
	function (buildingTile, pos, name, buildingType) {
		var newBuilding = F2(
			function (entry, size) {
				return A6(_mordrax$cotwelm$GameData_Building$Building, buildingTile, entry, pos, name, size, buildingType);
			});
		var _p0 = buildingTile;
		switch (_p0.ctor) {
			case 'Gate':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 1, _1: 0},
					{ctor: '_Tuple2', _0: 3, _1: 1});
			case 'Hut':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 1},
					{ctor: '_Tuple2', _0: 2, _1: 2});
			case 'StrawHouseEast':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 2, _1: 1},
					{ctor: '_Tuple2', _0: 3, _1: 3});
			case 'StrawHouseWest':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 1},
					{ctor: '_Tuple2', _0: 3, _1: 3});
			case 'BurntStrawHouseWest':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 1},
					{ctor: '_Tuple2', _0: 3, _1: 3});
			case 'HutTemple':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 2, _1: 0},
					{ctor: '_Tuple2', _0: 5, _1: 6});
			case 'MineEntrance':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					{ctor: '_Tuple2', _0: 1, _1: 1});
			case 'Well':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					{ctor: '_Tuple2', _0: 1, _1: 1});
			case 'StairsDown':
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					{ctor: '_Tuple2', _0: 1, _1: 1});
			default:
				return A2(
					newBuilding,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					{ctor: '_Tuple2', _0: 1, _1: 1});
		}
	});
var _mordrax$cotwelm$GameData_Building$Link = F2(
	function (a, b) {
		return {area: a, position: b};
	});
var _mordrax$cotwelm$GameData_Building$Ordinary = {ctor: 'Ordinary'};
var _mordrax$cotwelm$GameData_Building$Shop = function (a) {
	return {ctor: 'Shop', _0: a};
};
var _mordrax$cotwelm$GameData_Building$StairDown = {ctor: 'StairDown'};
var _mordrax$cotwelm$GameData_Building$StairUp = {ctor: 'StairUp'};
var _mordrax$cotwelm$GameData_Building$Linked = function (a) {
	return {ctor: 'Linked', _0: a};
};
var _mordrax$cotwelm$GameData_Building$newLink = F2(
	function (area, pos) {
		return _mordrax$cotwelm$GameData_Building$Linked(
			A2(_mordrax$cotwelm$GameData_Building$Link, area, pos));
	});
var _mordrax$cotwelm$GameData_Building$StairsUp = {ctor: 'StairsUp'};
var _mordrax$cotwelm$GameData_Building$StairsDown = {ctor: 'StairsDown'};
var _mordrax$cotwelm$GameData_Building$Well = {ctor: 'Well'};
var _mordrax$cotwelm$GameData_Building$MineEntrance = {ctor: 'MineEntrance'};
var _mordrax$cotwelm$GameData_Building$HutTemple = {ctor: 'HutTemple'};
var _mordrax$cotwelm$GameData_Building$BurntStrawHouseWest = {ctor: 'BurntStrawHouseWest'};
var _mordrax$cotwelm$GameData_Building$StrawHouseWest = {ctor: 'StrawHouseWest'};
var _mordrax$cotwelm$GameData_Building$StrawHouseEast = {ctor: 'StrawHouseEast'};
var _mordrax$cotwelm$GameData_Building$Hut = {ctor: 'Hut'};
var _mordrax$cotwelm$GameData_Building$Gate = {ctor: 'Gate'};

var _mordrax$cotwelm$Tile$position = function (_p0) {
	var _p1 = _p0;
	return _p1._0.position;
};
var _mordrax$cotwelm$Tile$isSamePosition = F2(
	function (_p3, _p2) {
		var _p4 = _p3;
		var _p5 = _p2;
		return _elm_lang$core$Native_Utils.eq(_p4._0.position, _p5._0.position);
	});
var _mordrax$cotwelm$Tile$isSameType = F2(
	function (_p7, _p6) {
		var _p8 = _p7;
		var _p9 = _p6;
		return _elm_lang$core$Native_Utils.eq(_p8._0.type_, _p9._0.type_);
	});
var _mordrax$cotwelm$Tile$isSolid = function (_p10) {
	var _p11 = _p10;
	return _p11._0.solid;
};
var _mordrax$cotwelm$Tile$tileType = function (_p12) {
	var _p13 = _p12;
	return _p13._0.type_;
};
var _mordrax$cotwelm$Tile$rotateHalfTiles = F3(
	function (_p15, _p14, neighbours) {
		var _p16 = _p15;
		var _p17 = _p14;
		var _p27 = _p17._1;
		var checkDownRight = F2(
			function (maybeDown, maybeRight) {
				var _p18 = {ctor: '_Tuple2', _0: maybeDown, _1: maybeRight};
				if (((_p18.ctor === '_Tuple2') && (_p18._0.ctor === 'Just')) && (_p18._1.ctor === 'Just')) {
					var _p19 = _p18._0._0;
					return (A2(_mordrax$cotwelm$Tile$isSameType, _p19, _p18._1._0) && _elm_lang$core$Native_Utils.eq(
						_mordrax$cotwelm$Tile$tileType(_p19),
						_p27)) ? -90 : 0;
				} else {
					return 0;
				}
			});
		var checkUpRight = F2(
			function (maybeUp, maybeRight) {
				var _p20 = {ctor: '_Tuple2', _0: maybeUp, _1: maybeRight};
				if (((_p20.ctor === '_Tuple2') && (_p20._0.ctor === 'Just')) && (_p20._1.ctor === 'Just')) {
					var _p21 = _p20._0._0;
					return (A2(_mordrax$cotwelm$Tile$isSameType, _p21, _p20._1._0) && _elm_lang$core$Native_Utils.eq(
						_mordrax$cotwelm$Tile$tileType(_p21),
						_p27)) ? 180 : 0;
				} else {
					return 0;
				}
			});
		var checkUpLeft = F2(
			function (maybeUp, maybeLeft) {
				var _p22 = {ctor: '_Tuple2', _0: maybeUp, _1: maybeLeft};
				if (((_p22.ctor === '_Tuple2') && (_p22._0.ctor === 'Just')) && (_p22._1.ctor === 'Just')) {
					var _p23 = _p22._0._0;
					return (A2(_mordrax$cotwelm$Tile$isSameType, _p23, _p22._1._0) && _elm_lang$core$Native_Utils.eq(
						_mordrax$cotwelm$Tile$tileType(_p23),
						_p27)) ? 90 : 0;
				} else {
					return 0;
				}
			});
		var aOrb = F3(
			function (x, a, b) {
				return _elm_lang$core$Native_Utils.eq(x, a) || _elm_lang$core$Native_Utils.eq(x, b);
			});
		var _p24 = neighbours;
		if ((_p24._0.ctor === 'Nothing') && (_p24._2.ctor === 'Nothing')) {
			return 0;
		} else {
			if ((_p24._1.ctor === 'Nothing') && (_p24._3.ctor === 'Nothing')) {
				return 0;
			} else {
				var _p26 = _p24._0;
				var _p25 = _p24._1;
				return ((A2(checkUpLeft, _p26, _p24._3) + A2(checkUpRight, _p26, _p25)) + A2(checkDownRight, _p24._2, _p25)) + _p17._2;
			}
		}
	});
var _mordrax$cotwelm$Tile$ground = function (_p28) {
	var _p29 = _p28;
	return _p29._0.ground;
};
var _mordrax$cotwelm$Tile$Model = F6(
	function (a, b, c, d, e, f) {
		return {type_: a, solid: b, items: c, occupant: d, position: e, ground: f};
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
var _mordrax$cotwelm$Tile$drop = F2(
	function (item, _p30) {
		var _p31 = _p30;
		var _p33 = _p31._0;
		var _p32 = A2(_mordrax$cotwelm$Container$add, item, _p33.ground);
		var groundWithItem = _p32._0;
		return _mordrax$cotwelm$Tile$A(
			_elm_lang$core$Native_Utils.update(
				_p33,
				{ground: groundWithItem}));
	});
var _mordrax$cotwelm$Tile$updateGround = F2(
	function (items, _p34) {
		var _p35 = _p34;
		var _p36 = _p35._0;
		return _mordrax$cotwelm$Tile$A(
			_elm_lang$core$Native_Utils.update(
				_p36,
				{
					ground: A2(_mordrax$cotwelm$Container$set, items, _p36.ground)
				}));
	});
var _mordrax$cotwelm$Tile$setPosition = F2(
	function (newPosition, _p37) {
		var _p38 = _p37;
		return _mordrax$cotwelm$Tile$A(
			_elm_lang$core$Native_Utils.update(
				_p38._0,
				{position: newPosition}));
	});
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
var _mordrax$cotwelm$Tile$halfTiles = {
	ctor: '::',
	_0: {ctor: '_Tuple3', _0: _mordrax$cotwelm$Tile$PathRock, _1: _mordrax$cotwelm$Tile$Path, _2: 0},
	_1: {
		ctor: '::',
		_0: {ctor: '_Tuple3', _0: _mordrax$cotwelm$Tile$PathGrass, _1: _mordrax$cotwelm$Tile$Path, _2: 0},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple3', _0: _mordrax$cotwelm$Tile$WaterGrass, _1: _mordrax$cotwelm$Tile$Water, _2: 0},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: _mordrax$cotwelm$Tile$WaterPath, _1: _mordrax$cotwelm$Tile$Path, _2: 180},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: _mordrax$cotwelm$Tile$WallDarkDgn, _1: _mordrax$cotwelm$Tile$DarkDgn, _2: 180},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: _mordrax$cotwelm$Tile$WallLitDgn, _1: _mordrax$cotwelm$Tile$LitDgn, _2: 180},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Tile$view = F4(
	function (_p39, scale, neighbours, onClick) {
		var _p40 = _p39;
		var _p48 = _p40._0.type_;
		var _p47 = _p40._0.position;
		var clickAttribute = function (position) {
			return _elm_lang$html$Html_Events$onClick(
				onClick(position));
		};
		var itemsOnGround = _mordrax$cotwelm$Container$list(_p40._0.ground);
		var tileToCss = function (_p41) {
			return A2(
				_elm_lang$core$String$dropLeft,
				1,
				_elm_community$string_extra$String_Extra$dasherize(
					_elm_lang$core$Basics$toString(_p41)));
		};
		var rotation = function () {
			var _p44 = A2(
				_elm_community$list_extra$List_Extra$find,
				function (_p42) {
					var _p43 = _p42;
					return _elm_lang$core$Native_Utils.eq(_p48, _p43._0);
				},
				_mordrax$cotwelm$Tile$halfTiles);
			if (_p44.ctor === 'Nothing') {
				return 0;
			} else {
				return A3(_mordrax$cotwelm$Tile$rotateHalfTiles, _p40._0, _p44._0, neighbours);
			}
		}();
		var transform = F2(
			function (rotation, scale) {
				var _p45 = {ctor: '_Tuple2', _0: rotation, _1: scale};
				_v20_3:
				do {
					if (_p45.ctor === '_Tuple2') {
						if (_p45._0 === 0) {
							if (_p45._1 === 1) {
								return {ctor: '_Tuple2', _0: '', _1: ''};
							} else {
								return {
									ctor: '_Tuple2',
									_0: 'transform',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'scale',
										_elm_lang$core$Basics$toString(
											{ctor: '_Tuple2', _0: scale, _1: scale}))
								};
							}
						} else {
							if (_p45._1 === 1) {
								return {
									ctor: '_Tuple2',
									_0: 'transform',
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										'rotate(',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(rotation),
											'deg)'))
								};
							} else {
								break _v20_3;
							}
						}
					} else {
						break _v20_3;
					}
				} while(false);
				return {
					ctor: '_Tuple2',
					_0: 'transform',
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'rotate(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(rotation),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'deg) scale',
								_elm_lang$core$Basics$toString(
									{ctor: '_Tuple2', _0: scale, _1: scale}))))
				};
			});
		var tileDiv = function (css) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'tile ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								css,
								A2(
									_elm_lang$core$Basics_ops['++'],
									' ',
									_elm_lang$core$Basics$toString(_p47))))),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$style(
							{
								ctor: '::',
								_0: A2(transform, rotation, scale),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(_mordrax$cotwelm$Utils_Lib$toScaledTilePosition, _p47, scale),
							_1: {
								ctor: '::',
								_0: clickAttribute(_p47),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				{ctor: '[]'});
		};
		var baseTile = tileDiv(
			tileToCss(_p48));
		var itemDiv = function (item) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'tile cotw-item ',
							_mordrax$cotwelm$Item_Item$css(item))),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$style(
							{
								ctor: '::',
								_0: A2(transform, rotation, scale),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(_mordrax$cotwelm$Utils_Lib$toScaledTilePosition, _p47, scale),
							_1: {ctor: '[]'}
						}
					}
				},
				{ctor: '[]'});
		};
		var _p46 = itemsOnGround;
		if (_p46.ctor === '[]') {
			return {
				ctor: '::',
				_0: baseTile,
				_1: {ctor: '[]'}
			};
		} else {
			if (_p46._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: baseTile,
					_1: {
						ctor: '::',
						_0: itemDiv(_p46._0),
						_1: {ctor: '[]'}
					}
				};
			} else {
				return {
					ctor: '::',
					_0: baseTile,
					_1: {
						ctor: '::',
						_0: tileDiv(
							tileToCss(_mordrax$cotwelm$Tile$TreasurePile)),
						_1: {ctor: '[]'}
					}
				};
			}
		}
	});
var _mordrax$cotwelm$Tile$Rock = {ctor: 'Rock'};
var _mordrax$cotwelm$Tile$asciiTileMap = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.chr('^'),
			_1: _mordrax$cotwelm$Tile$Rock
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Native_Utils.chr(','),
				_1: _mordrax$cotwelm$Tile$Grass
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.chr('o'),
					_1: _mordrax$cotwelm$Tile$DarkDgn
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.chr('~'),
						_1: _mordrax$cotwelm$Tile$Water
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.chr('.'),
							_1: _mordrax$cotwelm$Tile$Path
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.chr('O'),
								_1: _mordrax$cotwelm$Tile$LitDgn
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Native_Utils.chr('_'),
									_1: _mordrax$cotwelm$Tile$PathRock
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Native_Utils.chr(';'),
										_1: _mordrax$cotwelm$Tile$PathGrass
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: _elm_lang$core$Native_Utils.chr('d'),
											_1: _mordrax$cotwelm$Tile$WallDarkDgn
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: _elm_lang$core$Native_Utils.chr('w'),
												_1: _mordrax$cotwelm$Tile$WaterGrass
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: _elm_lang$core$Native_Utils.chr('W'),
													_1: _mordrax$cotwelm$Tile$WaterPath
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: _elm_lang$core$Native_Utils.chr('D'),
														_1: _mordrax$cotwelm$Tile$WallLitDgn
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: _elm_lang$core$Native_Utils.chr('g'),
															_1: _mordrax$cotwelm$Tile$Grass50Cave50
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: _elm_lang$core$Native_Utils.chr('G'),
																_1: _mordrax$cotwelm$Tile$Grass10Cave90
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: _elm_lang$core$Native_Utils.chr('c'),
																	_1: _mordrax$cotwelm$Tile$White50Cave50
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: _elm_lang$core$Native_Utils.chr('C'),
																		_1: _mordrax$cotwelm$Tile$White90Cave10
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: _elm_lang$core$Native_Utils.chr('='),
																			_1: _mordrax$cotwelm$Tile$Crop
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: _elm_lang$core$Native_Utils.chr('e'),
																				_1: _mordrax$cotwelm$Tile$Well
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: _elm_lang$core$Native_Utils.chr('>'),
																					_1: _mordrax$cotwelm$Tile$StairsDown
																				},
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _mordrax$cotwelm$Tile$asciiToTileType = function ($char) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_mordrax$cotwelm$Tile$Grass,
		A2(_elm_lang$core$Dict$get, $char, _mordrax$cotwelm$Tile$asciiTileMap));
};
var _mordrax$cotwelm$Tile$solidTiles = {
	ctor: '::',
	_0: _mordrax$cotwelm$Tile$Rock,
	_1: {
		ctor: '::',
		_0: _mordrax$cotwelm$Tile$Grass10Cave90,
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Tile$White50Cave50,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Tile$Crop,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Tile$Well,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Tile$PathRock,
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Tile$WallDarkDgn,
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Tile$WallLitDgn,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$Tile$toTile = F2(
	function (_p49, tileType) {
		var _p50 = _p49;
		var container = _mordrax$cotwelm$Item_Item$containerBuilder(
			A2(_mordrax$cotwelm$Utils_Mass$Capacity, _mgold$elm_random_pcg$Random_Pcg$maxInt, _mgold$elm_random_pcg$Random_Pcg$maxInt));
		var solid = A2(_elm_lang$core$List$member, tileType, _mordrax$cotwelm$Tile$solidTiles);
		return _mordrax$cotwelm$Tile$A(
			A6(
				_mordrax$cotwelm$Tile$Model,
				tileType,
				solid,
				{ctor: '[]'},
				_mordrax$cotwelm$Tile$Empty,
				{ctor: '_Tuple2', _0: _p50._0, _1: _p50._1},
				container));
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

var _mordrax$cotwelm$Dungeon_Entrance$equal = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p3 = _p0;
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$Tuple$second(_p2._0),
			_elm_lang$core$Tuple$second(_p3._0));
	});
var _mordrax$cotwelm$Dungeon_Entrance$toTile = function (_p4) {
	var _p5 = _p4;
	var tileType = function () {
		var _p6 = _p5._0._0;
		if (_p6.ctor === 'Door') {
			return _mordrax$cotwelm$Tile$DoorClosed;
		} else {
			return _mordrax$cotwelm$Tile$DarkDgn;
		}
	}();
	return A2(_mordrax$cotwelm$Tile$toTile, _p5._0._1, tileType);
};
var _mordrax$cotwelm$Dungeon_Entrance$position = function (_p7) {
	var _p8 = _p7;
	return _p8._0._1;
};
var _mordrax$cotwelm$Dungeon_Entrance$NoDoor = {ctor: 'NoDoor'};
var _mordrax$cotwelm$Dungeon_Entrance$Door = {ctor: 'Door'};
var _mordrax$cotwelm$Dungeon_Entrance$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Dungeon_Entrance$init = F2(
	function (t, v) {
		return _mordrax$cotwelm$Dungeon_Entrance$A(
			{ctor: '_Tuple2', _0: t, _1: v});
	});

var _mordrax$cotwelm$Dungeon_Rooms_Type$RoomTemplate = F3(
	function (a, b, c) {
		return {makeWalls: a, makeCorners: b, makeFloors: c};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Type$DeadEnd = {ctor: 'DeadEnd'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$DiagonalSquares = {ctor: 'DiagonalSquares'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Circular = {ctor: 'Circular'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Potion = {ctor: 'Potion'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Diamond = {ctor: 'Diamond'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Cross = {ctor: 'Cross'};
var _mordrax$cotwelm$Dungeon_Rooms_Type$Rectangular = {ctor: 'Rectangular'};

var _mordrax$cotwelm$Dungeon_Rooms_Config$withinDungeonBounds = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p6 = _p2._1;
		var _p5 = _p2._0;
		var _p3 = _p0;
		var _p4 = _p3.dungeonSize;
		return (_elm_lang$core$Native_Utils.cmp(_p5, 0) > -1) && ((_elm_lang$core$Native_Utils.cmp(_p6, 0) > -1) && ((_elm_lang$core$Native_Utils.cmp(_p5, _p4) < 1) && (_elm_lang$core$Native_Utils.cmp(_p6, _p4) < 1)));
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$wallToEntrance = function (wallGen) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_mordrax$cotwelm$Dungeon_Entrance$init(_mordrax$cotwelm$Dungeon_Entrance$Door),
		wallGen);
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$wallSampler = function (walls) {
	var _p7 = walls;
	if (_p7.ctor === '[]') {
		return _mgold$elm_random_pcg$Random_Pcg$constant(
			{ctor: '_Tuple2', _0: 0, _1: 0});
	} else {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			_elm_lang$core$Maybe$withDefault(_p7._0),
			_mgold$elm_random_pcg$Random_Pcg$sample(walls));
	}
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$addEntrances = F2(
	function (nEntrances, _p8) {
		var _p9 = _p8;
		var _p14 = _p9._0;
		var _p13 = _p9._1;
		var _p12 = _p9._2;
		var createGenerator = _mgold$elm_random_pcg$Random_Pcg$constant(
			{
				ctor: '_Tuple2',
				_0: A2(_elm_lang$core$Basics_ops['++'], _p14, _p13),
				_1: _p12
			});
		var _p10 = {ctor: '_Tuple2', _0: nEntrances, _1: _p14};
		_v4_0:
		do {
			if (_p10._1.ctor === '[]') {
				if (_p10._0 === 0) {
					break _v4_0;
				} else {
					return createGenerator;
				}
			} else {
				if (_p10._0 === 0) {
					break _v4_0;
				} else {
					if (_p10._1._0.ctor === '[]') {
						return createGenerator;
					} else {
						var _p11 = _p10._1._0;
						var wallWithoutEntrance = function (entrance) {
							return A2(
								_elm_lang$core$List$filter,
								F2(
									function (x, y) {
										return !_elm_lang$core$Native_Utils.eq(x, y);
									})(
									_mordrax$cotwelm$Dungeon_Entrance$position(entrance)),
								_p11);
						};
						var recurse = function (entrance) {
							return A2(
								_mordrax$cotwelm$Dungeon_Rooms_Config$addEntrances,
								_p10._0 - 1,
								{
									ctor: '_Tuple3',
									_0: A2(
										_elm_lang$core$Basics_ops['++'],
										_p10._1._1,
										{
											ctor: '::',
											_0: wallWithoutEntrance(entrance),
											_1: {ctor: '[]'}
										}),
									_1: _p13,
									_2: {ctor: '::', _0: entrance, _1: _p12}
								});
						};
						var generateWall = _mordrax$cotwelm$Dungeon_Rooms_Config$wallSampler(_p11);
						return A2(
							_mgold$elm_random_pcg$Random_Pcg$andThen,
							recurse,
							_mordrax$cotwelm$Dungeon_Rooms_Config$wallToEntrance(generateWall));
					}
				}
			}
		} while(false);
		return createGenerator;
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomTypeGenerator = function (_p15) {
	var _p16 = _p15;
	var _p17 = _p16.roomsConfig;
	return _mgold$elm_random_pcg$Random_Pcg$frequency(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Basics$toFloat(_p17.rectangular.frequency),
				_1: _mgold$elm_random_pcg$Random_Pcg$constant(_mordrax$cotwelm$Dungeon_Rooms_Type$Rectangular)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Basics$toFloat(_p17.cross.frequency),
					_1: _mgold$elm_random_pcg$Random_Pcg$constant(_mordrax$cotwelm$Dungeon_Rooms_Type$Cross)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toFloat(_p17.diamond.frequency),
						_1: _mgold$elm_random_pcg$Random_Pcg$constant(_mordrax$cotwelm$Dungeon_Rooms_Type$Diamond)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Basics$toFloat(_p17.potion.frequency),
							_1: _mgold$elm_random_pcg$Random_Pcg$constant(_mordrax$cotwelm$Dungeon_Rooms_Type$Potion)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Basics$toFloat(_p17.circular.frequency),
								_1: _mgold$elm_random_pcg$Random_Pcg$constant(_mordrax$cotwelm$Dungeon_Rooms_Type$Circular)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Basics$toFloat(_p17.diagonalSquares.frequency),
									_1: _mgold$elm_random_pcg$Random_Pcg$constant(_mordrax$cotwelm$Dungeon_Rooms_Type$DiagonalSquares)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: _elm_lang$core$Basics$toFloat(_p17.deadEnd.frequency),
										_1: _mgold$elm_random_pcg$Random_Pcg$constant(_mordrax$cotwelm$Dungeon_Rooms_Type$DeadEnd)
									},
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		});
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomSizeGenerator = F2(
	function (roomType, _p18) {
		var _p19 = _p18;
		var _p23 = _p19;
		var tupleToGen = function (_p20) {
			var _p21 = _p20;
			return A2(_mgold$elm_random_pcg$Random_Pcg$int, _p21._0, _p21._1);
		};
		var _p22 = roomType;
		switch (_p22.ctor) {
			case 'Rectangular':
				return tupleToGen(_p23.roomsConfig.rectangular.sizeRange);
			case 'Cross':
				return tupleToGen(_p23.roomsConfig.cross.sizeRange);
			case 'Diamond':
				return tupleToGen(_p23.roomsConfig.diamond.sizeRange);
			case 'Potion':
				return tupleToGen(_p23.roomsConfig.potion.sizeRange);
			case 'Circular':
				return tupleToGen(_p23.roomsConfig.circular.sizeRange);
			case 'DiagonalSquares':
				return tupleToGen(_p23.roomsConfig.diagonalSquares.sizeRange);
			default:
				return tupleToGen(_p23.roomsConfig.deadEnd.sizeRange);
		}
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$updateRoomsConfig = F3(
	function (roomType, updater, roomsConfig) {
		var _p24 = roomType;
		switch (_p24.ctor) {
			case 'Rectangular':
				return _elm_lang$core$Native_Utils.update(
					roomsConfig,
					{
						rectangular: updater(roomsConfig.rectangular)
					});
			case 'Cross':
				return _elm_lang$core$Native_Utils.update(
					roomsConfig,
					{
						cross: updater(roomsConfig.cross)
					});
			case 'Diamond':
				return _elm_lang$core$Native_Utils.update(
					roomsConfig,
					{
						diamond: updater(roomsConfig.diamond)
					});
			case 'Potion':
				return _elm_lang$core$Native_Utils.update(
					roomsConfig,
					{
						potion: updater(roomsConfig.potion)
					});
			case 'Circular':
				return _elm_lang$core$Native_Utils.update(
					roomsConfig,
					{
						circular: updater(roomsConfig.circular)
					});
			case 'DiagonalSquares':
				return _elm_lang$core$Native_Utils.update(
					roomsConfig,
					{
						diagonalSquares: updater(roomsConfig.diagonalSquares)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					roomsConfig,
					{
						deadEnd: updater(roomsConfig.deadEnd)
					});
		}
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$update = F2(
	function (msg, model) {
		var _p25 = A2(_elm_lang$core$Debug$log, 'Config.update', msg);
		var _p26 = msg;
		switch (_p26.ctor) {
			case 'DungeonSize':
				return _elm_lang$core$Native_Utils.update(
					model,
					{dungeonSize: _p26._0});
			case 'RoomSize':
				var updateSizeRange = F2(
					function (sizeRange_, config) {
						return _elm_lang$core$Native_Utils.update(
							config,
							{sizeRange: sizeRange_});
					});
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						roomsConfig: A3(
							_mordrax$cotwelm$Dungeon_Rooms_Config$updateRoomsConfig,
							_p26._0,
							updateSizeRange(_p26._1),
							model.roomsConfig)
					});
			case 'ChangeFrequency':
				var updateFrequency = F2(
					function (freq, config) {
						return _elm_lang$core$Native_Utils.update(
							config,
							{frequency: freq});
					});
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						roomsConfig: A3(
							_mordrax$cotwelm$Dungeon_Rooms_Config$updateRoomsConfig,
							_p26._0,
							updateFrequency(_p26._1),
							model.roomsConfig)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{mapScale: _p26._0});
		}
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$Model = F6(
	function (a, b, c, d, e, f) {
		return {dungeonSize: a, roomsConfig: b, mapScale: c, maxEntrances: d, corridor: e, minRooms: f};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$CorridorConfig = F2(
	function (a, b) {
		return {minLength: a, maxLength: b};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$RoomsConfig = F7(
	function (a, b, c, d, e, f, g) {
		return {rectangular: a, cross: b, diamond: c, potion: d, circular: e, diagonalSquares: f, deadEnd: g};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig = F2(
	function (a, b) {
		return {sizeRange: a, frequency: b};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$init = {
	dungeonSize: 50,
	corridor: {minLength: 10, maxLength: 20},
	roomsConfig: {
		rectangular: A2(
			_mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig,
			{ctor: '_Tuple2', _0: 6, _1: 12},
			1),
		cross: A2(
			_mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig,
			{ctor: '_Tuple2', _0: 7, _1: 11},
			0),
		diamond: A2(
			_mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig,
			{ctor: '_Tuple2', _0: 5, _1: 11},
			0),
		potion: A2(
			_mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig,
			{ctor: '_Tuple2', _0: 4, _1: 10},
			0),
		circular: A2(
			_mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig,
			{ctor: '_Tuple2', _0: 4, _1: 10},
			0),
		diagonalSquares: A2(
			_mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig,
			{ctor: '_Tuple2', _0: 4, _1: 10},
			0),
		deadEnd: A2(
			_mordrax$cotwelm$Dungeon_Rooms_Config$RoomConfig,
			{ctor: '_Tuple2', _0: 1, _1: 1},
			0)
	},
	minRooms: 4,
	mapScale: 0.2,
	maxEntrances: 4
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$MapScale = function (a) {
	return {ctor: 'MapScale', _0: a};
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$ChangeFrequency = F2(
	function (a, b) {
		return {ctor: 'ChangeFrequency', _0: a, _1: b};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomFrequencyView = F2(
	function (roomType, freq) {
		return A3(
			_mordrax$cotwelm$UI$labeledNumber,
			'Freq',
			freq,
			_mordrax$cotwelm$Dungeon_Rooms_Config$ChangeFrequency(roomType));
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$RoomSize = F2(
	function (a, b) {
		return {ctor: 'RoomSize', _0: a, _1: b};
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomSizeView = F2(
	function (roomType, _p27) {
		var _p28 = _p27;
		var _p30 = _p28._0;
		var _p29 = _p28._1;
		var lbl = A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(roomType),
			' size: ');
		return A4(
			_mordrax$cotwelm$UI$labeled2TupleNumber,
			lbl,
			{ctor: '_Tuple2', _0: _p30, _1: _p29},
			function (min_) {
				return A2(
					_mordrax$cotwelm$Dungeon_Rooms_Config$RoomSize,
					roomType,
					{ctor: '_Tuple2', _0: min_, _1: _p29});
			},
			function (max_) {
				return A2(
					_mordrax$cotwelm$Dungeon_Rooms_Config$RoomSize,
					roomType,
					{ctor: '_Tuple2', _0: _p30, _1: max_});
			});
	});
var _mordrax$cotwelm$Dungeon_Rooms_Config$roomsConfigView = function (model) {
	var rooms = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$Rectangular, _1: model.roomsConfig.rectangular},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$Cross, _1: model.roomsConfig.cross},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$Diamond, _1: model.roomsConfig.diamond},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$Potion, _1: model.roomsConfig.potion},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$Circular, _1: model.roomsConfig.circular},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Dungeon_Rooms_Type$DiagonalSquares, _1: model.roomsConfig.diagonalSquares},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	};
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		_elm_lang$core$List$concat(
			A2(
				_elm_lang$core$List$map,
				function (_p31) {
					var _p32 = _p31;
					var _p34 = _p32._0;
					var _p33 = _p32._1;
					return {
						ctor: '::',
						_0: A2(_mordrax$cotwelm$Dungeon_Rooms_Config$roomSizeView, _p34, _p33.sizeRange),
						_1: {
							ctor: '::',
							_0: A2(_mordrax$cotwelm$Dungeon_Rooms_Config$roomFrequencyView, _p34, _p33.frequency),
							_1: {ctor: '[]'}
						}
					};
				},
				rooms)));
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$DungeonSize = function (a) {
	return {ctor: 'DungeonSize', _0: a};
};
var _mordrax$cotwelm$Dungeon_Rooms_Config$dungeonSizeView = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A3(_mordrax$cotwelm$UI$labeledNumber, 'Dungeon size', model.dungeonSize, _mordrax$cotwelm$Dungeon_Rooms_Config$DungeonSize),
			_1: {
				ctor: '::',
				_0: A3(_mordrax$cotwelm$UI$labeledFloat, 'Map scale', model.mapScale, _mordrax$cotwelm$Dungeon_Rooms_Config$MapScale),
				_1: {ctor: '[]'}
			}
		});
};

var _mordrax$cotwelm$Dungeon_Corridor$path = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p7 = _p2._1;
		var _p6 = _p2._0;
		var _p3 = _p0;
		var _p5 = _p3._1;
		var _p4 = _p3._0;
		var length = A2(
			_elm_lang$core$Basics$max,
			_elm_lang$core$Basics$abs(_p6 - _p4),
			_elm_lang$core$Basics$abs(_p7 - _p5)) + 1;
		var rangeX = _elm_lang$core$Native_Utils.eq(_p6, _p4) ? A2(_elm_lang$core$List$repeat, length, _p6) : A2(_mordrax$cotwelm$Lodash$range, _p6, _p4);
		var rangeY = _elm_lang$core$Native_Utils.eq(_p7, _p5) ? A2(_elm_lang$core$List$repeat, length, _p7) : A2(_mordrax$cotwelm$Lodash$range, _p7, _p5);
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			rangeX,
			rangeY);
	});
var _mordrax$cotwelm$Dungeon_Corridor$pp = function (_p8) {
	var _p9 = _p8;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'Corridor at (',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(_p9._0.start),
			')'));
};
var _mordrax$cotwelm$Dungeon_Corridor$toTiles = function (_p10) {
	var _p11 = _p10;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$List$map, _mordrax$cotwelm$Dungeon_Entrance$toTile, _p11._0.entrances),
		_p11._0.paths);
};
var _mordrax$cotwelm$Dungeon_Corridor$end = function (_p12) {
	var _p13 = _p12;
	var _p14 = _p13._0.points;
	if (_p14.ctor === '::') {
		return _p14._0;
	} else {
		return _p13._0.start;
	}
};
var _mordrax$cotwelm$Dungeon_Corridor$possibleEnds = F2(
	function (lastPoint, _p15) {
		var _p16 = _p15;
		var makeDirectedVector = function (direction) {
			return {ctor: '_Tuple2', _0: lastPoint, _1: direction};
		};
		var secondLastPoint = function () {
			var _p17 = {ctor: '_Tuple2', _0: _p16._0.start, _1: _p16._0.points};
			if ((_p17._1.ctor === '::') && (_p17._1._0.ctor === '_Tuple2')) {
				return _p17._1._0._0;
			} else {
				return _p17._0._0;
			}
		}();
		var facing = A2(_mordrax$cotwelm$Utils_Vector$facing, secondLastPoint, lastPoint);
		var _p18 = A2(
			_mordrax$cotwelm$Utils_Vector$map,
			_mordrax$cotwelm$Utils_Vector$rotateCompass(facing),
			{ctor: '_Tuple2', _0: _mordrax$cotwelm$Utils_Vector$Left, _1: _mordrax$cotwelm$Utils_Vector$Right});
		var facingLeft = _p18._0;
		var facingRight = _p18._1;
		return A2(
			_elm_lang$core$List$map,
			makeDirectedVector,
			A2(
				_elm_lang$core$List$filter,
				_mordrax$cotwelm$Utils_Direction$isCardinal,
				{
					ctor: '::',
					_0: facing,
					_1: {
						ctor: '::',
						_0: facingLeft,
						_1: {
							ctor: '::',
							_0: facingRight,
							_1: {ctor: '[]'}
						}
					}
				}));
	});
var _mordrax$cotwelm$Dungeon_Corridor$allPossibleDirections = function (facing) {
	return {
		ctor: '::',
		_0: A2(_mordrax$cotwelm$Utils_Vector$rotateCompass, facing, _mordrax$cotwelm$Utils_Vector$Left),
		_1: {
			ctor: '::',
			_0: A2(_mordrax$cotwelm$Utils_Vector$rotateCompass, facing, _mordrax$cotwelm$Utils_Vector$Right),
			_1: {
				ctor: '::',
				_0: facing,
				_1: {ctor: '[]'}
			}
		}
	};
};
var _mordrax$cotwelm$Dungeon_Corridor$onePossibleDirection = function (direction) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_mordrax$cotwelm$Lodash$headWithDefault(direction),
		_mordrax$cotwelm$Lodash$shuffle(
			_mordrax$cotwelm$Dungeon_Corridor$allPossibleDirections(direction)));
};
var _mordrax$cotwelm$Dungeon_Corridor$onePossibleCardinalDirection = function (direction) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_mordrax$cotwelm$Lodash$headWithDefault(direction),
		_mordrax$cotwelm$Lodash$shuffle(
			A2(
				_elm_lang$core$List$filter,
				_mordrax$cotwelm$Utils_Direction$isCardinal,
				_mordrax$cotwelm$Dungeon_Corridor$allPossibleDirections(direction))));
};
var _mordrax$cotwelm$Dungeon_Corridor$stepsFromPoint = F2(
	function (_p19, steps) {
		var _p20 = _p19;
		return A2(
			_mordrax$cotwelm$Utils_Vector$add,
			_p20._0,
			A2(
				_mordrax$cotwelm$Utils_Vector$scaleInt,
				steps,
				_mordrax$cotwelm$Utils_Vector$fromDirection(_p20._1)));
	});
var _mordrax$cotwelm$Dungeon_Corridor$Model = F5(
	function (a, b, c, d, e) {
		return {entranceFacing: a, start: b, points: c, entrances: d, paths: e};
	});
var _mordrax$cotwelm$Dungeon_Corridor$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Dungeon_Corridor$init = F2(
	function (start, entranceFacing) {
		return _mordrax$cotwelm$Dungeon_Corridor$A(
			{
				start: start,
				entranceFacing: entranceFacing,
				points: {ctor: '[]'},
				entrances: {ctor: '[]'},
				paths: {ctor: '[]'}
			});
	});
var _mordrax$cotwelm$Dungeon_Corridor$add = F2(
	function (_p22, _p21) {
		var _p23 = _p22;
		var _p24 = _p21;
		var _p26 = _p24._0.points;
		var _p25 = _p24._0;
		var lastCorridorPoint = A2(_mordrax$cotwelm$Lodash$headWithDefault, _p24._0.start, _p26);
		var newPath = A2(
			_elm_lang$core$List$map,
			function (x) {
				return A2(_mordrax$cotwelm$Tile$toTile, x, _mordrax$cotwelm$Tile$DarkDgn);
			},
			A2(
				_mordrax$cotwelm$Dungeon_Corridor$path,
				_elm_lang$core$Tuple$first(lastCorridorPoint),
				_p23._0));
		return _mordrax$cotwelm$Dungeon_Corridor$A(
			_elm_lang$core$Native_Utils.update(
				_p25,
				{
					points: {ctor: '::', _0: _p23, _1: _p26},
					paths: A2(_elm_lang$core$Basics_ops['++'], newPath, _p25.paths)
				}));
	});
var _mordrax$cotwelm$Dungeon_Corridor$extend = F2(
	function (corridor, config) {
		var lengthGen = A2(_mordrax$cotwelm$Dice$range, config.corridor.minLength, config.corridor.maxLength);
		var _p27 = _mordrax$cotwelm$Dungeon_Corridor$end(corridor);
		var lastPoint = _p27;
		var lastFacing = _p27._1;
		var directionGen = _mordrax$cotwelm$Dungeon_Corridor$onePossibleCardinalDirection(lastFacing);
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (_p28) {
				var _p29 = _p28;
				return A2(
					_mordrax$cotwelm$Dungeon_Corridor$add,
					{
						ctor: '_Tuple2',
						_0: A2(_mordrax$cotwelm$Dungeon_Corridor$stepsFromPoint, lastPoint, _p29._0),
						_1: _p29._1
					},
					corridor);
			},
			A3(
				_mgold$elm_random_pcg$Random_Pcg$map2,
				F2(
					function (v0, v1) {
						return {ctor: '_Tuple2', _0: v0, _1: v1};
					}),
				lengthGen,
				directionGen));
	});
var _mordrax$cotwelm$Dungeon_Corridor$generate = F3(
	function (startPosition, entranceFacing, config) {
		var makeCorridor = function (start) {
			var corridor = A2(_mordrax$cotwelm$Dungeon_Corridor$init, start, entranceFacing);
			return A2(_mordrax$cotwelm$Dungeon_Corridor$extend, corridor, config);
		};
		var facingEntrance = _mordrax$cotwelm$Utils_Vector$oppositeDirection(entranceFacing);
		var startDirectionGen = _mordrax$cotwelm$Dungeon_Corridor$onePossibleDirection(facingEntrance);
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			makeCorridor,
			A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				function (dir) {
					return {ctor: '_Tuple2', _0: startPosition, _1: dir};
				},
				startDirectionGen));
	});
var _mordrax$cotwelm$Dungeon_Corridor$addEntrance = F2(
	function (position, _p30) {
		var _p31 = _p30;
		return _mordrax$cotwelm$Dungeon_Corridor$A(
			_elm_lang$core$Native_Utils.update(
				_p31._0,
				{
					paths: {
						ctor: '::',
						_0: A2(_mordrax$cotwelm$Tile$toTile, position, _mordrax$cotwelm$Tile$DarkDgn),
						_1: _p31._0.paths
					}
				}));
	});
var _mordrax$cotwelm$Dungeon_Corridor$boundaryHelper = function (_p32) {
	var _p33 = _p32;
	var _p37 = _p33.start;
	var _p36 = _p33.paths;
	var _p35 = _p33.entranceFacing;
	var entranceExceptions = _elm_lang$core$Set$fromList(
		{
			ctor: '::',
			_0: A2(
				_mordrax$cotwelm$Utils_Vector$add,
				_elm_lang$core$Tuple$first(_p37),
				_mordrax$cotwelm$Utils_Vector$fromDirection(_p35)),
			_1: {
				ctor: '::',
				_0: A2(
					_mordrax$cotwelm$Utils_Vector$add,
					_elm_lang$core$Tuple$first(_p37),
					_mordrax$cotwelm$Utils_Vector$fromDirection(
						A2(_mordrax$cotwelm$Utils_Vector$rotateCompass, _p35, _mordrax$cotwelm$Utils_Vector$Left))),
				_1: {
					ctor: '::',
					_0: A2(
						_mordrax$cotwelm$Utils_Vector$add,
						_elm_lang$core$Tuple$first(_p37),
						_mordrax$cotwelm$Utils_Vector$fromDirection(
							A2(_mordrax$cotwelm$Utils_Vector$rotateCompass, _p35, _mordrax$cotwelm$Utils_Vector$Right))),
					_1: {ctor: '[]'}
				}
			}
		});
	var pathPositions = A2(_elm_lang$core$List$map, _mordrax$cotwelm$Tile$position, _p36);
	var lessPaths = function (positionSet) {
		return A2(
			_elm_lang$core$Set$diff,
			positionSet,
			_elm_lang$core$Set$fromList(pathPositions));
	};
	var _p34 = _mordrax$cotwelm$Dungeon_Corridor$end(
		_mordrax$cotwelm$Dungeon_Corridor$A(_p33));
	var endPosition = _p34._0;
	var endFacing = _p34._1;
	var exitExceptions = _elm_lang$core$Set$fromList(
		{
			ctor: '::',
			_0: A2(
				_mordrax$cotwelm$Utils_Vector$add,
				endPosition,
				_mordrax$cotwelm$Utils_Vector$fromDirection(endFacing)),
			_1: {
				ctor: '::',
				_0: A2(
					_mordrax$cotwelm$Utils_Vector$add,
					endPosition,
					_mordrax$cotwelm$Utils_Vector$fromDirection(
						A2(_mordrax$cotwelm$Utils_Vector$rotateCompass, endFacing, _mordrax$cotwelm$Utils_Vector$Left))),
				_1: {
					ctor: '::',
					_0: A2(
						_mordrax$cotwelm$Utils_Vector$add,
						endPosition,
						_mordrax$cotwelm$Utils_Vector$fromDirection(
							A2(_mordrax$cotwelm$Utils_Vector$rotateCompass, endFacing, _mordrax$cotwelm$Utils_Vector$Right))),
					_1: {ctor: '[]'}
				}
			}
		});
	return _elm_lang$core$Set$toList(
		A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$Set$diff,
			exitExceptions,
			A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Set$diff,
				entranceExceptions,
				lessPaths(
					_elm_lang$core$Set$fromList(
						_elm_lang$core$List$concat(
							A2(
								_elm_lang$core$List$map,
								_mordrax$cotwelm$Utils_Vector$neighbours,
								A2(_elm_lang$core$List$map, _mordrax$cotwelm$Tile$position, _p36))))))));
};
var _mordrax$cotwelm$Dungeon_Corridor$boundary = function (_p38) {
	var _p39 = _p38;
	return _mordrax$cotwelm$Dungeon_Corridor$boundaryHelper(_p39._0);
};
var _mordrax$cotwelm$Dungeon_Corridor$isCollision = F2(
	function (position, corridor) {
		return A2(
			_elm_lang$core$List$any,
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(position),
			_mordrax$cotwelm$Dungeon_Corridor$boundary(corridor));
	});

var _mordrax$cotwelm$Dungeon_Rooms_Rectangular$walls = function (_p0) {
	var _p1 = _p0;
	var _p2 = {ctor: '_Tuple2', _0: _p1._0 - 1, _1: _p1._1 - 1};
	var xMax = _p2._0;
	var yMax = _p2._1;
	return {
		ctor: '::',
		_0: A2(
			_elm_lang$core$List$map,
			function (y) {
				return {ctor: '_Tuple2', _0: 0, _1: y};
			},
			A2(_elm_lang$core$List$range, 1, yMax - 1)),
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$core$List$map,
				function (y) {
					return {ctor: '_Tuple2', _0: xMax, _1: y};
				},
				A2(_elm_lang$core$List$range, 1, yMax - 1)),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$List$map,
					function (x) {
						return {ctor: '_Tuple2', _0: x, _1: 0};
					},
					A2(_elm_lang$core$List$range, 1, xMax - 1)),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$List$map,
						function (x) {
							return {ctor: '_Tuple2', _0: x, _1: yMax};
						},
						A2(_elm_lang$core$List$range, 1, xMax - 1)),
					_1: {ctor: '[]'}
				}
			}
		}
	};
};
var _mordrax$cotwelm$Dungeon_Rooms_Rectangular$floors = function (_p3) {
	var _p4 = _p3;
	var _p5 = {ctor: '_Tuple2', _0: _p4._0 - 1, _1: _p4._1 - 1};
	var xMax = _p5._0;
	var yMax = _p5._1;
	return A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(_elm_lang$core$List$range, 1, xMax - 1),
		A2(_elm_lang$core$List$range, 1, yMax - 1));
};
var _mordrax$cotwelm$Dungeon_Rooms_Rectangular$corners = function (_p6) {
	var _p7 = _p6;
	var _p8 = {ctor: '_Tuple2', _0: _p7._0 - 1, _1: _p7._1 - 1};
	var xMax = _p8._0;
	var yMax = _p8._1;
	return {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 0, _1: 0},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: xMax, _1: 0},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 0, _1: yMax},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: xMax, _1: yMax},
					_1: {ctor: '[]'}
				}
			}
		}
	};
};
var _mordrax$cotwelm$Dungeon_Rooms_Rectangular$template = {makeWalls: _mordrax$cotwelm$Dungeon_Rooms_Rectangular$walls, makeCorners: _mordrax$cotwelm$Dungeon_Rooms_Rectangular$corners, makeFloors: _mordrax$cotwelm$Dungeon_Rooms_Rectangular$floors};

var _mordrax$cotwelm$Dungeon_Rooms_Cross$dot = F2(
	function (wallSize, axis) {
		return (wallSize + 1) * axis;
	});
var _mordrax$cotwelm$Dungeon_Rooms_Cross$betweenDots = F3(
	function (wallSize, dot1, dot2) {
		return A2(
			_elm_lang$core$List$range,
			A2(_mordrax$cotwelm$Dungeon_Rooms_Cross$dot, wallSize, dot1) + 1,
			A2(_mordrax$cotwelm$Dungeon_Rooms_Cross$dot, wallSize, dot2) - 1);
	});
var _mordrax$cotwelm$Dungeon_Rooms_Cross$dots = function (wallSize) {
	return A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize),
		A2(_elm_lang$core$List$range, 0, 3));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$toWallSize = function (roomSize) {
	return roomSize - 6;
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$corners = function (_p0) {
	var _p1 = _p0;
	var wallSize = _mordrax$cotwelm$Dungeon_Rooms_Cross$toWallSize(_p1._0);
	var axis = _mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize);
	var corners = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		{
			ctor: '::',
			_0: 0,
			_1: {
				ctor: '::',
				_0: axis(3),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: 0,
			_1: {
				ctor: '::',
				_0: axis(3),
				_1: {ctor: '[]'}
			}
		});
	var isNotCorner = function (_p2) {
		return !A3(_elm_lang$core$Basics$flip, _elm_lang$core$List$member, corners, _p2);
	};
	var allDots = _mordrax$cotwelm$Dungeon_Rooms_Cross$dots(wallSize);
	var grid = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		allDots,
		allDots);
	return A2(_elm_lang$core$List$filter, isNotCorner, grid);
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$floors = function (_p3) {
	var _p4 = _p3;
	var wallSize = _mordrax$cotwelm$Dungeon_Rooms_Cross$toWallSize(_p4._0);
	var axis = _mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize);
	var floorMiddles = A2(
		_elm_lang$core$List$range,
		axis(1) + 1,
		axis(2) - 1);
	var vertical = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		floorMiddles,
		A2(
			_elm_lang$core$List$range,
			axis(0) + 1,
			axis(3) - 1));
	var horizontal = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			axis(0) + 1,
			axis(3) - 1),
		floorMiddles);
	return _elm_lang$core$Set$toList(
		_elm_lang$core$Set$fromList(
			A2(_elm_lang$core$Basics_ops['++'], vertical, horizontal)));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$walls = function (_p5) {
	var _p6 = _p5;
	var wallSize = _mordrax$cotwelm$Dungeon_Rooms_Cross$toWallSize(_p6._0);
	var between = _mordrax$cotwelm$Dungeon_Rooms_Cross$betweenDots(wallSize);
	var left = A2(between, 0, 1);
	var middle = A2(between, 1, 2);
	var right = A2(between, 2, 3);
	var axis = _mordrax$cotwelm$Dungeon_Rooms_Cross$dot(wallSize);
	var topAxis = axis(0);
	var horizontalTop = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		middle,
		{
			ctor: '::',
			_0: topAxis,
			_1: {ctor: '[]'}
		});
	var verticalTop = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		{
			ctor: '::',
			_0: topAxis,
			_1: {ctor: '[]'}
		},
		middle);
	var bottomAxis = axis(3);
	var horizontalBottom = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		middle,
		{
			ctor: '::',
			_0: bottomAxis,
			_1: {ctor: '[]'}
		});
	var verticalBottom = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		{
			ctor: '::',
			_0: bottomAxis,
			_1: {ctor: '[]'}
		},
		middle);
	var horizontalMiddles = A2(
		_elm_lang$core$Basics_ops['++'],
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			left,
			{
				ctor: '::',
				_0: axis(1),
				_1: {
					ctor: '::',
					_0: axis(2),
					_1: {ctor: '[]'}
				}
			}),
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			right,
			{
				ctor: '::',
				_0: axis(1),
				_1: {
					ctor: '::',
					_0: axis(2),
					_1: {ctor: '[]'}
				}
			}));
	var verticalMiddles = A2(
		_elm_lang$core$Basics_ops['++'],
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			{
				ctor: '::',
				_0: axis(1),
				_1: {
					ctor: '::',
					_0: axis(2),
					_1: {ctor: '[]'}
				}
			},
			left),
		A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				}),
			{
				ctor: '::',
				_0: axis(1),
				_1: {
					ctor: '::',
					_0: axis(2),
					_1: {ctor: '[]'}
				}
			},
			right));
	return A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: horizontalTop,
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: horizontalBottom,
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: verticalTop,
					_1: {ctor: '[]'}
				},
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: verticalBottom,
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						{
							ctor: '::',
							_0: horizontalMiddles,
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: verticalMiddles,
							_1: {ctor: '[]'}
						})))));
};
var _mordrax$cotwelm$Dungeon_Rooms_Cross$template = {makeWalls: _mordrax$cotwelm$Dungeon_Rooms_Cross$walls, makeCorners: _mordrax$cotwelm$Dungeon_Rooms_Cross$corners, makeFloors: _mordrax$cotwelm$Dungeon_Rooms_Cross$floors};

var _mordrax$cotwelm$Dungeon_Rooms_Diamond$largestEquilaterialDimension = function (_p0) {
	var _p1 = _p0;
	var _p4 = _p1._1;
	var _p3 = _p1._0;
	var _p2 = {
		ctor: '_Tuple2',
		_0: _p3 - A2(_elm_lang$core$Basics_ops['%'], _p3 + 1, 2),
		_1: _p4 - A2(_elm_lang$core$Basics_ops['%'], _p4 + 1, 2)
	};
	var x_ = _p2._0;
	var y_ = _p2._1;
	var smallestSide = A2(_elm_lang$core$Basics$min, x_, y_);
	return smallestSide;
};
var _mordrax$cotwelm$Dungeon_Rooms_Diamond$info = function (dimension) {
	var size = _mordrax$cotwelm$Dungeon_Rooms_Diamond$largestEquilaterialDimension(dimension);
	var mid = (size / 2) | 0;
	var max = size - 1;
	return {size: size, mid: mid, max: max};
};
var _mordrax$cotwelm$Dungeon_Rooms_Diamond$corners = function (dimension) {
	var model = _mordrax$cotwelm$Dungeon_Rooms_Diamond$info(dimension);
	var leftToTop = function (x) {
		return {ctor: '_Tuple2', _0: x, _1: (model.mid + 1) + x};
	};
	var leftToBottom = function (x) {
		return {ctor: '_Tuple2', _0: x, _1: (model.mid - 1) - x};
	};
	var topToRight = function (x) {
		return {ctor: '_Tuple2', _0: x, _1: (-1 - model.mid) + x};
	};
	var bottomToRight = function (x) {
		return {ctor: '_Tuple2', _0: x, _1: ((model.max + 1) + model.mid) - x};
	};
	var zeroToMidX = A2(_elm_lang$core$List$range, 0, model.mid - 1);
	var midToMaxX = A2(_elm_lang$core$List$range, model.mid + 1, model.max);
	return _elm_lang$core$List$concat(
		{
			ctor: '::',
			_0: A2(_elm_lang$core$List$map, leftToTop, zeroToMidX),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$List$map, leftToBottom, zeroToMidX),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$List$map, topToRight, midToMaxX),
					_1: {
						ctor: '::',
						_0: A2(_elm_lang$core$List$map, bottomToRight, midToMaxX),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _mordrax$cotwelm$Dungeon_Rooms_Diamond$floors = function (dimension) {
	var model = _mordrax$cotwelm$Dungeon_Rooms_Diamond$info(dimension);
	var leftToTop = function (x) {
		return (model.mid + 1) + x;
	};
	var leftToBottom = function (x) {
		return (model.mid - 1) - x;
	};
	var floorsLeft = function (x) {
		return A2(
			_elm_lang$core$List$map,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				})(x),
			A2(
				_elm_lang$core$List$range,
				leftToBottom(x),
				leftToTop(x)));
	};
	var topToRight = function (x) {
		return (-1 - model.mid) + x;
	};
	var bottomToRight = function (x) {
		return ((model.max + 1) + model.mid) - x;
	};
	var floorsRight = function (x) {
		return A2(
			_elm_lang$core$List$map,
			F2(
				function (v0, v1) {
					return {ctor: '_Tuple2', _0: v0, _1: v1};
				})(x),
			A2(
				_elm_lang$core$List$range,
				topToRight(x),
				bottomToRight(x)));
	};
	var zeroToMidX = A2(_elm_lang$core$List$range, 0, model.mid - 1);
	var midToMaxX = A2(_elm_lang$core$List$range, model.mid + 1, model.max);
	return _elm_lang$core$List$concat(
		{
			ctor: '::',
			_0: _elm_lang$core$List$concat(
				A2(_elm_lang$core$List$map, floorsLeft, zeroToMidX)),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$List$concat(
					A2(_elm_lang$core$List$map, floorsRight, midToMaxX)),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$core$List$map,
						F2(
							function (v0, v1) {
								return {ctor: '_Tuple2', _0: v0, _1: v1};
							})(model.mid),
						A2(_elm_lang$core$List$range, 1, model.max - 1)),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _mordrax$cotwelm$Dungeon_Rooms_Diamond$walls = function (dimension) {
	var model = _mordrax$cotwelm$Dungeon_Rooms_Diamond$info(dimension);
	return {
		ctor: '::',
		_0: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 0, _1: model.mid},
			_1: {ctor: '[]'}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: model.max, _1: model.mid},
				_1: {ctor: '[]'}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: model.mid, _1: 0},
					_1: {ctor: '[]'}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: model.mid, _1: model.max},
						_1: {ctor: '[]'}
					},
					_1: {ctor: '[]'}
				}
			}
		}
	};
};
var _mordrax$cotwelm$Dungeon_Rooms_Diamond$template = {makeWalls: _mordrax$cotwelm$Dungeon_Rooms_Diamond$walls, makeCorners: _mordrax$cotwelm$Dungeon_Rooms_Diamond$corners, makeFloors: _mordrax$cotwelm$Dungeon_Rooms_Diamond$floors};
var _mordrax$cotwelm$Dungeon_Rooms_Diamond$Model = F3(
	function (a, b, c) {
		return {size: a, mid: b, max: c};
	});

var _mordrax$cotwelm$Dungeon_Rooms_Potion$walls = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_Potion$floors = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_Potion$corners = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_Potion$template = {makeWalls: _mordrax$cotwelm$Dungeon_Rooms_Potion$walls, makeCorners: _mordrax$cotwelm$Dungeon_Rooms_Potion$corners, makeFloors: _mordrax$cotwelm$Dungeon_Rooms_Potion$floors};

var _mordrax$cotwelm$Dungeon_Rooms_Circular$walls = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_Circular$floors = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_Circular$corners = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_Circular$template = {makeWalls: _mordrax$cotwelm$Dungeon_Rooms_Circular$walls, makeCorners: _mordrax$cotwelm$Dungeon_Rooms_Circular$corners, makeFloors: _mordrax$cotwelm$Dungeon_Rooms_Circular$floors};

var _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$walls = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$floors = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$corners = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$template = {makeWalls: _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$walls, makeCorners: _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$corners, makeFloors: _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$floors};

var _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$walls = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$floors = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$corners = function (dimension) {
	return {ctor: '[]'};
};
var _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$template = {makeWalls: _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$walls, makeCorners: _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$corners, makeFloors: _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$floors};

var _mordrax$cotwelm$Dungeon_Room$templates = function (roomType) {
	var _p0 = roomType;
	switch (_p0.ctor) {
		case 'Rectangular':
			return _mordrax$cotwelm$Dungeon_Rooms_Rectangular$template;
		case 'Cross':
			return _mordrax$cotwelm$Dungeon_Rooms_Cross$template;
		case 'Diamond':
			return _mordrax$cotwelm$Dungeon_Rooms_Diamond$template;
		case 'Potion':
			return _mordrax$cotwelm$Dungeon_Rooms_Potion$template;
		case 'Circular':
			return _mordrax$cotwelm$Dungeon_Rooms_Circular$template;
		case 'DiagonalSquares':
			return _mordrax$cotwelm$Dungeon_Rooms_DiagonalSquares$template;
		default:
			return _mordrax$cotwelm$Dungeon_Rooms_DeadEnd$template;
	}
};
var _mordrax$cotwelm$Dungeon_Room$floorsGenerator = function (_p1) {
	var _p2 = _p1;
	var makeFloors = _mordrax$cotwelm$Dungeon_Room$templates(_p2.roomType).makeFloors;
	return _mgold$elm_random_pcg$Random_Pcg$constant(
		_elm_lang$core$Native_Utils.update(
			_p2,
			{
				floors: makeFloors(_p2.dimension)
			}));
};
var _mordrax$cotwelm$Dungeon_Room$generateEntranceHelper = function (possibleEntrancePositions) {
	var newEntrance = function (pos) {
		return A2(_mordrax$cotwelm$Dungeon_Entrance$init, _mordrax$cotwelm$Dungeon_Entrance$Door, pos);
	};
	var makeADoor = function (positions) {
		return newEntrance(
			A2(
				_mordrax$cotwelm$Lodash$headWithDefault,
				{ctor: '_Tuple2', _0: 0, _1: 0},
				positions));
	};
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		makeADoor,
		_mordrax$cotwelm$Lodash$shuffle(possibleEntrancePositions));
};
var _mordrax$cotwelm$Dungeon_Room$headOfWalls = function (walls) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		{ctor: '_Tuple2', _0: 0, _1: 0},
		_elm_lang$core$List$head(
			_elm_lang$core$List$concat(walls)));
};
var _mordrax$cotwelm$Dungeon_Room$roomSizeGenerator = F2(
	function (config, _p3) {
		var _p4 = _p3;
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			function (roomSize) {
				return _mgold$elm_random_pcg$Random_Pcg$constant(
					_elm_lang$core$Native_Utils.update(
						_p4,
						{
							dimension: {ctor: '_Tuple2', _0: roomSize, _1: roomSize}
						}));
			},
			A2(_mordrax$cotwelm$Dungeon_Rooms_Config$roomSizeGenerator, _p4.roomType, config));
	});
var _mordrax$cotwelm$Dungeon_Room$positionGenerator = F2(
	function (_p6, _p5) {
		var _p7 = _p6;
		var _p11 = _p7.dungeonSize;
		var _p8 = _p5;
		var _p9 = _p8.dimension;
		var dimX = _p9._0;
		var dimY = _p9._1;
		var _p10 = A2(
			_mordrax$cotwelm$Utils_Vector$map,
			_elm_lang$core$Basics$max(0),
			{ctor: '_Tuple2', _0: (_p11 - dimX) - 1, _1: (_p11 - dimY) - 1});
		var maxX = _p10._0;
		var maxY = _p10._1;
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			function (worldPos_) {
				return _mgold$elm_random_pcg$Random_Pcg$constant(
					_elm_lang$core$Native_Utils.update(
						_p8,
						{worldPos: worldPos_}));
			},
			A2(_mordrax$cotwelm$Dice$d2d, maxX, maxY));
	});
var _mordrax$cotwelm$Dungeon_Room$roomTypeGenerator = F2(
	function (config, model) {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			function (roomType_) {
				return _mgold$elm_random_pcg$Random_Pcg$constant(
					_elm_lang$core$Native_Utils.update(
						model,
						{roomType: roomType_}));
			},
			_mordrax$cotwelm$Dungeon_Rooms_Config$roomTypeGenerator(config));
	});
var _mordrax$cotwelm$Dungeon_Room$pp = function (_p12) {
	var _p13 = _p12;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'Room at (',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(_p13._0.worldPos),
			')'));
};
var _mordrax$cotwelm$Dungeon_Room$position = function (_p14) {
	var _p15 = _p14;
	return _p15._0.worldPos;
};
var _mordrax$cotwelm$Dungeon_Room$wallsFacingDirection = F3(
	function (direction, walls, _p16) {
		var _p17 = _p16;
		var xEqualsMaxX = function (_p18) {
			var _p19 = _p18;
			return _elm_lang$core$Native_Utils.eq(_p19._0, _p17._0 - 1);
		};
		var xEqualsZero = function (_p20) {
			var _p21 = _p20;
			return _elm_lang$core$Native_Utils.eq(_p21._0, 0);
		};
		var yEqualsMaxY = function (_p22) {
			var _p23 = _p22;
			return _elm_lang$core$Native_Utils.eq(_p23._1, _p17._1 - 1);
		};
		var yEqualsZero = function (_p24) {
			var _p25 = _p24;
			return _elm_lang$core$Native_Utils.eq(_p25._1, 0);
		};
		var _p26 = direction;
		switch (_p26.ctor) {
			case 'N':
				return A2(_elm_lang$core$List$filter, yEqualsMaxY, walls);
			case 'E':
				return A2(_elm_lang$core$List$filter, xEqualsMaxX, walls);
			case 'S':
				return A2(_elm_lang$core$List$filter, yEqualsZero, walls);
			case 'W':
				return A2(_elm_lang$core$List$filter, xEqualsZero, walls);
			default:
				return {ctor: '[]'};
		}
	});
var _mordrax$cotwelm$Dungeon_Room$entranceFacing = F2(
	function (_p27, entrance) {
		var _p28 = _p27;
		var entrancePos = A3(
			_elm_lang$core$Basics$flip,
			_mordrax$cotwelm$Utils_Vector$sub,
			_p28._0.worldPos,
			_mordrax$cotwelm$Dungeon_Entrance$position(entrance));
		var isFloor = function (direction) {
			return function (x) {
				return A2(_elm_lang$core$List$member, x, _p28._0.floors);
			}(
				A2(
					_mordrax$cotwelm$Utils_Vector$add,
					entrancePos,
					_mordrax$cotwelm$Utils_Vector$fromDirection(direction)));
		};
		return isFloor(_mordrax$cotwelm$Utils_Direction$N) ? _mordrax$cotwelm$Utils_Direction$S : (isFloor(_mordrax$cotwelm$Utils_Direction$S) ? _mordrax$cotwelm$Utils_Direction$N : (isFloor(_mordrax$cotwelm$Utils_Direction$E) ? _mordrax$cotwelm$Utils_Direction$W : (isFloor(_mordrax$cotwelm$Utils_Direction$W) ? _mordrax$cotwelm$Utils_Direction$E : _mordrax$cotwelm$Utils_Direction$N)));
	});
var _mordrax$cotwelm$Dungeon_Room$entrances = function (_p29) {
	var _p30 = _p29;
	return _p30._0.entrances;
};
var _mordrax$cotwelm$Dungeon_Room$toTiles = function (_p31) {
	var _p32 = _p31;
	var roomTileTypes = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Tile$DarkDgn, _1: _p32._0.floors},
		_1: {ctor: '[]'}
	};
	var toWorldPos = function (localPos) {
		return A2(_mordrax$cotwelm$Utils_Vector$add, _p32._0.worldPos, localPos);
	};
	var makeTiles = function (_p33) {
		var _p34 = _p33;
		return A2(
			_elm_lang$core$List$map,
			function (pos) {
				return A2(_mordrax$cotwelm$Tile$toTile, pos, _p34._0);
			},
			A2(_elm_lang$core$List$map, toWorldPos, _p34._1));
	};
	return A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$List$map, _mordrax$cotwelm$Dungeon_Entrance$toTile, _p32._0.entrances),
		_elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, makeTiles, roomTileTypes)));
};
var _mordrax$cotwelm$Dungeon_Room$adjacentToFloors = function (floors) {
	var lessFloors = function (floorSet) {
		return A2(
			_elm_lang$core$Set$diff,
			floorSet,
			_elm_lang$core$Set$fromList(floors));
	};
	return _elm_lang$core$Set$toList(
		lessFloors(
			_elm_lang$core$Set$fromList(
				_elm_lang$core$List$concat(
					A2(_elm_lang$core$List$map, _mordrax$cotwelm$Utils_Vector$neighbours, floors)))));
};
var _mordrax$cotwelm$Dungeon_Room$boundary = function (_p35) {
	var _p36 = _p35;
	var _p37 = _p36._0;
	return A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Utils_Vector$add(_p37.worldPos),
		_mordrax$cotwelm$Dungeon_Room$adjacentToFloors(_p37.floors));
};
var _mordrax$cotwelm$Dungeon_Room$isCollision = F2(
	function (_p38, position) {
		var _p39 = _p38;
		var isPositionAEntrance = A2(
			_elm_lang$core$List$any,
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(position),
			A2(_elm_lang$core$List$map, _mordrax$cotwelm$Dungeon_Entrance$position, _p39._0.entrances));
		var localPosition = A2(_mordrax$cotwelm$Utils_Vector$sub, position, _p39._0.worldPos);
		var isPositionAdjacent = A2(
			_elm_lang$core$List$any,
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(localPosition),
			_mordrax$cotwelm$Dungeon_Room$adjacentToFloors(_p39._0.floors));
		return isPositionAEntrance || isPositionAdjacent;
	});
var _mordrax$cotwelm$Dungeon_Room$adjacentToFloorsWithoutDiagonals = function (floors) {
	var lessFloors = function (floorSet) {
		return A2(
			_elm_lang$core$Set$diff,
			floorSet,
			_elm_lang$core$Set$fromList(floors));
	};
	return _elm_lang$core$Set$toList(
		lessFloors(
			_elm_lang$core$Set$fromList(
				_elm_lang$core$List$concat(
					A2(_elm_lang$core$List$map, _mordrax$cotwelm$Utils_Vector$cardinalNeighbours, floors)))));
};
var _mordrax$cotwelm$Dungeon_Room$tooCloseToEntrances = F2(
	function (_p40, entrances) {
		var _p41 = _p40;
		var tooCloseToEntrance = function (entrance) {
			var _p42 = _mordrax$cotwelm$Dungeon_Entrance$position(entrance);
			var ex = _p42._0;
			var ey = _p42._1;
			var _p43 = {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Basics$abs(ex - _p41._0),
				_1: _elm_lang$core$Basics$abs(ey - _p41._1)
			};
			var dx = _p43._0;
			var dy = _p43._1;
			return (_elm_lang$core$Native_Utils.eq(dx, 0) && (_elm_lang$core$Native_Utils.cmp(dy, 2) < 1)) || (_elm_lang$core$Native_Utils.eq(dy, 0) && (_elm_lang$core$Native_Utils.cmp(dx, 2) < 1));
		};
		return A2(_elm_lang$core$List$any, tooCloseToEntrance, entrances);
	});
var _mordrax$cotwelm$Dungeon_Room$notTooClose = F2(
	function (entrances, position) {
		return A2(
			_elm_lang$core$List$any,
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})(position),
			A2(_elm_lang$core$List$map, _mordrax$cotwelm$Dungeon_Entrance$position, entrances)) ? _elm_lang$core$Maybe$Nothing : (A2(_mordrax$cotwelm$Dungeon_Room$tooCloseToEntrances, position, entrances) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(position));
	});
var _mordrax$cotwelm$Dungeon_Room$floors = function (_p44) {
	var _p45 = _p44;
	return A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Utils_Vector$add(_p45._0.worldPos),
		_p45._0.floors);
};
var _mordrax$cotwelm$Dungeon_Room$Model = F5(
	function (a, b, c, d, e) {
		return {entrances: a, floors: b, roomType: c, dimension: d, worldPos: e};
	});
var _mordrax$cotwelm$Dungeon_Room$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Dungeon_Room$init = _mordrax$cotwelm$Dungeon_Room$A(
	{
		entrances: {ctor: '[]'},
		floors: {ctor: '[]'},
		roomType: _mordrax$cotwelm$Dungeon_Rooms_Type$DeadEnd,
		dimension: {ctor: '_Tuple2', _0: 1, _1: 1},
		worldPos: _mordrax$cotwelm$Utils_Vector$zero
	});
var _mordrax$cotwelm$Dungeon_Room$new = F5(
	function (entrances, floors, roomType, dimension, worldPos) {
		return _mordrax$cotwelm$Dungeon_Room$A(
			{entrances: entrances, floors: floors, roomType: roomType, dimension: dimension, worldPos: worldPos});
	});
var _mordrax$cotwelm$Dungeon_Room$newDeadEnd = function (worldPos) {
	return A5(
		_mordrax$cotwelm$Dungeon_Room$new,
		{
			ctor: '::',
			_0: A2(_mordrax$cotwelm$Dungeon_Entrance$init, _mordrax$cotwelm$Dungeon_Entrance$Door, worldPos),
			_1: {ctor: '[]'}
		},
		{ctor: '[]'},
		_mordrax$cotwelm$Dungeon_Rooms_Type$DeadEnd,
		{ctor: '_Tuple2', _0: 1, _1: 1},
		worldPos);
};
var _mordrax$cotwelm$Dungeon_Room$generate = function (config) {
	var toRoomGenerator = function (model) {
		return _mgold$elm_random_pcg$Random_Pcg$constant(
			_mordrax$cotwelm$Dungeon_Room$A(model));
	};
	var _p46 = _mordrax$cotwelm$Dungeon_Room$init;
	var model = _p46._0;
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$andThen,
		toRoomGenerator,
		A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			_mordrax$cotwelm$Dungeon_Room$floorsGenerator,
			A2(
				_mgold$elm_random_pcg$Random_Pcg$andThen,
				_mordrax$cotwelm$Dungeon_Room$positionGenerator(config),
				A2(
					_mgold$elm_random_pcg$Random_Pcg$andThen,
					_mordrax$cotwelm$Dungeon_Room$roomSizeGenerator(config),
					A2(_mordrax$cotwelm$Dungeon_Room$roomTypeGenerator, config, model)))));
};
var _mordrax$cotwelm$Dungeon_Room$generateEntrance = function (_p47) {
	var _p48 = _p47;
	var _p49 = _p48._0.entrances;
	var toReturn = function (entrance) {
		return {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Dungeon_Room$A(
				_elm_lang$core$Native_Utils.update(
					_p48._0,
					{
						entrances: {ctor: '::', _0: entrance, _1: _p49}
					})),
			_1: entrance
		};
	};
	var possibleEntrancePositions = A2(
		_elm_lang$core$List$filterMap,
		_mordrax$cotwelm$Dungeon_Room$notTooClose(_p49),
		A2(
			_elm_lang$core$List$map,
			_mordrax$cotwelm$Utils_Vector$add(_p48._0.worldPos),
			_mordrax$cotwelm$Dungeon_Room$adjacentToFloorsWithoutDiagonals(_p48._0.floors)));
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		toReturn,
		_mordrax$cotwelm$Dungeon_Room$generateEntranceHelper(possibleEntrancePositions));
};
var _mordrax$cotwelm$Dungeon_Room$addEntrance = F2(
	function (entrance, _p50) {
		var _p51 = _p50;
		var entrancePosition = A2(
			_mordrax$cotwelm$Utils_Vector$sub,
			_mordrax$cotwelm$Dungeon_Entrance$position(entrance),
			_p51._0.worldPos);
		return _mordrax$cotwelm$Dungeon_Room$A(
			_elm_lang$core$Native_Utils.update(
				_p51._0,
				{
					entrances: {ctor: '::', _0: entrance, _1: _p51._0.entrances}
				}));
	});
var _mordrax$cotwelm$Dungeon_Room$removeEntrance = F2(
	function (entrance, _p52) {
		var _p53 = _p52;
		var entrances_ = A2(
			_elm_lang$core$List$filter,
			function (_p54) {
				return !A2(_mordrax$cotwelm$Dungeon_Entrance$equal, entrance, _p54);
			},
			_p53._0.entrances);
		return _mordrax$cotwelm$Dungeon_Room$A(
			_elm_lang$core$Native_Utils.update(
				_p53._0,
				{entrances: entrances_}));
	});
var _mordrax$cotwelm$Dungeon_Room$placeRoom = F2(
	function (_p56, _p55) {
		var _p57 = _p56;
		var _p60 = _p57._1;
		var _p58 = _p55;
		var _p59 = _p58._0.floors;
		var makeADoor = function (wall) {
			var entrancePosition = A2(
				_mordrax$cotwelm$Utils_Vector$add,
				_p57._0,
				_mordrax$cotwelm$Utils_Vector$fromDirection(_p60));
			var entrance = A2(_mordrax$cotwelm$Dungeon_Entrance$init, _mordrax$cotwelm$Dungeon_Entrance$Door, entrancePosition);
			var roomWorldPosition = A2(_mordrax$cotwelm$Utils_Vector$sub, entrancePosition, wall);
			return _mgold$elm_random_pcg$Random_Pcg$constant(
				_mordrax$cotwelm$Dungeon_Room$A(
					_elm_lang$core$Native_Utils.update(
						_p58._0,
						{
							entrances: {
								ctor: '::',
								_0: entrance,
								_1: {ctor: '[]'}
							},
							worldPos: roomWorldPosition
						})));
		};
		var pickAWall = function (walls) {
			return A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				_mordrax$cotwelm$Lodash$headWithDefault(
					{ctor: '_Tuple2', _0: 0, _1: 0}),
				_mordrax$cotwelm$Lodash$shuffle(walls));
		};
		var wallFacing = _mordrax$cotwelm$Utils_Vector$oppositeDirection(_p60);
		var candidateWalls = _elm_lang$core$Set$toList(
			A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Set$diff,
				_elm_lang$core$Set$fromList(_p59),
				_elm_lang$core$Set$fromList(
					A2(
						_elm_lang$core$List$map,
						function (floor) {
							return A2(_mordrax$cotwelm$Utils_Vector$neighbourInDirection, floor, wallFacing);
						},
						_p59))));
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			makeADoor,
			pickAWall(candidateWalls));
	});

var _mordrax$cotwelm$Level$floors = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Tile$position,
		A2(
			_elm_lang$core$List$filter,
			function (_p2) {
				return !_mordrax$cotwelm$Tile$isSolid(_p2);
			},
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$second,
				_elm_lang$core$Dict$toList(_p1.map))));
};
var _mordrax$cotwelm$Level$drop = F2(
	function (_p3, model) {
		var _p4 = _p3;
		var _p5 = _p4._0;
		return function (map) {
			return _elm_lang$core$Native_Utils.update(
				model,
				{map: map});
		}(
			A2(
				_elm_lang$core$Maybe$withDefault,
				model.map,
				A2(
					_elm_lang$core$Maybe$map,
					function (x) {
						return A3(_elm_lang$core$Dict$insert, _p5, x, model.map);
					},
					A2(
						_elm_lang$core$Maybe$map,
						_mordrax$cotwelm$Tile$drop(_p4._1),
						A2(_elm_lang$core$Dict$get, _p5, model.map)))));
	});
var _mordrax$cotwelm$Level$updateGround = F3(
	function (pos, payload, model) {
		var maybeTile = A2(
			_elm_lang$core$Maybe$map,
			_mordrax$cotwelm$Tile$updateGround(payload),
			A2(_elm_lang$core$Dict$get, pos, model.map));
		var _p6 = maybeTile;
		if (_p6.ctor === 'Nothing') {
			return model;
		} else {
			return _elm_lang$core$Native_Utils.update(
				model,
				{
					map: A3(_elm_lang$core$Dict$insert, pos, _p6._0, model.map)
				});
		}
	});
var _mordrax$cotwelm$Level$getTile = F2(
	function (pos, _p7) {
		var _p8 = _p7;
		return A2(_elm_lang$core$Dict$get, pos, _p8.map);
	});
var _mordrax$cotwelm$Level$size = function (_p9) {
	var _p10 = _p9;
	var positions = _elm_lang$core$Dict$keys(_p10.map);
	var _p11 = A3(
		_elm_lang$core$List$foldr,
		F2(
			function (_p13, _p12) {
				var _p14 = _p13;
				var _p15 = _p12;
				return {
					ctor: '_Tuple2',
					_0: A2(_elm_lang$core$Basics$max, _p14._0, _p15._0),
					_1: A2(_elm_lang$core$Basics$max, _p14._1, _p15._1)
				};
			}),
		{ctor: '_Tuple2', _0: 0, _1: 0},
		positions);
	var maxX = _p11._0;
	var maxY = _p11._1;
	return {ctor: '_Tuple2', _0: maxX + 1, _1: maxY + 1};
};
var _mordrax$cotwelm$Level$downstairs = function (model) {
	return _elm_lang$core$List$head(
		A2(
			_elm_lang$core$List$filter,
			function (x) {
				return _elm_lang$core$Native_Utils.eq(x.buildingType, _mordrax$cotwelm$GameData_Building$StairDown);
			},
			model.buildings));
};
var _mordrax$cotwelm$Level$upstairs = function (model) {
	var isStairUp = function (_p16) {
		return A2(
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				}),
			_mordrax$cotwelm$GameData_Building$StairUp,
			function (_) {
				return _.buildingType;
			}(_p16));
	};
	return _elm_lang$core$List$head(
		A2(_elm_lang$core$List$filter, isStairUp, model.buildings));
};
var _mordrax$cotwelm$Level$init = F3(
	function (map, buildings, monsters) {
		return {map: map, buildings: buildings, monsters: monsters};
	});
var _mordrax$cotwelm$Level$Level = F3(
	function (a, b, c) {
		return {map: a, buildings: b, monsters: c};
	});
var _mordrax$cotwelm$Level$NoOp = {ctor: 'NoOp'};

var _mordrax$cotwelm$Dungeon_Types$roomsAndCorridorsFromActivePoint = F2(
	function (point, _p0) {
		var _p1 = _p0;
		var _p4 = _p1._0;
		var _p3 = _p1._1;
		var _p2 = point;
		if (_p2.ctor === 'ActiveRoom') {
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p2._0, _1: _p4},
				_1: _p3
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _p4,
				_1: {ctor: '::', _0: _p2._0, _1: _p3}
			};
		}
	});
var _mordrax$cotwelm$Dungeon_Types$toTiles = function (_p5) {
	var _p6 = _p5;
	var _p7 = A3(
		_elm_lang$core$List$foldl,
		_mordrax$cotwelm$Dungeon_Types$roomsAndCorridorsFromActivePoint,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		_p6.activePoints);
	var activeRooms = _p7._0;
	var activeCorridors = _p7._1;
	var roomTiles = _elm_lang$core$List$concat(
		A2(
			_elm_lang$core$List$map,
			_mordrax$cotwelm$Dungeon_Room$toTiles,
			A2(_elm_lang$core$Basics_ops['++'], _p6.rooms, activeRooms)));
	var corridorTiles = _elm_lang$core$List$concat(
		A2(
			_elm_lang$core$List$map,
			_mordrax$cotwelm$Dungeon_Corridor$toTiles,
			A2(_elm_lang$core$Basics_ops['++'], _p6.corridors, activeCorridors)));
	return A2(
		_elm_lang$core$Basics_ops['++'],
		roomTiles,
		A2(_elm_lang$core$Basics_ops['++'], corridorTiles, _p6.walls));
};
var _mordrax$cotwelm$Dungeon_Types$toOccupied = function (_p8) {
	var _p9 = _p8;
	var _p10 = A3(
		_elm_lang$core$List$foldl,
		_mordrax$cotwelm$Dungeon_Types$roomsAndCorridorsFromActivePoint,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		_p9.activePoints);
	var activeRooms = _p10._0;
	var activeCorridors = _p10._1;
	var roomVectors = _elm_lang$core$List$concat(
		A2(
			_elm_lang$core$List$map,
			_mordrax$cotwelm$Dungeon_Room$boundary,
			A2(_elm_lang$core$Basics_ops['++'], _p9.rooms, activeRooms)));
	var corridorVectors = _elm_lang$core$List$concat(
		A2(
			_elm_lang$core$List$map,
			_mordrax$cotwelm$Dungeon_Corridor$boundary,
			A2(_elm_lang$core$Basics_ops['++'], _p9.corridors, activeCorridors)));
	return A2(_elm_lang$core$Basics_ops['++'], roomVectors, corridorVectors);
};
var _mordrax$cotwelm$Dungeon_Types$fromTiles = function (tiles) {
	var toKVPair = function (tile) {
		return {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Tile$position(tile),
			_1: tile
		};
	};
	return _elm_lang$core$Dict$fromList(
		A2(_elm_lang$core$List$map, toKVPair, tiles));
};
var _mordrax$cotwelm$Dungeon_Types$toLevel = function (_p11) {
	var _p12 = _p11;
	return function (x) {
		return A3(
			_mordrax$cotwelm$Level$Level,
			x,
			_p12.buildings,
			{ctor: '[]'});
	}(
		_mordrax$cotwelm$Dungeon_Types$fromTiles(
			_mordrax$cotwelm$Dungeon_Types$toTiles(_p12)));
};
var _mordrax$cotwelm$Dungeon_Types$Model = F6(
	function (a, b, c, d, e, f) {
		return {config: a, rooms: b, corridors: c, activePoints: d, walls: e, buildings: f};
	});
var _mordrax$cotwelm$Dungeon_Types$ActiveCorridor = function (a) {
	return {ctor: 'ActiveCorridor', _0: a};
};
var _mordrax$cotwelm$Dungeon_Types$ActiveRoom = F2(
	function (a, b) {
		return {ctor: 'ActiveRoom', _0: a, _1: b};
	});

var _mordrax$cotwelm$Dungeon_Clean$activePointToCorridor = function (activePoint) {
	var _p0 = activePoint;
	if (_p0.ctor === 'ActiveCorridor') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _mordrax$cotwelm$Dungeon_Clean$activePointToRoom = function (activePoint) {
	var _p1 = activePoint;
	if (_p1.ctor === 'ActiveRoom') {
		return _elm_lang$core$Maybe$Just(_p1._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _mordrax$cotwelm$Dungeon_Clean$query = F2(
	function (position, _p2) {
		var _p3 = _p2;
		var _p4 = _p3.activePoints;
		var maybeCorridor = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				_mordrax$cotwelm$Dungeon_Corridor$isCollision(position),
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p3.corridors,
					A2(_elm_lang$core$List$filterMap, _mordrax$cotwelm$Dungeon_Clean$activePointToCorridor, _p4))));
		var maybeRoom = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				function (room) {
					return A2(_mordrax$cotwelm$Dungeon_Room$isCollision, room, position);
				},
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p3.rooms,
					A2(_elm_lang$core$List$filterMap, _mordrax$cotwelm$Dungeon_Clean$activePointToRoom, _p4))));
		return {ctor: '_Tuple2', _0: maybeRoom, _1: maybeCorridor};
	});
var _mordrax$cotwelm$Dungeon_Clean$firstObstacle = F3(
	function (digDirectionVector, _p6, _p5) {
		firstObstacle:
		while (true) {
			var _p7 = _p6;
			var _p11 = _p7;
			var _p8 = _p5;
			var _p10 = _p8;
			if (!A2(_mordrax$cotwelm$Dungeon_Rooms_Config$withinDungeonBounds, _p11, _p8.config)) {
				return {
					ctor: '_Tuple4',
					_0: _elm_lang$core$Maybe$Nothing,
					_1: _elm_lang$core$Maybe$Nothing,
					_2: {ctor: '_Tuple2', _0: 0, _1: 0},
					_3: {ctor: '_Tuple2', _0: 0, _1: 0}
				};
			} else {
				var _p9 = A2(_mordrax$cotwelm$Dungeon_Clean$query, _p11, _p10);
				if ((_p9._0.ctor === 'Nothing') && (_p9._1.ctor === 'Nothing')) {
					var _v6 = digDirectionVector,
						_v7 = A2(_mordrax$cotwelm$Utils_Vector$add, digDirectionVector, _p11),
						_v8 = _p10;
					digDirectionVector = _v6;
					_p6 = _v7;
					_p5 = _v8;
					continue firstObstacle;
				} else {
					return {
						ctor: '_Tuple4',
						_0: _p9._0,
						_1: _p9._1,
						_2: A2(_mordrax$cotwelm$Utils_Vector$sub, _p11, digDirectionVector),
						_3: _p11
					};
				}
			}
		}
	});
var _mordrax$cotwelm$Dungeon_Clean$findAndUpdateCorridor = F2(
	function (targetCorridor, _p12) {
		var _p13 = _p12;
		var _p14 = _mordrax$cotwelm$Dungeon_Corridor$end(targetCorridor);
		var targetCorridorPosition = _p14._0;
		var update = F2(
			function (corridor, updatedCorridors) {
				return _elm_lang$core$Native_Utils.eq(
					targetCorridorPosition,
					_elm_lang$core$Tuple$first(
						_mordrax$cotwelm$Dungeon_Corridor$end(corridor))) ? {ctor: '::', _0: targetCorridor, _1: updatedCorridors} : {ctor: '::', _0: corridor, _1: updatedCorridors};
			});
		var corridors_ = A3(
			_elm_lang$core$List$foldl,
			update,
			{ctor: '[]'},
			_p13.corridors);
		var updateActivePoints = F2(
			function (pt, updatedPoints) {
				var _p15 = pt;
				if (_p15.ctor === 'ActiveCorridor') {
					var _p16 = _p15._0;
					return _elm_lang$core$Native_Utils.eq(
						targetCorridorPosition,
						_elm_lang$core$Tuple$first(
							_mordrax$cotwelm$Dungeon_Corridor$end(_p16))) ? {
						ctor: '::',
						_0: _mordrax$cotwelm$Dungeon_Types$ActiveCorridor(targetCorridor),
						_1: updatedPoints
					} : {
						ctor: '::',
						_0: _mordrax$cotwelm$Dungeon_Types$ActiveCorridor(_p16),
						_1: updatedPoints
					};
				} else {
					return {ctor: '::', _0: _p15, _1: updatedPoints};
				}
			});
		var activePoints_ = A3(
			_elm_lang$core$List$foldl,
			updateActivePoints,
			{ctor: '[]'},
			_p13.activePoints);
		return _elm_lang$core$Native_Utils.update(
			_p13,
			{corridors: corridors_, activePoints: activePoints_});
	});
var _mordrax$cotwelm$Dungeon_Clean$findAndUpdateRoom = F2(
	function (targetRoom, _p17) {
		var _p18 = _p17;
		var targetRoomPosition = _mordrax$cotwelm$Dungeon_Room$position(targetRoom);
		var update = F2(
			function (room, updatedRooms) {
				return _elm_lang$core$Native_Utils.eq(
					targetRoomPosition,
					_mordrax$cotwelm$Dungeon_Room$position(room)) ? {ctor: '::', _0: targetRoom, _1: updatedRooms} : {ctor: '::', _0: room, _1: updatedRooms};
			});
		var rooms_ = A3(
			_elm_lang$core$List$foldl,
			update,
			{ctor: '[]'},
			_p18.rooms);
		var updateActivePoints = F2(
			function (pt, updatedPoints) {
				var _p19 = pt;
				if (_p19.ctor === 'ActiveRoom') {
					var _p21 = _p19._0;
					var _p20 = _p19._1;
					return _elm_lang$core$Native_Utils.eq(
						targetRoomPosition,
						_mordrax$cotwelm$Dungeon_Room$position(_p21)) ? {
						ctor: '::',
						_0: A2(_mordrax$cotwelm$Dungeon_Types$ActiveRoom, targetRoom, _p20),
						_1: updatedPoints
					} : {
						ctor: '::',
						_0: A2(_mordrax$cotwelm$Dungeon_Types$ActiveRoom, _p21, _p20),
						_1: updatedPoints
					};
				} else {
					return {ctor: '::', _0: _p19, _1: updatedPoints};
				}
			});
		var activePoints_ = A3(
			_elm_lang$core$List$foldl,
			updateActivePoints,
			{ctor: '[]'},
			_p18.activePoints);
		return _elm_lang$core$Native_Utils.update(
			_p18,
			{rooms: rooms_, activePoints: activePoints_});
	});
var _mordrax$cotwelm$Dungeon_Clean$neighbours = F2(
	function (position, map) {
		var getTile = function (direction) {
			return A3(
				_elm_lang$core$Basics$flip,
				_elm_lang$core$Dict$get,
				map,
				A2(
					_mordrax$cotwelm$Utils_Vector$add,
					position,
					_mordrax$cotwelm$Utils_Vector$fromDirection(direction)));
		};
		return {
			ctor: '_Tuple4',
			_0: getTile(_mordrax$cotwelm$Utils_Direction$N),
			_1: getTile(_mordrax$cotwelm$Utils_Direction$E),
			_2: getTile(_mordrax$cotwelm$Utils_Direction$S),
			_3: getTile(_mordrax$cotwelm$Utils_Direction$W)
		};
	});
var _mordrax$cotwelm$Dungeon_Clean$allDirectionsAreFloors = F3(
	function (neighbourDirections, position, map) {
		var isFloorTiles = function (maybeTiles) {
			return A2(
				_elm_lang$core$List$all,
				F2(
					function (x, y) {
						return !_elm_lang$core$Native_Utils.eq(x, y);
					})(_elm_lang$core$Maybe$Nothing),
				A2(
					_elm_lang$core$List$map,
					_elm_community$maybe_extra$Maybe_Extra$filter(
						function (x) {
							return _elm_lang$core$Native_Utils.eq(
								_mordrax$cotwelm$Tile$tileType(x),
								_mordrax$cotwelm$Tile$DarkDgn);
						}),
					maybeTiles));
		};
		var toNeighbours = function (directions) {
			return A2(
				_elm_lang$core$List$map,
				A2(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, map),
				A2(
					_elm_lang$core$List$map,
					_mordrax$cotwelm$Utils_Vector$add(position),
					A2(_elm_lang$core$List$map, _mordrax$cotwelm$Utils_Vector$fromDirection, directions)));
		};
		return A2(
			_elm_lang$core$List$any,
			isFloorTiles,
			A2(_elm_lang$core$List$map, toNeighbours, neighbourDirections));
	});
var _mordrax$cotwelm$Dungeon_Clean$adjacentNeighbourTriplets = {
	ctor: '::',
	_0: {
		ctor: '::',
		_0: _mordrax$cotwelm$Utils_Direction$N,
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Utils_Direction$E,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Direction$S,
				_1: {ctor: '[]'}
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			ctor: '::',
			_0: _mordrax$cotwelm$Utils_Direction$E,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Direction$S,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Utils_Direction$W,
					_1: {ctor: '[]'}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Direction$S,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Utils_Direction$W,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Utils_Direction$N,
						_1: {ctor: '[]'}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '::',
					_0: _mordrax$cotwelm$Utils_Direction$W,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Utils_Direction$N,
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Utils_Direction$E,
							_1: {ctor: '[]'}
						}
					}
				},
				_1: {ctor: '[]'}
			}
		}
	}
};
var _mordrax$cotwelm$Dungeon_Clean$hasThreeOrMoreNeighbourFloors = F2(
	function (position, map) {
		return A3(_mordrax$cotwelm$Dungeon_Clean$allDirectionsAreFloors, _mordrax$cotwelm$Dungeon_Clean$adjacentNeighbourTriplets, position, map);
	});
var _mordrax$cotwelm$Dungeon_Clean$adjacentNeighbourPairs = {
	ctor: '::',
	_0: {
		ctor: '::',
		_0: _mordrax$cotwelm$Utils_Direction$N,
		_1: {
			ctor: '::',
			_0: _mordrax$cotwelm$Utils_Direction$E,
			_1: {ctor: '[]'}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			ctor: '::',
			_0: _mordrax$cotwelm$Utils_Direction$E,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Direction$S,
				_1: {ctor: '[]'}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _mordrax$cotwelm$Utils_Direction$S,
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Utils_Direction$W,
					_1: {ctor: '[]'}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '::',
					_0: _mordrax$cotwelm$Utils_Direction$W,
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Utils_Direction$N,
						_1: {ctor: '[]'}
					}
				},
				_1: {ctor: '[]'}
			}
		}
	}
};
var _mordrax$cotwelm$Dungeon_Clean$hasAdjacentFloors = F2(
	function (position, map) {
		return A3(_mordrax$cotwelm$Dungeon_Clean$allDirectionsAreFloors, _mordrax$cotwelm$Dungeon_Clean$adjacentNeighbourPairs, position, map);
	});
var _mordrax$cotwelm$Dungeon_Clean$calculateTypeOfWall = F2(
	function (map, position) {
		var _p22 = {
			ctor: '_Tuple2',
			_0: A2(_mordrax$cotwelm$Dungeon_Clean$hasAdjacentFloors, position, map),
			_1: A2(_mordrax$cotwelm$Dungeon_Clean$hasThreeOrMoreNeighbourFloors, position, map)
		};
		if ((_p22.ctor === '_Tuple2') && (_p22._0 === true)) {
			if (_p22._1 === true) {
				return A2(_mordrax$cotwelm$Tile$toTile, position, _mordrax$cotwelm$Tile$DarkDgn);
			} else {
				return A2(_mordrax$cotwelm$Tile$toTile, position, _mordrax$cotwelm$Tile$WallDarkDgn);
			}
		} else {
			return A2(_mordrax$cotwelm$Tile$toTile, position, _mordrax$cotwelm$Tile$Rock);
		}
	});
var _mordrax$cotwelm$Dungeon_Clean$addWalls = function (model) {
	var allPoints = A3(
		_elm_community$list_extra$List_Extra$lift2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(_elm_lang$core$List$range, 1, model.config.dungeonSize),
		A2(_elm_lang$core$List$range, 1, model.config.dungeonSize));
	var _p23 = _mordrax$cotwelm$Dungeon_Types$toLevel(model);
	var map = _p23.map;
	var mapPoints = _elm_lang$core$Dict$keys(map);
	var isNotAMapPoint = function (point) {
		return A2(
			_elm_lang$core$List$all,
			F2(
				function (x, y) {
					return !_elm_lang$core$Native_Utils.eq(x, y);
				})(point),
			mapPoints);
	};
	var walls = A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Dungeon_Clean$calculateTypeOfWall(map),
		A2(_elm_lang$core$List$filter, isNotAMapPoint, allPoints));
	return _elm_lang$core$Native_Utils.update(
		model,
		{walls: walls});
};
var _mordrax$cotwelm$Dungeon_Clean$cleanRoom = F2(
	function (room, maybeEntrance) {
		var _p24 = maybeEntrance;
		if (_p24.ctor === 'Nothing') {
			return room;
		} else {
			return A2(_mordrax$cotwelm$Dungeon_Room$removeEntrance, _p24._0, room);
		}
	});
var _mordrax$cotwelm$Dungeon_Clean$clean = function (_p25) {
	clean:
	while (true) {
		var _p26 = _p25;
		var _p32 = _p26.rooms;
		var _p31 = _p26;
		var _p27 = _p26.activePoints;
		if (_p27.ctor === '::') {
			if (_p27._0.ctor === 'ActiveRoom') {
				var _v17 = _elm_lang$core$Native_Utils.update(
					_p31,
					{
						rooms: {
							ctor: '::',
							_0: A2(_mordrax$cotwelm$Dungeon_Clean$cleanRoom, _p27._0._0, _p27._0._1),
							_1: _p32
						},
						activePoints: _p27._1
					});
				_p25 = _v17;
				continue clean;
			} else {
				var _p30 = _p27._0._0;
				var addCorridor = F2(
					function (c, m) {
						return _elm_lang$core$Native_Utils.update(
							m,
							{
								corridors: {ctor: '::', _0: c, _1: m.corridors}
							});
					});
				var _p28 = _mordrax$cotwelm$Dungeon_Corridor$end(_p30);
				var startPosition = _p28._0;
				var startDirection = _p28._1;
				var startDirectionVector = _mordrax$cotwelm$Utils_Vector$fromDirection(startDirection);
				var modelWithRemainingPoints = _elm_lang$core$Native_Utils.update(
					_p31,
					{activePoints: _p27._1});
				var modelWithInactiveCorridorRemainingPoints = _elm_lang$core$Native_Utils.update(
					modelWithRemainingPoints,
					{
						corridors: {ctor: '::', _0: _p30, _1: _p26.corridors}
					});
				var _p29 = A3(_mordrax$cotwelm$Dungeon_Clean$firstObstacle, startDirectionVector, startPosition, modelWithRemainingPoints);
				if (_p29._0.ctor === 'Nothing') {
					if (_p29._1.ctor === 'Nothing') {
						var _v19 = _elm_lang$core$Native_Utils.update(
							modelWithInactiveCorridorRemainingPoints,
							{
								rooms: {
									ctor: '::',
									_0: _mordrax$cotwelm$Dungeon_Room$newDeadEnd(
										A2(_mordrax$cotwelm$Utils_Vector$add, startPosition, startDirectionVector)),
									_1: _p32
								}
							});
						_p25 = _v19;
						continue clean;
					} else {
						var joinedCorridor_ = A2(_mordrax$cotwelm$Dungeon_Corridor$addEntrance, _p29._3, _p29._1._0);
						var corridor_ = A2(
							_mordrax$cotwelm$Dungeon_Corridor$add,
							{ctor: '_Tuple2', _0: _p29._2, _1: startDirection},
							_p30);
						var _v20 = A2(
							_mordrax$cotwelm$Dungeon_Clean$findAndUpdateCorridor,
							joinedCorridor_,
							A2(addCorridor, corridor_, modelWithRemainingPoints));
						_p25 = _v20;
						continue clean;
					}
				} else {
					var room_ = A2(
						_mordrax$cotwelm$Dungeon_Room$addEntrance,
						A2(_mordrax$cotwelm$Dungeon_Entrance$init, _mordrax$cotwelm$Dungeon_Entrance$Door, _p29._3),
						_p29._0._0);
					var corridor_ = A2(
						_mordrax$cotwelm$Dungeon_Corridor$add,
						{ctor: '_Tuple2', _0: _p29._2, _1: startDirection},
						_p30);
					var _v21 = A2(
						_mordrax$cotwelm$Dungeon_Clean$findAndUpdateRoom,
						room_,
						A2(addCorridor, corridor_, modelWithRemainingPoints));
					_p25 = _v21;
					continue clean;
				}
			}
		} else {
			return _mordrax$cotwelm$Dungeon_Clean$addWalls(_p31);
		}
	}
};

var _mordrax$cotwelm$Dungeon_DungeonGenerator$canFitRoom = F2(
	function (model, room) {
		var roomPositions = A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$List$map,
				_mordrax$cotwelm$Tile$position,
				_mordrax$cotwelm$Dungeon_Room$toTiles(room)),
			_mordrax$cotwelm$Dungeon_Room$boundary(room));
		var roomPositionSet = _elm_lang$core$Set$fromList(roomPositions);
		var withinBounds = A2(
			_elm_lang$core$List$all,
			function (x) {
				return A2(_mordrax$cotwelm$Dungeon_Rooms_Config$withinDungeonBounds, x, model.config);
			},
			roomPositions);
		var modelPositions = _elm_lang$core$Set$fromList(
			_mordrax$cotwelm$Dungeon_Types$toOccupied(model));
		var collisions = _elm_lang$core$Set$toList(
			A2(_elm_lang$core$Set$intersect, roomPositionSet, modelPositions));
		return withinBounds && _elm_lang$core$List$isEmpty(collisions);
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$canFitCorridor = F2(
	function (model, corridor) {
		var corridorPositions = A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$List$map,
				_mordrax$cotwelm$Tile$position,
				_mordrax$cotwelm$Dungeon_Corridor$toTiles(corridor)),
			_mordrax$cotwelm$Dungeon_Corridor$boundary(corridor));
		var withinBounds = A2(
			_elm_lang$core$List$all,
			function (x) {
				return A2(_mordrax$cotwelm$Dungeon_Rooms_Config$withinDungeonBounds, x, model.config);
			},
			corridorPositions);
		var occupiedPositions = _mordrax$cotwelm$Dungeon_Types$toOccupied(model);
		var inModelTiles = function (tile) {
			return A2(
				_elm_lang$core$List$any,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(tile),
				occupiedPositions);
		};
		var overlappingTiles = A2(_elm_lang$core$List$filter, inModelTiles, corridorPositions);
		var canFit = _elm_lang$core$List$isEmpty(overlappingTiles);
		return canFit && withinBounds;
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$generateRoom = F2(
	function (corridorEnding, config) {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			_mordrax$cotwelm$Dungeon_Room$placeRoom(corridorEnding),
			_mordrax$cotwelm$Dungeon_Room$generate(config));
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$generateEntrance = F2(
	function (room, _p0) {
		var _p1 = _p0;
		var _p4 = _p1;
		var mapEntranceToModel = function (_p2) {
			var _p3 = _p2;
			return _elm_lang$core$Native_Utils.update(
				_p4,
				{
					activePoints: {
						ctor: '::',
						_0: A2(
							_mordrax$cotwelm$Dungeon_Types$ActiveRoom,
							_p3._0,
							_elm_lang$core$Maybe$Just(_p3._1)),
						_1: _p4.activePoints
					}
				});
		};
		var modelWithActiveRoomRemoved = _elm_lang$core$Native_Utils.update(
			_p4,
			{
				rooms: {ctor: '::', _0: room, _1: _p4.rooms}
			});
		var isRoomAtMaxEntrances = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(
				_mordrax$cotwelm$Dungeon_Room$entrances(room)),
			_p1.config.maxEntrances) > -1;
		return isRoomAtMaxEntrances ? _mgold$elm_random_pcg$Random_Pcg$constant(modelWithActiveRoomRemoved) : A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			mapEntranceToModel,
			_mordrax$cotwelm$Dungeon_Room$generateEntrance(room));
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$generateActivePointFromCorridor = F2(
	function (corridor, model) {
		var corridorEnd = _mordrax$cotwelm$Dungeon_Corridor$end(corridor);
		var activeCorridor = A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (corridor) {
				return _mordrax$cotwelm$Dungeon_Types$ActiveCorridor(corridor);
			},
			A2(_mordrax$cotwelm$Dungeon_Corridor$extend, corridor, model.config));
		var activeRoom = A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (room) {
				return A2(_mordrax$cotwelm$Dungeon_Types$ActiveRoom, room, _elm_lang$core$Maybe$Nothing);
			},
			A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$generateRoom, corridorEnd, model.config));
		return _mgold$elm_random_pcg$Random_Pcg$choices(
			{
				ctor: '::',
				_0: activeRoom,
				_1: {
					ctor: '::',
					_0: activeCorridor,
					_1: {ctor: '[]'}
				}
			});
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$corridorStartFromRoomEntrance = F2(
	function (room, entrance) {
		var roomEntranceFacing = A2(_mordrax$cotwelm$Dungeon_Room$entranceFacing, room, entrance);
		var corridorEntranceFacing = _mordrax$cotwelm$Utils_Vector$oppositeDirection(roomEntranceFacing);
		var roomEntrancePosition = _mordrax$cotwelm$Dungeon_Entrance$position(entrance);
		var corridorStartPosition = A2(
			_mordrax$cotwelm$Utils_Vector$add,
			roomEntrancePosition,
			_mordrax$cotwelm$Utils_Vector$fromDirection(roomEntranceFacing));
		return {ctor: '_Tuple2', _0: corridorStartPosition, _1: corridorEntranceFacing};
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$step_ = function (_p5) {
	var _p6 = _p5;
	var _p13 = _p6;
	var _p7 = _p6.activePoints;
	if (_p7.ctor === '[]') {
		var addRoomToModel = function (room) {
			return _elm_lang$core$Native_Utils.update(
				_p13,
				{
					activePoints: {
						ctor: '::',
						_0: A2(_mordrax$cotwelm$Dungeon_Types$ActiveRoom, room, _elm_lang$core$Maybe$Nothing),
						_1: {ctor: '[]'}
					},
					rooms: {ctor: '[]'}
				});
		};
		return (_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(_p13.rooms),
			0) && _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(_p13.corridors),
			0)) ? A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			addRoomToModel,
			_mordrax$cotwelm$Dungeon_Room$generate(_p13.config)) : _mgold$elm_random_pcg$Random_Pcg$constant(_p13);
	} else {
		if (_p7._0.ctor === 'ActiveRoom') {
			if (_p7._0._1.ctor === 'Nothing') {
				return A2(
					_mordrax$cotwelm$Dungeon_DungeonGenerator$generateEntrance,
					_p7._0._0,
					_elm_lang$core$Native_Utils.update(
						_p13,
						{activePoints: _p7._1}));
			} else {
				var _p9 = _p7._0._0;
				var _p8 = A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$corridorStartFromRoomEntrance, _p9, _p7._0._1._0);
				var startPosition = _p8._0;
				var entranceFacing = _p8._1;
				var modelWithActiveRoom = function (corridor) {
					return _elm_lang$core$Native_Utils.update(
						_p13,
						{
							activePoints: {
								ctor: '::',
								_0: _mordrax$cotwelm$Dungeon_Types$ActiveCorridor(corridor),
								_1: {
									ctor: '::',
									_0: A2(_mordrax$cotwelm$Dungeon_Types$ActiveRoom, _p9, _elm_lang$core$Maybe$Nothing),
									_1: _p7._1
								}
							}
						});
				};
				var updateModel = function (corridor) {
					return A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$canFitCorridor, _p13, corridor) ? modelWithActiveRoom(corridor) : _p13;
				};
				return A2(
					_mgold$elm_random_pcg$Random_Pcg$map,
					updateModel,
					A3(_mordrax$cotwelm$Dungeon_Corridor$generate, startPosition, entranceFacing, _p13.config));
			}
		} else {
			var _p12 = _p7._1;
			var _p11 = _p7._0._0;
			var modelWithoutActiveCorridor = _elm_lang$core$Native_Utils.update(
				_p13,
				{activePoints: _p12});
			var modelWithInactiveCorridor = _elm_lang$core$Native_Utils.update(
				modelWithoutActiveCorridor,
				{
					corridors: {ctor: '::', _0: _p11, _1: _p13.corridors}
				});
			return A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				function (activePoint) {
					var _p10 = activePoint;
					if (_p10.ctor === 'ActiveCorridor') {
						return A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$canFitCorridor, modelWithoutActiveCorridor, _p10._0) ? _elm_lang$core$Native_Utils.update(
							modelWithoutActiveCorridor,
							{
								activePoints: {ctor: '::', _0: _p10, _1: _p12}
							}) : _p13;
					} else {
						return A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$canFitRoom, _p13, _p10._0) ? _elm_lang$core$Native_Utils.update(
							modelWithInactiveCorridor,
							{
								activePoints: {ctor: '::', _0: _p10, _1: _p12}
							}) : _p13;
					}
				},
				A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$generateActivePointFromCorridor, _p11, _p13));
		}
	}
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$step = function (model) {
	var printPoint = function (point) {
		var _p14 = point;
		if (_p14.ctor === 'ActiveRoom') {
			return _mordrax$cotwelm$Dungeon_Room$pp(_p14._0);
		} else {
			return _mordrax$cotwelm$Dungeon_Corridor$pp(_p14._0);
		}
	};
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$andThen,
		function (x) {
			return A2(
				_mgold$elm_random_pcg$Random_Pcg$andThen,
				_mgold$elm_random_pcg$Random_Pcg$constant,
				_mordrax$cotwelm$Dungeon_DungeonGenerator$step_(
					_elm_lang$core$Native_Utils.update(
						model,
						{activePoints: x})));
		},
		_mordrax$cotwelm$Lodash$shuffle(model.activePoints));
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$steps = F2(
	function (steps, model) {
		var oneStep = F2(
			function (_p15, gen) {
				return A2(_mgold$elm_random_pcg$Random_Pcg$andThen, _mordrax$cotwelm$Dungeon_DungeonGenerator$step, gen);
			});
		var _p16 = steps;
		if (_p16 === 0) {
			return _mgold$elm_random_pcg$Random_Pcg$constant(model);
		} else {
			return A3(
				_elm_lang$core$List$foldl,
				oneStep,
				_mgold$elm_random_pcg$Random_Pcg$constant(model),
				A2(_elm_lang$core$List$range, 0, _p16 - 1));
		}
	});
var _mordrax$cotwelm$Dungeon_DungeonGenerator$addStairs = function (model) {
	var addStairs = F2(
		function (stairs, model) {
			return _elm_lang$core$Native_Utils.update(
				model,
				{
					buildings: {ctor: '::', _0: stairs, _1: model.buildings}
				});
		});
	var downstairs = function (pos) {
		return A4(_mordrax$cotwelm$GameData_Building$new, _mordrax$cotwelm$GameData_Building$StairsDown, pos, 'DownStairs', _mordrax$cotwelm$GameData_Building$StairDown);
	};
	var upstairs = function (pos) {
		return A4(_mordrax$cotwelm$GameData_Building$new, _mordrax$cotwelm$GameData_Building$StairsUp, pos, 'UpStairs', _mordrax$cotwelm$GameData_Building$StairUp);
	};
	var makeUpDownStairs = function (floors) {
		var _p17 = floors;
		if ((_p17.ctor === '::') && (_p17._1.ctor === '::')) {
			return A2(
				addStairs,
				downstairs(_p17._1._0),
				A2(
					addStairs,
					upstairs(_p17._0),
					model));
		} else {
			return A2(_elm_lang$core$Debug$log, 'ERROR: Tis not good, dungeon does not have two tiles of floors.', model);
		}
	};
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		makeUpDownStairs,
		_mordrax$cotwelm$Lodash$shuffle(
			_elm_lang$core$List$concat(
				A2(_elm_lang$core$List$map, _mordrax$cotwelm$Dungeon_Room$floors, model.rooms))));
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$init = function (config) {
	return A6(
		_mordrax$cotwelm$Dungeon_Types$Model,
		config,
		{ctor: '[]'},
		{ctor: '[]'},
		{ctor: '[]'},
		{ctor: '[]'},
		{ctor: '[]'});
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$candidate = function (config) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_mordrax$cotwelm$Dungeon_Clean$clean,
		A2(
			_mordrax$cotwelm$Dungeon_DungeonGenerator$steps,
			200,
			_mordrax$cotwelm$Dungeon_DungeonGenerator$init(config)));
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$generate_ = function (config) {
	var fitness = function (model) {
		return _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(model.rooms),
			config.minRooms) > 0;
	};
	var regenerateIfNotFit = function (candidate) {
		return A2(
			_elm_lang$core$Debug$log,
			'Candidate fit?: ',
			fitness(candidate)) ? A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			_mordrax$cotwelm$Dungeon_DungeonGenerator$addStairs,
			_mgold$elm_random_pcg$Random_Pcg$constant(candidate)) : _mordrax$cotwelm$Dungeon_DungeonGenerator$generate_(config);
	};
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$andThen,
		regenerateIfNotFit,
		_mordrax$cotwelm$Dungeon_DungeonGenerator$candidate(config));
};
var _mordrax$cotwelm$Dungeon_DungeonGenerator$generate = function (config) {
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		_mordrax$cotwelm$Dungeon_Types$toLevel,
		_mordrax$cotwelm$Dungeon_DungeonGenerator$generate_(config));
};

var _mordrax$cotwelm$GameData_ASCIIMaps$dungeonLevelOneMap = {
	ctor: '::',
	_0: '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
	_1: {
		ctor: '::',
		_0: '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
		_1: {
			ctor: '::',
			_0: '^^^^^^^^^^^^^^^^^^^dooo^^ood^^^^^^^^^^^^^',
			_1: {
				ctor: '::',
				_0: '^^^^^^^^^^^^^^^^^doooooddooo^^^^^^^^^^^^^',
				_1: {
					ctor: '::',
					_0: '^^^^^^^^^^^^^^^^doddoooooooo^^^^^^^^^^^^^',
					_1: {
						ctor: '::',
						_0: '^^^^^^^^^^^^^^^dod^^oooo^ooo^^^^^^^^^^^^^',
						_1: {
							ctor: '::',
							_0: '^^^^^^^^^^^^^^^od^^^oooo^ooo^^^^^^^^^^^^^',
							_1: {
								ctor: '::',
								_0: '^^^^^^^^^^^^^^^o^^^^dooo^ooo^^^^^^^^^^^^^',
								_1: {
									ctor: '::',
									_0: '^^^^^^^^^^^^^^^o^^^^^dod^dod^^^^^^^^^^^^^',
									_1: {
										ctor: '::',
										_0: '^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^^^^',
										_1: {
											ctor: '::',
											_0: '^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^^',
											_1: {
												ctor: '::',
												_0: '^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^^^',
												_1: {
													ctor: '::',
													_0: '^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^^^^^',
													_1: {
														ctor: '::',
														_0: '^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^^^^^',
														_1: {
															ctor: '::',
															_0: '^^^^^^^^^^^^^^^^^^od^^^^^^^^^^^^^^^^^^^^^',
															_1: {
																ctor: '::',
																_0: '^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^^',
																_1: {
																	ctor: '::',
																	_0: '^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^^',
																	_1: {
																		ctor: '::',
																		_0: '^^^^^^^^^^^^^^^^^^^^dod^^^^^^^^^^^^^^^^^^',
																		_1: {
																			ctor: '::',
																			_0: '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^',
																			_1: {
																				ctor: '::',
																				_0: '^^^^^^^^^^^^dood^^^^^^o^^^^^^^^^^^^^^^^^^',
																				_1: {
																					ctor: '::',
																					_0: '^^^^^^^^^^^^ooood^^^^^o^^^^^^^^^^doood^^^',
																					_1: {
																						ctor: '::',
																						_0: '^^^^^^^^^^^^oooooo^^^^o^^^^^^^^^^ooooo^^^',
																						_1: {
																							ctor: '::',
																							_0: '^^^^^^^^^^^^dooooo^^^^o^^^^^^^^^^ooooo^^^',
																							_1: {
																								ctor: '::',
																								_0: '^^^^^^^^^^^^^o^^^^^^^^o^^^^^^^^^dooooo^^^',
																								_1: {
																									ctor: '::',
																									_0: '^^^^^^^^^^^^^o^^^^^^^^o^^^^^dooooooooo^^^',
																									_1: {
																										ctor: '::',
																										_0: '^^^^^^^^^^^^^o^^^^^^^^o^^^^dod^^^doooo^^^',
																										_1: {
																											ctor: '::',
																											_0: '^^^^^^^^^^^^^od^^^^^^^od^^dod^^^^^^^oo^^^',
																											_1: {
																												ctor: '::',
																												_0: '^^^^^^^^^^^^^dod^^^^^^doddod^^^^^^^ood^^^',
																												_1: {
																													ctor: '::',
																													_0: '^^^^^^^^^^^^^^dod^^^^^^dood^^^^^^^^^^^^^^',
																													_1: {
																														ctor: '::',
																														_0: '^^^^^^^^^^^^^^^do^^^^^^^o^^^^^^^^^^^^^^^^',
																														_1: {
																															ctor: '::',
																															_0: '^^^^^^^^^^^^^^^^od^^^^^^o^^^^^^^^^^^^^^^^',
																															_1: {
																																ctor: '::',
																																_0: '^^^^^^^^^^^^^^^^dod^^^^^o^^^^^^^^^^^^^^^^',
																																_1: {
																																	ctor: '::',
																																	_0: '^^^^^^^^^^^^^^^^^dod^^^do^^^^^^^^^^^^^^^^',
																																	_1: {
																																		ctor: '::',
																																		_0: '^^^^^^^^^^^^^^^^^^dod^^od^^^^^^^^^^^^^^^^',
																																		_1: {
																																			ctor: '::',
																																			_0: '^^^^^^^^^^^^^^^^^^^doddo^^^^^^^^^^^^^^^^^',
																																			_1: {
																																				ctor: '::',
																																				_0: '^^^^^^^^^^^^^^^^^^^^dood^^^^^^^^^^^^^^^^^',
																																				_1: {
																																					ctor: '::',
																																					_0: '^^^^^^^^^^^^^^^^^^^^^do^^^^^^^^^^^^^^^^^^',
																																					_1: {
																																						ctor: '::',
																																						_0: '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
																																						_1: {
																																							ctor: '::',
																																							_0: '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
																																							_1: {
																																								ctor: '::',
																																								_0: '^^^^^^^^^^^^^^^^^^^^^^o^^^^^^^^^^^^^^^^^^',
																																								_1: {
																																									ctor: '::',
																																									_0: '^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^',
																																									_1: {ctor: '[]'}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$GameData_ASCIIMaps$farmMap = {
	ctor: '::',
	_0: '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
	_1: {
		ctor: '::',
		_0: '^^^^^^^^^^^^^^^^^^^^^^^^#^^^^^^^^^^^^^^^^^^^^^^^^',
		_1: {
			ctor: '::',
			_0: '^^^^^^^^^^^^^^^^^^^^^^^^.^^^^^^^^^^^^^^^^^^^^^^^^',
			_1: {
				ctor: '::',
				_0: '^^^^^^^^^^^^^^^^^^^^^^^^.,,,^^^^^^^^^^^^^^^^^^^^^',
				_1: {
					ctor: '::',
					_0: '^^^^^^^^^^^^^^^^^^^^^^,,.,,,,,^^^^^^^^^^^^^^^^^^^',
					_1: {
						ctor: '::',
						_0: '^^^^^^^^^^^^^^^^^,,,,,,,.,,,,,,^^^^^^^^^^^^^^^^^^',
						_1: {
							ctor: '::',
							_0: '^^^^^^^^^^^^^^^^,,,,,,,,.,,,,,,,,,^^^^^^^^^^^^^^^',
							_1: {
								ctor: '::',
								_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
								_1: {
									ctor: '::',
									_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
									_1: {
										ctor: '::',
										_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
										_1: {
											ctor: '::',
											_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
											_1: {
												ctor: '::',
												_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
												_1: {
													ctor: '::',
													_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
													_1: {
														ctor: '::',
														_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
														_1: {
															ctor: '::',
															_0: ',,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,',
															_1: {
																ctor: '::',
																_0: '.................................................',
																_1: {
																	ctor: '::',
																	_0: '.................................................',
																	_1: {
																		ctor: '::',
																		_0: ',,,,,,,,,,,,,,,,,,,,,,,..;,,,,,,,,,,,,,,,,,,,,,,,',
																		_1: {
																			ctor: '::',
																			_0: ',,,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,',
																			_1: {
																				ctor: '::',
																				_0: ',,,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,=',
																				_1: {
																					ctor: '::',
																					_0: ',,,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,=',
																					_1: {
																						ctor: '::',
																						_0: ',,,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=',
																						_1: {
																							ctor: '::',
																							_0: ',,,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=',
																							_1: {
																								ctor: '::',
																								_0: ',,,,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,###,,=',
																								_1: {
																									ctor: '::',
																									_0: ',,,,,,,,,,,,,,,,;..........................###,,=',
																									_1: {
																										ctor: '::',
																										_0: ',,,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,###,,=',
																										_1: {
																											ctor: '::',
																											_0: ',,,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=',
																											_1: {
																												ctor: '::',
																												_0: ',,,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
																												_1: {
																													ctor: '::',
																													_0: ',,,,,,,,,,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
																													_1: {
																														ctor: '::',
																														_0: '========,,,;.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
																														_1: {
																															ctor: '::',
																															_0: '========,,,.;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,=======',
																															_1: {
																																ctor: '::',
																																_0: '========,,,.,,,,,=======,,,,,,,,,,,,,,,,,,=======',
																																_1: {
																																	ctor: '::',
																																	_0: '========,,###,,,,=======,,,,,,,,,,,,,,,,,,,,,,,,,',
																																	_1: {ctor: '[]'}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _mordrax$cotwelm$GameData_ASCIIMaps$villageMap = {
	ctor: '::',
	_0: '========,,###,,,========',
	_1: {
		ctor: '::',
		_0: '========,,,.,,,,========',
		_1: {
			ctor: '::',
			_0: '========,,,.,,,,========',
			_1: {
				ctor: '::',
				_0: '========,,,.,,,,========',
				_1: {
					ctor: '::',
					_0: '========,,,.,,,,========',
					_1: {
						ctor: '::',
						_0: '===,,,,,;...,,,!###=====',
						_1: {
							ctor: '::',
							_0: '===###!;.;,.,,;.###=====',
							_1: {
								ctor: '::',
								_0: '===###..;,,.,;.;###=====',
								_1: {
									ctor: '::',
									_0: '===###,,,,,...;,,,,,,===',
									_1: {
										ctor: '::',
										_0: '===,,,,,,,,.,,,,,,,,,===',
										_1: {
											ctor: '::',
											_0: '====,,,,,,,.,,,,,,,,,===',
											_1: {
												ctor: '::',
												_0: '====,,,,,,,.,,,,,,,,,===',
												_1: {
													ctor: '::',
													_0: '====,,,,,,,.,!###,,,,===',
													_1: {
														ctor: '::',
														_0: '====,,,##.....###,,,,===',
														_1: {
															ctor: '::',
															_0: '====,,,##!,.,,###,,,,===',
															_1: {
																ctor: '::',
																_0: '====,,,,,,,.,,,,,,,,,===',
																_1: {
																	ctor: '::',
																	_0: '====,,,,,,,.,,,,,,,,,===',
																	_1: {
																		ctor: '::',
																		_0: '====,,###!...!###,======',
																		_1: {
																			ctor: '::',
																			_0: '====,,###..e..###,======',
																			_1: {
																				ctor: '::',
																				_0: '====,,###,...,###,======',
																				_1: {
																					ctor: '::',
																					_0: '====,,,,,,,.,,,,,,======',
																					_1: {
																						ctor: '::',
																						_0: '====,,,,,,,.!,,,,,======',
																						_1: {
																							ctor: '::',
																							_0: '======,,,#####,=========',
																							_1: {
																								ctor: '::',
																								_0: '======,,,#####,=========',
																								_1: {
																									ctor: '::',
																									_0: '======,,,#####,=========',
																									_1: {
																										ctor: '::',
																										_0: '======,,,#####,=========',
																										_1: {
																											ctor: '::',
																											_0: '======,,,#####,=========',
																											_1: {
																												ctor: '::',
																												_0: '========================',
																												_1: {ctor: '[]'}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

var _mordrax$cotwelm$Game_Maps$tileNeighbours = F2(
	function (map, center) {
		var getTile = A2(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, map);
		var addTilePosition = _mordrax$cotwelm$Utils_Vector$add(center);
		var getNeighbour = function (_p0) {
			return getTile(
				addTilePosition(_p0));
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
var _mordrax$cotwelm$Game_Maps$buildingsOfArea = function (area) {
	var _p1 = area;
	switch (_p1.ctor) {
		case 'Village':
			var farmGate = A2(
				_mordrax$cotwelm$GameData_Building$newLink,
				_mordrax$cotwelm$GameData_Types$Farm,
				{ctor: '_Tuple2', _0: 11, _1: 31});
			return {
				ctor: '::',
				_0: A4(
					_mordrax$cotwelm$GameData_Building$new,
					_mordrax$cotwelm$GameData_Building$Gate,
					{ctor: '_Tuple2', _0: 10, _1: 0},
					'Village Gate',
					farmGate),
				_1: {
					ctor: '::',
					_0: A4(
						_mordrax$cotwelm$GameData_Building$new,
						_mordrax$cotwelm$GameData_Building$StrawHouseEast,
						{ctor: '_Tuple2', _0: 3, _1: 6},
						'Junk Shop',
						_mordrax$cotwelm$GameData_Building$Ordinary),
					_1: {
						ctor: '::',
						_0: A4(
							_mordrax$cotwelm$GameData_Building$new,
							_mordrax$cotwelm$GameData_Building$StrawHouseWest,
							{ctor: '_Tuple2', _0: 16, _1: 5},
							'Private House',
							_mordrax$cotwelm$GameData_Building$Ordinary),
						_1: {
							ctor: '::',
							_0: A4(
								_mordrax$cotwelm$GameData_Building$new,
								_mordrax$cotwelm$GameData_Building$Hut,
								{ctor: '_Tuple2', _0: 7, _1: 13},
								'Potion Store',
								_mordrax$cotwelm$GameData_Building$Shop(_mordrax$cotwelm$Shops$PotionStore)),
							_1: {
								ctor: '::',
								_0: A4(
									_mordrax$cotwelm$GameData_Building$new,
									_mordrax$cotwelm$GameData_Building$StrawHouseWest,
									{ctor: '_Tuple2', _0: 14, _1: 12},
									'Private House 2',
									_mordrax$cotwelm$GameData_Building$Ordinary),
								_1: {
									ctor: '::',
									_0: A4(
										_mordrax$cotwelm$GameData_Building$new,
										_mordrax$cotwelm$GameData_Building$StrawHouseEast,
										{ctor: '_Tuple2', _0: 6, _1: 17},
										'Weapon Shop',
										_mordrax$cotwelm$GameData_Building$Shop(_mordrax$cotwelm$Shops$WeaponSmith)),
									_1: {
										ctor: '::',
										_0: A4(
											_mordrax$cotwelm$GameData_Building$new,
											_mordrax$cotwelm$GameData_Building$StrawHouseWest,
											{ctor: '_Tuple2', _0: 14, _1: 17},
											'General Store',
											_mordrax$cotwelm$GameData_Building$Shop(_mordrax$cotwelm$Shops$GeneralStore)),
										_1: {
											ctor: '::',
											_0: A4(
												_mordrax$cotwelm$GameData_Building$new,
												_mordrax$cotwelm$GameData_Building$HutTemple,
												{ctor: '_Tuple2', _0: 9, _1: 22},
												'Odin\'s Temple',
												_mordrax$cotwelm$GameData_Building$Ordinary),
											_1: {
												ctor: '::',
												_0: A4(
													_mordrax$cotwelm$GameData_Building$new,
													_mordrax$cotwelm$GameData_Building$Well,
													{ctor: '_Tuple2', _0: 11, _1: 18},
													'Secret Entrance',
													A2(
														_mordrax$cotwelm$GameData_Building$newLink,
														_mordrax$cotwelm$GameData_Types$DungeonLevelOne,
														{ctor: '_Tuple2', _0: 25, _1: 3})),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			};
		case 'Farm':
			var mineExit = A2(
				_mordrax$cotwelm$GameData_Building$newLink,
				_mordrax$cotwelm$GameData_Types$DungeonLevelOne,
				{ctor: '_Tuple2', _0: 22, _1: 39});
			var villageGate = A2(
				_mordrax$cotwelm$GameData_Building$newLink,
				_mordrax$cotwelm$GameData_Types$Village,
				{ctor: '_Tuple2', _0: 11, _1: 1});
			return {
				ctor: '::',
				_0: A4(
					_mordrax$cotwelm$GameData_Building$new,
					_mordrax$cotwelm$GameData_Building$Gate,
					{ctor: '_Tuple2', _0: 10, _1: 32},
					'Farm Gate',
					villageGate),
				_1: {
					ctor: '::',
					_0: A4(
						_mordrax$cotwelm$GameData_Building$new,
						_mordrax$cotwelm$GameData_Building$StrawHouseWest,
						{ctor: '_Tuple2', _0: 43, _1: 23},
						'Adopted Parents House',
						_mordrax$cotwelm$GameData_Building$Ordinary),
					_1: {
						ctor: '::',
						_0: A4(
							_mordrax$cotwelm$GameData_Building$new,
							_mordrax$cotwelm$GameData_Building$MineEntrance,
							{ctor: '_Tuple2', _0: 24, _1: 1},
							'Mine Entrance',
							mineExit),
						_1: {ctor: '[]'}
					}
				}
			};
		case 'DungeonLevelOne':
			var mineEntrance = A2(
				_mordrax$cotwelm$GameData_Building$newLink,
				_mordrax$cotwelm$GameData_Types$Farm,
				{ctor: '_Tuple2', _0: 24, _1: 2});
			return {
				ctor: '::',
				_0: A4(
					_mordrax$cotwelm$GameData_Building$new,
					_mordrax$cotwelm$GameData_Building$MineEntrance,
					{ctor: '_Tuple2', _0: 22, _1: 40},
					'Mine Exit',
					mineEntrance),
				_1: {
					ctor: '::',
					_0: A4(
						_mordrax$cotwelm$GameData_Building$new,
						_mordrax$cotwelm$GameData_Building$StairsDown,
						{ctor: '_Tuple2', _0: 25, _1: 2},
						'Down stairs',
						_mordrax$cotwelm$GameData_Building$StairDown),
					_1: {ctor: '[]'}
				}
			};
		default:
			return {ctor: '[]'};
	}
};
var _mordrax$cotwelm$Game_Maps$getASCIIMap = function (area) {
	var _p2 = area;
	switch (_p2.ctor) {
		case 'Village':
			return _mordrax$cotwelm$GameData_ASCIIMaps$villageMap;
		case 'Farm':
			return _mordrax$cotwelm$GameData_ASCIIMaps$farmMap;
		case 'DungeonLevelOne':
			return _mordrax$cotwelm$GameData_ASCIIMaps$dungeonLevelOneMap;
		default:
			return {ctor: '[]'};
	}
};
var _mordrax$cotwelm$Game_Maps$currentLevel = function (model) {
	var _p3 = model.currentArea;
	switch (_p3.ctor) {
		case 'Village':
			return model.village;
		case 'Farm':
			return model.farm;
		case 'DungeonLevelOne':
			return model.abandonedMinesEntry;
		default:
			return A2(
				_elm_lang$core$Maybe$withDefault,
				model.abandonedMinesEntry,
				A2(_Skinney$elm_array_exploration$Array_Hamt$get, _p3._0, model.abandonedMines));
	}
};
var _mordrax$cotwelm$Game_Maps$getTile = F2(
	function (position, model) {
		var maybeTile = A2(
			_elm_lang$core$Dict$get,
			position,
			function (_) {
				return _.map;
			}(
				_mordrax$cotwelm$Game_Maps$currentLevel(model)));
		var _p4 = maybeTile;
		if (_p4.ctor === 'Just') {
			return _p4._0;
		} else {
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Could not find the tile the hero',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(position),
						' is standing on.')),
				A2(
					_mordrax$cotwelm$Tile$toTile,
					{ctor: '_Tuple2', _0: 0, _1: 0},
					_mordrax$cotwelm$Tile$Grass));
		}
	});
var _mordrax$cotwelm$Game_Maps$toScreenCoords = F2(
	function (map, mapSize) {
		var invertY = function (_p5) {
			var _p6 = _p5;
			var _p8 = _p6._0._1;
			var _p7 = _p6._0._0;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: _p7, _1: mapSize - _p8},
				_1: A2(
					_mordrax$cotwelm$Tile$setPosition,
					{ctor: '_Tuple2', _0: _p7, _1: mapSize - _p8},
					_p6._1)
			};
		};
		return _elm_lang$core$Dict$fromList(
			A2(
				_elm_lang$core$List$map,
				invertY,
				_elm_lang$core$Dict$toList(map)));
	});
var _mordrax$cotwelm$Game_Maps$toTiles = function (_p9) {
	return A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Tuple$second,
		_elm_lang$core$Dict$toList(_p9));
};
var _mordrax$cotwelm$Game_Maps$draw = F4(
	function (viewport, map, scale, onClick) {
		var withinViewport = function (tile) {
			return A3(
				_elm_lang$core$Basics$flip,
				_mordrax$cotwelm$Utils_Vector$boxIntersectVector,
				{
					ctor: '_Tuple2',
					_0: viewport.start,
					_1: A2(_mordrax$cotwelm$Utils_Vector$add, viewport.start, viewport.size)
				},
				_mordrax$cotwelm$Tile$position(tile));
		};
		var mapTiles = _mordrax$cotwelm$Game_Maps$toTiles(map);
		var neighbours = function (center) {
			return A2(_mordrax$cotwelm$Game_Maps$tileNeighbours, map, center);
		};
		var toHtml = function (tile) {
			return A4(
				_mordrax$cotwelm$Tile$view,
				tile,
				scale,
				neighbours(
					_mordrax$cotwelm$Tile$position(tile)),
				onClick);
		};
		return _elm_lang$core$List$concat(
			A2(
				_elm_lang$core$List$map,
				toHtml,
				A2(_elm_lang$core$List$filter, withinViewport, mapTiles)));
	});
var _mordrax$cotwelm$Game_Maps$fromTiles = function (tiles) {
	var toKVPair = function (tile) {
		return {
			ctor: '_Tuple2',
			_0: _mordrax$cotwelm$Tile$position(tile),
			_1: tile
		};
	};
	return _elm_lang$core$Dict$fromList(
		A2(_elm_lang$core$List$map, toKVPair, tiles));
};
var _mordrax$cotwelm$Game_Maps$view = F3(
	function (_p10, onClick, maps) {
		var _p11 = _p10;
		var level = _mordrax$cotwelm$Game_Maps$currentLevel(maps);
		var buildingsHtml = A2(_elm_lang$core$List$map, _mordrax$cotwelm$GameData_Building$view, level.buildings);
		var viewport = {start: _p11._0, size: _p11._1};
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			A2(
				_elm_lang$core$Basics_ops['++'],
				A4(_mordrax$cotwelm$Game_Maps$draw, viewport, level.map, 1.0, onClick),
				buildingsHtml));
	});
var _mordrax$cotwelm$Game_Maps$updateCurrentLevel = F2(
	function (level, model) {
		var _p12 = model.currentArea;
		switch (_p12.ctor) {
			case 'Village':
				return _elm_lang$core$Native_Utils.update(
					model,
					{village: level});
			case 'Farm':
				return _elm_lang$core$Native_Utils.update(
					model,
					{farm: level});
			case 'DungeonLevelOne':
				return _elm_lang$core$Native_Utils.update(
					model,
					{abandonedMinesEntry: level});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						abandonedMines: A3(_Skinney$elm_array_exploration$Array_Hamt$set, _p12._0, level, model.abandonedMines)
					});
		}
	});
var _mordrax$cotwelm$Game_Maps$updateArea = F2(
	function (area, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{currentArea: area});
	});
var _mordrax$cotwelm$Game_Maps$addMonstersToLevel = function (level) {
	var floors = _mordrax$cotwelm$Level$floors(level);
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$map,
		function (monsters) {
			return _elm_lang$core$Native_Utils.update(
				level,
				{monsters: monsters});
		},
		A2(
			_mgold$elm_random_pcg$Random_Pcg$andThen,
			_mordrax$cotwelm$Monster_Monster$randomMonsters,
			A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				_elm_lang$core$List$take(10),
				_mordrax$cotwelm$Lodash$shuffle(floors))));
};
var _mordrax$cotwelm$Game_Maps$downstairs = function (model) {
	var nextLevel = function () {
		var _p13 = model.currentArea;
		switch (_p13.ctor) {
			case 'DungeonLevelOne':
				return 0;
			case 'DungeonLevel':
				return _p13._0 + 1;
			default:
				return 0;
		}
	}();
	var _p14 = A2(_Skinney$elm_array_exploration$Array_Hamt$get, nextLevel, model.abandonedMines);
	if (_p14.ctor === 'Just') {
		return _mgold$elm_random_pcg$Random_Pcg$constant(
			_elm_lang$core$Native_Utils.update(
				model,
				{
					currentArea: _mordrax$cotwelm$GameData_Types$DungeonLevel(nextLevel)
				}));
	} else {
		return A2(
			_mgold$elm_random_pcg$Random_Pcg$map,
			function (abandonedMines) {
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						abandonedMines: abandonedMines,
						currentArea: _mordrax$cotwelm$GameData_Types$DungeonLevel(nextLevel)
					});
			},
			A2(
				_mgold$elm_random_pcg$Random_Pcg$map,
				function (level) {
					return A2(_Skinney$elm_array_exploration$Array_Hamt$push, level, model.abandonedMines);
				},
				A2(
					_mgold$elm_random_pcg$Random_Pcg$andThen,
					_mordrax$cotwelm$Game_Maps$addMonstersToLevel,
					_mordrax$cotwelm$Dungeon_DungeonGenerator$generate(_mordrax$cotwelm$Dungeon_Rooms_Config$init))));
	}
};
var _mordrax$cotwelm$Game_Maps$upstairs = function (model) {
	var modelWithArea = function (area) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{currentArea: area});
	};
	var _p15 = model.currentArea;
	if (_p15.ctor === 'DungeonLevel') {
		if (_p15._0 === 0) {
			return modelWithArea(_mordrax$cotwelm$GameData_Types$DungeonLevelOne);
		} else {
			return modelWithArea(
				_mordrax$cotwelm$GameData_Types$DungeonLevel(_p15._0 - 1));
		}
	} else {
		return modelWithArea(_mordrax$cotwelm$GameData_Types$Farm);
	}
};
var _mordrax$cotwelm$Game_Maps$update = F2(
	function (msg, model) {
		var _p16 = A2(_elm_lang$core$Debug$log, 'maps update', 1);
		return _elm_lang$core$Native_Utils.update(
			model,
			{currentArea: _mordrax$cotwelm$GameData_Types$Village});
	});
var _mordrax$cotwelm$Game_Maps$init = F2(
	function (armour, seed) {
		var darkDungeonWithArmour = A2(
			_mordrax$cotwelm$Tile$drop,
			armour,
			A2(
				_mordrax$cotwelm$Tile$toTile,
				{ctor: '_Tuple2', _0: 13, _1: 19},
				_mordrax$cotwelm$Tile$DarkDgn));
		var toKVPair = function (tile) {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Tile$position(tile),
				_1: tile
			};
		};
		var getTiles = function (area) {
			return _mordrax$cotwelm$Tile$mapToTiles(
				_mordrax$cotwelm$Game_Maps$getASCIIMap(area));
		};
		var mapOfArea = function (area) {
			return _elm_lang$core$Dict$fromList(
				A2(
					_elm_lang$core$List$map,
					toKVPair,
					getTiles(area)));
		};
		var levelOfArea = function (area) {
			return A3(
				_mordrax$cotwelm$Level$Level,
				mapOfArea(area),
				_mordrax$cotwelm$Game_Maps$buildingsOfArea(area),
				{ctor: '[]'});
		};
		var mineEntryLevel = levelOfArea(_mordrax$cotwelm$GameData_Types$DungeonLevelOne);
		var mineEntryLevelWithArmour = _elm_lang$core$Native_Utils.update(
			mineEntryLevel,
			{
				map: A3(
					_elm_lang$core$Dict$insert,
					{ctor: '_Tuple2', _0: 13, _1: 19},
					darkDungeonWithArmour,
					mineEntryLevel.map)
			});
		return {
			ctor: '_Tuple3',
			_0: {
				currentArea: _mordrax$cotwelm$GameData_Types$Village,
				abandonedMines: _Skinney$elm_array_exploration$Array_Hamt$fromList(
					{ctor: '[]'}),
				village: levelOfArea(_mordrax$cotwelm$GameData_Types$Village),
				farm: levelOfArea(_mordrax$cotwelm$GameData_Types$Farm),
				abandonedMinesEntry: mineEntryLevelWithArmour
			},
			_1: _elm_lang$core$Platform_Cmd$none,
			_2: seed
		};
	});
var _mordrax$cotwelm$Game_Maps$Model = F5(
	function (a, b, c, d, e) {
		return {currentArea: a, village: b, farm: c, abandonedMinesEntry: d, abandonedMines: e};
	});
var _mordrax$cotwelm$Game_Maps$GenerateDungeonLevel = function (a) {
	return {ctor: 'GenerateDungeonLevel', _0: a};
};

var _mordrax$cotwelm$Dungeon_Editor$updateMap = function (dungeonModel) {
	return _mordrax$cotwelm$Game_Maps$fromTiles(
		_mordrax$cotwelm$Dungeon_Types$toTiles(dungeonModel));
};
var _mordrax$cotwelm$Dungeon_Editor$generateCandidate = function (model) {
	var fitness = function (dungeonModel) {
		return _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(dungeonModel.rooms),
			model.config.minRooms) > 0;
	};
	var newCandidate = A2(
		_mordrax$cotwelm$Dungeon_DungeonGenerator$steps,
		200,
		_mordrax$cotwelm$Dungeon_DungeonGenerator$init(model.config));
	return A2(
		_mgold$elm_random_pcg$Random_Pcg$andThen,
		function (dungeonModel) {
			return fitness(dungeonModel) ? _mgold$elm_random_pcg$Random_Pcg$constant(dungeonModel) : _mordrax$cotwelm$Dungeon_Editor$generateCandidate(model);
		},
		A2(_mgold$elm_random_pcg$Random_Pcg$map, _mordrax$cotwelm$Dungeon_Clean$clean, newCandidate));
};
var _mordrax$cotwelm$Dungeon_Editor$init = {
	map: _elm_lang$core$Dict$empty,
	config: _mordrax$cotwelm$Dungeon_Rooms_Config$init,
	dungeonSteps: {ctor: '[]'}
};
var _mordrax$cotwelm$Dungeon_Editor$Model = F3(
	function (a, b, c) {
		return {map: a, config: b, dungeonSteps: c};
	});
var _mordrax$cotwelm$Dungeon_Editor$Noop = {ctor: 'Noop'};
var _mordrax$cotwelm$Dungeon_Editor$NewCandidate = {ctor: 'NewCandidate'};
var _mordrax$cotwelm$Dungeon_Editor$Clean = {ctor: 'Clean'};
var _mordrax$cotwelm$Dungeon_Editor$ResetMap = {ctor: 'ResetMap'};
var _mordrax$cotwelm$Dungeon_Editor$ConfigMsg = function (a) {
	return {ctor: 'ConfigMsg', _0: a};
};
var _mordrax$cotwelm$Dungeon_Editor$mapSizeView = function (model) {
	return A2(
		_elm_lang$html$Html$p,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$style(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'width', _1: '300px'},
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$map,
				_mordrax$cotwelm$Dungeon_Editor$ConfigMsg,
				_mordrax$cotwelm$Dungeon_Rooms_Config$dungeonSizeView(model.config)),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$map,
					_mordrax$cotwelm$Dungeon_Editor$ConfigMsg,
					_mordrax$cotwelm$Dungeon_Rooms_Config$roomsConfigView(model.config)),
				_1: {ctor: '[]'}
			}
		});
};
var _mordrax$cotwelm$Dungeon_Editor$Dungeon = function (a) {
	return {ctor: 'Dungeon', _0: a};
};
var _mordrax$cotwelm$Dungeon_Editor$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'NewCandidate':
				return {
					ctor: '_Tuple2',
					_0: model,
					_1: A2(
						_mgold$elm_random_pcg$Random_Pcg$generate,
						_mordrax$cotwelm$Dungeon_Editor$Dungeon,
						_mordrax$cotwelm$Dungeon_Editor$generateCandidate(model))
				};
			case 'Clean':
				var _p1 = _elm_lang$core$List$head(model.dungeonSteps);
				if (_p1.ctor === 'Just') {
					var cleanedModel = _mordrax$cotwelm$Dungeon_Clean$clean(_p1._0);
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								dungeonSteps: {ctor: '::', _0: cleanedModel, _1: model.dungeonSteps},
								map: _mordrax$cotwelm$Dungeon_Editor$updateMap(cleanedModel)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				}
			case 'GenerateMap':
				var dungeonModel = A2(
					_elm_lang$core$Maybe$withDefault,
					_mordrax$cotwelm$Dungeon_DungeonGenerator$init(model.config),
					_elm_lang$core$List$head(
						_elm_lang$core$List$reverse(model.dungeonSteps)));
				return {
					ctor: '_Tuple2',
					_0: model,
					_1: A2(
						_mgold$elm_random_pcg$Random_Pcg$generate,
						_mordrax$cotwelm$Dungeon_Editor$Dungeon,
						A2(_mordrax$cotwelm$Dungeon_DungeonGenerator$steps, _p0._0, dungeonModel))
				};
			case 'Dungeon':
				var _p2 = _p0._0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							dungeonSteps: {
								ctor: '::',
								_0: _p2,
								_1: {ctor: '[]'}
							},
							map: _mordrax$cotwelm$Dungeon_Editor$updateMap(_p2)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ConfigMsg':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							config: A2(_mordrax$cotwelm$Dungeon_Rooms_Config$update, _p0._0, model.config)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'ResetMap':
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							map: _elm_lang$core$Dict$empty,
							dungeonSteps: {ctor: '[]'}
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			default:
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _mordrax$cotwelm$Dungeon_Editor$GenerateMap = function (a) {
	return {ctor: 'GenerateMap', _0: a};
};
var _mordrax$cotwelm$Dungeon_Editor$view = function (model) {
	var clickTile = function (position) {
		return _mordrax$cotwelm$Dungeon_Editor$Noop;
	};
	var screenMap = A2(_mordrax$cotwelm$Game_Maps$toScreenCoords, model.map, model.config.dungeonSize);
	var border = {ctor: '_Tuple2', _0: 'border', _1: '1px solid black'};
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$button,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('ui button'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(
									_mordrax$cotwelm$Dungeon_Editor$GenerateMap(1)),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Step'),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$button,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui button'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Events$onClick(
										_mordrax$cotwelm$Dungeon_Editor$GenerateMap(50)),
									_1: {ctor: '[]'}
								}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('Step x50'),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$button,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('ui button'),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$Dungeon_Editor$Clean),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text('Clean'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$button,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('ui button'),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$Dungeon_Editor$ResetMap),
											_1: {ctor: '[]'}
										}
									},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Destroy!'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$button,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('ui button'),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$Dungeon_Editor$NewCandidate),
												_1: {ctor: '[]'}
											}
										},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('NewCandidate'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _mordrax$cotwelm$Dungeon_Editor$mapSizeView(model),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$style(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'position', _1: 'absolute'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'left', _1: '300px'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'top', _1: '0px'},
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					},
					A4(
						_mordrax$cotwelm$Game_Maps$draw,
						{
							start: {ctor: '_Tuple2', _0: 0, _1: 0},
							size: {ctor: '_Tuple2', _0: 100, _1: 100}
						},
						screenMap,
						model.config.mapScale,
						clickTile)),
				_1: {ctor: '[]'}
			}
		});
};

var _mordrax$cotwelm$Game_Keyboard$NoOp = {ctor: 'NoOp'};
var _mordrax$cotwelm$Game_Keyboard$keycodeToMsg = F2(
	function (keymap, code) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			_mordrax$cotwelm$Game_Keyboard$NoOp,
			function (x) {
				return A2(_elm_lang$core$Dict$get, x, keymap);
			}(
				A2(_elm_lang$core$Debug$log, 'keycode: ', code)));
	});
var _mordrax$cotwelm$Game_Keyboard$Walk = function (a) {
	return {ctor: 'Walk', _0: a};
};
var _mordrax$cotwelm$Game_Keyboard$GoUpstairs = {ctor: 'GoUpstairs'};
var _mordrax$cotwelm$Game_Keyboard$GoDownstairs = {ctor: 'GoDownstairs'};
var _mordrax$cotwelm$Game_Keyboard$Get = {ctor: 'Get'};
var _mordrax$cotwelm$Game_Keyboard$Examine = {ctor: 'Examine'};
var _mordrax$cotwelm$Game_Keyboard$RestMP = {ctor: 'RestMP'};
var _mordrax$cotwelm$Game_Keyboard$RestHp = {ctor: 'RestHp'};
var _mordrax$cotwelm$Game_Keyboard$ViewMap = {ctor: 'ViewMap'};
var _mordrax$cotwelm$Game_Keyboard$DisarmTrap = {ctor: 'DisarmTrap'};
var _mordrax$cotwelm$Game_Keyboard$Search = {ctor: 'Search'};
var _mordrax$cotwelm$Game_Keyboard$Close = {ctor: 'Close'};
var _mordrax$cotwelm$Game_Keyboard$Open = {ctor: 'Open'};
var _mordrax$cotwelm$Game_Keyboard$Inventory = {ctor: 'Inventory'};
var _mordrax$cotwelm$Game_Keyboard$Esc = {ctor: 'Esc'};
var _mordrax$cotwelm$Game_Keyboard$KeyDir = function (a) {
	return {ctor: 'KeyDir', _0: a};
};
var _mordrax$cotwelm$Game_Keyboard$playerKeymap = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 40,
			_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$N)
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 38,
				_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$S)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 37,
					_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$W)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 39,
						_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$E)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 36,
							_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$SW)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 33,
								_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$SE)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 35,
									_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$NW)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 34,
										_1: _mordrax$cotwelm$Game_Keyboard$KeyDir(_mordrax$cotwelm$Utils_Direction$NE)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 104,
											_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$S)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 102,
												_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$E)
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 98,
													_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$N)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 100,
														_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$W)
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 103,
															_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$SW)
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 105,
																_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$SE)
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 97,
																	_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$NW)
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 99,
																		_1: _mordrax$cotwelm$Game_Keyboard$Walk(_mordrax$cotwelm$Utils_Direction$NE)
																	},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 27, _1: _mordrax$cotwelm$Game_Keyboard$Esc},
																		_1: {
																			ctor: '::',
																			_0: {ctor: '_Tuple2', _0: 73, _1: _mordrax$cotwelm$Game_Keyboard$Inventory},
																			_1: {
																				ctor: '::',
																				_0: {ctor: '_Tuple2', _0: 79, _1: _mordrax$cotwelm$Game_Keyboard$Open},
																				_1: {
																					ctor: '::',
																					_0: {ctor: '_Tuple2', _0: 67, _1: _mordrax$cotwelm$Game_Keyboard$Close},
																					_1: {
																						ctor: '::',
																						_0: {ctor: '_Tuple2', _0: 83, _1: _mordrax$cotwelm$Game_Keyboard$Search},
																						_1: {
																							ctor: '::',
																							_0: {ctor: '_Tuple2', _0: 68, _1: _mordrax$cotwelm$Game_Keyboard$DisarmTrap},
																							_1: {
																								ctor: '::',
																								_0: {ctor: '_Tuple2', _0: 77, _1: _mordrax$cotwelm$Game_Keyboard$ViewMap},
																								_1: {
																									ctor: '::',
																									_0: {ctor: '_Tuple2', _0: 82, _1: _mordrax$cotwelm$Game_Keyboard$RestHp},
																									_1: {
																										ctor: '::',
																										_0: {ctor: '_Tuple2', _0: 82, _1: _mordrax$cotwelm$Game_Keyboard$RestMP},
																										_1: {
																											ctor: '::',
																											_0: {ctor: '_Tuple2', _0: 88, _1: _mordrax$cotwelm$Game_Keyboard$Examine},
																											_1: {
																												ctor: '::',
																												_0: {ctor: '_Tuple2', _0: 71, _1: _mordrax$cotwelm$Game_Keyboard$Get},
																												_1: {
																													ctor: '::',
																													_0: {ctor: '_Tuple2', _0: 190, _1: _mordrax$cotwelm$Game_Keyboard$GoDownstairs},
																													_1: {
																														ctor: '::',
																														_0: {ctor: '_Tuple2', _0: 188, _1: _mordrax$cotwelm$Game_Keyboard$GoUpstairs},
																														_1: {ctor: '[]'}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _mordrax$cotwelm$Game_Keyboard$subscription = _elm_lang$core$Platform_Sub$batch(
	{
		ctor: '::',
		_0: _elm_lang$keyboard$Keyboard$downs(
			_mordrax$cotwelm$Game_Keyboard$keycodeToMsg(_mordrax$cotwelm$Game_Keyboard$playerKeymap)),
		_1: {ctor: '[]'}
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
		{
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'pointer-events', _1: 'none'},
			_1: {ctor: '[]'}
		});
	var newPos = _mordrax$cotwelm$Utils_DragDrop$getDisplacement(_p9);
	var px = function (x) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px');
	};
	var positionStyle = _elm_lang$html$Html_Attributes$style(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'top',
				_1: px(newPos.y)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'left',
					_1: px(newPos.x)
				},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'position', _1: 'absolute'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'cursor', _1: 'move'},
						_1: {ctor: '[]'}
					}
				}
			}
		});
	var _p8 = _p9.dragging;
	if (_p8.ctor === 'Just') {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: positionStyle,
				_1: {
					ctor: '::',
					_0: pointerEventStyle,
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: _p8._0.html,
				_1: {ctor: '[]'}
			});
	} else {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{ctor: '[]'});
	}
};
var _mordrax$cotwelm$Utils_DragDrop$Model = F4(
	function (a, b, c, d) {
		return {source: a, target: b, position: c, dragging: d};
	});
var _mordrax$cotwelm$Utils_DragDrop$Dragging = F3(
	function (a, b, c) {
		return {start: a, current: b, html: c};
	});
var _mordrax$cotwelm$Utils_DragDrop$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Utils_DragDrop$init = _mordrax$cotwelm$Utils_DragDrop$A(
	{
		source: _elm_lang$core$Maybe$Nothing,
		target: _elm_lang$core$Maybe$Nothing,
		position: A2(_elm_lang$mouse$Mouse$Position, 0, 0),
		dragging: _elm_lang$core$Maybe$Nothing
	});
var _mordrax$cotwelm$Utils_DragDrop$update = F2(
	function (msg, _p10) {
		var _p11 = _p10;
		var _p15 = _p11._0;
		var atDrag = F3(
			function (source, html, pos) {
				return A4(
					_mordrax$cotwelm$Utils_DragDrop$Model,
					source,
					_p15.target,
					_p15.position,
					A2(
						_elm_lang$core$Maybe$map,
						function (_p12) {
							var _p13 = _p12;
							return A3(_mordrax$cotwelm$Utils_DragDrop$Dragging, _p13.start, pos, html);
						},
						_p15.dragging));
			});
		var startDrag = F3(
			function (source, html, pos) {
				return A4(
					_mordrax$cotwelm$Utils_DragDrop$Model,
					source,
					_p15.target,
					pos,
					_elm_lang$core$Maybe$Just(
						A3(_mordrax$cotwelm$Utils_DragDrop$Dragging, pos, pos, html)));
			});
		var _p14 = msg;
		switch (_p14.ctor) {
			case 'Start':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Utils_DragDrop$A(
						A3(startDrag, _p14._0, _p14._1, _p14._2)),
					_1: _elm_lang$core$Maybe$Nothing
				};
			case 'At':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Utils_DragDrop$A(
						A3(atDrag, _p14._0, _p14._1, _p14._2)),
					_1: _elm_lang$core$Maybe$Nothing
				};
			case 'End':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Utils_DragDrop$A(_p15),
					_1: _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple2', _0: _p14._0, _1: _p14._1})
				};
			case 'MouseOver':
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Utils_DragDrop$A(
						_elm_lang$core$Native_Utils.update(
							_p15,
							{target: _p14._0})),
					_1: _elm_lang$core$Maybe$Nothing
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Utils_DragDrop$A(
						_elm_lang$core$Native_Utils.update(
							_p15,
							{target: _elm_lang$core$Maybe$Nothing})),
					_1: _elm_lang$core$Maybe$Nothing
				};
		}
	});
var _mordrax$cotwelm$Utils_DragDrop$MouseLeave = {ctor: 'MouseLeave'};
var _mordrax$cotwelm$Utils_DragDrop$MouseOver = function (a) {
	return {ctor: 'MouseOver', _0: a};
};
var _mordrax$cotwelm$Utils_DragDrop$droppable = F3(
	function (dropTarget, _p16, html) {
		var _p17 = _p16;
		var mouseLeaveStyle = _elm_lang$html$Html_Events$onMouseLeave(_mordrax$cotwelm$Utils_DragDrop$MouseLeave);
		var target = _elm_lang$core$Maybe$Just(dropTarget);
		var borderStyle = _elm_lang$core$Native_Utils.eq(_p17._0.target, target) ? _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'border', _1: '1px solid'},
				_1: {ctor: '[]'}
			}) : _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'border', _1: 'none'},
				_1: {ctor: '[]'}
			});
		var mouseOverStyle = A2(
			_elm_lang$html$Html_Events$on,
			'mouseover',
			_elm_lang$core$Json_Decode$succeed(
				_mordrax$cotwelm$Utils_DragDrop$MouseOver(target)));
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: mouseOverStyle,
				_1: {
					ctor: '::',
					_0: mouseLeaveStyle,
					_1: {
						ctor: '::',
						_0: borderStyle,
						_1: {ctor: '[]'}
					}
				}
			},
			{
				ctor: '::',
				_0: html,
				_1: {ctor: '[]'}
			});
	});
var _mordrax$cotwelm$Utils_DragDrop$End = F3(
	function (a, b, c) {
		return {ctor: 'End', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Utils_DragDrop$At = F3(
	function (a, b, c) {
		return {ctor: 'At', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Utils_DragDrop$subscription = function (_p18) {
	var _p19 = _p18;
	var _p22 = _p19._0;
	var _p20 = _p22.source;
	if (_p20.ctor === 'Nothing') {
		return _elm_lang$core$Platform_Sub$none;
	} else {
		var _p21 = _p22.dragging;
		if (_p21.ctor === 'Just') {
			return _elm_lang$core$Platform_Sub$batch(
				{
					ctor: '::',
					_0: _elm_lang$mouse$Mouse$moves(
						A2(_mordrax$cotwelm$Utils_DragDrop$At, _p20, _p21._0.html)),
					_1: {
						ctor: '::',
						_0: _elm_lang$mouse$Mouse$ups(
							A2(_mordrax$cotwelm$Utils_DragDrop$End, _p22.source, _p22.target)),
						_1: {ctor: '[]'}
					}
				});
		} else {
			return _elm_lang$core$Platform_Sub$none;
		}
	}
};
var _mordrax$cotwelm$Utils_DragDrop$Start = F3(
	function (a, b, c) {
		return {ctor: 'Start', _0: a, _1: b, _2: c};
	});
var _mordrax$cotwelm$Utils_DragDrop$draggable = F3(
	function (draggableHtml, source, _p23) {
		var _p24 = _p23;
		var pointerEventStyle = function () {
			var _p25 = _p24._0.dragging;
			if (_p25.ctor === 'Just') {
				return _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'pointer-events', _1: 'none'},
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'pointer-events', _1: 'inherit'},
						_1: {ctor: '[]'}
					});
			}
		}();
		var onMouseDown = A3(
			_elm_lang$html$Html_Events$onWithOptions,
			'mousedown',
			{stopPropagation: true, preventDefault: true},
			A2(
				_elm_lang$core$Json_Decode$map,
				A2(
					_mordrax$cotwelm$Utils_DragDrop$Start,
					_elm_lang$core$Maybe$Just(source),
					draggableHtml),
				_elm_lang$mouse$Mouse$position));
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: onMouseDown,
				_1: {
					ctor: '::',
					_0: pointerEventStyle,
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: draggableHtml,
				_1: {ctor: '[]'}
			});
	});

var _mordrax$cotwelm$Pages_Inventory$viewPurse = function (_p0) {
	var _p1 = _p0;
	var coinView = function (_p2) {
		var _p3 = _p2;
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui grid'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('coins-copper cotw-item'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							_elm_lang$core$Basics$toString(_p3.copper)),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('coins-silver cotw-item'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								_elm_lang$core$Basics$toString(_p3.silver)),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('coins-gold cotw-item'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									_elm_lang$core$Basics$toString(_p3.gold)),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('coins-platinum cotw-item'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(
										_elm_lang$core$Basics$toString(_p3.platinum)),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	};
	return A2(
		_elm_lang$core$Maybe$withDefault,
		A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{ctor: '[]'}),
		A2(
			_elm_lang$core$Maybe$map,
			coinView,
			A2(
				_elm_lang$core$Maybe$map,
				function (_) {
					return _.coins;
				},
				_mordrax$cotwelm$Equipment$getPurse(_p1.equipment))));
};
var _mordrax$cotwelm$Pages_Inventory$viewPackInfo = function (maybeItem) {
	var _p4 = maybeItem;
	if (_p4.ctor === 'Just') {
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
		var _p5 = _mordrax$cotwelm$Item_Pack$info(_p4._0);
		var cur = _p5._0;
		var cap = _p5._1;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A3(print, 'Bulk', cur.bulk, cap.maxBulk),
			A2(
				_elm_lang$core$Basics_ops['++'],
				', ',
				A3(print, 'Weight', cur.weight, cap.maxWeight)));
	} else {
		return '';
	}
};
var _mordrax$cotwelm$Pages_Inventory$Model = F3(
	function (a, b, c) {
		return {dnd: a, merchant: b, equipment: c};
	});
var _mordrax$cotwelm$Pages_Inventory$A = function (a) {
	return {ctor: 'A', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$init = F2(
	function (merchant, equipment) {
		return _mordrax$cotwelm$Pages_Inventory$A(
			{dnd: _mordrax$cotwelm$Utils_DragDrop$init, merchant: merchant, equipment: equipment});
	});
var _mordrax$cotwelm$Pages_Inventory$Ground = function (a) {
	return {ctor: 'Ground', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$Shop = function (a) {
	return {ctor: 'Shop', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$transactWithMerchant = F2(
	function (item, _p6) {
		var _p7 = _p6;
		var _p13 = _p7;
		var _p12 = _p7.equipment;
		var updateModelFromPurchase = function (_p8) {
			var _p9 = _p8;
			return _elm_lang$core$Result$Ok(
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						_p13,
						{
							merchant: _mordrax$cotwelm$Pages_Inventory$Shop(_p9._0),
							equipment: A2(_mordrax$cotwelm$Equipment$setPurse, _p9._1, _p12)
						}),
					_1: item
				});
		};
		var maybePurse = _mordrax$cotwelm$Equipment$getPurse(_p12);
		var buyFrom = function (shop) {
			var _p10 = maybePurse;
			if (_p10.ctor === 'Just') {
				return A3(_mordrax$cotwelm$Shops$sell, item, _p10._0, shop);
			} else {
				return _elm_lang$core$Result$Err('No purse to buy anything with!');
			}
		};
		var _p11 = _p7.merchant;
		if (_p11.ctor === 'Shop') {
			return A2(
				_elm_lang$core$Result$andThen,
				updateModelFromPurchase,
				buyFrom(_p11._0));
		} else {
			var container_ = A2(_mordrax$cotwelm$Container$remove, item, _p11._0);
			return _elm_lang$core$Result$Ok(
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						_p13,
						{
							merchant: _mordrax$cotwelm$Pages_Inventory$Ground(container_)
						}),
					_1: item
				});
		}
	});
var _mordrax$cotwelm$Pages_Inventory$handleDrag = F2(
	function (draggable, model) {
		var _p14 = draggable;
		switch (_p14.ctor) {
			case 'DragSlot':
				var unequipRes = A2(_mordrax$cotwelm$Equipment$unequip, _p14._1, model.equipment);
				var _p15 = unequipRes;
				if (_p15.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{equipment: _p15._0}),
							_1: _p14._0
						});
				} else {
					return _elm_lang$core$Result$Err(_p15._0);
				}
			case 'DragPack':
				var _p17 = _p14._0;
				var _p16 = A2(_elm_lang$core$Debug$log, 'TODO: Remove item from the pack.container and return just the item', 1);
				var modelItemRemoved = _elm_lang$core$Native_Utils.update(
					model,
					{
						equipment: A2(_mordrax$cotwelm$Equipment$removeFromPack, _p17, model.equipment)
					});
				return _elm_lang$core$Result$Ok(
					{ctor: '_Tuple2', _0: modelItemRemoved, _1: _p17});
			default:
				return A2(_mordrax$cotwelm$Pages_Inventory$transactWithMerchant, _p14._0, model);
		}
	});
var _mordrax$cotwelm$Pages_Inventory$handleDrop = F3(
	function (droppable, item, model) {
		var _p18 = droppable;
		switch (_p18.ctor) {
			case 'DropPack':
				var _p19 = A2(_mordrax$cotwelm$Equipment$putInPack, item, model.equipment);
				var equipment_ = _p19._0;
				var equipMsg = _p19._1;
				var success = _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						model,
						{equipment: equipment_}));
				var _p20 = equipMsg;
				switch (_p20.ctor) {
					case 'Success':
						return success;
					case 'NoPackEquipped':
						return _elm_lang$core$Result$Err('Can\'t add to the pack. No packed equipped!');
					case 'ContainerMsg':
						if (_p20._0.ctor === 'Ok') {
							return success;
						} else {
							return _elm_lang$core$Result$Err(
								A2(
									_elm_lang$core$Basics_ops['++'],
									'Dropping into pack with unhandled item msg',
									_elm_lang$core$Basics$toString(_p20._0)));
						}
					default:
						return _elm_lang$core$Result$Err(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Dropping into pack failed with unhanded msg: ',
								_elm_lang$core$Basics$toString(_p20)));
				}
			case 'DropEquipment':
				var _p21 = A2(
					_mordrax$cotwelm$Equipment$equip,
					{ctor: '_Tuple2', _0: _p18._0, _1: item},
					model.equipment);
				if (_p21.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							model,
							{equipment: _p21._0}));
				} else {
					return _elm_lang$core$Result$Err(
						_elm_lang$core$Basics$toString(_p21._0));
				}
			default:
				var sellTo = F2(
					function (shop, purse) {
						var _p22 = A3(_mordrax$cotwelm$Shops$buy, item, purse, shop);
						var shopAfterBought = _p22._0;
						var purseAfterPaid = _p22._1;
						return _elm_lang$core$Result$Ok(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									merchant: _mordrax$cotwelm$Pages_Inventory$Shop(shopAfterBought),
									equipment: A2(_mordrax$cotwelm$Equipment$setPurse, purseAfterPaid, model.equipment)
								}));
					});
				var getPurseResult = A2(
					_elm_lang$core$Result$fromMaybe,
					'No purse to hold coins!',
					_mordrax$cotwelm$Equipment$getPurse(model.equipment));
				var _p23 = _p18._0;
				if (_p23.ctor === 'Shop') {
					return A2(
						_elm_lang$core$Result$andThen,
						sellTo(_p23._0),
						getPurseResult);
				} else {
					var _p24 = A2(_mordrax$cotwelm$Container$add, item, _p23._0);
					var container_ = _p24._0;
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								merchant: _mordrax$cotwelm$Pages_Inventory$Ground(container_)
							}));
				}
		}
	});
var _mordrax$cotwelm$Pages_Inventory$handleDragDrop = F3(
	function (dragSource, dropTarget, model) {
		var noChange = model;
		var handleDrop_ = F2(
			function (item, modelWithDrag) {
				var _p25 = A3(_mordrax$cotwelm$Pages_Inventory$handleDrop, dropTarget, item, modelWithDrag);
				if (_p25.ctor === 'Ok') {
					return _p25._0;
				} else {
					var _p26 = A2(_elm_lang$core$Debug$log, 'Drop failed: ', _p25._0);
					return noChange;
				}
			});
		var dragResult = A2(_mordrax$cotwelm$Pages_Inventory$handleDrag, dragSource, model);
		var _p27 = dragResult;
		if (_p27.ctor === 'Ok') {
			return A2(handleDrop_, _p27._0._1, _p27._0._0);
		} else {
			var _p28 = A2(_elm_lang$core$Debug$log, 'Drag failed: ', _p27._0);
			return noChange;
		}
	});
var _mordrax$cotwelm$Pages_Inventory$update = F2(
	function (msg, _p29) {
		var _p30 = _p29;
		var _p34 = _p30._0;
		var _p31 = msg;
		if (_p31.ctor === 'DnDMsg') {
			var modelNewDnD = _elm_lang$core$Native_Utils.update(
				_p34,
				{dnd: _mordrax$cotwelm$Utils_DragDrop$init});
			var _p32 = A2(_mordrax$cotwelm$Utils_DragDrop$update, _p31._0, _p34.dnd);
			var dnd_ = _p32._0;
			var end = _p32._1;
			var _p33 = end;
			if (_p33.ctor === 'Nothing') {
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Pages_Inventory$A(
						_elm_lang$core$Native_Utils.update(
							_p34,
							{dnd: dnd_})),
					_1: _elm_lang$core$Maybe$Nothing
				};
			} else {
				if (_p33._0._0.ctor === 'Nothing') {
					return {
						ctor: '_Tuple2',
						_0: _mordrax$cotwelm$Pages_Inventory$A(modelNewDnD),
						_1: _elm_lang$core$Maybe$Nothing
					};
				} else {
					if (_p33._0._1.ctor === 'Nothing') {
						return {
							ctor: '_Tuple2',
							_0: _mordrax$cotwelm$Pages_Inventory$A(modelNewDnD),
							_1: _elm_lang$core$Maybe$Nothing
						};
					} else {
						return {
							ctor: '_Tuple2',
							_0: _mordrax$cotwelm$Pages_Inventory$A(
								A3(_mordrax$cotwelm$Pages_Inventory$handleDragDrop, _p33._0._0._0, _p33._0._1._0, modelNewDnD)),
							_1: _elm_lang$core$Maybe$Nothing
						};
					}
				}
			}
		} else {
			if (_p31._0.ctor === 'Esc') {
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Pages_Inventory$A(_p34),
					_1: _elm_lang$core$Maybe$Just(
						{ctor: '_Tuple2', _0: _p34.equipment, _1: _p34.merchant})
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Pages_Inventory$A(_p34),
					_1: _elm_lang$core$Maybe$Nothing
				};
			}
		}
	});
var _mordrax$cotwelm$Pages_Inventory$DragMerchant = F2(
	function (a, b) {
		return {ctor: 'DragMerchant', _0: a, _1: b};
	});
var _mordrax$cotwelm$Pages_Inventory$DragPack = F2(
	function (a, b) {
		return {ctor: 'DragPack', _0: a, _1: b};
	});
var _mordrax$cotwelm$Pages_Inventory$viewContainer = F2(
	function (pack, _p35) {
		var _p36 = _p35;
		var makeDraggable = F2(
			function (pack, item) {
				return A3(
					_mordrax$cotwelm$Utils_DragDrop$draggable,
					_mordrax$cotwelm$Item_Item$view(item),
					A2(_mordrax$cotwelm$Pages_Inventory$DragPack, item, pack),
					_p36.dnd);
			});
		var items = _mordrax$cotwelm$Equipment$getPackContent(_p36.equipment);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui cards'),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$List$map,
				makeDraggable(pack),
				items));
	});
var _mordrax$cotwelm$Pages_Inventory$DragSlot = F2(
	function (a, b) {
		return {ctor: 'DragSlot', _0: a, _1: b};
	});
var _mordrax$cotwelm$Pages_Inventory$DropMerchant = function (a) {
	return {ctor: 'DropMerchant', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$viewGround = F2(
	function (container, dnd) {
		var makeDraggable = F2(
			function (ground, item) {
				return A3(
					_mordrax$cotwelm$Utils_DragDrop$draggable,
					_mordrax$cotwelm$Item_Item$view(item),
					A2(
						_mordrax$cotwelm$Pages_Inventory$DragMerchant,
						item,
						_mordrax$cotwelm$Pages_Inventory$Ground(container)),
					dnd);
			});
		var items = _mordrax$cotwelm$Container$list(container);
		var styles = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'background', _1: 'lightblue'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'min-height', _1: '100px'},
					_1: {ctor: '[]'}
				}
			});
		var droppableDiv = A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui cards'),
				_1: {
					ctor: '::',
					_0: styles,
					_1: {ctor: '[]'}
				}
			},
			A2(
				_elm_lang$core$List$map,
				makeDraggable(container),
				items));
		var droppableGround = A3(
			_mordrax$cotwelm$Utils_DragDrop$droppable,
			_mordrax$cotwelm$Pages_Inventory$DropMerchant(
				_mordrax$cotwelm$Pages_Inventory$Ground(container)),
			dnd,
			droppableDiv);
		return droppableGround;
	});
var _mordrax$cotwelm$Pages_Inventory$viewShop = F2(
	function (shop, dnd) {
		var makeDraggable = F2(
			function (shop, item) {
				return A3(
					_mordrax$cotwelm$Utils_DragDrop$draggable,
					_mordrax$cotwelm$Item_Item$view(item),
					A2(
						_mordrax$cotwelm$Pages_Inventory$DragMerchant,
						item,
						_mordrax$cotwelm$Pages_Inventory$Shop(shop)),
					dnd);
			});
		var wares = _mordrax$cotwelm$Shops$wares(shop);
		var droppableDiv = A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui cards'),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$List$map,
				makeDraggable(shop),
				wares));
		var droppableShop = A3(
			_mordrax$cotwelm$Utils_DragDrop$droppable,
			_mordrax$cotwelm$Pages_Inventory$DropMerchant(
				_mordrax$cotwelm$Pages_Inventory$Shop(shop)),
			dnd,
			droppableDiv);
		return droppableShop;
	});
var _mordrax$cotwelm$Pages_Inventory$DropEquipment = function (a) {
	return {ctor: 'DropEquipment', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$viewEquipment = F2(
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
					A2(_mordrax$cotwelm$Pages_Inventory$DragSlot, item, slot),
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
			var _p37 = getEquipment(slot);
			if (_p37.ctor === 'Just') {
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('three wide column equipmentSlot'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(drawItem, _p37._0, slot),
						_1: {ctor: '[]'}
					});
			} else {
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('three wide column equipmentSlot'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(
							_mordrax$cotwelm$Utils_DragDrop$droppable,
							_mordrax$cotwelm$Pages_Inventory$DropEquipment(slot),
							dnd,
							A2(
								_elm_lang$html$Html$div,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(slotName),
									_1: {ctor: '[]'}
								})),
						_1: {ctor: '[]'}
					});
			}
		};
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui grid'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: drawSlot(_mordrax$cotwelm$Equipment$WeaponSlot),
				_1: {
					ctor: '::',
					_0: drawSlot(_mordrax$cotwelm$Equipment$FreehandSlot),
					_1: {
						ctor: '::',
						_0: drawSlot(_mordrax$cotwelm$Equipment$ArmourSlot),
						_1: {
							ctor: '::',
							_0: drawSlot(_mordrax$cotwelm$Equipment$ShieldSlot),
							_1: {
								ctor: '::',
								_0: drawSlot(_mordrax$cotwelm$Equipment$HelmetSlot),
								_1: {
									ctor: '::',
									_0: drawSlot(_mordrax$cotwelm$Equipment$BracersSlot),
									_1: {
										ctor: '::',
										_0: drawSlot(_mordrax$cotwelm$Equipment$GauntletsSlot),
										_1: {
											ctor: '::',
											_0: drawSlot(_mordrax$cotwelm$Equipment$BeltSlot),
											_1: {
												ctor: '::',
												_0: drawSlot(_mordrax$cotwelm$Equipment$PurseSlot),
												_1: {
													ctor: '::',
													_0: drawSlot(_mordrax$cotwelm$Equipment$PackSlot),
													_1: {
														ctor: '::',
														_0: drawSlot(_mordrax$cotwelm$Equipment$NeckwearSlot),
														_1: {
															ctor: '::',
															_0: drawSlot(_mordrax$cotwelm$Equipment$OvergarmentSlot),
															_1: {
																ctor: '::',
																_0: drawSlot(_mordrax$cotwelm$Equipment$LeftRingSlot),
																_1: {
																	ctor: '::',
																	_0: drawSlot(_mordrax$cotwelm$Equipment$RightRingSlot),
																	_1: {
																		ctor: '::',
																		_0: drawSlot(_mordrax$cotwelm$Equipment$BootsSlot),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var _mordrax$cotwelm$Pages_Inventory$DropPack = function (a) {
	return {ctor: 'DropPack', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$viewPack = F2(
	function (maybePack, _p38) {
		var _p39 = _p38;
		var packStyle = _elm_lang$html$Html_Attributes$style(
			{
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'background', _1: 'lightblue'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'min-height', _1: '100px'},
					_1: {ctor: '[]'}
				}
			});
		var droppableHtml = function (pack) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: packStyle,
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(_mordrax$cotwelm$Pages_Inventory$viewContainer, pack, _p39),
					_1: {ctor: '[]'}
				});
		};
		var _p40 = maybePack;
		if (_p40.ctor === 'Just') {
			var _p41 = _p40._0;
			return A3(
				_mordrax$cotwelm$Utils_DragDrop$droppable,
				_mordrax$cotwelm$Pages_Inventory$DropPack(_p41),
				_p39.dnd,
				droppableHtml(_p41));
		} else {
			return A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('You have no pack! Equip a pack to use this space.'),
					_1: {ctor: '[]'}
				});
		}
	});
var _mordrax$cotwelm$Pages_Inventory$Keyboard = function (a) {
	return {ctor: 'Keyboard', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$keyboardToInventoryMsg = function (msg) {
	return _mordrax$cotwelm$Pages_Inventory$Keyboard(msg);
};
var _mordrax$cotwelm$Pages_Inventory$DnDMsg = function (a) {
	return {ctor: 'DnDMsg', _0: a};
};
var _mordrax$cotwelm$Pages_Inventory$viewShopPackPurse = function (_p42) {
	var _p43 = _p42;
	var _p46 = _p43;
	var _p45 = _p43.dnd;
	var maybePack = _mordrax$cotwelm$Equipment$getPack(_p43.equipment);
	var columnWidth = F2(
		function (width, children) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$Basics_ops['++'], width, ' wide column')),
					_1: {ctor: '[]'}
				},
				children);
		});
	var header = function (title) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui block header'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(title),
				_1: {ctor: '[]'}
			});
	};
	var groundHtml = function (container) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: header('Ground'),
				_1: {
					ctor: '::',
					_0: A2(_mordrax$cotwelm$Pages_Inventory$viewGround, container, _p45),
					_1: {ctor: '[]'}
				}
			});
	};
	var shopHtml = function (shop) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: header('Shop'),
				_1: {
					ctor: '::',
					_0: A2(_mordrax$cotwelm$Pages_Inventory$viewShop, shop, _p45),
					_1: {ctor: '[]'}
				}
			});
	};
	var shopGroundHtml = function () {
		var _p44 = _p43.merchant;
		if (_p44.ctor === 'Shop') {
			return shopHtml(_p44._0);
		} else {
			return groundHtml(_p44._0);
		}
	}();
	var packHtml = A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: header(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Pack: (',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_mordrax$cotwelm$Pages_Inventory$viewPackInfo(maybePack),
						')'))),
			_1: {
				ctor: '::',
				_0: A2(_mordrax$cotwelm$Pages_Inventory$viewPack, maybePack, _p46),
				_1: {ctor: '[]'}
			}
		});
	var purseHtml = A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: header('Purse'),
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Pages_Inventory$viewPurse(_p46),
				_1: {ctor: '[]'}
			}
		});
	return A2(
		_elm_lang$html$Html$map,
		_mordrax$cotwelm$Pages_Inventory$DnDMsg,
		A2(
			columnWidth,
			'ten',
			{
				ctor: '::',
				_0: shopGroundHtml,
				_1: {
					ctor: '::',
					_0: packHtml,
					_1: {
						ctor: '::',
						_0: purseHtml,
						_1: {ctor: '[]'}
					}
				}
			}));
};
var _mordrax$cotwelm$Pages_Inventory$view = function (_p47) {
	var _p48 = _p47;
	var _p49 = _p48._0.dnd;
	var columnWidth = F2(
		function (width, children) {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class(
						A2(_elm_lang$core$Basics_ops['++'], width, ' wide column')),
					_1: {ctor: '[]'}
				},
				children);
		});
	var equipmentColumn = A2(
		columnWidth,
		'six',
		{
			ctor: '::',
			_0: A2(_mordrax$cotwelm$Pages_Inventory$viewEquipment, _p48._0.equipment, _p49),
			_1: {ctor: '[]'}
		});
	var heading = function (title) {
		return A2(
			_elm_lang$html$Html$span,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui text container segment'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(title),
				_1: {ctor: '[]'}
			});
	};
	var header = function (title) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('ui block header'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(title),
				_1: {ctor: '[]'}
			});
	};
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: heading('Inventory screen'),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('ui two column grid'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_elm_lang$html$Html$map, _mordrax$cotwelm$Pages_Inventory$DnDMsg, equipmentColumn),
						_1: {
							ctor: '::',
							_0: _mordrax$cotwelm$Pages_Inventory$viewShopPackPurse(_p48._0),
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$map,
						_mordrax$cotwelm$Pages_Inventory$DnDMsg,
						_mordrax$cotwelm$Utils_DragDrop$view(_p49)),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _mordrax$cotwelm$Pages_Inventory$subscription = function (_p50) {
	var _p51 = _p50;
	return A2(
		_elm_lang$core$Platform_Sub$map,
		_mordrax$cotwelm$Pages_Inventory$DnDMsg,
		_mordrax$cotwelm$Utils_DragDrop$subscription(_p51._0.dnd));
};

var _mordrax$cotwelm$Game_Game$simpleBtn = function (txt) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('ui button'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(txt),
			_1: {ctor: '[]'}
		});
};
var _mordrax$cotwelm$Game_Game$viewBuilding = function (building) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$h1,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('TODO: Get the internal view of the building'),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
};
var _mordrax$cotwelm$Game_Game$viewHUD = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('messages'),
			_1: {ctor: '[]'}
		});
};
var _mordrax$cotwelm$Game_Game$viewQuickMenu = A2(
	_elm_lang$html$Html$div,
	{ctor: '[]'},
	A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Game_Game$simpleBtn,
		{
			ctor: '::',
			_0: 'Get',
			_1: {
				ctor: '::',
				_0: 'Free Hand',
				_1: {
					ctor: '::',
					_0: 'Search',
					_1: {
						ctor: '::',
						_0: 'Disarm',
						_1: {
							ctor: '::',
							_0: 'Rest',
							_1: {
								ctor: '::',
								_0: 'Save',
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}));
var _mordrax$cotwelm$Game_Game$viewMenu = A2(
	_elm_lang$html$Html$div,
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$class('ui buttons'),
		_1: {ctor: '[]'}
	},
	A2(
		_elm_lang$core$List$map,
		_mordrax$cotwelm$Game_Game$simpleBtn,
		{
			ctor: '::',
			_0: 'File',
			_1: {
				ctor: '::',
				_0: 'Character!',
				_1: {
					ctor: '::',
					_0: 'Inventory!',
					_1: {
						ctor: '::',
						_0: 'Map!',
						_1: {
							ctor: '::',
							_0: 'Spells',
							_1: {
								ctor: '::',
								_0: 'Activate',
								_1: {
									ctor: '::',
									_0: 'Verbs',
									_1: {
										ctor: '::',
										_0: 'Options',
										_1: {
											ctor: '::',
											_0: 'Window',
											_1: {
												ctor: '::',
												_0: 'Help',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}));
var _mordrax$cotwelm$Game_Game$viewMessages = function (model) {
	var msg = function (txt) {
		return A2(
			_elm_lang$html$Html$div,
			{ctor: '[]'},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(txt),
				_1: {ctor: '[]'}
			});
	};
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		A2(_elm_lang$core$List$map, msg, model.messages));
};
var _mordrax$cotwelm$Game_Game$viewStatus = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('ui padded grid'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$style(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'overflow', _1: 'auto'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'height', _1: '100px'},
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui twelve wide column'),
								_1: {ctor: '[]'}
							}
						},
						{
							ctor: '::',
							_0: _mordrax$cotwelm$Game_Game$viewMessages(model),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui four wide column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _mordrax$cotwelm$Hero_Hero$viewStats(model.hero),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		});
};
var _mordrax$cotwelm$Game_Game$viewMonsters = function (model) {
	var monsterHtml = function (monster) {
		return _mordrax$cotwelm$Monster_Monster$view(monster);
	};
	var monsters = function (_) {
		return _.monsters;
	}(
		_mordrax$cotwelm$Game_Maps$currentLevel(model.maps));
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		A2(_elm_lang$core$List$map, monsterHtml, monsters));
};
var _mordrax$cotwelm$Game_Game$donDefaultGarb = F2(
	function (itemFactory, hero) {
		var makeEquipment = F2(
			function (_p1, _p0) {
				var _p2 = _p1;
				var _p3 = _p0;
				var _p4 = A2(_mordrax$cotwelm$Item_Factory$make, _p2._1, _p3._1);
				var item = _p4._0;
				var itemFactory_ = _p4._1;
				return {
					ctor: '_Tuple2',
					_0: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p2._0, _1: item},
						_1: _p3._0
					},
					_1: itemFactory_
				};
			});
		var equipmentToMake = {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Equipment$WeaponSlot,
				_1: _mordrax$cotwelm$Item_Data$ItemTypeWeapon(_mordrax$cotwelm$Item_Data$Dagger)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _mordrax$cotwelm$Equipment$ArmourSlot,
					_1: _mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$ScaleMail)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _mordrax$cotwelm$Equipment$ShieldSlot,
						_1: _mordrax$cotwelm$Item_Data$ItemTypeShield(_mordrax$cotwelm$Item_Data$LargeIronShield)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _mordrax$cotwelm$Equipment$HelmetSlot,
							_1: _mordrax$cotwelm$Item_Data$ItemTypeHelmet(_mordrax$cotwelm$Item_Data$LeatherHelmet)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _mordrax$cotwelm$Equipment$GauntletsSlot,
								_1: _mordrax$cotwelm$Item_Data$ItemTypeGauntlets(_mordrax$cotwelm$Item_Data$NormalGauntlets)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _mordrax$cotwelm$Equipment$BeltSlot,
									_1: _mordrax$cotwelm$Item_Data$ItemTypeBelt(_mordrax$cotwelm$Item_Data$ThreeSlotBelt)
								},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _mordrax$cotwelm$Equipment$PurseSlot, _1: _mordrax$cotwelm$Item_Data$ItemTypePurse},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: _mordrax$cotwelm$Equipment$PackSlot,
											_1: _mordrax$cotwelm$Item_Data$ItemTypePack(_mordrax$cotwelm$Item_Data$MediumPack)
										},
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		};
		var _p5 = A3(
			_elm_lang$core$List$foldl,
			makeEquipment,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: itemFactory
			},
			equipmentToMake);
		var defaultEquipment = _p5._0;
		var factoryAfterProduction = _p5._1;
		var equippingHero = A3(
			_mordrax$cotwelm$Utils_Lib$foldResult,
			function (item) {
				return _mordrax$cotwelm$Hero_Hero$equip(item);
			},
			_elm_lang$core$Result$Ok(hero),
			defaultEquipment);
		var _p6 = equippingHero;
		if (_p6.ctor === 'Ok') {
			return {ctor: '_Tuple2', _0: _p6._0, _1: factoryAfterProduction};
		} else {
			var _p7 = A2(
				_elm_lang$core$Debug$log,
				'Game.donDefaultGarb',
				_elm_lang$core$Basics$toString(_p6));
			return {ctor: '_Tuple2', _0: hero, _1: itemFactory};
		}
	});
var _mordrax$cotwelm$Game_Game$updateViewportOffset = function (_p8) {
	var _p9 = _p8;
	var _p14 = _p9.windowSize;
	var _p13 = _p9.viewport;
	var _p10 = _mordrax$cotwelm$Level$size(
		_mordrax$cotwelm$Game_Maps$currentLevel(_p9.maps));
	var mapWidth = _p10._0;
	var mapHeight = _p10._1;
	var _p11 = {ctor: '_Tuple2', _0: (_p14.width / 2) | 0, _1: (_p14.height / 2) | 0};
	var xOff = _p11._0;
	var yOff = _p11._1;
	var tileSize = 32;
	var _p12 = A2(
		_mordrax$cotwelm$Utils_Vector$scale,
		tileSize,
		_mordrax$cotwelm$Hero_Hero$position(_p9.hero));
	var curX = _p12._0;
	var curY = _p12._1;
	var tolerance = tileSize * 4;
	var scroll = {
		up: _elm_lang$core$Native_Utils.cmp(_p13.y + curY, tolerance) < 1,
		down: _elm_lang$core$Native_Utils.cmp(_p13.y + curY, (((_p14.height * 4) / 5) | 0) - tolerance) > -1,
		left: _elm_lang$core$Native_Utils.cmp(_p13.x + curX, tolerance) < 1,
		right: _elm_lang$core$Native_Utils.cmp(_p13.x + curX, _p14.width - tolerance) > -1
	};
	var newX = (scroll.left || scroll.right) ? A3(_elm_lang$core$Basics$clamp, _p14.width - (mapWidth * tileSize), 0, xOff - curX) : _p13.x;
	var newY = (scroll.up || scroll.down) ? A3(_elm_lang$core$Basics$clamp, (((_p14.height * 4) / 5) | 0) - (mapHeight * tileSize), 0, yOff - curY) : _p13.y;
	return _elm_lang$core$Native_Utils.update(
		_p9,
		{
			viewport: {x: newX, y: newY}
		});
};
var _mordrax$cotwelm$Game_Game$isMonsterObstruction = F2(
	function (monster, monsters) {
		var atMonsterPosition = function (pos) {
			return _elm_lang$core$Native_Utils.eq(pos, monster.position);
		};
		return A2(
			_elm_lang$core$List$any,
			atMonsterPosition,
			A2(
				_elm_lang$core$List$map,
				function (_) {
					return _.position;
				},
				monsters));
	});
var _mordrax$cotwelm$Game_Game$heuristic = F2(
	function (start, end) {
		var _p15 = A2(_mordrax$cotwelm$Utils_Vector$sub, start, end);
		var dx = _p15._0;
		var dy = _p15._1;
		return _elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics$max, dx, dy));
	});
var _mordrax$cotwelm$Game_Game$buildingAtPosition = F2(
	function (pos, buildings) {
		var buildingsAtTile = A2(
			_elm_lang$core$List$filter,
			_mordrax$cotwelm$GameData_Building$isBuildingAtPosition(pos),
			buildings);
		var _p16 = buildingsAtTile;
		if (_p16.ctor === '::') {
			return _elm_lang$core$Maybe$Just(_p16._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _mordrax$cotwelm$Game_Game$attackHero = F2(
	function (monster, _p17) {
		var _p18 = _p17;
		var _p19 = A2(
			_mgold$elm_random_pcg$Random_Pcg$step,
			A2(_mordrax$cotwelm$Combat$attack, monster, _p18.hero),
			_p18.seed);
		var msg = _p19._0._0;
		var heroAfterHit = _p19._0._1;
		var seed_ = _p19._1;
		return _elm_lang$core$Native_Utils.update(
			_p18,
			{
				messages: {ctor: '::', _0: msg, _1: _p18.messages},
				hero: heroAfterHit,
				seed: seed_
			});
	});
var _mordrax$cotwelm$Game_Game$addLoot = F2(
	function (monster, model) {
		var _p20 = A2(
			_mordrax$cotwelm$Item_Factory$make,
			_mordrax$cotwelm$Item_Data$ItemTypeCopper(1234),
			model.itemFactory);
		var loot = _p20._0;
		var itemFactory_ = _p20._1;
		var currentLevel = _mordrax$cotwelm$Game_Maps$currentLevel(model.maps);
		var currentLevel_ = A2(
			_mordrax$cotwelm$Level$drop,
			{ctor: '_Tuple2', _0: monster.position, _1: loot},
			currentLevel);
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				seed: model.seed,
				maps: A2(_mordrax$cotwelm$Game_Maps$updateCurrentLevel, currentLevel_, model.maps),
				itemFactory: itemFactory_
			});
	});
var _mordrax$cotwelm$Game_Game$updateMonstersOnCurrentLevel = F2(
	function (monsters, maps) {
		return function (level) {
			return A2(_mordrax$cotwelm$Game_Maps$updateCurrentLevel, level, maps);
		}(
			function (level) {
				return _elm_lang$core$Native_Utils.update(
					level,
					{monsters: monsters});
			}(
				_mordrax$cotwelm$Game_Maps$currentLevel(maps)));
	});
var _mordrax$cotwelm$Game_Game$resolveCombat = F3(
	function (hero, monster, seed) {
		var _p21 = A2(
			_mgold$elm_random_pcg$Random_Pcg$step,
			A2(_mordrax$cotwelm$Combat$attack, hero, monster),
			seed);
		var combatMsg = _p21._0._0;
		var monsterAfterBeingHit = _p21._0._1;
		var seed_ = _p21._1;
		return _mordrax$cotwelm$Stats$isDead(monster.stats) ? {ctor: '_Tuple3', _0: _elm_lang$core$Maybe$Nothing, _1: seed_, _2: combatMsg} : {
			ctor: '_Tuple3',
			_0: _elm_lang$core$Maybe$Just(monsterAfterBeingHit),
			_1: seed_,
			_2: combatMsg
		};
	});
var _mordrax$cotwelm$Game_Game$getGroundAtHero = F2(
	function (hero, maps) {
		return _mordrax$cotwelm$Tile$ground(
			A3(_elm_lang$core$Basics$flip, _mordrax$cotwelm$Game_Maps$getTile, maps, hero.position));
	});
var _mordrax$cotwelm$Game_Game$newMessage = F2(
	function (msg, model) {
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				messages: {ctor: '::', _0: msg, _1: model.messages}
			});
	});
var _mordrax$cotwelm$Game_Game$pickupReducer = F2(
	function (item, _p22) {
		var _p23 = _p22;
		var _p28 = _p23._2;
		var _p27 = _p23._1;
		var _p26 = _p23._0;
		var _p24 = A2(_mordrax$cotwelm$Equipment$putInPack, item, _p26.equipment);
		var equipment_ = _p24._0;
		var msg = _p24._1;
		var hero_ = _elm_lang$core$Native_Utils.update(
			_p26,
			{equipment: equipment_});
		var success = {ctor: '_Tuple3', _0: hero_, _1: _p27, _2: _p28};
		var _p25 = msg;
		_v7_2:
		do {
			switch (_p25.ctor) {
				case 'Success':
					return success;
				case 'ContainerMsg':
					if (_p25._0.ctor === 'Ok') {
						return success;
					} else {
						break _v7_2;
					}
				default:
					break _v7_2;
			}
		} while(false);
		return {
			ctor: '_Tuple3',
			_0: hero_,
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$Basics_ops['++'],
					'Failed to pick up item: ',
					_elm_lang$core$Basics$toString(_p25)),
				_1: _p27
			},
			_2: _p28
		};
	});
var _mordrax$cotwelm$Game_Game$pickup = F2(
	function (items, model) {
		var _p29 = A3(
			_elm_lang$core$List$foldl,
			_mordrax$cotwelm$Game_Game$pickupReducer,
			{
				ctor: '_Tuple3',
				_0: model.hero,
				_1: {ctor: '[]'},
				_2: {ctor: '[]'}
			},
			A2(_elm_lang$core$Debug$log, 'picking up: ', items));
		var hero_ = _p29._0;
		var msgs = _p29._1;
		var failedToPickup = _p29._2;
		var failedToPickupWithPosition = A2(
			_elm_lang$core$List$map,
			function (x) {
				return {ctor: '_Tuple2', _0: hero_.position, _1: x};
			},
			failedToPickup);
		var maps_ = A3(
			_elm_lang$core$Basics$flip,
			_mordrax$cotwelm$Game_Maps$updateCurrentLevel,
			model.maps,
			A3(
				_mordrax$cotwelm$Level$updateGround,
				hero_.position,
				failedToPickup,
				_mordrax$cotwelm$Game_Maps$currentLevel(model.maps)));
		return _elm_lang$core$Native_Utils.update(
			model,
			{
				hero: hero_,
				maps: maps_,
				messages: A2(_elm_lang$core$Basics_ops['++'], msgs, model.messages)
			});
	});
var _mordrax$cotwelm$Game_Game$monstersOnLevel = function (model) {
	return function (_) {
		return _.monsters;
	}(
		_mordrax$cotwelm$Game_Maps$currentLevel(model.maps));
};
var _mordrax$cotwelm$Game_Game$attackMonster = F2(
	function (monster, _p30) {
		var _p31 = _p30;
		var _p35 = _p31;
		var _p32 = A3(_mordrax$cotwelm$Game_Game$resolveCombat, _p31.hero, monster, _p31.seed);
		var maybeMonster = _p32._0;
		var seed_ = _p32._1;
		var combatMsg = _p32._2;
		var monsters = _mordrax$cotwelm$Game_Game$monstersOnLevel(_p35);
		var monsters_ = function () {
			var _p33 = maybeMonster;
			if (_p33.ctor === 'Nothing') {
				return A2(_mordrax$cotwelm$Monster_Monster$remove, monster, monsters);
			} else {
				return A2(_mordrax$cotwelm$Monster_Monster$update, _p33._0, monsters);
			}
		}();
		var modelAfterCombat = _elm_lang$core$Native_Utils.update(
			_p35,
			{
				seed: seed_,
				maps: A2(_mordrax$cotwelm$Game_Game$updateMonstersOnCurrentLevel, monsters_, _p35.maps),
				messages: {ctor: '::', _0: combatMsg, _1: _p31.messages}
			});
		var modelAfterCombatAndLoot = function () {
			var _p34 = maybeMonster;
			if (_p34.ctor === 'Just') {
				return modelAfterCombat;
			} else {
				return A2(_mordrax$cotwelm$Game_Game$addLoot, monster, modelAfterCombat);
			}
		}();
		return modelAfterCombatAndLoot;
	});
var _mordrax$cotwelm$Game_Game$queryPosition = F2(
	function (pos, _p36) {
		var _p37 = _p36;
		var _p39 = _p37.maps;
		var hasHero = _elm_lang$core$Native_Utils.eq(
			_mordrax$cotwelm$Hero_Hero$position(_p37.hero),
			pos);
		var level = _mordrax$cotwelm$Game_Maps$currentLevel(_p39);
		var maybeBuilding = A2(_mordrax$cotwelm$Game_Game$buildingAtPosition, pos, level.buildings);
		var maybeTile = A2(
			_mordrax$cotwelm$Level$getTile,
			pos,
			_mordrax$cotwelm$Game_Maps$currentLevel(_p39));
		var tileObstruction = function () {
			var _p38 = maybeTile;
			if (_p38.ctor === 'Just') {
				return _mordrax$cotwelm$Tile$isSolid(_p38._0);
			} else {
				return true;
			}
		}();
		var monsters = _mordrax$cotwelm$Game_Game$monstersOnLevel(_p37);
		var maybeMonster = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				function (x) {
					return _elm_lang$core$Native_Utils.eq(pos, x.position);
				},
				monsters));
		return {ctor: '_Tuple4', _0: tileObstruction, _1: maybeBuilding, _2: maybeMonster, _3: hasHero};
	});
var _mordrax$cotwelm$Game_Game$isObstructed = F2(
	function (position, model) {
		var _p40 = A2(_mordrax$cotwelm$Game_Game$queryPosition, position, model);
		_v13_2:
		do {
			if (_p40.ctor === '_Tuple4') {
				if (_p40._3 === true) {
					return false;
				} else {
					if (((_p40._0 === false) && (_p40._1.ctor === 'Nothing')) && (_p40._2.ctor === 'Nothing')) {
						return false;
					} else {
						break _v13_2;
					}
				}
			} else {
				break _v13_2;
			}
		} while(false);
		return true;
	});
var _mordrax$cotwelm$Game_Game$neighbours = F2(
	function (model, position) {
		var notObstructed = function (vector) {
			return !A2(_mordrax$cotwelm$Game_Game$isObstructed, vector, model);
		};
		var add = F2(
			function (x, y) {
				return A2(
					_mordrax$cotwelm$Utils_Vector$add,
					position,
					{ctor: '_Tuple2', _0: x, _1: y});
			});
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$filter,
				notObstructed,
				_mordrax$cotwelm$Utils_Vector$neighbours(position)));
	});
var _mordrax$cotwelm$Game_Game$findPath = F3(
	function (from, to, model) {
		var path = A4(
			_krisajenkins$elm_astar$AStar$findPath,
			_mordrax$cotwelm$Game_Game$heuristic,
			_mordrax$cotwelm$Game_Game$neighbours(model),
			from,
			to);
		var _p41 = path;
		if (_p41.ctor === 'Just') {
			return _p41._0;
		} else {
			return {ctor: '[]'};
		}
	});
var _mordrax$cotwelm$Game_Game$pathMonster = F3(
	function (monster, hero, model) {
		var _p42 = A3(_mordrax$cotwelm$Game_Game$findPath, monster.position, hero.position, model);
		if (_p42.ctor === '::') {
			return _elm_lang$core$Native_Utils.update(
				monster,
				{position: _p42._0});
		} else {
			return monster;
		}
	});
var _mordrax$cotwelm$Game_Game$moveMonsters = F3(
	function (monsters, movedMonsters, _p43) {
		moveMonsters:
		while (true) {
			var _p44 = _p43;
			var _p49 = _p44;
			var _p45 = monsters;
			if (_p45.ctor === '[]') {
				return _elm_lang$core$Native_Utils.update(
					_p49,
					{
						maps: A2(_mordrax$cotwelm$Game_Game$updateMonstersOnCurrentLevel, movedMonsters, _p44.maps)
					});
			} else {
				var _p48 = _p45._1;
				var _p47 = _p45._0;
				var movedMonster = A3(_mordrax$cotwelm$Game_Game$pathMonster, _p47, _p44.hero, _p49);
				var obstructions = A2(_mordrax$cotwelm$Game_Game$queryPosition, movedMonster.position, _p49);
				var isObstructedByMovedMonsters = A2(_mordrax$cotwelm$Game_Game$isMonsterObstruction, movedMonster, movedMonsters);
				var _p46 = obstructions;
				_v18_4:
				do {
					if (_p46.ctor === '_Tuple4') {
						if (_p46._3 === true) {
							var _v19 = _p48,
								_v20 = {ctor: '::', _0: _p47, _1: movedMonsters},
								_v21 = A2(_mordrax$cotwelm$Game_Game$attackHero, _p47, _p49);
							monsters = _v19;
							movedMonsters = _v20;
							_p43 = _v21;
							continue moveMonsters;
						} else {
							if (_p46._0 === true) {
								var _v22 = _p48,
									_v23 = {ctor: '::', _0: _p47, _1: movedMonsters},
									_v24 = _p49;
								monsters = _v22;
								movedMonsters = _v23;
								_p43 = _v24;
								continue moveMonsters;
							} else {
								if (_p46._1.ctor === 'Just') {
									var _v25 = _p48,
										_v26 = {ctor: '::', _0: _p47, _1: movedMonsters},
										_v27 = _p49;
									monsters = _v25;
									movedMonsters = _v26;
									_p43 = _v27;
									continue moveMonsters;
								} else {
									if (_p46._2.ctor === 'Just') {
										var _v28 = _p48,
											_v29 = {ctor: '::', _0: _p47, _1: movedMonsters},
											_v30 = _p49;
										monsters = _v28;
										movedMonsters = _v29;
										_p43 = _v30;
										continue moveMonsters;
									} else {
										break _v18_4;
									}
								}
							}
						}
					} else {
						break _v18_4;
					}
				} while(false);
				if (isObstructedByMovedMonsters) {
					var _v31 = _p48,
						_v32 = {ctor: '::', _0: _p47, _1: movedMonsters},
						_v33 = _p49;
					monsters = _v31;
					movedMonsters = _v32;
					_p43 = _v33;
					continue moveMonsters;
				} else {
					var _v34 = _p48,
						_v35 = {ctor: '::', _0: movedMonster, _1: movedMonsters},
						_v36 = _p49;
					monsters = _v34;
					movedMonsters = _v35;
					_p43 = _v36;
					continue moveMonsters;
				}
			}
		}
	});
var _mordrax$cotwelm$Game_Game$Model = function (a) {
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
													return {name: a, hero: b, maps: c, currentScreen: d, shops: e, idGen: f, seed: g, windowSize: h, messages: i, viewport: j, difficulty: k, inventory: l, itemFactory: m};
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
var _mordrax$cotwelm$Game_Game$BuildingScreen = function (a) {
	return {ctor: 'BuildingScreen', _0: a};
};
var _mordrax$cotwelm$Game_Game$enterBuilding = F2(
	function (building, _p50) {
		var _p51 = _p50;
		var _p55 = _p51;
		var _p54 = _p51.hero;
		var modelWithHeroMoved = _elm_lang$core$Native_Utils.update(
			_p55,
			{
				hero: A2(_mordrax$cotwelm$Hero_Hero$teleport, building.position, _p54)
			});
		var _p52 = _mordrax$cotwelm$GameData_Building$buildingType(building);
		switch (_p52.ctor) {
			case 'Linked':
				var _p53 = _p52._0;
				return _elm_lang$core$Native_Utils.update(
					_p55,
					{
						maps: A2(_mordrax$cotwelm$Game_Maps$updateArea, _p53.area, _p51.maps),
						hero: A2(_mordrax$cotwelm$Hero_Hero$teleport, _p53.position, _p54)
					});
			case 'Shop':
				return _elm_lang$core$Native_Utils.update(
					_p55,
					{
						currentScreen: _mordrax$cotwelm$Game_Game$BuildingScreen(building),
						inventory: A2(
							_mordrax$cotwelm$Pages_Inventory$init,
							_mordrax$cotwelm$Pages_Inventory$Shop(
								A2(_mordrax$cotwelm$Shops$shop, _p52._0, _p55.shops)),
							_p54.equipment)
					});
			case 'Ordinary':
				return _elm_lang$core$Native_Utils.update(
					_p55,
					{
						currentScreen: _mordrax$cotwelm$Game_Game$BuildingScreen(building)
					});
			case 'StairUp':
				return modelWithHeroMoved;
			default:
				return modelWithHeroMoved;
		}
	});
var _mordrax$cotwelm$Game_Game$moveHero_ = F2(
	function (dir, model) {
		var heroMoved = A2(_mordrax$cotwelm$Hero_Hero$move, dir, model.hero);
		var _p56 = A2(_mordrax$cotwelm$Game_Game$queryPosition, heroMoved.position, model);
		_v39_1:
		do {
			_v39_0:
			do {
				if (_p56._0 === true) {
					if (_p56._2.ctor === 'Just') {
						break _v39_0;
					} else {
						if (_p56._1.ctor === 'Just') {
							break _v39_1;
						} else {
							return {ctor: '_Tuple2', _0: model, _1: false};
						}
					}
				} else {
					if (_p56._2.ctor === 'Just') {
						break _v39_0;
					} else {
						if (_p56._1.ctor === 'Just') {
							break _v39_1;
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									model,
									{hero: heroMoved}),
								_1: true
							};
						}
					}
				}
			} while(false);
			return {
				ctor: '_Tuple2',
				_0: A2(_mordrax$cotwelm$Game_Game$attackMonster, _p56._2._0, model),
				_1: false
			};
		} while(false);
		return {
			ctor: '_Tuple2',
			_0: A2(_mordrax$cotwelm$Game_Game$enterBuilding, _p56._1._0, model),
			_1: false
		};
	});
var _mordrax$cotwelm$Game_Game$moveHero = F2(
	function (dir, model) {
		var _p57 = A2(_mordrax$cotwelm$Game_Game$moveHero_, dir, model);
		var modelWithHeroMoved = _p57._0;
		var hasMoved = _p57._1;
		var _p58 = hasMoved;
		if (_p58 === false) {
			return {
				ctor: '_Tuple2',
				_0: _mordrax$cotwelm$Game_Game$updateViewportOffset(modelWithHeroMoved),
				_1: false
			};
		} else {
			return function (m) {
				return {ctor: '_Tuple2', _0: m, _1: true};
			}(
				function (m) {
					return A3(
						_mordrax$cotwelm$Game_Game$moveMonsters,
						_mordrax$cotwelm$Game_Game$monstersOnLevel(m),
						{ctor: '[]'},
						m);
				}(
					_mordrax$cotwelm$Game_Game$updateViewportOffset(modelWithHeroMoved)));
		}
	});
var _mordrax$cotwelm$Game_Game$InventoryScreen = {ctor: 'InventoryScreen'};
var _mordrax$cotwelm$Game_Game$MapScreen = {ctor: 'MapScreen'};
var _mordrax$cotwelm$Game_Game$PathTo = function (a) {
	return {ctor: 'PathTo', _0: a};
};
var _mordrax$cotwelm$Game_Game$ClickTile = function (a) {
	return {ctor: 'ClickTile', _0: a};
};
var _mordrax$cotwelm$Game_Game$viewMap = function (_p59) {
	var _p60 = _p59;
	var _p63 = _p60.windowSize;
	var _p62 = _p60.viewport;
	var _p61 = _p60;
	var viewStart = {
		ctor: '_Tuple2',
		_0: _elm_lang$core$Basics$abs((_p62.x / 32) | 0),
		_1: _elm_lang$core$Basics$abs((_p62.y / 32) | 0)
	};
	var viewSize = {ctor: '_Tuple2', _0: (_p63.width / 32) | 0, _1: (_p63.height / 32) | 0};
	var px = function (x) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(x),
			'px');
	};
	var adjustViewport = function (html) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'overflow', _1: 'hidden'},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'width',
									_1: px(_p63.width)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'height',
										_1: px(((_p63.height * 4) / 5) | 0)
									},
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$style(
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'top',
										_1: px(_p62.y)
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'left',
											_1: px(_p62.x)
										},
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					},
					html),
				_1: {ctor: '[]'}
			});
	};
	var title = A2(
		_elm_lang$html$Html$h1,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(
				A2(_elm_lang$core$Basics_ops['++'], 'Welcome to Castle of the Winds: ', _p61.name)),
			_1: {ctor: '[]'}
		});
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _mordrax$cotwelm$Game_Game$viewMenu,
			_1: {
				ctor: '::',
				_0: _mordrax$cotwelm$Game_Game$viewQuickMenu,
				_1: {
					ctor: '::',
					_0: adjustViewport(
						{
							ctor: '::',
							_0: A3(
								_mordrax$cotwelm$Game_Maps$view,
								{ctor: '_Tuple2', _0: viewStart, _1: viewSize},
								_mordrax$cotwelm$Game_Game$ClickTile,
								_p61.maps),
							_1: {
								ctor: '::',
								_0: _mordrax$cotwelm$Hero_Hero$view(_p61.hero),
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Game_Game$viewMonsters(_p61),
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _mordrax$cotwelm$Game_Game$viewStatus(_p61),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _mordrax$cotwelm$Game_Game$WindowSize = function (a) {
	return {ctor: 'WindowSize', _0: a};
};
var _mordrax$cotwelm$Game_Game$initialWindowSizeCmd = A2(
	_elm_lang$core$Task$perform,
	function (x) {
		return _mordrax$cotwelm$Game_Game$WindowSize(x);
	},
	_elm_lang$window$Window$size);
var _mordrax$cotwelm$Game_Game$MapsMsg = function (a) {
	return {ctor: 'MapsMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$init = F3(
	function (seed, hero, difficulty) {
		var itemFactory = _mordrax$cotwelm$Item_Factory$init;
		var _p64 = A2(_mordrax$cotwelm$Game_Game$donDefaultGarb, itemFactory, hero);
		var heroWithDefaultEquipment = _p64._0;
		var itemFactoryAfterHeroEquipment = _p64._1;
		var _p65 = A2(_mordrax$cotwelm$Shops$init, seed, itemFactoryAfterHeroEquipment);
		var shops = _p65._0;
		var itemFactoryAfterShop = _p65._1;
		var seed_ = _p65._2;
		var _p66 = A2(
			_mordrax$cotwelm$Item_Factory$make,
			_mordrax$cotwelm$Item_Data$ItemTypeArmour(_mordrax$cotwelm$Item_Data$LeatherArmour),
			itemFactoryAfterShop);
		var leatherArmour = _p66._0;
		var itemFactory_ = _p66._1;
		var _p67 = A2(_mordrax$cotwelm$Game_Maps$init, leatherArmour, seed_);
		var maps = _p67._0;
		var mapCmd = _p67._1;
		var seed__ = _p67._2;
		var cmd = _elm_lang$core$Platform_Cmd$batch(
			{
				ctor: '::',
				_0: A2(_elm_lang$core$Platform_Cmd$map, _mordrax$cotwelm$Game_Game$MapsMsg, mapCmd),
				_1: {
					ctor: '::',
					_0: _mordrax$cotwelm$Game_Game$initialWindowSizeCmd,
					_1: {ctor: '[]'}
				}
			});
		var ground = A2(_mordrax$cotwelm$Game_Game$getGroundAtHero, heroWithDefaultEquipment, maps);
		var idGenerator = _mordrax$cotwelm$Utils_IdGenerator$init;
		return {
			ctor: '_Tuple2',
			_0: {
				name: 'A new game',
				hero: heroWithDefaultEquipment,
				maps: maps,
				currentScreen: _mordrax$cotwelm$Game_Game$MapScreen,
				shops: shops,
				idGen: idGenerator,
				inventory: A2(
					_mordrax$cotwelm$Pages_Inventory$init,
					_mordrax$cotwelm$Pages_Inventory$Ground(ground),
					heroWithDefaultEquipment.equipment),
				seed: seed__,
				messages: {
					ctor: '::',
					_0: 'Welcome to castle of the winds!',
					_1: {ctor: '[]'}
				},
				difficulty: difficulty,
				windowSize: {width: 640, height: 640},
				viewport: {x: 0, y: 0},
				itemFactory: itemFactory_
			},
			_1: cmd
		};
	});
var _mordrax$cotwelm$Game_Game$InventoryMsg = function (a) {
	return {ctor: 'InventoryMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$view = function (model) {
	var _p68 = model.currentScreen;
	switch (_p68.ctor) {
		case 'MapScreen':
			return _mordrax$cotwelm$Game_Game$viewMap(model);
		case 'BuildingScreen':
			var _p70 = _p68._0;
			var _p69 = _mordrax$cotwelm$GameData_Building$buildingType(_p70);
			if (_p69.ctor === 'Shop') {
				return A2(
					_elm_lang$html$Html$map,
					_mordrax$cotwelm$Game_Game$InventoryMsg,
					_mordrax$cotwelm$Pages_Inventory$view(model.inventory));
			} else {
				return _mordrax$cotwelm$Game_Game$viewBuilding(_p70);
			}
		default:
			return A2(
				_elm_lang$html$Html$map,
				_mordrax$cotwelm$Game_Game$InventoryMsg,
				_mordrax$cotwelm$Pages_Inventory$view(model.inventory));
	}
};
var _mordrax$cotwelm$Game_Game$KeyboardMsg = function (a) {
	return {ctor: 'KeyboardMsg', _0: a};
};
var _mordrax$cotwelm$Game_Game$update = F2(
	function (msg, model) {
		update:
		while (true) {
			var _p71 = msg;
			switch (_p71.ctor) {
				case 'KeyboardMsg':
					return A2(_mordrax$cotwelm$Game_Game$updateKeyboard, _p71._0, model);
				case 'InventoryMsg':
					var _p72 = A2(_mordrax$cotwelm$Pages_Inventory$update, _p71._0, model.inventory);
					var inventory_ = _p72._0;
					var maybeExitValues = _p72._1;
					var _p73 = maybeExitValues;
					if (_p73.ctor === 'Nothing') {
						return {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{inventory: inventory_}),
							_1: _elm_lang$core$Platform_Cmd$none
						};
					} else {
						var modelWithHeroAndInventory = _elm_lang$core$Native_Utils.update(
							model,
							{
								inventory: inventory_,
								hero: A2(_mordrax$cotwelm$Hero_Hero$updateEquipment, _p73._0._0, model.hero),
								currentScreen: _mordrax$cotwelm$Game_Game$MapScreen
							});
						var _p74 = _p73._0._1;
						if (_p74.ctor === 'Ground') {
							var level_ = A3(
								_mordrax$cotwelm$Level$updateGround,
								model.hero.position,
								_mordrax$cotwelm$Container$list(_p74._0),
								_mordrax$cotwelm$Game_Maps$currentLevel(model.maps));
							var maps_ = A2(_mordrax$cotwelm$Game_Maps$updateCurrentLevel, level_, model.maps);
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									modelWithHeroAndInventory,
									{maps: maps_}),
								_1: _elm_lang$core$Platform_Cmd$none
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Native_Utils.update(
									modelWithHeroAndInventory,
									{
										shops: A2(_mordrax$cotwelm$Shops$updateShop, _p74._0, model.shops)
									}),
								_1: _elm_lang$core$Platform_Cmd$none
							};
						}
					}
				case 'MapsMsg':
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								maps: A2(_mordrax$cotwelm$Game_Maps$update, _p71._0, model.maps)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				case 'WindowSize':
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{windowSize: _p71._0}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				case 'ClickTile':
					var path = A3(_mordrax$cotwelm$Game_Game$findPath, model.hero.position, _p71._0, model);
					var _v47 = _mordrax$cotwelm$Game_Game$PathTo(path),
						_v48 = model;
					msg = _v47;
					model = _v48;
					continue update;
				default:
					if (_p71._0.ctor === '[]') {
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
					} else {
						var walkRemainingPathTask = _elm_lang$core$Task$succeed(_p71._0._1);
						var dir = _mordrax$cotwelm$Utils_Vector$toDirection(
							A2(_mordrax$cotwelm$Utils_Vector$sub, _p71._0._0, model.hero.position));
						var _p75 = A2(
							_mordrax$cotwelm$Game_Game$update,
							_mordrax$cotwelm$Game_Game$KeyboardMsg(
								_mordrax$cotwelm$Game_Keyboard$KeyDir(dir)),
							model);
						var model_ = _p75._0;
						var cmds_ = _p75._1;
						return {
							ctor: '_Tuple2',
							_0: model_,
							_1: _elm_lang$core$Platform_Cmd$batch(
								{
									ctor: '::',
									_0: A2(_elm_lang$core$Task$perform, _mordrax$cotwelm$Game_Game$PathTo, walkRemainingPathTask),
									_1: {
										ctor: '::',
										_0: cmds_,
										_1: {ctor: '[]'}
									}
								})
						};
					}
			}
		}
	});
var _mordrax$cotwelm$Game_Game$updateKeyboard = F2(
	function (keyboardMsg, model) {
		var atHeroPosition = F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(model.hero.position);
		var isOnStairs = function (upOrDownStairs) {
			return A2(
				_elm_lang$core$Maybe$map,
				atHeroPosition,
				A2(
					_elm_lang$core$Maybe$map,
					function (_) {
						return _.position;
					},
					upOrDownStairs(
						_mordrax$cotwelm$Game_Maps$currentLevel(model.maps))));
		};
		var _p76 = keyboardMsg;
		switch (_p76.ctor) {
			case 'KeyDir':
				return function (_p77) {
					var _p78 = _p77;
					return {ctor: '_Tuple2', _0: _p78._0, _1: _elm_lang$core$Platform_Cmd$none};
				}(
					A2(_mordrax$cotwelm$Game_Game$moveHero, _p76._0, model));
			case 'Walk':
				var _p81 = _p76._0;
				var _p79 = A2(_mordrax$cotwelm$Game_Game$moveHero, _p81, model);
				var modelWithMovedHero = _p79._0;
				var hasMoved = _p79._1;
				var _p80 = hasMoved;
				if (_p80 === false) {
					return {ctor: '_Tuple2', _0: modelWithMovedHero, _1: _elm_lang$core$Platform_Cmd$none};
				} else {
					return A2(
						_mordrax$cotwelm$Game_Game$update,
						_mordrax$cotwelm$Game_Game$KeyboardMsg(
							_mordrax$cotwelm$Game_Keyboard$Walk(_p81)),
						modelWithMovedHero);
				}
			case 'Esc':
				var _p82 = model.currentScreen;
				switch (_p82.ctor) {
					case 'MapScreen':
						return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
					case 'BuildingScreen':
						return A2(
							_mordrax$cotwelm$Game_Game$update,
							_mordrax$cotwelm$Game_Game$InventoryMsg(
								_mordrax$cotwelm$Pages_Inventory$keyboardToInventoryMsg(_mordrax$cotwelm$Game_Keyboard$Esc)),
							model);
					default:
						return A2(
							_mordrax$cotwelm$Game_Game$update,
							_mordrax$cotwelm$Game_Game$InventoryMsg(
								_mordrax$cotwelm$Pages_Inventory$keyboardToInventoryMsg(_mordrax$cotwelm$Game_Keyboard$Esc)),
							model);
				}
			case 'Inventory':
				var ground = A2(_mordrax$cotwelm$Game_Game$getGroundAtHero, model.hero, model.maps);
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							currentScreen: _mordrax$cotwelm$Game_Game$InventoryScreen,
							inventory: A2(
								_mordrax$cotwelm$Pages_Inventory$init,
								_mordrax$cotwelm$Pages_Inventory$Ground(ground),
								model.hero.equipment)
						}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			case 'GoUpstairs':
				var _p83 = isOnStairs(_mordrax$cotwelm$Level$upstairs);
				if ((_p83.ctor === 'Just') && (_p83._0 === true)) {
					var map_ = _mordrax$cotwelm$Game_Maps$upstairs(model.maps);
					var heroAtTopOfStairs = A2(
						_elm_lang$core$Maybe$withDefault,
						model.hero,
						A2(
							_elm_lang$core$Maybe$map,
							A2(_elm_lang$core$Basics$flip, _mordrax$cotwelm$Hero_Hero$teleport, model.hero),
							A2(
								_elm_lang$core$Maybe$map,
								function (_) {
									return _.position;
								},
								_mordrax$cotwelm$Level$downstairs(
									_mordrax$cotwelm$Game_Maps$currentLevel(map_)))));
					return {
						ctor: '_Tuple2',
						_0: _mordrax$cotwelm$Game_Game$updateViewportOffset(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									maps: map_,
									hero: heroAtTopOfStairs,
									messages: {ctor: '::', _0: 'You climb back up the stairs', _1: model.messages}
								})),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								messages: {ctor: '::', _0: 'You need to be on some stairs!', _1: model.messages}
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'GoDownstairs':
				var _p84 = isOnStairs(_mordrax$cotwelm$Level$downstairs);
				if ((_p84.ctor === 'Just') && (_p84._0 === true)) {
					var _p85 = A2(
						_mgold$elm_random_pcg$Random_Pcg$step,
						_mordrax$cotwelm$Game_Maps$downstairs(model.maps),
						model.seed);
					var newMap = _p85._0;
					var seed_ = _p85._1;
					var heroAtBottomOfStairs = A2(
						_elm_lang$core$Maybe$withDefault,
						model.hero,
						A2(
							_elm_lang$core$Maybe$map,
							A2(_elm_lang$core$Basics$flip, _mordrax$cotwelm$Hero_Hero$teleport, model.hero),
							A2(
								_elm_lang$core$Maybe$map,
								function (_) {
									return _.position;
								},
								A2(
									_elm_lang$core$Debug$log,
									'upstairs',
									_mordrax$cotwelm$Level$upstairs(
										_mordrax$cotwelm$Game_Maps$currentLevel(newMap))))));
					return {
						ctor: '_Tuple2',
						_0: _mordrax$cotwelm$Game_Game$updateViewportOffset(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									maps: newMap,
									hero: heroAtBottomOfStairs,
									seed: seed_,
									messages: {ctor: '::', _0: 'You go downstairs', _1: model.messages}
								})),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								messages: {ctor: '::', _0: 'You need to be on some stairs!', _1: model.messages}
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			case 'Get':
				var maybeItems = A2(
					_elm_lang$core$Maybe$map,
					_mordrax$cotwelm$Container$list,
					A2(
						_elm_lang$core$Maybe$map,
						_mordrax$cotwelm$Tile$ground,
						A2(
							_mordrax$cotwelm$Level$getTile,
							model.hero.position,
							_mordrax$cotwelm$Game_Maps$currentLevel(model.maps))));
				var _p86 = maybeItems;
				if (_p86.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(_mordrax$cotwelm$Game_Game$pickup, _p86._0, model),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				}
			default:
				var _p87 = A2(_elm_lang$core$Debug$log, 'Keyboard key not implemented yet', _p76);
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
		}
	});
var _mordrax$cotwelm$Game_Game$subscription = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: _elm_lang$window$Window$resizes(
				function (x) {
					return _mordrax$cotwelm$Game_Game$WindowSize(x);
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$core$Platform_Sub$map,
					_mordrax$cotwelm$Game_Game$InventoryMsg,
					_mordrax$cotwelm$Pages_Inventory$subscription(model.inventory)),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$Platform_Sub$map, _mordrax$cotwelm$Game_Game$KeyboardMsg, _mordrax$cotwelm$Game_Keyboard$subscription),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _mordrax$cotwelm$SplashView$Overview = {ctor: 'Overview'};
var _mordrax$cotwelm$SplashView$LoadGame = {ctor: 'LoadGame'};
var _mordrax$cotwelm$SplashView$NewGame = {ctor: 'NewGame'};
var _mordrax$cotwelm$SplashView$view = function () {
	var bgStyle = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'backgroundColor', _1: 'black'},
		_1: {ctor: '[]'}
	};
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('ui center aligned middle aligned grid'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(bgStyle),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('ui one column'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('ui column'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$img,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$src('/assets/landing_cotw1.jpg'),
									_1: {ctor: '[]'}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ui column'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$img,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$src('/assets/landing_cotw2.jpg'),
										_1: {ctor: '[]'}
									},
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('ui column'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('ui buttons'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: A2(
												_elm_lang$html$Html$button,
												{
													ctor: '::',
													_0: _elm_lang$html$Html_Attributes$class('ui button primary'),
													_1: {
														ctor: '::',
														_0: _elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$SplashView$NewGame),
														_1: {ctor: '[]'}
													}
												},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('New Game'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$button,
													{
														ctor: '::',
														_0: _elm_lang$html$Html_Attributes$class('ui button'),
														_1: {
															ctor: '::',
															_0: _elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$SplashView$LoadGame),
															_1: {ctor: '[]'}
														}
													},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('Load Game'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$button,
														{
															ctor: '::',
															_0: _elm_lang$html$Html_Attributes$class('ui button'),
															_1: {
																ctor: '::',
																_0: _elm_lang$html$Html_Events$onClick(_mordrax$cotwelm$SplashView$Overview),
																_1: {ctor: '[]'}
															}
														},
														{
															ctor: '::',
															_0: _elm_lang$html$Html$text('Overview'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {ctor: '[]'}
		});
}();

var _mordrax$cotwelm$Main$Model = F5(
	function (a, b, c, d, e) {
		return {currentPage: a, charCreation: b, game: c, editor: d, arena: e};
	});
var _mordrax$cotwelm$Main$ChangePage = function (a) {
	return {ctor: 'ChangePage', _0: a};
};
var _mordrax$cotwelm$Main$ArenaMsg = function (a) {
	return {ctor: 'ArenaMsg', _0: a};
};
var _mordrax$cotwelm$Main$EditorMsg = function (a) {
	return {ctor: 'EditorMsg', _0: a};
};
var _mordrax$cotwelm$Main$GenerateGame = F2(
	function (a, b) {
		return {ctor: 'GenerateGame', _0: a, _1: b};
	});
var _mordrax$cotwelm$Main$startNewGame = function (charCreation) {
	var success = function (timeNow) {
		return function (seed) {
			return A2(_mordrax$cotwelm$Main$GenerateGame, seed, charCreation);
		}(
			_mgold$elm_random_pcg$Random_Pcg$initialSeed(
				_elm_lang$core$Basics$round(
					_elm_lang$core$Time$inSeconds(timeNow))));
	};
	return A2(_elm_lang$core$Task$perform, success, _elm_lang$core$Time$now);
};
var _mordrax$cotwelm$Main$GameMsg = function (a) {
	return {ctor: 'GameMsg', _0: a};
};
var _mordrax$cotwelm$Main$subscriptions = function (model) {
	var _p0 = model.game;
	if (_p0.ctor === 'Nothing') {
		return _elm_lang$core$Platform_Sub$none;
	} else {
		return A2(
			_elm_lang$core$Platform_Sub$map,
			_mordrax$cotwelm$Main$GameMsg,
			_mordrax$cotwelm$Game_Game$subscription(_p0._0));
	}
};
var _mordrax$cotwelm$Main$CharCreationMsg = function (a) {
	return {ctor: 'CharCreationMsg', _0: a};
};
var _mordrax$cotwelm$Main$SplashMsg = function (a) {
	return {ctor: 'SplashMsg', _0: a};
};
var _mordrax$cotwelm$Main$view = function (model) {
	var _p1 = model.currentPage;
	switch (_p1.ctor) {
		case 'CharCreationPage':
			return A2(
				_elm_lang$html$Html$map,
				_mordrax$cotwelm$Main$CharCreationMsg,
				_mordrax$cotwelm$CharCreation_CharCreation$view(model.charCreation));
		case 'SplashPage':
			return A2(_elm_lang$html$Html$map, _mordrax$cotwelm$Main$SplashMsg, _mordrax$cotwelm$SplashView$view);
		case 'GamePage':
			var _p2 = model.game;
			if (_p2.ctor === 'Nothing') {
				return A2(
					_elm_lang$html$Html$h1,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('There is no game state. A possible reason is that you have not created a character.'),
						_1: {ctor: '[]'}
					});
			} else {
				return A2(
					_elm_lang$html$Html$map,
					_mordrax$cotwelm$Main$GameMsg,
					_mordrax$cotwelm$Game_Game$view(_p2._0));
			}
		case 'EditorPage':
			return A2(
				_elm_lang$html$Html$map,
				_mordrax$cotwelm$Main$EditorMsg,
				_mordrax$cotwelm$Dungeon_Editor$view(model.editor));
		case 'ArenaPage':
			return A2(
				_elm_lang$html$Html$map,
				_mordrax$cotwelm$Main$ArenaMsg,
				_mordrax$cotwelm$Arena$view(model.arena));
		default:
			return A2(
				_elm_lang$html$Html$h1,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Page not implemented!'),
					_1: {ctor: '[]'}
				});
	}
};
var _mordrax$cotwelm$Main$NotImplementedPage = {ctor: 'NotImplementedPage'};
var _mordrax$cotwelm$Main$update = F2(
	function (msg, model) {
		var _p3 = msg;
		switch (_p3.ctor) {
			case 'SplashMsg':
				if (_p3._0.ctor === 'NewGame') {
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
				var _p4 = A2(_mordrax$cotwelm$CharCreation_CharCreation$update, _p3._0, model.charCreation);
				var charCreation_ = _p4._0;
				var isComplete = _p4._1;
				var _p5 = isComplete;
				if (_p5 === false) {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{charCreation: charCreation_}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{charCreation: charCreation_}),
						_1: _elm_lang$core$Platform_Cmd$batch(
							{
								ctor: '::',
								_0: _elm_lang$navigation$Navigation$newUrl('#/game'),
								_1: {
									ctor: '::',
									_0: _mordrax$cotwelm$Main$startNewGame(charCreation_),
									_1: {ctor: '[]'}
								}
							})
					};
				}
			case 'GameMsg':
				var _p6 = model.game;
				if (_p6.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
				} else {
					var _p7 = A2(_mordrax$cotwelm$Game_Game$update, _p3._0, _p6._0);
					var game_ = _p7._0;
					var cmd = _p7._1;
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								game: _elm_lang$core$Maybe$Just(game_)
							}),
						_1: A2(_elm_lang$core$Platform_Cmd$map, _mordrax$cotwelm$Main$GameMsg, cmd)
					};
				}
			case 'EditorMsg':
				var _p8 = A2(_mordrax$cotwelm$Dungeon_Editor$update, _p3._0, model.editor);
				var editor_ = _p8._0;
				var cmds = _p8._1;
				var gameCmds = A2(_elm_lang$core$Platform_Cmd$map, _mordrax$cotwelm$Main$EditorMsg, cmds);
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{editor: editor_}),
					_1: gameCmds
				};
			case 'ArenaMsg':
				var _p9 = A2(_mordrax$cotwelm$Arena$update, _p3._0, model.arena);
				var arena_ = _p9._0;
				var cmds = _p9._1;
				var gameCmds = A2(_elm_lang$core$Platform_Cmd$map, _mordrax$cotwelm$Main$ArenaMsg, cmds);
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{arena: arena_}),
					_1: gameCmds
				};
			case 'GenerateGame':
				var _p10 = _mordrax$cotwelm$CharCreation_CharCreation$info(_p3._1);
				var name = _p10._0;
				var gender = _p10._1;
				var difficulty = _p10._2;
				var attributes = _p10._3;
				var hero = A3(_mordrax$cotwelm$Hero_Hero$init, name, attributes, gender);
				var _p11 = A3(_mordrax$cotwelm$Game_Game$init, _p3._0, hero, difficulty);
				var game = _p11._0;
				var gameCmds = _p11._1;
				var mainCmds = A2(_elm_lang$core$Platform_Cmd$map, _mordrax$cotwelm$Main$GameMsg, gameCmds);
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							game: _elm_lang$core$Maybe$Just(game)
						}),
					_1: mainCmds
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{currentPage: _p3._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _mordrax$cotwelm$Main$ArenaPage = {ctor: 'ArenaPage'};
var _mordrax$cotwelm$Main$EditorPage = {ctor: 'EditorPage'};
var _mordrax$cotwelm$Main$DungeonPage = {ctor: 'DungeonPage'};
var _mordrax$cotwelm$Main$ShopPage = {ctor: 'ShopPage'};
var _mordrax$cotwelm$Main$GamePage = {ctor: 'GamePage'};
var _mordrax$cotwelm$Main$CharCreationPage = {ctor: 'CharCreationPage'};
var _mordrax$cotwelm$Main$SplashPage = {ctor: 'SplashPage'};
var _mordrax$cotwelm$Main$urlToPage = function (_p12) {
	var _p13 = _p12;
	var _p14 = _p13.hash;
	return _elm_lang$core$Native_Utils.eq(_p14, '#/charCreation') ? _mordrax$cotwelm$Main$CharCreationPage : (_elm_lang$core$Native_Utils.eq(_p14, '#/game') ? _mordrax$cotwelm$Main$GamePage : (_elm_lang$core$Native_Utils.eq(_p14, '#/editor') ? _mordrax$cotwelm$Main$EditorPage : (_elm_lang$core$Native_Utils.eq(_p14, '#/arena') ? _mordrax$cotwelm$Main$ArenaPage : _mordrax$cotwelm$Main$SplashPage)));
};
var _mordrax$cotwelm$Main$init = function (location) {
	var model = {
		currentPage: _mordrax$cotwelm$Main$urlToPage(location),
		charCreation: _mordrax$cotwelm$CharCreation_CharCreation$init,
		game: _elm_lang$core$Maybe$Nothing,
		editor: _mordrax$cotwelm$Dungeon_Editor$init,
		arena: _mordrax$cotwelm$Arena$init
	};
	return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
};
var _mordrax$cotwelm$Main$urlParser = function (location) {
	return _mordrax$cotwelm$Main$ChangePage(
		_mordrax$cotwelm$Main$urlToPage(location));
};
var _mordrax$cotwelm$Main$main = A2(
	_elm_lang$navigation$Navigation$program,
	_mordrax$cotwelm$Main$urlParser,
	{init: _mordrax$cotwelm$Main$init, update: _mordrax$cotwelm$Main$update, view: _mordrax$cotwelm$Main$view, subscriptions: _mordrax$cotwelm$Main$subscriptions})();

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _mordrax$cotwelm$Main$main !== 'undefined') {
    _mordrax$cotwelm$Main$main(Elm['Main'], 'Main', undefined);
}

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

