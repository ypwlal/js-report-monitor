import utils from './utils'
import config from './config'
import request from './request'

const report = {

    reportQueue: [],

    errorMap: {},

    timeout: null,

    request,
    
    push(error) {
        const data = this.wrappSystemData(Object.assign({}, error))

        if (this.checkError(data)) {
            this.reportQueue.push(data) 
        }

        return this
    },

    isRepeat(error) {
        const key = error.msg + (error.lineNum || '') + (error.colNum || '')

        this.errorMap[key] = this.errorMap[key] ? this.errorMap[key] + 1 : 1

        return this.errorMap[key] > config.repeat
    },

    isIngore(error) {
        let result = false
        for (let i = 0; i < config.ignore.length; i += 1) {
            const ignore = config.ignore[i]

            if ((utils.isType(ignore, 'RegExp') && ignore.test(error.msg)) || 
                (utils.isType(ignore, 'Function') && ignore(error, error.msg))) {
                result = true
                break
            }
        }
        return result
    },

    isHitRandom() {
        return Math.random() < config.random
    },

    checkError(error) {
        return !this.isRepeat(error) && !this.isIngore(error) && this.isHitRandom()
    },

    wrappSystemData(data) {
        data = this.wrappExtData(data)

        if (data.globalInfo) {
            return data
        }

        let _data
        if (!utils.isType(data, 'Array')) {
            _data = Object.assign({}, { globalInfo: utils.getGlobalParams() }, data)
        } else {
            _data = data.map(item => Object.assign({}, { globalInfo: utils.getGlobalParams() }, item))
        }

        return _data
    },

    wrappExtData(data) {
        if (config.ext) {
            if (utils.isType(config.ext, 'Function')) {
                data.ext = Object.assign({}, data.ext, config.ext())
            } else if (utils.isType(config.ext, 'Object')) {
                data.ext = Object.assign({}, data.ext, config.ext)
            }
        }

        return data
    },

    submit({ isNowSubmit, log, cb }) {
        // 立即上传
        if (isNowSubmit && log) {
            const _log = utils.isType(log, 'Array') ? this.wrappSystemData(log) : [this.wrappSystemData(log)]
            this.request(_log, cb)
        }

        if (!this.reportQueue.length) {
            return undefined
        }
        
        // 策略上传
        if (config.delay && config.combo) {
            this.timeout = setTimeout(() => {
                this.request(this.reportQueue, () => {
                    this.reportQueue = []
                    cb && cb()
                })
            }, config.delay)
        } else {
            this.request(this.reportQueue, cb)
        }
        
        return this
    }
}

export default report
