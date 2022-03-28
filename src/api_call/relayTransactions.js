import axios from "axios";

const mainAxios = axios.create({
  baseURL: "http://localhost:8080",
});

// Example of a Post request. When you send a data object you will receive a
// body object in Express
async function relaySetDispatcher(body) {
  try {
    const response = await mainAxios({
      method: "post",
      url: "/api/set-dispatcher",
      data: body,
    });

    console.log(response.data)
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

async function relayTransactions(params) {
  try {
    const response = await mainAxios(params);

    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.message.data);
  }
}

async function relayUpdateProfilePicture(body) {
  try {
    const response = await mainAxios({
      method: "post",
      url: "/api/update-picture",
      data: body,
    });

    console.log(response.data)
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}
export { relaySetDispatcher, relayUpdateProfilePicture, relayTransactions };