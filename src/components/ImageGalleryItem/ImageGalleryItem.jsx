import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Item, ItemImageSmall, ItemImageLarge } from './ImageGalleryItemStyled';

export function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Item className="gallery-item">
      <ItemImageSmall
        src={image.webformatURL}
        onClick={toggleModal}
        alt="image"
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <ItemImageLarge src={image.largeImageURL} alt="image" />
        </Modal>
      )}
    </Item>
  );
}
