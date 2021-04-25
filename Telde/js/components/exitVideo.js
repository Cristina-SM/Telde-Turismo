AFRAME.registerComponent("close", {
    init: function () {
        var el = this.el
        var video = document.querySelector("#plano");
            var button1 = document.querySelector("#button1");
            var close = document.querySelector("#closeControl");
        el.addEventListener("click", function () {
            if (close.click){
                video.setAttribute("visible", false);
                button1.setAttribute("visible", true);                
            }else{
            
            }
        });
    }

})