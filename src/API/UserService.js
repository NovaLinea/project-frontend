import $api from ".";

export default class UserService {
    static async fetchDataProfile(userID) {
        return $api.get(`/user/${userID}/fetch-data-profile`)
    }

    static async fetchDataSettings(userID) {
        return $api.get(`/user/${userID}/fetch-data-settings`)
    }

    static async saveData(userID, name, email, description) {
        return $api.post(`/user/${userID}/save-data`, {name: name, email: email, description: description})
    }

    static async changePassword(userID, oldPassword, newPassword) {
        return $api.post(`/user/${userID}/change-password`, {old_password: oldPassword, new_password: newPassword})
    }

    static async deleteAccount(userID) {
        return $api.get(`/user/${userID}/delete-account`)
    }
}
