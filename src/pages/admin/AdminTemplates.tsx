import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TemplateForm } from '@/components/admin/TemplateForm';
import { mockTemplates } from '@/data/mockData';
import type { Template } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminTemplates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = (data: Partial<Template>) => {
    if (editingTemplate) {
      // Update existing
      setTemplates(prev => 
        prev.map(t => t.id === editingTemplate.id ? { ...t, ...data } : t)
      );
      toast({
        title: 'Template updated',
        description: 'The template has been updated successfully.',
      });
    } else {
      // Create new
      const newTemplate: Template = {
        id: `template-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...data as Template,
      };
      setTemplates(prev => [newTemplate, ...prev]);
      toast({
        title: 'Template created',
        description: 'The new template has been created successfully.',
      });
    }
    setIsDialogOpen(false);
    setEditingTemplate(null);
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast({
      title: 'Template deleted',
      description: 'The template has been deleted.',
    });
  };

  const openEditDialog = (template: Template) => {
    setEditingTemplate(template);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingTemplate(null);
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Templates</h2>
            <p className="text-muted-foreground">Manage your template catalog</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90" onClick={openCreateDialog}>
                <Plus className="h-4 w-4" />
                Add Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTemplate ? 'Edit Template' : 'Add New Template'}
                </DialogTitle>
              </DialogHeader>
              <TemplateForm 
                template={editingTemplate} 
                onSave={handleSave}
                onCancel={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Templates Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Templates ({templates.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Template</th>
                    <th>Price</th>
                    <th>Tech Stack</th>
                    <th>Created</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map(template => (
                    <tr key={template.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 rounded bg-muted overflow-hidden flex-shrink-0">
                            <img 
                              src={template.thumbnailUrl} 
                              alt={template.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{template.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
                              {template.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold">${template.price}</td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {template.techStack.slice(0, 2).map(tech => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {template.techStack.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.techStack.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="text-muted-foreground">
                        {new Date(template.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(template)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete template?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{template.title}". This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(template.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
