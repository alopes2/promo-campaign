let environment = {};
if(process.env.NODE_ENV === 'development') {
    environment.BASE_URL = 'http://localhost:5000/api/'
}

if(process.env.NODE_ENV === 'production') {
    environment.BASE_URL = '/api/'
}

export default environment;