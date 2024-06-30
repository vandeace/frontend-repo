import axiosInstance from "@/config/api";

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

interface TParamPost {
  title: string;
  description: string;
}
export const createPost = async ({ title, description }: TParamPost) => {
  try {
    const response = await axiosInstance.post("/posts", {
      title: title,
      description: description,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
