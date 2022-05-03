import $api from ".";

export default class UserService {
    static async fetchDataProfile(userID) {
        return $api.get(`/user/${userID}/fetch-data-profile`)
    }

    static async fetchDataSettings(userID) {
        return $api.get(`/user/${userID}/fetch-data-settings`)
    }

    static async saveData(userID, name, email, description, ntfsNewMsg, ntfsNewSubs, ntfsNewComment, ntfsUpdate, ntfsEmail) {
        return $api.post(`/user/${userID}/save-data`, {name: name, email: email, description: description, notifications: {new_message: ntfsNewMsg, new_sub: ntfsNewSubs, new_comment: ntfsNewComment, update: ntfsUpdate, email_notification: ntfsEmail}})
    }

    static async changePassword(userID, oldPassword, newPassword) {
        return $api.post(`/user/${userID}/change-password`, {old_password: oldPassword, new_password: newPassword})
    }

    static async deleteAccount(userID) {
        return $api.get(`/user/${userID}/delete-account`)
    }

    static async fetchLikesFavorites(userID) {
        return $api.get(`/user/${userID}/get-likes-favorites`)
    }

    static async fetchDataParams(userID) {
        return $api.get(`/user/${userID}/get-data-params`)
    }

    static async fetchListFollowings(userID) {
        return $api.get(`/user/${userID}/get-list-followings`)
    }

    static async subscribeUser(userID, accountID) {
        return $api.get(`/user/${userID}/subscribe/${accountID}`)
    }

    static async unsubscribeUser(userID, accountID) {
        return $api.get(`/user/${userID}/unsubscribe/${accountID}`)
    }

    static async fetchFollows(userID) {
        return $api.get(`/user/${userID}/get-follows`)
    }

    static async fetchFollowings(userID) {
        return $api.get(`/user/${userID}/get-followings`)
    }
}
