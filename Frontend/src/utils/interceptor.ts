import axios, { InternalAxiosRequestConfig } from "axios";

class Interceptor {
    public create(): void {

        // Registering a request interceptor:
        axios.interceptors.request.use((httpRequest: InternalAxiosRequestConfig) => {

            // Get the token:
            const token = localStorage.getItem("token");

            // Save token in header:
            if (token) {
                httpRequest.headers.Authorization = "Bearer " + token;
            }

            // Return given request so axios could send this one:
            return httpRequest;
        });


        //expire/invalid token 401 with an existing token => logout
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401 && localStorage.getItem("token")) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
                return Promise.reject(error)
            }
        )
    }
}

export const interceptor = new Interceptor();
