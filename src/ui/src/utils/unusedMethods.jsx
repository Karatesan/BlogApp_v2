const handleSelectedItems = (event) => {
  const files = event.target.files;
  const uploadedImages = Array.from(files);

  const readerArray = uploadedImages.map((file) => {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.readAsDataURL(file);
    });
  });

  Promise.all(readerArray)
    .then((base64Strings) => {
      setUpdatedPost({
        ...updatedPost,
        images: [...updatedPost.images, ...base64Strings],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
