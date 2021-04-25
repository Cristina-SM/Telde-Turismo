AFRAME.registerComponent("video", {
    init: function () {
        var el = this.el
        el.addEventListener("mouseenter", function () {
            var video = document.querySelector("#plano");
            var button1 = document.querySelector("#button1");
            if (el.click) {
                video.setAttribute("visible", true);
                button1.setAttribute("visible", false);
                button1.setAttribute("sound", "on: clickable", "src", "#button");
            } else {
            }
        });
    }

})

