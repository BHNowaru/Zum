
//initialize particles using particlesjs (not particles.js. two different things.)
const Particles = require("particlesjs")
window.onload = function() {
    Particles.init({
        selector: "#particles",
        color: "#F0EDEE",
    })
}

const isTesting = true;
const Port = 2302
const IP = isTesting ? "http://localhost:" : "http://135.180.72.85:";



setTimeout(() => {
    $("#connect").removeAttr("disabled")
}, 3000)
//allow connecting to socket
const Toastify = require("toastify-js"); //define in toplevel since we'll be using this t/o the app
const { ipcRenderer } = require("electron")

$("#connect").on("click", () => {
    ipcRenderer.send("requestConnect");  
})

ipcRenderer.on("sendToast", (...data) => {
    Toastify(data[1]).showToast();
})

ipcRenderer.once("connected", () => {
    $("body *").not("script").not(".toastify").hide({
        duration: 1500,
        easing: "swing",
        done: function(e) {
            $(e.elem).detach();
        }
    })

    setTimeout(() => {

        const str = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
        $("body").prepend(str);
        $(".lds-ellipsis").fadeOut(0);
        $(".lds-ellipsis").fadeIn("slow");
    }, 2000)

})