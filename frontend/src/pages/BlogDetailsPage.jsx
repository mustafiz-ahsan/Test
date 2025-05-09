import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Container, Heading, Image, Text, VStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { products, deleteProduct } = useProductStore();
  const blog = products.find((b) => b._id === id);

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast({ title: "Deleted", description: message, status: "success", isClosable: true });
      navigate("/");
    } else {
      toast({ title: "Error", description: message, status: "error", isClosable: true });
    }
  };

  if (!blog) {
    return (
      <Container maxW="container.md" py={12}>
        <Text fontSize="xl" color="red.500">Blog post not found.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="2xl">{blog.name}</Heading>
        <Text color="gray.500" fontSize="sm">{blog.date || "April 26, 2025"}</Text>
        <Image src={blog.image} alt={blog.name} borderRadius="lg" maxH="350px" objectFit="cover" />
        <Text fontSize="lg">{blog.description || "No description provided."}</Text>
        <Box>
          <Button colorScheme="blue" mr={4} onClick={() => navigate(`/create?id=${blog._id}`)}>
            Edit
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default BlogDetailsPage;
