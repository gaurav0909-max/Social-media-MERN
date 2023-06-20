import client, { METHODS } from "./client";

export const api = {
  auth: {
    login: (params) =>
      client({
        url: "users/login",
        data: params,
        method: METHODS.POST,
      }),
    register: (params) =>
      client({
        url: "users/register",
        data: params,
        method: METHODS.POST,
      }),
  },
  profile: {
    getByToken: (params) =>
      client({
        url: "users/profile",
        data: params,
        method: METHODS.GET,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getByUserName: (userName, params) =>
      client({
        url: `users/${userName}`,
        data: params,
        method: METHODS.GET,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    put: (params) =>
      client({
        url: "users/profile",
        data: params,
        method: METHODS.PUT,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },
  search: {
    get: (name, params) =>
      client({
        url: `users/search?${name}`,
        data: params,
        method: METHODS.GET,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },
  myPost: {
    post: (params) => {
      return client({
        url: "posts",
        data: params,
        method: METHODS.POST,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    get: (params) =>
      client({
        url: "posts",
        method: METHODS.GET,
        data: params,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getByName: (userName, params) =>
      client({
        url: `posts/user/${userName}`,
        method: METHODS.GET,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    delete: (id, params) =>
      client({
        url: `posts/${id}`,
        method: METHODS.DELETE,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    edit: (data) =>
      client({
        url: `posts/${data.id}`,
        data:{caption:data.caption},
        method: METHODS.PUT,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },

  like: {
    post: (id, params) =>
      client({
        url: `posts/${id}/like`,
        method: METHODS.POST,
        data: params,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },
  Comment: {
    post: (id, params) =>
      client({
        url: `posts/${id}/comment`,
        method: METHODS.POST,
        data: params,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    get: (id, params) =>
      client({
        url: `posts/${id}/comments`,
        method: METHODS.GET,
        data: params,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },

  followers: {
    get: (id, params) =>
      client({
        url: `users/${id}/followers`,
        method: METHODS.GET,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },

  following: {
    get: (id, params) =>
      client({
        url: `users/${id}/following`,
        method: METHODS.GET,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },

  follow: {
    post: (id, params) =>
      client({
        url: `users/${id}/follow`,
        method: METHODS.POST,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },

  unfollow: {
    post: (id, params) =>
      client({
        url: `users/${id}/unfollow`,
        method: METHODS.DELETE,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  },
};
