const { create, Client, decryptMedia } = require('@open-wa/wa-automate');
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');

function start(client) {
  client.onMessage(async message => {
    if (message.mimetype) {
      const dir=`./temp`;
      const filename = `${message.type}.${mime.extension(message.mimetype)}`;
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`;
      console.log(`${message.from}'tarafından gönderilen bir ${message.type} kaydedildi.`);
      // Mesaj kaydetme 
      fs.writeFile(filename, mediaData,)
      fs.mkdir('tempory');

      if(message.type==='image') {
        client.sendImageAsSticker(message.from,imageBase64,)
        console.log(`Görsel sticker olarak ${message.from}'a gönderildi.`)
      };

      if(message.type==='video') {
        const mp4_as_sticker = await client.sendMp4AsSticker(message.from,mediaData);
        console.log(`Video sticker olarak ${message.from}'a gönderildi.`)
    }
      ;
    }
  });
}

create({
  headless: true
}).then(client => start(client));
