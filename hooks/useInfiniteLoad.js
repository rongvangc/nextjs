import { useState, useRef, useCallback } from 'react';

const useInfiniteLoad = () => {
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastBookElementRef = useCallback((fetchMore, nextPage, endCursor, node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("visible");
        setLoading(true)
        {nextPage ? setLoading(true) : setLoading(false)}
        fetchMore({
          variables: {
            items: 9,
            after: endCursor
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult || !nextPage ) return prev;
            if (!nextPage ) return 
            return {
              posts: {
                __typename: "RootQueryToPostConnection",
                edges: [
                  ...prev.posts.edges,
                  ...fetchMoreResult.posts.edges
                ],
                pageInfo: fetchMoreResult.posts.pageInfo
              }
            }
          }
        })
        .then(() => setLoading(false))
      }
    }, [loading]);

    if (node) observer.current.observe(node);
  });

  return {
    lastBookElementRef
  }
}

export default useInfiniteLoad; 