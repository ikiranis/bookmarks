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
import store from '../store'

// Uploading Files
let uploadFiles = {
    finishedUploads: 0,                     // Πόσα uploads αρχείων έχουν ολοκληρωθεί
    filesUploadedCount: 0,                  // Σύνολο των αρχείων που έχουν επιλεχθεί για ανέβασμα
    percent_done: [],                       // Το ποσοστό που έχει ανέβει από κάθε αρχείο
    reader: [],                             // To fileReader object για κάθε αρχείο
    theFile: [],                            // Το κάθε αρχείο
    slice_size: 700 * 1024,                // Το μέγεθος του slice
    filesInputElement: '#files',            // Το input element που παίρνει τα αρχεία
    user_id: '',                             // User Id
    files: [],

    /**
     * Εκκίνηση του uploading
     *
     */
    startUpload: function (user_id) {
        // To imput element που περιέχει τα επιλεγμένα αρχεία
        let files = document.querySelector(this.filesInputElement).files;
        this.user_id = user_id;

        // TODO display progress
        // clearResultsContainer();
        // displayResultsIcon();
        // ProgressAnimation.init(true);
        // ProgressAnimation.setProgressPercent(0);

        this.finishedUploads = 0;
        this.filesUploadedCount = files.length;

        this.percent_done = [];
        this.reader = [];
        this.theFile = [];

        for (let i = 0; i < this.filesUploadedCount; i++) {
            this.reader.push(new FileReader());
            this.theFile.push(files[i]);

            this.uploadSliceOfFile(0, i);
        }

    },

    /**
     * Display Folder Errors
     */
    displayFolderErrors: function () {
        let errorString = '';

        // TODO dynamic texts
        // TODO check errors
        /*
                if (problematicPaths.coverAlbumsFolder !== 0) {
                    errorString += 'Problem with Cover Albums Folder. ';
                }
                if (problematicPaths.musicDownloadPath !== 0) {
                    errorString += 'Problem with Music Download Folder. ';
                }
                if (problematicPaths.musicVideoDownloadPath !== 0) {
                    errorString += 'Problem with Music Video Download Folder. ';
                }

                DisplayMessage('.alert_error', errorString, 'danger');
        */
    },

    /**
     * Αρχίζει το ανέβασμα κομματιού του αρχείου
     *
     * @param start {int} Το σημείο που βρίσκεται το slice
     * @param i {int} Counter
     */
    uploadSliceOfFile: function (start, i) {
        let next_slice = start + this.slice_size + 1;
        let blob = this.theFile[i].slice(start, next_slice);

        this.reader[i].onloadend = function (event) {
            if (event.target.readyState !== FileReader.DONE) {
                return;
            }

            let args = {
                user_id: this.user_id,
                file: this.theFile[i].name,
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
                        this.uploadSliceOfFile(next_slice, i);
                    } else {
                        this.insertFileToDatabase(response);
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });

        }.bind(this); // Περνάει το this για να μπορεί να το δει μέσα στο callback

        this.reader[i].readAsDataURL(blob);

    },

    /**
     * Εισαγωγή του τελικού αρχείου στην βάση
     *
     * @param data {object} Τα data που επέστρεψε το ajax call
     */
    insertFileToDatabase: function (data) {
        let args = {
            user_id: this.user_id,
            fullPathFilename: data.fullPathFilename,
            fileName: data.fileName,
            uploadKind: 'finalizedFile'
        };

        api.uploadFile(args)
            .then(response => {
                this.finishedUploads++;

                if (response.success === true) {
                    // console.log('File uploaded to path ' + response.path + ' with id ' + response.file_id);
                    this.files.push({
                        id: response.file_id,
                        name: response.filename
                    });
                    store.commit('setFiles', this.files);
                } else {
                    console.log('Problem with file ' + response.filename);
                }

                this.checkUploadTermination(); // Έλεγχος και τερματισμός της διαδικασίας του uploading
            })
            .catch(error => {
                console.log(error);
            });
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

        // console.log(theTotal);
    },

    /**
     * Έλεγχος και τερματισμός της διαδικασίας του uploading
     */
    checkUploadTermination: function () {
        if (this.finishedUploads === this.filesUploadedCount) {
            console.log(this.filesUploadedCount + ' files uploaded');
        }
    }

};

export default uploadFiles;