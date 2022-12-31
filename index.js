/* 
  "DOMContentLoaded" is an event that detects when all of the pages content is loaded. 
  Wrapping your code in this event is a safegaurd against having your selectors run before
  the page loads and causing issues.
*/
document.addEventListener("DOMContentLoaded", (event) => {
  // Top of the page: Stocks 1-4 and end round button.
  let round_button = document.getElementById("end-round")
  let stock1Name = document.getElementsByClassName("stock1")
  let stock2Name = document.getElementsByClassName("stock2")
  let stock3Name = document.getElementsByClassName("stock3")
  let stock4Name = document.getElementsByClassName("stock4")

  let gameInfo = {
    stock1: {
      name: document.getElementsByClassName("stock1"),
      price: document.getElementById("stock1-price")
    },
    stock2: {
      name: document.getElementsByClassName("stock2"),
      price: document.getElementById("stock2-price")
    },
    stock3: {
      name: document.getElementsByClassName("stock3"),
      price: document.getElementById("stock3-price")
    },
    stock4: {
      name: document.getElementsByClassName("stock4"),
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
  // gameInfo.stock1.price.innerHTML = 129.52
  // gameInfo.stock2.price.innerHTML = 34.21
  // gameInfo.stock3.price.innerHTML = 45.74
  // gameInfo.stock4.price.innerHTML = 96.42

  // player1.name.innerHTML = "Brian"
  // player1.stock1.innerHTML = 55
  // player1.stock2.innerHTML = 0
  // player1.stock3.innerHTML = 0
  // player1.stock4.innerHTML = 0
  // player1.netWorth.innerHTML = 0
  // player1.cash.innerHTML = 0

  let setStockNames = (name1="Stock 1", name2="Stock 2: ", name3="Stock 3: ", name4="Stock 4: ") => {
    for (i = 0; i < stock1Name.length; i++) {
      gameInfo.stock1.name[i].innerText = `${name1}: `
      gameInfo.stock2.name[i].innerText = `${name2}: `
      gameInfo.stock3.name[i].innerText = `${name3}: `
      gameInfo.stock4.name[i].innerText = `${name4}: `
    }
  }

  setStockNames("Apple", "Essentia", "Microsoft", "Twitch")
})