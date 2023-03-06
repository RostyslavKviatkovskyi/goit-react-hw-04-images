import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGalleryStyled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery className="gallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </Gallery>
  );
};
