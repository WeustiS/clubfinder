console.log("signup JS loaded");

document.getElementById("terms_checkbox_div").addEventListener("click", () => {
  console.log("Clicked");
  let box = document.getElementById("terms_checkbox");
  if (box.checked == true) {
    box.checked = false;
  } else {
    box.checked == false;
  }
});
