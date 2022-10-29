openFormadddata = () => {
    $('#form-add-data').addClass('active')
    $('#feedtable').addClass('active')

    $('#feed_name').focus()
}
closeFormadddata = () => {
    $('#form-add-data').removeClass('active')
    $('#feedtable').removeClass('active')
}

function deletedata(id = false, data = false) {
    let msg = `Are you sure want to delete ${data} ?`

    if (id) {
        let dialogBox = dialog.showMessageBoxSync({
            type: 'question',
            title: 'Delete Data',
            buttons: ['No', 'Yes'],
            defaultId: [0, 1],
            message: msg

        })
        if (dialogBox === 0) {
            $('input.data-checkbox').prop("checked", false)
            $('tbody#data tr').removeClass('blocked')

        } else {
            deleterecord(id)
        }

    } else {
        array_ids = []
        $('input.data-checkbox:checked').each(function () {
            let ids = $(this).attr('id')
            array_ids.push(ids)
        })
        if (array_ids.length < 1) {
            let msgBox = dialog.showMessageBoxSync({
                type: 'question',
                title: 'Delete Data',
                buttons: ['No', 'Yes'],
                defaultId: [0, 1],
                message: 'Please Select Data To Delete. If You Not Select a Data, We will be DELETE ALL DATA'
            })
            if (msgBox === 0) {
                console.log('No')
            } else {
                deletealldata()
            }
        } else {
            let msgBox = dialog.showMessageBoxSync({
                type: 'question',
                title: 'Delete Data',
                buttons: ['No', 'Yes'],
                defaultId: [0, 1],
                message: 'The Selected Data Will Be Delete. Are You Sure With That ??'
            })
            if (msgBox === 0) {
                console.log('No')
                $('input.data-checkbox').prop("checked", false)
            } else {
                join_array_ids = array_ids.join(",")
                deletemultipledata(join_array_ids)
            }
        }
    }

}

selectall = () => {
    $('input.data-checkbox').prop("checked", true)
}

unselectall = () => {
    $('input.data-checkbox').prop("checked", false)
}