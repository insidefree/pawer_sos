const functions = require('firebase-functions')
const fetch = require('node-fetch')
const admin = require('firebase-admin')
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

const os = require("os");
const path = require("path");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");

const gcconfig = {
    projectId: 'anish-6cd8e',
    keyFilename: './config/fb_json.json'
}

const gcs = require("@google-cloud/storage")(gcconfig);

exports.uploadFile = functions.https.onRequest((req, res) => {
    if (req.method === "POST") {
        const busboy = new Busboy({ headers: req.headers });
        let uploadData = null;

        busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            uploadData = { file: filepath, type: mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });

        busboy.on("finish", () => {
            const bucket = gcs.bucket('anish-6cd8e.appspot.com/photos');
            bucket
                .upload(uploadData.file, {
                    uploadType: "media",
                    metadata: {
                        metadata: {
                            contentType: uploadData.type
                        }
                    }
                })
                .then(() => {
                    res.status(200).json({
                        message: "It worked!"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
        busboy.end(req.rawBody);
    } else {
        return res.status(500).json({
            message: "Not allowed"
        });
    }
});

exports.uploadFileTest = functions.https.onRequest((req, res) => {
    if (req.method === 'POST') {
        const busboy = new Busboy({ headers: req.headers });
        // This object will accumulate all the uploaded files, keyed by their name.
        const uploads = {}
        const tmpdir = os.tmpdir();

        // This callback will be invoked for each file uploaded.
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            // Note that os.tmpdir() is an in-memory file system, so should
            // only be used for files small enough to fit in memory.
            const filepath = path.join(tmpdir, filename)
            uploads[fieldname] = filepath;
            file.pipe(fs.createWriteStream(filepath));
        });

        // This callback will be invoked after all uploaded files are saved.
        busboy.on('finish', () => {
            const bucket = gcs.bucket('anish-6cd8e.appspot.com');

            // *** Process uploaded files here ***
            for (const name in uploads) {
                const file = uploads[name];
                console.log('--file', file)
                // fs.unlinkSync(file);

                bucket
                    .upload(file, {
                        uploadType: "media",
                        // metadata: {
                        //     metadata: {
                        //         contentType: mimetype
                        //     }
                        // }
                    })
                    .then(() => {
                        res.status(200).json({
                            message: "It worked!"
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
            // res.end();
        });

        // The raw bytes of the upload will be in req.rawBody. Send it to
        // busboy, and get a callback when it's finished.
        busboy.end(req.rawBody);
    } else {
        // Client error - only support POST.
        res.status(405).end();
    }
})

exports.postTest = functions.https.onRequest((req, res) => {
    // if (req.method === 'POST') {
    //     console.log('true')
    // } else {
    //     console.log('false')
    // }
    if (req.method !== "POST") {
        return res.status(500).json({
            message: "Not allowed"
        });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        const filepath = path.join(os.tmpdir(), filename);
        uploadData = { file: filepath, type: mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
        const bucket = gcs.bucket("anish-6cd8e.appspot.com/photos");
        bucket
            .upload(uploadData.file, {
                uploadType: "media",
                metadata: {
                    metadata: {
                        contentType: uploadData.type
                    }
                }
            })
            .then(() => {
                res.status(200).json({
                    message: "It worked!"
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });
    busboy.end(req.rawBody);
})