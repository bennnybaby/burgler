import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-682f7-default-rtdb.firebaseio.com/'
});

export default instance;