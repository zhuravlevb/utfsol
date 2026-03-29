let img = new Image();
img.src = "images/checkers.png";

function updateClock() {
    const now = new Date();

    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const months = [
        "янв",
        "фев",
        "мар",
        "апр",
        "май",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
    ];

    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("time").textContent =
        `${day} ${date} ${month} ${hours}:${minutes}`;
}

document.addEventListener("DOMContentLoaded", () => {
    updateClock();
    setInterval(updateClock, 1000);
});

document.querySelectorAll(".window").forEach((win) => {
    const titlebar = win.querySelector(".window_header");
    let offsetX, offsetY;

    titlebar.addEventListener("mousedown", (e) => {
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;

        const onMouseMove = (e) => {
            win.style.left = e.clientX - offsetX + "px";
            win.style.top = e.clientY - offsetY + "px";
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            titlebar.style.cursor = "default";
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        titlebar.style.cursor = "grabbing";
    });
});

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openWindow(id) {
    let window_el = document.getElementById(id);
    if (window.innerWidth > 500) {
        window_el.style.left =
            randInt(window.innerWidth * 0.1, window.innerWidth * 0.35) + "px";
        window_el.style.top =
            randInt(window.innerHeight * 0.15, window.innerHeight * 0.25) +
            "px";
    } else {
        window_el.style.left =
            randInt(window.innerWidth * 0.05, window.innerWidth * 0.2) + "px";

        window_el.style.top =
            randInt(window.innerHeight * 0.05, window.innerHeight * 0.25) +
            "px";
    }
    window_el.style.display = "block";
    setTimeout(() => {
        window_el.style.opacity = "1";
    }, 50);
    setTimeout(
        () => {
            window_el.children[2].style.display = "block";
        },
        randInt(200, 700),
    );
}

let icon = document.querySelector(".desktop_icon");
let lastClick = 0;
icon.addEventListener("click", () => {
    const now = Date.now();
    const isDouble = now - lastClick < 300;
    lastClick = now;

    if (isDouble) {
        icon.classList.remove("active");
        openWindow("win1");
        document.querySelector("#app_name").innerHTML = "Internet Explorer";
    } else {
        icon.classList.toggle("active");
    }
});

for (const image of document.querySelector(".captcha_images").children) {
    image.addEventListener("click", () => {
        image.classList.toggle("selected");
        if (
            Array.from(document.querySelector(".captcha_images").children).some(
                (child) => child.classList.contains("selected"),
            )
        ) {
            document.querySelector(".captcha_next").innerHTML = "Далее";
        } else {
            document.querySelector(".captcha_next").innerHTML = "Пропустить";
        }
    });
}

document.querySelector(".tick").addEventListener("click", () => {
    if (document.querySelector(".tick").children[0].style.display != "block") {
        document.querySelector(".captcha_window").style.left =
            document.querySelector(".tick").getBoundingClientRect().right +
            8 +
            "px";
        let bottom_padding =
            window.innerHeight -
            document.querySelector(".tick").getBoundingClientRect().bottom -
            100;
        document.querySelector(".captcha_window").style.bottom =
            bottom_padding + "px";
        document.querySelector(".captcha_window").style.display = "block";
        setTimeout(() => {
            document.querySelector(".captcha_window").style.opacity = "1";
        }, 50);
    }
});

document.querySelector(".captcha_next").addEventListener("click", () => {
    document.querySelector(".captcha_window").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".captcha_window").style.display = "block";
    }, 200);
    document.querySelector(".tick").children[0].style.display = "block";
    openWindow("win2");
});

function showWarning() {
    let warning = document.querySelector(".warning");
    warning.style.top = (window.innerHeight - 300) / 2 + "px";
    warning.style.left = (window.innerWidth - 300) / 2 + "px";
    warning.style.display = "block";
    setTimeout(() => {
        warning.style.transform = "scale(1)";
    }, 50);
}

function randomWindows() {
    document.querySelectorAll(".window").forEach((win) => {
        win.style.left = randInt(-200, window.innerWidth + 200) + "px";
        win.style.top = randInt(-200, window.innerHeight + 200) + "px";
    });
}

function hideWarning() {
    document.querySelector(".warning").style.display = "none";
    setTimeout(() => {
        randomWindows();
    }, 150);
    setTimeout(() => {
        randomWindows();
    }, 300);
    setTimeout(() => {
        randomWindows();
    }, 450);
    setTimeout(() => {
        randomWindows();
    }, 600);
    setTimeout(() => {
        randomWindows();
    }, 750);
    setTimeout(() => {
        randomWindows();
    }, 900);
    setTimeout(() => {
        randomWindows();
    }, 1050);
    setTimeout(() => {
        document.querySelectorAll(".window").forEach((win) => {
            win.style.display = "none";
        });
        document.querySelector(".topbar").children[0].children[0].src =
            "images/checkers.png";
        document.querySelector("body").style.backgroundImage =
            "url('images/checkers.png')";
        document.querySelector("body").style.backgroundSize = "20px";
        document.querySelector(".desktop_icon").style.display = "none";
    }, 1200);
    setTimeout(() => {
        document.querySelector(".bsod").style.display = "block";
    }, 1450);
}
