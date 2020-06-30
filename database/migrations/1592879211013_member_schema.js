'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('members', (table) => {
      table.increments()
      table.string('username', 25)
      table.text('pass')
      table.string('nama', 50)
      table.enum('jabatan', ['Lelang','Keuangan','Pimpinan'])
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MemberSchema
