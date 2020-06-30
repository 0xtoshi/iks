'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InputFileSchema extends Schema {
  up () {
    this.create('input_files', (table) => {
      table.increments()
      table.string('file', 100)
      table.string('keterangan', 100)
      table.integer('id_tender').unsigned().references('id').inTable('tenders').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('input_files')
  }
}

module.exports = InputFileSchema
