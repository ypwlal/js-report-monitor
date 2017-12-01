import report from './core'

report.config.url = 'https://test'

report.config.request = function request(data, cb) {
    const xhr = new XMLHttpRequest()
    const headers = {}
    xhr.open('post', config.url)
    keys.forEach(item => xhr.setRequestHeader(item, headers[item]))
    xhr.onreadystatechange = function onreadystatechange() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb && cb()
        }
    }
    return xhr.send(JSON.stringify(data))
}


window.MREPORT = report

export default report
