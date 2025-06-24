
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  onImageRemoved: () => void;
  currentImage?: string;
}

const ImageUpload = ({ onImageUploaded, onImageRemoved, currentImage }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file (JPG, PNG, GIF, WebP)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `tea-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('tea-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('tea-uploads')
        .getPublicUrl(filePath);

      onImageUploaded(data.publicUrl);
      
      toast({
        title: "Image Uploaded! 📸",
        description: "Your meme is ready to spill with the tea!",
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Couldn't upload your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadImage(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onImageRemoved();
    toast({
      title: "Image Removed",
      description: "Your image has been removed from the submission.",
    });
  };

  return (
    <div className="space-y-2">
      <Label className="text-white font-medium">Add Some Visual Spice 🖼️</Label>
      
      {currentImage ? (
        <Card className="p-4 bg-ctea-darker/50 border-ctea-teal/30">
          <div className="relative">
            <img 
              src={currentImage} 
              alt="Uploaded content" 
              className="w-full max-h-64 object-cover rounded-lg"
            />
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={removeImage}
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card 
          className={`p-6 border-2 border-dashed transition-colors cursor-pointer ${
            dragActive 
              ? 'border-ctea-teal bg-ctea-teal/10' 
              : 'border-ctea-teal/30 bg-ctea-darker/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={isUploading}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ctea-teal"></div>
                    <span className="text-ctea-teal">Uploading your visual tea...</span>
                  </>
                ) : (
                  <>
                    <Image className="w-8 h-8 text-ctea-teal" />
                    <span className="text-white">Drop your meme here or click to upload</span>
                    <span className="text-sm text-gray-400">PNG, JPG, GIF, WebP (max 5MB)</span>
                  </>
                )}
              </div>
            </label>
          </div>
        </Card>
      )}
      
      <div className="text-xs text-gray-400">
        Perfect for memes, screenshots, and visual evidence! 📸
      </div>
    </div>
  );
};

export default ImageUpload;
