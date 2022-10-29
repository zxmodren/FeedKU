let title
let inputProp
let typeLvs

ipcRenderer.on('load:tbody-tr', (e, content, titleBar, typeLs) => {
    $('#data').html(content)
    title = titleBar
    switch (title) {
        case 'Result':
            $('#btn-submit').html(`<i class="fa fa-print"></i> Print`)
    }
    let typeLvs = typeLs
})