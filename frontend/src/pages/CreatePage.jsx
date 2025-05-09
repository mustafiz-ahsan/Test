import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProductStore } from "../store/product";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreatePage = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const { products, createProduct, updateProduct } = useProductStore();
  const editingBlog = editId ? products.find((b) => b._id === editId) : null;
  const [blog, setBlog] = useState(
    editingBlog || { name: "", description: "", image: "", date: "" }
  );
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (editingBlog) setBlog(editingBlog);
  }, [editingBlog]);

  const handleSubmit = async () => {
    if (!blog.name || !blog.description || !blog.image || !blog.date) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        isClosable: true,
      });
      return;
    }
    let resp;
    if (editId) {
      resp = await updateProduct(editId, blog);
    } else {
      resp = await createProduct(blog);
    }
    if (!resp.success) {
      toast({
        title: "Error",
        description: resp.message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: resp.message,
        status: "success",
        isClosable: true,
      });
      setBlog({ name: "", description: "", image: "", date: "" });
      navigate("/");
    }
  };


  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          {editId ? "Edit Blog Post" : "Create New Blog Post"}
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder='Blog Title'
              name='name'
              value={blog.name}
              onChange={(e) => setBlog({ ...blog, name: e.target.value })}
            />
            <Textarea
              placeholder='Short Description'
              name='description'
              value={blog.description}
              onChange={(e) => setBlog({ ...blog, description: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={blog.image}
              onChange={(e) => setBlog({ ...blog, image: e.target.value })}
            />
            <Input
              placeholder='Date (e.g. April 26, 2025)'
              name='date'
              value={blog.date}
              onChange={(e) => setBlog({ ...blog, date: e.target.value })}
            />
            <Button colorScheme='blue' onClick={handleSubmit} w='full'>
              {editId ? "Update Blog Post" : "Add Blog Post"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
