import axios from 'axios';

export class ApiService {
  static async GetTasks() {
    let mappedData = [];
    // const response = await axios.get(uri).catch((e) => console.error(e));

    // if (response && response.data && response.data?.success) {
    //   const data = response.data.content;
    //   mappedData = data.map(({ id, description, completed }) => ({
    //     id,
    //     description,
    //     completed,
    //   }));
    // }
    return mappedData;
  }
}
