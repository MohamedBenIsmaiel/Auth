export const userPath = {
  listUsers: '/list-users',
  viewProfile: '/view-profile',
  register: '/register'
};

export const saltRounds = 10; // used to generate salt for hashing password
export const invalidCharacters = new RegExp(/^.*[<>{}].*$/s);
export const allowedDomain = ['com', 'net', 'org', 'io', 'ai'];
