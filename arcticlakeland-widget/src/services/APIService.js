import axios from "axios";
import { apiURL } from "../constants";

export default class APIService {

    constructor() {
        
    }

    getProducts() {
        return this.getData('product')
    }

    getCategories(callback) {
        return this.getData('activitycategory', callback)
    }

    getData(action, callback) {
        return axios.get(apiURL + action).then((response) => callback(response.data))
    }
}