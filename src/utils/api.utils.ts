export const baseQuery = {
     baseUrl: process.env.REACT_APP_URL,
     prepareHeaders: (headers: Headers) => {
          headers.set("Authorization", (localStorage.getItem("admin_token") as string) || `{}`);
     },
};
