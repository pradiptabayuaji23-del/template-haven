import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import type { Template } from '@/types';

interface FeaturedTemplatesProps {
  templates: Template[];
  isLoading?: boolean;
}

export function FeaturedTemplates({ templates, isLoading }: FeaturedTemplatesProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Templates</h2>
            <p className="text-muted-foreground mt-2">
              Hand-picked templates to accelerate your development
            </p>
          </div>
          <Link to="/templates">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <TemplateGrid templates={templates} isLoading={isLoading} />
      </div>
    </section>
  );
}
