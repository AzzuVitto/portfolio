document.addEventListener("DOMContentLoaded", function () {
  let scrollPosition = 0;
  let slidesNumber = document.querySelectorAll("section").length - 2;

  document.querySelectorAll('a[href^="#"]').forEach((anchor, i) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetOffset = window.innerWidth * i;
        scrollPosition = -targetOffset;
        slideToPosition(scrollPosition);
      }
    });
  });

  addEventListener("resize", () => {
    document.querySelector("main").style.transform = `translateX(0px)`;
    scrollPosition = 0;
  });

  document.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
      scrollPosition -= window.innerWidth;
      slideToPosition(scrollPosition);
    } else if (e.deltaY > 0 && scrollPosition + e.deltaY < 0) {
      scrollPosition += window.innerWidth;
      slideToPosition(scrollPosition);
    }
  });

  function slideToPosition(position) {
    if (position < -window.innerWidth * (slidesNumber)) {
      document.querySelector("main").style.transform = `translateX(0px)`;
      scrollPosition = 0;
    } else {
      document.querySelector("main").style.transform = `translateX(${position}px)`;
    }
  }
});

function displayModal() {
  const editModal = document.querySelector('.popup');
  if (editModal.classList.contains('hidden')) {
    editModal.classList.remove('hidden');
  } else {
    editModal.classList.add('hidden');
  }
}
