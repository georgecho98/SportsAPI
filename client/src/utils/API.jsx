import type { User } from '../interfaces/User.jsx';
import type { Book } from '../interfaces/Book.jsx';

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
export const saveTeam = (teamData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(teamData),
  });
};

// remove saved book data for a logged in user
export const deleteTeam = (teamId, token) => {
  return fetch(`/api/users/books/${teamId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
