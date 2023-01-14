import http from "../http-common";

class AuthService {
  login(user) {
    return http
      .post('api/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.authorisation) {
          localStorage.setItem('user', JSON.stringify(response.data.authorisation));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return http.post('api/register', {
      name: user.name,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService();