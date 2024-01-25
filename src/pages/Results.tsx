import React, { useEffect, useState, useContext } from 'react';
import { AxiosError } from 'axios';
import usePrivateApi from '../hooks/usePrivateApi';
import AuthContext from '../context/authProvider';

const Results = () => {
  const { authState, logoutDispatch } = useContext(AuthContext);

  const api: any = usePrivateApi();

  const [loading, setLoaing] = useState(true);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const getAnswerResults = async () => {
      console.log(authState);
      try {
        const response = await api.get(
          `/api/v1/answers/history/${authState?.id}`
        );
        const res = response?.data.data;
        console.log(res);
        setAnswers(res);
        setLoaing(false);
      } catch (error) {
        const err = error as AxiosError;
        //@ts-ignore
        if (err.response?.data && err.response?.data.data === 'jwt expired') {
          logoutDispatch();
        }
      }
    };
    getAnswerResults();
  }, [api, authState, logoutDispatch]);

  if (loading) return <div>loading ....</div>;

  return (
    <div className="max-w-screen-xl mx-auto mt-20 p-10 relative">
      <h2 className="text-3xl font-medium text-gray-700">Results History</h2>
      <div className="flex flex-col mt-8">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Score
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {answers &&
                  answers?.map((ans: any, index: number) => (
                    <React.Fragment key={index}>
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {`${ans?.user?.firstName} ${ans?.user?.lastName}`}
                              </div>
                              <div className="text-sm leading-5 text-gray-500">
                                {ans?.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {ans?.category?.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {ans?.score}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {new Date(ans?.createdAt).toLocaleDateString(
                              'en-US'
                            )}
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
