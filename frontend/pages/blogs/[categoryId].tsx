import { GetServerSideProps } from 'next';
import React from 'react'
import { RootState, wrapper } from '../../Core/Redux/store';
import { apiConfig } from '../../Core/Redux/constants';
import axios from 'axios';
import { connect } from 'react-redux';
import BlogItem from '../../Core/Components/BlogItem';

const BlogCategoryId = ({ blogList , blogCategoryInfo }: any) => {
    // console.log(blogCategoryInfo)
  return (
    <div className='flex flex-col gap-8'>
        <div className='bg-black p-4 text-white flex flex-col gap-4 smmd:!p-0'>
            <h3 className='text-2xl font-bold'>{blogCategoryInfo?.title}</h3>
            <p className='text-justify'>{blogCategoryInfo?.description}</p>
        </div>
        <div className='p-4 flex flex-col gap-4 smmd:!p-0'>
            <h3 className='text-2xl font-bold'>دسته بندی موضوعی {blogCategoryInfo?.title}:</h3>
            <div className='grid grid-cols-3 gap-10 lg:grid-cols-2 sm:grid-cols-1'>
                {
                    blogList.map((item:any)=>(
                        <BlogItem item={item} isMain color="black"/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {

    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();


    // const blogInfoRes = await axios.get(apiConfig.baseUrl + `blogPost/${query?.blogId}`)

    // const blogHomeRes = await axios.get(apiConfig.baseUrl + "blog/home")

    const blogByCategoryRes = await axios.get(apiConfig.baseUrl + `blogPost?relatedBlogCategory=${query?.categoryId}`)
    const blogCategoryRes = await axios.get(apiConfig.baseUrl + `blogCategory/${query?.categoryId}`)
    

    store.dispatch({
      type:"blogCategoryInfo",
      payload:JSON.stringify(blogCategoryRes?.data),
    });
    store.dispatch({
      type:"blogCategory",
      payload:JSON.stringify(blogByCategoryRes?.data),
    });

    store.dispatch({
      type: "generalSetting",
      payload: JSON.stringify(data.result[0]),
    });
    return {
        props:{}
    }
});

const mapStateToProps = (state:RootState) => ({
    blogList:state.blogState.blogList,
    blogCategoryInfo:state.blogState.blogCategoryInfo
})


export default connect(mapStateToProps)(BlogCategoryId)