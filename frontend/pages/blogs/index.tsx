import { GetServerSideProps } from 'next';
import React from 'react'
import { RootState, wrapper } from '../../Core/Redux/store';
import BlogGrid from '../../Core/Components/BlogGrid';
import { apiConfig } from '../../Core/Redux/constants';
import axios from 'axios';
import { connect } from 'react-redux';
import BlogFlex from '../../Core/Components/BlogFlex';

const BlogsPage = ({blogHome}:any) => {
  console.log(blogHome)
  return (
    <div>
        <BlogGrid items={blogHome?.newest} title="جدیدترین‌ها" color="black"/>
        <div className='bg-black py-5'>
          <BlogFlex items={blogHome?.mostSeen} title="محبوب ترین ها" color="white" isMore/>
        </div>
        {
          blogHome.categories.map((item:any)=>(
            <>
              <BlogGrid items={item?.newest} color="black" title={`جدیدترین‌ها ${item?.title}`} isMore/>
              <div  className='bg-black py-5'>
                <BlogFlex items={item?.mostSeen} title={`محبوب ترین ها ${item?.title}`}  color="white" isMore/>
              </div>
            </>
          ))
        }
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{}> =
  wrapper.getServerSideProps((store) => async ({ query }) => {

    const res = await fetch(apiConfig.baseUrl + "generalSetting", {
      cache: "force-cache",
    });
    const data = await res.json();


    const blogHomeRes = await axios.get(apiConfig.baseUrl + "blog/home")

    

    store.dispatch({
      type:"blogHome",
      payload:JSON.stringify(blogHomeRes.data),
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
  blogHome:state.blogState.blogHome
})
export default connect(mapStatToProps)(BlogsPage)