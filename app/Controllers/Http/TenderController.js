'use strict'

const { get } = require("@adonisjs/framework/src/Route/Manager")

const BQ = use('App/Models/Bq')
const InputFile = use('App/Models/InputFile')
const Lain2 = use('App/Models/Lain2')
const Member = use('App/Models/Member')
const Perlengkapan = use('App/Models/Perlengkapan')
const Personil = use('App/Models/Personil')
const Tender = use('App/Models/Tender')

class TenderController {

    async TambahSuratPenerimaan({ request , response , session})
    {
        var post = request.all()

        let getBulan = await Tender.query()
        .select('bulan')
        .where('id_bq', post.id)
        .last()
        var newBulan
        if( getBulan == null){
            var newBulan = Number(1)
        }else{
            var newBulan = Number(getBulan.bulan) + 1
        }
        
        var id_personil = post.id_personil
        var personil_gaji  = post.personil_gaji
        var personil_terpenuhi = post.personil_terpenuhi

        var personile = []
        for (let i = 0; i < id_personil.length; i++) {
            personile.push({
                bulan : newBulan,
                nominal : (Number(personil_gaji[i]) * Number(personil_terpenuhi[i])),
                id_bq : post.id,
                category : 'personil',
                ids : id_personil[i]
            })
        }

        await Tender.createMany(personile)

        var id_perlengkapan = post.id_perlengkapan
        var nominal_perlengkapan = post.nominal_perlengkapan
        var perlengkapan_terpenuhi = post.perlengkapan_terpenuhi
        var perlengkapane = []
        for (let i = 0; i < id_perlengkapan.length; i++) {
            perlengkapane.push({
                bulan : newBulan,
                nominal : (Number(nominal_perlengkapan[i]) * Number(perlengkapan_terpenuhi[i])),
                id_bq : post.id,
                category : 'perlengkapan',
                ids : id_perlengkapan[i]
            })
        }

        await Tender.createMany(perlengkapane)

        var id_lain2 = post.id_lain2
        var nominal_lain2 = post.nominal_lain2
        var lain2_terpenuhi = post.lain2_terpenuhi
        var lain2e = []
        for (let i = 0; i < id_lain2.length; i++) {
            lain2e.push({
                bulan : newBulan,
                nominal : (Number(nominal_lain2[i]) * Number(lain2_terpenuhi[i])),
                id_bq : post.id,
                category : 'lain2',
                ids : id_lain2[i]
            })
        }

        await Tender.createMany(lain2e)

        return response.status(200).json({ status : 200 , msg : 'Sukses Menyimpan Tender!' })
    }

    async DeleteSuratPenerimaan({request , response, session})
    {
        var post = request.all()
        let id_bq = post.id_bq
        let bulan = post.bulan

        await Tender.query()
        .where('id_bq', id_bq)
        .where('bulan', bulan)
        .delete()

        return response.status(200).json({ status : 200 , msg : 'Sukses Menghapus Surat Penerimaan!' })
    }

    async UpdateSuratPenerimaan({request, response, session})
    {
        var post = request.all()
        var id = post.id
        var nominal = post.nominal
        var terpenuhi = post.terpenuhi
        var param = []

        for (let i = 0; i < id.length; i++) {
            
            await Tender.updateOrCreate({
                id : id[i],
            },{
                nominal : Number(nominal[i]) * Number(terpenuhi[i])
            })
        }

        return response.status(200).json({ status : 200 , msg : 'Sukses Mengupdate Surat Penerimaan!' })
    }

    async getBulanTender({request, response, session})
    {
        var id_bq = request.params.id
        let getBulan = await Tender.query()
        .where('tenders.id_bq', id_bq)
        .leftJoin('bqs','tenders.id_bq','bqs.id')
        .select('bqs.lama_tender','tenders.bulan', 'bqs.id')
        .orderBy('tenders.bulan','DESC')
        .limit(1)
        .fetch()

        if(getBulan){
           
            var data = getBulan.toJSON()
            var sisa_bulan = (Number(data[0].lama_tender) - Number(data[0].bulan))
            var output = {
                id : data[0].id,
                label : [ 'Bulan', 'Sisa Bulan' ],
                data : [ data[0].bulan , sisa_bulan]
            }
        }

        return response.status(200).json(output)
    }

}

module.exports = TenderController
