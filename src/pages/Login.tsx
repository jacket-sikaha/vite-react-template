import { Form, message } from "antd";
import { accountLogin } from "../services/signup";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleFinish = async (value: any) => {
    await accountLogin(value)
      .then(({ msg, successful }) => {
        if (!successful) {
          throw { errMessage: msg };
        }
        message.success(msg || "login success");
        navigate("/");
      })
      .catch(({ errMessage }) => {
        message.error(errMessage);
      });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center mt-6 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" onFinish={handleFinish}>
            <div>
              <Form.Item
                label={
                  <div className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </div>
                }
                required
                name="username"
              >
                <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label={
                  <div className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </div>
                }
                name="password"
                required
              >
                <input
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </Form.Item>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
