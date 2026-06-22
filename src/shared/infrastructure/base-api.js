import axios from "axios";
// Import to enable IAM Interceptor for attaching authentication tokens to requests
import {iamInterceptor} from "../../iam/infrastructure/iam.interceptor.js";

const platformApi = import.meta.env.VITE_LEARNING_PLATFORM_API_URL;

/**
 * Shared infrastructure base class that creates and exposes a pre-configured Axios instance.
 * All bounded-context API gateways should extend this class.
 *
 * @class BaseApi
 */
export class BaseApi {
    #http;

    /**
     * Initializes the Axios HTTP client with the platform base URL and default headers.
     * The base URL is read from the `VITE_LEARNING_PLATFORM_API_URL` environment variable.
     */
    constructor() {
        this.#http = axios.create({
            baseURL: platformApi,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        // Add interceptors for request/response if needed
        this.#http.interceptors.request.use(iamInterceptor);
    }

    /**
     * Exposes the pre-configured Axios instance so subclasses and endpoint clients
     * can attach interceptors or perform requests.
     *
     * @returns {import('axios').AxiosInstance} Configured Axios instance.
     */
    get http() {
        return this.#http;
    }
}