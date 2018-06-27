import Mock from 'mockjs'

import mapApi from './map'






Mock.mock(/\static/, 'get', mapApi.getData)
