/* 
  "DOMContentLoaded" is an event that detects when all of the pages content is loaded. 
  Wrapping your code in this event is a safegaurd against having your selectors run before
  the page loads and causing issues.
*/
document.addEventListener("DOMContentLoaded", (event) => {
  /*
  The first few lines will grab DOM elements and assign them to variables for easy acccess
  throughout the script.
  */

  // Top of the page: Stocks 1-4 and end round button.
  let round_button = document.getElementById("end-round")

  // Is there a benefit to storing DOM elements in an object?
  let gameInfo = {
    stock1: {
      name: document.getElementById("stock1-name"),
      price: document.getElementById("stock1-price")
    },
    stock2: {
      name: document.getElementById("stock2-name"),
      price: document.getElementById("stock2-price")
    },
    stock3: {
      name: document.getElementById("stock3-name"),
      price: document.getElementById("stock3-price")
    },
    stock4: {
      name: document.getElementById("stock4-name"),
      price: document.getElementById("stock4-price")
    }
  }


  let player1 = {
    name: document.getElementById("player1-name"),
    stock1: document.getElementById("player1-stock1-amount"),
    stock2: document.getElementById("player1-stock2-amount"),
    stock3: document.getElementById("player1-stock3-amount"),
    stock4: document.getElementById("player1-stock4-amount"),
    netWorth: document.getElementById("player1-networth"),
    cash: document.getElementById("player1-cash")
  }

  // test code, which shouldn't be here but I don't know how to write test code
  gameInfo.stock1.name.innerHTML = "Apple:"
  gameInfo.stock1.price.innerHTML = 129.52
  gameInfo.stock2.name.innerHTML = "Toilet Paper:"
  gameInfo.stock2.price.innerHTML = 34.21
  gameInfo.stock3.name.innerHTML = "Mosaic:"
  gameInfo.stock3.price.innerHTML = 45.74
  gameInfo.stock4.name.innerHTML = "Nvidia:"
  gameInfo.stock4.price.innerHTML = 96.42
  player1.name.innerHTML = "Brian"
  player1.stock1.innerHTML = 0
  player1.stock2.innerHTML = 0
  player1.stock3.innerHTML = 0
  player1.stock4.innerHTML = 0
  player1.netWorth.innerHTML = 0
  player1.cash.innerHTML = 0
})