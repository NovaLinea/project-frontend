import $api from ".";

export default class ProjectService {
    static async createProject(userID, nameProject, descriptionProject, typeProject, priceProject, countStaff, paymentSystem, descriptionStaff) {
        if (typeProject === 'sale') {
            return $api.post(`/project/${userID}/create`, {name: nameProject, description: descriptionProject, price: Number(priceProject), type: typeProject, time: new Date().toISOString()})
        }
        else if (typeProject === 'donates') {
            return $api.post(`/project/${userID}/create`, {name: nameProject, description: descriptionProject, price: Number(priceProject), payment_system: paymentSystem, type: typeProject, time: new Date().toISOString()})
        }
        else {
            return $api.post(`/project/${userID}/create`, {name: nameProject, description: descriptionProject, count_staff: Number(countStaff), staff: descriptionStaff, type: typeProject, time: new Date().toISOString()})
        }
    }
}
