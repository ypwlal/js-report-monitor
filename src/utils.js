const utils = {
    isType(o, type) {
        return Object.prototype.toString.call(o) === `[object ${type}]`
    },

    toArray(args) {
        return Array.prototype.slice.call(args)
    },

    getUserAgent() {
        return window.navigator.userAgent
    },

    getPlatform() {
        try {
            document.createEvent('TouchEvent')
            return 'Mobile'
        } catch (e) {
            return 'PC'
        }
    },

    flashVer() {
        let f = '-'
        if (navigator.plugins && navigator.plugins.length) {
            for (let ii = 0; ii < navigator.plugins.length; ii += 1) {
                if (navigator.plugins[ii].name.indexOf('Shockwave Flash') !== -1) {
                    f = navigator.plugins[ii].description.split('Shockwave Flash ')[1]
                    break
                }
            }
        } else if (window.ActiveXObject) {
            for (let ii = 10; ii >= 2; ii -= 1) {
                try {
                    const fl = new Function(`return new ActiveXObject('ShockwaveFlash.ShockwaveFlash.${ii})`)()
                    if (fl) {
                        f = ii + '.0'
                        break
                    }
                } catch (e) {
                    // do nothing
                }
            }
        }
        return f
    },

    getGlobalParams() {
        const scr = window.screen
        return {
            userAgent: utils.getUserAgent(),
            currentUrl: window.location.href,
            timestamp: +new Date() + Math.random(),
            platType: utils.getPlatform(),
            flashVer: utils.flashVer(),
            title: encodeURIComponent(document.title),
            screenSize: scr.width + 'x' + scr.height,
            referer: location.hostname ? location.hostname : '',
            host: window.location.protocol + '//' + window.location.hostname
        }
    }
}

export default utils
