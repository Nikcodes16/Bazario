// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://dummyjson.com',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


// request interceptor

api.interceptors.request.use(
  config => {
    console.log(
      '➡️ API REQUEST:',
      config.method?.toUpperCase(),
      config.url,
    );

    return config;
  },

  error => {
    console.log('REQUEST ERROR:', error);

    return Promise.reject(error);
  },
);


// Response Interceptor

api.interceptors.response.use(
  response => {
    console.log(
      ' API SUCCESS:',
      response.status,
      response.config.url,
    );

    return response;
  },

  error => {
    
    // NETWORK / TIMEOUT ERROR
  
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject({
          type: 'TIMEOUT_ERROR',
          message:
            'Request timeout. Please try again.',
        });
      }

      return Promise.reject({
        type: 'NETWORK_ERROR',
        message:
          'Network error. Please check your internet connection.',
      });
    }

    const status = error.response.status;

    
    // 400 BAD REQUEST

    if (status === 400) {
      return Promise.reject({
        type: 'BAD_REQUEST',
        status,
        message:
          error.response.data?.message ||
          'Invalid request.',
      });
    }

 
    // 401 UNAUTHORIZED
   
    if (status === 401) {
      return Promise.reject({
        type: 'UNAUTHORIZED',
        status,
        message:
          error.response.data?.message ||
          'Unauthorized request.',
      });
    }

   
    // 403 FORBIDDEN
   
    if (status === 403) {
      return Promise.reject({
        type: 'FORBIDDEN',
        status,
        message:
          'You do not have permission to perform this action.',
      });
    }

  
    // 404 NOT FOUND

    if (status === 404) {
      return Promise.reject({
        type: 'NOT_FOUND',
        status,
        message:
          error.response.data?.message ||
          'Requested data was not found.',
      });
    }

    // 500+ SERVER ERROR

    if (status >= 500) {
      return Promise.reject({
        type: 'SERVER_ERROR',
        status,
        message:
          'Server error. Please try again later.',
      });
    }

   
    // OTHER API ERRORS

    return Promise.reject({
      type: 'API_ERROR',
      status,
      message:
        error.response.data?.message ||
        'Something went wrong. Please try again.',
    });
  },
);

export default api;

