const functions = require('firebase-functions')
const fetch = require('node-fetch')
const admin = require('firebase-admin')
const cors = require("cors")
const express = require("express")
const { fileUpload, uploadImageToStorage } = require("./utils")

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

// upload images
// const api = express().use(cors({ origin: true }));
// fileUpload("/picture", api);

// api.post("/picture", function (req, response, next) {
//     uploadImageToStorage(req.files.file[0])
//         .then(metadata => {
//             response.status(200).json(metadata[0]);
//             next();
//         })
//         .catch(error => {
//             console.error(error);
//             response.status(500).json({ error });
//             next();
//         });
// });

// api.get("*", (request, response) => {
//     response.send("Hello from Express on Firebase with CORS!")
// })

// exports.api = functions.https.onRequest(api)

const app = express()

// default options

app.post('/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    console.log('--sampleFile', sampleFile)
})

app.get("*", (request, response) => {
    response.send("Hello from Express on Firebase!")
})

// app.listen(3000, () => { })
var os = require("os");
console.log(os.hostname())


exports.app = functions.https.onRequest(app)


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
const app2 = express()
app2.use(cors({ origin: true }))
app2.get("*", (request, response) => {
    response.send("Hello from Express on Firebase with CORS!")
})

const api2 = functions.https.onRequest(app2)

module.exports = {
    api2
}

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