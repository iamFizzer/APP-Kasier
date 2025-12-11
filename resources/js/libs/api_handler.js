import axios, { isAxiosError } from "axios"

const api_handler = {
    get: async ({
        url = '/',
        
        payload,
        headers = {},
        
        debug = false
    }) => {
        try {
            const response = payload
                ? await axios({
                    url: `${url}`,
                    method: 'GET',
                    headers: {
                        ...headers
                    },
                    withCredentials: true,
                    data: payload,
                    timeout: 60000,
                    timeoutErrorMessage: 'Tampaknya ada masalah di server, silahkan coba lagi'
                })
                : await axios.get(`${url}`, {
                    headers: {
                        ...headers
                    },
                    withCredentials: true,
                    timeout: 60000,
                    timeoutErrorMessage: 'Tampaknya ada masalah di server, silahkan coba lagi'
                })
            if(debug) {
                console.log(response)
            }

            return response?.data
        } catch (error) {
            if(isAxiosError(error)) {
                if(error.code === 'ECONNABORTED') {
                    return {
                        success: false,
                        message: 'Tampaknya ada masalah di server, silahkan coba lagi'
                    }
                }
                return {
                    success: false,
                    message: error?.response?.data?.message
                }
            }else{
                return {
                    success: false,
                    message: error?.message || error?.error,
                    debug: error?.stack
                }
            }
        }
    },
    post: async ({
        url = '/',
        payload,
        headers = {},
        token
    }) => {
        try {
            const response = await axios.post(`${url}`, payload, {
                headers: {
                    ...headers
                },
                withCredentials: true,
                timeout: 60000,
                timeoutErrorMessage: 'Tampaknya ada masalah di server, silahkan coba lagi'
            })

            console.log(response?.data, response)

            return response?.data
        } catch (error) {
            if(isAxiosError(error)) {
                if(error.code === 'ECONNABORTED') {
                    return {
                        success: false,
                        message: 'Tampaknya ada masalah di server, silahkan coba lagi'
                    }    
                }
                return {
                    success: false,
                    message: error?.response?.data?.message
                }
            }else{
                return {
                    success: false,
                    message: error?.message || error?.error,
                    debug: error?.stack
                }
            }
        }
    },
    postForm: async ({
        url = '/',
        
        payload,
        headers = {},
        token
    }) => {
        try {
            const response = await axios.postForm(`${url}`, payload, {
                headers: {
                    ...headers
                },
                withCredentials: true,
                timeout: 60000,
                timeoutErrorMessage: 'Tampaknya ada masalah di server, silahkan coba lagi'
            })

            return response?.data
        } catch (error) {
            if(isAxiosError(error)) {
                if(error.code === 'ECONNABORTED') {
                    return {
                        success: false,
                        message: 'Tampaknya ada masalah di server, silahkan coba lagi'
                    }    
                }
                return {
                    success: false,
                    message: error?.response?.data?.message
                }
            }else{
                return {
                    success: false,
                    message: error?.message || error?.error,
                    debug: error?.stack
                }
            }
        }
    },
    put: async ({
        url = '/',
        
        payload,
        headers = {},
        token
    }) => {
        try {
            const response = await axios.put(`${url}`, payload, {
                headers: {
                    ...headers
                },
                withCredentials: true,
                timeout: 60000,
                timeoutErrorMessage: 'Tampaknya ada masalah di server, silahkan coba lagi'
            })

            return response?.data
        } catch (error) {
            if(isAxiosError(error)) {
                if(error.code === 'ECONNABORTED') {
                    return {
                        success: false,
                        message: 'Tampaknya ada masalah di server, silahkan coba lagi'
                    }    
                }
                return {
                    success: false,
                    message: error?.response?.data?.message
                }
            }else{
                return {
                    success: false,
                    message: error?.message || error?.error,
                    debug: error?.stack
                }
            }
        }
    },

    delete: async ({
        url = '/',
        
        payload,
        headers = {},
        token
    }) => {
        try {

            const response = await axios({
                method: 'DELETE',
                url: `${url}`,
                data: payload,
                timeout: 60000,
                timeoutErrorMessage: 'Tampaknya ada masalah di server, silahkan coba lagi',
                headers: {
                    ...headers
                },
                withCredentials: true
            })

            return response?.data
        } catch (error) {
            if(isAxiosError(error)) {
                if(error.code === 'ECONNABORTED') {
                    return {
                        success: false,
                        message: 'Tampaknya ada masalah di server, silahkan coba lagi'
                    }    
                }
                return {
                    success: false,
                    message: error?.response?.data?.message
                }
            }else{
                return {
                    success: false,
                    message: error?.message || error?.error,
                    debug: error?.stack
                }
            }
        }
    },
    multi: {
        delete: async ({
             base_url, requests = []
        }) => {

            const results = await Promise.allSettled(requests.map(req => api_handler.delete({...req,  base_url})))

            return results.map((res, i) => {
                if(res.status === 'fulfilled') {
                    return {
                        ...res.value,
                        request: requests[i]
                    }
                }else{
                    return {
                        success: false,
                        message: res.reason?.message || 'Terjadi kesalahan pada server, silahkan hubungi Administrator',
                        request: requests[i]
                    }
                }
            })
        }
    }
}

export default api_handler