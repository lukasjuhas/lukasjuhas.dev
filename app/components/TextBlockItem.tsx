import { ReactNode } from "react"

interface TextBlockItemProps {
  children: ReactNode
}

const TextBlockItem: React.FC<TextBlockItemProps> = ({ children }) => {
  return <p className="mb-4">{children}</p>
}

export default TextBlockItem
