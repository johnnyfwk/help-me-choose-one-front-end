import { useState } from "react";
import { Link } from "react-router-dom";
import CommentInput from "./CommentInput";
import * as api from "../api";

export default function CommentCard({comment, userLoggedIn, setIsCommentUpdatedSuccessfully}) {
    const [isCommentOptionsBoxVisible, setIsCommentOptionsBoxVisible] = useState(false);
    const [isCommentEditable, setIsCommentEditable] = useState(false);
    const [editCommentInput, setEditCommentInput] = useState("");

    function onClickCommentOptionsButton() {
        setIsCommentOptionsBoxVisible((currentIsCommentOptionsBoxVisible) => {
            return !currentIsCommentOptionsBoxVisible;
        });
    }

    function onClickCloseCommentBox() {
        setIsCommentOptionsBoxVisible(false);
    }

    function onClickEditComment() {
        setIsCommentEditable(true);
        setIsCommentOptionsBoxVisible(false);
        setEditCommentInput(comment.comment)
    }

    function onClickReportComment() {
        console.log("Report comment clicked");
    }

    function onClickCancelEditCommentButton() {
        setIsCommentEditable(false);
    }

    function onClickUpdateCommentButton() {
        console.log(comment, "<-------- comment")
        console.log(new Date())
        console.log(editCommentInput, "<-------- editCommentInput")
        console.log(comment.comment_id, "<-------- comment.comment_id")
        setIsCommentUpdatedSuccessfully(null);
        api.updateComment(new Date(), editCommentInput, comment.comment_likes_from_user_ids, comment.comment_id)
            .then((response) => {
                console.log(response);
                setIsCommentUpdatedSuccessfully(true);
            })
            .catch((error) => {
                console.log(error);
                setIsCommentUpdatedSuccessfully(false);
            })
    }

    const styleCommentOptionsBox = {
        bottom: isCommentOptionsBoxVisible ? "0%" : "-100%"
    }

    console.log(comment)

    return (
        <div className="comment-card" loading="lazy">
            {/* {comment.avatar_url === "default-avatar.webp"
                ? <img
                    src={require(`../assets/images/avatars/${comment.avatar_url}`)}
                    alt="Avatar"
                />
                : <img
                    src={comment.avatar_url}
                    alt="Avatar"
                />
            } */}

            {Object.keys(userLoggedIn).length === 0
                ? <div>
                    <img src={
                            comment.avatar_url === "default-avatar.webp"
                                ? require(`../assets/images/avatars/${comment.avatar_url}`)
                                : comment.avatar_url
                        }
                        alt="Avatar"
                        className="post-avatar"
                    />
                    <div>{comment.username}</div>
                </div>                
                : <div>
                    <Link to={`/users/${comment.comment_owner_id}`}>
                        <img
                            src={
                                comment.avatar_url === "default-avatar.webp"
                                    ? require(`../assets/images/avatars/${comment.avatar_url}`)
                                    : comment.avatar_url
                            }
                            alt="Avatar"
                            className="post-avatar"
                        />
                    </Link>
                    <Link to={`/users/${comment.comment_owner_id}`}>{comment.username}</Link>
                </div>
            }

            <div>{new Date(comment.comment_date).toLocaleDateString()}</div>
            <div>{new Date(comment.comment_date).toLocaleTimeString()}</div>
            
            {isCommentEditable
                ? <div>
                    <CommentInput
                        commentInput={editCommentInput}
                        setCommentInput={setEditCommentInput}
                    />
                    <div>
                        <button
                            type="button"
                            onClick={onClickCancelEditCommentButton}
                        >Cancel</button>
                        <button
                            type="button"
                            onClick={onClickUpdateCommentButton}
                            disabled={!editCommentInput}
                        >Update</button>
                    </div>
                </div>
                : <p>{comment.comment}</p>
            }
            
            <div>Likes: {comment.comment_likes_from_user_ids.length}</div>
            {userLoggedIn.user_id === comment.comment_owner_id
                ? <div>
                    <div className="comment-options-button" onClick={onClickCommentOptionsButton}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div id="comment-options-box" style={styleCommentOptionsBox}>
                        <div onClick={onClickCloseCommentBox}>x</div>
                        <div onClick={onClickEditComment}>Edit</div>
                        <div onClick={onClickReportComment}>Report</div>
                    </div>
                </div>
                : null
            }
            
        </div>
    )
}