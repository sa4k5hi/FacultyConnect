var remove_modal = document.getElementById("remove-slots-modal");
var remove_btn = document.getElementById("remove-slot");
var remove_cross = document.getElementsByClassName("remove-content")[0];

console.log("through popup");
remove_btn.onclick = function() {
    console.log("removeeeeee");
    remove_modal.style.display="block";
}
remove_cross.onclick = function() {
    remove_modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == signin) {
        remove_modal.style.display = "none";
    }
}
