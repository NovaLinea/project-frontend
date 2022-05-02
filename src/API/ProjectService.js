import $api from ".";

export default class ProjectService {
    static async createProject(userID, nameProject, descriptionProject, typeProject, priceProject, paymentSystem, listStaff) {
        if (typeProject === 'sale') {
            return $api.post(`/project/${userID}/create`, {name: nameProject, description: descriptionProject, price: Number(priceProject), type: typeProject, time: new Date().toISOString()})
        }
        else if (typeProject === 'donates') {
            return $api.post(`/project/${userID}/create`, {name: nameProject, description: descriptionProject, price: Number(priceProject), payment_system: paymentSystem, type: typeProject, time: new Date().toISOString()})
        }
        else {
            return $api.post(`/project/${userID}/create`, {name: nameProject, description: descriptionProject, staff: listStaff, type: typeProject, time: new Date().toISOString()})
        }
    }

    static async fetchProjects(userID) {
        return $api.get(`/project/${userID}/get-projects`)
    }

    static async likeProject(projectID, userID) {
        return $api.get(`/project/${projectID}/like/${userID}`)
    }

    static async dislikeProject(projectID, userID) {
        return $api.get(`/project/${projectID}/dislike/${userID}`)
    }

    static async favoriteProject(projectID, userID) {
        return $api.get(`/project/${projectID}/favorite/${userID}`)
    }

    static async removeFavoriteProject(projectID, userID) {
        return $api.get(`/project/${projectID}/remove-favorite/${userID}`)
    }
}
