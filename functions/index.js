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