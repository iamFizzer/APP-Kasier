import { useEffect } from "react"
import { useLoadingOverlay } from "../context/LoadingOverlayContext"
import { useToastr } from "../context/ToastrContext"


export default function Initialize() {

    const { setIsLoading } = useLoadingOverlay()
    const { toast } = useToastr()

    useEffect(() => {
        // setIsLoading(true)
        toast.error({
            message: 'Sukses abc'
        })
    }, [])

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white">
            <div className="max-w-3xl w-full">
                <div className="p-5">
                   
                </div>
                
            </div>
        </div>
    )
}