import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import { Card, Progress } from "antd";
import { RoundBtn, RoundLink } from "./Styles";

import { getQuestions, sendAnswers } from "../../../_actions/quiz_actions";
import { mainColor } from "../../../utils/constant";

function QuizPage(props) {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const [sendStatus, setSendStatus] = useState(-1); // -1: default, 0: error, 1: success
  const [loading, setLoading] = useState(false);
  const [viewScore, setViewScore] = useState(false);

  let questions = useSelector((state) => state.quiz.questions);
  let mark = useSelector((state) => state.quiz.mark);
  let detailResults = useSelector((state) => state.quiz.answers);

  useEffect(() => {
    getQuestions(dispatch);
  }, []);

  useEffect(() => {
    if (questions) {
      setAnswers(
        questions.map((item) => {
          return {
            ...item,
            answer: false,
          };
        })
      );
    }
  }, [questions]);

  const handleStart = () => {
    setCursor(cursor + 1);
  };

  const handleNext = (answer) => () => {
    let tmpAnswers = _.cloneDeep(answers);
    tmpAnswers[cursor].answer = answer;
    setAnswers(tmpAnswers);
    if (cursor === answers.length - 1) {
      const sendData = tmpAnswers.map((item) => ({
        question: item._id,
        answer: item.answer,
      }));
      setLoading(true);
      dispatch(sendAnswers(sendData))
        .then((response) => {
          setLoading(false);
          setSendStatus(1);
        })
        .catch((err) => {
          setLoading(false);
          setSendStatus(0);
        });
    }
    setCursor(cursor + 1);
  };

  const handleSend = () => {
    const sendData = answers.map((item) => ({
      question: item._id,
      answer: item.answer,
    }));
    setLoading(true);
    dispatch(sendAnswers(sendData))
      .then((response) => {
        console.log(response);
        setLoading(false);
        setSendStatus(1);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSendStatus(0);
      });
  };

  const handleViewScore = () => {
    setViewScore(true);
  };

  const getComment = (mark) => {
    if (mark >= 0 && mark < 21) {
      return {
        title: "Scarso",
        description:
          "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
      };
    } else if (mark >= 21 && mark < 51) {
      return {
        title: "Mediocre",
        description:
          "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
      };
    } else if (mark >= 51 && mark < 71) {
      return {
        title: "Sufficiente",
        description:
          "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
      };
    } else if (mark >= 71 && mark < 81) {
      return {
        title: "Buono",
        description:
          "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
      };
    } else if (mark >= 81 && mark <= 100) {
      return {
        title: "Ottimo",
        description:
          "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
      };
    }
  };

  const StartComponent = () => {
    return (
      <div className="row align-items-center" style={{ height: 450 }}>
        <div className="col-md-6">
          <div className="text-center">
            <div>
              <h4 className="display-4">Are u green enough?</h4>
            </div>
            <div className="text-center" style={{ marginTop: 70 }}>
              <RoundBtn onClick={handleStart}>Inizia</RoundBtn>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="/image/quiz-start.png"
            alt="quiz-box"
            className="img-thumbnail"
          />
        </div>
      </div>
    );
  };

  const ViewScoreComponent = () => {
    return (
      <div className="row align-items-center" style={{ height: 450 }}>
        <div className="col-md-6 px-5">
          {detailResults.map((item, index) => (
            <div key={index}>
              <div className="d-flex py-2">
                <h5 className="display-5 mr-auto">{item.text}</h5>
                <h5 className="display-5 text-right">{item.mark.toFixed(2)}</h5>
              </div>
              <hr />
            </div>
          ))}
          <div className="d-flex py-2 font-weight-bold">
            <h4 className="display-5 mr-auto">Punteggio Totale</h4>
            <h4 className="display-5 text-right">{mark}</h4>
          </div>
        </div>
        <div className="col-md-6 pl-5">
          <div
            style={{ fontSize: 88, textAlign: "center", border: "4px solid" }}
          >
            {mark}
          </div>
          <div
            style={{ margin: "46px 0px" }}
            className="font-weight-bold"
          >
            <div style={{ fontSize: 35 }}>{getComment(mark).title}</div>
            <div style={{ fontSize: 20 }}>{getComment(mark).description}</div>
          </div>
          <div className="text-right">
            <RoundLink to="/">Indietro</RoundLink>
          </div>
        </div>
      </div>
    );
  };

  const TestComponent = () => {
    return (
      <div className="row align-items-center" style={{ height: 450 }}>
        <div className="col-md-8">
          <div className="text-center">
            {cursor === questions.length ? (
              <>
                <h4
                  className="display-4 text-success"
                  style={{ color: mainColor }}
                >
                  Completato!
                </h4>
                <div style={{ marginTop: 60 }}>
                  {loading ? (
                    <div
                      className="spinner-border"
                      style={{ width: 50, height: 50 }}
                    ></div>
                  ) : sendStatus === 0 ? (
                    <div style={{ fontSize: 25 }}>
                      Errore nell'invio delle risposte.
                      <RoundBtn className="ml-3" onClick={handleSend}>
                        Prova di nuovo.
                      </RoundBtn>
                    </div>
                  ) : sendStatus === 1 ? (
                    <div style={{ fontSize: 25 }}>
                      Risposte inviate correttamente.
                      <RoundBtn className="ml-3" onClick={handleViewScore}>
                        Guarda i punteggi
                      </RoundBtn>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <h4
                  className="display-4 font-weight-bold"
                  style={{ marginTop: 70 }}
                >
                  {answers[cursor].subject.text}
                </h4>
                <h5
                  className="display-5 mx-auto"
                  style={{
                    marginTop: 70,
                    height: 70,
                  }}
                >
                  {answers[cursor].text}
                </h5>
                <div style={{ margin: "56px 0px 30px" }}>
                  <button
                    onClick={handleNext(true)}
                    className="btn btn-outline-success mr-4"
                    style={{ width: 100 }}
                  >
                    SI
                  </button>
                  <button
                    onClick={handleNext(false)}
                    className="btn btn-outline-danger"
                    style={{ width: 100 }}
                  >
                    NO
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-4 text-center">
          <Progress
            type="circle"
            percent={(cursor * 100) / questions.length}
            format={() => cursor + "/" + questions.length}
            width={200}
          />
        </div>
      </div>
    );
  };

  return (
    <section className="container py-5">
      <Card title="Fai il test">
        <div>
          {cursor < 0 ? (
            <StartComponent />
          ) : viewScore ? (
            <ViewScoreComponent />
          ) : (
            <TestComponent />
          )}
        </div>
      </Card>
    </section>
  );
}

export default withRouter(QuizPage);
