import axios from "axios";
import { apiURL } from "../constants";

export default class APIService {

    getProducts(categoryId, callback) {
        console.log(categoryId)
        return this.getData('product?lang=fi&category=' + categoryId, callback)
    }

    getCategories(callback) {
        return this.getData('activitycategory?lang=fi&per_page=100', callback)
    }

    getData(action, callback) {
        return axios.get(apiURL + action).then((response) => callback(response.data))
    }
}