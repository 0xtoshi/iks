'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Lain2Schema extends Schema {
  up () {
    this.create('lain_2_s', (table) => {
      table.increments()
      table.string('nama', 100)
      table.integer('nominal', 11)
      table.integer('jumlah', 11)
      table.integer('id_bq').unsigned().references('id').inTable('bqs').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('lain_2_s')
  }
}

module.exports = Lain2Schema
