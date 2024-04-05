// serviceCaller.js

import axios from 'axios';

class ServiceCaller {
  constructor(baseURL, retryAttempts = 3, retryDelay = 1000) {
    const axiosInstance = axios.create({ baseURL });
    this.axiosRequest = axiosInstance.request.bind(axiosInstance);
    this.retryAttempts = retryAttempts;
    this.retryDelay = retryDelay;
  }

  async request(method, url, data = null, config = {}, retryCount = 0) {
    const { axiosRequest, retryAttempts, retryDelay } = this;
    try {
      const response = await axiosRequest({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      if (retryCount < retryAttempts) {
        await new Promise((resolve) => { setTimeout(resolve, retryDelay); });
        return this.request(method, url, data, config, retryCount + 1);
      }
      if (error.response) {
        throw new Error(`HTTP request failed with status ${error.response.status}`);
      } else {
        throw new Error('Network Error');
      }
    }
  }

  async get(url, config = {}, retryCount = 0) {
    return this.request('get', url, null, config, retryCount);
  }

  async post(url, data = null, config = {}, retryCount = 0) {
    return this.request('post', url, data, config, retryCount);
  }

  async put(url, data = null, config = {}, retryCount = 0) {
    return this.request('put', url, data, config, retryCount);
  }

  async patch(url, data = null, config = {}, retryCount = 0) {
    return this.request('patch', url, data, config, retryCount);
  }

  async delete(url, config = {}, retryCount = 0) {
    return this.request('delete', url, null, config, retryCount);
  }

  async head(url, config = {}, retryCount = 0) {
    return this.request('head', url, null, config, retryCount);
  }

  async options(url, config = {}, retryCount = 0) {
    return this.request('options', url, null, config, retryCount);
  }
}

export default ServiceCaller;
