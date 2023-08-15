import Image from "next/image"

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-6 h-10 relative animate-bounce">
                <Image alt="logo" fill src="/brandgenie_logo.png"/>
            </div>
            <p className="text-sm text-muted-foreground">
                BrandGenie is thinking...
            </p>
        </div>
    )
}