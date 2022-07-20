let id = null

chrome.tabs.query({ currentWindow: true }, tabs => {
    chrome.tabs.remove(tabs.map(({ id }) => id).slice(10))
})

chrome.tabs.onCreated.addListener(() => {
    chrome.tabs.query({ currentWindow: true }, tabs => {
        if (tabs.length > 10) {
            chrome.windows.getAll(windows => {
                windows.forEach(element => {
                    if (element.id === id) {
                        chrome.windows.remove(id)
                    }
                })
            })
            chrome.system.display.getInfo(( [{ bounds }] ) => {
                chrome.windows.create(
                    {
                        type: "popup",
                        url: "popup.html",
                        width: 500,
                        height: 560,
                        left: Math.round(bounds.width / 2 - 250),
                        top: Math.round(bounds.height / 2 - 280)
                    },
                    (popup) => {
                        chrome.storage.local.set({ 'id': popup.id })
                        id = popup.id
                    }
                )
            })
            chrome.tabs.remove(tabs.map(({ id }) => id).slice(10))
        }
    })
})