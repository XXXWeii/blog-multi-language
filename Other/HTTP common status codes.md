---
title: HTTP common status codes
lang: en-US
date: 2022-03-05 15:18:00
author: XXXWeii
tags:
  - Other
---

![HTTP 常见的状态码](./images/status.png "HTTP 常见的状态码")

## 1. What is it?

---

HTTP Status Code (English: HTTP Status Code), a 3-digit code used to indicate the response status of the web service Hypertext Transfer Protocol

It is defined by the RFC2616 specification and is extended by `RFC 2518`, `RFC 2817`, `RFC 2295`, `RFC 2774` and `RFC 4918`

Simply put, the `http` status code is used by the server to tell the client the status of the current request response, and the status code can be used to judge and analyze the running status of the server

## 2. classification

---

The first digit of the status code determines the different response statuses, as follows:

- 1 for message
- 2 for success
- 3 means redirect
- 4 means request error
- 5 means server error

###1xx

The representative request has been accepted and needs to be processed further. This type of response is a provisional response, containing only a status line and some optional response header information, and ends with a blank line

The common ones are:

- 100 (the client continues to send the request, this is a provisional response): This provisional response is used to inform the client that part of its request has been received by the server and has not yet been rejected. The client SHOULD continue to send the remainder of the request, or ignore the response if the request has already been completed. The server MUST send a final response to the client after the request is complete
- 101: The server switches the protocol according to the client's request, mainly used for websocket or http2 upgrade

###2xx

Indicates that the request has been successfully received, understood, and accepted by the server

The common ones are:

- 200 (success): The request has been successful, and the response header or data body expected by the request will be returned with this response
- 201 (Created): The request was successful and the server created a new resource
- 202 (Created): The server has received the request but has not yet processed it
- 203 (Unauthorized Information): The server successfully processed the request, but the returned information may have come from another source
- 204 (No Content): The server successfully processed the request, but did not return any content
- 205 (Reset Content): The server successfully processed the request, but did not return any content
- 206 (Partial Content): The server successfully processed part of the request

###3xx

Indicates that further action is required to complete the request. Typically, these status codes are used to redirect

The common ones are:

- 300 (multiple choices): The server can perform various operations in response to the request. The server can choose an operation according to the requester (user agent), or provide a list of operations for the requester to choose
- 301 (Moved Permanently): The requested web page has been permanently moved to a new location. When the server returns this response (in response to a GET or HEAD request), it automatically forwards the requester to the new location
- 302 (temporarily moved): The server is currently responding to requests from web pages in different locations, but the requester should continue to use the original location for future requests
- 303 (See other location): This code is returned by the server when the requester should use separate GET requests for different locations to retrieve the response
- 305 (Using Proxy): The requester can only use a proxy to access the requested web page. If the server returns this response, it also indicates that the requester should use a proxy
- 307 (temporary redirection): The server is currently responding to requests from web pages in different locations, but the requester should continue to use the original location for future requests

###4xx

Indicates that the client appears to have encountered an error, preventing the server from processing

The common ones are:

- 400 (Bad Request): The server did not understand the syntax of the request
- 401 (Unauthorized): The request requires authentication. The server might return this response for web pages that require a login.
- 403 (Forbidden): The server rejected the request
- 404 (Not Found): The server cannot find the requested resource
- 405 (Method Forbidden): The method specified in the request is disabled
- 406 (Not Accepted): Unable to respond to the requested webpage with the requested content attributes
- 407 (Proxy Authorization Required): This status code is similar to 401 (Unauthorized), but specifies that the requester should be authorized to use the proxy
- 408 (Request Timeout): The server timed out while waiting for the request

###5xx

Indicates that the server was unable to complete an apparently valid request. This type of status code represents that the server has an error or an abnormal state in the process of processing the request.

The common ones are:

- 500 (Internal Server Error): The server encountered an error and could not complete the request
- 501 (not yet implemented): The server is not capable of fulfilling the request. For example, the server might return this code if it doesn't recognize the request method
- 502 (Bad Gateway): The server is acting as a gateway or proxy and received an invalid response from an upstream server
- 503 (Service Unavailable): The server is currently unavailable (due to overloading or down for maintenance)
- 504 (Gateway Timeout): The server is acting as a gateway or proxy, but did not receive the request from the upstream server in time
- 505 (HTTP version not supported): The server does not support the HTTP protocol version used in the request

## 3. Applicable scenarios

---

The applicable scenarios of some status codes are given below:

- 100: Before sending POST data to the server, the client consults the server to see if the server processes the POST data. If not, the client does not upload the POST data. If it does, the POST uploads the data. Commonly used for POST large data transmission
- 206: Generally used for resuming uploads, or loading large files such as video files
- 301: Permanent redirects are cached. The new domain name replaces the old domain name. When the old domain name is no longer in use, users will be redirected to the new domain name with 301 when accessing the old domain name.
- 302: Temporary redirection will not be cached. It is often used for non-logged-in users to access the user center and redirect to the login page
- 304: Negotiate caching, tell the client that there is a cache, and use the data in the cache directly. Only the header information is returned to the page, and there is no content part
- 400: The parameter is incorrect and the request cannot be recognized by the server
- 403: Tell the client to access the site or resource, such as in the external network environment, and then return when only the internal network IP can be accessed
- 404: When the server cannot find the resource, or when the server refuses the request and does not want to explain the reason
- 503: When the server is down for maintenance, actively use 503 to respond to the request or nginx sets the speed limit. If the speed limit is exceeded, 503 will be returned
- 504: Gateway Timeout