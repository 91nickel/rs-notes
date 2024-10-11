import { useContext } from 'react'
import { Context } from '@/context'

export function useAuth() {
    return useContext(Context.Auth.Context)
}
