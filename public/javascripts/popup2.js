var signin = document.getElementById("add-slot-modal");
var btn = document.getElementById("add-slot");
var cross = document.getElementsByClassName("add-content")[0];

btn.onclick = function() {
    console.log("adddd");
    signin.style.display="block";
}
cross.onclick = function() {signin.style.display = "none";}
window.onclick = function (event) {
    if (event.target == signin) {
        signin.style.display = "none";
    }
}