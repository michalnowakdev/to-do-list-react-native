import axios from 'axios';

const uri = 'http://localhost:4000/tasks';

export class ApiService {
  static async GetTasks() {
    let mappedData = [];
    const response = await axios.get(uri).catch((e) => console.error(e));

    if (response && response.data) {
      mappedData = response.data.map(({ _id, description, completed }) => ({
        id: _id,
        description,
        completed,
      }));
    }
    return mappedData;
  }

  static async CreateTask(description) {
    const response = await axios
      .post(uri, {
        description,
        completed: false,
      })
      .catch((e) => console.error(e));

    if (response && response.data) {
      return true;
    }
    return false;
  }

  static async UpdateTask(task) {
    const response = await axios
      .put(`${uri}/${task.id}`, {
        description: task.description,
        completed: task.completed,
      })
      .catch((e) => console.error(e));

    if (response && response.data) {
      return true;
    }
    return false;
  }

  static async BulkDelete() {
    const response = await axios.delete(uri).catch((e) => console.error(e));

    if (response && response.data) {
      return true;
    }
    return false;
  }
}
