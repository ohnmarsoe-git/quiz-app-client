import { FC, useState, useContext, useEffect } from 'react';
import { Questions } from '../types/types';
import AuthContext from '../context/authProvider';
import { useParams, Link } from 'react-router-dom';
import Question from '../components/Question';
import Answertime from '../components/Answertime';
import Score from './Score';
import usePrivateApi from '../hooks/usePrivateApi';
import useCommonApi from '../hooks/useCommonApi';

const Quiz: FC = () => {
  let count = 0;
  const param = useParams();
  const api: any =usePrivateApi();

  const { authState } = useContext(AuthContext);

  const [data, setData] = useState<Questions[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mark, setMark] = useState(0);
  const [finish, setFinish] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [allowed, setAllowed] = useState(true);

  const { makeRequest } = useCommonApi<Questions>('');

  useEffect(() => {
    api
      .post('/api/v1/quiz/filterbyuser', {
        id: authState.id,
        category: param.id,
        level: 'Beginner'
      })
      .then((response: any) => {
        const res = response?.data.data;
        if (res === 'NotAllowed') {
          setAllowed(false);
        } else {
          setData(res);
        }
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [param.id]);

  if (data?.length) {
    count = data?.length;
  }

  const sendScore = () => {
    const scoreData = {
      user: authState.id,
      category: data?.[currentQuestion].category?._id,
      score: mark
    };
    makeRequest(`/api/v1/answers/`, 'POST', scoreData);
  };

  const handleCheckAnswer = () => {
    if (nextQuestion === count - 1) {
      setShowTimer(false);
      sendScore();
      setFinish(true);
    }
  };

  const handleAnswer = (answer: string) => {
    setFinish(false);
    setShowTimer(false);

    if (answer && answer === data?.[currentQuestion].correct_answer) {
      setMark((prev) => prev + 1);
    }

    if (nextQuestion < count) {
      setCurrentQuestion((prev) => prev + 1);
      setNextQuestion((prev) => prev + 1);
    }

    if (nextQuestion === count - 1) {
      setFinish(true);
    }

    setTimeout(() => {
      setShowTimer(true);
    });
  };

  const handleTimeUp = () => {
    setMark((prev) => prev + 0);
    handleAnswer('');
    sendScore();
  };

  if (loading) return <div>loading ....</div>;

  return (
    <div className="max-w-screen-xl mx-auto mt-20">
      <div className="bg-slate-100 rounded shadow border-solid border-slate-500 mt-52">
        <h2 className="p-3 text-2xl font-bold bg-slate-500 text-slate-50 uppercase">
          {data && data?.length > 0 && showTimer && !finish
            ? data?.[currentQuestion]?.category?.category
            : finish
            ? 'Finish'
            : 'No Quiz'}
        </h2>

        {data && data?.length > 0 ? (
          <>
            {
              /** Check Answer time */
              showTimer && !finish && (
                <Answertime duration={10} onTimeUp={handleTimeUp} />
              )
              /** End Answer time */
            }

            <div
              className={`md:mx-0 ml-0 text-left p-5 ${
                finish ? 'hidden' : 'block'
              } `}
            >
              <div className="mx-0 mr-0 text-right text-2xl font-medium my-5">
                Q: {currentQuestion + 1} / {count}
              </div>

              <Question
                question={data?.[currentQuestion]?.question}
                answers={data?.[currentQuestion]?.answers}
                correct_answer={data?.[currentQuestion]?.correct_answer}
                onAnswer={() => {}}
              />

              <div className="flex justify-between">
                <p>Level : {data?.[currentQuestion]?.level}</p>
                {nextQuestion === count - 1 ? (
                  <button
                    className="cursor-allowed hover:bg-blue-800 bg-blue-500 text-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={handleCheckAnswer}
                  >
                    Finish
                  </button>
                ) : (
                  <button
                    className="cursor-allowed hover:bg-blue-800 bg-blue-500 text-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() =>
                      handleAnswer(
                        //@ts-ignore
                        data?.[currentQuestion]?.correct_answer
                      )
                    }
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="mx-auto text-center p-10">
            {allowed ? (
              <h2 className="text-2xl font-semibold leading-relaxed p-5">
                Sorry! There wasn't data. Can you try others?
              </h2>
            ) : (
              <h2 className="text-2xl font-semibold leading-relaxed p-5">
                Sorry! You aren't allowed to answer these questions! <br />
                Can you try others?
              </h2>
            )}

            <Link
              to="/quiz"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
            >
              HOME
            </Link>
          </div>
        )}

        {
          /** finish */
          finish && <Score mark={mark} totalQuestion={count} />
        }
      </div>
    </div>
  );
};

export default Quiz;
