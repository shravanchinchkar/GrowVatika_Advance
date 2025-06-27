import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { zodResolver } from '@hookform/resolvers/zod';
import { fileUploadSchema, FileUploadFormData } from './schema';

const CustomAddProductForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FileUploadFormData>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      name: '',
      email: '',
      files: [],
    },
  });

  // Watch the files field to display selected files
  const watchedFiles = watch('files');

  const onSubmit = (data: FileUploadFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission here
    alert(`Form submitted with ${data.files.length} files`);
  };

  const removeFile = (indexToRemove: number) => {
    const currentFiles = watchedFiles || [];
    const newFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    setValue('files', newFiles);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">File Upload Form</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* File Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Files
          </label>
          <Controller
            name="files"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FileDropzone
                onFilesChange={onChange}
                files={value || []}
                error={errors.files?.message}
              />
            )}
          />
          {errors.files && (
            <p className="mt-1 text-sm text-red-600">{errors.files.message}</p>
          )}
        </div>

        {/* Display Selected Files */}
        {watchedFiles && watchedFiles.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected Files ({watchedFiles.length})
            </h3>
            <div className="space-y-2">
              {watchedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-2 px-2 py-1 text-xs text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

// Separate Dropzone Component
interface FileDropzoneProps {
  onFilesChange: (files: File[]) => void;
  files: File[];
  error?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFilesChange,
  files,
  error,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        console.log('Rejected files:', rejectedFiles);
      }
      
      // Combine existing files with new accepted files
      const combinedFiles = [...files, ...acceptedFiles];
      onFilesChange(combinedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-lg cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-400 bg-blue-50'
          : isDragReject
          ? 'border-red-400 bg-red-50'
          : error
          ? 'border-red-400'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <div className="text-3xl mb-2">📁</div>
        {isDragActive ? (
          <p className="text-blue-600">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag and drop files here, or{' '}
              <span className="text-blue-600 font-medium">browse</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Maximum 5 files, 5MB each. Supports JPEG, PNG, GIF, PDF
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadForm;