const config = {
    url: '', // 上报地址
    noReuqest: false,
    request: null, // request function, new Image for default
    requestHeaders: {}, // use for request headers, obj or func
    requestImg: false, // use img to report
    combo: true, // 是否合并上报
    delay: 2000, // 延迟上报
    level: 4, // 错误等级1-debug 2-info 3-statics 4-error 5-perf
    ignore: [], // [/^Script error\.?/, /^Javascript error: Script error\.? on line 0/]
    random: 1, // 抽样上报1~0, 1 for 100%
    repeat: 5, // 重复上报次数
    encrypt: false, // encrypt
    reportPerf: true, // performance timing and resource
    wrapAll: false,
    wrapJquery: false,
    wrapConsole: false,
    wrapTimer: false,
    wrapAjax: true,
    ext: {} // extra info, func or obj like ext: { a: 1 }
}

export default config
