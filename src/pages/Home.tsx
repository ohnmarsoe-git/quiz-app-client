import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePrivateApi from '../hooks/usePrivateApi';

const Home = () => {
  const api: any = usePrivateApi();

  let colorArray = [
    'bg-blue-100 text-blue-800 border-blue-400',
    'bg-gray-100 text-gray-800 border-gray-400',
    'bg-red-100 text-red-800 border-red-400',
    'bg-green-100 text-green-800 border-green-400',
    'bg-yellow-100 text-yellow-800 border-yellow-300',
    'bg-indigo-100 text-indigo-800 border-indigo-400',
    'bg-purple-100 text-purple-800 border-purple-400',
    'bg-pink-100 text-pink-800 border-pink-400'
  ];

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getGroupBy = async () => {
    try {
      const response = await api.get('/api/v1/quiz/groupby');
      const res = response?.data.data;
      setData(res);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupBy();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>loading ....</div>;

  return (
    <div className="max-w-screen-xl mx-auto mt-28 p-10">
      <h2 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 mb-10">
        Click One to Start Quiz!...
      </h2>

      <div className="flex flex-wrap md:flex-row items-center">
        {
          //@ts-ignore
          data?.map((cat, index) => (
            <Link to={`/quiz/${cat._id}`} key={index} className="h-16">
              <span
                className={`${colorArray[index]} text-sm font-medium mr-2 px-2.5 py-2.5 rounded border uppercase `}
              >
                {cat.category[0].category}
              </span>
            </Link>
          ))
        }
      </div>

      <div className="mb-20">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Notes:</h2>
        <ul className=" space-y-1 text-gray-500 list-inside">
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            If you don't pass 3 times, you can't answer again of related title!{' '}
          </li>
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            After 3 months, you can try agian it!
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home