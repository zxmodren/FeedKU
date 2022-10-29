closeTrial = () => {
    ipcRenderer.send('close:trial')
}
minTrial = () => {
    ipcRenderer.send('min:trial')
}

// getFeedbyName = () => {
//     let query = `select * from feed order by id desc`
//     db.all(query, (err, rows) => {
//         if (err) throw err
//         let options = `<option value="">Feed Name</option>`
//         rows.forEach(row => {
//             options += `<option>${row.feed_name}</option>`
//         })
//         $('#feed_name').html(options)
//     })
// }
// getFeedbyName()

today = () => {
    let d = new Date()
    let date = d.getDate().toString().padStart(2, 0)
    let month = d.getMonth().toString().padStart(2, 0)
    let year = d.getFullYear()
    $('#info-formulation-date').html(`${date}/${month}/${year}`)
}
today()

openFormulation = () => {
    let frNumber = $('#formulation-number').val()
    let typLivestock = $('#type-livestock').val()

    today()

    $('#info-formulation-number').html(frNumber)
    $('#info-livestock').html(typLivestock)
    $('#modal-new-formulation').modal('hide')
    $('.formulation-input').removeAttr('disabled')
    $('#btn-new-formulation').prop('disabled', true)



}

let internationalnumberArray = []

db.all(`select * from feed`, (err, rows) => {
    if (err) throw err
    rows.map(row => {
        internationalnumberArray.push(row.international_number)
    })
})

$('#internationalnumber').autocomplete({
    source: internationalnumberArray
})

insertFormulation = () => {
    let frNumber = $('#formulation-number').val()
    let typLivestock = $('#type-livestock').val()
    let intNumb = $('#internationalnumber').val()
    let prop = $('#prop').val()

    if (intNumb != "" && intNumb != null) {
        db.all(`select * from feed where international_number = '${intNumb}'`, (err, row) => {
            if (err) throw err
            if (row.length < 1) {
                let alert = dialog.showMessageBoxSync(
                    {
                        title: 'Alert',
                        type: 'info',
                        message: intNumb + 'not found'
                    }
                )
                if (alert == 0) {
                    $('#internationalnumber').val("")
                }
            } else {
                let fd_name = row[0].feed_name
                let descrip = row[0].description
                let cat = row[0].category
                let internumb = row[0].international_number
                let drymater = row[0].dry_mather
                let mene = row[0].me
                let tmen = row[0].tme
                let prot = row[0].protein
                let eex = row[0].ether_extract
                let lac = row[0].linoleic_acid
                let cfib = row[0].crude_fiber
                let calc = row[0].calcium
                let totphos = row[0].total_phosphorus
                let npphos = row[0].non_phytate_phosphorus
                let pota = row[0].potasium
                let choli = row[0].chlorine
                let irn = row[0].iron
                let magnes = row[0].magnesium
                let mangan = row[0].manganese
                let sodi = row[0].sodium
                let sulf = row[0].sulfur
                let copp = row[0].copper
                let selen = row[0].selenium
                let zic = row[0].zinc
                let biot = row[0].biotin
                let cholin = row[0].choline
                let folac = row[0].folacin
                let niac = row[0].niacin
                let panac = row[0].pantothenic_acid
                let pyrid = row[0].pyridoxine
                let ribolam = row[0].ribolamin
                let thiam = row[0].thiamin
                let b12 = row[0].vitamin_b12
                let e = row[0].vitamin_e
                let argin = row[0].arginine
                let glyc = row[0].glycine
                let serin = row[0].serine
                let histi = row[0].histidine
                let isoleu = row[0].isoleucine
                let leuc = row[0].leucine
                let lysi = row[0].lysine
                let methi = row[0].methionine
                let cyst = row[0].cystine
                let phenyl = row[0].phenylalanine
                let tyros = row[0].tyrosine
                let threo = row[0].threonine
                let trypto = row[0].tryptophan
                let valin = row[0].valine

                db.all(`select * from formulation_1 where international_number ='${internumb}'`, (err, row) => {
                    if (err) throw err
                    if (row.length < 1) {
                        let total_drymater = prop / 100 * drymater
                        let total_mene = prop / 100 * mene
                        let total_tmen = prop / 100 * tmen
                        let total_prot = prop / 100 * prot
                        let total_eex = prop / 100 * eex
                        let total_lac = prop / 100 * lac
                        let total_cfib = prop / 100 * cfib
                        let total_calc = prop / 100 * calc
                        let total_totphos = prop / 100 * totphos
                        let total_npphos = prop / 100 * npphos
                        let total_pota = prop / 100 * pota
                        let total_choli = prop / 100 * choli
                        let total_irn = prop / 100 * irn
                        let total_magnes = prop / 100 * magnes
                        let total_mangan = prop / 100 * mangan
                        let total_sodi = prop / 100 * sodi
                        let total_sulf = prop / 100 * sulf
                        let total_copp = prop / 100 * copp
                        let total_selen = prop / 100 * selen
                        let total_zic = prop / 100 * zic
                        let total_biot = prop / 100 * biot
                        let total_cholin = prop / 100 * cholin
                        let total_folac = prop / 100 * folac
                        let total_niac = prop / 100 * niac
                        let total_panac = prop / 100 * panac
                        let total_pyrid = prop / 100 * pyrid
                        let total_ribolam = prop / 100 * ribolam
                        let total_thiam = prop / 100 * thiam
                        let total_b12 = prop / 100 * b12
                        let total_e = prop / 100 * e
                        let total_argin = prop / 100 * argin
                        let total_glyc = prop / 100 * glyc
                        let total_serin = prop / 100 * serin
                        let total_histi = prop / 100 * histi
                        let total_isoleu = prop / 100 * isoleu
                        let total_leuc = prop / 100 * leuc
                        let total_lysi = prop / 100 * lysi
                        let total_methi = prop / 100 * methi
                        let total_cyst = prop / 100 * cyst
                        let total_phenyl = prop / 100 * phenyl
                        let total_tyros = prop / 100 * tyros
                        let total_threo = prop / 100 * threo
                        let total_trypto = prop / 100 * trypto
                        let total_valin = prop / 100 * valin

                        db.run(`INSERT INTO formulation_1 (date, fr_numb, typ_livestock, feed_name, description, category, international_number, proportion, dry_mather, me, tme, protein, ether_extract, linoleic_acid, crude_fiber, calcium, total_phosphorus, non_phytate_phosphorus, potasium, chlorine, iron, magnesium, manganese, sodium, sulfur, copper, selenium, zinc, biotin, choline, folacin, niacin, pantothenic_acid, pyridoxine, ribolamin, thiamin, vitamin_b12, vitamin_e, arginine, glycine, serine, histidine, isoleucine, leucine, lysine, methionine, cystine, phenylalanine, tyrosine, threonine, tryptophan, valine) values(datetime('now','localtime'),'${frNumber}','${typLivestock}','${fd_name}','${descrip}','${cat}','${internumb}', '${prop}','${total_drymater}','${total_mene}', '${total_tmen}', '${total_prot}', '${total_eex}', '${total_lac}','${total_cfib}','${total_calc}','${total_totphos}','${total_npphos}', '${total_pota}','${total_choli}','${total_irn}','${total_magnes}','${total_mangan}','${total_sodi}', '${total_sulf}', '${total_copp}','${total_selen}','${total_zic}','${total_biot}','${total_cholin}', '${total_folac}','${total_niac}','${total_panac}','${total_pyrid}','${total_ribolam}','${total_thiam}','${total_b12}','${total_e}','${total_argin}','${total_glyc}','${total_serin}','${total_histi}','${total_isoleu}','${total_leuc}','${total_lysi}','${total_methi}','${total_cyst}','${total_phenyl}','${total_tyros}','${total_threo}','${total_trypto}','${total_valin}')`, err => {
                            if (err) throw err
                            totalProportion(frNumber)
                            totalDm(frNumber)
                            totalMe(frNumber)
                            totalTme(frNumber)
                            totalPro(frNumber)
                            totalEe(frNumber)
                            loadFormulation(frNumber)
                            alert('Formulation Saved')

                        })

                    } else {
                        let new_prop = $('#prop').val()
                        let new_total_drymater = prop / 100 * drymater
                        let new_total_mene = prop / 100 * mene
                        let new_total_tmen = prop / 100 * tmen
                        let new_total_prot = prop / 100 * prot
                        let new_total_eex = prop / 100 * eex
                        let new_total_lac = prop / 100 * lac
                        let new_total_cfib = prop / 100 * cfib
                        let new_total_calc = prop / 100 * calc
                        let new_total_totphos = prop / 100 * totphos
                        let new_total_npphos = prop / 100 * npphos
                        let new_total_pota = prop / 100 * pota
                        let new_total_choli = prop / 100 * choli
                        let new_total_irn = prop / 100 * irn
                        let new_total_magnes = prop / 100 * magnes
                        let new_total_mangan = prop / 100 * mangan
                        let new_total_sodi = prop / 100 * sodi
                        let new_total_sulf = prop / 100 * sulf
                        let new_total_copp = prop / 100 * copp
                        let new_total_selen = prop / 100 * selen
                        let new_total_zic = prop / 100 * zic
                        let new_total_biot = prop / 100 * biot
                        let new_total_cholin = prop / 100 * cholin
                        let new_total_folac = prop / 100 * folac
                        let new_total_niac = prop / 100 * niac
                        let new_total_panac = prop / 100 * panac
                        let new_total_pyrid = prop / 100 * pyrid
                        let new_total_ribolam = prop / 100 * ribolam
                        let new_total_thiam = prop / 100 * thiam
                        let new_total_b12 = prop / 100 * b12
                        let new_total_e = prop / 100 * e
                        let new_total_argin = prop / 100 * argin
                        let new_total_glyc = prop / 100 * glyc
                        let new_total_serin = prop / 100 * serin
                        let new_total_histi = prop / 100 * histi
                        let new_total_isoleu = prop / 100 * isoleu
                        let new_total_leuc = prop / 100 * leuc
                        let new_total_lysi = prop / 100 * lysi
                        let new_total_methi = prop / 100 * methi
                        let new_total_cyst = prop / 100 * cyst
                        let new_total_phenyl = prop / 100 * phenyl
                        let new_total_tyros = prop / 100 * tyros
                        let new_total_threo = prop / 100 * threo
                        let new_total_trypto = prop / 100 * trypto
                        let new_total_valin = prop / 100 * valin


                        db.run(`update formulation_1 set 
    date= datetime('now','localtime'), proportion= '${prop}', 
    dry_mather= '${new_total_drymater}', me= '${new_total_mene}', tme= '${new_total_tmen}',
    protein= '${new_total_prot}',ether_extract= '${new_total_eex}',linoleic_acid= '${new_total_lac}',
    crude_fiber= '${new_total_cfib}', calcium= '${new_total_calc}', total_phosphorus= '${new_total_totphos}',
    non_phytate_phosphorus= '${new_total_npphos}',potasium= '${new_total_pota}',chlorine= '${new_total_choli}',
    iron= '${new_total_irn}',magnesium= '${new_total_magnes}',manganese= '${new_total_mangan}',
    sodium= '${new_total_sodi}',sulfur= '${new_total_sulf}',copper= '${new_total_copp}',
    selenium= '${new_total_selen}',zinc= '${new_total_zic}',biotin= '${new_total_biot}',
    choline= '${new_total_cholin}',folacin= '${new_total_folac}',niacin= '${new_total_niac}',
    pantothenic_acid= '${new_total_panac}',pyridoxine= '${new_total_pyrid}',ribolamin= '${new_total_ribolam}',
    thiamin= '${new_total_thiam}',vitamin_b12= '${new_total_b12}',vitamin_e= '${new_total_e}',
    arginine= '${new_total_argin}',glycine= '${new_total_glyc}',serine= '${new_total_serin}',
    histidine= '${new_total_histi}',isoleucine= '${new_total_isoleu}',leucine= '${new_total_leuc}',
    cystine= '${new_total_cyst}',methionine= '${new_total_methi}',lysine= '${new_total_lysi}',
    phenylalanine= '${new_total_phenyl}',tyrosine= '${new_total_tyros}',threonine= '${new_total_threo}',
    tryptophan= '${new_total_trypto}',valine= '${new_total_valin}'where international_number='${intNumb}' and fr_numb='${frNumber}'`, err => {
                            if (err) throw err
                            totalProportion(frNumber)
                            totalDm(frNumber)
                            totalMe(frNumber)
                            totalTme(frNumber)
                            totalPro(frNumber)
                            totalEe(frNumber)
                            loadFormulation(frNumber)
                            alert('Formulation Update')
                        })
                    }
                })

            }
        })
    } else {
        dialog.showMessageBoxSync(
            {
                title: 'Alert',
                type: 'info',
                message: 'Please insert international number'
            }
        )
    }
    $('#internationalnumber').val("")
    $('#prop').val("")


}

loadFormulation = (frNumber) => {
    let query = `select * from formulation_1 where fr_numb='${frNumber}'`
    db.all(query, (err, rows) => {
        if (err) throw err
        let tr = ''
        if (rows.length < 1) {
            tr += ''
        } else {
            rows.map(row => {
                tr += `<tr>
                        <td>${row.feed_name}</td>
                        <td>${row.description}</td>
                        <td>${row.international_number}</td>
                        <td>${row.proportion}</td>
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
                     </tr>`
            })
        }
        $('tbody#formulation-data').html(tr)
    })
}

totalProportion = (frNumber) => {
    let query = `select sum(proportion) as proportion from formulation_1 where fr_numb='${frNumber}'`
    db.all(query, (err, row) => {
        let total_proportion = row[0].proportion
        if (err) throw err
        if (row.length < 1) {
            $('#info-total-ratio').val("0")
        } else {
            $('#info-total-ratio').html(total_proportion)
        }


    })
}

totalDm = (frNumber) => {
    let query = `select sum(dry_mather) as dry_mather from formulation_1 where fr_numb='${frNumber}'`
    db.all(query, (err, row) => {
        let totalDm = row[0].dry_mather
        if (err) throw err
        if (row.length < 1) {
            $('#total_dm').val("0")
        } else {
            $('#total_dm').html(totalDm)
        }


    })
}

totalMe = (frNumber) => {
    let query = `select sum(me) as me from formulation_1 where fr_numb='${frNumber}'`
    db.all(query, (err, row) => {
        let totalMe = row[0].me
        if (err) throw err
        if (row.length < 1) {
            $('#total_me').val("0")
        } else {
            $('#total_me').html(totalMe)
        }


    })
}

totalTme = (frNumber) => {
    let query = `select sum(tme) as tme from formulation_1 where fr_numb='${frNumber}'`
    db.all(query, (err, row) => {
        let totalTme = row[0].tme
        if (err) throw err
        if (row.length < 1) {
            $('#total_tme').val("0")
        } else {
            $('#total_tme').html(totalTme)
        }


    })
}
totalPro = (frNumber) => {
    let query = `select sum(protein) as protein from formulation_1 where fr_numb='${frNumber}'`
    db.all(query, (err, row) => {
        let totalPro = row[0].protein
        if (err) throw err
        if (row.length < 1) {
            $('#total_protein').val("0")
        } else {
            $('#total_protein').html(totalPro)
        }


    })
}
totalEe = (frNumber) => {
    let query = `select sum(ether_extract) as ether_extract from formulation_1 where fr_numb='${frNumber}'`
    db.all(query, (err, row) => {
        let totalEe = row[0].ether_extract
        if (err) throw err
        if (row.length < 1) {
            $('#total_ee').val("0")
        } else {
            $('#total_ee').html(totalEe)
        }


    })
}

editFeedModal = (title) => {
    let fr_Number = $('#formulation-number').val()
    let typ_Livestock = $('#type-livestock').val()
    let total_proportion = $('#info-total-ratio').val()

    if (fr_Number != "") {
        db.all(`select * from formulation_1 where fr_numb='${fr_Number}'`, (err, rows) => {
            if (rows.length < 1) {
                let alert = dialog.showMessageBoxSync(
                    {
                        title: 'Alert',
                        type: 'info',
                        message: 'Cannot Edit Formulation, Please Add Feed'
                    }
                )

            } else {
                ipcRenderer.send('load:edit-feed-modal', fr_Number, title, typ_Livestock, total_proportion)
            }
        })
    } else {
        let alert = dialog.showMessageBoxSync({
            title: 'Alert',
            type: 'info',
            message: 'Please Make Formulation First'
        })
        if (alert == 0) {
            $('btn-new-formulation').focus()
        }
    }
}

formulationNumber = () => {
    let query = `select max(substr(fr_numb, 7, 7)) as fr_numb from formulation_1`
    db.all(query, (err, row) => {
        if (err) throw err
        let number
        if (row[0].fr_numb == null) {
            number = 1
        } else {
            number = parseInt(row[0].fr_numb) + 1
        }
        let suffixNum = number.toString().padStart(7, 0)
        let d = new Date()
        let month = d.getMonth().toString().padStart(2, 0)
        let year = d.getFullYear()
        let formNum = `${year}${month}${suffixNum}`
        $('#formulation-number').val(formNum)
        $('#btn-create-new-formulation').focus()
    })
}