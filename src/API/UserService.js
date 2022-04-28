import $api from ".";

export default class UserService {
    static async fetchData(userID) {
        return $api.get(`/user/${userID}/fetch-data`)
    }
}
