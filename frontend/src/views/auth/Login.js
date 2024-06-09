import {React,useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { authAction } from "../../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API;

export default function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [data, setData] = useState({
        email: "",
        password: "",
      });
    
      const [isLoading, setIsLoading] = useState(false); // Track login request status
      const [error, setError] = useState(null); // Store any login errors
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleLogin = async () => {
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await axios.post(api+"/login", data); // Use Axios for login API call
    
          // Assuming login response contains a token property
          const user = response.data.user;
    
          // Redirect or perform other actions after successful login
          alert("Login successful!");
          // Save user data to localStorage
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authAction(user)); 
          navigate("/");
          
          // window.location.href="/";
    
        } catch (error) {
          setError(error.response.data.error);
        } finally {
          setIsLoading(false);
        }
      };
    
    

    return (
        <>
          {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
              <form className="space-y-6" action="javascript:void(0)" method="POST" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      value={data.password}
                      onChange={handleChange}
                      name="password"
                      type="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    isLoading ? "cursor-wait" : "" // Add cursor-wait style on loading
                    }`}
                    disabled={isLoading} // Disable button while loading
                >
                    {isLoading ? "Loading..." : "Sign in"}
                </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to={"/registration"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Registration here
                </Link>
              </p>
            </div>
          </div>
        </>
      )
}