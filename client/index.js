const HTTP = require("http");

document.getElementById("requestbutton").addEventListener("click", async () => {
    var testRequest = new Request()
    var testHeaders = new Headers();
    testHeaders.set("Authorization", "ligmoid");
    
    const Response = await fetch(testRequest);
})