// Import global styles and fonts
import './globals.css'
import TitleBorder from './components/TitleBorder'
import NavBar from './components/NavBar'

export default function GlobalNotFound() {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}
        >
            <body className="h-full flex flex-col items-center justify-center bg-background">
                <NavBar is404={true} />
                <TitleBorder>404 - Page Not Found</TitleBorder>
                <p className="text-muted-foreground mt-4">The page you are looking for does not exist.</p>
            </body>
        </html>
    )
}