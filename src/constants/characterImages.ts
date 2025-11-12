import ggoom1 from '../assets/images/ggoom/ggoom1.png';
import ggoom2 from '../assets/images/ggoom/ggoom2.png';
import ggoom3 from '../assets/images/ggoom/ggoom3.png';
import ggoom4 from '../assets/images/ggoom/ggoom4.png';
import ggoom5 from '../assets/images/ggoom/ggoom5.png';
import ggoom6 from '../assets/images/ggoom/ggoom6.png';
import ggoom7 from '../assets/images/ggoom/ggoom7.png';
import ggoom8 from '../assets/images/ggoom/ggoom8.png';
import ggoom9 from '../assets/images/ggoom/ggoom9.png';
import ggoom10 from '../assets/images/ggoom/ggoom10.png';

export const CHARACTER_IMAGES: Record<number, string> = {
  1: ggoom1,
  2: ggoom2,
  3: ggoom3,
  4: ggoom4,
  5: ggoom5,
  6: ggoom6,
  7: ggoom7,
  8: ggoom8,
  9: ggoom9,
  10: ggoom10,
};

export const CHARACTER_IMAGE_ENTRIES = Object.entries(CHARACTER_IMAGES).map(
  ([id, image]) => ({ id: Number(id), image })
);
