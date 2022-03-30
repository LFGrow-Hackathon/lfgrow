import axios from "axios";

const mainAxios = axios.create({
  baseURL: "https://dispatcher.zilly.social/",
});

async function relayTransactions(params) {
  try {
    const response = await mainAxios(params);

    console.log('relay response =>',response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message.data);
  }
}

export { relayTransactions };
