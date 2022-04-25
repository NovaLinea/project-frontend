import $api from ".";

export default class AuthService {
    static async signup(name, email, password) {
        return $api.post('/signup', {name, email, password})
    }
    
    static async signin(email, password) {
        return $api.post('/signin', {email, password})
    }

    static async logout() {
        return $api.get('/logout')
    }
}
