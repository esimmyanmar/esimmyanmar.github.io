"use client"

// CHANGE: Custom hook for EaaS operations with state management

import { useState, useCallback } from "react"
import {
  eaasService,
  type EntitlementCheckResponse,
  type ActivationResponse,
  type DashboardProfile,
} from "@/lib/eaas-service"

interface UseEaasState {
  entitlementCheck: EntitlementCheckResponse | null
  activation: ActivationResponse | null
  dashboard: DashboardProfile[] | null
  loading: boolean
  error: string | null
}

export function useEaaS() {
  const [state, setState] = useState<UseEaasState>({
    entitlementCheck: null,
    activation: null,
    dashboard: null,
    loading: false,
    error: null,
  })

  const checkEntitlement = useCallback(async (deviceId?: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const result = await eaasService.checkEntitlement({ deviceId })
      setState((prev) => ({ ...prev, entitlementCheck: result, loading: false }))
      return result
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Entitlement check failed"
      setState((prev) => ({ ...prev, error: errorMsg, loading: false }))
      throw error
    }
  }, [])

  const activate = useCallback(async (carrier: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const result = await eaasService.activateProfile(carrier)
      setState((prev) => ({ ...prev, activation: result, loading: false }))
      return result
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Activation failed"
      setState((prev) => ({ ...prev, error: errorMsg, loading: false }))
      throw error
    }
  }, [])

  const loadDashboard = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const result = await eaasService.getDashboard()
      setState((prev) => ({ ...prev, dashboard: result, loading: false }))
      return result
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Dashboard load failed"
      setState((prev) => ({ ...prev, error: errorMsg, loading: false }))
      throw error
    }
  }, [])

  return {
    ...state,
    checkEntitlement,
    activate,
    loadDashboard,
  }
}
