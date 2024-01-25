import { GetServerSideProps } from 'next';
import React from 'react'
import { RootState, wrapper } from '../../../Core/Redux/store';
import { apiConfig } from '../../../Core/Redux/constants';
import axios from 'axios';
import { connect } from 'react-redux';
import BlogFlex from '../../../Core/Components/BlogFlex';
import ContactUsForm from '../../../Core/Components/ContactUsForm/index';
import BreadCrumb from '../../../Core/Components/BreadCrumb';

const BlogId = ({blogInfo}:any) => {
    console.log(blogInfo)
  return (
    <div className='flex flex-col gap-6'>
        <BreadCrumb info={{name:blogInfo?.info?.title , link:`/blogs/blog/${blogInfo?.info?._id}`}} categories={[blogInfo?.info?.relatedBlogCategory]}/>
        <div className="flex lg:flex-col gap-10 p-8 bg-black">
            <div className="w-2/5 lg:w-full lg:h-[19rem] h-[16rem] rounded-xl">
              <img className=" object-cover rounded-xl !w-full !h-full" src={apiConfig.domain + blogInfo?.info?.image} alt="" />
            </div>
            <div className="flex flex-col lg:gap-6 justify-between text-white w-full">
               <h2 className="text-3xl font-bold">{blogInfo?.info?.title}</h2>
               <p className='text-justify'>{blogInfo?.info?.description}</p>
               <div className='flex items-center gap-3 text-sm text-[#979797]'>
                  <p>{new Date(blogInfo?.info?.created_date).toLocaleDateString("fa-ir",{year:'numeric',month:'numeric',day:'numeric'})}</p>
                  <p>{blogInfo?.info?.readingTime}</p>
                  <p>{parseInt(blogInfo?.info?.seenCount).toLocaleString("fa-ir")} دیدگاه</p>
               </div>
            </div>
        </div>
        <div className='p-8'>
          <p className='text-justify'>{blogInfo?.info?.content}</p>
        </div>
        <div className="bg-black pb-6 pt-2">
          <BlogFlex items={blogInfo?.relatedPosts}  color="white"/>
        </div>
        <div>
          <ContactUsForm/>
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


    const blogInfoRes = await axios.get(apiConfig.baseUrl + `blogPost/${query?.blogId}`)

    // const blogHomeRes = await axios.get(apiConfig.baseUrl + "blog/home")

    

    store.dispatch({
      type:"blogInfo",
      payload:JSON.stringify(blogInfoRes?.data),
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