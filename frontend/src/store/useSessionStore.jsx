import { create } from "zustand"

const useSessionStore = create((set,get) => ({
    user: undefined,
    checkSession: async () => {
        try {
            const data = await fetch("https://super-invention-wrg65pj457jr3gwj-3000.app.github.dev/me", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const res = await data.json()

            if(!data.ok) throw new Error(data.error)

            set((state) => ({...state, user: res}))            
        } catch (error) {
            console.error(error);
        }
    },
    clearSession: () => {
        set((state) => ({...state, user: undefined}))
    }
}))

export default useSessionStore