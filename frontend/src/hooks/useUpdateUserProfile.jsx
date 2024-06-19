import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";


const useUpdateUserProfile = () => {

    const queryClient = useQueryClient();

    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch('/api/user/update', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                const data = await res.json();
    
                if (!res.ok) throw new Error(data.error)
                
                return data
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            toast.success("Profile updated successfully")
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ['authUsers']}),
                queryClient.invalidateQueries({ queryKey: ['userProfile']}),
                queryClient.invalidateQueries({ queryKey: ['userPosts']})
            ])
        },
        onError: () => {
            toast.error("Error updating profile")
        }
    })

    return { updateProfile, isUpdatingProfile };
}

export default useUpdateUserProfile

