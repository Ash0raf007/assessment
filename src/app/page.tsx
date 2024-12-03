"use server"
import { Post } from "@/types/AllPosts";
import { allPosts } from "./api/axios";  
import AllPostsUser from "./components/AllPostsUser";

const Home = async () => {
  let products: Post[] = [];

  try {
    const response = await allPosts();  
    products = response.data;  
    console.log(products);  
  } catch (error) {
    console.error(error); 
  }

  return (
    <div>
      <AllPostsUser res={products} />  
    </div>
  );
};

export default Home;
