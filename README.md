# js-error-monitor

## Types && ideas

* **js error**  -->  window.onerror
* **statics files**  -->  addEventListener('error')
* **ajax request**  -->  xhr.prototype.send xhr.onreadystatechange
* **console/jquery/setTimeout/setInterval**  -->  wrap func using call/apply and arguments
* **performance**  -->  performance.timing/getEntries (window.onload)

## Usage

~~~
    // 1. through browser

    <script src="../dist/main.js"></script>
    <script>
        window.MREPORT.config.requestHeaders = {
            'SOMTHING-CLIENT': 'H5',
            'SOMTHING-VERSION': '0.0.1'
        }
        window.MREPORT.config.ext = function ext() {
            return {
                userId: localStorage.userId
            }
        }
        window.MREPORT.init(window)
    </script>

    // 2. custom
    import MREPORT from 'm-js-repost'

~~~

## (Thinking) To design a sdk framework

1. Module class es6
2. Module cmd
3. function and prototype (oo)
4. object --> `this` problem, scope and structrue
