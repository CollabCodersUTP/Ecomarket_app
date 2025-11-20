import axios from 'axios';

   console.log('✅ Axios cargado correctamente');

   const api = axios.create({
     baseURL: 'http://localhost:8080/api',
     headers: {
       'Content-Type': 'application/json',
     },
     timeout: 10000,
   });

   api.interceptors.request.use(
     (config) => {
       return config;
     },
     (error) => {
       return Promise.reject(error);
     }
   );

   api.interceptors.response.use(
     (response) => {
       return response;
     },
     (error) => {
       if (error.response) {
         console.error('Error de respuesta:', error.response.data);
         console.error('Status:', error.response.status);
       } else if (error.request) {
         console.error('Error de red - No hay respuesta del servidor');
       } else {
         console.error('Error:', error.message);
       }
       return Promise.reject(error);
     }
   );

   export default api;