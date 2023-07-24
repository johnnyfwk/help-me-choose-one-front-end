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

export function getPostById(post_id) {
    return baseURL
        .get(`/posts/${post_id}`)
        .then((response) => {
            return response.data.post;
        })
}

export function getPostsByCategory(category) {
    return baseURL
        .get(`/posts/category/${category}`)
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

export function createPost(post_date, post_updated, title, description, category, options_and_votes, post_owner_id) {
    return baseURL
        .post("/posts", {post_date, post_updated, title, description, category, options_and_votes, post_owner_id})
        .then((response) => {
            return response.data.post;
        })
}
// POST requests