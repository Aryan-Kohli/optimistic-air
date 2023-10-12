import "regenerator-runtime";
import * as faceapi from "face-api.js";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../css/Testpage.css";
import { Link, Navigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import allquestion from "../questions.js";
function Testpage(props) {
  if (props.login == false) {
    return <Navigate to="/login" replace={true} />;
  }
  const [textToCopy, setTextToCopy] = useState();
  const [lang, Setlang] = useState("");
  const [current_question, setQuestion] = useState("Question will appear here");
  const [question_no, setQuestionno] = useState(0);
  const [test_started, setTestStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState("");
  const [live, setlive] = useState("");
  //video states
  const videoRef = useRef();
  const canvasRef = useRef();
  const [intervalId, setIntervalId] = useState(null);

  //timer ka code hai bhai
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let timerInterval;

    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);
  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSeconds(0);
  };
  //timer code khtm mere bhai

  // video portion

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);
  // OPEN YOU FACE WEBCAM
  const startVideo = () => {
    // if (stop === false) return;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        // if (!currentStream) return;
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
        // return "fdj";
      });
  };
  // LOAD MODELS FROM FACE API

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");

    faceMyDetect(); // Start the detection
  };

  const [stop, makestop] = useState(true);
  // const emotions = [];
  const [emotions, setEmotion] = useState([]);
  useEffect(() => {
    setlive(transcript);
  });
  const faceMyDetect = () => {
    let intervalId;
    const stopDetection = () => {
      clearInterval(intervalId); // Clear the interval when this function is called
    };
    let iterations = 0;
    const maxIterations = 35;
    intervalId = setInterval(async () => {
      iterations++;
      if (iterations >= maxIterations) {
        stopDetection(); // Stop the loop when the maximum number of iterations is reached
        return;
      }
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      // if()
      if (detections.length > 0) {
        var allexpressions = detections[0].expressions;
        if (allexpressions.neutral > 0.8)
          setEmotion((emotions) => [...emotions, "neutral"]);
        else if (allexpressions.angry > 0.8)
          setEmotion((emotions) => [...emotions, "angry"]);
        else if (allexpressions.happy > 0.8)
          setEmotion((emotions) => [...emotions, "happy"]);
        else if (allexpressions.sad > 0.8)
          setEmotion((emotions) => [...emotions, "sad"]);
        else if (allexpressions.disgusted > 0.8)
          setEmotion((emotions) => [...emotions, "disgusted"]);
        else if (allexpressions.fearful > 0.8)
          setEmotion((emotions) => [...emotions, "fearful"]);
        else if (allexpressions.surprised > 0.8)
          setEmotion((emotions) => [...emotions, "suprised"]);

        // setResult(emotions[emotions.length - 1]);

        // console.log(allexpressions);
        // if (emotions[emotions.length - 1])
        // setResult(emotions[emotions.length - 1]);

        // console.log(emotions[emotions.length - 1]);
        // console.log(emotions.length);
        // props.setemotion(emotions);
      }

      // var happy = allexpressions.happy;
      // if (Math.floor(happy) === 1) console.log("is happy");

      // var angry = allexpressions.angry;
      // if (Math.floor(angry) === 1) console.log("is angry");

      // DRAW YOU FACE IN WEBCAM
      // if (videoRef.current == null) return;
      // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
      //   videoRef.current
      // );
      // // if (canvasRef.current == null) return;
      // faceapi.matchDimensions(canvasRef.current, {
      //   width: 250,
      //   height: 250,
      // });

      //   const resized = faceapi.resizeResults(detections, {
      //     width: 250,
      //     height: 250,
      //   });

      //   faceapi.draw.drawDetections(canvasRef.current, resized);
      //   faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      //   faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 500);
  };
  const stopInterval = () => {
    // console.log("stopped is called");
    // console.log(emotions.length);
    // props.setemotion(emotions);
    // makestop((stop) => !stop);
    // videoRef.current = null;
    console.log("props are updated");
    console.log("now stop is ", stop);
    // return <Navigate to="/result" replace={true} />;
  };
  // end of video part
  function startest() {
    startTimer();
    startListening();
  }
  const startListening = () => {
    // setCount(1);
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    nextquestion();
  };
  const [spoke, setSpoke] = useState(0);
  // const [results, setResult] = useState("");
  function seeresults() {
    const data_audio = transcript;
    // console.log(data_audio);
    const arr = [
      "lonely",
      "irritated",
      "suffocating",
      "empty",
      "darkness",
      "anymore",
      "yes",
      "couldn't",
      "cannot",
      "could not",
      "alone",
      "guilty",
      "worthless",
      "killed",
      "useless",
      "meaningless",
      "lonely",
      "burden",
      "sad",
      "saddest",
      "disappear",
      "vanish",
      "nump",
      "dumb",
      "unhappy",
      "loneliness",
      /// hindi words
      "akela",
      "chidha ",
      "ghutan",
      "khali",
      "Andhera",
      "andherapan",
      "akelapan",
      "Dukhi",
      "Gayab",
      "bekar",
      "apraadhi",
      "sabse Dukhi",
      "vyarth",
      "aatmhatya",
      "Marne",
      "murkh",
      "bekar",
      "chutiya",
    ];
    var ans = 0;
    const wordsmap = {};
    console.log(transcript);
    const allwords = data_audio.split(/\s+/);
    for (const ekword of allwords) {
      if (arr.includes(ekword)) {
        if (wordsmap[ekword]) {
          wordsmap[ekword]++;
        } else {
          wordsmap[ekword] = 1;
        }
      }
    }
    // wordsdata = wordsmap;
    // setWorddata(wordsmap);
    for (const ekword in wordsmap) {
      ans += wordsmap[ekword];
    }
    // console.log(wordsdata);

    const ppi = (ans / 22) * 100;
    // setWorddata(ppi);
    setSpoke(ppi);
    console.log(ppi);
    // i am currently using on the basis of max 22 words are spoken by a depressed person
    // console.log(percentage);
  }
  const commands = [
    {
      command: ["next question", "Agla prashn", "Agla jawab"],
      callback: (abcd) => {
        if (test_started == false) {
          setTestStarted(true);
        }
        setQuestionno(question_no + 1);
        if (question_no > allquestion.length - 1) {
          setQuestion("Test is ended");
          endtest();
          if (test_started == true) {
            setTestStarted(false);
            SpeechRecognition.stopListening;
          }
        } else {
          var diss = allquestion[question_no].id + "  ";
          if (lang === "h") diss += allquestion[question_no].QuestionHindi;
          else diss += allquestion[question_no].Question;
          setQuestion(diss);
        }
        console.log("Next question please");
      },
    },
  ];
  function playaudio() {
    if (lang === "h") {
      let audiopath = new Audio("./audioHindi/ques" + question_no + ".mp3");
      audiopath.play();
    } else {
      let audiopath = new Audio("./audioEng/ques" + question_no + ".mp3");
      audiopath.play();
    }
  }
  function nextquestion() {
    setQuestionno(question_no + 1);
    if (test_started == false) {
      setTestStarted(true);
    }
    if (question_no > allquestion.length - 1) {
      setQuestion("Test is ended");
      endtest();
      if (test_started == true) {
        setTestStarted(false);
        SpeechRecognition.stopListening;
      }
    } else {
      var diss = allquestion[question_no].id + "  ";
      if (lang === "h") diss += allquestion[question_no].QuestionHindi;
      else diss += allquestion[question_no].Question;
      setQuestion(diss);
    }
    console.log("Next question please");
  }
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition(
    { commands }
  );

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  function see() {
    // console.log(transcript);
    // console.log(allquestion[0].Question);
  }

  function endtest() {
    stopInterval();
    // stopRecording()
    setTestStarted(false);
    console.log("result is", result);
    // props.func(result);
    props.setwords({
      transcript_string: transcript,
      allemotions_array: emotions,
    });
    console.log(transcript);
    SpeechRecognition.stopListening();
    setQuestionno(0);
    setQuestion("Test is ended");
    makestop(false);
    // setCount(2);
    stopTimer();

    // return;
  }
  // if (count == 2) return <Navigate to="/result" replace={true} />;

  return (
    <>
      <div className="testpagemain">
        <div className="container">
          <div className="row">
            <div className="col ">
              {current_question == "Question will appear here" ? (
                <h1 className="text-center QuestionsDiv mt-4">
                  {current_question}
                </h1>
              ) : (
                <div className="row">
                  <div className="col">
                    <p className="text-center mt-4 offset-md-4 questions">
                      {current_question}
                    </p>
                  </div>
                  <div className="col-2 mt-4">
                    {stop && (
                      <button id="listenbtn" onClick={playaudio}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
              {/* // <h1 className="text-center">{current_question}</h1> */}
            </div>
          </div>
          <br />
          <div className="row">
            <h1>{live}</h1>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                {stop === false && (
                  <p className="note">
                    Note:
                    <br />
                    1. For starting the test click start test.
                    <br /> 2. For next question just say next question
                    <br />
                    3. Currently in result we are only displaying the no. of
                    words
                  </p>
                )}
              </div>
              <div className="">
                {lang == "" ? (
                  <div>
                    <div className="row">
                      <h1 className="head">Select the launguage</h1>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <button
                          className="btn btn2"
                          onClick={() => Setlang("h")}
                        >
                          Hindi
                        </button>
                      </div>
                      <div className="col-md-2 offset-md-1">
                        <button
                          className="btn btn2"
                          onClick={() => Setlang("e")}
                        >
                          English
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {stop && (
                      <button
                        className="btn btn2"
                        onClick={test_started ? nextquestion : startest}
                      >
                        {test_started ? "Next Question" : "Start test"}
                      </button>
                    )}
                    {test_started && seconds >= 20 && (
                      <button className="btn btn2" onClick={endtest}>
                        End test{" "}
                      </button>
                    )}
                    {/* {test_started && (
                  <button className="btn btn2" onClick={stopInterval}>
                    Stop{" "}
                  </button>
                )} */}
                    {/* <button onClick={test_started ? endtest : seeresults}>
                {test_started ? "Endtest" : "See results"}
              </button> */}
                    {!stop && seconds > 20 && (
                      <Link to="/result" className="btn btn2">
                        see result{" "}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="myapp">
                {/* <h1>FAce Detection</h1> */}
                <div className="appvide">
                  <video
                    crossOrigin="anonymous"
                    ref={videoRef}
                    autoPlay
                    width={450}
                    className="videopart"
                  ></video>

                  {/* <button onClick={stopInterval}>Stop</button> */}
                  {/* <Link to="/result">STOP TEST </Link> */}
                  {/* <button onClick={stopInterval}>stop recording</button> */}
                </div>
                <canvas
                  ref={canvasRef}
                  width="250"
                  height="250"
                  className="appcanvas"
                />
              </div>
            </div>
          </div>

          {/* <div
            className="main-content"
            onClick={() => setTextToCopy(transcript)}
          >
            {transcript}
          </div> */}
          {/* <video ref={videoRef} autoPlay width={150} /> */}

          {/* <h1>{result}</h1> */}
        </div>
      </div>
    </>
  );
}

export default Testpage;
// import { useRef, useEffect, useState } from "react";
// // import "./Test.css";
// import * as faceapi from "face-api.js";
// import Result from "./resultpage.jsx";
// import { Link, Navigate } from "react-router-dom";
// function Test(props) {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [intervalId, setIntervalId] = useState(null);

//   // LOAD FROM USEEFFECT
//   useEffect(() => {
//     startVideo();
//     videoRef && loadModels();
//   }, []);

//   // OPEN YOU FACE WEBCAM
//   const startVideo = () => {
//     // if (stop === false) return;
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((currentStream) => {
//         // if (!currentStream) return;
//         videoRef.current.srcObject = currentStream;
//       })
//       .catch((err) => {
//         console.log(err);
//         // return "fdj";
//       });
//   };
//   // LOAD MODELS FROM FACE API

//   const loadModels = async () => {
//     await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//     await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//     await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
//     await faceapi.nets.faceExpressionNet.loadFromUri("/models");

//     faceMyDetect(); // Start the detection
//   };
//   const [stop, makestop] = useState(true);
//   const emotions = [];
//   const faceMyDetect = () => {
//     if (stop === false) return;
//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions();
//       // if()
//       if (detections.length > 0) {
//         var allexpressions = detections[0].expressions;
//         if (allexpressions.neutral > 0.8) emotions.push("neutral");
//         if (allexpressions.angry > 0.8) emotions.push("angry");
//         if (allexpressions.happy > 0.8) emotions.push("happy");
//         if (allexpressions.sad > 0.8) emotions.push("sad");
//         console.log(emotions[emotions.length - 1]);
//       }

//       // var happy = allexpressions.happy;
//       // if (Math.floor(happy) === 1) console.log("is happy");

//       // var angry = allexpressions.angry;
//       // if (Math.floor(angry) === 1) console.log("is angry");

//       // DRAW YOU FACE IN WEBCAM
//       // if (videoRef.current == null) return;
//       canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
//         videoRef.current
//       );
//       // if (canvasRef.current == null) return;
//       faceapi.matchDimensions(canvasRef.current, {
//         width: 250,
//         height: 250,
//       });

//       // const resized = faceapi.resizeResults(detections, {
//       //   width: 250,
//       //   height: 250,
//       // });

//       // faceapi.draw.drawDetections(canvasRef.current, resized);
//       // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
//       // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
//     }, 1000);
//   };
//   const stopInterval = () => {
//     console.log("stopped is called");
//     console.log(emotions.length);
//     props.setemotion(emotions);
//     makestop((stop) => !stop);
//     videoRef.current = null;
//     console.log("props are updated");
//     console.log("now stop is ", stop);
//     // return <Navigate to="/result" replace={true} />;
//   };
//   return (
//     <div className="myapp">
//       <h1>FAce Detection</h1>
//       <div className="appvide">
//         <video
//           crossOrigin="anonymous"
//           ref={videoRef}
//           autoPlay
//           width={250}
//         ></video>

//         {/* <button onClick={stopInterval}>Stop</button> */}
//         <Link to="/result">STOP TEST </Link>
//         <button onClick={stopInterval}>stop recording</button>
//       </div>
//       <canvas ref={canvasRef} width="250" height="250" className="appcanvas" />
//     </div>
//   );
// }

// export default Test;
