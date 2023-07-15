import PostStatus from "./common/PostUpdate";

// eslint-disable-next-line react/prop-types
const HomePage = ({ currentUser }) => {
  return <PostStatus currentUser={currentUser} />;
};

export default HomePage;
