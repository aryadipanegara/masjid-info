import { Button } from "@/components/ui/button";
import { IconShare } from "@tabler/icons-react";

interface ShareMediaButtonProps {
  onClick: () => void;
}

export function ShareMediaButton({ onClick }: ShareMediaButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="bg-white bg-opacity-80 hover:bg-opacity-100"
    >
      <IconShare className="h-4 w-4" />
      <span className="sr-only">Share Media</span>
    </Button>
  );
}
