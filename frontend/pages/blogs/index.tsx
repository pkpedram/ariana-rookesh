import { GetServerSideProps } from 'next';
import React from 'react'
import { wrapper } from '../../Core/Redux/store';

const BlogsPage = () => {
  return (
    <div>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {

    return {
        props:[]
    }
});
export default BlogsPage