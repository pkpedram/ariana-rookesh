import { GetServerSideProps } from 'next';
import React from 'react'
import { RootState, wrapper } from '../../../Core/Redux/store';
import { apiConfig } from '../../../Core/Redux/constants';
import axios from 'axios';
import { connect } from 'react-redux';

const BlogId = ({blogInfo}:any) => {
    console.log(blogInfo)
  return (
    <div>BlogId</div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {

    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();


    const blogInfoRes = await axios.get(apiConfig.baseUrl + `blogPost/${query?.blogId}`)

    // const blogHomeRes = await axios.get(apiConfig.baseUrl + "blog/home")

    

    store.dispatch({
      type:"blogInfo",
      payload:JSON.stringify(blogInfoRes.data),
    });

    store.dispatch({
      type: "generalSetting",
      payload: JSON.stringify(data.result[0]),
    });
    return {
        props:{}
    }
});

const mapStatToProps = (state:RootState) =>({
    blogInfo:state.blogState.blogInfo
})

export default connect(mapStatToProps)(BlogId)