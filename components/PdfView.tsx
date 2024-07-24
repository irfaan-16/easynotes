const PdfView = ({ base64 }: { base64: string }) => {
  function base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  const blob = base64ToBlob(base64, "application/pdf");
  const url = URL.createObjectURL(blob);
  return (
    <div>
      <iframe src={url} className="w-3/4 m-auto min-w-[600px] min-h-[700px]" />
    </div>
  );
};

export default PdfView;
