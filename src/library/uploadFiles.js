/**
 *
 * File: _uploadFiles.js
 * Created by Yiannis Kiranis <rocean74@gmail.com>
 * http://www.apps4net.eu
 * Date: 08/09/17
 * Time: 16:50
 *
 * Uploading Files
 *
 * @reference https://deliciousbrains.com/using-javascript-file-api-to-avoid-file-upload-limits/
 *
 */

import api from '../api';
import store from '../store';
import cryptoJS from 'crypto-js';

// Uploading Files
let uploadFiles = {
    finishedUploads: 0,                     // Πόσα uploads αρχείων έχουν ολοκληρωθεί
    filesUploadedCount: 0,                  // Σύνολο των αρχείων που έχουν επιλεχθεί για ανέβασμα
    percent_done: [],                       // Το ποσοστό που έχει ανέβει από κάθε αρχείο
    reader: [],                             // To fileReader object για κάθε αρχείο
    theFile: [],                            // Το κάθε αρχείο
    slice_size: 700 * 1024,                 // Το μέγεθος του slice
    filesInputElement: '',                  // Το input element που παίρνει τα αρχεία
    user_id: '',                            // User Id
    files: [],                              // array with the uploaded files
    rejectedFiles: [],                      // array of rejected files
    successFileCallback: null,              // callback function to run after any uploaded file
    failFileCallback: null,                 // callback function to run after any fail on uploading the file
    handleError: null,                      // callback function to handle/display every error
    fileLimit: 3000000,                     // File limit in bytes

    /**
     * Start the uploading
     *
     * @param user_id
     * @param inputElement
     * @param successFileCallback
     * @param failFileCallback
     * @param handleError
     */
    startUpload: function (user_id, inputElement, successFileCallback, failFileCallback, handleError, fileLimit) {
        // Init values
        this.filesInputElement = inputElement;
        this.user_id = user_id;
        this.rejectedFiles = [];
        this.percent_done = [];
        this.reader = [];
        this.theFile = [];
        this.files = [];
        this.successFileCallback = successFileCallback;
        this.failFileCallback = failFileCallback;
        this.handleError = handleError;
        this.fileLimit = fileLimit;

        // To imput element που περιέχει τα επιλεγμένα αρχεία
        let filesArray = Array.from(document.querySelector(this.filesInputElement).files);

        this.finishedUploads = 0;
        this.filesUploadedCount = filesArray.length;

        // Check for sizes and remove files above limit
        for (let i = 0; i < this.filesUploadedCount; i++) {
            if(filesArray[i].size > this.fileLimit) {
                this.rejectedFiles.push(filesArray[i]);
                filesArray.splice(i, 1);
                this.filesUploadedCount--;
                i--;
            }
            store.commit('setRejectedFiles', this.rejectedFiles);
        }

        // Start upload one by one
        for (let i = 0; i < this.filesUploadedCount; i++) {
            this.reader.push(new FileReader());
            this.theFile.push(filesArray[i]);

            let fileName = Math.round(+new Date()/1000).toString() + '_' + filesArray[i].name; // add unix timestamp
            this.uploadSliceOfFile(0, i, fileName);

        }

    },

    /**
     * get md5 hash of a file
     *
     * @param i
     */
    getFileMD5Hash(i) {

        return new Promise((resolve, reject) => {
            let file = this.theFile[i];

            this.reader[i].onloadend = function(event) {
                if (event.target.readyState !== FileReader.DONE) {
                    reject('error');
                }

                resolve(cryptoJS.MD5(cryptoJS.enc.Latin1.parse(event.target.result)).toString(cryptoJS.enc.Hex));
            };

            this.reader[i].readAsBinaryString(file);
        });

    },

    /**
     * Αρχίζει το ανέβασμα κομματιού του αρχείου
     *
     * @param start {int} Το σημείο που βρίσκεται το slice
     * @param i {int} Counter
     * @param fileName
     */
    uploadSliceOfFile: function (start, i, fileName) {
        let next_slice = start + this.slice_size + 1;
        let blob = this.theFile[i].slice(start, next_slice);

        this.reader[i].onloadend = function (event) {
            if (event.target.readyState !== FileReader.DONE) {
                return;
            }

            let args = {
                user_id: this.user_id,
                file: fileName,
                uploadKind: 'slice',
                file_data: event.target.result
            };

            api.uploadFile(args)
                .then(response => {
                    let size_done = start + this.slice_size;
                    this.percent_done[i] = parseInt(((size_done / this.theFile[i].size) * 100).toFixed(0));

                    // Fix για τα mp3 που για κάποιο λόγο ανεβάζουν πάνω από το 100%
                    if (this.percent_done[i] > 100) {
                        this.percent_done[i] = 100;
                    }

                    if (next_slice < this.theFile[i].size) {
                        // Update upload progress
                        this.showFileUploadProgress();

                        // More to upload, call function recursively
                        this.uploadSliceOfFile(next_slice, i, fileName);
                    } else {
                        this.insertFileToDatabase(response, i);
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }.bind(this); // Περνάει το this για να μπορεί να το δει μέσα στο callback

        this.reader[i].readAsDataURL(blob);

    },

    /**
     * Εισαγωγή του τελικού αρχείου στην βάση
     *
     * @param data {object} Τα data που επέστρεψε το ajax call
     */
    async insertFileToDatabase(data, i) {

        let md5hash = null;

        let args = {
            user_id: this.user_id,
            fullPathFilename: data.fullPathFilename,
            fileName: data.fileName,
            uploadKind: 'finalizedFile'
        };

        try {
            md5hash = await this.getFileMD5Hash(i);
        } catch (error) {
            console.log(error);
        }

        try {
            let response = await api.uploadFile(args);

            this.finishedUploads++;

            if (response.success === true) {
                // console.log('local md5: ' + md5hash + ' remote md5: ' + response.md5hash);

                let fileAdded = {
                    id: null,
                    name: response.filename,
                    path: response.path,
                    user_id: this.user_id
                };

                if (md5hash === response.md5hash) { // if files match, add file to files
                    try {
                        // Run callback function to do something with uploaded file. Store or anything else
                        let response = await this.successFileCallback(fileAdded);

                        if(response.file_id !== null) {
                            fileAdded.id = response.file_id;
                        }

                        this.files.push(fileAdded);
                        store.commit('setFiles', this.files);
                    } catch(error) {
                        this.handleError(error);
                    }

                } else { // if files don't match add it to rejected files
                    try {
                        await this.failFileCallback(fileAdded);

                        this.rejectedFiles.push(fileAdded);
                        store.commit('setRejectedFiles', this.rejectedFiles);
                    } catch(error) {
                        this.handleError(error.response.data.message);
                    }
                }

            } else {
                this.handleError('Problem with file ' + response.filename);
            }

            this.checkUploadTermination(); // Έλεγχος και τερματισμός της διαδικασίας του uploading
        } catch(error) {
            this.handleError(error.response);
        }

    },

    /**
     * Εμφανίζει το ποσοστό uploading του τρέχοντος αρχείου σε σχέση και με το συνολικό ποσοστό όλων των αρχείων
     */
    showFileUploadProgress: function () {
        let percentSummary = 0;
        for (let i = 0; i < this.percent_done.length; i++) {
            percentSummary = percentSummary + this.percent_done[i];
        }
        // Το συνολικό ποσοστό όλων των αρχείων
        let totalPercent = parseInt(this.filesUploadedCount * 100);
        // Προστίθεται το τρέχον ποσοστό, στο συνολικό
        let theTotal = ((percentSummary / totalPercent) * 100).toFixed(0);

        store.commit('setProgress', theTotal);
    },

    /**
     * Έλεγχος και τερματισμός της διαδικασίας του uploading
     */
    checkUploadTermination: function () {
        if (this.finishedUploads === this.filesUploadedCount) {
            store.commit('setProgress', 0);
        }
    }

};

export default uploadFiles;