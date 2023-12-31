import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    setIsCommentNotDeletedMessageVisible,
    setIsEditAndDeletePostButtonsContainerVisible
}) {
    const commentDisplayMaxLength = 300;
    const [commentToDisplay, setCommentToDisplay] = useState("");
    const [isFullCommentVisible, setIsFullCommentVisible] = useState(null);

    const [editCommentInput, setEditCommentInput] = useState(comment.comment);

    const [userIdsOfCommentLikes, setUserIdsOfCommentLikes] = useState(comment.comment_likes_from_user_ids);

    const [isCommentEditable, setIsCommentEditable] = useState(false);

    const [isCommentOptionsButtonVisible, setIsCommentOptionsButtonVisible] = useState(true);
    const [isEditAndDeleteCommentButtonsVisible, setIsEditAndDeleteCommentButtonsVisible] = useState(false);
    const [isDeleteCommentConfirmationMessageVisible, setIsDeleteCommentConfirmationMessageVisible] = useState(false);
    const [isReportCommentButtonVisible, setIsReportCommentButtonVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsFullCommentVisible(null);
        if (comment.comment.length > commentDisplayMaxLength) {
            setCommentToDisplay(comment.comment.slice(0, commentDisplayMaxLength) + "...");
            setIsFullCommentVisible(false);
        }
        else {
            setCommentToDisplay(comment.comment);
            setIsFullCommentVisible(null);
        }
    }, [])

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
                return api.updateComment(new Date(), comment.comment, updatedLikes, comment.comment_id);
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
        setIsEditAndDeletePostButtonsContainerVisible(false);
    }

    function onClickEditCommentButton() {
        setIsCommentOptionsButtonVisible(false);
        setIsCommentEditable(true);
        setIsEditAndDeleteCommentButtonsVisible(false);
    }

    function onClickCancelEditCommentButton() {
        setIsCommentOptionsButtonVisible(true);
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
        setIsCommentOptionsButtonVisible(false);
        setIsEditAndDeleteCommentButtonsVisible(false);
        setIsDeleteCommentConfirmationMessageVisible(true);
    }

    function onClickDeleteCommentNoButton() {
        setIsCommentOptionsButtonVisible(true);
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
        navigate(`/report/?report_owners_id=${userLoggedIn.user_id}&report_owners_name=${userLoggedIn.username}&post_id=${comment.comment_post_id}&post_owners_id=null&post_owners_name=&comment_id=${comment.comment_id}&comment_owners_id=${comment.comment_owner_id}&comment_owners_name=${comment.username}`);
        window.scrollTo(0, 0);
    }

    function onClickShowMoreCommentButton() {
        setCommentToDisplay(comment.comment);
        setIsFullCommentVisible(true);
    }

    function onClickShowLessCommentButton() {
        setCommentToDisplay(comment.comment.slice(0, commentDisplayMaxLength) + "...");
        setIsFullCommentVisible(false);
    }

    const styleComment = {
        display: "inline-block",
        verticalAlign: "end"
    }

    const styleCommentOptionsButton = {
        display: isCommentOptionsButtonVisible ? "grid" : "none"
    }

    const styleEditAndDeleteCommentButtons = {
        display: isEditAndDeleteCommentButtonsVisible ? "flex" : "none"
    }

    const styleDeleteCommentConfirmationMessage = {
        display: isDeleteCommentConfirmationMessageVisible ? "grid" : "none"
    }

    const styleReportCommentButton = {
        display: isReportCommentButtonVisible ? "initial" : "none"
    }

    const styleUpdateCommentButton = {
        opacity: !editCommentInput ? "0.3" : "1"
    }

    const styleShowLessOrMoreText = {
        color: "#868785",
        cursor: "pointer"
    }

    return (
        <div className="comment-card" loading="lazy">
            {Object.keys(userLoggedIn).length === 0
                ? <div className="comment-card-avatar-username-options-button">
                    <div className="comment-card-avatar-username">
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
                </div>                
                : <div className="comment-card-avatar-username-options-button">
                    <div className="comment-card-avatar-username">
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
                    <div
                        className="comment-card-options-button"
                        onClick={onClickCommentOptionsButton}
                        style={styleCommentOptionsButton}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
            
            {window.location.href.includes("/user")
                ? <Link
                    to={`/post/${comment.comment_post_id}-${utils.convertTitleToUrl(comment.title)}`}
                    className="comment-card-post-title-link"
                >
                    <h2>{comment.title}</h2>
                </Link>
                : null
            }
            
            {isCommentEditable
                ? <div id="comment-card-input-and-buttons">
                    <CommentInput
                        commentInput={editCommentInput}
                        setCommentInput={setEditCommentInput}
                    />
                    <div id="comment-card-cancel-and-update-buttons">
                        <button
                            type="button"
                            onClick={onClickCancelEditCommentButton}
                        >Cancel</button>
                        <button
                            type="button"
                            onClick={onClickUpdateCommentButton}
                            disabled={!editCommentInput}
                            style={styleUpdateCommentButton}
                        >Update</button>
                    </div>
                </div>
                : <p style={styleComment}>{commentToDisplay} {isFullCommentVisible === null
                    ? null
                    : isFullCommentVisible === false
                        ? <span style={styleShowLessOrMoreText} onClick={onClickShowMoreCommentButton}>(show more)</span>
                        : <span style={styleShowLessOrMoreText} onClick={onClickShowLessCommentButton}>(show less)</span>
                    }
                </p>
                
            }
            
            <div className="comment-card-like-button-likes-date">
                <div className="comment-card-like-button-likes">
                    <button
                        className="like-button"
                        onClick={onClickLikeComment}
                        disabled={Object.keys(userLoggedIn).length === 0}
                    >&#10084;&#65039;</button>
                    <span>{userIdsOfCommentLikes.length}</span>
                </div>
                <div>{new Date(comment.comment_date).toLocaleDateString()}</div>
                <div>{new Date(comment.comment_date).toLocaleTimeString()}</div>
            </div>

            {Object.keys(userLoggedIn).length === 0
                ? null
                : userLoggedIn.user_id === comment.comment_owner_id
                    ? <div>
                        <div id="comment-card-edit-and-delete-buttons" style={styleEditAndDeleteCommentButtons}>
                            <button type="button" onClick={onClickEditCommentButton}>Edit</button>
                            <button type="button" onClick={onClickDeleteCommentButton}>Delete</button>
                        </div>
                        <div id="comment-card-delete-comment-confirmation-message" style={styleDeleteCommentConfirmationMessage}>
                            <div>Delete comment?</div>
                            <div id="comment-card-delete-comment-buttons">
                                <button type="button" onClick={onClickDeleteCommentNoButton}>No</button>
                                <button type="button" onClick={onClickDeleteCommentYesButton}>Yes</button>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <button
                            type="button"
                            onClick={onClickReportCommentButton}
                            style={styleReportCommentButton}
                        >Report</button>
                    </div>
                        
            }
        </div>
    )
}