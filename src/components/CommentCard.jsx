import { useState } from "react";
import { Link } from "react-router-dom";
import CommentInput from "./CommentInput";
import * as api from "../api";
import * as utils from "../utils";

export default function CommentCard({
    comment,
    userLoggedIn,

    setIsCommentUpdatedSuccessfully,
    setIsCommentUpdatedMessageVisible,
    setIsCommentNotUpdatedMessageVisible,

    setIsCommentDeletedSuccessfully,
    setIsCommentDeletedMessageVisible,
    setIsCommentNotDeletedMessageVisible
}) {
    const [editCommentInput, setEditCommentInput] = useState(comment.comment);

    const [userIdsOfCommentLikes, setUserIdsOfCommentLikes] = useState(comment.comment_likes_from_user_ids);

    const [isCommentEditable, setIsCommentEditable] = useState(false);

    const [isEditAndDeleteCommentButtonsVisible, setIsEditAndDeleteCommentButtonsVisible] = useState(false);
    const [isDeleteCommentConfirmationMessageVisible, setIsDeleteCommentConfirmationMessageVisible] = useState(false);
    const [isReportCommentButtonVisible, setIsReportCommentButtonVisible] = useState(false);

    function onClickLikeComment() {
        let localLikes = [...userIdsOfCommentLikes];
        if (userIdsOfCommentLikes.includes(userLoggedIn.user_id)) {
            localLikes.splice(localLikes.indexOf(userLoggedIn.user_id), 1);
        }
        else {
            localLikes.push(userLoggedIn.user_id);
        }
        setUserIdsOfCommentLikes(localLikes);

        api.getCommentById(comment.comment_id)
            .then((response) => {
                let updatedLikes = response.comment_likes_from_user_ids;
                if (!localLikes.includes(userLoggedIn.user_id)) {
                    if (updatedLikes.includes(userLoggedIn.user_id)) {
                        updatedLikes.splice(updatedLikes.indexOf(userLoggedIn.user_id), 1);
                    }
                }
                else {
                    if (!updatedLikes.includes(userLoggedIn.user_id)) {
                        updatedLikes.push(userLoggedIn.user_id);
                    }
                }
                return api.updateComment(new Date(), comment.comment, updatedLikes, comment.comment_id)
            })
            .then((response) => {
                
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function onClickCommentOptionsButton() {
        setIsEditAndDeleteCommentButtonsVisible((currentEditAndDeleteCommentButtonsVisible) => {
            return !currentEditAndDeleteCommentButtonsVisible;
        });
        setIsReportCommentButtonVisible((currentIsReportCommentButtonVisible) => {
            return !currentIsReportCommentButtonVisible;
        });
    }

    function onClickEditCommentButton() {
        setIsCommentEditable(true);
        setIsEditAndDeleteCommentButtonsVisible(false);
    }

    function onClickCancelEditCommentButton() {
        setIsCommentEditable(false);
        setIsEditAndDeleteCommentButtonsVisible(false);
        setEditCommentInput(comment.comment);
    }

    function onClickUpdateCommentButton() {
        setIsCommentUpdatedSuccessfully(null);
        api.updateComment(new Date(), editCommentInput, comment.comment_likes_from_user_ids, comment.comment_id)
            .then((response) => {
                setEditCommentInput(editCommentInput);
                setIsCommentUpdatedSuccessfully(true);
                setIsCommentUpdatedMessageVisible(true);
                setTimeout(() => setIsCommentUpdatedMessageVisible(false), 3000);
            })
            .catch((error) => {
                setEditCommentInput(comment.comment);
                setIsCommentNotUpdatedMessageVisible(true);
                setIsCommentEditable(false);
                setTimeout(() => setIsCommentNotUpdatedMessageVisible(false), 3000);
            })
    }

    function onClickDeleteCommentButton() {
        setIsEditAndDeleteCommentButtonsVisible(false);
        setIsDeleteCommentConfirmationMessageVisible(true);
    }

    function onClickDeleteCommentNoButton() {
        setIsEditAndDeleteCommentButtonsVisible(false);
        setIsDeleteCommentConfirmationMessageVisible(false);
    }

    function onClickDeleteCommentYesButton() {
        setIsEditAndDeleteCommentButtonsVisible(false);
        setIsDeleteCommentConfirmationMessageVisible(false);

        setIsCommentDeletedSuccessfully(null);
        api.deleteComment(comment.comment_id)
            .then((response) => {
                setIsCommentDeletedSuccessfully(true);
                setIsCommentDeletedMessageVisible(true);
                setTimeout(() => setIsCommentDeletedMessageVisible(false), 3000);
            })
            .catch((error) => {
                setIsCommentNotDeletedMessageVisible(true);
                setTimeout(() => setIsCommentNotDeletedMessageVisible(false), 3000);
            })
    }

    function onClickReportCommentButton() {
        setIsReportCommentButtonVisible(false);
    }

    const styleEditAndDeleteCommentButtons = {
        display: isEditAndDeleteCommentButtonsVisible ? "initial" : "none"
    }

    const styleDeleteCommentConfirmationMessage = {
        display: isDeleteCommentConfirmationMessageVisible ? "initial" : "none"
    }

    const styleReportCommentButton = {
        display: isReportCommentButtonVisible ? "initial" : "none"
    }

    return (
        <div className="comment-card" loading="lazy">
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
                    <Link to={`/user/${comment.comment_owner_id}`}>
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
                    <Link to={`/user/${comment.comment_owner_id}`}>{comment.username}</Link>
                </div>
            }

            <div>{new Date(comment.comment_date).toLocaleDateString()}</div>
            <div>{new Date(comment.comment_date).toLocaleTimeString()}</div>
            
            {window.location.href.includes("/user")
                ? <Link to={`/post/${comment.comment_post_id}-${utils.convertTitleToUrl(comment.title)}`}><h2>{comment.title}</h2></Link>
                : null
            }
            
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
            
            <div>
                <button
                    className="like-button"
                    onClick={onClickLikeComment}
                    disabled={Object.keys(userLoggedIn).length === 0}
                >&#10084;&#65039;</button>
                <span>{userIdsOfCommentLikes.length}</span>
            </div>
        
            {Object.keys(userLoggedIn).length === 0
                ? null
                : <div
                    className="comment-options-button"
                    onClick={onClickCommentOptionsButton}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }

            {Object.keys(userLoggedIn).length === 0
                ? null
                : userLoggedIn.user_id === comment.comment_owner_id
                    ? <div>
                        <div style={styleEditAndDeleteCommentButtons}>
                            <button type="button" onClick={onClickEditCommentButton}>Edit</button>
                            <button type="button" onClick={onClickDeleteCommentButton}>Delete</button>
                        </div>
                        
                        <div style={styleDeleteCommentConfirmationMessage}>
                            <div>Delete comment?</div>
                            <button type="button" onClick={onClickDeleteCommentNoButton}>No</button>
                            <button type="button" onClick={onClickDeleteCommentYesButton}>Yes</button>
                        </div>
                    </div>
                    : <button type="button" onClick={onClickReportCommentButton} style={styleReportCommentButton}>Report</button>
            }
        </div>
    )
}