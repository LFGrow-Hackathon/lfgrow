import { Moralis } from "moralis";
import { v4 as uuidv4 } from "uuid";

async function uploadImageIpfs(fileToUpload) {
  const file = new Moralis.File(fileToUpload.name, fileToUpload);
  await file.saveIPFS();

  return [{
    item: "https://gateway.moralisipfs.com/ipfs/" + file._hash,
    type: fileToUpload.type
  }];
}

async function uploadMetadataIpfs({ message, media }) {
  const profileId = localStorage.getItem("profileId");
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

  const encodedFile = { base64: btoa(object) };
  const file = new Moralis.File(`publication-${profileId}-${metadata_id}.json`, encodedFile);

  await file.saveIPFS();

  return file._hash;
}

export { uploadImageIpfs, uploadMetadataIpfs };