import http from "../http-common";
import authHeader from "./AuthHeader"

class MovieDataService {
  getAll() {
    return http.get("api/movies",{ headers: authHeader() });
  }

  get(id) {
    return http.get(`api/movies/${id}`,{ headers: authHeader() });
  }

  create(data) {
    return http.post("api/movies", data,{ headers: authHeader() });
  }

  update(id, data) {
    return http.put(`api/movies/${id}`, data,{ headers: authHeader() });
  }

  delete(id) {
    return http.delete(`api/movies/${id}`,{ headers: authHeader() });
  }

  listByCategory(id) {
    return http.get(`api/moviesByCategory/${id}`,{ headers: authHeader() });
  }
  getCategories(){
    return http.get('api/category',{ headers: authHeader() });
  }
  
}
export default new MovieDataService();