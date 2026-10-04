(function () {
    const themeColors = {
        primary: "#bad1cd",
        cyan: "#2ee1f2",
        pink: "#e086d3",
        orange: "#e0ac86",
        gray: "#999999",
    };

    const isFlipped = createSignal(false);
    const primaryColor = createSignal(themeColors.primary);

    const elements = {
        page: document.querySelector('[data-target="page"]'),
        flipPageButton: document.querySelector('[data-trigger="flip-page"]'),
    };

    document.addEventListener('DOMContentLoaded', () => {
        bindUI();
    });

    function bindUI() {
        loadMail();
        bindFlipPage();
        bindClickColorButton();
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
        if (themeColors[colorKey]) {
            primaryColor.value = themeColors[colorKey];
        }
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