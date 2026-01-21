import { Link } from 'react-router-dom';
import type { Template } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link to={`/templates/${template.id}`}>
      <Card className="group overflow-hidden card-hover border-border/50 bg-card">
        {/* Thumbnail */}
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={template.thumbnailUrl}
            alt={template.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-4">
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {template.techStack.slice(0, 3).map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
            {template.techStack.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{template.techStack.length - 3}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg leading-tight group-hover:text-accent transition-colors">
            {template.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {template.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <span className="price-display">
            ${template.price}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
