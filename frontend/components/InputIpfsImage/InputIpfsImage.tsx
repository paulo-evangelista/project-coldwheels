'use client'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';

const InputIpfsImage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFileToIpfs = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append('file', file);
    
        setLoading(true);
        setError(null);
    
        try {
          const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
            },
            body: formData,
          });
    
          if (!res.ok) {
            throw new Error('Error uploading file to IPFS');
          }
    
          const data = await res.json();
          const url = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
          toast.success('Upload Succeeded!');
          setLoading(false);
          return url;
        } catch (error) {
          console.error('Error uploading file: ', error);
          setError('Error uploading file');
          toast.error('Error uploading file');
          setLoading(false);
          return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
        <label className="flex items-center px-4 py-2 bg-[#1F91E3] text-white rounded-lg cursor-pointer">
          <Upload className="w-6 h-6 mr-2" />
          <span>Choose Car Image</span>
          <input type="file" onChange={uploadFileToIpfs} className="hidden" />
        </label>
        {loading && <p className="text-blue-500 mt-2">Uploading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
  );
};

export default InputIpfsImage;
