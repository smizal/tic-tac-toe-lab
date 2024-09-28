/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
let winnerCombo

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  squareEls.forEach((squareEl) => {
    squareEl.classList.remove('winner')
  })
  messageEl.classList.remove('winner')
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  winnerCombo = []
  render()
}

const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  board.forEach((boardEl, index) => {
    squareEls[index].textContent = boardEl
  })
}

const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.textContent = `It is ${turn} turn now` // render whose turn it is.
  } else if (!winner && tie) {
    messageEl.textContent = `The game finished, no winner in this turn. good luck next time.` // render a tie message.
  } else {
    styleWinnerSquares()
    messageEl.textContent = `Congratulation ${turn}, You won this turn` // render a congratulatory message to the player that has won
    messageEl.classList.add('winner')
  }
}

const handleClick = (event) => {
  let squareIndex = event.target.id
  if (board[squareIndex] !== '' || winner) {
    return
  } else {
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
  }
}

const placePiece = (index) => {
  board[index] = turn
}

const checkForWinner = () => {
  let winningCombo
  for (let wcIndex = 0; wcIndex < winningCombos.length; wcIndex++) {
    winningCombo = winningCombos[wcIndex]
    if (
      board[winningCombo[0]] === board[winningCombo[1]] &&
      board[winningCombo[0]] === board[winningCombo[2]] &&
      board[winningCombo[0]] != ''
    ) {
      winner = true
      winnerCombo = winningCombo
      return true
    }
  }
}

const checkForTie = () => {
  if (winner) {
    return
  } else {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == '') {
        return
      }
    }
  }
  tie = true
  return
}

const switchPlayerTurn = () => {
  if (winner || tie) {
    return
  }
  if (turn == 'X') {
    turn = 'O'
  } else {
    turn = 'X'
  }
}

const styleWinnerSquares = () => {
  squareEls.forEach((squareEl) => {
    if (
      squareEl.id == winnerCombo[0] ||
      squareEl.id == winnerCombo[1] ||
      squareEl.id == winnerCombo[2]
    ) {
      squareEl.classList.add('winner')
    }
  })
}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((squareEl) => {
  squareEl.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', init)

init()
