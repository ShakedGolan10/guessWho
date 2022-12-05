'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null
const STORAGE_KEY = `GuessWhoDB`

function createQuestsTree() {

  gQuestsTree = loadFromStorage(STORAGE_KEY)

  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')

  }
  gCurrQuest = gQuestsTree
  gPrevQuest = null

  _saveQuestToStorage()
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  console.log(gCurrQuest)
  console.log(gPrevQuest)

  gPrevQuest = gCurrQuest

  console.log(gCurrQuest)
  console.log(gPrevQuest)

  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest

  // console.log(new)

  // gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
  // gPrevQuest[lastRes].no = createQuest(gPrevQuest[lastRes].txt)
  // gPrevQuest[lastRes].txt = newQuestTxt

  _saveQuestToStorage()

}

function getCurrQuest() {
  return gCurrQuest
}

function _saveQuestToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}