export default interface User {
    "id": string,
    "total_amount_of_coins": number
    "farm_start": number
    "farm_finish": number
    "farm_coins_per_hour": number,
    "total_coins": number
    "is_onboarded": boolean
}

export interface Referral {
    "user_id": number,
    "username": string,
    "reward": number
}

export interface Referrals {
    referrals: Referral[]
}

export interface Tasks {
    tasks: Task[]
}

export interface Task {
    task: TaskBody
    status: boolean
}

export interface TaskBody {
    text_ru: string
    reward: number
    url: string
}