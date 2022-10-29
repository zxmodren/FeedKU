closeDb = () => {
    ipcRenderer.send('close:database')
}
minDb = () => {
    ipcRenderer.send('min:database')
}
function loadFeed() {
    let query = `select * from feed`
    db.serialize(() => {
        db.all(query, (err, rows) => {
            if (err) throw err
            let datafeed = ''
            if (rows.lenght < 1) {
                datafeed += ''
            } else {
                rows.forEach((row) => {
                    datafeed += ` <tr data-id = ${row.id}>
                                    <td data-colname>
                                    
                                    <input type="checkbox" id="${row.id}" class="data-checkbox">
                                    </td>
                                    <td>${row.feed_name}</td>
                                    <td>${row.description}</td>
                                    <td>${row.category}</td>
                                    <td>${row.international_number}</td>
                                    <td>${row.dry_mather}</td>
                                    <td>${row.me}</td>
                                    <td>${row.tme}</td>
                                    <td>${row.protein}</td>
                                    <td>${row.ether_extract}</td>
                                    <td>${row.linoleic_acid}</td>
                                    <td>${row.crude_fiber}</td>
                                    <td>${row.calcium}</td>
                                    <td>${row.total_phosphorus}</td>
                                    <td>${row.non_phytate_phosphorus}</td>
                                    <td>${row.potasium}</td>
                                    <td>${row.chlorine}</td>
                                    <td>${row.iron}</td>
                                    <td>${row.magnesium}</td>
                                    <td>${row.manganese}</td>
                                    <td>${row.sodium}</td>
                                    <td>${row.sulfur}</td>
                                    <td>${row.copper}</td>
                                    <td>${row.selenium}</td>
                                    <td>${row.zinc}</td>
                                    <td>${row.biotin}</td>
                                    <td>${row.choline}</td>
                                    <td>${row.folacin}</td>
                                    <td>${row.niacin}</td>
                                    <td>${row.pantothenic_acid}</td>
                                    <td>${row.pyridoxine}</td>
                                    <td>${row.ribolamin}</td>
                                    <td>${row.thiamin}</td>
                                    <td>${row.vitamin_b12}</td>
                                    <td>${row.vitamin_e}</td>
                                    <td>${row.arginine}</td>
                                    <td>${row.glycine}</td>
                                    <td>${row.serine}</td>
                                    <td>${row.histidine}</td>
                                    <td>${row.isoleucine}</td>
                                    <td>${row.leucine}</td>
                                    <td>${row.lysine}</td>
                                    <td>${row.methionine}</td>
                                    <td>${row.cystine}</td>
                                    <td>${row.phenylalanine}</td>
                                    <td>${row.tyrosine}</td>
                                    <td>${row.threonine}</td>
                                    <td>${row.tryptophan}</td>
                                    <td>${row.valine}</td>
                                    <td>
                                   
                                    <button class="btn btn-sm btn-danger btn-light-bordered" onclick="deletedata(${row.id},'${row.description}')" id="delete-data"><i
                                        class="fa fa-trash"></i></button>
                                    </td>

                                </tr>`
                })
            }
            $('tbody#data').html(datafeed)
        })
    })
}


blank = () => {
    $('#feed_name').val("")
    $('#description').val("")
    $('#international_number').val("")
    $('#category').val("")
    $('#dm').val("")
    $('#me').val("")
    $('#tme').val("")
    $('#pro').val("")
    $('#ee').val("")
    $('#la').val("")
    $('#cf').val("")
    $('#cal').val("")
    $('#tp').val("")
    $('#np').val("")
    $('#pot').val("")
    $('#chol').val("")
    $('#ir').val("")
    $('#mag').val("")
    $('#mang').val("")
    $('#sod').val("")
    $('#sul').val("")
    $('#cop').val("")
    $('#sel').val("")
    $('#zin').val("")
    $('#bio').val("")
    $('#cho').val("")
    $('#fol').val("")
    $('#nia').val("")
    $('#pa').val("")
    $('#pyri').val("")
    $('#rib').val("")
    $('#thi').val("")
    $('#vit_b12').val("")
    $('#vit_e').val("")
    $('#arg').val("")
    $('#gly').val("")
    $('#ser').val("")
    $('#his').val("")
    $('#iso').val("")
    $('#leu').val("")
    $('#lys').val("")
    $('#meth').val("")
    $('#cys').val("")
    $('#pheny').val("")
    $('#tyro').val("")
    $('#thre').val("")
    $('#tryp').val("")
    $('#vali').val("")
}

insertFeed = () => {
    let feed_name = $('#feed_name').val()
    let description = $('#description').val()
    let international_number = $('#international_number').val()
    let category = $('#category').val()
    let dm = $('#dm').val()
    let me = $('#me').val()
    let tme = $('#tme').val()
    let pro = $('#pro').val()
    let ee = $('#ee').val()
    let la = $('#la').val()
    let cf = $('#cf').val()
    let cal = $('#cal').val()
    let tp = $('#tp').val()
    let np = $('#np').val()
    let pot = $('#pot').val()
    let chol = $('#chol').val()
    let ir = $('#ir').val()
    let mag = $('#mag').val()
    let mang = $('#mang').val()
    let sod = $('#sod').val()
    let sul = $('#sul').val()
    let cop = $('#cop').val()
    let sel = $('#sel').val()
    let zin = $('#zin').val()
    let bio = $('#bio').val()
    let cho = $('#cho').val()
    let fol = $('#fol').val()
    let nia = $('#nia').val()
    let pa = $('#pa').val()
    let pyri = $('#pyri').val()
    let rib = $('#rib').val()
    let thi = $('#thi').val()
    let vit_b12 = $('#vit_b12').val()
    let vit_e = $('#vit_e').val()
    let arg = $('#arg').val()
    let gly = $('#gly').val()
    let ser = $('#ser').val()
    let his = $('#his').val()
    let iso = $('#iso').val()
    let leu = $('#leu').val()
    let lys = $('#lys').val()
    let meth = $('#meth').val()
    let cys = $('#cys').val()
    let pheny = $('#pheny').val()
    let tyro = $('#tyro').val()
    let thre = $('#thre').val()
    let tryp = $('#tryp').val()
    let vali = $('#vali').val()

    let required = $('[required]')
    let required_array = []
    required.each(function () {
        if ($(this).val() != "") {
            required_array.push($(this).val())
        }
    })

    if (required_array.length < 1) {
        dialog.showMessageBoxSync({
            title: 'alert',
            type: 'info',
            message: 'The Box Is Empty'
        })
    } else {
        db.serialize(() => {
            db.each(`select count(*) as row_number from feed where international_number = '${international_number}'`, (err, res) => {
                if (err) throw err
                if (res.row_number < 1) {
                    db.run(`INSERT INTO feed(feed_name, description, category, international_number, dry_mather, me, tme, protein, ether_extract, linoleic_acid, crude_fiber, calcium, total_phosphorus, non_phytate_phosphorus, potasium, chlorine, iron, magnesium, manganese, sodium, sulfur, copper, selenium, zinc, biotin, choline, folacin, niacin, pantothenic_acid, pyridoxine, ribolamin, thiamin, vitamin_b12, vitamin_e, arginine, glycine, serine, histidine, isoleucine, leucine, lysine, methionine, cystine, phenylalanine, tyrosine, threonine, tryptophan, valine) values('${feed_name}','${description}','${category}','${international_number}','${dm}','${me}','${tme}','${pro}','${ee}','${la}','${cf}','${cal}','${tp}','${np}','${pot}','${chol}','${ir}','${mag}','${mang}','${sod}','${sul}','${cop}','${sel}','${zin}','${bio}','${chol}','${fol}','${nia}','${pa}','${pyri}','${rib}','${thi}','${vit_b12}','${vit_e}','${arg}','${gly}','${ser}','${his}','${iso}','${leu}','${lys}','${meth}','${cys}','${pheny}','${tyro}','${thre}','${tryp}','${vali}')`, err => {
                        if (err) throw err
                        $('#feed_name').focus()
                        blank()
                        loadFeed()
                    })
                } else {
                    dialog.showMessageBoxSync({
                        title: 'alert',
                        type: 'info',
                        message: 'Error, We Find Your Feed In Database'
                    })
                }
            })
        })
    }
}


editdatafeed = (id) => {
    let sql = `select * from feed where id=${id}`
    db.all(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let row = result[0]
            let editForm
            editForm = `<div class="mb-3">
                        <input type="text" value="${row.feed_name}" id="editfeedname" placeholder="Feed Name" class="form-control form-control-sm">
                        <input type="hidden" value="${row.feed_name}" id="prevfeedname">
                        <input type="hidden" value="${row.id}" id="rowId">
            </div>
            <div class="mb-3">
                        <input type="text" value="${row.description}" id="editdescription" placeholder="Description Feed" class="form-control form-control-sm">
                       
            </div>
            
            <div class="mb-3">
                        <input type="text" value="${row.category}" id="editcategory" placeholder="Category Feed" class="form-control form-control-sm">
                       
            </div>
            <div class="mb-3">
                        <input type="text" value="${row.international_number}" id="editinternational_number" placeholder="Category Feed" class="form-control form-control-sm">
                        <input type="hidden" value="${row.international_number}" id="previnternational_number">
                       
            </div>
            <div class="mb-3">
            <input type="text" value="${row.dry_mather}" id="editdm" placeholder="Dry Mather" class="form-control form-control-sm">
           </div>
            <div class="d-grid gap-2">
            <button class="btn btn-sm btn-primary btn-block" onclick="submintEditFeedData(${id})" id="btn-submint-edit-data"><i
            class="fa fa-paper-plane"></i>Submint</button>
                       
            </div>
            `
            ipcRenderer.send('load:edit', 'feed-data', editForm, 300, 450, id)
        }
    })
}

ipcRenderer.on('update:success', (e, msg) => {
    alertSuccess(msg)
    load_data()
})