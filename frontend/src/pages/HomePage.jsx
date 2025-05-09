import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const dummyBlogs = [
  {
    _id: "1",
    name: "The Evolution of Jazz",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    description: "Explore the roots and rise of jazz music, from New Orleans to the world stage.",
    date: "April 20, 2025",
  },
  {
    _id: "2",
    name: "Synthwave: The Sound of Nostalgia",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    description: "Dive into the retro-futuristic genre that blends 80s vibes with modern production.",
    date: "April 21, 2025",
  },
  {
    _id: "3",
    name: "Top 10 Guitar Riffs of All Time",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    description: "A countdown of the most iconic guitar riffs that shaped rock music.",
    date: "April 22, 2025",
  },
  {
    _id: "4",
    name: "The Power of Lyrics in Hip-Hop",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    description: "How wordplay and storytelling define hip-hop culture.",
    date: "April 23, 2025",
  },
  {
    _id: "5",
    name: "Classical Music in Modern Media",
    image: "https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b",
    description: "Discover how classical compositions influence today’s movies and games.",
    date: "April 24, 2025",
  },
];

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Use dummy blogs if no blogs are present
  const blogsToShow = products.length > 0 ? products : dummyBlogs;

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"36"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, purple.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Latest Music Blog Posts
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w={"full"}
        >
          {blogsToShow.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
              <ProductCard product={blog} />
            </Link>
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No blog posts found 😢{' '}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a blog post
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};
export default HomePage;
