import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import Replicate from "replicate";
import { Prompt } from "next/font/google";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration);

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "256x256" } = body;

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // if(!configuration.apiKey) {
        //     return new NextResponse("OpenAI API Key required!", { status: 500 })
        // }

        if(!replicate.auth) {
            return new NextResponse("Replicate API Token required!", { status: 500 })
        }

        if(!prompt) {
            return new NextResponse("Prompt is required", { status: 400 })
        }

        // if(!amount) {
        //     return new NextResponse("Amount is required", { status: 400 })
        // }

        // if(!resolution) {
        //     return new NextResponse("Resolution is required", { status: 400 })
        // }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired.", { status: 403 })
        }

        // const response = await openai.createImage({
        //     prompt,
        //     n: parseInt(amount, 10),
        //     size: resolution,
        // });

        const response = await replicate.run(
            "stability-ai/sdxl:d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82",
            {
              input: {
                prompt: prompt
              }
            }
        );

        if (!isPro) {
            await increaseApiLimit();
        };
        
        return NextResponse.json(response);
    } catch (error) {
        console.log("[LOGO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}