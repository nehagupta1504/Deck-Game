let startBtn = document.querySelector(".start-btn");
const exitRestartDiv = document.querySelector("#exit-restart-div");

startBtn.addEventListener("click", () => {
  let infoList = (document.querySelector(".info-box").style.display = "block");
});
exitRestartDiv.addEventListener("click", () => {
  console.log(event.target);
  if (event.target.className == "quit") {
    document.querySelector(".info-box").style.display = "none";
  } else if (event.target.className == "restart") {
    document.querySelector(".info-box").style.display = "none";
    window.location.href = "./html/index.html";
  }
});
