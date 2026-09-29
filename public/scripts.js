(function () {
    document.addEventListener('DOMContentLoaded', () => {
        loadMail();
    });

    function loadMail() {
        const user = "web";
        const domain = "adamdev.it";
        const link = document.getElementById("contact-email");

        link.href = "mailto:" + user + "@" + domain;
        link.textContent = user + "@" + domain;
    }
})()