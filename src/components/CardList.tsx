import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}
interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImageURL, setSelectedImageURL] = useState<string>();

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleClick(url: string): void {
    setSelectedImageURL(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid minChildWidth="290px" gap="40px" columns={3}>
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={() => handleClick(card.url)}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImageURL}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
