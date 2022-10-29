const electron = require('electron')
const { app, BrowserWindow, ipcMain, screen, webContents, Notification } = electron
const db = require('./config/database/db_config')
const remote = require('@electron/remote/main')
const updater = require('./autoupdate')
const isDev = !app.isPackaged
remote.initialize()
app.allowRendererProcessReuse = true
app.disableHardwareAcceleration();
let mainWindow
let helpWindow
let frWindow
let feedWindow
let trialWindow
let editFeedModal

app.whenReady().then(() => {
    try {
        // Create window here
        mainWin()
        // Check for updates after 3 seconds
        !isDev && setTimeout(updater, 3000)
    } catch (err) { console.error(err) }
})

mainWin = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        height: 550,
        resizable: false,
        title: 'FeedKU 1.0',
        autoHideMenuBar: true,
        minimizable: true,
        frame: false
    })
    mainWindow.loadFile('index.html')
    db.serialize(() => {
        console.log('congatulation')
    })
}

ipcMain.on('load:feed-win', () => {
    feedWin()

})

ipcMain.on('load:fr-win', () => {
    frWin()

})

ipcMain.on('load:trial-win', () => {
    trialWin()

})

ipcMain.on('load:help-win', () => {
    helpWin()

})

helpWin = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    helpWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        autoHideMenuBar: true,
        width: width,
        height: height,
        title: 'Help',
        frame: false

    })

    remote.enable(helpWindow.webContents)

    helpWindow.loadFile('windows/help.html')
    helpWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()

    })
    helpWindow.on('close', () => {
        mainWindow.show()
    })


}

feedWin = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    feedWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        autoHideMenuBar: true,
        width: width,
        height: height,
        title: 'Database',
        frame: false

    })

    remote.enable(feedWindow.webContents)

    feedWindow.loadFile('windows/database.html')
    feedWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()

    })
    feedWindow.on('close', () => {
        mainWindow.show()
    })


}

frWin = () => {
    frWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        height: 550,
        resizable: false,
        title: 'Formulation',
        autoHideMenuBar: true,
        frame: false
    })

    frWindow.loadFile('windows/fr.html')
    frWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()

    })

    frWindow.on('close', () => {
        mainWindow.show()
    })
}

trialWin = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    trialWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        // autoHideMenuBar: false,
        width: width,
        height: height,
        title: 'Trial and Error',
        // frame: false

    })

    trialWindow.loadFile('windows/trial.html')
    remote.enable(trialWindow.webContents)
    trialWindow.webContents.on('did-finish-load', () => {
        mainWindow.hide()
        frWindow.hide()
    })
    trialWindow.on('close', () => {
        mainWindow.show()
        frWindow.hide()
    })


}
editData = (docId, modalForm, modalWidth, modalHeight, rowId) => {
    let parentWin
    switch (docId) {
        case 'feed-database':
            parentWin = feedWindow
            break;
    }
    editDataModal = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: modalWidth,
        height: modalHeight,
        // resizable: false,
        maximizable: false,
        minimizable: false,
        parent: parentWin,
        modal: true,
        title: 'Edit Data',
        // autoHideMenuBar: false
    })
    remote.enable(editDataModal.webContents)
    editDataModal.loadFile('modals/edit-data.html')
    editDataModal.webContents.on('did-finish-load', () => {
        editDataModal.webContents.send('res:form', docId, modalForm, rowId)

    })
    editDataModal.on('close', () => {
        editDataModal = null
    })
}

ipcMain.on('load:edit', (event, msgDocId, msgForm, msgWidth, msgHeight, msgRowId) => {
    editData(msgDocId, msgForm, msgWidth, msgHeight, msgRowId)
})

ipcMain.on('update:success', (e, msgDocId) => {
    switch (msgDocId) {
        case 'feed-database':
            feedWindow.webContents.send('update:success', 'Data Successfully Update')

    }
    editDataModal.close()
})

ipcMain.on('close:trial', () => {
    trialWindow.close()
})
ipcMain.on('close:database', () => {
    feedWindow.close()
})
ipcMain.on('close:formulation', () => {
    frWindow.close()
})
ipcMain.on('close:help', () => {
    helpWindow.close()
})
ipcMain.on('close:feedku-win', () => {
    app.quit()
})
ipcMain.on('min:feedku-win', () => {
    mainWindow.minimize()
})
ipcMain.on('min:database', () => {
    feedWindow.minimize()
})
ipcMain.on('min:formulation', () => {
    frWindow.minimize()
})
ipcMain.on('min:trial', () => {
    trialWindow.minimize()
})
ipcMain.on('min:help', () => {
    helpWindow.minimize()
})

modalFormulation = (Frnumber, title, Totalformulation, Livestock) => {
    let width
    let height
    let frameBoolVal
    let titleBar
    let content
    let typeLs = Livestock
    let tr = ''
    switch (title) {
        case 'proportion':
            width = 800
            height = 400
            frameBoolVal = true
            titleBar = 'Edit Proportion'
            db.all(`select * from formulation_1 where fr_numb='${Frnumber}'`, (err, rows) => {
                if (err) throw err
                if (rows.length < 1) {
                    console.log(`no formulation with number '${Frnumber}'`)
                } else {
                    rows.map((row) => {
                        tr += `<tr>
                                <td>
                                    <input type="text" class= "form-control form-control-sm disable input-international_number"
                                    id="input-international_number-${row.id}" value="${row.international_number}" disabled>
                                </td>
                                <td>
                                <input type="text" class= "form-control form-control-sm disable input-feed-name"
                                id="input-feed-name-${row.id}" value="${row.feed_name}" disabled>
                                </td>
                                <td>
                                    <input type="text" class= "form-control form-control-sm disable input-description"
                                    id="input-description-${row.id}" value="${row.description}" disabled>
                                </td>
                                <td>
                                    <input type="text" class= "form-control form-control-sm input-proportion" onkeyup="newTotal(${row.id})"
                                    id="input-proportion-${row.id}" value="${row.proportion}" data-id="${row.id}">
                                </td>
                            </tr>`
                    })
                    content = `<div class="table-responsive">
                                <table class="table table-sm table-borderless" style="font-size:13px;">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>International Number</th>
                                            <th>Feed Namer</th>
                                            <th>Description</th>
                                            <th>Proportion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    ${tr}
                                    </tbody>
                                </table>
                            </div>`
                }
            })
            // content = `<h1>${titleBar}</h1>`
            break;
    }
    editFeedModal = new BrowserWindow(
        {
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            width: width,
            height: height,
            parent: trialWindow,
            modal: true,
            resizable: false,
            minimizable: false,
            frame: frameBoolVal,
            title: titleBar
        }

    )
    remote.enable(editFeedModal.webContents)
    editFeedModal.loadFile('modals/formulation1.html')
    editFeedModal.webContents.on('dom-ready', () => {
        editFeedModal.webContents.send('load:tbody-tr', content, titleBar, typeLs)
    })

}

ipcMain.on('load:edit-feed-modal', (e, msgFrnumber, msgtitle, msgTotalformulation, msgLivestock) => {
    modalFormulation(msgFrnumber, msgtitle, msgTotalformulation, msgLivestock)
})
ipcMain.on('load:pearson', () => {
    showNotification()
})
ipcMain.on('load:aljabar', () => {
    showNotification()
})
const NOTIFICATION_TITLE = 'Alert'
const NOTIFICATION_BODY = 'This Feature Is Under Development'

function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}