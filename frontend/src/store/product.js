import { create } from "zustand";

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

function getStoredBlogs() {
  const stored = localStorage.getItem("blogs");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return dummyBlogs;
    }
  }
  return dummyBlogs;
}

function saveBlogs(blogs) {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

export const useProductStore = create((set, get) => ({
  products: getStoredBlogs(),
  setProducts: (products) => {
    saveBlogs(products);
    set({ products });
  },
  createProduct: async (newBlog) => {
    if (!newBlog.name || !newBlog.image || !newBlog.description || !newBlog.date) {
      return { success: false, message: "Please fill in all fields." };
    }
    const blog = {
      ...newBlog,
      _id: Date.now().toString(),
    };
    const blogs = [...get().products, blog];
    saveBlogs(blogs);
    set({ products: blogs });
    return { success: true, message: "Blog post created successfully" };
  },
  fetchProducts: async () => {
    const blogs = getStoredBlogs();
    set({ products: blogs });
  },
  deleteProduct: async (id) => {
    const blogs = get().products.filter((b) => b._id !== id);
    saveBlogs(blogs);
    set({ products: blogs });
    return { success: true, message: "Blog post deleted successfully" };
  },
  updateProduct: async (id, updatedBlog) => {
    const blogs = get().products.map((b) => (b._id === id ? { ...updatedBlog, _id: id } : b));
    saveBlogs(blogs);
    set({ products: blogs });
    return { success: true, message: "Blog post updated successfully" };
  },
}));
