import Script from 'next/script'

const BING_UET_TAG_ID = '56354835'

export function BingUetScript() {
  return (
    <Script id="bing-uet" strategy="beforeInteractive">{`
      (function (w, d, t, r, u) {
        var f, n, i;
        ((w[u] = w[u] || []),
          (f = function () {
            var o = { ti: "${BING_UET_TAG_ID}" };
            ((o.q = w[u]), (w[u] = new UET(o)), w[u].push("pageLoad"));
          }),
          (n = d.createElement(t)),
          (n.src = r),
          (n.async = 1),
          (n.onload = n.onreadystatechange =
            function () {
              var s = this.readyState;
              (s && s !== "loaded" && s !== "complete") ||
                (f(), (n.onload = n.onreadystatechange = null));
            }),
          (i = d.getElementsByTagName(t)[0]),
          i.parentNode.insertBefore(n, i));
      })(window, document, "script", "//bat.bing.com/bat.js", "uetq");
    `}</Script>
  )
}
