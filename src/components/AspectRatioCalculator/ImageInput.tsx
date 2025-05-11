import {
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
  type FC,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ImageInputProps {
  onImageLoad: (width: number, height: number) => void;
}

const ImageInput: FC<ImageInputProps> = ({ onImageLoad }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // Added for image preview
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageUrlInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(
    (fileOrUrl: File | string) => {
      setError(null);
      setImagePreviewUrl(null); // Clear previous preview

      const img = new Image();
      img.onload = () => {
        onImageLoad(img.naturalWidth, img.naturalHeight);
        // Set preview URL. If it's a file, img.src will be an object URL.
        // If it's a URL string, img.src will be that URL.
        setImagePreviewUrl(img.src);
      };
      img.onerror = () => {
        setError('Failed to load image. Please check the URL or file.');
        setImagePreviewUrl(null);
      };

      if (typeof fileOrUrl === 'string') {
        img.src = fileOrUrl;
      } else {
        // Create an object URL for file previews
        img.src = URL.createObjectURL(fileOrUrl);
      }
    },
    [onImageLoad],
  );

  // Effect to revoke object URL when component unmounts or preview changes
  useEffect(() => {
    const currentPreviewUrl = imagePreviewUrl;
    return () => {
      if (currentPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = useCallback(
    (event: DragEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.dataTransfer.files?.[0];
      if (file?.type.startsWith('image/')) {
        processImage(file);
      } else {
        setError('Please drop an image file.');
      }
    },
    [processImage],
  );

  const handlePaste = useCallback(
    async (event: ClipboardEvent<HTMLInputElement>) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith('image/')) {
            const file = items[i].getAsFile();
            if (file) {
              event.preventDefault();
              processImage(file);
              return;
            }
          }
        }
      }
    },
    [processImage],
  );

  const handleUrlSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageUrl) {
      processImage(imageUrl);
    } else {
      setError('Please enter an image URL.');
    }
  };

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-error text-sm">{error}</p>}

      {/* URL Input */}
      <form onSubmit={handleUrlSubmit} className="form-control flex gap-2">
        <label htmlFor="imageUrlInput" className="label">
          <span className="label-text">Image URL:</span>
        </label>
        <div className="flex gap-4">
          <input
            id="imageUrlInput"
            ref={imageUrlInputRef}
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onPaste={handlePaste}
            placeholder="Paste image URL or paste image data"
            className="input input-bordered w-full grow"
          />
          <button type="submit" className="btn btn-primary">
            Load
          </button>
        </div>
      </form>

      {/* Hidden File Input - Referenced by the Drop Zone */}
      <input
        id="fileUploadInput"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drop Zone with Integrated Preview */}
      <button
        type="button"
        className={`border-2 border-dashed border-base-content/30 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors w-full mt-4 ${
          imagePreviewUrl ? 'bg-base-200' : ''
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        aria-label="Image drop zone and file selector"
      >
        {imagePreviewUrl ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={imagePreviewUrl}
              alt="Selected preview"
              className="max-w-full max-h-48 object-contain rounded"
            />
            <p className="text-sm text-base-content/70 mt-2">
              Click to change image
            </p>
          </div>
        ) : (
          <p className="text-base-content/70 py-6">
            Drag & drop an image here, or click to select a file.
          </p>
        )}
      </button>
    </div>
  );
};

export default ImageInput;
