import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import {
  HiDotsHorizontal,
  HiHeart,
  HiOutlineHeart,
  HiOutlineBookmark,
  HiOutlineChat,
  HiOutlineEmojiHappy,
} from "react-icons/hi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

export default function Post({ img, userImg, caption, username, id }) {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);
  async function likePost() {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  }

  async function sendComment(e) {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }
  return (
    <div className="bg-white my-7 border-2 rounded-md">
      <div className="flex items-center p-4 border-b-2 border-gray-200">
        <img
          className="h-14 rounded-full object-cover border p-1 mr-3"
          src={userImg}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "../images/default-avatar.webp";
          }}
          alt={username}
        />
        <p className="font-bold flex-1">{username}</p>
        <HiDotsHorizontal size="1.5em" />
      </div>

      <img
        className="object-cover w-full border-b-2 "
        src={img}
        alt="post image"
      />

      {session && (
        <div className="flex justify-between px-3 pt-4">
          <div className="flex space-x-1">
            {liked ? (
              <HiHeart
                onClick={likePost}
                size="2.5em"
                className="text-red-400 btn"
              />
            ) : (
              <HiOutlineHeart onClick={likePost} size="2.5em" className="btn" />
            )}

            <HiOutlineChat size="2.5em" className="btn" />
          </div>
          <HiOutlineBookmark size="2.5em" className="btn" />
        </div>
      )}

      <div className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </div>
      {comments.length > 0 && (
        <div className="mx-5 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div
              key={comment.data().id}
              className="flex items-center space-x-2 mb-2"
            >
              <img
                className="h-7  rounded-full object-cover"
                src={comment.data().userImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "../images/default-avatar.webp";
                }}
                alt="user-image"
                referrerPolicy="noreferrer"
              />
              <p className="font-semibold">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center p-4">
          <HiOutlineEmojiHappy size="2em" />
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="border-none flex-1 focus:ring-0"
            type="text"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            onClick={sendComment}
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
