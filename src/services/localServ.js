const USER = "USER";

export const localServ = {
  user: {
    set: (loginData) => {
      localStorage.setItem(USER, JSON.stringify(loginData));
    },
    get: () => {
      let localData = localStorage.getItem(USER);
      if (localData) {
        return JSON.parse(localData);
      }
      return null;
    },
    remove: () => {
      localStorage.removeItem(USER);
    },
  },
};
