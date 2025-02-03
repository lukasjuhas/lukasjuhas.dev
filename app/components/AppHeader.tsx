import Link from "next/link"
import AppLogo from "./AppLogo"

const AppHeader: React.FC = () => {
  return (
    <header className="absolute z-20 top-0 left-0 right-0 w-full h-auto p-4">
      <Link href="/" className="cursor-pointer">
        <AppLogo />
      </Link>
    </header>
  )
}

export default AppHeader
