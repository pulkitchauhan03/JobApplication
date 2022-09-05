const base64toBlob = (data) => {
    const bytes = atob(data);
    let length = bytes.length;
    let out = new Uint8Array(length);
    while (length--) out[length] = bytes.charCodeAt(length);
    return new Blob([out], { type: 'application/pdf' });
  }

export default base64toBlob;