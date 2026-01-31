export interface SocialMediaLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
}
