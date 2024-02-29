/**
 * Nexus OAuth API
 * This is an API entirely made and managed by [Nexus Company](https://nexus-company.net).    # Authentication  This API uses a secure authentication method divided into two steps with the last resulting in JWT,  ## Authenticated Request  Post OAuth authorization use your access token on \"Authorization\" header for routes where authentication is required.  > The header format should be as follows: \"{Token Type} {JWT Access Token}\"  > example: \"Barear AAAAAAAAAAAAAAAAAAA\"    #### Example  This example shows one http request for get user account.    ```http  GET /api/Accounts/MyAccount HTTP/1.1  Host: auth.nexus-company.net  Authorization: Barear AAAAAAAAAAAAAAAA  User-Agent: ExampleClient 1.0    -- EMPTY BODY (FOR EXAMPLE)  ```    ### First step of authentication    Send a `GET` request to the [`/api/Authentications/FirstStep`]() route.  1. Include the following headers in the request:       - `User-Agent`: Identifies the user agent.       - `Client-Key`: Client key for authentication.  2. Include the following parameters in the query string:       - `user`: Username or email.       - `hCaptchaToken`: Token generated by hCaptcha.    > The `hCaptchaToken` value is obtained by the HCaptcha API, see the documentation for this API [here](https://docs.hcaptcha.com/).    3. The request response will be JSON with the following format:    ```json  {      \"id\": 0,      \"date\": \"2024-02-28T22:18:22.819Z\",      \"userAgent\": \"string\",      \"token\": \"string\",      \"expiresIn\": 0,      \"userName\": \"string\",      \"profileImage\": {          \"fileName\": \"string\",          \"type\": \"Image\",          \"length\": 0,          \"resourceType\": \"ApplicationLogo\",          \"url\": \"string\"      }  }  ```            4. Store the `Id` of this request for the next step    > The token generated by this step has a limited validity, after its expiration it will be necessary to obtain it again.    ### Second step of authentication    Now send a `GET` request to the route [`/api/Authentications/SecondStep `](#operations-Authentications-get_api_Authentications_SecondStep).  2. Include the following parameters in the query string:       - `pwd`: User password.       - `token`: Token from Google Authenticator or another similar application.       - `fs_id`: The `Id` value obtained in the first step.  3. The request response will be JSON with the following format:  ```json  {    \"token\": \"string\",    \"expiresIn\": \"2024-02-28T22:49:12.559Z\",    \"refreshToken\": \"string\",    \"type\": \"Bearer\"  }  ```  4. Store the returned JWT token in the `token` field for use in subsequent API requests.    > The JWT token generated in the second step has limited validity. You will need to redo the authentication process after the token expires or you can send a POST request to [`/api/Authentications/Refresh `](#operations-Authentications-post_api_Authentications_Refresh). where you will get a new JWT token.    > **Additional Step**  If the user has two-factor authentication activated on their account, two new API calls may be necessary, which will be documented shortly when the process is fully developed.    ### Login example  First step request  ```curl  curl -X GET\\  -H \"User-Agent: ExampleClient 1.0\" \\  -H \"Client-Key: 1234567890\" \\  -d \"user=johndoe@gmail.com\" \\  -d \"hCaptchaToken=0xdeadbeef\" \\  \"https://oauth-api.nexus-company.net/api/Authentications/FirstStep\"  ```  Second step request  ```curl  curl -X GET\\  -d \"pwd=secretpassword\" \\  -d \"token=0xdeadbeef\" \\  -d \"fs_id=1234567890\" \\  \"https://oauth-api.nexus-company.net/api/Authentications/SecondStep\"
 *
 * OpenAPI spec version: v1
 * Contact: juandouglas2004@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { FileType } from '../model/fileType';
import { ImageExtension } from '../model/imageExtension';
import { ResourceType } from '../model/resourceType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class FilesService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param type 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFilesTemplatesDownloadTypeGet(type: ResourceType, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiFilesTemplatesDownloadTypeGet(type: ResourceType, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiFilesTemplatesDownloadTypeGet(type: ResourceType, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiFilesTemplatesDownloadTypeGet(type: ResourceType, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (type === null || type === undefined) {
            throw new Error('Required parameter type was null or undefined when calling apiFilesTemplatesDownloadTypeGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/Files/Templates/Download/${encodeURIComponent(String(type))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param type 
     * @param fileName 
     * @param resourceType 
     * @param extension 
     * @param width 
     * @param height 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFilesTypeDownloadGet(type: FileType, fileName?: string, resourceType?: ResourceType, extension?: ImageExtension, width?: number, height?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiFilesTypeDownloadGet(type: FileType, fileName?: string, resourceType?: ResourceType, extension?: ImageExtension, width?: number, height?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiFilesTypeDownloadGet(type: FileType, fileName?: string, resourceType?: ResourceType, extension?: ImageExtension, width?: number, height?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiFilesTypeDownloadGet(type: FileType, fileName?: string, resourceType?: ResourceType, extension?: ImageExtension, width?: number, height?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (type === null || type === undefined) {
            throw new Error('Required parameter type was null or undefined when calling apiFilesTypeDownloadGet.');
        }






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (fileName !== undefined && fileName !== null) {
            queryParameters = queryParameters.set('fileName', <any>fileName);
        }
        if (resourceType !== undefined && resourceType !== null) {
            queryParameters = queryParameters.set('resourceType', <any>resourceType);
        }
        if (extension !== undefined && extension !== null) {
            queryParameters = queryParameters.set('extension', <any>extension);
        }
        if (width !== undefined && width !== null) {
            queryParameters = queryParameters.set('width', <any>width);
        }
        if (height !== undefined && height !== null) {
            queryParameters = queryParameters.set('height', <any>height);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/api/Files/${encodeURIComponent(String(type))}/Download`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
