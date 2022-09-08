window.addEventListener("load", () => {
    if (localStorage["username"] != null) {
        document.querySelector("form input[type=text]").value = localStorage["username"];
    }
})

