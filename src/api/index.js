import request from '../utils/request'

function wordcloud() {
  return request({
    url: '/data/wordcloud',
    method: 'get'
  })
}

function mapScatter() {
  return request({
    url: '/data/mapScatter',
    method: 'get'
  })
}

function screenData() {
  return request({
    url: '/data/screenData',
    method: 'get'
  })
}

export { wordcloud, mapScatter, screenData }
