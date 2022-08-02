const form = document.querySelector("form");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = document.querySelector("input").value;

  messageOne.textContent = "loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${address}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
});

// messageOne.textContent = data.error;
// messageOne.textContent = data.location;
// messageTwo.textContent = data.forecast;
