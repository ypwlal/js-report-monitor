import report from './report'

const Perf = {
    init() {
        const perf = window && window.performance
        if (perf && perf.timing && perf.getEntries) {
            const data = {
                colNum: '',
                msg: 'performance',
                stack: '',
                lineNum: '',
                ext: {
                    performance: {
                        timing: perf.timing,
                        resources: perf.getEntries()
                    }
                },
                level: 5
            }
            report.submit({ isNowSubmit: true, log: data })
        }
    }
}   

export default Perf
