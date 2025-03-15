
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const enhancedActionButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-transform",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95 transition-transform",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-transform",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95 transition-transform",
        link: "text-primary underline-offset-4 hover:underline",
        purple: "bg-purple text-white hover:bg-purple/80 active:scale-95 transition-transform",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      hasRipple: {
        true: "overflow-hidden",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hasRipple: false,
    },
  }
);

export interface EnhancedActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedActionButtonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  tooltipText?: string;
  keyboardShortcut?: string;
  successMessage?: string;
  errorMessage?: string;
  confirmationMessage?: string;
  hasRipple?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<boolean | void> | boolean | void;
}

const EnhancedActionButton = React.forwardRef<HTMLButtonElement, EnhancedActionButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    isLoading = false,
    tooltipText,
    keyboardShortcut,
    successMessage,
    errorMessage,
    confirmationMessage,
    hasRipple = true,
    onClick,
    children,
    ...props 
  }, ref) => {
    const [loading, setLoading] = React.useState(isLoading);
    const [ripples, setRipples] = React.useState<{x: number, y: number, size: number}[]>([]);
    const Comp = asChild ? Slot : "button";
    
    // Handle keyboard shortcuts
    React.useEffect(() => {
      if (!keyboardShortcut) return;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        // Parse keyboard shortcut (e.g. "Alt+S" into keys)
        const keys = keyboardShortcut.toLowerCase().split('+');
        
        // Check if modifiers match
        const altRequired = keys.includes('alt');
        const ctrlRequired = keys.includes('ctrl');
        const shiftRequired = keys.includes('shift');
        
        // Get the main key (last one if it's not a modifier)
        const mainKey = keys.filter(k => !['alt', 'ctrl', 'shift'].includes(k))[0];
        
        if (
          e.key.toLowerCase() === mainKey &&
          e.altKey === altRequired &&
          e.ctrlKey === ctrlRequired &&
          e.shiftKey === shiftRequired &&
          !props.disabled &&
          !loading
        ) {
          e.preventDefault();
          const button = document.querySelector(`button[data-shortcut="${keyboardShortcut}"]`);
          if (button) {
            (button as HTMLButtonElement).click();
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [keyboardShortcut, props.disabled, loading]);
    
    const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!hasRipple) return;
      
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(button.clientWidth, button.clientHeight);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {x, y, size};
      setRipples([...ripples, newRipple]);
      
      setTimeout(() => {
        setRipples(currentRipples => currentRipples.filter(r => r !== newRipple));
      }, 600);
    };
    
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || props.disabled || !onClick) return;
      
      handleRipple(e);
      
      if (confirmationMessage) {
        const confirmed = window.confirm(confirmationMessage);
        if (!confirmed) return;
      }
      
      try {
        setLoading(true);
        const result = await onClick(e);
        
        if (successMessage && result !== false) {
          toast.success(successMessage);
        }
        
        setLoading(false);
        return result;
      } catch (error) {
        setLoading(false);
        if (errorMessage) {
          toast.error(errorMessage || 'An error occurred');
        }
        console.error('Button action error:', error);
        return false;
      }
    };
    
    const button = (
      <Comp
        className={cn(enhancedActionButtonVariants({ variant, size, hasRipple, className }))}
        ref={ref}
        onClick={handleClick}
        data-shortcut={keyboardShortcut}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {children}
        {keyboardShortcut && (
          <span className="text-xs opacity-70 ml-1">
            {keyboardShortcut}
          </span>
        )}
        
        {hasRipple && ripples.map((ripple, i) => (
          <span 
            key={i}
            className="absolute rounded-full bg-white/20 animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </Comp>
    );
    
    if (tooltipText) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return button;
  }
);

EnhancedActionButton.displayName = "EnhancedActionButton";

export { EnhancedActionButton, enhancedActionButtonVariants };
