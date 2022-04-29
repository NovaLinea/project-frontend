import $api from ".";

export default class UserService {
    static async fetchData(userID) {
        return $api.get(`/user/${userID}/fetch-data`)
    }

    static async saveData(userID, dataUser) {
        return $api.post(`/user/${userID}/save-data`, {name: dataUser.name, email: dataUser.email, description: dataUser.description, phone: dataUser.phone})
    }
}
