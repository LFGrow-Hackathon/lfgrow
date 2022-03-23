import { Moralis } from "moralis"
import { v4 as uuidv4 } from 'uuid';

async function uploadIpfs({ message }) {
  const profileId = localStorage.getItem('profileId');
  const metadata_id = uuidv4();

  const object = JSON.stringify({
    version: "1.0.0",
    metadata_id,
    description: "A social network to connect web3 users and their communities.",
    content: message,
    external_url: "https://zilly.social",
    image: null,
    imageMimeType: null,
    name: "Zilly",
    attributes: [],
    appId: "zilly"
  });

  console.log(object);

  const encodedFile = { base64: btoa(object) }
  const file = new Moralis.File(`publication-${profileId}-${metadata_id}.json`, encodedFile);

  try {
    const result = await file.saveIPFS();

    return result._hash;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export { uploadIpfs };