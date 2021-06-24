import { createPost } from './post.js';

const SIMILAR_POST_COUNT = 25;

//Создание массива с постами
const similarPost = new Array(SIMILAR_POST_COUNT).fill(null).map(() => createPost());

similarPost;
