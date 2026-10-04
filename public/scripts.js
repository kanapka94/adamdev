(function () {
    const isFlipped = createSignal(false);
    const primaryColor = createSignal('var(--color-primary)');

    const elements = {
        page: document.querySelector('[data-target="page"]'),
        pageFront: document.querySelector('.page-front'),
        pageBack: document.querySelector('.page-back'),
        flipPageButton: document.querySelector('[data-trigger="flip-page"]'),
        changeThemeButton: document.querySelector('[data-trigger="change-theme"]'),
    };

    document.addEventListener('DOMContentLoaded', () => {
        bindUI();
    });

    function bindUI() {
        loadMail();
        bindFlipPage();
        bindClickColorButton();
        bindIcons();
        bindThemeButton();
        loadSystemTheme();
    }

    function loadMail() {
        const user = "web";
        const domain = "adamdev.it";
        const link = document.getElementById("contact-email");

        link.href = "mailto:" + user + "@" + domain;
        link.textContent = user + "@" + domain;
    }

    function bindFlipPage() {
        elements.flipPageButton.addEventListener("click", () => {
            flipPage();
        });

        isFlipped.subscribe((value) => {
            if (value) {
                elements.page.classList.add("flipped");
            } else {
                elements.page.classList.remove("flipped");
            }

            if (elements.flipPageButton) {
                elements.flipPageButton.setAttribute("aria-expanded", String(value));
            }

            if (elements.pageFront && elements.pageBack) {
                elements.pageFront.inert = value;
                elements.pageFront.setAttribute("aria-hidden", String(value));

                elements.pageBack.inert = !value;
                elements.pageBack.setAttribute("aria-hidden", String(!value));
            }
        });
    }

    function flipPage() {
        isFlipped.value = !isFlipped.value;
    }

    function bindClickColorButton() {
        const buttons = document.querySelectorAll('[data-trigger="color-button"]');

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                changeColor(button.dataset.color);
            });
        });

        primaryColor.subscribe((value) => {
            document.body.style.backgroundColor = value;
        });
    }

    function changeColor(colorKey) {
        if (getThemeColor(colorKey)) {
            primaryColor.value = `var(--color-${colorKey})`;
        }
    }

    function loadSystemTheme() {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (prefersDark) {
            changeTheme();
        }
    }

    function bindIcons() {
        feather.replace();
    }

    function bindThemeButton() {
        elements.changeThemeButton.addEventListener("click", () => {
            changeTheme();
        });
    }

    function changeTheme() {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    function getThemeColor(colorKey) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(`--color-${colorKey}`)
            .trim();
    }

    function createSignal(initialValue) {
        let value = initialValue;
        const subscribers = new Set();

        return {
            get value() {
                return value;
            },
            set value(newValue) {
                if (value !== newValue) {
                    value = newValue;
                    subscribers.forEach((callback) => callback(value));
                }
            },
            subscribe(callback) {
                subscribers.add(callback);
                return () => subscribers.delete(callback);
            },
        };
    }
})()
