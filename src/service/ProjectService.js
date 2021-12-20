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

  async getProjects() {
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
        members: values.members.map((member) => member.value.toString()),
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
          members:
            values.members != []
              ? values.members.map((member) => member.value.toString())
              : [],
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

  static async getTasksByProjectId(id) {
    return new Promise((resolve, reject) =>
      axios
        .get(`${PATH}/tasks?project_id=${id}`)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  static async updateTaskStatus(task) {
    return new Promise((resolve, reject) =>
      axios
        .put(`${PATH}/tasks/${task.id}`, { state: task.state })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  static async createTask(values) {
    try {
      const response = await axios.post(`${PATH}/tasks`, {
        name: values.name,
        description: values.description,
        project_id: values.project_id,
        state: values.state,
        start_date: new Date(values.start_date),
        worked_hours: parseInt(values.worked_hours),
        estimated_hours: parseInt(values.estimated_hours),
        assigned_to: values.assigned_to,
      });
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async createTask(values) {
    try {
      const response = await axios.post(`${PATH}/tasks`, {
        name: values.name,
        description: values.description,
        project_id: values.project_id,
        state: values.state,
        start_date: new Date(values.start_date),
        worked_hours: parseInt(values.worked_hours),
        estimated_hours: parseInt(values.estimated_hours),
        assigned_to: values.assigned_to,
      });
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  static async getTasks() {
    return new Promise((resolve, reject) =>
      axios
        .get(`${PATH}/tasks`)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  async getTasks() {
    return new Promise((resolve, reject) =>
      axios
        .get(`${PATH}/tasks`)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  static editTask(values) {
    return new Promise((resolve, reject) =>
      axios
        .put(`${PATH}/tasks/${values.id}`, {
          name: values.name,
          description: values.description,
          project_id: values.project_id,
          state: values.state,
          start_date: new Date(values.start_date),
          worked_hours: parseInt(values.worked_hours),
          estimated_hours: parseInt(values.estimated_hours),
          assigned_to: values.assigned_to,
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    );
  }

  static async deleteTask(id) {
    try {
      const response = await axios.delete(`${PATH}/tasks/${id}`);
      return response;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

export default ProjectService;
