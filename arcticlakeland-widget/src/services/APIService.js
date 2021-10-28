import axios from "axios";
import { apiURL } from "../constants";

export default class APIService {

    getProducts(categoryId, callback, params = {page: 1}, error) {
        console.log(categoryId)
        return this.getData(`product?lang=fi&page=${params.page}&category=${categoryId}`, callback, error)
    }

    getCategories(callback) {
        return this.getData('activitycategory?lang=fi&per_page=100', callback)
    }

    getData(action, callback, error = (e) => {console.log(e)}) {
        return axios.get(apiURL + action).then((response) => callback(response.data), (e) => error(e))
    }
}