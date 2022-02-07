import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { useContract } from "../../context/ContractProvider";
import "./single.css";

export default function Single() {
  const { blogHash } = useParams()
  const [blog, setBlog] = useState()
  const { blogFactoryContract, userAccount } = useContract()
  console.log(blogHash)

  useEffect(async () => {
    if (!blogFactoryContract) return
    if (!blogHash) return

    const sBloghash = blogHash.toString()

    console.log(sBloghash)
    const ourBlog = await blogFactoryContract.methods.getBlogFromBlogHash(sBloghash).call()
    console.log(ourBlog)
    setBlog(ourBlog)
  }, [blogHash, blogFactoryContract])

  console.log(blog)
  return (
    <div className="single">
      <SinglePost blog={blog} />
      <Sidebar />
    </div>
  );
}
