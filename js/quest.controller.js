'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-success').click(onStartGuessing)

function init() {
  console.log('Started...')
  createQuestsTree()
  $(`.game-start`).removeClass('d-none')
  $(`.quest`).addClass('d-none')
}

function onStartGuessing() {
  console.log(`Im here`)
  $(`.game-start`).addClass('d-none')
  $(`.quest`).removeClass('d-none')
  $('.btn-success').addClass('d-none')

  renderQuest()

}

function renderQuest() {
  $(`.quest h2`).text(gCurrQuest.txt)

}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  console.log(res)
  // If this node has no children
  console.log(isChildless(getCurrQuest()))
  if (isChildless(getCurrQuest())) {
    console.log(`if1`)

    if (res === 'yes') {
      console.log(`if2`)
      $(`.alert.alert-success`).text(`Yes! I knew it!`)
      $(`.alert.alert-success`).removeClass(`d-none`)
      setTimeout(() => $(`.alert.alert-success`).addClass(`d-none`), 1500)
      // TODO: improve UX
    } else {
      $(`.alert.alert-warning`).text('I dont know...teach me!')
      $(`.alert.alert-warning`).removeClass(`d-none`)
      setTimeout(() => $(`.alert.alert-warning`).addClass(`d-none`), 1500)
      $('.btn-success').removeClass('d-none')
      $(`.new-quest`).removeClass(`d-none`)
    }
  } else {
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()

  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()

  $(`.new-quest`).addClass(`d-none`)

}

function onRestartGame() {
  $('.new-quest').removeClass('d-none')
  $('.game-start').addClass('d-none')

  gLastRes = null

  init()
}
