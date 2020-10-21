$(".everything").fadeOut(0);
$(".lds-ellipsis").fadeOut(0);
$(".lds-ellipsis").fadeIn("fast", () => {

});

window.addEventListener("load", () => {
    $(".lds-ellipsis").fadeOut("slow", () => {
        $(".everything").fadeIn("fast", () => {

        });
    })
})
