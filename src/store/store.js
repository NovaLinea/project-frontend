import {makeAutoObservable} from "mobx";
import axios from "axios";
import { API_URL } from "../API";
import AuthService from "../API/AuthService";

export default class Store {
    isAuth = false;
    isLoading = false;
    isError = null;
    isUserID = null;
    timeout = 5000;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setError(error) {
        this.isError = error;
    }

    setUserID(userID) {
        this.isUserID = userID;
    }

    async signup(name, email, password) {
        try {
            const response = await AuthService.signup(name, email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUserID(response.data.userID);
            this.setAuth(true);
        } catch (e) {
            this.setError(e.response?.data?.message);
            setTimeout(() => {
                this.setError(null)
            }, this.timeout)
        }
    }

    async signin(email, password) {
        try {
            const response = await AuthService.signin(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUserID(response.data.userID);
            this.setAuth(true);
        } catch (e) {
            this.setError(e.response?.data?.message);
            setTimeout(() => {
                this.setError(null);
            }, this.timeout)
            return e.response?.data?.message;
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUserID(null);
        } catch (e) {
            this.setError(e.response?.data?.message);
            setTimeout(() => {
                this.setError(null)
            }, this.timeout)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setUserID(response.data.userID);
            this.setAuth(true);
        } catch (e) {
            this.setError(e.response?.data?.message);
            setTimeout(() => {
                this.setError(null)
            }, this.timeout)
        } finally {
            this.setLoading(false);
        }
    }
}
