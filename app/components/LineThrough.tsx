import { ReactNode } from "react"

interface LineThroughProps {
  children: ReactNode
}

const LineThrough: React.FC<LineThroughProps> = ({ children }) => {
  return <s className="line-through">{children}</s>
}

export default LineThrough
