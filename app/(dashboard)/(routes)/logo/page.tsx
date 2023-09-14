"use client";

import axios from "axios";
import Heading from "@/components/heading";
import { Download, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from './constants';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from 'react-hot-toast';

export default function LogoPage () {
    const router = useRouter();
    const proModal = useProModal();
    const [logo, setLogo] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLogo('');
            
            const response = await axios.post("/api/logo", values);

            console.log(response.data[0]);
            
            setLogo(response.data[0]);
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
                title="Logo Generation"
                description="Generate a unique logo for your business."
                icon={ImagePlus}
                iconColor="text-pink-500" 
                bgColor="bg-pink-500/10"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-2 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visibl:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="A Detailed Vector logo of an Orange cat" {...field}/>
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
                    {logo === '' && !isLoading && (
                        <div>
                            <Empty label="No Logo Generated."/>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                            {logo && <Card key={logo} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image src={logo} alt="Logo" fill/>
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(logo)} variant="secondary" className="w-full">
                                        <Download className="h-4 w-4 mr-2" />
                                            Download
                                    </Button>
                                </CardFooter>
                            </Card>}
                    </div>
                </div>
            </div>  
        </div>
    );
}
