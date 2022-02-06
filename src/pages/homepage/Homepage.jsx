import { useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContract } from "../../context/ContractProvider";
import "./homepage.css";

export default function Homepage() {
  const location = useLocation();
  console.log(location);
  const { blogFactoryContract, userAccount } = useContract()

  console.log(blogFactoryContract)

  useEffect(async () => {
    if (!blogFactoryContract) return
    const count = await blogFactoryContract.methods.getBlogCount().call()
    console.log(count)

    // blogFactoryContract.methods.getAllBlogs().call({ from: userAccount.account }).then(r => {
    //   console.log(r)
    // })

    const blog = await blogFactoryContract.methods.getBlog(0).call()
    console.log(blog)

  }, [blogFactoryContract])

  return (
    <>
      <Header />
      <div className="home">
        <Posts />
        <Sidebar />
      </div>
    </>
  );
}
