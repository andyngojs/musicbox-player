export interface ApiConfig {
  method?: string;
  /**
   * URL params in key-value pair form
   */
  params?: any;
  /**
   * Additional HTTP request headers
   */
  headers?: any;
  /**
   * The HTTP request body (applies to PUT or POST).
   */
  body?: any;
  /**
   * If supplied, the request is executed immediately and no gapi.client.HttpRequest object is returned
   */
  callback?: (() => any) | undefined;
}
