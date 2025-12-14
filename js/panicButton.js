let panicRedirectFromStorage = localStorage.getItem('panicRedirect')
let panicUrlEdited = "canvas.com"
const panicKeysArray = JSON.parse(localStorage.getItem('panicKeys'))
const keyDownSet = new Set();

if(panicRedirectFromStorage) {
    panicUrlEdited = panicRedirectFromStorage.replace(/^https?:\/\//, '');
}

document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && ['c', 'v', 'r'].includes(e.key.toLowerCase())) {
        return;
    }

    if (e.ctrlKey || e.altKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
    }
})

document.addEventListener('keydown', function(e){
    keyDownSet.add(e.key)
    checkPanicKeys();
})

document.addEventListener('keyup', function(e){
    keyDownSet.delete(e.key)
})

function checkPanicKeys() {
    if(!panicKeysArray) return
    const allDown = panicKeysArray.every(key => keyDownSet.has(key));
    if (allDown) {
        window.location.href = `https://${panicUrlEdited}`
    }
}
console.log("injected")