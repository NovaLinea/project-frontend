import $api from ".";

export default class AuthService {
    static async signup(name, email, password) {
        return $api.post('/auth/signup', {name, email, password})
    }
    
    static async signin(email, password) {
        return $api.post('/auth/signin', {email, password})
    }

    static async logout() {
        return $api.get('/auth/logout')
    }
}
