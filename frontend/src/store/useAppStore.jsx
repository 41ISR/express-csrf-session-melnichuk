import { create } from "zustand"

const useAppStore = create((set,get) => ({
    currentClicks: 0,
    leaderboard: [
        {userId: 1, email: 'ktoto@m.ru', clicks: 135},
        {userId: 2, email: 'ktoto@m.ru', clicks: 25},
        {userId: 3, email: 'ktoto@m.ru', clicks: 15515},
        
    ],
    setCurrentClicks: (amount) => set((state) => ({...state, currentClicks: amount})),

}))

export default useAppStore