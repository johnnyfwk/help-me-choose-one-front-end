import axios from "axios";

const baseURL = axios.create({
    baseURL: "http://localhost:9090/api"
});

// GET requests
export function getUsers() {
    return baseURL
        .get("/users")
        .then((response) => {
            return response.data.users;
        })
}


export function getPosts() {
    return baseURL
        .get("/posts")
        .then((response) => {
            return response.data.posts;
        })
}

export function getPostsByCategory(category) {
    return baseURL
        .get(`/posts/${category}`)
        .then((response) => {
            return response.data.posts;
        })
}
// GET requests

// POST requests
export function addUser(username, password, avatar_url, join_date) {
    return baseURL
        .post("/users", {username, password, avatar_url, join_date})
        .then((response) => {
            return response.data.user;
        })
}
// POST requests