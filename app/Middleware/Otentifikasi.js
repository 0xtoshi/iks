'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Otentifikasi {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, session, response}, next) {
    // call next to advance the request
    var sessions = session.get('HasSession')
    if(!sessions)
    {
        return response.redirect('/login', false, 301)
    }
    await next(request)
  }

}

module.exports = Otentifikasi
