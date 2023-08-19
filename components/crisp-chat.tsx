"use client";

import { Crisp } from "crisp-sdk-web";
import {useEffect} from "react";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("91d89db7-adc0-4027-bdb7-d4532a2ea952");
    }, []);

    return null;
}