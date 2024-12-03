import axios from "axios"

const axiosInstance = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`, 
  timeout: 50000,
})

export async function allPosts() {
  return await axiosInstance.get(`/posts`)
}

export async function singlePost(id:number) {

    return await axiosInstance.get(`/posts/${id}`)

}

export async function deletePost(id:number) {
  return await axiosInstance.delete(`/posts/${id}`)
}

type PostData= {
  id?:number;
  title: string;
  body: string;
}

export async function EditPost({id,title, body}:PostData) {
  return await axiosInstance.put(`/posts/${id}`,
    {
      title,
      body,
    }
  )
}



export async function AddNewPost({ title, body }: PostData) {
  return await axiosInstance.post(
    '/posts/',
    {
      title,
      body,
    }
  );
}

