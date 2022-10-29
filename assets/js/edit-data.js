submintEditFeedData = (rowId) => {
    let feedName = $('#edit-form').find('#editfeedname').val()
    let prevfeedname = $('#edit-form').find('#prevfeedname').val()
    let feeddesc = $('#edit-form').find('#editdescription').val()
    let feedintnum = $('#edit-form').find('#editinternational_number').val()
    let prevfeedintnum = $('#edit-form').find('#previnternational_number').val()
    let feeddm = $('#edit-form').find('#editdm').val()

    if (feedName === "" || feeddesc === "" || feeddm === "") {
        dialog.showMessageBoxSync({
            title: 'alert',
            type: 'info',
            message: 'The Box Is Empty'

        })
    } else {
        if (feedName === prevfeedname) {
            if (feedintnum === "" || feedintnum === prevfeedintnum) {
                executeEditDataFeed(rowId)
            } else {
                let sql = `select count(*) as count from feed where international_number='${feedintnum}'`
                db.all(sql, (err, row) => {
                    if (err) throw err
                    let rowNumber = row[0].count
                    if (rowNumber < 1) {
                        executeEditDataFeed(rowId)
                    } else {
                        dialog.showMessageBoxSync({
                            title: 'alert',
                            type: 'info',
                            message: 'International Number \'' + feedintnum + '\'has already existed in the table'
                        })
                    }
                })
            }
        } else {
            let sql = `select count(*) as count from feed where description = '${feeddesc}'`
            db.all(sql, (err, row) => {
                if (err) {
                    console.log(err)
                } else {
                    let rowNumber = row[0].count
                    if (rowNumber < 1) {
                        if (feedintnum === "" || feedintnum === prevfeedintnum) {
                            executeEditDataFeed(rowId)

                        } else {
                            let sql = `select count(*) as count from feed where international_number = '${feedintnum}'`
                            db.all(sql, (err, row) => {
                                if (err) throw err
                                let rowNumber = row[0].count
                                if (rowNumber < 1) {
                                    executeEditDataFeed(rowId)
                                } else {
                                    dialog.showMessageBoxSync({
                                        title: 'alert',
                                        type: 'info',
                                        message: 'International Number \'' + feedintnum + '\'has already existed in the table'
                                    })
                                }
                            })
                        }
                    }

                }
            })
        }


    }
}

executeEditDataFeed = (rowId) => {
    let feedName = $('#edit-form').find('#editfeedname').val()
    let feeddesc = $('#edit-form').find('#editdescription').val()
    let feedcat = $('#edit-form').find('#editcategory').val()
    let feedintnum = $('#edit-form').find('#editinternational_number').val()
    let feeddm = $('#edit-form').find('#editdm').val()

    if (feedName === "") {
        dialog.showMessageBoxSync({
            title: 'alert',
            type: 'info',
            message: 'Feed Name Is Required'
        })
    } else if (feeddesc === "") {
        dialog.showMessageBoxSync({
            title: 'alert',
            type: 'info',
            message: 'Description Is Required'
        })
    } else if (feedcat === "") {
        dialog.showMessageBoxSync({
            title: 'alert',
            type: 'info',
            message: 'Category Is Required'
        })
    } else if (feedintnum === "") {
        dialog.showMessageBoxSync({
            title: 'alert',
            type: 'info',
            message: 'International Number Is Required'
        })


    } else {
        let query = `update feed set feed_name='${feedName}', description='${feeddesc}',category='${feedcat}',international_number='${feedintnum}',dry_mather='${feeddm}' where id=${rowId}`
        db.serialize(() => {
            db.run(query, err => {
                if (err) throw err
                ipcRenderer.send('update:success', doc_id)
            })
        })
        // dialog.showMessageBoxSync({
        //     title: 'alert',
        //     type: 'info',
        //     message: query
        // })
    }



}