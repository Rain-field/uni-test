var hexcase = 0;
var b64pad = "";

function md5(a) {
    return rstr2hex(rstr_md5(str2rstr_utf8(a))).toUpperCase()
}

function b64_md5(a) {
    return rstr2b64(rstr_md5(str2rstr_utf8(a)))
}

function any_md5(a, b) {
    return rstr2any(rstr_md5(str2rstr_utf8(a)), b)
}

function hex_hmac_md5(a, b) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b)))
}

function b64_hmac_md5(a, b) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b)))
}

function any_hmac_md5(a, c, b) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(c)), b)
}

function rstr_md5(a) {
    return binl2rstr(binl_md5(rstr2binl(a), a.length * 8))
}

function rstr_hmac_md5(c, f) {
    var e = rstr2binl(c);
    if (e.length > 16) {
        e = binl_md5(e, c.length * 8)
    }
    var a = Array(16),
        d = Array(16);
    for (var b = 0; b < 16; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828
    }
    var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8);
    return binl2rstr(binl_md5(d.concat(g), 512 + 128))
}

function rstr2hex(b) {
    try {
        hexcase
    } catch (g) {
        hexcase = 0
    }
    var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var d = "";
    var a;
    for (var c = 0; c < b.length; c++) {
        a = b.charCodeAt(c);
        d += f.charAt((a >>> 4) & 15) + f.charAt(a & 15)
    }
    return d
}

function rstr2b64(b) {
    try {
        b64pad
    } catch (h) {
        b64pad = ""
    }
    var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var f = "";
    var a = b.length;
    for (var d = 0; d < a; d += 3) {
        var k = (b.charCodeAt(d) << 16) | (d + 1 < a ? b.charCodeAt(d + 1) << 8 : 0) | (d + 2 < a ? b.charCodeAt(d + 2) :
            0);
        for (var c = 0; c < 4; c++) {
            if (d * 8 + c * 6 > b.length * 8) {
                f += b64pad
            } else {
                f += g.charAt((k >>> 6 * (3 - c)) & 63)
            }
        }
    }
    return f
}

function rstr2any(n, b) {
    var c = b.length;
    var k, f, a, m, e;
    var h = Array(Math.ceil(n.length / 2));
    for (k = 0; k < h.length; k++) {
        h[k] = (n.charCodeAt(k * 2) << 8) | n.charCodeAt(k * 2 + 1)
    }
    var d = Math.ceil(n.length * 8 / (Math.log(b.length) / Math.log(2)));
    var g = Array(d);
    for (f = 0; f < d; f++) {
        e = Array();
        m = 0;
        for (k = 0; k < h.length; k++) {
            m = (m << 16) + h[k];
            a = Math.floor(m / c);
            m -= a * c;
            if (e.length > 0 || a > 0) {
                e[e.length] = a
            }
        }
        g[f] = m;
        h = e
    }
    var l = "";
    for (k = g.length - 1; k >= 0; k--) {
        l += b.charAt(g[k])
    }
    return l
}

function str2rstr_utf8(b) {
    var d = "";
    var c = -1;
    var a, e;
    while (++c < b.length) {
        a = b.charCodeAt(c);
        e = c + 1 < b.length ? b.charCodeAt(c + 1) : 0;
        if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
            a = 65536 + ((a & 1023) << 10) + (e & 1023);
            c++
        }
        if (a <= 127) {
            d += String.fromCharCode(a)
        } else {
            if (a <= 2047) {
                d += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63))
            } else {
                if (a <= 65535) {
                    d += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a & 63))
                } else {
                    if (a <= 2097151) {
                        d += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((a >>> 6) & 63),
                            128 | (a & 63))
                    }
                }
            }
        }
    }
    return d
}

function str2rstr_utf16le(a) {
    var c = "";
    for (var b = 0; b < a.length; b++) {
        c += String.fromCharCode(a.charCodeAt(b) & 255, (a.charCodeAt(b) >>> 8) & 255)
    }
    return c
}

function str2rstr_utf16be(a) {
    var c = "";
    for (var b = 0; b < a.length; b++) {
        c += String.fromCharCode((a.charCodeAt(b) >>> 8) & 255, a.charCodeAt(b) & 255)
    }
    return c
}

function rstr2binl(a) {
    var c = Array(a.length >> 2);
    for (var b = 0; b < c.length; b++) {
        c[b] = 0
    }
    for (var b = 0; b < a.length * 8; b += 8) {
        c[b >> 5] |= (a.charCodeAt(b / 8) & 255) << (b % 32)
    }
    return c
}

function binl2rstr(a) {
    var c = "";
    for (var b = 0; b < a.length * 32; b += 8) {
        c += String.fromCharCode((a[b >> 5] >>> (b % 32)) & 255)
    }
    return c
}

function binl_md5(o, k) {
    o[k >> 5] |= 128 << ((k) % 32);
    o[(((k + 64) >>> 9) << 4) + 14] = k;
    var p = 1732584193;
    var n = -271733879;
    var m = -1732584194;
    var l = 271733878;
    for (var g = 0; g < o.length; g += 16) {
        var j = p;
        var h = n;
        var f = m;
        var e = l;
        p = md5_ff(p, n, m, l, o[g + 0], 7, -680876936);
        l = md5_ff(l, p, n, m, o[g + 1], 12, -389564586);
        m = md5_ff(m, l, p, n, o[g + 2], 17, 606105819);
        n = md5_ff(n, m, l, p, o[g + 3], 22, -1044525330);
        p = md5_ff(p, n, m, l, o[g + 4], 7, -176418897);
        l = md5_ff(l, p, n, m, o[g + 5], 12, 1200080426);
        m = md5_ff(m, l, p, n, o[g + 6], 17, -1473231341);
        n = md5_ff(n, m, l, p, o[g + 7], 22, -45705983);
        p = md5_ff(p, n, m, l, o[g + 8], 7, 1770035416);
        l = md5_ff(l, p, n, m, o[g + 9], 12, -1958414417);
        m = md5_ff(m, l, p, n, o[g + 10], 17, -42063);
        n = md5_ff(n, m, l, p, o[g + 11], 22, -1990404162);
        p = md5_ff(p, n, m, l, o[g + 12], 7, 1804603682);
        l = md5_ff(l, p, n, m, o[g + 13], 12, -40341101);
        m = md5_ff(m, l, p, n, o[g + 14], 17, -1502002290);
        n = md5_ff(n, m, l, p, o[g + 15], 22, 1236535329);
        p = md5_gg(p, n, m, l, o[g + 1], 5, -165796510);
        l = md5_gg(l, p, n, m, o[g + 6], 9, -1069501632);
        m = md5_gg(m, l, p, n, o[g + 11], 14, 643717713);
        n = md5_gg(n, m, l, p, o[g + 0], 20, -373897302);
        p = md5_gg(p, n, m, l, o[g + 5], 5, -701558691);
        l = md5_gg(l, p, n, m, o[g + 10], 9, 38016083);
        m = md5_gg(m, l, p, n, o[g + 15], 14, -660478335);
        n = md5_gg(n, m, l, p, o[g + 4], 20, -405537848);
        p = md5_gg(p, n, m, l, o[g + 9], 5, 568446438);
        l = md5_gg(l, p, n, m, o[g + 14], 9, -1019803690);
        m = md5_gg(m, l, p, n, o[g + 3], 14, -187363961);
        n = md5_gg(n, m, l, p, o[g + 8], 20, 1163531501);
        p = md5_gg(p, n, m, l, o[g + 13], 5, -1444681467);
        l = md5_gg(l, p, n, m, o[g + 2], 9, -51403784);
        m = md5_gg(m, l, p, n, o[g + 7], 14, 1735328473);
        n = md5_gg(n, m, l, p, o[g + 12], 20, -1926607734);
        p = md5_hh(p, n, m, l, o[g + 5], 4, -378558);
        l = md5_hh(l, p, n, m, o[g + 8], 11, -2022574463);
        m = md5_hh(m, l, p, n, o[g + 11], 16, 1839030562);
        n = md5_hh(n, m, l, p, o[g + 14], 23, -35309556);
        p = md5_hh(p, n, m, l, o[g + 1], 4, -1530992060);
        l = md5_hh(l, p, n, m, o[g + 4], 11, 1272893353);
        m = md5_hh(m, l, p, n, o[g + 7], 16, -155497632);
        n = md5_hh(n, m, l, p, o[g + 10], 23, -1094730640);
        p = md5_hh(p, n, m, l, o[g + 13], 4, 681279174);
        l = md5_hh(l, p, n, m, o[g + 0], 11, -358537222);
        m = md5_hh(m, l, p, n, o[g + 3], 16, -722521979);
        n = md5_hh(n, m, l, p, o[g + 6], 23, 76029189);
        p = md5_hh(p, n, m, l, o[g + 9], 4, -640364487);
        l = md5_hh(l, p, n, m, o[g + 12], 11, -421815835);
        m = md5_hh(m, l, p, n, o[g + 15], 16, 530742520);
        n = md5_hh(n, m, l, p, o[g + 2], 23, -995338651);
        p = md5_ii(p, n, m, l, o[g + 0], 6, -198630844);
        l = md5_ii(l, p, n, m, o[g + 7], 10, 1126891415);
        m = md5_ii(m, l, p, n, o[g + 14], 15, -1416354905);
        n = md5_ii(n, m, l, p, o[g + 5], 21, -57434055);
        p = md5_ii(p, n, m, l, o[g + 12], 6, 1700485571);
        l = md5_ii(l, p, n, m, o[g + 3], 10, -1894986606);
        m = md5_ii(m, l, p, n, o[g + 10], 15, -1051523);
        n = md5_ii(n, m, l, p, o[g + 1], 21, -2054922799);
        p = md5_ii(p, n, m, l, o[g + 8], 6, 1873313359);
        l = md5_ii(l, p, n, m, o[g + 15], 10, -30611744);
        m = md5_ii(m, l, p, n, o[g + 6], 15, -1560198380);
        n = md5_ii(n, m, l, p, o[g + 13], 21, 1309151649);
        p = md5_ii(p, n, m, l, o[g + 4], 6, -145523070);
        l = md5_ii(l, p, n, m, o[g + 11], 10, -1120210379);
        m = md5_ii(m, l, p, n, o[g + 2], 15, 718787259);
        n = md5_ii(n, m, l, p, o[g + 9], 21, -343485551);
        p = safe_add(p, j);
        n = safe_add(n, h);
        m = safe_add(m, f);
        l = safe_add(l, e)
    }
    return Array(p, n, m, l)
}

function md5_cmn(h, e, d, c, g, f) {
    return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
}

function md5_ff(g, f, k, j, e, i, h) {
    return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h)
}

function md5_gg(g, f, k, j, e, i, h) {
    return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h)
}

function md5_hh(g, f, k, j, e, i, h) {
    return md5_cmn(f ^ k ^ j, g, f, e, i, h)
}

function md5_ii(g, f, k, j, e, i, h) {
    return md5_cmn(k ^ (f | (~j)), g, f, e, i, h)
}

function safe_add(a, d) {
    var c = (a & 65535) + (d & 65535);
    var b = (a >> 16) + (d >> 16) + (c >> 16);
    return (b << 16) | (c & 65535)
}

function bit_rol(a, b) {
    return (a << b) | (a >>> (32 - b))
};

export default {
	md5: function(data) {
		return md5(data);
	}
}