import axios from 'axios';

export const getMetrics = () => {
    return axios.get(`http://localhost:8080/api/metric/getMetric`);
}
