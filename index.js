/* 
  "DOMContentLoaded" is an event that detects when all of the pages content is loaded. 
  Wrapping your code in this event is a safegaurd against having your selectors run before
  the page loads and causing issues.
*/
document.addEventListener("DOMContentLoaded", (event) => {
  // Selects the button used to end rounds
  let round_button = document.getElementById("end-round")

  /* 
    Selects UI elements related to stock names and stock price.
    They are stored in an object for ease of use(?).
  */
  let gameUi = {
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

  // These hold the ui elements for each player card.
  let player1 = {
    name: document.getElementById("player1-name"),
    stock1: document.getElementById("player1-stock1-amount"),
    stock2: document.getElementById("player1-stock2-amount"),
    stock3: document.getElementById("player1-stock3-amount"),
    stock4: document.getElementById("player1-stock4-amount"),
    netWorth: document.getElementById("player1-networth"),
    cash: document.getElementById("player1-cash")
  }

  let player2 = {
    name: document.getElementById("player2-name"),
    stock1: document.getElementById("player2-stock1-amount"),
    stock2: document.getElementById("player2-stock2-amount"),
    stock3: document.getElementById("player2-stock3-amount"),
    stock4: document.getElementById("player2-stock4-amount"),
    netWorth: document.getElementById("player2-networth"),
    cash: document.getElementById("player2-cash")
  }

  let player3 = {
    name: document.getElementById("player3-name"),
    stock1: document.getElementById("player3-stock1-amount"),
    stock2: document.getElementById("player3-stock2-amount"),
    stock3: document.getElementById("player3-stock3-amount"),
    stock4: document.getElementById("player3-stock4-amount"),
    netWorth: document.getElementById("player3-networth"),
    cash: document.getElementById("player3-cash")
  }

  let player4 = {
    name: document.getElementById("player4-name"),
    stock1: document.getElementById("player4-stock1-amount"),
    stock2: document.getElementById("player4-stock2-amount"),
    stock3: document.getElementById("player4-stock3-amount"),
    stock4: document.getElementById("player4-stock4-amount"),
    netWorth: document.getElementById("player4-networth"),
    cash: document.getElementById("player4-cash")
  }

  // Updates the name of each stock.
  let setStockNames = (name1="Stock 1", name2="Stock 2: ", name3="Stock 3: ", name4="Stock 4: ") => {
    for (i = 0; i < gameUi.stock1.name.length; i++) {
      gameUi.stock1.name[i].innerText = `${name1}: `
      gameUi.stock2.name[i].innerText = `${name2}: `
      gameUi.stock3.name[i].innerText = `${name3}: `
      gameUi.stock4.name[i].innerText = `${name4}: `
    }
  }

  setStockNames("Apple", "Essentia", "Microsoft", "Twitch")
  player1.name.innerText = "Brian"
  player2.name.innerText = "John"
  player3.name.innerText = "Kevin"
  player4.name.innerText = "Nate"

  // Event listners 

  // Rolls new prices and increments round counter
  round_button.addEventListener("click", e => {
    // garounds --
    endRound()

  })

  /* 
    Game Logic 
    Stocks prices move in multiples of 5. 
    Sentiment is a number from 0 to 100 and it determines how often a stock goes up
    Volatility is a number from 1 to 5 and it determines how much a stock moves in a turn
  */
  let gameInfo = {
    rounds: 10,
    stockValues: [
      {
        name: "Apple",
        ticker: "",
        value: 10,
        sentiment: 50,
        volatility: 1
      }, 
      {
        name: "Essentia",
        ticker: "",
        value: 50,
        sentiment: 80,
        volatility: 1
      },
      {
        name: "Microsoft",
        ticker: "",
        value: 30,
        sentiment: 40,
        volatility: 1
      },
      {
        name: "Sony",
        ticker: "",
        value: 20,
        sentiment: 50,
        volatility: 1
      }
    ]
  }

  let diceRoll = (min = 10, max = 100) => {
    let roll = Math.floor(Math.random() * (max - min + 1))
  
    return roll
  }

  let rollStock = (stock = {value, sentiment, volatility}) => {
    // If diceRoll returns a number higher than sentiment, direction is set to -1
    // and 1 if the oposite is true
    let direction = stock.sentiment < diceRoll() ? 1 : -1

    // Using direction and volatility, calculate the new value of the stock
    return 5 * volatility * direction
  }

  let endRound = (stocks) => {
    stocks.map((stock) => {
      stock.value = rollStock(stock)
      return stock
    })
  }
  
})