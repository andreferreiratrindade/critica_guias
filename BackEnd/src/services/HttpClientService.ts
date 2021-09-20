import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import https from "https"
export class HttpClient  {
  static get  (parameters: IHttpClientRequestParameters): Promise<any> {
    return new Promise<any>((resolve, reject) => {

      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      })
      // extract the individual parameters
      const { url, payload, requiresToken } = parameters;
      
      // axios request options like headers etc
      const options: AxiosRequestConfig = {
         headers: { 
          'Access-Control-Allow-Origin': "*",
        },
         params:payload,
         httpsAgent : httpsAgent

        //data:payload
      };
      
      axios
        .get(url,options)
        .then((response: any) => {
          console.log(response)

          resolve(response);
        })
        .catch((response: any) => {
          console.log(response)
          reject(response);
        });
    });
  }

  

 static  post(parameters: IHttpClientRequestParameters): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "GET",
          "Content-Security-Policy": "*"
        }
      };



      // finally execute the GET request with axios:
      axios
        .post(url, payload, options)
        .then((response: any) => {
          resolve(response.data as any);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }

  static  put(parameters: IHttpClientRequestParameters): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "PUT",
          "Content-Security-Policy": "*"
        }
      };


      // finally execute the GET request with axios:
      axios
        .put(url, payload, options)
        .then((response: any) => {
          resolve(response.data as any);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }

  static  delete(parameters: IHttpClientRequestParameters): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const { url, payload, requiresToken } = parameters;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods": "DELETE",
          "Content-Security-Policy": "*"
        }
      };



      // finally execute the GET request with axios:
      axios
        .delete(url, options)
        .then((response: any) => {
          resolve(response.data as any);
        })
        .catch((response: any) => {
          reject(response);
        });
    });
  }
}