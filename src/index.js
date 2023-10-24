const {BlobServiceClient} = require("@azure/storage-blob");
require('dotenv').config()
const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");
    const containerName = "sample";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const content = "Hello world!";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));