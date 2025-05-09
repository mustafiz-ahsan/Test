import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedBlog, setUpdatedBlog] = useState(product);

  const textColor = useColorModeValue("gray.700", "gray.200");
  const bg = useColorModeValue("white", "gray.900");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteBlog = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Deleted",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateBlog = async (id, updatedBlog) => {
    const { success, message } = await updateProduct(id, updatedBlog);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Blog post updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontSize='md' color={textColor} mb={4}>
            {product.description}
        </Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' aria-label='Edit blog post' />
					<IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteBlog(product._id)}
            colorScheme='red'
            aria-label='Delete blog post'
          />
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Edit Blog Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
                placeholder='Blog Title'
                name='name'
                value={updatedBlog.name}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, name: e.target.value })}
              />
              <Input
                placeholder='Short Description'
                name='description'
                value={updatedBlog.description || ''}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, description: e.target.value })}
              />
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedBlog.image}
								onChange={(e) => setUpdatedBlog({ ...updatedBlog, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
                colorScheme='blue'
                mr={3}
                onClick={() => handleUpdateBlog(product._id, updatedBlog)}
              >
                Update
              </Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ProductCard;
