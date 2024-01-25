import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

const SignIn = () => {
  const { onSubmit, errorshook } = useSignup();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();

  console.log(errorshook);

  return (
    <>
      <section className="bg-gray-5">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Welcome
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  {
                    //@ts-ignore
                    errorshook?.error && (
                      <p className="text-red-500 text-sm mt-1" role="alert">{
                        //@ts-ignore
                        errorshook?.error
                        } </p>
                  )}
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
                      required: true
                    })}
                  />
                  {errors.firstName?.type === 'required' && (
                    <p>First Name is required</p>
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
                    {...register('lastName', { required: true })}
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last Name"
                  />
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
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: 'Email is not valid.'
                      }
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register('password', {
                      required: true,
                      minLength: 6
                    })}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-grasy-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  {errors.password && errors.password.type === 'required' && (
                    <p className="text-red-500 text-sm mt-1">
                      Password is required.
                    </p>
                  )}
                  {errors.password && errors.password.type === 'minLength' && (
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
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register('confirmPassword', {
                      required: true,
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
                <div className="flex items-center justify-between">
                  <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                      By creating an account, you agree to our
                      <Link to="#" className="text-gray-700 underline">
                        terms and conditions
                      </Link>
                      and
                      <Link to="#" className="text-gray-700 underline">
                        privacy policy
                      </Link>
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link
                    to="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
