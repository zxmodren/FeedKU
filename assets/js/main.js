let doc_id = $('body').attr('id')
load_data = () => {
    switch (doc_id) {
        case 'feed-database':
            loadFeed();
            break;
    }
}
load_data()

deleterecord = (id) => {
    let doc_id = $('body').attr('id')
    let table
    switch (doc_id) {
        case 'feed-database':
            table = 'feed'
            break;
    }
    let sql = `delete from ${table} where id = ${id}`
    db.run(sql, err => {
        if (err) {
            console, log(err)
        } else {
            load_data()
        }
    })
}

deletealldata = () => {
    let doc_id = $('body').attr('id')
    let table
    switch (doc_id) {
        case 'feed-database':
            table = 'feed'
            break;


    }
    let sql = `delete from ${table}`
    db.run(sql, err => {
        if (err) {
            console, log(err)
        } else {
            load_data()
        }
    })
}

deletemultipledata = (ids) => {
    let doc_id = $('body').attr('id')
    let table
    switch (doc_id) {
        case 'feed-database':
            table = 'feed'
            break;


    }
    let sql = `delete from ${table} where id IN(${ids})`
    db.run(sql, err => {
        if (err) {
            console, log(err)
        } else {
            load_data()
        }
    })
}

editdata = (id) => {
    let doc_id = $('body').attr('id')
    let table
    switch (doc_id) {
        case 'feed-database':
            editdatafeed(id)
            break;


    }
}

alertSuccess = (msg) => {
    let div = `<div class="alert alert-success">${msg}</div>`
    $('#alert').html(div)
    clearAlert = () => {
        $('#alert').html("")
    }
    setTimeout(clearAlert, 4000)

}