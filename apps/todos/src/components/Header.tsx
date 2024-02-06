import { profileAtom } from "@/store/profile";
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useLelele } from "lelele/src";
import { ProfileForm } from "./ProfileForm";

export const Header = () => {
  const { name } = useLelele(profileAtom);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box
      position="fixed"
      top="0px"
      left="0px"
      right="0px"
      height="60px"
      width="100%"
      paddingX="32px"
      paddingY="12px"
      background="white"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex justifyContent="space-between">
        <Text fontWeight="bold" fontSize="x-large">
          Todo App
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          height="40px"
          width="40px"
          borderRadius="full"
          background="purple.400"
          cursor="pointer"
          onClick={onOpen}
        >
          <Text fontWeight="bold" color="white">
            {name.slice(0, 1)}
          </Text>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="32px">
            <ProfileForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
