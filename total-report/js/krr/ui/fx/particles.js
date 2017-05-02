/* global krr, createjs */
krr.ui.fx.Particles = function (canvas) {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (loop) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    /******************
     var function key
     ----------------
     num: #dots
     sd: rect width / height 
     [ smaller #, larger size ]
     sp: spacing between dots
     min_d: minimum distance 
     between scaled dots
     ŭ: color update var
     c: canvas
     $: context
     dots: dots array
     _pt: points
     w, h: canvas width / height
     msX, msY: mouse X, mouse Y
     Pt: this x,y point function
     create: make scene
     _p: dot in dots
     dx, dy: x,y distance
     dist: distance calc
     sc: scale
     col: color
     run: animation loop
     go: initiate
     *********************/

    var num = 1500;
    var sd = 100;
    var sp = 50;
    var min_d = 100;
    var ŭ = 0;

    var c;
    var $;
    var dots;
    var _pt;

    c = canvas;
    $ = c.getContext('2d');
    var w = c.width = window.innerWidth;
    var h = c.height = window.innerHeight;

    var msX = w * 0.5;
    var msY = h * 0.5;

    var Pt = function (x, y) {
        this.x = 0;
        this.y = 0;
    };

    var create = function () {
        dots = [];
        for (var i = 0; i < num; i++) {
            ŭ -= .5;
            var _p = {
                x: (i % sd) * sp + 30,
                y: Math.floor(i / sd) * sp + 100,
                col: 'hsla(' + (ŭ * i / num + 155) + ',100%,70%, .6)',
                sc: 1.0
            };
            dots.push(_p);
        }
    };

    var upd = function () {

        _pt.x += (msX - _pt.x) * 0.03;
        _pt.y += (msY - _pt.y) * 0.03;

        $.clearRect(0, 0, c.width, c.height);

        for (var i = 0; i < num; i++) {

            var _p = dots[i];

            var dx = _pt.x - _p.x;
            var dy = _pt.y - _p.y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < min_d) {
                _p.sc = (min_d - dist) / 10 + 1.0;
            } else {
                _p.sc = 1.0;
            }

            $.fillStyle = _p.col;
            $.beginPath();
            $.arc(_p.x, _p.y, 5 * _p.sc, 0, Math.PI * 2, false);
            $.fill();
        }
    };

    var run = function () {
        window.requestAnimFrame(run);
        upd();
    };

    var go = function () {
        create();
        _pt = new Pt(0, 0);
        run();
    };

    document.addEventListener('mousemove', function (e) {
        var rect = e.target.getBoundingClientRect();
        msX = e.clientX - rect.left;
        msY = e.clientY - rect.top;
    }, false);

    document.addEventListener('touchmove', function (e) {
        var rect = e.target.getBoundingClientRect();
        msX = e.touches[0].pageX - rect.left;
        msY = e.touches[0].pageY - rect.top;
    }, false);

    window.addEventListener('resize', function () {
        c.width = w = window.innerWidth;
        c.height = h = window.innerHeight;
    }, false);

    go();
};