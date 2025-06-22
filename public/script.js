const heroImages = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
    "/images/banner5.jpg",
];

let current = 0;
let showA = true;

setInterval(() => {
    const imgA = document.getElementById("heroBg1");
    const imgB = document.getElementById("heroBg2");

    current = (current + 1) % heroImages.length;

    if (showA) {
        imgB.setAttribute("href", heroImages[current]);
        imgB.classList.remove("opacity-0", "scale-105");
        imgB.classList.add("opacity-100", "scale-100");

        imgA.classList.remove("opacity-100", "scale-100");
        imgA.classList.add("opacity-0", "scale-105");
    } else {
        imgA.setAttribute("href", heroImages[current]);
        imgA.classList.remove("opacity-0", "scale-105");
        imgA.classList.add("opacity-100", "scale-100");

        imgB.classList.remove("opacity-100", "scale-100");
        imgB.classList.add("opacity-0", "scale-105");
    }

    showA = !showA;
}, 3500);
