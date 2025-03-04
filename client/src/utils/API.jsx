

// route to get logged in user's info (needs the token)
// export const getMe = (token: string) => {
//   return fetch('/api/users/me', {
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const createUser = (userData: User) => {
//   return fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// export const loginUser = (userData: User) => {
//   return fetch('/api/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
// };

// save book data for a logged in user
// export const saveTeam = (teamData, token) => {
//   return fetch('/api/team', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: `Bearer ${token}`,
//       authorization: process.env.YOUR_API_KEY
//     },
//     body: JSON.stringify(teamData),
//   });
// };

// // remove saved book data for a logged in user
// export const deleteTeam = (teamId, token) => {
//   return fetch(`/api/users/teams/${teamId}`, {
//     method: 'DELETE',
//     headers: {
//       authorization: `Bearer ${token}`,
//       authorization: process.env.YOUR_API_KEY
//     },
//   });
// };

export const saveAllTeam = (_query) => {
  return fetch('https://api.balldontlie.io/v1/teams', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
       authorization: process.env.YOUR_API_KEY
    },
    body: JSON.stringify(teamData),
  });
};

export const saveTeam = (query) => {
  return fetch(`https://api.balldontlie.io/v1/teams/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
       authorization: process.env.YOUR_API_KEY
    },
    body: JSON.stringify(teamData),
  });
};


// remove saved book data for a logged in user
export const deleteTeam = (teamId) => {
  return fetch(`https://api.balldontlie.io/v1/teams/${teamId}`, {
    method: 'DELETE',
    headers: {
      authorization: process.env.YOUR_API_KEY
    },
  });
};

// make a search to google books api

export const searchSport = (query) => {
  return fetch(`https://api.balldontlie.io/v1/teams${query}`);
};
