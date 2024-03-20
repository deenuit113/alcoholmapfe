module.exports = {
  async rewrites() {
    const BASE_URL = "https://api.greenbottle.site";
    return [
      {
        source: '/users/signup',
        destination: `${BASE_URL}/users/signup`,
      },
      {
        source: '/users/profile/:email',
        destination: `${BASE_URL}/users/profile/:userEmail`,
      },
      {
        source: '/users/place/review',
        destination: `${BASE_URL}/users/place/review`,
      },
      {
        source: '/users/profile',
        destination: `${BASE_URL}/users/profile`,
      },
      {
        source: '/users/login',
        destination: `${BASE_URL}/users/login`,
      },
      {
        source: '/place/review/:placeId',
        destination: `${BASE_URL}/place/review/:placeId`,
      }
    ];
  },
};