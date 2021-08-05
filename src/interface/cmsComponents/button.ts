export interface IButtonProps {
  text?: string;
  disabled?: boolean;
  ghost?: boolean;
  htmlType?: string;
  icon?: string;
  loading?: boolean | { delay: number };
  shape?: "circle" | "round";
  type?: "primary" | "dashed" | "danger" | "link";
}

export interface IButtonEvents {
  click?: (e: Event) => void;
}
