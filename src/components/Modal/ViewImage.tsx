import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Skeleton,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay>
        <ModalContent bgColor="pGray.900" w="fit-content">
          <ModalBody p="0" role="img">
            <Image
              maxW="900px"
              maxH="600px"
              src={imgUrl}
              fallback={<Skeleton boxSize="500px" />}
            />
          </ModalBody>

          <ModalFooter justifyContent="flex-start">
            <Link href={imgUrl} target="_blank">
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
