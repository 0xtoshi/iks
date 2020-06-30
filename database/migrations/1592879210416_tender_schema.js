'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TenderSchema extends Schema {
  up () {
    this.create('tenders', (table) => {
      table.increments()
      table.integer('bulan', 2)
      table.integer('nominal', 11)
      table.integer('id_bq').unsigned().references('id').inTable('bqs').onDelete('cascade')
      table.enum('category',['personil','perlengkapan','lain2'])
      table.integer('ids',11)
      table.timestamps()
    })
  }

  down () {
    this.drop('tenders')
  }
}

module.exports = TenderSchema
