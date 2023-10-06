const axios = require('axios');
const fs = require('fs');

async function downloadAndSaveOggFile(downloadUrl, filePath) {
    try {
        const response = await axios.get(downloadUrl, { responseType: 'stream' });

        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    downloadAndSaveOggFile
};

