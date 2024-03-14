module.exports = {
  async rewrites() {
    return [
      {
        source: '/users/signup',
        destination: `https://fbcc7292-503c-46b5-88a1-add73780962d.mock.pstmn.io/users/signup`,
      },
      {
        source: '/users/profile/:email',
        destination: `https://fbcc7292-503c-46b5-88a1-add73780962d.mock.pstmn.io/users/profile/:userEmail`,
      },
      {
        source: '/users/place/review',
        destination: `https://0901bced-93ba-491a-9e8f-8bdd4e98870f.mock.pstmn.io/users/place/review`,
      },
      {
        source: '/users/profile',
        destination: `https://0901bced-93ba-491a-9e8f-8bdd4e98870f.mock.pstmn.io/users/profile`,
      },
      {
        source: '/users/login',
        destination: 'https://fbcc7292-503c-46b5-88a1-add73780962d.mock.pstmn.io/users/login',
      }
    ];
  },
};