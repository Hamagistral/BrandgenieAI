import { Avatar, AvatarImage } from "./ui/avatar";

export const BotAvatar = () => {
    return (
        <Avatar className="h-10 w-6">
            <AvatarImage className="p-1" src="/brandgenie_logo.png"/>
        </Avatar>
    )
}