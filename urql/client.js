import { createClient } from 'urql';

const client = createClient({
  url: `${process.env.NEXT_PUBLIC_ENV_WORDPRESS}/graphql`,
});

export default client