AFRAME.registerComponent("page", {
    init:function(){
        var el = this.el;
        el.addEventListener("mouseenter", function () {
            window.location.href = "../index.html";
        })
    }
})