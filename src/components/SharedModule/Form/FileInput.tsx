const FileInput: React.FC<{
  id: string;
  name: string;
  title: string;
  allowedTypes?: string[];
  value?: FileList; // Optional if you want to support default files
  register: any;
}> = ({ id, name, title, allowedTypes, register }) => {
    // 	It takes (id, title, name, list with allowed types)
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {title || name}
      </label>
      <input
        id={id}
        type="file"
        {...register(name)} // Register the file input
        accept={allowedTypes?.join(",")}
        className="mt-1 block w-full border-gray-300 rounded-md"
      />
    </div>
  );
};

export default FileInput;
