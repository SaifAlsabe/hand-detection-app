navigator.getUserMedia = navigator.getUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.webKitGetUserMedia ||
    navigator.msGetUserMedia;


const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let model;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});

handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.getUserMedia({ video: {} }, stream => {
            video.srcObject = stream;
            runDetection();
        },
            err => console.log(error)
        )
    }
});

function runDetection() {
    model.detect(video).then(predictions => {
        console.log(predictions);
        model.renderPredictions(predictions, canvas, context, video);
        requestAnimationFrame(runDetection);
    });
}


