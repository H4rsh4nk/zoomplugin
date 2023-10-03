"use client";
import React from "react";
import p5 from "p5";
import ml5 from "ml5";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    Sketch = (p) => {
        let video;
        let classifier;
        let questionFade = 0;
        let label = "";

        p.setup = () => {
            p.createCanvas(640, 480); // Set canvas size

            // Create a p5.js video element from the user's webcam
            video = p.createCapture(p.VIDEO);
            video.size(640, 480);
            video.hide(); // Hide the video element on the page

            // Load the machine learning model and create the classifier
            const imageModelURL =
                "https://teachablemachine.withgoogle.com/models/rvCC0B1UD/";
            classifier = ml5.imageClassifier(
                imageModelURL + "model.json",
                () => {
                    // Classifier is ready, start classifying
                    classifyVideo();
                }
            );
        };

        p.draw = () => {
            // Draw the video feed onto the canvas
            p.image(video, 0, 0, 640, 480);

            // Draw the label
            p.fill(255);
            p.textSize(16);
            p.textAlign(p.CENTER);
            p.text(label, p.width / 2, p.height - 4);

            // Display sample text when the label is 'Question'
            if (label === "Question") {
                questionFade = 500;
                p.fill(255, questionFade);
                p.textSize(48);
                p.text("Quetion ?", p.width / 2, p.height / 2);
                questionFade -= 10;
            }
        };

        // Get a prediction for the current video frame
        function classifyVideo() {
            classifier.classify(video, gotResult);
        }

        // When we get a result
        function gotResult(error, results) {
            // If there is an error
            if (error) {
                console.error(error);
                return;
            }
            // The results are in an array ordered by confidence.
            label = results[0].label;
            // Classify again!
            classifyVideo();
        }
    };

    componentDidMount() {
        this.myP5 = new p5(this.Sketch, this.myRef.current);
    }

    render() {
        return <div ref={this.myRef}></div>;
    }
}

export default App;
