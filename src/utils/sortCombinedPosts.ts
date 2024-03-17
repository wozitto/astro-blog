const sortCombinedPosts = (combinedPosts: any[]) => {
  return combinedPosts.sort((a, b) => {
    return (
      new Date(b.pubDatetime).getTime() - new Date(a.pubDatetime).getTime()
    );
  });
};

export default sortCombinedPosts;
