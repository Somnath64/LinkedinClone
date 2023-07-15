import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const postsRef = collection(firestore, "posts");
const userRef = collection(firestore, "users");
const likeRef = collection(firestore, "likes");
const commentRef = collection(firestore, "comments");
const connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatus = (setAllPosts) => {
  return onSnapshot(postsRef, (snapshot) => {
    setAllPosts(
      snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  return onSnapshot(userRef, (snapshot) => {
    setAllUsers(
      snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  return onSnapshot(singlePostQuery, (snapshot) => {
    setAllStatus(
      snapshot.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleuserQuery = query(userRef, where("email", "==", email));
  return onSnapshot(singleuserQuery, (snapshot) => {
    setCurrentUser(
      snapshot.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object) => {
  console.log(object);
  addDoc(userRef, object)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  return onSnapshot(userRef, (snapshot) => {
    setCurrentUser(
      snapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userId, payLoad) => {
  let userToEdit = doc(userRef, userId);

  updateDoc(userToEdit, payLoad)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);

    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLikesByUser = (userId, postId, setLiked, setLikeCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    return onSnapshot(likeQuery, (snapshot) => {
      const likes = snapshot.docs.map((doc) => doc.data());
      const likeCount = likes.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikeCount(likeCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (
  postId,
  comment,
  timeStamp,
  name,
  headline,
  imageLink
) => {
  try {
    addDoc(commentRef, {
      postId,
      comment,
      timeStamp,
      name,
      headline,
      imageLink,
    });
  } catch (err) {
    console.log(err);
    toast.error("Update your profile headline");
  }
};

export const getComment = (postId, setComments, setCommentCount) => {
  try {
    let singlePostQuery = query(commentRef, where("postId", "==", postId));

    return onSnapshot(singlePostQuery, (snapshot) => {
      const comments = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setComments(comments);

      const commentCount = comments.length;
      setCommentCount(commentCount);
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage: postImage });
    toast.success("Post has been updated successfully");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.dark("Post deleted successfully");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });
    toast.success("Connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    return onSnapshot(connectionsQuery, (snapshot) => {
      const connections = snapshot.docs.map((doc) => doc.data());
      const isConnected = connections.some(
        (connection) => connection.userId === userId
      );

      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};
