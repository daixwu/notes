require.config({
    paths: {
        "jquery": "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"
    }
});

require(["match"], function (match) {
    alert(match.add(1, 2));
});
