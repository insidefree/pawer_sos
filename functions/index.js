const functions = require('firebase-functions')
const fetch = require('node-fetch')
const admin = require('firebase-admin')
const cors = require("cors")
const express = require("express")
// const { fileUpload, uploadImageToStorage } = require("./utils")

admin.initializeApp(functions.config().firebase)

//send the push notification 
exports.sendPushNotification = functions.database.ref('acidents/{id}').onCreate(event => {

    const root = event.data.ref.root
    var messages = []

    //return the main promise 
    return root.child('/usersac').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            var expoToken = childSnapshot.val().expoToken

            if (expoToken) {
                messages.push({
                    "to": expoToken,
                    "sound": "default",
                    "body": "New Note Added"
                })
            }

        })
        //firebase.database then() respved a single promise that resolves
        //once all the messages have been resolved 
        return Promise.all(messages)
    })
        .then(messages => {
            // console.log(messages)
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages)
            })
        })
        .catch(reason => {
            console.log(reason)
        })
})

// const api = express().use(cors({ origin: true }));
// fileUpload("/picture", api);
// api.post("/picture", function (req, response, next) {
//     uploadImageToStorage(req.files.file[0])
//     .then(metadata => {
//         response.status(200).json(metadata[0]);
//         next();
//     })
//     .catch(error => {
//         console.error(error);
//         response.status(500).json({ error });
//         next();
//     });
// });

// exports.api = functions.https.onRequest(api)

/* Express */
// const app1 = express()
// app1.get("*", (request, response) => {
//     response.send("Hello from Express on Firebase!")
// })

// const api1 = functions.https.onRequest(app1)

// module.exports = {
//     api1
// }

/* Express with CORS */
/* const app2 = express()
const URL = require('blob-util')
app2.use(cors({ origin: true }))
app2.get("*", (request, response) => {
    response.send("Hello from Express on Firebase with CORS!")
    console.log('--api2--')
    fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
            // Here's where you get access to the blob
            // And you can use it for whatever you want
            // Like calling ref().put(blob)

            // Here, I use it to make an image appear on the page
            let objectURL = URL.createObjectURL(blob);
            // let myImage = new Image();
            // myImage.src = objectURL;
            console.log('objectURL', objectURL)
        })
        .catch(error => console.log('fetch error', error))
})
exports.api2 = functions.https.onRequest(app2)
 */

/* Express with CORS & automatic trailing '/' solution */
// const app3 = express()
// app3.use(cors({ origin: true }))
// app3.get("*", (request, response) => {
//   response.send(
//     "Hello from Express on Firebase with CORS! No trailing '/' required!"
//   )
// })

// not as clean, but a better endpoint to consume
// const api3 = functions.https.onRequest((request, response) => {
//   if (!request.path) {
//     request.url = `/${request.url}` // prepend '/' to keep query params if any
//   }
//   return app3(request, response)
// })

// module.exports = {
//   api3
// }

const app = express()
const googleStorage = require('@google-cloud/storage')
const Multer = require('multer')

const storage = googleStorage({
    projectId: 'anish-6cd8e',
    keyFilename: './config/fb_json.json'
});

const bucket = storage.bucket('anish-6cd8e.appspot.com')

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 10 * 2048 * 2048 // no larger than 5mb, you can change as needed.
    }
})

/**
 * Adding new file to the storage
 */
const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.post('/upload', (req, res) => {
    console.log('Upload Image', req)
    if (!req.file)
        return res.status(400).send('No files were uploaded.');
    console.log('Upload Image 2')
    // let file = req.file;
    let file = req.file.sampleFile;
    console.log('Upload Image 3')
    if (file) {
        console.log('--file.originalname', file.originalname)
        uploadImageToStorage(file).then((success) => {
            res.status(200).send({
                status: 'success'
            });
        }).catch((error) => {
            console.error(error);
        });
    }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
    let prom = new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://storage.googleapis.com/${bucket.name}/photos/${fileUpload.name}`);
            resolve(url);
        });

        blobStream.end(file.buffer);
    });
    return prom;
}

exports.app = functions.https.onRequest(app)