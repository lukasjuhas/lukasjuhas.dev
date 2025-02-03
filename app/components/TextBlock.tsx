import { ReactNode } from "react"

interface TextBlockProps {
  children: ReactNode
}

const TextBlock: React.FC<TextBlockProps> = ({ children }) => {
  return (
    <article className="content text-base sm:text-lg md:text-xl lg:text-2xl p-4 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      {children}
    </article>
  )
}

export default TextBlock
