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
    
    if(!session.get('SessionLogin'))
    {
        return response.redirect('/login', false, 403)
    }
    await next(request)
  }

}

module.exports = Otentifikasi
