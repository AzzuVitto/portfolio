document.addEventListener('DOMContentLoaded', function () {
    let scrollPosition = 0;

    document.addEventListener('wheel', function (e) {
        // Ajuste la position horizontale de la page en fonction du défilement
        scrollPosition = scrollPosition + e.deltaY < 0 ? 0 : scrollPosition + e.deltaY;
        console.log(scrollPosition)
        document.querySelector('main').style.transform = `translateX(${-scrollPosition}px)`;
    });
});
