export function getBase64Url(image) {
  return `data:image/webp;base64,${image}`;
}

export const createUrl = (images) => {
  return images.map((img) => {
    if (img.image) {
      return URL.createObjectURL(img.image);
    }
    return null;
  });
};

export default getBase64Url;
