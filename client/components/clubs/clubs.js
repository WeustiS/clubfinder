var buttons = document.getElementsByClassName("paginationItem");
Array.prototype.forEach.call(buttons, function(elem) {
  elem.addEventListener("click", function() {
    var cards = document.getElementsByClassName("cards");
    let val = parseInt(this.dataset.value);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    this.classList.add("active");
    console.log(cards);
    for (let i = 0; i < cards[0].childElementCount; i++) {
      console.log(i, val);
      cards[0].children[i].style.display = "inline";
      if (i < val || i > val + 5) {
        console.log("displaying ", i);
        cards[0].children[i].style.display = "none";
      }
    }
  });
});

var cards = document.getElementsByClassName("cards");
let val = 0;
for (let i = 0; i < cards[0].childElementCount; i++) {
  console.log(i, val);
  cards[0].children[i].style.display = "inline";
  if (i < val || i > val + 5) {
    console.log("displaying ", i);
    cards[0].children[i].style.display = "none";
  }
}
