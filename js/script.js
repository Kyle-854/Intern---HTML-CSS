let itemSelected = "exp";

document.addEventListener("DOMContentLoaded", () => {
  changeMenu();
});

//-----------------------------------------------------------------

function changeMenu() {
  const items = document.querySelectorAll(".navbar__link");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => {
        i.classList.remove("navbar__link--active");
      });

      item.classList.add("navbar__link--active");
    });
  });
}
