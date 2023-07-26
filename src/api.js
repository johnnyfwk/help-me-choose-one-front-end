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

export function getCommentsByPostId(post_id) {
    return baseURL
        .get(`/posts/${post_id}/comments`)
        .then((response) => {
            return response.data.comments;
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

export function postComment(comment_date, comment_updated, comment, comment_likes_from_user_ids, comment_post_id, comment_owner_id) {
    return baseURL
        .post("/comments", {comment_date, comment_updated, comment, comment_likes_from_user_ids, comment_post_id, comment_owner_id})
        .then((response) => {
            return response.data.comment;
        })
}
// POST requests

// PATCH requests
export function updatePost(post_updated, title, description, category, options_and_votes, post_id) {
    return baseURL
        .patch(`/posts/${post_id}`, {post_updated, title, description, category, options_and_votes})
        .then((response) => {
            return response.data.post;
        })
}
// PATCH requests
