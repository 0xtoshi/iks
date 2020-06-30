'use strict'

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

        console.log(getBulan)
        var id_personil = post.id_personil
        var personil_gaji  = post.personil_gaji
        var personil_terpenuhi = post.personil_terpenuhi

        for (let i = 0; i < id_personil.length; i++) {
            await Tender.create({
                bulan : newBulan,
                nominal : (Number(personil_gaji[i]) * Number(personil_terpenuhi[i])),
                id_bq : post.id,
                category : 'personil',
                ids : id_personil[i]
            })  
        }

        var id_perlengkapan = post.id_perlengkapan
        var nominal_perlengkapan = post.nominal_perlengkapan
        var perlengkapan_terpenuhi = post.perlengkapan_terpenuhi
        for (let i = 0; i < id_personil.length; i++) {
            await Tender.create({
                bulan : newBulan,
                nominal : (Number(nominal_perlengkapan[i]) * Number(perlengkapan_terpenuhi[i])),
                id_bq : post.id,
                category : 'perlengkapan',
                ids : id_perlengkapan[i]
            })  
        }

        var id_lain2 = post.id_personil
        var nominal_lain2 = post.nominal_lain2
        var lain2_terpenuhi = post.lain2_terpenuhi
        for (let i = 0; i < id_personil.length; i++) {
            await Tender.create({
                bulan : newBulan,
                nominal : (Number(nominal_lain2[i]) * Number(lain2_terpenuhi[i])),
                id_bq : post.id,
                category : 'lain2',
                ids : id_lain2[i]
            })  
        }

        return response.status(200).json({ status : 200 , msg : 'Sukses Menyimpan Tender!' })
    }

}

module.exports = TenderController
