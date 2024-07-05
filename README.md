## React & Express.js Authentication with Refresh token

In this implementation, the refresh token is stored in cookies and validated when the access token, saved in the app memory, expires. The access token is short-lived, while the refresh token remains valid for one day. Each time a new access token is issued, the refresh token is also updated to enhance security. The user is validated within their dashboard, ensuring they remain logged in upon successful authentication.

#### How to use this repo:

- Clone this repo with `git clone`
- Run `npm i` from `./client` and `./server` folders to install all dependencies
- In `./server`, create `.env` file with following variables (you can use local database) :
  - PORT
  - MONGO_URI
  - JWT_SECRET_ACCESS
  - JWT_SECRET_REFRESH
- Run `./client` with `npm start` and `./server` with `node index.js`
