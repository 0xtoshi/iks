'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BqSchema extends Schema {
  up () {
    this.create('bqs', (table) => {
      table.increments()
      table.string('nama', 100)
      table.integer('nilai', 11)
      table.string('instansi', 100)
      table.integer('lama_tender', 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('bqs')
  }
}

module.exports = BqSchema
