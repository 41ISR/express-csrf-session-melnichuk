import { create } from "zustand"

const useAppStore = create((set,get) => ({
    currentClicks: 0,
    leaderboard: [],
    setCurrentClicks: (amount) => set((state) => ({...state, currentClicks: amount})),
    setLeaderboard: (board) => set((state) => ({...state, leaderboard: board})),
}))

export default useAppStore