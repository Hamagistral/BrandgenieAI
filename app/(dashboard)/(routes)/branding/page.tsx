"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import Heading from "@/components/heading";
import { Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from './constants';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState, Fragment } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";

export default function BrandingPage () {
    const router = useRouter();
    const proModal = useProModal();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        const initializeChat = () => {
          const systemMessage: ChatCompletionRequestMessage = {
            role: "system",
            content: "You are a helpful AI branding assistant that helps online business owners brand their ecommerce store. Your should teturn only 3 creative and unique suggestions of a brand names composed of single or two word related to the prompt, 3 unique and catchy slogans, 6 social media keywords in a hashtag format, and one brand ad copy they can use in their social media marketing campaign. Your return should be like this: 'Brand Names: your brand names suggestions'\n\n Brand Slogan: your suggestion of a slogan\n\n Brand Keywords: #keyword1 #keyword2 ...\n\n Brand Ad Copy: your suggestion for a brand ad copy.",
          }
          setMessages([systemMessage])
        }
    
        if (!messages?.length) {
          initializeChat()
        }

    }, [messages?.length, setMessages])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };

            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/branding", {messages: newMessages});

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading 
                title="Branding"
                description="Get a complete brand package for your upcoming business with just a product description. Includes name, slogan, ad copy, and related keywords."
                icon={Wand2}
                iconColor="text-violet-500" 
                bgColor="bg-violet-500/10"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-2 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visibl:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Sport Watches, Hiking Gear, Cat Food and Toys..." {...field}/>
                                    </FormControl>
                                </FormItem> )}/>
                                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                    Generate
                                </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-2 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 1 && !isLoading && (
                        <div>
                            <Empty label="No Branding generated."/>
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.slice(1).map((message) => (
                            <div key={message.content} className={cn("p-6 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                    {String(message.content).split('\n').map((line, index) => (
                                        <Fragment key={index}>
                                            {line.startsWith("Brand") ? <strong>{line}</strong> : line}
                                            <br />
                                        </Fragment>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>  
        </div>
    );
}
