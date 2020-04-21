import Activity from "../models/Activity";
import User from "../models/User";
import Group from "../models/Group";
import Post from "../models/Post";
import mongoose from "mongoose";

export const connectToMongoDB = async (password) => {
  const mongoUri = `mongodb+srv://admin:${password}@twlatlas-iprie.gcp.mongodb.net/test?retryWrites=true&w=majority`;
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const getUsers = async (_groupId) => {
  return await User.find({ groupId: { $elemMatch: _groupId } });
};

export const getUser = async (_userId) => {
  return await User.findById(_userId);
  // Users.find((user) => user.id === userId);
};

export const getGroups = async (_title) => {
  // console.log("title is ", title);
  // if (title !== undefined)
  //   return Groups.filter((group) => group.title.includes(title));
  // return Groups;
  if (_title !== undefined)
    return await Group.find({ title: { $regex: `.*${_title}.*` } });
  return await Group.find();
};

export const getGroup = async (_groupId) => {
  // Groups.find((group) => group.id === groupId);
  return await Group.findById(_groupId);
};

export const getPosts = async (_groupId) => {
  // Posts.filter((post) => post.groupId === groupId);
  return await Post.find({ groupId: { $elemMatch: _groupId } });
};

export const getPost = async (_postId) => {
  // Posts.find((post) => post.id === _postId);
  return await Post.findById(_postId);
};

export const getActivities = async (_postId, _userId) => {
  if (_postId === undefined && _userId === undefined) {
    return await Activity.find();
  } else if (_postId !== undefined && _userId === undefined) {
    // return Activities.filter((activity) => activity.postId === _postId);
    return await Activity.find({ postId: _postId });
  } else if (_postId === undefined && _userId !== undefined) {
    // return Activities.filter((activity) => activity.userId === _userId);
    return await Activity.find({ userId: _userId });
  } else if (_postId !== undefined && _userId !== undefined) {
    // return Activities.filter(
    //   (activity) => activity.postId === _postId && activity.userId === _userId
    // );
    return await Activity.find({ userId: _userId, postId: _postId });
  }
};

export const getActivity = async (_activityId) => {
  // Activities.find((activity) => activity.id === activityId);
  return await Activity.findById(_activityId);
};

export const addGroup = async (groupObject) => {
  const { title, description, userId, postId } = groupObject;
  const group = new Group({
    title,
    description,
    userId,
    postId,
  });
  const savedGroup = await group.save({ setDefaultsOnInsert: true });
  console.log("Group Saved :", savedGroup);
};

export const addUser = async (userObject) => {
  const { name, profile_image, groupId, activityId } = userObject;
  const user = new User({
    name,
    profile_image,
    groupId,
    activityId,
  });
  const savedUser = await user.save({ setDefaultsOnInsert: true });
  console.log("User Saved :", savedUser);
};

export const addPost = async (postObject) => {
  const { date, activityId } = postObject;
  const post = new Post({
    date,
    activityId,
  });
  const savedPost = await post.save({ setDefaultsOnInsert: true });
  console.log("Post Saved :", savedPost);
};

export const addActivity = async (activityObject) => {
  const { userId, createdAt, modifiedAt, text } = activityObject;
  const activity = new Activity({
    userId,
    createdAt,
    modifiedAt,
    text,
  });
  const savedActivity = await activity.save({ setDefaultsOnInsert: true });
  console.log("Activity Saved :", savedActivity);
};
