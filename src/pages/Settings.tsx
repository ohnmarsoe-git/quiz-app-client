import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../types/types';
import useCommonApi from '../hooks/useCommonApi';
import AuthContext from '../context/authProvider';

const Settings = () => {
  const { authState } = useContext(AuthContext);

  const { data, makeRequest } = useCommonApi<User>(
    `/api/v1/users/${authState.id}`,
    'GET',
    authState.id
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (formData: any) => {
    let userInfo;
    //@ts-ignore
    let userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: 'user'
    };

    if (formData.password)
      userInfo = { ...userData, password: formData.password };
    else userInfo = userData;

    makeRequest(`/api/v1/user/${authState.id}`, 'PATCH', userInfo);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-28 p-10 relative">
      <section className="bg-gray-5">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                User Profile
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {data && (
                  <>
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="
                            bg-gray-50 border 
                            border-gray-300 
                            text-gray-900 
                            sm:text-sm rounded-lg 
                            focus:ring-primary-600 
                            focus:border-primary-600 
                            block w-full p-2.5 
                            dark:bg-gray-700 
                            dark:border-gray-600 
                            dark:placeholder-gray-400 
                            dark:text-white 
                            dark:focus:ring-blue-500 
                            dark:focus:border-blue-500"
                        placeholder="First Name"
                        {...register('firstName', {
                          required: true,
                          //@ts-ignore
                          value: data?.firstName
                        })}
                      />
                      {errors.firstName?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          FirstName is required
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register('lastName', {
                          required: true,
                          //@ts-ignore
                          value: data?.lastName
                        })}
                        id="lastName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Last Name"
                      />
                      {errors.lastName?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          Last Name is required
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        {...register('email', {
                          required: true,
                          //@ts-ignore
                          value: data?.email,
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: 'Email is not valid.'
                          }
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.email?.type === 'required' && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          Email Address is required
                        </p>
                      )}
                      {errors.email?.type === 'pattern' && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          Email is not valid
                        </p>
                      )}
                    </div>

                    <div className="relative w-full container mx-auto mt-20">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Password
                      </label>
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        {...register('password', {
                          minLength: 6
                        })}
                        id="password"
                        placeholder="••••••••"
                        className="
                        bg-gray-50 
                        border border-gray-300 
                        text-gray-900 sm:text-sm 
                        rounded-lg 
                        focus:ring-primary-600 
                        focus:border-primary-600 
                        block 
                        w-full 
                        px-4
                        py-2"
                      />

                      <button
                        className="absolute inset-y-0 right-0 flex items-center px-4 pt-7 text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>

                      {errors.password &&
                        errors.password.type === 'required' && (
                          <p className="text-red-500 text-sm mt-1">
                            Password is required.
                          </p>
                        )}
                      {errors.password &&
                        errors.password.type === 'minLength' && (
                          <p className="text-red-500 text-sm mt-1">
                            Password should be at-least 6 characters.
                          </p>
                        )}
                    </div>
                    <div>
                      <label
                        htmlFor="confirm password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Confirm Password
                      </label>
                      <input
                        type="password"
                        {...register('confirmPassword', {
                          validate: (val: string) => {
                            if (watch('password') !== val) {
                              return 'Your passwords do no match';
                            }
                          }
                        })}
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.confirmPassword &&
                        errors.confirmPassword.type === 'required' && (
                          <p className="text-red-500 text-sm mt-1">
                            Confirm Password is required!
                          </p>
                        )}
                      {errors.confirmPassword &&
                        errors.confirmPassword.type === 'validate' && (
                          <p className="text-red-500 text-sm mt-1">
                            Password do not Match
                          </p>
                        )}
                    </div>

                    <div>
                      <input
                        type="hidden"
                        {...register('page', { value: 'admin' })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Update
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
