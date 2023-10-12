import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import "../css/resultpage.css";
import Emotionchart from "./emotionChart";
import WordsChart from "./Wordschart";
// imort {Link}
export default function resultpage(props) {
  if (props.login === false) {
    return <Navigate to="/login" replace={true} />;
  }
  const emotiondata = props.data.allemotions_array;
  function seeEmotion() {
    // console.log("fetvusbklz");
    console.log(props.data.allemotions_array);
  }
  function seeSpoken() {
    console.log(props.data.transcript_string);
  }

  const [percentage, setWorddata] = React.useState();
  // const []
  const [loadchart, setLoad] = React.useState(false);
  useEffect(() => {
    const data_audio = props.data.transcript_string;
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
    console.log(props.data.transcript_string);
    const allwords = data_audio.split(/\s+/);
    // for (const ekword of allwords) {
    //   if (arr.includes(ekword)) {
    //     if (wordsmap[ekword]) {
    //       wordsmap[ekword]++;
    //     } else {
    //       wordsmap[ekword] = 1;
    //     }
    //   }
    // }
    for (const ekword of allwords) {
      if (
        ekword === "irritated" ||
        ekword === "yes" ||
        ekword === "dumb" ||
        ekword === "unhappy" ||
        ekword === "Dukhi" ||
        ekword === "murkh" ||
        ekword === "bekar" ||
        ekword === "numb" ||
        ekword === "exhausted" ||
        ekword === "exhaust"
      ) {
        if (wordsmap[ekword]) {
          wordsmap[ekword]++;
        } else {
          wordsmap[ekword] = 1;
        }
      } else if (
        ekword === "suffocating" ||
        ekword === "anymore" ||
        ekword === "couldn't" ||
        ekword === "couldnot" ||
        ekword === "useless" ||
        ekword === "sad" ||
        ekword === "saddest" ||
        ekword === "loneliness" ||
        ekword === "chidha" ||
        ekword === "akelapan" ||
        ekword === "bekar" ||
        ekword === "sabsedukhi" ||
        ekword === "trouble" ||
        ekword === "noone" ||
        ekword === "neendnhi" ||
        ekword === "zero" ||
        ekword === "down" ||
        ekword === "unmotivated" ||
        ekword === "isolated" ||
        ekword === "isolate"
      ) {
        if (wordsmap[ekword]) {
          wordsmap[ekword] += 2;
        } else {
          wordsmap[ekword] = 2;
        }
      } else if (
        ekword === "lonely" ||
        ekword === "empty" ||
        ekword === "darkness" ||
        ekword === "alone" ||
        ekword === "guilty" ||
        ekword === "worthless" ||
        ekword === "killed" ||
        ekword === "meaningless" ||
        ekword === "burden" ||
        ekword === "disappear" ||
        ekword === "vanish" ||
        ekword === "akela" ||
        ekword === "ghutan" ||
        ekword === "khali" ||
        ekword === "andhera" ||
        ekword === "andherapan" ||
        ekword === "Gayab" ||
        ekword === "vyarth" ||
        ekword === "aatmhatya" ||
        ekword === "marne" ||
        ekword === "insomania" ||
        ekword === "killing" ||
        ekword === "nobody" ||
        ekword === "struggling" ||
        ekword === "sadness" ||
        ekword === "kill"
      ) {
        if (wordsmap[ekword]) {
          wordsmap[ekword] += 3;
        } else {
          wordsmap[ekword] = 3;
        }
      }
    }
    // wordsdata = wordsmap;
    // setWorddata(wordsmap);
    for (const ekword in wordsmap) {
      ans += wordsmap[ekword];
    }
    // console.log(wordsdata);

    const ppi = (ans / 85) * 100;
    setWorddata(ppi);
    console.log(ppi);
    setLoad(true);
  }, []);

  return (
    <div className="resultpage">
      <div className="container ">
        <div className="row">
          <div className="col mt-4 text-center resulthead">
            <h1>RESULTS</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Link
              to="/"
              className="btn btn2 mt-4
            homelink"
            >
              Home Page
            </Link>
          </div>
          <div className="col-2">
            <Link
              to="/dashboard"
              className="btn btn2 mt-4
            homelink"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4 ">
            <Emotionchart
              emotiondata={emotiondata}
              percentage={percentage}
              chartdata={props.chartdata}
            />
          </div>
          <div className="col-md-4 offset-md-2">
            {loadchart && <WordsChart percentage={percentage} />}
          </div>
        </div>
        <div className="row ">
          <div className="col suggestions mt-4">
            {percentage >= 0 && percentage <= 33 && (
              <div>
                <h1 className="depressedhead2 text-center mt-4 pb-4">
                  {" "}
                  You are Mild Depressed
                </h1>
                <h2 className="resultpara">
                  1. Self-care: Pay attention to your basic needs. Ensure you're
                  getting enough sleep, eating balanced meals, and engaging in
                  regular physical activity.
                </h2>
                <h2 className="resultpara">
                  2.Establish a routine: Structure your day with a consistent
                  daily schedule to provide stability and a sense of purpose.
                </h2>
                <h2 className="resultpara">
                  3. Social connection: Reach out to friends and family for
                  support. Isolation can worsen depression, so try to maintain
                  social connections, even if it's challenging.
                </h2>
                <h2 className="resultpara">
                  4. Mindfulness and relaxation techniques: Practicing
                  mindfulness, deep breathing, or meditation can help reduce
                  stress and improve your emotional well-being.
                </h2>
                <h2 className="resultpara">
                  5. Set achievable goals: Start with small, manageable tasks
                  and gradually work your way up. Celebrate your
                  accomplishments, no matter how minor they may seem.
                </h2>
              </div>
            )}
            {percentage > 33 && percentage <= 66 && (
              <div>
                <h1 className="depressedhead2 text-center mt-4 pb-4">
                  {" "}
                  You are Moderate Depressed
                </h1>
                <h2 className="resultpara">
                  1. Therapy: Consider individual or group therapy, such as
                  cognitive-behavioral therapy (CBT), which has been effective
                  in treating depression.
                </h2>
                <h2 className="resultpara">
                  2.Medication: Consult a psychiatrist or medical professional
                  to discuss the possibility of medication as part of your
                  treatment plan.
                </h2>
                <h2 className="resultpara">
                  3. Support groups: Joining a support group for individuals
                  with depression can provide a sense of community and
                  understanding.
                </h2>
                <h2 className="resultpara">
                  4. Lifestyle changes: Incorporate healthy habits like regular
                  exercise, a balanced diet, and reducing alcohol or drug use.
                </h2>
                <h2 className="resultpara">
                  5. Avoid self-criticism: Challenge negative self-talk and
                  practice self-compassion. Remember that depression is an
                  illness, not a personal failing.
                </h2>
              </div>
            )}
            {percentage > 66 && (
              <div>
                <h1 className="depressedhead2 text-center mt-4 pb-4">
                  {" "}
                  You are Severely Depressed
                </h1>
                <h2 className="resultpara">
                  1. Seek professional help immediately: If you're experiencing
                  severe depression, suicidal thoughts, or feel unable to cope,
                  reach out to a mental health crisis helpline or visit the
                  nearest emergency room.
                </h2>
                <h2 className="resultpara">
                  2.Hospitalization: In some cases, hospitalization may be
                  necessary for safety and intensive treatment.
                </h2>
                <h2 className="resultpara">
                  3. Collaborate with your treatment team: Work closely with
                  your mental health professionals to develop a comprehensive
                  treatment plan that may include therapy, medication, and other
                  interventions.
                </h2>
                <h2 className="resultpara">
                  4. Involve loved ones: Engage your family and friends in your
                  treatment process. They can provide invaluable support and
                  understanding.
                </h2>
                <h2 className="resultpara">
                  5. Safety plan: Create a safety plan with your therapist or
                  psychiatrist to address potential crises and coping
                  strategies.
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="row faltudiv"></div>
      </div>
    </div>
  );
}
