AFRAME.registerComponent("play-pause",{
    init: function(){
        var video = document.querySelector("#video");
        var videoControl = document.querySelector("#videoControl");
        this.el.addEventListener("click", function(){
            if(video.paused){
                video.play();
                videoControl.setAttribute("src","#play");
            }else{
                video.pause();
                videoControl.setAttribute("src","#pause");
            }
        });
    }
})
