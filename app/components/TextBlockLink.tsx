import { AnchorHTMLAttributes, ReactNode } from "react"

interface TextBlockLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

const TextBlockLink: React.FC<TextBlockLinkProps> = ({
  children,
  ...props
}) => {
  return (
    <a
      {...props}
      className={`underline underline-offset-4 ${props.className || ""}`}
    >
      {children}
    </a>
  )
}

export default TextBlockLink
