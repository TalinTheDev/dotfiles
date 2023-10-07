(function(define) {
    var __define;
    typeof define === "function" && (__define = define, define = null);
    // modules are defined as an array
    // [ module function, map of requires ]
    //
    // map of requires is short require name -> numeric require
    //
    // anything defined in a previous bundle is accessed via the
    // orig method which is the require for previous bundles
    (function(modules, entry, mainEntry, parcelRequireName, globalName) {
        /* eslint-disable no-undef */ var globalObject = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
        /* eslint-enable no-undef */ // Save the require from previous bundle to this closure if any
        var previousRequire = typeof globalObject[parcelRequireName] === 'function' && globalObject[parcelRequireName];
        var cache = previousRequire.cache || {};
        // Do not use `require` to prevent Webpack from trying to bundle this call
        var nodeRequire = typeof module !== 'undefined' && typeof module.require === 'function' && module.require.bind(module);
        function newRequire(name, jumped) {
            if (!cache[name]) {
                if (!modules[name]) {
                    // if we cannot find the module within our internal map or
                    // cache jump to the current global require ie. the last bundle
                    // that was added to the page.
                    var currentRequire = typeof globalObject[parcelRequireName] === 'function' && globalObject[parcelRequireName];
                    if (!jumped && currentRequire) {
                        return currentRequire(name, true);
                    }
                    // If there are other bundles on this page the require from the
                    // previous one is saved to 'previousRequire'. Repeat this as
                    // many times as there are bundles until the module is found or
                    // we exhaust the require chain.
                    if (previousRequire) {
                        return previousRequire(name, true);
                    }
                    // Try the node require function if it exists.
                    if (nodeRequire && typeof name === 'string') {
                        return nodeRequire(name);
                    }
                    var err = new Error("Cannot find module '" + name + "'");
                    err.code = 'MODULE_NOT_FOUND';
                    throw err;
                }
                localRequire.resolve = resolve;
                localRequire.cache = {};
                var module1 = cache[name] = new newRequire.Module(name);
                modules[name][0].call(module1.exports, localRequire, module1, module1.exports, this);
            }
            return cache[name].exports;
            function localRequire(x) {
                var res = localRequire.resolve(x);
                return res === false ? {} : newRequire(res);
            }
            function resolve(x) {
                var id = modules[name][1][x];
                return id != null ? id : x;
            }
        }
        function Module(moduleName) {
            this.id = moduleName;
            this.bundle = newRequire;
            this.exports = {};
        }
        newRequire.isParcelRequire = true;
        newRequire.Module = Module;
        newRequire.modules = modules;
        newRequire.cache = cache;
        newRequire.parent = previousRequire;
        newRequire.register = function(id, exports1) {
            modules[id] = [
                function(require, module1) {
                    module1.exports = exports1;
                },
                {}
            ];
        };
        Object.defineProperty(newRequire, 'root', {
            get: function() {
                return globalObject[parcelRequireName];
            }
        });
        globalObject[parcelRequireName] = newRequire;
        for(var i = 0; i < entry.length; i++){
            newRequire(entry[i]);
        }
        if (mainEntry) {
            // Expose entry point to Node, AMD or browser globals
            // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
            var mainExports = newRequire(mainEntry);
            // CommonJS
            if (typeof exports === 'object' && typeof module !== 'undefined') {
                module.exports = mainExports;
            // RequireJS
            } else if (typeof define === 'function' && define.amd) {
                define(function() {
                    return mainExports;
                });
            // <script>
            } else if (globalName) {
                this[globalName] = mainExports;
            }
        }
    })({
        "j2fT0": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "config", ()=>config);
                var _storage = require("@plasmohq/storage");
                var _storage1 = require("~storage");
                var _parseEndpoint = require("~utils/parse-endpoint");
                var _constants = require("~constants");
                /**
 * Checks if the current site is a Gitpod instance.
 */ const isSiteGitpod = ()=>{
                    return !!document.head.querySelector("meta[name=Gitpod]");
                };
                const config = {
                    matches: [
                        "https://*/*"
                    ]
                };
                const storage = new (0, _storage.Storage)();
                const automaticallyUpdateEndpoint = async ()=>{
                    if (await storage.get((0, _storage1.STORAGE_AUTOMATICALLY_DETECT_GITPOD)) === false) return;
                    const currentUserSetEndpoint = await storage.get((0, _storage1.STORAGE_KEY_ADDRESS));
                    if (!currentUserSetEndpoint || currentUserSetEndpoint === (0, _constants.DEFAULT_GITPOD_ENDPOINT)) {
                        const currentHost = window.location.host;
                        if (currentHost !== new URL((0, _constants.DEFAULT_GITPOD_ENDPOINT)).host) {
                            console.log(`Gitpod extension: switching default endpoint to ${currentHost}.`);
                            await storage.set((0, _storage1.STORAGE_KEY_ADDRESS), (0, _parseEndpoint.parseEndpoint)(currentHost));
                        }
                    }
                };
                if (isSiteGitpod()) {
                    sessionStorage.setItem("browser-extension-installed", "true");
                    automaticallyUpdateEndpoint();
                }
            },
            {
                "@plasmohq/storage": "9EoZ0",
                "~storage": "6OWnX",
                "~utils/parse-endpoint": "amgK8",
                "~constants": "HekoT",
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "9EoZ0": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "BaseStorage", ()=>o);
                parcelHelpers.export(exports1, "Storage", ()=>l);
                var _pify = require("pify");
                var _pifyDefault = parcelHelpers.interopDefault(_pify);
                var h = ()=>{
                    try {
                        let e = globalThis.navigator?.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                        if (e[1] === "Chrome") return parseInt(e[2]) < 100 || globalThis.chrome.runtime?.getManifest()?.manifest_version === 2;
                    } catch  {
                        return !1;
                    }
                    return !1;
                };
                var o = class {
                    #a;
                    #e;
                    get primaryClient() {
                        return this.#e;
                    }
                    #t;
                    get secondaryClient() {
                        return this.#t;
                    }
                    #r;
                    get area() {
                        return this.#r;
                    }
                    get hasWebApi() {
                        try {
                            return typeof window < "u" && !!window.localStorage;
                        } catch (e) {
                            return console.error(e), !1;
                        }
                    }
                    #s = new Map;
                    #i;
                    get copiedKeySet() {
                        return this.#i;
                    }
                    isCopied = (e)=>this.hasWebApi && (this.allCopied || this.copiedKeySet.has(e));
                    #n = !1;
                    get allCopied() {
                        return this.#n;
                    }
                    getExtStorageApi = ()=>globalThis.browser?.storage || globalThis.chrome?.storage;
                    get hasExtensionApi() {
                        try {
                            return !!this.getExtStorageApi();
                        } catch (e) {
                            return console.error(e), !1;
                        }
                    }
                    isWatchSupported = ()=>this.hasExtensionApi;
                    keyNamespace = "";
                    isValidKey = (e)=>e.startsWith(this.keyNamespace);
                    getNamespacedKey = (e)=>`${this.keyNamespace}${e}`;
                    getUnnamespacedKey = (e)=>e.slice(this.keyNamespace.length);
                    constructor({ area: e = "sync", allCopied: t = !1, copiedKeyList: s = [] } = {}){
                        this.setCopiedKeySet(s), this.#r = e, this.#n = t;
                        try {
                            this.hasWebApi && (t || s.length > 0) && (this.#t = window.localStorage);
                        } catch  {}
                        try {
                            this.hasExtensionApi && (this.#a = this.getExtStorageApi(), h() ? this.#e = (0, _pifyDefault.default)(this.#a[this.area], {
                                exclude: [
                                    "getBytesInUse"
                                ],
                                errorFirst: !1
                            }) : this.#e = this.#a[this.area]);
                        } catch  {}
                    }
                    setCopiedKeySet(e) {
                        this.#i = new Set(e);
                    }
                    rawGetAll = ()=>this.#e?.get();
                    getAll = async ()=>{
                        let e = await this.rawGetAll();
                        return Object.entries(e).filter(([t])=>this.isValidKey(t)).reduce((t, [s, a])=>(t[this.getUnnamespacedKey(s)] = a, t), {});
                    };
                    copy = async (e)=>{
                        let t = e === void 0;
                        if (!t && !this.copiedKeySet.has(e) || !this.allCopied || !this.hasExtensionApi) return !1;
                        let s = this.allCopied ? await this.rawGetAll() : await this.#e.get((t ? [
                            ...this.copiedKeySet
                        ] : [
                            e
                        ]).map(this.getNamespacedKey));
                        if (!s) return !1;
                        let a = !1;
                        for(let r in s){
                            let i = s[r], n = this.#t?.getItem(r);
                            this.#t?.setItem(r, i), a ||= i !== n;
                        }
                        return a;
                    };
                    rawGet = async (e)=>this.hasExtensionApi ? (await this.#e.get(e))[e] : this.isCopied(e) ? this.#t?.getItem(e) : null;
                    rawSet = async (e, t)=>(this.isCopied(e) && this.#t?.setItem(e, t), this.hasExtensionApi && await this.#e.set({
                            [e]: t
                        }), null);
                    clear = async (e = !1)=>{
                        e && this.#t?.clear(), await this.#e.clear();
                    };
                    rawRemove = async (e)=>{
                        this.isCopied(e) && this.#t?.removeItem(e), this.hasExtensionApi && await this.#e.remove(e);
                    };
                    removeAll = async ()=>{
                        let e = await this.rawGetAll(), t = Object.keys(e);
                        await Promise.all(t.map(this.rawRemove));
                    };
                    watch = (e)=>{
                        let t = this.isWatchSupported();
                        return t && this.#o(e), t;
                    };
                    #o = (e)=>{
                        for(let t in e){
                            let s = this.getNamespacedKey(t), a = this.#s.get(s)?.callbackSet || new Set;
                            if (a.add(e[t]), a.size > 1) continue;
                            let r = (i, n)=>{
                                if (n !== this.area || !i[s]) return;
                                let g = this.#s.get(s);
                                Promise.all([
                                    this.parseValue(i[s].newValue),
                                    this.parseValue(i[s].oldValue)
                                ]).then(([p, m])=>{
                                    for (let d of g.callbackSet)d({
                                        newValue: p,
                                        oldValue: m
                                    }, n);
                                });
                            };
                            this.#a.onChanged.addListener(r), this.#s.set(s, {
                                callbackSet: a,
                                listener: r
                            });
                        }
                    };
                    unwatch = (e)=>{
                        let t = this.isWatchSupported();
                        return t && this.#c(e), t;
                    };
                    #c(e) {
                        for(let t in e){
                            let s = this.getNamespacedKey(t), a = e[t];
                            if (this.#s.has(s)) {
                                let r = this.#s.get(s);
                                r.callbackSet.delete(a), r.callbackSet.size === 0 && (this.#s.delete(s), this.#a.onChanged.removeListener(r.listener));
                            }
                        }
                    }
                    unwatchAll = ()=>this.#h();
                    #h() {
                        this.#s.forEach(({ listener: e })=>this.#a.onChanged.removeListener(e)), this.#s.clear();
                    }
                    async getItem(e) {
                        return this.get(e);
                    }
                    async setItem(e, t) {
                        await this.set(e, t);
                    }
                    async removeItem(e) {
                        return this.remove(e);
                    }
                }, l = class extends o {
                    get = async (e)=>{
                        let t = this.getNamespacedKey(e), s = await this.rawGet(t);
                        return this.parseValue(s);
                    };
                    set = async (e, t)=>{
                        let s = this.getNamespacedKey(e), a = JSON.stringify(t);
                        return this.rawSet(s, a);
                    };
                    remove = async (e)=>{
                        let t = this.getNamespacedKey(e);
                        return this.rawRemove(t);
                    };
                    setNamespace = (e)=>{
                        this.keyNamespace = e;
                    };
                    parseValue = async (e)=>{
                        try {
                            if (e !== void 0) return JSON.parse(e);
                        } catch (t) {
                            console.error(t);
                        }
                    };
                };
            },
            {
                "pify": "2UGqk",
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "2UGqk": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "default", ()=>pify);
                const processFunction = (function_, options, proxy, unwrapped)=>function(...arguments_) {
                        const P = options.promiseModule;
                        return new P((resolve, reject)=>{
                            if (options.multiArgs) arguments_.push((...result)=>{
                                if (options.errorFirst) {
                                    if (result[0]) reject(result);
                                    else {
                                        result.shift();
                                        resolve(result);
                                    }
                                } else resolve(result);
                            });
                            else if (options.errorFirst) arguments_.push((error, result)=>{
                                if (error) reject(error);
                                else resolve(result);
                            });
                            else arguments_.push(resolve);
                            const self1 = this === proxy ? unwrapped : this;
                            Reflect.apply(function_, self1, arguments_);
                        });
                    };
                const filterCache = new WeakMap();
                function pify(input, options) {
                    options = {
                        exclude: [
                            /.+(?:Sync|Stream)$/
                        ],
                        errorFirst: true,
                        promiseModule: Promise,
                        ...options
                    };
                    const objectType = typeof input;
                    if (!(input !== null && (objectType === "object" || objectType === "function"))) throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objectType}\``);
                    const filter = (target, key)=>{
                        let cached = filterCache.get(target);
                        if (!cached) {
                            cached = {};
                            filterCache.set(target, cached);
                        }
                        if (key in cached) return cached[key];
                        const match = (pattern)=>typeof pattern === "string" || typeof key === "symbol" ? key === pattern : pattern.test(key);
                        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
                        const writableOrConfigurableOwn = descriptor === undefined || descriptor.writable || descriptor.configurable;
                        const included = options.include ? options.include.some((element)=>match(element)) : !options.exclude.some((element)=>match(element));
                        const shouldFilter = included && writableOrConfigurableOwn;
                        cached[key] = shouldFilter;
                        return shouldFilter;
                    };
                    const cache = new WeakMap();
                    const proxy = new Proxy(input, {
                        apply (target, thisArg, args) {
                            const cached = cache.get(target);
                            if (cached) return Reflect.apply(cached, thisArg, args);
                            const pified = options.excludeMain ? target : processFunction(target, options, proxy, target);
                            cache.set(target, pified);
                            return Reflect.apply(pified, thisArg, args);
                        },
                        get (target, key) {
                            const property = target[key];
                            // eslint-disable-next-line no-use-extend-native/no-use-extend-native
                            if (!filter(target, key) || property === Function.prototype[key]) return property;
                            const cached = cache.get(property);
                            if (cached) return cached;
                            if (typeof property === "function") {
                                const pified = processFunction(property, options, proxy, target);
                                cache.set(property, pified);
                                return pified;
                            }
                            return property;
                        }
                    });
                    return proxy;
                }
            },
            {
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "z4dxc": [
            function(require, module1, exports1) {
                exports1.interopDefault = function(a) {
                    return a && a.__esModule ? a : {
                        default: a
                    };
                };
                exports1.defineInteropFlag = function(a) {
                    Object.defineProperty(a, "__esModule", {
                        value: true
                    });
                };
                exports1.exportAll = function(source, dest) {
                    Object.keys(source).forEach(function(key) {
                        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
                        Object.defineProperty(dest, key, {
                            enumerable: true,
                            get: function() {
                                return source[key];
                            }
                        });
                    });
                    return dest;
                };
                exports1.export = function(dest, destName, get) {
                    Object.defineProperty(dest, destName, {
                        enumerable: true,
                        get: get
                    });
                };
            },
            {}
        ],
        "6OWnX": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "STORAGE_KEY_ADDRESS", ()=>STORAGE_KEY_ADDRESS);
                parcelHelpers.export(exports1, "STORAGE_KEY_NEW_TAB", ()=>STORAGE_KEY_NEW_TAB);
                parcelHelpers.export(exports1, "STORAGE_AUTOMATICALLY_DETECT_GITPOD", ()=>STORAGE_AUTOMATICALLY_DETECT_GITPOD);
                const STORAGE_KEY_ADDRESS = "gitpod-installation-address";
                const STORAGE_KEY_NEW_TAB = "gitpod-installation-new-tab";
                const STORAGE_AUTOMATICALLY_DETECT_GITPOD = "gitpod-installation-automatically-detect-gitpod";
            },
            {
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "amgK8": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "parseEndpoint", ()=>parseEndpoint);
                var _isURL = require("validator/es/lib/isURL");
                var _isURLDefault = parcelHelpers.interopDefault(_isURL);
                const parseEndpoint = (input)=>{
                    let url;
                    if ((0, _isURLDefault.default)(input, {
                        require_protocol: true,
                        protocols: [
                            "https"
                        ]
                    })) url = new URL(input);
                    else if ((0, _isURLDefault.default)(input, {
                        require_protocol: false,
                        protocols: [
                            "https"
                        ]
                    })) url = new URL(`https://${input}`);
                    else throw new TypeError(`Invalid URL: ${input}`);
                    return `${url.protocol}//${url.host}`;
                };
            },
            {
                "validator/es/lib/isURL": "3hAea",
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "3hAea": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "default", ()=>isURL);
                var _assertString = require("./util/assertString");
                var _assertStringDefault = parcelHelpers.interopDefault(_assertString);
                var _isFQDN = require("./isFQDN");
                var _isFQDNDefault = parcelHelpers.interopDefault(_isFQDN);
                var _isIP = require("./isIP");
                var _isIPDefault = parcelHelpers.interopDefault(_isIP);
                var _merge = require("./util/merge");
                var _mergeDefault = parcelHelpers.interopDefault(_merge);
                function _slicedToArray(arr, i) {
                    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
                }
                function _nonIterableRest() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function _unsupportedIterableToArray(o, minLen) {
                    if (!o) return;
                    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
                    var n = Object.prototype.toString.call(o).slice(8, -1);
                    if (n === "Object" && o.constructor) n = o.constructor.name;
                    if (n === "Map" || n === "Set") return Array.from(o);
                    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
                }
                function _arrayLikeToArray(arr, len) {
                    if (len == null || len > arr.length) len = arr.length;
                    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
                    return arr2;
                }
                function _iterableToArrayLimit(arr, i) {
                    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;
                    try {
                        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally{
                        try {
                            if (!_n && _i["return"] != null) _i["return"]();
                        } finally{
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                function _arrayWithHoles(arr) {
                    if (Array.isArray(arr)) return arr;
                }
                /*
options for isURL method

require_protocol - if set as true isURL will return false if protocol is not present in the URL
require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
protocols - valid protocols can be modified with this option
require_host - if set as false isURL will not check if host is present in the URL
require_port - if set as true isURL will check if port is present in the URL
allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
validate_length - if set as false isURL will skip string length validation (IE maximum is 2083)

*/ var default_url_options = {
                    protocols: [
                        "http",
                        "https",
                        "ftp"
                    ],
                    require_tld: true,
                    require_protocol: false,
                    require_host: true,
                    require_port: false,
                    require_valid_protocol: true,
                    allow_underscores: false,
                    allow_trailing_dot: false,
                    allow_protocol_relative_urls: false,
                    allow_fragments: true,
                    allow_query_components: true,
                    validate_length: true
                };
                var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
                function isRegExp(obj) {
                    return Object.prototype.toString.call(obj) === "[object RegExp]";
                }
                function checkHost(host, matches) {
                    for(var i = 0; i < matches.length; i++){
                        var match = matches[i];
                        if (host === match || isRegExp(match) && match.test(host)) return true;
                    }
                    return false;
                }
                function isURL(url, options) {
                    (0, _assertStringDefault.default)(url);
                    if (!url || /[\s<>]/.test(url)) return false;
                    if (url.indexOf("mailto:") === 0) return false;
                    options = (0, _mergeDefault.default)(options, default_url_options);
                    if (options.validate_length && url.length >= 2083) return false;
                    if (!options.allow_fragments && url.includes("#")) return false;
                    if (!options.allow_query_components && (url.includes("?") || url.includes("&"))) return false;
                    var protocol, auth, host, hostname, port, port_str, split, ipv6;
                    split = url.split("#");
                    url = split.shift();
                    split = url.split("?");
                    url = split.shift();
                    split = url.split("://");
                    if (split.length > 1) {
                        protocol = split.shift().toLowerCase();
                        if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) return false;
                    } else if (options.require_protocol) return false;
                    else if (url.slice(0, 2) === "//") {
                        if (!options.allow_protocol_relative_urls) return false;
                        split[0] = url.slice(2);
                    }
                    url = split.join("://");
                    if (url === "") return false;
                    split = url.split("/");
                    url = split.shift();
                    if (url === "" && !options.require_host) return true;
                    split = url.split("@");
                    if (split.length > 1) {
                        if (options.disallow_auth) return false;
                        if (split[0] === "") return false;
                        auth = split.shift();
                        if (auth.indexOf(":") >= 0 && auth.split(":").length > 2) return false;
                        var _auth$split = auth.split(":"), _auth$split2 = _slicedToArray(_auth$split, 2), user = _auth$split2[0], password = _auth$split2[1];
                        if (user === "" && password === "") return false;
                    }
                    hostname = split.join("@");
                    port_str = null;
                    ipv6 = null;
                    var ipv6_match = hostname.match(wrapped_ipv6);
                    if (ipv6_match) {
                        host = "";
                        ipv6 = ipv6_match[1];
                        port_str = ipv6_match[2] || null;
                    } else {
                        split = hostname.split(":");
                        host = split.shift();
                        if (split.length) port_str = split.join(":");
                    }
                    if (port_str !== null && port_str.length > 0) {
                        port = parseInt(port_str, 10);
                        if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) return false;
                    } else if (options.require_port) return false;
                    if (options.host_whitelist) return checkHost(host, options.host_whitelist);
                    if (host === "" && !options.require_host) return true;
                    if (!(0, _isIPDefault.default)(host) && !(0, _isFQDNDefault.default)(host, options) && (!ipv6 || !(0, _isIPDefault.default)(ipv6, 6))) return false;
                    host = host || ipv6;
                    if (options.host_blacklist && checkHost(host, options.host_blacklist)) return false;
                    return true;
                }
            },
            {
                "./util/assertString": "gSsg9",
                "./isFQDN": "bQcWZ",
                "./isIP": "8eov5",
                "./util/merge": "k6EEL",
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "gSsg9": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "default", ()=>assertString);
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                    else _typeof = function _typeof(obj) {
                        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                    return _typeof(obj);
                }
                function assertString(input) {
                    var isString = typeof input === "string" || input instanceof String;
                    if (!isString) {
                        var invalidType = _typeof(input);
                        if (input === null) invalidType = "null";
                        else if (invalidType === "object") invalidType = input.constructor.name;
                        throw new TypeError("Expected a string but received a ".concat(invalidType));
                    }
                }
            },
            {
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "bQcWZ": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "default", ()=>isFQDN);
                var _assertString = require("./util/assertString");
                var _assertStringDefault = parcelHelpers.interopDefault(_assertString);
                var _merge = require("./util/merge");
                var _mergeDefault = parcelHelpers.interopDefault(_merge);
                var default_fqdn_options = {
                    require_tld: true,
                    allow_underscores: false,
                    allow_trailing_dot: false,
                    allow_numeric_tld: false,
                    allow_wildcard: false,
                    ignore_max_length: false
                };
                function isFQDN(str, options) {
                    (0, _assertStringDefault.default)(str);
                    options = (0, _mergeDefault.default)(options, default_fqdn_options);
                    /* Remove the optional trailing dot before checking validity */ if (options.allow_trailing_dot && str[str.length - 1] === ".") str = str.substring(0, str.length - 1);
                    /* Remove the optional wildcard before checking validity */ if (options.allow_wildcard === true && str.indexOf("*.") === 0) str = str.substring(2);
                    var parts = str.split(".");
                    var tld = parts[parts.length - 1];
                    if (options.require_tld) {
                        // disallow fqdns without tld
                        if (parts.length < 2) return false;
                        if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) return false;
                        // disallow spaces
                        if (/\s/.test(tld)) return false;
                    } // reject numeric TLDs
                    if (!options.allow_numeric_tld && /^\d+$/.test(tld)) return false;
                    return parts.every(function(part) {
                        if (part.length > 63 && !options.ignore_max_length) return false;
                        if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) return false;
                        // disallow full-width chars
                        if (/[\uff01-\uff5e]/.test(part)) return false;
                        // disallow parts starting or ending with hyphen
                        if (/^-|-$/.test(part)) return false;
                        if (!options.allow_underscores && /_/.test(part)) return false;
                        return true;
                    });
                }
            },
            {
                "./util/assertString": "gSsg9",
                "./util/merge": "k6EEL",
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "k6EEL": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "default", ()=>merge);
                function merge() {
                    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    var defaults = arguments.length > 1 ? arguments[1] : undefined;
                    for(var key in defaults)if (typeof obj[key] === "undefined") obj[key] = defaults[key];
                    return obj;
                }
            },
            {
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "8eov5": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "default", ()=>isIP);
                var _assertString = require("./util/assertString");
                var _assertStringDefault = parcelHelpers.interopDefault(_assertString);
                /**
11.3.  Examples

   The following addresses

             fe80::1234 (on the 1st link of the node)
             ff02::5678 (on the 5th link of the node)
             ff08::9abc (on the 10th organization of the node)

   would be represented as follows:

             fe80::1234%1
             ff02::5678%5
             ff08::9abc%10

   (Here we assume a natural translation from a zone index to the
   <zone_id> part, where the Nth zone of any scope is translated into
   "N".)

   If we use interface names as <zone_id>, those addresses could also be
   represented as follows:

            fe80::1234%ne0
            ff02::5678%pvc1.3
            ff08::9abc%interface10

   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
   to the 5th link, and "interface10" belongs to the 10th organization.
 * * */ var IPv4SegmentFormat = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
                var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
                var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
                var IPv6SegmentFormat = "(?:[0-9a-fA-F]{1,4})";
                var IPv6AddressRegExp = new RegExp("^(" + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ")(%[0-9a-zA-Z-.:]{1,})?$");
                function isIP(str) {
                    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
                    (0, _assertStringDefault.default)(str);
                    version = String(version);
                    if (!version) return isIP(str, 4) || isIP(str, 6);
                    if (version === "4") return IPv4AddressRegExp.test(str);
                    if (version === "6") return IPv6AddressRegExp.test(str);
                    return false;
                }
            },
            {
                "./util/assertString": "gSsg9",
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ],
        "HekoT": [
            function(require, module1, exports1) {
                var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
                parcelHelpers.defineInteropFlag(exports1);
                parcelHelpers.export(exports1, "DEFAULT_GITPOD_ENDPOINT", ()=>DEFAULT_GITPOD_ENDPOINT);
                const DEFAULT_GITPOD_ENDPOINT = "https://gitpod.io";
            },
            {
                "@parcel/transformer-js/src/esmodule-helpers.js": "z4dxc"
            }
        ]
    }, [
        "j2fT0"
    ], "j2fT0", "parcelRequire24b8");
    //# sourceMappingURL=gitpod-dashboard.24c15cff.js.map
    globalThis.define = __define;
})(globalThis.define);

//# sourceMappingURL=gitpod-dashboard.24c15cff.js.map
