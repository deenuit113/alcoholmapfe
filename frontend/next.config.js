module.exports = {
  async rewrites() {
    return [
      {
        source: '/users/signup',
        destination: `https://fbcc7292-503c-46b5-88a1-add73780962d.mock.pstmn.io/users/signup`,
      },
      {
        source: '/users/profile/:email',
        destination: `https://3d0a7f65-235c-4ea0-ac9c-e7c71a3abbea.mock.pstmn.io/users/profile/:userEmail`,
      },
      {
        source: '/users/place/review',
        destination: `https://fbcc7292-503c-46b5-88a1-add73780962d.mock.pstmn.io/users/place/review`,
      },
      {
        source: '/users/profile',
        destination: `https://9834bd63-44b8-4339-b0e3-4dc04a29ae41.mock.pstmn.io/users/profile`,
      },
      {
        source: '/users/login',
        destination: process.env.LOGIN_API_URL + '/users/login',
      },
      {
        source: '/users/place/reviewList',
        destination: 'https://63322b46-e4db-4cf3-824b-917a2a3607a0.mock.pstmn.io/users/place/reviewList',
      }
    ];
  },
};