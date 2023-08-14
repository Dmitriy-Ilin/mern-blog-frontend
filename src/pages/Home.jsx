import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, fetchPosts, fetchPostsByViews, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts, tags, comments } = useSelector(state => state.posts);
  const [tabsValue, setTabsValue] = useState(0);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';

  useEffect(() => {
    if (tabsValue === 0) {
      dispatch(fetchPosts());
    } else if (tabsValue === 1) {
      dispatch(fetchPostsByViews())
    }
    dispatch(fetchComments())
    dispatch(fetchTags());
  }, [tabsValue]);


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tabsValue} aria-label="basic tabs example">
        <Tab label="Новые" onClick={() => setTabsValue(0)}/>
        <Tab label="Популярные" onClick={() => setTabsValue(1)}/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? <Post key={index} isLoading={true}/> : 
          (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}`: ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments.length}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            comments={comments.items} 
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
