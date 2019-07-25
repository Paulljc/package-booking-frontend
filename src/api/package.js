import request from '../utils/request'

export const addPackage = (packaging) => {
  return request({
    url: '/',
    method: 'post',
    data: packaging
  })
}

export const getPackage = () => {
  return request({
    url: '/',
    method: 'get'
  })
}

export const getPackageByStatus = (status) => {
  return request({
    url: `/${status}`,
    method: 'get'
  })
}

export const updatePackage = (id, packaging) => {
  return request({
    url: `/${id}`,
    method: 'put',
    data: packaging
  })
}
