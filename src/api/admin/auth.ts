import request from '@/utils/http'

const prefixUrl = '/api/Admin'
const api = request()

export const Login = (data: object) => api.post(prefixUrl + '/User/Login', data)
export const Register = (data: object) => api.post(prefixUrl + '/User/Register', data)
