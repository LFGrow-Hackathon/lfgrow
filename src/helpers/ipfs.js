import { Moralis } from "moralis"
import { v4 as uuidv4 } from 'uuid';

async function uploadImageIpfs(fileToUpload) {
  console.log(fileToUpload);
  const file = new Moralis.File(fileToUpload.name, fileToUpload);
  await file.saveIPFS();
  console.log(file);

  const media = [{
    item: "ipfs://" + file._hash,
    type: fileToUpload.type
  }]
  console.log("media :", media);
  return media;
}

async function uploadMetadataIpfs({ message, media }) {
  const profileId = localStorage.getItem('profileId');
  const metadata_id = uuidv4();

  const object = JSON.stringify({
    version: "1.0.0",
    metadata_id,
    description: "A social network to connect web3 users and their communities.",
    content: message,
    external_url: "https://zilly.social",
    name: "Zilly",
    attributes: [],
    media,
    appId: "zilly"
  });

  console.log(object);

  const encodedFile = { base64: btoa(object) }
  const file = new Moralis.File(`publication-${profileId}-${metadata_id}.json`, encodedFile);

  try {
    await file.saveIPFS();

    return file._hash;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export { uploadImageIpfs, uploadMetadataIpfs };