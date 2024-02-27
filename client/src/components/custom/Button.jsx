import { cn } from "../../utils"

const Button = ({
    className,
    children,
    ...props
}) => {
    return (
        <button className={cn(
            `
            inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium
            transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
            disabled:pointer-events-none disabled:opacity-50
            bg-black text-white shadow h-9 px-4 py-2
            `, className)} {...props}>
            {children}
        </button>
    )
}
export default Button