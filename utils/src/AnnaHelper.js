//@flow
var symbolsThatShouldNotBeReplaced = ['%1$s', '%2$s', '%3$s', '%4$s', '%1$d', '%2$d', '%3$d', '%4$d', '%5$d', '%6$d', '%7$d', '%8$d', 'PLZ_TRANSLATE', "'"]

let toHash = (text: string) => {
  symbolsThatShouldNotBeReplaced.forEach((symbol, index) => {
    var splits = text.split(symbol)
    text = splits.join(`<span class="notranslate">${symbol}</span>`)
  })

  //support server strings
  text = text.replace(/{/g,'<span class="notranslate">{');
  text = text.replace(/}/g, '}</span>')

  return text
}

let fromHash = (text: string) => {
  text = text.replace(/<span class="notranslate">/g,'');
  text = text.replace(/<\/span>/g, '')
  return text
}


let translationHelpTemplate = 'PLZ_TRANSLATE'
let translationTravisHelper = 'ANNA'
module.exports = {toHash, fromHash, translationHelpTemplate, translationTravisHelper}
