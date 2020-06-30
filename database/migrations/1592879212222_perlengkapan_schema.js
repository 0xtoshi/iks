'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PerlengkapanSchema extends Schema {
  up () {
    this.create('perlengkapans', (table) => {
      table.increments()
      table.string('nama', 100)
      table.integer('nominal', 11)
      table.integer('jumlah', 11)
      table.integer('id_bq').unsigned().references('id').inTable('bqs').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('perlengkapans')
  }
}

module.exports = PerlengkapanSchema
