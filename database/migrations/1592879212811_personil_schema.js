'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonilSchema extends Schema {
  up () {
    this.create('personils', (table) => {
      table.increments()
      table.string('jabatan', 100)
      table.integer('gaji', 11)
      table.integer('jumlah', 11)
      table.integer('id_bq').unsigned().references('id').inTable('bqs').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('personils')
  }
}

module.exports = PersonilSchema
