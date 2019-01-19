/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START functionsimport]
const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

console.log('admin db', db);

const fetch = require('node-fetch');
// [END functionsimport]
// [START additionalimports]
// Moments library to format dates.
const moment = require('moment');
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});

// [END additionalimports]

// [START all]
/**
 * Returns the server's date. You must provide a `format` URL query parameter or `format` vaue in
 * the request body with which we'll try to format the date.
 *
 * Format must follow the Node moment library. See: http://momentjs.com/
 *
 * Example format: "MMMM Do YYYY, h:mm:ss a".
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/date?format=MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' /
 *        -d '{"format": "MMMM Do YYYY, h:mm:ss a"}' /
 *        https://us-central1-<project-id>.cloudfunctions.net/date
 *
 * This endpoint supports CORS.
 */
// [START trigger]
//

const wait = ms =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, ms),
  );

// const discogsKeySet = [
//       {
//         key: "CHTgPJQvhItQQIGlwGDQ",
//         secret: "ycmSSHkasuEAGnarRUmhbsrukjKzShaN"
//       },
//       {
//         "key": "BiPbDvSGssdTxLAXeYJu",
//         "secret": "BpYmfEcPUCSjtwOPFjxqNFltgNABjZTi"
//       },
//       {
//         "key": "LfjHlFwIwMvshxAAfhbX",
//         "secret": "QwKwdaRLfOGxveGEQlXeBPkLuSneUOKj"
//       }
//     ];

const discogsKey = {
  key: 'CHTgPJQvhItQQIGlwGDQ',
  secret: 'ycmSSHkasuEAGnarRUmhbsrukjKzShaN',
};

const concatKey = ({key, secret}) => `&key=${key}&secret=${secret}`;

const generateKey = i => concatKey(discogsKeys[i % discogsKeys.length]);

const urlBasis = keys =>
  `https://api.discogs.com/users/anarcho123/collection/folders/0/releases?sort=added&sort_order=desc${keys}`;

// console.log('defaultData', defaultData);

// const wait = ms =>
//   new Promise(resolve =>
//     setTimeout(() => {
//       console.log('wait', ms);
//       resolve();
//     }, ms)
//   );

const recordFields = rec => {
  const {
    id,
    basic_information = {},
    date_added = null,
    artists = [],
    genres = [],
    country = null,
    styles = [],
    title = null,
    releases = [],
    images = [],
    thumb = null,
    uri = null,
  } = rec;

  return {
    id,
    artists,
    genres,
    dateAdded: date_added,
    country,
    styles,
    title,
    releases,
    images,
    thumb,
    uri,
    ...basic_information,
  };
};

exports.fetchRecordsFromDiscogs = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }

  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    const discogsPromise = fetch(urlBasis(concatKey(discogsKey)), {
      mode: 'cors',
    })
      .then(response => response.json())
      .then(result => {
        console.log('result', result);
        return result.releases.reduce((pacc, rec, i) => {
          return fetch(
            `${rec.basic_information.resource_url}?
            ${concatKey(discogsKey)}`,
            {mode: 'cors'},
          )
            .then(response => {
              return response.json();
            })
            .then(extRec => {
              const record = {...recordFields(extRec), ...rec};

              console.log('record ', rec);
              // return record;
              return db
                .collection('records')
                .doc(`${record.id}`)
                .set(record);
            })
            .then(() => wait(2000))
            .catch(e => console.log('err', e));
        }, Promise.resolve());
      });

    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    //
    discogsPromise
      .then(recordsResult => {
        console.log('promise discgos', recordsResult);
        return res.status(200).send('Record write Success ');
      })
      .catch(err => console.log('yeah', err));
    // [END sendResponse]
  });
});
// [END all]

exports.fetchRecords = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    db.collection('records')
      .get()
      .then(querySnapshot => querySnapshot.docs.map(d => d.data()))
      .then(records => {
        console.log('records', records);
        return res.status(200).send(records);
      })
      .catch(err => console.log('err', err));
  });
});
