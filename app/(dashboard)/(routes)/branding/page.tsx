"use client";

import Heading from "@/components/heading";
import { Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from './constants';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BrandingPage () {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        
    }

    return (
        <div>
            <Heading 
                title="Branding"
                description="Get a complete brand package for your e-commerce site with just a product description. Includes name, slogan, ad copy, and related keywords."
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
                <div className="space-y-4 mt-4">
                    Branding Content
                </div>
            </div>  
        </div>
    );
}
