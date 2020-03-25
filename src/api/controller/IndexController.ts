import { Request, Response } from 'express'
import rp from 'request-promise'
import cheerio from 'cheerio'

import { dateFormat } from '../middleware/dateFormat'

const Index = async (req: Request, res: Response) => {
  const { from = 'ddarkr', to = 'cheong_myeong__' } = req.query

  const url = 'https://mobile.twitter.com'

  const options = {
    // request-promise 옵션 설정
    uri: `${url}/search?q=(from%3A${from})%20(to%3A${to})&src=typed_query&f=live`,
    method: 'GET',
    headers: {
      // 헤더 부분 설정
      'User-Agent': 'TFI-Server/1.0',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-language': 'ko'
    }
  }

  rp(options)
    .then(body => {
      const $ = cheerio.load(body)

      const href = $('div.timeline > table:nth-child(1)')[0].attribs.href

      const options = {
        // request-promise 옵션 설정
        uri: url + href,
        method: 'GET',
        headers: {
          // 헤더 부분 설정
          'User-Agent': 'HT-API/1.0',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-language': 'ko'
        }
      }

      rp(options)
        .then(async body => {
          const $ = cheerio.load(body)
          const date = $('div.metadata > a')[0].children[0].data || ''

          const format = dateFormat(date)

          res.json({ result: 'OK', to, from, format })
        })
        .catch(err2 => {
          console.log(err2)
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const IndexController = {
  Index
}
