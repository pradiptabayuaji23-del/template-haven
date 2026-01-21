import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import type { Template } from '@/types';

interface TemplateFormProps {
  template?: Template | null;
  onSave: (data: Partial<Template>) => void;
  onCancel: () => void;
}

export function TemplateForm({ template, onSave, onCancel }: TemplateFormProps) {
  const [title, setTitle] = useState(template?.title || '');
  const [description, setDescription] = useState(template?.description || '');
  const [price, setPrice] = useState(template?.price?.toString() || '');
  const [techStack, setTechStack] = useState<string[]>(template?.techStack || []);
  const [techInput, setTechInput] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(template?.thumbnailUrl || '');
  const [fileUrl, setFileUrl] = useState(template?.fileUrl || '');
  const [thumbnailName, setThumbnailName] = useState('');
  const [fileName, setFileName] = useState('');

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock upload - in production, upload to server
      setThumbnailName(file.name);
      setThumbnailUrl(`/uploads/${file.name}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock upload - in production, upload to server
      setFileName(file.name);
      setFileUrl(`/downloads/${file.name}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      price: parseFloat(price),
      techStack,
      thumbnailUrl: thumbnailUrl || '/placeholder.svg',
      fileUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., SaaS Dashboard Pro"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your template..."
          rows={4}
          required
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Price (USD)</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="49.00"
          required
        />
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <Label>Tech Stack</Label>
        <div className="flex gap-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            placeholder="e.g., React, TypeScript"
          />
          <Button type="button" variant="secondary" onClick={handleAddTech}>
            Add
          </Button>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map(tech => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Upload */}
      <div className="space-y-2">
        <Label>Thumbnail Image</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          {thumbnailName ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">{thumbnailName}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setThumbnailName('');
                  setThumbnailUrl('');
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                style={{ position: 'relative' }}
              />
              <Button type="button" variant="secondary" size="sm" asChild>
                <label className="cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                  />
                </label>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Template File Upload */}
      <div className="space-y-2">
        <Label>Template File (.zip)</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          {fileName ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">{fileName}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setFileName('');
                  setFileUrl('');
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload your template package
              </p>
              <Button type="button" variant="secondary" size="sm" asChild>
                <label className="cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
          {template ? 'Update Template' : 'Create Template'}
        </Button>
      </div>
    </form>
  );
}
