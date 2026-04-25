'use client'
import NewPassword from "@/components/NewPassword";
import SendEmail from "@/components/SendEmail";
import Success from "@/components/Success";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function PasswordResetContent() {
    const searchParams = useSearchParams()
    const key = searchParams.get("key")
    
    const [control, setControl] = useState(0)

    if (control === 0 && key === null) {
        return <SendEmail setControl={setControl} />
    } else if (control === 1 && key === null) {
        return <Success />
    } else if (control === 2 || key !== null) {
        return <NewPassword code={key ?? ""} />
    }

    return null; // Güvenlik için fallback
}

export default function Page() {
    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <PasswordResetContent />
        </Suspense>
    )
}
