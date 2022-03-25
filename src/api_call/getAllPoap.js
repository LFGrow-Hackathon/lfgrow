import axios from "axios";

/* ------------------------------- 
Get every poap from a given address
---------------------------------*/
async function queryPoap(address) {
  try {
    const response = await axios.get(`https://api.poap.xyz/actions/scan/${address}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllPoap(address) {
  try {
    const data = await queryPoap(address);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default getAllPoap;