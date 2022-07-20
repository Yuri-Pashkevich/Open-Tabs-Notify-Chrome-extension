const button = document.getElementById("button")

button.addEventListener('click', () => {
    chrome.storage.local.get('id', result => {
        if(result.id) {
            chrome.windows.remove(result.id)
            chrome.storage.local.remove('id')
        }
    })
})