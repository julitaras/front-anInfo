import axios from "axios";

const PATH = "https://squad14-2c-2021.herokuapp.com";

class ProjectService {
  static async getProjects() {
    try {
      const response = await axios.get(`${PATH}/projects`);
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  static async createProject(values) {
    try {
      const response = await axios.post(`${PATH}/projects`, {
        name: values.name,
        description: values.description,
        leader: values.leader,
        state: values.state,
        start_date: new Date(values.start_date),
        finish_date: new Date(values.finish_date),
        worked_hours: 0,
      });
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  static getProject(id) {
    return new Promise((resolve, reject) =>
      axios
        .get(`${PATH}/projects/${id}`)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  static editProject(values) {
    return new Promise((resolve, reject) =>
      axios
        .put(`${PATH}/projects/${values.id}`, {
          name: values.name,
          description: values.description,
          leader: values.leader,
          state: values.state,
          start_date: new Date(values.start_date),
          finish_date: new Date(values.finish_date),
          worked_hours: parseInt(values.worked_hours),
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  static async deleteProject(id) {
    try {
      const response = await axios.delete(`${PATH}/projects/${id}`);
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

export default ProjectService;
