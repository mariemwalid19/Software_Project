const convertByteArrayToBase64 = (byteArray) => {
    // Convert byte array to base64 string
    let binary = '';
    for (let i = 0; i < byteArray.length; i++) {
      binary += String.fromCharCode(byteArray[i]);
    }
    return btoa(binary);
  };
  
  export { convertByteArrayToBase64 };
  