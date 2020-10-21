
//initialize particles using particlesjs (not particles.js. two different things.)
const Particles = require("particlesjs")
let currentParticles;
window.onload = function() {
    currentParticles = Particles.init({
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
const { ipcRenderer, webContents } = require("electron")

$("#connect").on("click", () => {
    ipcRenderer.send("requestConnect");  
})

ipcRenderer.on("sendToast", (...data) => {
    Toastify(data[1]).showToast();
})

ipcRenderer.once("connected", () => {
    $("#docker").fadeOut(0);
    $("body *").not("script").not(".toastify").not("#docker").hide({
        duration: 1500,
        easing: "swing",
        done: function(e) {
            if (currentParticles) {
                currentParticles = currentParticles.destroy();
            }
            $(e.elem).detach();
        }
    })

    setTimeout(() => {

        window.location.href = "./assets/app.html"
    }, 1600)

})