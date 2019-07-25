import axios from 'axios'
import { message } from 'ant-design-vue'

const baseUrl = '/apis/orders'

const instance = axios.create({})

instance.interceptors.response.use(response => (response), (error) => {
  message.error(error.response.data)
  return Promise.reject(error)
})

const fetchOrders = async () => {
  const response = await instance.get(baseUrl)
  return response.data
}

const fetchOrdersByStatus = async (status) => {
  const response = await instance.get(baseUrl, {
    params: {
      status
    }
  })
  return response.data
}

const createOrder = async (order) => {
  await instance.post(baseUrl, order)
}

const updateOrderStatus = async (id, status) => {
  await instance.patch(`${baseUrl}/${id}`, null, {
    params: {
      status
    }
  })
}

const updateOrderTimeAndStatusByOrderNo = async (orderNo, appointmentTime, status) => {
  await instance.patch(`${baseUrl}`, null, {
    params: {
      orderNo,
      status,
      appointmentTime
    }
  })
}

export default {
  fetchOrders,
  createOrder,
  updateOrderStatus,
  fetchOrdersByStatus,
  updateOrderTimeAndStatusByOrderNo
}
