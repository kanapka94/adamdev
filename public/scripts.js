(function () {
    const state = {
        isFlipped: false,
    };

    const elements = {
        page: document.querySelector('[data-target="page"]'),
        flipPageButton: document.querySelector('[data-trigger="flip-page"]'),
    }

    document.addEventListener('DOMContentLoaded', () => {
        bindUI();
    });

    watchState('isFlipped', (value) => {
        if (value) {
            elements.page.classList.add("flipped");
        } else {
            elements.page.classList.remove("flipped");
        }
    })

    function bindUI() {
        loadMail();
        bindFlipPage();
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
        })
    }

    function flipPage() {
        state.isFlipped = !state.isFlipped;
    }

    function watchState(stateProp, callback) {
        let value = state[stateProp];

        if (typeof value === 'undefined') {
            console.error("State property is not defined");

            return;
        }

        Object.defineProperty(state, stateProp, {
            set: function (newValue) {
                value = newValue;
                callback(newValue);
            },
            get: function () {
                return value;
            },
            enumerable: true,
            configurable: true,
        })
    }
})()